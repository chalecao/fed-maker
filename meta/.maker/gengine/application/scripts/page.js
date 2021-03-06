'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFile = getFile;

var _lodash = require('lodash');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('fed-maker/server/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFile(dataObject, templateText) {
    var index = dataObject.index,
        pagesModel = dataObject.pagesModel,
        hasApplicationFiles = dataObject.hasApplicationFiles,
        project = dataObject.project,
        metadata = dataObject.metadata;


    if (!(0, _lodash.has)(project, 'paths.appDirPath')) {
        throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
    }

    var result = [];

    if (pagesModel && pagesModel.length > 0) {
        pagesModel.forEach(function (srcModel) {
            var componentName = srcModel.pageName;

            var _gengine$prepareModel = _utils.gengine.prepareModelWithImports(index, srcModel, null),
                imports = _gengine$prepareModel.imports,
                model = _gengine$prepareModel.model;

            var absoluteComponentFilePath = _path2.default.join(project.paths.appDirPath, 'routes', componentName + '.js');

            var templateObject = {
                model: model, imports: imports, componentName: componentName, metadata: metadata
            };

            var resultSource = void 0;
            try {
                resultSource = (0, _lodash.template)(templateText)(templateObject);
            } catch (e) {
                throw Error('lodash template error. ' + e);
            }

            try {
                resultSource = _utils.commons.formatJs(resultSource);
                resultSource = resultSource.replace(/(^\s*[\r\n]){2,}/gm, "\n");
            } catch (e) {
                throw Error('JavaScript syntax error. ' + e + '\n[Source code:]\n' + resultSource);
            }

            result.push({
                outputFilePath: absoluteComponentFilePath,
                sourceCode: resultSource
            });
        });
    }
    return result;
}