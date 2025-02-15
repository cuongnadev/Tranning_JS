import { Toast } from '../views/components/Toast';
import { TeachersRepository } from '~/models/repositories';
export class AddNewTeacherController {
    static handleSubmit(
        lastName,
        firstName,
        email,
        phone,
        address,
        imageUrl,
        dob,
        pob,
        university,
        startDate,
        endDate,
        city,
        major,
    ) {
        const teacherData = {
            name: `${lastName} ${firstName}`,
            email: email,
            phone: phone,
            address: address,
            avatar: imageUrl,
            dob: dob,
            pob: pob,
            university: university,
            start_date: startDate,
            end_date: endDate,
            city: city,
            major: major,
        };
        // Kiểm tra các trường dữ liệu
        for (const key in teacherData) {
            if (!teacherData[key] && key !== 'avatar') {
                Toast.render({ title: 'Error', message: 'Please enter complete info!', type: 'ERROR' });
                return;
            }
        }
        TeachersRepository.addTeacher(teacherData);
    }
}
