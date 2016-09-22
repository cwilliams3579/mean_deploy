function myDoubleConsoleLog(paramOne, paramTwo) {
    if (typeof paramOne == "function" && typeof paramTwo == "function") {
        console.log(paramOne());
        console.log(paramTwo());
    return;
    };
    console.log("Both arguments are not functions.")
    return;
};

function caller2(paramOne){

    console.log("starting");
    setTimeout(caller3(), 2000)

    function caller3(){             
        if (typeof(paramOne) == "function"){
            paramOne();
        };

        return;
        };

    console.log("ending?");
    return "interesting";
};

caller2(myDoubleConsoleLog);
var testCase = caller2(myDoubleConsoleLog);
console.log(testCase);