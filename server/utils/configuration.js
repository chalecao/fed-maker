"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function setupProjectPaths(e){var t=_path2.default.join(e,SERVICE_DIR).replace(/\\/g,"/");config.project.paths={dir:e,configFilePath:_path2.default.join(t,"config.js").replace(/\\/g,"/"),webpackConfigFilePath:_path2.default.join(t,"webpack.app.js").replace(/\\/g,"/"),deskIndexFilePath:_path2.default.join(t,"app","components.js").replace(/\\/g,"/"),deskReducersFilePath:_path2.default.join(t,"app","reducers.js").replace(/\\/g,"/"),deskSagasFilePath:_path2.default.join(t,"app","sagas.js").replace(/\\/g,"/"),componentDefaultsDirPath:_path2.default.join(t,"defaults").replace(/\\/g,"/"),docsComponentsDirPath:_path2.default.join(t,"docs").replace(/\\/g,"/"),gengineDirPath:_path2.default.join(t,"gengine").replace(/\\/g,"/"),scaffoldsDirPath:_path2.default.join(t,"gengine","scaffolds").replace(/\\/g,"/"),applicationGeneratorDirPath:_path2.default.join(t,"gengine","application").replace(/\\/g,"/"),sandboxGeneratorDirPath:_path2.default.join(t,"gengine","sandbox").replace(/\\/g,"/"),sandboxDirPath:_path2.default.join(e,SANDBOX_DIR),deskSourceDirPath:_path2.default.join(t,"src").replace(/\\/g,"/"),deskPageFilePath:_path2.default.join(t,"src","PageForDesk.js").replace(/\\/g,"/"),deskEntryPointFilePath:_path2.default.join(t,"src","default.js").replace(/\\/g,"/"),docsDirPath:_path2.default.join(t,"docs").replace(/\\/g,"/"),docsReadmeFilePath:_path2.default.join(t,"docs","Readme.md").replace(/\\/g,"/"),nodeModulesDirPath:_path2.default.join(e,"node_modules").replace(/\\/g,"/"),deskModelFilePath:_path2.default.join(t,"desk","model.json").replace(/\\/g,"/"),deskDirPath:_path2.default.join(t,"desk").replace(/\\/g,"/")}}function checkPaths(e){var t=Promise.resolve([]),r=-1;return(0,_lodash.forOwn)(e,function(e,o){r=(0,_lodash.findIndex)(tempDirs,function(t){return e.indexOf(t)>=0}),r<0&&(t=t.then(function(t){return(0,_fileManager.isExisting)(e).then(function(){return t}).catch(function(e){return t.push(e),t})}))}),t}function checkProjectDir(){return checkPaths(config.project.paths)}function loadProjectConfig(){var e=config.project.paths,t=e.configFilePath,r=e.dir,o=require(t);if(config.project.conf=Object.assign({},o),!o.srcPath||!r)throw Error('"srcPath" field is missing in Structor config object.');config.project.paths.appDirPath=_path2.default.join(r,o.srcPath).replace(/\\/g,"/"),config.project.paths.appAssetsDirPath=_path2.default.join(r,o.srcPath,"assets").replace(/\\/g,"/")}function changePropertyValue(e,t,r){var o=e.body;if(o&&o.length>0){var n=void 0;if(o.forEach(function(e){if("ExpressionStatement"===e.type&&e.expression&&"AssignmentExpression"===e.expression.type&&e.expression.left&&e.expression.right&&"ObjectExpression"===e.expression.right.type){var t=e.expression.left,r=t.type,o=t.object,a=t.property;"MemberExpression"===r&&o&&a&&"module"===o.name&&"exports"===a.name&&(n=e.expression.right.properties)}}),n){var a=void 0;n.length>0&&(a=n.find(function(e){return e.key&&e.key.name===t})),a&&a.value?(a.value.value=r,a.value.row='"'+r+'"'):(a={type:"Property",key:{type:"Identifier",name:t},computed:!1,value:{type:"Literal",value:r,raw:'"'+r+'"'},kind:"init",method:!1,shorthand:!1},n.push(a))}}}function rewriteProjectConfigOption(e,t){return(0,_fileManager.readFile)(config.project.paths.configFilePath).then(function(r){(0,_lodash.set)(config.project.conf,e,t);var o=(0,_utils.parse)(r);return changePropertyValue(o,e,t),(0,_fileManager.writeFile)(config.project.paths.configFilePath,(0,_utils.generate)(o))})}function setProjectDir(e){setupProjectPaths(e)}function reinit(){var e=getProjectDir();return init(e)}function init(e,t,r){return config.status=void 0,config.debugMode=r,(0,_fileManager.checkDirIsEmpty)(e).then(function(){return config.status=EMPTY,EMPTY}).catch(function(r){return setProjectDir(e),checkProjectDir().then(function(e){if(e.length>0){var t="";throw e.forEach(function(e){t+=e+"\n"}),Error(t)}}).then(function(){var e=_path2.default.join(t,"package.json");return(0,_fileManager.readJson)(e).then(function(e){config.server.packageConf.version=e.version})}).then(function(){return loadProjectConfig(),config.status=READY,READY})})}function getProjectDir(){return config.project.paths.dir}function status(){return config.status}function getDebugMode(){return config.debugMode}function asObject(){return(0,_lodash.cloneDeep)(config)}function appDirPath(){return config.project.paths.appDirPath}function webpackConfigFilePath(){return config.project.paths.webpackConfigFilePath}function deskEntryPointFilePath(){return config.project.paths.deskEntryPointFilePath}function deskDirPath(){return config.project.paths.deskDirPath}function deskModelFilePath(){return config.project.paths.deskModelFilePath}function deskSourceDirPath(){return config.project.paths.deskSourceDirPath}function deskIndexFilePath(){return config.project.paths.deskIndexFilePath}function deskReducersFilePath(){return config.project.paths.deskReducersFilePath}function deskSagasFilePath(){return config.project.paths.deskSagasFilePath}function nodeModulesDirPath(){return config.project.paths.nodeModulesDirPath}function componentDefaultsDirPath(){return config.project.paths.componentDefaultsDirPath}function docsComponentsDirPath(){return config.project.paths.docsComponentsDirPath}function templatesDirPath(){return config.project.paths.templatesDirPath}function getProjectConfig(){return(0,_lodash.cloneDeep)(config.project)}function projectProxyURL(e){return arguments.length>0?void rewriteProjectConfigOption("proxyURL",e):config.project.conf.proxyURL}function appAssetsDirPath(){return config.project.paths.appAssetsDirPath}function gengineDirPath(){return config.project.paths.gengineDirPath}function scaffoldsDirPath(){return config.project.paths.scaffoldsDirPath}function applicationGeneratorDirPath(){return config.project.paths.applicationGeneratorDirPath}function sandboxGeneratorDirPath(){return config.project.paths.sandboxGeneratorDirPath}function sandboxDirPath(){return config.project.paths.sandboxDirPath}Object.defineProperty(exports,"__esModule",{value:!0}),exports.EMPTY=exports.READY=exports.SANDBOX_DIR=exports.SERVICE_DIR=void 0,exports.reinit=reinit,exports.init=init,exports.getProjectDir=getProjectDir,exports.status=status,exports.getDebugMode=getDebugMode,exports.asObject=asObject,exports.appDirPath=appDirPath,exports.webpackConfigFilePath=webpackConfigFilePath,exports.deskEntryPointFilePath=deskEntryPointFilePath,exports.deskDirPath=deskDirPath,exports.deskModelFilePath=deskModelFilePath,exports.deskSourceDirPath=deskSourceDirPath,exports.deskIndexFilePath=deskIndexFilePath,exports.deskReducersFilePath=deskReducersFilePath,exports.deskSagasFilePath=deskSagasFilePath,exports.nodeModulesDirPath=nodeModulesDirPath,exports.componentDefaultsDirPath=componentDefaultsDirPath,exports.docsComponentsDirPath=docsComponentsDirPath,exports.templatesDirPath=templatesDirPath,exports.getProjectConfig=getProjectConfig,exports.projectProxyURL=projectProxyURL,exports.appAssetsDirPath=appAssetsDirPath,exports.gengineDirPath=gengineDirPath,exports.scaffoldsDirPath=scaffoldsDirPath,exports.applicationGeneratorDirPath=applicationGeneratorDirPath,exports.sandboxGeneratorDirPath=sandboxGeneratorDirPath,exports.sandboxDirPath=sandboxDirPath;var _path=require("path"),_path2=_interopRequireDefault(_path),_lodash=require("lodash"),_fileManager=require("./commons/fileManager.js"),_utils=require("./commons/utils.js"),SERVICE_DIR=exports.SERVICE_DIR=".maker",SANDBOX_DIR=exports.SANDBOX_DIR=".maker-sandbox",READY=exports.READY="ready-to-go",EMPTY=exports.EMPTY="dir-is-empty",config={status:void 0,debugMode:!1,project:{paths:{},conf:{}},server:{paths:{},packageConf:{}}},tempDirs=[SANDBOX_DIR];