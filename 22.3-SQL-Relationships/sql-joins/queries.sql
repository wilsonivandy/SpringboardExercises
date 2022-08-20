-- write your queries here

-- 1 --
SELECT * FROM owners LEFT JOIN vehicles ON owners.id = vehicles.owner_id;

-- 2 --
SELECT o.first_name, o.last_name, COUNT(*) as count FROM owners o JOIN vehicles ON o.id = vehicles.owner_id GROUP BY first_name, last_name;

-- 3 --
SELECT o.first_name, o.last_name, ROUND(AVG(v.price)) AS average_price, COUNT(*) AS count FROM owners o JOIN vehicles v ON o.id = v.owner_id GROUP BY first_name, last_name HAVING ROUND(AVG(price)) > 10000 ORDER BY first_name desc;