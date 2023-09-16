export const defaultOptions = {
  autoRun: false,

  enableActivityQuest: true,
  forceActivityQuest: false,
  sleepBeforeActivityQuestMin: 5,
  sleepBeforeActivityQuestMax: 15,

  enableArtQuest: true,
  forceArtQuest: false,
  skipArtQuestPct: 0,
  sleepBeforeArtQuestMin: 60,
  sleepBeforeArtQuestMax: 120,
  //artQuestPctFail: 30,
  //artQuestFailedNames: [],

  enableViewQuest: true,
  forceViewQuest: false,
  skipViewQuestPct: 0,
  sleepBeforeViewQuestMin: 25,
  sleepBeforeViewQuestMax: 50,

  openLinksInForeground: true,
  forceOpenedPageToFront: true,
  closeCollectionPage: false,
  loadUpgradePageAfterFinished: false,
  autoUpgrade: false,
  autoUpgradeMaxLevel: 100,
  autoUpgradeMinLevel: 40,
  autoUpgradeNth: 1,
  minViewQuestGalleries: 13,
  openGalleryPageEveryNthSec: 3,
  openGalleryPageEveryNthSecMax: 6,
  openCollectionPageEveryNthSec: 10,
  followAndSubscribe: true,
  visitedGalleries: [],
  publicGalleries: [
    'https://deca.art/DinkyWinky/genart',
    'https://deca.art/DinkyWinky/whatisrealxmoonbirdsart',
    'https://deca.art/DinkyWinky/decaart',
    'https://deca.art/DinkyWinky/history',
    'https://deca.art/luckyboy/deca',
    'https://deca.art/luckyboy/metadoge',
    'https://deca.art/luckyboy/showme',
    'https://deca.art/luckyboy/zora',
    'https://deca.art/luckyboy/gallery',
    'https://deca.art/luckyboy/gallery2',
    'https://deca.art/luckyboy/gallery3',
    'https://deca.art/luckyboy/gallery4',
    'https://deca.art/luckyboy/gallery5',
    'https://deca.art/B_Beth/pac',
    'https://deca.art/B_Beth/b_deca',
    'https://deca.art/B_Beth/friends',
    'https://deca.art/B_Beth/b_collection',
    'https://deca.art/B_Beth/puma',
    'https://deca.art/B_Beth/neko',
    'https://deca.art/B_Beth/emanuele_ferrari',
    'https://deca.art/B_Beth/tbt',
    'https://deca.art/B_Beth/b_bcollection',
    'https://deca.art/B_Beth/my_cel_mates',
    'https://deca.art/B_Beth/demons',
    'https://deca.art/ShanbAkshay/gallery2',
    'https://deca.art/AkshayShanb/gallery3',
    'https://deca.art/sq/DECA-Discovery',
    'https://deca.art/FOESxKARMA/proof_xyz-gallery',
    'https://deca.art/FOESxKARMA/gallery-2',
    'https://deca.art/FOESxKARMA/freestyle',
    'https://deca.art/FOESxKARMA/gallery',
    'https://deca.art/trnshtty/odddd',
    'https://deca.art/trnshtty/pepepepe',
    'https://deca.art/trnshtty/koripo',
    'https://deca.art/trnshtty/eldecagon',
    'https://deca.art/trnshtty/tentura',
    'https://deca.art/trnshtty/decagon2',
    'https://deca.art/ds/pepeflash',
    'https://deca.art/ds/plasticity',
    'https://deca.art/ds/decagon',
    'https://deca.art/ACE/qubibi',
    'https://deca.art/ACE/6529',
    'https://deca.art/ACE/the-art-of-proof',
    'https://deca.art/ACE/gonkcomp',
    'https://deca.art/ACE/256art',
    'https://deca.art/ACE/generative-art',
    'https://deca.art/ACE/decagon',
    'https://deca.art/ACE/gallery',
    'https://deca.art/ACE/xcopy_max_pain_frens',
    'https://deca.art/ACE/nyc-nft-2022-medicicollection-honorary-arMeme',
    'https://deca.art/ka/g1',
    'https://deca.art/ka/g2',
    'https://deca.art/ka/g3',
    'https://deca.art/ka/G4',
    'https://deca.art/ka/G5',
    'https://deca.art/ka/G6',
    'https://deca.art/ka/G7',
    'https://deca.art/ka/G8',
    'https://deca.art/TheFoodMaster/tastygrotesque',
    'https://deca.art/TheFoodMaster/myfoodphotography',
    'https://deca.art/TheFoodMaster/theredmushroom',
    'https://deca.art/TheFoodMaster/ladycrepe',
    'https://deca.art/TheFoodMaster/eyesthatspeak',
    'https://deca.art/TheFoodMaster/boozy',
    'https://deca.art/TheFoodMaster/magasm',
    'https://deca.art/TheFoodMaster/myetchesandlifts',
    'https://deca.art/TheFoodMaster/foodkiss',
    'https://deca.art/TheFoodMaster/halloween',
    'https://deca.art/TheFoodMaster/surreal',
    'https://deca.art/TheFoodMaster/myfoodycreations',
    'https://deca.art/TheFoodMaster/tezosphotographers',
    'https://deca.art/TheFoodMaster/daretodream',
    'https://deca.art/TheFoodMaster/paintings',
    'https://deca.art/TheFoodMaster/countrysidedream',
    'https://deca.art/TheFoodMaster/creativecities',
    'https://deca.art/TheFoodMaster/linageesdomains',
    'https://deca.art/TheFoodMaster/goldpalletteart',
    'https://deca.art/TheFoodMaster/6529museumsummer',
    'https://deca.art/TheFoodMaster/6529museumgradient',
    'https://deca.art/TheFoodMaster/grimsreturn',
    'https://deca.art/TheFoodMaster/ai',
    'https://deca.art/FranktheTank/regular',
    'https://deca.art/FranktheTank/decal_18',
    'https://deca.art/FranktheTank/decagon_8661',
    'https://deca.art/FranktheTank/moma',
    'https://deca.art/FranktheTank/gallery6',
    'https://deca.art/FranktheTank/gallery2',
    'https://deca.art/FranktheTank/gallery',
    'https://deca.art/FranktheTank/gallery3',
    'https://deca.art/FranktheTank/gallery8',
    'https://deca.art/FranktheTank/gallery9',
    'https://deca.art/FranktheTank/gallery10',
    'https://deca.art/Reiniscouple/sense',
    'https://deca.art/Reiniscouple/eliane',
    'https://deca.art/Reiniscouple/fgallery',
    'https://deca.art/Reiniscouple/let-me-dream',
    'https://deca.art/Reiniscouple/focus',
    'https://deca.art/miho1969/gallery',
    'https://deca.art/email5566/Gallery3',
    'https://deca.art/thomy2408/enjoy_life',
    'https://deca.art/thomy2408/life_is_good',
    'https://deca.art/thomy2408/flow_is_key',
    'https://deca.art/thomy2408/first_nft_magazine',
    'https://deca.art/thomy2408/bee382',
    'https://deca.art/thomy2408/decagon42090',
    'https://deca.art/thomy2408/decagon3607',
    'https://deca.art/thomy2408/decagon42092',
    'https://deca.art/thomy2408/bee592',
    'https://deca.art/thomy2408/AlphaLabs',
    'https://deca.art/Ferdi/thecollection',
    'https://deca.art/Ferdi/gerhard',
    'https://deca.art/Ferdi/monogrid',
    'https://deca.art/Ferdi/verylargearray',
    'https://deca.art/Ferdi/turnerlight',
    'https://deca.art/Ferdi/gallery2',
    'https://deca.art/Ferdi/chromatlas',
    'https://deca.art/Ferdi/distcollective',
    'https://deca.art/Ferdi/genart',
    'https://deca.art/Ferdi/curation',
    'https://deca.art/Ferdi/glitchode',
    'https://deca.art/Ferdi/halloffame',
    'https://deca.art/Ferdi/deca',
    'https://deca.art/Ferdi/decagon',
    'https://deca.art/TKRok/decagon',
    'https://deca.art/TKRok/betwixt',
    'https://deca.art/TKRok/hodling',
    'https://deca.art/TKRok/dystopunks',
    'https://deca.art/TKRok/void',
    'https://deca.art/TKRok/rugs-n-hidden',
    'https://deca.art/TKRok/gonkcomp',
    'https://deca.art/TKRok/goldcat',
    'https://deca.art/TKRok/6529',
    'https://deca.art/TKRok/qubibi',
    'https://deca.art/TorvikArts/galleries',
    'https://deca.art/TorvikArts/gallery',
    'https://deca.art/TorvikArts/gallery2',
    'https://deca.art/TorvikArts/gallery3',
    'https://deca.art/TorvikArts/gallery4',
    'https://deca.art/TorvikArts/gallery5',
    'https://deca.art/TorvikArts/gallery6',
    'https://deca.art/TorvikArts/gallery7',
    'https://deca.art/TorvikArts/gallery8',
    'https://deca.art/TorvikArts/gallery9',
    'https://deca.art/TorvikArts/Gallery10',
    'https://deca.art/TorvikArts/Gallery11',
    'https://deca.art/TorvikArts/gonks',
    'https://deca.art/TorvikArts/catdog_and_goblins',
    'https://deca.art/TorvikArts/hoomans_and_monkeys',
    'https://deca.art/TorvikArts/trolls_and_penguins',
    'https://deca.art/TorvikArts/weird_stuff',
    'https://deca.art/TorvikArts/love_death_and_robots',
    'https://deca.art/TorvikArts/deca',
    'https://deca.art/TorvikArts/followme',
    'https://deca.art/indiorobot/rrr',
    'https://deca.art/indiorobot/bwople',
    'https://deca.art/indiorobot/lucrece',
    'https://deca.art/indiorobot/lakon',
    'https://deca.art/indiorobot/trivial',
    'https://deca.art/indiorobot/uczine',
    'https://deca.art/indiorobot/pablo5K',
    'https://deca.art/indiorobot/defy',
    'https://deca.art/indiorobot/guricci',
    'https://deca.art/indiorobot/mek',
    'https://deca.art/indiorobot/mrsatan',
    'https://deca.art/peternitsch/sumo',
    'https://deca.art/peternitsch/sumo-dohyo',
    'https://deca.art/ricardotakamura/toinfinity',
    'https://deca.art/ricardotakamura/Starman',
    'https://deca.art/ricardotakamura/vortexdreams',
    'https://deca.art/ricardotakamura/gallery1',
    'https://deca.art/ricardotakamura/gallery2',
    'https://deca.art/ricardotakamura/gallery3',
    'https://deca.art/ricardotakamura/gallery4',
    'https://deca.art/ricardotakamura/gallery5',
    'https://deca.art/ricardotakamura/gallery6',
    'https://deca.art/ricardotakamura/gallery7',
    'https://deca.art/ricardotakamura/gallery8',
    'https://deca.art/ricardotakamura/gallery9',
    'https://deca.art/ricardotakamura/gallery10',
    'https://deca.art/riyouI/gallery',
    'https://deca.art/riyouI/gallery2',
    'https://deca.art/riyouI/gallery3',
    'https://deca.art/riyouI/gallery4',
    'https://deca.art/riyouI/cyberbrokers',
    'https://deca.art/i_lion/gallery',
    'https://deca.art/i_lion/gallery2',
    'https://deca.art/i_lion/gallery3',
    'https://deca.art/kitune/anime',
    'https://deca.art/kitune/gallery2',
    'https://deca.art/kitune/degen',
    'https://deca.art/kitune/joker',
    'https://deca.art/Daikichi/gallery2',
    'https://deca.art/kakashi/onboarding',
    'https://deca.art/sq/gonks',
    'https://deca.art/ka009/onboarding',
    'https://deca.art/otpyrcmona/screens',
    'https://deca.art/otpyrcmona/ricardo_takamura',
    'https://deca.art/otpyrcmona/crypto_bull',
    'https://deca.art/otpyrcmona/laurent_castellani',
    'https://deca.art/otpyrcmona/second_skin',
    'https://deca.art/otpyrcmona/metropolis_world',
    'https://deca.art/otpyrcmona/tiffatronn',
    'https://deca.art/otpyrcmona/wonderpals',
    'https://deca.art/otpyrcmona/waifugenesis',
    'https://deca.art/otpyrcmona/cyber_broker',
    'https://deca.art/otpyrcmona/kooks',
    'https://deca.art/otpyrcmona/century',
    'https://deca.art/otpyrcmona/the_currency_damien_hirst',
    'https://deca.art/otpyrcmona/romandrits',
    'https://deca.art/otpyrcmona/spektre',
    'https://deca.art/otpyrcmona/persepolis',
    'https://deca.art/otpyrcmona/makersplace',
    'https://deca.art/otpyrcmona/visit_again_soon',
    'https://deca.art/otpyrcmona/total_strangers',
    'https://deca.art/otpyrcmona/10k_project',
    'https://deca.art/otpyrcmona/dreamers',
    'https://deca.art/otpyrcmona/sakura_vista',
    'https://deca.art/otpyrcmona/fighting_demons',
    'https://deca.art/otpyrcmona/drawing_machine',
    'https://deca.art/otpyrcmona/sudden_death',
    'https://deca.art/otpyrcmona/stu_stu_studio_fun',
    'https://deca.art/otpyrcmona/perspective',
    'https://deca.art/otpyrcmona/exhibition',
    'https://deca.art/otpyrcmona/unfinished',
    'https://deca.art/otpyrcmona/romandrits_there_then',
    'https://deca.art/otpyrcmona/studies',
    'https://deca.art/otpyrcmona/dreamers_collection',
    'https://deca.art/null/the',
    'https://deca.art/null/Welcome_to_Megdaz',
    'https://deca.art/null/themachine',
    'https://deca.art/null/leuchtstoffroehre',
    'https://deca.art/null/ldrsty',
    'https://deca.art/null/waveshaper',
    'https://deca.art/null/mountainstripes',
    'https://deca.art/null/syntheticlandscape',
    'https://deca.art/null/pointer',
    'https://deca.art/null/megdaz',
    'https://deca.art/null/interactive',
    'https://deca.art/null/mountains',
    'https://deca.art/null/deca',
    'https://deca.art/Tongar/genart',
    'https://deca.art/Tongar/gallery2',
    'https://deca.art/Tongar/degengoblin',
    'https://deca.art/Tongar/pepe',
    'https://deca.art/Tongar/powerup',
    'https://deca.art/Tongar/favdecas',
    'https://deca.art/aashuu/decadian',
    'https://deca.art/aashuu/inwill',
    'https://deca.art/Biktor/galleries',
    'https://deca.art/Biktor/gallery',
    'https://deca.art/Biktor/gallery2',
    'https://deca.art/Biktor/gallery3',
    'https://deca.art/Biktor/gallery4',
    'https://deca.art/Biktor/gallery5',
    'https://deca.art/Biktor/gallery6',
    'https://deca.art/Biktor/gallery7',
    'https://deca.art/Biktor/gallery8',
    'https://deca.art/Biktor/gallery9',
    'https://deca.art/Biktor/gallery10',
    'https://deca.art/Biktor/gallery11',
    'https://deca.art/Biktor/decagons',
    'https://deca.art/Biktor/lovedeathrobots',
    'https://deca.art/Biktor/catdogs',
    'https://deca.art/Biktor/cryptobayc',
    'https://deca.art/sai009/onboarding',
    'https://deca.art/otpyrcmona/masonry_eric_davidson',
    'https://deca.art/otpyrcmona/lines_walking',
    'https://deca.art/otpyrcmona/dot_grid',
    'https://deca.art/otpyrcmona/prismatic',
    'https://deca.art/otpyrcmona/r3sonance',
    'https://deca.art/otpyrcmona/petri_dish',
    'https://deca.art/otpyrcmona/latent_spirits',
    'https://deca.art/otpyrcmona/fontana',
    'https://deca.art/otpyrcmona/thebulbimasks',
    'https://deca.art/otpyrcmona/pseudofigure',
    'https://deca.art/otpyrcmona/coquina',
    'https://deca.art/otpyrcmona/mind_maze',
    'https://deca.art/otpyrcmona/deconstructed_city_plans',
    'https://deca.art/otpyrcmona/center_pivot',
    'https://deca.art/otpyrcmona/zodiacmasks',
    'https://deca.art/otpyrcmona/celestial_cyclones',
    'https://deca.art/otpyrcmona/brushpops',
    'https://deca.art/otpyrcmona/electriz',
    'https://deca.art/otpyrcmona/chimera',
    'https://deca.art/otpyrcmona/network_c',
    'https://deca.art/otpyrcmona/labyrometry',
    'https://deca.art/otpyrcmona/rotae',
    'https://deca.art/otpyrcmona/assemblage',
    'https://deca.art/KING-X/beauty-in-symmetry',
    'https://deca.art/KING-X/lucky24',
    'https://deca.art/KING-X/33803',
    'https://deca.art/KING-X/18342',
    'https://deca.art/KING-X/16402',
    'https://deca.art/Zabouria/31369',
    'https://deca.art/Zabouria/37403',
    'https://deca.art/Zabouria/7619',
    'https://deca.art/Zabouria/2282',
    'https://deca.art/Zabouria/32866',
    'https://deca.art/ZaZaZ/750',
    'https://deca.art/ZaZaZ/1468',
    'https://deca.art/ZaZaZ/1968',
    'https://deca.art/ZaZaZ/3672',
    'https://deca.art/ZaZaZ/big-ZaZaZ-shop',
    'https://deca.art/sup231/gallery',
    'https://deca.art/sup231/gallery3',
    'https://deca.art/696/studio_yorktown',
    'https://deca.art/696/best_of_2022',
    'https://deca.art/696/zancan',
    'https://deca.art/696/neomorf_in_decaverse',
    'https://deca.art/696/first_steps_on_fxhash_1',
    'https://deca.art/696/tezos4tezos_2022',
    'https://deca.art/696/decagonks',
    'https://deca.art/thomas_bass/gallery',
    'https://deca.art/thomas_bass/gallery2',
    'https://deca.art/thomas_bass/gallery3',
    'https://deca.art/thomas_bass/gallery4',
    'https://deca.art/thomas_bass/gallery5',
    'https://deca.art/thomas_bass/gallery6',
    'https://deca.art/thomas_bass/gallery7',
    'https://deca.art/thomas_bass/gallery8',
    'https://deca.art/thomas_bass/gallery9',
    'https://deca.art/thomas_bass/gallery10',
    'https://deca.art/TheFoodMaster/lips',
    'https://deca.art/Book/invitation',
    'https://deca.art/Book/ticket-1',
    'https://deca.art/Book/ticket-2',
    'https://deca.art/Book/book_93',
    'https://deca.art/Book/book_90',
    'https://deca.art/Book/book_89',
    'https://deca.art/Book/book_44',
    'https://deca.art/Book/book_28',
    'https://deca.art/Book/book_30',
    'https://deca.art/Book/book_33',
    'https://deca.art/Book/book_34',
    'https://deca.art/Book/book_15',
    'https://deca.art/Book/book_43',
    'https://deca.art/Book/book_1',
    'https://deca.art/Book/book_100',
    'https://deca.art/Book/book_91',
    'https://deca.art/Book/book_84',
    'https://deca.art/Book/book_101',
    'https://deca.art/Book/book_47',
    'https://deca.art/Book/book_77',
    'https://deca.art/Book/book_12',
    'https://deca.art/Book/book_38',
    'https://deca.art/Book/book_10',
    'https://deca.art/Book/book_81',
    'https://deca.art/Book/book_46',
    'https://deca.art/Book/book_96',
    'https://deca.art/Book/burn_book',
    'https://deca.art/Book/ash_book',
    'https://deca.art/sq/BOOK',
    'https://deca.art/0x00/e30d',
    'https://deca.art/0x00/hypercat',
    'https://deca.art/0x00/decagon',
    'https://deca.art/0x00/smowlcat',
    'https://deca.art/0x00/cyberpunkcat',
    'https://deca.art/0x00/meka',
    'https://deca.art/0x00/artblock',
    'https://deca.art/0x00/voltz',
    'https://deca.art/0x00/owlcat',
    'https://deca.art/0x00/junglebridge',
    'https://deca.art/0x00/starry',
    'https://deca.art/0x00/friday',
    'https://deca.art/0x00/ellye',
    'https://deca.art/0x00/futureinspace',
    'https://deca.art/0x00/unstable',
    'https://deca.art/0x00/synchronizedthoughts',
    'https://deca.art/otpyrcmona/tiny_dinos',
    'https://deca.art/otpyrcmona/the_mountains_are_calling_by_rach_stewart',
    'https://deca.art/otpyrcmona/voices_of_the_ocean',
    'https://deca.art/otpyrcmona/forest_spirit',
    'https://deca.art/otpyrcmona/the_winkybot',
    'https://deca.art/otpyrcmona/exclusible_penthouse',
    'https://deca.art/otpyrcmona/streetlab',
    'https://deca.art/Makebymoney/gallery11',
    'https://deca.art/Makebymoney/gallery10',
    'https://deca.art/Makebymoney/gallery9',
    'https://deca.art/Makebymoney/gallery8',
    'https://deca.art/Makebymoney/gallery7',
    'https://deca.art/Makebymoney/gallery6',
    'https://deca.art/Makebymoney/gallery5',
    'https://deca.art/Makebymoney/gallery4',
    'https://deca.art/Makebymoney/rug',
    'https://deca.art/Makebymoney/scammm',
    'https://deca.art/otpyrcmona/ringers',
    'https://deca.art/otpyrcmona/rotor',
    'https://deca.art/otpyrcmona/elevated_deconstructions',
    'https://deca.art/otpyrcmona/worlds',
    'https://deca.art/otpyrcmona/incomplete_control',
    'https://deca.art/otpyrcmona/petridish',
    'https://deca.art/otpyrcmona/shields',
    'https://deca.art/otpyrcmona/neophyte_mmxxii',
    'https://deca.art/otpyrcmona/saturazione',
    'https://deca.art/otpyrcmona/apparitions',
    'https://deca.art/otpyrcmona/the_portraits_by_batz',
    'https://deca.art/sq/fxhash',
    'https://deca.art/Byron_SONE/blueandgreen',
    'https://deca.art/Byron_SONE/Solex',
    'https://deca.art/Byron_SONE/catjumping',
    'https://deca.art/Byron_SONE/starwing',
    'https://deca.art/Byron_SONE/clairesilver',
    'https://deca.art/Byron_SONE/Tezos',
    'https://deca.art/Byron_SONE/nicedecagon',
    'https://deca.art/Byron_SONE/FAB_DAO',
    'https://deca.art/Byron_SONE/pixelcatzh',
    'https://deca.art/decajohn/digitalart',
    'https://deca.art/decajohn/gallery',
    'https://deca.art/decajohn/decagon',
    'https://deca.art/decajohn/fidenza',
    'https://deca.art/decajohn/decagon-oldschool',
    'https://deca.art/decajohn/the-oddest-of-all',
    'https://deca.art/decajohn/flamingosclub',
    'https://deca.art/decajohn/daydreams',
    'https://deca.art/decajohn/gallery6',
    'https://deca.art/decajohn/chromie',
    'https://deca.art/decajohn/ieva',
    'https://deca.art/decajohn/hot-summer',
    'https://deca.art/bat_clean/gallery',
    'https://deca.art/bat_clean/different',
    'https://deca.art/bat_clean/vagizuki',
    'https://deca.art/bat_clean/lollidicks',
    'https://deca.art/bat_clean/llamasai',
    'https://deca.art/bat_clean/swarmgas',
    'https://deca.art/bat_clean/wildernesstoblockchain',
    'https://deca.art/bat_clean/mfers',
    'https://deca.art/bat_clean/horsegonks',
    'https://deca.art/bat_clean/ganastarts',
    'https://deca.art/bat_clean/thebox',
    'https://deca.art/bat_clean/folowers',
    'https://deca.art/bat_clean/boombox',
    'https://deca.art/bat_clean/chponk',
    'https://deca.art/bat_clean/sexygonks',
    'https://deca.art/bat_clean/gonkstower',
    'https://deca.art/bat_clean/sexygonks2',
    'https://deca.art/bat_clean/sexygonks3',
    'https://deca.art/bat_clean/sexygonks4',
    'https://deca.art/bat_clean/sexygonks5',
    'https://deca.art/bat_clean/sexygonks6',
    'https://deca.art/bat_clean/sweetmoney',
    'https://deca.art/bat_clean/pockevolution',
    'https://deca.art/bat_clean/my',
    'https://deca.art/bat_clean/freemintislive',
    'https://deca.art/bat_clean/abstracts',
    'https://deca.art/bat_clean/flappygame',
    'https://deca.art/bat_clean/tronwars',
    'https://deca.art/bat_clean/crazymen',
    'https://deca.art/bat_clean/ganesha',
    'https://deca.art/bat_clean/dota',
    'https://deca.art/bat_clean/ghostbusters',
    'https://deca.art/bat_clean/goodmorning',
    'https://deca.art/bat_clean/cleaning',
    'https://deca.art/bat_clean/father',
    'https://deca.art/bat_clean/beautifulsky',
    'https://deca.art/bat_clean/kisses',
    'https://deca.art/bat_clean/blackandwhite',
    'https://deca.art/bat_clean/midnight',
    'https://deca.art/MRO/gallery6',
    'https://deca.art/otpyrcmona/knownorigin',
    'https://deca.art/otpyrcmona/The_WGMeets_Collection',
    'https://deca.art/otpyrcmona/landscapes_out_of-my_mind',
    'https://deca.art/otpyrcmona/off_the_grid',
    'https://deca.art/KuMa_ART_collective/Gallery212',
    'https://deca.art/otpyrcmona/Basalt_Editions',
    'https://deca.art/otpyrcmona/taste',
    'https://deca.art/otpyrcmona/new_old_stories',
    'https://deca.art/otpyrcmona/incarceracism',
    'https://deca.art/otpyrcmona/resilience',
    'https://deca.art/otpyrcmona/photo365dayz',
    'https://deca.art/otpyrcmona/dance_of_the_goddess',
    'https://deca.art/otpyrcmona/storeroom',
    'https://deca.art/otpyrcmona/charcoal',
    'https://deca.art/otpyrcmona/primordial',
    'https://deca.art/otpyrcmona/coquina_by_jacob_gold',
    'https://deca.art/ccury/gallery2',
    'https://deca.art/ccury/gallery',
    'https://deca.art/cycya/gallery2',
    'https://deca.art/cycya/gallery',
    'https://deca.art/ccury/gallery8',
    'https://deca.art/ccury/gallery7',
    'https://deca.art/ccury/gallery6',
    'https://deca.art/ccury/gallery5',
    'https://deca.art/ccury/gallery4',
    'https://deca.art/ccury/gallery3https',
    'https://deca.art/ccury/gallery3',
    'https://deca.art/TheMullet/fake_rare_deca',
    'https://deca.art/TheMullet/decadon_342_lvl50',
    'https://deca.art/TheMullet/decagon_3_digits',
    'https://deca.art/TheMullet/cryptoskull',
    'https://deca.art/TheMullet/fvck_avatar',
    'https://deca.art/TheMullet/fvck_crystal',
    'https://deca.art/ricardotakamura/gallery11',
    'https://deca.art/ricardotakamura/gallery12',
    'https://deca.art/ricardotakamura/gallery13',
    'https://deca.art/ricardotakamura/gallery14',
    'https://deca.art/ricardotakamura/gallery15',
    'https://deca.art/ricardotakamura/gallery16',
    'https://deca.art/ricardotakamura/gallery17',
    'https://deca.art/ricardotakamura/gallery18',
    'https://deca.art/ricardotakamura/gallery19',
    'https://deca.art/ricardotakamura/gallery20',
    'https://deca.art/KX/beauty-in-symmetry',
    'https://deca.art/KX/lucky24',
    'https://deca.art/KX/33803',
    'https://deca.art/KX/18342',
    'https://deca.art/KX/16402',
    'https://deca.art/Zabra/750',
    'https://deca.art/Zabra/1468',
    'https://deca.art/Zabra/1968',
    'https://deca.art/Zabra/3672',
    'https://deca.art/Zabra/big-zabra-shop',
    'https://deca.art/Kuka_shoma/bilnd-geometric',
    'https://deca.art/Kuka_shoma/rugradio',
    'https://deca.art/Kuka_shoma/isthisdeca',
    'https://deca.art/Kuka_shoma/pussy',
    'https://deca.art/Kuka_shoma/maybeuknow',
    'https://deca.art/Kuka_shoma/moving-in',
    'https://deca.art/Kuka_shoma/geo',
    'https://deca.art/Kuka_shoma/maria',
    'https://deca.art/Kuka_shoma/not-bad',
    'https://deca.art/TD-HODL/imaginary',
    'https://deca.art/TD-HODL/deca',
    'https://deca.art/TD-HODL/staking',
    'https://deca.art/TD-HODL/etch-star',
    'https://deca.art/TD-HODL/degod',
    'https://deca.art/TD-HODL/open',
    'https://deca.art/TD-HODL/meltdown-melted',
    'https://deca.art/MartyMcFly2/assembling_machine',
    'https://deca.art/MartyMcFly2/fxhash',
    'https://deca.art/MartyMcFly2/ethenerative',
    'https://deca.art/MartyMcFly2/colours',
    'https://deca.art/MartyMcFly2/cyberpunk',
    'https://deca.art/MartyMcFly2/krankarta',
    'https://deca.art/MartyMcFly2/abstract',
    'https://deca.art/MartyMcFly2/pure_ai',
    'https://deca.art/MartyMcFly2/decagons',
    'https://deca.art/MartyMcFly2/huxleysaga',
    'https://deca.art/MartyMcFly2/aku_the_moon_god',
    'https://deca.art/MartyMcFly2/fxhash_interactive_static',
    'https://deca.art/otpyrcmona/8thproject',
    'https://deca.art/otpyrcmona/s1mplify',
    'https://deca.art/otpyrcmona/amber',
    'https://deca.art/otpyrcmona/the_cryptomasks',
    'https://deca.art/otpyrcmona/the_sailor_dude',
    'https://deca.art/otpyrcmona/secret_money_society',
    'https://deca.art/otpyrcmona/marco_grassi',
    'https://deca.art/otpyrcmona/emanuele_ferrari',
    'https://deca.art/sq/teztheszn',
    'https://deca.art/Rana/reza',
    'https://deca.art/Rana/amin_naeini_collection',
    'https://deca.art/Rana/kubilayodabas_gallery',
    'https://deca.art/Rana/the-free-soul',
    'https://deca.art/Rana/seeking-peace',
    'https://deca.art/Rana/my-landscape-on-objkt',
    'https://deca.art/otpyrcmona/hashtractors',
    'https://deca.art/otpyrcmona/gravity_16_jimmy_herdberg',
    'https://deca.art/otpyrcmona/crypto_citizens',
    'https://deca.art/ricardotakamura/g',
    'https://deca.art/otpyrcmona/aixxa',
    'https://deca.art/otpyrcmona/ensemble',
    'https://deca.art/otpyrcmona/memories_of_qilin',
    'https://deca.art/otpyrcmona/click_by_ivan_dianov',
    'https://deca.art/DigitalAssetFreedom/twd',
    'https://deca.art/DigitalAssetFreedom/meme6529',
    'https://deca.art/DigitalAssetFreedom/deca',
    'https://deca.art/DigitalAssetFreedom/future',
    'https://deca.art/DigitalAssetFreedom/curry',
    'https://deca.art/DigitalAssetFreedom/degen',
    'https://deca.art/DigitalAssetFreedom/toadboat',
    'https://deca.art/DigitalAssetFreedom/shred',
    'https://deca.art/DigitalAssetFreedom/pass',
    'https://deca.art/DigitalAssetFreedom/mystery',
    'https://deca.art/DigitalAssetFreedom/gallery10',
    'https://deca.art/ACE/nyc-nft-2022',
    'https://deca.art/itsmoma/gallery',
    'https://deca.art/itsmoma/gallery3',
    'https://deca.art/itsmoma/artbyakasha',
    'https://deca.art/itsmoma/artsyfartsy',
    'https://deca.art/itsmoma/gallery4',
    'https://deca.art/itsmoma/gallery5',
    'https://deca.art/itsmoma/gallery6',
    'https://deca.art/itsmoma/gallery7',
    'https://deca.art/itsmoma/gallery8',
    'https://deca.art/itsmoma/gallery9',
    'https://deca.art/itsmoma/gallery10',
    'https://deca.art/itsmoma/gallery11',
    'https://deca.art/itsmoma/magicmork',
    'https://deca.art/itsmoma/access',
    'https://deca.art/itsmoma/earlyartI',
    'https://deca.art/itsmoma/momaGonk',
    'https://deca.art/itsmoma/compusophy',
    'https://deca.art/sq/TezCity',
    'https://deca.art/veerendra/mylightpaintings',
    'https://deca.art/veerendra/milkyway',
    'https://deca.art/veerendra/mylistednfts',
    'https://deca.art/theburrownft/risinghope',
    'https://deca.art/veerendra/regular',
    'https://deca.art/veerendra/memecards6529',
    'https://deca.art/veerendra/octagon',
    'https://deca.art/veerendra/gallery5',
    'https://deca.art/veerendra/gallery6',
    'https://deca.art/veerendra/6529',
    'https://deca.art/veerendra/glitch',
    'https://deca.art/veerendra/oddities',
    'https://deca.art/veerendra/decagon',
    'https://deca.art/veerendra/gonks',
    'https://deca.art/veerendra/web3university',
    'https://deca.art/sq/GenerativeArt',
    'https://deca.art/Elcarter15/special-decagons-offers-only',
    'https://deca.art/Elcarter15/gallery',
    'https://deca.art/Elcarter15/Gallery2',
    'https://deca.art/Elcarter15/Gallery3',
    'https://deca.art/Elcarter15/Gallery4',
    'https://deca.art/Elcarter15/Gallery5',
    'https://deca.art/Elcarter15/Gallery6',
    'https://deca.art/Elcarter15/gallery7',
    'https://deca.art/Elcarter15/Gallery8',
    'https://deca.art/Elcarter15/Gallery9',
    'https://deca.art/Elcarter15/Gallery10',
    'https://deca.art/ElCarter/capybaras',
    'https://deca.art/ElCarter/adorable-avocados',
    'https://deca.art/ElCarter/moonmaiden',
    'https://deca.art/ElCarter/kaleido-kids',
    'https://deca.art/ElCarter/mothz',
    'https://deca.art/ElCarter/we-are-dreamers',
    'https://deca.art/ElCarter/the-70s-by-lsd',
    'https://deca.art/ElCarter/dead-art',
    'https://deca.art/ElCarter/decagons',
    'https://deca.art/ElCarter/etch',
    'https://deca.art/ElCarter/macabroids',
    'https://deca.art/LeCharmout/decagons-for-sale',
    'https://deca.art/LeCharmout/gallery',
    'https://deca.art/LeCharmout/gallery2',
    'https://deca.art/benpenguin/Onwards_and_upwards',
    'https://deca.art/benpenguin/Gonked',
    'https://deca.art/benpenguin/TheJourney',
    'https://deca.art/benpenguin/james-jean',
    'https://deca.art/benpenguin/her',
    'https://deca.art/benpenguin/collective_strangers',
    'https://deca.art/benpenguin/etch_tigerbob618',
    'https://deca.art/benpenguin/deadfellazinfecteds2',
    'https://deca.art/benpenguin/figuregot',
    'https://deca.art/benpenguin/editions',
    'https://deca.art/benpenguin/decals',
    'https://deca.art/benpenguin/50-50-50',
    'https://deca.art/benpenguin/trideca',
    'https://deca.art/benpenguin/thewizard',
    'https://deca.art/benpenguin/you',
    'https://deca.art/benpenguin/deadfella',
    'https://deca.art/benpenguin/iterations-by-grelysian',
    'https://deca.art/KuMa_ART_collective/Gallery210',
    'https://deca.art/OnChainBook/burn_book',
    'https://deca.art/OnChainBook/ash_book',
    'https://deca.art/JassiOberai/portraits',
    'https://deca.art/JassiOberai/collected',
    'https://deca.art/JassiOberai/deca_for_sale',
    'https://deca.art/JassiOberai/summergirls',
    'https://deca.art/JassiOberai/deca',
    'https://deca.art/JassiOberai/pfps',
    'https://deca.art/Vik/TezosArt',
    'https://deca.art/Vik/Series-On-Makersplace',
    'https://deca.art/Vik/Ethcollection',
    'https://deca.art/anemale/symboliccitees',
    'https://deca.art/Shych1vette/all_me',
    'https://deca.art/Shych1vette/somefaves',
    'https://deca.art/anemale/SymbolicCitees',
    'https://deca.art/ArtFromAbove/drop',
    'https://deca.art/decajohn/daydreamshttps',
    'https://deca.art/sq/decagon',
    'https://deca.art/OnChainBook/invitation',
    'https://deca.art/OnChainBook/ticket-1',
    'https://deca.art/OnChainBook/ticket-2',
    'https://deca.art/OnChainBook/book_93',
    'https://deca.art/OnChainBook/book_90',
    'https://deca.art/OnChainBook/book_89',
    'https://deca.art/OnChainBook/book_44',
    'https://deca.art/OnChainBook/book_28',
    'https://deca.art/OnChainBook/book_30',
    'https://deca.art/OnChainBook/book_33',
    'https://deca.art/OnChainBook/book_34',
    'https://deca.art/OnChainBook/book_15',
    'https://deca.art/OnChainBook/book_43',
    'https://deca.art/OnChainBook/book_1',
    'https://deca.art/OnChainBook/book_100',
    'https://deca.art/OnChainBook/book_91',
    'https://deca.art/OnChainBook/book_84',
    'https://deca.art/OnChainBook/book_101',
    'https://deca.art/OnChainBook/book_47',
    'https://deca.art/OnChainBook/book_77',
    'https://deca.art/OnChainBook/book_12',
    'https://deca.art/OnChainBook/book_38',
    'https://deca.art/OnChainBook/book_10',
    'https://deca.art/OnChainBook/book_81',
    'https://deca.art/OnChainBook/book_46',
    'https://deca.art/OnChainBook/book_96',
    'https://deca.art/email5566/Gallery4',
    'https://deca.art/Mamanazam1/Female_Faces',
    'https://deca.art/Mamanazam1/ai_spaceships',
    'https://deca.art/Mamanazam1/angels',
    'https://deca.art/Big-_-DuDu/mydeca',
    'https://deca.art/Big-_-DuDu/my_girls',
    'https://deca.art/Big-_-DuDu/pfp',
    'https://deca.art/Big-_-DuDu/dudulab',
    'https://deca.art/Big-_-DuDu/dwarf',
    'https://deca.art/Big-_-DuDu/rareland',
    'https://deca.art/Big-_-DuDu/goto0',
    'https://deca.art/Big-_-DuDu/pass',
    'https://deca.art/Big-_-DuDu/desert',
    'https://deca.art/Big-_-DuDu/etch',
    'https://deca.art/Big-_-DuDu/mydecal',
    'https://deca.art/Big-_-DuDu/killer',
    'https://deca.art/Big-_-DuDu/Gallery',
    'https://deca.art/Tiny-_-DuDu/gallery',
    'https://deca.art/Tiny-_-DuDu/gallery2',
    'https://deca.art/Tiny-_-DuDu/gallery3',
    'https://deca.art/Tiny-_-DuDu/gallery4',
    'https://deca.art/Tiny-_-DuDu/gallery5',
    'https://deca.art/Tiny-_-DuDu/gallery6',
    'https://deca.art/Tiny-_-DuDu/gallery7',
    'https://deca.art/Tiny-_-DuDu/gallery8',
    'https://deca.art/Tiny-_-DuDu/gallery9',
    'https://deca.art/AnuBisATi/gallery',
    'https://deca.art/AnuBisATi/gallery2',
    'https://deca.art/AnuBisATi/gallery3',
    'https://deca.art/AnuBisATi/gallery4',
    'https://deca.art/AnuBisATi/gallery5',
    'https://deca.art/AnuBisATi/gallery6',
    'https://deca.art/AnuBisATi/gallery7',
    'https://deca.art/AnuBisATi/gallery8',
    'https://deca.art/uncle8jack/trashbox',
    'https://deca.art/uncle8jack/gallery',
    'https://deca.art/uncle8jack/gallery2',
    'https://deca.art/uncle8jack/ethnologyseries2',
    'https://deca.art/uncleas8jack/cheadp-pfp1',
    'https://deca.art/uncle8jack/cheap-pfp2',
    'https://deca.art/RYAK_eth/my',
    'https://deca.art/RYAK_eth/45720',
    'https://deca.art/RYAK_eth/ryak',
    'https://deca.art/RYAK_eth/d-node',
    'https://deca.art/RYAK_eth/digital_life_form_xdall-e_1st_iteration',
    'https://deca.art/RYAK_eth/waves',
    'https://deca.art/RYAK_eth/ethereum',
    'https://deca.art/decagon/dxp',
    'https://deca.art/twerk/john',
    'https://deca.art/twerk/elbi',
    'https://deca.art/twerk/under_construction',
    'https://deca.art/twerk/postwook',
    'https://deca.art/twerk/darkfarms',
    'https://deca.art/twerk/cydr',
    'https://deca.art/twerk/joao',
    'https://deca.art/twerk/SPIRAL',
    'https://deca.art/twerk/grant',
    'https://deca.art/twerk/fewocious',
    'https://deca.art/twerk/book',
    'https://deca.art/twerk/tjo',
    'https://deca.art/twerk/tokyoluv',
    'https://deca.art/twerk/caldwell',
    'https://deca.art/twerk/my_twizzys',
    'https://deca.art/twerk/mannay',
    'https://deca.art/twerk/proceed_w_caution',
    'https://deca.art/twerk/nyceth',
    'https://deca.art/twerk/OnChainBook',
    'https://deca.art/twerk/WILLARD',
    'https://deca.art/twerk/ngmi',
    'https://deca.art/twerk/xcopy',
    'https://deca.art/twerk/teznouns',
    'https://deca.art/twerk/0xraster',
    'https://deca.art/twerk/tokentimers',
    'https://deca.art/Saliec/gonksss',
    'https://deca.art/Saliec/gallery7',
    'https://deca.art/Saliec/Gallery',
    'https://deca.art/Saliec/Gallery2',
    'https://deca.art/Saliec/Gallnery3',
    'https://deca.art/Saliec/Gallery4',
    'https://deca.art/Saliec/Gallery5',
    'https://deca.art/Saliec/Gallery6',
    'https://deca.art/Saliec/tez',
    'https://deca.art/Saliec/decan',
    'https://deca.art/Saliec/nenan',
    'https://deca.art/Saliec/fiens',
    'https://deca.art/pedrovictor/faucet',
    'https://deca.art/pedrovictor/view-to-nothingness',
    'https://deca.art/pedrovictor/from-nothing-to-pre-existing',
    'https://deca.art/pedrovictor/cloud-continent-island',
    'https://deca.art/pedrovictor/suggestions',
    'https://deca.art/MonciL/portrait',
    'https://deca.art/MonciL/kolpri',
    'https://deca.art/MonciL/society',
    'https://deca.art/sq/arts',
    'https://deca.art/PHOTO/bw',
    'https://deca.art/PHOTO/polaroid',
    'https://deca.art/PHOTO/myfavoritphotographer',
    'https://deca.art/PHOTO/portraitb',
    'https://deca.art/JELWEB/realitywoods',
    'https://deca.art/JELWEB/takingaselfieonthebeach',
    'https://deca.art/JELWEB/persianhouse',
    'https://deca.art/JELWEB/clayboys',
    'https://deca.art/JT/therevenant',
    'https://deca.art/JT/bw',
    'https://deca.art/JT/theendisnear',
    'https://deca.art/JT/wandererspirits',
    'https://deca.art/Mx/TheTale',
    'https://deca.art/Hobbiteater/goonz',
    'https://deca.art/Hobbiteater/goonzdrip',
    'https://deca.art/Hobbiteater/frens',
    'https://deca.art/Hobbiteater/somethingspecial',
    'https://deca.art/Hobbiteater/intelligentlyartificial',
    'https://deca.art/Hobbiteater/rugs',
    'https://deca.art/Hobbiteater/mythicalsorigins',
    'https://deca.art/Hobbiteater/passes',
    'https://deca.art/Hobbiteater/bardlife',
    'https://deca.art/Hobbiteater/goldcat',
    'https://deca.art/twerk/5185',
    'https://deca.art/twerk/9712',
    'https://deca.art/twerk/15008',
    'https://deca.art/twerk/17869',
    'https://deca.art/twerk/21420',
    'https://deca.art/twerk/22742',
    'https://deca.art/twerk/23026',
    'https://deca.art/twerk/23027',
    'https://deca.art/twerk/23028',
    'https://deca.art/twerk/24774',
    'https://deca.art/twerk/27171',
    'https://deca.art/twerk/27794',
    'https://deca.art/twerk/28798',
    'https://deca.art/twerk/29972',
    'https://deca.art/twerk/31477',
    'https://deca.art/twerk/32274',
    'https://deca.art/twerk/32837',
    'https://deca.art/twerk/25632',
    'https://deca.art/twerk/43666',
    'https://deca.art/twerk/43697',
    'https://deca.art/twerk/42025',
    'https://deca.art/twerk/etch-646',
    'https://deca.art/itsmoma/compusoph',
    'https://deca.art/Mx/thetale',
    'https://deca.art/gazillion/gallery',
    'https://deca.art/mysteriosvision/memento_somnium',
    'https://deca.art/mysteriosvision/back_to_the_past',
    'https://deca.art/mysteriosvision/foresthouse',
    'https://deca.art/mysteriosvision/witness',
    'https://deca.art/mysteriosvision/decentralia',
    'https://deca.art/mysteriosvision/windows',
    'https://deca.art/mysteriosvision/redemption',
    'https://deca.art/mysteriosvision/timeless',
    'https://deca.art/KuMa_ART_collective/Gallery204',
    'https://deca.art/brunoamuniz/the_lost_pepaintings',
    'https://deca.art/brunoamuniz/wtf',
    'https://deca.art/brunoamuniz/ycopy',
    'https://deca.art/brunoamuniz/cloneforce',
    'https://deca.art/brunoamuniz/perfidious_virtues',
    'https://deca.art/brunoamuniz/magnum_opus',
    'https://deca.art/brunoamuniz/resaang_aiart',
    'https://deca.art/Looooopable/backtothe90spepe',
    'https://deca.art/Looooopable/loopableballoon',
    'https://deca.art/Looooopable/loopablenooooouns',
    'https://deca.art/sq/tezos',
    'https://deca.art/KuMa_ART_collective/posts',
    'https://deca.art/KuMa_ART_collective/Gallery203',
  ],
};

export const overrideOptions = {
  DEFAULT_LOCALE: 'sv-SE',
};
