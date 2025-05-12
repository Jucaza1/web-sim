/*
  Warnings:

  - Added the required column `thumbnail` to the `simulators` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "simulators" DROP CONSTRAINT "simulators_company_id_fkey";

-- AlterTable
ALTER TABLE "simulators" ADD COLUMN     "thumbnail" TEXT NOT NULL,
ALTER COLUMN "company_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "simulators" ADD CONSTRAINT "simulators_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
