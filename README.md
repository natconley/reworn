# REWORN — Vintage Webshop

A full-stack e-commerce application for a fictional vintage/second-hand clothing store, built as a course project. Features a dynamic product catalog, search, a shopping cart, and an admin panel for managing inventory.

**Stack:** Angular (frontend) · Express (backend) · PostgreSQL via Supabase (database)

---

## Features

- Dynamic homepage with a rotating hero section, spotlight sections, and a curated grid of published products
- Search with live results and result count
- Product detail pages generated from a URL slug, with a "similar products" carousel (category + era fallback matching)
- "New" badge for products published within the last 7 days; future-dated products are automatically hidden until their publish date
- Shopping cart with quantity controls and running total, backed by a shared Angular service. The "Add to cart" button toggles state based on whether the product is already in the cart.
- Checkout page with an order summary and a contact form
- Admin panel: product table with delete, and a form to add new products (auto-generates unique SKU and slug server-side). Uses a separate, minimal header.

---

## Project structure

```
webbshop/
├── client/          Angular frontend
└── server/          Express backend (Repository Pattern)
    ├── db.js
    ├── index.js
    ├── repositories/
    ├── routes/
    ├── data/
    └── seed.js
```

The backend follows a **Repository Pattern**: all SQL lives in `repositories/`, all HTTP handling lives in `routes/`. Every database query uses parameterized queries (`$1`, `$2`, ...) — never raw string concatenation.

---

## Setup — running this locally

### Prerequisites

- Node.js (v24 or later recommended — built and tested with v24.9.0)
- A PostgreSQL database — either installed locally, or a free hosted instance (e.g. [Supabase](https://supabase.com) or [Neon](https://neon.tech))

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd webbshop

cd client
npm install

cd ../server
npm install
```

### 2. Set up the database

This project uses **PostgreSQL**. Any PostgreSQL instance works — a local install, or a free hosted database such as [Supabase](https://supabase.com) or [Neon](https://neon.tech).

1. Create a PostgreSQL database (locally, or via a hosted provider)
2. Get its connection string. It should look like:
   ```
   postgresql://user:password@host:port/database
   ```
   *(If using Supabase specifically: go to the project dashboard → **Connect**, and use the **Session pooler** string rather than the direct connection — the direct connection is IPv6-only and can fail to resolve on some local networks.)*
3. In `server/`, create a file named `.env`:
   ```
   DATABASE_URL=postgresql://your-connection-string-here
   ```
4. Run the table definitions in `server/schema.sql` against the database — either by pasting them into your provider's SQL editor, or from the command line:
   ```bash
   psql "$DATABASE_URL" -f schema.sql
   ```

### 3. Seed the database

```bash
cd server
node seed.js
```

This populates the lookup tables (categories, eras, colors, conditions) and a starter set of products.

### 4. Run the app

Two terminals are needed:

```bash
# Terminal 1 — backend
cd server
node index.js
```

```bash
# Terminal 2 — frontend
cd client
ng serve
```

Open `http://localhost:4200`. The Angular dev server proxies all `/api` requests to the Express server on port 3000 (see `client/proxy.conf.json`), so no CORS configuration is needed.

---

## Notes

- Server-side rendering (SSR) is disabled for this project (`outputMode: static` in `angular.json`).
- The Supabase free tier pauses a project after 7 days of inactivity. If this repo is being demoed after a while, the database may need to be manually restored from the Supabase dashboard before the app will connect.
- SKU and slug are generated automatically on the server when a new product is created — they are not user-editable fields in the admin form.

---

## Built with

Angular · Express · PostgreSQL (Supabase) · vanilla CSS with custom properties

This project was built as part of the Frontend Development program at EC Utbildning.