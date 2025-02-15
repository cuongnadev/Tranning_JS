export const apiEndpoint = {
    adminAuthentication() {
        // http request GET
        return `/admins`;
    },
    register() {
        // http request POST
        return `/admins`;
    },
    updateUser(userId) {
        return `/admins/${userId}`;
    },
    getStudents() {
        return `/students`;
    },
    getStudent(studentId) {
        return `/students/${studentId}`;
    },
    getTeachers() {
        return `/teachers`;
    },
    getTeacher(teacherId) {
        return `/teachers/${teacherId}`;
    },
    getLastestActivitys() {
        return `/notify-activity-lastest`;
    },
    getEvents() {
        return `/events`;
    },
    getEvent(date) {
        return `/events/${date}`;
    },
    postEvents() {
        return `/events`;
    },
    postStudent() {
        return `/students`;
    },
    postTeacher() {
        return `/teachers`;
    },
    patchStudent(studentId) {
        return `/students/${studentId}`;
    },
    patchTeacher(teacherId) {
        return `/teachers/${teacherId}`;
    },
    deleteStudent(studentId) {
        return `/students/${studentId}`;
    },
    deleteTeacher(teacherId) {
        return `/teachers/${teacherId}`;
    },
    getCourses() {
        return `/courses`;
    },
};
