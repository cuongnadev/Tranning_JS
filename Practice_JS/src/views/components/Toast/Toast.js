import { checkSuccessIcon, errorIcon, warningIcon, infoIcon, xmarkIcon } from '~/constants';
import { createContainer } from '~/utils';
import { Button, buttonSizes, buttonVariants } from '../Button';

export const TOAST_TYPES = {
    SUCCESS: {
        icon: checkSuccessIcon,
    },
    WARNING: {
        icon: warningIcon,
    },
    INFO: {
        icon: infoIcon,
    },
    ERROR: {
        icon: errorIcon,
    },
};

export class Toast {
    static render({ title: titleText, message: messageText, type, duration = 4000 }) {
        // toast
        // toast-container

        /* <======= content container children ======> */
        // 1. Icon
        const icon = createContainer(`icon-container icon-${type.toLowerCase()}`);
        icon.innerHTML = TOAST_TYPES[type].icon;

        // 2. Text content
        // 2.1. Title
        const title = document.createElement('h4');
        title.className = 'toast-title';
        title.textContent = titleText;
        // 2.2. Message
        const message = document.createElement('p');
        message.className = 'toast-message';
        message.textContent = messageText;

        // 3. Close button
        const closeButton = new Button(null, xmarkIcon, null, buttonVariants.icon, buttonSizes.iconOnly, '', () => {
            contentContainer.remove();
        });

        const contentContainer = createContainer(
            `toast-content toast-${type.toLowerCase()}`,
            icon,
            createContainer('flex flex-col flex-1', title, message),
            closeButton.render(),
        );

        // auto close toast after `duration` in ms
        setTimeout(() => {
            contentContainer.remove();
        }, duration);

        document.querySelector('.toast-container').appendChild(contentContainer);
    }
}
