import { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Signature() {

    const [privateKey, setPrivateKey] = useState("");
    const [signatureMsg, setSignatureMsg] = useState("Your Signature Message will be here...");

    function genSignature(evt) {
        setPrivateKey(evt.target.value);
        let msgHash = keccak256(utf8ToBytes("Testing Public Key!"));
        try {
            let sign = secp256k1.sign(msgHash, evt.target.value);
            // console.log(sign.recoverPublicKey(msgHash).toHex());
            navigator.clipboard.writeText(sign.toDERHex())
            setSignatureMsg(sign.toDERHex());
        } catch (e) {
            setSignatureMsg("Private Key Not Valid!");
        }


    }

    return (
        <form className="container transfer">
            <h1>Generate Signature</h1>

            <p>Feel free to Enter your Private Key as this is Client Side conversion.</p>

            <label>
                Enter Private Key:
                <input
                    type="password"
                    placeholder="44ea443..."
                    value={privateKey}
                    onChange={genSignature}
                ></input>
            </label>

            <label>
                Signature: {signatureMsg}
            </label>
        </form >
    );
}

export default Signature;