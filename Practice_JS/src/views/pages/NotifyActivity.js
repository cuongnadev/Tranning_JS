import { NotifyActivityController } from '~/controllers';

export class NotifyActivity {
    constructor() {
        this.name = 'Notification & Latest Activity';
        this.container = document.createElement('div');
        this.container.className = 'notify-activity';
    }

    getClassName() {
        return this.name;
    }

    render() {
        NotifyActivityController.handleData(this.container);
        return this.container;
    }
}
