const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// controllers
const {
	getMemeById,
	createMeme,
	getMeme,
	getAllMemes,
	updateMeme,
	deleteMeme,
} = require("./controller");

// params
router.param("memeId", getMemeById);

// routes
/**
 * @swagger
 * components:
 *   schemas:
 *     Meme:
 *       type: object
 *       required:
 *         - name
 *         - caption
 *         - url
 *       properties:
 *         id:
 *           type: ObjectId
 *         name:
 *           type: string
 *         caption:
 *           type: string
 *         url:
 *           type: string
 *         likes:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /memes:
 *   post:
 *     summary: Create new meme.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               caption:
 *                 type: string
 *                 description: meme's caption.
 *                 example: string
 *               url:
 *                 type: string
 *                 description: string
 *     responses:
 *       200:
 *         description: Ok
 */
router.post(
	"/memes",
	[
		check("name")
			.isLength({ min: 3 })
			.withMessage("name should be atleast 3 chars"),
		check("caption")
			.isLength({ min: 3 })
			.withMessage("caption should be atleast 5 chars"),
	],
	createMeme
);

/**
 * @swagger
 * /memes/{id}:
 *   get:
 *     summary: Get meme from id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok
 */
router.get("/memes/:memeId", getMeme);

/**
 * @swagger
 *
 * /memes:
 *   get:
 *     summary: Get All Memes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *
 */
router.get("/memes", getAllMemes);

/**
 * @swagger
 * /memes/{id}:
 *   patch:
 *     summary: Edit a meme
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *                 description: meme's caption.
 *                 example: string
 *               url:
 *                 type: string
 *                 description: string
 *     responses:
 *       200:
 *         description: Ok
 */
router.patch("/memes/:memeId", updateMeme);

/**
 * @swagger
 * /memes/{id}:
 *   delete:
 *     summary: Delete meme from id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok
 */
router.delete("/memes/:memeId", deleteMeme);
module.exports = router;
