const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the file path using path module
const moviesFilePath = path.join(__dirname, 'data', 'movies.txt');

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Home Route
  if (pathname === '/' || pathname === '/home') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>🎬 Welcome to Leo Movie Booking</h1>
      <ul>
        <li><a href="/movies">Movies</a></li>
        <li><a href="/booking?movie=Leo">Booking</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    `);
  }

  // Movies Route → read movies from file
  else if (pathname === '/movies') {
    fs.readFile(moviesFilePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading movies file.');
      } else {
        const movies = data.split('\n').filter(line => line.trim() !== '');
        const movieList = movies.map(m => `<li>${m}</li>`).join('');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <h2>🎥 Available Movies</h2>
          <ul>${movieList}</ul>
          <p><b>File Path:</b> ${moviesFilePath}</p>
        `);
      }
    });
  }

  // Booking Route → read movie from query
  else if (pathname === '/booking') {
    const query = parsedUrl.query;
    const movie = query.movie || 'Unknown';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h2>✅ Booking confirmed for: ${movie}</h2>`);
  }

  // Contact Route
  else if (pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h2>📞 Contact us at: leobooking@movies.com</h2>');
  }

  // 404 Page
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h2>404 - Page Not Found</h2>');
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🎬 Leo Movie Booking Server running at http://localhost:${PORT}`);
});
