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
        supporting: ['artist_001', 'artist_002', 'artist_003', 'artist_004'],
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
        // Support relationships with artists
        supportRelationships: {
            'artist_001': {
                isSupporter: true,
                membershipTier: 'Superfans',
                supporterSince: 'March 2023',
                releasesSupported: 2,
                milestonesUnlocked: 1,
                isEarlySupporter: true
            },
            'artist_002': {
                isSupporter: true,
                membershipTier: 'Supporters',
                supporterSince: 'August 2024',
                releasesSupported: 1,
                milestonesUnlocked: 0,
                isEarlySupporter: false
            }
        },
        // Recent activity
        recentActivity: [
            { type: 'playlist_created', content: 'Created playlist "Morning Vibes"', timestamp: '2 days ago' },
            { type: 'supported', content: 'Started supporting Luna Eclipse', timestamp: '3 days ago' },
            { type: 'liked', content: 'Liked "II - EP" by Jeremy Elliot', timestamp: '1 week ago' },
            { type: 'shared', content: 'Shared "Neon Dreams" to your story', timestamp: '1 week ago' }
        ],
        // Fan badges earned
        badges: {
            // Core Identity Badges
            earlySupporter: {
                earned: true,
                earnedDate: 'March 2023',
                artistIds: ['artist_001']
            },
            foundingListener: {
                earned: true,
                earnedDate: 'March 2023',
                artistIds: ['artist_001']
            },
            milestoneUnlocker: {
                earned: true,
                earnedDate: 'June 2024',
                count: 1
            },
            // Contribution Badges
            communityVoice: {
                earned: true,
                earnedDate: 'September 2024',
                artistIds: ['artist_001']
            },
            showSupporter: {
                earned: true,
                earnedDate: 'November 2024',
                eventCount: 2
            },
            btsCircle: {
                earned: true,
                earnedDate: 'April 2024',
                artistIds: ['artist_001']
            },
            // Taste & Signal Badge
            tastemaker: {
                earned: false,
                earnedDate: null,
                artistCount: 0
            }
        },
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

    // Badge definitions
    badgeDefinitions: {
        // Core Identity Badges
        earlySupporter: {
            id: 'earlySupporter',
            name: 'Early Supporter',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 0l-3-3m3 3l3-3"/><path d="M12 22c-4 0-7-3-7-7 0-2 1-4 3-5.5S12 8 12 8s2 0 4 1.5 3 3.5 3 5.5c0 4-3 7-7 7z"/></svg>',
            color: '#22c55e',
            category: 'Core Identity',
            description: 'Supported an artist early in their journey'
        },
        foundingListener: {
            id: 'foundingListener',
            name: 'Founding Listener',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/></svg>',
            color: '#8b2bff',
            category: 'Core Identity',
            description: "Supported an artist's first release on Launchpad"
        },
        milestoneUnlocker: {
            id: 'milestoneUnlocker',
            name: 'Milestone Unlocker',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
            color: '#f59e0b',
            category: 'Core Identity',
            description: 'Participated in unlocking one or more release milestones'
        },
        // Contribution Badges
        communityVoice: {
            id: 'communityVoice',
            name: 'Community Voice',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/></svg>',
            color: '#3b82f6',
            category: 'Contribution',
            description: 'Meaningful, consistent participation in artist communities'
        },
        showSupporter: {
            id: 'showSupporter',
            name: 'Show Supporter',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
            color: '#ef4444',
            category: 'Contribution',
            description: 'Attended a live event tied to Launchpad'
        },
        btsCircle: {
            id: 'btsCircle',
            name: 'BTS Circle',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
            color: '#ec4899',
            category: 'Contribution',
            description: 'Accessed behind-the-scenes / inner-circle content'
        },
        // Taste & Signal Badge
        tastemaker: {
            id: 'tastemaker',
            name: 'Tastemaker',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
            color: '#a855f7',
            category: 'Taste & Signal',
            description: 'Known for backing multiple artists early who later crossed milestones'
        }
    },

    // Artist badge definitions
    artistBadgeDefinitions: {
        verifiedArtist: {
            id: 'verifiedArtist',
            name: 'Verified Artist',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            color: '#22c55e',
            description: 'Identity confirmed by Launchpad'
        },
        communityBacked: {
            id: 'communityBacked',
            name: 'Community-Backed',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
            color: '#f97316',
            description: 'Reached first supporter milestone with fans'
        },
        milestoneArtist: {
            id: 'milestoneArtist',
            name: 'Milestone Artist',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><line x1="12" y1="11" x2="12" y2="17"/></svg>',
            color: '#f59e0b',
            description: 'Unlocked one or more release milestones'
        },
        firstRelease: {
            id: 'firstRelease',
            name: 'First Release',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
            color: '#8b2bff',
            description: 'Chose Launchpad as the starting point for a release'
        },
        independentArtist: {
            id: 'independentArtist',
            name: 'Independent',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
            color: '#06b6d4',
            description: 'Self-directed, no label affiliation'
        }
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
                supporters: '12.4K',
                supportersNum: 12400,
                listeners: '847K',
                listenersNum: 847000,
                weeklyGrowth: 42.3,
                posts: 234
            },
            genres: ['Pop', 'R&B', 'Soul'],
            risingReason: 'New EP release',
            profileUrl: 'artist.html',
            badges: {
                verifiedArtist: {
                    earned: true,
                    earnedDate: 'January 2023'
                },
                communityBacked: {
                    earned: true,
                    earnedDate: 'March 2023',
                    milestone: '1,000 supporters'
                },
                milestoneArtist: {
                    earned: true,
                    earnedDate: 'June 2024',
                    count: 3
                },
                firstRelease: {
                    earned: true,
                    earnedDate: 'February 2023',
                    releaseName: 'II - EP'
                },
                independentArtist: {
                    earned: true,
                    earnedDate: 'January 2023',
                    optedIn: true
                }
            }
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
                supporters: '8.2K',
                supportersNum: 8200,
                listeners: '324K',
                listenersNum: 324000,
                weeklyGrowth: 24.5,
                posts: 156
            },
            genres: ['Electronic', 'Synth-pop'],
            risingReason: 'New single drop',
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
                supporters: '5.6K',
                supportersNum: 5600,
                listeners: '198K',
                listenersNum: 198000,
                weeklyGrowth: 18.2,
                posts: 89
            },
            genres: ['Electronic', 'House'],
            risingReason: 'Collab announcement',
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
                supporters: '4.1K',
                supportersNum: 4100,
                listeners: '156K',
                listenersNum: 156000,
                weeklyGrowth: 12.8,
                posts: 201
            },
            genres: ['Hip-Hop', 'R&B'],
            risingReason: 'Vinyl pre-orders live',
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
                supporters: '2.8K',
                supportersNum: 2800,
                listeners: '89K',
                listenersNum: 89000,
                weeklyGrowth: 156,
                posts: 67
            },
            genres: ['Electronic', 'Synthwave'],
            risingReason: 'Viral on TikTok',
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
                supporters: '3.4K',
                supportersNum: 3400,
                listeners: '112K',
                listenersNum: 112000,
                weeklyGrowth: 89.3,
                posts: 123
            },
            genres: ['R&B', 'Soul'],
            risingReason: 'Featured on playlist',
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
                supporters: '1.9K',
                supportersNum: 1900,
                listeners: '78K',
                listenersNum: 78000,
                weeklyGrowth: 67.1,
                posts: 45
            },
            genres: ['EDM', 'House'],
            risingReason: 'Festival announcement',
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
                supporters: '2.1K',
                supportersNum: 2100,
                listeners: '67K',
                listenersNum: 67000,
                weeklyGrowth: 52.4,
                posts: 78
            },
            genres: ['Alternative Rock', 'Indie'],
            risingReason: 'Album announcement',
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
                supporters: '3.8K',
                supportersNum: 3800,
                listeners: '124K',
                listenersNum: 124000,
                weeklyGrowth: 34.2,
                posts: 92
            },
            genres: ['Electronic', 'Ambient'],
            risingReason: 'Live stream session',
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
                supporters: '2.3K',
                supportersNum: 2300,
                listeners: '89K',
                listenersNum: 89000,
                weeklyGrowth: 28.7,
                posts: 134
            },
            genres: ['Pop', 'Dance'],
            risingReason: 'Summer tour dates',
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
                supporters: '6.2K',
                supportersNum: 6200,
                listeners: '201K',
                listenersNum: 201000,
                weeklyGrowth: 19.5,
                posts: 167
            },
            genres: ['Hip-Hop', 'Electronic'],
            risingReason: 'Music video premiere',
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
                supporters: '4.7K',
                supportersNum: 4700,
                listeners: '156K',
                listenersNum: 156000,
                weeklyGrowth: 22.1,
                posts: 89
            },
            genres: ['Ambient', 'Electronic'],
            risingReason: 'New remix drop',
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
            type: 'support',
            fromArtistId: 'artist_003',
            message: 'started supporting you',
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

    getSupportedArtists(userId) {
        const user = this.currentUser;
        return user.supporting.map(id => this.artists[id]).filter(Boolean);
    },

    getRisingStars() {
        // Get artists not supported by user, sorted by growth
        const user = this.currentUser;
        return Object.values(this.artists)
            .filter(a => !user.supporting.includes(a.id))
            .sort((a, b) => b.stats.weeklyGrowth - a.stats.weeklyGrowth)
            .slice(0, 4);
    },

    getSuggestedArtists(userId) {
        // Get artists similar to supported ones
        const user = this.currentUser;
        const supportedGenres = new Set();
        user.supporting.forEach(id => {
            const artist = this.artists[id];
            if (artist) artist.genres.forEach(g => supportedGenres.add(g));
        });

        return Object.values(this.artists)
            .filter(a => !user.supporting.includes(a.id))
            .filter(a => a.genres.some(g => supportedGenres.has(g)))
            .slice(0, 4)
            .map(artist => {
                // Find which supported artist they're similar to
                const similarTo = user.supporting
                    .map(id => this.artists[id])
                    .find(fa => fa && fa.genres.some(g => artist.genres.includes(g)));
                return { ...artist, similarTo: similarTo?.name || 'Artists you support' };
            });
    },

    getQuickDiscoverArtists(userId) {
        // Mix of favorite + rising stars for quick discover
        const featured = this.getFeaturedArtist(userId);
        const rising = this.getRisingStars().slice(0, 3);
        return [featured, ...rising];
    },

    getFeedPosts(userId) {
        // Get posts from supported artists, sorted by time
        const user = this.currentUser;
        return this.posts
            .filter(p => user.supporting.includes(p.artistId))
            .sort((a, b) => b.timestampDate - a.timestampDate);
    },

    getLeaderboard(userId) {
        const user = this.currentUser;
        const supported = this.getSupportedArtists(userId)
            .sort((a, b) => b.stats.weeklyGrowth - a.stats.weeklyGrowth);
        const discover = this.getRisingStars();
        return { supported, discover };
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LaunchpadDB;
}
