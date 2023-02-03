-- schema/03_craete_diet_options.sql
DROP TABLE IF EXISTS diet_options CASCADE;
-- CREATE DIET_OPTIONS
CREATE TABLE diet_options (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  diet VARCHAR(255),
  restrictions VARCHAR(255),
  maxprotein INTEGER,
  minprotein INTEGER,
  maxfat INTEGER,
  minfat INTEGER,
  maxcarb INTEGER,
  mincarb INTEGER
);
