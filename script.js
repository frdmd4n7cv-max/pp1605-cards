let currentIndex = 0;
let currentFilter = "all";
let filteredCards = [...CARDS_DB];

const cardElement = document.getElementById('currentCard');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const metaInfo = document.getElementById('metaInfo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const statsDiv = document.getElementById('stats');
const progressFill = document.getElementById('progressFill');

let tg = window.Telegram.WebApp;
tg.expand();

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        applyFilter();
    });
});

function applyFilter() {
    if (currentFilter === "all") {
        filteredCards = [...CARDS_DB];
    } else {
        filteredCards = CARDS_DB.filter(card => card.category === currentFilter);
    }
    if (filteredCards.length === 0) {
        filteredCards = [...CARDS_DB];
        currentFilter = "all";
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    }
    currentIndex = 0;
    updateCard();
}

function updateCard() {
    if (filteredCards.length === 0) return;
    const card = filteredCards[currentIndex];
    questionText.innerText = card.question;
    answerText.innerText = card.answer;
    const catNames = { video: "🎥 Видео", percent: "📊 Проценты", terms: "⏱ Сроки", n2: "⚠️ N2", n3: "🚨 N3" };
    metaInfo.innerText = `${catNames[card.category] || card.category} | ${currentIndex+1}/${filteredCards.length}`;
    cardElement.classList.remove('flipped');
    updateStats();
}

function updateStats() {
    statsDiv.innerText = `${currentIndex+1}/${filteredCards.length}`;
    progressFill.style.width = `${((currentIndex+1)/filteredCards.length)*100}%`;
}

function nextCard() { currentIndex = (currentIndex+1) % filteredCards.length; updateCard(); }
function prevCard() { currentIndex = (currentIndex-1+filteredCards.length) % filteredCards.length; updateCard(); }
function shuffleCards() {
    for (let i = filteredCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
    }
    currentIndex = 0;
    updateCard();
}

cardElement.addEventListener('click', () => cardElement.classList.toggle('flipped'));
nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);
shuffleBtn.addEventListener('click', shuffleCards);

applyFilter();
