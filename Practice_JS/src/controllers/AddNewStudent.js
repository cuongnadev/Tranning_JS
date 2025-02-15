import { Toast } from '../views/components/Toast';
import { StudentsRepository } from '~/models/repositories';

export class AddNewStudentController {
    static handleSubmit(
        imageUrl,
        lastName,
        firstName,
        dob,
        pob,
        classStudent,
        email,
        phone,
        address,
        lastNameParent,
        firstNameParent,
        emailParent,
        phoneParent,
        addressParent,
        paymentSelected,
        paymentSelectedValue,
    ) {
        const studentData = {
            avatar: imageUrl,
            name: `${lastName} ${firstName}`,
            date: dob,
            place: pob,
            class: classStudent,
            email_student: email,
            phone_student: phone,
            city: address,
            parentName: `${lastNameParent} ${firstNameParent}`,
            email_parent: emailParent,
            phone_parent: phoneParent,
            address_parent: addressParent,
            payment: paymentSelected ? paymentSelectedValue : null,
        };
        // Kiểm tra các trường dữ liệu
        for (const key in studentData) {
            if (!studentData[key] && key !== 'avatar') {
                Toast.render({ title: 'Error', message: 'Please enter complete info!', type: 'ERROR' });
                return;
            }
        }
        StudentsRepository.addStudent(studentData);
    }
}
