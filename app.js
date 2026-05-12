// Basit arama ve tablo gösterimi
// Dosya: veriler.json ile aynı klasörde çalışır

// Tema yönetimi
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let currentTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
  currentTheme = theme;
}

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Sayfayı yüklerken kaydedilmiş temayı uygula
setTheme(currentTheme);

let data = [];
let currentPage = 1;
const resultsPerPage = 10; // Her sayfada gösterilecek sonuç sayısı
let currentResults = []; // Mevcut arama sonuçları

const input = document.getElementById('searchInput');
const btn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const status = document.getElementById('status');
const tbody = document.querySelector('#resultsTable tbody');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Veri yükle ve BOM/encoding sorunlarını temizle
fetch('veriler.json')
  .then(r => r.text())  // Önce text olarak oku
  .then(text => {
    // BOM ve UTF-8 sorunlarını temizle
    text = text.replace(/^\uFEFF/, '');  // BOM'u kaldır
    try {
      data = JSON.parse(text);
      status.textContent = 'Veri yüklendi. INS # girip Ara tuşuna basın.';
      console.log('Yüklenen veri sayısı:', data.length);
    } catch(e) {
      console.error('JSON parse hatası:', e);
      status.textContent = 'veriler.json okuma hatası: ' + e.message;
    }
  })
  .catch(err => {
    console.error('Fetch hatası:', err);
    status.textContent = 'veriler.json yüklenemedi: ' + err.message;
  });

// Normalize: trim, küçük harf, NBSP ve BOM temizle
function normalize(s){
  if(s === undefined || s === null) return '';
  let str = s.toString();
  // remove BOM and non-breaking spaces
  str = str.replace(/\uFEFF/g, '').replace(/\u00A0/g, ' ');
  return str.trim().toLowerCase();
}

function updatePagination() {
  const totalPages = Math.ceil(currentResults.length / resultsPerPage);
  prevPageBtn.disabled = currentPage <= 1;
  nextPageBtn.disabled = currentPage >= totalPages;
  pageInfo.textContent = `Sayfa ${currentPage} / ${totalPages || 1}`;
}

function renderCurrentPage() {
  const start = (currentPage - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  const pageItems = currentResults.slice(start, end);
  
  tbody.innerHTML = '';
  if(pageItems.length === 0) {
    status.textContent = currentResults.length === 0 ? 'Eşleşme bulunamadı.' : 'Bu sayfada sonuç yok.';
    return;
  }

  status.textContent = `${currentResults.length} sonuç bulundu. (${start + 1}-${Math.min(end, currentResults.length)} gösteriliyor)`;
  
  const frag = document.createDocumentFragment();
  pageItems.forEach(row => {
    const tr = document.createElement('tr');
    const ins = document.createElement('td'); ins.textContent = row['INS #'] || '';
    const onay = document.createElement('td'); onay.textContent = row['Onay'] || '';
    const isim = document.createElement('td'); isim.textContent = row['İsim'] || '';
    const tip = document.createElement('td'); tip.textContent = row['Tip'] || '';
    const not = document.createElement('td'); not.textContent = row['Not'] || '';
    tr.appendChild(ins); tr.appendChild(onay); tr.appendChild(isim); tr.appendChild(tip); tr.appendChild(not);
    frag.appendChild(tr);
  });
  tbody.appendChild(frag);
  updatePagination();
}

function search(){
  const q = normalize(input.value);

  if(data.length === 0){
    status.textContent = 'Veri henüz yüklenmedi. Lütfen bekleyin ve tekrar deneyin.';
    return;
  }

  if(!q){
    status.textContent = 'Lütfen bir INS # girin.';
    tbody.innerHTML = '';
    currentResults = [];
    currentPage = 1;
    updatePagination();
    return;
  }

  // Daha toleranslı eşleştirme: tam, başlangıç, substring ve "temizlenmiş" karşılaştırma
  const qClean = q.replace(/[^a-z0-9]/g, '');

  currentResults = data.filter(item => {
    const rawIns = item['INS #'];
    const ins = normalize(rawIns);
    if(!ins) return false;
    const insClean = ins.replace(/[^a-z0-9]/g, '');

    if(ins === q) return true;            // tam eşleşme
    if(ins.startsWith(q)) return true;    // baştan başlayan (150 -> 150a)
    if(ins.includes(q)) return true;      // substring olarak da eşleştir

    // temizlenmiş (nokta/boşluk/diğer karakterler kaldırılmış) karşılaştırma
    if(insClean === qClean) return true;
    if(insClean.startsWith(qClean)) return true;
    if(insClean.includes(qClean)) return true;

    return false;
  });

  currentPage = 1;
  renderCurrentPage();
}

// Sayfalama kontrolleri
prevPageBtn.addEventListener('click', () => {
  if(currentPage > 1) {
    currentPage--;
    renderCurrentPage();
  }
});

nextPageBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(currentResults.length / resultsPerPage);
  if(currentPage < totalPages) {
    currentPage++;
    renderCurrentPage();
  }
});

btn.addEventListener('click', search);
clearBtn.addEventListener('click', () => {
  input.value = '';
  tbody.innerHTML = '';
  currentResults = [];
  currentPage = 1;
  status.textContent = 'Arama temizlendi.';
  updatePagination();
});
input.addEventListener('keydown', (e) => { if(e.key === 'Enter') search(); });
