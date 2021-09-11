-- create data table --
CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "task" varchar(120) not null,
    "checked" BOOLEAN DEFAULT false
);

INSERT INTO "todo"
("task")
VALUES
('Insert test into DB');

--SELECT * FROM "todo" ORDER BY "id" LIMIT 50;

--UPDATE "todo" SET "checked" = 'TRUE' WHERE "id" = 1;

--DELETE FROM "todo" WHERE "id" = 1;