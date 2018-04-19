#target photoshop

// Script config
var saveAsJpeg = false;
var saveAsPng = true;

// Get the name of the illustration (Note: must be first text layer in layer list)
var nameLayer =  app.activeDocument.layers[0];
var illustrationName = nameLayer.textItem.contents;
nameLayer.visible = false;

// Get the 'COLOR' layer group
var colorGroup = app.activeDocument.layerSets.getByName('COLOR');

// Put all color templates invisible
for (var i=0; i<colorGroup.layers.length; i++) {
	var colorTemplate = colorGroup.layers[i];
	colorTemplate.visible = false;
}

// Go through all color templates and save them with illustration
for (var i=0; i<colorGroup.layers.length; i++) {
	var colorTemplate = colorGroup.layers[i];

	// Generate the resulting file name and path (creates 'output' folder)
	var folder = app.activeDocument.path + '/output/';
	var f = new Folder(folder);
	if(! f.exists ) {
		f.create();
	}
	var filePath = folder + colorTemplate.name + '_' + illustrationName;

	// Save files
	colorTemplate.visible = true;
	if(saveAsPng) {
		file = new File(filePath + '.png');
		var opts = new PNGSaveOptions();
		opts.transparency = true;
		opts.interlaced = false;
		app.activeDocument.saveAs(file, opts, true);
	}

	if(saveAsJpeg) {
		file = new File(filePath + '.jpg');
		var opts = new JPEGSaveOptions();
		opts.quality = 10;
		app.activeDocument.saveAs(file, opts, true);
	}
	colorTemplate.visible = false;
}
alert('Export is done');
