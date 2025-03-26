const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

try {
  const fileName = core.getInput('filename', { required: true });
  const prefix = core.getInput('prefix', { required: false }) || '';
  const hasSecrets = core.getBooleanInput('has_secrets', { required: false });

  const fullPath = path.resolve(fileName);

  core.info(`Processing file: ${fullPath}. Contains secrets: ${hasSecrets}`);

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
      for (const key in variable) {
        const variableName = name.length === 0
          ? key
          : `${name}_${key}`;

        processVariable(variable[key], variableName);
      }
    }
    else {
      if (hasSecrets) {
        core.info(`SET ENV '${name}' = ***`);
        core.setSecret(variable.toString())
      }
      else {
        core.info(`SET ENV '${name}' = ${variable}`);
      }

      core.exportVariable(name, variable.toString());
    }
  };

  processVariable(rootObj, prefix);

} catch (error) {
  core.setFailed(error.message);
}