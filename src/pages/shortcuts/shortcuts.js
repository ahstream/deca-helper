console.info('shortcuts.js begin', window?.location?.href);

import { addPendingRequest } from '@ahstream/hx-lib';
import { initShortcutsPage, mountShortcutsPage } from '@ahstream/hx-chrome-lib';

import { DECA_DXP_URL } from '../../js/decaHelperLib.js';

initShortcutsPage();

const VALID_URLS = null;

mountShortcutsPage(VALID_URLS, [
  {
    cmd: 'dh-run-quests',
    callback: async () => {
      await addPendingRequest(DECA_DXP_URL, { action: 'quests' });
      window.location.href = DECA_DXP_URL;
    },
  },
]);
