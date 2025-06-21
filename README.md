# 🚀 Job Importer – Job Feed Integration & Tracking

This is a job importer system that fetches jobs from multiple external XML feeds, parses and processes them using Redis-backed queues, stores them in MongoDB, and provides a clean dashboard to view import history.

---

## 🧱 Tech Stack

| Layer        | Technology                      |
|--------------|----------------------------------|
| Frontend     | Next.js (App Router), Tailwind CSS |
| Backend      | Node.js + Express                |
| Queue System | BullMQ + Redis                   |
| Database     | MongoDB + Mongoose               |
| Scheduler    | node-cron                        |
| Containers   | Docker + Docker Compose          |

---

## ✨ Features

- 🔁 Cron-based job fetching (every 1 min)
- 🔄 Parses XML feeds → JSON → cleaned
- 📥 Queues jobs into BullMQ (Redis)
- 📌 Inserts/updates job entries in MongoDB
- 🧾 Tracks import stats: new, updated, failed
- 📊 Frontend dashboard: View Import History
- 🐳 Fully Dockerized (MongoDB, Redis, Frontend, Backend)

---

## 📂 Project Structure


├── client/                 # Next.js frontend
│   └── app/import-logs/    # Admin UI to view import logs
│
├── server/                 # Express backend
│   ├── workers/            # BullMQ worker processor
│   ├── services/           # Job fetching & queueing logic
│   ├── models/             # Mongoose schemas
│   ├── controllers/        # API route handlers
│   ├── app.js              # Express config
│   └── server.js           # Entry point
│
├── docker-compose.yml      # All-in-one Docker setup
└── docs/
    └── architecture.md      # System design & tech decisions



##  🔧 Setup Instructions
    ✅ Prerequisites
        Docker & Docker Compose installed


## 🚀 Quick Start (Docker)

    # From the root directory

        docker compose up --build

    # ✅ This will:

        Build frontend and backend containers

        Start Redis and MongoDB

        Run everything on:

    # Service	URL
        Frontend	http://localhost:3000
        Backend	http://localhost:5000
        API Logs	http://localhost:5000/api/import-logs


## 📦 API Endpoints

        GET /api/import-logs

        Returns a list of all import runs with the following:

        {
            "sourceURL": "https://jobicy.com/?feed=job_feed",
            "timestamp": "2025-06-21T09:24:58.779Z",
            "totalFetched": 50,
            "totalImported": 50,
            "newJobs": 10,
            "updatedJobs": 40,
            "failedJobs": [{ "jobId": "...", "reason": "..." }]
        }

        
## 🖥️ UI Screens
    Page	Path	Description
    Home	/	Welcome screen with button
    Import History	/import-logs	Table of import logs

            
## 🧪 Testing the System

    Once up, visit:
        http://localhost:3000 to open the frontend

        Click "📦 View Import History" to view logs

    You can also hit:
        http://localhost:5000/api/import-logs


## 📥 Feeds Used
        https://jobicy.com/?feed=job_feed
        https://jobicy.com/?feed=job_feed&job_categories=data-science
        https://www.higheredjobs.com/rss/articleFeed.cfm
        (and such more)


