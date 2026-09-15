<?php
header('Content-Type: application/json');
require_once '../config/db.php';

try {
    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? '';
    $location = $_POST['location'] ?? '';
    $maps = $_POST['maps'] ?? '';
    $rating = $_POST['rating'] ?? 5;
    $photoCaption = $_POST['photoCaption'] ?? '';
    $note = $_POST['note'] ?? '';

    if (!$id || empty($name) || empty($location)) {
        echo json_encode(['status' => 'error', 'message' => 'ID, nama kafe, dan lokasi wajib diisi!']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE cafes SET name = ?, location = ?, maps = ?, rating = ?, photo_caption = ?, note = ? WHERE id = ?");
    $stmt->execute([$name, $location, $maps, $rating, $photoCaption, $note, $id]);

    if (isset($_FILES['photos']) && isset($_FILES['photos']['name']) && count($_FILES['photos']['name']) > 0) {
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
                    $stmtPhoto->execute([$id, 'uploads/' . $newFileName]);
                }
            }
        }
    }

    echo json_encode(['status' => 'success', 'message' => 'Data kafe berhasil diperbarui!']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}