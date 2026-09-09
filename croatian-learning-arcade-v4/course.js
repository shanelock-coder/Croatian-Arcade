'use strict';

(function () {
  const chunks = [
    {
      id: 'unit1',
      order: 1,
      title: 'Meet the Words',
      subtitle: 'Nominative basics',
      caseName: 'Nominative',
      level: 'A1',
      description: 'Learn the base dictionary form of common Croatian nouns before changing their endings.',
      rule: 'The nominative is the basic form you normally learn first. It is commonly used for the subject of a sentence and for naming what something is.',
      tips: [
        'Learn each noun together with its meaning and gender.',
        'At this stage, focus on recognising the base form rather than memorising a case table.',
        'These same nouns will return in later units with changed endings.'
      ],
      examples: [
        ['Ovo je kuća.', 'This is a house.'],
        ['Pas je ovdje.', 'The dog is here.'],
        ['Žena radi.', 'The woman is working.'],
        ['Grad je velik.', 'The city is big.']
      ],
      morph: [
        { base: 'kuća', prompt: 'This is a house: Ovo je ___.', answer: 'kuća', options: ['kuća', 'kuću', 'kući'], note: 'The noun is being named, so the base nominative form is used.' },
        { base: 'pas', prompt: 'The dog is here: ___ je ovdje.', answer: 'pas', options: ['pas', 'psa', 'psom'], note: 'The dog is the subject, so nominative pas is used.' },
        { base: 'žena', prompt: 'The woman is working: ___ radi.', answer: 'žena', options: ['žena', 'ženu', 'ženi'], note: 'The woman is the subject, so the base form žena is used.' },
        { base: 'grad', prompt: 'The city is big: ___ je velik.', answer: 'grad', options: ['grad', 'gradu', 'gradom'], note: 'Grad is the subject of the sentence.' },
        { base: 'knjiga', prompt: 'The book is new: ___ je nova.', answer: 'knjiga', options: ['knjiga', 'knjigu', 'knjizi'], note: 'Knjiga is the subject, so nominative is used.' },
        { base: 'more', prompt: 'The sea is calm: ___ je mirno.', answer: 'more', options: ['more', 'moru', 'morem'], note: 'More is the subject and stays in the nominative.' }
      ],
      runner: [
        { prompt: 'Choose the base form for “house”.', answer: 'kuća', options: ['kuća', 'kuću', 'kući'], note: 'Kuća is the nominative dictionary form.' },
        { prompt: 'Choose the base form for “woman”.', answer: 'žena', options: ['ženu', 'žena', 'ženom'], note: 'Žena is the nominative form.' },
        { prompt: 'Choose the base form for “book”.', answer: 'knjiga', options: ['knjizi', 'knjiga', 'knjigu'], note: 'Knjiga is the nominative form.' },
        { prompt: 'Choose the base form for “city”.', answer: 'grad', options: ['gradu', 'grad', 'gradom'], note: 'Grad is the dictionary form.' },
        { prompt: 'Choose the base form for “dog”.', answer: 'pas', options: ['psa', 'pas', 'psom'], note: 'Pas is the nominative form.' }
      ],
      sentences: [
        { english: 'This is a house.', answer: ['Ovo', 'je', 'kuća'], distractors: ['kuću'] },
        { english: 'The dog is here.', answer: ['Pas', 'je', 'ovdje'], distractors: ['Psa'] },
        { english: 'The woman is working.', answer: ['Žena', 'radi'], distractors: ['Ženu'] },
        { english: 'The city is big.', answer: ['Grad', 'je', 'velik'], distractors: ['Gradu'] },
        { english: 'The book is new.', answer: ['Knjiga', 'je', 'nova'], distractors: ['Knjigu'] }
      ],
      crossword: [
        ['kuća', 'House'], ['pas', 'Dog'], ['žena', 'Woman'], ['grad', 'City'], ['knjiga', 'Book'], ['more', 'Sea'],
        ['voda', 'Water'], ['kruh', 'Bread'], ['sunce', 'Sun'], ['majka', 'Mother'], ['otac', 'Father'], ['mačka', 'Cat'],
        ['škola', 'School'], ['soba', 'Room'], ['ruka', 'Hand / arm'], ['auto', 'Car'], ['vlak', 'Train'], ['jabuka', 'Apple']
      ]
    },
    {
      id: 'unit2',
      order: 2,
      title: 'See It, Want It, Do It',
      subtitle: 'Accusative objects',
      caseName: 'Accusative',
      level: 'A1–A2',
      description: 'Use the accusative for many direct objects: the person or thing directly affected by the verb.',
      rule: 'A common beginner pattern: feminine nouns ending in -a usually change -a → -u. Masculine animate nouns often change, while many masculine inanimate and neuter nouns keep the nominative-looking form.',
      tips: [
        'kuća → kuću, žena → ženu, knjiga → knjigu, jabuka → jabuku.',
        'pas → psa and prijatelj → prijatelja because they are masculine animate.',
        'grad and kruh often look unchanged in the accusative singular because they are masculine inanimate.'
      ],
      examples: [
        ['Vidim kuću.', 'I see the house.'],
        ['Vidim psa.', 'I see the dog.'],
        ['Čitam knjigu.', 'I am reading a book.'],
        ['Jedem kruh.', 'I am eating bread.']
      ],
      morph: [
        { base: 'kuća', prompt: 'I see the house: Vidim ___.', answer: 'kuću', options: ['kuća', 'kuću', 'kući'], note: 'Direct object: feminine -a changes to -u.' },
        { base: 'žena', prompt: 'I see the woman: Vidim ___.', answer: 'ženu', options: ['žena', 'ženi', 'ženu'], note: 'Direct object: žena → ženu.' },
        { base: 'knjiga', prompt: 'I am reading a book: Čitam ___.', answer: 'knjigu', options: ['knjiga', 'knjigu', 'knjizi'], note: 'Direct object: knjiga → knjigu.' },
        { base: 'jabuka', prompt: 'I am eating an apple: Jedem ___.', answer: 'jabuku', options: ['jabuku', 'jabuka', 'jabuci'], note: 'Direct object: jabuka → jabuku.' },
        { base: 'pas', prompt: 'I see the dog: Vidim ___.', answer: 'psa', options: ['pas', 'psa', 'psom'], note: 'Masculine animate direct object: pas → psa.' },
        { base: 'prijatelj', prompt: 'I am calling my friend: Zovem ___.', answer: 'prijatelja', options: ['prijatelj', 'prijatelju', 'prijatelja'], note: 'Masculine animate accusative: prijatelj → prijatelja.' },
        { base: 'grad', prompt: 'I see the city: Vidim ___.', answer: 'grad', options: ['grad', 'gradu', 'gradom'], note: 'Masculine inanimate accusative singular often matches nominative.' },
        { base: 'kruh', prompt: 'I am eating bread: Jedem ___.', answer: 'kruh', options: ['kruh', 'kruha', 'kruhom'], note: 'Kruh is masculine inanimate, so the accusative singular matches nominative.' }
      ],
      runner: [
        { prompt: 'Vidim ___  •  “I see the house.”', answer: 'kuću', options: ['kuća', 'kuću', 'kući'], note: 'Kuća → kuću in the accusative.' },
        { prompt: 'Čitam ___  •  “I read the book.”', answer: 'knjigu', options: ['knjizi', 'knjigu', 'knjiga'], note: 'Knjiga → knjigu as a direct object.' },
        { prompt: 'Vidim ___  •  “I see the dog.”', answer: 'psa', options: ['pas', 'psa', 'psom'], note: 'Animate masculine pas changes to psa.' },
        { prompt: 'Jedem ___  •  “I eat an apple.”', answer: 'jabuku', options: ['jabuka', 'jabuci', 'jabuku'], note: 'Jabuka → jabuku.' },
        { prompt: 'Vidim ___  •  “I see the city.”', answer: 'grad', options: ['gradu', 'grad', 'gradom'], note: 'Inanimate masculine grad stays grad here.' }
      ],
      sentences: [
        { english: 'I see the house.', answer: ['Vidim', 'kuću'], distractors: ['kuća', 'kući'] },
        { english: 'I am reading a book.', answer: ['Čitam', 'knjigu'], distractors: ['knjiga'] },
        { english: 'I see the dog.', answer: ['Vidim', 'psa'], distractors: ['pas'] },
        { english: 'I am eating an apple.', answer: ['Jedem', 'jabuku'], distractors: ['jabuka'] },
        { english: 'I am calling my friend.', answer: ['Zovem', 'prijatelja'], distractors: ['prijatelj', 'prijatelju'] }
      ],
      crossword: [
        ['kuću', 'House — as a direct object'], ['ženu', 'Woman — as a direct object'], ['knjigu', 'Book — as a direct object'],
        ['jabuku', 'Apple — as a direct object'], ['psa', 'Dog — as a direct object'], ['prijatelja', 'Friend — masculine animate direct object'],
        ['grad', 'City — masculine inanimate direct object'], ['kruh', 'Bread — direct object'], ['vodu', 'Water — as a direct object'],
        ['majku', 'Mother — as a direct object'], ['mačku', 'Cat — as a direct object'], ['školu', 'School — as a direct object / destination']
      ]
    },
    {
      id: 'unit3',
      order: 3,
      title: 'Where Are You?',
      subtitle: 'Locative places',
      caseName: 'Locative',
      level: 'A2',
      description: 'Talk about being in or at a place using common locative forms after prepositions such as u and na.',
      rule: 'For location, Croatian commonly uses u/na + locative. The ending depends on the noun, so this unit teaches useful forms as chunks instead of guessing from one universal rule.',
      tips: [
        'u gradu = in the city; u kući = in the house; u školi = at/in school.',
        'na poslu = at work; na moru = at the seaside/on the sea.',
        'Notice that some forms look identical to dative. Context and prepositions tell you what is happening.'
      ],
      examples: [
        ['Ja sam u gradu.', 'I am in the city.'],
        ['Ona je u kući.', 'She is in the house.'],
        ['Dijete je u školi.', 'The child is at school.'],
        ['On je na poslu.', 'He is at work.']
      ],
      morph: [
        { base: 'grad', prompt: 'I am in the city: Ja sam u ___.', answer: 'gradu', options: ['grad', 'gradu', 'gradom'], note: 'Location with u: u gradu.' },
        { base: 'kuća', prompt: 'She is in the house: Ona je u ___.', answer: 'kući', options: ['kuću', 'kući', 'kuće'], note: 'Location with u: u kući.' },
        { base: 'škola', prompt: 'The child is at school: Dijete je u ___.', answer: 'školi', options: ['školu', 'školi', 'škola'], note: 'Location with u: u školi.' },
        { base: 'trgovina', prompt: 'I am in the shop: Ja sam u ___.', answer: 'trgovini', options: ['trgovinu', 'trgovini', 'trgovina'], note: 'Location with u: u trgovini.' },
        { base: 'posao', prompt: 'He is at work: On je na ___.', answer: 'poslu', options: ['posao', 'poslu', 'poslom'], note: 'The common phrase is na poslu.' },
        { base: 'more', prompt: 'We are at the seaside: Mi smo na ___.', answer: 'moru', options: ['more', 'moru', 'morem'], note: 'A common Croatian phrase is na moru.' },
        { base: 'soba', prompt: 'I am in the room: Ja sam u ___.', answer: 'sobi', options: ['sobu', 'sobi', 'soba'], note: 'Location with u: u sobi.' }
      ],
      runner: [
        { prompt: 'Ja sam u ___  •  “I am in the city.”', answer: 'gradu', options: ['grad', 'gradu', 'gradom'], note: 'Location: u gradu.' },
        { prompt: 'Ona je u ___  •  “She is in the house.”', answer: 'kući', options: ['kuću', 'kući', 'kuća'], note: 'Location: u kući.' },
        { prompt: 'Dijete je u ___  •  “The child is at school.”', answer: 'školi', options: ['škola', 'školu', 'školi'], note: 'Location: u školi.' },
        { prompt: 'On je na ___  •  “He is at work.”', answer: 'poslu', options: ['posao', 'poslu', 'poslom'], note: 'The phrase is na poslu.' },
        { prompt: 'Mi smo na ___  •  “We are at the seaside.”', answer: 'moru', options: ['moru', 'more', 'morem'], note: 'The phrase is na moru.' }
      ],
      sentences: [
        { english: 'I am in the city.', answer: ['Ja', 'sam', 'u', 'gradu'], distractors: ['grad'] },
        { english: 'She is in the house.', answer: ['Ona', 'je', 'u', 'kući'], distractors: ['kuću'] },
        { english: 'The child is at school.', answer: ['Dijete', 'je', 'u', 'školi'], distractors: ['školu'] },
        { english: 'He is at work.', answer: ['On', 'je', 'na', 'poslu'], distractors: ['posao'] },
        { english: 'We are at the seaside.', answer: ['Mi', 'smo', 'na', 'moru'], distractors: ['more'] }
      ],
      crossword: [
        ['gradu', 'In the city — form after “u” for location'], ['kući', 'In the house — form after “u” for location'],
        ['školi', 'At school — form after “u” for location'], ['trgovini', 'In the shop — form after “u” for location'],
        ['poslu', 'At work — form after “na”'], ['moru', 'At the seaside — form after “na”'], ['sobi', 'In the room — form after “u”'],
        ['Hrvatskoj', 'In Croatia — form in “u Hrvatskoj”'], ['parku', 'In the park — form in “u parku”'], ['stanu', 'In the apartment — form in “u stanu”']
      ]
    },
    {
      id: 'unit4',
      order: 4,
      title: 'Going vs Being',
      subtitle: 'Accusative or locative?',
      caseName: 'Movement vs location',
      level: 'A2',
      description: 'Learn one of the most useful contrasts: movement toward a destination versus already being there.',
      rule: 'With many place expressions, movement toward a destination uses accusative, while static location uses locative: Idem u grad. / Ja sam u gradu.',
      tips: [
        'Ask “Where to?” for movement and “Where?” for location.',
        'Idem u kuću. = I am going into the house. / Ja sam u kući. = I am in the house.',
        'Idem na posao. = I am going to work. / Ja sam na poslu. = I am at work.'
      ],
      examples: [
        ['Idem u grad.', 'I am going to the city.'],
        ['Ja sam u gradu.', 'I am in the city.'],
        ['Idem u školu.', 'I am going to school.'],
        ['Ja sam u školi.', 'I am at school.']
      ],
      morph: [
        { base: 'grad', prompt: 'I am going to the city: Idem u ___.', answer: 'grad', options: ['grad', 'gradu', 'gradom'], note: 'Movement toward the destination: accusative u grad.' },
        { base: 'grad', prompt: 'I am in the city: Ja sam u ___.', answer: 'gradu', options: ['grad', 'gradu', 'grada'], note: 'Static location: locative u gradu.' },
        { base: 'kuća', prompt: 'I am going into the house: Idem u ___.', answer: 'kuću', options: ['kuća', 'kuću', 'kući'], note: 'Movement: accusative u kuću.' },
        { base: 'kuća', prompt: 'I am in the house: Ja sam u ___.', answer: 'kući', options: ['kuću', 'kući', 'kuće'], note: 'Location: locative u kući.' },
        { base: 'škola', prompt: 'I am going to school: Idem u ___.', answer: 'školu', options: ['škola', 'školu', 'školi'], note: 'Movement: accusative u školu.' },
        { base: 'škola', prompt: 'I am at school: Ja sam u ___.', answer: 'školi', options: ['školu', 'školi', 'škole'], note: 'Location: locative u školi.' },
        { base: 'posao', prompt: 'I am going to work: Idem na ___.', answer: 'posao', options: ['posao', 'poslu', 'poslom'], note: 'Movement: na posao.' },
        { base: 'posao', prompt: 'I am at work: Ja sam na ___.', answer: 'poslu', options: ['posao', 'poslu', 'posla'], note: 'Location: na poslu.' }
      ],
      runner: [
        { prompt: 'Idem u ___  •  “I am going to the city.”', answer: 'grad', options: ['grad', 'gradu', 'gradom'], note: 'Movement → accusative: u grad.' },
        { prompt: 'Ja sam u ___  •  “I am in the city.”', answer: 'gradu', options: ['grada', 'gradu', 'grad'], note: 'Location → locative: u gradu.' },
        { prompt: 'Idem u ___  •  “I am going into the house.”', answer: 'kuću', options: ['kući', 'kuća', 'kuću'], note: 'Movement → u kuću.' },
        { prompt: 'Ja sam u ___  •  “I am in the house.”', answer: 'kući', options: ['kuću', 'kući', 'kuća'], note: 'Location → u kući.' },
        { prompt: 'Idem na ___  •  “I am going to work.”', answer: 'posao', options: ['posao', 'poslu', 'poslom'], note: 'Movement → na posao.' }
      ],
      sentences: [
        { english: 'I am going to the city.', answer: ['Idem', 'u', 'grad'], distractors: ['gradu'] },
        { english: 'I am in the city.', answer: ['Ja', 'sam', 'u', 'gradu'], distractors: ['grad'] },
        { english: 'I am going into the house.', answer: ['Idem', 'u', 'kuću'], distractors: ['kući'] },
        { english: 'I am in the house.', answer: ['Ja', 'sam', 'u', 'kući'], distractors: ['kuću'] },
        { english: 'I am going to work.', answer: ['Idem', 'na', 'posao'], distractors: ['poslu'] },
        { english: 'I am at work.', answer: ['Ja', 'sam', 'na', 'poslu'], distractors: ['posao'] }
      ],
      crossword: [
        ['grad', 'City — destination in “Idem u ___”'], ['gradu', 'City — location in “Ja sam u ___”'],
        ['kuću', 'House — destination in “Idem u ___”'], ['kući', 'House — location in “Ja sam u ___”'],
        ['školu', 'School — destination in “Idem u ___”'], ['školi', 'School — location in “Ja sam u ___”'],
        ['posao', 'Work — destination in “Idem na ___”'], ['poslu', 'Work — location in “Ja sam na ___”'],
        ['more', 'Seaside — destination in “Idem na ___”'], ['moru', 'Seaside — location in “Ja sam na ___”']
      ]
    },
    {
      id: 'unit5',
      order: 5,
      title: 'With Someone, By Something',
      subtitle: 'Instrumental',
      caseName: 'Instrumental',
      level: 'A2–B1',
      description: 'Use common instrumental forms for accompaniment and means of transport or action.',
      rule: 'The instrumental often appears with s/sa meaning “with”, and can also express means: vlakom = by train, autom = by car.',
      tips: [
        's prijateljem = with a friend; s majkom = with mother.',
        'vlakom = by train; autom = by car; autobusom = by bus.',
        'Learn these high-frequency forms as complete chunks before generalising endings.'
      ],
      examples: [
        ['Idem s prijateljem.', 'I am going with a friend.'],
        ['Razgovaram s majkom.', 'I am talking with my mother.'],
        ['Putujem vlakom.', 'I travel by train.'],
        ['Idem autom.', 'I am going by car.']
      ],
      morph: [
        { base: 'prijatelj', prompt: 'I am going with a friend: Idem s ___.', answer: 'prijateljem', options: ['prijatelja', 'prijateljem', 'prijatelju'], note: 'With someone: s prijateljem.' },
        { base: 'majka', prompt: 'I am talking with my mother: Razgovaram s ___.', answer: 'majkom', options: ['majku', 'majci', 'majkom'], note: 'With someone: s majkom.' },
        { base: 'vlak', prompt: 'I travel by train: Putujem ___.', answer: 'vlakom', options: ['vlak', 'vlaku', 'vlakom'], note: 'Means of transport: vlakom.' },
        { base: 'auto', prompt: 'I am going by car: Idem ___.', answer: 'autom', options: ['auto', 'autom', 'autu'], note: 'Means of transport: autom.' },
        { base: 'autobus', prompt: 'We are going by bus: Idemo ___.', answer: 'autobusom', options: ['autobus', 'autobusu', 'autobusom'], note: 'Means of transport: autobusom.' },
        { base: 'ruka', prompt: 'I write by hand: Pišem ___.', answer: 'rukom', options: ['ruku', 'ruci', 'rukom'], note: 'Means/instrument: rukom.' }
      ],
      runner: [
        { prompt: 'Idem s ___  •  “I am going with a friend.”', answer: 'prijateljem', options: ['prijatelja', 'prijatelju', 'prijateljem'], note: 's + instrumental: s prijateljem.' },
        { prompt: 'Razgovaram s ___  •  “I talk with my mother.”', answer: 'majkom', options: ['majku', 'majkom', 'majci'], note: 's + instrumental: s majkom.' },
        { prompt: 'Putujem ___  •  “I travel by train.”', answer: 'vlakom', options: ['vlak', 'vlaku', 'vlakom'], note: 'Means of transport: vlakom.' },
        { prompt: 'Idem ___  •  “I go by car.”', answer: 'autom', options: ['autom', 'auto', 'autu'], note: 'Means of transport: autom.' },
        { prompt: 'Idemo ___  •  “We go by bus.”', answer: 'autobusom', options: ['autobus', 'autobusu', 'autobusom'], note: 'Means of transport: autobusom.' }
      ],
      sentences: [
        { english: 'I am going with a friend.', answer: ['Idem', 's', 'prijateljem'], distractors: ['prijatelja'] },
        { english: 'I am talking with my mother.', answer: ['Razgovaram', 's', 'majkom'], distractors: ['majku'] },
        { english: 'I travel by train.', answer: ['Putujem', 'vlakom'], distractors: ['vlak'] },
        { english: 'I am going by car.', answer: ['Idem', 'autom'], distractors: ['auto'] },
        { english: 'We are going by bus.', answer: ['Idemo', 'autobusom'], distractors: ['autobus'] }
      ],
      crossword: [
        ['prijateljem', 'With a friend — form after “s”'], ['majkom', 'With mother — form after “s”'], ['vlakom', 'By train'],
        ['autom', 'By car'], ['autobusom', 'By bus'], ['rukom', 'By/with the hand'], ['ženom', 'With a woman'], ['psom', 'With a dog'],
        ['knjigom', 'With/by a book'], ['vodom', 'With/by water']
      ]
    },
    {
      id: 'unit6',
      order: 6,
      title: 'Case Mix',
      subtitle: 'Put the system together',
      caseName: 'Mixed review',
      level: 'B1',
      description: 'Mix nominative, accusative, locative and instrumental forms using the same familiar nouns.',
      rule: 'Identify the job the noun is doing before choosing its form: subject/base form, direct object, destination, static location, or accompaniment/means.',
      tips: [
        'Do not choose an ending just because it “sounds Croatian”; use the sentence meaning.',
        'Movement and location are deliberately contrasted in this unit.',
        'The same base noun may appear in several forms in a single round.'
      ],
      examples: [
        ['Kuća je velika.', 'The house is big.'],
        ['Vidim kuću.', 'I see the house.'],
        ['Ja sam u kući.', 'I am in the house.'],
        ['Idem s majkom.', 'I am going with my mother.']
      ],
      morph: [
        { base: 'kuća', prompt: 'The house is big: ___ je velika.', answer: 'kuća', options: ['kuća', 'kuću', 'kući'], note: 'Subject → nominative.' },
        { base: 'kuća', prompt: 'I see the house: Vidim ___.', answer: 'kuću', options: ['kuća', 'kuću', 'kući'], note: 'Direct object → accusative.' },
        { base: 'kuća', prompt: 'I am in the house: Ja sam u ___.', answer: 'kući', options: ['kuću', 'kući', 'kućom'], note: 'Static location → locative.' },
        { base: 'majka', prompt: 'I am going with my mother: Idem s ___.', answer: 'majkom', options: ['majku', 'majci', 'majkom'], note: 'With someone → instrumental.' },
        { base: 'grad', prompt: 'I am going to the city: Idem u ___.', answer: 'grad', options: ['grad', 'gradu', 'gradom'], note: 'Destination → accusative; inanimate grad keeps the same form.' },
        { base: 'grad', prompt: 'I am in the city: Ja sam u ___.', answer: 'gradu', options: ['grad', 'gradu', 'gradom'], note: 'Static location → locative.' },
        { base: 'vlak', prompt: 'I travel by train: Putujem ___.', answer: 'vlakom', options: ['vlak', 'vlaku', 'vlakom'], note: 'Means → instrumental.' },
        { base: 'pas', prompt: 'I see the dog: Vidim ___.', answer: 'psa', options: ['pas', 'psa', 'psom'], note: 'Animate direct object → accusative psa.' }
      ],
      runner: [
        { prompt: 'Vidim ___  •  dog as direct object', answer: 'psa', options: ['pas', 'psa', 'psom'], note: 'Accusative animate: psa.' },
        { prompt: 'Ja sam u ___  •  in the city', answer: 'gradu', options: ['grad', 'gradu', 'gradom'], note: 'Locative: u gradu.' },
        { prompt: 'Putujem ___  •  by train', answer: 'vlakom', options: ['vlak', 'vlaku', 'vlakom'], note: 'Instrumental: vlakom.' },
        { prompt: '___ je nova  •  the book is new', answer: 'knjiga', options: ['knjiga', 'knjigu', 'knjigom'], note: 'Subject: nominative knjiga.' },
        { prompt: 'Idem u ___  •  into the house', answer: 'kuću', options: ['kuća', 'kući', 'kuću'], note: 'Destination: accusative kuću.' }
      ],
      sentences: [
        { english: 'The house is big.', answer: ['Kuća', 'je', 'velika'], distractors: ['Kuću'] },
        { english: 'I see the house.', answer: ['Vidim', 'kuću'], distractors: ['kući'] },
        { english: 'I am in the house.', answer: ['Ja', 'sam', 'u', 'kući'], distractors: ['kuću'] },
        { english: 'I am going with my mother.', answer: ['Idem', 's', 'majkom'], distractors: ['majku'] },
        { english: 'I travel by train.', answer: ['Putujem', 'vlakom'], distractors: ['vlak'] },
        { english: 'I see the dog.', answer: ['Vidim', 'psa'], distractors: ['pas', 'psom'] }
      ],
      crossword: [
        ['kuća', 'House — nominative'], ['kuću', 'House — accusative'], ['kući', 'House — locative'], ['kućom', 'House — instrumental'],
        ['pas', 'Dog — nominative'], ['psa', 'Dog — accusative'], ['psom', 'Dog — instrumental'], ['grad', 'City — nominative / inanimate accusative'],
        ['gradu', 'City — locative'], ['gradom', 'City — instrumental'], ['knjigu', 'Book — accusative'], ['knjigom', 'Book — instrumental'],
        ['majkom', 'Mother — instrumental'], ['vlakom', 'Train — instrumental']
      ]
    }
  ];

  function crosswordEntries(chunk) {
    return chunk.crossword.map(([answer, clue], index) => ({
      answer,
      clue,
      difficulty: chunk.id,
      category: 'course',
      id: `${chunk.id}-cw-${index}`
    }));
  }

  window.CroatianCourse = {
    chunks,
    crosswordEntries
  };
})();
