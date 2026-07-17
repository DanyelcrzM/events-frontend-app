const isLocal = window.location.protocol === 'file:' || 
                window.location.hostname.includes('localhost') || 
                window.location.hostname.includes('127.0.0.1');

const API_BASE = isLocal 
  ? 'http://localhost:8080' 
  : 'https://backend-events-api-943215766238.us-central1.run.app';


const EventService = {
    async getEvents() {
        const response = await fetch(`${API_URL}/events`);
        if (!response.ok) throw new Error('Error al obtener los eventos');
        return await response.json();
    },

    async createEvent(eventData) {
        const response = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });
        if (!response.ok) {
            const errData = await response.json();
            throw new Error('Error al guardar el evento');
        }
        return await response.json();
    },

    async getSummary(accountId) {
        const response = await fetch(`${API_URL}/accounts/${accountId}/summary`);
        if (!response.ok) throw new Error('Cuenta no encontrada');
        return await response.json();
    }
};
