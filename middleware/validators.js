const { setErrorResponse} = require('../helpers/helpers');

function itemBodyValidation(req, res, next) {

    const validationFunc = req.method === 'PUT' ? validateUpdateItemData : validateCreationItemData;
    if (!validationFunc(req.body.description, req.body.complete)) {
        return res.status(417).send(
            setErrorResponse(417, 'Expectation Failed')
        )
    }
    return next();
}

function validateCreationItemData(description, complete) {
    let isValid = !!description;
    isValid = complete === undefined ? false : isValid;
    if (isValid) {
        isValid = ['true', 'false'].includes(complete.toString()) ? isValid : false;
    }
    return isValid;
}

function validateUpdateItemData(description, complete) {
    let isValid = true;
    if (description === undefined && complete === undefined) {
        return false;
    }
    if (description !== undefined) {
        isValid = description.length > 0;
    }
    if (complete !== undefined) {
        isValid = ['true', 'false'].includes(complete.toString()) ? isValid : false;
    }
    return isValid;
}

module.exports = itemBodyValidation;
