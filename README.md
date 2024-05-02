# sunshine

Sunshine is a project made by Internet Computer (With the use of Motoko Programming Language). By Sunshine is a chat app that is made to have chats between users and integrating it with internet identity. Sunshine can also provide you to make bitcoin transactions using bitcoin regtest. Not only that, the chat system allows you to play games with others and have fun!

# Features
- Decentralized Authentication: Utilize Internet Identity for decentralized authentication to ensure secure and private access to the application. This will leverage blockchain technology to verify user identities without relying on traditional centralized servers.

- Scalable Real-Time Messaging: Implement a scalable real-time messaging system built on the Internet Computer, benefiting from its high throughput and low latency. This system can handle massive amounts of data and a high number of users without compromising speed or efficiency.

- Blockchain-Enabled Bitcoin Transactions: Enable Bitcoin transactions through the app using a blockchain-based approach, possibly through a regtest environment for safe testing and demonstrations. This will allow users to perform secure and verifiable transactions within their chats.

- Distributed Game Logic: Games integrated into the chat can run their backend logic directly on the Internet Computer, ensuring transparent and verifiable game mechanics. This decentralized approach prevents cheating and enhances performance.

- Immutable Chat History: Store chat histories on the blockchain, providing users with immutable records of their conversations. This feature not only enhances security but also allows for easy retrieval and verification of past interactions.

You can see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

To get it running, you can follow these instructions :
Go to visual studio code, create a new folder, and view terminal.

```
Make Sure to have Git installed.
> git clone https://github.com/TheoJustin/sunshine.git

Make sure to have dfx installed, also with WSL.
DFX Version : dfx 0.19.0

> cd sunshine
> npm install
> npm i -g ic-mops
> mops install

> wsl
> dfx start
> dfx deploy
> npm start
```