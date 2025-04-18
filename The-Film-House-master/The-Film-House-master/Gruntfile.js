module.exports = function (grunt) {

    "use strict";

    // this saves us having to load each plugin individually
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        less: {
            development: {
                options: {
                    strictMath: true,
                    strictUnits: true,
                    cleancss: true
                },
                files: {
                    "style.css": "styles/style.less"
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ["last 2 version"]
                },
                src: "style.css",
                dest: "style.css"
            },
        },

        csslint: {
            options: {
                csslintrc: ".csslintrc"
            },
            strict: {
                src: ["style.css"]
            }
        },

        cssmin: {
            minify: {
                src: "style.css",
                dest: "style.css"
            }
        },

        jshint: {
            options: {
                globals: {
                    Spinner: true,
                    Modernizr: true
                }
            },
            all: [
                ".jshintrc",
                "Gruntfile.js",
                "js/project.js"
            ]
        },

        concat: {
            dist: {
                src: [
                    "js/bower/jquery/jquery.js",
                    "js/bower/modernizr/modernizr.js",
                    "js/bower/spinjs/spin.js",
                    "js/bower/echojs/dist/echo.js",
                    "js/bower/fitvids/jquery.fitvids.js",
                    "js/bower/hammerjs/dist/jquery.hammer.js",
                    "js/bower/flexslider/jquery.flexslider.js",
                    "js/bower/jquery-form/jquery.form.js",
                    "js/plugins/jquery.spin.js",
                    "js/plugins/jquery.easing.js",
                    "js/plugins/waitForImages.js",
                    "js/plugins/superslides.js",
                    "js/project.js"
                ],
                dest: "js/production.js"
            }
        },

        uglify: {
            my_target: {
                files: {
                    "js/production.js": ["js/production.js"]
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: "img/",
                    src: ["*.{png,jpg,gif}"],
                    dest: "img/"
                }]
            }
        },

        watch: {
            css: {
                files: "styles/*.less",
                tasks: "buildcss"
            },
            scripts: {
                files: [
                    "js/project.js",
                    "Gruntfile.js"
                ],
                tasks: "buildjs"
            }
        },

        notify: {
            notify_hooks: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 5,
                }
            },
            js: {
                options: {
                    title: "Back of the net!",
                    message: "Javascript build successful!"
                }
            },
            less: {
                options: {
                    title: "Cashback!",
                    message: "LESS build successful!"
                }
            }
        }

    });

    // List of available tasks
    grunt.registerTask("default", []);
    grunt.registerTask("buildcss", ["less", "autoprefixer", "csslint", "cssmin", "imagemin", "notify:less"]);
    grunt.registerTask("buildjs", ["jshint", "concat", "uglify", "notify:js"]);

};
