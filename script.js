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
        
        // Update main KPIs
        el('kpi-redemptions').textContent = k.redemptions_per_day ?? '—';
        el('kpi-med').textContent = (k.median_latency_hours ?? '—') + 'h';
        el('kpi-p95').textContent = (k.p95_latency_hours ?? '—') + 'h';
        el('kpi-signer').textContent = (k.signer_participation_pct ?? '—') + '%';
        el('kpi-stale').textContent = (k.stale_attestation_pct ?? '—') + '%';
        el('kpi-kdrift').textContent = (k.amm_k_drift_pct ?? '—') + '%';
        el('kpi-ratio').textContent = k.reserve_to_float_ratio ?? '—';
        
        // Update additional metrics if elements exist
        if (k.total_tvl_usd) {
            const tvlElement = el('tvl-amount');
            if (tvlElement) {
                tvlElement.textContent = '$' + (k.total_tvl_usd / 1000000).toFixed(2) + 'M';
            }
        }
        
        if (k.active_vaults) {
            const vaultsElement = el('active-vaults');
            if (vaultsElement) {
                vaultsElement.textContent = k.active_vaults.toLocaleString();
            }
        }
        
        if (k.system_uptime_pct) {
            const uptimeElement = el('system-uptime');
            if (uptimeElement) {
                uptimeElement.textContent = k.system_uptime_pct + '%';
            }
        }
        
        // Update network info in footer if available
        if (ev.network_info) {
            const chainElement = el('chain-info');
            if (chainElement) {
                chainElement.textContent = `${ev.network_info.chain_id} | ${ev.network}`;
            }
        }
        
        // Display last update time
        if (ev.generation_timestamp) {
            const lastUpdateElement = el('last-update');
            if (lastUpdateElement) {
                const updateTime = new Date(ev.generation_timestamp);
                lastUpdateElement.textContent = `Last updated: ${updateTime.toLocaleString()}`;
            }
        }
        
        console.log('✅ KPIs loaded successfully from evidence pack');
    } catch (error) {
        console.error("Failed to load KPIs:", error);
        // Graceful fallback - show offline status
        const elements = ['kpi-redemptions', 'kpi-med', 'kpi-p95', 'kpi-signer', 'kpi-stale', 'kpi-kdrift', 'kpi-ratio'];
        elements.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.textContent === '—') {
                el.textContent = 'Offline';
                el.style.color = '#f39c12';
            }
        });
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