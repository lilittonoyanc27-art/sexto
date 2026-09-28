export interface BilingualItem {
  id: string;
  es: string;
  hy: string;
  note?: string;
}

export interface DetailedSection {
  id: string;
  number: string;
  titleEs: string;
  titleHy: string;
  items: Array<{
    type: 'sentence' | 'bullet' | 'stat' | 'examples' | 'subheading';
    es: string;
    hy?: string;
    subitems?: Array<{ es: string; hy: string }>;
  }>;
}

export interface AtmosphereLayer {
  id: string;
  nameEs: string;
  nameHy: string;
  altitude: string;
  descriptionEs: string;
  descriptionHy: string;
  keyFacts: Array<{ es: string; hy: string }>;
  color: string;
  accentColor: string;
  iconType: string;
}

export interface QuestionAnswer {
  id: number;
  questionEs: string;
  questionHy: string;
  answerEs: string;
  answerHy: string;
}

export interface VocabularyWord {
  id: number;
  es: string;
  hy: string;
  category: 'gas' | 'layer' | 'phenomenon' | 'concept';
}

// 1. Full text paragraphs
export const FULL_TEXT_PARAGRAPHS: BilingualItem[] = [
  {
    id: 'ft-1',
    es: 'La atmósfera es la capa de gases que rodea la Tierra.',
    hy: 'Մթնոլորտը գազերի շերտ է, որը շրջապատում է Երկիրը։'
  },
  {
    id: 'ft-2',
    es: 'Está formada principalmente por nitrógeno y oxígeno, aunque también contiene otros gases en cantidades menores, como dióxido de carbono, vapor de agua y argón.',
    hy: 'Այն հիմնականում կազմված է ազոտից և թթվածնից, սակայն պարունակում է նաև ավելի փոքր քանակությամբ այլ գազեր՝ ածխաթթու գազ, ջրային գոլորշի և արգոն։'
  },
  {
    id: 'ft-3',
    es: 'La atmósfera es muy importante para la vida. Nos proporciona el oxígeno que necesitamos para respirar, protege la Tierra de parte de la radiación solar y ayuda a mantener una temperatura adecuada.',
    hy: 'Մթնոլորտը շատ կարևոր է կյանքի համար։ Այն մեզ տալիս է շնչելու համար անհրաժեշտ թթվածինը, պաշտպանում է Երկիրը Արեգակի ճառագայթման մի մասից և օգնում է պահպանել կյանքի համար հարմար ջերմաստիճան։'
  },
  {
    id: 'ft-4',
    es: 'La atmósfera se divide en varias capas: troposfera, estratosfera, mesosfera, termosfera y exosfera.',
    hy: 'Մթնոլորտը բաժանվում է մի քանի շերտերի՝ տրոպոսֆերա, ստրատոսֆերա, մեզոսֆերա, թերմոսֆերա և էկզոսֆերա։'
  },
  {
    id: 'ft-5',
    es: 'La troposfera es la capa más cercana a la superficie terrestre. En ella vivimos y se producen la mayoría de los fenómenos meteorológicos, como la lluvia, las nubes, el viento y la nieve.',
    hy: 'Տրոպոսֆերան Երկրի մակերևույթին ամենամոտ շերտն է։ Մենք ապրում ենք այս շերտում, և այստեղ են տեղի ունենում եղանակային երևույթների մեծ մասը՝ անձրևը, ամպերը, քամին և ձյունը։'
  },
  {
    id: 'ft-6',
    es: 'Por encima de la troposfera se encuentra la estratosfera. En esta capa está la capa de ozono, que ayuda a protegernos de la radiación ultravioleta del Sol.',
    hy: 'Տրոպոսֆերայից վեր գտնվում է ստրատոսֆերան։ Այստեղ է գտնվում օզոնային շերտը, որը մեզ պաշտպանում է Արեգակի ուլտրամանուշակագույն ճառագայթումից։'
  },
  {
    id: 'ft-7',
    es: 'La mesosfera está situada encima de la estratosfera. En ella se desintegran muchos meteoritos cuando entran en la atmósfera.',
    hy: 'Մեզոսֆերան գտնվում է ստրատոսֆերայից վեր։ Այս շերտում շատ երկնաքարեր այրվում և քայքայվում են մթնոլորտ մտնելիս։'
  },
  {
    id: 'ft-8',
    es: 'Después se encuentra la termosfera. Es una capa con temperaturas muy altas y en ella se producen fenómenos como las auroras.',
    hy: 'Հաջորդը թերմոսֆերան է։ Այն ունի շատ բարձր ջերմաստիճաններ, և այստեղ կարող են առաջանալ բևեռափայլեր։'
  },
  {
    id: 'ft-9',
    es: 'La exosfera es la capa más externa de la atmósfera y se encuentra en contacto con el espacio.',
    hy: 'Էկզոսֆերան մթնոլորտի ամենաարտաքին շերտն է և սահմանակից է տիեզերքին։'
  },
  {
    id: 'ft-10',
    es: 'La atmósfera también participa en el tiempo atmosférico y el clima. El tiempo atmosférico describe las condiciones de la atmósfera en un lugar y momento concretos, mientras que el clima describe las condiciones habituales de una zona durante muchos años.',
    hy: 'Մթնոլորտը կապված է նաև եղանակի և կլիմայի հետ։ Եղանակը ցույց է տալիս մթնոլորտի պայմանները որոշակի վայրում և որոշակի պահին, իսկ կլիման ցույց է տալիս տվյալ տարածքի սովորական եղանակային պայմանները երկար տարիների ընթացքում։'
  },
  {
    id: 'ft-11',
    es: 'En resumen, la atmósfera es esencial para la vida porque contiene gases importantes, regula la temperatura y protege la Tierra.',
    hy: 'Ամփոփելով՝ մթնոլորտը շատ կարևոր է կյանքի համար, որովհետև այն պարունակում է կարևոր գազեր, կարգավորում է ջերմաստիճանը և պաշտպանում է Երկիրը։'
  }
];

// 2. Detailed explanation sections
export const DETAILED_SECTIONS: DetailedSection[] = [
  {
    id: 'sec-1',
    number: '1',
    titleEs: '¿Qué es la atmósfera?',
    titleHy: 'Ի՞նչ է մթնոլորտը։',
    items: [
      {
        type: 'sentence',
        es: 'La atmósfera es la capa de gases que rodea nuestro planeta.',
        hy: 'Մթնոլորտը գազերի շերտն է, որը շրջապատում է մեր մոլորակը։'
      }
    ]
  },
  {
    id: 'sec-2',
    number: '2',
    titleEs: 'Composición de la atmósfera',
    titleHy: 'Մթնոլորտի կազմը',
    items: [
      {
        type: 'sentence',
        es: 'La atmósfera está formada por diferentes gases.',
        hy: 'Մթնոլորտը կազմված է տարբեր գազերից։'
      },
      {
        type: 'subheading',
        es: 'Los principales son:'
      },
      {
        type: 'stat',
        es: 'nitrógeno — aproximadamente 78 %',
        hy: 'ազոտ — մոտավորապես 78 %'
      },
      {
        type: 'stat',
        es: 'oxígeno — aproximadamente 21 %',
        hy: 'թթվածին — մոտավորապես 21 %'
      },
      {
        type: 'sentence',
        es: 'Otros gases aparecen en cantidades mucho menores.',
        hy: 'Մյուս գազերը առկա են շատ ավելի փոքր քանակներով։'
      },
      {
        type: 'subheading',
        es: 'Por ejemplo:'
      },
      {
        type: 'bullet',
        es: 'dióxido de carbono',
        hy: 'ածխաթթու գազ'
      },
      {
        type: 'bullet',
        es: 'vapor de agua',
        hy: 'ջրային գոլորշի'
      },
      {
        type: 'bullet',
        es: 'argón',
        hy: 'արգոն'
      },
      {
        type: 'subheading',
        es: 'Para recordar / Հիշելու համար:'
      },
      {
        type: 'stat',
        es: 'Nitrógeno → 78 %',
        hy: 'Ազոտ → 78 %'
      },
      {
        type: 'stat',
        es: 'Oxígeno → 21 %',
        hy: 'Թթվածին → 21 %'
      }
    ]
  },
  {
    id: 'sec-3',
    number: '3',
    titleEs: '¿Por qué es importante la atmósfera?',
    titleHy: 'Ինչո՞ւ է մթնոլորտը կարևոր։',
    items: [
      {
        type: 'bullet',
        es: 'Proporciona oxígeno para respirar.',
        hy: 'Այն ապահովում է շնչելու համար անհրաժեշտ թթվածինը։'
      },
      {
        type: 'bullet',
        es: 'Protege de parte de la radiación solar.',
        hy: 'Այն պաշտպանում է Արեգակի ճառագայթման մի մասից։'
      },
      {
        type: 'bullet',
        es: 'Ayuda a mantener una temperatura adecuada.',
        hy: 'Այն օգնում է պահպանել համապատասխան ջերմաստիճան։'
      },
      {
        type: 'bullet',
        es: 'Permite que exista agua líquida y vida en la Tierra.',
        hy: 'Այն նպաստում է Երկրի վրա հեղուկ ջրի և կյանքի գոյությանը։'
      }
    ]
  },
  {
    id: 'sec-4',
    number: '4',
    titleEs: 'Las capas de la atmósfera',
    titleHy: 'Մթնոլորտի շերտերը',
    items: [
      {
        type: 'subheading',
        es: 'La troposfera / Տրոպոսֆերա'
      },
      {
        type: 'bullet',
        es: 'Es la capa más cercana a la superficie terrestre.',
        hy: 'Դա Երկրի մակերևույթին ամենամոտ շերտն է։'
      },
      {
        type: 'bullet',
        es: 'Aquí vivimos.',
        hy: 'Մենք ապրում ենք այս շերտում։'
      },
      {
        type: 'bullet',
        es: 'Aquí se producen la mayoría de los fenómenos meteorológicos.',
        hy: 'Այստեղ են տեղի ունենում եղանակային երևույթների մեծ մասը։'
      },
      {
        type: 'examples',
        es: 'Ejemplos: lluvia — անձրև | nieve — ձյուն | viento — քամի | nubes — ամպեր',
        subitems: [
          { es: 'lluvia', hy: 'անձրև' },
          { es: 'nieve', hy: 'ձյուն' },
          { es: 'viento', hy: 'քամի' },
          { es: 'nubes', hy: 'ամպեր' }
        ]
      },
      {
        type: 'subheading',
        es: 'La estratosfera / Ստրատոսֆերա'
      },
      {
        type: 'bullet',
        es: 'Está por encima de la troposfera.',
        hy: 'Այն գտնվում է տրոպոսֆերայից վեր։'
      },
      {
        type: 'bullet',
        es: 'Aquí se encuentra la capa de ozono.',
        hy: 'Այստեղ է գտնվում օզոնային շերտը։'
      },
      {
        type: 'bullet',
        es: 'La capa de ozono absorbe gran parte de la radiación ultravioleta.',
        hy: 'Օզոնային շերտը կլանում է ուլտրամանուշակագույն ճառագայթման մեծ մասը։'
      },
      {
        type: 'subheading',
        es: 'La mesosfera / Մեզոսֆերա'
      },
      {
        type: 'bullet',
        es: 'Está por encima de la estratosfera.',
        hy: 'Այն գտնվում է ստրատոսֆերայից վեր։'
      },
      {
        type: 'bullet',
        es: 'Muchos meteoritos se desintegran en esta capa.',
        hy: 'Շատ երկնաքարեր քայքայվում են այս շերտում։'
      },
      {
        type: 'subheading',
        es: 'La termosfera / Թերմոսֆերա'
      },
      {
        type: 'bullet',
        es: 'Se encuentra por encima de la mesosfera.',
        hy: 'Այն գտնվում է մեզոսֆերայից վեր։'
      },
      {
        type: 'bullet',
        es: 'Puede alcanzar temperaturas muy altas.',
        hy: 'Այն կարող է ունենալ շատ բարձր ջերմաստիճաններ։'
      },
      {
        type: 'bullet',
        es: 'En esta zona pueden observarse auroras.',
        hy: 'Այս գոտում կարող են դիտվել բևեռափայլեր։'
      },
      {
        type: 'subheading',
        es: 'La exosfera / Էկզոսֆերա'
      },
      {
        type: 'bullet',
        es: 'Es la capa más externa.',
        hy: 'Դա ամենաարտաքին շերտն է։'
      },
      {
        type: 'bullet',
        es: 'Es la transición entre la atmósfera y el espacio.',
        hy: 'Այն անցումային գոտի է մթնոլորտի և տիեզերքի միջև։'
      }
    ]
  },
  {
    id: 'sec-5',
    number: '5',
    titleEs: 'El tiempo atmosférico',
    titleHy: 'Եղանակը',
    items: [
      {
        type: 'sentence',
        es: 'El tiempo atmosférico es el estado de la atmósfera en un lugar y momento concretos.',
        hy: 'Եղանակը մթնոլորտի վիճակն է որոշակի վայրում և որոշակի պահին։'
      },
      {
        type: 'subheading',
        es: 'Por ejemplo / Օրինակներ:'
      },
      {
        type: 'bullet',
        es: 'Hoy llueve.',
        hy: 'Այսօր անձրև է գալիս։'
      },
      {
        type: 'bullet',
        es: 'Hoy hace viento.',
        hy: 'Այսօր քամի է։'
      },
      {
        type: 'bullet',
        es: 'Hoy hace calor.',
        hy: 'Այսօր շոգ է։'
      }
    ]
  },
  {
    id: 'sec-6',
    number: '6',
    titleEs: 'El clima',
    titleHy: 'Կլիման',
    items: [
      {
        type: 'sentence',
        es: 'El clima es el conjunto de condiciones atmosféricas habituales de una zona durante un periodo largo.',
        hy: 'Կլիման տվյալ տարածքի երկար ժամանակահատվածում դիտվող սովորական մթնոլորտային պայմանների ամբողջությունն է։'
      },
      {
        type: 'subheading',
        es: 'Diferencia importante / Կարևոր տարբերություն:'
      },
      {
        type: 'stat',
        es: 'Tiempo = hoy o ahora.',
        hy: 'Եղանակ = այսօր կամ հիմա։'
      },
      {
        type: 'stat',
        es: 'Clima = muchos años.',
        hy: 'Կլիմա = երկար տարիներ։'
      }
    ]
  }
];

// 3. Vocabulary list (20 items)
export const VOCABULARY_LIST: VocabularyWord[] = [
  { id: 1, es: 'atmósfera', hy: 'մթնոլորտ', category: 'concept' },
  { id: 2, es: 'gas', hy: 'գազ', category: 'gas' },
  { id: 3, es: 'nitrógeno', hy: 'ազոտ', category: 'gas' },
  { id: 4, es: 'oxígeno', hy: 'թթվածին', category: 'gas' },
  { id: 5, es: 'dióxido de carbono', hy: 'ածխաթթու գազ', category: 'gas' },
  { id: 6, es: 'vapor de agua', hy: 'ջրային գոլորշի', category: 'gas' },
  { id: 7, es: 'troposfera', hy: 'տրոպոսֆերա', category: 'layer' },
  { id: 8, es: 'estratosfera', hy: 'ստրատոսֆերա', category: 'layer' },
  { id: 9, es: 'mesosfera', hy: 'մեզոսֆերա', category: 'layer' },
  { id: 10, es: 'termosfera', hy: 'թերմոսֆերա', category: 'layer' },
  { id: 11, es: 'exosfera', hy: 'էկզոսֆերա', category: 'layer' },
  { id: 12, es: 'capa de ozono', hy: 'օզոնային շերտ', category: 'layer' },
  { id: 13, es: 'radiación ultravioleta', hy: 'ուլտրամանուշակագույն ճառագայթում', category: 'concept' },
  { id: 14, es: 'lluvia', hy: 'անձրև', category: 'phenomenon' },
  { id: 15, es: 'nieve', hy: 'ձյուն', category: 'phenomenon' },
  { id: 16, es: 'viento', hy: 'քամի', category: 'phenomenon' },
  { id: 17, es: 'nube', hy: 'ամպ', category: 'phenomenon' },
  { id: 18, es: 'tiempo atmosférico', hy: 'եղանակ', category: 'concept' },
  { id: 19, es: 'clima', hy: 'կլիմա', category: 'concept' },
  { id: 20, es: 'temperatura', hy: 'ջերմաստիճան', category: 'concept' }
];

// 4. Questions & Answers (16 items)
export const QUESTIONS_AND_ANSWERS: QuestionAnswer[] = [
  {
    id: 1,
    questionEs: '¿Qué es la atmósfera?',
    questionHy: 'Ի՞նչ է մթնոլորտը։',
    answerEs: 'Es la capa de gases que rodea la Tierra.',
    answerHy: 'Դա գազերի շերտ է, որը շրջապատում է Երկիրը։'
  },
  {
    id: 2,
    questionEs: '¿Cuál es el gas más abundante de la atmósfera?',
    questionHy: 'Ո՞ր գազն է ամենաշատը մթնոլորտում։',
    answerEs: 'El nitrógeno.',
    answerHy: 'Ազոտը։'
  },
  {
    id: 3,
    questionEs: '¿Qué porcentaje de la atmósfera es nitrógeno?',
    questionHy: 'Մթնոլորտի քանի՞ տոկոսն է ազոտ։',
    answerEs: 'Aproximadamente el 78 %.',
    answerHy: 'Մոտավորապես 78 տոկոսը։'
  },
  {
    id: 4,
    questionEs: '¿Qué porcentaje es oxígeno?',
    questionHy: 'Քանի՞ տոկոս է թթվածինը։',
    answerEs: 'Aproximadamente el 21 %.',
    answerHy: 'Մոտավորապես 21 տոկոսը։'
  },
  {
    id: 5,
    questionEs: '¿Por qué necesitamos oxígeno?',
    questionHy: 'Ինչո՞ւ է մեզ անհրաժեշտ թթվածինը։',
    answerEs: 'Porque lo necesitamos para respirar.',
    answerHy: 'Որովհետև այն մեզ անհրաժեշտ է շնչելու համար։'
  },
  {
    id: 6,
    questionEs: '¿Cuáles son las cinco capas principales de la atmósfera?',
    questionHy: 'Որո՞նք են մթնոլորտի հինգ հիմնական շերտերը։',
    answerEs: 'Troposfera, estratosfera, mesosfera, termosfera y exosfera.',
    answerHy: 'Տրոպոսֆերա, ստրատոսֆերա, մեզոսֆերա, թերմոսֆերա և էկզոսֆերա։'
  },
  {
    id: 7,
    questionEs: '¿En qué capa vivimos?',
    questionHy: 'Ո՞ր շերտում ենք մենք ապրում։',
    answerEs: 'En la troposfera.',
    answerHy: 'Տրոպոսֆերայում։'
  },
  {
    id: 8,
    questionEs: '¿Dónde se producen la mayoría de los fenómenos meteorológicos?',
    questionHy: 'Որտե՞ղ են տեղի ունենում եղանակային երևույթների մեծ մասը։',
    answerEs: 'En la troposfera.',
    answerHy: 'Տրոպոսֆերայում։'
  },
  {
    id: 9,
    questionEs: '¿Dónde está la capa de ozono?',
    questionHy: 'Որտե՞ղ է գտնվում օզոնային շերտը։',
    answerEs: 'En la estratosfera.',
    answerHy: 'Ստրատոսֆերայում։'
  },
  {
    id: 10,
    questionEs: '¿Para qué sirve la capa de ozono?',
    questionHy: 'Ինչի՞ համար է անհրաժեշտ օզոնային շերտը։',
    answerEs: 'Para protegernos de gran parte de la radiación ultravioleta.',
    answerHy: 'Ուլտրամանուշակագույն ճառագայթման մեծ մասից մեզ պաշտպանելու համար։'
  },
  {
    id: 11,
    questionEs: '¿Qué ocurre con muchos meteoritos en la mesosfera?',
    questionHy: 'Ի՞նչ է տեղի ունենում շատ երկնաքարերի հետ մեզոսֆերայում։',
    answerEs: 'Se desintegran.',
    answerHy: 'Նրանք քայքայվում են։'
  },
  {
    id: 12,
    questionEs: '¿En qué capa pueden aparecer auroras?',
    questionHy: 'Ո՞ր շերտում կարող են առաջանալ բևեռափայլեր։',
    answerEs: 'En la termosfera.',
    answerHy: 'Թերմոսֆերայում։'
  },
  {
    id: 13,
    questionEs: '¿Cuál es la capa más externa?',
    questionHy: 'Ո՞րն է ամենաարտաքին շերտը։',
    answerEs: 'La exosfera.',
    answerHy: 'Էկզոսֆերան։'
  },
  {
    id: 14,
    questionEs: '¿Qué es el tiempo atmosférico?',
    questionHy: 'Ի՞նչ է եղանակը։',
    answerEs: 'Es el estado de la atmósfera en un lugar y momento concretos.',
    answerHy: 'Դա մթնոլորտի վիճակն է որոշակի վայրում և պահին։'
  },
  {
    id: 15,
    questionEs: '¿Qué es el clima?',
    questionHy: 'Ի՞նչ է կլիման։',
    answerEs: 'Son las condiciones atmosféricas habituales de una zona durante muchos años.',
    answerHy: 'Դա տվյալ տարածքի սովորական մթնոլորտային պայմաններն են երկար տարիների ընթացքում։'
  },
  {
    id: 16,
    questionEs: '¿Cuál es la diferencia entre tiempo y clima?',
    questionHy: 'Ո՞րն է եղանակի և կլիմայի տարբերությունը։',
    answerEs: 'El tiempo cambia a corto plazo; el clima se estudia durante muchos años.',
    answerHy: 'Եղանակը փոխվում է կարճ ժամանակում, իսկ կլիման ուսումնասիրվում է երկար տարիների ընթացքում։'
  }
];

// 5. Short text paragraphs (Texto corto / Կարճ տեքստ)
export const SHORT_TEXT_PARAGRAPHS: BilingualItem[] = [
  {
    id: 'st-1',
    es: 'La atmósfera es la capa de gases que rodea la Tierra. Está formada principalmente por nitrógeno y oxígeno.',
    hy: 'Մթնոլորտը գազերի շերտ է, որը շրջապատում է Երկիրը։ Այն հիմնականում կազմված է ազոտից և թթվածնից։'
  },
  {
    id: 'st-2',
    es: 'Se divide en cinco capas: troposfera, estratosfera, mesosfera, termosfera y exosfera. Vivimos en la troposfera, donde se producen la mayoría de los fenómenos meteorológicos.',
    hy: 'Այն բաժանվում է հինգ շերտերի՝ տրոպոսֆերա, ստրատոսֆերա, մեզոսֆերա, թերմոսֆերա և էկզոսֆերա։ Մենք ապրում ենք տրոպոսֆերայում, որտեղ տեղի են ունենում եղանակային երևույթների մեծ մասը։'
  },
  {
    id: 'st-3',
    es: 'En la estratosfera está la capa de ozono, que nos protege de la radiación ultravioleta.',
    hy: 'Ստրատոսֆերայում գտնվում է օզոնային շերտը, որը մեզ պաշտպանում է ուլտրամանուշակագույն ճառագայթումից։'
  },
  {
    id: 'st-4',
    es: 'La atmósfera es muy importante porque permite la vida, nos proporciona oxígeno y ayuda a regular la temperatura de la Tierra.',
    hy: 'Մթնոլորտը շատ կարևոր է, որովհետև այն ապահովում է կյանքը, մեզ տալիս է թթվածին և օգնում է կարգավորել Երկրի ջերմաստիճանը։'
  }
];

// Atmosphere layers interactive visual reference
export const ATMOSPHERE_LAYERS: AtmosphereLayer[] = [
  {
    id: 'exosfera',
    nameEs: 'Exosfera',
    nameHy: 'Էկզոսֆերա',
    altitude: '500 – 10,000+ km',
    descriptionEs: 'La exosfera es la capa más externa de la atmósfera y se encuentra en contacto con el espacio. Es la transición entre la atmósfera y el espacio.',
    descriptionHy: 'Էկզոսֆերան մթնոլորտի ամենաարտաքին շերտն է և սահմանակից է տիեզերքին։ Այն անցումային գոտի է մթնոլորտի և տիեզերքի միջև։',
    keyFacts: [
      { es: 'Es la capa más externa.', hy: 'Դա ամենաարտաքին շերտն է։' },
      { es: 'Es la transición entre la atmósfera y el espacio.', hy: 'Այն անցումային գոտի է մթնոլորտի և տիեզերքի միջև։' }
    ],
    color: 'from-indigo-950 to-slate-950',
    accentColor: '#818cf8',
    iconType: 'satellite'
  },
  {
    id: 'termosfera',
    nameEs: 'Termosfera',
    nameHy: 'Թերմոսֆերա',
    altitude: '85 – 500 km',
    descriptionEs: 'Se encuentra por encima de la mesosfera. Puede alcanzar temperaturas muy altas y en ella se producen fenómenos como las auroras.',
    descriptionHy: 'Այն գտնվում է մեզոսֆերայից վեր։ Այն կարող է ունենալ շատ բարձր ջերմաստիճաններ, և այստեղ կարող են առաջանալ բևեռափայլեր։',
    keyFacts: [
      { es: 'Se encuentra por encima de la mesosfera.', hy: 'Այն գտնվում է մեզոսֆերայից վեր։' },
      { es: 'Puede alcanzar temperaturas muy altas.', hy: 'Այն կարող է ունենալ շատ բարձր ջերմաստիճաններ։' },
      { es: 'En esta zona pueden observarse auroras.', hy: 'Այս գոտում կարող են դիտվել բևեռափայլեր։' }
    ],
    color: 'from-violet-900 to-indigo-950',
    accentColor: '#c084fc',
    iconType: 'aurora'
  },
  {
    id: 'mesosfera',
    nameEs: 'Mesosfera',
    nameHy: 'Մեզոսֆերա',
    altitude: '50 – 85 km',
    descriptionEs: 'Está situada encima de la estratosfera. En ella se desintegran muchos meteoritos cuando entran en la atmósfera.',
    descriptionHy: 'Այն գտնվում է ստրատոսֆերայից վեր։ Այս շերտում շատ երկնաքարեր այրվում և քայքայվում են մթնոլորտ մտնելիս։',
    keyFacts: [
      { es: 'Está por encima de la estratosfera.', hy: 'Այն գտնվում է ստրատոսֆերայից վեր։' },
      { es: 'Muchos meteoritos se desintegran en esta capa.', hy: 'Շատ երկնաքարեր քայքայվում են այս շերտում։' }
    ],
    color: 'from-sky-900 to-violet-900',
    accentColor: '#38bdf8',
    iconType: 'meteor'
  },
  {
    id: 'estratosfera',
    nameEs: 'Estratosfera',
    nameHy: 'Ստրատոսֆերա',
    altitude: '12 – 50 km',
    descriptionEs: 'Por encima de la troposfera se encuentra la estratosfera. En esta capa está la capa de ozono, que absorbe gran parte de la radiación ultravioleta del Sol.',
    descriptionHy: 'Տրոպոսֆերայից վեր գտնվում է ստրատոսֆերան։ Այստեղ է գտնվում օզոնային շերտը, որը մեզ պաշտպանում է Արեգակի ուլտրամանուշակագույն ճառագայթումից։',
    keyFacts: [
      { es: 'Está por encima de la troposfera.', hy: 'Այն գտնվում է տրոպոսֆերայից վեր։' },
      { es: 'Aquí se encuentra la capa de ozono.', hy: 'Այստեղ է գտնվում օզոնային շերտը։' },
      { es: 'La capa de ozono absorbe gran parte de la radiación ultravioleta.', hy: 'Օզոնային շերտը կլանում է ուլտրամանուշակագույն ճառագայթման մեծ մասը։' }
    ],
    color: 'from-blue-800 to-sky-900',
    accentColor: '#60a5fa',
    iconType: 'shield'
  },
  {
    id: 'troposfera',
    nameEs: 'Troposfera',
    nameHy: 'Տրոպոսֆերա',
    altitude: '0 – 12 km',
    descriptionEs: 'Es la capa más cercana a la superficie terrestre. En ella vivimos y se producen la mayoría de los fenómenos meteorológicos, como la lluvia, las nubes, el viento y la nieve.',
    descriptionHy: 'Երկրի մակերևույթին ամենամոտ շերտն է։ Մենք ապրում ենք այս շերտում, և այստեղ են տեղի ունենում եղանակային երևույթների մեծ մասը՝ անձրևը, ամպերը, քամին և ձյունը։',
    keyFacts: [
      { es: 'Es la capa más cercana a la superficie terrestre.', hy: 'Դա Երկրի մակերևույթին ամենամոտ շերտն է։' },
      { es: 'Aquí vivimos.', hy: 'Մենք ապրում ենք այս շերտում։' },
      { es: 'Aquí se producen la mayoría de los fenómenos meteorológicos.', hy: 'Այստեղ են տեղի ունենում եղանակային երևույթների մեծ մասը։' },
      { es: 'Ejemplos: lluvia (անձրև), nieve (ձյուն), viento (քամի), nubes (ամպեր)', hy: 'Օրինակներ՝ անձրև, ձյուն, քամի, ամպեր' }
    ],
    color: 'from-cyan-700 to-blue-800',
    accentColor: '#22d3ee',
    iconType: 'cloud'
  }
];
