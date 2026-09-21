# Stock Trading Platform

A React and Express/MongoDB stock-trading practice application. It includes a public landing site, cookie-based authentication, a dashboard, a watchlist backed by an in-memory dummy market, holdings, orders, funds, and positions views.

## Current Status

This is a learning/demo application rather than a production brokerage system.

- Frontend: React 18 with React Router, Axios, Bootstrap, Font Awesome, Chart.js, and Material UI packages.
- Backend: Express with Mongoose, JWT authentication, bcrypt password hashing, and cookie-parser.
- Database: MongoDB.
- Market data: the dummy market in `backend/market/dummyMarket.js` changes prices randomly every two seconds.
- Order prices: the backend now resolves the current dummy-market price from the submitted stock symbol. The frontend price is display-only.
- Starting balance: new users receive `100000` by default.
- Supported dummy symbols: `INFY`, `ONGC`, `TCS`, `KPITTECH`, `QUICKHEAL`, `WIPRO`, `M&M`, `RELIANCE`, `HUL`, `SBIN`, `ITC`, and `TATAPOWER`.

## Project Structure

```text
.
├── backend/
│   ├── controllers/       Request handlers for auth, market, holdings, and orders
│   ├── market/             In-memory dummy market and price updates
│   ├── middleware/         JWT cookie authentication middleware
│   ├── model/              Mongoose schemas and models
│   ├── routes/             Express route definitions
│   ├── index.js            Express app, middleware, routes, and MongoDB startup
│   └── package.json
├── frontend/
│   ├── public/             Static files and public images
│   ├── src/
│   │   ├── landing_page/  Public pages
│   │   ├── dashboard/     Protected trading dashboard and components
│   │   ├── routes/        Protected route wrapper
│   │   └── index.js       React Router entry point
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js with a version that supports the backend's global `fetch` usage, or a fetch polyfill.
- npm.
- MongoDB reachable through `MONGO_URL`.
- A MongoDB replica set or MongoDB deployment that supports transactions. Order creation uses `session.withTransaction()`.

## Configuration

Create `backend/.env`:

```env
MONGO_URL=mongodb://127.0.0.1:27017/stock-trading-platform
JWT_SECRET=replace-with-a-long-random-secret
BHARATSTOCK_API_KEY=optional-key-for-the-external-quote-endpoint
PORT=3002
```

`backend/.env` is ignored by Git. Never commit real secrets.

The current frontend and backend URLs are hard-coded to local development addresses:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3002`

For deployment, move these values into environment configuration and update CORS, cookies, and API calls together.

## Running Locally

Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Start MongoDB with transaction support, then use two terminals:

```bash
cd backend
npm start
```

```bash
cd frontend
npm start
```

Open `http://localhost:3000`.

The backend listens on port `3002` unless `PORT` is set. The frontend development server normally listens on port `3000`.

## Authentication Flow

1. The user signs up at `POST /auth/signup` or logs in at `POST /auth/login`.
2. The backend hashes passwords with bcrypt.
3. The backend signs a JWT containing `userId` and stores it in an HttpOnly `token` cookie.
4. Protected requests send the cookie with `credentials: include` or Axios `withCredentials: true`.
5. `authMiddleware` verifies the cookie and adds `req.user.userId`.
6. `GET /auth/me` is used by the frontend to protect dashboard routes.
7. `POST /auth/logout` clears the cookie.

## API Routes

### Authentication

| Method | Route          | Auth | Purpose                                       |
| ------ | -------------- | ---: | --------------------------------------------- |
| `POST` | `/auth/signup` |   No | Create a user and log in through a cookie     |
| `POST` | `/auth/login`  |   No | Authenticate a user                           |
| `GET`  | `/auth/me`     |  Yes | Return the current user's profile and balance |
| `POST` | `/auth/logout` |   No | Clear the authentication cookie               |

### Market

| Method | Route                             | Auth | Purpose                                            |
| ------ | --------------------------------- | ---: | -------------------------------------------------- |
| `GET`  | `/market/quotes?symbols=INFY,TCS` |   No | Return dummy-market quotes for multiple symbols    |
| `GET`  | `/market/quote/:symbol`           |   No | Request a quote from the external Bharat Stock API |

The two market endpoints currently use different data sources. The order controller uses the dummy market directly.

### Trading data

| Method | Route           | Auth | Purpose                                              |
| ------ | --------------- | ---: | ---------------------------------------------------- |
| `GET`  | `/allHoldings`  |  Yes | Return holdings belonging to the current user        |
| `POST` | `/newOrder`     |  Yes | Execute a BUY or SELL order in a MongoDB transaction |
| `GET`  | `/newOrder`     |  Yes | Return orders belonging to the current user          |
| `GET`  | `/allPositions` |  Yes | Return position records; currently not user-scoped   |

A current order request is:

```json
{
  "name": "INFY",
  "qty": 5,
  "mode": "BUY"
}
```

The backend obtains the price from the dummy market. A client-supplied `price` is ignored.

## Order Behavior

### BUY

1. Confirm the user exists.
2. Resolve the current dummy-market price.
3. Atomically decrease the balance if sufficient funds exist.
4. Upsert one holding for the user and symbol.
5. Increase quantity and calculate the weighted average purchase price.
6. Save the order.

For a first purchase, the holding should become `qty = requested quantity` and `avg = current price`. For later purchases, the expected quantity is the old quantity plus the new quantity. For example, `10 + 5 = 15`.

### SELL

1. Atomically confirm that the user owns enough quantity.
2. Decrease the holding quantity.
3. Increase the user's balance using the current dummy-market price.
4. Delete the holding when its quantity reaches zero.
5. Save the order.

## Important Issues To Fix

The following are current issues found during the project review. They are documented here only; this README did not change the application behavior.

### Priority 1: security and data isolation

1. **Positions are not user-scoped.** `backend/routes/positionsRoutes.js` calls `PositionsModel.find({})`, and `PositionsModel` has no `userId`. Any authenticated user can receive every position record. Add `userId` to the model and filter by `req.user.userId`.
2. **Cookie and CORS settings are development-only.** Cookies use `secure: false`, CORS allows only a hard-coded localhost origin, and API URLs are hard-coded throughout the frontend. Add environment-based configuration and use secure cookies behind HTTPS.
3. **No CSRF protection exists for cookie-authenticated mutations.** Add CSRF protection or enforce a robust same-site/origin strategy before production use.
4. **No rate limiting or security headers are configured.** Consider rate limiting, Helmet, request-size limits, and login/signup abuse controls.
5. **Production errors may expose internal details.** Several handlers return `error.message`; log detailed errors server-side and return generic client messages.

### Priority 2: trading correctness

1. **Market sources are inconsistent.** `/market/quote/:symbol` calls the external API, while `/market/quotes` and orders use the random dummy market. Choose one source per environment and keep displayed and executed prices consistent.
2. **The dummy market is process-local.** Prices reset when the backend restarts and are not shared across backend instances.
3. **Order input and model validation are incomplete.** Add strict validation for symbol, positive finite quantity, supported mode, and numeric price fields in the relevant schemas/controllers.
4. **Order transaction support is required.** A standalone local MongoDB server will not support `withTransaction`; use a replica set or adapt the persistence strategy for development.
5. **BUY update failures should be checked explicitly.** The controller should verify that the holding update returned a document before saving the order, even though transaction errors should roll back earlier changes.
6. **Holdings fallback price can become `NaN`.** Holdings store no current price, and the frontend falls back to `stock.price`, which is not part of the holdings schema. Fetch a quote for every holding or handle unavailable market data explicitly.

### Priority 3: UI and product completeness

1. **The Summary page is hard-coded.** Balance, holdings value, investment value, and P&L do not come from the authenticated account.
2. **Positions fall back to demo data on API errors or empty responses.** This can make an outage look like valid user data. Show an error or empty state instead.
3. **Positions are not refreshed after trading.** Add a refresh strategy if positions become real user data.
4. **Some components are placeholders.** `DashboardApp.js` returns an unused dashboard shell, some Apps buttons have no actions, and several landing-page links are placeholders.
5. **There are no automated tests.** Add backend tests for authentication and order invariants, especially first BUY, repeated BUY, partial SELL, full SELL, insufficient funds, insufficient holdings, invalid input, and concurrent orders.
6. **Frontend API calls are duplicated.** Centralize the API base URL, credentials configuration, and common error handling in one Axios client.

## Recommended Fix Order

1. Scope positions by user and remove demo fallbacks from authenticated data views.
2. Add complete order validation and tests for BUY/SELL invariants.
3. Unify market data source and make trade execution use the same quote shown to the user.
4. Centralize frontend API configuration and configure production CORS/cookies.
5. Replace hard-coded dashboard summary values with API-backed calculations.
6. Add security middleware, rate limiting, CSRF protection, and sanitized error responses.
7. Add CI checks and integration tests using a MongoDB replica-set test environment.

## Useful Checks

Backend syntax checks:

```bash
node --check backend/controllers/ordersController.js
node --check backend/market/dummyMarket.js
```

Frontend production build:

```bash
cd frontend
npm run build
```

The repository currently has no dedicated automated test suite. `npm test` uses the Create React App test runner and may enter watch mode unless configured for CI.

## Development Notes

- `backend/market/dummyMarket.js` starts a two-second interval as soon as it is imported.
- Holdings have a unique compound index on `{ userId, name }`; duplicate records should be investigated if repeated BUY operations appear to replace rather than add quantity.
- The dashboard refreshes watchlist market quotes every five seconds.
- Authentication state is checked by the protected route using the HttpOnly cookie.
- Build output under `frontend/build` is ignored by Git and should be regenerated rather than edited manually.
