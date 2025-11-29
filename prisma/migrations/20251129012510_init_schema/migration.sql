/*
  Warnings:

  - The primary key for the `Alert` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Hospital` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EXECUTIVE', 'DEPARTMENT', 'ADMIN');

-- DropForeignKey
ALTER TABLE "AdmissionsDaily" DROP CONSTRAINT "AdmissionsDaily_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentCapacity" DROP CONSTRAINT "DepartmentCapacity_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "PredictionsDaily" DROP CONSTRAINT "PredictionsDaily_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "ReportGenerated" DROP CONSTRAINT "ReportGenerated_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "StaffDailyStatus" DROP CONSTRAINT "StaffDailyStatus_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_hospitalId_fkey";

-- DropIndex
DROP INDEX "AdmissionsDaily_date_hospitalId_key";

-- DropIndex
DROP INDEX "AqiDaily_date_city_idx";

-- DropIndex
DROP INDEX "Patient_admissionDate_hospitalId_idx";

-- DropIndex
DROP INDEX "PredictionsDaily_date_hospitalId_modelVersion_key";

-- DropIndex
DROP INDEX "ReportGenerated_date_hospitalId_idx";

-- DropIndex
DROP INDEX "StaffDailyStatus_date_hospitalId_idx";

-- DropIndex
DROP INDEX "WeatherDaily_date_city_idx";

-- AlterTable
ALTER TABLE "AdmissionsDaily" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "hospitalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "hospitalId" SET DATA TYPE TEXT,
ALTER COLUMN "timestamp" DROP DEFAULT,
ADD CONSTRAINT "Alert_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AqiDaily" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "DepartmentCapacity" ALTER COLUMN "hospitalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Festival" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "region" DROP NOT NULL,
ALTER COLUMN "administratorName" DROP NOT NULL,
ADD CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "hospitalId" SET DATA TYPE TEXT,
ALTER COLUMN "admissionDate" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PredictionsDaily" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "hospitalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ReportGenerated" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "hospitalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StaffDailyStatus" ALTER COLUMN "hospitalId" SET DATA TYPE TEXT,
ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WeatherDaily" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "hospitalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionsDaily" ADD CONSTRAINT "AdmissionsDaily_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentCapacity" ADD CONSTRAINT "DepartmentCapacity_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffDailyStatus" ADD CONSTRAINT "StaffDailyStatus_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionsDaily" ADD CONSTRAINT "PredictionsDaily_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportGenerated" ADD CONSTRAINT "ReportGenerated_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
