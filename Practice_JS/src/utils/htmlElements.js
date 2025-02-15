/**
 * Creates a div element with a specified CSS class and child elements.
 *
 * @param {string} className - The CSS class name to apply to the div element.
 * @param {...HTMLElement} children - The HTML elements to be added as children to the div element.
 * @returns {HTMLDivElement} - The created div element with applied CSS class and child elements.
 */
export const createContainer = (className, ...children) => {
    const container = document.createElement('div');
    container.className = className;
    container.append(...children);
    return container;
};

/**
 * Generate an image file.
 *
 * @param {File} file - The image file to generate .
 * @param {Function} [onLoadend=({ imageName, imageURL }) => { imageName, imageURL }] - The callback function to be called when the file reading is complete.
 * @param {string} onLoadend.imageName - The name of the image file.
 * @param {string} onLoadend.imageURL - The data URL of the image.
 */
export const extractImageFile = (
    file,
    onLoadend = ({ imageName, imageURL }) => {
        imageName, imageURL;
    },
) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        onLoadend({ imageName: file.name, imageURL: reader.result });
    };
};
