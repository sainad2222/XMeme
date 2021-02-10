const Meme = require("./model");

// middleware to get meme id and populate request body
exports.getMemeById = (req, res, next, id) => {
	Meme.findById(id).exec((err, foundMeme) => {
		if (err || !foundMeme) {
			console.log(err);
			return res.status(404).json({
				message: "meme not found in DB",
			});
		}
		req.meme = foundMeme;
		next();
	});
};

// controller to create new meme object in database
exports.createMeme = (req, res) => {
	const meme = new Meme(req.body);
	meme.save((err, savedMeme) => {
		if (err || !savedMeme) {
			console.log(err);
			return res.status(409).json({
				message: "Meme already exists or URL too long",
			});
		}
		res.json({ id: savedMeme._id });
	});
};

// controller for fetching the meme in request body populated by middleware
exports.getMeme = (req, res) => {
	return res.json(req.meme);
};

// controller for fetching all memes
exports.getAllMemes = (req, res) => {
	Meme.find().exec((err, memes) => {
		if (err) {
			return res.status(400).json({
				message: "Error occured while fetching memes",
			});
		}
		memes.reverse();
		res.json(memes.slice(0, 100));
	});
};

// controller for likes functionality and edit functionality
exports.updateMeme = (req, res) => {
	const meme = req.meme;
	const updateObj = req.body;
	meme.updateOne({ $set: updateObj }).exec((err, updatedObj) => {
		if (err || !updatedObj) {
			console.log(err);
			return res.status(400).json({
				message: "Updating failed",
			});
		}
		return res.json(updatedObj);
	});
};

// controller to delete a meme(this is just a utility controller)
exports.deleteMeme = (req, res) => {
	const meme = req.meme;
	const passwordObj = req.body;
	meme.deleteOne((err, someRes) => {
		if (err) {
			return res.status(400).json({
				message: "Deletion failed",
			});
		}
		return res.json(someRes);
	});
};
