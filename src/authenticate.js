import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser,
} from 'amazon-cognito-identity-js';

const userPoolId = 'us-east-2_3xYKhXC3M';
const clientId = '589v74d5ip29jcf899p7j18ct6';
const poolData = { UserPoolId: userPoolId, ClientId: clientId };


const authenticate = async ({ username, password }) => {
    let cognitoUser, sessionUserAttributes;
    return new Promise((resolve, reject) => {
        const userPool = new CognitoUserPool(poolData);
        const authenticationData = { Username: username, Password: password };
        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const userData = { Username: username, Pool: userPool };
        cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                const accessToken = result.getAccessToken().getJwtToken();
                const idToken = result.idToken.jwtToken;
                resolve(accessToken)
            },
            onFailure: function (err) { reject(err); },
            newPasswordRequired: function (userAttributes, requiredAttributes) { cognitoUser.completeNewPasswordChallenge("Test123", {}) }
        });
    })
}

export default authenticate;