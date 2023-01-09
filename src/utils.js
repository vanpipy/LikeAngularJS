const createTypeChecker = (typeString) => {
    return (input) => {
        return Object.prototype.toString.call(input) == '[object '+ typeString +']';
    }
};

export const isString = createTypeChecker('String');
export const isNumber = createTypeChecker('Number');
export const isNull = createTypeChecker('Null');
export const isUndefined = createTypeChecker('Undefined');

export const trim = (str) => {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
};

export const concatStr = (...args) => {
    return args.join('');
};

export const getFunctionParams = (fn) => {
    const fnStr = fn.toString();
    const clearFunctionStr = trim(fnStr.replace('function', ''));
    const paramsMatched = clearFunctionStr.match(/^\(.+\)/);
    let expectedParams = paramsMatched
        ? paramsMatched[0].replace('(', '').replace(')', '')
        : '';
    return expectedParams.split(',').map(trim)
};
