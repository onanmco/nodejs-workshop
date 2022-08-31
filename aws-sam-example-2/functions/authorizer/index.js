const { verify } = require("jsonwebtoken");

exports.handler = async event => {
    const { methodArn, authorizationToken } = event;

    try {
        verify(authorizationToken, process.env.SECRET_KEY);
    } catch (e) {
        throw new Error("Unauthorized");
    }

    return {
        principalId: "user",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: "Allow",
                    Action: "execute-api:Invoke",
                    Resource: methodArn
                }
            ]
        }
    };
};