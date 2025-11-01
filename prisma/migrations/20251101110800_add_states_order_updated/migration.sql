/*
  Warnings:

  - You are about to drop the column `addedDate` on the `State` table. All the data in the column will be lost.
  - You are about to drop the column `lastModified` on the `State` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" DROP COLUMN "addedDate",
DROP COLUMN "lastModified",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
