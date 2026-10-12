function authValidation(values, isRegister = false) {
    let errors = {};

    if (values.email.trim().length < 5) {
        errors['email'] = "Email must be at least 5 characters long";
    }
    if (!values.email.trim()) {
        errors['email'] = "Email is required";
    }

    if (values.password.trim().length < 6) {
        errors['password'] = "Password must be at least 6 characters long";
    }

    if (!values.password.trim()) {
        errors['password'] = "Password is required";
    }

    if (isRegister && values.repass !== values.password) {
        errors['repass'] = "Please confirm your password";
    }

    return errors;
}

export default authValidation;