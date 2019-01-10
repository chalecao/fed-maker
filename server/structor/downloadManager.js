"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function checkMetaFolderVersion(e,t){var n=_path2.default.join(e,_utils.config.SERVICE_DIR);return _utils.commons.isExisting(n).then(function(){return _utils.commons.readJson(_path2.default.join(n,"version.json")).catch(function(e){return{}})}).then(function(e){return e&&e.version===t})}function setMetaFolderVersion(e,t){return _utils.commons.writeJson(_path2.default.join(e,_utils.config.SERVICE_DIR,"version.json"),{version:t})}function downloadMetaDistr(e,t){var n="",r="",o="";return n=e.match("http")?client.download(e).then(function(e){return o=_path2.default.join(t,"__metaDistr.tar.gz").replace(/\\/g,"/"),r=_path2.default.join(t,"___metaDistr").replace(/\\/g,"/"),_utils.commons.writeBinaryFile(o,e).then(function(){return _utils.commons.unpackTarGz(o,r)})}).then(function(){return _utils.commons.readDirectoryFlat(r).then(function(t){if(t){var n=t.dirs;if(n&&1===n.length)return n[0].path}throw Error("Downloaded tarball has different structure. Check the ulr: "+e)})}):Promise.resolve(e),n.then(function(e){return o?_utils.commons.removeFile(o).then(function(){return{innerDirPath:e,tempDirPath:r}}):{innerDirPath:e,tempDirPath:r}})}function createMetaFolder(e,t,n){var r=_path2.default.join(t,_utils.config.SERVICE_DIR),o=_path2.default.join(e,_utils.config.SERVICE_DIR);return _utils.commons.copyFile(o,r).then(function(){var t=_path2.default.join(e,configTplPath);return _utils.commons.readFile(t)}).then(function(e){return(0,_lodash.template)(e)(n)}).then(function(e){var t=_path2.default.join(r,configFilePath);return _utils.commons.writeFile(t,e)}).then(function(){var e=_path2.default.join(t,"package.json");return _utils.commons.readJson(e).then(function(t){return t.scripts=t.scripts||{},t.scripts.maker="maker",_utils.commons.writeJson(e,t)})})}function updateMetaFolder(e,t){var n=[],r=_path2.default.join(e,_utils.config.SERVICE_DIR),o=_path2.default.join(t,_utils.config.SERVICE_DIR);return applicationFiles.forEach(function(e){n.push({srcFilePath:_path2.default.join(o,e),destFilePath:_path2.default.join(r,e)})}),_utils.commons.copyFilesNoError(n).then(function(){return _utils.commons.removeFile(o)}).then(function(){return _utils.commons.copyFile(r,o)})}function removeFile(e){return _utils.commons.removeFile(e)}function ensureFileStructure(e,t){var n=_path2.default.join(e,t.srcPath);return _utils.commons.ensureDirPath(n).then(function(){var e=_path2.default.join(n,"assets");return _utils.commons.ensureDirPath(e)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.checkMetaFolderVersion=checkMetaFolderVersion,exports.setMetaFolderVersion=setMetaFolderVersion,exports.downloadMetaDistr=downloadMetaDistr,exports.createMetaFolder=createMetaFolder,exports.updateMetaFolder=updateMetaFolder,exports.removeFile=removeFile,exports.ensureFileStructure=ensureFileStructure;var _path=require("path"),_path2=_interopRequireDefault(_path),_lodash=require("lodash"),_utils=require("../utils"),_clientGH=require("../commons/clientGH.js"),client=_interopRequireWildcard(_clientGH),applicationFiles=["app/components.js","app/reducers.js","app/sagas.js","app/store.js","defaults","desk/model.json","docs","config.js","webpack.app.js"],configTplPath="templates/config.js.tpl",configFilePath="config.js";