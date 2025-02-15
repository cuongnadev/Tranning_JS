import {
    homeIcon,
    studentIcon,
    teacherIcon,
    calendarIcon,
    financeIcon,
    foodIcon,
    userIcon,
    chatIcon,
    activityIcon,
    logo,
} from '~/constants';
import { Button, buttonSizes, buttonVariants, NavLink } from '~/views/components';
import { createContainer } from '~/utils';

export class NavSidebar {
    constructor() {
        // primary_sidebar
        this.container = document.createElement('div');
        this.container.className = 'primary_sidebar';
    }

    /** privite */
    initContent() {
        this.container.innerText = '';

        // Logo
        // logo Frame
        this.logoFrame = document.createElement('figure');
        this.logoFrame.className = 'flex items-center justify-center';
        // logo element
        this.logoElement = document.createElement('img');
        this.logoElement.className = 'logo';
        this.logoElement.src = logo;
        this.logoFrame.append(this.logoElement);
        // title logo
        this.logoTitle = document.createElement('p');
        this.logoTitle.className = 'title';
        this.logoTitle.innerText = 'Akademi';
        // logo container
        this.logoContainer = createContainer(
            'primary_sidebar-logo_container flex justify-center items-center gap-4',
            this.logoFrame,
            this.logoTitle,
        );

        // navigation links container
        this.navLinkContainer = document.createElement('nav');
        this.navLinkContainer.className = 'primary_sidebar-nav_container flex flex-col items-end gap-2';

        // initializes navigation links
        this.initNavigationLink();

        // Branding & Credits
        this.brandingText = document.createElement('p');
        this.brandingText.classList = 'branding-text';
        this.brandingText.innerText = 'Akademi - School Admission Dashboard';

        this.creditsText = document.createElement('p');
        this.creditsText.classList = 'credits-text';
        this.creditsText.innerHTML = 'Made with <span>♥</span> by Peterdraw';

        // content container
        this.sidebarContainer = createContainer(
            'primary_sidebar-container',
            this.logoContainer,
            this.navLinkContainer,
            this.brandingText,
            this.creditsText,
        );

        this.container.append(this.sidebarContainer);
    }

    // initializes navigation links with predefined data
    initNavigationLink() {
        const navigationLinkItems = [
            {
                startIcon: homeIcon,
                label: 'Dashboard',
                to: '/',
                componentPaths: ['/'],
            },
            {
                startIcon: studentIcon,
                label: 'Students',
                to: '/students',
                componentPaths: ['/students', '/students/:studentId'],
            },
            {
                startIcon: teacherIcon,
                label: 'teachers',
                to: '/teachers',
                componentPaths: ['/teachers', '/teachers/:teacherId'],
            },
            {
                startIcon: calendarIcon,
                label: 'Events',
                to: '/events',
                componentPaths: ['/events'],
            },
            {
                startIcon: financeIcon,
                label: 'Finance',
                to: '/finance',
                componentPaths: ['/finance'],
            },
            {
                startIcon: foodIcon,
                label: 'Food',
                to: '/food',
                componentPaths: ['/food'],
            },
            {
                startIcon: userIcon,
                label: 'User',
                to: '/user',
                componentPaths: ['/user', '/user/contact/:userId', '/user/message/:userId'],
            },
            {
                startIcon: chatIcon,
                label: 'Chat',
                to: '/chat',
                componentPaths: ['/chat'],
            },
            {
                startIcon: activityIcon,
                label: 'Lastest Activity',
                to: '/notify-activity-lastest',
                componentPaths: ['/notify-activity-lastest'],
            },
        ];

        // add navigation link items to the container
        navigationLinkItems.forEach((item) => {
            const navLink = new NavLink(item.startIcon, item.label, item.to, item.componentPaths);
            this.navLinkContainer.append(navLink.render());
        });
    }

    render() {
        this.initContent();
        return this.container;
    }
}
