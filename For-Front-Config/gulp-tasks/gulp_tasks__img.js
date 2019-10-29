module.exports = function (gulp, plugins, config) {
    return function () {
        const filterForTiny = plugins.filter(['*/**/*.{png,jpg,jpeg}'],
            { restore: true });
        const filterForImagemin = plugins.filter(['*/**/*.{svg,gif}'],
            { restore: true });

        gulp.src(config.private.images)
            .pipe(filterForImagemin)
            .pipe(plugins.imagemin({
                progressive: true,
                use: [plugins.imageminPngquant()],
            }))
            .pipe(filterForImagemin.restore)
            .pipe(filterForTiny)
            .pipe(plugins.tinypngCompress({
                key: config.key.tiny,
                summarise: true,
                log: true,
            }))
            .pipe(filterForTiny.restore)
            .pipe(plugins.flatten({ includeParents: 0 }))
            .pipe(gulp.dest(`${config.public.images}`));

        // Задача для временных изображений
        gulp.src(config.private.images_tmp)
            .pipe(plugins.flatten({ includeParents: 0 }))
            .pipe(gulp.dest(`${config.public.images_tmp}`));
    };
};
