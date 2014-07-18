

// Resource file handlers
var fs = require('fs');
var path = require('path');
var url = require('url');
var getContentType = require('./parse_type');
var df = require('./delayconfig.js');


function dispatchFile(request, response){
	var parse_result = url.parse(request.url, true);
	var pathname = parse_result.pathname

	var now = path.join(__dirname, pathname);
	fs.stat(now, function(err, stat){
		if(err){
			response.writeHead(500, {'Content-Type':'text/plain'});
			response.write('Cannot read ' + now);
			response.end();
			return;
		}

		var delay = Math.floor(Math.random() * df.delayVar + df.delayFixed);
		var castHandler = function() {
			if(stat.isFile()){
				var rs = fs.createReadStream(now);
				var content_type = getContentType(pathname);
				response.writeHead(200, {
					'Content-Type':content_type
				});
				rs.pipe(response);
			} else {
				response.writeHead(500,{'Content-Type':'text/plain'});
				response.end();
				return;
			}
		};
		if(delay<=0){
			castHandler();
		} else {
			setTimeout(castHandler, delay * 1000);
		}
	});
}

module.exports.handler = dispatchFile;