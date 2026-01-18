# Contract Management Platform

## Tech Stack
- React
- Node.js
- Express
- MongoDB

## Architecture Overview
Frontend communicates with REST APIs built using Express.
MongoDB stores blueprints and contracts.
Lifecycle rules are enforced on the backend.

## Database Schema
- Blueprint: reusable contract template
- Contract: instance created from blueprint

## API Design
- POST /api/blueprints
- GET /api/blueprints
- POST /api/contracts
- GET /api/contracts
- PATCH /api/contracts/:id/status

## Contract Lifecycle
CREATED → APPROVED → SENT → SIGNED → LOCKED  
CREATED/SENT → REVOKED  

Invalid transitions are rejected at API level.

## Setup Instructions
1. Run backend:
   - cd backend
   - npm install
   - npm run dev

2. Run frontend:
   - cd frontend
   - npm install
   - npm run dev

## Assumptions & Trade-offs
- Authentication is mocked
- Focus is on workflow and lifecycle enforcement
