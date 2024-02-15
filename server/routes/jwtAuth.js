const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db");

const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async(req, res) => {
    try {
        // 1 destructure req.body
            const {name, email, password} = req.body;

        // 2. check if user exists
            const user = await db.query("SELECT * FROM users WHERE user_email = ($1)", [email])

            if (user.rows.length !== 0) {
                return res.status(401).json("User already exists! 401");
            };

        // 3. bcrypt password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);

            const bcryptPassword = await bcrypt.hash(password, salt);
        // 4. enter new user in to the database
            const newUser = await db.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", 
            [name, email, bcryptPassword]
            );

        // 5. generate token
            const token = jwtGenerator(newUser.rows[0].user_id);
            res.json({ token });

    } catch (err) {
        console.error(err.message);
    }
    
});


router.post("/login", validInfo, async(req ,res) => {
    try {
        // 1. destructure req.body
                const {email, password} = req.body;

            // 2. check if user exists
                const user = await db.query("SELECT * FROM users WHERE user_email = ($1)", [email]);

                if(user.rows.length == 0){
                    return res.status(401).json("Email or Password is incorrect!");
                };
            // 3. compare password to database
                const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
                if(!validPassword){
                    return res.status(401).json("Password is Incorrect!");
                }
            // 4. send back token
                const token = jwtGenerator(user.rows[0].user_id);
                res.json({ token });
    } catch (err) {
        console.error(err.message);
    };
     
});

router.get("/verify", authorization, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router; 