

> Offline Transaction, also called raw transaction is a mechanism helping you make a transaction without wallet-built component, such as MetaMask, geth.

- From geth console, we only need *from*,*to*,and *value* to make a transaction
- In raw transactions, there are addtional attribute *gasPrice*,*gasLimit* and *nouce*. We need to fill up all data in it.

- Todo List with the application
    - [ ] Create a private chain network
        - [ ] Create a key file 🔑
        - [ ] Start a miner
    - [ ] Create a smart contract
    - [ ] Publish your smart contract on private chain
        - [ ] Truffle compile,migrate
        - [ ] Get the Contract Address
    - [ ] Access the contract on your front-end
        - [ ] Import Web3.js in your application 🍻
        - [ ] Access Contract data (call) 📞
        - [ ] Import your key file 🔑
        - [ ] Sign Transaction 💰
        - [ ] SendSignedTransaction
- Create a private chain network 
基本上如何建造Ethereum的PoA機制，在[使用 go-ethereum 1.6 Clique PoA consensus 建立 Private chain (1)](https://medium.com/taipei-ethereum-meetup/使用-go-ethereum-1-6-clique-poa-consensus-建立-private-chain-1-4d359f28feff)就已提及到該怎麼架設一個自有的測試區塊鏈環境，自己能夠挖礦🔨，並且驗證寫入新的區塊至chain上，大家可以參考這篇文章進行架設，唯有一些額外的option必須在啟動geth時就先設定好。
在啟動geth指令部分，我啟動的指令碼為```
geth --datadir ./data --networkid 55661 --port 5000 --rpc  --rpccorsdomain "*" --rpcapi="eth,web3,personal,net" console```
為了之後能和前端溝通，而前端必須利用RPC的方式和節點進行溝通，再寫至鏈上。
- Create a smart contract
由於這篇文章主要的目的並不在智能合約，因此我只是簡單寫一個合約，去驗證應用可以執行，合約的內容大致上為設定、取得計數器的內容，並且當你設定計數器時，必須花費100 coin，才可以進行設定，合約內容如下：
    ``` solidity
    pragma solidity ^0.4.22;

    contract Bank{

      address owner;
      uint256 counter;
      mapping (address=>uint256) balances;

      constructor() public{
        owner = msg.sender;
        balances[msg.sender]=10000;
        counter = 0;
      }
      function getBalance(address user) public view returns (uint256){
        return balances[user];
      }
      function transferCoin(address _to,uint256 coinValue) public{
        require(balances[msg.sender]>=coinValue);
        balances[msg.sender]-=coinValue;
        balances[_to]+=coinValue;
      }
      function setCounter() public payable {
        require(balances[msg.sender]>0);
        counter++;
        balances[msg.sender]-=100;
      }
      function getCounter() public view returns (uint256){
        return counter;
      }
    } 
    ```
   在創建完合約之後，我們需要產生合約的ABI，產生一個介面之後在前端可以去呼叫執行。
   ```
     solcjs --abi Bank.sol
   ```
   ==補充：其實在truffle compile 後就會在./build 中產生的json檔中看到ABI了==
- Publish your smart contract on private chain
    在本次應用，我是使用truffle framework 將合約發佈至private chain中，```truffle init``` 能夠產生基本的檔案結構，之後我們將剛剛寫好的合約放入Contract資料夾中，在編譯智能合約之前，必須先至truffle.js進行設定(windows系統至truffle-config.js)，內容如下:
    ``` js
    module.exports = {
      // See <http://truffleframework.com/docs/advanced/configuration>
      // to customize your Truffle configuration!
      // contracts_build_directory: Default is ./contracts/build
      // You can change the contract name with your preference
      networks:{
        development:{
          host:"127.0.0.1",
          port:8545,
          network_id:"55661",
          gas:4712388
        }
      }};
    ```
    之後我們將用node1 進行合約的發布，主要是針對之後要發布的位置還有進行設定，而port會是8545的原因，在於rpc溝通的port通道為8545，而networkID必須和當初啟動geth的id相同，gas的設定可以透過estimateGas進行設定！
    
    設定結束後，我們就可以開始進行合約的編輯和發布了！
    - ```truffle compile``` 編輯合約
    - ```truffle migrate``` 發布合約
    
    **註：在發布合約之前記得先回到node1，```personal.unlockAccount(address)```，並且輸入當初設定node的密碼進行解鎖。**
    
    此時觀察node1 terminal你可以發現會有transaction發生，並且過了不久signer1也會mine到你的交易紀錄，最後在truffle terminal中會看到Bank.sol產生一個Address，那就是你合約發布至鏈上的位置。
    
- Access the contract on your front-end

在和前端進行溝通之前，我們要先用nodejs架設後端的server，之後再啟動它，開啟前端便可以溝通了！這部分不懂的可以參考[此篇教學](https://ithelp.ithome.com.tw/articles/10158140)!
```npm init``` 輸入後填一些基本的設定，並且產生一個設定檔，內容如下：
```json
    {
      "name": "truffle",
      "version": "1.0.0",
      "description": "Truffle Practice Combining with private chain",
      "main": "truffle.js",
      "directories": {
        "test": "test"
      },
      "scripts": {
        "dev": "lite-server -port 5005",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "lite-server": "2.4.0",
        "truffle-contract": "^3.0.6",
        "web3": "^1.0.0-beta.35"
      }
    }

```

最後利用```npm install``` 即可將dependencies中的模組下載下來！

現在我們可以開始進行前端部分的撰寫了！
以下將分幾點對於前端的開發進行說明！

**1. 創立Web3.js物件**
前端的部分將著重於web3.js的開發，因此我們在一開始必須先初始化web3.js
 
``` js
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
```
**2.讀取合約，並加入ABI Interface**
一開始初始化物件時，由於在geth中我們採用預設的```port 8545```，因此必須在provider的部分也設定8545 port，初始化後，我們就可以利用```web3.eth.getAccounts()```得到node1用戶的地址 (詳細程式碼如下)，並且用```web3.eth.Contract(BankContractabi,contractAddress)```得到Smart Contract的內容，詳細程式碼如下：
``` js

web3.eth.getAccounts().then(
  function(address){
    account=address[0];//得到帳戶地址
    document.getElementById("address").innerHTML=address;
}).then(
  function(){
    BankContract = new web3.eth.Contract(BankContractabi,contractAddress,{
      from: account,
      gasPrice: '21000000000'
    });
    updateInformation();
  }
)
```
上述程式碼中，BankContractabi要放入的便是先前經由truffle編譯過後的ABI Interface，而在合約的部分必須加入account 和 gas Price的資料進行設定。
**3. Call function**
讀取完合約的內容後，我們就要更新前端的資料了，當我們在前端必須和後端Contract進行互動時我們使用的方法便是
```Contract.methods.yourMethod([parm1,...]).call({from:xxx},callback)``` or ```Contract.methods.yourMethod([parm1,...]).call({from:xxx}).then(callback)``` 這兩種方法皆可以回傳結果，並且更新前端，詳細的程式碼如下：
``` js
function updateInformation(){
    
    BankContract.methods.getBalance(account).call(function(error,result){
        document.getElementById("balance").innerHTML = result;
    });

    BankContract.methods.getCounter().call(function(error,result){
        document.getElementById("counter").innerHTML = result;

    })
}
```
在上述程式碼中，如果沒有錯誤，則result便是回傳結果，並且將它更新於前端中！

**4.Make Offline Transaction**
我想接下來的部分便是這篇文章比較重要的地方，怎麼利用OfflineTrasaction 和blockchain進行交易，以下將分由四個步驟：

- 上傳keystoreFile，並進行解密
- 建立並索取Transaction Object
- SignTransaction
- SendSignedTransaction

大家可以把以上的情形想成我們到銀行進行交易必須攜帶自己的印章進行身份辨識，並且填寫匯款單，進行簽名，最後交由行員幫你進行交易！

-  上傳keystoreFile，並進行解密
    Keystorefile就是當初創建node節點wallet所產生的一個密鑰文件，我們必須將此文件利用當時設定的密碼進行解密，便會產生Private Key，Private Key是我們Sign Contract需要的元素。
    
    程式碼如下：
    ```js
    var fileSumbitBtn = $('#fileSumbitBtn');
    fileSumbitBtn.on('click',function(){
      var task = new Promise(function(resolve,reject){
        var file = document.getElementById('input').files[0];
        resolve(file);
      })
      task.then(function(file){
        var reader = new FileReader();
        reader.onload = function(event){
          wallet=JSON.parse(event.target.result);
          getWalletInfo();
        }
        reader.readAsText(file);
      })
    })
    async function getWalletInfo (){
     decodeInfo = web3.eth.accounts.decrypt(wallet,"12345678");
     window.sessionStorage["decodeInfo"]=decodeInfo.privateKey;
    }
    ```
    上述的程式碼中，我們利用Web API的```FileReader()```進行讀檔的動作，而讀檔後利用```getWalletInfo()```得到Private Key，其中```web3.eth.accounts.decrypt(wallet,password)```將我們得到的keystorefile進行decrypt並且產生一個有Private Key和Address的 JSON file，由於每次上傳結束都將使頁面進行更新，因此我們將Private Key存在瀏覽器中的sessionStorage，最後重讀網頁之後將會加入Private Key的資訊，因此我們在一開始```getAccounts```的最後再加入```.then(function(){ checkPrivateKey();})``` 檢查Session是否有Private Key，如果檢查成功，最後將Private Key寫道前端中，供使用者查看！
    ``` js
    function checkPrivateKey(){
      if(window.sessionStorage["decodeInfo"]){
        addKeyRow();
        addTransferBtn();
        addBtn.removeClass("disabled");
        tooltipInst[0].destroy();
      }
    }
    function addKeyRow(){
      let infoTable = document.getElementById('info-table');
      let length = infoTable.rows.length;
      let keyRow = infoTable.insertRow(length);
      let key_attribute = keyRow.insertCell(0);
      let privateKey = keyRow.insertCell(1);
      key_attribute.innerHTML="Private Key";
      privateKey.innerHTML = window.sessionStorage["decodeInfo"];
      privateKey.id = "privateKey"
    }
    function addTransferBtn(){
      let transferBtn = document.createElement("button");
      transferBtn.setAttribute("class","waves-effect waves-light btn-small modal-trigger")
      transferBtn.innerHTML="Transfer Coin"
      transferBtn.setAttribute("id","transferBtn")
      transferBtn.setAttribute("data-target","transfer-modal")
      document.getElementById("account-info").appendChild(transferBtn);
    }
    ```
    上述程式碼便是實作這段程式碼的過程，如果一旦有Private Key，系統將增加可已交易、捐贈和顯示Private Key 的功能！
    
- 建立並索取Transaction Object
    由於在建立Offline Transaction中，並不同於先前使用錢包進行交易，因此在寄送交易之前我們必須利用```web3.eth.accounts.signTransaction(tx, privateKey).then(callback);```進行資料的簽章，其中tx代表的是Transaction Object，記錄著交易的一些重要資訊，欄位如下：

    1. **nonce** - String: (optional) The nonce to use when signing this transaction. Default will use web3.eth.getTransactionCount().
    2. **chainId** - String: (optional) The chain id to use when signing this transaction. Default will use web3.eth.net.getId().
    3. **to** - String: (optional) The recevier of the transaction, can be empty when deploying a contract.
    4. **data** - String: (optional) The call data of the transaction, can be empty for simple value transfers.
    5. **value** - String: (optional) The value of the transaction in wei.
    6. **gasPrice** - String: (optional) The gas price set by this transaction, if empty, it will use web3.eth.gasPrice()
    7. **gas** - String: The gas provided by the transaction.

    首先，nonce是記錄這個節點傳遞幾筆交易紀錄至區塊鏈中。chainId則是得到現在的網路ID。to則是你要將此筆交易給誰，必須填入合約的位置。data則是你要給予合約的資料，這裡通常是存放你要傳遞合約Fuction的ABIcode。最後，gasPrice和gas是每單位gas多少錢，以及你共需要花多少gas於此次的交易。
- SignTransaction
    因此，我們填完這些欄位之後，便可以執```signTransaction```完成簽署的交易。
```web3.eth.accounts.signTransaction(tx, privateKey).then(callback);```
- SendSignedTransaction
    使用其中```signTransaction```會回傳回來另一個JSON Object， 其中我們須要裡面的```rawTransaction```的內容用來傳遞合約資訊，最後在進行```web3.eth.sendSignedTransaction(signedTransactionData ).on("receipt",callback)```便可以進行資料的傳送。資料經由傳送後，我們可以聆聽receipt物件，利用```fuction(receipt){console.log(receipt)}```將資料結果顯示至出來，裡面會紀錄交易的transaction hash讓你可以去查尋資料，也會有使用多少gas...等細節。而我們會將資料顯示至前端因此利```logReceipt(receipt.blockHash,receipt.blockNumber,receipt.transactionHash,receipt.gasUsed);```將資料顯示至log panel上。
    
    
    經過實作後便可以簡單的完成一個Private chain的應用，並且建立自己的Offline Transaction。    
