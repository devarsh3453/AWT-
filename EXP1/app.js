// Auto-refresh summary every 2 seconds
setInterval(refreshSummary, 2000);

// Initial load
refreshSummary();

async function emitLogin() {
    const username = document.getElementById('loginUsername').value;
    if (!username) {
        alert('Please enter a username');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        document.getElementById('loginUsername').value = '';
        refreshSummary();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to emit login event');
    }
}

async function emitLogout() {
    const username = document.getElementById('logoutUsername').value;
    if (!username) {
        alert('Please enter a username');
        return;
    }

    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        document.getElementById('logoutUsername').value = '';
        refreshSummary();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to emit logout event');
    }
}

async function emitPurchase() {
    const username = document.getElementById('purchaseUsername').value;
    const item = document.getElementById('purchaseItem').value;

    if (!username || !item) {
        alert('Please enter username and item');
        return;
    }

    try {
        const response = await fetch('/api/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, item })
        });

        const data = await response.json();
        document.getElementById('purchaseUsername').value = '';
        document.getElementById('purchaseItem').value = '';
        refreshSummary();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to emit purchase event');
    }
}

async function emitProfileUpdate() {
    const username = document.getElementById('updateUsername').value;
    const field = document.getElementById('updateField').value;

    if (!username || !field) {
        alert('Please enter username and field');
        return;
    }

    try {
        const response = await fetch('/api/profile-update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, field })
        });

        const data = await response.json();
        document.getElementById('updateUsername').value = '';
        document.getElementById('updateField').value = '';
        refreshSummary();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to emit profile update event');
    }
}

async function refreshSummary() {
    try {
        const response = await fetch('/api/summary');
        const data = await response.json();

        // Update event counts
        document.getElementById('loginCount').textContent = data.eventCount['user-login'];
        document.getElementById('logoutCount').textContent = data.eventCount['user-logout'];
        document.getElementById('purchaseCount').textContent = data.eventCount['user-purchase'];
        document.getElementById('updateCount').textContent = data.eventCount['profile-update'];

        // Update logs
        const logContent = document.getElementById('logContent');
        logContent.innerHTML = '';

        data.logs.slice().reverse().forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry ${log.type}`;

            const timestamp = new Date(log.timestamp).toLocaleTimeString();
            logEntry.innerHTML = `
                <span class="log-timestamp">[${timestamp}]</span>
                <span class="log-message">${log.message}</span>
            `;

            logContent.appendChild(logEntry);
        });
    } catch (error) {
        console.error('Error fetching summary:', error);
    }
}

async function clearAll() {
    if (!confirm('Are you sure you want to clear all events?')) {
        return;
    }

    try {
        const response = await fetch('/api/clear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        refreshSummary();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to clear events');
    }
}

// Allow Enter key to submit forms
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;

        if (activeElement.id === 'loginUsername') {
            emitLogin();
        } else if (activeElement.id === 'logoutUsername') {
            emitLogout();
        } else if (activeElement.id === 'purchaseItem') {
            emitPurchase();
        } else if (activeElement.id === 'updateField') {
            emitProfileUpdate();
        }
    }
});
