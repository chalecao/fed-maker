"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function resolveFromProjectPerspective(e){var r=_path2.default.dirname(e.indexFilePath),t=e.outputDirPath;return e.pages.forEach(function(e,a){e.imports&&e.imports.length>0&&e.imports.forEach(function(e,a){if("../../"===e.source.substr(0,6)){var o=_path2.default.resolve(r,e.source).replace(/\\/g,"/");e.relativeSource=repairPath(_path2.default.relative(t,o)).replace(/\\/g,"/")}else e.relativeSource=e.source}),e.resources&&e.resources.requires.forEach(function(e,a){if("../../"===e.source.substr(0,6)){var o=_path2.default.resolve(r,e.source).replace(/\\/g,"/");e.relativeSource=repairPath(_path2.default.relative(t,o)).replace(/\\/g,"/")}else e.relativeSource=e.source})}),e}function replaceInPath(e,r){var t=e;return _lodash2.default.forOwn(r,function(e,r){t=t.replace("{"+r+"}",e)}),t}function repairPath(e){return"."!==e.substr(0,1)&&(e="./"+e),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.resolveFromProjectPerspective=resolveFromProjectPerspective,exports.replaceInPath=replaceInPath;var _lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_path=require("path"),_path2=_interopRequireDefault(_path);