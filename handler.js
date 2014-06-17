
var url = require('url');
var routes = {};
var castFile = require('./castfile').handler;

var dispatcher = function(req, res){
	var pathname = url.parse(req.url).pathname;
	basename = getRouteBase(pathname);

	if(typeof(routes[pathname])=='function')
	{
		routes[pathname](req,res);
	} 
	else if(typeof(routes[basename])=='function')
	{
		//
		routes[basename](req,res);
	} 
	else 
	{
		//console.log('cast file >>');
		castFile(req, res)
	}
};

// initiation of routes. 
(function(){
	//latest version
	routes['/version.php'] = require('./getver').handler.bind(null, 'resfolder/version.txt');
	//hash-table-file's MD5
	//routes['verhash'] = require('./getverhash').handler.bind(null, 'resfolder/versionhash.txt');
	//Look up for files
	//routes['jpg'] = require('./jpg').handler.bind(null, '/jpg');
	//routes['file'] = require('./resfile').handler.bind(null, '/file');
	//routes['hash'] = require('./hash').handler.bind(null, true, '/hash');
})();

function getRouteBase(path){
	var lt = 0;
	if(path[0]==='/'){
		lt = 1;
	}
	var rt = path.indexOf('/', lt);
	if(rt<=0){
		rt = path.length;
	}
	return path.substr(lt, rt - lt);
}

//~~~
module.exports.handler = dispatcher;

