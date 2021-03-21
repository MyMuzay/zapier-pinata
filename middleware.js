const includeJWT = (request, z, bundle) => {
if (bundle.authData.jwt) {
    request.headers.Authorization = `Bearer ${bundle.authData.jwt}`;
}
return request;
};

const handleErrors = (response, z) => {
/* In some cases the lower levels of the code can provide more spcific error
    messages. If they set this flag in the request, then we should fall back
    to them to handle the errors.
*/
if (response.request.disableMiddlewareErrorChecking) {
    return response;
}
let responseJson;
try {
    responseJson = response.json;
} catch (e) {
    throw new Error('An unexpected error occurred.');
}

if (response.status !== 200) {
    if (responseJson.error) {
    throw new Error(responseJson.error);
    } else {
    throw new Error('An unexpected error occurred. No error message received.');
    }
}
return response;
};

module.exports = {
    includeJWT,
    handleErrors
};