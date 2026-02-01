const c2 = document.getElementById('net');
const ctx2 = c2.getContext('2d');
c2.width = innerWidth;
c2.height = innerHeight;

window.addEventListener('resize', () => {
  c2.width = innerWidth;
  c2.height = innerHeight;
});

// Больше частиц и светлее
let dots = Array.from({length: 80}, () => ({
  x: Math.random()*c2.width,
  y: Math.random()*c2.height,
  vx: (Math.random()-0.5)*0.3,
  vy: (Math.random()-0.5)*0.3
}));

function drawNet() {
  ctx2.clearRect(0,0,c2.width,c2.height);
  dots.forEach(d => {
    ctx2.fillStyle = 'rgba(90,150,255,0.3)';
    ctx2.beginPath();
    ctx2.arc(d.x, d.y, 3, 0, Math.PI*2);
    ctx2.fill();
    d.x += d.vx;
    d.y += d.vy;
    if(d.x<0 || d.x>c2.width) d.vx*=-1;
    if(d.y<0 || d.y>c2.height) d.vy*=-1;
  });

  // Линии между частицами
  for(let i=0;i<dots.length;i++){
    for(let j=i+1;j<dots.length;j++){
      let dx = dots[i].x - dots[j].x;
      let dy = dots[i].y - dots[j].y;
      let dist = Math.sqrt(dx*dx+dy*dy);
      if(dist<150){
        ctx2.strokeStyle = `rgba(90,150,255,${0.2*(1-dist/150)})`;
        ctx2.beginPath();
        ctx2.moveTo(dots[i].x,dots[i].y);
        ctx2.lineTo(dots[j].x,dots[j].y);
        ctx2.stroke();
      }
    }
  }

  requestAnimationFrame(drawNet);
}
drawNet();


// индивидуальная информация игроков
const playersData = {
  Exomi: {
    name: "Exomi",
    role: "Основатель & Капитан",
    photo: "images.png",
    bio: "Тактический мозг команды. Планирует стратегии, расставляет игроков по позициям и принимает решения в бою. От него зависит организация команды и контроль карты.",
    stats: {Level: 9, "K/D Ratio":1.08, Elo:1775},
    gear: {Мышь:"Razer DeathAdder", Клавиатура:"Hator Rockfall", Наушники:"Hator Hypergang"},
    socials: {FACEIT:"#", STEAM:"#"}
  },
  dizerix: {
    name: "dizerix",
    role: "AWPer",
    photo: "images.png",
    bio: "Снайпер команды. Специализируется на быстрых и точных выстрелах с AWP. Контролирует ключевые позиции и открывает пространство для команды.",
    stats: {Level:6, "K/D Ratio":0.87, Elo:1306},
    gear: {Мышь:"Logitech G pro 2", Клавиатура:"Genius", Наушники:"Razer Kraken"},
    socials: {FACEIT:"#", STEAM:"#"}
  },
  Cheliks: {
    name: "Cheliks",
    role: "AWPer",
    photo: "images.png",
    bio: "Первый на точке боевого контакта. Берёт на себя риск и создаёт давление на противника. Его задача — быстро открывать позиции и давать команде преимущество.",
    stats: {Level:9, "K/D Ratio":1.25, Elo:1700},
    gear: {Мышь:"Razer Viper", Клавиатура:"SteelSeries Apex", Наушники:"Sennheiser HD"},
    socials: {FACEIT:"#", STEAM:"#"}
  },
  Hez1: {
    name: "Hez1",
    role: "Rifler",
    photo: "images.png",
    bio: "Поддержка команды. Обеспечивает экономическую стабильность, контроль гранат и полезных ресурсов. Помогает союзникам и создаёт удобные условия для атак.",
    stats: {Level:8, "K/D Ratio":1.1, Elo:1600},
    gear: {Мышь:"Glorious Model O", Клавиатура:"Hator Rockfall", Наушники:"Hator Hypergang"},
    socials: {FACEIT:"#", STEAM:"#"}
  },
  Se1n: {
    name: "Se1n",
    role: "Support",
    photo: "images.png",
    bio: "Специалист по «тёмным углам». Действует отдельно от команды, ловит врагов в тылу и создаёт угрозу на неожиданных позициях. Создаёт хаос и отвлекает противника.",
    stats: {Level:7, "K/D Ratio":0.95, Elo:1500},
    gear: {Мышь:"Logitech G203", Клавиатура:"Corsair K60", Наушники:"HyperX Cloud II"},
    socials: {FACEIT:"#", STEAM:"#"}
  }
};

let overlayOpen = false;
function openPlayer(id){
  if(overlayOpen) return;

  const player = playersData[id];
  if (!player) {
    console.error("Игрок не найден:", id);
    return;
  }

  overlayOpen = true;

  const overlay = document.createElement('div');
  overlay.classList.add('player-overlay');

  overlay.innerHTML = `
    <div class="player-box">
      <img src="${player.photo}" class="player-photo">
      <div class="player-info">
        <span class="role-badge">${player.role}</span>
        <h2>${player.name}</h2>
        <p class="bio">${player.bio}</p>

        <div class="stats-row">
          ${Object.entries(player.stats).map(
            ([k,v]) => `<div class="stat-box"><span class="val">${v}</span><span>${k}</span></div>`
          ).join('')}
        </div>

        <div class="gear-section">
          ${Object.entries(player.gear).map(
            ([k,v]) => `<div class="gear-card">${k}<br>${v}</div>`
          ).join('')}
        </div>

        <div class="socials">
          ${Object.entries(player.socials).map(
            ([k,v]) => `<a href="${v}" class="soc-link" target="_blank">${k}</a>`
          ).join('')}
        </div>

        <button class="btn-close" onclick="closePlayer()">Закрыть</button>
      </div>
    </div>
  `;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePlayer();
  });

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add('active');
    overlay.querySelector('.player-box').classList.add('active');
  });
}
function closePlayer(){
  const overlay = document.querySelector('.player-overlay');
  if(!overlay) return;
  overlay.querySelector('.player-box').classList.remove('active');
  overlay.classList.remove('active');
  setTimeout(()=>{
    overlay.remove();
    overlayOpen=false;
  },300);
}



// Подгрузка навигации
function loadNav(){
  const placeholder = document.getElementById('nav-placeholder');
  if(!placeholder) return;

  fetch('nav.html')
    .then(response => {
      if(!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(data => {
      placeholder.innerHTML = data;

      // Подсветить активную ссылку
      const path = location.pathname.split('/').pop();
      const links = placeholder.querySelectorAll('.nav-item');
      links.forEach(a => {
        const href = a.getAttribute('href');
        if(href === path || (href === 'index.html' && path === '')) {
          a.classList.add('active');
        }
      });
    })
    .catch(err => {
      console.error('Failed to load nav:', err);
      // Фоллбек: вставим простую навигацию на случай ошибок (например при открытии по file://)
      placeholder.innerHTML = `
        <nav class="nav-container">
          <a href="news.html" class="nav-item">Новости</a>
          <a href="team.html" class="nav-item">Команда</a>
          <a href="matches.html" class="nav-item">Матчи</a>
          <a href="contacts.html" class="nav-item">Контакты</a>
        </nav>
      `;
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNav);
} else {
  loadNav();
}

// Подгрузкание новостей о турнирах
fetch('news.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("tournament-grid");
    grid.innerHTML = "";

    data.forEach(news => {
      const card = document.createElement('div');
      card.classList.add('tournament-card');

      card.innerHTML = `
        <div class="tournament-title">${news.title}</div>
        <div class="tournament-date">${news.date}</div>
        <div class="tournament-desc">${news.content}</div>
        ${news.img ? `<img src="${news.img}" style="width:100%;margin-top:10px;border-radius:8px;">` : ""}
        <button class="btn-more">Подробнее</button>
      `;

      card.querySelector('.btn-more').addEventListener('click', () => {
        openNews(news);
      });

      grid.appendChild(card);
    });
  });

function openNews(news){
  const overlay = document.getElementById("overlay");
  const overlayBox = document.getElementById("overlay-box");

  overlayBox.innerHTML = `
    <h2>${news.title}</h2>
    <p><strong>${news.date}</strong></p>
    ${news.img ? `<img src="${news.img}" style="width:100%;margin:15px 0;border-radius:10px;">` : ""}
    <p>${news.full || news.content}</p>
    <button class="btn-close">Закрыть</button>
  `;

  overlay.classList.add('active');
  overlayBox.classList.add('active');

  overlayBox.querySelector('.btn-close').onclick = () => {
    overlay.classList.remove('active');
    overlayBox.classList.remove('active');
  };
}

