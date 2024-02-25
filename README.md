# Machine State Visualization Tool

## Overview
This project provides an intuitive user interface for visualizing the states of machinery over a given period. By analyzing power draw data (`Psum`) from equipment, users can determine when a machine is off, on but unloaded, idle, or loaded. This aims to help users understand equipment utilization, tool change times, and identify opportunities for efficiency improvement.

## Features
- **State Visualization**: Displays machine states (Off, On-Unloaded, On-Idle, On-Loaded) based on `Psum` values.
- **Period Selection**: Allows users to select a specific period for analysis.
- **Efficiency Insights**: Offers insights into equipment utilization and suggestions for efficiency improvements.

## Technologies Used
- **Frontend**: React
- **Chart Library**: Chart.js
- **Backend**: Node.js
- **Data Storage**: Demo data processed from `demoPumpDayData.csv`

## Getting Started

### Prerequisites
- Node.js
- npm 

### Installation
1. Clone the repository:
https://github.com/saiteja-g/TakeHomeProject.git

2. Navigate to the project directory:
cd path/to/project

3. Install dependencies:
  - For backend (it's in a directory named `backend`):
  ```
  cd ../backend
  npm install
  ```

  - For frontend (it's in a directory named `frontend`):
  ```
  cd frontend
  npm install
  ```


### Running the Project
1. Start the backend server:
cd ../backend
node server.js

- The server will run on `http://localhost:5000` by default.
2. Start the frontend application:
cd ../frontend
npm start

- The application will open on `http://localhost:3000` by default.

## API Specification
- **GET `/api/machine-states`**: Fetches machine states for a given period.
- **Parameters**:
 - `startDate`: Start of the period.
 - `endDate`: End of the period.

## Usage
- Navigate to `http://localhost:3000`.
- Select a start and end date to visualize the machine states.
- The chart displays the machine's operational status within the selected timeframe.
