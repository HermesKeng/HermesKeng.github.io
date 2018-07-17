1. install truffle ```npm install -g truffle```
2. ```truffle init ``` create a bare structure in project
3. Add your smart contract(.sol) in contract folder
    - If you want to run a test code without UI, use the command ```truffle test ```
4. ```truffle compile``` compile the code and create constract json files
5. ```truffle develop``` helps you test your dapp without deploying, you can test it in your local environment.
6. ``` truffle migrate``` deploy contracts to the Ethereum network
7. Add the HTML/CSS/JS in your own file system
    - index.js is the js file used in our website. It connect front and back end
    - The workflow of index.js 
        a. init
        b. initWeb3
        c. initContract
        d. bindevent -> create listener to listen event
        e. each event registered in js file
    - How to connect to dapp backend?
    ```javascript 
        App.contracts.Bank.deployed().then(function(instance){
        bankInstance =instance;
        return bankInstance.getOwner.call({from:account});
        }) 
      ```
      - deployed is such a process, as a result then can be called
      - Call the contract method by instance 
      - After this command add then can accept the retrun value/receipt
8. ```npm run dev ```start your own dapp, go to http://localhost:9546 and you can test your dapp
