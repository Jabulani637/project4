-- Test database initialization (Supabase/Postgres)
-- Creates a separate database for local testing.
-- In Supabase, creating new databases may require superuser access.

-- If you have sufficient privileges:
-- CREATE DATABASE your_test_db_name;

-- If not, you can instead create tables in the existing database (postgres).

-- Example table for a name submissions test:
-- CREATE TABLE IF NOT EXISTS name_submissions (
--   id BIGSERIAL PRIMARY KEY,
--   name TEXT NOT NULL,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

