// Auto-refresh summary every 2 seconds
setInterval(refreshData, 2000);
refreshData();

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

        await response.json();
        document.getElementById('updateUsername').value = '';
        document.getElementById('updateField').value = '';
        showSuccessMessage('Profile update event emitted successfully!');
        refreshData();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to emit profile update event');
    }
}

async function refreshData() {
    try {
        const response = await fetch('/api/summary');
        const data = await response.json();

        // Update count
        document.getElementById('updateCount').textContent = data.eventCount['profile-update'];

        // Update recent logs (only profile update events)
        const logContent = document.getElementById('recentLogs');
        logContent.innerHTML = '';

        const updateLogs = data.logs.filter(log => log.type === 'profile-update');
        updateLogs.slice().reverse().slice(0, 10).forEach(log => {
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
    if (e.key === 'Enter' && document.activeElement.id === 'updateField') {
        emitProfileUpdate();
    }
});
