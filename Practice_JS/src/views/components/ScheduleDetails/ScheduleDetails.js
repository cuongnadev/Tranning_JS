import { createContainer, formatDate } from '~/utils';
import { ScheduleItem } from './ScheduleItem';
import { EventsController, StudentsController, TeachersController } from '~/controllers';
import { Button, buttonSizes, buttonVariants } from '../Button';
import { EventsRepository, StudentsRepository, TeachersRepository } from '~/models/repositories';

export class ScheduleDetails {
    constructor(role, id) {
        this.isViewMore = false;

        this.container = document.createElement('div');
        this.container.className = 'schedule-details flex flex-col';

        // schedule list
        this.scheduleList = document.createElement('div');
        this.scheduleList.className = 'schedule-details-list flex flex-col gap-6';

        // header
        this.headerSchedule = document.createElement('div');
        this.headerSchedule.className = 'schedule-details-header flex flex-col items-start gap-2';
        // Title
        this.headerScheduleTitle = document.createElement('h3');
        this.headerScheduleTitle.className = 'schedule-details-header-title';
        this.headerScheduleTitle.innerHTML = 'Schedule Details';
        // subTitle
        this.headerScheduleSubTitle = document.createElement('p');
        this.headerScheduleSubTitle.className = 'schedule-details-header-sub-title';
        const currentDate = new Date();
        this.headerScheduleSubTitle.innerHTML = formatDate(currentDate);

        this.headerSchedule.append(this.headerScheduleTitle, this.headerScheduleSubTitle);

        this.createScheduleItem(role, id);

        this.container.appendChild(this.scheduleList);
    }

    renderScheduleItem(role, data) {
        this.scheduleList.innerHTML = '';
        this.scheduleList.append(this.headerSchedule);

        data.map((item) => {
            this.scheduleItem = new ScheduleItem(
                role,
                item.name,
                `Class ${item.class}`,
                item.major,
                item.day ? formatDate(new Date(item.day)) : item.dow,
                item.time,
            );
            this.scheduleList.append(this.scheduleItem.render());
        });
    }

    async createScheduleItem(role, id) {
        try {
            const data =
                role === 'Teacher'
                    ? id
                        ? await TeachersRepository.getTeacherSchedule(id.teacherId)
                        : await EventsRepository.getEvents()
                    : await StudentsRepository.getStudentSchedule(id.studentId);

            this.fullData = data;
            this.sliceData = data.slice(0, 4);
            if (Array.isArray(data) && data.length > 0) {
                if (data.length > 4) {
                    this.renderScheduleItem(role, this.sliceData);

                    this.buttonViewMore = new Button(
                        'View More',
                        null,
                        null,
                        buttonVariants.filled,
                        buttonSizes.md,
                        'schedule-details-view-more',
                        this.toggleViewMore.bind(this),
                    );
                    this.container.append(this.buttonViewMore.render());
                } else {
                    this.renderScheduleItem(role, data);
                }
            } else {
                this.scheduleList.innerHTML = '';
                this.scheduleList.append(this.headerSchedule);

                const noScheduleMessage = document.createElement('p');
                noScheduleMessage.className = 'schedule-details-not-schedule';
                noScheduleMessage.innerText = 'No Schedule';
                this.scheduleList.append(noScheduleMessage);
            }
        } catch (error) {
            this.scheduleList.innerHTML = '';
            this.scheduleList.append(this.headerSchedule);
            const noScheduleMessage = document.createElement('p');
            noScheduleMessage.className = 'schedule-details-not-schedule';
            noScheduleMessage.innerText = 'No Schedule';
            console.log(error);
            this.scheduleList.append(noScheduleMessage);
        }
    }

    toggleViewMore() {
        this.isViewMore = !this.isViewMore;

        if (this.isViewMore) {
            this.renderScheduleItem(this.role, this.fullData);
            this.buttonViewMore.buttonLabel.innerHTML = 'Hide';
        } else {
            this.renderScheduleItem(this.role, this.sliceData);
            this.buttonViewMore.buttonLabel.innerHTML = 'View More';
        }
    }

    render() {
        return this.container;
    }
}
