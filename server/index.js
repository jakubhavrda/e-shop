//jshint esversion:7

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");

app.use(cors());
app.use(express.json());
const PORT = 4000;

db.connect();


//AUTH

app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

//OTHER

app.get("/", async(req,res) =>{
    try {
        const response = await db.query("SELECT * FROM products ORDER BY id DESC LIMIT 3")
        res.json(response.rows)
    } catch (err) {
        console.error(err);
    };
});

app.get("/allProducts", async(req, res) => {
    try {
        const response = await db.query("SELECT * FROM products ORDER BY id DESC");
        res.json(response.rows)
    } catch (err) {
        console.error(err);
    };
})

app.post("/admin/create", async(req,res) => {
    try {
        const item = req.body;
        const response = await db.query("INSERT INTO products (name, price, category, in_stock, color, description) VALUES ($1, $2, $3, $4, $5, $6)", 
        item);
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err);
    }
});

app.delete("/admin/delete/:id", async(req,res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await db.query("DELETE FROM products WHERE id = ($1)", [id]);
        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

app.put("/admin/put/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const editData = req.body;
        console.log(editData);

        const result = await db.query(`UPDATE products SET name = ($1), price = ($2), category = ($3), in_stock = ($4), 
        color = ($5), description = ($6)  WHERE id = ${id}`,
        editData);

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
    }
});

// Categories

app.get("/categories/get", async(req, res) => {
    try {
        const result = await db.query("SELECT * FROM categories");
        res.json(result.rows)
    } catch (err) {
        console.error(err);
    }
});


app.post("/categories/create", async(req, res) => {
    try {
        const body = req.body;
        const result = await db.query("INSERT INTO categories (category) VALUES($1)", body);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.delete("/categories/delete/:id", async(req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await db.query("DELETE FROM categories WHERE ctgr_id = ($1)", [id]);
        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

app.get("/discover/:category/:id", async(req, res) => {
    try {
        const params = req.params;
        const result = await db.query("SELECT * FROM products WHERE id = ($1)", [params.id])
        res.json(result.rows)
    } catch (err) {
        console.error(err);
    }
});

// SEARCHBAR

app.post("/searchbar", async(req, res) => {
    try {
       const {name} = req.body;
       const result = await db.query("SELECT * FROM products WHERE name LIKE ($1) ", [name]) 
       res.json(result.rows);
    } catch (err) {
        console.error(err)
    }
});

app.get("/searchbar/:category", async(req, res) => {
    try{
        const {category} = req.params;
        const result = await db.query("SELECT * FROM products WHERE category = ($1)", [category]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
    }
});

// ORDERS
 
app.get("/order/:order_id", async(req, res) => {
    try {
        const { order_id } = req.params;
        const result = await db.query("SELECT * FROM orders WHERE order_id = ($1)", [order_id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
    }
});

app.post("/usersOrders", async(req,res) => {
    try {
        const { user_id } = req.body;
        console.log(user_id);
        const result = await db.query("SELECT * FROM orders WHERE user_id = ($1)", [user_id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});



// LISTEN

app.listen(PORT, function(){
    console.log(`Server runs on port ${PORT}`);
});