import express from "express";
import "express-async-errors";

const app = express();

app.get("/", (req, res) => {
    res.json({ allora: "TUTTO A POSTO!" });
});

export default app;

