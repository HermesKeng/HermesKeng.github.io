> Oracalize is the medium between Ethereum and outside wrold. 
> To see more info [Oracalize Websiete](http://www.oraclize.it)
> This article show [Why we need Oracalize](https://blog.csdn.net/sportshark/article/details/77477842)
:::info
"We act as a data carrier, a reliable connection between Web APIs and your Dapp. There is no need to open additional trustlines as our good behaviour is enforced by cryptographic proofs." - Oracalize Official Introduction
:::

## The Mechanism on Oracalize 

- Before deep into Oracalize, I want to take about Oracal. **Oracal** is the third-party you have to talk to if you want to access the exteranl source in ethereum
- There are three entity in general. Latter will also be discussed in Oraclized
    - data-source : which types of information accessed by user application
    - query : the formula helps third-party know what kinds of data, where the data is going to access
    - oracle/oracle network : the medium between user in blockchain and outside world 
- **Why** we need Oraclize?
    - Oraclize provide a reliable and centralized way to let user access the data from external world.
    - To prevent tampering data, oracle network is introduced to make a consenus with others

- **Where** does Oracalize Run?
    - Widely public used blockchain ex. Ethereum,BitCoin
    - Private Chains with Oracalize have to integrated with Ethereum-Bridge
    - Other private distribute protocals such as Corda, Chain, HyperLedger also are supported by Oracalize
    - Non Blockchain Problem

- **What** data could be accessed from Oraclize ?
    - URL : use https api to access information
    - WolframAlpha
    - IPFS
    - computation
    - random
- How does Oraclize works ?
    - Below picture is the process for Oraclize searching for resource which you want.
    - When people request oraclize, Oraclize will access data resource and make a proof by auditor(Authentication Proof) to make sure the data could be trusted. After trusted data is ensured, it will admit Oraclize to transfer required data source back to user end. 
    ![The Process of Oraclize](https://image.ibb.co/gxFsDd/blockchain_auxilary_pic_001.jpg)
    - Why we need Authentication?
      - We cannot make sure the data acquired by Oraclize may not be tampered by Oraclize. Maybe Oraclized may change data by interest (In general, they don't. Nobody will break their brand). As a result, Oraclized establish an auditor which is overseen by public to ensure data integrity and security. 
      - There are three authentication proof,Android Proof, Ledger Proof, TLSNotary,runninng with Oraclize. Each proof executes on different engine. For example, TLSNotary proof operate on Amazon Web Service.
    
      - Where to Audit the data resource ?
          - [This Official Moniter could help people confirm whether data could be trusted](http://app.oraclize.it/service/monitor)

- Some developer tools on Oraclize
    1. [Remix with orcalize](http://dapps.oraclize.it/browser-solidity/#version=soljson-v0.4.24+commit.e67f0147.js) : Orcalize provides their own Remix which plugin in their source code. There are also some source code which you can test it. To comprehend how powerful it is.
        - Some notification
            - For now, Oraclzie only supports for pragma 0.4.20, so if you want to compile the solidity, please change compiler to 0.4.20 version
            - Change running environment on JVM

    2. [Official query testing Website](http://app.oraclize.it/home/test_query)
        - Simple Query command is oraclize_query()
        - A data-source such as URL,WolframAlpha, IPFS, 'Swarm' and others listed here

    3. [The tutorial that accesses randome number on orcalize](https://medium.com/coinmonks/using-apis-in-your-ethereum-smart-contract-with-oraclize-95656434292e)

    4. We aslo can use ethereum bridge to connect Oralclize with truffle

---
## Reference
1. https://blog.oraclize.it/understanding-oracles-99055c9c9f7b
2. https://blog.csdn.net/sportshark/article/details/77477842
3. https://medium.com/coinmonks/how-to-create-a-dapp-using-truffle-oraclize-ethereum-bridge-and-webpack-9cb84b8f6bcb
4. http://dapps.oraclize.it
5. http://app.oraclize.it/home/features
