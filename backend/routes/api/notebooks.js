// create Express server
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Notebook } = require('../../db/models');
const { Note } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create notebook validator
const validateCreateNotebook = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title for this notebook.')
];
// Create notebook: POST /api/notebooks
router.post('/', validateCreateNotebook, requireAuth, asyncHandler( async(req, res) => {
    const { title } = req.body;
    const notebook = await Notebook.createNew( title, req.user.id );
    return res.json(notebook);
}));

// Get all notebooks: GET /api/notebooks
router.get('/', requireAuth, asyncHandler( async(req, res) => {
    const notebooks = await Notebook.findAll();
    return res.json(notebooks);
}));

// Delete a notebook: DELETE /api/notebooks/:id
router.delete('/:id', requireAuth, asyncHandler( async(req, res) => {
    const notebookId = await Notebook.deleteOne(Number(req.params.id));
    return res.json(notebookId);
}));

// Edit a notebook: PATCH /api/notebooks/:id
router.patch('/:id', requireAuth, asyncHandler( async(req, res) => {
    const notebook = await Notebook.updateOne(Number(req.params.id));
    return res.json(notebook);
}));

// Get(search) a notebook: GET /api/notebooks/:id
router.get('/:id', requireAuth, asyncHandler( async(req, res) => {
    const notebook = await Notebook.findByPk(Number(req.params.id));
    return res.json(notebook);
}));

// Get a notebook with notes: GET /api/notebooks/:id/notes
router.get('/:notebookid/notes', requireAuth, asyncHandler( async(req, res) => {
    const notebookid = Number(req.params.id);
    const notes = await Note.findAll({ where: { notebookId: notebookid }});
    return res.json(notes);
}));

module.exports = router;