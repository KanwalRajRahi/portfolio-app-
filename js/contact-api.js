/**
 * Contact form API handler
 * 
 * This script handles the contact form submissions and follows the standard API response format:
 * 1. All responses include a 'status' field ('success' or 'error')
 * 2. Success responses include a 'data' object with the response payload
 * 3. Error responses include a 'message' field with error details
 * 4. Proper HTTP status codes are used
 * 5. API versioning with /api/v1/ prefix
 */

class ContactAPI {
    constructor() {
        this.apiEndpoint = '/api/v1/contact';
    }

    /**
     * Submit the contact form data
     * @param {Object} formData - Form data object
     * @returns {Promise} - Promise with the API response
     */
    async submitForm(formData) {
        try {
            // In a real implementation, this would be an actual API call
            // For demonstration, we're simulating the API response
            
            // Validate form data
            if (!this.validateForm(formData)) {
                return this.createErrorResponse(
                    'Validation failed. Please check your inputs.',
                    400
                );
            }
            
            // Simulate successful submission
            return this.createSuccessResponse({
                message: 'Your message has been sent successfully!',
                id: this.generateId(),
                timestamp: new Date().toISOString()
            }, 201);
            
        } catch (error) {
            console.error('Contact API Error:', error);
            return this.createErrorResponse(
                'An unexpected error occurred. Please try again later.',
                500
            );
        }
    }
    
    /**
     * Validate form data
     * @param {Object} formData - Form data to validate
     * @returns {Boolean} - True if valid, false otherwise
     */
    validateForm(formData) {
        // Basic validation
        if (!formData.name || formData.name.trim() === '') {
            return false;
        }
        
        if (!formData.email || !this.isValidEmail(formData.email)) {
            return false;
        }
        
        if (!formData.message || formData.message.trim() === '') {
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate email format
     * @param {String} email - Email to validate
     * @returns {Boolean} - True if valid, false otherwise
     */
    isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    /**
     * Generate a unique ID for the response
     * @returns {String} - Unique ID
     */
    generateId() {
        return 'msg_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Create a success response object
     * @param {Object} data - Success data
     * @param {Number} statusCode - HTTP status code
     * @returns {Object} - Response object
     */
    createSuccessResponse(data, statusCode = 200) {
        return {
            status: 'success',
            data: data,
            statusCode: statusCode
        };
    }
    
    /**
     * Create an error response object
     * @param {String} message - Error message
     * @param {Number} statusCode - HTTP status code
     * @returns {Object} - Response object
     */
    createErrorResponse(message, statusCode = 400) {
        return {
            status: 'error',
            message: message,
            statusCode: statusCode
        };
    }
}

// Export the API handler
const contactAPI = new ContactAPI();
