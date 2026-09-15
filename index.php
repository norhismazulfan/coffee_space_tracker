<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coffee Space Tracker - JWP</title>

    <!-- Bootstrap 5 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome Icon CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- SweetAlert2 CSS CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- Header / Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-coffee shadow-sm py-3 mb-4">
        <div class="container">
            <a class="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" href="#">
                <i class="fa-solid fa-mug-hot"></i> Coffee Space Tracker
            </a>
            <span class="navbar-text text-light fs-7 d-none d-md-inline">
                Dokumentasi Kedai Kopi Favorit Buat Temen Nugas Kamu!
            </span>
        </div>
    </nav>

    <!-- Main Content Container -->
    <div class="container pb-5">
        <div class="row g-4">

            <!-- Kolom Kiri: Form Input / Edit Kafe -->
            <div class="col-lg-5">
                <div class="card border-0 shadow-sm rounded-4 p-4 card-form">
                    <h5 class="fw-bold text-brown mb-3 border-bottom pb-2">
                        <i class="fa-solid fa-pen-to-square me-2"></i>Tambah / Edit Kafe
                    </h5>

                    <form id="cafeForm" enctype="multipart/form-data">
                        <!-- ID Hidden untuk Mode Edit -->
                        <input type="hidden" id="cafeId" name="id">

                        <div class="mb-3">
                            <label for="cafeName" class="form-label fw-semibold fs-7">Nama Kafe <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="cafeName" name="name" placeholder="Contoh: Titik Temu Coffee" required>
                        </div>

                        <div class="mb-3">
                            <label for="cafeLocation" class="form-label fw-semibold fs-7">Area / Nama Kota <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="cafeLocation" name="location" placeholder="Contoh: Keprabon, Solo" required>
                        </div>

                        <div class="mb-3">
                            <label for="cafeMaps" class="form-label fw-semibold fs-7">Link Google Maps</label>
                            <input type="url" class="form-control" id="cafeMaps" name="maps" placeholder="https://maps.app.goo.gl/...">
                        </div>

                        <div class="mb-3">
                            <label for="cafeRating" class="form-label fw-semibold fs-7">Rating Suasana & Rasa <span class="text-danger">*</span></label>
                            <select class="form-select" id="cafeRating" name="rating" required>
                                <option value="5">⭐ 5 - Super Cozy & Enak</option>
                                <option value="4.5">⭐ 4 - Bagus Banget</option>
                                <option value="4">⭐ 3 - Cukup Oke</option>
                                <option value="3.5">⭐ 2 - Lumayan</option>
                                <option value="3">⭐ 1 - Kurang</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="cafePhotos" class="form-label fw-semibold fs-7">Unggah Foto</label>
                            <input type="file" class="form-control" id="cafePhotos" name="photos[]" accept="image/*" multiple>
                            <small class="text-muted fs-8">*Maksimal 10 Foto</small>
                        </div>

                        <div class="mb-3">
                            <label for="photoCaption" class="form-label fw-semibold fs-7">Keterangan Foto</label>
                            <input type="text" class="form-control" id="photoCaption" name="photoCaption" placeholder="Contoh: Indoor area, main course">
                        </div>

                        <div class="mb-3">
                            <label for="cafeNote" class="form-label fw-semibold fs-7">Catatan & Menu Favorit</label>
                            <textarea class="form-control" id="cafeNote" name="note" rows="3" placeholder="Colokan banyak, WiFi cepat, Aren latte enak..."></textarea>
                        </div>

                        <button type="submit" class="btn btn-coffee w-100 fw-bold py-2 shadow-sm">
                            <i class="fa-solid fa-bookmark me-1"></i> Simpan Kafe Favorit
                        </button>
                    </form>
                </div>
            </div>

            <!-- Kolom Kanan: Header Pencarian Sticky + Card List Kafe -->
            <div class="col-lg-7">

                <!-- Section Pencarian Sticky (Tetap Melayang Saat Scroll) -->
                <div class="search-sticky-container p-3 rounded-4 shadow-sm mb-4">
                    <div class="d-flex justify-content-between align-items-center gap-2">
                        <h5 class="fw-bold text-brown mb-0 fs-6 fs-md-5">
                            <i class="fa-solid fa-compass me-1"></i> Jelajah Kafe
                        </h5>
                        <div class="input-group input-group-sm w-60">
                            <span class="input-group-text bg-white border-end-0"><i class="fa-solid fa-magnifying-glass text-muted"></i></span>
                            <input type="text" id="searchInput" class="form-control border-start-0" placeholder="Cari nama kafe / lokasi...">
                        </div>
                    </div>
                </div>

                <!-- Container Kartu Kafe (Dirender via JS) -->
                <div id="cafeCardContainer" class="row">
                    <!-- Data dari js/script.js akan muncul di sini -->
                </div>

            </div>

        </div>
    </div>

    <!-- SweetAlert2 JS CDN -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Custom JS -->
    <script src="js/script.js"></script>
</body>
</html>