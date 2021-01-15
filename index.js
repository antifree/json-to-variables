const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

try {
    const fileName = core.getInput('filename', { required: true });
    const prefix = core.getInput('prefix') || 'json';

    const fullPath = path.resolve(fileName);
    console.log(`Processing file: ${fullPath}`);
    
    const rawdata = fs.readFileSync(fullPath);
    const rootObj = JSON.parse(rawdata);

    const provessVariable = (variable, name) => {

        if (typeof variable === 'undefined' || variable === null) {
            return;
        }

        if (Array.isArray(variable)) {
            
            variable.forEach((value, index) => {
                provessVariable(value, `${name}_${index}_`);
            });
            
        }
        else if (typeof variable === 'object') {
            for(const field in variable) {
                provessVariable(variable[field], `${name}_${field}`);
            }
        }
        else {
            core.info(`SET ENV '${name}' = ${variable}`);
            core.exportVariable(name, variable.toString());
        }
    };

    provessVariable(rootObj, prefix);
    

} catch (error) {
    core.setFailed(error.message);
}