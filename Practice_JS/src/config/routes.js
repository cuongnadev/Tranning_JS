import { Router } from '~/routes';

const routes = {
    home: '/',
    students: '/students',
    teachers: '/teachers',
    studentDetail: '/students/:studentId',
    teacherDetail: '/teachers/:teacherId',
    studentAddNew: '/students/add',
    teacherAddNew: '/teachers/add',
    events: '/events',
    user: '/user',
    singleUserContact: '/user/contact/:userId',
    singleUserMessage: '/user/message/:userId',
    notifyActivity: '/notify-activity-lastest',
    login: '/login',
    register: '/register',
};

export const getPath = {
    [routes.home]: () => routes.home,
    [routes.students]: () => routes.students,
    [routes.teachers]: () => routes.teachers,
    [routes.studentDetail]() {
        const { studentId } = Router.extractParams(location.pathname, routes.studentDetail);
        return routes.studentDetail.replace(':studentId', studentId);
    },
    [routes.teacherDetail]() {
        const { teacherId } = Router.extractParams(location.pathname, routes.teacherDetail);
        return routes.teacherDetail.replace(':teacherId', teacherId);
    },
    [routes.studentAddNew]: () => routes.studentAddNew,
    [routes.teacherAddNew]: () => routes.teacherAddNew,
    [routes.events]: () => routes.events,
    [routes.user]: () => routes.user,
    [routes.singleUserContact]: () => {
        const { userId } = Router.extractParams(location.pathname, routes.singleUserContact);
        return routes.singleUserContact.replace(':userId', userId);
    },
    [routes.singleUserMessage]: () => {
        const { userId } = Router.extractParams(location.pathname, routes.singleUserMessage);
        return routes.singleUserMessage.replace(':userId', userId);
    },
    [routes.notifyActivity]: () => routes.notifyActivity,
    [routes.login]: () => routes.login,
    [routes.register]: () => routes.register,
};

export const breadcrumbs = {
    [routes.home]: 'Dashboard',
    [routes.students]: 'Students',
    [routes.teachers]: 'Teacher',
    [routes.events]: 'Event',
    [routes.user]: 'User',
    [routes.notifyActivity]: 'Lastest Activity',
};

export default routes;
