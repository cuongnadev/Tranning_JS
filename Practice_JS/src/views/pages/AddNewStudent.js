import { Button, buttonSizes, buttonVariants, Input, Toast } from '../components';
import { createContainer, handleEmailFormat } from '~/utils';
import { StudentsRepository } from '~/models/repositories';
import { AddNewStudentController } from '~/controllers';
export class AddNewStudent {
    constructor() {
        this.name = 'Add New Student';

        this.container = document.createElement('form');
        this.container.className = 'add-new-student flex flex-col gap-10';

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        // form add student
        this.formAddStudent = document.createElement('div');
        this.formAddStudent.className = 'add-new-student-form';

        // title
        this.titleForm = document.createElement('div');
        this.titleForm.className = 'form-add-title flex items-center';
        this.titleForm.innerHTML = '<h3>Student Details</h3>';

        // form Add inputs
        this.formAddInputs = document.createElement('div');
        this.formAddInputs.className = 'form-add-inputs flex gap-10';

        // col 1
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
        this.col1 = createContainer('form-add-col', this.photo);

        // col 2
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
        // date & place of birth
        // Dob And Pod Label
        this.dobAndPobLabel = document.createElement('p');
        this.dobAndPobLabel.className = 'form-add-label';
        this.dobAndPobLabel.innerText = 'Date of Birth *';
        // Dob And Pod Label input
        // Dob input
        this.dobInput = new Input({ placeholder: '1 January 1999', name: 'dob', required: true }, 'form-input');
        // Pob input
        this.pobInput = new Input({ placeholder: 'Việt Nam', name: 'pob', required: true }, 'form-input');
        this.dobAndPobInputs = createContainer(
            'form-inputs flex items-start gap-6',
            this.dobInput.render(),
            this.pobInput.render(),
        );
        this.dobAndPob = createContainer(
            'form-add-item flex flex-col gap-4',
            this.dobAndPobLabel,
            this.dobAndPobInputs,
        );

        // Class
        // Class label
        this.classLabel = document.createElement('p');
        this.classLabel.className = 'form-add-label';
        this.classLabel.innerText = 'Class *';
        // Class Input
        this.classInput = new Input({ placeholder: 'Class', name: 'class', required: true }, 'form-input');
        this.class = createContainer('form-add-item flex flex-col gap-4', this.classLabel, this.classInput.render());
        this.row2 = createContainer('form-add-row2 flex items-start gap-10', this.dobAndPob, this.class);

        // row 3
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
        this.row3 = createContainer('form-add-row3 flex items-start gap-10', this.email, this.phone);

        // row 4
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
        this.row4 = createContainer('form-add-row4 flex items-start gap-10', this.address);

        this.col2 = createContainer(
            'form-add-col col2 flex flex-col gap-8',
            this.row1,
            this.row2,
            this.row3,
            this.row4,
        );

        this.formAddInputs.append(this.col1, this.col2);

        this.formAddStudent.append(this.titleForm, this.formAddInputs);

        // form parent detail
        this.formParentDetail = document.createElement('div');
        this.formParentDetail.className = 'form-add-parent-detail';

        // title ParentDetail
        this.titleForm = document.createElement('div');
        this.titleForm.className = 'form-add-title-edu flex items-center';
        this.titleForm.innerHTML = '<h3>Parent Detail</h3>';

        this.formAddInputs = document.createElement('div');
        this.formAddInputs.className = 'form-add-inputs flex flex-col gap-4';
        // row 5
        /// first name
        // First name label
        this.firstNameParentLabel = document.createElement('p');
        this.firstNameParentLabel.className = 'form-add-label';
        this.firstNameParentLabel.innerText = 'First Name *';
        // First name input
        this.firstNameParentInput = new Input(
            { placeholder: 'First Name', name: 'firstNameParent', required: true },
            'form-input',
        );
        this.firstNameParent = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.firstNameParentLabel,
            this.firstNameParentInput.render(),
        );

        // Last name
        // Last name label
        this.lastNameParentLabel = document.createElement('p');
        this.lastNameParentLabel.className = 'form-add-label';
        this.lastNameParentLabel.innerText = 'Last Name *';
        // Last name input
        this.lastNameParentInput = new Input(
            { placeholder: 'Last Name', name: 'lastNameParent', required: true },
            'form-input',
        );
        this.lastNameParent = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.lastNameParentLabel,
            this.lastNameParentInput.render(),
        );
        this.row5 = createContainer('form-add-row5 flex items-start gap-10', this.firstNameParent, this.lastNameParent);

        // row 6
        // Email
        // Email label
        this.emailParentLabel = document.createElement('p');
        this.emailParentLabel.className = 'form-add-label';
        this.emailParentLabel.innerText = 'Email *';
        // Email input
        this.emailParentInput = new Input(
            {
                placeholder: 'Email Parent',
                name: 'emailParent',
                required: true,
                onchange: () => handleEmailFormat(this.emailParentInput.input),
            },
            'form-input',
        );
        this.emailParent = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.emailParentLabel,
            this.emailParentInput.render(),
        );

        // Phone
        // Phone label
        this.phoneParentLabel = document.createElement('p');
        this.phoneParentLabel.className = 'form-add-label';
        this.phoneParentLabel.innerText = 'Phone *';
        // Phone input
        this.phoneParentInput = new Input({ placeholder: 'Phone', name: 'phoneParent', required: true }, 'form-input');
        this.phoneParent = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.phoneParentLabel,
            this.phoneParentInput.render(),
        );
        this.row6 = createContainer('form-add-row6 flex items-center gap-10', this.emailParent, this.phoneParent);

        // row 7
        // Address
        // Address label
        this.addressParentLabel = document.createElement('p');
        this.addressParentLabel.className = 'form-add-label';
        this.addressParentLabel.innerText = 'Address *';
        // Address input (textarea)
        this.addressParentInput = document.createElement('textarea');
        this.addressParentInput.className = 'form-input address-input';
        this.addressParentInput.placeholder = 'Address';
        this.addressParentInput.required = true;
        this.addressParentInput.name = 'addressParent';
        this.addressParentInput.value = '';
        this.addressParent = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.addressParentLabel,
            this.addressParentInput,
        );

        // Payments
        // Payments label
        this.paymentsLabel = document.createElement('p');
        this.paymentsLabel.className = 'form-add-label';
        this.paymentsLabel.innerHTML = 'Payments *';
        // Payments options
        // cash
        this.paymentsCash = document.createElement('label');
        this.paymentsCash.className = 'form-radio cash flex items-center gap-2';
        this.paymentsCash.innerHTML =
            '<input type="radio" name="payment-option" value="cash" required> <span>Cash</span>';
        // debit
        this.paymentsDebit = document.createElement('label');
        this.paymentsDebit.className = 'form-radio cash flex items-center gap-2';
        this.paymentsDebit.innerHTML =
            '<input type="radio" name="payment-option" value="debit" required> <span>Debit</span>';
        this.paymentsInputs = createContainer('form-inputs flex gap-4', this.paymentsCash, this.paymentsDebit);
        this.payments = createContainer(
            'form-add-item flex flex-col items-start gap-4',
            this.paymentsLabel,
            this.paymentsInputs,
        );
        this.row7 = createContainer('form-add-row7 flex items-start gap-10', this.addressParent, this.payments);

        this.formAddInputs.append(this.row5, this.row6, this.row7);
        this.formParentDetail.append(this.titleForm, this.formAddInputs);

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
                AddNewStudentController.handleSubmit(
                    this.imageUrl,
                    this.lastNameInput.input.value,
                    this.firstNameInput.input.value,
                    this.dobInput.input.value,
                    this.pobInput.input.value,
                    this.classInput.input.value,
                    this.emailInput.input.value,
                    this.phoneInput.input.value,
                    this.addressInput.value,
                    this.lastNameParentInput.input.value,
                    this.firstNameParentInput.input.value,
                    this.emailParentInput.input.value,
                    this.phoneParentInput.input.value,
                    this.addressParentInput.value,
                    this.container.querySelector('input[name="payment-option"]:checked'),
                    this.container.querySelector('input[name="payment-option"]:checked').value,
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

        this.container.append(this.toast, this.formAddStudent, this.formParentDetail, this.actions);
    }

    getClassName() {
        return this.name;
    }

    render() {
        return this.container;
    }
}
