import config from '~/config';

// layouts
import { PrimaryLayout } from '~/views/Layouts';

// pages
import {
    Dashboard,
    Students,
    Teachers,
    Events,
    StudentDetail,
    TeacherDetail,
    User,
    AddNewStudent,
    AddNewTeacher,
    NotifyActivity,
    Login,
} from '~/views/pages';

// public
const publicRoutes = [
    {
        path: '',
        component: new PrimaryLayout(),
        children: [
            { path: config.routes.home, component: Dashboard },
            { path: config.routes.user, component: User },
            { path: config.routes.singleUserContact, component: User },
            { path: config.routes.singleUserMessage, component: User },
            { path: config.routes.students, component: Students },
            { path: config.routes.teachers, component: Teachers },
            { path: config.routes.studentDetail, component: StudentDetail },
            { path: config.routes.teacherDetail, component: TeacherDetail },
            { path: config.routes.singleStudent, component: Students },
            { path: config.routes.singleTeacher, component: Teachers },
            { path: config.routes.studentAddNew, component: AddNewStudent },
            { path: config.routes.teacherAddNew, component: AddNewTeacher },
            { path: config.routes.events, component: Events },
            { path: config.routes.notifyActivity, component: NotifyActivity },
        ],
    },
    { path: config.routes.login, component: new Login() },
    { path: config.routes.register, component: new Login(true) },
];

// private
const privateRoutes = [];

export { publicRoutes, privateRoutes };
