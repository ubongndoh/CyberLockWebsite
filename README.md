# CyberLockX Website

This repository contains the code for the CyberLockX website, a platform focused on providing security solutions for Small and Medium Businesses (SMBs).

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Express.js, Drizzle ORM
- **Database**: PostgreSQL (Neon Database)

## Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Building for Production

To build the application for production:

```
npm run build
```

This will create optimized assets in the `dist` directory.

## Deploying to Netlify

### Prerequisites

1. Create a [Netlify account](https://www.netlify.com/)
2. Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/):
   ```
   npm install -g netlify-cli
   ```

### Environment Variables

Make sure to set the following environment variables in your Netlify project settings:

- `DATABASE_URL`: Your Neon PostgreSQL database connection string

### Deployment Steps

1. Build the project locally:

   ```
   npm run build
   ```

2. Deploy using the Netlify CLI:
   ```
   netlify deploy
   ```
3. For production deployment:
   ```
   netlify deploy --prod
   ```

### Continuous Deployment

For continuous deployment, connect your GitHub repository to Netlify:

1. Log in to Netlify
2. Click "New site from Git"
3. Select your repository
4. Set build command: `npm run build`
5. Set publish directory: `dist/public`
6. Add environment variables
7. Deploy the site

## Features

- SOS²A Tool (SMB Organizational and System Security Analysis)
- Secure Cloud for Google Docs/Sheets with cell-level encryption
- AFAAI Browser with patented encryption technology
- Early Access program for founding members
