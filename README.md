# Travel Planner

This project contains two applications:

- `api` built with Laravel
- `app` built with React

## Setup

1. Start the containers.

   ```bash
   docker compose up -d
   ```

2. Install React dependencies.

   ```bash
   docker compose exec app npm install
   ```

3. Compile the React app.

   ```bash
   docker compose exec app npm run build
   ```

4. Access the applications.
   - React: http://localhost:3000

The ignore files exclude generated lock files and other temporary content.
