# SmartRelay AI

SmartRelay AI is a React + Vite web application for predictive maintenance of inverters and UPS systems.

The platform demonstrates:

- relay remaining-life estimation
- failure-risk prediction
- live telemetry dashboards
- failure simulation
- edge + cloud architecture visualization
- alerts, support workflows, and product management
- theme customization and Copilot assistance

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Recharts

## Local Development

```powershell
npm install
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Build

```powershell
npm run build
```

## Deployment

### Firebase Hosting

```powershell
npm run build
firebase deploy --only hosting
```

### Vercel

Deploy the project with the existing `vercel.json` settings after importing the repo into Vercel.

## Project Structure

- `src/` - React application source
- `public/` - static assets
- `photo/` - project screenshots and presentation captures
- `scripts/` - helper scripts for image/report preparation

## Live URLs

- Firebase: `https://smartrelayapp.web.app`
- Vercel: `https://smartrelayapp.vercel.app`
