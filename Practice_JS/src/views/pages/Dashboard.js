import { Pagination } from '../components';
import { DashboardController } from '~/controllers';
import { schoolPerformance, schoolCalendar, schoolFinance } from '~/constants';
export class Dashboard {
    constructor() {
        this.name = 'Dashboard';

        // data
        this.data = [];
        this.dataOverView = [];
        this.studentsPerPage = 6;
        this.currentPage = 1;

        // container
        this.container = document.createElement('div');
        this.container.className = 'dashboard-container flex flex-col justify-start items-center gap-10';

        this.overviews = document.createElement('div');
        this.overviews.className = 'overviews-container flex items-center';

        this.contentOverview = document.createElement('div');
        this.contentOverview.className = 'overviews-content flex items-center gap-4';

        this.overviews.append(this.contentOverview);

        // School Performance
        this.schoolPerformance = document.createElement('figure');
        this.schoolPerformance.className = 'school-performance-container';
        this.schoolPerformanceImg = document.createElement('img');
        this.schoolPerformanceImg.src = schoolPerformance;
        this.schoolPerformance.append(this.schoolPerformanceImg);

        // School Calendar
        this.schoolCalendar = document.createElement('figure');
        this.schoolCalendar.className = 'school-calendar-container';
        this.schoolCalendarImg = document.createElement('img');
        this.schoolCalendarImg.src = schoolCalendar;
        this.schoolCalendar.append(this.schoolCalendarImg);

        // School Finance
        this.schoolFinance = document.createElement('figure');
        this.schoolFinance.className = 'school-finance-container';
        this.schoolFinanceImg = document.createElement('img');
        this.schoolFinanceImg.src = schoolFinance;
        this.schoolFinance.append(this.schoolFinanceImg);

        // Container Finance + Calendar
        this.schoolOperations = document.createElement('div');
        this.schoolOperations.className = 'school-operations flex items-center gap-10';
        this.schoolOperations.append(this.schoolCalendar, this.schoolFinance);

        // Unpaid Student
        // Title
        this.unpaidTitle = document.createElement('p');
        this.unpaidTitle.className = 'unpaid-title';
        this.unpaidTitle.innerText = 'Unpaid Student Intuition';

        // List Unpaid Student
        this.listUnpaidStudent = document.createElement('div');
        this.listUnpaidStudent.className = 'unpaid-student-list flex flex-col';

        // pagination
        this.pagination = new Pagination((currentPage) => DashboardController.handlePageChange(currentPage, this));

        // Unpaid Student Container
        this.unpaidStudent = document.createElement('div');
        this.unpaidStudent.className = 'unpaid-student flex flex-col ';
        this.unpaidStudent.append(this.unpaidTitle, this.listUnpaidStudent, this.pagination.render());

        this.container.append(this.overviews, this.schoolPerformance, this.schoolOperations, this.unpaidStudent);

        DashboardController.handleData(this.dataOverView, this.contentOverview);
        DashboardController.handleListUnpaidStudent(this);
    }

    getClassName() {
        return this.name;
    }

    render() {
        return this.container;
    }
}
