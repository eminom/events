
// Module of path_parse

var parseFileNameFromUrl = function (the_path, leading){
	if ( typeof(leading)!=='string') {
		var pos = the_path.indexOf('/');
		var pre = pos;
		while(pos>=0){
			pre = pos;
			pos = the_path.indexOf('/', pos+1);
		}
		if(pre>=0){
			return the_path.substr(pre+1);
		}
	} else {
		if(the_path.indexOf(leading)==0){
			return the_path.substr(leading.length);
		}
	}
	return the_path;
}

module.exports.path_parse = parseFileNameFromUrl;
