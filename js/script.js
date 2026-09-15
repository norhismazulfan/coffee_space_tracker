/**
 * Coffee Space Tracker - Main JavaScript File
 * Deskripsi   : Mengelola logika antarmuka (UI), manipulasi data Array of Objects,
 *               interaksi galeri foto, serta komunikasi AJAX/Fetch ke API PHP.
 * Skema UJK   : Junior Web Programming (JWP)
 */

// ==========================================
// 1. GLOBAL STATE & DOM ELEMENTS
// ==========================================
let cafeList = []; // Menyimpan data koleksi kedai kopi (Array of Objects)

const cafeForm = document.getElementById('cafeForm');
const cafeCardContainer = document.getElementById('cafeCardContainer');
const searchInput = document.getElementById('searchInput');
const cafeIdInput = document.getElementById('cafeId');
const formSubmitBtn = cafeForm.querySelector('button[type="submit"]');

// ==========================================
// 2. HELPER FUNCTIONS (DEBUGGING & PARSING)
// ==========================================

/**
 * Mengurai respon server secara aman.
 * Mencegah SyntaxError JSON jika PHP mengembalikan teks error/HTML.
 * @param {Response} response - Respon dari fetch API
 * @returns {Promise<Object>}
 */
async function parseServerResponse(response) {
    const rawText = await response.text();
    try {
        return JSON.parse(rawText);
    } catch (e) {
        console.error('=== SERVER RESPONSE ERROR (HTML Output) ===\n', rawText);
        throw new Error('Server mengembalikan respon bukan JSON. Cek Console atau Network tab untuk detail error PHP.');
    }
}

// ==========================================
// 3. API OPERATIONS (CRUD)
// ==========================================

/**
 * Mengambil seluruh data kedai kopi dari server (Read)
 */
async function fetchCafes() {
    try {
        const response = await fetch('api/read.php');
        const result = await parseServerResponse(response);

        if (result.status === 'success') {
            cafeList = result.data;
            renderCafes(cafeList);
        } else {
            console.error('API Error:', result.message);
        }
    } catch (error) {
        console.error('Gagal memuat data kafe:', error.message);
    }
}

/**
 * Menyimpan data kafe baru atau memperbarui data (Create / Update)
 * @param {Event} event 
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(cafeForm);
    const isEditMode = Boolean(cafeIdInput.value);
    const targetUrl = isEditMode ? 'api/update.php' : 'api/create.php';

    // Validasi Form Input
    const name = formData.get('name')?.toString().trim();
    const location = formData.get('location')?.toString().trim();

    if (!name || !location) {
        Swal.fire({
            icon: 'warning',
            title: 'Input Tidak Lengkap',
            text: 'Nama kafe dan area/lokasi wajib diisi!',
            confirmButtonColor: '#6F4E37'
        });
        return;
    }

    Swal.fire({
        title: isEditMode ? 'Memperbarui Data...' : 'Menyimpan Kafe...',
        text: 'Sedang memproses data ke server',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        const response = await fetch(targetUrl, {
            method: 'POST',
            body: formData
        });

        const result = await parseServerResponse(response);

        if (result.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: result.message,
                timer: 1800,
                showConfirmButton: false
            });
            resetForm();
            fetchCafes();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Menyimpan',
                text: result.message,
                confirmButtonColor: '#6F4E37'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Koneksi Terganggu',
            text: error.message,
            confirmButtonColor: '#6F4E37'
        });
    }
}

/**
 * Menghapus data kafe berdasarkan ID (Delete)
 * @param {number} id 
 */
async function deleteCafe(id) {
    const confirmResult = await Swal.fire({
        title: 'Hapus Kedai Kopi?',
        text: 'Data dan seluruh foto tersimpan akan dihapus permanen!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    });

    if (confirmResult.isConfirmed) {
        try {
            const response = await fetch(`api/delete.php?id=${id}`);
            const result = await parseServerResponse(response);

            if (result.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Terhapus!',
                    text: result.message,
                    timer: 1500,
                    showConfirmButton: false
                });
                fetchCafes();
            } else {
                Swal.fire('Gagal!', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error!', error.message, 'error');
        }
    }
}

// ==========================================
// 4. FORM MANAGEMENT & EDIT LOGIC
// ==========================================

/**
 * Mengisi formulir dengan data kafe yang akan diedit
 * @param {number} id 
 */
function prepareEditCafe(id) {
    const cafe = cafeList.find(c => Number(c.id) === Number(id));
    if (!cafe) return;

    cafeIdInput.value = cafe.id;
    document.getElementById('cafeName').value = cafe.name || '';
    document.getElementById('cafeLocation').value = cafe.location || '';
    document.getElementById('cafeMaps').value = cafe.maps || '';
    document.getElementById('cafeRating').value = cafe.rating || 5;
    document.getElementById('photoCaption').value = cafe.photo_caption || '';
    document.getElementById('cafeNote').value = cafe.note || '';

    // Mengubah tampilan tombol submit
    formSubmitBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate me-1"></i> Perbarui Data Kafe';
    formSubmitBtn.className = 'btn btn-warning w-100 fw-bold py-2 shadow-sm text-dark';

    // Menampilkan tombol Batal Edit jika belum ada
    let cancelBtn = document.getElementById('cancelEditBtn');
    if (!cancelBtn) {
        cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.id = 'cancelEditBtn';
        cancelBtn.className = 'btn btn-outline-secondary w-100 mt-2 fw-semibold';
        cancelBtn.innerHTML = '<i class="fa-solid fa-xmark me-1"></i> Batal Edit';
        cancelBtn.addEventListener('click', resetForm);
        formSubmitBtn.parentNode.appendChild(cancelBtn);
    }

    cafeForm.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Mereset formulir kembali ke mode tambah data
 */
function resetForm() {
    cafeForm.reset();
    cafeIdInput.value = '';

    formSubmitBtn.innerHTML = '<i class="fa-solid fa-bookmark me-1"></i> Simpan Kafe Favorit';
    formSubmitBtn.className = 'btn btn-coffee w-100 fw-bold py-2 shadow-sm';

    const cancelBtn = document.getElementById('cancelEditBtn');
    if (cancelBtn) cancelBtn.remove();
}

// ==========================================
// 5. SEARCH & FILTERING (ARRAY MANIPULATION)
// ==========================================

/**
 * Melakukan pencarian real-time berdasarkan kata kunci nama / lokasi
 * @param {Event} event 
 */
function handleSearch(event) {
    const keyword = event.target.value.toLowerCase().trim();
    const filteredCafes = cafeList.filter(cafe => 
        cafe.name.toLowerCase().includes(keyword) || 
        cafe.location.toLowerCase().includes(keyword)
    );
    renderCafes(filteredCafes);
}

// ==========================================
// 6. GALLERY & POPUP MODAL (FIT SCREEN & NAV)
// ==========================================

/**
 * Menampilkan galeri foto dalam pop-up SweetAlert2 dengan penyesuaian ukuran & navigasi
 * @param {number} cafeId 
 * @param {number} startIndex 
 */
function openGallery(cafeId, startIndex = 0) {
    const cafe = cafeList.find(c => Number(c.id) === Number(cafeId));
    if (!cafe) return;

    const defaultImage = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500';
    const photos = (cafe.photos && cafe.photos.length > 0) ? cafe.photos : [defaultImage];
    let currentIndex = startIndex;

    function updateModalContent() {
        const imgEl = document.getElementById('swalGalleryImg');
        const counterEl = document.getElementById('swalGalleryCounter');
        const prevBtn = document.getElementById('swalPrevBtn');
        const nextBtn = document.getElementById('swalNextBtn');

        if (imgEl) imgEl.src = photos[currentIndex];
        if (counterEl) counterEl.innerText = `${currentIndex + 1} / ${photos.length}`;
        
        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentIndex === photos.length - 1);
    }

    Swal.fire({
        title: cafe.name,
        html: `
            <div class="position-relative text-center my-2">
                <img id="swalGalleryImg" src="${photos[currentIndex]}" 
                     class="img-fluid rounded shadow-sm" 
                     style="max-height: 60vh; width: 100%; object-fit: contain; background-color: #f8f9fa;">
            </div>
            ${photos.length > 1 ? `
            <div class="d-flex justify-content-between align-items-center mt-3 px-2">
                <button id="swalPrevBtn" class="btn btn-outline-dark btn-sm px-3 fw-bold">
                    <i class="fa-solid fa-chevron-left me-1"></i> Sebelum
                </button>
                <span id="swalGalleryCounter" class="badge bg-secondary fs-6">
                    ${currentIndex + 1} / ${photos.length}
                </span>
                <button id="swalNextBtn" class="btn btn-outline-dark btn-sm px-3 fw-bold">
                    Lanjut <i class="fa-solid fa-chevron-right ms-1"></i>
                </button>
            </div>
            ` : ''}
        `,
        width: '600px',
        showConfirmButton: false,
        showCloseButton: true,
        background: '#FDFBF7',
        didOpen: () => {
            const prevBtn = document.getElementById('swalPrevBtn');
            const nextBtn = document.getElementById('swalNextBtn');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateModalContent();
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < photos.length - 1) {
                        currentIndex++;
                        updateModalContent();
                    }
                });
            }

            // Navigasi menggunakan Tombol Panah Keyboard (<- / ->)
            const handleKeyDown = (e) => {
                if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    currentIndex--;
                    updateModalContent();
                } else if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) {
                    currentIndex++;
                    updateModalContent();
                }
            };
            document.addEventListener('keydown', handleKeyDown);

            // Bersihkan event listener keyboard saat pop-up ditutup
            const popup = Swal.getPopup();
            if (popup) {
                popup.addEventListener('remove', () => {
                    document.removeEventListener('keydown', handleKeyDown);
                });
            }
        }
    });
}

// ==========================================
// 7. RENDER COMPONENT TO UI
// ==========================================

/**
 * Merender daftar kafe dalam bentuk Card Grid
 * @param {Array} dataArray 
 */
function renderCafes(dataArray) {
    cafeCardContainer.innerHTML = '';

    if (!dataArray || dataArray.length === 0) {
        cafeCardContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fa-solid fa-mug-hot fa-3x text-muted mb-3"></i>
                <p class="text-muted fw-semibold">Belum ada kedai kopi tersimpan.</p>
            </div>
        `;
        return;
    }

    dataArray.forEach((cafe) => {
        const defaultImage = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500';
        const mainPhotoUrl = (cafe.photos && cafe.photos.length > 0) ? cafe.photos[0] : defaultImage;
        const mapsUrl = cafe.maps ? cafe.maps : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.location)}`;

        let galleryHtml = '';
        if (cafe.photos && cafe.photos.length > 1) {
            galleryHtml = `<div class="d-flex gap-1 mt-2 overflow-auto pb-1">`;
            cafe.photos.forEach((imgUrl, idx) => {
                galleryHtml += `
                    <img src="${imgUrl}" class="rounded border clickable-img" 
                         style="width: 45px; height: 45px; object-fit: cover; cursor: pointer;"
                         onclick="openGallery(${cafe.id}, ${idx})">
                `;
            });
            galleryHtml += `</div>`;
        }

        const cardHtml = `
            <div class="col-md-6 mb-4">
                <div class="card h-100 border-0 shadow-sm card-cafe rounded-4 overflow-hidden">
                    <div class="position-relative">
                        <img src="${mainPhotoUrl}" class="card-img-top clickable-img" 
                             style="height: 200px; object-fit: cover; cursor: pointer;"
                             onclick="openGallery(${cafe.id}, 0)" title="Klik untuk lihat galeri foto">
                        <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-3 shadow-sm fw-bold">
                            ⭐ ${Number(cafe.rating).toFixed(1)}
                        </span>
                    </div>
                    <div class="card-body p-3 d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="fw-bold text-brown mb-1">${cafe.name}</h5>
                            <p class="text-secondary fs-7 mb-2">
                                <i class="fa-solid fa-location-dot me-1 text-danger"></i>${cafe.location}
                            </p>
                            ${cafe.photo_caption ? `<p class="fst-italic text-muted fs-7 mb-1">"${cafe.photo_caption}"</p>` : ''}
                            <p class="fs-7 text-dark mb-2">${cafe.note || 'Tidak ada catatan.'}</p>
                            ${galleryHtml}
                        </div>
                        <div class="mt-3 pt-2 border-top">
                            <a href="${mapsUrl}" target="_blank" class="btn btn-sm btn-outline-success w-100 mb-2 fw-semibold">
                                <i class="fa-solid fa-map-location-dot me-1"></i> Buka Google Maps
                            </a>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-warning btn-sm flex-fill fw-semibold" onclick="prepareEditCafe(${cafe.id})">
                                    <i class="fa-solid fa-pen-to-square"></i> Edit
                                </button>
                                <button class="btn btn-outline-danger btn-sm flex-fill fw-semibold" onclick="deleteCafe(${cafe.id})">
                                    <i class="fa-solid fa-trash"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cafeCardContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
}

// ==========================================
// 8. EVENT LISTENERS INITIALIZATION
// ==========================================
cafeForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', handleSearch);
document.addEventListener('DOMContentLoaded', fetchCafes);