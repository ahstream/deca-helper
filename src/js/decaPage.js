console.log('decaPage.js begin...', window?.location?.href);

import '../styles/decaPage.scss';

import {
  getStorageItems,
  getStorageData,
  setStorageData,
  sleep,
  waitForSelector,
  millisecondsAhead,
  randomInt,
  simulateClick,
  noDuplicatesByObject,
  fetchHelper,
  waitForTextStartsWith,
  addPendingRequest,
  dispatch,
} from '@ahstream/hx-lib';
import { createStatusbar } from '@ahstream/hx-statusbar';
import {
  createStatusbarButtons,
  DECA_DXP_URL,
  DECA_UPGRADE_URL,
  DECA_STANDARD_PAGES,
  DECA_ARTISTS_PAGE_RE,
  ARTBLOCKS_TOKEN_URL_PREFIX,
} from './decaHelperLib.js';

// DATA ----------------------------------------------------------------------------------

const TIMEOUT_PAUSE_FETCH_COLLECTIONS_MSECS = 1000;
const TIMEOUT_GET_QUEST_IMAGE_DATA_SECS = 15;
const TIMEOUT_WAIT_FOR_ART_QUEST_FINISH_SECS = 60;
const TIMEOUT_DXP_PAGE_LOADED_SECS = 10;

let storage = null;
let pageState = {
  allImages: [],
  forceFetch: false,
  isCollectionQuestDone: false,
};

// STARTUP ----------------------------------------------------------------------------

runNow();

async function runNow() {
  createImageObserver();
  window.addEventListener('load', onLoad);
}

async function onLoad() {
  console.log('onLoad');

  storage = await getStorageItems(['options', 'prefs']);
  console.log('storage', storage);

  if (!storage?.options) {
    return console.log('Options missing, exit!');
  }

  const statusbar = shouldPageHaveStatusbar() ? createStatusbar('Deca Helper') : {};

  // if dxp page we should cleanup old pending requests, otherwise not!
  const requestLifetimeSecs = isDecaDxpPage(window.location.href) ? 60 : null;
  const request = await dispatch(window.location.href, requestLifetimeSecs);
  console.log('request:', request);

  pageState = { ...pageState, request, statusbar };
  console.log('pageState', pageState);

  runPage();
}

// EVENT HANDLERS ----------------------------------------------------------------------------------

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('Received message:', request, sender);

  if (request.cmd === 'reportSolvedDecaArtQuery') {
    sendResponse();
    reportSolvedDecaArtQuery(request.collectionName);
    return true;
  }

  if (request.cmd === 'cquestDone') {
    sendResponse();
    pageState.isCollectionQuestDone = true;
    return true;
  }

  console.error('Unexpected message!', request, sender);
  return true;
});

// OBSERVER FUNCS ----------------------------------------------------------------------------------

function createImageObserver() {
  if (isDecaDxpPage(window.location.href)) {
    const observer = new MutationObserver(mutationObserved);
    observer.observe(document, { attributes: true, childList: true, subtree: true });
  }
}

// Callback function to execute when mutations are observed
function mutationObserved(mutationList) {
  for (const mutation of mutationList) {
    if (mutation.target.nodeName === 'IMG') {
      pageState.allImages.push({
        alt: mutation.target.alt,
        src: mutation.target.src,
        currentSrc: mutation.target.currentSrc,
        outerHTML: mutation.target.outerHTML,
        created: new Date(),
        created2: new Date().toLocaleString(),
      });
    }
  }
}

// PAGE FUNCS ----------------------------------------------------------------------------------

async function runPage() {
  console.log('runPage');

  addStatusbarButtons();

  if (pageState.request?.action === 'view') {
    return await showViewGalleryPage();
  }

  if (pageState.request?.action === 'upgrade' && isDecaUpgradePage()) {
    await sleep(3000);
    return await runUpgradePage();
  }

  if (pageState.request?.action === 'runDecaQuestsFromShortcut' && isDecaDxpPage()) {
    console.log('pageState.request', pageState.request);
    const delaySecs = pageState.request.delaySecs?.length ? Number(pageState.request.delaySecs[0]) : 0;
    console.log('runDecaQuestsFromShortcut, delaySecs:', delaySecs);
    return await runDecaQuests(delaySecs);
  }

  if (pageState.request?.action === 'runDecaQuests' && isDecaDxpPage()) {
    return await runDecaQuests();
  }

  if (pageState.request?.action === 'runDecaQuestsForced' && isDecaDxpPage()) {
    pageState.forceFetch = true;
    return await runDecaQuests();
  }

  if (pageState.request?.action === 'restart' && isDecaDxpPage()) {
    return await runDecaQuests();
  }

  if (pageState.request?.action === 'finnishviewquest' && isDecaDxpPage()) {
    return await runDecaQuests();
  }

  if (pageState.request?.action === 'follow' && isDecaOneArtistPage()) {
    await followArtist();
    await sleep(5000);
    window.close();
  }

  if (pageState.request?.action === 'follow' && isDecaAllArtistsPage()) {
    return await runFollowFeaturedArtists();
  }

  if (pageState.request?.action === 'shortcut' && isDecaAllArtistsPage()) {
    return await runFollowFeaturedArtists();
  }

  if (pageState.request?.action === 'shortcut' && isDecaOneArtistPage()) {
    return await followArtist();
  }

  if (pageState.request?.action === 'cquest') {
    return await showCollectionQuestPage(true);
  }

  if (window.location.href.includes('/collections/')) {
    return await showCollectionQuestPage();
  }

  if (isDecaUpgradePage()) {
    return await showUpgradePage();
  }

  if (storage.options.autoRun && isDecaDxpPage()) {
    updateStatusbarInfo(`Auto run deca quests...`);
    await sleep(3000);
    return await runDecaQuests();
  }

  console.log('Exit runPage()');
}

function getLevelOrderButton() {
  const elems = [...document.querySelectorAll('button')].filter((x) => x.innerText.startsWith('Level Order'));
  if (elems?.length) {
    return elems[0];
  }
  return null;
}

function getMintOrderButton() {
  const elems = [...document.querySelectorAll('button')].filter((x) => x.innerText.startsWith('Mint Order'));
  if (elems?.length) {
    return elems[0];
  }
  return null;
}

async function selectLevelOrder() {
  await sleep(1000);
  while (!getLevelOrderButton()) {
    await sleep(200);
    const button = getMintOrderButton();
    console.log('button', button);
    if (button) {
      button.click();
      await sleep(200);
      return;
    }
  }
}

async function showUpgradePage() {
  console.log('showUpgradePage');
  await sleep(1000);
  await selectLevelOrder();
}

async function runUpgradePage(force = false) {
  console.log('runUpgradePage');

  updateStatusbarInfo('Auto upgrade...');

  await sleep(100);
  await selectLevelOrder();

  if (!force && !storage.options.autoUpgrade) {
    updateStatusbar('Auto upgrade is disabled!');
    return;
  }

  await sleep(500);

  console.log('storage', storage);

  const elems = [...document.querySelectorAll('.p-4.pt-1')]
    .map((x) => {
      return [x.innerText?.match(/.*Level ([0-9]+).*/), x];
    })
    .map((y) => [Number(y[0][1]), y[1]])
    .filter((x) => x[0] < storage.options.autoUpgradeMaxLevel && x[0] >= storage.options.autoUpgradeMinLevel)
    .sort((x, y) => x[0] < y[0]);
  //.reverse();
  console.log('elems', elems);

  if (elems.length < storage.options.autoUpgradeNth || storage.options.autoUpgradeNth < 1) {
    updateStatusbarError('No n:th decagon to upgrade!');
    return;
  }

  const elem = elems[storage.options.autoUpgradeNth - 1];
  console.log('elem', elem);

  const buttons = [...elem[1].querySelectorAll('button')].filter((x) => x.innerText.startsWith('Upgrade to level'));
  console.log('buttons', buttons);
  if (buttons.length) {
    if (!(await clickUpgradeButton(buttons[0]))) {
      scheduleRetryUpgrade();
    }
  } else {
    updateStatusbarError('No decagons to upgrade!');
    scheduleRetryUpgrade();
  }
}

function scheduleRetryUpgrade(secs = 60) {
  console.log('scheduleRetryUpgrade');
  setTimeout(() => runUpgradePage(), secs * 1000);
}

async function clickUpgradeButton(button) {
  console.log('clickUpgradeButton', button);

  console.log('button.disabled', button.disabled);
  if (button.disabled !== false) {
    updateStatusbarWarning('Decagon upgrade button is disabled!');
    return false;
  }

  var s = document.createElement('script');
  s.src = chrome.runtime.getURL('confirm.js');
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
  await sleep(4000);

  console.log('click button', button);
  button.click();
  await sleep(4000);
  updateStatusbarOk('Decagon upgraded!');
  return true;
}

async function showViewGalleryPage() {
  console.log('showViewGalleryPage', window.location);

  const stopTime = millisecondsAhead(1000 * 60 * 60);
  while (Date.now() <= stopTime) {
    const elems = [...document.querySelectorAll('div.whitespace-nowrap')].filter((e) => e.innerText.includes('view'));
    console.log('wait for load trigger elems:', elems);
    if (elems) {
      setTimeout(() => {
        console.log('Close window after onload!');
        window.close();
      }, (storage.options.openGalleryPageEveryNthSec + 10) * 1000);
      console.log('gallery page loaded, close after some time...');
      return;
    }
    await sleep(2000);
  }
}

async function showCollectionQuestPage(closeWin = false) {
  console.log('showCollectionQuestPage', window.location);

  let waitForResult = await waitForCollection(storage.options.openCollectionPageEveryNthSec + 2, true, true);
  await sleep(500);
  if (waitForResult.claimed) {
    return closeWin ? window.close() : false;
  }

  // Best we can do is close window here!
  return closeWin ? window.close() : false;
}

async function waitForCollection(maxSecs, findContent = true, doClaim = true) {
  console.log('waitForCollection', maxSecs, findContent, doClaim);

  while (!document.readyState) {
    await sleep(500);
  }
  console.log('document ready');

  const stopTime = Date.now() + maxSecs * 1000;
  console.log('dates:', Date.now(), stopTime);

  let claimed = false;

  while (Date.now() <= stopTime) {
    if (doClaim && (await claimRewards())) {
      chrome.runtime.sendMessage({
        cmd: 'cquestDone',
        parentTabId: pageState.request?.parentTabId,
      });
      claimed = true;
      break;
    }
    console.log('Wait...');
    await sleep(1000);
  }

  return { claimed };
}

function isDecaDxpPage() {
  return window.location.href.startsWith(DECA_DXP_URL);
}

function isDecaUpgradePage() {
  return window.location.href.startsWith(DECA_UPGRADE_URL);
}

function isDecaOneArtistPage() {
  const path = window.location.pathname.replace('/', '');
  if (path.includes('/')) {
    return false;
  }
  if (DECA_STANDARD_PAGES.includes(path)) {
    return false;
  }
  return true;
}

function isDecaAllArtistsPage() {
  return window.location.href.match(DECA_ARTISTS_PAGE_RE);
}

function isRestarted() {
  return pageState.request?.action === 'restart';
}

async function hasFinishedAllQuests(maxWaitMs = 10, intervalMs = 10) {
  console.log('hasFinishedAllQuests');

  const elem = await waitForTextStartsWith('Congrats on finishing all of your quests!', 'h3', maxWaitMs, intervalMs);
  console.log('has finished elem:', elem);
  if (!elem) {
    return false;
  }

  console.log('hasFinishedAllQuests TRUE, do more checks...');
  await sleep(1000);

  const claimButtonElems = getClaimButtonElems();
  const viewQuestElems = getViewQuestElems();
  const artQuestElems = getArtQuestElems();
  const collectionQuestElems = getCollectionQuestElems();
  console.log('more checks elems:', !!elem, claimButtonElems, viewQuestElems, artQuestElems, collectionQuestElems);

  const hasReallyFinished =
    !!elem && !claimButtonElems.length && !viewQuestElems.length && !artQuestElems.length && !collectionQuestElems.length;
  console.log('hasReallyFinished:', hasReallyFinished);

  return hasReallyFinished;
}

async function cleanupIfFinishedAllQuests() {
  console.log('cleanupIfFinishedAllQuests');
  const hasFinished = await hasFinishedAllQuests();
  if (hasFinished) {
    chrome.runtime.sendMessage({ cmd: 'closeOtherDecaHelperStartedPages' });
    // chrome.runtime.sendMessage({ cmd: 'focusMyTab' });
    if (storage.options.loadUpgradePageAfterFinished || storage.options.autoUpgrade) {
      await addPendingRequest(DECA_UPGRADE_URL, { action: 'upgrade' });
      window.location.href = DECA_UPGRADE_URL;
    }
  }
  return hasFinished;
}

// STATUSBAR FUNCS ----------------------------------------------------------------------------------

function addStatusbarButtons() {
  if (!pageState.statusbar) {
    return;
  }

  pageState.statusbar.buttons(
    createStatusbarButtons({
      options: true,
      quest: true,
    })
  );
}

/*
async function runForcedQuestsButtonHandler(event) {
  console.log('runAllQuestsButtonHandler', event);
  await addPendingRequest(DECA_DXP_URL, { action: 'forceRunQuests' });
  if (window.location.href === DECA_DXP_URL) {
    window.location.reload();
  } else {
    window.location.href = DECA_DXP_URL;
  }
}
*/

// QUEST DATA ----------------------------------------------------------------------------------

async function getQuestData() {
  // updateStatusbar('Get quest data...');

  if (!hasArtQuest() && !hasCollectionQuest()) {
    // updateStatusbarInfo('No quests found');
    return null;
  }

  const stopTime = Date.now() + TIMEOUT_GET_QUEST_IMAGE_DATA_SECS * 1000;
  while (Date.now() <= stopTime) {
    const data = await getQuestDataElements();
    pageState.questData = data;
    console.log('pageState.questData', pageState.questData);
    if (data.collectionQuest || data.artQuest) {
      return data;
    }
    await sleep(1000);
  }

  return null;

  //updateStatusbarInfo('Quest data missing, will reload page and try again...');
  //restartDecaQuests();
}

async function getQuestDataElements() {
  console.log('getQuestDataElements');

  const data = {};

  const elem = await waitForSelector('[type="submit"]', 1000, 100);
  console.log('elem', elem);
  await sleep(1000);

  const buttons = [...document.querySelectorAll('[type="submit"]')];
  console.log('buttons', buttons);
  for (let i = 0; i < buttons.length; i++) {
    console.log('buttons[i]', buttons[i]);
    buttons[i].focus();
    await sleep(1000);
  }

  console.log('pageState.allImages', pageState.allImages);
  console.log('pageState.allImages.length', pageState.allImages.length);
  const questUrls = [];

  for (let i = 0; i < pageState.allImages.length; i++) {
    console.log(`${i}: pageState.allImages.length:`, pageState.allImages.length);
    const img = pageState.allImages[i];
    console.log('img', img);
    if (
      img.alt === 'Deca Quests' &&
      (img.src.startsWith('https://deca.art/_next/image?url=https') ||
        img.src.startsWith('https://media.deca.systems/static/') ||
        img.src.startsWith('https://media-cdn.deca.art/'))
    ) {
      console.log('**** OK QUEST:', img.alt, img.src);
      questUrls.push(img.src);
    } else {
      console.log('nok quest:', img.alt, img.src);
    }
  }
  console.log('questUrls', questUrls);

  const dups = {};
  const questUrlsNoDups = [];
  for (let i = 0; i < questUrls.length; i++) {
    const url = questUrls[i];
    console.log('questUrls url:', url);
    if (dups[url]) {
      console.log('is dup:', url);
      continue;
    }
    dups[url] = true;
    questUrlsNoDups.push(url);
  }
  console.log('questUrlsNoDups', questUrlsNoDups);

  const imageData = [];
  for (let i = 0; i < questUrlsNoDups.length; i++) {
    const url = questUrlsNoDups[i];
    console.log('questUrlsNoDups url:', url);
    imageData.push(parseImageContents(url));
    console.log(
      'imageData x',
      imageData.map((x) => x)
    );
  }
  console.log('imageData', imageData);

  data.allImages = pageState.allImages;
  data.questUrls = questUrls;
  data.questUrlsNoDups = questUrlsNoDups;
  data.imageData = imageData;

  const hasArtQuest = !!document.querySelector('#submission');
  const hasCollectionQuest = !hasArtQuest && imageData.length;
  console.log('hasCollectionQuest', hasCollectionQuest);
  console.log('hasArtQuest', hasArtQuest);

  data.hasCollectionQuest = hasCollectionQuest;
  data.hasArtQuest = hasArtQuest;

  data.collectionQuest = hasCollectionQuest ? imageData.slice(0, imageData.length - 1) : null;
  data.artQuest = hasArtQuest ? imageData.slice(0, 1) : null;
  data.artQuestButton = buttons?.length > 0 ? buttons[0] : null;

  console.log('final data', data);

  return data;
}

// https://media.deca.systems/static/ethereum/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/296000304?width=1000

function parseImageContents(url) {
  console.log('parseImageContents, url:', url);

  const token1 = url.indexOf('%2f') >= 0 ? '%2f' : '/';
  const token2 = url.indexOf('%3F') >= 0 ? '%3F' : '?';

  const partsA = url.split(token1);
  const contract = partsA[4];
  const contractLow = contract?.toLowerCase();
  const partsB = partsA[5].split(token2);
  const tokenId = partsB[0];

  console.log('partsA', partsA);
  console.log('partsB', partsB);
  console.log('contract', contract);
  console.log('tokenId', tokenId);
  console.log('contract, tokenId', contractLow, tokenId);

  return { contract: contractLow, tokenId };
}

// FEATURED ARTISTS

// [...document.querySelectorAll('footer:not(.fixed)')].map(x => x.querySelector('a'))

async function runFollowFeaturedArtists() {
  const info = storage.options.followAndSubscribe ? 'Follow and subscribe to featured artists...' : 'Follow featured artists...';
  updateStatusbar(info);

  await sleep(randomInt(6000, 9000));

  const elems = [...document.querySelectorAll('footer:not(.fixed)')];

  if (!elems.length) {
    updateStatusbar('No featured artists found!');
    return;
  }

  const links = elems.map((x) => x.querySelector('a'));
  console.log('links', links);

  for (const link of links) {
    console.log('link', link);
    await addPendingRequest(link.href, { action: 'follow' });
    window.open(link.href);
    await sleep(randomInt(5000, 10000));
  }

  const info2 = storage.options.followAndSubscribe ? 'Followed and subscribed to featured artists!' : 'Followed featured artists!';
  updateStatusbar(info2);
}

async function followArtist() {
  const info = storage.options.followAndSubscribe ? 'Follow and subscribe to current artist...' : 'Follow current artist...';
  updateStatusbar(info);

  await sleep(randomInt(6000, 9000));

  const elemsFollow = [...document.querySelectorAll('button')].filter((x) => x.innerText.toLowerCase() === 'follow');
  for (const elem of elemsFollow) {
    elem.click();
    await sleep(1000);
  }

  if (storage.options.followAndSubscribe) {
    const elemsSubscribe = [...document.querySelectorAll('button')].filter((x) => x.innerText.toLowerCase() === 'subscribe');
    for (const elem of elemsSubscribe) {
      elem.click();
      await sleep(1000);
    }
  }

  const info2 = storage.options.followAndSubscribe ? 'Followed and subscribed to artist!' : 'Followed artist!';
  updateStatusbar(info2);
}

// DECA QUESTS --------------------------------------------------------------------------------------------

async function runDecaQuests(delaySecs = 0) {
  if (delaySecs) {
    const runAt = new Date(millisecondsAhead(delaySecs * 1000, new Date()));
    const runAtStr = storage.options.DEFAULT_LOCALE ? runAt.toLocaleString(storage.options.DEFAULT_LOCALE) : runAt.toLocaleString();
    updateStatusbarWarning(`Delay run of deca quests ${delaySecs} seconds until ${runAtStr}...`);
    await sleep(delaySecs * 1000);
  }

  chrome.runtime.sendMessage({ cmd: 'closeOtherDecaPages' });

  if (isRestarted()) {
    updateStatusbar(`Run restarted deca quests...`);
  }

  chrome.runtime.sendMessage({ cmd: 'focusMyTab' });
  updateStatusbar(`Waiting (max ${TIMEOUT_DXP_PAGE_LOADED_SECS} secs) for Deca page to fully load...`);
  await waitForDecaPageToLoad(false);

  if (await cleanupIfFinishedAllQuests()) {
    return updateStatusbarOk(`All deca quests are finished!`);
  }

  if (!storage.options.forceActivityQuest) {
    const n = randomInt(storage.options.sleepBeforeActivityQuestMin, storage.options.sleepBeforeActivityQuestMax);
    updateStatusbar(`Claiming finished rewards after delay of ${n} secs`);
    await sleep(n * 1000);
  } else {
    updateStatusbar('Claiming finished rewards in fast mode...');
  }

  await claimRewards();

  if (await cleanupIfFinishedAllQuests()) {
    return updateStatusbarOk(`All deca quests are finished!`);
  }

  const questData = await getQuestData();
  console.log('questData', questData);
  if (!questData) {
    updateStatusbarWarning('No quests found');
  }

  let shouldRunViewQuest = true;
  if (typeof pageState.request?.shouldRunViewQuest !== 'undefined') {
    console.log('shouldRunViewQuest from request!');
    shouldRunViewQuest = pageState.request?.shouldRunViewQuest;
  } else if (!storage.options.forceViewQuest && shouldSkipQuest(storage.options.skipViewQuestPct)) {
    shouldRunViewQuest = false;
  }
  console.log('shouldRunViewQuest', shouldRunViewQuest);

  let shouldRunArtQuest = true;
  if (typeof pageState.request?.shouldRunArtQuest !== 'undefined') {
    console.log('shouldRunArtQuest from request!');
    shouldRunArtQuest = pageState.request?.shouldRunArtQuest;
  } else if (!storage.options.forceArtQuest && shouldSkipQuest(storage.options.skipArtQuestPct)) {
    shouldRunArtQuest = false;
  }
  console.log('shouldRunArtQuest', shouldRunArtQuest);

  const p1 = runViweQuest(shouldRunViewQuest);
  const p2 = runArtQuest(questData, shouldRunArtQuest);
  const p3 = runCollectionQuest(questData);

  updateStatusbar('Wait for quests to finish...');

  Promise.all([p1, p2, p3]).then(async (values) => {
    console.log('quests promise return val:', values);
    // Make sure there are no rewards not claimed!
    //chrome.runtime.sendMessage({ cmd: 'focusMyTab' });
    updateStatusbar('Finished deca quests, wait some time to claim late rewards...');
    await sleep(4000);
    chrome.runtime.sendMessage({ cmd: 'closeOtherDecaPages' });
    //chrome.runtime.sendMessage({ cmd: 'focusMyTab' });

    await claimRewards();

    if (!isRestarted()) {
      console.log('Is not restarted!');
      await claimBastardRewards(5, 1);
      restartDecaQuests('restart', shouldRunViewQuest, shouldRunArtQuest);
      return;
    }

    await claimBastardRewards(60, 10);

    const stopTime = millisecondsAhead(60 * 60 * 1000);
    while (Date.now() <= stopTime) {
      if (await cleanupIfFinishedAllQuests()) {
        return updateStatusbarOk(`All deca quests are finished!`);
      }
      await claimRewards();

      const questData2 = await getQuestData();
      console.log('questData2', questData2);
      if ((questData2.artQuest && questData2.artQuest.length) || (questData2.collectionQuest && questData2.collectionQuest?.length)) {
        if (questData2.artQuest && questData2.artQuest.length && pageState.artQuestDone) {
          updateStatusbarError(`Art quest could not be solved, do this one manually`);
          return;
        }
        if (questData2.collectionQuest && questData2.collectionQuest?.length && pageState.isCollectionQuestDone) {
          updateStatusbarError(`Collection quest could not be solved, do this one manually (or try with Force Run)`);
          return;
        }
        return; // below code does not work to try again!
        /*
        updateStatusbarInfo(`Quest data found after a while, run deca quests once again...`);
        return runDecaQuests();
        */
      }
      await sleep(5000);
    }

    updateStatusbar('Done with deca quests!', 'ok');
  });
}

async function claimBastardRewards(maxWaitSecs = 5 * 60, intervalSecs = 10) {
  let isClaimed = false;
  const stopTime = Date.now() + maxWaitSecs * 1000;
  while (Date.now() <= stopTime) {
    isClaimed = isClaimed || (await claimRewards());
    if (isClaimed) {
      break;
    }
    await sleep(intervalSecs * 1000);
  }
  await claimRewards();
}

async function restartDecaQuests(action, shouldRunViewQuest, shouldRunArtQuest) {
  updateStatusbar('Restarting Deca quests to make sure everything gets done...');
  await addPendingRequest(DECA_DXP_URL, { action, shouldRunViewQuest, shouldRunArtQuest });
  await sleep(500);
  window.location.reload();
}

async function waitForDecaPageToLoad(doClaim) {
  console.log('waitForDecaPageToLoad');

  const data = { numViewQuests: 0, numCollectionQuests: 0, numArtQuests: 0 };

  // If restarted we most likely only need to wait for one quest!
  const numQuestsNeeded = pageState.request?.action === 'restart' ? 1 : 2;

  const stopTime = Date.now() + TIMEOUT_DXP_PAGE_LOADED_SECS * 1000;
  console.log('dateNow, stopTime:', Date.now(), stopTime);

  while (Date.now() <= stopTime) {
    if (doClaim) {
      await claimRewards();
    }

    if (hasViewQuest()) {
      console.log('has view quest!');
      data.numViewQuests = 1;
    }
    if (hasCollectionQuest()) {
      console.log('has collection quest!');
      data.numCollectionQuests = 1;
    }
    if (hasArtQuest()) {
      console.log('has art quest!');
      data.numArtQuests = 1;
    }
    console.log('data', data);
    if (data.numViewQuests + data.numCollectionQuests + data.numArtQuests >= numQuestsNeeded) {
      break;
    }
    if (data.numCollectionQuests || data.numArtQuests) {
      break;
    }
    console.log('page not fully loaded yet; data:', data);
    await sleep(750);
  }
  console.log('data after', data);

  const numQuests = data.numViewQuests + data.numCollectionQuests + data.numArtQuests;
  console.log('numQuests:', numQuests);

  if (numQuests > 0) {
    updateStatusbar('Page loaded...');
    await sleep(1000);
  } else {
    updateStatusbar('Page not fully loaded');
  }
}

function getClaimButtonElems() {
  return [...document.querySelectorAll('button')].filter((el) => el.textContent.toLowerCase().startsWith('claim'));
}

function getViewQuestElems() {
  return [...document.querySelectorAll('div.bg-white')].filter((x) => x.textContent.toLowerCase().startsWith('view galleries'));
}

function getArtQuestElems() {
  return [...document.querySelectorAll('div.bg-white')].filter((x) => x.textContent.toLowerCase().startsWith('name that art'));
}

function getArtQuestElem() {
  const elems = getArtQuestElems();
  return elems && elems.length ? elems[0] : null;
}

function getCollectionQuestElems() {
  return [...document.querySelectorAll('div.bg-white')].filter((x) => x.textContent.toLowerCase().startsWith('find that collection'));
}

async function claimRewards() {
  console.log('claimRewards');
  const claimButtons = getClaimButtonElems();
  console.log('claimButtons', claimButtons);
  for (var i = 0; i < claimButtons.length; i++) {
    console.log('claim btn:', claimButtons[i]);
    await simulateClick(claimButtons[i], 2, 2);
    await sleep(750);
  }
  return claimButtons.length > 0;
}

function hasViewQuest() {
  const elems = getViewQuestElems();
  console.log('elems with view quest:', elems);
  return elems.length > 0;
}

function hasCollectionQuest() {
  const elems = getCollectionQuestElems();
  console.log('elems with collection quest:', elems);
  return elems.length > 0;
}

function hasArtQuest() {
  const elem = getArtQuestElem();
  console.log('elem with art quest:', elem);
  return elem !== null;
}

async function getGalleryLinks(numToOpen) {
  if (storage.options.publicGalleries.length < numToOpen) {
    storage.options.publicGalleries = storage.options.visitedGalleries;
    storage.options.visitedGalleries = [];
    await setStorageData(storage);
    console.log('Too few galleries, reset publicGalleries:', storage.options.publicGalleries);
  }
  let links = [...storage.options.publicGalleries];
  console.log('links normal', links);

  links = [...new Set(links)];
  console.log('links no dups', links);

  console.log('storage.options.visitedGalleries', storage.options.visitedGalleries);
  const newLinks = links.filter((link) => !storage.options.visitedGalleries.includes(link));
  console.log('links not visited', newLinks);

  return newLinks;
}

// DECA VIEW QUEST --------------------------------------------------------------------------------------------

function openLink(url, forceForeground = false) {
  if (forceForeground || storage.options.forceOpenedPageToFront) {
    console.log('Open with window.open:', url);
    return window.open(url, '_blank');
  }
  if (storage.options.openLinksInForeground) {
    console.log('Open in foreground with openTab:', url);
    return chrome.runtime.sendMessage({ cmd: 'openTab', url, active: true });
  }
  console.log('Open in background with openTab:', url);
  return chrome.runtime.sendMessage({ cmd: 'openTab', url, active: false });
}

function shouldSkipQuest(pct) {
  const n = typeof pct === 'number' ? pct : 0;
  const rnd = randomInt(1, 100);
  console.log('shouldSkipQuest; pct, n, rnd, flag:', pct, n, rnd, rnd <= n);
  return rnd <= n;
}

async function runViweQuest(shouldRun) {
  if (!shouldRun) {
    updateStatusbar('View quest is skipped!');
    return;
  }

  if (!hasViewQuest()) {
    updateStatusbar('No View quest found!');
    return;
  }

  if (!storage.options.enableViewQuest) {
    console.log('enableViewQuest is disabled');
    return;
  }

  if (!storage.options.forceViewQuest) {
    const n = randomInt(storage.options.sleepBeforeViewQuestMin, storage.options.sleepBeforeViewQuestMax);
    updateStatusbar(`Run View quest after delay of ${n} secs`);
    await sleep(n * 1000);
  } else {
    updateStatusbar('Run View quest in fast mode...');
  }

  const isFirstRun = pageState.request?.action !== 'restart';
  const numToOpen = storage.options.minViewQuestGalleries;

  const galleryLinks = await getGalleryLinks(numToOpen);

  const numLinks = galleryLinks.length;
  console.log('galleryLinks', galleryLinks, numLinks, numToOpen);

  let isClaimed = false;
  let numOpened = 0;
  while ((hasViewQuest() && numOpened < numToOpen) || numOpened < numToOpen) {
    isClaimed = isClaimed || (await claimRewards());
    if (!isFirstRun && !hasViewQuest()) {
      updateStatusbar('No View galleries found');
      return;
    }
    const url = galleryLinks.shift();
    if (url) {
      await addPendingRequest(url, { action: 'view' });
      numOpened++;
      console.log(`open gallery ${numOpened}/${numToOpen} (of ${numLinks}): ${url}`);
      updateStatusbar(`Open View quest gallery ${numOpened} of ${numToOpen}...`);
      openLink(url);
      storage.options.visitedGalleries.push(url);
    } else {
      console.log('Got no more gallery links to open! Wait for reward button to appear...');
    }
    //await delayRandom(storage.options.openGalleryPageEveryNthSec * 1000, 0.3);
    await sleep(storage.options.openGalleryPageEveryNthSec * 1000, storage.options.openGalleryPageEveryNthSecMax * 1000);

    // chrome.runtime.sendMessage({ cmd: 'closeNewerNormalTabs' });
    // await sleep(500, 1000);
    if (numOpened > numToOpen) {
      // return await restartDecaQuests();
      // return;
      break;
    }
  }

  await setStorageData(storage);
  await sleep(4000, 5000);
  await claimRewards();

  if (pageState.request?.action !== 'finnishviewquest') {
    //updateStatusbar('Reload page to finish View quest...');
    //await restartDecaQuests('finnishviewquest');
  }

  // chrome.runtime.sendMessage({ cmd: 'closeNewerNormalTabs' });
  updateStatusbar('Done with view quest!');
  chrome.runtime.sendMessage({ cmd: 'focusMyTab' });
}

// DECA ART QUEST --------------------------------------------------------------------------------------------

async function runArtQuest(pageData, shouldRun) {
  try {
    console.log('runArtQuest', pageData, shouldRun);

    if (!shouldRun) {
      updateStatusbar('Art quest is skipped!');
      return;
    }

    if (!pageData || !pageData.artQuest || !pageData.artQuest.length) {
      updateStatusbar('No Art quest found');
      return false;
    }

    if (!storage.options.enableArtQuest) {
      console.log('enableArtQuest is disabled');
      return false;
    }

    if (!storage.options.forceArtQuest) {
      const n = randomInt(storage.options.sleepBeforeArtQuestMin, storage.options.sleepBeforeArtQuestMax);
      updateStatusbar(`Run Art quest after delay of ${n} secs`);
      await sleep(n * 1000);
    } else {
      updateStatusbar('Run Art quest in fast mode...');
    }

    const imageData = pageData.artQuest[0];
    const tokenUrl = `${ARTBLOCKS_TOKEN_URL_PREFIX}/${imageData.contract}/${imageData.tokenId}`;
    console.log('tokenUrl:', tokenUrl);
    await chrome.runtime.sendMessage({ cmd: 'fetchDecaArtQuery', url: tokenUrl });

    await waitForArtQuestFinished(TIMEOUT_WAIT_FOR_ART_QUEST_FINISH_SECS);
    await sleep(4000);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/*
async function solveDecaArtQuestJson() {
  try {
    updateStatusbar('Solve Deca Art quest...');
    console.log('solveDecaArtQuest: solveDecaArtQuestJson');
    await sleep(1000);
    console.log('solveDecaArtQuest: document.body.innerText', document.body.innerText);
    const jsonData = JSON.parse(document.body.innerText);
    console.log('solveDecaArtQuest: jsonData', jsonData);
    const collectionName = jsonData.traits[0]['trait_type'];
    console.log('collectionName', collectionName);
    chrome.runtime.sendMessage({ cmd: 'reportSolvedDecaArtQuery', collectionName });
  } catch (e) {
    console.error(e);
  }
}
*/

async function reportSolvedDecaArtQuery(collectionName) {
  try {
    console.log('solveDecaArtQuest: reportSolvedDecaArtQuery', collectionName);

    const elem = getArtQuestElem();
    console.log('solveDecaArtQuest: elem', elem);
    if (!elem) {
      console.error('Invalid art quest elem!', elem, collectionName);
    }

    const textElems = elem.getElementsByTagName('input');
    const textElem = textElems && textElems.length ? textElems[0] : null;
    console.log('solveDecaArtQuest: textElem, textElems', textElem, textElems);
    if (!textElem) {
      console.error('Invalid art quest textElem!', textElem, collectionName);
    }

    textElem.setAttribute('value', collectionName);
    textElem.dispatchEvent(new Event('input', { bubbles: true }));

    //const btnElem = elem.getElementsByTagName('button')[0];
    const btnElems = [...elem.getElementsByTagName('button')].filter((x) => x.textContent.toLowerCase() === 'submit');

    const btnElem = btnElems?.length ? btnElems[0] : null;
    if (!btnElem) {
      console.error('Invalid art quest btnElem!', btnElem);
    }
    await sleep(randomInt(1500, 3000));
    console.log('solveDecaArtQuest: btnElem', btnElem);
    btnElem.click();

    pageState.artQuestDone = true;

    updateStatusbarOk(`Deca Art quest solved, best guess: "${collectionName}"`);
  } catch (e) {
    console.error(e);
  }
}

async function waitForArtQuestFinished(waitSecs = 60) {
  console.log('waitForArtQuestFinished; artQuestDone:', pageState.artQuestDone);

  const stopTime = Date.now() + waitSecs * 1000;
  console.log('dates:', Date.now(), stopTime);
  while (!pageState.artQuestDone && Date.now() <= stopTime) {
    await sleep(1000);
  }
  console.log('stopped waiting, artQuestDone:', pageState.artQuestDone);
}

// DECA COLLECTION QUEST --------------------------------------------------------------------------------------------

async function runCollectionQuest(pageData) {
  try {
    console.log('solveDecaCollectionQuest', pageData);

    if (!pageData || !pageData.collectionQuest || !pageData.collectionQuest.length) {
      console.log('No collections quest to run!');
      return;
    }

    if (!storage.options.enableArtQuest) {
      console.log('enableArtQuest is disabled');
      return false;
    }

    if (!storage.options.forceArtQuest) {
      const n = randomInt(storage.options.sleepBeforeArtQuestMin, storage.options.sleepBeforeArtQuestMax);
      updateStatusbar(`Run Collection quest after delay of ${n} secs`);
      await sleep(n * 1000);
    } else {
      updateStatusbar('Run Collection quest in fast mode...');
    }

    const collections = await fetchCollections(TIMEOUT_PAUSE_FETCH_COLLECTIONS_MSECS);
    console.log('collections', collections);

    const candidates = {
      all: new Set(),
      p1: new Set(),
      p2: new Set(),
      p3: new Set(),
    };

    const addToCandidates = (prio, contract, collection) => {
      // const key = `${collection.username}/${collection.name}`;
      const item = {
        contract,
        name: collection.name,
        username: collection.username,
        url: `https://deca.art/${encodeURIComponent(collection.username)}/collections/${encodeURIComponent(collection.name)}`,
        mediaUrl: convertIpfsUrl(collection.mediaUrl),
      };
      candidates.all.add(item);
      candidates[`p${prio}`].add(item);
    };

    collections.forEach((coll) => {
      pageData.collectionQuest.forEach((imageData) => {
        const contract = imageData.contract;
        const tokenId = imageData.tokenId;

        if (coll.contracts[contract]) {
          if (coll.contracts[contract].length < 1) {
            addToCandidates(3, contract, coll);
            return;
          }
          for (let i = 0; i < coll.contracts[contract].length; i = i + 2) {
            const from = coll.contracts[contract][i];
            const to = coll.contracts[contract][i + 1];
            if (tokenId === from && from === to) {
              addToCandidates(1, contract, coll);
              return;
            }
            if (tokenId >= from && tokenId <= to) {
              addToCandidates(2, contract, coll);
              return;
            }
          }
        }
      });
    });

    const candidatesAll = noDuplicatesByObject([...candidates.all]);
    const candidates1 = noDuplicatesByObject([...candidates.p1]);
    const candidates2 = noDuplicatesByObject([...candidates.p2]);
    const candidates3 = noDuplicatesByObject([...candidates.p3]);

    console.log('candidatesAll', candidatesAll);
    console.log('candidates1', candidates1);
    console.log('candidates2', candidates2);
    console.log('candidates3', candidates3);

    console.log('pageData', pageData);

    if (!candidatesAll.length) {
      updateStatusbarWarning('Did not find any Collection quest candidates! Check Deca collections page manually.');
      pageState.isCollectionQuestDone = true;
      return;
    }

    // reverse since last item is most likely to be the right collection!
    candidatesAll.reverse();

    // If restarted and collection quest still exist, something has failed when opening collection pages. Try to force open them in collection page instead!
    chrome.runtime.sendMessage({
      cmd: 'showCollectionCandidates',
      collections: candidatesAll,
      openPages: isRestarted(),
      delaySecs: storage.options.openCollectionPageEveryNthSec,
    });
    const myTabId = await chrome.runtime.sendMessage({ cmd: 'getMyTabId' });
    chrome.runtime.sendMessage({ cmd: 'focusMyTab' });

    if (isRestarted()) {
      updateStatusbar('Do not open Collection quest links on restarted quest run!');
      return;
    }

    console.log(
      'Open collection candidates:',
      candidatesAll.map((x) => x.url)
    );
    console.log('pageState:', pageState);

    while (candidatesAll.length && !pageState.isCollectionQuestDone) {
      const url = candidatesAll.shift().url;
      console.log('Open collection candidate:', url);
      console.log('Candidates left:', candidatesAll.length);
      await addPendingRequest(url, { action: 'cquest', parentTabId: myTabId });
      openLink(url);
      await waitForNextCollectionQuestTabOpen(storage.options.openCollectionPageEveryNthSec);
      if (storage.options.closeCollectionPage) {
        chrome.runtime.sendMessage({ cmd: 'closeCollectionTabs' });
      }
      if (await hasFinishedAllQuests()) {
        break;
      }
    }
    console.log('candidatesAll after:', candidatesAll);
    if (pageState.isCollectionQuestDone) {
      updateStatusbar('Done with Collection quest!');
    } else {
      updateStatusbarWarning('Did not find any good candidate for Collection quest. Do it manually instead.');
    }
    pageState.isCollectionQuestDone = true;
    if (storage.options.closeCollectionPage) {
      chrome.runtime.sendMessage({ cmd: 'closeCollectionTabs' });
    }
    chrome.runtime.sendMessage({ cmd: 'focusMyTab' });
    await sleep(4000, 5000);
  } catch (e) {
    console.error(e);
  }
}

async function waitForNextCollectionQuestTabOpen(waitSecs = 30) {
  console.log('waitForNextCollectionQuestTabOpen');

  const stopTime = Date.now() + waitSecs * 1000;
  console.log('dateNow, stopTime:', Date.now(), stopTime);
  while (!pageState.isCollectionQuestDone && Date.now() <= stopTime) {
    await sleep(1000);
  }
  console.log('done with waitForNextCollectionQuestTabOpen, pageState:', pageState);
}

async function getCollectionByCursor(cursor = undefined) {
  console.log('getCollectionByCursor', cursor);

  const input = cursor
    ? `{"0":{"json":{"cursor":"${cursor}"},"meta":{"values":{"cursor":["bigint"]}}}}`
    : '{"0":{"json":{"cursor":null},"meta":{"values":{"cursor":["undefined"]}}}}';
  const url = `https://deca.art/api/trpc/collection.verified?batch=1&input=${encodeURIComponent(input)}`;
  console.log('fetch url:', url);

  const result = await fetchHelper(url, { body: null, method: 'GET' });

  return result.data.length ? result.data[0].result?.data : {};
}

async function fetchCollections(delayMsec, forceFetch = false) {
  console.log('fetchCollections', delayMsec, forceFetch);

  const storage = await getStorageData();
  console.log('storage', storage);

  const shouldForceFetch = forceFetch || pageState.forceFetch;
  console.log('shouldForceFetch, forceFetch, pageState.forceFetch', shouldForceFetch, forceFetch, pageState.forceFetch);

  if (storage.collections?.parsedData?.length && !shouldForceFetch) {
    return storage.collections.parsedData;
  }

  pageState.forceFetch = false;

  storage.collections = storage.collections || {};
  storage.collections.cursor = storage.collections.cursor || undefined;
  storage.collections.prevCursor = storage.collections.prevCursor || undefined;
  storage.collections.parsedData = storage.collections.parsedData || [];
  storage.collections.parsedData = [];

  let nextCursor = undefined; //  storage.collections.cursor || undefined;
  let prevCursor = storage.collections.prevCursor;
  console.log('nextCursor, prevCursor', nextCursor, prevCursor);

  const collections = [];

  const stopTime = millisecondsAhead(60 * 60 * 1000);
  while (Date.now() <= stopTime) {
    console.log('cursor', nextCursor);
    updateStatusbar('Get Deca Collection by cursor: ' + nextCursor);
    const data = await getCollectionByCursor(nextCursor);
    await sleep(delayMsec);
    if (data?.json?.collections) {
      console.log('data.json.collections', data.json.collections);
      collections.push(...data.json.collections);
      if (data.json.nextCursor) {
        prevCursor = nextCursor;
        nextCursor = data.json.nextCursor;
      } else {
        break;
      }
      continue;
    } else {
      console.log('not valid data', data);
    }
    break;
  }

  storage.collections.cursor = nextCursor;
  storage.collections.prevCursor = prevCursor;

  const result = parseCollectionData(collections);
  storage.collections.parsedData = [...storage.collections.parsedData, ...result];

  console.log('storage', storage);
  console.log('collections', collections);
  console.log('result', result);

  await setStorageData(storage);

  return storage.collections.parsedData;
}

function parseCollectionData(collections) {
  const result = [];

  for (let i = 0; i < collections.length; i++) {
    const coll = collections[i];

    const contract1 = coll.assetCollection?.length ? coll.assetCollection[0].asset?.contract.toLowerCase() : null;

    const contracts = {};
    if (contract1) {
      contracts[contract1] = [];
    }

    for (let j = 0; j < coll.tokenGates.length; j++) {
      const gate = coll.tokenGates[j];
      const contract2 = gate.contract.toLowerCase();
      if (typeof contracts[contract2] === 'undefined') {
        contracts[contract2] = [];
      }
      if (gate.fromTokenId !== '' && gate.toTokenId !== '') {
        contracts[contract2].push(gate.fromTokenId, gate.toTokenId);
      }
    }

    result.push({
      name: coll.name,
      username: coll.user.username,
      contracts,
      mediaUrl: convertIpfsUrl(coll.cover?.mediaUrl),
    });
  }

  console.log('parseCollectionData result:', result);

  return result;
}

function convertIpfsUrl(url) {
  // ipfs://QmRSkbD6ts3bb51PiSmGYDcoV7d4Y3cDsAi486W5WButsV
  // https://ipfs.io/ipfs/Qma5tE4d7KdnnSozosSMLBZ9ytc39jsnwbLEVzZpzQtMjj

  if (typeof url !== 'string') {
    console.log('convertIpfsUrl, url is not string', url);
    return '';
  }
  return !url.startsWith('ipfs://') ? url : `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`;
}

// STATUSBAR FUNCS -------------------------------------------------------------------------------

// STATUSBAR FUNCS ----------------------------------------------------------------------------------

function updateStatusbar(content, className = null) {
  pageState.statusbar.text(content, className);
}

function updateStatusbarOk(content) {
  updateStatusbar(content, 'ok');
}

function updateStatusbarInfo(content) {
  updateStatusbar(content, 'info');
}

function updateStatusbarWarning(content) {
  updateStatusbar(content, 'warning');
}

function updateStatusbarError(content) {
  pageState.statusbar.error(content);
}

// MISC HELPERS ----------------------------------------------------------

function shouldPageHaveStatusbar() {
  return true;
  // return isDecaDxpPage() || isDecaUpgradePage() || isDecaOneArtistPage() || isDecaAllArtistsPage();
}
