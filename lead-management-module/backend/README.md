# Lead Management Module - Backend

## Overview
This backend module is built using Node.js, Express, and MongoDB. It provides a RESTful API for managing leads, including functionalities for creating and retrieving lead information.

## Project Structure
```
backend
├── src
│   ├── controllers        # Contains the logic for handling API requests
│   │   └── leadController.js
│   ├── models             # Contains the Mongoose models for MongoDB
│   │   └── leadModel.js
│   ├── routes             # Contains the route definitions for the API
│   │   └── leadRoutes.js
│   └── app.js             # Entry point for the Express application
├── package.json           # NPM configuration file
├── .env                   # Environment variables for the application
└── README.md              # Documentation for the backend module
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd lead-management-module/backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up your environment variables in the `.env` file:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   PORT=5000
   ```

### Running the Application
To start the backend server, run:
```
npm start
```
The server will run on the specified port (default is 5000).

### API Endpoints
- `POST /api/leads` - Create a new lead
- `GET /api/leads` - Retrieve all leads

## Contributing
Feel free to submit issues or pull requests to improve the backend module.

## License
This project is licensed under the MIT License.