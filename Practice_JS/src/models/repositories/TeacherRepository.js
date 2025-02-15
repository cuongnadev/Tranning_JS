import routes from '~/config/routes';
import { Router } from '~/routes';
import { apiEndpoint } from '~/utils';
import { Toast } from '~/views';

export class TeachersRepository {
    static async getTeachers() {
        try {
            const response = await fetch(apiEndpoint.getTeachers(), {
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

    static async addTeacher(data) {
        try {
            const response = await fetch(apiEndpoint.postTeacher(), {
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
                Router.pushState(routes.teachers);
            }, 2000);
        } catch (error) {
            let errorMessage = error.message;
            if (errorMessage) {
                Toast.render({ title: 'Error', message: errorMessage, type: 'ERROR' });
            }
        }
    }

    static async getTeacherById(teacherId) {
        try {
            const response = await fetch(apiEndpoint.getTeacher(teacherId), {
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
                throw new Error('No teacher');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }

    static async getTeacherSchedule(teacherId) {
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
                // Lọc các khóa học theo teacherId
                const teacherCourses = data.filter((course) => course.teacher_id === teacherId);
                if (teacherCourses.length > 0) {
                    return teacherCourses;
                } else {
                    throw new Error('No courses for this teacher');
                }
            } else {
                throw new Error('No course');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }

    static async getAllTeacherSchedule() {
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
                return data;
            } else {
                throw new Error('No course');
            }
        } catch (error) {
            let errorMessage = error.message;
            throw new Error(errorMessage);
        }
    }

    static async deleteTeacher(teacherID) {
        try {
            const response = await fetch(apiEndpoint.deleteTeacher(teacherID), {
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

            Router.pushState(routes.teachers);
        } catch (error) {
            let errorMessage = error.message;
            if (errorMessage) {
                Toast.render({ title: 'Error', message: errorMessage, type: 'ERROR' });
            }
        }
    }
}
