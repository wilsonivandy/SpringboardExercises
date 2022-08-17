-- Comments in SQL Start with dash-dash --

-- 1 --
SELECT * FROM analytics WHERE id = 1880;

-- 2 --
SELECT id, app_name FROM analytics WHERE last_updated = '2018-08-01';

-- 3 --
SELECT category, COUNT(*) FROM analytics GROUP BY category;

-- 4 --
SELECT app_name, reviews FROM analytics LIMIT 5

-- 5 --
SELECT * FROM analytics WHERE rating >= 4.8 LIMIT 1;

-- 6 -- 
SELECT category, AVG(rating) AS avg_rating FROM analytics GROUP BY category;

-- 7 --
SELECT app_name, price, rating FROM analytics WHERE rating < 3 ORDER BY price desc LIMIT 1;

-- 8 --
SELECT * FROM analytics WHERE min_installs <= 50 AND rating > 0 ORDER BY rating desc;

-- 9 --
SELECT app_name FROM analytics WHERE rating < 3 AND reviews >= 10000;

-- 10 --
SELECT * FROM analytics WHERE price BETWEEN 0.1 AND 1 ORDER BY reviews LIMIT 10;

-- 11 --
SELECT * FROM analytics ORDER BY last_updated asc LIMIT 1;

-- 12 --
SELECT * FROM analytics ORDER BY price desc LIMIT 1;

-- 13 --
SELECT SUM(reviews) FROM analytics;

-- 14 --
SELECT category FROM analytics GROUP BY category HAVING COUNT(*) > 300;

-- 15 --
SELECT app_name, reviews, min_installs, (min_installs / reviews) AS proportion FROM analytics WHERE min_installs >= 100000 ORDER BY (min_installs / reviews) desc LIMIT 1; 