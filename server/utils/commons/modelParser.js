"use strict";function getModelComponentMap(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(o[e.type]={},e.props&&(0,_lodash.forOwn)(e.props,function(e,t){(0,_lodash.isObject)(e)&&e.type&&getModelComponentMap(e,o)}),e.children&&e.children.length>0)for(var t=0;t<e.children.length;t++)getModelComponentMap(e.children[t],o);return o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getModelComponentMap=getModelComponentMap;var _lodash=require("lodash");