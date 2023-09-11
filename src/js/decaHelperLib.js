import { addPendingRequest } from '@ahstream/hx-lib';

export const EXTENSION_NAME = 'Deca Helper';
export const DECA_DXP_URL = 'https://deca.art/decagon/dxp';
export const DECA_UPGRADE_URL = 'https://deca.art/decagon/upgrade';
export const DECA_ARTISTS_URL = 'https://deca.art/artists';
export const ARTBLOCKS_TOKEN_URL_PREFIX = 'https://token.artblocks.io';

export const DECA_ARTIST_PAGE_RE = /https:\/\/deca\.art\/artists\//i;
export const DECA_ARTISTS_PAGE_RE = /https:\/\/deca\.art\/artists$/i;

export const DECA_STANDARD_PAGES = ['decals', 'artists', 'explore', 'app', 'notifications', 'etch', 'activity', 'install'];

export function createStatusbarButtons({ options = true, help = false, quest = false } = {}) {
  console.log('createStatusbarButtons; options, help, quest:', options, help, quest);

  const buttons = [];

  const add = (text, title, handler) => {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.title = title;
    if (typeof handler === 'function') {
      btn.addEventListener('click', handler);
    } else {
      btn.disabled = true;
    }
    buttons.push(btn);
  };

  if (options) {
    add('Options', 'Open Deca Helper Options page', () => chrome.runtime.sendMessage({ cmd: 'openOptionsPage' }));
  }

  if (help) {
    add('Help', 'Open Deca Helper Help page', () =>
      chrome.runtime.sendMessage({ cmd: 'openTab', active: true, url: chrome.runtime.getURL('/help.html') })
    );
  }

  if (quest) {
    add('Run Quests', 'Run Deca Quests', async () => {
      await addPendingRequest(DECA_DXP_URL, { action: 'runDecaQuests' });
      if (window.location.href === DECA_DXP_URL) {
        window.location.reload();
      } else {
        window.location.href = DECA_DXP_URL;
      }
    });
  }

  return buttons.reverse();
}
