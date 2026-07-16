document.addEventListener('DOMContentLoaded', () => {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const eventForm = document.getElementById('eventForm');
    const btnSummary = document.getElementById('btnSummary');
    const btnRefresh = document.getElementById('btnRefresh');

    function showLoading(show) { loadingEl.style.display = show ? 'block' : 'none'; }
    function showError(msg) {
        errorEl.innerText = msg;
        setTimeout(() => errorEl.innerText = '', 5000);
    }


    async function loadEvents() {
        showLoading(true);
        try {
            const events = await EventService.getEvents();
            const tbody = document.getElementById('eventsTableBody');
            tbody.innerHTML = '';

            events.forEach(e => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${e.eventId}</td>
                    <td>${e.accountId}</td>
                    <td>${e.type}</td>
                    <td>${e.amount}</td>
                    <td>${e.channel}</td>
                    <td>${e.eventTime}</td>
                `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            showError(err.message);
        } finally {
            showLoading(false);
        }
    }


    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading(true);

        let timeInput = document.getElementById('eventTime').value;
        let eventTimeFormatted = timeInput ? new Date(timeInput).toISOString() : new Date().toISOString();

        const payload = {
            eventId: document.getElementById('eventId').value,
            accountId: document.getElementById('accountId').value,
            type: document.getElementById('type').value,
            amount: parseFloat(document.getElementById('amount').value),
            channel: document.getElementById('channel').value,
            eventTime: eventTimeFormatted
        };

        try {
            await ApiService.createEvent(payload);
            eventForm.reset();
            await loadEvents();
        } catch (err) {
            showError(err.message);
        } finally {
            showLoading(false);
        }
    });


    btnSummary.addEventListener('click', async () => {
        const accId = document.getElementById('searchAccountId').value.trim();
        if (!accId) return showError('Por favor, ingresa un Account ID');

        showLoading(true);
        try {
            const data = await ApiService.getSummary(accId);
            document.getElementById('resCredits').innerText = data.totalCredits;
            document.getElementById('resDebits').innerText = data.totalDebits;
            document.getElementById('resBalance').innerText = data.balance;
            document.getElementById('resCount').innerText = data.eventsCount;
            document.getElementById('summaryResult').style.display = 'block';
        } catch (err) {
            showError(err.message);
        } finally {
            showLoading(false);
        }
    });

    btnRefresh.addEventListener('click', loadEvents);

    loadEvents();
});
