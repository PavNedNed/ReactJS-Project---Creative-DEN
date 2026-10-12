function graphicValidation(values) {
    let errors = {};

    if (values.title.trim().length < 3) {
        errors['title'] = "Title must be at least 3 characters long";
    }
    if (!values.title.trim()) {
        errors['title'] = "Title is required";
    }

    if (!values.imageUrl.trim()) {
        errors['imageUrl'] = "Image URL is required";
    }

    if (!values.category) {
        errors['category'] = "Please select a category";
    }

    if (values.description.trim().length < 10) {
        errors['description'] = "Description must be at least 10 characters long";
    }
    if (!values.description.trim()) {
        errors['description'] = "Description is required";
    }

    if (!Number.isFinite(values.price) || values.price < 1) {
        errors['price'] = "Price must be at least 1 USD";
    }

    return errors;
}

export default graphicValidation;