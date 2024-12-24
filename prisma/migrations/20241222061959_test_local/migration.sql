-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "place_birth" TEXT NOT NULL,
    "date_birth" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "school_origin" TEXT NOT NULL,
    "major_class" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
