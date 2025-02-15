import { Button, buttonSizes, buttonVariants, Input, Toast } from '../components';
import { createContainer, handleEmailFormat } from '~/utils';
import { TeachersRepository } from '~/models/repositories';
import { AddNewTeacherController } from '~/controllers';

export class AddNewTeacher {
    constructor() {
        this.name = 'Add New Teacher';

        this.container = document.createElement('form');
        this.container.className = 'add-new-teacher flex flex-col gap-10';

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        // form add teacher
        this.formAddTeacher = document.createElement('div');
        this.formAddTeacher.className = 'add-new-teacher-form';

        // title
        this.titleForm = document.createElement('div');
        this.titleForm.className = 'form-add-title flex items-center';
        this.titleForm.innerHTML = '<h3>Personal Details</h3>';

        // form Add inputs
        this.formAddInputs = document.createElement('div');
        this.formAddInputs.className = 'form-add-inputs flex flex-col gap-4';
        // row 1
        // first name
        // First name label
        this.firstNameLabel = document.createElement('p');
        this.firstNameLabel.className = 'form-add-label';
        this.firstNameLabel.innerText = 'First Name *';
        // First name input
        this.firstNameInput = new Input({ placeholder: 'First Name', name: 'firstName', required: true }, 'form-input');
        this.firstName = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.firstNameLabel,
            this.firstNameInput.render(),
        );

        // Last name
        // Last name label
        this.lastNameLabel = document.createElement('p');
        this.lastNameLabel.className = 'form-add-label';
        this.lastNameLabel.innerText = 'Last Name *';
        // Last name input
        this.lastNameInput = new Input({ placeholder: 'Last Name', name: 'lastName', required: true }, 'form-input');
        this.lastName = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.lastNameLabel,
            this.lastNameInput.render(),
        );
        this.row1 = createContainer('form-add-row1 flex items-start gap-10', this.firstName, this.lastName);

        // row 2
        // Email
        // Email label
        this.emailLabel = document.createElement('p');
        this.emailLabel.className = 'form-add-label';
        this.emailLabel.innerText = 'Email *';
        // Email input
        this.emailInput = new Input(
            {
                placeholder: 'Email',
                name: 'email',
                required: true,
                onchange: () => handleEmailFormat(this.emailInput.input),
            },
            'form-input',
        );
        this.email = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.emailLabel,
            this.emailInput.render(),
        );

        // Phone
        // Phone label
        this.phoneLabel = document.createElement('p');
        this.phoneLabel.className = 'form-add-label';
        this.phoneLabel.innerText = 'Phone *';
        // Phone input
        this.phoneInput = new Input({ placeholder: 'Phone', name: 'phone', required: true }, 'form-input');
        this.phone = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.phoneLabel,
            this.phoneInput.render(),
        );
        this.row2 = createContainer('form-add-row2 flex items-start gap-10', this.email, this.phone);

        // row 3
        // Address
        // Address label
        this.addressLabel = document.createElement('p');
        this.addressLabel.className = 'form-add-label';
        this.addressLabel.innerText = 'Address *';
        // Address input (textarea)
        this.addressInput = document.createElement('textarea');
        this.addressInput.className = 'form-input address-input';
        this.addressInput.placeholder = 'Address';
        this.addressInput.required = true;
        this.addressInput.name = 'address';
        this.addressInput.value = '';
        this.address = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.addressLabel,
            this.addressInput,
        );

        // Photo
        // Photo label
        this.photoLabel = document.createElement('p');
        this.photoLabel.className = 'form-add-label';
        this.photoLabel.innerText = 'Photo *';
        // Photo Input
        this.photoInput = document.createElement('label');
        this.photoInput.className = 'form-input photo-input';
        this.photoInput.innerHTML = `
            <input type="file" name="photo" style="display: none;" />
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
        this.photo = createContainer('form-add-item flex flex-col items-start gap-4', this.photoLabel, this.photoInput);
        this.row3 = createContainer('form-add-row3 flex items-start gap-10', this.address, this.photo);

        // row 4
        // date of birth
        // Dob label
        this.dobLabel = document.createElement('p');
        this.dobLabel.className = 'form-add-label';
        this.dobLabel.innerText = 'Date of Birth *';
        // Dob input
        this.dobInput = new Input({ placeholder: '1 January 1999', name: 'dob', required: true }, 'form-input');
        this.dob = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.dobLabel,
            this.dobInput.render(),
        );
        // place of birth
        // Pob label
        this.pobLabel = document.createElement('p');
        this.pobLabel.className = 'form-add-label';
        this.pobLabel.innerText = 'Place of Birth *';
        // Pob input
        this.pobInput = new Input({ placeholder: 'Việt Nam', name: 'pob', required: true }, 'form-input');
        this.pob = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.pobLabel,
            this.pobInput.render(),
        );
        this.row4 = createContainer('form-add-row4 flex items-start gap-10', this.dob, this.pob);
        this.formAddInputs.append(this.row1, this.row2, this.row3, this.row4);

        this.formAddTeacher.append(this.titleForm, this.formAddInputs);

        // form add education
        this.formAddEdu = document.createElement('div');
        this.formAddEdu.className = 'form-add-edu';

        // title edu
        this.titleForm = document.createElement('div');
        this.titleForm.className = 'form-add-title-edu flex items-center';
        this.titleForm.innerHTML = '<h3>Education</h3>';

        // form Add inputs edu
        this.formAddInputs = document.createElement('div');
        this.formAddInputs.className = 'form-add-inputs flex flex-col gap-4';
        // row 5
        // University
        // University label
        this.universityLabel = document.createElement('p');
        this.universityLabel.className = 'form-add-label';
        this.universityLabel.innerText = 'University *';
        // University input
        this.universityInput = new Input(
            { placeholder: 'University', name: 'university', required: true },
            'form-input',
        );
        this.university = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.universityLabel,
            this.universityInput.render(),
        );

        // Degree
        // Degree label
        this.degreeLabel = document.createElement('p');
        this.degreeLabel.className = 'form-add-label';
        this.degreeLabel.innerText = 'Degree *';
        // Degree input
        this.degreeInput = new Input({ placeholder: 'Degree', name: 'degree', required: true }, 'form-input');
        this.degree = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.degreeLabel,
            this.degreeInput.render(),
        );
        this.row5 = createContainer('form-add-row5 flex items-start gap-10', this.university, this.degree);

        // row 6
        // start & end date
        // label
        this.startEndDateLabel = document.createElement('p');
        this.startEndDateLabel.className = 'form-add-label';
        this.startEndDateLabel.innerText = 'Start & End Date *';
        // start end date inputs
        this.startEndInputs = document.createElement('div');
        this.startEndInputs.className = 'form-add-start-end-inputs flex gap-6 items-center';
        // start date input
        this.startInput = new Input({ placeholder: '1 January 1999', name: 'startDate', required: true }, 'form-input');
        // end date input
        this.endInput = new Input({ placeholder: '1 January 1999', name: 'endDate', required: true }, 'form-input');
        this.startEndInputs.append(this.startInput.render(), this.endInput.render());
        this.startEndDate = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.startEndDateLabel,
            this.startEndInputs,
        );

        // City
        // City label
        this.cityLabel = document.createElement('p');
        this.cityLabel.className = 'form-add-label';
        this.cityLabel.innerText = 'City *';
        // City Input
        this.cityInput = new Input({ placeholder: 'Akademi', name: 'city', required: true }, 'form-input');
        this.city = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.cityLabel,
            this.cityInput.render(),
        );
        this.row6 = createContainer('form-add-row6 flex items-center gap-10', this.startEndDate, this.city);

        this.formAddInputs.append(this.row5, this.row6);

        this.formAddEdu.append(this.titleForm, this.formAddInputs);

        // actions
        // Save as Draft
        this.saveAsDraft = new Button(
            'Save as Draft',
            null,
            null,
            buttonVariants.outlined,
            buttonSizes.sm,
            'form-add-action save-as-draft',
            () => {},
        );
        // Submit
        this.submit = new Button(
            'Submit',
            null,
            null,
            buttonVariants.filled,
            buttonSizes.sm,
            'form-add-action submit',
            () =>
                AddNewTeacherController.handleSubmit(
                    this.lastNameInput.input.value,
                    this.firstNameInput.input.value,
                    this.emailInput.input.value,
                    this.phoneInput.input.value,
                    this.addressInput.value,
                    this.imageUrl,
                    this.dobInput.input.value,
                    this.pobInput.input.value,
                    this.universityInput.input.value,
                    this.startInput.input.value,
                    this.endInput.input.value,
                    this.cityInput.input.value,
                    this.degreeInput.input.value,
                ),
        );
        this.actions = createContainer(
            'form-add-actions flex items-center gap-6',
            this.saveAsDraft.render(),
            this.submit.render(),
        );

        // toast
        this.toast = document.createElement('div');
        this.toast.className = 'toast-container';

        this.container.append(this.toast, this.formAddTeacher, this.formAddEdu, this.actions);
    }

    getClassName() {
        return this.name;
    }

    render() {
        return this.container;
    }
}
