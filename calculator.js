"use strict"
var stack = [];
window.onload = function () {
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = $(this).innerHTML;
            if(value<=9 && value >=0){
                if(displayVal == "0"){
                    displayVal = value;
                    $('expression').innerHTML=displayVal;
                }
                else{
                    displayVal = displayVal + value;
                    $('expression').innerHTML+=value;
                }
            }
            else if(value=="AC"){
                stack =[];
                displayVal = "0"
                $('expression').innerHTML="0";
            }
            else if(value == ".")
            {
                if(displayVal.indexOf(".") == -1)
                {
                    $('expression').innerHTML+=".";
                    displayVal += ".";
                }
            }
            else if(value.match(/^(\+|\-|\*|\/|=)$/))
            {
                if(value == "=")
                {
                    stack = infixToPostfix(stack);
                    displayVal = postfixCalculate(stack);
                }
                else
                {
                    if(displayVal.match(/^[0-9]+(\.[0-9]+)?$/))
                    {
                        stack.push(displayVal);
                        displayVal = "0";
                    }
                    stack.push(value);
                }
            }
            $('result').innerHTML = displayVal;

        };
    }
}
function isValidExpression(s) {
    var tmp = 0;
    var result = true;

    for(var i=0;i<s.length;i++){
        if(s[i]=="(") tmp++;
        if(s[i]==")") tmp--;
        
        if(count==0){
            result=true;
        }
        else{
            result=false;
        }
    }
    return result;
}
function infixToPostfix(s) {
    var priority = {
        "+":0,
        "-":0,
        "*":1,
        "/":1
    };
    var tmpStack = [];
    var result = [];
    for(var i =0; i<stack.length ; i++) {
        if(/^[0-9]+$/.test(s[i])){
            result.push(s[i]);
        } else {
            if(tmpStack.length === 0){
                tmpStack.push(s[i]);
            } else {
                if(s[i] === ")"){
                    while (true) {
                        if(tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        } else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if(s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                } else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
    for(var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}
function postfixCalculate(s) {
    var tmpStack = [];
    var count = 0;
    var tmp;
    var tmp2;
    
    while(count < s.length)
    {        
        if(s[count].match(/^[0-9]+(\.[0-9]+)?$/))
        {
            tmpStack.push(s[count]);
            count++;
        }
        else
        {
            tmp = parseInt(tmpStack[tmpStack.length-1]);
            tmp2 = parseInt(tmpStack[tmpStack.length-2]);
            
            switch(s[count])
            {
                case "+": tmp = tmp2+tmp;
                break;
                case "-": tmp = tmp2-tmp;
                break;
                case "*": tmp = tmp2*tmp;
                break;
                case "/": tmp = tmp2/tmp;
                break;
            }
            tmpStack.splice(tmpStack.length-1, 1);
            tmpStack[tmpStack.length-1] = tmp;

            count++;
        }
    }
    return tmpStack[0];
}
