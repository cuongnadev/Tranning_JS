import { Router } from '~/routes';
import { ProfileDetails, ScheduleDetails } from '../components';
import routes from '~/config/routes';

export class TeacherDetail {
    constructor() {
        this.teacherId = Router.getParams(window.location.pathname, routes.teacherDetail);

        this.name = 'Teacher Details';
        this.container = document.createElement('div');
        this.container.className = 'teacher-details-container flex';

        // profile detail
        this.profileDetails = new ProfileDetails('Teacher', this.teacherId);

        // schedule details
        this.scheduleDetails = new ScheduleDetails('Teacher', this.teacherId);

        this.container.append(this.profileDetails.render(), this.scheduleDetails.render());
    }

    getClassName() {
        return this.name;
    }

    render() {
        return this.container;
    }
}
