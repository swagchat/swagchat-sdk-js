import { IUserForRoom, IUserMini } from '../';
export declare function dateHumanize(ISO3339: string): string;
export declare function dateFormateHHMM(ISO3339: string): string;
export declare function dateFormateMMDD(ISO3339: string): string;
export declare function date2ISO3339String(date: Date): string;
export declare function opponentUser(users: IUserForRoom[] | IUserMini[], myUserId: string): (IUserForRoom[] | null);
export declare function randomAvatarUrl(avatars: string[]): string;
export interface IAuthInfo {
    apiKey: string;
    userId: string;
    userAccessToken: string;
}
export declare function getAuthInfoFromStorage(): IAuthInfo;
export declare const isIphone: () => Boolean;
export declare const countString: (str: string) => number;
