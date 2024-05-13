<h1 align="center">
  <br>
  <a href="https://github.com/TheoJustin/sunshine/"><img src="https://i.ibb.co/c3ZpB0d/Logo-Sunshine-removebg.png" alt="Sunshine" width="200"></a>
  <br>
  	Sunshine
  <br>
</h1>

<h4 align="center">A gaming chat system with transactional cryptocurrency features built on top of <a href="https://internetcomputer.org/docs/current/motoko/tutorial" target="_blank">Internet Computer</a>.</h4>

Sunshine is a project made by Internet Computer (With the use of Motoko Programming Language). Sunshine is a chat app that is made to have chats between users and integrating it with internet identity. Sunshine can also provide you to make bitcoin transactions. Not only that, the chat system allows you to play games with others and have fun!

## 🚩 Features
- Scalable Real-Time Messaging : Implement a scalable real-time messaging system built on the Internet Computer, benefiting from its high throughput and low latency. This system can handle massive amounts of data and a high number of users without compromising speed or efficiency.
- Blockchain-Enabled Cryptocurrency Transactions : Enable cryptocurrency transactions through the app using a blockchain-based approach, possibly through a regtest environment for safe testing and demonstrations. This will allow users to perform secure and verifiable transactions within their chats.
- Distributed Game Logic : Games integrated into the chat can run their backend logic directly on the Internet Computer, ensuring transparent and verifiable game mechanics. This decentralized approach prevents cheating and enhances performance.

You can see the following documentation for Internet Computer online:
- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

## 📦 Packages
- Make sure to have Git installed.
    - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Make sure to have WSL installed
    - powershell > type in "wsl --install"
- Make sure to have Visual Studio Code installed
https://code.visualstudio.com/ With the extensions :
    - Motoko Language
    https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko
    - Remote WSL
    https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
Make sure to have dfx installed, update if needed.
DFX Version : dfx 0.19.0

For more details, you can check the installation docs here :
https://docs.google.com/document/d/e/2PACX-1vTNicu-xuf4EiLAehHIqgfpjAnPjzqMGT-xpZVvYaAWNyvzYK_Ceve_me4PVRIxpzH7ea5PAX9NxGwY/pub

## 📜 Getting Started
Finally, to get it running, you can follow these instructions :
Go to visual studio code, create a new folder, and view terminal.

```
git clone https://github.com/TheoJustin/sunshine.git
cd sunshine
npm install
npm i -g ic-mops

wsl
mops install
dfx start
// make a new wsl terminal
dfx deploy
npm start
```


## 📧 Contact Information
If any questions occured, or in the need of any discussion or details,
please reach out at our about us page or contact at :
- Email : theojustinx@gmail.com
- Telegram : https://t.me/theojustin
- Discord : tj_7