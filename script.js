// ============================================
// DATA MANAGEMENT
// ============================================

// Default data
const defaultVideos = [
    { title: "Handheld Punch Tool (Holes)", link: "https://drive.google.com/file/d/1XgLfgnBVFXKcTGElEgBZJI2yJcqZpSfX/view?usp=drive_link", category: "Tools" },
    { title: "How to Use Hammer Punching Tool", link: "https://drive.google.com/file/d/1FaeRl_GPVrtVtddShgxJhQvFT8kbHYz0/view?usp=drive_link", category: "Tools" },
    { title: "How to Use Manual Corner Cutter", link: "https://drive.google.com/file/d/1_UO8a6JzsxVcYwlcrbl-gqlYWvHUN007/view?usp=sharing", category: "Tools" },
    { title: "Glue Pasting on Envelope", link: "https://drive.google.com/file/d/19xVJ48DPqO8v-eAnra4Xgm5CcoMqbXk0/view?usp=sharing", category: "Assembly" },
    { title: "Crease Making Envelope", link: "https://drive.google.com/file/d/1IoOW6Qbo42qnwbpOnVayQ-syiOthOZeI/view?usp=sharing", category: "Assembly" },
    { title: "Card Holder Pasting", link: "https://drive.google.com/file/d/1e_JBNc3NtoY9DQW_RKpK2T73Nwc60TtI/view?usp=sharing", category: "Assembly" },
    { title: "Saga Digital Cutting Machine", link: "https://drive.google.com/file/d/1THpx6Vkd6Q7HUDdO2MtA-VUVL6yf41O2/view?usp=sharing", category: "Machines" },
    { title: "Vulcan Small Cutting Machine", link: "https://drive.google.com/file/d/1JVSAwsTMqSY59g5VLo4-Rinm5n0CLCWF/view?usp=sharing", category: "Machines" },
    { title: "How to Use Paper Cutter and Scale", link: "https://drive.google.com/file/d/1MhSY8fheb-7bpw0YMqlzK6QI1N-l2UeZ/view?usp=sharing", category: "Tools" }
];

const defaultAreas = [
    {
        name: "Printing Area",
        icon: "🖨️",
        description: "Machine setup, quality checks, and maintenance documentation.",
        badge: "Production",
        // UPDATED LINK
        link: "https://akshay863.github.io/printing-area-sop/",
        features: ["Machine calibration guides", "Quality control checklists", "Maintenance schedules"]
    },
    {
        name: "Cutting Area",
        icon: "✂️",
        description: "Safe operation of cutters, punches, and finishing tools.",
        badge: "Processing",
        link: "https://akshay863.github.io/cutting-area-sop/",
        features: ["Safety protocols", "Tool operation guides", "Finishing techniques"]
    },
    {
        name: "Crafting Area",
        icon: "🎨",
        description: "Assembly guides, pasting techniques, and final quality control.",
        badge: "Assembly",
        // UPDATED LINK
        link: "https://akshay863.github.io/crafting-area-sop/",
        features: ["Assembly procedures", "Pasting techniques", "Final QC standards"]
    },
    /*
    // COMMENTED TEMPLATE 1
    {
        name: "Packaging Area",
        icon: "📦",
        description: "Final product packaging, labeling protocols, and dispatch readiness.",
        badge: "Packaging",
        link: "#",
        features: ["Box assembly", "Label alignment", "Dispatch checklist"]
    },
    // COMMENTED TEMPLATE 2
    {
        name: "Quality Control Hub",
        icon: "🔍",
        description: "Centralized QC station for random sampling and final product verification.",
        badge: "Quality",
        link: "#",
        features: ["Defect identification", "Reporting standards", "Sample testing"]
    },
    // COMMENTED TEMPLATE 3
    {
        name: "Raw Material Store",
        icon: "🧱",
        description: "Inventory management, stock receiving, and material issuance procedures.",
        badge: "Logistics",
        link: "#",
        features: ["Stock entry logs", "Material handling", "Storage guidelines"]
    },
    // COMMENTED TEMPLATE 4
    {
        name: "Design Studio",
        icon: "✏️",
        description: "Pre-press design checks, file preparation, and client approval workflows.",
        badge: "Design",
        link: "#",
        features: ["File formats", "Color proofing", "Design archival"]
    },
    // COMMENTED TEMPLATE 5
    {
        name: "Maintenance Bay",
        icon: "🔧",
        description: "Routine machine servicing logs, tool tracking, and repair requests.",
        badge: "Maintenance",
        link: "#",
        features: ["Service logs", "Tool inventory", "Safety inspections"]
    }
    */
];

// Storage helpers
function getVideos() {
    const stored = localStorage.getItem('plantables_videos');
    return stored ? JSON.parse(stored) : defaultVideos;
}

function saveVideos(videos) {
    localStorage.setItem('plantables_videos', JSON.stringify(videos));
}

function getAreas() {
    const stored = localStorage.getItem('plantables_areas');
    return stored ? JSON.parse(stored) : defaultAreas;
}

function saveAreas(areas) {
    localStorage.setItem('plantables_areas', JSON.stringify(areas));
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize data
    renderVideos();
    renderAreas();
    
    // Initialize all functionality
    initAdminPanel();
    initVideoPlayer();
    initSearch();
    initNavigation();
    initKeyboardShortcuts();
    initAnimations();
    
    console.log('Plantables SOP Dashboard with Admin Panel loaded!');
});

// ============================================
// ADMIN PANEL
// ============================================
function initAdminPanel() {
    const adminToggle = document.getElementById('adminToggle');
    const closeAdmin = document.getElementById('closeAdmin');
    const adminPanel = document.getElementById('adminPanel');
    const adminOverlay = document.getElementById('adminOverlay');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Toggle admin panel
    adminToggle.addEventListener('click', () => {
        adminPanel.classList.add('active');
        adminOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close admin panel
    function closePanel() {
        adminPanel.classList.remove('active');
        adminOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeAdmin.addEventListener('click', closePanel);
    adminOverlay.addEventListener('click', closePanel);
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName + 'Tab').classList.add('active');
        });
    });
    
    // Initialize forms
    initVideoForm();
    // initAreaForm(); // DISABLED: HTML form is currently hidden
}

// ============================================
// VIDEO FORM
// ============================================
function initVideoForm() {
    const form = document.getElementById('addVideoForm');
    const categorySelect = document.getElementById('videoCategory');
    const customCategoryGroup = document.getElementById('customCategoryGroup');
    const resetBtn = document.getElementById('resetVideoForm');
    
    // Show/hide custom category
    categorySelect.addEventListener('change', () => {
        customCategoryGroup.style.display = 
            categorySelect.value === 'Custom' ? 'block' : 'none';
    });
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('videoTitle').value.trim();
        const link = document.getElementById('videoLink').value.trim();
        let category = document.getElementById('videoCategory').value;
        
        if (category === 'Custom') {
            category = document.getElementById('customCategory').value.trim();
            if (!category) {
                showToast('Please enter a custom category name', 'error');
                return;
            }
        }
        
        // Validate Google Drive link
        if (!link.includes('drive.google.com')) {
            showToast('Please enter a valid Google Drive link', 'error');
            return;
        }
        
        // Add video
        const videos = getVideos();
        videos.push({ title, link, category });
        saveVideos(videos);
        
        // Update UI
        renderVideos();
        form.reset();
        customCategoryGroup.style.display = 'none';
        
        showToast('Video added successfully!');
    });
    
    // Reset form
    resetBtn.addEventListener('click', () => {
        form.reset();
        customCategoryGroup.style.display = 'none';
    });
}

// ============================================
// AREA FORM
// ============================================
function initAreaForm() {
    const form = document.getElementById('addAreaForm');
    const badgeSelect = document.getElementById('areaBadge');
    const customBadgeGroup = document.getElementById('customBadgeGroup');
    const featureInputs = document.getElementById('featureInputs');
    const resetBtn = document.getElementById('resetAreaForm');
    
    // Show/hide custom badge
    badgeSelect.addEventListener('change', () => {
        customBadgeGroup.style.display = 
            badgeSelect.value === 'Custom' ? 'block' : 'none';
    });
    
    // Add feature input
    featureInputs.addEventListener('click', (e) => {
        if (e.target.closest('.add-feature')) {
            const newGroup = document.createElement('div');
            newGroup.className = 'feature-input-group';
            newGroup.innerHTML = `
                <input type="text" class="feature-input" placeholder="Feature ${featureInputs.children.length + 1}">
                <button type="button" class="btn-icon remove-feature" aria-label="Remove feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            `;
            featureInputs.appendChild(newGroup);
        } else if (e.target.closest('.remove-feature')) {
            e.target.closest('.feature-input-group').remove();
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('areaName').value.trim();
        const icon = document.getElementById('areaIcon').value.trim();
        const description = document.getElementById('areaDescription').value.trim();
        let badge = document.getElementById('areaBadge').value;
        const link = document.getElementById('sopLink').value.trim();
        
        if (badge === 'Custom') {
            badge = document.getElementById('customBadge').value.trim();
            if (!badge) {
                showToast('Please enter a custom badge text', 'error');
                return;
            }
        }
        
        // Validate link
        if (!link.includes('docs.google.com')) {
            showToast('Please enter a valid Google Sheets link', 'error');
            return;
        }
        
        // Collect features
        const features = [];
        document.querySelectorAll('.feature-input').forEach(input => {
            if (input.value.trim()) {
                features.push(input.value.trim());
            }
        });
        
        // Add area
        const areas = getAreas();
        areas.push({ name, icon, description, badge, link, features });
        saveAreas(areas);
        
        // Update UI
        renderAreas();
        form.reset();
        customBadgeGroup.style.display = 'none';
        
        // Reset feature inputs
        featureInputs.innerHTML = `
            <div class="feature-input-group">
                <input type="text" class="feature-input" placeholder="Feature 1">
                <button type="button" class="btn-icon add-feature" aria-label="Add feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                </button>
            </div>
        `;
        
        showToast('Production area added successfully!');
    });
    
    // Reset form
    resetBtn.addEventListener('click', () => {
        form.reset();
        customBadgeGroup.style.display = 'none';
        featureInputs.innerHTML = `
            <div class="feature-input-group">
                <input type="text" class="feature-input" placeholder="Feature 1">
                <button type="button" class="btn-icon add-feature" aria-label="Add feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                </button>
            </div>
        `;
    });
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderVideos() {
    const videos = getVideos();
    const videoList = document.getElementById('videoList');
    const videoCount = document.getElementById('videoCount');
    
    videoList.innerHTML = '';
    
    videos.forEach((video, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" data-link="${video.link}" data-category="${video.category}">
                <div class="video-item">
                    <div class="video-thumbnail">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <div class="video-info">
                        <h4>${video.title}</h4>
                        <span class="category-tag">${video.category}</span>
                    </div>
                </div>
            </a>
            <button class="delete-video-btn" data-index="${index}" aria-label="Delete video">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        `;
        videoList.appendChild(li);
    });
    
    videoCount.textContent = `${videos.length} video${videos.length !== 1 ? 's' : ''}`;
    
    // Attach delete handlers
    document.querySelectorAll('.delete-video-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index);
            if (confirm('Are you sure you want to delete this video?')) {
                const videos = getVideos();
                videos.splice(index, 1);
                saveVideos(videos);
                renderVideos();
                showToast('Video deleted successfully!');
            }
        });
    });
    
    // Re-initialize video player
    initVideoPlayer();
}

function renderAreas() {
    const areas = getAreas();
    const grid = document.getElementById('dashboardGrid');
    
    grid.innerHTML = '';
    
    areas.forEach((area, index) => {
        const card = document.createElement('div');
        card.className = 'sop-card';
        card.dataset.area = area.name.toLowerCase().replace(/\s+/g, '-');
        
        const featuresHTML = area.features && area.features.length > 0 
            ? `<ul class="feature-list">
                ${area.features.map(f => `<li>${f}</li>`).join('')}
               </ul>`
            : '';
        
        card.innerHTML = `
            <div class="card-header">
                <div class="icon-container">
                    <div class="icon-bg">
                        <span class="icon">${area.icon}</span>
                    </div>
                    <div class="icon-glow"></div>
                </div>
                <span class="area-badge">${area.badge}</span>
            </div>
            <div class="card-content">
                <h3>${area.name}</h3>
                <p>${area.description}</p>
                ${featuresHTML}
            </div>
            <a href="${area.link}" target="_blank" class="btn btn-primary">
                <span>Open SOP Sheet</span>
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
            <button class="delete-card-btn" data-index="${index}" aria-label="Delete area">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
            </button>
        `;
        
        grid.appendChild(card);
    });
    
    // Attach delete handlers
    document.querySelectorAll('.delete-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index);
            if (confirm('Are you sure you want to delete this production area?')) {
                const areas = getAreas();
                areas.splice(index, 1);
                saveAreas(areas);
                renderAreas();
                showToast('Production area deleted successfully!');
            }
        });
    });
}

// ============================================
// VIDEO PLAYER (from previous version)
// ============================================
let currentVideoIndex = -1;
let visibleVideos = [];

function initVideoPlayer() {
    const videoLinks = document.querySelectorAll('.video-list a');
    visibleVideos = Array.from(videoLinks);
    
    videoLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            loadVideo(link, index);
        });
    });
}

function loadVideo(link, index) {
    const iframe = document.getElementById('mainPlayer');
    const placeholder = document.getElementById('placeholder-msg');
    const currentTitle = document.getElementById('currentVideoTitle');
    
    document.querySelectorAll('.video-list a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    currentVideoIndex = visibleVideos.indexOf(link);
    
    const rawUrl = link.getAttribute('data-link');
    const videoName = link.querySelector('h4').textContent;
    
    const fileIdMatch = rawUrl.match(/\/d\/(.+?)\//);
    
    if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        
        iframe.style.opacity = '0';
        
        setTimeout(() => {
            iframe.src = embedUrl;
            placeholder.style.display = 'none';
            currentTitle.textContent = videoName;
            
            setTimeout(() => {
                iframe.style.opacity = '1';
            }, 100);
        }, 200);
        
        updateNavigationButtons();
        
        if (window.innerWidth < 1024) {
            iframe.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
    } else {
        showToast('Error loading video. Please check the link.', 'error');
    }
}

// ============================================
// SEARCH
// ============================================
function initSearch() {
    const searchInput = document.getElementById('videoSearch');
    const videoListItems = document.querySelectorAll('.video-list li');
    const noResults = document.getElementById('noResults');
    const videoCount = document.getElementById('videoCount');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        visibleVideos = [];
        
        videoListItems.forEach((item) => {
            const link = item.querySelector('a');
            const title = item.querySelector('h4').textContent.toLowerCase();
            const category = item.querySelector('.category-tag').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'block';
                visibleVideos.push(link);
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        videoCount.textContent = `${visibleCount} video${visibleCount !== 1 ? 's' : ''}`;
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
    });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const prevButton = document.getElementById('prevVideo');
    const nextButton = document.getElementById('nextVideo');
    
    prevButton.addEventListener('click', function() {
        if (currentVideoIndex > 0) {
            const prevLink = visibleVideos[currentVideoIndex - 1];
            loadVideo(prevLink, currentVideoIndex - 1);
            scrollToVideo(prevLink);
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentVideoIndex < visibleVideos.length - 1) {
            const nextLink = visibleVideos[currentVideoIndex + 1];
            loadVideo(nextLink, currentVideoIndex + 1);
            scrollToVideo(nextLink);
        }
    });
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prevVideo');
    const nextButton = document.getElementById('nextVideo');
    
    prevButton.disabled = currentVideoIndex <= 0;
    nextButton.disabled = currentVideoIndex >= visibleVideos.length - 1;
}

function scrollToVideo(link) {
    const videoList = document.getElementById('videoList');
    const linkElement = link.closest('li');
    
    if (linkElement) {
        const listRect = videoList.getBoundingClientRect();
        const linkRect = linkElement.getBoundingClientRect();
        const scrollTop = videoList.scrollTop;
        const targetScroll = scrollTop + (linkRect.top - listRect.top) - (listRect.height / 2) + (linkRect.height / 2);
        
        videoList.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
    const searchInput = document.getElementById('videoSearch');
    
    document.addEventListener('keydown', function(e) {
        if (document.activeElement === searchInput) return;
        
        const prevButton = document.getElementById('prevVideo');
        const nextButton = document.getElementById('nextVideo');
        
        switch(e.key) {
            case 'ArrowLeft':
                if (!prevButton.disabled) prevButton.click();
                break;
            case 'ArrowRight':
                if (!nextButton.disabled) nextButton.click();
                break;
            case '/':
                e.preventDefault();
                searchInput.focus();
                break;
        }
    });
}

// ============================================
// ANIMATIONS
// ============================================
function initAnimations() {
    const iframe = document.getElementById('mainPlayer');
    iframe.style.transition = 'opacity 0.3s ease';
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.sop-card').forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            ${type === 'success' 
                ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
            }
        </svg>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

console.log('Admin features loaded. Use the Admin button to manage content!');
