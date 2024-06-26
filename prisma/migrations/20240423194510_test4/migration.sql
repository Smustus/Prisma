/*
  Warnings:

  - You are about to drop the column `userId` on the `UserPref` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userPrefId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserPref" DROP CONSTRAINT "UserPref_userId_fkey";

-- DropIndex
DROP INDEX "UserPref_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userPrefId" TEXT;

-- AlterTable
ALTER TABLE "UserPref" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userPrefId_key" ON "User"("userPrefId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPrefId_fkey" FOREIGN KEY ("userPrefId") REFERENCES "UserPref"("id") ON DELETE SET NULL ON UPDATE CASCADE;
