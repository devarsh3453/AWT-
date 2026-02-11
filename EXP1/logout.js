// Auto-refresh summary every 2 seconds
setInterval(refreshData, 2000);
refreshData();

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

        await response.json();
        document.getElementById('logoutUsername').value = '';
        showSuccessMessage('Logout event emitted successfully!');
        refreshData();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to emit logout event');
    }
}

async function refreshData() {
    try {
        const response = await fetch('/api/summary');
        const data = await response.json();

        // Update count
        document.getElementById('logoutCount').textContent = data.eventCount['user-logout'];

        // Update recent logs (only logout events)
        const logContent = document.getElementById('recentLogs');
        logContent.innerHTML = '';

        const logoutLogs = data.logs.filter(log => log.type === 'user-logout');
        logoutLogs.slice().reverse().slice(0, 10).forEach(log => {
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
        console.error('Error fetching data:', error);
    }
}

function showSuccessMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'success-message';
    msgDiv.textContent = message;
    document.body.appendChild(msgDiv);

    setTimeout(() => msgDiv.remove(), 3000);
}

// Enter key support
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        emitLogout();
    }
});
