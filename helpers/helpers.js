function setUpFieldsToUpdate(complete, description) {
    const dataToUpdate = {};
    if (complete !== undefined)
        dataToUpdate.complete = complete;

    if (description !== undefined)
        dataToUpdate.description = description;
    return dataToUpdate;
}

function setErrorResponse(statusCode, message) {
    return {
        status: statusCode,
        message
    }
}

module.exports =  {
    setUpFieldsToUpdate,
    setErrorResponse
};
