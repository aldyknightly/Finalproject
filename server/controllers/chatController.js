const axios = require('axios');

exports.handleChat = async (req, res) => {
  const message = req.body.message;
  const file = req.file;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: message }] }]
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    if (file) {
      res.json({ reply, file: { originalname: file.originalname, mimetype: file.mimetype, path: file.path } });
    } else {
      res.json({ reply });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
