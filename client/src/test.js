import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";

for (let i = 0; i < 3; i++) {
    let pk = secp256k1.utils.randomPrivateKey()
    console.log("PrivateKey:" + toHex(pk));

    console.log("PublicKey:" + toHex(secp256k1.getPublicKey(pk)));
    console.log("\n")
}

/*
PrivateKey:82328590fb0abd0947c2d085fee41446014609b7adf026fdecabefac58c62d9e
PublicKey:031b67ad3052195d94b004c8dffc9af1b44b8a9fcc503d0e49ac89f4ca3df857cf


PrivateKey:aa7edd9a79d3c3fb72ea215346e42a48f4668a38ec8e3c1f5585cad5cde2f5a6
PublicKey:0392ffd69811c2ef32eb0a94b9b647f171174b7a634d2191c1649c13106f3b0197


PrivateKey:75e2b64999e8c770d74b6d31b62cab313057a7c4b20c047b10c2259aa7ee488e
PublicKey:0218891b7e8719710fb9b85f34fbac3d80ced99ffd0543fc75fbf8fbb8d0f5ccbd */