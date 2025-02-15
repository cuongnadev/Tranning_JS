/**
 *
 * @param {number} timestamp
 */
export const formatDate = (currentDate) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Định dạng ngày
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/\d+/, function (match) {
        if (match.endsWith('1') && match !== '11') {
            return `${match}st`;
        } else if (match.endsWith('2') && match !== '12') {
            return `${match}nd`;
        } else if (match.endsWith('3') && match !== '13') {
            return `${match}rd`;
        }
        return `${match}th`;
    });
    return formattedDate;
};
