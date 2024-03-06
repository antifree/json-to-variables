/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 545:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const fs = __nccwpck_require__(147);
const path = __nccwpck_require__(17);
const core = __nccwpck_require__(545);

try {
    const fileName = core.getInput('filename', { required: true });
    const prefix = core.getInput('prefix') || '';
    const fullPath = path.resolve(fileName);
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
            core.info(`SET ENV '${prefix}${name}' = ${variable}`);
            core.exportVariable(`${prefix}${name}`, variable.toString());
        }
    };

    processVariable(rootObj);
    
} catch (error) {
    core.setFailed(error.message);
}
})();

module.exports = __webpack_exports__;
/******/ })()
;