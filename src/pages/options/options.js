console.info('options.js begin', window?.location?.href);

import './options.css';

import { initOptionsPage, mountOptionsPage } from 'hx-chrome-lib';

initOptionsPage();

const options = [
  {
    header: 'General',
    options: [['property', 'autoRun', 'Auto run quests when Decagon Quest page load']],
  },

  {
    header: 'Activity Quest',
    options: [
      ['property', 'enableActivityQuest', 'Enable Activity Quest'],
      ['property', 'forceActivityQuest', 'Fast Mode', null, 'Run quest as fast as possible (skipping any delay config)'],

      [
        'table',
        [
          [
            'propertyCell',
            'sleepBeforeActivityQuestMin',
            'Min Anti-bot delay (seconds)',
            null,
            'Anti-bot detection delay is random time to pause before running quest',
          ],
          ['propertyCell', 'sleepBeforeActivityQuestMax', 'Max Anti-bot delay (seconds)'],
        ],
      ],
    ],
  },
  {
    header: 'Art Quest',
    options: [
      ['property', 'enableArtQuest', 'Enable Art Quest'],
      ['property', 'forceArtQuest', 'Fast Mode', null, 'Run quest as fast as possible (skipping any delay config)'],

      [
        'table',
        [
          [
            'propertyCell',
            'sleepBeforeArtQuestMin',
            'Min Anti-bot delay (seconds)',
            null,
            'Anti-bot detection delay is random time to pause before running quest',
          ],
          ['propertyCell', 'sleepBeforeArtQuestMax', 'Max Anti-bot delay (seconds)'],
          [
            'propertyCell',
            'skipArtQuestPct',
            'Skip Art Quest percentage (0-100)',
            null,
            'Skip doing quest sometimes to simulate more human like behaviour',
          ],
        ],
      ],

      //['property', 'artQuestPctFail', 'artQuestPctFail'],
      //['property', 'artQuestFailedNames', 'artQuestFailedNames'],
    ],
  },

  {
    header: 'Feed Quest',
    options: [
      ['property', 'enableFeedQuest', 'Enable Feed Quest'],
      ['property', 'forceFeedQuest', 'Fast Mode', null, 'Run quest as fast as possible (skipping any delay config)'],

      [
        'table',
        [
          [
            'propertyCell',
            'sleepBeforeFeedQuestMin',
            'Min Anti-bot delay (seconds)',
            null,
            'Anti-bot detection delay is random time to pause before running quest',
          ],
          ['propertyCell', 'sleepBeforeFeedQuestMax', 'Max Anti-bot delay (seconds)'],
          [
            'propertyCell',
            'skipFeedQuestPct',
            'Skip Feed Quest percentage (0-100)',
            null,
            'Skip doing quest sometimes to simulate more human like behaviour',
          ],
          ['propertyCell', 'feedQuestNumPagesToScroll', 'feedQuestNumPagesToScroll', null, 'todo'],
          ['propertyCell', 'feedQuestDelayBetweenPageScrollsMin', 'feedQuestDelayBetweenPageScrollsMin', null, 'todo'],
          ['propertyCell', 'feedQuestDelayBetweenPageScrollsMax', 'feedQuestDelayBetweenPageScrollsMax', null, 'todo'],
          ['propertyCell', 'feedQuestPixelsToScroll', 'feedQuestPixelsToScroll', null, 'todo'],
        ],
      ],
    ],
  },

  /*
  {
    header: 'View Quest',
    options: [
      ['property', 'enableViewQuest', 'Enable View Quest'],
      ['property', 'forceViewQuest', 'Fast Mode', null, 'Run quest as fast as possible (skipping any delay config)'],

      [
        'table',
        [
          [
            'propertyCell',
            'sleepBeforeViewQuestMin',
            'Min Anti-bot delay (seconds)',
            null,
            'Anti-bot detection delay is random time to pause before running quest',
          ],
          ['propertyCell', 'sleepBeforeViewQuestMax', 'Max Anti-bot delay (seconds)'],
          [
            'propertyCell',
            'skipViewQuestPct',
            'Skip View Quest percentage (0-100)',
            null,
            'Skip doing quest sometimes to simulate more human like behaviour',
          ],
        ],
      ],
    ],
  },


  {
    header: 'View Quest Galleries',
    options: [
      ['property', 'openLinksInForeground', 'Open links in foreground (better performance)'],
      ['property', 'forceOpenedPageToFront', 'Force opened page to front (better effect)'],

      [
        'table',
        [
          ['propertyCell', 'minViewQuestGalleries', 'Minimum num of view quest galleries to open'],
          ['propertyCell', 'openGalleryPageEveryNthSec', 'Open gallery link every Nth second (Min)'],
          ['propertyCell', 'openGalleryPageEveryNthSecMax', 'Open gallery link every Nth second (Max)'],
        ],
      ],

      ['space', 25],

      ['property', 'publicGalleries', 'All public galleries to visit (taken in order from these)'],
      [
        'property',
        'visitedGalleries',
        'Already visited galleries (automatically updated)',
        null,
        'Empty this field to start over and visit all public galleries again',
      ],
    ],
  },
  */

  {
    header: 'Upgrade',
    options: [
      ['property', 'loadUpgradePageAfterFinished', 'Load Upgrade page when all quests are finished'],
      ['property', 'autoUpgrade', 'Auto upgrade Decagons when all quests are finished'],

      [
        'table',
        [
          ['propertyCell', 'autoUpgradeMaxLevel', 'Only upgrade Decagons level less than level'],
          ['propertyCell', 'autoUpgradeMinLevel', 'Only upgrade Decagons above or equal to level'],
          ['propertyCell', 'autoUpgradeNth', 'Upgrade n:th in level order Decagon'],
        ],
      ],
      ['property', 'endWithPicsumPage', 'endWithPicsumPage'],
    ],
  },
];

mountOptionsPage(options);
