### Truffle - [Official site](https://truffleframework.com)

**Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.**

- Install truffle : 
    With Node.js 5.0+, use the command``` npm install -g truffle ``` or plus sudo previously
    
- To see the quickstart of truffle : [QuickStart](https://truffleframework.com/docs/getting_started/project)

- There are some notes extracted from the quickstart 
    ```truffle unbox <name>``` downloads any trufflebox

    - In truffle boxes, there are a lot of folders in it. In the contract folders, all of the smart contract is stored in there. ```Migrations.sol``` file manages and updates the status of contract 
    - file structure
        - **contracts/**: Directory for Solidity contracts
        - **migrations/**: Directory for scriptable deployment files
        - **test/**: Directory for test files for testing your application and contracts
        - **truffle.js**: Truffle configuration file
    - Running unit test on truffle 
        - Solidity :```truffle test <filePath>/<smart_contract>.sol```
        - JS:```truffle test <filePath>/<smart_contract>.sol```

    - Compile 
        - ```truffle compile```
        - It will produced a **build** folder in your file structure 

    - Migrate with truffle development 
        - ```truffle develop``` 
        - The terminal will diplay the below information to tell you the available acount in test private chain
        ```
        Truffle Develop started at 
        http://127.0.0.1:9545/
        Accounts:
        (0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
        (1) 0xf17f52151ebef6c7334fad080c5704d77216b732
        (2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
        (3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
        (4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
        (5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
        (6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
        (7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
        (8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
        (9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de
        Private Keys:
        (0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
        (1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
        (2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
        (3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
        (4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
        (5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
        (6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
        (7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
        (8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
        (9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5
        Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
        ⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
        Ensure you do not use it on production blockchains, or else you risk losing funds. 
        truffle(development)> 
        ```
        
        -```truffle migrate ```
        
        
---
### Utilize Truffle Develop to Create Account 
- ``` truffle develop``` will help you create 10 private accounts on truffle framework (without any installation)
    - Open **http://127.0.0.1:9545**
-  You also could use ganache to build accounts on truffle envrionment 

---
### Compilling Contracts on Truffle 
- Go to specefic folder and create a folder ```mkdir hello_ether```
- Enter into *hello_ether* ```cd hello_ether```
- ```truffle init``` helps your create a bare project of dapp on the framework
- **All of the smart contract(.sol)** needs to store in contract folder 
- In the contract folder, **Migrations.sol** helps you in deployment process
- Compilling the contract, go to the root folder of your project and type ```truffle compile``` 
    - After first compilation, contract only was compiled with updated information.
    - If you want to cover the contract, you can add ```-all```
---
### Migrations
- Migrations are Javascript files that help you deploy contract to the Ethereum Network
- After first times, migrations will only run on new files. If you want to reset the files, you can add ```-reset``` option after migration
- A simple migration file look like this :	

``` js
var MyContract = artifacts.require("MyContract");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
```

- Artifacts.require() is like nodejs require
- the name in the require parameter should be contract name instead of file name in each folder, as one contract files may contain many contracts
- All migrations must export a function via the **module.exports** syntax. Besides for the first parameter in module.exports must be **deployer**
- We will talk about deployer later 

--- 
### Testing on Truffle 

- There are two approaches testing on truffle 
    1. Javascript : test the program execute like outside world
    2. Solidity : test the program in contract 

- ```truffle test ``` is a command that runs testing program 

#### Test on Solidity
- Assert.equal(): This function is include in assertion library at default. To check the outcome from the solidity as well as expected value, Assert.equal() check if they are the same. In addtion, there are other functions we could called 
- DeployedAddresses.<contractName> :  This is provided by Truffle and is recompiled and relinked before each suite is run to provide your tests with Truffle's a clean room environment

