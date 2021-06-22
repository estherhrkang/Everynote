// create Express server
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create note validator
const validateCreateNote = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title for this note.')
];
// Create note: POST /api/notes
router.post('/', validateCreateNote, requireAuth, asyncHandler( async(req, res) => {
    const { title, content } = req.body;
    const note = await Note.createNew( title, content, req.user.id );
    return res.json(note);
}));

// Get all notes: GET /api/notes
router.get('/', requireAuth, asyncHandler( async(req, res) => {
    const notes = await Note.findAll();
    return res.json(notes);
}));

// Delete a note: DELETE /api/notes/:id
router.delete('/:id', requireAuth, asyncHandler( async(req, res) => {
    const noteId = await Note.deleteOne(Number(req.params.id));
    return res.json(noteId);
}));

// Edit a note: PATCH /api/notes/:id
// router.patch('/:id', requireAuth, asyncHandler( async(req, res) => {
//     const note = await Note.updateOne(req.body);
//     return res.json(note);
// }));

// Get(search) a note: GET /api/notes/:id


module.exports = router;