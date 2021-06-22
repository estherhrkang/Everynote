// create Express server
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create note validator

// Create note: POST /api/notes

// Get all notes: GET /api/notes

// Delete a note: DELETE /api/notes/:id

// Edit a note: PATCH /api/notes/:id

// Get(search) a note: GET /api/notes/:id

module.exports = router;