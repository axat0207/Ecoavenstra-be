-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'employer');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
