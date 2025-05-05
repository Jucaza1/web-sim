-- DropForeignKey
ALTER TABLE "simulator_webgls" DROP CONSTRAINT "simulator_webgls_simulator_id_fkey";

-- AddForeignKey
ALTER TABLE "simulator_webgls" ADD CONSTRAINT "simulator_webgls_simulator_id_fkey" FOREIGN KEY ("simulator_id") REFERENCES "simulators"("id") ON DELETE CASCADE ON UPDATE CASCADE;
