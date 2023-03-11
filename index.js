const fetch = require("node-fetch");
const basicCookieManager = require("./lib/cookies");

const _request = (method, url, cookies, body) => {
    return fetch(url, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": cookies,
            "Referer": url.split(":")[0] + "://" + url.split("/")[2] + "/", // "https://smartmeter.netz-noe.at/"
        },
        "body": body,
        "method": method
    });
}
const request = (method, url, body) => {
    let cookieAddress = url.split(":")[0] + "://" + url.split("/")[2] + "/";

    return new Promise((res, rej) => {
        let response, responseText;

        _request(method, url, basicCookieManager.getRequestCookies(cookieAddress), body)
            .then(resp => { response = resp; return resp.text() })
            .then(text => {
                responseText = text;

                for (const setcookie of response.headers.raw()["set-cookie"]) {
                    basicCookieManager.parseSetCookies(cookieAddress, setcookie);
                }

                response.finalText = responseText;

                res(response);

            }).catch(rej);
    });
}


let loginData, bussinespartnerData, meteringEndpoints;

const login = async (username, password) => {
    const Login = await request("POST", "https://smartmeter.netz-noe.at/orchestration/Authentication/Login", '{"user":"' + username + '","pwd":"' + password + '"}');
    console.debug("POST Login:", Login.statusText, "(" + Login.status + ")");
    const GetBasicInfo = await request("GET", "https://smartmeter.netz-noe.at/orchestration/User/GetBasicInfo", null);
    console.debug("GET GetBasicInfo:", GetBasicInfo.statusText, "(" + GetBasicInfo.status + ")");

    // probably not needed // does nothing ? 
    const NumberOfDataEntries = await request("GET", "https://smartmeter.netz-noe.at/orchestration/CCM/NumberOfDataEntries", null);
    console.debug("GET NumberOfDataEntries:", NumberOfDataEntries.statusText, "(" + NumberOfDataEntries.status + ")");
    // probably not needed // does nothing ? 
    const ExtendSessionLifetime = await request("GET", "https://smartmeter.netz-noe.at/orchestration/Authentication/ExtendSessionLifetime", null);
    console.debug("GET ExtendSessionLifetime:", ExtendSessionLifetime.statusText, "(" + ExtendSessionLifetime.status + ")");

    if (GetBasicInfo.status === 200)
        loginData = JSON.parse(GetBasicInfo.finalText);
    else loginData = GetBasicInfo.finalText;

    return loginData;
}

const getMeteringEndpoints = async () => {
    if (!loginData.gpNummer) return { error: "GP-ID is not avalable!" }

    // probably not needed // does nothing ? 
    const ExtendSessionLifetime = await request("GET", "https://smartmeter.netz-noe.at/orchestration/Authentication/ExtendSessionLifetime", null);
    console.debug("GET ExtendSessionLifetime:", ExtendSessionLifetime.statusText, "(" + ExtendSessionLifetime.status + ")");

    if (!bussinespartnerData) {
        const GetAccountIdByBussinespartnerId = await request("GET", "https://smartmeter.netz-noe.at/orchestration/User/GetAccountIdByBussinespartnerId", null);
        console.debug("GET GetAccountIdByBussinespartnerId:", GetAccountIdByBussinespartnerId.statusText, "(" + GetAccountIdByBussinespartnerId.status + ")");
        if (GetAccountIdByBussinespartnerId.status == 200)
            bussinespartnerData = JSON.parse(GetAccountIdByBussinespartnerId.finalText);
        else {
            bussinespartnerData = { text: GetAccountIdByBussinespartnerId.finalText };
            return { error: "Could not get the Account ID" }
        }
    }

    const GetMeteringPointByAccountId = await request("GET", "https://smartmeter.netz-noe.at/orchestration/User/GetMeteringPointByAccountId?accountId=" + bussinespartnerData[0].accountId, null);
    console.debug("GET GetMeteringPointByAccountId:", GetMeteringPointByAccountId.statusText, "(" + GetMeteringPointByAccountId.status + ")");

    if (GetMeteringPointByAccountId.status === 200)
        meteringEndpoints = JSON.parse(GetMeteringPointByAccountId.finalText);
    else meteringEndpoints = GetMeteringPointByAccountId.finalText;

    return meteringEndpoints;
}

const credentials = require("./credentials.json");
const test = async () => {
    await login(credentials.USERNAME, credentials.PASSWORD);

    await new Promise((res) => setTimeout(res, 10532));

    await getMeteringEndpoints();

    console.log(loginData, bussinespartnerData, meteringEndpoints)

}


// run test
setTimeout(async () => { console.log("Running tests"); let a = Date.now(); await test(); let b = Date.now(); let diff = b - a; console.log("Took " + diff + "ms to run tests!") }, 1);
// Print final cookies after 20s
{
    let url = "https://smartmeter.netz-noe.at/orchestration/";
    let cookieAddress = url.split(":")[0] + "://" + url.split("/")[2] + "/";
    setTimeout(() => console.log("Final Cookies:", basicCookieManager.getRequestCookies(cookieAddress)), 20000);
}