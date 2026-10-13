# Raspberry Pi Server — REST API Backend

This Express and Node.js service provides the RESTful API backend and persistence layer for the **Raspberry Pi Server** (*Bachelor's Thesis, UPM ETSI Informáticos*).

---

## Architecture & Features

- **Express 4.x REST API**: Lightweight HTTP microservice mounted internally at port `44380`.
- **MongoDB & Mongoose ODM**: Persistent storage for energy consumption records.
- **Environment Configuration**: Managed via `dotenv` with full `.env` support.
- **Atomic Operations**: Atomic upserts via `Record.findOneAndUpdate(..., { upsert: true })`.
- **Graceful Lifecycle**: Non-crashing initialization if MongoDB is temporarily down; clean error handlers.
- **Supervision**: Managed by systemd via `raspberry-api.service`.

---

## Environment Variables

Copy `.env.example` to `.env` to configure:

```ini
PORT=44380
HOST=127.0.0.1
MONGODB_URI=mongodb://127.0.0.1:27017/raspberry
CORS_ORIGIN=*
NODE_ENV=production
```

---

## API Endpoints

All endpoints are mounted under `/api/v1`:

| Method | Route | Description |
| :---: | :--- | :--- |
| `GET` | `/api/v1/health` | Health check endpoint returning status, MongoDB connectivity, and timestamp. |
| `GET` | `/api/v1/records` | Retrieve all energy records, sorted chronologically. |
| `POST` | `/api/v1/records` | Insert or upsert record for given date. Requires `date`, `consumption`, `price`, `cost`. |
| `GET` | `/api/v1/records/:date` | Retrieve single record for specified date (`YYYY-MM-DD`). |
| `PUT` | `/api/v1/records/:date` | Update record fields for specified date. |
| `DELETE` | `/api/v1/records/:date` | Delete record for specified date. |

---

## Available Scripts

In this directory:

- `npm start`: Starts the API server with Node.
- `npm run dev`: Starts the server with `nodemon` for auto-reloading during development.
