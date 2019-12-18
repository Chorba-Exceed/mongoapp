const { setErrorResponse } = require('../helpers/helpers');

function validateUpdateItemData(req, res, next) {
  let isValid = true;
  const { description, complete } = req.body;
  if (description === undefined && complete === undefined) {
    isValid = false;
  }
  if (description !== undefined) {
    isValid = description.length > 0;
  }
  if (complete !== undefined) {
    isValid = ['true', 'false'].includes(complete.toString()) ? isValid : false;
  }
  if (!isValid) {
    return res.status(406).send(
      setErrorResponse(406, 'Not Acceptable'),
    );
  }
  return next();
}

module.exports = validateUpdateItemData;
