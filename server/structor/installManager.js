"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n.default=t,n}function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function downloadDistr(t){var n=_utils.config.getProjectDir();return client.download(t).then(function(e){var r=_path2.default.join(n,"__metaDistr.tar.gz").replace(/\\/g,"/"),o=_path2.default.join(n,META_DISTR_DIR_NAME).replace(/\\/g,"/");return _utils.commons.writeBinaryFile(r,e).then(function(){return _utils.commons.unpackTarGz(r,o)}).then(function(){return _utils.commons.readDirectoryFlat(o).then(function(n){if(n){var e=n.dirs;if(e&&1===e.length)return e[0].path}throw _utils.commons.removeFile(r),Error("Downloaded tarball has wrong structure. Check the ulr: "+t)})}).then(function(t){return _utils.commons.removeFile(r).then(function(){return{innerDirPath:t,tempDirPath:o}})})})}function cleanDistr(){var t=_path2.default.join(_utils.config.getProjectDir(),META_DISTR_DIR_NAME);return _utils.commons.isExisting(t).then(function(){return _utils.commons.removeFile(t)}).catch(function(t){})}function preInstall(t,n){var e=[],r=void 0,o=void 0,i=void 0;return t?(r=t,i=Promise.resolve()):n&&(i=downloadDistr(n).then(function(t){r=t.innerDirPath})),i.then(function(){return _utils.commons.readJson(_path2.default.join(r,"structor-namespaces.json"))}).then(function(t){o=t}).then(function(){var t=_path2.default.join(r,"modules");return _utils.commons.isExisting(t).then(function(){return _utils.commons.readDirectoryFlat(t).then(function(t){var n=t.dirs;if(!n||n.length<=0)throw Error("Modules directory is empty");return n})}).catch(function(t){return[]})}).then(function(t){if(t&&t.length>0)return _utils.storage.getComponentTree().then(function(n){t.forEach(function(t){n.modules&&n.modules[t.name]&&e.push(t.name)})})}).then(function(){return{namespacesSrcDirPath:r,existingNamespaceDirs:e}})}function installFromDir(t){var n=_path2.default.join(t,"structor-namespaces.json"),e=_path2.default.join(t,"modules"),r=_path2.default.join(t,"defaults"),o=_path2.default.join(t,"docs"),i=_path2.default.join(t,".structor"),u=_path2.default.join(_utils.config.appDirPath(),"modules"),s=_utils.config.componentDefaultsDirPath(),a=_utils.config.docsComponentsDirPath(),c=_utils.config.deskModelFilePath(),l=void 0,h=void 0;return _utils.commons.readJson(n).then(function(t){l=t}).then(function(){return _utils.storage.installDependencies(l.dependencies)}).then(function(){return _utils.storage.getComponentTree()}).then(function(t){h=t;var n=[],r=h.reducersSourceCode,o=h.sagasSourceCode,i=void 0,u=void 0;return(0,_lodash.forOwn)(l.namespaces,function(t,s){i=_path2.default.join(e,s,"reducer.js"),u=_path2.default.join(e,s,"sagas.js"),n.push(_utils.commons.isExisting(i).then(function(){return _utils.commons.isExisting(u)}).then(function(){r=_utils.gengine.injectReducer(r,t.reducerPropName,t.reducerPropName+"Reducer",_path2.default.join("modules",s,"reducer.js")),o=_utils.gengine.injectSaga(o,s+"Sagas",_path2.default.join("modules",s,"sagas.js"))}))}),Promise.all(n).then(function(){return _utils.commons.writeFile(h.reducersFilePath,r)}).then(function(){return _utils.commons.writeFile(h.sagasFilePath,o)})}).then(function(){return _utils.commons.isExisting(e).then(function(){return _utils.commons.readDirectoryFlat(e).then(function(t){var n=t.dirs;if(!n||n.length<=0)throw Error("Modules directory is empty");return n})}).catch(function(t){return[]})}).then(function(t){var n=[];return t.forEach(function(t){var e=_path2.default.join(u,t.name);n.push(_utils.commons.removeFile(e).then(function(){return _utils.commons.copyFile(t.path,e)}))}),Promise.all(n)}).then(function(){return _utils.commons.isExisting(r).then(function(){return _utils.commons.readDirectoryFlat(r).then(function(t){var n=t.dirs;if(!n||n.length<=0)throw Error("Defaults directory is empty");return n})}).catch(function(t){return[]})}).then(function(t){var n=[],e=h.indexSourceCode;return t.forEach(function(t){var r=_path2.default.join(s,t.name);n.push(_utils.commons.removeFile(r).then(function(){return _utils.commons.copyFile(t.path,r)}).then(function(){return e=_utils.gengine.injectNamespaceComponent(e,t.name,_path2.default.join("modules",t.name)),_utils.commons.writeFile(h.indexFilePath,e)}))}),Promise.all(n)}).then(function(){return _utils.commons.isExisting(o).then(function(){return _utils.commons.readDirectoryFlat(o).then(function(t){var n=t.dirs;if(!n||n.length<=0)throw Error("Docs directory is empty");return n})}).catch(function(t){return[]})}).then(function(t){var n=[];return t.forEach(function(t){var e=_path2.default.join(a,t.name);n.push(_utils.commons.removeFile(e).then(function(){return _utils.commons.copyFile(t.path,e)}))}),Promise.all(n)}).then(function(){return _utils.commons.readJson(_path2.default.join(i,"model.json")).then(function(t){if(t&&t.pages)return _utils.storage.readProjectJsonModel().then(function(n){if(n){n.pages=n.pages||[];var e=void 0;return t.pages.forEach(function(t){e=n.pages.findIndex(function(n){return n.pagePath===t.pagePath}),e<0?n.pages.push(t):n.pages[e]=t}),_utils.commons.writeJson(c,n)}})}).catch(function(t){})}).then(function(){return cleanDistr()}).catch(function(t){return cleanDistr().then(function(){throw t})})}function getMarketList(){return client.get("https://raw.githubusercontent.com/chalecao/fed-maker-market/master/index.json").then(function(t){return t})}function getGHRepoInfo(t,n){var e="https://api.github.com/repos/"+n+"/"+t;return client.get(e).then(function(e){return _extends({gitHubRepo:t,gitHubOwner:n},(0,_lodash.pick)(e,["description","html_url","stargazers_count","open_issues_count"]))}).then(function(t){return client.get(e+"/releases").then(function(n){var e=[];return n&&n.length>0&&n.forEach(function(t){e.push(_extends({},(0,_lodash.pick)(t,["name","tarball_url"])))}),Object.assign({},t,{releases:e})})}).then(function(t){return client.get(e+"/contents").then(function(n){var e=void 0;if(n&&n.length>0){var r=n.find(function(t){return t.name&&t.name.indexOf("screenshot")>=0});r&&(e=r.download_url)}return Object.assign({},t,{screenshotUrl:e})})}).catch(function(e){return console.log(e),{gitHubRepo:t,gitHubOwner:n,error:""+e}})}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t};exports.cleanDistr=cleanDistr,exports.preInstall=preInstall,exports.installFromDir=installFromDir,exports.getMarketList=getMarketList,exports.getGHRepoInfo=getGHRepoInfo;var _path=require("path"),_path2=_interopRequireDefault(_path),_lodash=require("lodash"),_utils=require("../utils"),_clientGH=require("../commons/clientGH.js"),client=_interopRequireWildcard(_clientGH),META_DISTR_DIR_NAME=".structor-namespaces-distr";