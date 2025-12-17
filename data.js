// Mock Database for Launchpad
// This simulates what would come from a real backend API

const LaunchpadDB = {
    // Current logged-in user
    currentUser: {
        id: 'user_001',
        name: 'Alex Thompson',
        handle: '@alexthompson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        bio: 'Music lover | Always discovering new artists | Pop & R&B enthusiast',
        location: 'Los Angeles, CA',
        joinedDate: 'March 2023',
        following: ['artist_001', 'artist_002', 'artist_003', 'artist_004'],
        followers: 1234,
        favoriteArtist: 'artist_001', // Jeremy Elliot
        preferences: {
            genres: ['Pop', 'R&B', 'Electronic'],
            notificationsEnabled: true
        },
        // User's playlists
        playlists: [
            {
                id: 'playlist_001',
                name: 'Morning Vibes',
                description: 'Perfect tracks to start the day',
                coverGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                trackCount: 24,
                duration: '1h 32m',
                isPublic: true,
                plays: 156
            },
            {
                id: 'playlist_002',
                name: 'Late Night Sessions',
                description: 'Chill beats for late night work',
                coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                trackCount: 42,
                duration: '2h 45m',
                isPublic: true,
                plays: 892
            },
            {
                id: 'playlist_003',
                name: 'Workout Mix',
                description: 'High energy tracks to power through',
                coverGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                trackCount: 31,
                duration: '1h 58m',
                isPublic: true,
                plays: 324
            },
            {
                id: 'playlist_004',
                name: 'Jeremy Elliot Collection',
                description: 'Everything from my favorite artist',
                coverGradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)',
                trackCount: 18,
                duration: '52m',
                isPublic: true,
                plays: 1247
            },
            {
                id: 'playlist_005',
                name: 'Throwbacks',
                description: 'Classic hits that never get old',
                coverGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                trackCount: 56,
                duration: '3h 12m',
                isPublic: false,
                plays: 78
            }
        ],
        // Recently played tracks
        recentlyPlayed: [
            { trackId: 'track_001', title: 'II - EP', artistId: 'artist_001', playedAt: '2 hours ago' },
            { trackId: 'track_002', title: 'Neon Dreams', artistId: 'artist_002', playedAt: '3 hours ago' },
            { trackId: 'track_003', title: 'Electric Soul', artistId: 'artist_003', playedAt: 'Yesterday' },
            { trackId: 'track_004', title: 'City Lights', artistId: 'artist_001', playedAt: 'Yesterday' },
            { trackId: 'track_005', title: 'Midnight Run', artistId: 'artist_004', playedAt: '2 days ago' }
        ],
        // Listening stats
        listeningStats: {
            totalMinutes: 12847,
            tracksPlayed: 2341,
            topGenre: 'Pop',
            topArtist: 'artist_001',
            streakDays: 45
        },
        // Recent activity
        recentActivity: [
            { type: 'playlist_created', content: 'Created playlist "Morning Vibes"', timestamp: '2 days ago' },
            { type: 'followed', content: 'Started following Luna Eclipse', timestamp: '3 days ago' },
            { type: 'liked', content: 'Liked "II - EP" by Jeremy Elliot', timestamp: '1 week ago' },
            { type: 'shared', content: 'Shared "Neon Dreams" to your story', timestamp: '1 week ago' }
        ],
        // Purchased content (merch, albums, tickets)
        purchases: [
            {
                id: 'purchase_001',
                type: 'album',
                title: 'II - EP (Digital)',
                artistId: 'artist_001',
                price: '$9.99',
                purchaseDate: 'Dec 10, 2025',
                coverGradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)'
            },
            {
                id: 'purchase_002',
                type: 'merch',
                title: 'Jeremy Elliot Tour Hoodie',
                artistId: 'artist_001',
                price: '$65.00',
                purchaseDate: 'Nov 28, 2025',
                coverGradient: 'linear-gradient(135deg, #1a1a2e 0%, #8b2bff 100%)',
                status: 'Shipped'
            },
            {
                id: 'purchase_003',
                type: 'ticket',
                title: 'Acoustic Session Live',
                artistId: 'artist_001',
                price: '$25.00',
                purchaseDate: 'Dec 5, 2025',
                eventDate: 'Dec 22, 2025',
                coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            },
            {
                id: 'purchase_004',
                type: 'album',
                title: 'Neon Dreams - Single',
                artistId: 'artist_002',
                price: '$1.29',
                purchaseDate: 'Dec 1, 2025',
                coverGradient: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)'
            }
        ],
        // Saved content (tracks, albums, posts)
        savedContent: [
            {
                id: 'saved_001',
                type: 'track',
                title: 'Healing',
                artistId: 'artist_001',
                savedAt: '1 day ago',
                duration: '3:42'
            },
            {
                id: 'saved_002',
                type: 'album',
                title: 'II - EP',
                artistId: 'artist_001',
                savedAt: '3 days ago',
                trackCount: 7
            },
            {
                id: 'saved_003',
                type: 'track',
                title: 'Electric Pulse',
                artistId: 'artist_003',
                savedAt: '5 days ago',
                duration: '4:15'
            },
            {
                id: 'saved_004',
                type: 'post',
                title: 'Behind the scenes of my new music video...',
                artistId: 'artist_001',
                savedAt: '1 week ago'
            },
            {
                id: 'saved_005',
                type: 'track',
                title: 'Midnight Groove',
                artistId: 'artist_004',
                savedAt: '1 week ago',
                duration: '3:28'
            },
            {
                id: 'saved_006',
                type: 'album',
                title: 'Neon Dreams Deluxe',
                artistId: 'artist_002',
                savedAt: '2 weeks ago',
                trackCount: 12
            }
        ]
    },

    // Artists database
    artists: {
        'artist_001': {
            id: 'artist_001',
            name: 'Jeremy Elliot',
            handle: '@jeremyelliot',
            avatar: 'jeremy-elliot-profile.jpg',
            verified: true,
            bio: 'Grammy-nominated producer & songwriter. From NYC street performer to working with Justin Bieber.',
            fullBio: 'From busking on NYC streets at 13 to a Grammy nomination with Justin Bieber\'s "Purpose" album.',
            bannerGradient: 'linear-gradient(135deg, #1a1a2e 0%, #8b2bff 100%)',
            stats: {
                listeners: '847K',
                listenersNum: 847000,
                followers: '2.1M',
                followersNum: 2100000,
                weeklyGrowth: 42.3,
                posts: 234
            },
            genres: ['Pop', 'R&B', 'Soul'],
            profileUrl: 'artist.html'
        },
        'artist_002': {
            id: 'artist_002',
            name: 'Luna Eclipse',
            handle: '@lunaeclipse',
            avatar: 'https://i.pravatar.cc/150?img=5',
            verified: false,
            bio: 'Dreamy synth-pop artist from Los Angeles',
            bannerGradient: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
            stats: {
                listeners: '324K',
                listenersNum: 324000,
                followers: '890K',
                followersNum: 890000,
                weeklyGrowth: 24.5,
                posts: 156
            },
            genres: ['Electronic', 'Synth-pop'],
            profileUrl: '#'
        },
        'artist_003': {
            id: 'artist_003',
            name: 'Sonic Wave',
            handle: '@sonicwave',
            avatar: 'https://i.pravatar.cc/150?img=12',
            verified: false,
            bio: 'Electronic producer pushing boundaries',
            bannerGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            stats: {
                listeners: '198K',
                listenersNum: 198000,
                followers: '456K',
                followersNum: 456000,
                weeklyGrowth: 18.2,
                posts: 89
            },
            genres: ['Electronic', 'House'],
            profileUrl: '#'
        },
        'artist_004': {
            id: 'artist_004',
            name: 'Rhythm King',
            handle: '@rhythmking',
            avatar: 'https://i.pravatar.cc/150?img=33',
            verified: false,
            bio: 'Hip-hop beats and soulful rhythms',
            bannerGradient: 'linear-gradient(135deg, #333 0%, #8b2bff 100%)',
            stats: {
                listeners: '156K',
                listenersNum: 156000,
                followers: '312K',
                followersNum: 312000,
                weeklyGrowth: 12.8,
                posts: 201
            },
            genres: ['Hip-Hop', 'R&B'],
            profileUrl: '#'
        },
        'artist_005': {
            id: 'artist_005',
            name: 'Neon Pulse',
            handle: '@neonpulse',
            avatar: 'https://i.pravatar.cc/150?img=47',
            verified: false,
            bio: 'Futuristic electronic soundscapes',
            bannerGradient: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
            stats: {
                listeners: '89K',
                listenersNum: 89000,
                followers: '134K',
                followersNum: 134000,
                weeklyGrowth: 156,
                posts: 67
            },
            genres: ['Electronic', 'Synthwave'],
            profileUrl: '#'
        },
        'artist_006': {
            id: 'artist_006',
            name: 'Crystal Vibes',
            handle: '@crystalvibes',
            avatar: 'https://i.pravatar.cc/150?img=25',
            verified: false,
            bio: 'Soulful R&B with crystal clear vocals',
            bannerGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            stats: {
                listeners: '112K',
                listenersNum: 112000,
                followers: '245K',
                followersNum: 245000,
                weeklyGrowth: 89.3,
                posts: 123
            },
            genres: ['R&B', 'Soul'],
            profileUrl: '#'
        },
        'artist_007': {
            id: 'artist_007',
            name: 'Bass Drop',
            handle: '@bassdrop',
            avatar: 'https://i.pravatar.cc/150?img=68',
            verified: false,
            bio: 'Heavy bass and electronic dance beats',
            bannerGradient: 'linear-gradient(135deg, #1a1a1a 0%, #00d4ff 100%)',
            stats: {
                listeners: '78K',
                listenersNum: 78000,
                followers: '167K',
                followersNum: 167000,
                weeklyGrowth: 67.1,
                posts: 45
            },
            genres: ['EDM', 'House'],
            profileUrl: '#'
        },
        'artist_008': {
            id: 'artist_008',
            name: 'Velvet Thunder',
            handle: '@velvetthunder',
            avatar: 'https://i.pravatar.cc/150?img=53',
            verified: false,
            bio: 'Alternative rock with velvet smooth vocals',
            bannerGradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
            stats: {
                listeners: '67K',
                listenersNum: 67000,
                followers: '145K',
                followersNum: 145000,
                weeklyGrowth: 52.4,
                posts: 78
            },
            genres: ['Alternative Rock', 'Indie'],
            profileUrl: '#'
        },
        'artist_009': {
            id: 'artist_009',
            name: 'Midnight Echo',
            handle: '@midnightecho',
            avatar: 'https://i.pravatar.cc/150?img=15',
            verified: false,
            bio: 'Atmospheric electronic music for late nights',
            bannerGradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            stats: {
                listeners: '124K',
                listenersNum: 124000,
                followers: '289K',
                followersNum: 289000,
                weeklyGrowth: 34.2,
                posts: 92
            },
            genres: ['Electronic', 'Ambient'],
            profileUrl: '#'
        },
        'artist_010': {
            id: 'artist_010',
            name: 'Solar Flare',
            handle: '@solarflare',
            avatar: 'https://i.pravatar.cc/150?img=22',
            verified: false,
            bio: 'Energetic pop with explosive hooks',
            bannerGradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
            stats: {
                listeners: '89K',
                listenersNum: 89000,
                followers: '198K',
                followersNum: 198000,
                weeklyGrowth: 28.7,
                posts: 134
            },
            genres: ['Pop', 'Dance'],
            profileUrl: '#'
        },
        'artist_011': {
            id: 'artist_011',
            name: 'Urban Pulse',
            handle: '@urbanpulse',
            avatar: 'https://i.pravatar.cc/150?img=31',
            verified: false,
            bio: 'City sounds and urban beats',
            bannerGradient: 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)',
            stats: {
                listeners: '201K',
                listenersNum: 201000,
                followers: '445K',
                followersNum: 445000,
                weeklyGrowth: 19.5,
                posts: 167
            },
            genres: ['Hip-Hop', 'Electronic'],
            profileUrl: '#'
        },
        'artist_012': {
            id: 'artist_012',
            name: 'Dreamscape',
            handle: '@dreamscape',
            avatar: 'https://i.pravatar.cc/150?img=44',
            verified: false,
            bio: 'Ethereal soundscapes and dreamy melodies',
            bannerGradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
            stats: {
                listeners: '156K',
                listenersNum: 156000,
                followers: '334K',
                followersNum: 334000,
                weeklyGrowth: 22.1,
                posts: 89
            },
            genres: ['Ambient', 'Electronic'],
            profileUrl: '#'
        }
    },

    // Posts/Feed items
    posts: [
        {
            id: 'post_001',
            artistId: 'artist_001',
            type: 'music',
            content: 'My debut EP "II" is finally here! Seven tracks that tell my story through love, loss, addiction, and hope. This is music to heal.',
            timestamp: '1 hour ago',
            timestampDate: new Date(Date.now() - 3600000),
            music: {
                title: 'II - EP',
                subtitle: 'Jeremy Elliot • 7 tracks',
                artSeed: 'jeremyelliotII'
            },
            stats: {
                likes: '4.2K',
                likesNum: 4200,
                comments: '342',
                commentsNum: 342,
                reposts: '1.1K',
                repostsNum: 1100
            }
        },
        {
            id: 'post_002',
            artistId: 'artist_002',
            type: 'music',
            content: 'Just dropped my new single "Neon Dreams"! Link in bio',
            timestamp: '2 hours ago',
            timestampDate: new Date(Date.now() - 7200000),
            music: {
                title: 'Neon Dreams',
                subtitle: 'Luna Eclipse • Single',
                artSeed: 'neondreams'
            },
            stats: {
                likes: '1.2K',
                likesNum: 1200,
                comments: '89',
                commentsNum: 89,
                reposts: '340',
                repostsNum: 340
            }
        },
        {
            id: 'post_003',
            artistId: 'artist_001',
            type: 'post',
            content: 'From busking on NYC streets at 13 to a Grammy nomination with Justin Bieber\'s "Purpose" album. What a journey. Thank you to everyone who believed in me',
            timestamp: '3 hours ago',
            timestampDate: new Date(Date.now() - 10800000),
            stats: {
                likes: '2.1K',
                likesNum: 2100,
                comments: '189',
                commentsNum: 189,
                reposts: '456',
                repostsNum: 456
            }
        },
        {
            id: 'post_004',
            artistId: 'artist_003',
            type: 'post',
            content: 'Collab announcement coming next week with @lunaeclipse! Stay tuned',
            timestamp: '4 hours ago',
            timestampDate: new Date(Date.now() - 14400000),
            stats: {
                likes: '956',
                likesNum: 956,
                comments: '56',
                commentsNum: 56,
                reposts: '234',
                repostsNum: 234
            }
        },
        {
            id: 'post_005',
            artistId: 'artist_004',
            type: 'merch',
            content: 'Album pre-orders are live! Limited edition vinyl available',
            timestamp: '6 hours ago',
            timestampDate: new Date(Date.now() - 21600000),
            merch: [
                {
                    name: 'Limited Edition Vinyl',
                    price: '$39.99',
                    gradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)'
                }
            ],
            stats: {
                likes: '2.1K',
                likesNum: 2100,
                comments: '128',
                commentsNum: 128,
                reposts: '512',
                repostsNum: 512
            }
        }
    ],

    // Genres for browsing
    genres: [
        { name: 'Rock', icon: '🎸', count: '2.4K', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' },
        { name: 'Electronic', icon: '🎹', count: '3.1K', gradient: 'linear-gradient(135deg, #a55eea 0%, #8b2bff 100%)' },
        { name: 'Hip-Hop', icon: '🎤', count: '4.8K', gradient: 'linear-gradient(135deg, #26de81 0%, #20bf6b 100%)' },
        { name: 'Jazz', icon: '🎷', count: '1.2K', gradient: 'linear-gradient(135deg, #fd9644 0%, #fa8231 100%)' },
        { name: 'Pop', icon: '🎵', count: '5.6K', gradient: 'linear-gradient(135deg, #4b7bec 0%, #3867d6 100%)' },
        { name: 'Folk', icon: '🪕', count: '980', gradient: 'linear-gradient(135deg, #fc5c65 0%, #eb3b5a 100%)' }
    ],

    // Trending hashtags
    trendingTags: [
        { tag: '#NewMusic', count: '342K' },
        { tag: '#IndieArtists', count: '89K' },
        { tag: '#VirtualConcert', count: '124K' },
        { tag: '#ProducerLife', count: '56K' },
        { tag: '#CollabChallenge', count: '73K' },
        { tag: '#SummerVibes', count: '198K' }
    ],

    // Live events
    events: [
        {
            id: 'event_001',
            title: 'Virtual Album Launch Party',
            artistId: 'artist_002',
            date: 'Dec 20, 2025 • 8:00 PM EST',
            gradient: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)'
        },
        {
            id: 'event_002',
            title: 'Acoustic Session Live',
            artistId: 'artist_001',
            date: 'Dec 22, 2025 • 7:00 PM EST',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 'event_003',
            title: 'Beat Making Workshop',
            artistId: 'artist_004',
            date: 'Dec 25, 2025 • 3:00 PM EST',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }
    ],

    // Notifications
    notifications: [
        {
            id: 'notif_001',
            type: 'like',
            fromArtistId: 'artist_002',
            message: 'liked your post',
            timestamp: '2 hours ago'
        },
        {
            id: 'notif_002',
            type: 'follow',
            fromArtistId: 'artist_003',
            message: 'started following you',
            timestamp: '5 hours ago'
        },
        {
            id: 'notif_003',
            type: 'mention',
            fromArtistId: 'artist_004',
            message: 'mentioned you in a post',
            timestamp: '1 day ago'
        }
    ],

    // Chat conversations
    chats: [
        {
            id: 'chat_001',
            withArtistId: 'artist_002',
            lastMessage: 'That collab idea sounds amazing!',
            messages: [
                { from: 'artist_002', text: 'Hey! Love your new track!', time: '2:30 PM' },
                { from: 'user', text: 'Thanks! Would love to collab sometime', time: '2:32 PM' },
                { from: 'artist_002', text: 'That collab idea sounds amazing!', time: '2:35 PM' }
            ]
        },
        {
            id: 'chat_002',
            withArtistId: 'artist_003',
            lastMessage: 'When are you free to chat about the project?',
            messages: []
        },
        {
            id: 'chat_003',
            withArtistId: 'artist_004',
            lastMessage: 'Check out the new mixing techniques!',
            messages: []
        }
    ],

    // Communities
    communities: [
        {
            id: 'comm_001',
            name: 'Indie Producers',
            description: 'Share your beats and get feedback from fellow producers',
            members: '12.4K',
            banner: 'linear-gradient(135deg, #8b2bff 0%, #b366ff 100%)'
        },
        {
            id: 'comm_002',
            name: 'Songwriters Circle',
            description: 'A safe space for sharing lyrics and songwriting tips',
            members: '8.7K',
            banner: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 'comm_003',
            name: 'Electronic Music Makers',
            description: 'Everything about electronic music production',
            members: '23.1K',
            banner: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }
    ],

    // Helper methods to get computed data
    getArtist(id) {
        return this.artists[id];
    },

    getFeaturedArtist(userId) {
        // Returns user's favorite artist as featured
        const user = this.currentUser;
        return this.artists[user.favoriteArtist];
    },

    getFollowedArtists(userId) {
        const user = this.currentUser;
        return user.following.map(id => this.artists[id]).filter(Boolean);
    },

    getRisingStars() {
        // Get artists not followed by user, sorted by growth
        const user = this.currentUser;
        return Object.values(this.artists)
            .filter(a => !user.following.includes(a.id))
            .sort((a, b) => b.stats.weeklyGrowth - a.stats.weeklyGrowth)
            .slice(0, 4);
    },

    getSuggestedArtists(userId) {
        // Get artists similar to followed ones
        const user = this.currentUser;
        const followedGenres = new Set();
        user.following.forEach(id => {
            const artist = this.artists[id];
            if (artist) artist.genres.forEach(g => followedGenres.add(g));
        });

        return Object.values(this.artists)
            .filter(a => !user.following.includes(a.id))
            .filter(a => a.genres.some(g => followedGenres.has(g)))
            .slice(0, 4)
            .map(artist => {
                // Find which followed artist they're similar to
                const similarTo = user.following
                    .map(id => this.artists[id])
                    .find(fa => fa && fa.genres.some(g => artist.genres.includes(g)));
                return { ...artist, similarTo: similarTo?.name || 'Artists you follow' };
            });
    },

    getQuickDiscoverArtists(userId) {
        // Mix of favorite + rising stars for quick discover
        const featured = this.getFeaturedArtist(userId);
        const rising = this.getRisingStars().slice(0, 3);
        return [featured, ...rising];
    },

    getFeedPosts(userId) {
        // Get posts from followed artists, sorted by time
        const user = this.currentUser;
        return this.posts
            .filter(p => user.following.includes(p.artistId))
            .sort((a, b) => b.timestampDate - a.timestampDate);
    },

    getLeaderboard(userId) {
        const user = this.currentUser;
        const followed = this.getFollowedArtists(userId)
            .sort((a, b) => b.stats.weeklyGrowth - a.stats.weeklyGrowth);
        const discover = this.getRisingStars();
        return { followed, discover };
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LaunchpadDB;
}
