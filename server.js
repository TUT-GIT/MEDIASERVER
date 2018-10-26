// server.js

    // includes ====================================================================
        var express     = require('express');
        var app         = express();     
        var morgan      = require('morgan');             
        var bodyParser  = require('body-parser');    
        var MPlayer     = require('mplayer');
        var library		= require('./js/library.js');
        var formidable	= require('formidable');
        var fs 			= require('fs');

    // variables ===================================================================
        var player = new MPlayer();

    // configuration ===============================================================
        app.use(express.static(__dirname + '/public'));
        app.use(morgan('dev')); 
        app.use(bodyParser.urlencoded({'extended':'true'}));            
        app.use(bodyParser.json());                                
        app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // routes ======================================================================
    
    	// api - player ------------------------------------------------------------
        	//Server sided - play ..................................................
            	app.get('/api/serverPlay', function(req, res){
                    player.play();
                    res.send('SERVER: serverPlay');
            	});
            //Server sided - pause .................................................
                app.get('/api/serverPause', function(req, res){
                    player.pause();
                    res.send('SERVER: serverPause');
                });
            //Server sided - stop ..................................................
                app.get('/api/serverStop', function(req, res){
                    player.stop();
                    res.send('SERVER: serverStop');
                });
            //Server sided - previous ..............................................
                app.get('/api/serverPrevious', function(req, res){
                    res.send('SERVER: serverPrevious');
                });
            //Server sided - next ..................................................
                app.get('/api/serverNext', function(req, res){
                    res.send('SERVER: serverNext');
                });
            //Server sided - setVolume .............................................
                app.get('/api/serverSetVolume', function(req, res){
                    res.send('SERVER: setVolume');
                });
            //Server sided - setSong ...............................................
                app.get('/api/serverSetSong', function(req, res){
                    res.send('SERVER: setSong');
                });
            //Server sided - addSong ...............................................
                app.get('/api/serverAddSong', function(req, res){
                    res.send('SERVER: addSong');
                });

		// api - library -----------------------------------------------------------
            // UploadFiles .........................................................
                app.post('/fileupload', function(req, res){
                    var form = new formidable.IncomingForm();
                    form.parse(req, function(err, fields, files)
                    {
                    	var oldPath = files.filetoupload.path;
                    	var newPath = './public/downloads/' + files.filetoupload.name;
                    	fs.rename(oldPath, newPath, function(err)
                    	{
                    		if(err) throw err;
                    		console.log('SERVER: Files uploaded successfully');
                    	});
                    });
                    res.sendfile('./public/index.html');
                });		
            //UpdateLibrary ........................................................
                app.get('/api/updateLibrary', function(req, res){
                	console.log('updateLibrary');
                	library.addNewFiles();
                    res.send('SERVER: updateLibrary');
                });

	// application -----------------------------------------------------------------
    	app.get('*', function(req, res) {
    	    res.sendfile('./public/index.html'); 
    	});

    // listen (start app with node server.js) ======================================
        app.listen(8080);
        console.log("App listening on port 8080");