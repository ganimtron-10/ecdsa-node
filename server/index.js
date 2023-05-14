const secp = require("ethereum-cryptography/secp256k1");
const keccak256 = require("ethereum-cryptography/keccak").keccak256;
const utf8ToBytes = require("ethereum-cryptography/utils").utf8ToBytes;

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "031b67ad3052195d94b004c8dffc9af1b44b8a9fcc503d0e49ac89f4ca3df857cf": 100,
  "0392ffd69811c2ef32eb0a94b9b647f171174b7a634d2191c1649c13106f3b0197": 50,
  "0218891b7e8719710fb9b85f34fbac3d80ced99ffd0543fc75fbf8fbb8d0f5ccbd": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, signature, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    let msgHash = keccak256(utf8ToBytes("Testing Public Key!"));
    if (secp.secp256k1.verify(signature, msgHash, sender)) {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    } else {
      res.status(400).send({ message: "Signature Doesn't Match!" });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
