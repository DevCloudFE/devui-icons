var gulp = require('gulp');
var fs = exports.fs = require('fs');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var template = require('gulp-template');

var runSequence = require('run-sequence');
var cssUrls = require('gulp-css-urls');

var fontName = 'devui-icomoon';
var devUIFontDir = './icomoon/';
var runTimestamp = Math.round(Date.now() / 1000);

gulp.task('iconfont',  function () {
    gulp.src(devUIFontDir + 'svg/**/*.svg')
        .pipe(iconfontCss({
            fontName: fontName,
            path: './templates/_icon.less',
            targetPath: '../devui-icon.css',
            cssClass: 'icon',
            fontPath:  'fonts/',
            centerHorizontally: true,
            cacheBuster: runTimestamp, 
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: [ 'svg','ttf', 'eot', 'woff'],
            normalize: true,
            fontHeight:1001,
            cacheBuster: runTimestamp, 
        })).on('glyphs', function(glyphs, options) {
            console.log(glyphs, options);
        })
        .pipe(gulp.dest( './icomoon/fonts'));
});

function getIcons( dir) {
    let opIcons = [];
    if(fs.existsSync("./" + dir)) {
    	opIconsTmp = fs.readdirSync("./" + dir);
        opIconsTmp.map(function (icon) {
            if(icon.endsWith(".svg") ) {
                opIcons.push(icon.replace(/\.\w+$/, ''));
            }
        });
    }
    console.log(opIcons);
    return opIcons;
}

gulp.task('demo', function () {
    let dirname = './';

    gulp.src(`${dirname}/templates/index.html`)
        .pipe(template({ 
            opIcons: getIcons("icomoon/svg/op"), 
            statusIcons: getIcons("icomoon/svg/status"),
            cssName: 'devui-icon',
        }))
        .pipe(gulp.dest(".")); 
});

