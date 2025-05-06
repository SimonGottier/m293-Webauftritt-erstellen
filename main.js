// Login-Logik
const users = {
    Simon: "12345",  // Benutzerlogin
    Admin: "12345"   // Adminlogin
};

// Funktion für das Umschalten der Tabs (User/Admin)
function switchTab(tabType) {
    const tabs = document.querySelectorAll('.login-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    const activeTab = document.querySelector(`.login-tab[data-tab="${tabType}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Login-Prozess
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        toggleLoginModal();

        // Artikelanzeige aktualisieren
        loadArticles();
        
        // Artikel-Link in der Navigation anzeigen
        const articleLink = document.getElementById('articleLink');
        if (articleLink) {
            articleLink.style.display = 'block';
        }
    } else {
        alert('Benutzername oder Passwort ist falsch.');
    }
}

// Modal anzeigen/verstecken
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    if (!modal) return;
    
    if (window.getComputedStyle(modal).display === 'none' || modal.style.display === 'none') {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

// Artikel laden + filtern
function loadArticles() {
    // Nur fortfahren, wenn der Benutzer eingeloggt ist
    if (!localStorage.getItem('loggedIn')) {
        // Zeige Login-Prompt an
        const loginPrompt = document.getElementById('loginPrompt');
        if (loginPrompt) {
            loginPrompt.style.display = 'block';
        }
        
        // Verstecke Artikel-Grid
        const articlesGrid = document.getElementById('articlesGrid');
        if (articlesGrid) {
            articlesGrid.style.display = 'none';
        }
        return;
    }
    
    // Zeige Artikel-Grid an
    const articlesGrid = document.getElementById('articlesGrid');
    if (articlesGrid) {
        articlesGrid.style.display = 'grid';
    }
    
    // Verstecke Login-Prompt
    const loginPrompt = document.getElementById('loginPrompt');
    if (loginPrompt) {
        loginPrompt.style.display = 'none';
    }
    
    // Wenn wir auf der topics.html Seite sind, Filter-Funktionalität aktivieren
    if (window.location.pathname.includes('topics.html')) {
        const articles = [
            {
                title: 'Quantencomputer revolutionieren die Technologiewelt',
                topic: 'ki',
                date: '03.05.2025',
                author: 'Dr. Julia Klein',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            },
            {
                title: 'HTML in der Zukunft',
                topic: 'html',
                date: '01.05.2025',
                author: 'Max Mustermann',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            },
            {
                title: 'Die Macht der Blockchain',
                topic: 'blockchain',
                date: '28.04.2025',
                author: 'Satoshi Nakamoto',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            },
            {
                title: 'Die Zukunft der Programmierung',
                topic: 'informatiker',
                date: '25.04.2025',
                author: 'Lisa Müller',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            },
            {
                title: 'React vs. Angular - Ein Vergleich',
                topic: 'react',
                date: '20.04.2025',
                author: 'David Schmidt',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            },
            {
                title: 'JavaScript Frameworks im Jahr 2025',
                topic: 'javascript',
                date: '15.04.2025',
                author: 'Michael Weber',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            },
            {
                title: 'Zukunftstrends in der IT',
                topic: 'zukunft',
                date: '10.04.2025',
                author: 'Anna Schneider',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            },
            {
                title: 'Pflanzen für deinen Arbeitsplatz',
                topic: 'botanik',
                date: '05.04.2025',
                author: 'Laura Grün',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            },
            {
                title: 'Gesundes Sitzen am Schreibtisch',
                topic: 'ergonomie',
                date: '01.04.2025',
                author: 'Thomas Rücken',
                image: '/api/placeholder/800/500',
                link: 'articles.html'
            }
        ];

        const grid = document.getElementById('articlesGrid');
        if (!grid) return;

        // Funktion zum Rendern der gefilterten Artikel
        function render(filteredArticles) {
            grid.innerHTML = '';
            if (filteredArticles.length === 0) {
                grid.innerHTML = '<p style="text-align:center;">Keine Artikel gefunden.</p>';
                return;
            }

            filteredArticles.forEach(article => {
                const card = document.createElement('div');
                card.classList.add('article-card');
                card.innerHTML = `
                    <div class="article-image" style="background-image: url('${article.image}')"></div>
                    <div class="article-info">
                        <div class="article-title">${article.title}</div>
                        <div class="article-meta">${article.date} – ${article.author}</div>
                        <a href="${article.link}" class="read-more-btn">Lesen</a>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Initial alle Artikel anzeigen
        render(articles);

        // Event-Listener für die Filter-Buttons hinzufügen
        console.log("Setting up filter buttons");
        const filterItems = document.querySelectorAll('.filter-topic');
        console.log("Found filter items:", filterItems.length);
        
        filterItems.forEach(item => {
            // Bestehende Event-Listener entfernen
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            // Neuen Event-Listener hinzufügen
            newItem.addEventListener('click', () => {
                console.log("Filter clicked:", newItem.getAttribute('data-topic'));
                
                // Aktiven Status aktualisieren
                filterItems.forEach(i => i.classList.remove('active'));
                newItem.classList.add('active');

                // Artikel filtern
                const topic = newItem.getAttribute('data-topic');
                const filtered = topic === 'all' ? articles : articles.filter(a => a.topic === topic);
                
                // Gefilterte Artikel anzeigen
                render(filtered);
            });
        });
    }
}

// Prüfen beim Laden der Seite
window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Login-Button global aktivieren
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(btn => {
        // Bestehende Event-Listener entfernen und neue hinzufügen
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', toggleLoginModal);
    });

    // Login-Submit-Button aktivieren
    const loginSubmit = document.querySelector('.login-submit-btn');
    if (loginSubmit) {
        // Bestehende Event-Listener entfernen und neue hinzufügen
        const newSubmit = loginSubmit.cloneNode(true);
        loginSubmit.parentNode.replaceChild(newSubmit, loginSubmit);
        newSubmit.addEventListener('click', handleLogin);
    }
    
    // Artikel laden basierend auf Login-Status
    loadArticles();
    
    // Artikel-Link in der Navigation anzeigen/verstecken basierend auf Login-Status
    const articleLink = document.getElementById('articleLink');
    if (articleLink) {
        articleLink.style.display = localStorage.getItem('loggedIn') ? 'block' : 'none';
    }
});