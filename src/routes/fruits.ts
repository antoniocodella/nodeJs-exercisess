import express, { Router } from "express";

import prisma from "../lib/prisma/client";

import { checkAuthorization } from "../lib/middleware/passport";
import { initMulterMiddleware } from "../lib/middleware/multer";

const upload = initMulterMiddleware();

const router = Router();

router.get("/", async (request, response) => {
    const fruits = await prisma.fruit.findMany();

    response.json(fruits);
});

router.get("/:id(\\d+)", async (request, response) => {
    const fruitId = Number(request.params.id);

    const fruit = await prisma.fruit.findUnique({
        where: { id: fruitId },
    });

    response.json(fruit);
});

router.post("/", checkAuthorization, async (request, response) => {
    const fruitData = request.body;
    const username = request.user?.username as string;

    const fruit = await prisma.fruit.create({
        data: {
            ...fruitData,
            createdBy: username,
            updatedBy: username,
        },
    });

    response.status(201).json(fruit);
});

router.put(
    "/:id(\\d+)",
    checkAuthorization,
    async (request, response, next) => {
        const fruitData = request.body;
        const fruitId = Number(request.params.id);
        const username = request.user?.username as string;

        try {
            const fruit = await prisma.fruit.update({
                where: { id: fruitId },
                data: { ...fruitData, updatedBy: username },
            });

            response.status(200).json(fruit);
        } catch (error) {
            response.status(404);
            next(`Cannot PUT /fruits/${fruitId}`);
        }
    }
);

router.delete(
    "/:id(\\d+)",
    checkAuthorization,
    async (request, response, next) => {
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
    }
);

router.post(
    "/:id(\\d+)/photo",
    checkAuthorization,
    upload.single("photo"),
    async (request, response, next) => {
        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded");
        }

        const fruitId = Number(request.params.id);
        const photoFilename = request.file.filename;

        try {
            await prisma.fruit.update({
                where: { id: fruitId },
                data: { photoFilename },
            });
        } catch (error) {
            response.status(404);
            next(`Cannot POST /fruits/${fruitId}/photo`);
        }

        // response.status(201).json({ photoFilename });
    }
);

router.use("/photos", express.static("uploads"));

export default router;

