# SunnyBooks Frontend (FWEB_Project)

This repository contains the frontend for the SunnyBooks system.  
It is built using React and Vite.

The frontend communicates with the backend through REST APIs.  
The backend URL is configured using environment variables.

This project follows DevOps and GitOps practices.  
The frontend is connected to GitHub and deployed on Vercel.

When code is pushed to the `main` branch:
- GitHub Actions runs a CI pipeline
- Dependencies are installed
- The project is built
- Vercel automatically deploys the latest version

No manual deployment is required.

GitHub is the single source of truth.  
All deployments are triggered by Git commits.

The frontend is live at:  
https://my-repository-3albz8v48-sufians-projects-62efa871.vercel.app/login

Environment variables are managed in Vercel and not committed to GitHub.  
This includes the backend API URL.

Technologies used:
- React
- Vite
- Axios
- GitHub Actions
- Vercel
