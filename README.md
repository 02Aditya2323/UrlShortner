# URL Shortener

A Node.js-based URL shortener with user authentication, analytics, and secure password handling.

## Features
- Shorten long URLs to easy-to-share links
- User authentication with JWT (JSON Web Tokens)
- Passwords securely hashed with bcrypt
- Each user sees only their own generated URLs
- URL visit analytics (click tracking)
- EJS templating for server-rendered pages

## Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- bcrypt for password hashing
- EJS for views

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/<your-username>/urlShortner.git
   cd urlShortner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start MongoDB (if running locally):
   ```sh
   mongod
   ```
4. Start the server:
   ```sh
   node index.js
   ```
5. Visit [http://localhost:8080](http://localhost:8080) in your browser.

## Usage
- **Sign up** for a new account
- **Log in** to generate and manage your short URLs
- **View analytics** for each URL (click count, visit history)

## Security Notes
- Passwords are hashed using bcrypt before storage
- JWTs are used for stateless authentication
- Rate limiting and CSRF protection are recommended for production deployments

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE) 