import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData={
    UserPoolId: "us-east-1_TWDPSgMEO",
    ClientId: "12vgk6r1uv15p69j5cfrv3ec9u"

}

export default new CognitoUserPool(poolData);