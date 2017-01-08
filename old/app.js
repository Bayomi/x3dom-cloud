//Defining express framework and other libraries variables
var express = require("express"),
    app     = express(),
    stream = express(),
    port1 = 3333,
    port2 = 1337,
    qs = require('querystring'),
    bs = require( "body-parser");

var fs = require('fs');
var exec = require('child_process').exec, child;

//CORS middleware - Allow Cross Origin requests
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // NOT SAFE FOR PRODUCTION
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    next();
}

    //use the allowCrossDomain function and bodyparsing for the stream and app objects
    app.use(allowCrossDomain);
    app.use(express.static(__dirname));

    //bodyParser(); is now deprecated, so it is necessary to to call the specific functions
    //json() and urlencoded({})
    app.use(bs.json());
    app.use(bs.urlencoded({
      extended: true
    }));

    app.post('/', function(req,res){
        //getStdin(res.send);
        //res.send("oi");
        var data = req.body;
        var vrmlProgram = data['value'];
        getStdin(vrmlProgram, res);
        //getStdin(res);
       /*var data = req.body;
        var vrmlProgram = data['value'];
        child.send(vrmlProgram);
        child.on('message', function(message) {
            programOutput = message;
            res.render('X3Dprogram',{programOutput});
        });*/
    });

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

    var getStdin = function(message, callback){
        var user_unique_file = write_user_input_to_file(message);  
        if (user_unique_file != null){
             var user_input = "java -jar bin/testX3D.jar " + user_unique_file + " bin/newfile.x3d";
        }
        else{
            console.log("file é null viu");
        }
        child = exec(user_input,
            function(error, stdout, stderr){
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                callback.send(stdout);
                if (error != null){
                    console.log('exec error' + error);
                }
                console.log(stdout);
        });
    };

    /*function writeFile(content, res) {
        fs.writeFile("test2.wrl", content, function(err) {
            if(err) {
                return console.log(err);
            }
            fs.close();
            getStdin(res);
        }); 
    };*/

    /*function getStdin(callback) {
        child = exec('java -jar binX3D.jar test2.wrl newshape.x3d',
          function (error, stdout, stderr){
            console.log(stdout);
            callback.send(stdout);
            //console.log('stderr: ' + stderr);
            if(error !== null){
              console.log('exec error: ' + error);
            }
        });     
    }*/


    console.log('Request received');
    console.log('Server running at port:' + port1);

app.listen(port1);