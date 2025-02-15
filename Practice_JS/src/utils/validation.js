/**
 *
 * @param {string} email
 * @returns {boolean}
 */
export const isEmailFormat = (email) => {
    // leebinn69@gmail.com
    // leebinn69 ~ [^\s@]
    // @ ~ +@
    // gmail ~ [^\s@]
    // . ~ +\.
    // com ~ [^\s@]
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
};

/**
 *
 * @param {HTMLInputElement} input
 */
export const handleEmailFormat = (input) => {
    if (isEmailFormat(input.value)) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('Enter a valid email');
    }
};
/**
 *
 * @param {HTMLInputElement} input
 */
export const handlePasswordFormat = (input) => {
    if (input.value.length < 8) {
        input.setCustomValidity('At least 8 characters');
    } else {
        input.setCustomValidity('');
    }
};
