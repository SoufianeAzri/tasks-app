/*
  Warnings:

  - The primary key for the `State` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Subtask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_SubtaskMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_TaskMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Subtask" DROP CONSTRAINT "Subtask_managerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Subtask" DROP CONSTRAINT "Subtask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_managerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_stateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_SubtaskMembers" DROP CONSTRAINT "_SubtaskMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_SubtaskMembers" DROP CONSTRAINT "_SubtaskMembers_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TaskMembers" DROP CONSTRAINT "_TaskMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TaskMembers" DROP CONSTRAINT "_TaskMembers_B_fkey";

-- AlterTable
ALTER TABLE "State" DROP CONSTRAINT "State_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "State_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "State_id_seq";

-- AlterTable
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "taskId" SET DATA TYPE TEXT,
ALTER COLUMN "managerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subtask_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subtask_id_seq";

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "stateId" SET DATA TYPE TEXT,
ALTER COLUMN "managerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_SubtaskMembers" DROP CONSTRAINT "_SubtaskMembers_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_SubtaskMembers_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_TaskMembers" DROP CONSTRAINT "_TaskMembers_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_TaskMembers_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskMembers" ADD CONSTRAINT "_TaskMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskMembers" ADD CONSTRAINT "_TaskMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubtaskMembers" ADD CONSTRAINT "_SubtaskMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Subtask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubtaskMembers" ADD CONSTRAINT "_SubtaskMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
