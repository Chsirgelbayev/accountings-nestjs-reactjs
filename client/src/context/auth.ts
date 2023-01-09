import { createDomain } from 'effector';

const auth = createDomain();

export const setAuth = auth.createEvent<boolean>();
export const setLogin = auth.createEvent<string>();

export const $auth = auth
    .createStore<boolean>(false)
    .on(setAuth, (_: boolean, value: boolean): boolean => value);

export const $login = auth
    .createStore<string>('')
    .on(setLogin, (_: string, value: string): string => value);
