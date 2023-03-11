
# Login

### REQUEST
    POST https://smartmeter.netz-noe.at/orchestration/Authentication/Login
    Accept: application/json, text/plain, */*
    Accept-Encoding: gzip, deflate, br
    Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7
    Cache-Control: no-cache
    Connection: keep-alive
    Content-Length: 40
    Content-Type: application/json
    Cookie: consent_market_cookie_www.smartmeter-netz-noe.at=true; TRACKING_COOKIE
    DNT: 1
    Host: smartmeter.netz-noe.at
    Origin: https://smartmeter.netz-noe.at
    Pragma: no-cache
    Referer: https://smartmeter.netz-noe.at/
    sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"
    sec-ch-ua-mobile: ?0
    sec-ch-ua-platform: "Windows"
    Sec-Fetch-Dest: empty
    Sec-Fetch-Mode: cors
    Sec-Fetch-Site: same-origin
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36
    
    
    {
        "pwd": "",
        "user": ""
    }

### RESPONSE
    Cache-Control: no-cache
    Content-Length: 0
    Date: Fri, 10 Mar 2023 15:23:07 GMT
    Expires: -1
    Pragma: no-cache
    Referrer-Policy: strict-origin-when-cross-origin
    Server: Microsoft-IIS/10.0
    Set-Cookie: XSRF-Token=/TOKEN/; expires=Fri, 10 Mar 2023 15:38:07 GMT; domain=smartmeter.netz-noe.at; path=/; secure; httponly; SameSite=lax
    Set-Cookie: __Host-go4DavidSecurityToken=/SECURITYTOKEN/; expires=Fri, 10 Mar 2023 15:38:07 GMT; path=/; secure; httponly; SameSite=lax
    Set-Cookie: NSC_WT_TWYUXFCQ-TTM=/TRACKING/;expires=Fri, 10-Mar-2023 16:55:51 GMT;path=/;secure;httponly
    X-Content-Type-Options: nosniff
    X-Frame-Options: deny
    X-XSS-Protection: 1; mode=block


# Get Customer Data

### REQUEST

    GET https://smartmeter.netz-noe.at/orchestration/User/GetBasicInfo
    Accept: application/json, text/plain, */*
    Accept-Encoding: gzip, deflate, br
    Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7
    Cache-Control: no-cache
    Connection: keep-alive
    Cookie: consent_market_cookie_www.smartmeter-netz-noe.at=true; TRACKING_COOKIE; XSRF-Token=/TOKEN/; __Host-go4DavidSecurityToken=/SECURITYTOKEN/
    DNT: 1
    Host: smartmeter.netz-noe.at
    Pragma: no-cache
    Referer: https://smartmeter.netz-noe.at/
    sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"
    sec-ch-ua-mobile: ?0
    sec-ch-ua-platform: "Windows"
    Sec-Fetch-Dest: empty
    Sec-Fetch-Mode: cors
    Sec-Fetch-Site: same-origin
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36

### RESPONSE

    Cache-Control: no-cache
    Content-Length: 219
    Content-Type: application/json; charset=utf-8
    Date: Fri, 10 Mar 2023 15:23:08 GMT
    Expires: -1
    Pragma: no-cache
    Referrer-Policy: strict-origin-when-cross-origin
    Server: Microsoft-IIS/10.0
    Set-Cookie: NSC_WT_TWYUXFCQ-TTM=/TRACKING/;expires=Fri, 10-Mar-2023 16:55:51 GMT;path=/;secure;httponly
    X-Content-Type-Options: nosniff
    X-Frame-Options: deny
    X-XSS-Protection: 1; mode=block

### RESPONSE BODY 
```json
{
    "gpNummer": "CUSTOMER ID",
    "titelVorgestellt": null,
    "titelNachgestellt": null,
    "anrede": "MALE / FEMALE",
    "vorname": "FORENAME",
    "nachname": "LASTNAME",
    "registerDate": "DATE OF REGISTRATION",
    "von": null
}
```
# GET CUSTOMER DATA FROM ENERGY COMPANY

### REQUEST
    GET https://smartmeter.netz-noe.at/orchestration/User/GetAccountIdByBussinespartnerId
    Accept: application/json, text/plain, */*
    Accept-Encoding: gzip, deflate, br
    Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7
    Cache-Control: no-cache
    Connection: keep-alive
    Cookie: consent_market_cookie_www.smartmeter-netz-noe.at=true; NSC_WT_TWYUXFCQ-TTM=/TRACKING/; XSRF-Token=/TOKEN/; __Host-go4DavidSecurityToken=/SECURITYTOKEN/
    DNT: 1
    Host: smartmeter.netz-noe.at
    Pragma: no-cache
    Referer: https://smartmeter.netz-noe.at/
    sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"
    sec-ch-ua-mobile: ?0
    sec-ch-ua-platform: "Windows"
    Sec-Fetch-Dest: empty
    Sec-Fetch-Mode: cors
    Sec-Fetch-Site: same-origin
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36

### RESPONSE
    Cache-Control: no-cache
    Content-Length: 714
    Content-Type: application/json; charset=utf-8
    Date: Fri, 10 Mar 2023 15:23:08 GMT
    Expires: -1
    Pragma: no-cache
    Referrer-Policy: strict-origin-when-cross-origin
    Server: Microsoft-IIS/10.0
    Set-Cookie: NSC_WT_TWYUXFCQ-TTM=/TRACKING/;expires=Fri, 10-Mar-2023 16:55:52 GMT;path=/;secure;httponly
    X-Content-Type-Options: nosniff
    X-Frame-Options: deny
    X-XSS-Protection: 1; mode=block

### RESPONSE BODY
```json
[
  {
    "gpNumber": "CUSTOMER ID",
    "accountId": "ACCOUNT ID",
    "externalPowerSupply": bool, // unknown; Therory: When power is not supplied by EVN
    "separatedAccounting": bool, // unknown
    "deliveryByEMail": bool, // unknown
    "deliveryByPortal": bool, // unknown
    "facilityDescription": "",  // unkown
    "hasSmartMeter": bool, // unknown
    "hasCommunicative": bool, // IS ENERGY METER COMMUNICATING WITH ENERGY COMPANY
    "hasOptIn": bool, // HAS DATA FOR EVERY 15 MINUTES
    "hasActive": bool, // IS TRACKING ENABLED
    "address": {
      "seriennummer": null, // unknown
      "ort": "PLACE",
      "plz": "PLACE ID",
      "strasse": "STREET NAME",
      "hausnummer": "HOME NUMBER",
      "hausnummerErgaenzung": "HOME NUMBER LETTERS",
      "ortsteil": "PART OF DISTRICT",
      "zusatz": "EXTRA INFO",
      "adresszusatz": {
        "stiege": "STAIR",
        "stock": "FLOOR",
        "tuernummer": "DOOR NUMBER"
      }
    }
  }
]
```

# GET DIFFERENT MESSUREMENT POINTS 

### REQUEST
    GET https://smartmeter.netz-noe.at/orchestration/User/GetMeteringPointByAccountId?accountId=/ACCOUNT_ID/
    Accept: application/json, text/plain, */*
    Accept-Encoding: gzip, deflate, br
    Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7
    Cache-Control: no-cache
    Connection: keep-alive
    Cookie: consent_market_cookie_www.smartmeter-netz-noe.at=true; NSC_WT_TWYUXFCQ-TTM=/TRACKING/; XSRF-Token=/TOKEN/; __Host-go4DavidSecurityToken=/SECURITYTOKEN/
    DNT: 1
    Host: smartmeter.netz-noe.at
    Pragma: no-cache
    Referer: https://smartmeter.netz-noe.at/
    sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"
    sec-ch-ua-mobile: ?0
    sec-ch-ua-platform: "Windows"
    Sec-Fetch-Dest: empty
    Sec-Fetch-Mode: cors
    Sec-Fetch-Site: same-origin
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36

### RESPONSE

    Cache-Control: no-cache
    Content-Length: 1433
    Content-Type: application/json; charset=utf-8
    Date: Fri, 10 Mar 2023 15:23:09 GMT
    Expires: -1
    Pragma: no-cache
    Referrer-Policy: strict-origin-when-cross-origin
    Server: Microsoft-IIS/10.0
    Set-Cookie: NSC_WT_TWYUXFCQ-TTM=/TRACKING/;expires=Fri, 10-Mar-2023 16:55:52 GMT;path=/;secure;httponly
    X-Content-Type-Options: nosniff
    X-Frame-Options: deny
    X-XSS-Protection: 1; mode=block

### RESPONSE BODY

```json
[
  {
    "meteringPointId": "ID OF ENERGY METER",
    "address": ---/---, // Same as in GET CUSTOMER DATA FROM ENERGY COMPANY; RESPONSE BODY
    "typeOfRelation": "TYPE OF RELATION FOR EXAMPLE: USING(Bezug)",
    "ftmReadOut": bool, // unknown
    "ftmReadOutProvider": bool, // unknown
    "communityProductionFacility": bool, // is official power generation facility
    "hasFtmMeterData": bool, // unknown
    "validFrom": "", // date of first usage
    "smartMeterType": "", // unknown
    "locked": bool // unknown
  },
  [...]
]
```

# GET SMART METER DATA 

### REQUEST
    GET https://smartmeter.netz-noe.at/orchestration/ConsumptionRecord/Day?meterId=/ID OF ENERGY METER/&day=/DATE// for example 2022-2-2/
    Accept: application/json, text/plain, */*
    Accept-Encoding: gzip, deflate, br
    Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7
    Cache-Control: no-cache
    Connection: keep-alive
    Cookie: consent_market_cookie_www.smartmeter-netz-noe.at=true; NSC_WT_TWYUXFCQ-TTM=/TRACKING/; XSRF-Token=/TOKEN/; __Host-go4DavidSecurityToken=/SECURITYTOKEN/
    DNT: 1
    Host: smartmeter.netz-noe.at
    Pragma: no-cache
    Referer: https://smartmeter.netz-noe.at/
    sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"
    sec-ch-ua-mobile: ?0
    sec-ch-ua-platform: "Windows"
    Sec-Fetch-Dest: empty
    Sec-Fetch-Mode: cors
    Sec-Fetch-Site: same-origin
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36

### RESPONSE
    Cache-Control: no-cache
    Content-Length: 10429
    Content-Type: application/json; charset=utf-8
    Date: Fri, 10 Mar 2023 15:23:09 GMT
    Expires: -1
    Pragma: no-cache
    Referrer-Policy: strict-origin-when-cross-origin
    Server: Microsoft-IIS/10.0
    Set-Cookie: NSC_WT_TWYUXFCQ-TTM=/TRACKING/;expires=Fri, 10-Mar-2023 16:55:53 GMT;path=/;secure;httponly
    X-Content-Type-Options: nosniff
    X-Frame-Options: deny
    X-XSS-Protection: 1; mode=block

### RESPONSE BODY
```json
{
  "meteredValues": [
    0.01,
    [...],
    0.01
  ],
  "estimatedValues": [
    null,
    [...],
    null
  ],
  "gridUsageLeftoverValues": [
    null,
    [...],
    null
  ],
  "selfCoverageValues": [
    null,
    [...],
    null
  ],
  "jointTenancyProportionValues": [
    null,
    [...],
    null
  ],
  "meteredPeakDemands": [
    0.01,
    [...],
    0.01
  ],
  "estimatedPeakDemands": [
    null,
    [...],
    null
  ],
  "peakDemandTimes": [
    "2023-03-09T00:15:00",
    [...],
    "2023-03-10T00:00:00"
  ]
}```