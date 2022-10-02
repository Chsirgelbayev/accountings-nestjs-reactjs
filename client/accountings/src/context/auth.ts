import { createStore, createDomain, createEvent } from 'effector';

const auth = createDomain();

export const setAuth = auth.createEvent<boolean>();
export const setLogin = auth.createEvent<string>();

export const $auth = auth
    .createStore<boolean>(false)
    .on(setAuth, (_, value) => value);

export const $login = auth
    .createStore<string>('')
    .on(setLogin, (_, value) => value);
