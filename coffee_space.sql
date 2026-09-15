-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20221012.46fdea0d0e
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Sep 2026 pada 16.50
-- Versi server: 10.4.24-MariaDB-log
-- Versi PHP: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee_space`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cafes`
--

CREATE TABLE `cafes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(150) NOT NULL,
  `maps` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `photo_caption` varchar(150) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cafes`
--

INSERT INTO `cafes` (`id`, `name`, `location`, `maps`, `rating`, `photo_caption`, `note`, `created_at`) VALUES
(3, 'Arah Coffee', 'Solo Gajahan', 'https://maps.app.goo.gl/JMzPXKgg1RLarcSCA', 5, 'outdoor area dan coffe', 'colokan ada dimana mana bahkan di outdoor ada, makanannya rasanya enak, cocok buat temen nugas', '2026-09-15 03:21:25'),
(5, 'Life at Weekend', 'Keprabon', 'https://maps.app.goo.gl/aLYvT1kUkq7cZXpG8', 3, 'Indoor, main course', 'colokan kurang, terlalu ramai, tapi maincourse dan kopinya enak banget', '2026-09-15 03:42:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cafe_photos`
--

CREATE TABLE `cafe_photos` (
  `id` int(11) NOT NULL,
  `cafe_id` int(11) NOT NULL,
  `photo_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cafe_photos`
--

INSERT INTO `cafe_photos` (`id`, `cafe_id`, `photo_url`) VALUES
(3, 3, 'uploads/cafe_6aa8b9b57b2f5.jpeg'),
(5, 3, 'uploads/cafe_6aa8b9b5870fa.jpeg'),
(7, 3, 'uploads/cafe_6aa8b9b58f341.jpeg'),
(9, 3, 'uploads/cafe_6aa8b9b5a57ee.jpeg'),
(11, 5, 'uploads/cafe_6aa8beb1ce8f9.jpeg'),
(13, 5, 'uploads/cafe_6aa8beb1e5449.jpeg'),
(15, 5, 'uploads/cafe_6aa8beb201a4d.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cafes`
--
ALTER TABLE `cafes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `cafe_photos`
--
ALTER TABLE `cafe_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cafe_id` (`cafe_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cafes`
--
ALTER TABLE `cafes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `cafe_photos`
--
ALTER TABLE `cafe_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `cafe_photos`
--
ALTER TABLE `cafe_photos`
  ADD CONSTRAINT `cafe_photos_ibfk_1` FOREIGN KEY (`cafe_id`) REFERENCES `cafes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
