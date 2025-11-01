/*
  Warnings:

  - Added the required column `lastModified` to the `Subtask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL;
