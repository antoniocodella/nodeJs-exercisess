import express from "express";
import "express-async-errors";

const app = express();

app.get("/fruits", (request, response) => {
    response.json({
        nome: "Mela",
        genere: "Malus",
        famiglia: "Rosaceae",
        calorie: 52,
        carboidrati: 11,
        grassi: 1,
        proteine: 1,
        zuccheri: 10,
        prezzo: 2,
    });
});

export default app;

