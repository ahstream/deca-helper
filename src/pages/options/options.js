console.info('options.js begin', window?.location?.href);

import './options.css';

import { initOptionsPage, mountOptionsPage } from '@ahstream/hx-chrome-lib';

initOptionsPage();

const options = [
  {
    header: 'General',
    options: [
      ['description', 'Lorem Ipsum.'],
      ['property', 'autoRun', 'Auto run quests when page load'],
    ],
  },

  {
    header: 'Activity Quest',
    options: [
      ['description', 'Lorem Ipsum.'],
      ['property', 'enableActivityQuest', 'enableActivityQuest'],
      ['property', 'forceActivityQuest', 'forceActivityQuest'],
      ['property', 'sleepBeforeActivityQuestMin', 'sleepBeforeActivityQuestMin'],
      ['property', 'sleepBeforeActivityQuestMax', 'sleepBeforeActivityQuestMax'],
    ],
  },
  {
    header: 'Art Quest',
    options: [
      ['description', 'Lorem Ipsum.'],
      ['property', 'enableArtQuest', 'enableArtQuest'],
      ['property', 'forceArtQuest', 'forceArtQuest'],
      ['property', 'sleepBeforeArtQuestMin', 'sleepBeforeArtQuestMin'],
      ['property', 'sleepBeforeArtQuestMax', 'sleepBeforeArtQuestMax'],
      //['property', 'artQuestPctFail', 'artQuestPctFail'],
      //['property', 'artQuestFailedNames', 'artQuestFailedNames'],
    ],
  },
  {
    header: 'View Quest',
    options: [
      ['description', 'Lorem Ipsum.'],
      ['property', 'enableViewQuest', 'enableViewQuest'],
      ['description', 'Lorem Ipsum.'],
      ['property', 'forceViewQuest', 'forceViewQuest'],
      ['description', 'Lorem Ipsum.'],
      ['property', 'sleepBeforeViewQuestMin', 'sleepBeforeViewQuestMin'],
      ['property', 'sleepBeforeViewQuestMax', 'sleepBeforeViewQuestMax'],
      ['description', 'Lorem Ipsum.'],
      ['property', 'openLinksInForeground', 'Open links in foreground (better performance)'],
      ['property', 'forceOpenedPageToFront', 'Force opened page to front (better effect)'],
      ['description', 'Lorem Ipsum.'],
      ['property', 'minViewQuestGalleries', 'Minimum num of view quest galleries to open'],
      ['property', 'openGalleryPageEveryNthSec', 'Open View quest gallery page every N seconds (Min)'],
      ['property', 'openGalleryPageEveryNthSecMax', 'Open View quest gallery page every N seconds (Max)'],
      ['description', 'Lorem Ipsum.'],
      ['property', 'publicGalleries', 'Public galleries (randomly select from these)'],
      ['property', 'visitedGalleries', 'Visited galleries (visited ones is automatically put here)'],
    ],
  },

  {
    header: 'Upgrade',
    options: [
      ['description', 'Lorem Ipsum.'],
      ['property', 'loadUpgradePageAfterFinished', 'Load Upgrade page when all quests are finished'],
      ['property', 'autoUpgrade', 'Auto upgrade Decagons when all quests are finished'],
      ['property', 'autoUpgradeMaxLevel', 'Only upgrade Decagons level less than level'],
      ['property', 'autoUpgradeMinLevel', 'Only upgrade Decagons above or equal to level'],
      ['property', 'autoUpgradeNth', 'Upgrade n:th in level order Decagon'],
    ],
  },
];

mountOptionsPage(options);
