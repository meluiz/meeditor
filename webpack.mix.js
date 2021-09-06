const mix = require('laravel-mix')

mix.js('src/js/meeditor.js', 'dist/meeditor.min.js')
   .sass('src/sass/meeditor.scss', 'dist/meeditor.min.css')