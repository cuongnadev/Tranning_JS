import { apiEndpoint } from '~/utils';

export class EventsRepository {
    static async getEvents() {
        try {
            const response = await fetch(apiEndpoint.getEvents(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get Data failed');
            }

            const data = await response.json();
            const events = data.filter((item) => new Date(item.day).getMonth() === new Date().getMonth());

            if (events.length > 0) {
                return events;
            } else {
                throw new Error('No events');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }
}
