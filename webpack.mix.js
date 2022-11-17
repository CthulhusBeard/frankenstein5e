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

    mix.copyDirectory('public/css', 'export/css');
    mix.copyDirectory('public/data', 'export/data');
    mix.copyDirectory('public/fonts', 'export/fonts');
    mix.copyDirectory('public/images', 'export/images');
    mix.copyDirectory('public/js', 'export/js');
    mix.copyDirectory('node_modules', 'export/node_modules');
    mix.copy('public/favicon.ico', 'export/favicon.ico');
    mix.copy('resources/views/encounter-builder.html', 'export/index.html');
}

