"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dateHumanize(ISO3339) {
    var nowDate = new Date();
    var itemDate = new Date(ISO3339);
    var nowYYYYMMDD = nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDate();
    var itemYYYYMMDD = itemDate.getFullYear() + '-' + itemDate.getMonth() + '-' + itemDate.getDate();
    if (nowYYYYMMDD === itemYYYYMMDD) {
        return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
    }
    else {
        var dayList = ['日', '月', '火', '水', '木', '金', '土'];
        return dayList[itemDate.getDay()];
    }
}
exports.dateHumanize = dateHumanize;
function dateFormateHHMM(ISO3339) {
    var itemDate = new Date(ISO3339);
    return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
}
exports.dateFormateHHMM = dateFormateHHMM;
function dateFormateMMDD(ISO3339) {
    var itemDate = new Date(ISO3339);
    return (itemDate.getMonth() + 1) + '/' + itemDate.getDate();
}
exports.dateFormateMMDD = dateFormateMMDD;
function date2ISO3339String(date) {
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }
    return date.getUTCFullYear() + '-'
        + pad(date.getUTCMonth() + 1) + '-'
        + pad(date.getUTCDate()) + 'T'
        + pad(date.getUTCHours()) + ':'
        + pad(date.getUTCMinutes()) + ':'
        + pad(date.getUTCSeconds()) + 'Z';
}
exports.date2ISO3339String = date2ISO3339String;
function opponentUser(users, myUserId) {
    var userForRooms = new Array;
    users.forEach(function (user) {
        if (user.userId !== myUserId) {
            userForRooms.push(user);
        }
    });
    return userForRooms;
}
exports.opponentUser = opponentUser;
function randomAvatarUrl(avatars) {
    var min = 0;
    var max = avatars.length - 1;
    var randomIndex = Math.floor(Math.random() * (max + 1 - min)) + min;
    return avatars[randomIndex];
}
exports.randomAvatarUrl = randomAvatarUrl;
function getAuthInfoFromStorage() {
    var scObj = {
        apiKey: '',
        userId: '',
        userAccessToken: '',
    };
    var ssSc = sessionStorage.getItem('swagchat');
    if (ssSc) {
        scObj = JSON.parse(ssSc);
        return scObj;
    }
    var lsSc = localStorage.getItem('swagchat');
    if (lsSc) {
        scObj = JSON.parse(lsSc);
        return scObj;
    }
    return scObj;
}
exports.getAuthInfoFromStorage = getAuthInfoFromStorage;
exports.isIphone = function () {
    var ua = 'iPhone';
    return window.navigator.userAgent.indexOf(ua) > 0;
};
exports.countString = function (str) {
    var r = 0;
    for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c >= 0x0 && c <= 0x7f) {
            r += 1;
        }
        else {
            r += 2;
        }
    }
    return r;
};
//# sourceMappingURL=index.js.map