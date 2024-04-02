export default function (value, validation_type) {
    const type = validation_type.toLowerCase()

    if (typeof value == 'string' && value.trim() == '') {
        return "This field is required"
    }


    switch (type) {
        case 'email':
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value) ? true : 'invalid email';
        case 'tel':
            const regexPhone = /^\+?[1-9]\d{1,14}$/
            return regexPhone.test(value) ? true : 'invalid phone number';
        case 'password':
            return value.length >= 8 ? true : 'password must be 8 characters';
        case 'text':
            return value.length >= 3 ? true : 'value must be 3 characters';
        case 'file':
            return true;
        case 'number':
            return true;
        default:
            throw new Error("invalid validation type")
    }
}