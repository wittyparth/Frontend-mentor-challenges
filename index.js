
    // Sample data for challenges
    const challenges = [
    {
        id: 1,
        title: "QR Code Component",
        description: "A perfect first challenge if you're new to HTML and CSS. The card layout doesn't shift, so it's ideal if you haven't learned about responsive design yet.",
        technologies: ["HTML", "CSS"],
        difficulty: "newbie",
        completed: true,
        completionDate: "March 15, 2025",
        liveUrl: "https://wittyparth.github.io/Frontend-mentor-challenges/skilled-e-learning-landing-page/index.html",
        githubUrl: "https://github.com/user/qr-code-challenge"
    },
    {
        id: 2,
        title: "Browser Extension Manager UI",
        description: "This project will be a fun way to practice working with dynamic data, filtering data, color theming, building a responsive grid, and more!",
        technologies: ["HTML", "CSS", "JS"],
        difficulty: "junior",
        completed: false,
        completionDate: "",
        liveUrl: "https://extension-manager-ui.com",
        githubUrl: "https://github.com/user/extension-manager-ui"
    },
    {
        id: 3,
        title: "Mood Tracking App",
        description: "Building this app will be a fun way to test a range of your skills. From working with JSON data to logging and charting mood entries, there's a lot to get stuck into!",
        technologies: ["HTML", "CSS", "JS"],
        difficulty: "intermediate",
        completed: true,
        completionDate: "April 2, 2025",
        liveUrl: "https://mood-tracker-app.com",
        githubUrl: "https://github.com/user/mood-tracker-app"
    },
    {
        id: 4,
        title: "Personal Blog",
        description: "This multi-page personal blog project has a JSON file to practice working with dynamic data. You can even use a headless CMS to take the difficulty up a notch!",
        technologies: ["HTML", "CSS", "JS"],
        difficulty: "intermediate",
        completed: false,
        completionDate: "",
        liveUrl: "https://personal-blog-project.com",
        githubUrl: "https://github.com/user/personal-blog"
    },
    {
        id: 5,
        title: "E-commerce Product Page",
        description: "Build a responsive e-commerce product page with image gallery, cart functionality, and responsive design.",
        technologies: ["HTML", "CSS", "JS"],
        difficulty: "advanced",
        completed: true,
        completionDate: "April 20, 2025",
        liveUrl: "https://ecommerce-product-page.com",
        githubUrl: "https://github.com/user/ecommerce-product"
    },
    {
        id: 6,
        title: "Interactive Dashboard",
        description: "Create an interactive dashboard with charts, data visualization, and real-time updates using modern JavaScript frameworks.",
        technologies: ["HTML", "CSS", "JS", "API"],
        difficulty: "guru",
        completed: false,
        completionDate: "",
        liveUrl: "https://interactive-dashboard.com",
        githubUrl: "https://github.com/user/interactive-dashboard"
    }
    ];

    // DOM elements
    const challengesGrid = document.getElementById('challenges-grid');
    const searchInput = document.getElementById('search-input');
    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const sortBtn = document.getElementById('sort-btn');
    const sortDropdown = document.getElementById('sort-dropdown');
    const challengesCount = document.getElementById('challenges-count');
    const totalChallengesEl = document.getElementById('total-challenges');
    const completedChallengesEl = document.getElementById('completed-challenges');
    const completionRateEl = document.getElementById('completion-rate');

    // Current filter and sort values
    let currentFilter = 'all';
    let currentSort = 'newest';
    let searchQuery = '';

    // Initialize the dashboard
    function initDashboard() {
    updateStats();
    renderChallenges();
    setupEventListeners();
}

    // Update statistics
    function updateStats() {
    const total = challenges.length;
    const completed = challenges.filter(challenge => challenge.completed).length;
    const rate = Math.round((completed / total) * 100);

    totalChallengesEl.textContent = total;
    completedChallengesEl.textContent = completed;
    completionRateEl.textContent = `${rate}%`;
}

    // Render challenges based on current filter, sort, and search
    function renderChallenges() {
    // Clear the grid
    challengesGrid.innerHTML = '';

    // Filter challenges
    let filteredChallenges = challenges.filter(challenge => {
    const matchesFilter = currentFilter === 'all' || challenge.difficulty === currentFilter;
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
});

    // Sort challenges
    filteredChallenges = sortChallenges(filteredChallenges);

    // Update challenges count
    challengesCount.textContent = `Showing ${filteredChallenges.length} of ${challenges.length} challenges`;

    // Render each challenge
    filteredChallenges.forEach(challenge => {
    const challengeCard = createChallengeCard(challenge);
    challengesGrid.appendChild(challengeCard);
});
}

    // Sort challenges based on current sort option
    function sortChallenges(challengesToSort) {
    const difficultyOrder = ['newbie', 'junior', 'intermediate', 'advanced', 'guru'];

    return [...challengesToSort].sort((a, b) => {
    switch(currentSort) {
    case 'newest':
    if (a.completed && b.completed) {
    return new Date(b.completionDate) - new Date(a.completionDate);
} else if (a.completed) {
    return -1;
} else if (b.completed) {
    return 1;
}
    return 0;
    case 'oldest':
    if (a.completed && b.completed) {
    return new Date(a.completionDate) - new Date(b.completionDate);
} else if (a.completed) {
    return -1;
} else if (b.completed) {
    return 1;
}
    return 0;
    case 'easiest':
    return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
    case 'hardest':
    return difficultyOrder.indexOf(b.difficulty) - difficultyOrder.indexOf(a.difficulty);
    default:
    return 0;
}
});
}

    // Create a challenge card element
    function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card';

    // Tech tags
    const techTags = challenge.technologies.map(tech =>
    `<span class="tech-tag">${tech}</span>`
    ).join('');

    // Completion date or empty state
    const completionDate = challenge.completed ?
    `<div class="completion-date">Completed: ${challenge.completionDate}</div>` :
    `<div class="completion-date">Not completed yet</div>`;

    card.innerHTML = `
                <div class="card-header">
                    <h2 class="card-title">${challenge.title}</h2>
                    <p class="card-description">${challenge.description}</p>
                    <div class="card-tech">${techTags}</div>
                </div>
                <div class="card-footer">
                    <div>
                        <span class="difficulty ${challenge.difficulty}">${challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}</span>
                        ${completionDate}
                    </div>
                    <div class="card-actions">
                        <a href="${challenge.liveUrl}" target="_blank" class="action-btn live-btn">
                            <i class="fas fa-external-link-alt"></i> Live Site
                        </a>
                        <a href="${challenge.githubUrl}" target="_blank" class="action-btn github-btn">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>
            `;

    return card;
}

    // Set up event listeners
    function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderChallenges();
    });

    // Filter dropdown
    filterBtn.addEventListener('click', () => {
    filterDropdown.classList.toggle('show');
    sortDropdown.classList.remove('show');
});

    // Sort dropdown
    sortBtn.addEventListener('click', () => {
    sortDropdown.classList.toggle('show');
    filterDropdown.classList.remove('show');
});

    // Filter items
    document.querySelectorAll('#filter-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
    // Update active state
    document.querySelectorAll('#filter-dropdown .dropdown-item').forEach(i => {
    i.classList.remove('active');
});
    item.classList.add('active');

    // Update filter and re-render
    currentFilter = item.dataset.difficulty;
    filterBtn.querySelector('span').textContent =
    currentFilter === 'all' ? 'Filter by difficulty' : item.textContent;
    filterDropdown.classList.remove('show');
    renderChallenges();
});
});

    // Sort items
    document.querySelectorAll('#sort-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
    // Update active state
    document.querySelectorAll('#sort-dropdown .dropdown-item').forEach(i => {
    i.classList.remove('active');
});
    item.classList.add('active');

    // Update sort and re-render
    currentSort = item.dataset.sort;
    sortBtn.querySelector('span').textContent = item.textContent;
    sortDropdown.classList.remove('show');
    renderChallenges();
});
});

    // Close dropdowns when clicking outside
    window.addEventListener('click', (e) => {
    if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
    filterDropdown.classList.remove('show');
}
    if (!sortBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
    sortDropdown.classList.remove('show');
}
});
}

    // Initialize the dashboard when DOM is loaded
    document.addEventListener('DOMContentLoaded', initDashboard);