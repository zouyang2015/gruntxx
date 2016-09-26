module.exports = function(grunt) {

	var sassStyle = 'expanded';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			output: {
				options: {
					style: sassStyle
				},
				files: {
		            //用'./scss/style.scss'生成'./style.css'
					//sass依赖 ruby和sass
					'./style.css': './scss/style.scss'
				}
			}
		},
		concat: {
			options: {
				//separator: ';'
			},
			dist: {
				src: ['./src/plugin.js','./src/plugin2.js'],
				dest: './global.js'
			}
		},
		jshint: {
			all: ['./global.js']
		},
		uglify: {
			compressjs: {
				files: {
					'./global.min.js': ['./global.js']
				}
			}
		},
		watch: {
			//监听JS，如果变了，执行合并，检查，压缩
			script: {
				files: ['./src/plugin.js','./src/plugin2.js'],
				tasks: ['concat','jshint','uglify']
			},
			//监听scss
			sass: {
				files: ['./scss/style.scss'],
				tasks: ['sass']
			},
			//监听html,css.js文件，如变动，livereload自动刷新打开页面
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: ['index.html','style.css','./global.min.js']
			}
		},
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				hostname: 'localhost'
			},
			server: {
				options: {
					port: 9001,
					//当前目录为服务器根目录
					base: './'
				}
			}
		}
	});

	//插件加载
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	//任务注册
	grunt.registerTask('outputcss', ['sass']);
	grunt.registerTask('concatjs', ['concat']);
	grunt.registerTask('compressjs', ['concat','jshint','uglify']);
	grunt.registerTask('watchit', ['sass','concat','jshint','uglify','connect','watch']);
	grunt.registerTask('default');

};