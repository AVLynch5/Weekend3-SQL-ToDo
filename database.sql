CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "task" varchar(120) not null,
    "checked" BOOLEAN DEFAULT false
);

INSERT INTO "todo"
("task")
VALUES
('Insert test into DB');