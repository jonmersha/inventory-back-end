CREATE TABLE `Category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `Retailer_id` int NOT NULL,
  `Name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `Description` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `CATEGORY_TO_RETAILERS` (`Retailer_id`),
  CONSTRAINT `CATEGORY_TO_RETAILERS` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
CREATE TABLE `city` (
  `country_code` int NOT NULL,
  `region` int NOT NULL,
  `city_name` varchar(30) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`country_code`,`region`,`city_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
CREATE TABLE `country` (
  `country_id` int NOT NULL,
  `country_code` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `country_name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `continent` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`country_id`),
  UNIQUE KEY `country_code` (`country_code`),
  UNIQUE KEY `country_name` (`country_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
CREATE TABLE `Customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `Retail_id` int DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `midle_name` varchar(100) DEFAULT NULL,
  `last_anme` varchar(100) DEFAULT NULL,
  `mobile` varchar(13) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `tinNumber` varchar(20) DEFAULT NULL,
  `reg_date` date DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `CUSTOMER_TO_RETAILER_FK` (`Retail_id`),
  CONSTRAINT `CUSTOMER_TO_RETAILER_FK` FOREIGN KEY (`Retail_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
CREATE TABLE `Product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `Descriptions` varchar(500) DEFAULT NULL,
  `Image_path` varchar(500) DEFAULT NULL,
  `Category` int DEFAULT NULL,
  `unit_of_measure` varchar(10) DEFAULT NULL,
  `Retailer_id` int DEFAULT NULL,
  `remaining_amount` int DEFAULT NULL,
  `min_quntity_to_order` int DEFAULT NULL,
  `opening_quanitity` int DEFAULT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `selling_price` decimal(10,0) DEFAULT NULL,
  `re-order-quantity` int DEFAULT NULL,
  `previuose_qty` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `INVENTORY_TO_CATEGORY` (`Category`),
  KEY `INVENTORY_TO_RETAILER` (`Retailer_id`),
  CONSTRAINT `INVENTORY_TO_CATEGORY` FOREIGN KEY (`Category`) REFERENCES `Category` (`category_id`),
  CONSTRAINT `INVENTORY_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
CREATE TABLE `purchase_order_sequaence` (
  `sequance_number` int NOT NULL AUTO_INCREMENT,
  `Retailer_id` int DEFAULT NULL,
  `order_number_status` tinyint(1) DEFAULT '0',
  `purchase_order_number` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `generation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`sequance_number`),
  UNIQUE KEY `purchase_order_number_UNIQUE` (`purchase_order_number`),
  KEY `purchase_sequence_TO_RETAILER` (`Retailer_id`),
  CONSTRAINT `purchase_sequence_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
CREATE TABLE `Purchases` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `product_code` int DEFAULT NULL,
  `vendor` int DEFAULT NULL,
  `Purchase_cost` double DEFAULT NULL,
  `Selling_price` double DEFAULT NULL,
  `Purchased_qty` int DEFAULT NULL,
  `Retailer_id` int DEFAULT NULL,
  `purchase_date` datetime DEFAULT NULL,
  `exprations_date` date DEFAULT NULL,
  `production` date DEFAULT NULL,
  `purchase_order_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `PURCHASE_TO_INVENTORY` (`product_code`),
  KEY `PURCHASE_TO_VENDOR` (`vendor`),
  KEY `PURCHASE_TO_RETAILER` (`Retailer_id`),
  CONSTRAINT `PURCHASE_TO_INVENTORY` FOREIGN KEY (`product_code`) REFERENCES `Product` (`product_id`),
  CONSTRAINT `PURCHASE_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`),
  CONSTRAINT `PURCHASE_TO_VENDOR` FOREIGN KEY (`vendor`) REFERENCES `Vendor` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=latin1;
CREATE TABLE `Retailer` (
  `Retailer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `midle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `org_name` varchar(200) DEFAULT NULL,
  `mobile` varchar(13) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `is_verfiied` tinyint DEFAULT '0',
  `deposite` double DEFAULT NULL,
  `remaining_amount` double DEFAULT NULL,
  `trial_end` tinyint DEFAULT NULL,
  PRIMARY KEY (`Retailer_id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
CREATE TABLE `Selles` (
  `sells_id` int NOT NULL AUTO_INCREMENT,
  `sellsCode` varchar(50) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `quatity` int NOT NULL,
  `retailer_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `registration_number` int DEFAULT NULL,
  `pay_status` tinyint(1) NOT NULL,
  `delivered` tinyint(1) NOT NULL,
  PRIMARY KEY (`sells_id`),
  KEY `SELLS_TO_INVERNTORY` (`product_id`),
  KEY `SELLS_TO_PURCHASES` (`registration_number`),
  KEY `SELLS_TO_RETAILER` (`retailer_id`),
  KEY `SELLS_TO_CUSTOMER` (`customer_id`),
  CONSTRAINT `SELLS_TO_CUSTOMER` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`),
  CONSTRAINT `SELLS_TO_INVERNTORY` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`),
  CONSTRAINT `SELLS_TO_PURCHASES` FOREIGN KEY (`registration_number`) REFERENCES `Purchases` (`purchase_id`),
  CONSTRAINT `SELLS_TO_RETAILER` FOREIGN KEY (`retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
CREATE TABLE `sells_order_sequaence` (
  `sequance_number` int NOT NULL,
  `Retailer_id` int DEFAULT NULL,
  `order_number_status` tinyint(1) DEFAULT NULL,
  `generation_date` datetime DEFAULT NULL,
  `sells_order_number` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`sequance_number`),
  KEY `sels_TO_RETAILER` (`Retailer_id`),
  CONSTRAINT `sels_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
CREATE TABLE `Vendor` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `Retailer_Id` int DEFAULT NULL,
  `vendor_name` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `house_no` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile1` varchar(13) DEFAULT NULL,
  `mobile2` varchar(13) DEFAULT NULL,
  `landline` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`vendor_id`),
  KEY `vendor_TO_RETAILER` (`Retailer_Id`),
  CONSTRAINT `vendor_TO_RETAILER` FOREIGN KEY (`Retailer_Id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
