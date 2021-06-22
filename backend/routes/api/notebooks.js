// create Express server
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Notebook } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create notebook validator
const validateCreateNotebook = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title for this notebook.')
];
// Create notebook: /api/notebooks
router.post('/', validateCreateNotebook, requireAuth, asyncHandler( async(req, res) => {
    const { title } = req.body;
    const notebook = await Notebook.createNew( title, req.user.id );
    return res.json(notebook);
}));

// Get all notebooks: /api/notebooks
router.get('/', requireAuth, asyncHandler( async(req, res) => {
    const notebooks = await Notebook.findAll();
    return res.json(notebooks);
}));

// Delete a notebook: /api/notebooks/:id
router.delete('/:id', requireAuth, asyncHandler( async(req, res) => {
    const notebookId = await Notebook.deleteOne(Number(req.params.id));
    return res.json(notebookId);
}));



module.exports = router;