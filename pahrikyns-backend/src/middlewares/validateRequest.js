/**
 * Input Validation Middleware
 * Validates request payloads using express-validator
 */

const { validationResult, body, param, query } = require('express-validator');

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validation rules for common scenarios
 */
const validationRules = {
  // Auth validations
  email: () => body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  password: (minLength = 6) =>
    body('password')
      .isLength({ min: minLength })
      .withMessage(`Password must be at least ${minLength} characters`),
  
  // Course validations
  courseId: () => param('id').isUUID().withMessage('Valid course ID required'),
  
  // Pagination
  pagination: () => [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be >= 1'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100'),
  ],
  
  // File uploads
  fileSize: (maxMB = 2) => (req, res, next) => {
    if (req.file && req.file.size > maxMB * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: `File size must not exceed ${maxMB}MB`,
      });
    }
    next();
  },
};

module.exports = {
  handleValidationErrors,
  validationRules,
  validators: {
    body,
    param,
    query,
  },
};
