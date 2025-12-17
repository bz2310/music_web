// Artist Dashboard JavaScript
const ArtistDashboard = {
    currentSection: 'overview',
    currentDateRange: '30d',
    selectedSongs: [],
    selectedAlbums: [],
    selectedVideos: [],

    // Zoom state for charts
    chartZoom: {
        songs: { start: 0, end: 30 },
        albums: { start: 0, end: 30 },
        videos: { start: 0, end: 30 }
    },

    init() {
        this.renderArtistProfile();
        this.setupNavigation();
        this.setupDateRange();
        this.setupTabs();
        this.setupSearch();
        this.setupDetailPanels();
        this.renderOverview();
        this.renderAllSections();
    },

    // Render artist profile in sidebar from data
    renderArtistProfile() {
        const container = document.getElementById('artist-profile-mini');
        const artist = ArtistDashboardData.artist;

        container.innerHTML = `
            <img src="${artist.avatar}" alt="${artist.name}" class="artist-mini-avatar">
            <div class="artist-mini-info">
                <span class="artist-mini-name">${artist.name}</span>
                <span class="artist-mini-badge">${artist.verified ? 'Verified Artist' : 'Artist'}</span>
            </div>
        `;
    },

    // Navigation
    setupNavigation() {
        document.querySelectorAll('.dashboard-nav .nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });
    },

    switchSection(section) {
        // Update nav
        document.querySelectorAll('.dashboard-nav .nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });

        // Update sections
        document.querySelectorAll('.dashboard-section').forEach(s => {
            s.classList.toggle('active', s.id === section);
        });

        // Update title
        const titles = {
            overview: 'Overview',
            revenue: 'Revenue Analytics',
            audience: 'Audience Insights',
            songs: 'Song Analytics',
            albums: 'Album Analytics',
            videos: 'Video Analytics',
            merch: 'Merchandise Analytics'
        };
        document.getElementById('page-title').textContent = titles[section] || 'Dashboard';

        this.currentSection = section;
    },

    // Date Range
    setupDateRange() {
        document.querySelectorAll('.date-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentDateRange = btn.dataset.range;
                this.refreshData();
            });
        });
    },

    // Tabs (for Revenue section)
    setupTabs() {
        document.querySelectorAll('.section-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const parent = tab.closest('.section-tabs');
                parent.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    },

    // Search functionality
    setupSearch() {
        ['song', 'album', 'video', 'merch'].forEach(type => {
            const searchInput = document.getElementById(`${type}-search`);
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.filterContent(type, e.target.value);
                });
            }

            const sortSelect = document.getElementById(`${type}-sort`);
            if (sortSelect) {
                sortSelect.addEventListener('change', () => {
                    this.sortContent(type, sortSelect.value);
                });
            }
        });
    },

    filterContent(type, query) {
        const grid = document.getElementById(`${type}s-grid`);
        if (!grid) return;

        const cards = grid.querySelectorAll('.content-card');
        cards.forEach(card => {
            const title = card.querySelector('.content-card-title').textContent.toLowerCase();
            card.style.display = title.includes(query.toLowerCase()) ? 'block' : 'none';
        });
    },

    sortContent(type, sortBy) {
        // Re-render with sorted data
        if (type === 'song') this.renderSongs(sortBy);
        if (type === 'album') this.renderAlbums(sortBy);
        if (type === 'video') this.renderVideos(sortBy);
        if (type === 'merch') this.renderMerch(sortBy);
    },

    // Detail Panels
    setupDetailPanels() {
        document.querySelectorAll('.detail-close').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.detail-panel').classList.remove('open');
            });
        });
    },

    openDetailPanel(type, id) {
        const panel = document.getElementById(`${type}-detail-panel`);
        if (!panel) return;

        this.renderDetailPanel(type, id);
        panel.classList.add('open');
    },

    // Refresh data based on date range
    refreshData() {
        this.renderOverview();
        this.renderAllSections();
    },

    // Render all sections
    renderAllSections() {
        this.renderRevenue();
        this.renderAudience();
        this.renderSongs();
        this.renderAlbums();
        this.renderVideos();
        this.renderMerch();
    },

    // ===================
    // OVERVIEW SECTION
    // ===================
    renderOverview() {
        const data = ArtistDashboardData;

        // KPIs
        document.getElementById('total-revenue').textContent = data.formatCurrency(data.overview.totalRevenue);
        document.getElementById('revenue-change').textContent = `+${data.overview.revenueChange}%`;
        document.getElementById('total-streams').textContent = data.formatNumber(data.overview.totalStreams);
        document.getElementById('streams-change').textContent = `+${data.overview.streamsChange}%`;
        document.getElementById('total-fans').textContent = data.formatNumber(data.overview.totalFans);
        document.getElementById('fans-change').textContent = `+${data.overview.fansChange}%`;
        document.getElementById('merch-sold').textContent = data.formatNumber(data.overview.merchSold);
        document.getElementById('merch-change').textContent = `+${data.overview.merchChange}%`;

        // Revenue chart
        this.renderRevenueChart();

        // Category chart
        this.renderCategoryChart();

        // Top performers
        this.renderTopSongs();
        this.renderTopMerch();
        this.renderTopRegions();
    },

    renderRevenueChart() {
        const container = document.getElementById('revenue-chart');
        const data = ArtistDashboardData.revenueTimeSeries.daily.slice(-14);
        const maxValue = Math.max(...data.map(d => d.total));

        let barsHtml = data.map((d, i) => {
            const height = (d.total / maxValue) * 100;
            const date = new Date(d.date);
            const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return `
                <div class="bar" style="height: ${height}%;" title="${ArtistDashboardData.formatCurrency(d.total)}">
                    <span class="bar-value">${ArtistDashboardData.formatCurrency(d.total)}</span>
                    <span class="bar-label">${label}</span>
                </div>
            `;
        }).join('');

        container.innerHTML = `<div class="bar-chart">${barsHtml}</div>`;

        // Legend
        const legendContainer = document.getElementById('revenue-legend');
        legendContainer.innerHTML = `
            <div class="legend-item"><span class="legend-dot" style="background: #8b2bff;"></span> Streaming</div>
            <div class="legend-item"><span class="legend-dot" style="background: #22c55e;"></span> Merch</div>
            <div class="legend-item"><span class="legend-dot" style="background: #f59e0b;"></span> Exclusive</div>
        `;
    },

    renderCategoryChart() {
        const container = document.getElementById('category-chart');
        const data = ArtistDashboardData.revenueByCategory;
        const total = data.reduce((sum, d) => sum + d.amount, 0);

        // Create simple donut representation with bars
        let legendHtml = data.map(d => `
            <div class="donut-legend-item">
                <div class="donut-legend-left">
                    <span class="donut-legend-color" style="background: ${d.color};"></span>
                    <span>${d.category}</span>
                </div>
                <span>${d.percent}%</span>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="donut-chart">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    ${this.createDonutSegments(data)}
                </svg>
                <div class="donut-center">
                    <span class="donut-value">${ArtistDashboardData.formatCurrency(total)}</span>
                    <span class="donut-label">Total</span>
                </div>
            </div>
            <div class="donut-legend">${legendHtml}</div>
        `;
    },

    createDonutSegments(data) {
        const cx = 70, cy = 70, r = 50;
        const circumference = 2 * Math.PI * r;
        let accumulatedOffset = circumference * 0.25; // Start at top (12 o'clock)
        let segments = '';

        data.forEach(d => {
            const segmentLength = (d.percent / 100) * circumference;
            segments += `
                <circle
                    cx="${cx}" cy="${cy}" r="${r}"
                    fill="none"
                    stroke="${d.color}"
                    stroke-width="16"
                    stroke-dasharray="${segmentLength} ${circumference}"
                    stroke-dashoffset="${accumulatedOffset}"
                />
            `;
            accumulatedOffset -= segmentLength;
        });

        return segments;
    },

    renderTopSongs() {
        const container = document.getElementById('top-songs-list');
        const songs = [...ArtistDashboardData.songs]
            .sort((a, b) => b.streams - a.streams)
            .slice(0, 5);

        container.innerHTML = songs.map((song, i) => `
            <div class="performer-item" onclick="ArtistDashboard.openDetailPanel('song', '${song.id}')">
                <span class="performer-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</span>
                <div class="performer-info">
                    <span class="performer-name">${song.title}</span>
                    <span class="performer-meta">${song.album}</span>
                </div>
                <span class="performer-value">${ArtistDashboardData.formatNumber(song.streams)}</span>
            </div>
        `).join('');
    },

    renderTopMerch() {
        const container = document.getElementById('top-merch-list');
        const merch = [...ArtistDashboardData.merchandise]
            .sort((a, b) => b.unitsSold - a.unitsSold)
            .slice(0, 5);

        container.innerHTML = merch.map((item, i) => `
            <div class="performer-item" onclick="ArtistDashboard.openDetailPanel('merch', '${item.id}')">
                <span class="performer-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</span>
                <div class="performer-info">
                    <span class="performer-name">${item.name}</span>
                    <span class="performer-meta">${item.category}</span>
                </div>
                <span class="performer-value">${item.unitsSold} sold</span>
            </div>
        `).join('');
    },

    renderTopRegions() {
        const container = document.getElementById('top-regions-list');
        const regions = ArtistDashboardData.revenueByGeography.slice(0, 5);

        container.innerHTML = regions.map((region, i) => {
            const hasMetros = region.metros && region.metros.length > 0;
            const isExpanded = this.expandedOverviewCountry === region.country;
            const maxMetroPercent = hasMetros ? Math.max(...region.metros.map(m => m.percent)) : 0;

            return `
                <div class="region-wrapper">
                    <div class="performer-item ${hasMetros ? 'expandable' : ''} ${isExpanded ? 'expanded' : ''}"
                         ${hasMetros ? `onclick="ArtistDashboard.toggleOverviewCountryExpand('${region.country}')"` : ''}>
                        <span class="performer-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</span>
                        <div class="performer-info">
                            <span class="performer-name">
                                ${region.flag} ${region.country}
                                ${hasMetros ? `<span class="expand-icon">${isExpanded ? '▼' : '▶'}</span>` : ''}
                            </span>
                            <span class="performer-meta">${region.percent}% of revenue</span>
                        </div>
                        <span class="performer-value">${ArtistDashboardData.formatCurrency(region.amount)}</span>
                    </div>
                    ${isExpanded && hasMetros ? `
                        <div class="metro-breakdown compact">
                            ${region.metros.slice(0, 5).map(metro => `
                                <div class="metro-item-compact">
                                    <span class="metro-marker">•</span>
                                    <span class="metro-name">${metro.city}</span>
                                    <span class="metro-value">${ArtistDashboardData.formatCurrency(metro.amount)}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    toggleOverviewCountryExpand(country) {
        if (this.expandedOverviewCountry === country) {
            this.expandedOverviewCountry = null;
        } else {
            this.expandedOverviewCountry = country;
        }
        this.renderTopRegions();
    },

    // ===================
    // REVENUE SECTION
    // ===================
    renderRevenue() {
        const data = ArtistDashboardData;
        const timeSeries = data.revenueTimeSeries.daily;
        const total = timeSeries.reduce((sum, d) => sum + d.total, 0);
        const avg = total / timeSeries.length;
        const peak = Math.max(...timeSeries.map(d => d.total));
        const transactions = Math.floor(total / 25); // Mock transaction count

        document.getElementById('rev-total').textContent = data.formatCurrency(total);
        document.getElementById('rev-avg').textContent = data.formatCurrency(avg);
        document.getElementById('rev-high').textContent = data.formatCurrency(peak);
        document.getElementById('rev-transactions').textContent = transactions.toLocaleString();

        // Timeline chart
        this.renderRevenueTimeline();

        // Geography
        this.renderRevenueGeography();

        // Products
        this.renderRevenueProducts();
    },

    renderRevenueTimeline() {
        const container = document.getElementById('revenue-timeline-chart');
        const data = ArtistDashboardData.revenueTimeSeries.daily;
        const maxValue = Math.max(...data.map(d => d.total));

        let barsHtml = data.map((d, i) => {
            const height = (d.total / maxValue) * 100;
            const date = new Date(d.date);
            const label = i % 5 === 0 ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
            return `
                <div class="bar" style="height: ${height}%;" title="${ArtistDashboardData.formatCurrency(d.total)}">
                    <span class="bar-value">${ArtistDashboardData.formatCurrency(d.total)}</span>
                    ${label ? `<span class="bar-label">${label}</span>` : ''}
                </div>
            `;
        }).join('');

        container.innerHTML = `<div class="bar-chart">${barsHtml}</div>`;
    },

    expandedCountry: null,
    expandedOverviewCountry: null,
    expandedMerchCountry: null,
    expandedDetailCountry: null,
    currentDetailType: null,
    currentDetailId: null,

    // Get metros for a country from revenueByGeography data
    getMetrosForCountry(country) {
        const region = ArtistDashboardData.revenueByGeography.find(r => r.country === country);
        return region && region.metros ? region.metros : null;
    },

    renderRevenueGeography() {
        const container = document.getElementById('revenue-geography');
        const data = ArtistDashboardData.revenueByGeography;
        const maxPercent = Math.max(...data.map(d => d.percent));

        container.innerHTML = data.map(region => {
            const hasMetros = region.metros && region.metros.length > 0;
            const isExpanded = this.expandedCountry === region.country;
            const maxMetroPercent = hasMetros ? Math.max(...region.metros.map(m => m.percent)) : 0;

            return `
                <div class="geography-wrapper">
                    <div class="geography-item ${hasMetros ? 'expandable' : ''} ${isExpanded ? 'expanded' : ''}"
                         ${hasMetros ? `onclick="ArtistDashboard.toggleCountryExpand('${region.country}')"` : ''}>
                        <span class="geography-flag">${region.flag}</span>
                        <div class="geography-info">
                            <span class="geography-name">
                                ${region.country}
                                ${hasMetros ? `<span class="expand-icon">${isExpanded ? '▼' : '▶'}</span>` : ''}
                            </span>
                            <div class="geography-bar-container">
                                <div class="geography-bar" style="width: ${(region.percent / maxPercent) * 100}%;"></div>
                            </div>
                        </div>
                        <span class="geography-value">${ArtistDashboardData.formatCurrency(region.amount)}</span>
                    </div>
                    ${isExpanded && hasMetros ? `
                        <div class="metro-breakdown">
                            ${region.metros.map(metro => `
                                <div class="geography-item metro-item">
                                    <span class="geography-flag metro-marker">•</span>
                                    <div class="geography-info">
                                        <span class="geography-name">${metro.city}</span>
                                        <div class="geography-bar-container">
                                            <div class="geography-bar metro" style="width: ${(metro.percent / maxMetroPercent) * 100}%;"></div>
                                        </div>
                                    </div>
                                    <span class="geography-value">${ArtistDashboardData.formatCurrency(metro.amount)}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    toggleCountryExpand(country) {
        if (this.expandedCountry === country) {
            this.expandedCountry = null;
        } else {
            this.expandedCountry = country;
        }
        this.renderRevenueGeography();
    },

    renderRevenueProducts() {
        const container = document.getElementById('revenue-products');
        const products = [
            ...ArtistDashboardData.songs.map(s => ({ name: s.title, type: 'Song', revenue: s.revenue, color: '#8b2bff' })),
            ...ArtistDashboardData.merchandise.map(m => ({ name: m.name, type: 'Merch', revenue: m.revenue, color: '#22c55e' }))
        ].sort((a, b) => b.revenue - a.revenue).slice(0, 8);

        container.innerHTML = products.map(product => `
            <div class="product-item">
                <div class="product-icon" style="background: ${product.color}20;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${product.color}" stroke-width="2">
                        ${product.type === 'Song' ?
                            '<circle cx="5.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="15.5" r="2.5"></circle><path d="M8 17V5l12-2v12"></path>' :
                            '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>'
                        }
                    </svg>
                </div>
                <div class="product-info">
                    <span class="product-name">${product.name}</span>
                    <span class="product-sales">${product.type}</span>
                </div>
                <span class="product-revenue">${ArtistDashboardData.formatCurrency(product.revenue)}</span>
            </div>
        `).join('');
    },

    // ===================
    // AUDIENCE SECTION
    // ===================
    renderAudience() {
        const data = ArtistDashboardData.audience;

        document.getElementById('total-customers').textContent = data.totalCustomers.toLocaleString();
        document.getElementById('repeat-customers').textContent = data.repeatCustomers.toLocaleString();
        document.getElementById('repeat-rate').textContent = data.repeatRate + '%';
        document.getElementById('avg-spend').textContent = ArtistDashboardData.formatCurrency(data.avgSpend);

        this.renderFanSegments();
        this.renderSpendingDistribution();
        this.renderTopFans();
        this.renderAudienceMap();
    },

    renderFanSegments() {
        const container = document.getElementById('fan-segments-chart');
        const data = ArtistDashboardData.audience.segments;
        const total = data.reduce((sum, d) => sum + d.count, 0);

        let legendHtml = data.map(d => `
            <div class="donut-legend-item">
                <div class="donut-legend-left">
                    <span class="donut-legend-color" style="background: ${d.color};"></span>
                    <span>${d.name}</span>
                </div>
                <span>${d.percent}%</span>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="donut-chart">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    ${this.createDonutSegments(data.map(d => ({ ...d, percent: d.percent })))}
                </svg>
                <div class="donut-center">
                    <span class="donut-value">${ArtistDashboardData.formatNumber(total)}</span>
                    <span class="donut-label">Customers</span>
                </div>
            </div>
            <div class="donut-legend">${legendHtml}</div>
        `;
    },

    renderSpendingDistribution() {
        const container = document.getElementById('spending-chart');
        const data = ArtistDashboardData.audience.spendingDistribution;
        const maxPercent = Math.max(...data.map(d => d.percent));

        let barsHtml = data.map(d => {
            const height = (d.percent / maxPercent) * 100;
            return `
                <div class="bar" style="height: ${height}%;" title="${d.count.toLocaleString()} customers">
                    <span class="bar-value">${d.percent}%</span>
                    <span class="bar-label">${d.range}</span>
                </div>
            `;
        }).join('');

        container.innerHTML = `<div class="bar-chart">${barsHtml}</div>`;
    },

    renderTopFans() {
        const container = document.getElementById('top-fans-table');
        const fans = ArtistDashboardData.audience.topFans;

        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Fan</th>
                        <th>Location</th>
                        <th>Total Spend</th>
                        <th>Purchases</th>
                        <th>Streams</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${fans.map(fan => `
                        <tr class="fan-row">
                            <td>
                                <div class="fan-cell">
                                    <img src="${fan.avatar}" alt="${fan.name}" class="fan-avatar">
                                    <span>${fan.name}</span>
                                </div>
                            </td>
                            <td>${fan.location}</td>
                            <td><strong>${ArtistDashboardData.formatCurrency(fan.totalSpend)}</strong></td>
                            <td>${fan.purchases}</td>
                            <td>${ArtistDashboardData.formatNumber(fan.streams)}</td>
                            <td><span class="fan-badge ${fan.badge}">${fan.badge === 'superfan' ? 'Superfan' : 'Regular'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderAudienceMap() {
        const container = document.getElementById('audience-map');
        const regions = ArtistDashboardData.audience.byRegion;

        container.innerHTML = `
            <div class="map-regions">
                ${regions.map(region => `
                    <div class="map-region">
                        <div class="map-region-name">${region.region}</div>
                        <div class="map-region-value">${ArtistDashboardData.formatNumber(region.fans)}</div>
                        <div class="map-region-percent">${region.percent}% of fans</div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // ===================
    // SONGS SECTION
    // ===================
    renderSongs(sortBy = 'streams') {
        const songs = [...ArtistDashboardData.songs].sort((a, b) => {
            if (sortBy === 'streams') return b.streams - a.streams;
            if (sortBy === 'revenue') return b.revenue - a.revenue;
            if (sortBy === 'saves') return b.saves - a.saves;
            return new Date(b.releaseDate) - new Date(a.releaseDate);
        });

        // Render comparison selector
        this.renderComparisonSelector('song', songs);

        // Render comparison chart
        this.renderSongsComparisonChart(songs.slice(0, 3));

        // Render song grid
        const grid = document.getElementById('songs-grid');
        grid.innerHTML = songs.map(song => `
            <div class="content-card" onclick="ArtistDashboard.openDetailPanel('song', '${song.id}')">
                <div class="content-card-cover" style="background: ${song.coverGradient};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="5.5" cy="17.5" r="2.5"></circle>
                        <circle cx="17.5" cy="15.5" r="2.5"></circle>
                        <path d="M8 17V5l12-2v12"></path>
                    </svg>
                    <span class="content-card-badge">${song.duration}</span>
                </div>
                <div class="content-card-info">
                    <h4 class="content-card-title">${song.title}</h4>
                    <p class="content-card-subtitle">${song.album}</p>
                    <div class="content-card-stats">
                        <div class="content-stat">
                            <span class="content-stat-value">${ArtistDashboardData.formatNumber(song.streams)}</span>
                            <span class="content-stat-label">Streams</span>
                        </div>
                        <div class="content-stat">
                            <span class="content-stat-value">${ArtistDashboardData.formatCurrency(song.revenue)}</span>
                            <span class="content-stat-label">Revenue</span>
                        </div>
                        <div class="content-stat">
                            <span class="content-stat-value">${song.avgCompletion}%</span>
                            <span class="content-stat-label">Completion</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderComparisonSelector(type, items) {
        const container = document.getElementById(`${type}-selector`);
        if (!container) return;

        container.innerHTML = items.slice(0, 5).map((item, i) => `
            <span class="comparison-chip ${i < 3 ? 'selected' : ''}" data-id="${item.id}">
                ${item.title || item.name}
            </span>
        `).join('');

        container.querySelectorAll('.comparison-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('selected');
                const selected = [...container.querySelectorAll('.comparison-chip.selected')]
                    .map(c => items.find(item => item.id === c.dataset.id));
                if (type === 'song') this.renderSongsComparisonChart(selected);
                if (type === 'album') this.renderAlbumsComparisonChart(selected);
                if (type === 'video') this.renderVideosComparisonChart(selected);
            });
        });
    },

    renderSongsComparisonChart(songs) {
        this.renderTimeSeriesChart('songs-comparison-chart', songs, 'songs', 'dailyStreams', 'Streams');
    },

    // Generic time series chart renderer with zoom
    renderTimeSeriesChart(containerId, items, chartType, dataKey, yLabel) {
        const container = document.getElementById(containerId);
        if (!items.length) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Select items to compare</p>';
            return;
        }

        const colors = ['#8b2bff', '#22c55e', '#f59e0b', '#3b82f6', '#ef4444'];
        const zoom = this.chartZoom[chartType];
        const totalDays = items[0][dataKey].length;

        // Get zoomed data
        const zoomedData = items.map(item => ({
            ...item,
            data: item[dataKey].slice(zoom.start, zoom.end)
        }));

        const allValues = zoomedData.flatMap(item => item.data);
        const maxValue = Math.max(...allValues);
        const minValue = Math.min(...allValues);
        const valueRange = maxValue - minValue || 1;

        // Chart dimensions - use pixel-based viewBox for proper scaling
        const svgWidth = 800;
        const svgHeight = 300;
        const paddingLeft = 50;
        const paddingRight = 20;
        const paddingTop = 20;
        const paddingBottom = 40;
        const graphWidth = svgWidth - paddingLeft - paddingRight;
        const graphHeight = svgHeight - paddingTop - paddingBottom;

        // Generate Y-axis labels (5 ticks)
        const yTicks = 5;
        const yLabels = [];
        for (let i = 0; i <= yTicks; i++) {
            const value = minValue + (valueRange * (yTicks - i) / yTicks);
            yLabels.push({
                value: ArtistDashboardData.formatNumber(Math.round(value)),
                y: paddingTop + (graphHeight * i / yTicks)
            });
        }

        // Generate X-axis labels
        const visibleDays = zoom.end - zoom.start;
        const xLabelInterval = Math.max(1, Math.floor(visibleDays / 7));
        const xLabels = [];
        for (let i = 0; i < visibleDays; i += xLabelInterval) {
            const dayNum = zoom.start + i + 1;
            const xPos = visibleDays > 1 ? (i / (visibleDays - 1)) * graphWidth : graphWidth / 2;
            xLabels.push({
                label: `Day ${dayNum}`,
                x: paddingLeft + xPos,
                xPercent: ((paddingLeft + xPos) / svgWidth) * 100
            });
        }

        // Generate SVG paths for each item
        const paths = zoomedData.map((item, itemIndex) => {
            const points = item.data.map((value, i) => {
                const xPos = item.data.length > 1 ? (i / (item.data.length - 1)) * graphWidth : graphWidth / 2;
                const x = paddingLeft + xPos;
                const y = paddingTop + graphHeight - ((value - minValue) / valueRange * graphHeight);
                return `${x},${y}`;
            });
            return {
                path: `M${points.join(' L')}`,
                color: colors[itemIndex],
                name: item.title || item.name
            };
        });

        // Calculate zoom slider position
        const sliderStart = (zoom.start / totalDays) * 100;
        const sliderWidth = ((zoom.end - zoom.start) / totalDays) * 100;

        container.innerHTML = `
            <div class="time-series-chart">
                <svg viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" class="chart-svg">
                    <defs>
                        ${paths.map((p, i) => `
                            <linearGradient id="gradient-${chartType}-${i}" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${p.color};stop-opacity:0.3" />
                                <stop offset="100%" style="stop-color:${p.color};stop-opacity:0" />
                            </linearGradient>
                        `).join('')}
                    </defs>

                    <!-- Grid lines -->
                    ${yLabels.map(tick => `
                        <line x1="${paddingLeft}" y1="${tick.y}" x2="${svgWidth - paddingRight}" y2="${tick.y}"
                              stroke="#2a2a2a" stroke-width="1" stroke-dasharray="4,4"/>
                    `).join('')}

                    <!-- Y-axis labels inside SVG -->
                    ${yLabels.map(tick => `
                        <text x="${paddingLeft - 8}" y="${tick.y + 4}" text-anchor="end" fill="#a0a0a0" font-size="11">${tick.value}</text>
                    `).join('')}

                    <!-- X-axis labels inside SVG -->
                    ${xLabels.map(tick => `
                        <text x="${tick.x}" y="${svgHeight - 10}" text-anchor="middle" fill="#a0a0a0" font-size="10">${tick.label}</text>
                    `).join('')}

                    <!-- Area fills -->
                    ${paths.map((p, i) => {
                        const firstX = paddingLeft;
                        const lastX = svgWidth - paddingRight;
                        const bottomY = paddingTop + graphHeight;
                        return `<path d="${p.path} L${lastX},${bottomY} L${firstX},${bottomY} Z"
                                      fill="url(#gradient-${chartType}-${i})" />`;
                    }).join('')}

                    <!-- Lines -->
                    ${paths.map(p => `
                        <path d="${p.path}" fill="none" stroke="${p.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    `).join('')}

                    <!-- Data points -->
                    ${zoomedData.flatMap((item, itemIndex) =>
                        item.data.map((value, i) => {
                            const xPos = item.data.length > 1 ? (i / (item.data.length - 1)) * graphWidth : graphWidth / 2;
                            const x = paddingLeft + xPos;
                            const y = paddingTop + graphHeight - ((value - minValue) / valueRange * graphHeight);
                            return `<circle cx="${x}" cy="${y}" r="5" fill="${colors[itemIndex]}" class="data-point"
                                           data-value="${value.toLocaleString()}" data-name="${item.title || item.name}" style="cursor: pointer;"/>`;
                        })
                    ).join('')}

                    <!-- Y-axis title -->
                    <text x="15" y="${svgHeight / 2}" text-anchor="middle" fill="#a0a0a0" font-size="12" font-weight="600" transform="rotate(-90, 15, ${svgHeight / 2})">${yLabel}</text>
                </svg>

                <!-- Zoom controls -->
                <div class="chart-zoom-controls">
                    <span class="zoom-label">Zoom:</span>
                    <div class="zoom-slider-container">
                        <div class="zoom-slider-track"></div>
                        <div class="zoom-slider-range" style="left: ${sliderStart}%; width: ${sliderWidth}%;"
                             data-chart="${chartType}"></div>
                    </div>
                    <div class="zoom-buttons">
                        <button class="zoom-btn" onclick="ArtistDashboard.zoomChart('${chartType}', 'in')" title="Zoom In">+</button>
                        <button class="zoom-btn" onclick="ArtistDashboard.zoomChart('${chartType}', 'out')" title="Zoom Out">−</button>
                        <button class="zoom-btn" onclick="ArtistDashboard.zoomChart('${chartType}', 'reset')" title="Reset">↺</button>
                    </div>
                </div>

                <!-- Legend -->
                <div class="chart-legend-bottom">
                    ${paths.map((p, i) => `
                        <div class="legend-item">
                            <span class="legend-dot" style="background: ${p.color};"></span>
                            <span class="legend-text">${p.name}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Tooltip -->
                <div class="chart-tooltip" id="tooltip-${chartType}"></div>
            </div>
        `;

        // Setup hover interactions
        this.setupChartInteractions(containerId, chartType);
    },

    setupChartInteractions(containerId, chartType) {
        const container = document.getElementById(containerId);
        const tooltip = container.querySelector(`#tooltip-${chartType}`);
        const dataPoints = container.querySelectorAll('.data-point');

        dataPoints.forEach(point => {
            point.addEventListener('mouseenter', (e) => {
                const value = point.dataset.value;
                const name = point.dataset.name;
                tooltip.innerHTML = `<strong>${name}</strong><br>${value}`;
                tooltip.style.opacity = '1';

                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                tooltip.style.left = `${x + 10}px`;
                tooltip.style.top = `${y - 30}px`;
            });

            point.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        });

        // Setup zoom slider drag
        const sliderRange = container.querySelector('.zoom-slider-range');
        if (sliderRange) {
            this.setupZoomSliderDrag(sliderRange, chartType);
        }
    },

    setupZoomSliderDrag(sliderRange, chartType) {
        let isDragging = false;
        let startX = 0;
        let startLeft = 0;

        sliderRange.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startLeft = parseFloat(sliderRange.style.left);
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const container = sliderRange.closest('.zoom-slider-container');
            const containerWidth = container.offsetWidth;
            const deltaX = e.clientX - startX;
            const deltaPercent = (deltaX / containerWidth) * 100;

            const currentWidth = parseFloat(sliderRange.style.width);
            let newLeft = startLeft + deltaPercent;

            // Constrain to bounds
            newLeft = Math.max(0, Math.min(100 - currentWidth, newLeft));
            sliderRange.style.left = `${newLeft}%`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;

            // Update chart zoom based on slider position
            const left = parseFloat(sliderRange.style.left);
            const width = parseFloat(sliderRange.style.width);
            const totalDays = 30;

            this.chartZoom[chartType] = {
                start: Math.round((left / 100) * totalDays),
                end: Math.round(((left + width) / 100) * totalDays)
            };

            // Re-render the appropriate chart
            this.refreshComparisonChart(chartType);
        });
    },

    zoomChart(chartType, action) {
        const zoom = this.chartZoom[chartType];
        const totalDays = 30;
        const currentRange = zoom.end - zoom.start;
        const center = (zoom.start + zoom.end) / 2;

        if (action === 'in' && currentRange > 5) {
            const newRange = Math.max(5, currentRange - 5);
            zoom.start = Math.max(0, Math.round(center - newRange / 2));
            zoom.end = Math.min(totalDays, zoom.start + newRange);
        } else if (action === 'out' && currentRange < totalDays) {
            const newRange = Math.min(totalDays, currentRange + 5);
            zoom.start = Math.max(0, Math.round(center - newRange / 2));
            zoom.end = Math.min(totalDays, zoom.start + newRange);
            if (zoom.end === totalDays) zoom.start = totalDays - newRange;
            if (zoom.start === 0) zoom.end = newRange;
        } else if (action === 'reset') {
            zoom.start = 0;
            zoom.end = totalDays;
        }

        this.refreshComparisonChart(chartType);
    },

    refreshComparisonChart(chartType) {
        if (chartType === 'songs') {
            const container = document.getElementById('song-selector');
            const selected = [...container.querySelectorAll('.comparison-chip.selected')]
                .map(c => ArtistDashboardData.songs.find(s => s.id === c.dataset.id))
                .filter(Boolean);
            this.renderSongsComparisonChart(selected);
        } else if (chartType === 'albums') {
            const container = document.getElementById('album-selector');
            const selected = [...container.querySelectorAll('.comparison-chip.selected')]
                .map(c => ArtistDashboardData.albums.find(a => a.id === c.dataset.id))
                .filter(Boolean);
            this.renderAlbumsComparisonChart(selected);
        } else if (chartType === 'videos') {
            const container = document.getElementById('video-selector');
            const selected = [...container.querySelectorAll('.comparison-chip.selected')]
                .map(c => ArtistDashboardData.videos.find(v => v.id === c.dataset.id))
                .filter(Boolean);
            this.renderVideosComparisonChart(selected);
        }
    },

    // ===================
    // ALBUMS SECTION
    // ===================
    renderAlbums(sortBy = 'streams') {
        const albums = [...ArtistDashboardData.albums].sort((a, b) => {
            if (sortBy === 'streams') return b.totalStreams - a.totalStreams;
            if (sortBy === 'revenue') return b.revenue - a.revenue;
            return new Date(b.releaseDate) - new Date(a.releaseDate);
        });

        this.renderComparisonSelector('album', albums);
        this.renderAlbumsComparisonChart(albums);

        const grid = document.getElementById('albums-grid');
        grid.innerHTML = albums.map(album => `
            <div class="content-card" onclick="ArtistDashboard.openDetailPanel('album', '${album.id}')">
                <div class="content-card-cover" style="background: ${album.coverGradient};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span class="content-card-badge">${album.trackCount} tracks</span>
                </div>
                <div class="content-card-info">
                    <h4 class="content-card-title">${album.title}</h4>
                    <p class="content-card-subtitle">Released ${new Date(album.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <div class="content-card-stats">
                        <div class="content-stat">
                            <span class="content-stat-value">${ArtistDashboardData.formatNumber(album.totalStreams)}</span>
                            <span class="content-stat-label">Streams</span>
                        </div>
                        <div class="content-stat">
                            <span class="content-stat-value">${ArtistDashboardData.formatCurrency(album.revenue)}</span>
                            <span class="content-stat-label">Revenue</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderAlbumsComparisonChart(albums) {
        this.renderTimeSeriesChart('albums-comparison-chart', albums, 'albums', 'dailyStreams', 'Streams');
    },

    // ===================
    // VIDEOS SECTION
    // ===================
    renderVideos(sortBy = 'views') {
        const videos = [...ArtistDashboardData.videos].sort((a, b) => {
            if (sortBy === 'views') return b.views - a.views;
            if (sortBy === 'revenue') return b.revenue - a.revenue;
            if (sortBy === 'engagement') return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares);
            return new Date(b.releaseDate) - new Date(a.releaseDate);
        });

        // Video stats
        document.getElementById('total-views').textContent = ArtistDashboardData.formatNumber(ArtistDashboardData.getTotalVideoViews());
        document.getElementById('total-watch-time').textContent = ArtistDashboardData.formatDuration(ArtistDashboardData.getTotalWatchTime());
        document.getElementById('avg-retention').textContent = ArtistDashboardData.getAvgVideoRetention().toFixed(1) + '%';
        document.getElementById('video-revenue').textContent = ArtistDashboardData.formatCurrency(ArtistDashboardData.getTotalVideoRevenue());

        this.renderComparisonSelector('video', videos);
        this.renderVideosComparisonChart(videos.slice(0, 3));

        const grid = document.getElementById('videos-grid');
        grid.innerHTML = videos.map(video => `
            <div class="content-card" onclick="ArtistDashboard.openDetailPanel('video', '${video.id}')">
                <div class="content-card-cover" style="background: ${video.coverGradient};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <span class="content-card-badge">${video.duration}</span>
                </div>
                <div class="content-card-info">
                    <h4 class="content-card-title">${video.title}</h4>
                    <p class="content-card-subtitle">${new Date(video.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <div class="content-card-stats">
                        <div class="content-stat">
                            <span class="content-stat-value">${ArtistDashboardData.formatNumber(video.views)}</span>
                            <span class="content-stat-label">Views</span>
                        </div>
                        <div class="content-stat">
                            <span class="content-stat-value">${video.avgRetention}%</span>
                            <span class="content-stat-label">Retention</span>
                        </div>
                        <div class="content-stat">
                            <span class="content-stat-value">${ArtistDashboardData.formatCurrency(video.revenue)}</span>
                            <span class="content-stat-label">Revenue</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderVideosComparisonChart(videos) {
        this.renderTimeSeriesChart('videos-comparison-chart', videos, 'videos', 'dailyViews', 'Views');
    },

    // ===================
    // MERCHANDISE SECTION
    // ===================
    renderMerch(sortBy = 'units') {
        const merch = [...ArtistDashboardData.merchandise].sort((a, b) => {
            if (sortBy === 'units') return b.unitsSold - a.unitsSold;
            if (sortBy === 'revenue') return b.revenue - a.revenue;
            return 0;
        });

        // Stats
        document.getElementById('merch-total-revenue').textContent = ArtistDashboardData.formatCurrency(ArtistDashboardData.getTotalMerchRevenue());
        document.getElementById('merch-total-units').textContent = ArtistDashboardData.getTotalMerchUnits().toLocaleString();
        document.getElementById('merch-avg-order').textContent = ArtistDashboardData.formatCurrency(ArtistDashboardData.getAvgOrderValue());
        document.getElementById('merch-top-item').textContent = ArtistDashboardData.getBestSellingMerch().name;

        // Timeline chart
        this.renderMerchTimeline();

        // Category chart
        this.renderMerchCategoryChart();

        // Geography
        this.renderMerchGeography();

        // Grid
        const grid = document.getElementById('merch-grid');
        grid.innerHTML = merch.map(item => `
            <div class="content-card" onclick="ArtistDashboard.openDetailPanel('merch', '${item.id}')">
                <div class="content-card-cover" style="background: ${item.coverGradient};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span class="content-card-badge">${item.category}</span>
                </div>
                <div class="content-card-info">
                    <h4 class="content-card-title">${item.name}</h4>
                    <p class="content-card-subtitle">${ArtistDashboardData.formatCurrency(item.price)} • ${item.inStock} in stock</p>
                    <div class="content-card-stats">
                        <div class="content-stat">
                            <span class="content-stat-value">${item.unitsSold.toLocaleString()}</span>
                            <span class="content-stat-label">Units Sold</span>
                        </div>
                        <div class="content-stat">
                            <span class="content-stat-value">${ArtistDashboardData.formatCurrency(item.revenue)}</span>
                            <span class="content-stat-label">Revenue</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderMerchTimeline() {
        const container = document.getElementById('merch-timeline-chart');
        // Aggregate daily sales from all merchandise
        const dailySales = ArtistDashboardData.merchandise[0].dailySales.map((_, i) => {
            return ArtistDashboardData.merchandise.reduce((sum, item) => sum + item.dailySales[i], 0);
        });

        const maxValue = Math.max(...dailySales);

        let barsHtml = dailySales.map((value, i) => {
            const height = (value / maxValue) * 100;
            return `
                <div class="bar" style="height: ${height}%;" title="${value} units">
                    <span class="bar-value">${value}</span>
                    ${i % 5 === 0 ? `<span class="bar-label">Day ${i + 1}</span>` : ''}
                </div>
            `;
        }).join('');

        container.innerHTML = `<div class="bar-chart">${barsHtml}</div>`;
    },

    renderMerchCategoryChart() {
        const container = document.getElementById('merch-category-chart');
        const categories = {};

        ArtistDashboardData.merchandise.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = { revenue: 0, units: 0 };
            }
            categories[item.category].revenue += item.revenue;
            categories[item.category].units += item.unitsSold;
        });

        const data = Object.entries(categories).map(([name, data]) => ({
            name,
            revenue: data.revenue,
            units: data.units
        }));

        const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
        const colors = ['#8b2bff', '#22c55e', '#f59e0b'];

        let legendHtml = data.map((d, i) => `
            <div class="donut-legend-item">
                <div class="donut-legend-left">
                    <span class="donut-legend-color" style="background: ${colors[i]};"></span>
                    <span>${d.name}</span>
                </div>
                <span>${ArtistDashboardData.formatCurrency(d.revenue)}</span>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="donut-chart">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    ${this.createDonutSegments(data.map((d, i) => ({
                        percent: (d.revenue / totalRevenue) * 100,
                        color: colors[i]
                    })))}
                </svg>
                <div class="donut-center">
                    <span class="donut-value">${ArtistDashboardData.formatCurrency(totalRevenue)}</span>
                    <span class="donut-label">Total</span>
                </div>
            </div>
            <div class="donut-legend">${legendHtml}</div>
        `;
    },

    renderMerchGeography() {
        const container = document.getElementById('merch-geography');
        // Aggregate geography data
        const regions = {};

        ArtistDashboardData.merchandise.forEach(item => {
            item.salesByRegion.forEach(r => {
                if (!regions[r.region]) {
                    regions[r.region] = 0;
                }
                regions[r.region] += r.units;
            });
        });

        const data = Object.entries(regions)
            .map(([region, units]) => ({ region, units }))
            .sort((a, b) => b.units - a.units);

        const maxUnits = Math.max(...data.map(d => d.units));
        const flags = {
            'United States': '🇺🇸',
            'United Kingdom': '🇬🇧',
            'Canada': '🇨🇦',
            'Germany': '🇩🇪',
            'Japan': '🇯🇵',
            'Australia': '🇦🇺',
            'Other': '🌍'
        };

        container.innerHTML = data.map(d => {
            const metros = this.getMetrosForCountry(d.region);
            const hasMetros = metros && metros.length > 0;
            const isExpanded = this.expandedMerchCountry === d.region;
            const totalUnits = d.units;

            return `
                <div class="geography-wrapper">
                    <div class="geography-item ${hasMetros ? 'expandable' : ''} ${isExpanded ? 'expanded' : ''}"
                         ${hasMetros ? `onclick="ArtistDashboard.toggleMerchCountryExpand('${d.region}')"` : ''}>
                        <span class="geography-flag">${flags[d.region] || '🌍'}</span>
                        <div class="geography-info">
                            <span class="geography-name">
                                ${d.region}
                                ${hasMetros ? `<span class="expand-icon">${isExpanded ? '▼' : '▶'}</span>` : ''}
                            </span>
                            <div class="geography-bar-container">
                                <div class="geography-bar" style="width: ${(d.units / maxUnits) * 100}%;"></div>
                            </div>
                        </div>
                        <span class="geography-value">${d.units.toLocaleString()} units</span>
                    </div>
                    ${isExpanded && hasMetros ? `
                        <div class="metro-breakdown">
                            ${metros.slice(0, 5).map(metro => {
                                const metroUnits = Math.round(totalUnits * metro.percent / 100);
                                return `
                                    <div class="geography-item metro-item">
                                        <span class="geography-flag metro-marker">•</span>
                                        <div class="geography-info">
                                            <span class="geography-name">${metro.city}</span>
                                            <div class="geography-bar-container">
                                                <div class="geography-bar metro" style="width: ${metro.percent}%;"></div>
                                            </div>
                                        </div>
                                        <span class="geography-value">${metroUnits.toLocaleString()} units</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    toggleMerchCountryExpand(country) {
        if (this.expandedMerchCountry === country) {
            this.expandedMerchCountry = null;
        } else {
            this.expandedMerchCountry = country;
        }
        this.renderMerchGeography();
    },

    // ===================
    // DETAIL PANELS
    // ===================
    renderDetailPanel(type, id) {
        const titleContainer = document.getElementById(`${type}-detail-title`);
        const contentContainer = document.getElementById(`${type}-detail-content`);

        if (type === 'song') {
            const song = ArtistDashboardData.songs.find(s => s.id === id);
            if (!song) return;

            titleContainer.innerHTML = `
                <h2>${song.title}</h2>
                <p>${song.album} • ${song.duration}</p>
            `;

            contentContainer.innerHTML = `
                <div class="detail-kpis">
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatNumber(song.streams)}</span>
                        <span class="detail-kpi-label">Total Streams</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatCurrency(song.revenue)}</span>
                        <span class="detail-kpi-label">Revenue</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatNumber(song.saves)}</span>
                        <span class="detail-kpi-label">Saves</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${song.avgCompletion}%</span>
                        <span class="detail-kpi-label">Avg Completion</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Performance Metrics</h4>
                    <div class="detail-list">
                        <div class="detail-list-item">
                            <span class="detail-list-label">Skip Rate</span>
                            <span class="detail-list-value">${song.skipRate}%</span>
                        </div>
                        <div class="detail-list-item">
                            <span class="detail-list-label">Playlist Adds</span>
                            <span class="detail-list-value">${song.playlists.toLocaleString()}</span>
                        </div>
                        <div class="detail-list-item">
                            <span class="detail-list-label">Release Date</span>
                            <span class="detail-list-value">${new Date(song.releaseDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Streams by Region</h4>
                    <div class="detail-geography-list" id="song-detail-geography">
                        ${this.renderDetailGeography(song.streamsByRegion, 'streams', song.streams)}
                    </div>
                </div>
            `;

            this.currentDetailType = 'song';
            this.currentDetailId = id;
        }

        if (type === 'album') {
            const album = ArtistDashboardData.albums.find(a => a.id === id);
            if (!album) return;

            titleContainer.innerHTML = `
                <h2>${album.title}</h2>
                <p>${album.trackCount} tracks • Released ${new Date(album.releaseDate).toLocaleDateString()}</p>
            `;

            contentContainer.innerHTML = `
                <div class="detail-kpis">
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatNumber(album.totalStreams)}</span>
                        <span class="detail-kpi-label">Total Streams</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatCurrency(album.revenue)}</span>
                        <span class="detail-kpi-label">Revenue</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatNumber(album.saves)}</span>
                        <span class="detail-kpi-label">Saves</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${album.avgCompletion}%</span>
                        <span class="detail-kpi-label">Avg Completion</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Sales by Region</h4>
                    <div class="detail-list">
                        ${album.salesByRegion.map(r => `
                            <div class="detail-list-item">
                                <span class="detail-list-label">${r.region}</span>
                                <span class="detail-list-value">${r.sales.toLocaleString()} (${r.percent}%)</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (type === 'video') {
            const video = ArtistDashboardData.videos.find(v => v.id === id);
            if (!video) return;

            titleContainer.innerHTML = `
                <h2>${video.title}</h2>
                <p>${video.duration} • ${new Date(video.releaseDate).toLocaleDateString()}</p>
            `;

            contentContainer.innerHTML = `
                <div class="detail-kpis">
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatNumber(video.views)}</span>
                        <span class="detail-kpi-label">Views</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatCurrency(video.revenue)}</span>
                        <span class="detail-kpi-label">Revenue</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${video.avgRetention}%</span>
                        <span class="detail-kpi-label">Retention</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatDuration ? ArtistDashboardData.formatDuration(video.watchTime) : Math.floor(video.watchTime / 3600) + 'h'}</span>
                        <span class="detail-kpi-label">Watch Time</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Engagement</h4>
                    <div class="detail-list">
                        <div class="detail-list-item">
                            <span class="detail-list-label">Likes</span>
                            <span class="detail-list-value">${video.likes.toLocaleString()}</span>
                        </div>
                        <div class="detail-list-item">
                            <span class="detail-list-label">Comments</span>
                            <span class="detail-list-value">${video.comments.toLocaleString()}</span>
                        </div>
                        <div class="detail-list-item">
                            <span class="detail-list-label">Shares</span>
                            <span class="detail-list-value">${video.shares.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Views by Region</h4>
                    <div class="detail-geography-list" id="video-detail-geography">
                        ${this.renderDetailGeography(video.viewsByRegion, 'views', video.views)}
                    </div>
                </div>
            `;

            this.currentDetailType = 'video';
            this.currentDetailId = id;
        }

        if (type === 'merch') {
            const item = ArtistDashboardData.merchandise.find(m => m.id === id);
            if (!item) return;

            titleContainer.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.category} • ${ArtistDashboardData.formatCurrency(item.price)}</p>
            `;

            contentContainer.innerHTML = `
                <div class="detail-kpis">
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${item.unitsSold.toLocaleString()}</span>
                        <span class="detail-kpi-label">Units Sold</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatCurrency(item.revenue)}</span>
                        <span class="detail-kpi-label">Revenue</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${ArtistDashboardData.formatCurrency(item.profit)}</span>
                        <span class="detail-kpi-label">Profit</span>
                    </div>
                    <div class="detail-kpi">
                        <span class="detail-kpi-value">${item.inStock}</span>
                        <span class="detail-kpi-label">In Stock</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Pricing</h4>
                    <div class="detail-list">
                        <div class="detail-list-item">
                            <span class="detail-list-label">Retail Price</span>
                            <span class="detail-list-value">${ArtistDashboardData.formatCurrency(item.price)}</span>
                        </div>
                        <div class="detail-list-item">
                            <span class="detail-list-label">Cost</span>
                            <span class="detail-list-value">${ArtistDashboardData.formatCurrency(item.cost)}</span>
                        </div>
                        <div class="detail-list-item">
                            <span class="detail-list-label">Margin</span>
                            <span class="detail-list-value">${(((item.price - item.cost) / item.price) * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                ${item.salesBySize ? `
                <div class="detail-section">
                    <h4>Sales by Size</h4>
                    <div class="detail-list">
                        ${item.salesBySize.map(s => `
                            <div class="detail-list-item">
                                <span class="detail-list-label">${s.size}</span>
                                <span class="detail-list-value">${s.units} (${s.percent}%)</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <div class="detail-section">
                    <h4>Sales by Region</h4>
                    <div class="detail-geography-list" id="merch-detail-geography">
                        ${this.renderDetailGeography(item.salesByRegion.map(r => ({
                            region: r.region,
                            units: r.units,
                            percent: r.percent
                        })), 'units', item.unitsSold)}
                    </div>
                </div>
            `;

            this.currentDetailType = 'merch';
            this.currentDetailId = id;
        }
    },

    // Render expandable geography list for detail panels
    renderDetailGeography(regions, valueKey, total) {
        const flags = {
            'United States': '🇺🇸',
            'United Kingdom': '🇬🇧',
            'Canada': '🇨🇦',
            'Germany': '🇩🇪',
            'Japan': '🇯🇵',
            'Australia': '🇦🇺',
            'France': '🇫🇷',
            'Brazil': '🇧🇷',
            'Other': '🌍'
        };

        return regions.map(r => {
            const metros = this.getMetrosForCountry(r.region);
            const hasMetros = metros && metros.length > 0;
            const isExpanded = this.expandedDetailCountry === r.region;
            const value = r[valueKey] || r.streams || r.views || r.units || 0;

            return `
                <div class="detail-region-wrapper">
                    <div class="detail-list-item ${hasMetros ? 'expandable' : ''} ${isExpanded ? 'expanded' : ''}"
                         ${hasMetros ? `onclick="ArtistDashboard.toggleDetailCountryExpand('${r.region}')"` : ''}>
                        <span class="detail-list-label">
                            ${flags[r.region] || '🌍'} ${r.region}
                            ${hasMetros ? `<span class="expand-icon">${isExpanded ? '▼' : '▶'}</span>` : ''}
                        </span>
                        <span class="detail-list-value">${ArtistDashboardData.formatNumber(value)} (${r.percent}%)</span>
                    </div>
                    ${isExpanded && hasMetros ? `
                        <div class="metro-breakdown compact">
                            ${metros.slice(0, 5).map(metro => {
                                const metroValue = Math.round(value * metro.percent / 100);
                                return `
                                    <div class="metro-item-compact">
                                        <span class="metro-marker">•</span>
                                        <span class="metro-name">${metro.city}</span>
                                        <span class="metro-value">${ArtistDashboardData.formatNumber(metroValue)}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    toggleDetailCountryExpand(country) {
        if (this.expandedDetailCountry === country) {
            this.expandedDetailCountry = null;
        } else {
            this.expandedDetailCountry = country;
        }
        // Re-render the current detail panel's geography section
        this.refreshDetailGeography();
    },

    refreshDetailGeography() {
        if (!this.currentDetailType || !this.currentDetailId) return;

        let containerId, data, valueKey, total;

        if (this.currentDetailType === 'song') {
            const song = ArtistDashboardData.songs.find(s => s.id === this.currentDetailId);
            if (!song) return;
            containerId = 'song-detail-geography';
            data = song.streamsByRegion;
            valueKey = 'streams';
            total = song.streams;
        } else if (this.currentDetailType === 'video') {
            const video = ArtistDashboardData.videos.find(v => v.id === this.currentDetailId);
            if (!video) return;
            containerId = 'video-detail-geography';
            data = video.viewsByRegion;
            valueKey = 'views';
            total = video.views;
        } else if (this.currentDetailType === 'merch') {
            const item = ArtistDashboardData.merchandise.find(m => m.id === this.currentDetailId);
            if (!item) return;
            containerId = 'merch-detail-geography';
            data = item.salesByRegion.map(r => ({
                region: r.region,
                units: r.units,
                percent: r.percent
            }));
            valueKey = 'units';
            total = item.unitsSold;
        }

        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.renderDetailGeography(data, valueKey, total);
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ArtistDashboard.init();
});
