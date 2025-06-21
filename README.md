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

- Access the application.
   - React: http://localhost:3000

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

## Coding guidelines

- Use arrow functions.
- Avoid abbreviations in names.
- Insert a blank line before and after `if` blocks and loops.
- Insert a blank line before and after `const` or `let` unless the next line is also `const` or `let` or the statement is first in a block.
- Insert a blank line before `return` statements.
- Place the `return` statement on the same line as its condition when possible.
- Write comments only when behaviour is complex or to explain why a decision was made.
