var DemoApp = (function () {
    'use strict';

    var demoAffiliates = [
        { name: 'Jane Cooper', email: 'jane@example.com', code: 'JANE2024X', tier: 'gold', status: 'active', earned: 18450.00, paid: 14219.50, verified: true },
        { name: 'Marcus Chen', email: 'marcus@example.com', code: 'MCHEN777', tier: 'platinum', status: 'active', earned: 34200.00, paid: 28000.00, verified: true },
        { name: 'Sarah Williams', email: 'sarah@example.com', code: 'SWILL99P', tier: 'silver', status: 'active', earned: 5620.00, paid: 4000.00, verified: true },
        { name: 'David Park', email: 'david@example.com', code: 'DPARK42K', tier: 'diamond', status: 'active', earned: 67800.00, paid: 60000.00, verified: true },
        { name: 'Emily Ross', email: 'emily@example.com', code: 'EROSS321', tier: 'bronze', status: 'active', earned: 1240.00, paid: 800.00, verified: false },
        { name: 'James Liu', email: 'james@example.com', code: 'JLIU5588', tier: 'gold', status: 'active', earned: 22100.00, paid: 19000.00, verified: true },
        { name: 'Olivia Torres', email: 'olivia@example.com', code: 'OTOR2024', tier: 'silver', status: 'suspended', earned: 8900.00, paid: 7500.00, verified: true },
        { name: 'Alex Kim', email: 'alex@example.com', code: 'AKIM0077', tier: 'bronze', status: 'pending', earned: 320.00, paid: 0, verified: false },
    ];

    var demoConversions = [
        { orderId: 'ORD-78234', affiliate: 'Jane Cooper', code: 'JANE2024X', revenue: 299.00, commission: 59.80, tier: 'gold', status: 'approved', date: '2026-04-05' },
        { orderId: 'ORD-78190', affiliate: 'Marcus Chen', code: 'MCHEN777', revenue: 1499.00, commission: 374.75, tier: 'platinum', status: 'approved', date: '2026-04-05' },
        { orderId: 'ORD-78156', affiliate: 'David Park', code: 'DPARK42K', revenue: 849.00, commission: 254.70, tier: 'diamond', status: 'pending', date: '2026-04-04' },
        { orderId: 'ORD-78099', affiliate: 'Sarah Williams', code: 'SWILL99P', revenue: 149.00, commission: 22.35, tier: 'silver', status: 'approved', date: '2026-04-04' },
        { orderId: 'ORD-78045', affiliate: 'Jane Cooper', code: 'JANE2024X', revenue: 599.00, commission: 119.80, tier: 'gold', status: 'pending', date: '2026-04-03' },
        { orderId: 'ORD-77998', affiliate: 'Emily Ross', code: 'EROSS321', revenue: 79.00, commission: 7.90, tier: 'bronze', status: 'rejected', date: '2026-04-03' },
        { orderId: 'ORD-77920', affiliate: 'James Liu', code: 'JLIU5588', revenue: 449.00, commission: 89.80, tier: 'gold', status: 'approved', date: '2026-04-02' },
        { orderId: 'ORD-77885', affiliate: 'Marcus Chen', code: 'MCHEN777', revenue: 2199.00, commission: 549.75, tier: 'platinum', status: 'paid', date: '2026-04-01' },
    ];

    var demoPayouts = [
        { affiliate: 'Marcus Chen', code: 'MCHEN777', amount: 5000.00, method: 'Bank Transfer', status: 'completed', confirmed: true, reference: 'TXN-92841', date: '2026-04-03' },
        { affiliate: 'Jane Cooper', code: 'JANE2024X', amount: 2500.00, method: 'PayPal', status: 'processing', confirmed: true, reference: '—', date: '2026-04-04' },
        { affiliate: 'David Park', code: 'DPARK42K', amount: 8000.00, method: 'Cryptocurrency', status: 'pending', confirmed: true, reference: '—', date: '2026-04-05' },
        { affiliate: 'Sarah Williams', code: 'SWILL99P', amount: 1200.00, method: 'PayPal', status: 'pending', confirmed: false, reference: '—', date: '2026-04-05' },
        { affiliate: 'James Liu', code: 'JLIU5588', amount: 3000.00, method: 'Bank Transfer', status: 'completed', confirmed: true, reference: 'TXN-92790', date: '2026-04-01' },
    ];

    var clickIPs = ['192.168.1.42', '10.0.0.88', '172.16.5.12', '203.0.113.55', '198.51.100.7', '185.220.101.3', '91.108.56.120', '45.33.32.156'];
    var referrers = ['google.com/search', 'twitter.com/intent', 'youtube.com/watch', 'reddit.com/r/deals', 'facebook.com/share', null, 'linkedin.com/feed', null];
    var landingPages = ['/products/pro-plan', '/pricing', '/', '/features', '/signup', '/products/starter', '/enterprise', '/demo'];

    function generateDateLabels(days) {
        var labels = [];
        var now = new Date();
        for (var i = days - 1; i >= 0; i--) {
            var d = new Date(now);
            d.setDate(d.getDate() - i);
            labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        return labels;
    }

    function generateRandomSeries(count, min, max) {
        var data = [];
        for (var i = 0; i < count; i++) {
            data.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return data;
    }

    function chartDefaults() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a1a25',
                    borderColor: '#2a2a3a',
                    borderWidth: 1,
                    titleColor: '#f0f0f5',
                    bodyColor: '#9595a8',
                    cornerRadius: 8,
                    padding: 12
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(42, 42, 58, 0.4)', drawBorder: false },
                    ticks: { color: '#65657a', font: { size: 10 } }
                },
                y: {
                    grid: { color: 'rgba(42, 42, 58, 0.4)', drawBorder: false },
                    ticks: { color: '#65657a', font: { size: 11 } },
                    beginAtZero: true
                }
            }
        };
    }

    function populateConversionTable(elementId) {
        var tbody = document.getElementById(elementId);
        if (!tbody) return;
        demoConversions.forEach(function (c) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td class="mono">' + c.orderId + '</td>' +
                '<td>$' + c.revenue.toFixed(2) + '</td>' +
                '<td style="color:var(--accent-green);">$' + c.commission.toFixed(2) + '</td>' +
                '<td><span class="badge badge--' + c.tier + '">' + c.tier.charAt(0).toUpperCase() + c.tier.slice(1) + '</span></td>' +
                '<td><span class="badge badge--' + c.status + '">' + c.status.charAt(0).toUpperCase() + c.status.slice(1) + '</span></td>' +
                '<td>' + c.date + '</td>';
            tbody.appendChild(tr);
        });
    }

    function populateClickTable(elementId) {
        var tbody = document.getElementById(elementId);
        if (!tbody) return;
        for (var i = 0; i < 8; i++) {
            var isUnique = Math.random() > 0.3;
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td class="mono">' + clickIPs[i] + '</td>' +
                '<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (referrers[i] || '—') + '</td>' +
                '<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + landingPages[i] + '</td>' +
                '<td><span class="badge badge--' + (isUnique ? 'approved' : 'pending') + '">' + (isUnique ? 'Yes' : 'No') + '</span></td>' +
                '<td>Apr ' + (7 - Math.floor(i / 3)) + ', ' + (10 + i * 2) + ':' + (15 + i * 7) % 60 + '</td>';
            tbody.appendChild(tr);
        }
    }

    function populateAffiliateTable(elementId) {
        var tbody = document.getElementById(elementId);
        if (!tbody) return;
        demoAffiliates.forEach(function (a) {
            var balance = (a.earned - a.paid).toFixed(2);
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td><div style="font-weight:600;color:var(--text-primary);">' + a.name + '</div><div style="font-size:11px;color:var(--text-muted);">' + a.email + '</div></td>' +
                '<td class="mono">' + a.code + '</td>' +
                '<td><span class="badge badge--' + a.tier + '">' + a.tier.charAt(0).toUpperCase() + a.tier.slice(1) + '</span></td>' +
                '<td><span class="badge badge--' + a.status + '">' + a.status.charAt(0).toUpperCase() + a.status.slice(1) + '</span></td>' +
                '<td>$' + a.earned.toLocaleString(undefined, {minimumFractionDigits: 2}) + '</td>' +
                '<td style="color:var(--accent-green);">$' + parseFloat(balance).toLocaleString(undefined, {minimumFractionDigits: 2}) + '</td>' +
                '<td><span class="badge badge--' + (a.verified ? 'approved' : 'pending') + '">' + (a.verified ? 'Verified' : 'Unverified') + '</span></td>' +
                '<td><span class="btn btn--secondary btn--sm">View</span></td>';
            tbody.appendChild(tr);
        });
    }

    function populatePayoutTable(elementId) {
        var tbody = document.getElementById(elementId);
        if (!tbody) return;
        demoPayouts.forEach(function (p) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td><div style="font-weight:600;color:var(--text-primary);">' + p.affiliate + '</div><div class="mono" style="font-size:11px;color:var(--text-muted);">' + p.code + '</div></td>' +
                '<td style="font-weight:600;">$' + p.amount.toLocaleString(undefined, {minimumFractionDigits: 2}) + '</td>' +
                '<td>' + p.method + '</td>' +
                '<td><span class="badge badge--' + p.status + '">' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</span></td>' +
                '<td><span class="badge badge--' + (p.confirmed ? 'approved' : 'pending') + '">' + (p.confirmed ? 'Yes' : 'No') + '</span></td>' +
                '<td class="mono">' + p.reference + '</td>' +
                '<td>' + p.date + '</td>' +
                '<td>' + (p.status === 'pending' && p.confirmed ? '<span class="btn btn--success btn--sm">Approve</span>' : '<span style="color:var(--text-muted);">—</span>') + '</td>';
            tbody.appendChild(tr);
        });
    }

    function populateAdminConversionTable(elementId) {
        var tbody = document.getElementById(elementId);
        if (!tbody) return;
        demoConversions.forEach(function (c) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td class="mono">' + c.orderId + '</td>' +
                '<td><div style="font-weight:600;color:var(--text-primary);">' + c.affiliate + '</div><div class="mono" style="font-size:11px;color:var(--text-muted);">' + c.code + '</div></td>' +
                '<td>$' + c.revenue.toFixed(2) + '</td>' +
                '<td style="color:var(--accent-green);">$' + c.commission.toFixed(2) + '</td>' +
                '<td><span class="badge badge--' + c.tier + '">' + c.tier.charAt(0).toUpperCase() + c.tier.slice(1) + '</span></td>' +
                '<td><span class="badge badge--' + c.status + '">' + c.status.charAt(0).toUpperCase() + c.status.slice(1) + '</span></td>' +
                '<td>' + c.date + '</td>' +
                '<td>' + (c.status === 'pending' ? '<span class="btn btn--success btn--sm">Approve</span> <span class="btn btn--danger btn--sm">Reject</span>' : '—') + '</td>';
            tbody.appendChild(tr);
        });
    }

    return {
        generateDateLabels: generateDateLabels,
        generateRandomSeries: generateRandomSeries,
        chartDefaults: chartDefaults,
        populateConversionTable: populateConversionTable,
        populateClickTable: populateClickTable,
        populateAffiliateTable: populateAffiliateTable,
        populatePayoutTable: populatePayoutTable,
        populateAdminConversionTable: populateAdminConversionTable,
        affiliates: demoAffiliates,
        conversions: demoConversions,
        payouts: demoPayouts,
    };
})();
