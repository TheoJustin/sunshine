# Sunshine

Sunshine is a project made by Internet Computer (With the use of Motoko Programming Language). Sunshine is a chat app that is made to have chats between users and integrating it with internet identity. Sunshine can also provide you to make bitcoin transactions. Not only that, the chat system allows you to play games with others and have fun!

# Features
- Decentralized Authentication: Utilize Internet Identity for decentralized authentication to ensure secure and private access to the application. This will leverage blockchain technology to verify user identities without relying on traditional centralized servers.
- Scalable Real-Time Messaging: Implement a scalable real-time messaging system built on the Internet Computer, benefiting from its high throughput and low latency. This system can handle massive amounts of data and a high number of users without compromising speed or efficiency.
- Blockchain-Enabled Bitcoin Transactions: Enable Bitcoin transactions through the app using a blockchain-based approach, possibly through a regtest environment for safe testing and demonstrations. This will allow users to perform secure and verifiable transactions within their chats.
- Distributed Game Logic: Games integrated into the chat can run their backend logic directly on the Internet Computer, ensuring transparent and verifiable game mechanics. This decentralized approach prevents cheating and enhances performance.
- Immutable Chat History: Store chat histories on the blockchain, providing users with immutable records of their conversations. This feature not only enhances security but also allows for easy retrieval and verification of past interactions.

You can see the following documentation for Internet Computer online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

DISCLAIMER!
- Make sure to have Git installed.
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Make sure to have WSL installed
powershell > type in "wsl --install"
- Make sure to have Visual Studio Code installed
https://code.visualstudio.com/
    With the extensions :
    - Motoko Language
    https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko
    - Remote WSL
    https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
Make sure to have dfx installed.
DFX Version : dfx 0.19.0

For more details, you can check the installation docs here :
https://docs.google.com/document/d/e/2PACX-1vTNicu-xuf4EiLAehHIqgfpjAnPjzqMGT-xpZVvYaAWNyvzYK_Ceve_me4PVRIxpzH7ea5PAX9NxGwY/pub

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
dfx deploy
npm start
```