import React, { useState, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  BookOpen,
  Layers,
  HelpCircle,
  FileText,
  Search,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  RotateCw,
  GraduationCap,
  CloudRain,
  Shield,
  Flame,
  Radio,
  ExternalLink,
  Languages
} from 'lucide-react';
import {
  FULL_TEXT_PARAGRAPHS,
  DETAILED_SECTIONS,
  VOCABULARY_LIST,
  QUESTIONS_AND_ANSWERS,
  SHORT_TEXT_PARAGRAPHS,
  ATMOSPHERE_LAYERS,
  AtmosphereLayer,
  VocabularyWord
} from './atmosphereData';
import { speakSpanish, stopSpeaking } from './audio';

type ActiveTab = 'reader' | 'detailed' | 'layers' | 'vocabulary' | 'qa' | 'short' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('reader');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [showAllArmenian, setShowAllArmenian] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Layers visualizer state
  const [selectedLayerId, setSelectedLayerId] = useState<string>('troposfera');

  // Flashcards state
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);
  const [vocabViewMode, setVocabViewMode] = useState<'table' | 'flashcards'>('table');
  const [vocabCategory, setVocabCategory] = useState<string>('all');

  // Self-test mode for QA
  const [qaHideAnswers, setQaHideAnswers] = useState<boolean>(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  // Quiz state
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Toggle single item translation
  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isRevealed = (id: string) => {
    return showAllArmenian || !!revealedIds[id];
  };

  const handleSpeak = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(id);
    speakSpanish(text, () => {
      setSpeakingId(null);
    });
  };

  const handleCopy = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Filtered vocabulary
  const filteredVocabulary = useMemo(() => {
    return VOCABULARY_LIST.filter(item => {
      const matchesCategory = vocabCategory === 'all' || item.category === vocabCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [vocabCategory, searchQuery]);

  // Quiz questions derived from Q&A
  const quizQuestions = useMemo(() => {
    return [
      {
        question: '¿Qué es la atmósfera? / Ի՞նչ է մթնոլորտը։',
        options: [
          'Es una capa de agua líquida en la Tierra.',
          'Es la capa de gases que rodea la Tierra. (Գազերի շերտ է, որը շրջապատում է Երկիրը)',
          'Es la capa sólida de rocas y minerales.',
          'Es únicamente el oxígeno que respiramos.'
        ],
        correct: 1,
        explanation: 'La atmósfera es la capa de gases que rodea la Tierra (Մթնոլորտը գազերի շերտ է, որը շրջապատում է Երկիրը)։'
      },
      {
        question: '¿Cuál es el gas más abundante de la atmósfera? / Ո՞ր գազն է ամենաշատը մթնոլորտում։',
        options: [
          'El oxígeno (~21 %)',
          'El dióxido de carbono (<1 %)',
          'El nitrógeno (~78 %) (Ազոտը)',
          'El argón'
        ],
        correct: 2,
        explanation: 'El nitrógeno es el gas más abundante (~78 %) / Ազոտը ամենաշատ գազն է (~78%)։'
      },
      {
        question: '¿Qué porcentaje de la atmósfera es oxígeno? / Քանի՞ տոկոս է թթվածինը։',
        options: [
          'Aproximadamente el 78 %',
          'Aproximadamente el 21 % (Մոտավորապես 21 %)',
          'Aproximadamente el 50 %',
          'Aproximadamente el 1 %'
        ],
        correct: 1,
        explanation: 'El oxígeno ocupa aproximadamente el 21 % de la atmósfera / Թթվածինը մոտավորապես 21% է։'
      },
      {
        question: '¿En qué capa vivimos y ocurren las lluvias y vientos? / Ո՞ր շերտում ենք ապրում և որտե՞ղ են առաջանում անձրևն ու քամին։',
        options: [
          'En la estratosfera',
          'En la mesosfera',
          'En la troposfera (Տրոպոսֆերայում)',
          'En la termosfera'
        ],
        correct: 2,
        explanation: 'Vivimos en la troposfera, donde ocurren los fenómenos meteorológicos / Մենք ապրում ենք տրոպոսֆերայում։'
      },
      {
        question: '¿Dónde está la capa de ozono y qué hace? / Որտե՞ղ է գտնվում օզոնային շերտը։',
        options: [
          'En la troposfera y produce lluvia.',
          'En la estratosfera y protege de la radiación ultravioleta. (Ստրատոսֆերայում է և պաշտպանում է ՈՒՄ ճառագայթներից)',
          'En la mesosfera y desintegra meteoritos.',
          'En la exosfera y toca el espacio.'
        ],
        correct: 1,
        explanation: 'Está en la estratosfera y absorbe gran parte de la radiación ultravioleta (Օզոնային շերտը գտնվում է ստրատոսֆերայում)։'
      },
      {
        question: '¿Qué ocurre con muchos meteoritos en la mesosfera? / Ի՞նչ է տեղի ունենում շատ երկնաքարերի հետ մեզոսֆերայում։',
        options: [
          'Se desintegran / այրվում և քայքայվում են',
          'Se convierten en auroras boreales',
          'Llegan sin cambios a la superficie',
          'Producen viento y nubes'
        ],
        correct: 0,
        explanation: 'En la mesosfera muchos meteoritos se desintegran cuando entran en la atmósfera / Երկնաքարերը քայքայվում են այս շերտում։'
      },
      {
        question: '¿Cuál es la diferencia entre tiempo y clima? / Ո՞րն է եղանակի և կլիմայի տարբերությունը։',
        options: [
          'No hay diferencia, son idénticos.',
          'El tiempo cambia a corto plazo (hoy/ahora); el clima se estudia durante muchos años. (Եղանակը՝ այսօր կամ հիմա, կլիման՝ երկար տարիներ)',
          'El tiempo ocurre en la estratosfera y el clima en la troposfera.',
          'El clima es sólo la temperatura, el tiempo es la lluvia.'
        ],
        correct: 1,
        explanation: 'Tiempo = hoy o ahora; Clima = condiciones habituales durante muchos años / Եղանակ = այսօր/հիմա, Կլիմա = երկար տարիներ։'
      },
      {
        question: '¿Cuál es la capa más externa de la atmósfera? / Ո՞րն է մթնոլորտի ամենաարտաքին շերտը։',
        options: [
          'La termosfera',
          'La estratosfera',
          'La exosfera (Էկզոսֆերան)',
          'La mesosfera'
        ],
        correct: 2,
        explanation: 'La exosfera es la capa más externa y se encuentra en contacto con el espacio / Էկզոսֆերան ամենաարտաքին շերտն է։'
      }
    ];
  }, []);

  const handleQuizAnswer = (optionIndex: number) => {
    if (isQuizAnswered) return;
    setSelectedQuizOption(optionIndex);
    setIsQuizAnswered(true);
    if (optionIndex === quizQuestions[quizIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedQuizOption(null);
      setIsQuizAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedQuizOption(null);
    setIsQuizAnswered(false);
    setQuizFinished(false);
  };

  const activeLayer = ATMOSPHERE_LAYERS.find(l => l.id === selectedLayerId) || ATMOSPHERE_LAYERS[4];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header - Zone 1: Title, Zone 2: Navigation Links, Zone 3: Global Actions */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/30">
              <Languages className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Unit 2 · Part 1</span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs text-slate-400">Español ⇄ Հայերեն</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2 font-display">
                <span>La Atmósfera</span>
                <span className="text-slate-400 font-normal">/ Մթնոլորտը</span>
              </h1>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'reader'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Texto Completo</span>
            </button>

            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'detailed'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explicación</span>
            </button>

            <button
              onClick={() => setActiveTab('layers')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'layers'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Capas (5)</span>
            </button>

            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'vocabulary'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Vocabulario (20)</span>
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'qa'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Preguntas (16)</span>
            </button>

            <button
              onClick={() => setActiveTab('short')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'short'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Texto Corto</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Quiz</span>
            </button>
          </div>

          {/* Master Armenian Toggle & Search */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllArmenian(prev => !prev)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
                showAllArmenian
                  ? 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
              title={showAllArmenian ? 'Թաքցնել հայերեն թարգմանությունները' : 'Ցուցադրել բոլոր հայերեն թարգմանությունները'}
            >
              {showAllArmenian ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Թաքցնել հայերենը</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Բացել բոլորը</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Quick Banner / Instruction */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border-b border-slate-800/60 py-3 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Ինտերակտիվ ուսումնասիրություն՝</span>
            <span>Սեղմեք ցանկացած իսպաներեն նախադասության կամ հարցի վրա՝ հայերեն թարգմանությունը տեսնելու համար։</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-slate-500 text-xs">Լսելու համար՝</span>
            <span className="flex items-center gap-1 text-cyan-300">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Սեղմեք բարձրախոսը</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* TAB 1: TEXTO COMPLETO / ԼԻԱՐԺԵՔ ՏԵՔՍՏ */}
        {activeTab === 'reader' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  Texto Completo / Լիարժեք տեքստ
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  11 պարբերություն իսպաներեն և հայերեն։ Կտտացրեք յուրաքանչյուր հատվածին՝ հայերենը բացելու կամ լսելու համար։
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAllArmenian(!showAllArmenian)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {showAllArmenian ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showAllArmenian ? 'Թաքցնել հայերենը' : 'Բացել ամբողջ հայերենը'}</span>
                </button>
              </div>
            </div>

            <div className="grid gap-3.5">
              {FULL_TEXT_PARAGRAPHS.map((item, idx) => {
                const open = isRevealed(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleReveal(item.id)}
                    className={`group cursor-pointer rounded-xl border p-4 sm:p-5 transition-all duration-200 ${
                      open
                        ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                        : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-xs font-mono font-semibold text-slate-500 mt-0.5 w-6 shrink-0">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="space-y-3 flex-1">
                          {/* Spanish text */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-medium text-amber-400 shrink-0">🇪🇸</span>
                            <p className="text-base sm:text-lg font-medium text-white leading-relaxed group-hover:text-cyan-200 transition-colors">
                              {item.es}
                            </p>
                          </div>

                          {/* Armenian translation */}
                          {open && (
                            <div className="pt-2.5 border-t border-slate-800/80 flex items-baseline gap-2 text-cyan-200 animate-fadeIn">
                              <span className="text-xs font-medium text-cyan-400 shrink-0">🇦🇲</span>
                              <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-sans">
                                {item.hy}
                              </p>
                            </div>
                          )}

                          {!open && (
                            <p className="text-xs text-slate-500 flex items-center gap-1 group-hover:text-slate-400">
                              <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
                              <span>Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleSpeak(item.es, item.id, e)}
                          className={`p-2 rounded-lg transition-colors ${
                            speakingId === item.id
                              ? 'bg-cyan-500 text-slate-950 animate-pulse'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                          title="Լսել իսպաներեն արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleCopy(`${item.es}\n${item.hy}`, item.id, e)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="Պատճենել տեքստը"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: EXPLICACIÓN DETALLADA / ՄԱՆՐԱՄԱՍՆ ԲԱՑԱՏՐՈՒԹՅՈՒՆ */}
        {activeTab === 'detailed' && (
          <div className="space-y-8">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                Explicación detallada / Մանրամասն բացատրություն
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Թեմայի բոլոր 6 հիմնական բաժինները՝ հայերեն և իսպաներեն բացատրություններով, գազերի տոկոսներով և տարբերություններով։
              </p>
            </div>

            <div className="space-y-8">
              {DETAILED_SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden"
                >
                  {/* Section Title */}
                  <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono font-bold text-sm">
                        {sec.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-white font-display">
                          {sec.titleEs}
                        </h3>
                        <p className="text-xs text-cyan-400/90 font-medium">
                          {sec.titleHy}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(sec.titleEs, `sec-title-${sec.id}`)}
                      className={`p-2 rounded-lg transition-colors ${
                        speakingId === `sec-title-${sec.id}`
                          ? 'bg-cyan-500 text-slate-950'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                      title="Լսել բաժնի վերնագիրը"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Section Content Items */}
                  <div className="p-4 sm:p-6 space-y-3.5">
                    {sec.items.map((item, idx) => {
                      const itemId = `${sec.id}-item-${idx}`;
                      const open = isRevealed(itemId);

                      if (item.type === 'subheading') {
                        return (
                          <div key={itemId} className="pt-3 pb-1 text-sm font-semibold text-slate-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{item.es}</span>
                          </div>
                        );
                      }

                      if (item.type === 'stat') {
                        return (
                          <div
                            key={itemId}
                            onClick={() => toggleReveal(itemId)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              open
                                ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                                🇪🇸
                              </span>
                              <span className="text-base font-semibold text-white">
                                {item.es}
                              </span>
                            </div>

                            {open ? (
                              <div className="flex items-center gap-2 text-cyan-300 font-medium text-sm pl-8 sm:pl-0">
                                <span className="text-xs text-cyan-400">🇦🇲</span>
                                <span>{item.hy}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-500 hover:text-cyan-400 pl-8 sm:pl-0">
                                Սեղմեք թարգմանության համար →
                              </span>
                            )}
                          </div>
                        );
                      }

                      if (item.type === 'examples' && item.subitems) {
                        return (
                          <div key={itemId} className="pt-2">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                              Օրինակներ (սեղմեք յուրաքանչյուր բառին)՝
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                              {item.subitems.map((sub, sIdx) => {
                                const subId = `${itemId}-sub-${sIdx}`;
                                const subOpen = isRevealed(subId);
                                return (
                                  <div
                                    key={subId}
                                    onClick={() => toggleReveal(subId)}
                                    className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                                      subOpen
                                        ? 'bg-indigo-950/50 border-indigo-500/50 text-indigo-200'
                                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                                    }`}
                                  >
                                    <div className="flex items-center justify-center gap-1.5">
                                      <span className="font-semibold text-white text-sm">
                                        {sub.es}
                                      </span>
                                      <button
                                        onClick={(e) => handleSpeak(sub.es, subId, e)}
                                        className="text-slate-500 hover:text-cyan-400 p-0.5"
                                      >
                                        <Volume2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <div className="text-xs mt-1 font-medium">
                                      {subOpen ? (
                                        <span className="text-cyan-300">{sub.hy}</span>
                                      ) : (
                                        <span className="text-slate-600">թարգմանել</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={itemId}
                          onClick={() => toggleReveal(itemId)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            open
                              ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm'
                              : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xs font-semibold text-amber-400 shrink-0">🇪🇸</span>
                                <span className="text-sm sm:text-base font-medium text-white">
                                  {item.es}
                                </span>
                              </div>
                              {open && item.hy && (
                                <div className="flex items-baseline gap-2 pt-1 border-t border-slate-800/60 text-cyan-200 text-sm">
                                  <span className="text-xs font-semibold text-cyan-400 shrink-0">🇦🇲</span>
                                  <span>{item.hy}</span>
                                </div>
                              )}
                              {!open && (
                                <p className="text-xs text-slate-500 pl-6">
                                  Սեղմեք՝ հայերենը բացելու համար
                                </p>
                              )}
                            </div>

                            <button
                              onClick={(e) => handleSpeak(item.es, itemId, e)}
                              className={`p-1.5 rounded-lg shrink-0 ${
                                speakingId === itemId
                                  ? 'bg-cyan-500 text-slate-950'
                                  : 'text-slate-500 hover:text-white hover:bg-slate-800'
                              }`}
                              title="Լսել արտասանությունը"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ATMOSPHERE LAYERS VISUALIZER / ՄԹՆՈԼՈՐՏԻ ՇԵՐՏԵՐԸ */}
        {activeTab === 'layers' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                Las capas de la atmósfera / Մթնոլորտի շերտերը
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Մթնոլորտի բոլոր 5 շերտերը՝ Երկրից մինչև տիեզերք։ Կտտացրեք յուրաքանչյուր շերտին՝ մանրամասն հատկությունները տեսնելու համար։
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Interactive Visual Atmosphere Diagram */}
              <div className="lg:col-span-6 space-y-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 relative overflow-hidden shadow-2xl">
                  {/* Space header */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-800/60 mb-2">
                    <span className="flex items-center gap-1 text-indigo-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Տիեզերք / El Espacio exterior</span>
                    </span>
                    <span>Բարձրությունը</span>
                  </div>

                  {/* 5 Stacked Interactive Atmosphere Layer Strips */}
                  <div className="space-y-2">
                    {ATMOSPHERE_LAYERS.map((layer) => {
                      const isSelected = selectedLayerId === layer.id;
                      return (
                        <div
                          key={layer.id}
                          onClick={() => setSelectedLayerId(layer.id)}
                          className={`relative p-3.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                            isSelected
                              ? 'ring-2 ring-cyan-400 border-transparent shadow-lg scale-[1.01]'
                              : 'border-slate-800 hover:border-slate-700 opacity-90 hover:opacity-100'
                          } bg-gradient-to-r ${layer.color}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                                style={{ backgroundColor: `${layer.accentColor}25`, color: layer.accentColor }}
                              >
                                {layer.id === 'exosfera' && <Radio className="w-4 h-4" />}
                                {layer.id === 'termosfera' && <Flame className="w-4 h-4" />}
                                {layer.id === 'mesosfera' && <Sparkles className="w-4 h-4" />}
                                {layer.id === 'estratosfera' && <Shield className="w-4 h-4" />}
                                {layer.id === 'troposfera' && <CloudRain className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-white text-base">
                                    {layer.nameEs}
                                  </h4>
                                  <span className="text-xs text-slate-300 font-medium">
                                    / {layer.nameHy}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-300/80">
                                  {layer.id === 'troposfera' && 'Մենք այստեղ ենք ապրում · Անձրև, ձյուն, քամի'}
                                  {layer.id === 'estratosfera' && 'Օզոնային շերտ (Capa de ozono) · ՈՒՄ պաշտպանություն'}
                                  {layer.id === 'mesosfera' && 'Երկնաքարերի քայքայում (Meteoritos)'}
                                  {layer.id === 'termosfera' && 'Բարձր ջերմաստիճաններ · Բևեռափայլեր (Auroras)'}
                                  {layer.id === 'exosfera' && 'Ամենաարտաքին շերտ · Անցում դեպի տիեզերք'}
                                </p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-mono text-xs font-bold text-cyan-300">
                                {layer.altitude}
                              </span>
                              <div className="text-[10px] text-slate-400">կմ</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Earth Surface ground indicator */}
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/20 px-3 py-2 rounded-lg">
                    <span className="font-semibold">🌍 Երկրի մակերևույթ / Superficie terrestre (0 km)</span>
                    <span className="text-slate-400 text-[11px]">Կյանքի միջավայր</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <p className="font-semibold text-slate-200">
                    💡 Կարևոր հերթականությունը հիշելու համար (ներքևից վեր)՝
                  </p>
                  <p>
                    1. Troposfera → 2. Estratosfera → 3. Mesosfera → 4. Termosfera → 5. Exosfera
                  </p>
                </div>
              </div>

              {/* Right Column: Layer Detail Inspector with Click-to-Reveal */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl space-y-5">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        Մանրամասն տեղեկություն
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1 font-display flex items-center gap-2">
                        <span>{activeLayer.nameEs}</span>
                        <span className="text-slate-400 text-lg font-normal">/ {activeLayer.nameHy}</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        Բարձրությունը՝ {activeLayer.altitude}
                      </p>
                    </div>

                    <button
                      onClick={() => handleSpeak(`${activeLayer.nameEs}. ${activeLayer.descriptionEs}`, activeLayer.id)}
                      className={`p-2.5 rounded-xl transition-colors ${
                        speakingId === activeLayer.id
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                      title="Լսել այս շերտի մասին"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Main bilingual description with click reveal */}
                  <div
                    onClick={() => toggleReveal(`layer-desc-${activeLayer.id}`)}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-2.5"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-amber-400">🇪🇸</span>
                      <p className="text-base text-white font-medium leading-relaxed">
                        {activeLayer.descriptionEs}
                      </p>
                    </div>

                    {isRevealed(`layer-desc-${activeLayer.id}`) ? (
                      <div className="pt-2 border-t border-slate-800 text-cyan-200 text-sm flex items-baseline gap-2 animate-fadeIn">
                        <span className="text-xs font-bold text-cyan-400">🇦🇲</span>
                        <p>{activeLayer.descriptionHy}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար</span>
                      </p>
                    )}
                  </div>

                  {/* Key facts list */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Հիմնական փաստեր (Key Facts)՝
                    </h4>
                    {activeLayer.keyFacts.map((fact, idx) => {
                      const factId = `fact-${activeLayer.id}-${idx}`;
                      const open = isRevealed(factId);
                      return (
                        <div
                          key={factId}
                          onClick={() => toggleReveal(factId)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            open
                              ? 'bg-slate-950/90 border-cyan-500/40 text-cyan-200'
                              : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xs text-amber-400">🇪🇸</span>
                                <span className="text-sm font-medium text-white">{fact.es}</span>
                              </div>
                              {open && (
                                <div className="flex items-baseline gap-2 pt-1 border-t border-slate-800 text-xs text-cyan-300">
                                  <span className="text-xs text-cyan-400">🇦🇲</span>
                                  <span>{fact.hy}</span>
                                </div>
                              )}
                              {!open && (
                                <span className="text-[11px] text-slate-500 pl-5">
                                  Սեղմեք թարգմանության համար
                                </span>
                              )}
                            </div>

                            <button
                              onClick={(e) => handleSpeak(fact.es, factId, e)}
                              className="text-slate-500 hover:text-white p-1"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VOCABULARIO IMPORTANTE / ԿԱՐԵՎՈՐ ԲԱՌԱՊԱՇԱՐ (20 ITEMS) */}
        {activeTab === 'vocabulary' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  Vocabulario importante / Կարևոր բառապաշար
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Թեմայի բոլոր 20 առանցքային բառերը՝ ինտերակտիվ աղյուսակով կամ քարտերի (Flashcards) ռեժիմով։
                </p>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-2">
                <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setVocabViewMode('table')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      vocabViewMode === 'table'
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Աղյուսակ (20)
                  </button>
                  <button
                    onClick={() => setVocabViewMode('flashcards')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      vocabViewMode === 'flashcards'
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Քարտեր (Flashcards)
                  </button>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              {/* Category tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'Բոլորը (20)' },
                  { id: 'layer', label: 'Շերտեր' },
                  { id: 'gas', label: 'Գազեր' },
                  { id: 'phenomenon', label: 'Երևույթներ' },
                  { id: 'concept', label: 'Հասկացություններ' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setVocabCategory(cat.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                      vocabCategory === cat.id
                        ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Փնտրել իսպաներեն / հայերեն..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* View Mode: Flashcards */}
            {vocabViewMode === 'flashcards' && filteredVocabulary.length > 0 && (
              <div className="max-w-xl mx-auto space-y-4 py-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Քարտ {cardIndex + 1} / {filteredVocabulary.length}
                  </span>
                  <span>Սեղմեք քարտին՝ շրջելու համար</span>
                </div>

                {/* Flip Card Container */}
                <div
                  onClick={() => setCardFlipped(!cardFlipped)}
                  className={`min-h-[220px] rounded-2xl border p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-xl ${
                    cardFlipped
                      ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border-indigo-500/50'
                      : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-cyan-500/40'
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    {cardFlipped ? '🇦🇲 Հայերեն' : '🇪🇸 Español'}
                  </span>

                  <h3 className="text-3xl font-bold text-white mb-2 font-display">
                    {cardFlipped
                      ? filteredVocabulary[cardIndex].hy
                      : filteredVocabulary[cardIndex].es}
                  </h3>

                  <p className="text-xs text-slate-400">
                    {cardFlipped ? 'Սեղմեք՝ իսպաներենը տեսնելու համար' : 'Սեղմեք՝ հայերեն թարգմանությունը բացելու համար'}
                  </p>

                  <div className="mt-4 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => handleSpeak(filteredVocabulary[cardIndex].es, `card-${cardIndex}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Լսել իսպաներեն</span>
                    </button>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    disabled={cardIndex === 0}
                    onClick={() => {
                      setCardIndex(prev => Math.max(0, prev - 1));
                      setCardFlipped(false);
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Նախորդը
                  </button>

                  <button
                    onClick={() => setCardFlipped(!cardFlipped)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Շրջել քարտը</span>
                  </button>

                  <button
                    disabled={cardIndex === filteredVocabulary.length - 1}
                    onClick={() => {
                      setCardIndex(prev => Math.min(filteredVocabulary.length - 1, prev + 1));
                      setCardFlipped(false);
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Հաջորդը →
                  </button>
                </div>
              </div>
            )}

            {/* View Mode: Interactive Table with Click-to-Reveal */}
            {vocabViewMode === 'table' && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span className="col-span-1">#</span>
                  <span className="col-span-5 flex items-center gap-1">
                    <span>🇪🇸 Español</span>
                    <span className="text-slate-500 font-normal lowercase">(սեղմեք բառին)</span>
                  </span>
                  <span className="col-span-5">🇦🇲 Հայերեն</span>
                  <span className="col-span-1 text-right">Ձայն</span>
                </div>

                <div className="divide-y divide-slate-850">
                  {filteredVocabulary.map((word, idx) => {
                    const wordId = `vocab-${word.id}`;
                    const open = isRevealed(wordId);
                    return (
                      <div
                        key={word.id}
                        onClick={() => toggleReveal(wordId)}
                        className={`grid grid-cols-12 items-center px-4 py-3.5 cursor-pointer transition-colors ${
                          open
                            ? 'bg-slate-900/90'
                            : 'hover:bg-slate-900/50'
                        }`}
                      >
                        <span className="col-span-1 text-xs font-mono text-slate-500">
                          {word.id}
                        </span>

                        <div className="col-span-5 pr-2">
                          <span className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors">
                            {word.es}
                          </span>
                        </div>

                        <div className="col-span-5">
                          {open ? (
                            <span className="text-sm font-medium text-cyan-300 animate-fadeIn">
                              {word.hy}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500 hover:text-slate-400">
                              սեղմեք՝ բացելու համար
                            </span>
                          )}
                        </div>

                        <div className="col-span-1 text-right" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleSpeak(word.es, wordId, e)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              speakingId === wordId
                                ? 'bg-cyan-500 text-slate-950'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                            title="Լսել արտասանությունը"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PREGUNTAS Y RESPUESTAS / ՀԱՐՑԵՐ ԵՎ ՊԱՏԱՍԽԱՆՆԵՐ (16 ITEMS) */}
        {activeTab === 'qa' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  Preguntas y respuestas / Հարցեր և պատասխաններ
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Բոլոր 16 հարցերն ու պատասխանները։ Սեղմեք հարցին կամ պատասխանին՝ հայերենը տեսնելու համար։
                </p>
              </div>

              {/* Mode switch: Practice self-test vs full preview */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQaHideAnswers(!qaHideAnswers)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
                    qaHideAnswers
                      ? 'bg-amber-950/60 border-amber-600/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{qaHideAnswers ? 'Ինքնաստուգման ռեժիմ (Ակտիվ)' : 'Միացնել ինքնաստուգման ռեժիմ'}</span>
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {QUESTIONS_AND_ANSWERS.map((qa) => {
                const qId = `qa-q-${qa.id}`;
                const aId = `qa-a-${qa.id}`;
                const qRevealed = isRevealed(qId);
                const aRevealed = isRevealed(aId);
                const answerShown = !qaHideAnswers || !!revealedAnswers[qa.id];

                return (
                  <div
                    key={qa.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5 transition-all hover:border-slate-700 space-y-4"
                  >
                    {/* Header with question number and audio */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono font-bold text-xs shrink-0 mt-0.5">
                          {qa.id}
                        </span>

                        {/* Question Block (Clickable for Armenian translation) */}
                        <div
                          onClick={() => toggleReveal(qId)}
                          className="space-y-1.5 cursor-pointer flex-1 group"
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-bold text-amber-400">🇪🇸</span>
                            <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {qa.questionEs}
                            </h3>
                          </div>

                          {qRevealed ? (
                            <div className="flex items-baseline gap-2 text-sm text-cyan-300 animate-fadeIn">
                              <span className="text-xs font-bold text-cyan-400">🇦🇲</span>
                              <p className="font-medium">{qa.questionHy}</p>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500 pl-6 group-hover:text-slate-400">
                              սեղմեք հարցին՝ հայերենը բացելու համար
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Listen to question */}
                      <button
                        onClick={() => handleSpeak(qa.questionEs, qId)}
                        className={`p-2 rounded-lg shrink-0 ${
                          speakingId === qId
                            ? 'bg-cyan-500 text-slate-950'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Լսել հարցը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Answer Block */}
                    <div className="pl-10">
                      {answerShown ? (
                        <div
                          onClick={() => toggleReveal(aId)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            aRevealed
                              ? 'bg-slate-950/90 border-emerald-500/40 text-emerald-200'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xs font-bold text-amber-400">🇪🇸</span>
                                <span className="text-sm sm:text-base font-semibold text-emerald-300">
                                  {qa.answerEs}
                                </span>
                              </div>

                              {aRevealed && (
                                <div className="flex items-baseline gap-2 pt-1.5 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 animate-fadeIn">
                                  <span className="text-xs font-bold text-cyan-400">🇦🇲</span>
                                  <span>{qa.answerHy}</span>
                                </div>
                              )}

                              {!aRevealed && (
                                <p className="text-[11px] text-slate-500 pl-5">
                                  Սեղմեք պատասխանին՝ հայերեն թարգմանության համար
                                </p>
                              )}
                            </div>

                            <button
                              onClick={(e) => handleSpeak(qa.answerEs, aId, e)}
                              className={`p-1.5 rounded-lg shrink-0 ${
                                speakingId === aId
                                  ? 'bg-emerald-500 text-slate-950'
                                  : 'text-slate-500 hover:text-white'
                              }`}
                              title="Լսել պատասխանը"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setRevealedAnswers(prev => ({ ...prev, [qa.id]: true }))}
                          className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition-colors flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ցուցադրել պատասխանը (Reveal Answer)</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: TEXTO CORTO / ԿԱՐՃ ՏԵՔՍՏ */}
        {activeTab === 'short' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="pb-4 border-b border-slate-800 text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                Texto corto / Կարճ տեքստ
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Թեմայի հիմնական ամփոփիչ տեքստը՝ 4 պարբերությամբ։ Սեղմեք յուրաքանչյուր հատվածին՝ թարգմանությունը տեսնելու համար։
              </p>
            </div>

            <div className="space-y-4">
              {SHORT_TEXT_PARAGRAPHS.map((item, idx) => {
                const open = isRevealed(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleReveal(item.id)}
                    className={`rounded-2xl border p-5 cursor-pointer transition-all duration-200 ${
                      open
                        ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-amber-400">🇪🇸</span>
                          <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                            {item.es}
                          </p>
                        </div>

                        {open ? (
                          <div className="pt-2.5 border-t border-slate-800/80 text-cyan-200 flex items-baseline gap-2 animate-fadeIn">
                            <span className="text-xs font-bold text-cyan-400">🇦🇲</span>
                            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                              {item.hy}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար</span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleSpeak(item.es, item.id, e)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="Լսել իսպաներեն"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 7: QUIZ / ՍՏՈՒԳԱՐՔ */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="pb-4 border-b border-slate-800 text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                Quiz de autoevaluación / Ստուգարք
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Ստուգեք ձեր գիտելիքները Unit 2-ի թեմայով՝ մթնոլորտի գազերի, շերտերի և կլիմայի վերաբերյալ։
              </p>
            </div>

            {!quizFinished ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 shadow-xl">
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Հարց {quizIndex + 1} / {quizQuestions.length}
                    </span>
                    <span>Միավորներ՝ {quizScore}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 transition-all duration-300"
                      style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    {quizQuestions[quizIndex].question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {quizQuestions[quizIndex].options.map((opt, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === quizQuestions[quizIndex].correct;

                    let btnClass = 'border-slate-800 bg-slate-950/70 text-slate-200 hover:border-slate-700';
                    if (isQuizAnswered) {
                      if (isCorrect) {
                        btnClass = 'border-emerald-500/80 bg-emerald-950/60 text-emerald-200 font-semibold ring-1 ring-emerald-500';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'border-rose-500/80 bg-rose-950/60 text-rose-200';
                      } else {
                        btnClass = 'border-slate-850 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isQuizAnswered}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="w-6 h-6 rounded-md bg-slate-900 text-slate-400 border border-slate-800 flex items-center justify-center text-xs font-mono shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 mt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback explanation */}
                {isQuizAnswered && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      💡 Բացատրություն՝
                    </p>
                    <p className="text-sm text-slate-200">
                      {quizQuestions[quizIndex].explanation}
                    </p>
                  </div>
                )}

                {/* Next button */}
                {isQuizAnswered && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>
                      {quizIndex < quizQuestions.length - 1 ? 'Հաջորդ հարցը →' : 'Ավարտել ստուգարքը'}
                    </span>
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Finished Summary */
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center space-y-5 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center mx-auto text-2xl font-bold">
                  {quizScore}/{quizQuestions.length}
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white font-display">
                    {quizScore >= quizQuestions.length - 1
                      ? 'Գերազանց արդյունք! ¡Excelente!'
                      : quizScore >= quizQuestions.length / 2
                      ? 'Լավ աշխատանք! ¡Buen trabajo!'
                      : 'Շարունակեք կրկնել նյութը! ¡Sigue practicando!'}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Դուք ճիշտ պատասխանեցիք {quizQuestions.length} հարցերից {quizScore}-ին ({Math.round((quizScore / quizQuestions.length) * 100)}%)։
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Կրկնել ստուգարքը</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('reader')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                  >
                    Վերադառնալ տեքստին
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-slate-400 font-medium">
              UNIT 2 — PART 1: THE ATMOSPHERE / LA ATMÓSFERA / ՄԹՆՈԼՈՐՏԸ
            </p>
            <p className="text-slate-600 text-[11px] mt-0.5">
              Իսպաներենից հայերեն ուսումնական ինտերակտիվ համակարգ · Web Speech API
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>20 բառապաշարի միավոր</span>
            <span>·</span>
            <span>16 հարց ու պատասխան</span>
            <span>·</span>
            <span>5 մթնոլորտային շերտ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
