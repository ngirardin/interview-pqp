-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "session" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_session_key" ON "User"("session");

INSERT INTO public."User" (email, hash, session) VALUES ('test@test.com', 'a1159e9df3670d549d04524532629f5477ceb7deec9b45e47e8c009506ecb2c8', null);
