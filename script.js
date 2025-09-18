// Update metrics with mock data (replace with real data from L1 when available)
function updateMetrics() {
    const metrics = {
        totalSupply: '1,250,000 XAUFTH',
        tvl: '$2,500,000',
        activeVaults: '1,247',
        bridgeVolume: '$1,750,000',
        redemptionRate: '98.5%',
        uptime: '99.9%'
    };

    Object.keys(metrics).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = metrics[key];
        }
    });
}

// Simulate real-time updates
function simulateUpdates() {
    setInterval(() => {
        // Random small changes for demo purposes
        const totalSupply = document.getElementById('totalSupply');
        if (totalSupply) {
            const current = parseFloat(totalSupply.textContent.replace(/,/g, ''));
            const change = (Math.random() - 0.5) * 1000;
            totalSupply.textContent = (current + change).toLocaleString() + ' XAUFTH';
        }
    }, 5000);
}

// SHA-256 verification function
async function verify(fileUrl, expectedSha256) {
    try {
        const response = await fetch(fileUrl);
        const buf = await response.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buf);
        const hash = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0")).join("");
        return hash === expectedSha256;
    } catch (error) {
        console.error("Verification failed:", error);
        return false;
    }
}

// Integrity badge function
async function updateIntegrityBadge(pdfUrl, manifestUrl) {
    try {
        const manifestResponse = await fetch(manifestUrl);
        const manifest = await manifestResponse.json();
        const isVerified = await verify(pdfUrl, manifest.sha256);
        const badge = document.getElementById("dd-badge");
        if (badge) {
            badge.textContent = isVerified ? "Verified ✓" : "Unverified";
            badge.style.color = isVerified ? "green" : "red";
            badge.style.fontWeight = "bold";
        }
    } catch (error) {
        console.error("Badge update failed:", error);
        const badge = document.getElementById("dd-badge");
        if (badge) {
            badge.textContent = "Verification Error";
            badge.style.color = "orange";
        }
    }
}

// Load KPIs from evidence pack
async function loadKPIs() {
    try {
        const response = await fetch('/downloads/evidence/evidence_pack.json');
        const ev = await response.json();
        const k = ev.kpis_7d || {};
        const el = id => document.getElementById(id);
        el('kpi-redemptions').textContent = k.redemptions_per_day ?? '—';
        el('kpi-med').textContent = (k.median_latency_hours ?? '—') + 'h';
        el('kpi-p95').textContent = (k.p95_latency_hours ?? '—') + 'h';
        el('kpi-signer').textContent = (k.signer_participation_pct ?? '—') + '%';
        el('kpi-stale').textContent = (k.stale_attestation_pct ?? '—') + '%';
        el('kpi-kdrift').textContent = (k.amm_k_drift_pct ?? '—') + '%';
        el('kpi-ratio').textContent = k.reserve_to_float_ratio ?? '—';
    } catch (error) {
        console.error("Failed to load KPIs:", error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateMetrics();
    simulateUpdates();
    loadKPIs();
    // Update integrity badge for downloads
    updateIntegrityBadge(
        "/downloads/audit/Unykorn_XAUFTH_uUSD_Audit_2025-09-18.pdf",
        "/downloads/audit/Unykorn_XAUFTH_uUSD_Audit_2025-09-18_manifest.json"
    );
});