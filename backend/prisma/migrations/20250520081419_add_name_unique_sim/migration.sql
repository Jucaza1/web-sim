/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `simulators` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "simulators_name_key" ON "simulators"("name");
