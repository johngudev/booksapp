export const getStepErrorValidation = ({
    currentStep,
    bookId,
    date,
    description,
    time,
}: {
    currentStep: number;
    bookId: number;
    date: string;
    description: string;
    time: string;
}) => {
    let errors = [];

    if (currentStep === 0) {
        // require book Id
        if (!bookId) {
            errors.push('Book is required.');
        }
    }

    if (currentStep === 1) {
        // require date, time, description
        if (!date) {
            errors.push('Date is required.');
        }
        if (!description) {
            errors.push('Description is required.');
        }
        if (!time) {
            errors.push('Time is required.');
        }
    }

    if (currentStep === 2) {
        // require everything
        if (!bookId) {
            errors.push('Book is required.');
        }
        if (!date) {
            errors.push('Date is required.');
        }
        if (!description) {
            errors.push('Description is required.');
        }
        if (!time) {
            errors.push('Time is required.');
        }
    }

    return errors;
};
