//js/library.js

// METHODES ===============================
//	- Deplacement des fichiers
//	- Formatage des noms de fichiers
//	- Vérification de la présence de cover
//	- Enregistrement incrémental dans DB
//=========================================

// INCLUDES ===============================
	var fs = require('fs');
	var path = require('path');
	var mm = require('music-metadata');
	var mongoose = require('mongoose');
	const util = require('util');

// VARIABLES ==============================
	var d = "public/downloads";
	var l = "./public/library";
	var newPath;

// DEBUG
	mongoose.connect('mongodb://mediauser:bonjour+123@192.168.1.202:27017/mediaserver');

// DB MODELS ==============================
	var Track = mongoose.model('Track', 
	{
		artist : String,
		year : String,
		album : String,
		title : String,
		number : Number,
		genre : String,
		path : String,
		image : Buffer,
		format : String
	});

// FUNCTIONS ==============================
	function addNewFiles()
	{		
		console.log('LIBRARY : SEARCHING FOR NEW FILES');
		fs.readdir(d, function(err, files)
		{
			if(err)
			{
				throw err;
			}

			// Traitement des fichiers
			files.map(function(file)
			{
				return path.join(d, file);
			}).filter(function(file)
			{
				return fs.statSync(file).isFile();
			}).forEach(function(file)					
			{
				mm.parseFile(file, {native:true})
					.then(function(metadata)
					{
						f = path.join(l,metadata.common.artist, metadata.common.album);
						if(!fs.existsSync(path.join(l, metadata.common.artist)))
						{
							fs.mkdirSync(path.join(l, metadata.common.artist));
							if(!fs.existsSync(f))
							{
								fs.mkdirSync(f);
							}
						}

						newPath = path.join(f, metadata.common.title + path.extname(file));

						fs.rename(file, newPath, function(err)
						{
							if(err)
							{
								throw err;
							}
						});
						updateDB(metadata, newPath);
					})
					.catch(function(err)
					{
						console.error(err.message);
					}
				);	
			});
		});
	}

	function updateDB(metadata, filePath)
	{
		//AJOUTER LA GESTION DES DOUBLONS
		Track.create({
			artist : metadata.common.artist,
			year: metadata.common.year,
			album : metadata.common.album,
			title : metadata.common.title,
			number : metadata.common.track.no,
			genre : metadata.common.genre,
			path : filePath,
			image : metadata.common.picture[0].data,
			format : metadata.common.picture[0].format
		});
		console.log('LIBRARY : Adding ' + metadata.common.title + ' to DB.');
	}

module.exports = {
	addNewFiles: function()
	{
		addNewFiles();
	}
};