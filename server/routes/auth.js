import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const chatEngineRepsone = await axios.get(
            "https://api.chatengine.io/users/me",
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": username,
                    "User-Secret": password,
                },
            }
        );

        res.status(200).json({
            response: chatEngineRepsone.data,
        });
    } catch (error) {
        console.error("error", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        const chatEngineRepsone = await axios.post(
            "https://api.chatengine.io/users/",
            {
                username: username,
                secret: password,
            },
            {
                headers: {
                    "Private-Key": process.env.PRIVATE_KEY,
                },
            }
        );

        res.status(200).json({
            response: chatEngineRepsone.data,
        });
    } catch (error) {
        console.error("error", error.message);
        res.status(500).json({ error: error.message });
    }
});
export default router;