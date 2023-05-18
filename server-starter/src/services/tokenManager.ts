import jwt, { JwtPayload, VerifyOptions } from 'jsonwebtoken'
import env from '../config/env'

class TokenManager {

    private issuer = 'OrgName';
    private algorithms: VerifyOptions['algorithms'] = ["ES512"]
    private audience: (string | RegExp)[] = env.tokenAudience
    verifyToken(token: string): TokenPayload {
        if (env.useBackCompatAuthToken) {
            const tokenData = jwt.verify(token, env.backCompatAuthTokenSecret) as any
            console.log(`back compatibility mode: ${JSON.stringify(tokenData)}`)
            return new TokenPayload(tokenData.data.id)
        }
        const verifyOptions = {
            issuer: this.issuer,
            audience: this.audience,
            expiresIn: "1y",
            algorithms: this.algorithms
        };
        const legit = jwt.verify(token, env.jwtPublicKey, verifyOptions) as JwtPayload
        //console.log(`JWT verification result: \n${JSON.stringify(legit)}\n`);
        //console.log(`JWT verification result: sub(userID): ${legit.sub}`);
        //console.log(`JWT verification result: iss: ${legit.iss}`);
        //console.log(`JWT verification result: aud: ${legit.aud}`);
        return new TokenPayload(legit.sub)
    }
}

export default new TokenManager()

class TokenPayload {
    userID: string = ""
    constructor(userID: string) {
        this.userID = userID
    }
}