# Travel Planner

This project contains two applications:

- `api` built with Laravel
- `app` built with React

## Setup

1. Copy `.env.example` to `.env` and adjust the values if required.

2. Build the containers so PHP dependencies are correctly installed.

```bash
docker compose build
```

3. Start the containers.

```bash
docker compose up -d
```

React updates are applied immediately without restarting containers.

- Access the application.
   - React: http://localhost:3000
   - Laravel API is not exposed to the host and is reachable only through the React application

The ignore files exclude generated lock files and other temporary content.

## Migrations

- Execute the migrations whenever the schema changes.

```bash
docker compose exec api php artisan migrate
```

- Generating new migration
```
docker compose exec api php artisan make:migration <migration_name>
```

## Database access

Log into the MySQL container with:

```bash
docker compose exec db mysql -u "$DB_USERNAME" -p"$DB_PASSWORD" "$DB_DATABASE"
```

## Logging

The application includes comprehensive logging for both Laravel API and Express server.

### Laravel Logging

Use Laravel's Log facade in your PHP code:

```php
use Illuminate\Support\Facades\Log;

// Different log levels
Log::debug('Debug information', ['data' => $debugData]);
Log::info('General information', ['user_id' => $userId]);
Log::warning('Something unexpected happened', ['context' => $context]);
Log::error('An error occurred', ['error' => $exception->getMessage()]);
Log::critical('Critical system error', ['trace' => $exception->getTraceAsString()]);
```

### Viewing Logs

```bash
# Real-time logs from all services
docker compose logs -f

# Laravel API logs only
docker compose logs api

# Express server logs only
docker compose logs app

# Access Laravel log file directly
docker compose exec api tail -f /var/www/html/storage/logs/laravel.log
```

## Coding guidelines

- Use arrow functions.
- Avoid abbreviations in names.
- Insert a blank line before and after `if` blocks and loops.
- Insert a blank line before and after `const` or `let` unless the next line is also `const` or `let` or the statement is first in a block.
- Insert a blank line before `return` statements.
- Place the `return` statement on the same line as its condition when possible.
- Write comments only when behaviour is complex or to explain why a decision was made.
