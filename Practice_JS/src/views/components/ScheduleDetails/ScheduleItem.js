import { calendarIcon, clockIcon } from '~/constants';

export class ScheduleItem {
    constructor(role, name, grade, major, day, time) {
        this.container = document.createElement('div');
        this.container.className = `schedule-item flex flex-col items-start grade-${grade.slice(-1).toLowerCase()}`;

        // name course
        this.name = document.createElement('h3');
        this.name.className = 'schedule-item-name';
        this.name.innerHTML = name;

        // grade
        this.grade = document.createElement('p');
        this.grade.className = 'schedule-item-grade';
        this.grade.innerHTML = grade;

        // major
        this.major = document.createElement('p');
        this.major.className = 'schedule-item-major';
        this.major.innerHTML = major;

        // day
        this.day = document.createElement('p');
        this.day.className = 'schedule-item-day  flex items-center gap-4';
        this.day.innerHTML = `<span>${calendarIcon}</span>${day}`;

        // time
        this.time = document.createElement('p');
        this.time.className = 'schedule-item-time  flex items-center gap-4';
        this.time.innerHTML = `<span>${clockIcon}</span>${time}`;

        this.container.append(this.name, role === 'Teacher' ? this.grade : this.major, this.day, this.time);
    }

    render() {
        return this.container;
    }
}
