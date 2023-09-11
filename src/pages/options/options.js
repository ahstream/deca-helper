console.info('options.js begin', window?.location?.href);

import './options.css';

import { initOptionsPage, mountOptionsPage } from '@ahstream/hx-chrome-lib';

initOptionsPage();

const options = [
  {
    header: 'General',
    options: [['property', 'autoRun', 'Auto run quests when Decagon Quest page load']],
  },

  {
    header: 'Activity Quest',
    options: [
      ['description', 'Anti-bot detection delay is random time to pause before running quest.'],
      ['property', 'enableActivityQuest', 'Enable Activity Quest'],
      ['property', 'forceActivityQuest', 'Fast Mode', null, 'Run quest as fast as possible (skipping any delay config)'],
      ['property', 'sleepBeforeActivityQuestMin', 'Min Anti-bot detection delay', 'seconds'],
      ['property', 'sleepBeforeActivityQuestMax', 'Max Anti-bot detection delay', 'seconds'],
    ],
  },
  {
    header: 'Art Quest',
    options: [
      ['description', 'Anti-bot detection delay is random time to pause before running quest.'],
      ['property', 'enableArtQuest', 'Enable Art Quest'],
      ['property', 'forceArtQuest', 'Fast Mode', null, 'Run quest as fast as possible (skipping any delay config)'],
      ['property', 'sleepBeforeArtQuestMin', 'Min Anti-bot detection delay', 'seconds'],
      ['property', 'sleepBeforeArtQuestMax', 'Max Anti-bot detection delay', 'seconds'],
      //['property', 'artQuestPctFail', 'artQuestPctFail'],
      //['property', 'artQuestFailedNames', 'artQuestFailedNames'],
    ],
  },
  {
    header: 'View Quest',
    options: [
      ['description', 'Anti-bot detection delay is random time to pause before running quest.'],
      ['property', 'enableViewQuest', 'Enable View Quest'],
      ['property', 'forceViewQuest', 'Fast Mode', null, 'Run quest as fast as possible (skipping any delay config)'],
      ['property', 'sleepBeforeViewQuestMin', 'Min Anti-bot detection delay', 'seconds'],
      ['property', 'sleepBeforeViewQuestMax', 'Max Anti-bot detection delay', 'seconds'],
      ['space', 20],
      ['property', 'openLinksInForeground', 'Open links in foreground (better performance)'],
      ['property', 'forceOpenedPageToFront', 'Force opened page to front (better effect)'],
      ['space', 20],
      ['property', 'minViewQuestGalleries', 'Minimum num of view quest galleries to open'],
      ['property', 'openGalleryPageEveryNthSec', 'Open gallery link every Nth second (Min)'],
      ['property', 'openGalleryPageEveryNthSecMax', 'Open gallery link every Nth second (Max)'],
      ['space', 20],
      ['property', 'publicGalleries', 'Public galleries (taken in order from these)'],
      ['property', 'visitedGalleries', 'Visited galleries (visited ones is automatically put here)'],
    ],
  },

  {
    header: 'Upgrade',
    options: [
      ['property', 'loadUpgradePageAfterFinished', 'Load Upgrade page when all quests are finished'],
      ['property', 'autoUpgrade', 'Auto upgrade Decagons when all quests are finished'],
      ['property', 'autoUpgradeMaxLevel', 'Only upgrade Decagons level less than level'],
      ['property', 'autoUpgradeMinLevel', 'Only upgrade Decagons above or equal to level'],
      ['property', 'autoUpgradeNth', 'Upgrade n:th in level order Decagon'],
    ],
  },
];

mountOptionsPage(options);
