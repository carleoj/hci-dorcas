# Dorcas

Dorcas is a web-based counseling platform developed to provide students with a secure and accessible way to communicate with counselors. The system includes features such as appointment scheduling, encrypted messaging, and user authentication.

### Visit
- https://vercel.com/carl-panos-projects/hci-dorcas

### Watch
- https://youtu.be/4iWBH_m3uMg?si=aLMS2yieHw6XHe9s

---

## Prerequisites

Before running the project locally, ensure the following software is installed:

* Node.js (v20 or later recommended)
* npm
* Git

---

## Clone the Repository

```bash
git clone https://github.com/carleoj/hci-dorcas.git
cd hci-dorcas
```

---

## Install Dependencies

Install the project dependencies.

```bash
npm install
```

If the project contains separate frontend and backend directories, install the dependencies inside each directory as well.

Example:

```bash
cd client
npm install

cd ../server
npm install
```

---

## Environment Variables

Create the required environment variable files before starting the application.

Example:

```text
.env
```

Add the environment variables required by your local development environment.

> **Note:** This repository does not include sensitive credentials. Never commit API keys, database credentials, secrets, or tokens to version control.

---

## Run the Application

### Start the Backend

```bash
npm run dev
```

or

```bash
npm start
```

### Start the Frontend

Open another terminal and run:

```bash
npm run dev
```

The frontend development server will display a local URL (typically `http://localhost:5173` when using Vite).

---

## Building for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## Troubleshooting

### Dependencies fail to install

Delete the existing dependencies and reinstall.

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

On Windows:

```powershell
rmdir /s node_modules
del package-lock.json
npm install
```

### Port Already in Use

Ensure no other application is using the configured development ports before starting the project.

### Environment Variables Not Loading

* Verify the `.env` file exists.
* Restart the development server after making changes.
* Confirm all required variables are defined.

---

## Notes

* This project is intended for local development and educational purposes.
* Sensitive configuration values should be stored only in local environment files and must not be committed to the repository.
* If contributing to the project, follow standard Git practices by creating feature branches and submitting pull requests.
