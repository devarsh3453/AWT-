// Auto-refresh summary every 2 seconds
setInterval(refreshData, 2000);
refreshData();

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

        await response.json();
        document.getElementById('purchaseUsername').value = '';
        document.getElementById('purchaseItem').value = '';
        showSuccessMessage('Purchase event emitted successfully!');
        refreshData();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to emit purchase event');
    }
}

async function refreshData() {
    try {
        const response = await fetch('/api/summary');
        const data = await response.json();

        // Update count
        document.getElementById('purchaseCount').textContent = data.eventCount['user-purchase'];

        // Update recent logs (only purchase events)
        const logContent = document.getElementById('recentLogs');
        logContent.innerHTML = '';

        const purchaseLogs = data.logs.filter(log => log.type === 'user-purchase');
        purchaseLogs.slice().reverse().slice(0, 10).forEach(log => {
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
    if (e.key === 'Enter' && document.activeElement.id === 'purchaseItem') {
        emitPurchase();
    }
});
