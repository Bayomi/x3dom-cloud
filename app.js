//Defining express framework and other libraries variables
var express = require("express"),
    app     = express(),
    stream = express(),
    port1 = 3333,
    port2 = 1337,
    qs = require('querystring'),
    bs = require( "body-parser"),
    Firebase = require("firebase");

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
        writeFile(vrmlProgram, res);
        //getStdin(res);
       /*var data = req.body;
        var vrmlProgram = data['value'];
        child.send(vrmlProgram);
        child.on('message', function(message) {
            programOutput = message;
            res.render('X3Dprogram',{programOutput});
        });*/
    });

    function writeFile(content, res) {
        fs.writeFile("test2.wrl", content, function(err) {
            if(err) {
                return console.log(err);
            }
            getStdin(res);
        }); 
    };

    function getStdin(callback) {
        child = exec('java -jar binX3D.jar test2.wrl newshape.x3d',
          function (error, stdout, stderr){
            console.log(stdout);
            callback.send(stdout);
            //console.log('stderr: ' + stderr);
            if(error !== null){
              console.log('exec error: ' + error);
            }
        });     
    }


    console.log('Request received');
    console.log('Server running at port:' + port1);

app.listen(port1);