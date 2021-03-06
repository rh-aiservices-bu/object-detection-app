const NOUNS = [
  "Head",
  "Crest",
  "Crown",
  "Tooth",
  "Fang",
  "Horn",
  "Frill",
  "Skull",
  "Bone",
  "Tongue",
  "Throat",
  "Voice",
  "Nose",
  "Snout",
  "Chin",
  "Eye",
  "Sight",
  "Seer",
  "Speaker",
  "Singer",
  "Song",
  "Chanter",
  "Howler",
  "Chatter",
  "Shrieker",
  "Shriek",
  "Jaw",
  "Bite",
  "Biter",
  "Neck",
  "Shoulder",
  "Fin",
  "Wing",
  "Arm",
  "Lifter",
  "Grasp",
  "Grabber",
  "Paw",
  "Foot",
  "Finger",
  "Toe",
  "Thumb",
  "Talon",
  "Palm",
  "Touch",
  "Racer",
  "Runner",
  "Hoof",
  "Fly",
  "Flier",
  "Swoop",
  "Roar",
  "Hiss",
  "Hisser",
  "Snarl",
  "Dive",
  "Diver",
  "Rib",
  "Chest",
  "Back",
  "Ridge",
  "Leg",
  "Legs",
  "Tail",
  "Beak",
  "Walker",
  "Lasher",
  "Swisher",
  "Carver",
  "Kicker",
  "Roarer",
  "Crusher",
  "Spike",
  "Shaker",
  "Charger",
  "Hunter",
  "Weaver",
  "Crafter",
  "Binder",
  "Scribe",
  "Muse",
  "Snap",
  "Snapper",
  "Slayer",
  "Track",
  "Tracker",
  "Scar",
  "Scarer",
  "Fright",
  "Killer",
  "Death",
  "Doom",
  "Healer",
  "Saver",
  "Friend",
  "Foe",
  "Guardian",
  "Thunder",
  "Lightning",
  "Cloud",
  "Storm",
  "Forger",
  "Scale",
  "Hair",
  "Braid",
  "Nape",
  "Belly",
  "Reaper",
  "Dinosaur",
  "Taker",
  "Dancer",
  "Player",
  "Gambler",
  "Twister",
  "Turner",
  "Painter",
  "Dart",
  "Drifter",
  "Sting",
  "Stinger",
  "Venom",
  "Spur",
  "Swallow",
  "Devourer",
  "Knight",
  "Lord",
  "Queen",
  "King",
  "Master",
  "Prince",
  "Princess",
  "Duke",
  "Samurai",
  "Ninja",
  "Knave",
  "Sage",
  "Wizard",
  "Witch",
  "Warlock",
  "Warrior",
  "Jester",
  "Paladin",
  "Bard",
  "Trader",
  "Sword",
  "Shield",
  "Knife",
  "Dagger",
  "Arrow",
  "Bow",
  "Fighter",
  "Bane",
  "Follower",
  "Leader",
  "Scourge",
  "Watcher",
  "Cat",
  "Panther",
  "Tiger",
  "Puma",
  "Jaguar",
  "Ocelot",
  "Lynx",
  "Lion",
  "Leopard",
  "Ferret",
  "Weasel",
  "Wolverine",
  "Bear",
  "Raccoon",
  "Dog",
  "Wolf",
  "Kitten",
  "Puppy",
  "Cub",
  "Fox",
  "Hound",
  "Terrier",
  "Coyote",
  "Hyena",
  "Jackal",
  "Pig",
  "Horse",
  "Donkey",
  "Stallion",
  "Mare",
  "Zebra",
  "Antelope",
  "Gazelle",
  "Deer",
  "Buffalo",
  "Bison",
  "Boar",
  "Elk",
  "Whale",
  "Dolphin",
  "Shark",
  "Fish",
  "Minnow",
  "Salmon",
  "Ray",
  "Fisher",
  "Otter",
  "Gull",
  "Duck",
  "Goose",
  "Crow",
  "Raven",
  "Bird",
  "Eagle",
  "Raptor",
  "Hawk",
  "Falcon",
  "Moose",
  "Heron",
  "Owl",
  "Stork",
  "Crane",
  "Sparrow",
  "Robin",
  "Parrot",
  "Cockatoo",
  "Carp",
  "Lizard",
  "Gecko",
  "Iguana",
  "Snake",
  "Python",
  "Viper",
  "Boa",
  "Condor",
  "Vulture",
  "Spider",
  "Fly",
  "Scorpion",
  "Heron",
  "Oriole",
  "Toucan",
  "Bee",
  "Wasp",
  "Hornet",
  "Rabbit",
  "Bunny",
  "Hare",
  "Brow",
  "Mustang",
  "Ox",
  "Piper",
  "Soarer",
  "Flasher",
  "Moth",
  "Mask",
  "Hide",
  "Hero",
  "Antler",
  "Chill",
  "Chiller",
  "Gem",
  "Ogre",
  "Myth",
  "Elf",
  "Fairy",
  "Pixie",
  "Dragon",
  "Griffin",
  "Unicorn",
  "Pegasus",
  "Sprite",
  "Fancier",
  "Chopper",
  "Slicer",
  "Skinner",
  "Butterfly",
  "Legend",
  "Wanderer",
  "Rover",
  "Raver",
  "Loon",
  "Lancer",
  "Glass",
  "Glazer",
  "Flame",
  "Crystal",
  "Lantern",
  "Lighter",
  "Cloak",
  "Bell",
  "Ringer",
  "Keeper",
  "Centaur",
  "Bolt",
  "Catcher",
  "Whimsey",
  "Quester",
  "Mouse",
  "Serpent",
  "Wyrm",
  "Gargoyle",
  "Thorn",
  "Whip",
  "Rider",
  "Spirit",
  "Sentry",
  "Bat",
  "Beetle",
  "Burn",
  "Cowl",
  "Stone",
  "Gem",
  "Collar",
  "Mark",
  "Grin",
  "Scowl",
  "Spear",
  "Razor",
  "Edge",
  "Seeker",
  "Jay",
  "Koala",
  "Kangaroo",
  "Yak",
  "Sloth",
  "Ant",
  "Roach",
  "Weed",
  "Seed",
  "Eater",
  "Razor",
  "Shirt",
  "Face",
  "Goat",
  "Mind",
  "Shift",
  "Rider",
  "Face",
  "Mole",
  "Vole",
  "Pirate",
  "Llama",
  "Stag",
  "Bug",
  "Cap",
  "Boot",
  "Drop",
  "Hugger",
  "Sargent",
  "Snagglefoot",
  "Carpet",
  "Curtain",
];

module.exports = NOUNS;
