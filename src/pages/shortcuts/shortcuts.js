console.info('shortcuts.js begin', window?.location?.href);

import { addPendingRequest } from 'hx-lib';
import { initShortcutsPage, mountShortcutsPage } from 'hx-chrome-lib';

import { DECA_DXP_URL } from '../../js/decaHelperLib.js';

initShortcutsPage();

const VALID_URLS = null;

mountShortcutsPage(VALID_URLS, [
  {
    cmd: 'dh-run-quests',
    callback: async () => {
      closeOtherShortcutPages();
      await addPendingRequest(DECA_DXP_URL, { action: 'runDecaQuestsFromShortcut', url: window?.location?.href });
      window.location.href = DECA_DXP_URL;
    },
  },
  {
    cmd: 'dh-close-browser',
    callback: async () => {
      chrome.runtime.sendMessage({
        cmd: 'dh-close-browser',
      });
    },
  },
  {
    cmd: 'browser-start',
    callback: async () => {
      closeOtherShortcutPages();
    },
  },
]);

function closeOtherShortcutPages() {
  chrome.runtime.sendMessage({ cmd: 'closeOtherShortcutPages' });
}
