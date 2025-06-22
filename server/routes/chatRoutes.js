const express = require('express');
const { handleChat } = require('../controllers/chatController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('file'), handleChat);

module.exports = router;
