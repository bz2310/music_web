// Community Chat Page - Discord-style Interactivity

const CommunityChat = {
    currentChannel: 'general',

    init() {
        this.setupChannelNavigation();
        this.setupMessageInput();
        this.setupMobileMenu();
        this.scrollToBottom();
    },

    // Handle channel switching
    setupChannelNavigation() {
        const channelItems = document.querySelectorAll('.channel-item');
        const channelTitle = document.querySelector('.channel-title h3');
        const channelDescription = document.querySelector('.channel-description');
        const messageInput = document.querySelector('.message-input');

        const channelDescriptions = {
            'welcome': 'Introduce yourself to the community',
            'rules': 'Community guidelines and rules',
            'announcements': 'Important updates from moderators',
            'general': 'Chat about anything production related',
            'feedback': 'Get feedback on your work',
            'collabs': 'Find collaboration opportunities',
            'beats': 'Share your beats and instrumentals',
            'samples': 'Share and discuss samples',
            'mixing-tips': 'Tips and tricks for mixing and mastering',
            'listening-party': 'Voice channel for listening sessions',
            'studio-session': 'Voice channel for live production'
        };

        channelItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const channel = item.dataset.channel;

                // Don't switch if clicking a voice channel
                if (item.classList.contains('voice')) {
                    return;
                }

                // Update active state
                channelItems.forEach(ch => ch.classList.remove('active'));
                item.classList.add('active');

                // Update header
                if (channelTitle) {
                    channelTitle.textContent = channel;
                }
                if (channelDescription) {
                    channelDescription.textContent = channelDescriptions[channel] || '';
                }
                if (messageInput) {
                    messageInput.placeholder = `Message #${channel}`;
                }

                this.currentChannel = channel;
            });
        });
    },

    // Handle message input
    setupMessageInput() {
        const messageInput = document.querySelector('.message-input');
        const messagesContainer = document.getElementById('messages-container');

        if (!messageInput || !messagesContainer) return;

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && messageInput.value.trim()) {
                this.sendMessage(messageInput.value.trim());
                messageInput.value = '';
            }
        });
    },

    // Send a message (simulated)
    sendMessage(text) {
        const messagesContainer = document.getElementById('messages-container');
        const typingIndicator = document.querySelector('.typing-indicator');

        const now = new Date();
        const timeString = `Today at ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;

        const messageHtml = `
            <div class="message-group">
                <img src="https://i.pravatar.cc/150?img=3" alt="Alex Rivera" class="message-avatar">
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">Alex Rivera</span>
                        <span class="message-time">${timeString}</span>
                    </div>
                    <p class="message-text">${this.escapeHtml(text)}</p>
                </div>
            </div>
        `;

        // Insert before typing indicator
        if (typingIndicator) {
            typingIndicator.insertAdjacentHTML('beforebegin', messageHtml);
        } else {
            messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
        }

        this.scrollToBottom();
    },

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Scroll messages to bottom
    scrollToBottom() {
        const messagesContainer = document.getElementById('messages-container');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    },

    // Mobile menu toggle
    setupMobileMenu() {
        // Add menu button for mobile
        const chatHeader = document.querySelector('.chat-header');
        const sidebar = document.querySelector('.community-sidebar');

        if (!chatHeader || !sidebar) return;

        // Check if we need mobile menu button
        if (window.innerWidth <= 768) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
            chatHeader.insertBefore(menuBtn, chatHeader.firstChild);

            menuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            });
        }
    },

    // Handle reactions
    setupReactions() {
        document.addEventListener('click', (e) => {
            const reaction = e.target.closest('.reaction');
            if (reaction && !reaction.classList.contains('add-reaction')) {
                reaction.classList.toggle('active');
                const countEl = reaction.querySelector('.reaction-count');
                if (countEl) {
                    let count = parseInt(countEl.textContent);
                    count = reaction.classList.contains('active') ? count + 1 : count - 1;
                    countEl.textContent = count;
                }
            }
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    CommunityChat.init();
    CommunityChat.setupReactions();
});
