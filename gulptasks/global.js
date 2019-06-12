var fs = exports.fs = require('fs');
var path = exports.path = require('path');
exports.merge = require('merge-stream');
exports.rename = require('gulp-rename');
exports.gulpif = require('gulp-if'); 
var argv = exports.argv = require('yargs').argv;
exports.isDev = !!argv.dev;
exports.dir = argv.dir || '';
exports.header = require('gulp-header');

exports.msg = {
	ok: "\n  _______  ___   _  \n |       ||   | | | \n |   _   ||   |_| | \n |  | |  ||      _| \n |  |_|  ||     |_  \n |       ||    _  | \n |_______||___| |_| \n",
	error: "\n  ______ _____  _____   ____  _____   \n |  ____|  __ \\|  __ \\ / __ \\|  __ \\  \n | |__  | |__) | |__) | |  | | |__) | \n |  __| |  _  /|  _  /| |  | |  _  /  \n | |____| | \\ \\| | \\ \\| |__| | | \\ \\  \n |______|_|  \\_\\_|  \\_\\\\____/|_|  \\_\\ \n",
	robot: "\n  _____   ____  ____   ____ _______ \n |  __ \\ / __ \\|  _ \\ / __ \\__   __|\n | |__) | |  | | |_) | |  | | | |   \n |  _  /| |  | |  _ <| |  | | | |   \n | | \\ \\| |__| | |_) | |__| | | |   \n |_|  \\_\\\\____/|____/ \\____/  |_|   \n \n ",
	sorrow: "(works;) !!!",
}

exports.getFolders =  function (dir) {
	return fs.readdirSync(dir)
			.filter(function(file) {
				if (file.indexOf('_') === 0 || file.indexOf('.') === 0 ) {
					return false;
				} else {
					return fs.statSync(path.join(dir, file)).isDirectory();
				}
			});
};