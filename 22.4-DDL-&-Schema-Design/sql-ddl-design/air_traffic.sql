-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE customer
(
  customer_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  seat TEXT NOT NULL
);

CREATE TABLE departure
(
  departure_id SERIAL PRIMARY KEY,
  airline TEXT NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  from_city TEXT NOT NULL,
  from_country TEXT NOT NULL
);

CREATE TABLE arrival
(
  arrival_id SERIAL PRIMARY KEY,
  airline TEXT NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  to_city TEXT NOT NULL,
  to_country TEXT NOT NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customer(customer_id),
  departure_id INT REFERENCES departure(departure_id),
  arrival_id INT REFERENCES arrival(arrival_id)
);

INSERT INTO customer
  (first_name, last_name, seat)
VALUES
  ('Jennifer', 'Finch', '33B'),
  ('Thadeus', 'Gathercoal', '8A'),
  ('Sonja', 'Pauley', '12F'),
  ('Jennifer', 'Finch', '20A'),
  ('Waneta', 'Skeleton', '23D'),
  ('Thadeus', 'Gathercoal', '18C'),
  ('Berkie', 'Wycliff', '9E'),
  ('Alvin', 'Leathes', '1A'),
  ('Berkie', 'Wycliff', '32B'),
  ('Cory', 'Squibbes', '10D');

INSERT INTO departure
  (airline, departure_time, from_city, from_country)
VALUES 
  ('United', '2018-04-08 09:00:00', 'Washington DC', 'United States'),
  ('British Airways', '2018-12-19 12:45:00', 'Tokyo', 'Japan'),
  ('Delta', '2018-01-02 07:00:00', 'Los Angeles', 'United States'),
  ('Delta', '2018-04-15 16:50:00', 'Seattle', 'United States'),
  ('TUI Fly Belgium', '2018-08-01 18:30:00', 'Paris', 'France'),
  ('Air China', '2018-10-31 01:15:00', 'Dubai', 'UAE'),
  ('United', '2019-02-06 06:00:00', 'New York', 'United States'),
  ('American Airlines', '2018-12-22 14:42:00', 'Cedar Rapids', 'United States'),
  ('American Airlines', '2019-02-06 16:28:00', 'Charlotte', 'United States'),
  ('Avianca Brasil', '2019-01-20 19:30:00', 'Sao Paolo', 'Brazil');



INSERT INTO arrival
  (airline, arrival_time, to_city, to_country)
VALUES 
  ('United', '2018-04-08 12:00:00', 'Seattle', 'United States'),
  ('British Airways', '2018-12-19 16:15:00', 'London', 'United Kingdom'),
  ('Delta', '2018-01-02 08:03:00',  'Las Vegas', 'United States'),
  ('Delta', '2018-04-15 21:00:00', 'Mexico City', 'Mexico'),
  ('TUI Fly Belgium', '2018-08-01 21:50:00', 'Casablanca', 'Morocco'),
  ('Air China', '2018-10-31 12:55:00', 'Beijing', 'China'),
  ('United', '2019-02-06 07:47:00', 'Charlotte', 'United States'),
  ('American Airlines', '2018-12-22 15:56:00', 'Chicago', 'United States'),
  ('American Airlines', '2019-02-06 19:18:00', 'New Orleans', 'United States'),
  ('Avianca Brasil', '2019-01-20 22:45:00', 'Santiago', 'Chile');

INSERT INTO tickets
  (customer_id, departure_id, arrival_id)
VALUES
  (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5),(6,6,6),(7,7,7),(8,8,8),(9,9,9),(10,10,10);






-- SELECT c.first_name, d.from_city, a.to_city, seat, a.arrival_time - d.departure_time AS duration
-- FROM tickets
-- JOIN customer c
--   ON tickets.customer_id = c.customer_id
-- JOIN departure d
--   ON tickets.departure_id = d.departure_id
-- JOIN arrival a
--   ON tickets.arrival_id = a.arrival_id
-- ORDER BY duration desc, c.first_name;



