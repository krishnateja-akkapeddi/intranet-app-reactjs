export enum Events {
  USER_LOGGED_IN = "user_logged_in",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  SALESMAN_ADDED = "salesman_added"
}

export interface EventEmitter {
  _events: { [key in Events]?: Function[] };

  dispatch: (event: Events, data: any) => void;

  subscribe: (event: Events, callback: (data: any) => any) => void;

  unsubscribe: (event: Events) => void;
}
