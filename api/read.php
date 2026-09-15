<?php
header('Content-Type: application/json');
require_once '../config/db.php';

try {
    // Ambil data kafe
    $stmt = $pdo->query("SELECT * FROM cafes ORDER BY id DESC");
    $cafes = $stmt->fetchAll();

    // Ambil foto untuk setiap kafe
    foreach ($cafes as &$cafe) {
        $stmtPhotos = $pdo->prepare("SELECT photo_url FROM cafe_photos WHERE cafe_id = ?");
        $stmtPhotos->execute([$cafe['id']]);
        $photos = $stmtPhotos->fetchAll(PDO::FETCH_COLUMN);
        $cafe['photos'] = $photos;
    }

    echo json_encode(['status' => 'success', 'data' => $cafes]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}