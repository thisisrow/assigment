# Lead Management Module

This project is a simple lead management module that consists of a frontend built with React and Tailwind CSS, and a backend built with Node.js, Express, and MongoDB. The application allows users to capture and manage leads through a user-friendly interface.

## Project Structure

```
lead-management-module
├── frontend          # Frontend application
│   ├── src          # Source files for the React application
│   │   ├── components # React components
│   │   │   ├── LeadForm.tsx  # Component for capturing lead information
│   │   │   └── LeadList.tsx  # Component for displaying captured leads
│   │   ├── pages    # Page components
│   │   │   └── Home.tsx  # Main page integrating LeadForm and LeadList
│   │   ├── App.tsx  # Main application component
│   │   └── index.tsx # Entry point of the React application
│   ├── public       # Public assets
│   │   └── index.html # Main HTML file
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── package.json # Frontend dependencies and scripts
│   └── README.md    # Frontend documentation
├── backend           # Backend application
│   ├── src          # Source files for the Node.js application
│   │   ├── controllers # Controllers for handling API requests
│   │   │   └── leadController.js # Controller for lead-related requests
│   │   ├── models   # Mongoose models
│   │   │   └── leadModel.js # Model for lead documents
│   │   ├── routes   # API routes
│   │   │   └── leadRoutes.js # Routes for lead-related endpoints
│   │   └── app.js   # Entry point of the backend application
│   ├── package.json  # Backend dependencies and scripts
│   ├── .env         # Environment variables for the backend
│   └── README.md    # Backend documentation
└── README.md        # Overall project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and go to `http://localhost:3000` to view the application.

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Create a `.env` file and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Usage

- Use the lead capture form to submit new leads.
- View the list of captured leads displayed on the main page.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.