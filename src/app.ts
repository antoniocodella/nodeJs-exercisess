import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";
import cors from "cors";
import { initMulterMiddleware } from "./lib/middleware/multer";

const upload = initMulterMiddleware();

const corsOptions = {
    origin: "http://localhost:8080",
};

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.get("/fruits", async (request, response) => {
    const fruits = await prisma.fruit.findMany();

    response.json(fruits);
});

app.get("/fruits/:id(\\d+)", async (request, response) => {
    const fruitId = Number(request.params.id);

    const fruit = await prisma.fruit.findUnique({
        where: { id: fruitId },
    });

    response.json(fruit);
});

app.post("/fruits", async (request, response) => {
    const fruitData = request.body;

    const fruit = await prisma.fruit.create({ data: fruitData });

    response.status(201).json(fruit);
});

app.put("/fruits/:id(\\d+)", async (request, response, next) => {
    const fruitData = request.body;
    const fruitId = Number(request.params.id);

    try {
        const fruit = await prisma.fruit.update({
            where: { id: fruitId },
            data: fruitData,
        });

        response.status(200).json(fruit);
    } catch (error) {
        response.status(404);
        next(`Cannot PUT /fruits/${fruitId}`);
    }
});

app.delete("/fruits/:id(\\d+)", async (request, response, next) => {
    const fruitId = Number(request.params.id);

    try {
        await prisma.fruit.delete({
            where: { id: fruitId },
        });

        response.status(200).end();
    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /fruits/${fruitId}`);
    }
});

app.post(
    "/fruits/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {
        console.log("request.file", request.file);

        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded");
        }

        const photoFilename = request.file.filename;

        response.status(201).json({ photoFilename });
    }
);

export default app;

