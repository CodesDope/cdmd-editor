export function deepClone(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    const objArray = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    objArray[key] = deepClone(obj[key]);
                } else {
                    objArray[key] = obj[key];
                }
            }
        }
    }
    return objArray;
}

export function isEmpty(obj) {
    return typeof obj === 'undefined' || obj === null || obj === '';
}

export function isPromise(obj) {
    return (
        obj &&
        (obj instanceof Promise ||
            ((typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'))
    );
}

export function repeat(str, num) {
    let result = '';
    let n = num;
    while (n--) {
        result += str;
    }
    return result;
}

export function isKeyMatch(event, cond) {
    const { withKey, keyCode, key, aliasCommand } = cond;
    const e = {
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        keyCode: event.keyCode,
        key: event.key
    };
    if (aliasCommand) {
        e.ctrlKey = e.ctrlKey || e.metaKey;
    }
    if (withKey && withKey.length > 0) {
        for (const it of withKey) {
            if (typeof e[it] !== 'undefined' && !e[it]) {
                return false;
            }
        }
    } else {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return false;
        }
    }
    if (e.key) {
        return e.key === key;
    } else {
        return e.keyCode === keyCode;
    }
}
