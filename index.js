async function pwGenerator() {
    // Imports
    let fs = require('fs');
    let isRemote = true; // Set to false for local path
    let jsonPath = './mnt/volume-ams3-01/storage.json';
    if (isRemote) jsonPath = '../../mnt/volume-ams3-01/storage.json';
    // If JSON doesn't exist: create
    let jsonExists = await fs.existsSync(jsonPath);
    if (!jsonExists) fs.writeFile(jsonPath, JSON.stringify({}), 'utf8', function (err) { if (err) return console.log(err); });
    let existingPWs = require(jsonPath);
    // Starting variables
    console.log("Generating random alphanumeric string...");
    // Generate password
    let pwReturn = generatePW();
    // Loop untill unique password is generated
    while (Object.entries(existingPWs).includes(pwReturn)) pwReturn = generatePW();
    // Store password
    existingPWs[Date.now()] = pwReturn;
    fs.writeFile(jsonPath, JSON.stringify(existingPWs), 'utf8', function (err) { if (err) return console.log(err); });
    // Return password
    return console.log("Password:\n" + pwReturn);
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