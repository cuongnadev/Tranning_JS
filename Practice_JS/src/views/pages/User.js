import { callIcon, emailIcon, locationIcon, masking1, placeholder } from '~/constants';
import { Button, buttonSizes, buttonVariants, Input } from '../components';
import { createContainer, handleEmailFormat } from '~/utils';
import { AdminRepository } from '~/models/repositories';
import { UserController } from '~/controllers';

export class User {
    constructor() {
        this.name = 'User Dashboard';

        this.container = document.createElement('div');
        this.container.className = 'user-dashboard-container flex flex-col gap-10';

        // get User
        this.user = AdminRepository.getUser();

        // profile
        this.profile = document.createElement('div');
        this.profile.className = 'user-dashboard-profile';

        // image background
        this.image = document.createElement('figure');
        this.image.className = 'user-dashboard-profile-image flex';
        this.image.innerHTML = `<img src=${masking1} alt='' />`;

        // info
        this.infoUser = document.createElement('div');
        this.infoUser.className = 'user-dashboard-profile-info flex items-center';

        // card
        this.infoCard = document.createElement('div');
        this.infoCard.className = 'info-card flex flex-col items-start';
        // name
        this.infoName = document.createElement('h3');
        this.infoName.className = 'info-card-name';
        this.infoName.innerText = `${this.user.lastName} ${this.user.firstName}`;
        // role
        this.infoRole = document.createElement('h3');
        this.infoRole.className = 'info-card-role';
        this.infoRole.innerText = 'Admin';
        // location
        this.location = document.createElement('div');
        this.location.className = 'info-card-location flex items-center gap-2';
        // icon
        this.locationIcon = document.createElement('div');
        this.locationIcon.className = 'info-card-location-icon';
        this.locationIcon.innerHTML = locationIcon;
        // location text
        this.locationText = document.createElement('div');
        this.locationText.className = 'info-card-location-text';
        this.locationText.innerText = `${this.user.address}`;
        this.location.append(this.locationIcon, this.locationText);
        this.infoCard.append(this.infoName, this.infoRole, this.location);

        // phone
        this.phone = document.createElement('div');
        this.phone.className = 'info-phone flex flex-col items-start gap-5';
        // title
        this.phoneTitle = document.createElement('p');
        this.phoneTitle.className = 'info-phone-title';
        this.phoneTitle.innerText = 'Phone';
        // icon
        this.phoneIcon = document.createElement('div');
        this.phoneIcon.className = 'info-phone-icon flex items-center justify-center';
        this.phoneIcon.innerHTML = callIcon;
        // text
        this.phoneText = document.createElement('p');
        this.phoneText.className = 'info-phone-text';
        this.phoneText.innerText = `+84 ${this.user.phone}`;
        // content
        this.phoneContent = document.createElement('p');
        this.phoneContent.className = 'info-phone-content flex items-center gap-4';
        this.phoneContent.append(this.phoneIcon, this.phoneText);
        this.phone.append(this.phoneTitle, this.phoneContent);

        // email
        this.email = document.createElement('div');
        this.email.className = 'info-email flex flex-col items-start gap-5';
        // title
        this.emailTitle = document.createElement('p');
        this.emailTitle.className = 'info-email-title';
        this.emailTitle.innerText = 'Email';
        // icon email
        this.emailIcon = document.createElement('div');
        this.emailIcon.className = 'info-email-icon flex items-center justify-center';
        this.emailIcon.innerHTML = emailIcon;
        // text
        this.emailText = document.createElement('p');
        this.emailText.className = 'info-email-text';
        this.emailText.innerText = `${this.user.email}`;
        // content
        this.emailContent = document.createElement('p');
        this.emailContent.className = 'info-email-content flex items-center gap-4';
        this.emailContent.append(this.emailIcon, this.emailText);
        this.email.append(this.emailTitle, this.emailContent);

        this.infoUser.append(this.infoCard, this.phone, this.email);

        // avatar
        this.avatar = document.createElement('figure');
        this.avatar.className = 'user-dashboard-profile-avatar flex items-center justify-center';
        this.avatar.innerHTML = `<img src=${this.user.image ? this.user.image : placeholder} alt='' />`;

        this.profile.append(this.image, this.infoUser, this.avatar);

        // form edit info user
        this.formEdit = document.createElement('div');
        this.formEdit.className = 'user-dashboard-form-edit';

        // title
        this.titleForm = document.createElement('div');
        this.titleForm.className = 'form-edit-title flex items-center';
        this.titleForm.innerHTML = '<h3>Profile Details</h3>';

        // form edit inputs
        this.formEditInputs = document.createElement('div');
        this.formEditInputs.className = 'form-edit-inputs flex flex-col gap-4';
        // row 1
        // first name
        // First name label
        this.firstNameLabel = document.createElement('p');
        this.firstNameLabel.className = 'form-edit-label';
        this.firstNameLabel.innerText = 'First Name *';
        // First name input
        this.firstNameInput = new Input(
            { placeholder: 'First Name', required: true, value: this.user.firstName },
            'form-input',
        );
        this.firstName = createContainer(
            'form-edit-item flex flex-col items-start gap-4',
            this.firstNameLabel,
            this.firstNameInput.render(),
        );

        // Last name
        // Last name label
        this.lastNameLabel = document.createElement('p');
        this.lastNameLabel.className = 'form-edit-label';
        this.lastNameLabel.innerText = 'Last Name *';
        // Last name input
        this.lastNameInput = new Input(
            { placeholder: 'Last Name', required: true, value: this.user.lastName },
            'form-input',
        );
        this.lastName = createContainer(
            'form-edit-item flex flex-col items-start gap-4',
            this.lastNameLabel,
            this.lastNameInput.render(),
        );
        this.row1 = createContainer('form-edit-row1 flex items-start gap-10', this.firstName, this.lastName);

        // row 2
        // Email
        // Email label
        this.emailLabel = document.createElement('p');
        this.emailLabel.className = 'form-edit-label';
        this.emailLabel.innerText = 'Email *';
        // Email input
        this.emailInput = new Input(
            {
                placeholder: 'Email',
                required: true,
                value: this.user.email,
                onchange: () => handleEmailFormat(this.emailInput.input),
            },
            'form-input',
        );
        this.email = createContainer(
            'form-edit-item flex flex-col items-start gap-4',
            this.emailLabel,
            this.emailInput.render(),
        );

        // Phone
        // Phone label
        this.phoneLabel = document.createElement('p');
        this.phoneLabel.className = 'form-edit-label';
        this.phoneLabel.innerText = 'Phone *';
        // Phone input
        this.phoneInput = new Input({ placeholder: 'Phone', required: true, value: this.user.phone }, 'form-input');
        this.phone = createContainer(
            'form-edit-item flex flex-col items-start gap-4',
            this.phoneLabel,
            this.phoneInput.render(),
        );
        this.row2 = createContainer('form-edit-row2 flex items-start gap-10', this.email, this.phone);

        // row 3
        // Address
        // Address label
        this.addressLabel = document.createElement('p');
        this.addressLabel.className = 'form-edit-label';
        this.addressLabel.innerText = 'Address *';
        // Address input (textarea)
        this.addressInput = document.createElement('textarea');
        this.addressInput.className = 'form-input address-input';
        this.addressInput.placeholder = 'Address';
        this.addressInput.required = true;
        this.addressInput.value = this.user.address || '';
        this.address = createContainer(
            'form-edit-item flex flex-col items-start gap-4',
            this.addressLabel,
            this.addressInput,
        );

        // Photo
        // Photo label
        this.photoLabel = document.createElement('p');
        this.photoLabel.className = 'form-edit-label';
        this.photoLabel.innerText = 'Photo *';

        this.photoInput = document.createElement('label');
        this.photoInput.className = 'form-input photo-input';
        this.photoInput.innerHTML = `
            <input type="file" style="display: none;" required />
            <div class="flex items-center justify-center">Drag and drop or click here to select file</div>
        `;
        this.imageUrl = null;
        this.photoInput.querySelector('input').addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                this.imageUrl = URL.createObjectURL(file);
                this.photoInput.querySelector('div').innerHTML = `<img src="${this.imageUrl}" alt="Selected Photo" />`;
            } else {
                this.photoInput.querySelector('div').innerText = 'Drag and drop or click here to select file';
            }
        });
        this.photo = createContainer(
            'form-edit-item flex flex-col items-start gap-4',
            this.photoLabel,
            this.photoInput,
        );
        this.row3 = createContainer('form-edit-row3 flex items-start gap-10', this.address, this.photo);

        this.formEditInputs.append(this.row1, this.row2, this.row3);

        this.formEdit.append(this.titleForm, this.formEditInputs);

        // btn update
        this.updateInfoUser = new Button(
            'Update',
            null,
            null,
            buttonVariants.filled,
            buttonSizes.sm,
            'form-edit-update-btn',
            () => UserController.handleUpdate(this),
        );
        // toast
        this.toast = document.createElement('div');
        this.toast.className = 'toast-container';

        this.container.append(this.toast, this.profile, this.formEdit, this.updateInfoUser.render());
    }

    getClassName() {
        return this.name;
    }

    render() {
        return this.container;
    }
}
