console.info('popup.js begin', window?.location?.href);

import './popup.css';

import { initPopupPage, mountPopupPage } from '@ahstream/hx-chrome-lib';

initPopupPage();

mountPopupPage([
  {
    id: 'hx-run-deca-quests',
    callback: () => {
      console.log('callback');
      chrome.runtime.sendMessage({ cmd: 'runDecaQuests' });
    },
  },
]);
