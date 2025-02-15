import { printIcon, userIcon, dotsIcon, placeholder } from '~/constants';
import { Button, buttonSizes, buttonVariants } from '../Button';
import { Dropdown } from '~/views';
import { StudentsRepository } from '~/models/repositories';
import { StudentsController } from '~/controllers';
export class UnpaidStudentItem {
    constructor(student) {
        this.unpaidStudentItem = document.createElement('div');
        this.unpaidStudentItem.className = 'unpaid-student-item flex items-center';

        // student info
        // avatar frame
        this.studentAvatarFrame = document.createElement('figure');
        this.studentAvatarFrame.className = 'flex items-center justify-center';
        // avatar
        this.studentAvatar = document.createElement('img');
        this.studentAvatar.className = 'unpaid-student-avatar';
        student.avatar ? (this.studentAvatar.src = student.avatar) : (this.studentAvatar.src = placeholder);
        this.studentAvatar.alt = '';
        this.studentAvatarFrame.append(this.studentAvatar);

        // name
        this.studentName = document.createElement('p');
        this.studentName.className = 'unpaid-student-name';
        this.studentName.innerText = student.name;
        // student info container
        this.studentInfo = document.createElement('div');
        this.studentInfo.className = 'unpaid-student-info flex items-center gap-6';
        this.studentInfo.append(this.studentAvatarFrame, this.studentName);

        // student ID
        this.studentID = document.createElement('p');
        this.studentID.classList = 'unpaid-student-id';
        this.studentID.innerHTML = `ID ${student.id}`;

        // student Class
        // student icon
        this.studentIconUser = document.createElement('div');
        this.studentIconUser.className = 'unpaid-student-icon-user flex items-center justify-center';
        this.studentIconUser.innerHTML = userIcon;
        // student class text
        this.studentClassText = document.createElement('div');
        this.studentClassText.className = 'unpaid-student-class-text flex flex-col items-start';
        this.studentClassText.innerHTML = `<p>class</p>
                                            ${student.class}`;

        // student class container
        this.studentClass = document.createElement('div');
        this.studentClass.classList = 'unpaid-student-class flex items-center gap-4';
        this.studentClass.append(this.studentIconUser, this.studentClassText);

        // Unpaid Amount
        this.unpaidAmount = document.createElement('p');
        this.unpaidAmount.className = 'unpaid-student-amount flex items-center';
        this.unpaidAmount.innerHTML = `$ ${student.unpaidAmount}`;

        // Unpaid Actions
        // action print
        this.unpaidActionPrint = document.createElement('div');
        this.unpaidActionPrint.className = 'unpaid-action-print';
        this.unpaidActionPrint.innerHTML = printIcon;

        // more action
        this.unpaidActionMore = new Button(
            null,
            dotsIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'unpaid-action-more flex items-center justify-center',
            () => {},
        );
        const dropdownLinks = [
            {
                label: 'Delete',
                href: `/students/${student.id}`,
                action: () => StudentsController.updateUnpaidStudent(student),
            },
        ];
        const actionsDropdown = new Dropdown();
        actionsDropdown.init(this.unpaidActionMore.render(), dropdownLinks);

        this.unpaidActions = document.createElement('div');
        this.unpaidActions.className = 'unpaid-student-actions flex items-center gap-8';
        this.unpaidActions.append(this.unpaidActionPrint, this.unpaidActionMore.render());

        // Unpaid Stusent Item Container
        this.unpaidStudentItem.append(
            this.studentInfo,
            this.studentID,
            this.studentClass,
            this.unpaidAmount,
            this.unpaidActions,
        );
    }

    render() {
        return this.unpaidStudentItem;
    }
}
