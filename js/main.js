// Main JavaScript untuk Wash Up Laundry

// Daftar modul yang akan di-load
const modules = [
    'navbar.html',
    'hero.html',
    'services.html',
    'advantages.html',
    'process.html',
    'order-form.html',
    'footer.html'
];

// Load semua modul
async function loadModules() {
    const contentContainer = document.getElementById('content');
    
    for (const module of modules) {
        try {
            const response = await fetch(`modules/${module}`);
            const html = await response.text();
            
            // Buat div untuk menampung modul
            const moduleDiv = document.createElement('div');
            moduleDiv.innerHTML = html;
            
            // Tambahkan ke container utama
            contentContainer.appendChild(moduleDiv);
            
            console.log(`✅ Module ${module} loaded successfully`);
        } catch (error) {
            console.error(`❌ Error loading module ${module}:`, error);
        }
    }
    
    // Setelah semua modul di-load, inisialisasi fungsi
    initializeFunctions();
}

// Inisialisasi semua fungsi setelah DOM siap
function initializeFunctions() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Form submission untuk WhatsApp
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data dari form
            const nama = document.getElementById('nama').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const alamat = document.getElementById('alamat').value;
            const catatan = document.getElementById('catatan').value;
            const layanan = document.querySelector('input[name="layanan"]:checked').value;
            
            // Nama layanan untuk ditampilkan
            const layananNames = {
                'kiloan': 'Laundry Kiloan',
                'satuan': 'Laundry Satuan',
                'karpet': 'Cuci Karpet',
                'sneaker': 'Cuci Sneaker'
            };
            
            // Format pesan untuk WhatsApp
            const message = `Halo Wash Up Laundry! Saya mau pesan laundry nih.

Nama: ${nama}
No WhatsApp: ${whatsapp}
Alamat: ${alamat}
Layanan: ${layananNames[layanan]}
Catatan: ${catatan || 'Tidak ada catatan'}

Bisa dibantu untuk penjemputan? Terima kasih!`;
            
            // Encode pesan untuk URL
            const encodedMessage = encodeURIComponent(message);
            
            // Redirect ke WhatsApp (nomor admin dummy)
            const whatsappNumber = '6281234567890';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Buka WhatsApp di tab baru
            window.open(whatsappURL, '_blank');
            
            // Reset form
            orderForm.reset();
            
            // Tampilkan notifikasi
            showNotification('Pesanan berhasil dikirim! Admin akan menghubungi kamu via WhatsApp.');
        });
    }
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Tutup mobile menu jika terbuka
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Animasi untuk service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-fade-in';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-3 text-xl"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Tambahkan ke body
    document.body.appendChild(notification);
    
    // Hapus notifikasi setelah 5 detik
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Tambahkan style untuk animasi notifikasi
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Load modul saat halaman siap
document.addEventListener('DOMContentLoaded', loadModules);