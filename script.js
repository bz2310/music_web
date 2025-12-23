// Launchpad UI Renderer
// Renders all UI components from the database

const LaunchpadUI = {
    // SVG Icons for reuse
    icons: {
        heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>`,
        comment: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>`,
        repost: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 1l4 4-4 4"></path>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <path d="M7 23l-4-4 4-4"></path>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
        </svg>`,
        share: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>`,
        play: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>`,
        arrowUp: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14l5-5 5 5z"/>
        </svg>`
    },

    // Initialize the app
    init() {
        this.renderAll();
        this.setupNavigation();
        this.setupTabs();
        this.setupInteractions();
    },

    // Render all sections
    renderAll() {
        this.renderHomeFeatured();
        this.renderQuickDiscover();
        this.renderFeedPosts();
        this.renderEvents();
        this.renderExploreFeatured();
        this.renderGenres();
        this.renderRisingStars();
        this.renderSuggestedArtists();
        this.renderTrendingTags();
        this.renderNotifications();
        this.renderChatList();
        this.renderChatWindow();
        this.renderCommunities();
        this.renderProfile();
        this.renderLeaderboard();
    },

    // Render Featured Artist section on home page (above feed)
    renderHomeFeatured() {
        const container = document.getElementById('featured-artist-container');
        if (!container) return;

        const artist = LaunchpadDB.getFeaturedArtist();
        if (!artist) return;

        const user = LaunchpadDB.currentUser;
        const relationship = user.supportRelationships && user.supportRelationships[artist.id];
        const isSupporting = relationship && relationship.isSupporter;

        container.innerHTML = `
            <div class="home-featured-header">
                <h3>Your Favorite Artist</h3>
                <a href="#" class="see-all-link" data-section="explore">Explore More</a>
            </div>
            <div class="featured-artist-card home-featured-card" data-href="${artist.profileUrl}">
                <div class="featured-artist-banner" style="background: ${artist.bannerGradient};">
                    <img src="${artist.avatar}" alt="${artist.name}" class="featured-artist-avatar">
                </div>
                <div class="featured-artist-info">
                    <h3>${artist.name} ${artist.verified ? '<span class="verified-small">✓</span>' : ''}</h3>
                    <p class="featured-artist-bio">${artist.bio}</p>
                    <div class="featured-artist-stats">
                        <span><strong>${artist.stats.supporters}</strong> supporters</span>
                    </div>
                    <div class="momentum-wheel momentum-wheel-sm">
                        <div class="momentum-circle">
                            <svg viewBox="0 0 36 36">
                                <path class="momentum-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                <path class="momentum-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke-dasharray="68, 100"/>
                            </svg>
                            <div class="momentum-value">68%</div>
                        </div>
                        <div class="momentum-info">
                            <span class="momentum-label">Momentum</span>
                            <span class="momentum-target">toward <strong>15K</strong></span>
                        </div>
                    </div>
                    ${this.renderSupporterRelationship(artist.id)}
                    <a href="membership.html?artist=${artist.id}" class="support-btn-small ${isSupporting ? 'supporting-btn' : ''}">${isSupporting ? 'Supporting' : 'Support'}</a>
                </div>
            </div>
        `;
    },

    // Render supporter relationship signal (single, most relevant one)
    renderSupporterRelationship(artistId) {
        const user = LaunchpadDB.currentUser;
        const relationship = user.supportRelationships && user.supportRelationships[artistId];
        if (!relationship || !relationship.isSupporter) return '';

        // Pick the most relevant signal (priority: early supporter > releases > milestones)
        let signal = '';
        if (relationship.isEarlySupporter) {
            signal = `Early supporter since ${relationship.supporterSince}`;
        } else if (relationship.releasesSupported > 0) {
            signal = `Supported ${relationship.releasesSupported} release${relationship.releasesSupported > 1 ? 's' : ''}`;
        } else if (relationship.milestonesUnlocked > 0) {
            signal = `Unlocked ${relationship.milestonesUnlocked} milestone${relationship.milestonesUnlocked > 1 ? 's' : ''} together`;
        }

        if (!signal) return '';

        return `<span class="relationship-signal">✨ ${signal}</span>`;
    },

    // Render user badges for profile
    renderUserBadges(userBadges) {
        if (!userBadges || !LaunchpadDB.badgeDefinitions) return '';

        const definitions = LaunchpadDB.badgeDefinitions;
        let html = '';

        Object.keys(userBadges).forEach(badgeKey => {
            const badge = userBadges[badgeKey];
            const definition = definitions[badgeKey];
            if (!definition) return;

            const isEarned = badge.earned;
            const badgeClass = isEarned ? 'badge-earned' : 'badge-locked';

            html += `
                <div class="badge-item ${badgeClass}" title="${definition.description}">
                    <span class="badge-icon" style="--badge-color: ${definition.color}">${definition.icon}</span>
                    <div class="badge-info">
                        <span class="badge-name">${definition.name}</span>
                        ${isEarned ? `<span class="badge-date">Earned ${badge.earnedDate}</span>` : '<span class="badge-locked-text">Locked</span>'}
                    </div>
                </div>
            `;
        });

        return html;
    },

    // Render Quick Discover section
    renderQuickDiscover() {
        const container = document.getElementById('quick-discover-container');
        if (!container) return;

        const artists = LaunchpadDB.getQuickDiscoverArtists();

        let html = `
            <div class="quick-discover-header">
                <h3>Discover Artists</h3>
                <a href="#" class="see-all-link" data-section="explore">See All</a>
            </div>
            <div class="quick-discover-artists">
        `;

        artists.forEach(artist => {
            html += `
                <a href="${artist.profileUrl}" class="quick-artist-card">
                    <img src="${artist.avatar}" alt="${artist.name}" class="quick-artist-avatar">
                    <span class="quick-artist-name">${artist.name}</span>
                    <span class="quick-artist-badge">💜 ${artist.stats.supporters} supporters</span>
                </a>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    },

    // Render Feed Posts
    renderFeedPosts() {
        const container = document.getElementById('feed-posts-container');
        if (!container) return;

        const posts = LaunchpadDB.getFeedPosts();
        let html = '';

        posts.forEach(post => {
            const artist = LaunchpadDB.getArtist(post.artistId);
            if (!artist) return;

            const isFavorite = LaunchpadDB.currentUser.favoriteArtist === artist.id;
            const profileLink = artist.profileUrl;

            html += `
                <${isFavorite ? 'a href="' + profileLink + '" class="feed-item-link"' : 'div class="feed-item-wrapper"'}>
                    <div class="feed-item" data-type="${post.type}">
                        <div class="post-header">
                            <img src="${artist.avatar}" alt="${artist.name}" class="avatar-small">
                            <div class="post-info">
                                <h3>${artist.name} ${artist.verified ? '<span class="verified-small">✓</span>' : ''}</h3>
                                <span class="handle">${artist.handle}</span>
                                <span class="timestamp">${post.timestamp}</span>
                            </div>
                            <span class="post-type-badge ${post.type === 'merch' ? 'merch-drop' : post.type}">${this.getPostTypeLabel(post.type)}</span>
                            <button class="menu-btn">•••</button>
                        </div>
                        <p class="post-content">${post.content}</p>
                        ${this.renderPostMedia(post)}
                        <div class="post-actions">
                            <button class="action-btn">${this.icons.heart}<span>${post.stats.likes}</span></button>
                            <button class="action-btn">${this.icons.comment}<span>${post.stats.comments}</span></button>
                            <button class="action-btn">${this.icons.repost}<span>${post.stats.reposts}</span></button>
                            <button class="action-btn">${this.icons.share}</button>
                        </div>
                    </div>
                </${isFavorite ? 'a' : 'div'}>
            `;
        });

        container.innerHTML = html;
    },

    // Get post type label
    getPostTypeLabel(type) {
        const labels = {
            'music': 'Music',
            'post': 'Post',
            'merch': 'Merch Drop',
            'video': 'Video'
        };
        return labels[type] || 'Post';
    },

    // Render post media (music player or merch preview)
    renderPostMedia(post) {
        if (post.type === 'music' && post.music) {
            return `
                <div class="music-player">
                    <img src="https://api.dicebear.com/7.x/shapes/svg?seed=${post.music.artSeed}" alt="Album art" class="track-art">
                    <div class="track-info">
                        <h4>${post.music.title}</h4>
                        <p>${post.music.subtitle}</p>
                        <div class="waveform">
                            ${Array(10).fill('<div class="waveform-bar"></div>').join('')}
                        </div>
                    </div>
                    <button class="play-btn">${this.icons.play}</button>
                </div>
            `;
        } else if (post.type === 'merch' && post.merch) {
            let merchHtml = '<div class="merch-preview">';
            post.merch.forEach(item => {
                merchHtml += `
                    <div class="merch-preview-item">
                        <div class="merch-image" style="background: ${item.gradient};"></div>
                        <h4>${item.name}</h4>
                        <p class="merch-price">${item.price}</p>
                    </div>
                `;
            });
            merchHtml += '</div>';
            return merchHtml;
        }
        return '';
    },

    // Render Events
    renderEvents() {
        const container = document.getElementById('events-container');
        if (!container) return;

        const events = LaunchpadDB.events;
        let html = '';

        events.forEach(event => {
            const artist = LaunchpadDB.getArtist(event.artistId);
            const artistName = artist ? artist.name : 'Various Artists';

            html += `
                <div class="event-card">
                    <div class="event-image" style="background: ${event.gradient};"></div>
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p class="event-artist">${artistName}</p>
                        <p class="event-date">${event.date}</p>
                        <button class="event-btn">Get Tickets</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // Render Explore Featured Artist
    renderExploreFeatured() {
        const container = document.getElementById('explore-featured-container');
        if (!container) return;

        const artist = LaunchpadDB.getFeaturedArtist();
        if (!artist) return;

        const user = LaunchpadDB.currentUser;
        const relationship = user.supportRelationships && user.supportRelationships[artist.id];
        const isSupporting = relationship && relationship.isSupporter;

        container.innerHTML = `
            <div class="featured-artist-card home-featured-card" data-href="${artist.profileUrl}">
                <div class="featured-artist-banner" style="background: ${artist.bannerGradient};">
                    <img src="${artist.avatar}" alt="${artist.name}" class="featured-artist-avatar">
                </div>
                <div class="featured-artist-info">
                    <h3>${artist.name} ${artist.verified ? '<span class="verified-small">✓</span>' : ''}</h3>
                    <p class="featured-artist-bio">${artist.bio}</p>
                    <div class="featured-artist-stats">
                        <span><strong>${artist.stats.supporters}</strong> supporters</span>
                    </div>
                    <div class="momentum-wheel momentum-wheel-sm">
                        <div class="momentum-circle">
                            <svg viewBox="0 0 36 36">
                                <path class="momentum-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                <path class="momentum-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke-dasharray="68, 100"/>
                            </svg>
                            <div class="momentum-value">68%</div>
                        </div>
                        <div class="momentum-info">
                            <span class="momentum-label">Momentum</span>
                            <span class="momentum-target">toward <strong>15K</strong></span>
                        </div>
                    </div>
                    ${this.renderSupporterRelationship(artist.id)}
                    <a href="membership.html?artist=${artist.id}" class="support-btn-small ${isSupporting ? 'supporting-btn' : ''}">${isSupporting ? 'Supporting' : 'Support'}</a>
                </div>
            </div>
        `;
    },

    // Render Genres
    renderGenres() {
        const container = document.getElementById('genre-grid-container');
        if (!container) return;

        let html = '';
        LaunchpadDB.genres.forEach(genre => {
            html += `
                <div class="genre-card" style="background: ${genre.gradient};">
                    <span class="genre-icon">${genre.icon}</span>
                    <h4>${genre.name}</h4>
                    <p>${genre.count} artists</p>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // Render Rising Stars
    renderRisingStars() {
        const container = document.getElementById('rising-stars-container');
        if (!container) return;

        const artists = LaunchpadDB.getRisingStars();
        let html = '';

        artists.forEach(artist => {
            const risingContext = artist.risingReason ? `<span class="rising-context">📣 ${artist.risingReason}</span>` : '';
            html += `
                <div class="artist-discover-card">
                    <img src="${artist.avatar}" alt="${artist.name}" class="artist-card-avatar">
                    <h4>${artist.name}</h4>
                    <p class="artist-card-genre">${artist.genres.join(' / ')}</p>
                    <p class="artist-card-supporters">💜 ${artist.stats.supporters} supporters</p>
                    ${risingContext}
                    <a href="membership.html?artist=${artist.id}" class="support-btn-small">Support</a>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // Render Suggested Artists
    renderSuggestedArtists() {
        const container = document.getElementById('suggested-artists-container');
        if (!container) return;

        const artists = LaunchpadDB.getSuggestedArtists();
        let html = '';

        artists.forEach(artist => {
            html += `
                <div class="suggested-artist-item">
                    <img src="${artist.avatar}" alt="${artist.name}" class="suggested-artist-avatar">
                    <div class="suggested-artist-info">
                        <h4>${artist.name}</h4>
                        <p>Similar to ${artist.similarTo} • ${artist.stats.supporters} supporters</p>
                    </div>
                    <a href="membership.html?artist=${artist.id}" class="support-btn-small">Support</a>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // Render Trending Tags
    renderTrendingTags() {
        const container = document.getElementById('trending-tags-container');
        if (!container) return;

        let html = '';
        LaunchpadDB.trendingTags.forEach(tag => {
            html += `<a href="#" class="trending-tag">${tag.tag} <span>${tag.count}</span></a>`;
        });

        container.innerHTML = html;
    },

    // Render Notifications
    renderNotifications() {
        const container = document.getElementById('notifications-container');
        if (!container) return;

        const notifications = LaunchpadDB.notifications;
        let html = '';

        notifications.forEach(notif => {
            const artist = LaunchpadDB.getArtist(notif.fromArtistId);
            if (!artist) return;

            html += `
                <div class="notification-item">
                    <img src="${artist.avatar}" alt="${artist.name}" class="avatar-small">
                    <div class="notification-content">
                        <p><strong>${artist.name}</strong> ${notif.message}</p>
                        <span class="notification-time">${notif.timestamp}</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // Render Chat List
    renderChatList() {
        const container = document.getElementById('chat-list-container');
        if (!container) return;

        const chats = LaunchpadDB.chats;
        let html = '';

        chats.forEach((chat, index) => {
            const artist = LaunchpadDB.getArtist(chat.withArtistId);
            if (!artist) return;

            html += `
                <div class="chat-item ${index === 0 ? 'active' : ''}" data-chat-id="${chat.id}">
                    <img src="${artist.avatar}" alt="${artist.name}" class="avatar-small">
                    <div class="chat-info">
                        <h4>${artist.name}</h4>
                        <p>${chat.lastMessage}</p>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // Render Chat Window
    renderChatWindow() {
        const container = document.getElementById('chat-window-container');
        if (!container) return;

        const activeChat = LaunchpadDB.chats[0];
        if (!activeChat) return;

        const artist = LaunchpadDB.getArtist(activeChat.withArtistId);
        if (!artist) return;

        let messagesHtml = '';
        activeChat.messages.forEach(msg => {
            const isOwn = msg.from === 'user';
            messagesHtml += `
                <div class="message ${isOwn ? 'own' : 'other'}">
                    <p>${msg.text}</p>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="chat-header">
                <h3>${artist.name}</h3>
            </div>
            <div class="messages">${messagesHtml}</div>
            <div class="message-input">
                <input type="text" placeholder="Type a message...">
                <button>Send</button>
            </div>
        `;
    },

    // Render Communities
    renderCommunities() {
        const container = document.getElementById('communities-container');
        if (!container) return;

        const communities = LaunchpadDB.communities;
        let html = '';

        communities.forEach(comm => {
            html += `
                <div class="community-card">
                    <div class="community-banner" style="background: ${comm.banner};"></div>
                    <div class="community-content">
                        <h3>${comm.name}</h3>
                        <p>${comm.description}</p>
                        <p class="community-members">${comm.members} members</p>
                        <button class="community-btn">Join</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // Render Profile
    renderProfile() {
        const container = document.getElementById('profile-container');
        if (!container) return;

        const user = LaunchpadDB.currentUser;
        const favoriteArtist = LaunchpadDB.getArtist(user.favoriteArtist);
        const followedArtists = LaunchpadDB.getFollowedArtists();

        // Format listening time
        const hours = Math.floor(user.listeningStats.totalMinutes / 60);
        const formattedListeningTime = hours >= 1000 ? `${(hours/1000).toFixed(1)}K` : hours.toLocaleString();

        container.innerHTML = `
            <div class="profile-header" style="background: linear-gradient(135deg, #8b2bff 0%, #b366ff 100%);">
                <div class="profile-header-overlay"></div>
            </div>
            <div class="profile-content">
                <div class="profile-top">
                    <img src="${user.avatar}" alt="Profile" class="profile-avatar">
                    <button class="edit-profile-btn">Edit Profile</button>
                </div>
                <div class="profile-info">
                    <h2>${user.name}</h2>
                    <p class="profile-handle">${user.handle}</p>
                    <p class="profile-bio">${user.bio}</p>
                    <div class="profile-meta">
                        <span class="profile-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            ${user.location}
                        </span>
                        <span class="profile-joined">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            Joined ${user.joinedDate}
                        </span>
                    </div>
                    <div class="profile-stats">
                        <div class="stat">
                            <span class="stat-number">${user.followers.toLocaleString()}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${user.following.length}</span>
                            <span class="stat-label">Following</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${user.playlists.length}</span>
                            <span class="stat-label">Playlists</span>
                        </div>
                    </div>
                </div>

                <!-- Listening Stats -->
                <div class="profile-section">
                    <h3 class="profile-section-title">Listening Stats</h3>
                    <div class="listening-stats-grid">
                        <div class="listening-stat-card">
                            <span class="listening-stat-value">${formattedListeningTime}h</span>
                            <span class="listening-stat-label">Hours Listened</span>
                        </div>
                        <div class="listening-stat-card">
                            <span class="listening-stat-value">${user.listeningStats.tracksPlayed.toLocaleString()}</span>
                            <span class="listening-stat-label">Tracks Played</span>
                        </div>
                        <div class="listening-stat-card highlight">
                            <span class="listening-stat-value">${user.listeningStats.streakDays}</span>
                            <span class="listening-stat-label">Day Streak</span>
                        </div>
                        <div class="listening-stat-card">
                            <span class="listening-stat-value">${user.listeningStats.topGenre}</span>
                            <span class="listening-stat-label">Top Genre</span>
                        </div>
                    </div>
                </div>

                <!-- Fan Badges -->
                <div class="profile-section">
                    <h3 class="profile-section-title">Fan Badges</h3>
                    <div class="badges-grid">
                        ${this.renderUserBadges(user.badges)}
                    </div>
                </div>

                <!-- Favorite Artist -->
                ${favoriteArtist ? `
                <div class="profile-section">
                    <h3 class="profile-section-title">Favorite Artist</h3>
                    <a href="${favoriteArtist.profileUrl}" class="favorite-artist-card">
                        <img src="${favoriteArtist.avatar}" alt="${favoriteArtist.name}" class="favorite-artist-avatar">
                        <div class="favorite-artist-info">
                            <h4>${favoriteArtist.name} ${favoriteArtist.verified ? '<span class="verified-small">✓</span>' : ''}</h4>
                            <p>${favoriteArtist.stats.supporters} supporters</p>
                            ${this.renderSupporterRelationship(favoriteArtist.id)}
                        </div>
                        <span class="favorite-badge">Top Artist</span>
                    </a>
                </div>
                ` : ''}

                <!-- Playlists -->
                <div class="profile-section">
                    <div class="profile-section-header">
                        <h3 class="profile-section-title">Your Playlists</h3>
                        <button class="create-playlist-btn">+ New Playlist</button>
                    </div>
                    <div class="playlists-grid">
                        ${user.playlists.map(playlist => `
                            <div class="playlist-card">
                                <div class="playlist-cover" style="background: ${playlist.coverGradient};">
                                    ${!playlist.isPublic ? '<span class="playlist-private-badge">Private</span>' : ''}
                                    <button class="playlist-play-btn">${this.icons.play}</button>
                                </div>
                                <div class="playlist-info">
                                    <h4>${playlist.name}</h4>
                                    <p>${playlist.trackCount} tracks • ${playlist.duration}</p>
                                    <span class="playlist-plays">${playlist.plays.toLocaleString()} plays</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Recently Played -->
                <div class="profile-section">
                    <h3 class="profile-section-title">Recently Played</h3>
                    <div class="recently-played-list">
                        ${user.recentlyPlayed.map(track => {
                            const artist = LaunchpadDB.getArtist(track.artistId);
                            return `
                                <div class="recently-played-item">
                                    <div class="recently-played-art" style="background: linear-gradient(135deg, #8b2bff 0%, #b366ff 100%);">
                                        ${this.icons.play}
                                    </div>
                                    <div class="recently-played-info">
                                        <h4>${track.title}</h4>
                                        <p>${artist ? artist.name : 'Unknown Artist'}</p>
                                    </div>
                                    <span class="recently-played-time">${track.playedAt}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Saved Content -->
                <div class="profile-section">
                    <div class="profile-section-header">
                        <h3 class="profile-section-title">Saved</h3>
                        <span class="saved-count">${user.savedContent.length} items</span>
                    </div>
                    <div class="saved-content-list">
                        ${user.savedContent.map(item => {
                            const artist = LaunchpadDB.getArtist(item.artistId);
                            return `
                                <div class="saved-item">
                                    <div class="saved-item-icon ${item.type}">
                                        ${this.getSavedItemIcon(item.type)}
                                    </div>
                                    <div class="saved-item-info">
                                        <h4>${item.title}</h4>
                                        <p>${artist ? artist.name : 'Unknown'} ${item.duration ? `• ${item.duration}` : ''} ${item.trackCount ? `• ${item.trackCount} tracks` : ''}</p>
                                    </div>
                                    <span class="saved-item-type">${item.type}</span>
                                    <button class="saved-item-remove" title="Remove">×</button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Purchases -->
                <div class="profile-section">
                    <div class="profile-section-header">
                        <h3 class="profile-section-title">Your Purchases</h3>
                        <a href="#" class="view-all-purchases">View All</a>
                    </div>
                    <div class="purchases-grid">
                        ${user.purchases.map(purchase => {
                            const artist = LaunchpadDB.getArtist(purchase.artistId);
                            return `
                                <div class="purchase-card ${purchase.type}">
                                    <div class="purchase-cover" style="background: ${purchase.coverGradient};">
                                        <span class="purchase-type-badge">${this.getPurchaseTypeLabel(purchase.type)}</span>
                                        ${purchase.status ? `<span class="purchase-status">${purchase.status}</span>` : ''}
                                    </div>
                                    <div class="purchase-info">
                                        <h4>${purchase.title}</h4>
                                        <p>${artist ? artist.name : 'Unknown Artist'}</p>
                                        <div class="purchase-meta">
                                            <span class="purchase-price">${purchase.price}</span>
                                            <span class="purchase-date">${purchase.purchaseDate}</span>
                                        </div>
                                        ${purchase.eventDate ? `<span class="purchase-event-date">Event: ${purchase.eventDate}</span>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Following Artists -->
                <div class="profile-section">
                    <h3 class="profile-section-title">Artists You Support</h3>
                    <div class="following-artists-grid">
                        ${followedArtists.map(artist => `
                            <a href="${artist.profileUrl}" class="following-artist-card">
                                <img src="${artist.avatar}" alt="${artist.name}" class="following-artist-avatar">
                                <span class="following-artist-name">${artist.name}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="profile-section">
                    <h3 class="profile-section-title">Recent Activity</h3>
                    <div class="activity-list">
                        ${user.recentActivity.map(activity => `
                            <div class="activity-item">
                                <div class="activity-icon ${activity.type}">
                                    ${this.getActivityIcon(activity.type)}
                                </div>
                                <div class="activity-content">
                                    <p>${activity.content}</p>
                                    <span class="activity-time">${activity.timestamp}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    // Get activity icon based on type
    getActivityIcon(type) {
        const icons = {
            'playlist_created': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
            </svg>`,
            'followed': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>`,
            'liked': this.icons.heart,
            'shared': this.icons.share
        };
        return icons[type] || icons['liked'];
    },

    // Get saved item icon based on type
    getSavedItemIcon(type) {
        const icons = {
            'track': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="5.5" cy="17.5" r="2.5"></circle>
                <circle cx="17.5" cy="15.5" r="2.5"></circle>
                <path d="M8 17V5l12-2v12"></path>
            </svg>`,
            'album': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>`,
            'post': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>`
        };
        return icons[type] || icons['track'];
    },

    // Get purchase type label
    getPurchaseTypeLabel(type) {
        const labels = {
            'album': 'Album',
            'merch': 'Merch',
            'ticket': 'Ticket'
        };
        return labels[type] || 'Item';
    },

    // Render Leaderboard
    renderLeaderboard() {
        const followingContainer = document.getElementById('leaderboard-following-container');
        const discoverContainer = document.getElementById('leaderboard-discover-container');

        if (!followingContainer || !discoverContainer) return;

        const leaderboard = LaunchpadDB.getLeaderboard();

        // Render Following (Artists You Support)
        let followingHtml = '';
        leaderboard.followed.forEach((artist) => {
            const isFavorite = LaunchpadDB.currentUser.favoriteArtist === artist.id;
            const risingContext = artist.risingReason ? `<span class="leaderboard-rising-context">${artist.risingReason}</span>` : '';

            followingHtml += `
                <${isFavorite ? 'a href="' + artist.profileUrl + '"' : 'div'} class="leaderboard-item">
                    <span class="leaderboard-rank hot">🔥</span>
                    <img src="${artist.avatar}" alt="${artist.name}" class="leaderboard-avatar">
                    <div class="leaderboard-info">
                        <p class="leaderboard-name">${artist.name} ${artist.verified ? '<span class="verified-small">✓</span>' : ''}</p>
                        ${risingContext}
                    </div>
                    <div class="leaderboard-growth positive">
                        ${this.icons.arrowUp}
                        +${artist.stats.weeklyGrowth}%
                    </div>
                </${isFavorite ? 'a' : 'div'}>
            `;
        });
        followingContainer.innerHTML = followingHtml;

        // Render Discover
        let discoverHtml = '';
        leaderboard.discover.forEach((artist) => {
            const risingContext = artist.risingReason ? `<span class="leaderboard-rising-context">${artist.risingReason}</span>` : '';

            discoverHtml += `
                <div class="leaderboard-item">
                    <span class="leaderboard-rank hot">🔥</span>
                    <img src="${artist.avatar}" alt="${artist.name}" class="leaderboard-avatar">
                    <div class="leaderboard-info">
                        <p class="leaderboard-name">${artist.name}</p>
                        ${risingContext}
                    </div>
                    <div class="leaderboard-stats">
                        <span class="leaderboard-supporters">💜 ${artist.stats.supporters}</span>
                    </div>
                </div>
            `;
        });
        discoverContainer.innerHTML = discoverHtml;
    },

    // Setup Navigation
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-section]');
        const sections = document.querySelectorAll('.section');
        const sectionTitle = document.getElementById('section-title');

        // Handle nav clicks
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.dataset.section;

                // Update active nav
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Show target section
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSection) {
                        section.classList.add('active');
                    }
                });

                // Update title
                if (sectionTitle) {
                    sectionTitle.textContent = this.getSectionTitle(targetSection);
                }

                // Scroll to top
                const content = document.querySelector('.content');
                if (content) content.scrollTop = 0;
            });
        });

        // Handle "See All" and other section links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-section]');
            if (link && !link.classList.contains('nav-item')) {
                e.preventDefault();
                const targetSection = link.dataset.section;

                // Trigger nav click
                const navItem = document.querySelector(`.nav-item[data-section="${targetSection}"]`);
                if (navItem) navItem.click();
            }
        });

        // Handle clickable cards with data-href (excluding clicks on buttons/links inside)
        document.addEventListener('click', (e) => {
            const card = e.target.closest('[data-href]');
            if (card && !e.target.closest('a, button')) {
                window.location.href = card.dataset.href;
            }
        });

        // Check for hash on load
        if (window.location.hash) {
            const section = window.location.hash.substring(1);
            const navItem = document.querySelector(`.nav-item[data-section="${section}"]`);
            if (navItem) navItem.click();
        }
    },

    // Get section title
    getSectionTitle(section) {
        const titles = {
            'home': 'Home',
            'explore': 'Explore',
            'notifications': 'Notifications',
            'chat': 'Messages',
            'communities': 'Communities',
            'profile': 'Profile'
        };
        return titles[section] || 'Home';
    },

    // Setup Tabs
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab[data-tab]');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                const tabContainer = button.closest('.tabs-container');
                const contentParent = tabContainer?.parentElement;

                if (!contentParent) return;

                // Update active tab button
                tabContainer.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
                button.classList.add('active');

                // Show target content
                contentParent.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTab) {
                        content.classList.add('active');
                    }
                });
            });
        });
    },

    // Setup Interactions
    setupInteractions() {
        document.addEventListener('click', (e) => {
            // Handle event buttons
            if (e.target.classList.contains('event-btn')) {
                const buttonText = e.target.textContent;
                alert(`${buttonText} clicked!`);
            }

            // Handle community buttons
            if (e.target.classList.contains('community-btn')) {
                if (e.target.textContent === 'Join') {
                    e.target.textContent = 'Joined';
                    e.target.style.background = 'var(--primary-light)';
                }
            }

            // Handle follow buttons
            if (e.target.classList.contains('follow-btn-small') && !e.target.classList.contains('following-btn')) {
                e.target.textContent = e.target.textContent === 'Follow' ? 'Following' : 'Follow';
            }

            // Handle merch buttons
            if (e.target.classList.contains('merch-btn')) {
                alert('Opening product details...');
            }
        });

        // Message sending
        document.addEventListener('keypress', (e) => {
            if (e.target.closest('.message-input input') && e.key === 'Enter') {
                const input = e.target;
                if (input.value.trim()) {
                    const messagesContainer = input.closest('.message-input').previousElementSibling;
                    const newMessage = document.createElement('div');
                    newMessage.className = 'message own';
                    newMessage.innerHTML = `<p>${input.value}</p>`;
                    messagesContainer.appendChild(newMessage);
                    input.value = '';
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }
        });

        // Send button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.message-input button')) {
                const input = e.target.closest('.message-input').querySelector('input');
                if (input && input.value.trim()) {
                    const messagesContainer = e.target.closest('.message-input').previousElementSibling;
                    const newMessage = document.createElement('div');
                    newMessage.className = 'message own';
                    newMessage.innerHTML = `<p>${input.value}</p>`;
                    messagesContainer.appendChild(newMessage);
                    input.value = '';
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    LaunchpadUI.init();
});
