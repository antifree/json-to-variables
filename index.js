const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

try {
    const fileName = core.getInput('filename', { required: true });
    const prefix = core.getInput('prefix') || '';
    const fullPath = path.resolve(fileName);
    const sensitiveKeys = core.getInput('sensitiveKeys').split(/[\r\n]/).map(input => input.trim()).filter(input => input !== '') || '';

    core.info(`Processing file: ${fullPath}`);
    
    const rawdata = fs.readFileSync(fullPath);
    const rootObj = JSON.parse(rawdata);

    const processVariable = (variable, name) => {

        if (typeof variable === 'undefined' || variable === null) {
            return;
        }

        if (Array.isArray(variable)) {      
            variable.forEach((value, index) => {
                processVariable(value, `${name}_${index}`);
            });
        }
        else if (typeof variable === 'object') {
            for(const key in variable) {
                if(rootObj.hasOwnProperty(key)){
                    processVariable(variable[key], key);
                }
                else {
                    processVariable(variable[key], `${name}_${key}`);
                }
            }
        }
        else {
            // Check if the key contains any sensitive key(s) and mask the value if it does
            if (sensitiveKeys.some(sensitiveKey => name.includes(sensitiveKey))) {
                core.setSecret(variable.toString());
            }
            core.info(`SET ENV '${prefix}${name}' = ${variable}`);
            core.exportVariable(`${prefix}${name}`, variable.toString());
        }
    };

    processVariable(rootObj);
    
} catch (error) {
    core.setFailed(error.message);
}