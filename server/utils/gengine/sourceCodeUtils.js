"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function getModulesImports(e,t){var o=[],r=[],n=void 0;return t.forEach(function(t){n=e.modules[t],n&&r.push(_commons2.default.readDirectoryFiles(n.absolutePath).then(function(e){if(e.files&&e.files.length>0)return e.files.reduce(function(e,t){return e.then(function(){if(".js"===_path2.default.extname(t)||".jsx"===_path2.default.extname(t))return _commons2.default.readFile(t).then(function(e){var t=_commons2.default.parse(e);o.push(_commons2.default.getImportsObject(t))})}).catch(function(e){console.error(e.message+". File path: "+t)})},Promise.resolve())}))}),Promise.all(r).then(function(){return o})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getModulesImports=getModulesImports;var _path=require("path"),_path2=_interopRequireDefault(_path),_commons=require("../commons"),_commons2=_interopRequireDefault(_commons);