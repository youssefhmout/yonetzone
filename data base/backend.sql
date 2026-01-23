-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 23 jan. 2026 à 14:29
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `backend`
--

-- --------------------------------------------------------

--
-- Structure de la table `abonnements`
--

CREATE TABLE `abonnements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED DEFAULT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `date_debut` date NOT NULL,
  `duree` int(11) NOT NULL,
  `date_fin` date NOT NULL,
  `statut` enum('active','expired','pending','cancelled') NOT NULL,
  `ancien_abonnement_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `abonnements`
--

INSERT INTO `abonnements` (`id`, `service_id`, `user_id`, `client_id`, `prix_unitaire`, `date_debut`, `duree`, `date_fin`, `statut`, `ancien_abonnement_id`, `created_at`, `updated_at`) VALUES
(48, 35, 2, 6, 10.00, '2025-12-13', 1, '2026-01-13', 'expired', NULL, '2026-01-20 09:31:37', '2026-01-20 09:40:25'),
(49, 36, 2, 5, 70.00, '2025-12-22', 1, '2026-01-22', 'expired', NULL, '2026-01-20 09:32:29', '2026-01-20 13:15:32'),
(51, 37, 2, 5, 19.00, '2026-01-20', 4, '2026-05-20', 'active', NULL, '2026-01-20 09:39:45', '2026-01-20 09:39:45'),
(52, 35, 2, 6, 5.00, '2026-01-13', 2, '2026-03-13', 'active', 48, '2026-01-20 09:40:25', '2026-01-20 09:40:25'),
(53, 39, 2, 5, 45.00, '2025-12-13', 1, '2026-01-13', 'expired', NULL, '2026-01-20 10:24:43', '2026-01-20 13:19:20'),
(54, 36, 2, 5, 50.00, '2026-01-22', 1, '2026-02-22', 'expired', 49, '2026-01-20 13:15:32', '2026-01-20 13:19:41'),
(55, 39, 2, 5, 12.00, '2026-01-13', 1, '2026-02-13', 'active', 53, '2026-01-20 13:19:20', '2026-01-20 13:19:20'),
(56, 36, 2, 5, 50.00, '2026-02-22', 51, '2030-05-22', 'active', 54, '2026-01-20 13:19:41', '2026-01-20 13:19:41'),
(57, 40, 2, 5, 30.00, '2025-12-19', 1, '2026-01-19', 'active', NULL, '2026-01-20 18:46:42', '2026-01-20 18:46:42'),
(58, 41, 2, 12, 34.00, '2025-12-23', 1, '2026-01-23', 'active', NULL, '2026-01-20 18:49:19', '2026-01-20 18:49:19'),
(59, 42, 3, 13, 100.00, '2026-01-22', 1, '2026-02-22', 'active', NULL, '2026-01-22 13:46:46', '2026-01-22 13:46:46');

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nom_complet` varchar(255) NOT NULL,
  `nom_societe` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `user_id`, `nom_complet`, `nom_societe`, `email`, `telephone`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 2, 'jamal hmout', 'tatata', 'jamal@gmail.com', '0628964540', '2026-05-16 09:44:15', '2026-01-16 10:44:15', NULL),
(6, 2, 'youssef hmout', 'donakh', 'ayoub3@gmail.com', '0628965434', '2026-05-20 08:30:55', '2026-01-20 09:30:55', NULL),
(7, 2, 'youssef hmout', 'donakh', 'a@gmail.com', '0628965434', '2026-01-20 13:20:53', '2026-01-20 13:20:53', NULL),
(8, 2, 'youssef hmout', 'donakh', 'a@gail.com', '0628965434', '2026-01-20 13:21:03', '2026-01-20 13:21:03', NULL),
(9, 2, 'youssef hmout', 'donakh', 'a@gil.com', '0628965434', '2026-01-20 13:21:11', '2026-01-20 13:21:11', NULL),
(10, 2, 'youssef', 'raja', 'youssefhm12@gmail.com', '0710035364', '2026-01-20 13:34:24', '2026-01-20 13:34:24', NULL),
(11, 2, 'youssef', 'raja', 'youssefh12@gmail.com', '0710035364', '2026-01-20 13:34:30', '2026-01-20 13:34:30', NULL),
(12, 2, 'youssef', 'raja', 'youssefh1@gmail.com', '0710035364', '2026-01-20 13:34:37', '2026-01-20 13:34:37', NULL),
(13, 3, 'mohmd', 'hluu', 'aymohhg@gmail.com', '068900440', '2026-01-22 13:46:08', '2026-01-22 13:46:08', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2026_01_07_131213_create_users_table', 1),
(4, '2026_01_07_144952_create_personal_access_tokens_table', 1),
(5, '2026_01_14_102444_create_clients_table', 1),
(6, '2026_01_15_103253_create_services_table', 2),
(7, '2026_01_15_104051_create_abonnements_table', 2),
(8, '2026_01_16_100941_create_abonnements_table', 3),
(9, '2026_01_20_100022_add_deleted_at_to_clients_table', 4);

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'auth_token', '3b43e0aaf428a0a3be9a9eb87332d333efa882b537fdc442568e9c53565209c5', '[\"*\"]', '2026-01-14 10:25:57', NULL, '2026-01-14 10:22:40', '2026-01-14 10:25:57'),
(2, 'App\\Models\\User', 2, 'auth_token', 'adfcaaaf2fd8816eed3141f86c4ae60df1acddee3df787784bf8805d2fd9aca3', '[\"*\"]', '2026-01-14 13:32:13', NULL, '2026-01-14 10:39:31', '2026-01-14 13:32:13'),
(3, 'App\\Models\\User', 2, 'auth_token', 'cbc8f60d14b888663fa0cea7c8f40f7798918a4fb05293bd4b1e84557080f8ed', '[\"*\"]', '2026-01-14 14:51:50', NULL, '2026-01-14 13:41:16', '2026-01-14 14:51:50'),
(4, 'App\\Models\\User', 2, 'auth_token', 'b89b693fce16f8a4c5b2c9eb950c3298d3682183edd1aead1e79a63b1604d288', '[\"*\"]', '2026-01-19 13:07:34', NULL, '2026-01-15 10:53:37', '2026-01-19 13:07:34'),
(5, 'App\\Models\\User', 2, 'auth_token', '4ce6ad0dfc9a90d58f32aa2db0d52effad9c80d8763364d6999e79a49744c89b', '[\"*\"]', '2026-01-15 14:02:17', NULL, '2026-01-15 12:50:14', '2026-01-15 14:02:17'),
(6, 'App\\Models\\User', 2, 'auth_token', 'dd01a3fefbd5e21474712f0b7c3cd5edade81d1dc677bcf1f940fe25dac54ca1', '[\"*\"]', '2026-01-16 09:35:43', NULL, '2026-01-16 09:17:01', '2026-01-16 09:35:43'),
(7, 'App\\Models\\User', 2, 'auth_token', '277536b780b64f1a3a90d6cbbe5f025be35a70bfe03dbf822ac52a5f5f9b04e5', '[\"*\"]', '2026-01-16 12:32:47', NULL, '2026-01-16 09:36:09', '2026-01-16 12:32:47'),
(8, 'App\\Models\\User', 2, 'auth_token', '2e7313975def5e2ab03c51e28af93c183a5de9e04b334261e769e791f3286e6e', '[\"*\"]', '2026-01-16 10:33:08', NULL, '2026-01-16 10:19:00', '2026-01-16 10:33:08'),
(9, 'App\\Models\\User', 2, 'auth_token', '6fb6f8169f666407b10b13dc6c072d48de3df6076012eede2d032f4ccffd425f', '[\"*\"]', '2026-01-16 13:56:34', NULL, '2026-01-16 13:19:14', '2026-01-16 13:56:34'),
(10, 'App\\Models\\User', 2, 'auth_token', 'b9bdda39b21728a9a6f1cf772a8bcf1059688ecac3dc993d9133c235c7d203a3', '[\"*\"]', '2026-01-16 19:58:08', NULL, '2026-01-16 19:09:26', '2026-01-16 19:58:08'),
(11, 'App\\Models\\User', 2, 'auth_token', 'fe74a8d32bb90c0d42582e98a79bb7ce9d3696d5e36ee094a1774e483e83f7de', '[\"*\"]', '2026-01-17 10:41:47', NULL, '2026-01-17 06:56:38', '2026-01-17 10:41:47'),
(12, 'App\\Models\\User', 2, 'auth_token', '488f568268b8fde07b64c832c938f5b36a9b3506e7c6fc7c0218fa5295b0e2fc', '[\"*\"]', '2026-01-17 15:36:30', NULL, '2026-01-17 14:50:00', '2026-01-17 15:36:30'),
(13, 'App\\Models\\User', 2, 'auth_token', '4804954ddf11bd59cbad791709337948fb5372e11b14672a67f33495b034d2bc', '[\"*\"]', '2026-01-19 09:58:27', NULL, '2026-01-19 08:44:47', '2026-01-19 09:58:27'),
(14, 'App\\Models\\User', 2, 'auth_token', 'ee26a8abb8a31e2d9d1d0746e7af3a2a4ab44df940f1dfeab160411eae859a8b', '[\"*\"]', '2026-01-19 13:56:44', NULL, '2026-01-19 13:02:28', '2026-01-19 13:56:44'),
(15, 'App\\Models\\User', 2, 'auth_token', 'fa5d8c7378c4f07a7c65cab87742c44938baaf16618ed6c589b07810e216df48', '[\"*\"]', '2026-01-20 12:46:30', NULL, '2026-01-19 13:08:36', '2026-01-20 12:46:30'),
(16, 'App\\Models\\User', 2, 'auth_token', '9b33bc940f917990e3485cfc0645a34b1dc72d1f805b523afa2d610ce7147d24', '[\"*\"]', '2026-01-19 16:57:37', NULL, '2026-01-19 16:28:22', '2026-01-19 16:57:37'),
(17, 'App\\Models\\User', 2, 'auth_token', '838f4814c44d06de216f815b4f8b15060bd6a174c2074fecfe7cf174f110f727', '[\"*\"]', '2026-01-19 19:12:21', NULL, '2026-01-19 16:59:21', '2026-01-19 19:12:21'),
(18, 'App\\Models\\User', 2, 'auth_token', '6109880742b005835736181987bab943a33b5bee3edbb56fd36ce057cf4feda6', '[\"*\"]', '2026-01-20 07:48:33', NULL, '2026-01-20 06:35:16', '2026-01-20 07:48:33'),
(19, 'App\\Models\\User', 2, 'auth_token', 'c759c777a5d07292f931a562076700b1fa85cec9c904606e852db162d325568a', '[\"*\"]', '2026-01-20 10:25:45', NULL, '2026-01-20 08:38:23', '2026-01-20 10:25:45'),
(20, 'App\\Models\\User', 2, 'auth_token', '451ef2439976d7cff720a2eb4fe561a026aeee4ae2f70d01020965ef07258426', '[\"*\"]', '2026-01-20 13:08:41', NULL, '2026-01-20 11:38:49', '2026-01-20 13:08:41'),
(21, 'App\\Models\\User', 2, 'auth_token', 'c4318d99bc7a53df9aa214b5cb14389e3ec2c828ca4bf9b550b23383fb9de4f2', '[\"*\"]', '2026-01-20 13:55:09', NULL, '2026-01-20 13:14:23', '2026-01-20 13:55:09'),
(22, 'App\\Models\\User', 2, 'auth_token', '118a231d3b97c6371aa3f83d20c83d8ed5d7f483f949933d33a452e58392e032', '[\"*\"]', '2026-01-20 19:39:36', NULL, '2026-01-20 17:12:01', '2026-01-20 19:39:36'),
(23, 'App\\Models\\User', 2, 'auth_token', 'd468f87ad532b1d537dacd2b2969629db389da028e7f5d879c57de46e9d60d53', '[\"*\"]', '2026-01-21 09:19:34', NULL, '2026-01-21 08:58:04', '2026-01-21 09:19:34'),
(24, 'App\\Models\\User', 2, 'auth_token', 'a84ba465d5afa3f035686ab80143c592a7f0fda3fe6d95111fa3d1e235692870', '[\"*\"]', '2026-01-21 09:25:26', NULL, '2026-01-21 09:22:30', '2026-01-21 09:25:26'),
(25, 'App\\Models\\User', 1, 'auth_token', '792eceafb89e24ca7163ae02653a5abbac7a2f8d15e567d5452ef5d313babf57', '[\"*\"]', NULL, NULL, '2026-01-21 11:27:40', '2026-01-21 11:27:40'),
(26, 'App\\Models\\User', 1, 'auth_token', '0d1353de4000626715fadbab9835dc07ef94a06504e976d176f9490db6cecef2', '[\"*\"]', '2026-01-22 13:45:18', NULL, '2026-01-22 13:44:27', '2026-01-22 13:45:18'),
(27, 'App\\Models\\User', 3, 'auth_token', '73630114c222897591afc62d7dc47088f29e274a1281fd11516c036554d7528d', '[\"*\"]', '2026-01-22 13:47:14', NULL, '2026-01-22 13:45:29', '2026-01-22 13:47:14'),
(28, 'App\\Models\\User', 1, 'auth_token', 'fed46dd0453e69a6086e110b627798d7397ccfa5d99a148f1cf1845476818324', '[\"*\"]', '2026-01-22 13:51:13', NULL, '2026-01-22 13:47:42', '2026-01-22 13:51:13'),
(29, 'App\\Models\\User', 1, 'auth_token', 'f9659d6b84873ac6315441fd427cf14411451ad88b3f29eb8ecd6469359e5878', '[\"*\"]', '2026-01-23 09:47:31', NULL, '2026-01-22 16:56:24', '2026-01-23 09:47:31'),
(30, 'App\\Models\\User', 1, 'auth_token', 'a0759499a50bb616a940810b8670641745759e7a3debadafd4e5eed83278e636', '[\"*\"]', '2026-01-22 17:38:25', NULL, '2026-01-22 17:06:11', '2026-01-22 17:38:25'),
(31, 'App\\Models\\User', 2, 'auth_token', '13602e1ac21202f567a19b6a0eb585bcc526f6e91d6804cca91cacfd2ddaedb9', '[\"*\"]', '2026-01-22 18:00:55', NULL, '2026-01-22 17:43:45', '2026-01-22 18:00:55'),
(32, 'App\\Models\\User', 1, 'auth_token', 'ab6edf2310d18f62e34c822dcf9c1902617485641e7b706da9e75a894d495b48', '[\"*\"]', '2026-01-23 08:51:16', NULL, '2026-01-23 08:46:05', '2026-01-23 08:51:16'),
(33, 'App\\Models\\User', 1, 'auth_token', 'fdfa50866caf70d66594c8a360bb8af91f5a3a62b2c86b53a73f745a2ab75f60', '[\"*\"]', '2026-01-23 09:03:48', NULL, '2026-01-23 08:51:44', '2026-01-23 09:03:48'),
(34, 'App\\Models\\User', 1, 'auth_token', '3ee4847561f6587320f4bb483077c0f34d6b6f42827340b01820f392ab346ba4', '[\"*\"]', '2026-01-23 09:11:24', NULL, '2026-01-23 09:07:50', '2026-01-23 09:11:24'),
(35, 'App\\Models\\User', 3, 'auth_token', 'cbfeb6ddafca6795372664e4a01e16b2b295d37d88a322321ef63ecb99b75aed', '[\"*\"]', '2026-01-23 09:12:52', NULL, '2026-01-23 09:12:04', '2026-01-23 09:12:52'),
(36, 'App\\Models\\User', 3, 'auth_token', '98dd9e5bee29f54bb9e61729b1253f3321dcf25724af53a38ca6b497949f7cbb', '[\"*\"]', '2026-01-23 09:13:05', NULL, '2026-01-23 09:12:56', '2026-01-23 09:13:05'),
(37, 'App\\Models\\User', 3, 'auth_token', '159f4e8b9f93df740af87724439d39735488a70ab99adee7c902078719816533', '[\"*\"]', '2026-01-23 09:38:08', NULL, '2026-01-23 09:14:27', '2026-01-23 09:38:08'),
(38, 'App\\Models\\User', 1, 'auth_token', '16caeaa3ebbded17330a8526648f054ee7fe047c9510b7e6b2c12cad6ad4bf49', '[\"*\"]', NULL, NULL, '2026-01-23 09:38:34', '2026-01-23 09:38:34'),
(39, 'App\\Models\\User', 1, 'auth_token', '869eb215318f830ca04ceb73c9b68917165401d62a7274c8ccffd599a4cc4655', '[\"*\"]', '2026-01-23 10:02:21', NULL, '2026-01-23 09:38:35', '2026-01-23 10:02:21'),
(40, 'App\\Models\\User', 3, 'auth_token', '8a08e0a07831f73a42c98754c6ca0cbac67113bea6de3227423400aa1ac80745', '[\"*\"]', '2026-01-23 10:02:49', NULL, '2026-01-23 10:02:29', '2026-01-23 10:02:49'),
(41, 'App\\Models\\User', 1, 'auth_token', '6ecc72d1755377587337755e9e3e7886a63388609d47673d0eededa09e77317a', '[\"*\"]', '2026-01-23 10:16:27', NULL, '2026-01-23 10:10:27', '2026-01-23 10:16:27'),
(42, 'App\\Models\\User', 3, 'auth_token', '845bfec0b77a965e919b8c7e5381a2830d5d347f61bfffba5463263d76ff0ac7', '[\"*\"]', '2026-01-23 10:20:50', NULL, '2026-01-23 10:16:49', '2026-01-23 10:20:50'),
(43, 'App\\Models\\User', 1, 'auth_token', 'e3b1e5eb10c7f7d1c4e098510fe6c4a59a06204f5993f7b2be7944ebe98401cd', '[\"*\"]', NULL, NULL, '2026-01-23 10:18:36', '2026-01-23 10:18:36'),
(44, 'App\\Models\\User', 3, 'auth_token', 'ab9f61ebc0fdb17d1ae3fe34ae63f58a49c1d039406b36bc6e15eb15fa8127b6', '[\"*\"]', '2026-01-23 10:25:32', NULL, '2026-01-23 10:21:35', '2026-01-23 10:25:32'),
(45, 'App\\Models\\User', 2, 'auth_token', 'f917aca614eac01d324b4527958b4c74906483384dafe75251d4de4f2f1bd045', '[\"*\"]', '2026-01-23 11:20:38', NULL, '2026-01-23 10:25:46', '2026-01-23 11:20:38');

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` enum('mensuel','annuel') NOT NULL,
  `prix_initial` decimal(10,2) NOT NULL,
  `prix_renouvellement` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id`, `client_id`, `user_id`, `type`, `prix_initial`, `prix_renouvellement`, `created_at`, `updated_at`) VALUES
(35, 6, 2, 'mensuel', 10.00, 5.00, '2026-01-20 09:31:23', '2026-01-20 09:31:23'),
(36, 5, 2, 'mensuel', 70.00, 50.00, '2026-01-20 09:32:11', '2026-01-20 09:32:11'),
(37, 5, 2, 'mensuel', 19.00, 6.00, '2026-01-20 09:39:28', '2026-01-20 09:39:28'),
(38, 5, 2, 'mensuel', 100.00, 60.00, '2026-01-20 10:16:55', '2026-01-20 10:16:55'),
(39, 5, 2, 'mensuel', 45.00, 12.00, '2026-01-20 10:24:31', '2026-01-20 10:24:31'),
(40, 5, 2, 'mensuel', 30.00, 20.00, '2026-01-20 18:46:26', '2026-01-20 18:46:26'),
(41, 12, 2, 'mensuel', 34.00, 30.00, '2026-01-20 18:49:02', '2026-01-20 18:49:02'),
(42, 13, 3, 'mensuel', 100.00, 50.00, '2026-01-22 13:46:37', '2026-01-22 13:46:37');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','agent') NOT NULL DEFAULT 'agent',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'youssef', 'youssef@gmail', '$2y$12$OqlSEUFk/FmsOvyyRx363.rw0jJD8.acpmm9nMKWErZt92OXA83ui', 'admin', NULL, '2026-01-14 10:17:11', '2026-01-14 10:17:11'),
(2, 'raja', 'raja@gmail.com', '$2y$12$SvoP0DHx6vBvs.OlO5xxC.kL2ZuOiHwJpwVZfYPiTjKJYYAjMce1a', 'agent', NULL, '2026-01-14 10:22:00', '2026-01-14 10:22:00'),
(3, 'jamal', 'jamal@gmail.com', '$2y$12$0dwLxXFZXWbJq.nEYC13fOPzoziLl6dnCJT5JviPHVbf4B/lyFYT2', 'agent', NULL, '2026-01-22 13:45:10', '2026-01-22 13:45:10');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `abonnements`
--
ALTER TABLE `abonnements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `abonnements_service_id_foreign` (`service_id`),
  ADD KEY `abonnements_user_id_foreign` (`user_id`),
  ADD KEY `abonnements_client_id_foreign` (`client_id`),
  ADD KEY `abonnements_ancien_abonnement_id_foreign` (`ancien_abonnement_id`);

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_user_id_foreign` (`user_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_client_id_foreign` (`client_id`),
  ADD KEY `services_user_id_foreign` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `abonnements`
--
ALTER TABLE `abonnements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `abonnements`
--
ALTER TABLE `abonnements`
  ADD CONSTRAINT `abonnements_ancien_abonnement_id_foreign` FOREIGN KEY (`ancien_abonnement_id`) REFERENCES `abonnements` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `abonnements_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `abonnements_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `abonnements_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `services_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
