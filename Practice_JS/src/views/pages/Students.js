import routes from '~/config/routes';
import { Checkbox, Pagination, SearchActionsPanel, StudentItem } from '../components';
import { StudentsController } from '~/controllers';

export class Students {
    constructor() {
        this.name = 'Students';
        this.data = [];
        this.studentsPerPage = 6;
        this.currentPage = 1;

        this.container = document.createElement('div');
        this.container.className = 'students-container flex flex-col gap-10';

        // search actions panel
        this.searchActionsPanel = new SearchActionsPanel('New Student', routes.studentAddNew);

        // student list
        this.studentsList = document.createElement('div');
        this.studentsList.className = 'students-list-container';

        // title
        this.titles = document.createElement('div');
        this.titles.className = 'students-titles flex items-center justify-between  gap-8';
        // optionsBox
        this.selectAllStudent = new Checkbox('select-all-students', 'select-all-students', '');
        this.selectAllStudent.render().addEventListener('change', (event) => {
            const isChecked = event.target.checked;
            StudentsController.toggleAllStudents(isChecked);
        });
        // name
        this.nameTitle = document.createElement('h3');
        this.nameTitle.className = 'name-title';
        this.nameTitle.innerText = 'Name';
        // id
        this.idTitle = document.createElement('h3');
        this.idTitle.className = 'id-title';
        this.idTitle.innerText = 'ID';
        // Date
        this.dateTitle = document.createElement('h3');
        this.dateTitle.className = 'date-title';
        this.dateTitle.innerText = 'Date';
        // parentName
        this.parentNameTitle = document.createElement('h3');
        this.parentNameTitle.className = 'parent-name-title';
        this.parentNameTitle.innerText = 'Parent Name';
        // city
        this.cityTitle = document.createElement('h3');
        this.cityTitle.className = 'city-title';
        this.cityTitle.innerText = 'City';
        // contact
        this.contactTitle = document.createElement('h3');
        this.contactTitle.className = 'contact-title';
        this.contactTitle.innerText = 'Contact';
        // grade
        this.gradeTitle = document.createElement('h3');
        this.gradeTitle.className = 'grade-title';
        this.gradeTitle.innerText = 'Grade';
        // actions
        this.actionsTitle = document.createElement('h3');
        this.actionsTitle.className = 'actions-title flex justify-end';
        this.actionsTitle.innerText = 'Action';
        //
        this.titles.append(
            this.selectAllStudent.render(),
            this.nameTitle,
            this.idTitle,
            this.dateTitle,
            this.parentNameTitle,
            this.cityTitle,
            this.contactTitle,
            this.gradeTitle,
            this.actionsTitle,
        );

        // list
        this.list = document.createElement('div');
        this.list.className = 'list-student-items';

        // pagination
        this.pagination = new Pagination((currentPage) => StudentsController.handlePageChange(currentPage, this));

        this.studentsList.append(this.titles, this.list, this.pagination.render());

        // toast
        this.toast = document.createElement('div');
        this.toast.className = 'toast-container';

        this.container.append(this.toast, this.searchActionsPanel.render(), this.studentsList);

        StudentsController.handleListStudents(this);
    }

    getClassName() {
        return this.name;
    }

    render() {
        return this.container;
    }
}
