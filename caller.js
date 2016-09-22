function caller(callerParam){
    if (typeof callerParam == "function") {
        callerParam();
        return "This is a function.";
    };
    if (typeof callerParam != "function") {
        return "Not a function!";
    };
};

var temp = "Ninja";
console.log(caller(temp));