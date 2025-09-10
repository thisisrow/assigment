# Lead Management Module - Frontend

This project is a simple lead management application built with React and Tailwind CSS. It consists of a lead capture form and a lead list to manage leads effectively.

## Project Structure

```
frontend
├── public
│   └── index.html          # Main HTML file for the React application
├── src
│   ├── components
│   │   ├── LeadForm.tsx    # Component for capturing lead information
│   │   └── LeadList.tsx     # Component for displaying a list of leads
│   ├── pages
│   │   └── Home.tsx        # Main page integrating LeadForm and LeadList
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point of the React application
├── tailwind.config.js      # Configuration file for Tailwind CSS
└── package.json            # npm configuration file
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd lead-management-module/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- **Lead Capture Form:** Users can enter lead information, which is validated before submission.
- **Lead List:** Displays a list of captured leads fetched from the backend API.

## Technologies Used

- **React:** For building the user interface.
- **Tailwind CSS:** For styling the application.
- **Axios:** For making API requests to the backend (to be included in package.json).

## Contribution

Feel free to fork the repository and submit pull requests for any improvements or features you would like to add.