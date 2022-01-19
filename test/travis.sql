CREATE DATABASE  IF NOT EXISTS `unifit` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `unifit`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: unifit
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chiusura`
--

DROP TABLE IF EXISTS `chiusura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chiusura` (
  `idChiusura` int(11) NOT NULL AUTO_INCREMENT,
  `dataChiusura` date NOT NULL,
  `struttura` int(11) NOT NULL,
  PRIMARY KEY (`idChiusura`),
  KEY `fk4_idx` (`struttura`),
  CONSTRAINT `fk4` FOREIGN KEY (`struttura`) REFERENCES `struttura` (`idStruttura`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chiusura`
--

LOCK TABLES `chiusura` WRITE;
/*!40000 ALTER TABLE `chiusura` DISABLE KEYS */;
INSERT INTO `chiusura` VALUES (1,'2021-12-25',1),(2,'2021-12-25',2),(3,'2022-12-25',4),(4,'2022-12-31',4),(5,'2022-12-31',4),(6,'2022-12-25',5),(7,'2022-12-31',5),(8,'2022-12-31',5),(9,'2022-12-25',6),(10,'2022-12-31',6),(11,'2022-12-31',6),(12,'2022-12-25',7),(13,'2022-12-31',7),(14,'2022-12-31',7),(15,'2022-12-25',8),(16,'2022-12-31',8),(17,'2022-12-31',8),(18,'2022-12-25',9),(19,'2022-12-31',9),(20,'2022-12-31',9),(21,'2022-12-25',10),(22,'2022-12-31',10),(23,'2022-12-31',10),(24,'2022-12-25',11),(25,'2022-12-31',11),(26,'2022-12-31',11),(30,'2022-12-25',13),(31,'2022-12-31',13),(32,'2022-12-31',13),(33,'2022-12-25',14),(34,'2022-12-31',14),(35,'2022-12-31',14),(36,'2022-12-25',15),(37,'2022-12-31',15),(38,'2022-12-31',15),(39,'2022-12-25',16),(40,'2022-12-31',16),(41,'2022-12-31',16),(42,'2022-12-25',17),(43,'2022-12-31',17),(44,'2022-12-31',17),(45,'2022-12-25',18),(46,'2022-12-31',18),(47,'2022-12-31',18),(48,'2022-12-25',19),(49,'2022-12-31',19),(50,'2022-12-31',19),(51,'2022-12-25',20),(52,'2022-12-31',20),(53,'2022-12-31',20),(57,'2022-12-25',21),(58,'2022-12-31',21),(59,'2022-12-31',21),(60,'2022-12-25',22),(61,'2022-12-31',22),(62,'2022-12-31',22),(63,'2022-12-25',23),(64,'2022-12-31',23),(65,'2022-12-31',23),(66,'2022-12-25',24),(67,'2022-12-31',24),(68,'2022-12-31',24),(69,'2022-12-25',25),(70,'2022-12-31',25),(71,'2022-12-31',25),(75,'2022-12-25',26),(76,'2022-12-31',26),(77,'2022-12-31',26),(78,'2022-12-25',27),(79,'2022-12-31',27),(80,'2022-12-31',27),(81,'2022-12-25',28),(82,'2022-12-31',28),(83,'2022-12-31',28),(84,'2022-12-25',29),(85,'2022-12-31',29),(86,'2022-12-31',29),(87,'2022-12-25',30),(88,'2022-12-31',30),(89,'2022-12-31',30),(93,'2022-12-25',31),(94,'2022-12-31',31),(95,'2022-12-31',31),(96,'2022-12-25',32),(97,'2022-12-31',32),(98,'2022-12-31',32),(99,'2022-12-25',33),(100,'2022-12-31',33),(101,'2022-12-31',33),(102,'2022-12-25',34),(103,'2022-12-31',34),(104,'2022-12-31',34),(105,'2022-12-25',35),(106,'2022-12-31',35),(107,'2022-12-31',35),(108,'2022-12-25',12),(109,'2022-12-31',12),(110,'2022-12-31',12),(111,'2022-12-25',36),(112,'2022-12-31',36),(113,'2022-12-31',36),(114,'2022-12-25',37),(115,'2022-12-31',37),(116,'2022-12-31',37),(117,'2022-12-25',38),(118,'2022-12-31',38),(119,'2022-12-31',38),(120,'2022-12-25',39),(121,'2022-12-31',39),(122,'2022-12-31',39),(123,'2022-12-25',40),(124,'2022-12-31',40),(125,'2022-12-31',40),(126,'2022-12-25',41),(127,'2022-12-31',41),(128,'2022-12-31',41),(129,'2022-12-25',42),(130,'2022-12-31',42),(131,'2022-12-31',42),(132,'2022-12-25',43),(133,'2022-12-31',43),(134,'2022-12-31',43),(135,'2022-12-25',44),(136,'2022-12-31',44),(137,'2022-12-31',44),(138,'2022-12-25',45),(139,'2022-12-31',45),(140,'2022-12-31',45),(141,'2022-12-25',46),(142,'2022-12-31',46),(143,'2022-12-31',46),(144,'2022-12-31',47),(145,'2022-12-25',47),(146,'2022-12-31',47),(147,'2022-12-25',48),(148,'2022-12-31',48),(149,'2022-12-31',48),(150,'2022-12-25',49),(151,'2022-12-31',49),(152,'2022-12-31',49),(153,'2022-12-25',50),(154,'2022-12-31',50),(155,'2022-12-31',50),(156,'2022-12-25',51),(157,'2022-12-31',51),(158,'2022-12-31',51),(159,'2022-12-31',52),(160,'2022-12-25',52),(161,'2022-12-31',52),(162,'2022-12-25',53),(163,'2022-12-31',53),(164,'2022-12-31',53),(165,'2022-12-25',54),(166,'2022-12-31',54),(167,'2022-12-31',54),(168,'2022-12-25',55),(169,'2022-12-31',55),(170,'2022-12-31',55);
/*!40000 ALTER TABLE `chiusura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fattura`
--

DROP TABLE IF EXISTS `fattura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fattura` (
  `idFattura` int(11) NOT NULL AUTO_INCREMENT,
  `intestatario` varchar(45) NOT NULL,
  `totalePagamento` decimal(4,2) NOT NULL,
  `dataRilascio` date NOT NULL,
  `statusFattura` varchar(45) NOT NULL,
  `richiesta` int(11) DEFAULT NULL,
  `prenotazione` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFattura`),
  KEY `fk5_idx` (`richiesta`),
  KEY `fk6_idx` (`prenotazione`),
  CONSTRAINT `fk5` FOREIGN KEY (`richiesta`) REFERENCES `richiesta_tesseramento` (`idRichiesta_tesseramento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk6` FOREIGN KEY (`prenotazione`) REFERENCES `prenotazione` (`idPrenotazione`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=328 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fattura`
--

LOCK TABLES `fattura` WRITE;
/*!40000 ALTER TABLE `fattura` DISABLE KEYS */;
/*!40000 ALTER TABLE `fattura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prenotazione`
--

DROP TABLE IF EXISTS `prenotazione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prenotazione` (
  `idPrenotazione` int(11) NOT NULL AUTO_INCREMENT,
  `dataPrenotazione` date NOT NULL,
  `oraInizio` time NOT NULL,
  `oraFine` time NOT NULL,
  `totalePagato` decimal(4,2) NOT NULL,
  `utente` int(11) NOT NULL,
  `struttura` int(11) NOT NULL,
  PRIMARY KEY (`idPrenotazione`),
  KEY `fk2_idx` (`utente`),
  KEY `fk3_idx` (`struttura`),
  CONSTRAINT `fk2` FOREIGN KEY (`utente`) REFERENCES `utente` (`idUtente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk3` FOREIGN KEY (`struttura`) REFERENCES `struttura` (`idStruttura`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazione`
--

LOCK TABLES `prenotazione` WRITE;
/*!40000 ALTER TABLE `prenotazione` DISABLE KEYS */;
INSERT INTO `prenotazione` VALUES (75,'2022-01-14','17:00:00','18:00:00',5.00,1,1),(102,'2022-01-15','12:00:00','13:00:00',5.00,1,1),(115,'2022-04-30','18:00:00','19:00:00',5.00,3,3),(122,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(123,'2022-02-25','18:00:00','19:00:00',3.50,11,3),(124,'2022-02-25','20:00:00','21:00:00',3.50,11,3),(125,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(128,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(131,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(132,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(135,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(136,'2022-04-30','11:00:00','12:00:00',5.00,3,3),(139,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(142,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(145,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(148,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(149,'2022-04-30','10:00:00','11:00:00',5.00,3,1),(154,'2022-04-30','10:00:00','11:00:00',5.00,3,1);
/*!40000 ALTER TABLE `prenotazione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `richiesta_tesseramento`
--

DROP TABLE IF EXISTS `richiesta_tesseramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `richiesta_tesseramento` (
  `idRichiesta_tesseramento` int(11) NOT NULL AUTO_INCREMENT,
  `dataRichiesta` date NOT NULL,
  `tipologiaTesseramento` varchar(45) NOT NULL,
  `statusRichiesta` varchar(45) NOT NULL,
  `prezzoTesseramento` decimal(4,2) NOT NULL,
  `certificatoAllegatoPath` varchar(45) NOT NULL,
  `utente` int(11) NOT NULL,
  PRIMARY KEY (`idRichiesta_tesseramento`),
  KEY `fk1_idx` (`utente`),
  CONSTRAINT `fk1` FOREIGN KEY (`utente`) REFERENCES `utente` (`idUtente`) ON UPDATE CASCADE
<<<<<<< HEAD
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
=======
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>>>>>>> PRZ
=======
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>>>>>>> ADM
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `richiesta_tesseramento`
--

LOCK TABLES `richiesta_tesseramento` WRITE;
/*!40000 ALTER TABLE `richiesta_tesseramento` DISABLE KEYS */;
<<<<<<< HEAD
<<<<<<< HEAD
INSERT INTO `richiesta_tesseramento` VALUES (1,'2021-12-10','Interno','Completata',12.00,'/',2),(5,'2022-01-07','Interno','Eseguita',12.00,'/static/richieste_tesseramento/1',1),(13,'2022-01-13','Interno','Eseguita',12.00,'/static/richieste_tesseramento/3',3);
=======
INSERT INTO `richiesta_tesseramento` VALUES (1,'2021-12-10','Interno','Completata',12.00,'/',2),(5,'2022-01-07','Interno','Eseguita',12.00,'/static/richieste_tesseramento/1',1);
>>>>>>> PRZ
=======
INSERT INTO `richiesta_tesseramento` VALUES (1,'2021-12-10','Interno','Completata',12.00,'/',2),(5,'2022-01-07','Interno','Accettata',12.00,'/static/richieste_tesseramento/1',1);
>>>>>>> ADM
/*!40000 ALTER TABLE `richiesta_tesseramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `struttura`
--

DROP TABLE IF EXISTS `struttura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `struttura` (
  `idStruttura` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `prezzoPerFascia` decimal(4,2) NOT NULL,
  `durataPerFascia` int(11) NOT NULL,
  `capacitaPerFascia` int(11) NOT NULL,
  `isCancellata` tinyint(4) NOT NULL DEFAULT '0',
  `oraInizioMattina` time NOT NULL,
  `oraFineMattina` time NOT NULL,
  `oraInizioPomeriggio` time NOT NULL,
  `oraFinePomeriggio` time NOT NULL,
  `dataInizioDisponibilita` date NOT NULL,
  PRIMARY KEY (`idStruttura`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `struttura`
--

LOCK TABLES `struttura` WRITE;
/*!40000 ALTER TABLE `struttura` DISABLE KEYS */;
<<<<<<< HEAD
INSERT INTO `struttura` VALUES (1,'Campo da Tennis',5.00,1,50,0,'09:00:00','13:00:00','15:00:00','18:00:00','2021-12-24'),(2,'Campo da Pallavolo',4.0,0,2,60,0,'09:00:00','13:00:00','14:00:00','19:00:00','2021-12-24');
=======
INSERT INTO `struttura` VALUES (1,'Campo da Tennis',5.00,1,50,0,'09:00:00','13:00:00','15:00:00','18:00:00','2021-12-24'),(2,'Campo da Pallavolo',4.50,2,60,0,'09:00:00','13:00:00','14:00:00','19:00:00','2021-12-24'),(3,'Campo da Calcio',3.50,1,1,0,'09:00:00','13:00:00','14:00:00','21:00:00','2021-12-24'),(4,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(5,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(6,'Campo da basket',20.00,1,30,0,'11:00:00','12:00:00','12:30:00','20:30:00','2022-07-20'),(7,'Campo da basket',20.00,1,30,0,'11:00:00','12:00:00','12:01:00','20:30:00','2022-07-20'),(8,'Campo da basket',20.00,1,30,0,'11:00:00','12:00:00','12:01:00','20:30:00','2022-07-20'),(9,'Campo da basket',20.00,1,30,0,'11:00:00','12:00:00','12:01:00','20:30:00','2022-07-20'),(10,'Campo da basket',20.00,1,30,0,'11:00:00','12:00:00','12:30:00','20:30:00','2022-07-20'),(11,'Campo da basket',20.00,1,30,1,'09:00:00','12:00:00','12:30:00','20:30:00','2022-07-20'),(12,'Campo da basket',20.00,1,30,1,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(13,'Campo da basket',20.00,1,30,0,'09:00:00','12:00:00','12:45:00','20:45:00','2022-07-20'),(14,'Campo da basket',20.00,2,30,1,'09:00:00','13:00:00','14:45:00','20:45:00','2022-07-20'),(15,'Campo da basket',20.00,3,30,0,'07:00:00','13:00:00','14:45:00','20:45:00','2022-07-20'),(16,'Campo da basket',20.00,3,30,0,'09:00:00','12:00:00','14:45:00','20:45:00','2022-07-20'),(17,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(18,'Campo da basket',20.00,1,30,0,'07:15:00','12:15:00','14:00:00','21:00:00','2022-07-20'),(19,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:00:00','20:00:00','2022-07-20'),(20,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:45:00','20:45:00','2022-07-20'),(21,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(22,'Campo da basket',20.00,1,30,0,'07:15:00','12:15:00','14:00:00','21:00:00','2022-07-20'),(23,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:00:00','20:00:00','2022-07-20'),(24,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:45:00','20:45:00','2022-07-20'),(25,'Campo da basket',20.00,3,30,0,'07:00:00','13:00:00','13:30:00','19:30:00','2022-07-20'),(26,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(27,'Campo da basket',20.00,1,30,0,'07:15:00','12:15:00','14:00:00','21:00:00','2022-07-20'),(28,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:00:00','20:00:00','2022-07-20'),(29,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:45:00','20:45:00','2022-07-20'),(30,'Campo da basket',20.00,3,30,0,'07:00:00','13:00:00','13:30:00','19:30:00','2022-07-20'),(31,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(32,'Campo da basket',20.00,1,30,0,'07:15:00','12:15:00','14:00:00','21:00:00','2022-07-20'),(33,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:00:00','20:00:00','2022-07-20'),(34,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:45:00','20:45:00','2022-07-20'),(35,'Campo da basket',20.00,3,30,0,'07:00:00','13:00:00','13:30:00','19:30:00','2022-07-20'),(36,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(37,'Campo da basket',20.00,1,30,0,'07:15:00','12:15:00','14:00:00','21:00:00','2022-07-20'),(38,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:00:00','20:00:00','2022-07-20'),(39,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:45:00','20:45:00','2022-07-20'),(40,'Campo da basket',20.00,3,30,0,'07:00:00','13:00:00','13:30:00','19:30:00','2022-07-20'),(41,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(42,'Campo da basket',20.00,1,30,0,'07:15:00','12:15:00','14:00:00','21:00:00','2022-07-20'),(43,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:00:00','20:00:00','2022-07-20'),(44,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:45:00','20:45:00','2022-07-20'),(45,'Campo da basket',20.00,3,30,0,'07:00:00','13:00:00','13:30:00','19:30:00','2022-07-20'),(46,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(47,'Campo da basket',20.00,1,30,0,'07:15:00','12:15:00','14:00:00','21:00:00','2022-07-20'),(48,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:00:00','20:00:00','2022-07-20'),(49,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:45:00','20:45:00','2022-07-20'),(50,'Campo da basket',20.00,3,30,0,'07:00:00','13:00:00','13:30:00','19:30:00','2022-07-20'),(51,'Campo da basket',20.00,1,30,0,'07:00:00','12:00:00','14:00:00','21:00:00','2022-07-20'),(52,'Campo da basket',20.00,1,30,0,'07:15:00','12:15:00','14:00:00','21:00:00','2022-07-20'),(53,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:00:00','20:00:00','2022-07-20'),(54,'Campo da basket',20.00,2,30,0,'07:45:00','13:45:00','14:45:00','20:45:00','2022-07-20'),(55,'Campo da basket',20.00,3,30,0,'07:00:00','13:00:00','13:30:00','19:30:00','2022-07-20');
>>>>>>> ADM
/*!40000 ALTER TABLE `struttura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utente` (
  `idUtente` int(11) NOT NULL AUTO_INCREMENT,
  `codiceFiscale` varchar(45) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `cognome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` mediumtext NOT NULL,
  `dataNascita` date NOT NULL,
  `indirizzoResidenza` varchar(45) NOT NULL,
  `numeroTelefono` varchar(45) NOT NULL,
  `nazionalita` varchar(45) NOT NULL,
  `isAdmin` tinyint(4) DEFAULT '0',
  `isCancellato` tinyint(4) DEFAULT '0',
  `tokenRecuperoPassword` mediumtext,
  `dataScadenzaTokenRP` date DEFAULT NULL,
  `isTesserato` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`idUtente`),
  UNIQUE KEY `codiceFiscale_UNIQUE` (`codiceFiscale`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
<<<<<<< HEAD
<<<<<<< HEAD
INSERT INTO `utente` VALUES (1,'TTORMN80C20G039H','Erminio','Ottone','erminio@gmail.com','6fa98f2a696f1fd07b2277400f2864bdb058e2e0e7c36e74c203e8b6f736c5a50d2290327beb7800f3d2ba72c4eb193ae69f93f7c7f33908d652820c717bde4e','1980-03-20','Via Carmine, 43','3334567890','Italia',0,0,NULL,NULL,1),(2,'RSSGNN78G12H703G','Gianni','Russo','gianni@gmail.com','8f896b3f5bbff11896e6242874439980f5e1509c6c2973471ed86d8b47cd9a8c98966362394d48d19c3ca08a0de39fdaf6b9a4672d8dfa1ca286d6768d6dff6d','1978-06-12','Via Rosati, 3','3456789123','Italia',0,0,NULL,NULL,1),(3,'TTRMRL12B43J902Z','Marilina','Tortora','lina@gmail.com','f0cca60b54cf41533a0824b705279188925fb3e5073315ad0806a831b051e70b1d179c6bf025a6c53796a6f4dee5fe60bfce7ad190138aa55979947b142a6924','1990-02-12','Via Roncato, 23','3345678419','Italia',1,0,NULL,NULL,0),(4,'CSTMRZ40B23H703N','Maurizio','Costanzo','maurizio@gmail.com','0db6a404a2926e61d7dca78d8be791bede76ebb79ee4d5c05daaf850284f54b298a508e5945fa8b9c0cfb3fc6bc67430d6283b691f556cb74bb640ff9fd708de','1940-02-23','Via del Collo, 22','3344545673','Italia',0,0,NULL,NULL,0),(5,'CVLDNT86S12K865G','Donato','Cavallo','donato@gmail.com','51d10c0b2628bf30d3be00e19559aef295c5a350fcf5a1653c7a5681c73141fb3e27a849b9109e9138701635896b402a69b2e79d5c0906f4dd8ae0fc790eaa2e','1982-02-23','Via del Cornetto, 22','3344545673','Italia',0,0,NULL,NULL,0),(8,'DLLAAT80A01A509R','Matteo','Della Rocca','deleeeeeel@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','1999-01-02','Via CCCC','3277728490','italia',0,0,NULL,NULL,0),(10,'DVDSST80A01A509R','hasubbbaa','Bottiglieri','jovelak228@whecode.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2022-01-02','Via CCCC','3277728490','italia',0,1,'f912d68dad4a6174afcf488c96304dee7159ac8b9a31cab9895b62f5ef353d964b1d4a4f7a372057e51d5e53931cbbb9b9aec2f3ae729879aa0488f603c952c9','2022-01-08',0),(11,'DVDGST80A01A509R','Gianni Alfonso','Bottiglieri','dellarocca16@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2020-02-28','Via Ros!ti, 45','1111111111','italia',0,1,NULL,NULL,0);
=======
INSERT INTO `utente` VALUES (1,'TTORMN80C20G039H','Erminio','Ottone','erminio@gmail.com','6fa98f2a696f1fd07b2277400f2864bdb058e2e0e7c36e74c203e8b6f736c5a50d2290327beb7800f3d2ba72c4eb193ae69f93f7c7f33908d652820c717bde4e','1980-03-20','Via Carmine, 43','3334567890','Italia',0,0,NULL,NULL,0),(2,'RSSGNN78G12H703G','Gianni','Russo','gianni@gmail.com','8f896b3f5bbff11896e6242874439980f5e1509c6c2973471ed86d8b47cd9a8c98966362394d48d19c3ca08a0de39fdaf6b9a4672d8dfa1ca286d6768d6dff6d','1978-06-12','Via Rosati, 3','3456789123','Italia',0,0,NULL,NULL,1),(3,'TTRMRL12B43J902Z','Marilina','Tortora','lina@gmail.com','f0cca60b54cf41533a0824b705279188925fb3e5073315ad0806a831b051e70b1d179c6bf025a6c53796a6f4dee5fe60bfce7ad190138aa55979947b142a6924','1990-02-12','Via Roncato, 23','3345678419','Italia',1,0,NULL,NULL,0),(4,'CSTMRZ40B23H703N','Maurizio','Costanzo','maurizio@gmail.com','0db6a404a2926e61d7dca78d8be791bede76ebb79ee4d5c05daaf850284f54b298a508e5945fa8b9c0cfb3fc6bc67430d6283b691f556cb74bb640ff9fd708de','1940-02-23','Via del Collo, 22','3344545673','Italia',0,0,NULL,NULL,0),(5,'CVLDNT86S12K865G','Donato','Cavallo','donato@gmail.com','51d10c0b2628bf30d3be00e19559aef295c5a350fcf5a1653c7a5681c73141fb3e27a849b9109e9138701635896b402a69b2e79d5c0906f4dd8ae0fc790eaa2e','1982-02-23','Via del Cornetto, 22','3344545673','Italia',0,0,NULL,NULL,0),(8,'DLLAAT80A01A509R','Matteo','Della Rocca','deleeeeeel@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','1999-01-02','Via CCCC','3277728490','italia',0,0,NULL,NULL,0),(10,'DVDSST80A01A509R','hasubbbaa','Bottiglieri','jovelak228@whecode.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2022-01-02','Via CCCC','3277728490','italia',0,1,'f912d68dad4a6174afcf488c96304dee7159ac8b9a31cab9895b62f5ef353d964b1d4a4f7a372057e51d5e53931cbbb9b9aec2f3ae729879aa0488f603c952c9','2022-01-08',0),(11,'DVDGST80A01A509R','Gianni Alfonso','Bottiglieri','dellarocca16@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2020-02-28','Via Ros!ti, 45','1111111111','italia',0,1,NULL,NULL,0);
>>>>>>> PRZ
=======
INSERT INTO `utente` VALUES (1,'TTORMN80C20G039H','Erminio','Ottone','erminio@gmail.com','3fc03eaad57a7cf84415c6012efc4fa16b99499e1ec89c96d12ac76c31e20f522438290a446d62c9e693825396cea7dc3558c49c05d4d4697e70e740c9c63ff0','1980-03-20','Via Carmine, 43','3334567890','Italia',0,0,NULL,NULL,1),(2,'RSSGNN78G12H703G','Gianni','Russo','gianni@gmail.com','3fc03eaad57a7cf84415c6012efc4fa16b99499e1ec89c96d12ac76c31e20f522438290a446d62c9e693825396cea7dc3558c49c05d4d4697e70e740c9c63ff0','1978-06-12','Via Rosati, 3','3456789123','Italia',0,0,NULL,NULL,1),(3,'TTRMRL12B43J902Z','Marilina','Tortora','lina@gmail.com','8450eca01665516d9aeb5317764902b78495502637c96192c81b1683d32d691a0965cf037feca8b9ed9ee6fc6ab8f27fce8f77c4fd9b4a442a00fc317b8237e6','1990-02-12','Via Roncato, 23','3345678419','Italia',1,0,NULL,NULL,0),(4,'CSTMRZ40B23H703N','Maurizio','Costanzo','maurizio@gmail.com','3fc03eaad57a7cf84415c6012efc4fa16b99499e1ec89c96d12ac76c31e20f522438290a446d62c9e693825396cea7dc3558c49c05d4d4697e70e740c9c63ff0','1940-02-23','Via del Collo, 22','3344545673','Italia',0,0,NULL,NULL,0),(5,'CVLDNT86S12K865G','Gianni Alfonso','Bottiglieri','donato@gmail.com','3fc03eaad57a7cf84415c6012efc4fa16b99499e1ec89c96d12ac76c31e20f522438290a446d62c9e693825396cea7dc3558c49c05d4d4697e70e740c9c63ff0','1990-12-12','Via Palmieri, 22','3333333333','Italia',0,1,NULL,NULL,0),(8,'DLLAAT80A01A509R','Matteo','Della Rocca','deleeeeeel@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','1999-01-02','Via CCCC','3277728490','italia',0,0,NULL,NULL,0),(10,'DVDSST80A01A509R','hasubbbaa','Bottiglieri','jovelak228@whecode.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2022-01-02','Via CCCC','3277728490','italia',0,0,'f912d68dad4a6174afcf488c96304dee7159ac8b9a31cab9895b62f5ef353d964b1d4a4f7a372057e51d5e53931cbbb9b9aec2f3ae729879aa0488f603c952c9','2022-01-08',0),(11,'DVDGST80A01A509R','Gianni Alfonso','Bottiglieri','dellarocca16@gmail.com','b01a646ba766b4fc33d539e8ac89babbabb31841ec777b891f39a30154381f1b5beb76b84be66c3f410325fd7c7d04c1797075139b6e83a45ce2fc0ec9e4014f','2020-02-28','Via Ros!ti, 45','1111111111','italia',0,0,NULL,NULL,0),(13,'DVDGST80A01A509M','Gianni','Morandi','dellarcca16@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2020-02-28','Via Ros!ti, 45','1111111111','italia',0,0,NULL,NULL,0),(14,'DSDGST80A01A509R','Gianni','Morandi','dellarscca16@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2020-02-28','Via Ros!ti, 45','1111111111','italia',0,0,NULL,NULL,0),(20,'ANNANANANNANAA','Anna','Falchi','annaf@munnez.it','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2022-01-02','Via CCCC','3277728490','italia',0,1,'f912d68dad4a6174afcf488c96304dee7159ac8b9a31cab9895b62f5ef353d964b1d4a4f7a372057e51d5e53931cbbb9b9aec2f3ae729879aa0488f603c952c9','2022-01-08',0);
>>>>>>> ADM
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

<<<<<<< HEAD
<<<<<<< HEAD
-- Dump completed on 2022-01-13 19:54:07
=======
-- Dump completed on 2022-01-13 18:41:57
>>>>>>> PRZ
=======
-- Dump completed on 2022-01-18 12:18:17
>>>>>>> ADM
