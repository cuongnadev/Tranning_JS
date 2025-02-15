import { anchorAttributes } from '~/constants';
import { Router } from '~/routes';

/** USAGE
 * const link = new Link(to);
 * const componentLink = link.render();
 * componentLink.append(node1, node2, ...rest)
 */
export class Link {
    constructor(to) {
        // anchor element
        this.link = document.createElement('a');
        this.link.href = to;
        this.link.setAttribute(anchorAttributes.link, '');

        // handle click event to prevent page loading
        this.link.addEventListener('click', this.handleLinkClick.bind(this));
    }

    // handle link click
    // purpose: prevent page reloading to achieve SPA
    handleLinkClick(event) {
        event.preventDefault();
        Router.pushState(this.link.getAttribute('href'));
    }

    render() {
        return this.link;
    }
}
