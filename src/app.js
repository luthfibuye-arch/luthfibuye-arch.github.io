document.addEventListener('alpine:init', () => {
  Alpine.data('produk', () => ({
    items: [
            {id: 1, name: 'Voucher 5 Jam', image: '1.svg', price: 2000, desc: 'Voucher internet dengan masa aktif 5 jam. Cocok untuk kebutuhan browsing ringan, belajar online, dan komunikasi harian.'},
            {id: 2, name: 'Voucher 12 Jam', image: '2.svg', price: 3000, desc: 'Voucher internet aktif selama 12 jam dengan koneksi stabil, cocok untuk penggunaan setengah hari.'},
            {id: 3, name: 'Voucher 24 Jam', image: '3.svg', price: 5000, desc: 'Voucher internet aktif penuh selama 24 jam, cocok untuk streaming, kerja, dan aktivitas online seharian.'},
            {id: 4, name: 'Voucher 1 Bulan', image: '4.svg', price: 75000, desc: 'Voucher internet bulanan dengan koneksi stabil untuk kebutuhan harian tanpa khawatir masa aktif.'},
            {id: 5, name: 'Pemasangan Wi-Fi', image: '5.svg', price: 50000, desc: 'Biaya pemasangan layanan Wi-Fi untuk rumah atau tempat usaha agar dapat menikmati koneksi internet.'},
            {id: 6, name: 'PPP oe Reguler', image: '6.png', price: 150000, desc: 'Paket Wi-Fi PPPoE Reguler untuk penggunaan normal hingga 5 perangkat HP dengan kecepatan sinyal 5 Mbps selama 1 bulan.'},
            {id: 7, name: 'PPP oe Premium', image: '7.png', price: 200000, desc: 'Paket Wi-Fi PPPoE Premium untuk penggunaan normal hingga 10 perangkat HP dengan kecepatan sinyal 10 Mbps selama 1 bulan.'},
            {id: 8, name: 'PPP oe Diamon', image: '8.png', price: 250000, desc: 'Paket Wi-Fi PPPoE Diamond untuk penggunaan normal hingga 15 perangkat HP dengan kecepatan sinyal 15 Mbps selama 1 bulan.'},
        ],
    modalOpen: false,
    selectedItem: {},

    openModal(item) {
      this.selectedItem = item
      this.modalOpen = true
    },

    closeModal() {
      this.modalOpen = false
      this.selectedItem = {}
    },

    }));
    

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0, 
        add(newItem) {
            // cek apakah ada nama barang yang sama
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.total += newItem.price;
                this.quantity ++;
            } else {
                // jika barang nya ada di cart, cek apakah beda atau sama dalam cart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if(item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barah sudah ada tambah quantity dan subtotalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.total += item.price;
                        this.quantity ++;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // item yang mau di remove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id);
            // jika item lebih dari satu 
            if(cartItem.quantity > 1) {
                // telusuri satu-satu
                this.items = this.items.map((item => {
                    // jika bukan barang yang di klik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.total -= item.price;
                        this.quantity --;
                        return item;
                    }
                }))
            } else if (cartItem.quantity === 1) {
                // jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.total -= cartItem.price;
                this.quantity --;
            }
        }
    });
});


// form validasi
const chekOutButton = document.querySelector('.chekout-btn');
chekOutButton.disabled = true;

const form = document.querySelector('#chekout-form')

form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++) {
        if(form.elements[i].value.length !== 0) {
            chekOutButton.classList.remove('disabled');
            chekOutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    chekOutButton.disabled = false;
    chekOutButton.classList.remove('disabled');
});


// kirim data ketika tombol chekout di klik
chekOutButton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // console.log(objData);
    const message = formatMassage(objData);
    window.open('http://wa.me/6285846201835?text=' + encodeURIComponent(message))

// panggil token fatch
// try {
//     const response = await fetch('php/placeOrder.php', {
//         method: 'POST',
//         body: data,
//     });
//     const token = await response.text();
//     // console.log(token);
//     window.snap.pay(token);
// } catch(err) {
//     console.log(err.message);
// }
});


// format pesan wathsapp
const formatMassage = (obj) => {
    return `Data Pelanggan
        Nama: ${obj.name}
        Email: ${obj.email}
        No HP: ${obj.phone}
    Data Pesanan
        ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})\n`)}
    TTOTAL: ${rupiah(obj.total)}
    Terima kasih.`
    

}


// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style:'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};
