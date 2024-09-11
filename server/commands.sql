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

ALTER TABLE products
ADD amount integer DEFAULT 1


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


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY UNIQUE,
    user_id UUID REFERENCES users(user_id),
    date_of_creation timestamp,
    paid BOOLEAN DEFAULT false,
    complete BOOLEAN DEFAULT false,
    list_of_items  JSONB DEFAULT [],
    total_price integer NOT NULL
);

ALTER TABLE orders 
ALTER COLUMN date_of_creation TYPE VARCHAR(100)

INSERT INTO orders (user_id, list_of_items, paid, complete, total_price)
VALUES ('9849cee5-ee3e-43b9-a8c2-2df764a3d2e6', '[{"id": 40, "name": "Nike Shirt", "in_stock": 50, "category": "X", "color": "Blue", "price": 499}, {"id": 40, "name": "Nike Shirt", "in_stock": 50, "category": "X", "color": "Blue", "price": 499}]', true, false, 998);

CREATE TABLE images (
    id SERIAL PRIMARY KEY UNIQUE,
    name VARCHAR(100),
    image VARCHAR(200),
    collection INT REFERENCES products(id)
)

SELECT *  FROM products
INNER JOIN images
ON products.id = images.productId

SELECT *  FROM images
INNER JOIN products
ON images.productId = products.id
WHERE products.id = 218 OR products.id = 219

ALTER TABLE users
ADD COLUMN date_of_birth VARCHAR(20) DEFAULT "01-01-2024"