
const router = require("express").Router();
const { User } = require("../models/adminModel/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/abhishek", (req, res) => {
    res.send("working");
});

router.post("/", async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { error } = validate(req.body);
        if (error) {
            console.log("Validation Error:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
       // console.log("User Found:", user);
        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password 1" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log("Valid Password:", validPassword);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password 2" });
        }

        const token = user.generateAuthToken();
        //console.log("Token Generated:", token);
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        console.log("Server Error:", error);
        res.status(500).send({ message: "Internal Server Error abhi" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;
