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

mix.react('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
mix.react('resources/js/main.js', 'public/js');
mix.react('resources/js/checkout.js', 'public/js');
mix.react('resources/js/dashboard.js', 'public/js');
mix.react('resources/js/register.js', 'public/js');


