📏 Architecture & System Design - Job Importer with Queue Processing & History Tracking.

This document describes the architecture, technology choices, and system behavior of the Job Importer, a scalable background job ingestion system.


📊 High-Level Overview

The system is designed to fetch jobs from multiple external XML feeds, convert and queue them, process them asynchronously, store them in MongoDB, and maintain import logs. A frontend dashboard provides visibility into the import history.


Core Capabilities:

Scheduled job fetching (via cron)

Background queue processing (via Redis + BullMQ)

MongoDB persistence for job data and logs

Admin dashboard to view import history



🔧 Tech Stack & Tools

Layer

Technology

Frontend

Next.js (App Router), Tailwind CSS

Backend

Node.js, Express.js

DB

MongoDB (Mongoose)

Queue

BullMQ (based on Redis)

Queue Store

Redis

Cron Jobs

node-cron

Container

Docker + Docker Compose