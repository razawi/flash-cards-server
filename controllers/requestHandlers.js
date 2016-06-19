var path = require('path');
var fs = require ("fs");
var prettyjson = require('prettyjson');
var request = require("request");


function defaultHandler(response, filePath){
	
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}

	// testpath = "./public/apps/SaySo-client/freelancer-mobile/partials/1";
	
	fs.readFile(filePath, function(error, content) {
		if (error) {
			console.log("fs.readFile error: " + error);
			response.writeHead(500);
			response.end();
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content, 'utf-8')
		}
	});
}

exports.defaultHandler = defaultHandler;