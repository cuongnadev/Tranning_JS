import { apiEndpoint } from '~/utils';
import { UnpaidStudentItem } from '~/views/components';
import { OverviewItem } from '~/views/components';
import { studentIcon, teacherIcon, calendarIcon, foodIcon } from '~/constants';
import { EventsRepository, StudentsRepository, TeachersRepository } from '~/models/repositories';

export class DashboardController {
    static async getOverViews() {
        try {
            // Chuyển đổi dữ liệu sang JSON đồng thời
            const [studentsList, teachersList, eventsList] = await Promise.all([
                StudentsRepository.getStudents(),
                TeachersRepository.getTeachers(),
                EventsRepository.getEvents(),
            ]);

            // Đếm số lượng phần tử
            const data = {
                student: studentsList.length || 0,
                teacher: teachersList.length || 0,
                event: eventsList.length || 0,
            };

            if (data.student === 0 && data.teacher === 0 && data.event === 0) {
                throw new Error('No data available');
            }

            return data;
        } catch (error) {
            throw new Error(error.message || 'An error occurred while fetching data');
        }
    }

    static async handleListUnpaidStudent(dashboard) {
        dashboard.data = await StudentsRepository.getUnpaidStudent();

        this.updateStudentList(
            dashboard.currentPage,
            dashboard.studentsPerPage,
            dashboard.data,
            dashboard.listUnpaidStudent,
        );
    }

    // Function called on page change
    static handlePageChange(currentPage, dashboard) {
        dashboard.currentPage = currentPage;
        this.updateStudentList(
            dashboard.currentPage,
            dashboard.studentsPerPage,
            dashboard.data,
            dashboard.listUnpaidStudent,
        );
    }

    // Update student list based on current page
    static updateStudentList(currentPage, studentsPerPage, data, listUnpaidStudent) {
        const start = (currentPage - 1) * studentsPerPage;
        const end = start + studentsPerPage;
        const studentsToShow = data.slice(start, end);

        listUnpaidStudent.innerHTML = '';

        // Show
        studentsToShow.forEach((student) => {
            const unpaidStudentItem = new UnpaidStudentItem(student);
            listUnpaidStudent.append(unpaidStudentItem.render());
        });
    }

    static async handleData(data, contentOverview) {
        data = await this.getOverViews();
        const overViewItemTypes = [
            {
                title: 'Students',
                quantity: data.student || 0,
                icon: studentIcon,
            },
            {
                title: 'Teachers',
                quantity: data.teacher || 0,
                icon: teacherIcon,
            },
            {
                title: 'Events',
                quantity: data.event || 0,
                icon: calendarIcon,
            },
            {
                title: 'Food',
                quantity: data.food || 0,
                icon: foodIcon,
            },
        ];
        overViewItemTypes.map((item) => {
            contentOverview.append(
                new OverviewItem().render(item.title, item.quantity, item.icon, `${item.title.toLowerCase()}`),
            );
        });
    }
}
