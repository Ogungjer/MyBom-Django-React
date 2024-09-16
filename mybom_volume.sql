-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2024 at 11:57 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bom_bdd_django`
--

-- --------------------------------------------------------

--
-- Table structure for table `mybom_volume`
--

CREATE TABLE `mybom_volume` (
  `id` bigint(20) NOT NULL,
  `volume` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mybom_volume`
--

INSERT INTO `mybom_volume` (`id`, `volume`, `created_at`, `updated_at`) VALUES
(1, '3.5mᶾ', '2024-06-12 14:39:50.451434', '2024-07-24 09:49:00.682686'),
(2, '5mᶾ', '2024-06-12 14:41:13.215955', '2024-06-12 14:41:13.215955'),
(3, '6mᶾ', '2024-06-12 14:41:22.964967', '2024-06-12 14:41:22.964967'),
(4, '7mᶾ', '2024-06-12 14:41:30.301579', '2024-06-12 14:41:30.301579'),
(5, '8mᶾ', '2024-06-12 14:41:36.051873', '2024-06-12 14:41:36.051873'),
(6, '10mᶾ', '2024-06-12 14:41:54.422888', '2024-06-12 14:41:54.422888'),
(7, '12mᶾ', '2024-06-12 14:42:18.422802', '2024-06-12 14:42:18.422802'),
(8, '14mᶾ', '2024-06-12 14:42:27.698573', '2024-06-12 14:42:27.698573'),
(9, '16mᶾ', '2024-06-12 14:42:32.436604', '2024-06-12 14:42:32.436604'),
(10, '20mᶾ', '2024-06-12 14:42:43.053589', '2024-06-12 14:42:43.053589'),
(12, '4mᶾ', '2024-07-16 09:33:13.369126', '2024-07-16 09:33:13.369126'),
(13, '9mᶾ', '2024-07-16 09:33:18.046735', '2024-07-16 09:33:18.046735');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mybom_volume`
--
ALTER TABLE `mybom_volume`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mybom_volume`
--
ALTER TABLE `mybom_volume`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
