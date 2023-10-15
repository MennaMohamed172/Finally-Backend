const express = require('express');
const app = express();

// Sample article data
const articles = [
  {
    id: 1,
    title: 'Introduction to Node.js',
    content: 'Node.js is a runtime environment that allows you to run JavaScript...',
    author: 'John Doe',
    timestamp: new Date(),
  },
  // Add more articles here
];

// Route to display a list of article previews
app.get('/articles', (req, res) => {
  res.send(`
    <h1>Article Previews</h1>
    <ul>
      ${articles.map(article => `
        <li>
          <h2>${article.title}</h2>
          <p>${article.content.slice(0, 100)}...</p>
          <p>Author: ${article.author}</p>
          <p>Published: ${article.timestamp.toLocaleDateString()}</p>
          <a href="/articles/${article.id}">Read More</a>
        </li>
      `).join('')}
    </ul>
  `);
});

// Route to display the full article
app.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) {
    res.status(404).send('Article not found');
    return;
  }

  res.send(`
    <h1>${article.title}</h1>
    <p>${article.content}</p>
    <p>Author: ${article.author}</p>
    <p>Published: ${article.timestamp.toLocaleDateString()}</p>
    <a href="/articles">Back to Articles</a>
  `);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
