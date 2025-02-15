import { AdminRepository } from '~/models/repositories';
import { NavSidebar, Header } from './Components';
import { PrimaryLayoutController } from '~/controllers/PrimaryLayout';
export class PrimaryLayout {
    constructor() {
        // Global container
        this.globalContainer = document.createElement('div');
        this.globalContainer.className = 'global-container flex';

        this.header = new Header();

        // Content container
        this.contentContainer = document.createElement('div');

        // initializes content upon successful login
        window.addEventListener('logging', () => {
            PrimaryLayoutController.initContent(this.globalContainer, this.contentContainer, this.header);
        });
    }

    render(childNode) {
        this.contentContainer.innerHTML = '';
        // Append childNode to global container
        typeof childNode.getClassName === 'function'
            ? this.contentContainer.append(this.header.render(childNode.getClassName()), childNode.render())
            : this.contentContainer.append(this.header.render(childNode.constructor.name), childNode.render());
        return this.globalContainer;
    }
}
