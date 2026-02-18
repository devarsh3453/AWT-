# 📝 Express Todo Application

A fully-featured todo application built with **Express.js** that demonstrates core concepts and best practices in Node.js web development.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete todos
- 🎯 **Filter & Sort**: View all, active, or completed todos
- 💾 **Persistent Storage**: Todos saved to JSON file
- 🎨 **Beautiful UI**: Modern, responsive design
- 🔒 **Input Validation**: Server-side validation for data integrity
- ⚡ **RESTful API**: Well-structured API endpoints
- 📱 **Mobile Friendly**: Works on all device sizes
- 🛡️ **Error Handling**: Comprehensive error handling and middleware

## Express.js Concepts Demonstrated

### 1. **Middleware**
   - `express.json()` - Parse JSON request bodies
   - `express.static()` - Serve static files (HTML, CSS, JS)
   - Custom error handling middleware

### 2. **Routing**
   - GET routes for retrieving data
   - POST routes for creating data
   - PUT routes for updating data
   - DELETE routes for removing data
   - Route parameters (`/api/todos/:id`)

### 3. **Request/Response Handling**
   - `req.body` - Access request body data
   - `req.params` - Access URL parameters
   - `res.json()` - Send JSON responses
   - `res.status()` - Set HTTP status codes
   - HTTP status codes (200, 201, 400, 404, 500)

### 4. **File Operations**
   - Integration with Node.js `fs` module
   - Reading and writing JSON data

### 5. **Validation & Error Handling**
   - Input validation
   - 404 and error handlers
   - Proper error responses

## Project Structure

```
todo-app/
├── server.js           # Express server and API endpoints
├── package.json        # Project dependencies
├── todos.json          # Data persistence file (auto-created)
└── public/             # Static files
    ├── index.html      # Main HTML page
    ├── styles.css      # CSS styling
    └── app.js          # Client-side JavaScript
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Navigate to the todo-app directory**:
   ```bash
   cd todo-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Get All Todos
```http
GET /api/todos
```
Returns all todos as JSON array.

### Get Specific Todo
```http
GET /api/todos/:id
```
Returns a single todo by ID.

### Create New Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```
Returns the created todo with ID and timestamp.

### Update Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, cheese",
  "completed": false
}
```
Update any fields. Only provided fields are updated.

### Delete Todo
```http
DELETE /api/todos/:id
```
Removes a specific todo.

### Clear Completed Todos
```http
DELETE /api/todos
```
Removes all completed todos.

## Usage Examples

### Using cURL

**Create a todo:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express","description":"Build web apps with Node.js"}'
```

**Get all todos:**
```bash
curl http://localhost:3000/api/todos
```

**Mark todo as complete:**
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a todo:**
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Key Code Highlights

### Static File Serving
```javascript
app.use(express.static('public'));
```

### Middleware for JSON
```javascript
app.use(express.json());
```

### Route with ID Parameter
```javascript
app.get('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  // Process request
});
```

### POST with Validation
```javascript
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }
  // Process request
});
```

### Error Handling Middleware
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});
```

## Data Format

Each todo object has this structure:
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2026-02-04T10:30:00.000Z"
}
```

## Learning Resources

- [Express.js Official Documentation](https://expressjs.com/)
- [Node.js File System Module](https://nodejs.org/api/fs.html)
- [RESTful API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc9110.html#status.codes)

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, modify `server.js`:
```javascript
const PORT = 3001; // Change to another port
```

### Module Not Found
Ensure you've run `npm install`:
```bash
npm install
```

### Todos Not Persisting
Check that `todos.json` exists in the todo-app directory. It's auto-created on first run.

## Future Enhancements

- 🔐 User authentication
- 🗂️ Todo categories/tags
- 🔄 Due dates and reminders
- 🌙 Dark mode
- 📊 Todo statistics
- 🔍 Search functionality
- 👥 Share todos with others

## License

MIT

---

**Happy Coding!** 🚀 This application is a great starting point to understand Express.js fundamentals.
