import { dropdownIcon } from '~/constants';
import { Button, buttonSizes, buttonVariants, ScheduleDetails } from '../components';
import { createContainer } from '~/utils';
import { EventsController } from '~/controllers';

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export class Events {
    constructor() {
        this.name = 'Events';

        this.container = document.createElement('div');
        this.container.className = 'events-container flex gap-10';

        // calendar
        this.calendar = document.createElement('div');
        this.calendar.className = 'events-calendar flex flex-col gap-10 flex-1';
        // header
        this.header = document.createElement('div');
        this.header.className = 'events-header flex items-center justify-between';
        // title
        this.title = document.createElement('h3');
        this.title.className = 'events-title';
        this.title.innerHTML = 'Calendar';
        // actions
        this.mouth = new Button(
            `${monthNames[new Date().getMonth()]}`,
            null,
            dropdownIcon,
            buttonVariants.outlined,
            buttonSizes.md,
            'events-action-item btn-mouth',
            () => {},
        );
        this.year = new Button(
            `${new Date().getFullYear()}`,
            null,
            dropdownIcon,
            buttonVariants.outlined,
            buttonSizes.md,
            'events-action-item btn-year',
            () => {},
        );
        this.actions = createContainer(
            'events-actions flex items-start gap-6',
            this.mouth.render(),
            this.year.render(),
        );

        this.header.append(this.title, this.actions);

        this.calendar.append(this.header);

        EventsController.createCalendarGrid(new Date().getMonth()).then((calendarGrid) => {
            this.calendar.append(calendarGrid);
        });

        // table
        this.tableEvents = document.createElement('div');

        // schedule
        this.schedule = new ScheduleDetails('Teacher');

        this.container.append(this.calendar, this.schedule.render());
    }

    getClassName() {
        return this.name;
    }

    render() {
        return this.container;
    }
}
