"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/mail";
exports.ids = ["pages/api/mail"];
exports.modules = {

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "(api)/./config/nodemailer.js":
/*!******************************!*\
  !*** ./config/nodemailer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mailOptions\": () => (/* binding */ mailOptions),\n/* harmony export */   \"transporter\": () => (/* binding */ transporter)\n/* harmony export */ });\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_0__);\n\nconst email = process.env.EMAIL;\nconst pass = process.env.EMAIL_PASS;\nconst transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0___default().createTransport({\n    service: \"gmail\",\n    auth: {\n        user: email,\n        pass: pass\n    }\n});\n//ko kome salje\nconst mailOptions = {\n    from: email,\n    to: \"\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9jb25maWcvbm9kZW1haWxlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQW9DO0FBR3BDLE1BQU1DLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsS0FBSztBQUMvQixNQUFNQyxPQUFPSCxRQUFRQyxHQUFHLENBQUNHLFVBQVU7QUFFNUIsTUFBTUMsY0FBY1AsaUVBQTBCLENBQUM7SUFDbERTLFNBQVM7SUFDVEMsTUFBTTtRQUNGQyxNQUFNVjtRQUNOSSxNQUFNQTtJQUNWO0FBQ0osR0FBRztBQUVILGVBQWU7QUFDUixNQUFNTyxjQUFjO0lBQ3ZCQyxNQUFNWjtJQUNOYSxJQUFJO0FBQ1IsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NvbmZpZy9ub2RlbWFpbGVyLmpzPzUzMjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuXHJcblxyXG5jb25zdCBlbWFpbCA9IHByb2Nlc3MuZW52LkVNQUlMO1xyXG5jb25zdCBwYXNzID0gcHJvY2Vzcy5lbnYuRU1BSUxfUEFTUztcclxuXHJcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcclxuICAgIHNlcnZpY2U6ICdnbWFpbCcsXHJcbiAgICBhdXRoOiB7XHJcbiAgICAgICAgdXNlcjogZW1haWwsXHJcbiAgICAgICAgcGFzczogcGFzc1xyXG4gICAgfSxcclxufSk7XHJcblxyXG4vL2tvIGtvbWUgc2FsamVcclxuZXhwb3J0IGNvbnN0IG1haWxPcHRpb25zID0ge1xyXG4gICAgZnJvbTogZW1haWwsXHJcbiAgICB0bzogJydcclxufSJdLCJuYW1lcyI6WyJub2RlbWFpbGVyIiwiZW1haWwiLCJwcm9jZXNzIiwiZW52IiwiRU1BSUwiLCJwYXNzIiwiRU1BSUxfUEFTUyIsInRyYW5zcG9ydGVyIiwiY3JlYXRlVHJhbnNwb3J0Iiwic2VydmljZSIsImF1dGgiLCJ1c2VyIiwibWFpbE9wdGlvbnMiLCJmcm9tIiwidG8iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./config/nodemailer.js\n");

/***/ }),

/***/ "(api)/./pages/api/mail.js":
/*!***************************!*\
  !*** ./pages/api/mail.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/nodemailer */ \"(api)/./config/nodemailer.js\");\n\nconst handler = async (req, res)=>{\n    if (req.method === \"POST\") {\n        const data = req.body;\n        if (!data) {\n            return res.status(400).json({\n                message: \"Bad request\"\n            });\n        }\n        try {\n            await _config_nodemailer__WEBPACK_IMPORTED_MODULE_0__.transporter.sendMail({\n                ..._config_nodemailer__WEBPACK_IMPORTED_MODULE_0__.mailOptions,\n                to: data,\n                subject: \"Nove poruke\",\n                text: \"test\",\n                html: `<h1>Izgubljeno/Nađeno</h1><p>Pozdrav!<br />Imate neprocitanih poruka!</p>`\n            });\n            return res.status(200).json({\n                success: true\n            });\n        } catch (error) {\n            console.log(data);\n            return res.status(400).json({\n                message: error.message\n            });\n        }\n    }\n    return res.status(400).json({\n        message: \"Bad request\"\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbWFpbC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFtRTtBQUVuRSxNQUFNRSxVQUFVLE9BQU9DLEtBQUtDLE1BQVE7SUFFaEMsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLFFBQVE7UUFDdkIsTUFBTUMsT0FBT0gsSUFBSUksSUFBSTtRQUVyQixJQUFJLENBQUNELE1BQU07WUFDUCxPQUFPRixJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQWM7UUFDekQsQ0FBQztRQUVELElBQUk7WUFFQSxNQUFNVCxvRUFBb0IsQ0FBQztnQkFDdkIsR0FBR0QsMkRBQVc7Z0JBQ2RZLElBQUlOO2dCQUNKTyxTQUFTO2dCQUNUQyxNQUFNO2dCQUNOQyxNQUFNLENBQUMseUVBQXlFLENBQUM7WUFDckY7WUFDQSxPQUFPWCxJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFTyxTQUFTLElBQUk7WUFBQztRQUNoRCxFQUFFLE9BQU9DLE9BQU87WUFDWkMsUUFBUUMsR0FBRyxDQUFDYjtZQUNaLE9BQU9GLElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVNPLE1BQU1QLE9BQU87WUFBQztRQUN6RDtJQUNKLENBQUM7SUFFRCxPQUFPTixJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1FBQUVDLFNBQVM7SUFBYztBQUN6RDtBQUVBLGlFQUFlUixPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL21haWwuanM/N2QxNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYWlsT3B0aW9ucywgdHJhbnNwb3J0ZXIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL25vZGVtYWlsZXJcIjtcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHJcbiAgICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gcmVxLmJvZHk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnQmFkIHJlcXVlc3QnIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKHtcclxuICAgICAgICAgICAgICAgIC4uLm1haWxPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgdG86IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiBcIk5vdmUgcG9ydWtlXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcInRlc3RcIixcclxuICAgICAgICAgICAgICAgIGh0bWw6IGA8aDE+SXpndWJsamVuby9OYcSRZW5vPC9oMT48cD5Qb3pkcmF2ITxiciAvPkltYXRlIG5lcHJvY2l0YW5paCBwb3J1a2EhPC9wPmBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogJ0JhZCByZXF1ZXN0JyB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXI7Il0sIm5hbWVzIjpbIm1haWxPcHRpb25zIiwidHJhbnNwb3J0ZXIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwiZGF0YSIsImJvZHkiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInNlbmRNYWlsIiwidG8iLCJzdWJqZWN0IiwidGV4dCIsImh0bWwiLCJzdWNjZXNzIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/mail.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/mail.js"));
module.exports = __webpack_exports__;

})();