-- schema/02_craete_favourites.sql
DROP TABLE IF EXISTS favourites CASCADE;
-- CREATE FAVOURITES
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  recipeid INTEGER,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);
