console.info('serviceWorker.js begin');

import { defaultOptions, overrideOptions } from '../config/config';
import { sleep, getStorageData, initStorageWithOptions, fetchHelper, addPendingRequest } from '@ahstream/hx-lib';
import { defaultMessageHandler } from '@ahstream/hx-chrome-lib';
import { DECA_DXP_URL, DECA_UPGRADE_URL, DECA_ARTISTS_URL } from './decaHelperLib.js';

const customStorage = { runtime: { pendingRequests: [] } };

chrome.runtime.onInstalled.addListener(() => {
  initStorageWithOptions(defaultOptions, overrideOptions, customStorage);
  console.info('Extension successfully installed!');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.info('Received message; request, sender:', request, sender);

  const defaultResult = defaultMessageHandler(request, sender);
  if (defaultResult?.ok) {
    console.log('Handled in messageHandler');
    if (defaultResult.response !== undefined) {
      sendResponse(defaultResult.response);
    }
    return;
  }

  if (messageHandler) {
    messageHandler(request, sender, sendResponse);
  } else {
    sendResponse();
  }
});

// MAIN FUNCTIONS

function messageHandler(request, sender, sendResponse) {
  switch (request.cmd) {
    case 'runDecaQuests':
      loadDecaPage(sender.tab, 'runDecaQuests');
      break;
    case 'forceRunQuests':
      loadDecaPage(sender.tab, 'forceRunQuests');
      break;
    case 'followFeaturedArtists':
      loadArtistsPage(sender.tab, 'follow');
      break;
    case 'upgradeDecagon':
      loadUpgradePage(sender.tab, 'upgrade');
      break;
    case 'showCollectionCandidates':
      showCollectionCandidates(request);
      break;
    case 'reportSolvedDecaArtQuery':
      reportSolvedDecaArtQuery(request);
      break;
    case 'fetchDecaArtQuery':
      fetchDecaArtQuery(request, sender);
      break;
    case 'cquestDone':
      cquestDone(request);
      break;
    case 'closeOtherDecaPages':
      closeOtherDecaPages(sender);
      break;
    case 'closeOtherDecaHelperStartedPages':
      closeOtherDecaHelperStartedPages(sender);
      break;
    case 'closeCollectionTabs':
      closeCollectionTabs();
      break;
    default:
      console.error('Received unexpected message!', request, sender);
      break;
  }
  sendResponse();
}

// DECA FUNCS -------------------------------------------------------------------

async function loadDecaPage(tab, action) {
  await addPendingRequest(DECA_DXP_URL, { action });
  if (tab?.url?.startsWith('https://deca.art/')) {
    chrome.tabs.update(tab.id, { highlighted: true, url: DECA_DXP_URL });
  } else {
    chrome.tabs.create({ url: DECA_DXP_URL });
  }
}

async function loadArtistsPage(tab, action) {
  await addPendingRequest(DECA_ARTISTS_URL, { action });
  if (tab?.url?.startsWith('https://deca.art/')) {
    chrome.tabs.update(tab.id, { highlighted: true, url: DECA_ARTISTS_URL });
  } else {
    chrome.tabs.create({ url: DECA_ARTISTS_URL });
  }
}

async function loadUpgradePage(tab, action) {
  await addPendingRequest(DECA_UPGRADE_URL, { action });
  if (tab?.url?.startsWith('https://deca.art/')) {
    chrome.tabs.update(tab.id, { highlighted: true, url: DECA_UPGRADE_URL });
  } else {
    chrome.tabs.create({ url: DECA_UPGRADE_URL });
  }
}

function closeCollectionTabs() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      console.log('tab', tab);
      if (!tab.url.includes('/collections/')) {
        console.log(`NOT closing tab: ${tab.url}`);
        return;
      }
      chrome.tabs.remove(tab.id, () => console.log(`Close tab: ${tab.url}`));
    });
  });
  return true;
}

function closeOtherDecaHelperStartedPages(sender) {
  console.log('closeOtherDecaPages');
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      console.log('tab', tab);
      let doClose = false;
      if (sender.tab.id === tab.id) {
        // do nothing;
      } else if (tab.url.includes('/collections.html')) {
        doClose = true;
      } else if (tab.url.includes('deca.art/')) {
        doClose = true;
      }
      console.log('doClose', doClose, tab.url);
      if (doClose) {
        chrome.tabs.remove(tab.id, () => console.log(`Close tab: ${tab.url}`));
      }
    });
  });
  return true;
}

function closeOtherDecaPages(sender) {
  console.log('closeOtherDecaPages');
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      console.log('tab', tab);
      let doClose = false;
      if (sender.tab.id === tab.id) {
        // do nothing;
      } else if (tab.url.includes('deca.art/')) {
        doClose = true;
      }
      console.log('doClose', doClose, tab.url);
      if (doClose) {
        chrome.tabs.remove(tab.id, () => console.log(`Close tab: ${tab.url}`));
      }
    });
  });
  return true;
}

function cquestDone(request) {
  console.log('send cquestDone to parentTabId');
  chrome.tabs.sendMessage(Number(request.parentTabId), { cmd: 'cquestDone' });
  return true;
}

async function fetchDecaArtQuery(request, sender) {
  console.log('request.url', request.url);
  const result = await fetchHelper(request.url);
  if (result.data) {
    console.log('result.data', result.data);
    const jsonData = result.data;
    console.log('jsonData', jsonData);
    const collectionName = jsonData.traits[0]['trait_type'];
    console.log('collectionName', collectionName);
    chrome.tabs.sendMessage(sender.tab.id, { cmd: 'reportSolvedDecaArtQuery', collectionName });
  }
  return true;
}

async function reportSolvedDecaArtQuery(request) {
  const storage = await getStorageData();
  chrome.tabs.sendMessage(storage.decaMainTabId, {
    cmd: 'reportSolvedDecaArtQuery',
    collectionName: request.collectionName,
  });
  return true;
}

async function showCollectionCandidates(request) {
  const tab = await chrome.tabs.create({ url: chrome.runtime.getURL('/html/collections.html') });
  console.log('tab', tab);
  await sleep(2000);
  chrome.tabs.sendMessage(tab.id, {
    cmd: 'addCollections',
    collections: request.collections,
    openPages: request.openPages,
    delaySecs: request.delaySecs,
  });
  console.log('done');
  return false;
}
