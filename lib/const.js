"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = typeof window !== "undefined";
var Platform;
(function (Platform) {
    Platform[Platform["IOS"] = 1] = "IOS";
    Platform[Platform["ANDROID"] = 2] = "ANDROID";
})(Platform = exports.Platform || (exports.Platform = {}));
var RoomType;
(function (RoomType) {
    RoomType[RoomType["ONE_ON_ONE"] = 1] = "ONE_ON_ONE";
    RoomType[RoomType["PRIVATE_ROOM"] = 2] = "PRIVATE_ROOM";
    RoomType[RoomType["PUBLIC_ROOM"] = 3] = "PUBLIC_ROOM";
    RoomType[RoomType["NOTICE_ROOM"] = 4] = "NOTICE_ROOM";
})(RoomType = exports.RoomType || (exports.RoomType = {}));
//# sourceMappingURL=const.js.map