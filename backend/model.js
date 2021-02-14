const mongoose = require("mongoose");
const { Schema } = mongoose;

// Meme object schema
const memeSchema = Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		caption: {
			type: String,
			trim: true,
			required: true,
			maxlength: 100,
		},
		url: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
        id: {
            type: String,
        }
	},
	{ timestamps: true }
);

memeSchema.pre('save',function(next){
    this.id=this._id;
    next();
})

module.exports = mongoose.model("Meme", memeSchema);
