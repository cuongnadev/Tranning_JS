import { Exception } from 'sass';
import routes from '~/config/routes';
import { Router } from '~/routes';
import { apiEndpoint } from '~/utils';
import { Toast } from '~/views';

export class StudentsRepository {
    static async getUnpaidStudent() {
        try {
            const response = await fetch(apiEndpoint.getStudents(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // No body required for GET method
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get Data failed');
            }

            const data = await response.json();

            const unpaidStudents = data.filter((student) => student.unpaidAmount > 0);

            if (unpaidStudents.length > 0) {
                return unpaidStudents;
            } else {
                throw new Error('No unpaid students');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }

    static async getStudents() {
        try {
            const response = await fetch(apiEndpoint.getStudents(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // No body required for GET method
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get Data failed');
            }

            const data = await response.json();

            if (data.length > 0) {
                return data;
            } else {
                throw new Error('No students');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }
    static async addStudent(data) {
        try {
            const response = await fetch(apiEndpoint.postStudent(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            Toast.render({ title: 'Success', message: 'Add new successfully', type: 'SUCCESS' });
            setTimeout(() => {
                Router.pushState(routes.students);
            }, 2000);
        } catch (error) {
            let errorMessage = error.message;
            if (errorMessage) {
                Toast.render({ title: 'Error', message: errorMessage, type: 'ERROR' });
            }
        }
    }

    static async getStudentById(studentId) {
        try {
            const response = await fetch(apiEndpoint.getStudent(studentId), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // No body required for GET method
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get Data failed');
            }

            const data = await response.json();

            if (data) {
                return data;
            } else {
                throw new Error('No student');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }

    static async getStudentSchedule(studentId) {
        try {
            const response = await fetch(apiEndpoint.getCourses(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // No body required for GET method
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get Data failed');
            }

            const data = await response.json();

            if (data) {
                // Lọc các khóa học theo studentId
                const studentCourses = data.filter((course) => course.student_id === studentId);
                if (studentCourses.length > 0) {
                    return studentCourses;
                } else {
                    throw new Error('No courses for this student');
                }
            } else {
                throw new Error('No course');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }

    static async deleteStudent(studentID) {
        try {
            const response = await fetch(apiEndpoint.deleteStudent(studentID), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (errorMessage) {
                    Toast.render({ title: 'Error', message: errorMessage, type: 'ERROR' });
                }
            }

            Router.pushState(routes.students);
        } catch (error) {
            let errorMessage = error.message;
            if (errorMessage) {
                Toast.render({ title: 'Error', message: errorMessage, type: 'ERROR' });
            }
        }
    }

    static async updatedStudent(student) {
        try {
            const updateResponse = await fetch(apiEndpoint.getStudent(student.id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(errorData.message || 'Update failed');
            }

            Router.pushState(routes.home);
        } catch (error) {
            let errorMessage = error.message;
            console.log(errorMessage);

            if (errorMessage) {
                Toast.render({ title: 'Error', message: errorMessage, type: 'ERROR' });
            }
        }
    }
}
