import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins({ // Паттерны имен для подгружаемых плагинов
    pattern: [
        'gulp-*',
        'imagemin-*',
    ],
});

const config = {
    public: {
        base: 'public',
        images: 'public/build/img',
        images_tmp: 'public/build/img/tmp',
        copy: 'public/build/copy',
        favicon: 'public',
    },
    private: {
        base: 'private',
        images: ['!private/**/favicon/**/*.*', '!private/**/svg/', '!private/**/img/tmp/', 'private/**/img/*.*'],
        svg_files: 'private/_heplers/sprite/svg/*.svg',
        images_tmp: ['private/**/img/tmp/**/*.*'],
        copy: ['private/**/copy/**/*.*'],
        favicon: ['!private/**/favicon/**/*.twig', 'private/**/favicon/**/*.*'],
    },
    key: {
        tiny: 'n-8QEukUa_oZhj4D83yr8twchr3pxaNd', // Ключ для оптимизации изображений (https://tinypng.com/developers)
    },
};

// Функция для подключения тасков
function getTask(taskName) {
    return require(`./gulp-tasks/${taskName}`)(gulp, plugins, config);
}

// Подключаем нужные таски
gulp.task('img', getTask('gulp_tasks__img'));
gulp.task('copy', getTask('gulp_tasks__copy'));
gulp.task('favicon', getTask('gulp_tasks__favicon'));
gulp.task('sprite', getTask('gulp_tasks__svg_sprite'));

// Build
gulp.task('default', ['img', 'copy', 'favicon', 'sprite']);
