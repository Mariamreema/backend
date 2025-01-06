const express = require('express');
const Survey = require('../models/Survey'); // Import the Survey model
const router = express.Router();

// POST: Add a new survey
router.post('/', async (req, res) => {
    try {
        const newSurvey = new Survey(req.body); // Create a new survey document
        const savedSurvey = await newSurvey.save(); // Save it to MongoDB
        res.status(201).json(savedSurvey); // Respond with the saved survey
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
});

// GET: Fetch all surveys
router.get('/', async (req, res) => {
    try {
        const surveys = await Survey.find(); // Fetch all surveys from MongoDB
        res.status(200).json(surveys); // Respond with the surveys
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
});

// GET: Fetch a single survey by ID
router.get('/:id', async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id); // Find survey by ID
        if (!survey) return res.status(404).json({ message: 'Survey not found' });
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Remove a survey by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedSurvey = await Survey.findByIdAndDelete(req.params.id);
        if (!deletedSurvey) return res.status(404).json({ message: 'Survey not found' });
        res.status(200).json({ message: 'Survey deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
