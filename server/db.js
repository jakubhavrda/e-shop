const pg = require("pg")

const db = new pg.Client({
    user: "postgres",
    password: "Kamen5000",
    host: "localhost",
    post: 5432,
    database: "e-shop"
});


module.exports = db;