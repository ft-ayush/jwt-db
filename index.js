const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
mongoose.connect("mongodb+srv://admin:passkey@cluster0.ufkm8gc.mongodb.net/");

const User = mongoose.model("User", {name: String, email: String, password: String});

app.post("/signup", async (req,res) => {
    username = req.body.username;
    password = req.body.password;
    name = req.body.name;

    existingUser = await User.findOne({email: username});

    if(existingUser)
        return res.status(403).json({msg: "User alredy exists"});

    const user = new User({
        name: name,
        email: username,
        password: password
    })
    user.save()
    res.json({msg: "User created successfully!"})
})

app.listen(3000)