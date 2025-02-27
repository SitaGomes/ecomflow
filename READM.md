# How to run

## Frontend

1. **Navigate to the Frontend Folder**

```bash
    cd frontend
```

2. **Install Dependencies & Run the Project**

```bash
    pnpm i && pnpm dev
```

## Backend

1. **Navigate to the Backend Folder**

```bash
    cd backend
```

2. **Install Dependencies & Run the Project**

```bash
    pnpm i && pnpm dev
```

# Architecture

## Frontend

This project uses Next.js along with shadcn and Tailwind CSS for styling. Form handling is powered by react-hook-form and Zod for validation. Data visualization is managed with Recharts, and file uploads are handled using React Dropzone.

- app
  - page: This is where the main components are rendered, including the form, drag-and-drop file upload, and the chart.
- components
  - ui: Contains default shadcn components.
  - file-upload: Implements a React Dropzone component that accepts only .csv files.
  - treshold-form: The form built with react-hook-form and validated with Zod.
  - inventory-chart: A chart component that integrates Recharts with shadcn styling for a polished look.
- lib
  - services
    - inventory: Provides services that communicate with the backend (e.g., handleUploadAsync and handleFormatAsync). These are separated into a "server" environment for better performance and security.
    - api: Contains the base URL for API calls. In a production environment, I'd typically configure a JWT authentication and store the URL in an .env file.
    - utils: A utility file (from shadcn) used for merging Tailwind CSS classes.

## Backend

The backend is built with NestJS to provide a structured and organized approach. An inventory module is implemented, which includes a controller, service, and module to handle our core functionalities.

- inventory
  - controller
    - /upload: Receives the CSV file and stores it in memory.
    - /calculate: Accepts threshold parameters and returns the calculated results.
  - service
    - parseCSV: Parses the CSV file and extracts the necessary data.
    - calculateThresholds: Performs the threshold calculations based on the provided data.
