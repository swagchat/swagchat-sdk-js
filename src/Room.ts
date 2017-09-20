import 'isomorphic-fetch';
import * as I from './interface';
import { IRoom, createQueryParams, logger } from './';
import { store } from './stores';

export function setRoomMetaData(room: IRoom, key: string, value: string | number | boolean | Object): IRoom {
  if (!key || typeof(key) !== 'string') {
    logger('api', 'error', 'set metaData failure. Parameter invalid.');
  } else {
    if (room.metaData === undefined) {
      let metaData = {key: value};
      room.metaData = metaData;
    } else {
      room.metaData[key] = value;
    }
  }
  return room;
}

export function updateRoom(room: I.IRoom): Promise<I.IFetchRoomResponse> {
  const client = store.getState().client.client;
  return fetch(client.apiEndpoint + '/rooms/' + room.roomId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + client.userAccessToken,
    },
    body: JSON.stringify(room)
  }).then((response: Response) => {
    if (response.status === 200) {
      return response.json().then((room) => {
        return (
          {
            room: room,
            error: null,
          } as I.IFetchRoomResponse
        );
      });
    } else {
      return response.json().then((json) => {
        return (
          {
            room: null,
            error: <I.IProblemDetail>json,
          } as I.IFetchRoomResponse
        );
      });
    }
  }).catch((error) => {
    return {
      room: null,
      error: {
        title: error.message,
      } as I.IProblemDetail,
    } as I.IFetchRoomResponse;
  });
}

export function addRoomUsers(roomId: string, userIds: string[]): Promise<I.IFetchRoomUsersResponse> {
  const client = store.getState().client.client;
  let fetchParam = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userIds: userIds
    })
  };
  if (!(userIds instanceof Array) || userIds.length === 0) {
    fetchParam.body = JSON.stringify({});
  }
  return fetch(client.apiEndpoint + '/rooms/' + roomId + '/users',
    fetchParam
  ).then((response: Response) => {
    if (response.status === 200) {
      return response.json().then((addUsersRes) => {
        return (
          {
            roomUsers: addUsersRes.roomUsers,
            error: null,
          } as I.IFetchRoomUsersResponse
        );
      });
    } else if (response.status === 404) {
      return {
        roomUsers: null,
        error: {
          title: response.statusText,
        } as I.IProblemDetail,
      } as I.IFetchRoomUsersResponse;
    } else {
      return response.json().then((json) => {
        return (
          {
            roomUsers: null,
            error: <I.IProblemDetail>json,
          } as I.IFetchRoomUsersResponse
        );
      });
    }
  }).catch((error) => {
    return {
      roomUsers: null,
      error: {
        title: error.message,
      } as I.IProblemDetail,
    } as I.IFetchRoomUsersResponse;
  });
}

export function removeRoomUsers(roomId: string, userIds: string[]): Promise<I.IFetchRoomUsersResponse> {
  const client = store.getState().client.client;
  let fetchParam = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userIds: userIds
    })
  };
  if (!(userIds instanceof Array) || userIds.length === 0) {
    fetchParam.body = JSON.stringify({});
  }
  return fetch(client.apiEndpoint + '/rooms/' + roomId + '/users',
    fetchParam
  ).then((response: Response) => {
    if (response.status === 200) {
      return response.json().then((removeUsersRes) => {
        return (
          {
            roomUsers: removeUsersRes.roomUsers,
            error: null,
          } as I.IFetchRoomUsersResponse
        );
      });
    } else if (response.status === 404) {
      return {
        roomUsers: null,
        error: {
          title: response.statusText,
        } as I.IProblemDetail,
      } as I.IFetchRoomUsersResponse;
    } else {
      return response.json().then((json) => {
        return (
          {
            roomUsers: null,
            error: <I.IProblemDetail>json,
          } as I.IFetchRoomUsersResponse
        );
      });
    }
  }).catch((error) => {
    return {
      roomUsers: null,
      error: {
        title: error.message,
      } as I.IProblemDetail,
    } as I.IFetchRoomUsersResponse;
  });
}


export function getMessages(roomId: string, queryParams: {[key: string]: string | number}): Promise<I.IFetchMessagesResponse> {
  const client = store.getState().client.client;
  let queryParamsString = '';
  if (queryParams !== undefined) {
    queryParamsString = createQueryParams(queryParams);
  }
  return fetch(client.apiEndpoint + '/rooms/' + roomId + '/messages?' + queryParamsString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + client.userAccessToken,
    },
  }).then((response: Response) => {
    if (response.status === 200) {
      return response.json().then((messages) => {
        return (
          {
            messages: <I.IMessages>messages,
            error: null,
          } as I.IFetchMessagesResponse
        );
      });
    } else {
      return response.json().then((json) => {
        return (
          {
            messages: null,
            error: <I.IProblemDetail>json,
          } as I.IFetchMessagesResponse
        );
      });
    }
  }).catch((error) => {
    return {
      messages: null,
      error: {
        title: error.message,
      } as I.IProblemDetail,
    } as I.IFetchMessagesResponse;
  });
}

export function subscribeMessage(roomId: string, onMessageReceived: Function): void {
  const client = store.getState().client.client;
  client.connection ? client.connection.subscribeMessage(onMessageReceived, roomId) : null;
}

export function unsubscribeMessage(roomId: string): void {
  const client = store.getState().client.client;
  client.connection ? client.connection.unsubscribeMessage(roomId) : null;
}

export function subscribeUserJoin(roomId: string, onUserJoined: Function): void {
  const client = store.getState().client.client;
  client.connection ? client.connection.subscribeUserJoin(onUserJoined, roomId) : null;
}

export function unsubscribeUserJoin(roomId: string): void {
  const client = store.getState().client.client;
  client.connection ? client.connection.unsubscribeUserJoin(roomId) : null;
}

export function subscribeUserLeft(roomId: string, onUserLeft: Function): void {
  const client = store.getState().client.client;
  client.connection ? client.connection.subscribeUserLeft(onUserLeft, roomId) : null;
}

export function unsubscribeUserLeft(roomId: string): void {
  const client = store.getState().client.client;
  client.connection ? client.connection.unsubscribeUserLeft(roomId) : null;
}
