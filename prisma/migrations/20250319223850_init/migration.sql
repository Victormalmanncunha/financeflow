-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(100) NOT NULL,
    `userEmail` VARCHAR(255) NOT NULL,
    `userPhone` VARCHAR(20) NOT NULL,
    `userPassword` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_userEmail_key`(`userEmail`),
    UNIQUE INDEX `User_userPhone_key`(`userPhone`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
