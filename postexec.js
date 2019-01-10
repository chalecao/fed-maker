/*
 * Copyright 2017 Alexander Pustovalov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var path = require('path');
var PACKAGE_NAME = 'fed-maker';
var NODE_DIR_NAME = 'node_modules';
var META_REPO_NAME = 'meta';
var META_REPO_ARCHIVE_EXT = '.tar.gz';
var META_REPO_URL = 'https://github.com/chalecao/fed-maker-' + META_REPO_NAME;
var META_REPO_ARCHIVE_URL = META_REPO_URL + '/archive';

// var currentDir = process.cwd();
// if (!currentDir.match(NODE_DIR_NAME)) {
// 	currentDir = __dirname
// }
var currentDir = __dirname;

if (currentDir) {
	currentDir = currentDir.replace(/\\/g, '/');
}
var pathParts = currentDir.split('/');

var questions = [
	{
		name: 'srcPath',
		message: 'Specify a directory name where the source code of the generated components will be.\n ' +
			'If the directory does not exist in the current project structure it will be created.\n',
		default: 'app',
		validate: (input) => /^\w+$/i.test(input) ? true : 'Alphanumeric value is acceptable only.'
	}
];

var downloadController;
try {
	downloadController = require(currentDir + '/server/structor/downloadManager.js');
} catch (e) {
	// do nothing;
}

if (process.env.npm_config_global) {
	console.error('Structor must be installed locally.');
} else if (downloadController) {
	if (pathParts && pathParts.length > 0) {
		var lastDir = pathParts[pathParts.length - 1];
		console.log("lastDir: ", lastDir)
		if (lastDir === PACKAGE_NAME) {

			let packageVersion = process.env.npm_package_version;
			let appDirPath = ""
			let packageFileName = ""
			// if (packageVersion) {
			// 	const versionParts = packageVersion.split('-');
			// 	let packageFileName = packageVersion + META_REPO_ARCHIVE_EXT;
			// 	if (versionParts.length > 1) {
			// 		packageFileName = versionParts[1] + META_REPO_ARCHIVE_EXT;
			// 	}
			// 	appDirPath = path.resolve(currentDir, '../..');
			// } else {
			META_REPO_ARCHIVE_URL = currentDir
			let package = require(path.resolve(currentDir, 'package.json'))
			packageVersion = package.version;
			packageFileName = META_REPO_NAME;
			
			appDirPath = process.cwd();
			if (appDirPath.match(NODE_DIR_NAME)) {
				appDirPath = path.resolve(appDirPath, '../..');
			}
			// }
			console.log(appDirPath, packageVersion)

			downloadController.checkMetaFolderVersion(appDirPath, packageVersion)
				.then((isVersionMatch) => {
					console.log("isVersionMatch: ", isVersionMatch)

					if (!isVersionMatch) {
						downloadController.downloadMetaDistr(META_REPO_ARCHIVE_URL + '/' + packageFileName, appDirPath)
							.then(paths => {
								return downloadController.updateMetaFolder(paths.innerDirPath, appDirPath)
									.then(() => {
										if (META_REPO_ARCHIVE_URL.match("http")) {
											return downloadController.removeFile(paths.tempDirPath);
										} else {
											return Promise.resolve()
										}
									});
							})
							.then(() => {
								return downloadController.setMetaFolderVersion(appDirPath, packageVersion)
							})
							.then(() => {
								console.log('Meta data folder is updated successfully to the version: ' + packageVersion);
							})
							.catch(error => {
								console.error("Can not download " + META_REPO_ARCHIVE_URL + '/' + packageFileName, error);
							});
					}
				})
				.catch(error => {
					console.log("no init structor, init ...", META_REPO_ARCHIVE_URL, packageFileName)
					downloadController.downloadMetaDistr(META_REPO_ARCHIVE_URL + '/' + packageFileName, appDirPath)
						.then(paths => {
							var inquirer = require('inquirer');
							return inquirer.prompt(questions)
								.then(answers => {
									const options = {
										srcPath: answers.srcPath,
									};
									return downloadController.createMetaFolder(paths.innerDirPath, appDirPath, options);
								})
								.then(() => {
									return downloadController.setMetaFolderVersion(appDirPath, packageVersion)
								})
								.then(() => {
									console.log('Meta data folder is created successfully. Version: ' + packageVersion);
								})
								.catch(error => {
									console.error("Can not download " + META_REPO_ARCHIVE_URL + '/' + packageFileName, error);
								})
								.then(() => {
									if (META_REPO_ARCHIVE_URL.match("http")) {
										return downloadController.removeFile(paths.tempDirPath);
									}
								});
						})
						.catch(error => {
							console.error(error);
						});
				});
		} else {
			// Installation of some local module.
			// do nothing;
		}
	} else {
		console.error('Can not parse current dir path.');
	}
}
