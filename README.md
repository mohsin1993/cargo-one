# React Project with Vite

This is a simple React application that simulates the fetching and showing of shipment offers.
Please note that fakeFetcher returns same dataset everytime.

### Technical stack

MUI for basic styling, TanstackQuery for server side state management and Zod for validation of
filters and fake API response.

### Screenshots

<img width="1680" alt="Screenshot 2024-02-25 at 06 12 35" src="https://github.com/mohsin1993/cargo-one/assets/12693436/aff3bd75-50b5-47a1-b085-7ad645d83b67">

<img width="1680" alt="Screenshot 2024-02-25 at 06 12 18" src="https://github.com/mohsin1993/cargo-one/assets/12693436/8f65ec7f-bf4f-4adc-9382-1520807a5bd7">

https://github.com/mohsin1993/cargo-one/assets/12693436/584712bc-a48a-484a-a63e-7139e75f5d61

## How To setup

To get started with this project, follow these steps:

### Prerequisites

- Node.js installed on your machine. You can download it [here](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:

```bash
git clone <repository-url>
```

2. Navigate into the project directory:

```bash
cd <project-directory>
```

3. Install dependencies using npm:

```bash
npm install
```

### Running the Development Server

To run the development server and view the project in your browser, run the following command:

```bash
npm run dev
```

This command starts the development server and shows the URL to open. Any changes you make to the source files will be hot-reloaded, allowing for a smooth development experience.

### Building for Production

To build the project for production, run:

```bash
npm run build
```

This command generates an optimized build of your application in the `dist` directory.

## Project Structure

The project structure is as follows:

```
├── public/             # Public assets
├── src/                # Source code
│   ├── pages/     		# App Pages
│   ├── api/     		# API related hooks and utils
│   ├── utils/     		# Common utils
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Entry point for the application
├── .gitignore          # Git ignore file
├── package.json        # NPM package configuration
└── README.md           # This README file
```
