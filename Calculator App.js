function buildScreen(id)
{
    var deviceContainer= document.getElementById(id);

    //create output paragraph
    var outPar= document.createElement('p');

    //create output screen
    var outScreen= document.createElement('input');
    outScreen.className='Screen';
    outScreen.setAttribute('id', 'outScreen');
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
            {Label:'\u00F7', Class:'Division', func:'getSymbol(\'\u00F7\')'},
            {Label:'7', Class: 'Seven', func:'' },
            {Label:'8', Class: 'Eigth', func: 'getSymbol("8")'},
            {Label:'9', Class: 'Nine', func: 'getSymbol("9")'},
            {Label:'\u00D7', Class:'Multiplication', func:'getSymbol(\'\u00D7\')'},
            {Label:'4', Class: 'Four', func: 'getSymbol("4")'},
            {Label:'5' , Class: 'Five', func: 'getSymbol("5")'},
            {Label:'6', Class:'Six', func: 'getSymbol("6")'},
            {Label: '-', Class:'Minus', func:'getSymbol("-")'},
            {Label:'1', Class:'One' , func: 'getSymbol("1")'},
            {Label:'2', Class:'Two', func:'getSymbol("2")'},
            {Label:'3', Class:'Three', func:'getSymbol("3")'},
            {Label:'+', Class:'Addition', func:'getSymbol("+")'},
            {Label:'0', Class: 'Zero', func:'getSymbol("0")'},
            {Label: '.', Class:'point', func:'getSymbol(".")'},
            {Label:'=', Class:'equal', func:'getSymbol("=")'},
    ]);
}