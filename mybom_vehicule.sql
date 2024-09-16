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
-- Table structure for table `mybom_vehicule`
--

CREATE TABLE `mybom_vehicule` (
  `id` bigint(20) NOT NULL,
  `code_vehicule` varchar(255) NOT NULL,
  `volume` varchar(255) NOT NULL,
  `numero_radio` varchar(255) DEFAULT NULL,
  `kms_au_compteur` int(11) NOT NULL,
  `disponible` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mybom_vehicule`
--

INSERT INTO `mybom_vehicule` (`id`, `code_vehicule`, `volume`, `numero_radio`, `kms_au_compteur`, `disponible`, `created_at`, `updated_at`) VALUES
(1, 'N315', '8mᶾ', '4134', 26626, 'oui', '2024-06-13 23:41:09.918217', '2024-07-12 13:39:59.678541'),
(2, 'N316', '6mᶾ', '4008', 33919, 'Non', '2024-07-12 13:45:03.231608', '2024-07-12 13:45:03.231608');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mybom_vehicule`
--
ALTER TABLE `mybom_vehicule`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mybom_vehicule`
--
ALTER TABLE `mybom_vehicule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
