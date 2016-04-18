var exec = require('child_process').exec, child;
var fs = require('fs');

var write_user_input_to_file = function(content_string){
	var unique_filename = get_random_filename();
	var user_file = "bin/" + unique_filename + ".wlr";
	fs.appendFile(user_file, content_string, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
	return user_file;
}
var get_random_filename = function(filename){
	var filename = "";
	var possible_characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < 5; i++ )
        filename += possible_characters.charAt(Math.floor(Math.random() * possible_characters.length));
    return filename;
}

process.on('message', function(message){
	var user_unique_file = write_user_input_to_file(message);  
	if (user_unique_file != null){
	var user_input = "java -jar bin/binX3D.jar " + user_unique_file + " bin/newfile.x3d";
	}
	else{
		console.log("file é null viu");
	}
	child = exec(user_input,
		function(error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error != null){
				console.log('exec error' + error);
			}
			process.send(stdout);
	});
});