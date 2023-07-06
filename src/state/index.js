import {proxy} from 'valtio';

const state = proxy({
    id: '',
    username: '',
});

export default state;