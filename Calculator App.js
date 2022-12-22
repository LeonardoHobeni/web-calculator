var ArrNumbers=[];//array to hold the numbers to be operated on
var ArrOperators=['+', '\u00F7', '-', '\u00D7'];//array to hold the operators to perform the arithmetic operations
var operationList=[];//array to hold 
var newArrNum=[];
var newOperList=[];
function buildScreen(id)
{
    var deviceContainer= document.getElementById(id);

    //create output paragraph
    var outPar= document.createElement('p');

    //create output screen
    var outScreen= document.createElement('p');
    outScreen.className='Screen';
    outScreen.setAttribute('id', 'outScreen');
    outScreen.innerText='0';
    outPar.appendChild(outScreen);

    deviceContainer.appendChild(outPar);
}

function buildButtons(id, schema)
{   
    var deviceContainer= document.getElementById(id);
    for(let item of schema)
    {
        let itemElement= makeElement(item);
        deviceContainer.appendChild(itemElement);
    }
}

function makeElement(descript)
{
    var btnPar= document.createElement('p');
    btnPar.className="btnPar";
    //create button
    var btnEle= document.createElement('button');
    btnEle.className= descript.Class;
    btnEle.innerText= descript.Label;
    btnEle.setAttribute('onclick', descript.func);
    btnPar.appendChild(btnEle);
    return btnPar;
}

function buildCalculator(id)
{
    buildScreen(id);
    buildButtons(id,
        [
            {Label:'%' , Class:'perce_btn', func:'getSymbol("%")'},
            {Label:'CE', Class:'clearEntry', func:'ClearEntry()'},
            {Label:'C', Class:'Clear', func: 'Clear()'},
            {Label:'\u232b', Class:'BS', func:'backSpace()'},
            {Label:'7', Class: 'Seven', func:'getSymbol("7")' },
            {Label:'8', Class: 'Eight', func: 'getSymbol("8")'},
            {Label:'9', Class: 'Nine', func: 'getSymbol("9")'},
            {Label:'\u00F7', Class:'Division', func:'getSymbol(\'\u00F7\')'},
            {Label:'4', Class: 'Four', func: 'getSymbol("4")'},
            {Label:'5' , Class: 'Five', func: 'getSymbol("5")'},
            {Label:'6', Class:'Six', func: 'getSymbol("6")'},
            {Label:'\u00D7', Class:'Multiplication', func:'getSymbol(\'\u00D7\')'},
            {Label:'1', Class:'One' , func: 'getSymbol("1")'},
            {Label:'2', Class:'Two', func:'getSymbol("2")'},
            {Label:'3', Class:'Three', func:'getSymbol("3")'},
            {Label: '-', Class:'Minus', func:'getSymbol("-")'},
            {Label:'0', Class: 'Zero', func:'getSymbol("0")'},
            {Label: '.', Class:'point', func:'getSymbol(".")'},
            {Label:'+', Class:'Addition', func:'getSymbol("+")'},
            {Label:'=', Class:'equal', func:'displayResults()'},
    ]);
}

function ClearEntry()
{
    var screenEle= document.getElementById('outScreen');
    screenEle.innerText='0';
    ArrNumbers=[];
    operationList=[];
}

function Clear()
{
    var screenEle= document.getElementById('outScreen');
    screenEle.innerText='0';
    ArrNumbers=[];
    operationList=[];
}

function backSpace()
{   
    var screenEle= document.getElementById('outScreen');
    var str=screenEle.innerText;
    if(ArrNumbers.includes(str[str.length-1]))
    {
        let newStr=str;
        str='';
        for(let i=0; i<newStr.length-1; i+=1)
            str+=newStr[i];
        screenEle.innerText=str;
        backspaceArrNum();
    }
    else if(!ArrNumbers.includes(str[str.length-1]))
    {
        let newStr=str;
        str='';
        for(let i=0; i<newStr.length-1; i+=1)
            str+=newStr[i];
        screenEle.innerText=str;
        backspaceOper();
    }
    if(str.length==0)
    {
        ArrNumbers=[];
        operationList=[];
        screenEle.innerText='0';
    }
}

function backspaceArrNum()
{
    var backArr=[];
    for(let i=0; i<(ArrNumbers.length-1); i+=1)
        backArr[backArr.length]=ArrNumbers[i];
    ArrNumbers=backArr;
}

function backspaceOper()
{
    var backArr=[];
    for(let j=0; j<(operationList.length-1); j+=1)
        backArr[backArr.length]=operationList[j];
    operationList=backArr;
}

function getArith(oper)
{
    switch(oper)
    {
        case '+':
            return '+';
        case '*':
            return '\u00D7';
        case '/':
            return '\u00F7';
        case '-':
            return '-';
    }
}

function getSymbol(symbol)
{
    var screenEle= document.getElementById('outScreen');
    if(screenEle.innerText=='0' && symbol !='.')
        screenEle.innerText='';
    if(symbol=='%')
    {
        if(operationList.length>0)
        {
            ArrNumbers[ArrNumbers.length-1]/=100;
            screenEle.innerText+=symbol;
        }
        else
        {
            Clear();
        }
    }
    else
        screenEle.innerText+=symbol;

    if(symbol!='%')
    {
        if(ArrOperators.includes(symbol))
        {
            switch(symbol)
            {
                case '+':
                    operationList[operationList.length]='+';
                    break;
                case '-':
                    operationList[operationList.length]='-';
                    break;
                case '\u00F7':
                    operationList[operationList.length]='/';
                    break;
                case '\u00D7':
                    operationList[operationList.length]='*';
                    break;
            }
        }else if(!ArrOperators.includes(symbol) &&(ArrNumbers.length>operationList.length))
        {
            ArrNumbers[ArrNumbers.length-1]+=symbol;
        }
        else
        {
            ArrNumbers[ArrNumbers.length]=symbol;
        }
    }
}

function displayResults()
{   
    var outScreen= document.getElementById('outScreen');
    if(ArrNumbers.length==operationList.length 
        && outScreen.innerText == '0')
    {
        outScreen.innerText='0';
    }
    else if(ArrNumbers.length==operationList.length 
        && !outScreen.innerText == '0')
    {   

        alert('Syntax Error');
    }
    else
    {
        while(operationList.length>0)
            BODMAS();
        outScreen.innerText=ArrNumbers;
    }
}

function findOperPos(oper)
{
    return operationList.indexOf(oper);
}

function BODMAS()
{
    if(operationList.length>0)
    {
        if(operationList.includes('*'))
            performOperation('*');
        if(operationList.includes('/'))
            performOperation('/');
        if(operationList.includes('+'))
            performOperation('+');
        if(operationList.includes('-'))
            performOperation('-');
    }
}
function performOperation(oper)
{   
    var ind= findOperPos(oper);
    switch(oper)
    {
        case '+':
            for(let i=0; i<ind; i+=1)
                newArrNum[newArrNum.length]=ArrNumbers[i];
            newArrNum[newArrNum.length]= Number(ArrNumbers[ind])+Number(ArrNumbers[ind+1]);
            break;
        case '-':
            for(let i=0; i<ind; i+=1)
                newArrNum[newArrNum.length]=ArrNumbers[i];
            newArrNum[newArrNum.length]= Number(ArrNumbers[ind])-Number(ArrNumbers[ind+1]);
            break;
        case '/':
            for(let i=0; i<ind; i+=1)
                newArrNum[newArrNum.length]=ArrNumbers[i];
            newArrNum[newArrNum.length]= Number(ArrNumbers[ind])/Number(ArrNumbers[ind+1]);
            break;
        case '*':
            for(let i=0; i<ind; i+=1)
                newArrNum[newArrNum.length]=ArrNumbers[i];
            newArrNum[newArrNum.length]= Number(ArrNumbers[ind])*Number(ArrNumbers[ind+1]);
            break;
    }
    if(!Number.isInteger(newArrNum[newArrNum.length-1]))
        newArrNum[newArrNum.length-1]=(newArrNum[newArrNum.length-1]).toFixed(3);
    updateArrNum(ind);
    updateOperList(ind);
}

function updateArrNum(ind)
{
    for(let j=ind+2; j<ArrNumbers.length; j+=1)
        newArrNum[newArrNum.length]= ArrNumbers[j];
    ArrNumbers=newArrNum;
    newArrNum=[];
}

function updateOperList(ind)
{
    for(let i=0; i<operationList.length; i+=1)
        if(ind!=i)
            newOperList[newOperList.length]= operationList[i];
    operationList=newOperList;
    newOperList=[];
}

