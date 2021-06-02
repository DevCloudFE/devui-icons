var gulp = require('gulp');
var fs = exports.fs = require('fs');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var template = require('gulp-template');

var fontName = 'devui-icomoon';
var devUIFontDir = './icomoon/';
var runTimestamp = Math.round(Date.now() / 1000);

gulp.task('iconfont',  function (done) {
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
        done();
});

function getIcons(dir) {
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

gulp.task('demo', function (done) {
    gulp.src(`./templates/index.html`)
        .pipe(template({ 
            meanIcons: getIcons("icomoon/svg/mean"), 
            opIcons: getIcons("icomoon/svg/op"), 
            statusIcons: getIcons("icomoon/svg/status"), 
            commonIcons: getIcons("icomoon/svg/mean/common"),             
            otherIcons: getIcons("icomoon/svg/mean/other"), 
            editorIcons: getIcons("icomoon/svg/editor"), 
            codeEditorIcons: getIcons("icomoon/svg/code-editor"), 
            cssName: 'devui-icon',
        }))
        .pipe(gulp.dest(".")); 
        done();
});

