-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `portfolio` DEFAULT CHARACTER SET utf8 ;
USE `portfolio` ;

-- -----------------------------------------------------
-- Table `portfolio`.`Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`Admin` (
  `id_admin` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(126) NOT NULL,
  `password` VARCHAR(126) NOT NULL,
  PRIMARY KEY (`id_admin`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`User` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(60) NOT NULL,
  `email` VARCHAR(126) NOT NULL,
  `password` VARCHAR(126) NOT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`Theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`Theme` (
  `id_theme` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id_theme`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`Category` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(126) NOT NULL,
  `picture_url` LONGTEXT NOT NULL,
  `Theme_id_theme` INT NOT NULL,
  `Admin_id_admin` INT NOT NULL,
  PRIMARY KEY (`id_category`, `Admin_id_admin`),
  INDEX `fk_Category_Theme_idx` (`Theme_id_theme` ASC),
  INDEX `fk_Category_Admin1_idx` (`Admin_id_admin` ASC),
  CONSTRAINT `fk_Category_Theme`
    FOREIGN KEY (`Theme_id_theme`)
    REFERENCES `portfolio`.`Theme` (`id_theme`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_Category_Admin1`
    FOREIGN KEY (`Admin_id_admin`)
    REFERENCES `portfolio`.`Admin` (`id_admin`)
    ON DELETE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
