/*
  Warnings:

  - You are about to drop the column `created_at` on the `food_category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `food_category` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `region` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `region` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user_prefer` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_prefer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `food_category` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `region` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `user_prefer` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;
