-- CreateEnum
CREATE TYPE "Periorite" AS ENUM ('HAUT', 'MOYENNE', 'BAS');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "periorite" "Periorite" NOT NULL DEFAULT 'HAUT';
