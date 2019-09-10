
const ExceptionConfig = {
	COMMON: {
        REQUEST_SUCCESS         : "The request has succeeded",
        ITEM_CREATE_SUCCESS     : "The item was created successfully",
        ITEM_UPDATE_SUCCESS     : "The item was updated successfully",
        ITEM_DELETE_SUCCESS     : "The item was deleted successfully",
        ITEM_NOT_FOUND          : "The item does not exist",
        VALIDATION_ERROR        : "Validation errors in your request",
        SERVER_OVERLOAD         : "The server is up, but overloaded with requests. Try again later!",
        INTERNAL_ERROR          : "Unexpected Error",
    },

    VALIDATION: {
        REQUIRE_FIELD           : "This field is required",
        INVALID_EMAIL           : "Please enter the valid email",
        INVALID_NUMBER          : "Please enter the number",
    },

    AUTH: {
        MISSING_TOKEN           : "No token provided.",
        MISSING_REFRESH_TOKEN   : "No refresh_token provided.",
        UNAUTHORIZED            : "Access denied due to missing subscription key. Make sure to include subscription key when making requests to this API.",
    }
}

export default ExceptionConfig
