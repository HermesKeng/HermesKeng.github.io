# Swift Programming 

> 本篇教學主要針對Swift的基本語法進行說明，並且進行紀錄
> 參考書籍網址：https://www.appcoda.com/swift/ 

- **Constant vs variable**

    - 使用 *constant*  使用**let**作為宣告
    - 使用 *variable*  使用**var**作為宣告

```swift
let msg1:Double = 50.0
var msg2:String = "Hello World!"

let msg3=49.5
var msg4="Hi! Swift!"
```

上述的教學中，我們用了兩種方法進行宣告，第一種方法是比較完整的判斷方法，宣告一個函數，以 **Double**和 **String** 的型態進行顯示，而另外一種方法則是直接進行宣告，這兩種方法都是Swift語言宣告變數的方法，如果直接進行宣告 Swift 會直接自動判定資料型態，並且成功宣告常數

接下來將告訴大家在Swift方面的簡單四則運算：

- **Swift的四則運算**

對於Swift而言，就如同一般的程式語言一樣使用 ==＋ ㄧ ＊ /== 進行計算，只要按照我們之前所學的進行相加減便可以完成我們想完成的四則運算。

以下為範例
```swift
    var packetMoney = 10
    var daysofMonth=30
    let totalMoney= packetMoney * daysofMonth
```

透過上述方法便可以完成一個基礎的四則運算，但如果輸入的是以下的程式碼則會顯示錯誤訊息：

```swift
    var packetMoney = 10.0
    var daysofMonth=30
    let totalMoney= packetMoney * daysofMonth
```

原因在於，packetMoney被視為Double而daysofMonth為Int，因此在常數的宣告並沒有辦法辨別是Int 或 Double 也因此我們必須進行轉換，將daysofMonth進行型態轉換才能成功編譯，因此我們只需要將程式碼更改為以下，也不會出現錯誤訊息。

```swift
    var packetMoney = 10.0
    var daysofMonth=30
    let totalMoney= Double(packetMoney) * daysofMonth
```

- **Swift的字串表示**

Swift在字串表示的方法上和javascript有點雷同，如果宣告一個String則我們可以透過 ==+== 這個符號進行字串的銜接，舉例來說：

```swift
    var greeting ="Hi,Alex!"
    var question ="How are you? "
    greeting + question 
```
只要用此種方法，便可以將問候語進行累加，也因此這時輸出便會顯示  ==Hi,Alex! How are you?== 的結果，但如果在這之間必須加入任何變數，該怎麼做呢？

大家可以嘗試先宣告一個變數

```swift
    var liter = 2000.0
    var sentence="We must drink " + liter + " liter water in a day"
```

透過這樣的做法，在Playground會產生錯誤資訊，大家可以先想想這是為什麼？
相關的概念其實在先前就已提及，liter是Double的資料型態，我們無法將它進行轉型的動作，也因此我們必須更改它的型態為String才可以成功編譯，因此正確的程式碼應該如下：

```swift
    var liter = 2000.0
    var sentence="We must drink " + String(liter)+ " liter water in a day"
```

而在這裡Swift有一種特殊的表示法，我們可以利用 ==/(liter)== 並和剛剛撰寫的方式相同，我們也可以呈現像剛剛一樣的結果，完整的語法如下：
```swift
    var liter = 2000.0
    var sentence="We must drink \(liter) liter water in a day"
```

而我們也可以在裡面進行簡單的四則運算，並不會影響程式碼的運作！

```swift
    var liter = 2000.0
    var sentence="We must drink \(liter * 2) liter water in a day"
```

- **Swift Control Flow**

當我們需要進行情況(Condition)判斷時，大家最容易想到的就是if - else 判斷式，接下來的內容也將針對Swift的語法進行簡單的介紹，而對Swift來說if-else就和一般的程式語言雷同，唯一不同的在於判斷的部分可以不用像一般我們所習慣的加上()才能進行判斷，範例如下：
```swift
let age=10
var expense=1000

if age <=10{
    expense=0
}else if age>10 && age<15{
    expense=200
}else{
    expense=350
}
```
如果要加上括號，並不會影響整體結果，範例如下：
```swift
let age=10
var expense=0

if(age <=10){
    expense=0
}else if(age>10 && age<15){
    expense=200
}else{
    expense=350
}
```
接著，當情況面對到多重情況進行選擇的時候，我們可以利用Switch來撰寫程式，而Swift的Switch有比平常更簡便的效果，待會我們一併進行簡單的介紹，我們先看最基礎的範例

```swift
var transportation="car"

switch transportation{ 
    case "car":
        print(“🚗”)
    case "bike":
        print(“🚲”)
    case "train":
        print("🚞")
    default:
        break;
}
```

在上述範例中，檢查是不是有缺少什麼東西，如果察覺出來的話，以往我們使用Switch都會額外加上一行break以避免程式繼續執行其他case，但Swift不必加上break便可以達成相同的效果。此外，以往表達數字區段時，我們會使用else if 將區間表達出來，正如第一個範例一樣，但在Swift能夠以...的方法將區間表達出來，因此我們可以改寫前段的程式碼，如下：
```swift
let age=10
var expense=1000

switch age {
    case 0...10:
        expense=0
    case 10...15:
        expense=200
    case 16...100:
        expense=350
    default:
        break
}
```
但在此處大家會發現一個小瑕疵，原因在於if-else的情況下，是age>15才會有350的價格，但這在switch中，大家會發現這是一個16-100的範圍，因此在使用Switch進行if-else判斷要能明確知道判斷物的區間，才可以使用。
