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


const asyncContext = async () => {

    const Login = await request("POST", "https://smartmeter.netz-noe.at/orchestration/Authentication/Login", '{"user":"' + process.env.USERNAME + '","pwd":"' + process.env.PWD + '"}');
    console.log("Login: ", Login.statusText, "(" + Login.status + ")");
    const GetBasicInfo = await request("GET", "https://smartmeter.netz-noe.at/orchestration/User/GetBasicInfo", null);
    console.log("GetBasicInfo: ", GetBasicInfo.statusText, "(" + GetBasicInfo.status + ")");
    console.log(GetBasicInfo.finalText);
}

setTimeout(async () => { console.log("Running tests"); let a = Date.now(); await asyncContext(); let b = Date.now(); let diff = b - a; console.log("Took " + diff + "ms to run tests!") }, 1);

let url = "https://smartmeter.netz-noe.at/orchestration/";
let cookieAddress = url.split(":")[0] + "://" + url.split("/")[2] + "/";

setTimeout(() => console.log(basicCookieManager.getRequestCookies(cookieAddress)), 20000);
