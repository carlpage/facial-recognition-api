-- Seed data with a fake user for testing

insert into users (name, email, entries, age, pet, joined) values ('a', 'a@a.com', 5, 25, 'Turtle', '2018-01-01');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'a@a.com');