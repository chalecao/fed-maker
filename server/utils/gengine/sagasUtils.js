"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function injectModuleSaga(e,o,t){var a=_commons2.default.parse(e),r=_commons2.default.findDefaultExportsNode(a);if(!r)throw Error("Could not find default export in module sagas file.");var d=_commons2.default.findDefaultImport(a,t);return _commons2.default.deleteSpreadElementFromArrayNode(r,d),_commons2.default.deleteSpreadElementFromArrayNode(r,o),_commons2.default.addSpreadElementToArrayNode(r,o),_commons2.default.addDefaultImport(a,o,t),_commons2.default.generate(a)}function injectSaga(e,o,t){var a=_commons2.default.parse(e),r=_commons2.default.findDefaultExportsNode(a);if(!r)throw Error("Could not find default export in global sagas file.");var d=_commons2.default.findDefaultImport(a,t);return _commons2.default.deleteSpreadElementFromArrayNode(r,d),_commons2.default.deleteSpreadElementFromArrayNode(r,o),_commons2.default.addSpreadElementToArrayNode(r,o),_commons2.default.addDefaultImport(a,o,t),_commons2.default.generate(a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.injectModuleSaga=injectModuleSaga,exports.injectSaga=injectSaga;var _commons=require("../commons"),_commons2=_interopRequireDefault(_commons);