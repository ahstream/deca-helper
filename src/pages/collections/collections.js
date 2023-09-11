// RUNTIME -----------------------------------------------------------------------------------------

chrome.runtime.onMessage.addListener(async (request, sender) => {
  console.log('Received message:', request, sender);

  if (request.cmd === 'addCollections') {
    addCollections(request.collections);
    if (request.openPages) {
      openCollection(request.collections, request.delaySecs);
    }
    return false;
  }

  return true;
});

function openCollection() {
  // do nothing
}

function addCollections(collections) {
  const content = document.getElementById('collections');

  let html = '';

  collections.forEach((coll) => {
    const section = `<a class="candidate" href="${coll.url}" target="_blank"><img class="candidate" src="${coll.mediaUrl}" title="${coll.name} | ${coll.username}" /></a>`;
    html = html + `${section}\n\n`;
  });
  content.innerHTML = html;
}

/*
function loadPage() {}

async function openPages(collections, delaySecs) {
  for (let coll of collections) {
    const url = coll.url;
    console.log('Open collection candidate:', url);
    window.open(url, '_blank');
    await sleep(delaySecs * 1000);
  }
  // chrome.runtime.sendMessage({ cmd: 'closeCollectionTabs' });
}
*/
