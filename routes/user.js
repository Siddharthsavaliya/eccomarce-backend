const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controller/user');
const { validateToken } = require('../configuration/token');


router
    .get('/user', validateToken, userController.getUser)
    .get('/user/template', (req, res) => {
        const profiles = [
            {
                name: "SHUBMAN GILL",
                email: "SHUBMANGILL@gmail.com",
                imageUrl: "https://scores.iplt20.com/ipl/playerimages/Shubman%20Gill.png",
                occupation: "Cricketer",
                location: "Delhi"
            },
            {
                name: "SHUBMAN GILL",
                email: "SHUBMANGILL@gmail.com",
                imageUrl: "https://scores.iplt20.com/ipl/playerimages/Shubman%20Gill.png",
                occupation: "Cricketer",
                location: "Delhi"
            }, {
                name: "SHUBMAN GILL",
                email: "SHUBMANGILL@gmail.com",
                imageUrl: "https://scores.iplt20.com/ipl/playerimages/Shubman%20Gill.png",
                occupation: "Cricketer",
                location: "Delhi"
            },
            {
                name: "SHUBMAN GILL",
                email: "SHUBMANGILL@gmail.com",
                imageUrl: "https://scores.iplt20.com/ipl/playerimages/Shubman%20Gill.png",
                occupation: "Cricketer",
                location: "Delhi"
            }
        ]
        res.render("profile", {
            profiles

        });
    })

exports.routes = router;