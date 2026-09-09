'use strict';

// Curated standard-Croatian vocabulary. Keep answers in lowercase; the crossword engine normalizes with Unicode-safe Array.from().
window.CROATIAN_VOCABULARY = [
  {
    "answer": "kuća",
    "clue": "House",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "stan",
    "clue": "Apartment / flat",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "soba",
    "clue": "Room",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "vrata",
    "clue": "Door",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "prozor",
    "clue": "Window",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "stol",
    "clue": "Table",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "stolica",
    "clue": "Chair",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "krevet",
    "clue": "Bed",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "ormar",
    "clue": "Wardrobe / cupboard",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "ključ",
    "clue": "Key",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "svjetlo",
    "clue": "Light / lamp light",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "zid",
    "clue": "Wall",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "pod",
    "clue": "Floor",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "krov",
    "clue": "Roof",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "vrt",
    "clue": "Garden",
    "difficulty": "easy",
    "category": "home"
  },
  {
    "answer": "majka",
    "clue": "Mother",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "otac",
    "clue": "Father",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "mama",
    "clue": "Mum",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "tata",
    "clue": "Dad",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "sin",
    "clue": "Son",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "kći",
    "clue": "Daughter",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "brat",
    "clue": "Brother",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "sestra",
    "clue": "Sister",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "baka",
    "clue": "Grandmother",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "djed",
    "clue": "Grandfather",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "obitelj",
    "clue": "Family",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "dijete",
    "clue": "Child",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "muž",
    "clue": "Husband",
    "difficulty": "easy",
    "category": "family"
  },
  {
    "answer": "žena",
    "clue": "Woman",
    "difficulty": "easy",
    "category": "people"
  },
  {
    "answer": "čovjek",
    "clue": "Man / person",
    "difficulty": "easy",
    "category": "people"
  },
  {
    "answer": "pas",
    "clue": "Dog",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "mačka",
    "clue": "Cat",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "ptica",
    "clue": "Bird",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "riba",
    "clue": "Fish",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "konj",
    "clue": "Horse",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "krava",
    "clue": "Cow",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "svinja",
    "clue": "Pig",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "ovca",
    "clue": "Sheep",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "koza",
    "clue": "Goat",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "miš",
    "clue": "Mouse",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "zec",
    "clue": "Rabbit",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "medvjed",
    "clue": "Bear",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "vuk",
    "clue": "Wolf",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "lav",
    "clue": "Lion",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "tigar",
    "clue": "Tiger",
    "difficulty": "easy",
    "category": "animals"
  },
  {
    "answer": "voda",
    "clue": "Water",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "kruh",
    "clue": "Bread",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "mlijeko",
    "clue": "Milk",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "sir",
    "clue": "Cheese",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "meso",
    "clue": "Meat",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "jaje",
    "clue": "Egg",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "juha",
    "clue": "Soup",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "riža",
    "clue": "Rice",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "sol",
    "clue": "Salt",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "šećer",
    "clue": "Sugar",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "jabuka",
    "clue": "Apple",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "banana",
    "clue": "Banana",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "naranča",
    "clue": "Orange (fruit)",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "limun",
    "clue": "Lemon",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "grožđe",
    "clue": "Grapes",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "krumpir",
    "clue": "Potato",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "rajčica",
    "clue": "Tomato",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "luk",
    "clue": "Onion",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "mrkva",
    "clue": "Carrot",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "kava",
    "clue": "Coffee",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "čaj",
    "clue": "Tea",
    "difficulty": "easy",
    "category": "food"
  },
  {
    "answer": "crven",
    "clue": "Red (masculine)",
    "difficulty": "easy",
    "category": "colours"
  },
  {
    "answer": "plav",
    "clue": "Blue (masculine)",
    "difficulty": "easy",
    "category": "colours"
  },
  {
    "answer": "zelen",
    "clue": "Green (masculine)",
    "difficulty": "easy",
    "category": "colours"
  },
  {
    "answer": "žut",
    "clue": "Yellow (masculine)",
    "difficulty": "easy",
    "category": "colours"
  },
  {
    "answer": "crn",
    "clue": "Black (masculine)",
    "difficulty": "easy",
    "category": "colours"
  },
  {
    "answer": "bijel",
    "clue": "White (masculine)",
    "difficulty": "easy",
    "category": "colours"
  },
  {
    "answer": "siv",
    "clue": "Grey (masculine)",
    "difficulty": "easy",
    "category": "colours"
  },
  {
    "answer": "smeđ",
    "clue": "Brown (masculine)",
    "difficulty": "easy",
    "category": "colours"
  },
  {
    "answer": "jedan",
    "clue": "One",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "dva",
    "clue": "Two",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "tri",
    "clue": "Three",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "četiri",
    "clue": "Four",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "pet",
    "clue": "Five",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "šest",
    "clue": "Six",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "sedam",
    "clue": "Seven",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "osam",
    "clue": "Eight",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "devet",
    "clue": "Nine",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "deset",
    "clue": "Ten",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "sto",
    "clue": "One hundred",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "tisuća",
    "clue": "One thousand",
    "difficulty": "easy",
    "category": "numbers"
  },
  {
    "answer": "glava",
    "clue": "Head",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "oko",
    "clue": "Eye",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "uho",
    "clue": "Ear",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "nos",
    "clue": "Nose",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "usta",
    "clue": "Mouth",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "ruka",
    "clue": "Hand / arm",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "noga",
    "clue": "Leg",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "prst",
    "clue": "Finger",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "srce",
    "clue": "Heart",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "kosa",
    "clue": "Hair",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "zub",
    "clue": "Tooth",
    "difficulty": "easy",
    "category": "body"
  },
  {
    "answer": "sunce",
    "clue": "Sun",
    "difficulty": "easy",
    "category": "weather"
  },
  {
    "answer": "kiša",
    "clue": "Rain",
    "difficulty": "easy",
    "category": "weather"
  },
  {
    "answer": "snijeg",
    "clue": "Snow",
    "difficulty": "easy",
    "category": "weather"
  },
  {
    "answer": "vjetar",
    "clue": "Wind",
    "difficulty": "easy",
    "category": "weather"
  },
  {
    "answer": "oblak",
    "clue": "Cloud",
    "difficulty": "easy",
    "category": "weather"
  },
  {
    "answer": "more",
    "clue": "Sea",
    "difficulty": "easy",
    "category": "nature"
  },
  {
    "answer": "rijeka",
    "clue": "River",
    "difficulty": "easy",
    "category": "nature"
  },
  {
    "answer": "jezero",
    "clue": "Lake",
    "difficulty": "easy",
    "category": "nature"
  },
  {
    "answer": "planina",
    "clue": "Mountain",
    "difficulty": "easy",
    "category": "nature"
  },
  {
    "answer": "drvo",
    "clue": "Tree",
    "difficulty": "easy",
    "category": "nature"
  },
  {
    "answer": "cvijet",
    "clue": "Flower",
    "difficulty": "easy",
    "category": "nature"
  },
  {
    "answer": "nebo",
    "clue": "Sky",
    "difficulty": "easy",
    "category": "nature"
  },
  {
    "answer": "grad",
    "clue": "City",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "selo",
    "clue": "Village",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "škola",
    "clue": "School",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "trgovina",
    "clue": "Shop / store",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "bolnica",
    "clue": "Hospital",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "cesta",
    "clue": "Road",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "ulica",
    "clue": "Street",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "park",
    "clue": "Park",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "kolodvor",
    "clue": "Station / terminal",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "plaža",
    "clue": "Beach",
    "difficulty": "easy",
    "category": "places"
  },
  {
    "answer": "auto",
    "clue": "Car",
    "difficulty": "easy",
    "category": "transport"
  },
  {
    "answer": "vlak",
    "clue": "Train",
    "difficulty": "easy",
    "category": "transport"
  },
  {
    "answer": "brod",
    "clue": "Ship / boat",
    "difficulty": "easy",
    "category": "transport"
  },
  {
    "answer": "bicikl",
    "clue": "Bicycle",
    "difficulty": "easy",
    "category": "transport"
  },
  {
    "answer": "autobus",
    "clue": "Bus",
    "difficulty": "easy",
    "category": "transport"
  },
  {
    "answer": "dan",
    "clue": "Day",
    "difficulty": "easy",
    "category": "time"
  },
  {
    "answer": "noć",
    "clue": "Night",
    "difficulty": "easy",
    "category": "time"
  },
  {
    "answer": "jutro",
    "clue": "Morning",
    "difficulty": "easy",
    "category": "time"
  },
  {
    "answer": "večer",
    "clue": "Evening",
    "difficulty": "easy",
    "category": "time"
  },
  {
    "answer": "danas",
    "clue": "Today",
    "difficulty": "easy",
    "category": "time"
  },
  {
    "answer": "sutra",
    "clue": "Tomorrow",
    "difficulty": "easy",
    "category": "time"
  },
  {
    "answer": "jučer",
    "clue": "Yesterday",
    "difficulty": "easy",
    "category": "time"
  },
  {
    "answer": "sat",
    "clue": "Hour / clock",
    "difficulty": "easy",
    "category": "time"
  },
  {
    "answer": "dobar",
    "clue": "Good (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "loš",
    "clue": "Bad (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "velik",
    "clue": "Big (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "mali",
    "clue": "Small / little (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "nov",
    "clue": "New (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "star",
    "clue": "Old (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "topao",
    "clue": "Warm (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "hladan",
    "clue": "Cold (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "brz",
    "clue": "Fast (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "spor",
    "clue": "Slow (masculine)",
    "difficulty": "easy",
    "category": "adjectives"
  },
  {
    "answer": "ići",
    "clue": "To go",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "doći",
    "clue": "To come",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "jesti",
    "clue": "To eat",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "piti",
    "clue": "To drink",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "spavati",
    "clue": "To sleep",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "raditi",
    "clue": "To work / do",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "čitati",
    "clue": "To read",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "pisati",
    "clue": "To write",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "gledati",
    "clue": "To watch / look",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "slušati",
    "clue": "To listen",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "govoriti",
    "clue": "To speak",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "učiti",
    "clue": "To learn / study",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "igrati",
    "clue": "To play",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "kupiti",
    "clue": "To buy",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "voljeti",
    "clue": "To love / like",
    "difficulty": "easy",
    "category": "verbs"
  },
  {
    "answer": "zgrada",
    "clue": "Building",
    "difficulty": "intermediate",
    "category": "places"
  },
  {
    "answer": "susjed",
    "clue": "Neighbour (male)",
    "difficulty": "intermediate",
    "category": "people"
  },
  {
    "answer": "susjeda",
    "clue": "Neighbour (female)",
    "difficulty": "intermediate",
    "category": "people"
  },
  {
    "answer": "dvorište",
    "clue": "Yard / courtyard",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "kuhinja",
    "clue": "Kitchen",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "kupaonica",
    "clue": "Bathroom",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "hodnik",
    "clue": "Hallway",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "strop",
    "clue": "Ceiling",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "stepenice",
    "clue": "Stairs",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "hladnjak",
    "clue": "Refrigerator",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "pećnica",
    "clue": "Oven",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "perilica",
    "clue": "Washing machine",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "ručnik",
    "clue": "Towel",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "jastuk",
    "clue": "Pillow",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "pokrivač",
    "clue": "Blanket / bed covering",
    "difficulty": "intermediate",
    "category": "home"
  },
  {
    "answer": "roditelj",
    "clue": "Parent",
    "difficulty": "intermediate",
    "category": "family"
  },
  {
    "answer": "rođak",
    "clue": "Male relative / cousin",
    "difficulty": "intermediate",
    "category": "family"
  },
  {
    "answer": "rođakinja",
    "clue": "Female cousin / relative",
    "difficulty": "intermediate",
    "category": "family"
  },
  {
    "answer": "unuk",
    "clue": "Grandson",
    "difficulty": "intermediate",
    "category": "family"
  },
  {
    "answer": "unuka",
    "clue": "Granddaughter",
    "difficulty": "intermediate",
    "category": "family"
  },
  {
    "answer": "suprug",
    "clue": "Husband (formal)",
    "difficulty": "intermediate",
    "category": "family"
  },
  {
    "answer": "supruga",
    "clue": "Wife (formal)",
    "difficulty": "intermediate",
    "category": "family"
  },
  {
    "answer": "prijatelj",
    "clue": "Male friend",
    "difficulty": "intermediate",
    "category": "people"
  },
  {
    "answer": "prijateljica",
    "clue": "Female friend",
    "difficulty": "intermediate",
    "category": "people"
  },
  {
    "answer": "kolega",
    "clue": "Male colleague",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "kolegica",
    "clue": "Female colleague",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "posao",
    "clue": "Job / work",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "radnik",
    "clue": "Worker",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "tvornica",
    "clue": "Factory",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "skladište",
    "clue": "Warehouse",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "ured",
    "clue": "Office",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "sastanak",
    "clue": "Meeting",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "plaća",
    "clue": "Salary / pay",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "odmor",
    "clue": "Rest / holiday leave",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "smjena",
    "clue": "Work shift",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "alat",
    "clue": "Tool",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "stroj",
    "clue": "Machine",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "paket",
    "clue": "Package",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "narudžba",
    "clue": "Order (purchase)",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "račun",
    "clue": "Bill / account",
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "answer": "putovanje",
    "clue": "Journey / travel",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "putovati",
    "clue": "To travel",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "prtljaga",
    "clue": "Luggage",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "kovčeg",
    "clue": "Suitcase",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "putovnica",
    "clue": "Passport",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "avion",
    "clue": "Airplane",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "tramvaj",
    "clue": "Tram",
    "difficulty": "intermediate",
    "category": "transport"
  },
  {
    "answer": "trajekt",
    "clue": "Ferry",
    "difficulty": "intermediate",
    "category": "transport"
  },
  {
    "answer": "vozač",
    "clue": "Driver",
    "difficulty": "intermediate",
    "category": "transport"
  },
  {
    "answer": "karta",
    "clue": "Travel ticket",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "smjer",
    "clue": "Direction",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "raskrižje",
    "clue": "Intersection / crossroads",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "semafor",
    "clue": "Traffic light",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "most",
    "clue": "Bridge",
    "difficulty": "intermediate",
    "category": "travel"
  },
  {
    "answer": "doručak",
    "clue": "Breakfast",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "ručak",
    "clue": "Lunch",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "večera",
    "clue": "Dinner",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "povrće",
    "clue": "Vegetables",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "voće",
    "clue": "Fruit",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "piletina",
    "clue": "Chicken meat",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "govedina",
    "clue": "Beef",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "svinjetina",
    "clue": "Pork",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "tjestenina",
    "clue": "Pasta",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "brašno",
    "clue": "Flour",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "ulje",
    "clue": "Oil",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "ocat",
    "clue": "Vinegar",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "papar",
    "clue": "Pepper (spice)",
    "difficulty": "intermediate",
    "category": "food"
  },
  {
    "answer": "gladan",
    "clue": "Hungry (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "žedan",
    "clue": "Thirsty (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "sretan",
    "clue": "Happy (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "tužan",
    "clue": "Sad (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "ljut",
    "clue": "Angry (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "umoran",
    "clue": "Tired (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "zabrinut",
    "clue": "Worried (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "uzbuđen",
    "clue": "Excited (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "miran",
    "clue": "Calm / peaceful (masculine)",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "strah",
    "clue": "Fear",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "radost",
    "clue": "Joy",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "tuga",
    "clue": "Sadness",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "ljubav",
    "clue": "Love",
    "difficulty": "intermediate",
    "category": "feelings"
  },
  {
    "answer": "pitanje",
    "clue": "Question",
    "difficulty": "intermediate",
    "category": "language"
  },
  {
    "answer": "odgovor",
    "clue": "Answer",
    "difficulty": "intermediate",
    "category": "language"
  },
  {
    "answer": "riječ",
    "clue": "Word",
    "difficulty": "intermediate",
    "category": "language"
  },
  {
    "answer": "rečenica",
    "clue": "Sentence",
    "difficulty": "intermediate",
    "category": "language"
  },
  {
    "answer": "značenje",
    "clue": "Meaning",
    "difficulty": "intermediate",
    "category": "language"
  },
  {
    "answer": "primjer",
    "clue": "Example",
    "difficulty": "intermediate",
    "category": "language"
  },
  {
    "answer": "razgovor",
    "clue": "Conversation",
    "difficulty": "intermediate",
    "category": "language"
  },
  {
    "answer": "poruka",
    "clue": "Message",
    "difficulty": "intermediate",
    "category": "communication"
  },
  {
    "answer": "poziv",
    "clue": "Call / invitation",
    "difficulty": "intermediate",
    "category": "communication"
  },
  {
    "answer": "vijest",
    "clue": "News item",
    "difficulty": "intermediate",
    "category": "communication"
  },
  {
    "answer": "razumjeti",
    "clue": "To understand",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "objasniti",
    "clue": "To explain",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "zapamtiti",
    "clue": "To remember / memorise",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "zaboraviti",
    "clue": "To forget",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "početi",
    "clue": "To begin",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "završiti",
    "clue": "To finish",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "čekati",
    "clue": "To wait",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "tražiti",
    "clue": "To look for / request",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "pronaći",
    "clue": "To find",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "pokušati",
    "clue": "To try / attempt",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "odlučiti",
    "clue": "To decide",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "misliti",
    "clue": "To think",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "znati",
    "clue": "To know",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "moći",
    "clue": "To be able to / can",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "morati",
    "clue": "To have to / must",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "trebati",
    "clue": "To need / should",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "dati",
    "clue": "To give",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "uzeti",
    "clue": "To take",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "nositi",
    "clue": "To carry / wear",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "otvoriti",
    "clue": "To open",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "zatvoriti",
    "clue": "To close",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "vratiti",
    "clue": "To return / give back",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "ostati",
    "clue": "To stay / remain",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "živjeti",
    "clue": "To live",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "voziti",
    "clue": "To drive",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "hodati",
    "clue": "To walk",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "trčati",
    "clue": "To run",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "plivati",
    "clue": "To swim",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "kuhati",
    "clue": "To cook",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "oprati",
    "clue": "To wash",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "čistiti",
    "clue": "To clean",
    "difficulty": "intermediate",
    "category": "verbs"
  },
  {
    "answer": "važan",
    "clue": "Important (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "potreban",
    "clue": "Necessary / needed (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "moguć",
    "clue": "Possible (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "spreman",
    "clue": "Ready (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "siguran",
    "clue": "Safe / certain (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "opasan",
    "clue": "Dangerous (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "jednostavan",
    "clue": "Simple (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "težak",
    "clue": "Difficult / heavy (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "lagan",
    "clue": "Light / easy (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "zanimljiv",
    "clue": "Interesting (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "dosadan",
    "clue": "Boring (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "ljubazan",
    "clue": "Kind / polite (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "slobodan",
    "clue": "Free / available (masculine)",
    "difficulty": "intermediate",
    "category": "adjectives"
  },
  {
    "answer": "vrijeme",
    "clue": "Time / weather",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "mjesto",
    "clue": "Place",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "razlog",
    "clue": "Reason",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "problem",
    "clue": "Problem",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "rješenje",
    "clue": "Solution",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "promjena",
    "clue": "Change",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "pomoć",
    "clue": "Help",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "novac",
    "clue": "Money",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "cijena",
    "clue": "Price",
    "difficulty": "intermediate",
    "category": "general"
  },
  {
    "answer": "računalo",
    "clue": "Computer",
    "difficulty": "intermediate",
    "category": "technology"
  },
  {
    "answer": "mobitel",
    "clue": "Mobile phone",
    "difficulty": "intermediate",
    "category": "technology"
  },
  {
    "answer": "zaslon",
    "clue": "Screen / display",
    "difficulty": "intermediate",
    "category": "technology"
  },
  {
    "answer": "tipkovnica",
    "clue": "Keyboard",
    "difficulty": "intermediate",
    "category": "technology"
  },
  {
    "answer": "mreža",
    "clue": "Network",
    "difficulty": "intermediate",
    "category": "technology"
  },
  {
    "answer": "odgovornost",
    "clue": "Responsibility",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "mogućnost",
    "clue": "Possibility / opportunity",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "sposobnost",
    "clue": "Ability / capability",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "iskustvo",
    "clue": "Experience",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "ponašanje",
    "clue": "Behaviour",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "odluka",
    "clue": "Decision",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "posljedica",
    "clue": "Consequence",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "prednost",
    "clue": "Advantage",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "nedostatak",
    "clue": "Disadvantage / shortcoming",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "okolnost",
    "clue": "Circumstance",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "namjera",
    "clue": "Intention",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "svrha",
    "clue": "Purpose",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "vrijednost",
    "clue": "Value",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "povjerenje",
    "clue": "Trust",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "strpljenje",
    "clue": "Patience",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "poštovanje",
    "clue": "Respect",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "samopouzdanje",
    "clue": "Self-confidence",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "neovisnost",
    "clue": "Independence",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "suradnja",
    "clue": "Cooperation",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "zajednica",
    "clue": "Community",
    "difficulty": "hard",
    "category": "abstract"
  },
  {
    "answer": "gospodarstvo",
    "clue": "Economy",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "poduzeće",
    "clue": "Company / enterprise",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "zaposlenik",
    "clue": "Employee",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "poslodavac",
    "clue": "Employer",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "zaposlenje",
    "clue": "Employment",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "proizvodnja",
    "clue": "Production / manufacturing",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "održavanje",
    "clue": "Maintenance",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "upravljanje",
    "clue": "Management / operation",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "sigurnost",
    "clue": "Safety / security",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "učinkovitost",
    "clue": "Efficiency",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "kvaliteta",
    "clue": "Quality",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "količina",
    "clue": "Quantity",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "isporuka",
    "clue": "Delivery / shipment",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "dobavljač",
    "clue": "Supplier",
    "difficulty": "hard",
    "category": "work"
  },
  {
    "answer": "potrošač",
    "clue": "Consumer",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "obrazovanje",
    "clue": "Education",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "zdravstvo",
    "clue": "Healthcare system",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "stanovništvo",
    "clue": "Population",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "okoliš",
    "clue": "Environment",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "promet",
    "clue": "Traffic / transport",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "zakon",
    "clue": "Law",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "propisi",
    "clue": "Regulations",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "dozvola",
    "clue": "Permit / licence",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "zahtjev",
    "clue": "Request / requirement",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "prijava",
    "clue": "Application / registration",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "natječaj",
    "clue": "Competition / public job posting",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "ugovor",
    "clue": "Contract",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "obveza",
    "clue": "Obligation",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "pravo",
    "clue": "Right or entitlement",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "vlasništvo",
    "clue": "Ownership / property",
    "difficulty": "hard",
    "category": "society"
  },
  {
    "answer": "zaključiti",
    "clue": "To conclude / infer",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "pretpostaviti",
    "clue": "To assume",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "procijeniti",
    "clue": "To assess / estimate",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "usporediti",
    "clue": "To compare",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "razlikovati",
    "clue": "To distinguish",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "primijetiti",
    "clue": "To notice",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "dokazati",
    "clue": "To prove",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "utvrditi",
    "clue": "To determine / establish",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "predložiti",
    "clue": "To propose / suggest",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "prihvatiti",
    "clue": "To accept",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "odbiti",
    "clue": "To refuse / reject",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "izbjegavati",
    "clue": "To avoid",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "spriječiti",
    "clue": "To prevent",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "omogućiti",
    "clue": "To enable / make possible",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "poboljšati",
    "clue": "To improve",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "smanjiti",
    "clue": "To reduce",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "povećati",
    "clue": "To increase",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "razvijati",
    "clue": "To develop",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "ostvariti",
    "clue": "To achieve / realise",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "podržati",
    "clue": "To support",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "sudjelovati",
    "clue": "To participate",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "utjecati",
    "clue": "To influence / affect",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "ovisiti",
    "clue": "To depend",
    "difficulty": "hard",
    "category": "verbs"
  },
  {
    "answer": "uvjerljiv",
    "clue": "Convincing (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "pouzdan",
    "clue": "Reliable (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "nužan",
    "clue": "Necessary / essential (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "složen",
    "clue": "Complex (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "značajan",
    "clue": "Significant (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "prikladan",
    "clue": "Suitable (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "dostupan",
    "clue": "Available / accessible (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "održiv",
    "clue": "Sustainable (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "učinkovit",
    "clue": "Efficient / effective (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "precizan",
    "clue": "Precise (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "temeljit",
    "clue": "Thorough (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "privremen",
    "clue": "Temporary (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "trajan",
    "clue": "Permanent / lasting (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "neizvjestan",
    "clue": "Uncertain (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "svjestan",
    "clue": "Aware (masculine)",
    "difficulty": "hard",
    "category": "adjectives"
  },
  {
    "answer": "istraživanje",
    "clue": "Research",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "podatak",
    "clue": "Piece of data / information",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "izvor",
    "clue": "Source",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "dokaz",
    "clue": "Evidence / proof",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "činjenica",
    "clue": "Fact",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "tvrdnja",
    "clue": "Claim / assertion",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "mišljenje",
    "clue": "Opinion",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "stajalište",
    "clue": "Viewpoint / position",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "rasprava",
    "clue": "Discussion / debate",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "objašnjenje",
    "clue": "Explanation",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "zaključak",
    "clue": "Conclusion",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "pretpostavka",
    "clue": "Assumption",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "vjerojatnost",
    "clue": "Probability",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "uzrok",
    "clue": "Cause",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "učinak",
    "clue": "Effect / impact",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "odnos",
    "clue": "Relationship / relation",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "razlika",
    "clue": "Difference",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "sličnost",
    "clue": "Similarity",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "razvoj",
    "clue": "Development",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "napredak",
    "clue": "Progress",
    "difficulty": "hard",
    "category": "academic"
  },
  {
    "answer": "svakodnevica",
    "clue": "Everyday life",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "događaj",
    "clue": "Event",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "sadržaj",
    "clue": "Content",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "područje",
    "clue": "Area / field",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "razina",
    "clue": "Level",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "način",
    "clue": "Manner / way",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "uvjet",
    "clue": "Condition / requirement",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "postupak",
    "clue": "Procedure / process",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "pristup",
    "clue": "Approach / access",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "izazov",
    "clue": "Challenge",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "prilika",
    "clue": "Opportunity",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "prepreka",
    "clue": "Obstacle",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "očekivanje",
    "clue": "Expectation",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "postignuće",
    "clue": "Achievement",
    "difficulty": "hard",
    "category": "general"
  },
  {
    "answer": "budućnost",
    "clue": "Future",
    "difficulty": "hard",
    "category": "general"
  }
];
