const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

if(mix.inProduction()) {
    mix.minify('public/js/app.js');

    mix.copyDirectory('public/css', 'export/cthulhusbeard.github.io/css');
    mix.copyDirectory('public/data', 'export/cthulhusbeard.github.io/data');
    mix.copyDirectory('public/fonts', 'export/cthulhusbeard.github.io/fonts');
    mix.copyDirectory('public/images', 'export/cthulhusbeard.github.io/images');
    mix.copyDirectory('public/js', 'export/cthulhusbeard.github.io/js');
    //mix.copyDirectory('node_modules', 'export/cthulhusbeard.github.io/node_modules');
    mix.copy('public/favicon.ico', 'export/cthulhusbeard.github.io/favicon.ico');
    mix.copy('resources/views/encounter-builder.html', 'export/cthulhusbeard.github.io/index.html');
}

