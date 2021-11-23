-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 23, 2021 at 04:19 AM
-- Server version: 10.3.31-MariaDB-cll-lve
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beshegercom_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `category_id` int(11) NOT NULL,
  `Retailer_id` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `country_code` int(11) NOT NULL,
  `region` int(11) NOT NULL,
  `city_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` int(11) NOT NULL,
  `country_code` varchar(10) DEFAULT NULL,
  `country_name` varchar(50) DEFAULT NULL,
  `continent` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE `Customer` (
  `customer_id` int(11) NOT NULL,
  `Retail_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `midle_name` varchar(100) DEFAULT NULL,
  `last_anme` varchar(100) DEFAULT NULL,
  `mobile` varchar(13) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `tinNumber` varchar(20) DEFAULT NULL,
  `reg_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Inventory`
--

CREATE TABLE `Inventory` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `Descriptions` varchar(500) DEFAULT NULL,
  `Image_path` varchar(500) DEFAULT NULL,
  `Category` int(11) DEFAULT NULL,
  `unit_of_measure` varchar(10) DEFAULT NULL,
  `Retailer_id` int(11) DEFAULT NULL,
  `remaining_amount` int(11) DEFAULT NULL,
  `min_quntity_to_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Purchases`
--

CREATE TABLE `Purchases` (
  `purchase_id` int(11) NOT NULL,
  `product_code` int(11) DEFAULT NULL,
  `vendor` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `purchase_cost` double DEFAULT NULL,
  `Selling_price` double DEFAULT NULL,
  `openinig_quantity` int(11) DEFAULT NULL,
  `purchased_amount` int(11) DEFAULT NULL,
  `Retailer_id` int(11) DEFAULT NULL,
  `purchase_date` datetime DEFAULT NULL,
  `exprations_date` date DEFAULT NULL,
  `production` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Retailer`
--

CREATE TABLE `Retailer` (
  `Retailer_id` int(11) NOT NULL,
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
  `is_verfiied` tinyint(4) DEFAULT NULL,
  `deposite` double DEFAULT NULL,
  `remaining_amount` double DEFAULT NULL,
  `trial_end` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `retailer_staff`
--

CREATE TABLE `retailer_staff` (
  `id` int(11) NOT NULL,
  `full_name` varchar(200) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `rtp` varchar(200) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `retailer_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Selles`
--

CREATE TABLE `Selles` (
  `sells_id` int(11) NOT NULL,
  `sellsCode` varchar(50) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `quatity` int(11) NOT NULL,
  `retailer_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `registration_number` int(11) DEFAULT NULL,
  `pay_status` tinyint(1) NOT NULL,
  `delivered` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Store`
--

CREATE TABLE `Store` (
  `store_id` int(11) NOT NULL,
  `Retailer_id` int(11) DEFAULT NULL,
  `Store_name` varchar(200) DEFAULT NULL,
  `Store_location` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Vendor`
--

CREATE TABLE `Vendor` (
  `vendor_id` int(11) NOT NULL,
  `Retailer_Id` int(11) DEFAULT NULL,
  `vendor_name` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `house_no` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile1` varchar(13) DEFAULT NULL,
  `mobile2` varchar(13) DEFAULT NULL,
  `landline` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `CATEGORY_TO_RETAILERS` (`Retailer_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`country_code`,`region`,`city_name`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`),
  ADD UNIQUE KEY `country_code` (`country_code`),
  ADD UNIQUE KEY `country_name` (`country_name`);

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `CUSTOMER_TO_RETAILER_FK` (`Retail_id`);

--
-- Indexes for table `Inventory`
--
ALTER TABLE `Inventory`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `INVENTORY_TO_CATEGORY` (`Category`),
  ADD KEY `INVENTORY_TO_RETAILER` (`Retailer_id`);

--
-- Indexes for table `Purchases`
--
ALTER TABLE `Purchases`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `PURCHASE_TO_INVENTORY` (`product_code`),
  ADD KEY `PURCHASE_TO_STORE` (`store_id`),
  ADD KEY `PURCHASE_TO_VENDOR` (`vendor`),
  ADD KEY `PURCHASE_TO_RETAILER` (`Retailer_id`);

--
-- Indexes for table `Retailer`
--
ALTER TABLE `Retailer`
  ADD PRIMARY KEY (`Retailer_id`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `retailer_staff`
--
ALTER TABLE `retailer_staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `staff_shop_idx` (`shop_id`),
  ADD KEY `staff_retailer` (`retailer_id`);

--
-- Indexes for table `Selles`
--
ALTER TABLE `Selles`
  ADD PRIMARY KEY (`sells_id`),
  ADD KEY `SELLS_TO_INVERNTORY` (`product_id`),
  ADD KEY `SELLS_TO_PURCHASES` (`registration_number`),
  ADD KEY `SELLS_TO_RETAILER` (`retailer_id`),
  ADD KEY `SELLS_TO_CUSTOMER` (`customer_id`);

--
-- Indexes for table `Store`
--
ALTER TABLE `Store`
  ADD PRIMARY KEY (`store_id`),
  ADD KEY `STORE_TO_RETAILER` (`Retailer_id`);

--
-- Indexes for table `Vendor`
--
ALTER TABLE `Vendor`
  ADD PRIMARY KEY (`vendor_id`),
  ADD KEY `vendor_TO_RETAILER` (`Retailer_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Customer`
--
ALTER TABLE `Customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Inventory`
--
ALTER TABLE `Inventory`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Purchases`
--
ALTER TABLE `Purchases`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Retailer`
--
ALTER TABLE `Retailer`
  MODIFY `Retailer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `retailer_staff`
--
ALTER TABLE `retailer_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Selles`
--
ALTER TABLE `Selles`
  MODIFY `sells_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Store`
--
ALTER TABLE `Store`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Vendor`
--
ALTER TABLE `Vendor`
  MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Category`
--
ALTER TABLE `Category`
  ADD CONSTRAINT `CATEGORY_TO_RETAILERS` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`);

--
-- Constraints for table `Customer`
--
ALTER TABLE `Customer`
  ADD CONSTRAINT `CUSTOMER_TO_RETAILER_FK` FOREIGN KEY (`Retail_id`) REFERENCES `Retailer` (`Retailer_id`);

--
-- Constraints for table `Inventory`
--
ALTER TABLE `Inventory`
  ADD CONSTRAINT `INVENTORY_TO_CATEGORY` FOREIGN KEY (`Category`) REFERENCES `Category` (`category_id`),
  ADD CONSTRAINT `INVENTORY_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`);

--
-- Constraints for table `Purchases`
--
ALTER TABLE `Purchases`
  ADD CONSTRAINT `PURCHASE_TO_INVENTORY` FOREIGN KEY (`product_code`) REFERENCES `Inventory` (`product_id`),
  ADD CONSTRAINT `PURCHASE_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`),
  ADD CONSTRAINT `PURCHASE_TO_STORE` FOREIGN KEY (`store_id`) REFERENCES `Store` (`store_id`),
  ADD CONSTRAINT `PURCHASE_TO_VENDOR` FOREIGN KEY (`vendor`) REFERENCES `Vendor` (`vendor_id`);

--
-- Constraints for table `retailer_staff`
--
ALTER TABLE `retailer_staff`
  ADD CONSTRAINT `staff_retailer` FOREIGN KEY (`retailer_id`) REFERENCES `Store` (`Retailer_id`),
  ADD CONSTRAINT `staff_shop` FOREIGN KEY (`shop_id`) REFERENCES `Store` (`Retailer_id`);

--
-- Constraints for table `Selles`
--
ALTER TABLE `Selles`
  ADD CONSTRAINT `SELLS_TO_CUSTOMER` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`),
  ADD CONSTRAINT `SELLS_TO_INVERNTORY` FOREIGN KEY (`product_id`) REFERENCES `Inventory` (`product_id`),
  ADD CONSTRAINT `SELLS_TO_PURCHASES` FOREIGN KEY (`registration_number`) REFERENCES `Purchases` (`purchase_id`),
  ADD CONSTRAINT `SELLS_TO_RETAILER` FOREIGN KEY (`retailer_id`) REFERENCES `Retailer` (`Retailer_id`);

--
-- Constraints for table `Store`
--
ALTER TABLE `Store`
  ADD CONSTRAINT `STORE_TO_RETAILER` FOREIGN KEY (`Retailer_id`) REFERENCES `Retailer` (`Retailer_id`);

--
-- Constraints for table `Vendor`
--
ALTER TABLE `Vendor`
  ADD CONSTRAINT `vendor_TO_RETAILER` FOREIGN KEY (`Retailer_Id`) REFERENCES `Retailer` (`Retailer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
