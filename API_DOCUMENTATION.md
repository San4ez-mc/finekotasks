# API Documentation

This document lists available API endpoints for the project.

## Test Endpoint
- `GET /test` – returns a confirmation that the API is working.

## Authentication
- `POST /auth/login` – log in a user.
- `POST /auth/logout` – log out the current user.
- `POST /auth/telegram-login` – log in via Telegram.

## Tasks
### RESTful
- `GET /tasks` – list tasks.
- `GET /tasks/{id}` – view a task.
- `POST /tasks` – create a task.
- `PUT /tasks/{id}` – update a task.
- `PATCH /tasks/{id}` – partially update a task.
- `DELETE /tasks/{id}` – delete a task.

### Additional
- `GET /task/filter` – filter tasks by various parameters.
- `DELETE /task/delete?id={id}` – delete a task (alternative endpoint).
- `PATCH /task/update-field?id={id}` – update a single field of a task.

## Results
- `GET /results` – list results.
- `GET /results/{id}` – view a result.
- `POST /results` – create a result.
- `PUT /results/{id}` – update a result.
- `PATCH /results/{id}` – partially update a result.
- `DELETE /results/{id}` – delete a result.

## Users
- `GET /users` – list users.
- `GET /users/{id}` – view a user.
- `POST /users` – create a user.
- `PUT /users/{id}` – update a user.
- `PATCH /users/{id}` – partially update a user.
- `DELETE /users/{id}` – delete a user.

## Positions
- `GET /positions` – list positions.
- `GET /positions/{id}` – view a position.
- `POST /positions` – create a position.
- `PUT /positions/{id}` – update a position.
- `PATCH /positions/{id}` – partially update a position.
- `DELETE /positions/{id}` – delete a position.
