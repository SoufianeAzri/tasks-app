/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `State` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[color]` on the table `State` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_color_key" ON "State"("color");
