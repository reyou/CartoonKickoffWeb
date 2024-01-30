const express = require('express');
const app = express();
const path = require('path');
const port = 3000; // You can use any available port

// Serve static files from Build and TemplateData directories
app.use('/Build', express.static(path.join(__dirname, 'Build')));
app.use('/TemplateData', express.static(path.join(__dirname, 'TemplateData')));

// Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
