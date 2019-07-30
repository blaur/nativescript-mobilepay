const sourceMapLocation = '/node_modules/nativescript-mobilepay/platforms/ios/module.modulemap';
const targetMapLocation = '/platforms/ios/NativeScriptMobilePay/module.modulemap';
const projectMapFolder = '/platforms/ios/NativeScriptMobilePay/';
module.exports = function (projectData, hookArgs) {
    var fs = require('fs');
    let targetMapFolder = projectData.projectDir + projectMapFolder;
    if(fs.existsSync('/platforms/ios/')) {
        if (!fs.existsSync(targetMapFolder)) {
            fs.mkdirSync(targetMapFolder);
        }
        fs.copyFileSync(projectData.projectDir + sourceMapLocation, projectData.projectDir + targetMapLocation);
    } else {
        console.log("This is not an ios build so not running after prepare.js for Mobile Pay plugin!")
    }
}