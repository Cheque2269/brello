CREATE DATABASE "Brello";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE lists
(
    "id"        uuid primary key   default uuid_generate_v4(),
    "name"      text      not null,
    "createdAt" timestamp not null default now(),
    "updatedAt" timestamp not null default now()
);

CREATE TABLE tasks
(
    "id"          uuid primary key   default uuid_generate_v4(),
    "title"       text      not null,
    "isCompleted" bool      not null default false,
    "createdAt"   timestamp not null default now(),
    "updatedAt"   timestamp not null default now(),
    "position"    float     not null,
    "listId"      uuid      not null REFERENCES lists (id)
);

CREATE OR REPLACE FUNCTION new_position_in_list(list_id uuid) RETURNS float
    LANGUAGE SQL AS
$$
SELECT coalesce(round(max(position)), 0) + 1
FROM tasks
WHERE "listId" = list_id;
$$;
