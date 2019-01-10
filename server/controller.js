"use strict";function _interopRequireWildcard(r){if(r&&r.__esModule)return r;var e={};if(null!=r)for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t]);return e.default=r,e}function _interopRequireDefault(r){return r&&r.__esModule?r:{default:r}}function printError(r,e){r&&console.log(r),console.error(e.message?e.message:e)}function callControllerMethod(r,e,t){var o=e.body.methodName,i=e.body.data||{};r[o]?r[o](i).then(function(r){void 0===r?t.send({data:null}):r.error?t.send({error:!0,errors:r.errors}):t.send({data:r})}).catch(function(r){var e=r.message?r.message:r;t.send({error:!0,errors:[e]})}):t.send({error:!0,errors:["Server does not have method: "+o]})}function initServer(r){var e=r.serverDir,t=r.projectDir,o=r.portNumber,i=r.debugMode,n=r.io,s=r.host,a=s||"localhost";return serverDirPath=e,projectDirPath=t,_structorCommons.config.init(t,e,i).then(function(r){r&&(server.app=(0,_express2.default)(),server.app.use("/maker",_express2.default.static(_path2.default.join(serverDirPath,"static"))),server.appServer=_http2.default.createServer(server.app),n&&(server.ioSocket=n(server.appServer),server.ioSocket.on("connection",function(r){server.ioSocketClient=r,server.ioSocketClient.emit("invitation","Hello from server.")})),server.appServer.listen(o,a,function(){r===_structorCommons.config.READY&&(console.log("Structor has been started successfully."),console.log("\nOpen in the browser: http://"+a+":"+o+"/structor\n"))}),r===_structorCommons.config.READY&&initStructorController())}).catch(function(r){printError("Error happened during server initialization:",r)})}function reinitServer(){return _structorCommons.config.init(projectDirPath).then(function(r){if(r!==_structorCommons.config.READY)throw Error("Server reinitialization should not be provided in empty directory.");return initStructorController(),"OK"})}function initStructorController(){server.app.post("/structor-invoke",_bodyParser2.default.json({limit:"50mb"}),function(r,e){callControllerMethod(structorController,r,e)}),structorController.setServer(server)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.initServer=initServer;var _express=require("express"),_express2=_interopRequireDefault(_express),_http=require("http"),_http2=_interopRequireDefault(_http),_path=require("path"),_path2=_interopRequireDefault(_path),_bodyParser=require("body-parser"),_bodyParser2=_interopRequireDefault(_bodyParser),_structorCommons=require("./structor-commons"),_controller=require("./structor/controller.js"),structorController=_interopRequireWildcard(_controller);require("babel-register");var server={io:void 0,ioSocket:void 0,ioSocketClient:void 0,app:void 0,appServer:void 0,proxy:void 0},serverDirPath=void 0,projectDirPath=void 0;