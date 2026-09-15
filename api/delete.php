<?php
header('Content-Type: application/json');
require_once '../config/db.php';

try {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        echo json_encode(['status' => 'error', 'message' => 'ID tidak ditemukan!']);
        exit;
    }

    // Ambil path foto untuk dihapus dari folder fisik
    $stmtPhotos = $pdo->prepare("SELECT photo_url FROM cafe_photos WHERE cafe_id = ?");
    $stmtPhotos->execute([$id]);
    $photos = $stmtPhotos->fetchAll(PDO::FETCH_COLUMN);

    foreach ($photos as $photoPath) {
        $fullPath = '../' . $photoPath;
        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
    }

    // Hapus data kafe (Foto di DB terhapus otomatis karena CASCADE)
    $stmt = $pdo->prepare("DELETE FROM cafes WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['status' => 'success', 'message' => 'Kedai kopi berhasil dihapus!']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}