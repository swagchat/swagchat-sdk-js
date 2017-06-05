import * as I from "./interface";
export declare function createQueryParams(params: {
    [key: string]: string | number;
}): string;
export declare function createMessage(roomId: string, userId: string, type: string, payload: Object): I.IMessage;
