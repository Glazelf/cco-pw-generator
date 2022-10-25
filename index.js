async function pwGenerator() {
    // Imports
    let fs = require('fs');
    let path = require("path");
    let isRemote = true; // Set to false for local path
    // Resolve paths
    let jsonPath = path.resolve(__dirname, './mnt/volume-ams3-01/storage.json');
    if (isRemote) jsonPath = path.resolve(__dirname, '../mnt/volume-ams3-01/storage.json');
    let existingPWs = {};
    if (fs.existsSync(jsonPath)) existingPWs = require(jsonPath);
    // Starting variables
    console.log("Generating random alphanumeric string...");
    // Generate password
    let pwReturn = generatePW();
    // Loop untill unique password is generated
    if (Object.keys(existingPWs).length > 0) while (Object.entries(existingPWs).includes(pwReturn)) pwReturn = generatePW();
    // Store password
    existingPWs[Date.now()] = pwReturn;
    fs.writeFile(jsonPath, JSON.stringify(existingPWs), 'utf8', function (err) { if (err) return console.log(err); });
    // Return password
    return console.log(`Password:\n${pwReturn}`);
    // Password generation function
    function generatePW() {
        let pw = "";
        let pwLength = 32;
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?";
        for (let i = 0; i < pwLength; i++) {
            pw += chars.charAt(Math.floor(Math.random() * chars.length));
        };
        return pw;
    };
};
pwGenerator();