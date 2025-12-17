// Tab functionality
const tabs = document.querySelectorAll('.tabs-container .tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all tab contents
        tabContents.forEach(content => content.classList.remove('active'));

        // Show selected tab content
        const selectedContent = document.getElementById(tabName);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
    });
});

// Content filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const posts = document.querySelectorAll('.feed-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Remove active class from all filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Filter posts
        posts.forEach(post => {
            const postType = post.getAttribute('data-type');

            if (filter === 'all' || postType === filter) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
});

// Follow button functionality
const followArtistBtn = document.querySelector('.follow-artist-btn');

if (followArtistBtn) {
    followArtistBtn.addEventListener('click', () => {
        if (followArtistBtn.classList.contains('following')) {
            followArtistBtn.classList.remove('following');
            followArtistBtn.textContent = 'Follow';
        } else {
            followArtistBtn.classList.add('following');
            followArtistBtn.textContent = 'Following';
        }
    });
}

// Small follow buttons
const followSmallBtns = document.querySelectorAll('.follow-small-btn');

followSmallBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (btn.textContent === 'Follow') {
            btn.textContent = 'Following';
            btn.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)';
            btn.style.color = 'white';
            btn.style.borderColor = 'transparent';
        } else {
            btn.textContent = 'Follow';
            btn.style.background = 'transparent';
            btn.style.color = 'var(--primary-light)';
            btn.style.borderColor = 'var(--primary)';
        }
    });
});

// Play button functionality (mock)
const playBtns = document.querySelectorAll('.play-btn');

playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('svg');
        const isPlaying = btn.classList.contains('playing');

        if (isPlaying) {
            btn.classList.remove('playing');
            icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
        } else {
            // Stop any other playing tracks
            playBtns.forEach(b => {
                b.classList.remove('playing');
                b.querySelector('svg').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
            });

            btn.classList.add('playing');
            icon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
        }
    });
});

// Video play overlay
const videoOverlays = document.querySelectorAll('.video-play-overlay');

videoOverlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        alert('Video player would open here');
    });
});

// Action buttons (like, comment, repost, share)
const actionBtns = document.querySelectorAll('.action-btn');

actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const svg = btn.querySelector('svg');
        const span = btn.querySelector('span');

        // Toggle liked state for heart button
        if (svg && svg.querySelector('path[d*="M20.84 4.61"]')) {
            if (btn.classList.contains('liked')) {
                btn.classList.remove('liked');
                svg.style.fill = 'none';
                svg.style.stroke = 'var(--text-secondary)';
                if (span) {
                    const count = parseFloat(span.textContent.replace('K', '')) - 0.1;
                    span.textContent = count.toFixed(1) + 'K';
                }
            } else {
                btn.classList.add('liked');
                svg.style.fill = '#ef4444';
                svg.style.stroke = '#ef4444';
                if (span) {
                    const count = parseFloat(span.textContent.replace('K', '')) + 0.1;
                    span.textContent = count.toFixed(1) + 'K';
                }
            }
        }
    });
});

// Merch buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('merch-btn')) {
        alert('Opening product details...');
    }
});

// Event buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('event-btn')) {
        const buttonText = e.target.textContent;
        if (buttonText === 'Join Stream') {
            alert('Joining live stream...');
        } else if (buttonText === 'Get Tickets') {
            alert('Opening ticket purchase page...');
        } else if (buttonText === 'Set Reminder') {
            e.target.textContent = 'Reminder Set ✓';
            e.target.style.background = 'var(--primary-light)';
        }
    }
});

// Photo grid click
const photoGridImages = document.querySelectorAll('.photo-grid img');

photoGridImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        alert(`Opening photo ${index + 1} in lightbox...`);
    });
});

// Social links tracking (for future analytics)
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = link.classList[1]; // website, spotify, instagram, youtube
        console.log(`Social link clicked: ${platform}`);
        // In production, this would send analytics data
    });
});

// Render Similar Artists from data
function renderSimilarArtists() {
    const container = document.getElementById('similar-artists-container');
    if (!container || typeof LaunchpadDB === 'undefined') return;

    // Get artists (excluding the current artist - artist_001)
    const similarArtistIds = ['artist_002', 'artist_003', 'artist_004', 'artist_005', 'artist_006'];

    let html = '';
    similarArtistIds.forEach(artistId => {
        const artist = LaunchpadDB.artists[artistId];
        if (!artist) return;

        html += `
            <div class="similar-artist" data-href="${artist.profileUrl}">
                <img src="${artist.avatar}" alt="${artist.name}" class="similar-avatar">
                <div class="similar-info">
                    <h4>${artist.name}</h4>
                    <p>${artist.stats.supporters} supporters</p>
                </div>
                <a href="membership.html?artist=${artist.id}" class="support-small-btn">Support</a>
            </div>
        `;
    });

    container.innerHTML = html;

    // Add click handlers for similar artist cards
    container.querySelectorAll('.similar-artist[data-href]').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                window.location.href = card.dataset.href;
            }
        });
        card.style.cursor = 'pointer';
    });
}

// Tier join button handlers
function handleTierJoin(artistId, tier) {
    // For now, navigate to membership page
    // This can be replaced with custom logic (modal, payment flow, etc.)
    window.location.href = `membership.html?artist=${artistId}&tier=${tier}`;
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tier-join-btn')) {
        const artistId = e.target.dataset.artist;
        const tier = e.target.dataset.tier;
        handleTierJoin(artistId, tier);
    }
});

// Render Artist Badges from data
function renderArtistBadges() {
    const container = document.getElementById('artist-badges-container');
    if (!container || typeof LaunchpadDB === 'undefined') return;

    const artist = LaunchpadDB.artists['artist_001'];
    if (!artist || !artist.badges) return;

    const definitions = LaunchpadDB.artistBadgeDefinitions;
    if (!definitions) return;

    let html = '';
    Object.keys(artist.badges).forEach(badgeKey => {
        const badge = artist.badges[badgeKey];
        const definition = definitions[badgeKey];
        if (!definition || !badge.earned) return;

        html += `
            <span class="artist-badge" title="${definition.description}">
                <span class="artist-badge-emoji">${definition.emoji}</span>
                <span class="artist-badge-name">${definition.name}</span>
            </span>
        `;
    });

    container.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderSimilarArtists();
    renderArtistBadges();
});
