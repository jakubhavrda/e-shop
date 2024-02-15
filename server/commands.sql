CREATE TABLE products(
    id SERIAL PRIMARY KEY UNIQUE,
    name VARCHAR(200),
    in_stock integer NOT NULL,
    category VARCHAR(100),
    color VARCHAR(75),
    price integer NOT NULL,
)

INSERT INTO products (name, in_stock, category, color, price)
VALUES ('Hugo Boss Bike', 47, 'Bikes', 'pink', 3999) 

INSERT INTO categories (category)
VALUES ('Watches')

CREATE TABLE categories(
    ctgr_id SERIAL PRIMARY KEY UNIQUE,
    category VARCHAR(100)
)

ALTER TABLE products 
ADD description VARCHAR(300) 

ALTER TABLE products 
ALTER COLUMN description TYPE VARCHAR(700) 




CREATE TABLE users(
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR (255) NOT NULL, 
    admin BOOLEAN DEFAULT false
)

INSERT INTO users (user_email, user_name, user_password, admin)
VALUES ('boss@gmail.com','Boss', '123456', true)

UPDATE users
SET admin = true
WHERE user_email = 'havrdaj429@gmail.com'

ALTER TABLE products
    ALTER COLUMN category TYPE VARCHAR(110) DEFAULT 'X'


SELECT * FROM products WHERE name LIKE '%Nike%'