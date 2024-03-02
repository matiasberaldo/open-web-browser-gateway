import NearRPC from './rpc.js';
import * as naj from 'near-api-js';
import js_sha256 from 'js-sha256';

export default class OpenWeb {
    static async fetch(url: string): Promise<string> {
        const accountId = `${url.split(".near").shift()}.near`;

        if (accountId) {
            const data = await NearRPC.getAccountIndexWidget(accountId);
            
            if (typeof data === "object") {
                const { [accountId]: { routes: { index: { component, signature } } } } = data;
                const { [component]: code } = await NearRPC.getWidget(accountId, component);
                
                const verification = OpenWeb.verifySignature({
                    accountId,
                    message: code,
                    signature: signature.value,
                    nonce: signature.nonce,
                    publicKey: signature.publicKey
                });

                console.log("Verification: ", verification);
                return code;
            }
        }

        return "";
    }
    static verifySignature({ accountId, message, nonce, publicKey, signature }: { accountId: string, message: string, nonce: Array<Number>, publicKey: string, signature: string }) {
        const payload = { message: js_sha256.sha256(message), nonce, recipient: accountId, callbackUrl: "http://localhost:3000/webbrowser.near/widget/OpenWebBrowser.Pages.SignCode" };
        const to_sign = Uint8Array.from(js_sha256.sha256.array(JSON.stringify(payload)))
      
        // Reconstruct the signature from the parameter given in the URL
        let real_signature = Buffer.from(signature, 'base64')
      
        // Use the public Key to verify that the private-counterpart signed the message
        const myPK = naj.utils.PublicKey.from(publicKey)
        return myPK.verify(to_sign, real_signature)
      }
}