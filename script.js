document.addEventListener('DOMContentLoaded', function() {
    
    // --- Elements ---
    const searchInput = document.getElementById('videoSearch');
    const videoListItems = document.querySelectorAll('.video-list li');
    const videoLinks = document.querySelectorAll('.video-list a');
    const iframe = document.getElementById('mainPlayer');
    const placeholder = document.getElementById('placeholder-msg');
    const currentTitle = document.getElementById('currentVideoTitle');
    const noResults = document.getElementById('noResults');

    // --- Search Functionality ---
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        let visibleCount = 0;

        videoListItems.forEach(item => {
            const title = item.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/Hide "No Results" message
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    });

    // --- Video Player Logic ---
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the browser from opening a new tab

            // 1. Remove active class from all items
            videoLinks.forEach(l => l.classList.remove('active'));
            // 2. Add active class to clicked item
            this.classList.add('active');

            // 3. Get the original Google Drive URL
            const rawUrl = this.getAttribute('data-link');
            const videoName = this.textContent;

            // 4. Convert Google Drive 'View' Link to 'Preview' Link for Embedding
            // Regex extracts the ID between /d/ and /view
            const fileIdMatch = rawUrl.match(/\/d\/(.+?)\//);
            
            if (fileIdMatch && fileIdMatch[1]) {
                const fileId = fileIdMatch[1];
                const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

                // 5. Update Player
                iframe.src = embedUrl;
                placeholder.style.display = 'none'; // Hide the "Select a video" text
                currentTitle.textContent = videoName;
                
                // Scroll to player on mobile
                if(window.innerWidth < 900) {
                    iframe.scrollIntoView({behavior: "smooth"});
                }
            } else {
                console.error("Could not extract Google Drive ID");
                alert("Error loading video. The link might be broken.");
            }
        });
    });

});