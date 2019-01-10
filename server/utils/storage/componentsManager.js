"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function getComponentsStructure(){return fileManager.readFile(config.deskIndexFilePath()).then(function(e){if(!e)throw Error("Components file is empty.");try{return(0,_utils.parse)(e)}catch(e){throw Error("Reading components file error. "+e.message)}})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getComponentsStructure=getComponentsStructure;var _configuration=require("../configuration.js"),config=_interopRequireWildcard(_configuration),_fileManager=require("../commons/fileManager.js"),fileManager=_interopRequireWildcard(_fileManager),_utils=require("../commons/utils.js");