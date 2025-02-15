import { Router } from '~/routes';
import { ProfileDetails, ScheduleDetails } from '../components';
import routes from '~/config/routes';

export class StudentDetail {
    constructor() {
        this.studentId = Router.getParams(window.location.pathname, routes.studentDetail);

        this.name = 'Student Details';
        this.container = document.createElement('div');
        this.container.className = 'student-details-container flex';

        // profile detail
        this.profileDetails = new ProfileDetails('Student', this.studentId);

        // schedule details
        this.scheduleDetails = new ScheduleDetails('Student', this.studentId);

        this.container.append(this.profileDetails.render(), this.scheduleDetails.render());
    }

    getClassName() {
        return this.name;
    }

    render() {
        return this.container;
    }
}
