import { callIcon, emailIcon, dotsIcon, placeholder } from '~/constants';
import { Button, buttonSizes, buttonVariants } from '../Button';
import { Router } from '~/routes';
import routes from '~/config/routes';
import { TeachersRepository } from '~/models/repositories';
import { Dropdown } from '~/views';

export class TeacherItem {
    constructor(teacher) {
        this.container = document.createElement('div');
        this.container.className = 'teacher-item-container flex flex-col items-center';

        // avatar frame
        this.avatarFrame = document.createElement('figure');
        this.avatarFrame.className = 'flex items-center justify-center';
        // avatar
        this.avatar = document.createElement('img');
        this.avatar.className = 'teacher-item-avatar';
        this.avatar.src = teacher.avatar ? teacher.avatar : placeholder;
        this.avatar.alt = '';
        this.avatarFrame.append(this.avatar);

        // name
        this.teacherName = document.createElement('h3');
        this.teacherName.className = 'teacher-item-name';
        this.teacherName.innerText = teacher.name;
        this.teacherName.addEventListener('click', () => {
            const detailPath = routes.teacherDetail.replace(':teacherId', teacher.id);
            Router.pushState(detailPath);
        });

        // major
        this.major = document.createElement('p');
        this.major.className = 'teacher-item-major';
        this.major.innerText = teacher.major;

        // contact
        // contact
        // call
        this.call = new Button(
            null,
            callIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'teacher-item-call',
            () => {},
        );
        // mail
        this.mail = new Button(
            null,
            emailIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'teacher-item-mail',
            () => {},
        );
        this.contact = document.createElement('div');
        this.contact.className = 'teacher-item-contact flex items-center justify-center gap-4';
        this.contact.append(this.call.render(), this.mail.render());

        // action
        this.actions = new Button(
            null,
            dotsIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'teacher-item-actions',
            () => {},
        ).render();

        const dropdownLinks = [
            {
                label: 'Delete',
                href: `/teachers/${teacher.id}`,
                action: () => TeachersRepository.deleteTeacher(teacher.id),
            },
        ];
        const actionsDropdown = new Dropdown();
        actionsDropdown.init(this.actions, dropdownLinks);

        this.container.append(this.avatarFrame, this.teacherName, this.major, this.contact, this.actions);
    }

    render() {
        return this.container;
    }
}
