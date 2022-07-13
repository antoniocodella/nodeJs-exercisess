-- CreateTable
CREATE TABLE "Fruit" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "genere" VARCHAR(255) NOT NULL,
    "famiglia" VARCHAR(255) NOT NULL,
    "calorie" INTEGER NOT NULL,
    "carboidrati" INTEGER NOT NULL,
    "grassi" INTEGER NOT NULL,
    "proteine" INTEGER NOT NULL,
    "zuccheri" INTEGER NOT NULL,
    "prezzo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fruit_pkey" PRIMARY KEY ("id")
);
