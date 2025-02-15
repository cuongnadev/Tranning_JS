import { AdminRepository } from '~/models/repositories';
import { Header, NavSidebar } from '~/views';

export class PrimaryLayoutController {
    //
    static initContent(globalContainer, contentContainer, header) {
        const admin = JSON.parse(localStorage.getItem('admin')) || JSON.parse(sessionStorage.getItem('admin'));
        const email = admin.email;
        const password = admin.password;

        globalContainer.innerHTML = '';

        // Header
        header.container.classList.add('primary');
        header.headerActions.callData(AdminRepository.getAdmin(email, password));

        // Navigation sidebar
        const navSidebar = new NavSidebar();
        globalContainer.append(navSidebar.render());

        // Content container
        contentContainer.className = 'content-container flex-1';
        globalContainer.append(contentContainer);
    }
}
