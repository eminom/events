
var getContentTypeFromFileName = function(name){
	var suffix = '';
	var lpos = name.lastIndexOf('.');
	if(lpos>=0){
		suffix = name.substr(lpos+1);
	}

	var rv_type = 'text/plain';
	switch(suffix.toLowerCase()){
	case 'dat':
	case 'txt':
		rv_type = 'text/plain';
		break;
	case 'jpg':
		rv_type = 'image/jpg';
		break;
	case 'png':
		rv_type = 'image/png';
		break;
	case 'zip':
		rv_type = 'application/zip';
		break;
	case 'json':
		rv_type = 'application/json';
		break;
	}
	return rv_type;
};

module.exports = getContentTypeFromFileName;
