import { StudentItem } from '../views/components';
import { StudentsRepository } from '~/models/repositories';

export class StudentsController {
    static async handleListStudents(student) {
        student.data = await StudentsRepository.getStudents();
        this.updateStudentsList(student.currentPage, student.studentsPerPage, student.data, student.list);
    }

    // Function called on page change
    static handlePageChange(currentPage, student) {
        student.currentPage = currentPage;
        this.updateStudentsList(student.currentPage, student.studentsPerPage, student.data, student.list);
    }

    // Update student list based on current page
    static updateStudentsList(currentPage, studentsPerPage, data, list) {
        const start = (currentPage - 1) * studentsPerPage;
        const end = start + studentsPerPage;
        const studentsToShow = data.slice(start, end);

        list.innerHTML = '';

        // Show
        studentsToShow.forEach((student) => {
            const studentItem = new StudentItem(student);
            list.append(studentItem.render());
        });
    }

    static toggleAllStudents(isChecked) {
        const studentItems = document.querySelectorAll('.select-student-item input[type="checkbox"]');
        studentItems.forEach((checkBox) => {
            checkBox.checked = isChecked;

            const studentContainer = checkBox.closest('.student-item-container');
            if (isChecked) {
                studentContainer.classList.add('active');
            } else {
                studentContainer.classList.remove('active');
            }
        });
    }

    static updateUnpaidStudent(student) {
        student.unpaidAmount = 0;
        StudentsRepository.updatedStudent(student);
    }
}
