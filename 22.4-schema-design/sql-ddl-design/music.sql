-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists (
  artist_id SERIAL PRIMARY KEY,
  artist_name TEXT NOT NULL
);


CREATE TABLE producers (
  producer_id SERIAL PRIMARY KEY,
  producer_name TEXT NOT NULL
);

CREATE TABLE albums (
  album_id SERIAL PRIMARY KEY,
  album_name TEXT NOT NULL,
  release_date DATE NOT NULL,
  producer_id INT REFERENCES producers(producer_id)
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  artists_id INT REFERENCES artists(artist_id),
  album_id INT REFERENCES albums(album_id)
);

INSERT INTO artists (artist_name)
VALUES 
  ('Hanson'),
  ('Queen'),
  ('{"Mariah Cary", "Boyz II Men"}'),
  ('{"Lady Gaga", "Bradley Cooper"}'),
  ('{"Nickelback"}'),
  ('{"Jay Z", "Alicia Keys"}'),
  ('{"Katy Perry", "Juicy J"}'),
  ('{"Maroon 5", "Christina Aguilera"}'),
  ('{"Avril Lavigne"}'),
  ('{"Destiny''s Child"}');

INSERT INTO producers (producer_name)
VALUES 
  ('{"Dust Brothers", "Stephen Lironi"}'),
  ('{"Roy Thomas Baker"}'),
  ('{"Walter Afanasieff"}'),
  ('{"Benjamin Rice"}'),
  ('{"Rick Parashar"}'),
  ('{"Al Shux"}'),
  ('{"Max Martin", "Cirkut"}'),
  ('{"Shellback","Benny Blanco"}'),
  ('{"The Matrix"}'),
  ('{"Darkchild"}');

INSERT INTO albums (album_name, release_date, producer_id)
VALUES
  ('Middle of Nowhere', '04-15-1997', 1),
  ('A Night at the Opera', '10-31-1975', 2),
  ('Daydream', '11-14-1995', 3),
  ('A Star Is Born', '09-27-2018', 4),
  ('Silver Side Up', '08-21-2001', 5),
  ('The Blueprint 3', '10-20-2009', 6),
  ('Prism', '12-17-2013', 7),
  ('Hands All Over', '06-21-2011', 8),
  ('Let Go', '05-14-2002', 9),
  ('The Writing''s on the Wall', '11-07-1999', 10);


INSERT INTO songs
  (title, duration_in_seconds, artists_id, album_id)
VALUES
  ('MMMBop', 238, 1, 1),
  ('Bohemian Rhapsody', 355, 2, 2),
  ('One Sweet Day', 282, 3, 3),
  ('Shallow', 216,  4, 4),
  ('How You Remind Me', 223, 5, 5),
  ('New York State of Mind', 276, 6, 6),
  ('Dark Horse', 215, 7, 7),
  ('Moves Like Jagger', 201, 8, 8),
  ('Complicated', 244,9, 9),
  ('Say My Name', 240, 10, 10);

-- CREATE INDEX title_index ON songs(title);
