/*
  Warnings:

  - You are about to drop the column `repetitionPenalty` on the `Generation` table. All the data in the column will be lost.
  - Added the required column `repetitionPenalty` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "repetitionPenalty",
ADD COLUMN     "repetitionPenalty" DOUBLE PRECISION NOT NULL;
