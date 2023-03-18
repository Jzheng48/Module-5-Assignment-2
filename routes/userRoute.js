const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

// Route to display sign-up form
router.get('/signup', userController.register);

// Route to handle sign-up form submission
router.post('/signup', [
    body('name').isLength({ min: 2 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
], userController.signup);

// Route to handle login
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], userController.login);

// Route to handle logout
router.get('/logout', userController.logout);

module.exports = router;
