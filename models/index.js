const express = require('express');
const app = express();

// Set up endpoint to handle saving a draft
app.post('/articles/draft', (req, res) => {
  // Retrieve article data from request body
  const articleData = req.body;

  // Save article as a draft (implement your logic here to save in database, file, or any other storage)
  saveArticleAsDraft(articleData);

  res.send('Article saved as draft successfully!');
});

// Set up endpoint to handle publishing an article
app.post('/articles/publish', (req, res) => {
  // Retrieve article data from request body
  const articleData = req.body;

  // Publish the article (implement your logic here to publish the article)
  publishArticle(articleData);

  res.send('Article published successfully!');
});

// Set up endpoint to handle previewing an article
app.get('/articles/preview/:articleId', (req, res) => {
  // Retrieve article ID from request parameters
  const articleId = req.params.articleId;

  // Fetch the article from the database or any storage based on the ID
  const article = fetchArticleById(articleId);

  // Render the article to display the preview (implement your logic here to render the article)
  const previewHtml = renderArticlePreview(article);

  res.send(previewHtml);
});

// Example functions to simulate the saving, publishing, and previewing logic
function saveArticleAsDraft(articleData) {
  // Save the article as a draft (replace with your actual implementation)
  console.log('Saving article as draft:', articleData);
}

function publishArticle(articleData) {
  // Publish the article (replace with your actual implementation)
  console.log('Publishing article:', articleData);
}

function fetchArticleById(articleId) {
  // Fetch the article by ID from database or storage (replace with your actual implementation)
  console.log('Fetching article with ID:', articleId);

  // Return placeholder article for demonstration purpose
  return {
    id: articleId,
    title: 'Sample Article',
    content: 'This is a sample article',
  };
}

function renderArticlePreview(article) {
  // Render the article as HTML for preview (replace with your actual implementation)
  console.log('Rendering article preview:', article);

  // Return placeholder preview HTML for demonstration purpose
  return `
    <html>
      <head>
        <title>${article.title} - Preview</title>
      </head>
      <body>
        <h1>${article.title}</h1>
        <p>${article.content}</p>
      </body>
    </html>
  `;
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});