"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n.default=e,n}function installDependencies(e){var n=Promise.resolve();if(e){var r=e.packages,t=e.scripts;if(r&&r.length>0){var i="";r.forEach(function(e){var n=e.version&&e.version.trim().length>0?"@"+e.version.trim():"";i+=e.name+n+" "}),n=n.then(function(){if(i=i.substr(0,i.length-1),i&&i.length>0)return(0,_npmUtils.installPackages)(i,config.getProjectDir())})}t&&!(0,_lodash.isEmpty)(t)&&(n=n.then(function(){return(0,_npmUtils.appendScripts)(t,config.getProjectDir())}))}return n}function saveGenerated(e,n){return installDependencies(e).then(function(){var e=[];return n.forEach(function(n){e.push((0,_fileManager.ensureFilePath)(n.outputFilePath).then(function(){return(0,_fileManager.writeFile)(n.outputFilePath,n.sourceCode,!1)}))}),Promise.all(e)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.installDependencies=installDependencies,exports.saveGenerated=saveGenerated;var _lodash=require("lodash"),_configuration=require("../configuration.js"),config=_interopRequireWildcard(_configuration),_fileManager=require("../commons/fileManager.js"),_npmUtils=require("../commons/npmUtils.js");