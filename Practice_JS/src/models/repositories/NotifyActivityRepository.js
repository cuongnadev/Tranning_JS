import { apiEndpoint } from '~/utils';

export class NotifyActivityRepository {
    static async getNotifyActivitys() {
        try {
            const response = await fetch(apiEndpoint.getLastestActivitys(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // No body required for GET method
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get Data failed');
            }

            const data = await response.json();

            if (data) {
                return data;
            } else {
                throw new Error('No Notification');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }
}
