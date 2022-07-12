import express from "express";
import "express-async-errors";

const app = express();

app.get("/", (request, response) => {
    response.send("Up and Running!");
});

const port = 3001;

app.listen(port, () => {
    console.log(`[server]: Server in running at http://localhost${port}!`);
});
