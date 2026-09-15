<?php
ob_start();
error_reporting(0);
header('Content-Type: application/json');
require_once '../config/db.php';

try {
    // Deteksi jika total ukuran upload melebihi batas max_post_size PHP
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($_POST) && empty($_FILES) && isset($_SERVER['CONTENT_LENGTH']) && $_SERVER['CONTENT_LENGTH'] > 0) {
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Ukuran file foto terlalu besar! Coba kurangi jumlah atau ukuran foto.']);
        exit;
    }

    $name = $_POST['name'] ?? '';
    $location = $_POST['location'] ?? '';
    $maps = $_POST['maps'] ?? '';
    $rating = $_POST['rating'] ?? 5;
    $photoCaption = $_POST['photoCaption'] ?? '';
    $note = $_POST['note'] ?? '';

    if (empty($name) || empty($location) || empty($rating)) {
        ob_clean();
        echo json_encode(['status' => 'error', 'message' => 'Nama kafe, lokasi, dan rating wajib diisi!']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO cafes (name, location, maps, rating, photo_caption, note) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $location, $maps, $rating, $photoCaption, $note]);
    $cafeId = $pdo->lastInsertId();

    if (isset($_FILES['photos'])) {
        $uploadDir = '../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        foreach ($_FILES['photos']['tmp_name'] as $key => $tmpName) {
            if ($_FILES['photos']['error'][$key] === UPLOAD_ERR_OK) {
                $fileExtension = pathinfo($_FILES['photos']['name'][$key], PATHINFO_EXTENSION);
                $newFileName = uniqid('cafe_') . '.' . strtolower($fileExtension);
                $targetFile = $uploadDir . $newFileName;

                if (move_uploaded_file($tmpName, $targetFile)) {
                    $stmtPhoto = $pdo->prepare("INSERT INTO cafe_photos (cafe_id, photo_url) VALUES (?, ?)");
                    $stmtPhoto->execute([$cafeId, 'uploads/' . $newFileName]);
                }
            }
        }
    }

    ob_clean();
    echo json_encode(['status' => 'success', 'message' => 'Kedai kopi berhasil disimpan!']);
} catch (Exception $e) {
    ob_clean();
    echo json_encode(['status' => 'error', 'message' => 'Database/Server error: ' . $e->getMessage()]);
}