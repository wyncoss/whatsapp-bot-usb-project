const { Client } = require("whatsapp-web.js");
const client = new Client();
const qrcode = require("qrcode-terminal");
// const nodemailer = require('nodemailer');//npm install nodemailer
// const readline = require('readline');

async function run() {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Bien! WhatsApp conectado.");
  });

  await client.initialize();

  function cumprimentar() {
    const dataAtual = new Date();
    const hora = dataAtual.getHours();

    let saudacao;

    if (hora >= 6 && hora < 12) {
      saudacao = "Buenos dias!";
    } else if (hora >= 12 && hora < 17) {
      saudacao = "Buenas tardes!";
    } else {
      saudacao = "Buenas noches!";
    }

    return saudacao;
  }

  function getDate() {
    return new Date().toLocaleString();
  }

  // const delay = ms => new Promise(res => setTimeout(res, ms));

  client.on("message", async (msg) => {
    if (msg.body === "1") {
      msg.reply(cumprimentar());
    } else if (msg.body === "2") {
      msg.reply(getDate());
    } else {
      msg.reply(
        "Selecciona una opción:\n\n1. Recibir un saludo dependiendo la hora del día. \u1F4B\n2. Obtener la fecha actual. \u231A"
      );
    }
  });
}

run().catch((err) => console.error(err));
