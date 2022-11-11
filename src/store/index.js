import { defineStore } from 'pinia';
import keepAlive from './modules/keepAlive';
import global from './modules/global';
import viewTags from './modules/viewTags';
import iframe from './modules/iframe'

export default function usestore() {
    return {
        keepAlive: keepAlive(),
        global: global(),
        viewTags: viewTags(),
        iframe: iframe()
    };
}
