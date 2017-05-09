/**
 * Created by gmena on 07-26-14.
 */
var dir_finder = require ('findit') ('app/config/'),
	path = require ('path'),
	util = require ('util');

dir_finder.on ('directory', function (dir, stat, stop) {
	"use strict";
	if ( dir == 'app/config/' )
		stop ();


	var _enviroment = require (path.relative (dir, '.') + '/' + dir + '/init'),
		_conf = require (path.relative (dir, '.') + '/app/config/' + _enviroment.setting.env + '/init'),
		_combiner = require ('./lib/combiner');

	if ( typeof _conf.files.js.src != 'undefined' )
		if ( util.isArray (_conf.files.js.src) )
			if ( _conf.files.js.src.length > 0 ) {
				_conf.files.js.src.splice (0, 0, 'app/config/init');
				_combiner.fileList (_conf.files.js.src, _conf.files.js.output);
			}

	_combiner.make ();
	_combiner.minify ();
});
