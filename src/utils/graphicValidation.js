function graphicValidation(values) {
    if (values.title.trim().length < 3) {
        return "Title must be at least 3 characters long.";
    }

    if (!values.imageUrl.trim()) {
        return "Image URL is required.";
    }

    if (!values.category) {
        return "Please select a category.";
    }

    if (values.description.trim().length < 10) {
        return "Description must be at least 10 characters long.";
    }

    if (!Number.isFinite(values.price) || values.price < 1) {
        return "Price must be at least 1 USD.";
    }

    return null;
}

export default graphicValidation;