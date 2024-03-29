module.exports = function (gulp, plugins, config) {
    return function () {
        gulp.src(config.private.favicon)
            .pipe(plugins.flatten({ includeParents: 0 }))
            .pipe(gulp.dest(`${config.public.favicon}`));
    };
};
