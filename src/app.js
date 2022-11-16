const express = require("express");
const connect =  require("./connection/connect");
const loginRouts = require("./routes/login");
const postRouts =require("./routes/post");
const jwt =require("jsonwebtoken");
const secret = "RESTAPI";


const app = express();

app.use("/posts", (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        console.log("Verify token");
        if (token) {        // verify a token symmetric
            jwt.verify(token, secret, function (err, decoded) {
                if(err){
                    return res.status(403).json({
                        status: "failed",
                        message: "Invalid token"
                    })
                }
                req.user = decoded.data;
                next();
            });
        } else {
            return res.status(403).json({
                status: "failed",
                message: "Invalid token"
            })
        }
    }else {
        return res.status(403).json({ status: "Failed", 
        message : "Not authenticated user"});
    }
})

app.use("",loginRouts);
app.use("/posts",postRouts);

// app.get("/", (req, res) => {
//     res.send("Ok");
// });

app.listen(3000, () => console.log("The server is up at 3000 port"));