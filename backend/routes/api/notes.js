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
    const { title, content, notebookId } = req.body;
    // need to pass in something like ~req.notebook.id
    const note = await Note.createNew( title, content, req.user.id, notebookId );
    return res.json(note);
}));

// Get all notes: GET /api/notes
router.get('/', requireAuth, asyncHandler( async(req, res) => {
    const notes = await Note.findAll();
    return res.json(notes);
}));

// Delete a note: DELETE /api/notes/:id
router.delete('/:id', asyncHandler( async(req, res) => {
    const noteId = await Note.deleteOne(Number(req.params.id));
    return res.json(noteId);
}));

// Edit a note: PUT /api/notes/:id
router.put('/:id', requireAuth, asyncHandler( async(req, res) => {
    const id = Number(req.params.id);
    const { title, content, notebookId } = req.body;
    const note = await Note.findOne({
        where: { id: id }
    })
    await note.update({ title, content, notebookId });
    return res.json(note);
}));

// Get(search) a note: GET /api/notes/:id
router.get('/:id', requireAuth, asyncHandler( async(req, res) => {
    const note = await Note.findByPk(Number(req.params.id));
    return res.json(note);
}));


module.exports = router;