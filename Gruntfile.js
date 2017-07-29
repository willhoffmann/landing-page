/*!
 * Test Frontend Gruntfile
 */
module.exports = function (grunt) {

    // Require
    // --------------------------------------

    //Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //Load grunt tasks automatically
    require('jit-grunt')(grunt);


    // Init Grunt config
    // --------------------------------------

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Define our source and build folders
        // ---------------------------------
        build:     'app',
        css_build: '<%= build %>/css',
        js_build:  '<%= build %>/js',

        src:       '_source',
        css_src:   '<%= src %>/styl',
        js_src:    '<%= src %>/js',


        // Task: Stylus
        // ---------------------------------
        stylus: {
            options: {
                compress: false,
                use: [
                    function() {
                        return require('autoprefixer-stylus')('last 2 versions', 'ie 8', 'ie 9');
                    }
                ]
            },
            compile: {
                files: {
                    '<%= css_build %>/main.css': '<%= css_src %>/main.styl'
                }
            }
        },


        // Task: CSSMin
        // ---------------------------------
        cssmin: {
            options: {
                compatibility: 'ie8',
                sourceMap: false,
                noAdvanced: true
            },
            build: {
                files: {
                    "<%= css_build %>/vendor.min.css": ["./bower_components/bootstrap/dist/css/bootstrap.css"]
                }
            }
        },


        // Task: Uglify
        // -----------------------------
        uglify: {
            options: {
                mangle: true,
                compress : true,
                preserveComments: 'some'
            },
            build: {
                files: {
                    "<%= js_build %>/vendor.min.js": [
                        "./bower_components/jquery/dist/jquery.js",
                        "./bower_components/bootstrap/dist/js/bootstrap.js",
                        "./bower_components/angular/angular.js"
                    ]
                }
            }
        },


        // Task: Express
        // -----------------------------
        express: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    bases: ['app/'],
                    livereload: true
                }
            }
        },


        // Task: Watch
        // -----------------------------
        watch: {
            options: {
                interval: 200,
                livereload: true
            },

            stylus: {
                files: [
                    '<%= css_src %>/*.styl'
                ],
                tasks: ['styl']
            }
        }
    });


    // Grunt registers
    // --------------------------------------

    // Stylus
    grunt.registerTask( 'styl', ['stylus']);

    // Css
    grunt.registerTask( 'css', ['cssmin']);

    // Js
    grunt.registerTask('js', ['uglify']);

    // Server
    grunt.registerTask('server', ['express','watch']);

    // Watch
    grunt.registerTask( 'default', ['watch']);
};