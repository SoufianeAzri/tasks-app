-- DropForeignKey
ALTER TABLE "public"."Subtask" DROP CONSTRAINT "Subtask_taskId_fkey";

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
