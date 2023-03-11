const fetch = require("node-fetch");
const basicCookieManager = require("./lib/cookies");

const LOGGING = false;

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

module.exports.login = async (username, password) => {
    const Login = await request("POST", "https://smartmeter.netz-noe.at/orchestration/Authentication/Login", '{"user":"' + username + '","pwd":"' + password + '"}');
    if (LOGGING) console.debug("POST Login:", Login.statusText, "(" + Login.status + ")");
    const GetBasicInfo = await request("GET", "https://smartmeter.netz-noe.at/orchestration/User/GetBasicInfo", null);
    if (LOGGING) console.debug("GET GetBasicInfo:", GetBasicInfo.statusText, "(" + GetBasicInfo.status + ")");

    // probably not needed // does nothing ? 
    const NumberOfDataEntries = await request("GET", "https://smartmeter.netz-noe.at/orchestration/CCM/NumberOfDataEntries", null);
    if (LOGGING) console.debug("GET NumberOfDataEntries:", NumberOfDataEntries.statusText, "(" + NumberOfDataEntries.status + ")");
    // probably not needed // does nothing ? 
    const ExtendSessionLifetime = await request("GET", "https://smartmeter.netz-noe.at/orchestration/Authentication/ExtendSessionLifetime", null);
    if (LOGGING) console.debug("GET ExtendSessionLifetime:", ExtendSessionLifetime.statusText, "(" + ExtendSessionLifetime.status + ")");

    if (GetBasicInfo.status === 200)
        loginData = JSON.parse(GetBasicInfo.finalText);
    else loginData = GetBasicInfo.finalText;

    return loginData;
}

module.exports.getMeteringEndpoints = async () => {
    if (!loginData.gpNummer) return { error: "GP-ID is not avalable!" }

    // probably not needed // does nothing ? 
    const ExtendSessionLifetime = await request("GET", "https://smartmeter.netz-noe.at/orchestration/Authentication/ExtendSessionLifetime", null);
    if (LOGGING) console.debug("GET ExtendSessionLifetime:", ExtendSessionLifetime.statusText, "(" + ExtendSessionLifetime.status + ")");

    if (!bussinespartnerData) {
        const GetAccountIdByBussinespartnerId = await request("GET", "https://smartmeter.netz-noe.at/orchestration/User/GetAccountIdByBussinespartnerId", null);
        if (LOGGING) console.debug("GET GetAccountIdByBussinespartnerId:", GetAccountIdByBussinespartnerId.statusText, "(" + GetAccountIdByBussinespartnerId.status + ")");
        if (GetAccountIdByBussinespartnerId.status == 200)
            bussinespartnerData = JSON.parse(GetAccountIdByBussinespartnerId.finalText);
        else {
            bussinespartnerData = { text: GetAccountIdByBussinespartnerId.finalText };
            return { error: "Could not get the Account ID" }
        }
    }

    const GetMeteringPointByAccountId = await request("GET", "https://smartmeter.netz-noe.at/orchestration/User/GetMeteringPointByAccountId?accountId=" + bussinespartnerData[0].accountId, null);
    if (LOGGING) console.debug("GET GetMeteringPointByAccountId:", GetMeteringPointByAccountId.statusText, "(" + GetMeteringPointByAccountId.status + ")");

    if (GetMeteringPointByAccountId.status === 200)
        meteringEndpoints = JSON.parse(GetMeteringPointByAccountId.finalText);
    else meteringEndpoints = GetMeteringPointByAccountId.finalText;

    return meteringEndpoints;
}

module.exports.getMeterOfDay = async (id, date) => {
    if (!loginData.gpNummer) return { error: "GP-ID is not avalable!" }

    let usable = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    let meteringPoint = "null";

    for (const meassuringPoints of meteringEndpoints) {
        if (meassuringPoints.meteringPointId.includes(id)) meteringPoint = meassuringPoints.meteringPointId
    }

    if (meteringPoint.includes("null")) return { error: "Invalid metering point id!" };

    const ConsumptionRecord = await request("GET", "https://smartmeter.netz-noe.at/orchestration/ConsumptionRecord/Day?meterId=" + meteringPoint + "&day=" + usable, null);
    if (LOGGING) console.debug("GET ConsumptionRecord/Day :", ConsumptionRecord.statusText, "(" + ConsumptionRecord.status + ")");

    let result = "";
    if (ConsumptionRecord.status === 200)
        result = JSON.parse(ConsumptionRecord.finalText);
    else result = ConsumptionRecord.finalText;

    return result;

}

module.exports.logout = async () => {
    if (!loginData.gpNummer) return { error: "GP-ID is not avalable!" }

    const Logout = await request("GET", "https://smartmeter.netz-noe.at/orchestration/Authentication/Logout", null);
    if (LOGGING) console.debug("GET Logout/Day :", Logout.statusText, "(" + Logout.status + ")");

    loginData = undefined; bussinespartnerData = undefined, meteringEndpoints = undefined;
}
