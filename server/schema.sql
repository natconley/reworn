-- REWORN Webshop — Database Schema
-- PostgreSQL

-- Lookup tables (create before products, foreign keys)

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE eras (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE conditions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Products

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL CHECK (length(name) <= 25),
    description TEXT,
    image_url TEXT NOT NULL,
    sku TEXT NOT NULL,
    price REAL NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    published_date DATE NOT NULL,
    size TEXT NOT NULL DEFAULT 'Onesize',
    category_id INTEGER REFERENCES categories(id),
    era_id INTEGER REFERENCES eras(id),
    color_id INTEGER REFERENCES colors(id),
    condition_id INTEGER REFERENCES conditions(id)
);