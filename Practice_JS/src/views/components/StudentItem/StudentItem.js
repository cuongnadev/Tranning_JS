import { callIcon, dotsIcon, emailIcon, placeholder } from '~/constants';
import { Button, buttonSizes, buttonVariants } from '../Button';
import { Checkbox } from '../Form';
import routes from '~/config/routes';
import { Router } from '~/routes';
import { StudentsRepository } from '~/models/repositories';
import { Dropdown } from '~/views';

export class StudentItem {
    constructor(student) {
        this.container = document.createElement('div');
        this.container.className = 'student-item-container flex items-center justify-between gap-8';

        // optionsBox
        this.selectStudentItem = new Checkbox('select-student-item', 'select-student-item', '');
        this.selectStudentItem.render().addEventListener('change', (event) => {
            if (event.target.checked) {
                this.container.classList.add('active');
            } else {
                this.container.classList.remove('active');
            }
        });

        // student info
        // avatar frame
        this.studentAvatarFrame = document.createElement('figure');
        this.studentAvatarFrame.className = 'flex items-center justify-center';
        // avatar
        this.studentAvatar = document.createElement('img');
        this.studentAvatar.className = 'student-avatar';
        student.avatar ? (this.studentAvatar.src = student.avatar) : (this.studentAvatar.src = placeholder);
        this.studentAvatar.alt = '';
        this.studentAvatarFrame.append(this.studentAvatar);

        // name
        this.studentName = document.createElement('p');
        this.studentName.className = 'student-name';
        this.studentName.innerText = student.name;

        this.studentName.addEventListener('click', () => {
            const detailPath = routes.studentDetail.replace(':studentId', student.id);
            Router.pushState(detailPath);
        });
        // student info container
        this.studentInfo = document.createElement('div');
        this.studentInfo.className = 'student-info flex items-center gap-4';
        this.studentInfo.append(this.studentAvatarFrame, this.studentName);

        // student ID
        this.studentID = document.createElement('p');
        this.studentID.classList = 'student-id';
        this.studentID.innerHTML = `# ${student.id}`;

        // date
        this.date = document.createElement('p');
        this.date.classList = 'student-date';
        this.date.innerHTML = `${student.date}`;

        // parent name
        this.parentName = document.createElement('p');
        this.parentName.classList = 'student-parent-name';
        this.parentName.innerHTML = `${student.parentName}`;

        // city
        this.city = document.createElement('p');
        this.city.classList = 'student-city';
        this.city.innerHTML = `${student.city}`;

        // contact
        // call
        this.call = new Button(
            null,
            callIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'student-contact-call',
            () => {},
        );
        // mail
        this.mail = new Button(
            null,
            emailIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'student-contact-mail',
            () => {},
        );
        this.contact = document.createElement('div');
        this.contact.className = 'student-contact flex items-center justify-start gap-4';
        this.contact.append(this.call.render(), this.mail.render());

        // student Grade
        // text
        this.studentGrade = document.createElement('div');
        this.studentGrade.className = `student-grade flex items-center justify-start grade-${student.class.slice(-1).toLowerCase()}`;
        this.studentGrade.innerHTML = `<div class="student-grade-text flex items-center justify-center">${student.class}</div>`;

        // Actions
        this.actions = new Button(
            null,
            dotsIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'action-more flex items-center',
            () => {},
        );
        const dropdownLinks = [
            {
                label: 'Delete',
                href: `/students/${student.id}`,
                action: () => StudentsRepository.deleteStudent(student.id),
            },
        ];
        const actionsDropdown = new Dropdown();
        actionsDropdown.init(this.actions.render(), dropdownLinks);

        // Unpaid Stusent Item Container
        this.container.append(
            this.selectStudentItem.render(),
            this.studentInfo,
            this.studentID,
            this.date,
            this.parentName,
            this.city,
            this.contact,
            this.studentGrade,
            this.actions.render(),
        );
    }

    render() {
        return this.container;
    }
}
