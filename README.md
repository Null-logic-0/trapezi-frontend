# Trapezi Frontend

![alt text](https://img.shields.io/badge/License-Source_Available-red.svg)


![alt text](https://img.shields.io/badge/Next.js-16-black)


![alt text](https://img.shields.io/badge/TypeScript-5.x-blue)


![alt text](https://img.shields.io/badge/Tailwind-3.x-cyan)

The modern, responsive web interface for the Trapezi platform. Built with Next.js 16 and TypeScript, this application consumes the Rails 8 API to provide seamless user authentication, location services, and payments.

⚠️ LEGAL NOTICE: This repository contains proprietary source code. It is Source Available for viewing (e.g., portfolio demonstration) but strictly prohibits unauthorized commercial use or deployment.

🚀 Features

Modern Architecture: Built on Next.js 16 (App Router) for server-side rendering and high performance.

Interactive Maps: Deep integration with Google Maps Platform for location-based services.

Authentication: Secure Google OAuth2 login flow.

Responsive UI: Styled with Tailwind CSS for a mobile-first, adaptive design.

Type Safety: Full TypeScript integration for robust development.

🛠 Tech Stack

Framework: Next.js 16

Language: TypeScript

Styling: Tailwind CSS

API: Consumes Trapezi Backend (Ruby on Rails 8)

Icons: Lucide React / Heroicons

⚙️ Prerequisites

Ensure you have the following installed:

Node.js (v20 or higher recommended for Next.js 16)

npm or yarn / pnpm

Trapezi Backend: The Rails API must be running locally (usually on port 3000).

💻 Getting Started
1. Clone the Repository
code
Bash
download
content_copy
expand_less
git clone https://github.com/Null-logic-0/trapezi-frontend.git
cd trapezi-frontend
2. Install Dependencies
code
Bash
download
content_copy
expand_less
npm install
# or
yarn install
3. Environment Configuration

Create a .env.local file in the root directory.

code
Bash
download
content_copy
expand_less
cp .env.example .env.local
# OR
touch .env.local

Required Environment Variables:

Paste the following into your .env.local file and fill in the values:

code
Ini
download
content_copy
expand_less
# API Configuration
# Rails API URL (Default: Port 3000)
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Frontend URL (Default: Port 3001)
NEXT_PUBLIC_FRONTED_URL=http://localhost:3001

# Google Integration
# Client ID for OAuth2
NEXT_PUBLIC_CLIENT_ID=your_google_client_id_here

# Google Maps API Key (Must have Maps JS API enabled)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
4. Run the Development Server

Since the Rails API typically runs on port 3000, we run the Next.js app on port 3001:

code
Bash
download
content_copy
expand_less
npm run dev -- -p 3001

Open http://localhost:3001 with your browser to see the result.

🏗 Project Structure

code
Bash
download
content_copy
expand_less

    .
    ├── app/                  # Next.js 16 App Router
    │   ├── layout.tsx        # Root layout
    │   ├── page.tsx          # Landing page
    │   └── (routes)/         # Application routes
    ├── components/           # Reusable UI components
    │   ├── ui/               # Basic UI elements (Buttons, Inputs)
    │   └── maps/             # Google Maps specific components
    ├── lib/                  # Utility functions and API clients
    ├── public/               # Static assets
    └── types/                # TypeScript interfaces
⚠️ License & Legal Notice

Copyright © 2025 Null-logic-0. All Rights Reserved.

The source code for this project is Source Available for viewing and educational purposes only.

Terms of Use:

No Commercial Use: You may not use this source code for any commercial purpose.

No Modification: You may not modify, distribute, or create derivative works.

No Deployment: You may not deploy this application to a public server without explicit written permission.

Regarding GitHub Forks:
Forking this repository is permitted strictly for code analysis and viewing. It does not grant a license to use or run the software.

Any unauthorized use will be considered a violation of copyright law.
