/*
Usage:
    cookies.parseSetCookies("www.example.com", "NSC_WT_TWYUXFCQ-TTM=/example/;expires=Sat, 11-Mar-2023 15:16:53 GMT;path=/;secure;httponly")

    cookies.getRequestCookies("www.example.com") // returns NSC_WT_TWYUXFCQ-TTM=/example/

    cookies.getAsJSON() // returns {...}
*/


let allCookies = new Map();

module.exports.parseSetCookies = (url, setCookieHeader) => {
    console.log("Parsing:", setCookieHeader);
    const parts = setCookieHeader.split(";");
    let obj = {};

    for (var p of parts) {
        if (!p.includes("=")) {
            obj[p] = true;
            continue;
        }

        let [key, value] = p.split("=");

        key = key.replaceAll(" ", "");
        let compareKey = key.toLowerCase();

        if (compareKey === "expires") obj[key] = new Date(value);
        else if (compareKey === "samesite") obj[key] = value;
        else if (compareKey === "path") obj[key] = value;
        else if (compareKey === "max-age") obj[key] = parseInt(value, 10);
        else if (compareKey === "domain") obj[key] = value;
        else {
            obj["name"] = key;
            obj["value"] = value;
        }

    }

    if (!allCookies.has(url))
        allCookies.set(url, [obj]);
    else allCookies.get(url).push(obj);

    module.exports.filterCookies();

    return obj;
}

/**
 * @description This function sorts out old cookies and deletes them in a unefficient manner
 * @todo EFFICIENCY of filterCookies function
 */
module.exports.filterCookies = () => {
    for (const url of allCookies.keys()) {
        let keysList = {
            list: []
        };

        for (const cookie of allCookies.get(url)) {
            if (!cookie.expires) continue;
            // is cookie expired ignore
            if (cookie.expires.getTime() < Date.now())
                continue;

            // if a newer one already exists ignore
            if (keysList[cookie.name] && keysList[cookie.name].expires.getTime() > cookie.expires.getTime())
                continue;

            keysList[cookie.name] = cookie;
            keysList.list.push(cookie.name);
        }

        let newList = [];

        for (const cookieName of keysList.list) {
            newList.push({
                ...keysList[cookieName]
            })
        }

        allCookies.set(url, newList);

    }

}


module.exports.getRequestCookies = (url) => {
    if (!allCookies.has(url)) return;

    let cookies = "consent_market_cookie_www.smartmeter-netz-noe.at=false; ";

    let currentIndex = 1;
    let isLast = () => currentIndex >= allCookies.get(url).length;

    for (const cookie of allCookies.get(url)) {
        if (cookie.expires.getTime() > Date.now())
            cookies += cookie.name + "=" + cookie.value;
        if (!isLast()) cookies += "; ";
    }

    return cookies;
}