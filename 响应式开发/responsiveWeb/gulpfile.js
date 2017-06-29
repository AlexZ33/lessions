var gulp =require('gulp');
var rev = require('gulp-rev');  //该插件给文件添加版本号  hash码
var revReplace = require('gulp-rev-replace');//更改index.html中的引用
var useref = require('gulp-useref');//
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');//压缩js代码
var csso = require('gulp-csso');//压缩css

gulp.task('default',function() {
  var jsFilter = filter('**/*.js', {restore: true});
  var cssFilter = filter('**/*.css',{restore: true});
  var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});

  return gulp.src('src/index.html')

     .pipe(useref())
     .pipe(jsFilter)
     .pipe(uglify())
     .pipe(jsFilter.restore)
     .pipe(cssFilter)
     .pipe(csso())
     .pipe(cssFilter.restore)
     .pipe(indexHtmlFilter)
     .pipe(rev())
     .pipe(indexHtmlFilter.restore)
     .pipe(revReplace())
     .pipe(gulp.dest('dist'));
});
