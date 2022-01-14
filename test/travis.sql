-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: unifit
-- ------------------------------------------------------
-- Server version	8.0.22

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
  `idChiusura` int NOT NULL AUTO_INCREMENT,
  `dataChiusura` date NOT NULL,
  `struttura` int NOT NULL,
  PRIMARY KEY (`idChiusura`),
  KEY `fk4_idx` (`struttura`),
  CONSTRAINT `fk4` FOREIGN KEY (`struttura`) REFERENCES `struttura` (`idStruttura`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chiusura`
--

LOCK TABLES `chiusura` WRITE;
/*!40000 ALTER TABLE `chiusura` DISABLE KEYS */;
INSERT INTO `chiusura` VALUES (1,'2021-12-25',1),(2,'2021-12-25',2);
/*!40000 ALTER TABLE `chiusura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fattura`
--

DROP TABLE IF EXISTS `fattura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fattura` (
  `idFattura` int NOT NULL AUTO_INCREMENT,
  `intestatario` varchar(45) NOT NULL,
  `totalePagamento` decimal(4,2) NOT NULL,
  `dataRilascio` date NOT NULL,
  `statusFattura` varchar(45) NOT NULL,
  `richiesta` int DEFAULT NULL,
  `prenotazione` int DEFAULT NULL,
  PRIMARY KEY (`idFattura`),
  KEY `fk5_idx` (`richiesta`),
  KEY `fk6_idx` (`prenotazione`),
  CONSTRAINT `fk5` FOREIGN KEY (`richiesta`) REFERENCES `richiesta_tesseramento` (`idRichiesta_tesseramento`) ON UPDATE CASCADE,
  CONSTRAINT `fk6` FOREIGN KEY (`prenotazione`) REFERENCES `prenotazione` (`idPrenotazione`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fattura`
--

LOCK TABLES `fattura` WRITE;
/*!40000 ALTER TABLE `fattura` DISABLE KEYS */;
INSERT INTO `fattura` VALUES (1,'Gianni Russo',12.00,'2021-12-20','Pagata',1,NULL),(2,'Peppe Socks',5.00,'2022-01-11','Pagata',NULL,14),(3,'Peppe Socks',5.00,'2022-01-11','Pagata',NULL,15),(5,'Peppe Socks',4.50,'2022-01-11','Pagata',NULL,16),(6,'Peppe Socks',4.50,'2022-01-11','Pagata',NULL,17),(7,'Peppe Socks',4.50,'2022-01-11','Pagata',NULL,18);
/*!40000 ALTER TABLE `fattura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prenotazione`
--

DROP TABLE IF EXISTS `prenotazione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prenotazione` (
  `idPrenotazione` int NOT NULL AUTO_INCREMENT,
  `dataPrenotazione` date NOT NULL,
  `oraInizio` time NOT NULL,
  `oraFine` time NOT NULL,
  `totalePagato` decimal(4,2) NOT NULL,
  `utente` int NOT NULL,
  `struttura` int NOT NULL,
  PRIMARY KEY (`idPrenotazione`),
  KEY `fk2_idx` (`utente`),
  KEY `fk3_idx` (`struttura`),
  CONSTRAINT `fk2` FOREIGN KEY (`utente`) REFERENCES `utente` (`idUtente`) ON UPDATE CASCADE,
  CONSTRAINT `fk3` FOREIGN KEY (`struttura`) REFERENCES `struttura` (`idStruttura`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazione`
--

LOCK TABLES `prenotazione` WRITE;
/*!40000 ALTER TABLE `prenotazione` DISABLE KEYS */;
INSERT INTO `prenotazione` VALUES (1,'2021-12-27','10:00:00','11:00:00',5.00,2,1),(3,'2021-12-26','08:00:00','10:00:00',5.00,1,1),(5,'2021-12-26','08:00:00','10:00:00',5.00,1,1),(6,'2021-12-26','08:00:00','10:00:00',5.00,1,1),(7,'2021-12-26','08:00:00','10:00:00',5.00,10,1),(8,'2021-12-26','08:00:00','10:00:00',5.00,2,1),(9,'2021-12-26','08:00:00','10:00:00',5.00,2,1),(10,'2021-12-26','08:00:00','10:00:00',5.00,2,1),(11,'2021-12-26','08:00:00','10:00:00',5.00,2,1),(12,'2021-12-28','10:00:00','11:00:00',5.00,3,1),(13,'2021-12-28','10:00:00','11:00:00',5.00,3,1),(14,'2021-12-28','10:00:00','11:00:00',5.00,3,1),(15,'2023-12-28','10:00:00','11:00:00',5.00,3,1),(16,'2022-11-25','09:00:00','11:00:00',4.50,5,2),(17,'2022-11-25','11:00:00','13:00:00',4.50,5,2),(18,'2022-12-28','09:00:00','11:00:00',4.50,3,2);
/*!40000 ALTER TABLE `prenotazione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `richiesta_tesseramento`
--

DROP TABLE IF EXISTS `richiesta_tesseramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `richiesta_tesseramento` (
  `idRichiesta_tesseramento` int NOT NULL AUTO_INCREMENT,
  `dataRichiesta` date NOT NULL,
  `tipologiaTesseramento` varchar(45) NOT NULL,
  `statusRichiesta` varchar(45) NOT NULL,
  `prezzoTesseramento` decimal(4,2) NOT NULL,
  `certificatoAllegatoPath` varchar(45) NOT NULL,
  `utente` int NOT NULL,
  PRIMARY KEY (`idRichiesta_tesseramento`),
  KEY `fk1_idx` (`utente`),
  CONSTRAINT `fk1` FOREIGN KEY (`utente`) REFERENCES `utente` (`idUtente`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `richiesta_tesseramento`
--

LOCK TABLES `richiesta_tesseramento` WRITE;
/*!40000 ALTER TABLE `richiesta_tesseramento` DISABLE KEYS */;
INSERT INTO `richiesta_tesseramento` VALUES (1,'2021-12-10','Interno','Completata',12.00,'/',2),(5,'2022-01-07','Interno','Eseguita',12.00,'/static/richieste_tesseramento/1',1);
/*!40000 ALTER TABLE `richiesta_tesseramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `struttura`
--

DROP TABLE IF EXISTS `struttura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `struttura` (
  `idStruttura` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `prezzoPerFascia` decimal(4,2) NOT NULL,
  `durataPerFascia` int NOT NULL,
  `capacitaPerFascia` int NOT NULL,
  `isCancellata` tinyint NOT NULL DEFAULT '0',
  `oraInizioMattina` time NOT NULL,
  `oraFineMattina` time NOT NULL,
  `oraInizioPomeriggio` time NOT NULL,
  `oraFinePomeriggio` time NOT NULL,
  `dataInizioDisponibilita` date NOT NULL,
  PRIMARY KEY (`idStruttura`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `struttura`
--

LOCK TABLES `struttura` WRITE;
/*!40000 ALTER TABLE `struttura` DISABLE KEYS */;
INSERT INTO `struttura` VALUES (1,'Campo da Tennis',5.00,1,50,0,'09:00:00','13:00:00','15:00:00','18:00:00','2021-12-24'),(2,'Campo da Pallavolo',4.0,0,2,60,0,'09:00:00','13:00:00','14:00:00','19:00:00','2021-12-24');
/*!40000 ALTER TABLE `struttura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utente` (
  `idUtente` int NOT NULL AUTO_INCREMENT,
  `codiceFiscale` varchar(45) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `cognome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` mediumtext NOT NULL,
  `dataNascita` date NOT NULL,
  `indirizzoResidenza` varchar(45) NOT NULL,
  `numeroTelefono` varchar(45) NOT NULL,
  `nazionalita` varchar(45) NOT NULL,
  `isAdmin` tinyint DEFAULT '0',
  `isCancellato` tinyint DEFAULT '0',
  `tokenRecuperoPassword` mediumtext,
  `dataScadenzaTokenRP` date DEFAULT NULL,
  `isTesserato` tinyint DEFAULT '0',
  PRIMARY KEY (`idUtente`),
  UNIQUE KEY `codiceFiscale_UNIQUE` (`codiceFiscale`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES (1,'TTORMN80C20G039H','Erminio','Ottone','erminio@gmail.com','6fa98f2a696f1fd07b2277400f2864bdb058e2e0e7c36e74c203e8b6f736c5a50d2290327beb7800f3d2ba72c4eb193ae69f93f7c7f33908d652820c717bde4e','1980-03-20','Via Carmine, 43','3334567890','Italia',0,0,NULL,NULL,0),(2,'RSSGNN78G12H703G','Gianni','Russo','gianni@gmail.com','8f896b3f5bbff11896e6242874439980f5e1509c6c2973471ed86d8b47cd9a8c98966362394d48d19c3ca08a0de39fdaf6b9a4672d8dfa1ca286d6768d6dff6d','1978-06-12','Via Rosati, 3','3456789123','Italia',0,0,NULL,NULL,1),(3,'TTRMRL12B43J902Z','Marilina','Tortora','lina@gmail.com','f0cca60b54cf41533a0824b705279188925fb3e5073315ad0806a831b051e70b1d179c6bf025a6c53796a6f4dee5fe60bfce7ad190138aa55979947b142a6924','1990-02-12','Via Roncato, 23','3345678419','Italia',1,0,NULL,NULL,0),(4,'CSTMRZ40B23H703N','Maurizio','Costanzo','maurizio@gmail.com','0db6a404a2926e61d7dca78d8be791bede76ebb79ee4d5c05daaf850284f54b298a508e5945fa8b9c0cfb3fc6bc67430d6283b691f556cb74bb640ff9fd708de','1940-02-23','Via del Collo, 22','3344545673','Italia',0,0,NULL,NULL,0),(5,'CVLDNT86S12K865G','Donato','Cavallo','donato@gmail.com','51d10c0b2628bf30d3be00e19559aef295c5a350fcf5a1653c7a5681c73141fb3e27a849b9109e9138701635896b402a69b2e79d5c0906f4dd8ae0fc790eaa2e','1982-02-23','Via del Cornetto, 22','3344545673','Italia',0,0,NULL,NULL,0),(8,'DLLAAT80A01A509R','Matteo','Della Rocca','deleeeeeel@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','1999-01-02','Via CCCC','3277728490','italia',0,0,NULL,NULL,0),(10,'DVDSST80A01A509R','hasubbbaa','Bottiglieri','jovelak228@whecode.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2022-01-02','Via CCCC','3277728490','italia',0,1,'f912d68dad4a6174afcf488c96304dee7159ac8b9a31cab9895b62f5ef353d964b1d4a4f7a372057e51d5e53931cbbb9b9aec2f3ae729879aa0488f603c952c9','2022-01-08',0),(11,'DVDGST80A01A509R','Gianni Alfonso','Bottiglieri','dellarocca16@gmail.com','b2a8e225b0550aebaa7eb7b4e2948287c433288d041cb880771b82f4da5575298f595d48d843b28c4d6864c82f8738dabd788c505f86bc1f20d5e0d9a0051517','2020-02-28','Via Ros!ti, 45','1111111111','italia',0,1,NULL,NULL,0);
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

-- Dump completed on 2022-01-13 18:41:57
