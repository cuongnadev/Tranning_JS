import { AdminRepository } from '~/models/repositories';

export class UserController {
    static handleUpdate(user) {
        const updatedUser = {
            id: user.user.id,
            firstName: user.firstNameInput.input.value,
            lastName: user.lastNameInput.input.value,
            email: user.emailInput.input.value,
            phone: user.phoneInput.input.value,
            address: user.addressInput.value,
            image: user.imageUrl,
        };

        AdminRepository.updatedUser(updatedUser);
    }
}
