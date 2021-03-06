/**
 * Created by JetBrains PhpStorm.
 * User: Geolffrey Mena
 * Date: 06-15-13
 * Time: 02:56 PM
 * To change this template use File | Settings | File Templates.
 */

/**Require*/
var _fs = require ('fs'),
	_uglify = require ('uglify-js');

var Combine = function () {
	this.output = null;
	this.list = []
	this.encoding = 'utf-8';
};

//Read a Dir
Combine.prototype.fileDir = function (_dir) {
	var _self = this;
	if ( _fs.existsSync (_dir + '/config/init.js') ) {
		var _src = require (_fs.realpathSync (_dir + '/config/init.js'));

		if ( _src.files.js ) {
			var _root = _dir.split ('/').pop ();

			_self.list.push (_dir + '/' + _root);
			for ( var r in _src.files.js.src )
				_self.list.push (_dir + '/' + _src.files.js.src[r]);
		}
	}

};

//Read File List
Combine.prototype.fileList = function (_src, _output, append) {
	var _self = this;
	_src.map (function (path) {
		if ( _fs.existsSync (path + '.js') ) {
			_self.list.push (path)
		} else if ( _fs.existsSync (path) ) {
			_self.fileDir (path)
		}
	});

	_self.output = _output;

};

Combine.prototype.make = function () {
	var _self = this,
		_out = this.list.map (function (path) {
			if ( _fs.existsSync (path + '.js') )
				return _fs.readFileSync (path + '.js', _self.encoding)
		});

	_fs.writeFileSync (_self.output + '.js', _out.join ('\n'), _self.encoding);
};

//Minify
Combine.prototype.minify = function () {
	var _self = this,
		_output = _uglify.minify (_self.output + '.js');

	_fs.writeFileSync (_self.output + '.min.js', _output.code, _self.encoding);
	console.log (' ' + _self.output + ' built.');


};


module.exports = new Combine;