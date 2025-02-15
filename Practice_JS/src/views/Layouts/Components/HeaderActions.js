import { bellIcon, gearIcon, placeholder } from '~/constants';
import { Button, buttonSizes, buttonVariants, Dropdown } from '~/views/components';
import { createContainer } from '~/utils';
import { AuthController } from '~/controllers';

export class headerActions {
    constructor() {
        // header actions
        // bell
        this.bellBtn = new Button(
            null,
            bellIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'action-btn bell-btn',
            () => {},
        );
        this.notificationDot = document.createElement('div');
        this.notificationDot.className = 'notification-dot';

        this.notificationBtn = createContainer('notification-btn', this.bellBtn.render(), this.notificationDot);

        // setting
        this.settingBtn = new Button(
            null,
            gearIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'action-btn setting-btn',
            () => {},
        );

        // profile, avatar
        this.name = document.createElement('p');
        this.name.className = 'user-name';
        this.name.innerText = '';

        this.role = document.createElement('p');
        this.role.className = 'user-role';
        this.role.innerText = '';

        this.info = createContainer('profile-info flex flex-col items-end', this.name, this.role);

        // avatar frame
        this.avatarFrame = document.createElement('figure');
        this.avatarFrame.className = 'flex items-center justify-center';

        const dropdownLinks = [{ label: 'Logout', href: '/logout', action: () => AuthController.logout() }];
        const avatarDropdown = new Dropdown();
        avatarDropdown.init(this.avatarFrame, dropdownLinks);
        // avatar
        this.avatar = document.createElement('img');
        this.avatar.className = 'avatar';
        this.avatar.src = '';
        this.avatar.alt = '';
        this.avatarFrame.append(this.avatar);

        this.profile = createContainer('header-profile flex items-center gap-6', this.info, this.avatarFrame);

        this.headerActions = createContainer(
            'header-actions flex gap-5',
            this.notificationBtn,
            this.settingBtn.render(),
            this.profile,
        );
    }

    async callData(data) {
        this.data = await data;
        this.data.image ? (this.avatar.src = this.data.image) : (this.avatar.src = placeholder);
        this.data.isNotify ? this.notificationDot.classList.add('active') : '';
        this.data.isAdmin ? (this.role.innerText = 'Admin') : (this.role.innerText = 'User');
        this.name.innerText = `${this.data.lastName} ${this.data.firstName}`;
    }

    render() {
        return this.headerActions;
    }
}
