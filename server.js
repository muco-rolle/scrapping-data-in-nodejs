const express = require("express");
const scrapper = require("./scrapper");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send({ msg: " hello" });
});

app.post("/bank", async (req, res) => {
    const { username, password } = req.body;

    try {
        await scrapper.initialize();
        const scrappedData = await scrapper.login(username, password);
        res.send(scrappedData);
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error try again." });
    }
});

app.listen(3000, () => console.log("app listen on port 3000"));
