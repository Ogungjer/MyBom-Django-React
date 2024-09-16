-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2024 at 11:55 AM
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
-- Table structure for table `mybom_pannevehicule`
--

CREATE TABLE `mybom_pannevehicule` (
  `id` bigint(20) NOT NULL,
  `vehicule` varchar(255) NOT NULL,
  `panne` varchar(255) DEFAULT NULL,
  `jour_entree` date DEFAULT NULL,
  `heure_entree` time DEFAULT NULL,
  `jour_sortie` date DEFAULT NULL,
  `heure_sortie` time DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mybom_pannevehicule`
--

INSERT INTO `mybom_pannevehicule` (`id`, `vehicule`, `panne`, `jour_entree`, `heure_entree`, `jour_sortie`, `heure_sortie`, `created_at`, `updated_at`) VALUES
(3, 'N289', 'FUITE D\'AIR', '2024-07-17', '15:52:00', '2024-07-18', '07:52:00', '2024-07-18 12:52:40.177578', '2024-07-25 09:40:01.947274'),
(4, 'N2894', 'CHOC AVANT', '2024-07-16', '12:24:00', '2024-07-22', '08:24:00', '2024-07-22 10:24:18.918694', '2024-07-25 10:26:03.705973'),
(9, 'N315', 'FUITE HYDRAULIQUE + SUSPENSION', NULL, NULL, NULL, NULL, '2024-08-08 12:24:32.768698', '2024-08-08 12:24:32.768698');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mybom_pannevehicule`
--
ALTER TABLE `mybom_pannevehicule`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mybom_pannevehicule`
--
ALTER TABLE `mybom_pannevehicule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
