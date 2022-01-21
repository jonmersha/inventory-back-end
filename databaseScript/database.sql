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
  `is_verfiied` tinyint DEFAULT false,
  `deposite` double DEFAULT NULL,
  `remaining_amount` double DEFAULT NULL,
  `trial_end` tinyint DEFAULT NULL,
  PRIMARY KEY (`Retailer_id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

CREATE TABLE `Category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `Retailer_id` int NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `CATEGORY_TO_RETAILERS` (`Retailer_id`),
  CONSTRAINT `CATEGORY_TO_RETAILERS` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) 

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;



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
  `unit_price` float DEFAULT NULL,
  `selling_price` float DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `INVENTORY_TO_CATEGORY` (`Category`),
  KEY `INVENTORY_TO_RETAILER` (`Retailer_id`),
  CONSTRAINT `INVENTORY_TO_CATEGORY` FOREIGN KEY (`Category`) REFERENCES `Category` (`category_id`),
  CONSTRAINT `INVENTORY_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
  `production_date` date DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `PURCHASE_TO_INVENTORY` (`product_code`),
  KEY `PURCHASE_TO_VENDOR` (`vendor`),
  KEY `PURCHASE_TO_RETAILER` (`Retailer_id`),
  CONSTRAINT `PURCHASE_TO_INVENTORY` FOREIGN KEY (`product_code`) REFERENCES `Product` (`product_id`),
  CONSTRAINT `PURCHASE_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`),
  CONSTRAINT `PURCHASE_TO_VENDOR` FOREIGN KEY (`vendor`) REFERENCES `Vendor` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;




CREATE TABLE `retailer_staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(200) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `rtp` varchar(200) DEFAULT NULL,
  `shop_id` int DEFAULT NULL,
  `retailer_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `email` (`email`),
  KEY `staff_shop_idx` (`shop_id`),
  KEY `staff_retailer` (`retailer_id`),
  CONSTRAINT `staff_retailer` FOREIGN KEY (`retailer_id`) REFERENCES `Store` (`Retailer_id`),
  CONSTRAINT `staff_shop` FOREIGN KEY (`shop_id`) REFERENCES `Store` (`Retailer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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
  CONSTRAINT `SELLS_TO_INVERNTORY` FOREIGN KEY (`product_id`) REFERENCES `Inventory` (`product_id`),
  CONSTRAINT `SELLS_TO_PURCHASES` FOREIGN KEY (`registration_number`) REFERENCES `Purchases` (`purchase_id`),
  CONSTRAINT `SELLS_TO_RETAILER` FOREIGN KEY (`retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;


CREATE TABLE `Store` (
  `store_id` int NOT NULL AUTO_INCREMENT,
  `Retailer_id` int DEFAULT NULL,
  `Store_name` varchar(200) DEFAULT NULL,
  `Store_location` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`store_id`),
  KEY `STORE_TO_RETAILER` (`Retailer_id`),
  CONSTRAINT `STORE_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


create table country(
country_id int primary key,
country_code varchar(10) unique,
country_name varchar(50) unique,
continent varchar(50)
);

create table city(
country_code int,
region int,
city_name varchar(30),
primary key(country_code,region,city_name)
);






product category
product
purchases

