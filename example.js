const api = require("./index.js")
const credentials = require("./credentials.json");

const test = async () => {
    await api.login(credentials.USERNAME, credentials.PASSWORD);

    let meteringPoints = await api.getMeteringEndpoints();

    console.log(await api.getMeterOfDay(meteringPoints[0].meteringPointId, new Date(Date.now() - 86400000))); // Get data from yesterday

    await api.logout();
}


// run test
setTimeout(async () => {
    console.log("Running example");
    let a = Date.now();
    await test();
    let b = Date.now();
    let diff = b - a;
    console.log("Took " + diff + "ms to run example!")
}, 1);
