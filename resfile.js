// Resource file handlers

var fs = require('fs');
var path = require('path');
var url = require('url');
var getContentType = require('./parse_type');

function requestForFile(lead, request, response){
	var parse_result = url.parse(request.url, true);
	var ver_p  = parse_result.query.ver;
	var file_p = parse_result.query.file;
	if ( !file_p || !ver_p ){
		response.writeHead(500, {'Content-Type':'text/plain'});
		response.write('No file parameters');
		response.end();
		return;
	}

	//sub = '/res/' + ver_p + '/' + file_p;
	sub = '/resfolder/res/' + file_p;
	//console.log(sub);
	var now = path.join(__dirname, sub);
	fs.stat(now, function(err, stat){

		//
		if(err){
			response.writeHead(500, {'Content-Type':'text/plain'});
			response.write('Cannot read ' + now);
			response.end();
			return;
		}

		if(stat.isFile()){
			var rs = fs.createReadStream(now);
			var content_type = getContentType(file_p);
			response.writeHead(200, {
				'Content-Type':content_type
			});
			rs.pipe(response);
		} else {
			response.writeHead(500,{'Content-Type':'text/plain'});
			response.end();
			return;
		}
	});
}

module.exports.handler = requestForFile;