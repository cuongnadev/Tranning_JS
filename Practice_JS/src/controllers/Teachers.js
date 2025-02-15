import { TeacherItem } from '../views/components';
import { TeachersRepository } from '~/models/repositories';

export class TeachersController {
    static async handleListTeachers(teacher) {
        teacher.data = await TeachersRepository.getTeachers();
        this.updateTeachersList(teacher.currentPage, teacher.teachersPerPage, teacher.data, teacher.list);
    }

    // Function called on page change
    static handlePageChange(currentPage, teacher) {
        teacher.currentPage = currentPage;
        this.updateTeachersList(teacher.currentPage, teacher.teachersPerPage, teacher.data, teacher.list);
    }

    // Update student list based on current page
    static updateTeachersList(currentPage, teachersPerPage, data, list) {
        const start = (currentPage - 1) * teachersPerPage;
        const end = start + teachersPerPage;
        const teachersToShow = data.slice(start, end);

        list.innerHTML = '';

        // Show
        teachersToShow.forEach((teacher) => {
            const teacherItem = new TeacherItem(teacher).render();

            list.append(teacherItem);
        });
    }
}
