DROP TABLE IF EXISTS `node`;
CREATE TABLE `node` (
  `id` int NOT NULL,
  `x` int NOT NULL,
  `y` int NOT NULL,
  `kind` int NOT NULL,
  `roads` json DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `block` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `node` WRITE;
INSERT INTO `node` VALUES (1,492,186,false,'[1]','未命名','{}'),(2,814,281,false,'[1]','未命名','{}');
UNLOCK TABLES;
DROP TABLE IF EXISTS `road`;
CREATE TABLE `road` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `top` int NOT NULL,
  `left` int NOT NULL,
  `distance` int NOT NULL,
  `thickness` int NOT NULL,
  `angle` double NOT NULL,
  `point1` int NOT NULL,
  `point2` int NOT NULL,
  `class` int NOT NULL,
  `crowding` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `road` WRITE;
INSERT INTO `road` VALUES (1,'xx路',239.5,500.14,321.72,10,16.43769612998519,2,1,0,1);
UNLOCK TABLES;