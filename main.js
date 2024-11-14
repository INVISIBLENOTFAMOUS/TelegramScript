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
    simple
} = require("./lib/myfunc")
const fs = require('fs')
const os = require('os')
const speed = require('performance-now')
const axios = require('axios')
const githubToken = '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';
const owner = 'INVISIBLENOTFAMOUS';
const repo = 'clientdatabase';
const databasePath = 'clientdatabase/database.json';
const database2Path = 'clientdatabase/database2.json';
const { Client } = require('ssh2');
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')


const adminfile = 'lib/adminID.json';
const premiumUsersFile = 'lib/premiumUsers.json';
try {
    premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}
try {
    adminUsers = JSON.parse(fs.readFileSync(adminfile));
} catch (error) {
    console.error('Error reading adminUsers file:', error);
}

const obfuscateCode = require('./lib/toolsobf');
let userSessions = {};

// Fungsi untuk mendapatkan konten file dari GitHub
async function getDatabaseContent(path) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  const sha = data.sha;
  
  return { content: JSON.parse(content), sha };
}

// Fungsi untuk memperbarui file di GitHub
async function updateDatabaseContent(path, newContent, sha) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  const result = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Memperbarui database',
      content: Buffer.from(JSON.stringify(newContent, null, 2)).toString('base64'),
      sha: sha
    })
  });

  return result.ok;
}

async function uploadToCdn(Path) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(Path)) return reject(new Error("File tidak ditemukan."));
        try {
            const form = new BodyForm();
            form.append("file", fs.createReadStream(Path));
            const response = await axios({
                url: "https://cdn.meitang.xyz/upload",
                method: "POST",
                headers: {
                    ...form.getHeaders()
                },
                data: form
            });
            return resolve(response.data.file.url)
        } catch (err) {
            return reject(new Error(`Gagal upload: ${err.message}`));
        }
    });
}

const bot = new Telegraf(BOT_TOKEN)

async function startClientX() {
    bot.on('callback_query', async (ClientX) => {
        // Split the action and extract user ID
        const action = ClientX.callbackQuery.data.split(' ');
        const user_id = Number(action[1]);

        // Check if the callback is from the correct user
        if (ClientX.callbackQuery.from.id !== user_id) {
            return ClientX.answerCbQuery('Uppss... this button not for you!', {
                show_alert: true
            });
        }

        const timestampi = speed();
        const latensii = speed() - timestampi;
        const user = simple.getUserName(ClientX.callbackQuery.from);
        const pushname = user.full_name;
        const username = user.username ? user.username : "YUDAMODSZX";
        const isCreator = [ClientX.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(username);
        
        const reply = async (text) => {
            for (let x of simple.range(0, text.length, 4096)) { // Split text to avoid overflow
                await ClientX.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                });
            }
        };
    
    
const domain = global.domain;
const plta = global.plta;
const pltc = global.pltc;        
        
        
        try {
            switch (action[0]) {
  
            }
        } catch (e) {
            console.log(e)
        }
    })        
    bot.command('help', async (ClientX) => {
    let user = simple.getUserName(ClientX.message.from);
    await ClientX.reply(lang.first_chat(BOT_NAME, user.full_name), {
        parse_mode: "MarkdownV2", // Updated to "MarkdownV2"
        disable_web_page_preview: true,
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'My Youtube',
                    url: "https://youtube.com/@YUDAMODS"
                }, {
                    text: 'OWNER 😁',
                    url: OWNER[0]
                }]
            ]
        }
    });
});

// Handle perintah /adddb
bot.command('adddb', async (ClientX) => {
  const args = ClientX.message.text.split(' ');
  
  const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }

  if (args.length !== 2) {
    return ClientX.reply('Gunakan format: /adddb <PhoneNumber>');
  }

  const phoneNumber = args[1];
  const userId = ClientX.from.id;

  if (!/^\d+$/.test(phoneNumber)) {
    return ClientX.reply('Nomor telepon tidak valid!');
  }

  try {
    // Ambil data dari database.json
    const { content: dbContent, sha: dbSha } = await getDatabaseContent(databasePath);
    // Ambil data dari database2.json
    const { content: db2Content, sha: db2Sha } = await getDatabaseContent(database2Path);
    
    // Cek apakah nomor sudah ada di database
    const isExist = dbContent.users.some(user => user.x === phoneNumber);
    if (isExist) {
      return ClientX.reply('Nomor sudah ada di database.');
    }

    // Tambahkan nomor baru ke database.json
    dbContent.users.push({ x: phoneNumber });
    // Tambahkan nomor baru ke database2.json
    db2Content.users.push({ x: `${phoneNumber}@s.whatsapp.net` });

    // Update kedua file di GitHub
    const dbUpdate = await updateDatabaseContent(databasePath, dbContent, dbSha);
    const db2Update = await updateDatabaseContent(database2Path, db2Content, db2Sha);

    if (dbUpdate && db2Update) {
      ClientX.reply(`Nomor ${phoneNumber} berhasil ditambahkan ke kedua database.`);
    } else {
      ClientX.reply('Gagal memperbarui database.');
    }

  } catch (error) {
    console.error(error);
    ClientX.reply('Terjadi kesalahan: ' + error.message);
  }
});

// Handle perintah /deldb
bot.command('deldb', async (ClientX) => {
  const args = ClientX.message.text.split(' ');
  
  const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }

  if (args.length !== 2) {
    return ClientX.reply('Gunakan format: /deldb <PhoneNumber>');
  }

  const phoneNumber = args[1];
  const userId = ClientX.from.id;

  try {
    // Ambil data dari database.json
    const { content: dbContent, sha: dbSha } = await getDatabaseContent(databasePath);
    // Ambil data dari database2.json
    const { content: db2Content, sha: db2Sha } = await getDatabaseContent(database2Path);
    
    // Cari dan hapus nomor dari database.json
    const dbIndex = dbContent.users.findIndex(user => user.x === phoneNumber);
    if (dbIndex === -1) {
      return ClientX.reply('Nomor tidak ditemukan di database.');
    }
    dbContent.users.splice(dbIndex, 1);

    // Cari dan hapus nomor dari database2.json
    const db2Index = db2Content.users.findIndex(user => user.x === `${phoneNumber}@s.whatsapp.net`);
    if (db2Index === -1) {
      return ClientX.reply('Nomor tidak ditemukan di database2.');
    }
    db2Content.users.splice(db2Index, 1);

    // Update kedua file di GitHub
    const dbUpdate = await updateDatabaseContent(databasePath, dbContent, dbSha);
    const db2Update = await updateDatabaseContent(database2Path, db2Content, db2Sha);

    if (dbUpdate && db2Update) {
      ClientX.reply(`Nomor ${phoneNumber} berhasil dihapus dari kedua database.`);
    } else {
      ClientX.reply('Gagal memperbarui database.');
    }

  } catch (error) {
    console.error(error);
    ClientX.reply('Terjadi kesalahan: ' + error.message);
  }
});

bot.command('cekdb', async (ClientX) => {
  const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
  try {
    // Ambil data dari database.json
    const { content: dbContent } = await getDatabaseContent(databasePath);

    // Cek apakah database kosong
    if (dbContent.users.length === 0) {
      return ClientX.reply('Database kosong.');
    }

    // Format nomor-nomor untuk ditampilkan
    const numbers = dbContent.users.map(user => user.x).join('\n');
    ClientX.reply(`Daftar nomor di database:\n${numbers}`);
    
  } catch (error) {
    console.error(error);
    ClientX.reply('Terjadi kesalahan: ' + error.message);
  }
});

// Handle perintah /resetdb
bot.command('resetdb', async (ClientX) => {
  const userId = ClientX.from.id;

  const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }

  try {
    // Set database.json dan database2.json kembali ke kondisi awal (kosong)
    const newDbContent = { users: [] };
    const newDb2Content = { users: [] };

    // Ambil SHA untuk kedua file
    const { sha: dbSha } = await getDatabaseContent(databasePath);
    const { sha: db2Sha } = await getDatabaseContent(database2Path);

    // Update kedua file di GitHub
    const dbUpdate = await updateDatabaseContent(databasePath, newDbContent, dbSha);
    const db2Update = await updateDatabaseContent(database2Path, newDb2Content, db2Sha);

    if (dbUpdate && db2Update) {
      ClientX.reply('Database berhasil direset.');
    } else {
      ClientX.reply('Gagal mereset database.');
    }

  } catch (error) {
    console.error(error);
    ClientX.reply('Terjadi kesalahan: ' + error.message);
  }
});

bot.on('tourl', async (ClientX) => {
  const message = ClientX.message;

  // Check if the message contains a media file
  if (message.photo || message.video || message.audio || message.document) {
    try {
      // Get the file ID based on the type of media
      const fileId = message.photo
        ? message.photo[message.photo.length - 1].file_id
        : message.video
        ? message.video.file_id
        : message.audio
        ? message.audio.file_id
        : message.document.file_id;

      // Download the file from Telegram
      const fileLink = await ClientX.telegram.getFileLink(fileId);
      const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' });
      const fileName = `media_${Date.now()}`;
      const filePath = `./${fileName}`;
      
      // Save the media to disk
      fs.writeFileSync(filePath, response.data);

      // Try uploading to Pomf
      try {
        const url = await uploadToPomf(filePath);
        await ClientX.reply(`Link: ${url}`);
      } catch (err) {
        // If Pomf upload fails, try uploading to CDN
        try {
          const urll = await uploadToCdn(filePath);
          await ClientX.reply(`Link: ${urll}`);
        } catch (err) {
          await ClientX.reply('Error uploading the media');
        }
      }

      // Remove the saved media file after uploading
      fs.unlinkSync(filePath);
    } catch (err) {
      await ClientX.reply('Failed to process the media');
    }
  } else {
    // If not a supported media type, send a reply
    await ClientX.reply('Harus berupa video, gambar, audio, atau stiker');
  }
});

bot.command('listadmin', async (ClientX) => {
    const chatId = ClientX.chat.id;
    const userId = ClientX.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));
    if (!isAdmin) {
        await ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', Markup.inlineKeyboard([
            [Markup.button.url('HUBUNGI ADMIN', 'https://t.me/YUDAMODSZX')]
        ]));
        return;
    }

    let page = '1';
    try {
        let response = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await response.json();
        let users = res.data;

        let messageText = "Berikut list admin :\n\n";
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🆔 ID: ${u.id} - 🌟 Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
                messageText += 'Script By YudaMods\n';
            }
        }
        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Admin: ${res.meta.pagination.count}`;

        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('BACK', JSON.stringify({ action: 'back', page: parseInt(res.meta.pagination.current_page) - 1 })),
                Markup.button.callback('NEXT', JSON.stringify({ action: 'next', page: parseInt(res.meta.pagination.current_page) + 1 }))
            ]
        ]);

        await ClientX.reply(messageText, keyboard);

    } catch (err) {
        console.error(err);
        await ClientX.reply('Terjadi kesalahan dalam mengambil data admin.');
    }
});

bot.action(/{"action":"back","page":\d+}/, async (ClientX) => {
    const data = JSON.parse(ClientX.match[0]);
    let page = data.page;
    if (page < 1) {
        page = 1;
    }
    // Panggil kembali API dengan page yang diminta
    try {
        let response = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await response.json();
        let users = res.data;

        let messageText = "Berikut list admin :\n\n";
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🆔 ID: ${u.id} - 🌟 Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
                messageText += 'By YudaMods\n';
            }
        }
        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Admin: ${res.meta.pagination.count}`;

        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('BACK', JSON.stringify({ action: 'back', page: parseInt(res.meta.pagination.current_page) - 1 })),
                Markup.button.callback('NEXT', JSON.stringify({ action: 'next', page: parseInt(res.meta.pagination.current_page) + 1 }))
            ]
        ]);

        await ClientX.editMessageText(messageText, keyboard);

    } catch (err) {
        console.error(err);
        await ClientX.reply('Terjadi kesalahan dalam mengambil data admin.');
    }
});

bot.action(/{"action":"next","page":\d+}/, async (ClientX) => {
    const data = JSON.parse(ClientX.match[0]);
    let page = data.page;
    // Panggil kembali API dengan page yang diminta
    try {
        let response = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await response.json();
        let users = res.data;

        let messageText = "Berikut list admin :\n\n";
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🆔 ID: ${u.id} - 🌟 Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
                messageText += 'By YudaMods\n';
            }
        }
        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Admin: ${res.meta.pagination.count}`;

        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('BACK', JSON.stringify({ action: 'back', page: parseInt(res.meta.pagination.current_page) - 1 })),
                Markup.button.callback('NEXT', JSON.stringify({ action: 'next', page: parseInt(res.meta.pagination.current_page) + 1 }))
            ]
        ]);

        await ClientX.editMessageText(messageText, keyboard);

    } catch (err) {
        console.error(err);
        await ClientX.reply('Terjadi kesalahan dalam mengambil data admin.');
    }
});



bot.command('createadmin', async (ClientX) => {
  const chatId = ClientX.chat.id;
  const userId = ClientX.from.id;

  const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }

  const commandParams = ClientX.message.text.split(' ')[1]; // Ambil argumen perintah
  if (!commandParams) {
    ClientX.reply('Format Salah! Penggunaan: /createadmin namapanel,idtele');
    return;
  }

  const params = commandParams.split(',');
  if (params.length < 2) {
    ClientX.reply('Format Salah! Penggunaan: /createadmin namapanel,idtele');
    return;
  }

  const panelName = params[0].trim();
  const telegramId = params[1].trim();
  const password = panelName + "117";

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: `${panelName}@gmail.com`,
        username: panelName,
        first_name: panelName,
        last_name: "Memb",
        language: "en",
        root_admin: true,
        password: password
      })
    });

    const data = await response.json();

    if (data.errors) {
      ClientX.reply(JSON.stringify(data.errors[0], null, 2));
      return;
    }

    const user = data.attributes;
    const userInfo = `
TYPE: user
➟ ID: ${user.id}
➟ USERNAME: ${user.username}
➟ EMAIL: ${user.email}
➟ NAME: ${user.first_name} ${user.last_name}
➟ LANGUAGE: ${user.language}
➟ ADMIN: ${user.root_admin}
➟ CREATED AT: ${user.created_at}
➟ LOGIN: ${domain}
    `;

    ClientX.reply(userInfo);
    bot.telegram.sendMessage(telegramId, `
╭──❏「 INFO DATA ADMIN PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
➡️ Rules : 
• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!

NGEYEL? KICK NO REFF NO DRAMA
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
THANKS FOR BUYING AT ClientX
    `);
  } catch (error) {
    console.error(error);
    ClientX.reply('Terjadi kesalahan dalam pembuatan admin. Silakan coba lagi nanti.');
  }
});




bot.command('1gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /1gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '1gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '1024';
  const cpu = '30';
  const disk = '1024';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});


bot.command('unli', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /unli namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + 'unli';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '0';
  const cpu = '0';
  const disk = '0';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});


bot.command('2gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /2gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '2gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '2024';
  const cpu = '40';
  const disk = '2024';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

bot.command('3gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /3gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '3gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '3072';
  const cpu = '90';
  const disk = '3072';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

bot.command('4gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /4gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '4gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '4048';
  const cpu = '110';
  const disk = '4048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});



bot.command('cekid', (ClientX) => {
    const sender = ClientX.from.username || "User";
    const text12 = `Hi @${sender} 👋
    
👤 From ${ClientX.from.id}
  └🙋🏽 kamu
  
 ID Telegram Anda: ${ClientX.from.id}
 Full Name Anda : @${sender}

🙏🏼 Permisi, bot akan pergi secara otomatis.
 Developer : @YUDAMODSZX`;

    // Mengirim pesan teks tanpa keyboard interaktif
    ClientX.reply(text12, { parse_mode: 'Markdown' });
});




bot.command('5gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /5gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '5gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '5048';
  const cpu = '140';
  const disk = '5048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

bot.command('6gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /6gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '6gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '6048';
  const cpu = '170';
  const disk = '6048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

bot.command('7gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /7gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '7gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '7048';
  const cpu = '200';
  const disk = '7048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});


bot.command('8gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /8gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '8gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '8048';
  const cpu = '230';
  const disk = '8048';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});










bot.command('listsrv', async (ClientX) => {
    const chatId = ClientX.chat.id;
    const userId = ClientX.from.id;

const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }




    let page = 1;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";

        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });

            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        ClientX.reply(messageText);
    } catch (error) {
        console.error(error);
        ClientX.reply('Terjadi kesalahan dalam memproses permintaan.');
    }
});
  
  bot.command('1gb', async (ClientX) => {
  const text = ClientX.message.text.split(' ').slice(1).join(' ');
  
 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }
   
  
  const t = text.split(',');
  if (t.length < 2) {
    return ClientX.reply('Invalid format. Usage: /1gb namapanel,idtele');
  }

  const username = t[0];
  const u = t[1];
  const name = username + '1gb';
  const egg = global.eggs;
  const loc = global.loc;
  const memo = '1024';
  const cpu = '30';
  const disk = '1024';
  const email = `${username}@gmail.com`;
  const akunlo = global.pp;
  const password = `${username}001`;

  let user;
  let server;

  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        return ClientX.reply('Email already exists. Please use a different email.');
      } else {
        return ClientX.reply(`Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
    }

    user = data.attributes;

    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: 'npm start',
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start',
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });

    const data2 = await response2.json();
    server = data2.attributes;

  } catch (error) {
    return ClientX.reply(`Error: ${error.message}`);
  }

  if (user && server) {
    ClientX.reply(`BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      ClientX.telegram.sendPhoto(u, akunlo, {
        caption: `Hai @${u}
        
╭──❏「 INFO DATA PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ YUDA MODS  ]━━━━
THANKS FOR YOUR SUDAH BELI PANEL DI YUDAMODS
ADA KENDALA CHAT YUDAMODS YA `,
      });
      ClientX.reply('PANEL CREATE SUKSES.');
    }
  } else {
    ClientX.reply('Gagal membuat data panel. Silakan coba lagi.');
  }
});

  
 bot.command('installpanel', async (ClientX) => {
  const text = ClientX.message.text.split(' ')[1]; // Mengambil argumen setelah perintah /installpanel
  if (!text) {
    return ClientX.reply('Format salah!\nPenggunaan: /installpanel ipvps,password,domainpnl,domainnode,ramvps (contoh: 8000 = ram 8)\nscript By YudaMods');
  }
  
  const t = text.split(',');
  if (!global.adminId.includes(String(ClientX.from.id))) {
    return ClientX.reply('Fitur Ini Khusus Owner Saya!!!');
  }

  if (t.length < 5) {
    return ClientX.reply('Format salah!\nPenggunaan: /installpanel ipvps,password,domainpnl,domainnode,ramvps ( contoh : 8000 = ram 8\nscript By YudaMods');
  }

  const ipvps = t[0];
  const passwd = t[1];
  const subdomain = t[2];
  const domainnode = t[3];
  const ramvps = t[4];

  const connSettings = {
    host: ipvps,
    port: 22,
    username: 'root',
    password: passwd
  };

  let password = generateRandomPassword();
  const command = 'bash <(curl -s https://pterodactyl-installer.se)';
  const commandWings = 'bash <(curl -s https://pterodactyl-installer.se)';
  const conn = new Client();

  conn.on('ready', () => {
    ClientX.reply('PROSES PENGINSTALLAN SEDANG BERLANGSUNG MOHON TUNGGU 5-10MENIT\nscript By YudaMods');
    conn.exec(command, (err, stream) => {
      if (err) throw err;

      stream.on('close', (code, signal) => {
        console.log(`Stream closed with code ${code} and signal ${signal}`);
        installWings(conn, domainnode, subdomain, password, ramvps);
      }).on('data', (data) => {
        handlePanelInstallationInput(data, stream, subdomain, password);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }).connect(connSettings);

  async function installWings(conn, domainnode, subdomain, password, ramvps) {
    ClientX.reply('PROSES PENGINSTALLAN WINGS SEDANG BERLANGSUNG MOHON TUNGGU 5 MENIT\nscript By YudaMods');
    conn.exec(commandWings, (err, stream) => {
      if (err) throw err;
      stream.on('close', (code, signal) => {
        console.log('Wings installation stream closed with code ${code} and signal ${signal}');
        createNode(conn, domainnode, ramvps, subdomain, password);
      }).on('data', (data) => {
        handleWingsInstallationInput(data, stream, domainnode, subdomain);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }

  async function createNode(conn, domainnode, ramvps, subdomain, password) {
    const command = 'bash <(curl -s https://raw.githubusercontent.com/wndrzzka/installer-pterodactlty/main/install.sh)';
    ClientX.reply('MEMULAI CREATE NODE & LOCATION\nscript By YudaMods');
    conn.exec(command, (err, stream) => {
      if (err) throw err;
      stream.on('close', (code, signal) => {
        console.log('Node creation stream closed with code ${code} and ${signal} signal');
        conn.end();
        sendPanelData(subdomain, password);
      }).on('data', (data) => {
        handleNodeCreationInput(data, stream, domainnode, ramvps);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }

  function sendPanelData(subdomain, password) {
    ClientX.reply(`DATA PANEL ANDA\n\nUSERNAME: admin\nPASSWORD: ${password}\nLOGIN: ${subdomain}\n\nNote: Semua Instalasi Telah Selesai Silahkan Create Allocation Di Node Yang Di buat Oleh Bot Dan Ambil Token Configuration dan ketik .startwings (token) \nNote: HARAP TUNGGU 1-5MENIT BIAR WEB BISA DI BUKA\nscript By YudaMods`);
  }

  function handlePanelInstallationInput(data, stream, subdomain, password) {
    const input = data.toString();
    if (input.includes('Input')) stream.write('0\n');
    if (input.includes('Input')) stream.write('\n');
    if (input.includes('Input')) stream.write('1248\n');
    if (input.includes('Input')) stream.write('Asia/Jakarta\n');
    if (input.includes('Input')) stream.write('admin@gmail.com\n');
    if (input.includes('Input')) stream.write('admin\n');
    if (input.includes('Input')) stream.write(`${password}\n`);
    if (input.includes('Input')) stream.write(`${subdomain}\n`);
    if (input.includes('Input')) stream.write('y\n');
    if (input.includes('Please read the Terms of Service')) stream.write('A\n');
    if (input.includes('Input')) stream.write('1\n');
    console.log('STDOUT: ' + data);
  }

  function handleWingsInstallationInput(data, stream, domainnode, subdomain) {
    const input = data.toString();
    if (input.includes('Input')) stream.write('1\n');
    if (input.includes('Input')) stream.write('y\n');
    if (input.includes('Input')) stream.write(`${subdomain}\n`);
    if (input.includes('Input')) stream.write(`${domainnode}\n`);
    if (input.includes('Input')) stream.write('admin@gmail.com\n');
    console.log('STDOUT: ' + data);
  }

  function handleNodeCreationInput(data, stream, domainnode, ramvps) {
    stream.write('iniwannbroku\n');
    stream.write('4\n');
    stream.write('SGP\n');
    stream.write('Autonode WannFyy\n');
    stream.write(`${domainnode}\n`);
    stream.write(`${ramvps}\n`);
    stream.write('1\n');
    console.log('STDOUT: ' + data);
  }
});



bot.hears(/\/3 (.+) (.+)/, async (ClientX) => {
  const subdomain = ClientX.match[1];
  const ip = ClientX.match[2];
  const userId = ClientX.from.id;
  
  // Memanggil fungsi createSubdomain
  const response = await createSubdomain(subdomain, ip, 'e60307683c18389584e9ae2f9fa707b2', '9hc8x5B4TewRTpXxETV_laVGksk3MyCfBXOgHgmg');
  
  if (response.success) {
    await ClientX.reply(response.message);
  } else {
    await ClientX.reply('Failed to create subdomain.');
  }
});

bot.command('obf1', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf1' };
    ClientX.reply('📄 Please send your .js file for Obfuscation (Rename All Variable Var).');
});

// Command for obfuscation type obf2 (Hexadecimal Anti Dec)
bot.command('obf2', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf2' };
    ClientX.reply('📄 Please send your .js file for Obfuscation (Hexadecimal Anti Dec).');
});

// Command for obfuscation type obf3 (Random Deadcode)
bot.command('obf3', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf3' };
    ClientX.reply('📄 Please send your .js file for Obfuscation (Random Deadcode).');
});

// Command for obfuscation type obf4 (Return Obfuscation)
bot.command('obf4', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf4' };
    ClientX.reply('📄 Please send your .js file for Return Obfuscation.');
});

//mangled
bot.command('obf5', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf5' };
    ClientX.reply('📄 Please send your .js file for Mangled Obfuscation (Type 5).');
});

bot.command('obf6', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf6' };
    ClientX.reply('📄 Please send your .js file for Mangled Obfuscation (Type 6).');
});

bot.command('obf7', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf7' };
    ClientX.reply('📄 Please send your .js file for Mangled Obfuscation (Type 7).');
});

bot.command('obf8', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf8' };
    ClientX.reply('📄 Please send your .js file for Mangled Obfuscation (Type 8).');
});

bot.command('obf9', (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODS' }]
        ]
      }
    });
    return;
  }

    userSessions[userId] = { obfuscationType: 'obf9' };
    ClientX.reply('📄 Please send your .js file for Mangled Obfuscation (Type 9).');
});

bot.on('document', async (ClientX) => {
    const userId = ClientX.from.id.toString();

 const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(ClientX.from.id));

  if (!isAdmin) {
    ClientX.reply('Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'HUBUNGI ADMIN', url: 'https://t.me/YUDAMODSZX' }]
        ]
      }
    });
    return;
  }

    const fileName = ClientX.message.document.file_name;

    if (!fileName.endsWith('.js')) {
        return ClientX.reply('❌ Please send a file with the .js extension.');
    }

    if (!userSessions[userId] || !userSessions[userId].obfuscationType) {
        return ClientX.reply('❌ Please select an obfuscation type first using one of the commands.');
    }

    const obfuscationType = userSessions[userId].obfuscationType;

    await handleDocumentObfuscation(ClientX, obfuscationType);
});

async function handleDocumentObfuscation(ClientX, option) {
    const fileId = ClientX.message.document.file_id;
    const loadingMessage = await ClientX.reply('🚧 Preparing obfuscation...');

    try {
        const fileLink = await ClientX.telegram.getFileLink(fileId);
        const code = await downloadFile(fileLink);

        await ClientX.telegram.editMessageText(ClientX.chat.id, loadingMessage.message_id, undefined, '🔄 Encrypting...');
        const obfuscatedCode = await obfuscateCode(code, option);

        await ClientX.telegram.editMessageText(ClientX.chat.id, loadingMessage.message_id, undefined, '🎉 Obfuscation complete! Sending file...');
        await ClientX.replyWithDocument({ source: Buffer.from(obfuscatedCode), filename: 'obfuscated.js' }, {
            caption: `Tools Obf: ${option}\nBY YUDAMODS`,
            parse_mode: 'Markdown'
        });

    } catch (error) {
        console.error('Error during obfuscation process:', error);
        await ClientX.telegram.editMessageText(ClientX.chat.id, loadingMessage.message_id, undefined, '❌ An error occurred during obfuscation.');
    }
}
 
 
 
async function downloadFile(fileLink) {
    try {
        const response = await axios.get(fileLink);
        return response.data;
    } catch (error) {
        console.error('Error downloading the file:', error);
        throw new Error('Failed to download the file');
    }
}




           
    bot.on('message', async (ClientX) => {
        require("./case")(ClientX, bot)
    })

    bot.launch({
        dropPendingUpdates: true
    })

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Author": "https://t.me/YUDAMODSZX"
        })
    })
}
startClientX()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
