// Builds C:/Users/Tyron/publicspeakingtips-mx/content/copy.json
import fs from "fs";

const SITE = "https://publicspeakingtips.mx/";
const CTA = "https://quiz.confidently.pro/onboarding?ref=publicspeakingtips.mx";
const SIBLING = "https://www.amberwillo.com/public-speaking/tips/";
const TODAY = "2026-09-09";

// ---------- sources ----------
const U = {
  pmc77: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3647380/",
  pmc1530: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4763377/",
  pmcMeta: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6428748/",
  pmcVirtual: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10460391/",
  pmcAudience: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6505544/",
  pmcFeedback: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9355701/",
  mayo: "https://www.mayoclinic.org/diseases-conditions/specific-phobias/expert-answers/fear-of-public-speaking/faq-20058416",
  adaa: "https://adaa.org/understanding-anxiety/social-anxiety-disorder/treatment/conquering-stage-fright",
  harvard10: "https://professional.dce.harvard.edu/blog/10-tips-for-improving-your-public-speaking-skills/",
  harvardCred: "https://professional.dce.harvard.edu/blog/5-ways-to-establish-your-credibility-in-a-speech/",
  harvardAud: "https://professional.dce.harvard.edu/blog/make-your-speech-all-about-the-audience/",
  purdue: "https://www.purdueglobal.edu/blog/student-life/public-speaking-tips/",
  purdueGrowth: "https://www.purdueglobal.edu/blog/careers/develop-growth-mindset/",
  pittAnx: "https://www.comm.pitt.edu/speech-anxiety",
  pittAud: "https://www.comm.pitt.edu/oral-comm-lab/audience-analysis",
  pittVis: "https://www.comm.pitt.edu/visual-aids",
  oertx: "https://oertx.highered.texas.gov/courseware/lesson/848/overview",
  babson: "https://entrepreneurship.babson.edu/public-speaker/",
  apu: "https://www.apu.apus.edu/area-of-study/arts-and-humanities/resources/public-speaker-skills-and-how-you-can-improve-your-speeches/",
  baruch: "https://studentaffairs.baruch.cuny.edu/counseling/tips-for-managing-public-speaking-anxiety/",
  virtualspeech: "https://virtualspeech.com/blog/average-speaking-rate-words-per-minute",
  monkey: "https://www.100monkey.co.uk/insights/words-per-minute-how-to-speak-slower-when-public-speaking/",
  msu: "https://www.canr.msu.edu/news/eye_contact_dont_make_these_mistakes",
  verywell: "https://www.verywellmind.com/how-do-i-maintain-good-eye-contact-3024392",
  moxie: "https://www.moxieinstitute.com/how-to-structure-speech-award-winning-speakers/",
  buckley: "https://buckleyschool.com/magazine/articles/how-to-create-a-strong-open-for-your-presentation/",
  rheum: "https://www.the-rheumatologist.org/article/rosenbaums-5-rules-for-public-speaking/",
  genard: "https://www.genardmethod.com/blog/the-six-rules-of-effective-public-speaking-0",
  sinek: "https://www.linkedin.com/pulse/simons-1-rule-public-speaking-simon-sinek-8dufe",
  yazbeck: "https://www.linkedin.com/pulse/5cs-commanding-speaker-joe-yazbeck-1e",
  vista: "https://www.vistaprojects.com/effective-communication/",
  lemonade: "https://lemonadeday.org/blog/public-speaking-for-kids",
  reddit321: "https://www.reddit.com/r/ConnectBetter/comments/1rcqlxf/the_321_speaking_trick_that_forces_you_to_stop/",
  schoolcounselor: "https://www.schoolcounselor.org/newsletters/january-2020/coping-with-student-anxiety",
  uiowa: "https://counseling.uiowa.edu/news/2015/09/30-ways-manage-speaking-anxiety",
  tandf: "https://www.tandfonline.com/doi/full/10.1080/0309877X.2021.1948509",
  sciYoung: "https://www.sciencedirect.com/science/article/pii/S0001691826000466",
  mentalhealth: "https://www.mentalhealth.com/library/what-we-fear-more-than-death",
  sholakaye: "https://sholakaye.com/learning-centre/what-are-the-top-5-problems-people-have-with-public-speaking/",
  speakerhub: "https://speakerhub.com/skillcamp/audience-engagement-tools-strategies-public-speaking",
  slcc: "https://slcc.pressbooks.pub/comm1020/chapter/chapter-10/",
  smart: "https://medium.com/@academicstandup/using-smart-goals-to-help-with-public-speaking-anxiety",
  sibling: SIBLING,
};

const sources0 = [
  { n: 1, title: "Public speaking anxiety: prevalencia (PMC3647380)", domain: "pmc.ncbi.nlm.nih.gov", url: U.pmc77, usedIn: [7] },
  { n: 2, title: "Public speaking anxiety y DSM-5 (PMC4763377)", domain: "pmc.ncbi.nlm.nih.gov", url: U.pmc1530, usedIn: [7] },
  { n: 3, title: "Metaanálisis de intervenciones psicológicas para el miedo a hablar en público (PMC6428748)", domain: "pmc.ncbi.nlm.nih.gov", url: U.pmcMeta, usedIn: [7] },
  { n: 4, title: "Práctica frente a un público virtual y confianza en la vida real (PMC10460391)", domain: "pmc.ncbi.nlm.nih.gov", url: U.pmcVirtual, usedIn: [3] },
  { n: 5, title: "Conocer a tu audiencia hace el mensaje más pertinente (PMC6505544)", domain: "pmc.ncbi.nlm.nih.gov", url: U.pmcAudience, usedIn: [2] },
  { n: 6, title: "Búsqueda de retroalimentación y desempeño (PMC9355701)", domain: "pmc.ncbi.nlm.nih.gov", url: U.pmcFeedback, usedIn: [10] },
  { n: 7, title: "Mayo Clinic: Fear of public speaking, how can I overcome it?", domain: "mayoclinic.org", url: U.mayo, usedIn: [3, 7] },
  { n: 8, title: "ADAA: Conquering Stage Fright", domain: "adaa.org", url: U.adaa, usedIn: [7] },
  { n: 9, title: "Harvard DCE: 10 Tips for Improving Your Public Speaking Skills", domain: "professional.dce.harvard.edu", url: U.harvard10, usedIn: [2, 7, 8, 9, 10] },
  { n: 10, title: "Harvard DCE: 5 Ways to Establish Your Credibility in a Speech", domain: "professional.dce.harvard.edu", url: U.harvardCred, usedIn: [4] },
  { n: 11, title: "Harvard DCE: Make Your Speech All About the Audience", domain: "professional.dce.harvard.edu", url: U.harvardAud, usedIn: [2] },
  { n: 12, title: "Purdue Global: 11 Public Speaking Tips", domain: "purdueglobal.edu", url: U.purdue, usedIn: [3, 4, 5, 6] },
  { n: 13, title: "Purdue Global: Develop a Growth Mindset", domain: "purdueglobal.edu", url: U.purdueGrowth, usedIn: [10] },
  { n: 14, title: "University of Pittsburgh: Speech Anxiety", domain: "comm.pitt.edu", url: U.pittAnx, usedIn: [3, 7] },
  { n: 15, title: "University of Pittsburgh: Audience Analysis", domain: "comm.pitt.edu", url: U.pittAud, usedIn: [2] },
  { n: 16, title: "University of Pittsburgh: Visual Aids", domain: "comm.pitt.edu", url: U.pittVis, usedIn: [9] },
  { n: 17, title: "OERTx (Texas Higher Education): Audience Analysis", domain: "oertx.highered.texas.gov", url: U.oertx, usedIn: [2] },
  { n: 18, title: "Babson College: Public Speaker", domain: "entrepreneurship.babson.edu", url: U.babson, usedIn: [9] },
  { n: 19, title: "American Public University: Public Speaker Skills", domain: "apu.apus.edu", url: U.apu, usedIn: [9] },
  { n: 21, title: "VirtualSpeech: Average Speaking Rate (words per minute)", domain: "virtualspeech.com", url: U.virtualspeech, usedIn: [5] },
  { n: 22, title: "100th Monkey: Words per minute, how to speak slower", domain: "100monkey.co.uk", url: U.monkey, usedIn: [5] },
  { n: 23, title: "Michigan State University Extension: Eye contact, don't make these mistakes", domain: "canr.msu.edu", url: U.msu, usedIn: [4] },
  { n: 24, title: "Verywell Mind: How do I maintain good eye contact?", domain: "verywellmind.com", url: U.verywell, usedIn: [4] },
  { n: 25, title: "Moxie Institute: How to Structure a Speech", domain: "moxieinstitute.com", url: U.moxie, usedIn: [6] },
  { n: 27, title: "The Rheumatologist: Rosenbaum's 5 Rules for Public Speaking", domain: "the-rheumatologist.org", url: U.rheum, usedIn: [6] },
  { n: 28, title: "Genard Method: The Six Rules of Effective Public Speaking", domain: "genardmethod.com", url: U.genard, usedIn: [6] },
  { n: 29, title: "Simon Sinek: Simon's #1 Rule of Public Speaking", domain: "linkedin.com", url: U.sinek, usedIn: [6] },
  { n: 30, title: "Joe Yazbeck: The 5 C's of a Commanding Speaker", domain: "linkedin.com", url: U.yazbeck, usedIn: [6] },
  { n: 31, title: "Vista Projects: Effective Communication (5 C's)", domain: "vistaprojects.com", url: U.vista, usedIn: [6] },
  { n: 32, title: "Lemonade Day: Public Speaking for Kids (5 P's de la voz)", domain: "lemonadeday.org", url: U.lemonade, usedIn: [5] },
  { n: 33, title: "r/ConnectBetter: The 3:2:1 speaking trick", domain: "reddit.com", url: U.reddit321, usedIn: [6, 8] },
  { n: 34, title: "American School Counselor Association: Coping with Student Anxiety (4-7-8)", domain: "schoolcounselor.org", url: U.schoolcounselor, usedIn: [7] },
  { n: 35, title: "University of Iowa Counseling: 30 Ways to Manage Speaking Anxiety", domain: "counseling.uiowa.edu", url: U.uiowa, usedIn: [7] },
  { n: 36, title: "Journal of Further and Higher Education: definición de glosofobia", domain: "tandfonline.com", url: U.tandf, usedIn: [7] },
  { n: 37, title: "Acta Psychologica: edad y ansiedad de hablar en público", domain: "sciencedirect.com", url: U.sciYoung, usedIn: [7] },
  { n: 38, title: "MentalHealth.com: exposición gradual", domain: "mentalhealth.com", url: U.mentalhealth, usedIn: [3] },
  { n: 39, title: "Shola Kaye: Top 5 problems people have with public speaking", domain: "sholakaye.com", url: U.sholakaye, usedIn: [4] },
  { n: 41, title: "SLCC Pressbooks: Visual aids (COMM 1020)", domain: "slcc.pressbooks.pub", url: U.slcc, usedIn: [9] },
  { n: 42, title: "Using SMART goals to help with public speaking anxiety", domain: "medium.com", url: U.smart, usedIn: [3] },
  { n: 43, title: "AmberWillo: 10 Public Speaking Tips (página hermana en inglés, datos de Confidently)", domain: "amberwillo.com", url: U.sibling, usedIn: [1, 3, 5, 10] },
];

const sources = sources0.map((x, i) => ({ ...x, n: i + 1 }));

// ---------- copy ----------
const meta = {
  title: "Public Speaking Tips: 10 consejos para hablar en público",
  description: "Public speaking tips en español de México: 10 consejos para hablar en público con confianza, con cifras verificadas de NIH, Mayo Clinic, Harvard y ADAA, y una prueba gratis de 30 segundos.",
  ogTitle: "Public Speaking Tips: 10 consejos para hablar en público con confianza",
  ogDescription: "10 consejos para hablar en público en español de México, cada uno con la acción concreta, el tiempo que toma y la fuente que lo respalda. Incluye una prueba gratis de 30 segundos.",
};

const hero = {
  eyebrow: "Consejos para hablar en público, con fuentes verificadas",
  h1: "Public Speaking Tips: 10 consejos para hablar en público con confianza",
  lead: "Los mejores public speaking tips para México se resumen en tres cosas: practica en voz alta con un poco de presión real, conoce a tu público y controla el ritmo de tu voz. El miedo a hablar en público, la glosofobia, es lo más normal del mundo: cerca del 77% de la población lo siente, según un estudio publicado en PubMed Central, la biblioteca médica de los NIH. La buena noticia es que hablar en público se entrena como cualquier otra habilidad. Aquí tienes 10 consejos para hablar en público con confianza, cada uno con una acción concreta, el tiempo que toma y la fuente que lo respalda.",
  updated: TODAY,
  readingMinutes: 0, // filled below
  sourcesCount: sources.length,
  ctaText: "Hacer la prueba gratis de 30 segundos",
};

const stats = [
  { value: "77%", label: "de la población le teme a hablar en público", source: "PubMed Central (NIH)", sourceUrl: U.pmc77, factId: "52314" },
  { value: "+6.6%", label: "de confianza entre la sesión 6 y la 10, en 8,184 prácticas calificadas por Confidently", source: "Confidently", sourceUrl: U.sibling, factId: "confidently-page" },
  { value: "154 a 201", label: "palabras por minuto: el rango de velocidad de las TED Talks", source: "VirtualSpeech", sourceUrl: U.virtualspeech, factId: "S#63684647" },
  { value: "50/70", label: "regla del contacto visual: mira a los ojos el 50% del tiempo cuando hablas y el 70% cuando escuchas", source: "Michigan State University Extension", sourceUrl: U.msu, factId: "S#63596430" },
];

const tips = [
  {
    n: 1,
    id: "practica-con-confidently",
    h2: "1. Practica hablar con confianza usando Confidently",
    paragraphs: [
      "Hablar en voz alta, verte después en video y corregir una cosa concreta es la forma más rápida de mejorar al hablar en público. Leer tus notas otra vez entrena la memoria; la entrega se entrena hablando en tiempo real, con un poco de presión real encima.",
      "Funciona más rápido de lo que la mayoría espera. En 8,184 sesiones de práctica calificadas por Confidently, los participantes promediaron una confianza 6.6% más alta entre su sexta y décima sesión que en la primera: de 6.22 a 6.63 en una escala de 10. Casi seis de cada diez personas que practicaron al menos seis veces superaron su primera grabación.",
      "Haz cada intento corto. La claridad alcanza su punto más alto en prácticas de 20 a 59 segundos y baja en las que pasan de un minuto. Una repetición de 50 segundos que repites cinco veces te enseña más que un ensayo largo que nunca revisas.",
      "La parte difícil es la retroalimentación. Eres un juez parcial de tu propia entrega: casi todos se avergüenzan y dejan de ver el video, o lo ven completo y no notan nada. La cámara del celular te da la grabación, pero no te dice qué corregir. Confidently cierra ese hueco con una prueba gratis en el navegador: recibes dos palabras al azar, hablas 30 segundos en voz alta metiendo las dos en lo que dices, y la app califica tu voz y tu cara en una escala de 10, cuenta tus muletillas y te nombra la única cosa que debes corregir primero.",
    ],
    callout: { value: "+6.6%", text: "de confianza entre la sesión 6 y la 10, en 8,184 prácticas calificadas por Confidently: de 6.22 a 6.63 en una escala de 10.", source: "Confidently", sourceUrl: U.sibling },
    checklist: null,
    quote: null,
    cta: { text: "Hacer la prueba gratis de 30 segundos", href: CTA },
  },
  {
    n: 2,
    id: "conoce-a-tu-publico",
    h2: "2. Conoce a tu público y conecta con él",
    paragraphs: [
      "Tu público es el grupo de personas que va a escuchar tu mensaje. Conocerlo es un pilar de la oratoria: Harvard lo pone entre sus diez consejos, y un artículo en PubMed Central señala que conocerlo hace el mensaje más pertinente y personal.",
      "La Universidad de Pittsburgh lo llama análisis de audiencia: identificar quién te escucha y adaptar el discurso a sus intereses, su nivel de comprensión, sus actitudes y sus creencias. Un curso abierto de Texas lo divide en cinco categorías: situación, demografía, psicología, cultura e interés previo por el tema.",
      "Qué hacer: antes de escribir una línea, dedica diez minutos a responder las cinco preguntas de abajo. Después habla con ellos, no hacia ellos: Harvard recomienda pronombres inclusivos como \"nosotros\" para crear vínculo desde la primera frase.",
    ],
    callout: { value: "5", text: "categorías de análisis de audiencia: situación, demografía, psicología, cultura e interés previo por el tema.", source: "OERTx, Texas Higher Education", sourceUrl: U.oertx },
    checklist: [
      "¿Cuántas personas son y en qué lugar te van a escuchar?",
      "¿Qué edad, ocupación y contexto cultural tienen?",
      "¿Qué saben ya del tema?",
      "¿Qué esperan llevarse de tu presentación?",
      "¿Qué actitud traen hacia el tema: a favor, en contra o neutral?",
    ],
    quote: null,
    cta: null,
  },
  {
    n: 3,
    id: "practica-con-exposicion-realista",
    h2: "3. Public speaking tips que sí funcionan: practica con exposición realista",
    paragraphs: [
      "Practicar con exposición realista es la forma más confiable de mejorar: las habilidades de un buen orador se aprenden haciendo la cosa real, seguido. Mayo Clinic resume el camino en tres pasos: prepararte, practicar y pedir ayuda si la práctica sola se queda corta.",
      "Empieza chiquito y desde tu casa. Purdue Global recomienda practicar en voz alta, y la Universidad de Pittsburgh sugiere cronometrar cada ensayo. Di tu apertura solo, luego frente a un amigo de confianza, luego ante un grupo pequeño: eso es exposición gradual. Un estudio en PubMed Central encontró que practicar frente a un público virtual que te apoya mejora la evaluación de tu confianza en la vida real.",
      "Cuánto tiempo: 5 minutos al día en voz alta es una meta realista y medible. Si prefieres un grupo, Mayo Clinic menciona clubes como Toastmasters International. Y para practicar frente a personas reales desde tu casa está AmberWillo, la página hermana de esta guía en inglés.",
    ],
    callout: { value: "6 de 10", text: "Casi seis de cada diez personas que practicaron al menos seis veces con Confidently superaron la puntuación de su primera grabación.", source: "Confidently", sourceUrl: U.sibling },
    checklist: null,
    quote: null,
    cta: null,
  },
  {
    n: 4,
    id: "lenguaje-corporal",
    h2: "4. Usa un lenguaje corporal claro y abierto",
    paragraphs: [
      "Tu cuerpo habla antes que tu boca. Harvard señala que la credibilidad en un discurso viene de tres cosas: lenguaje corporal abierto y amable, un ritmo pausado y contacto visual sostenido.",
      "Qué hacer: párate derecho, con los hombros hacia atrás y los brazos sueltos. Usa gestos abiertos, con las palmas visibles, cuando quieras subrayar una idea. Ensaya frente al espejo para ver tu postura y tus gestos, un consejo que repiten coaches como Shola Kaye.",
      "Con la mirada, usa la regla 50/70 que recomienda la Extensión de Michigan State University: mira a los ojos alrededor del 50% del tiempo cuando hablas y el 70% cuando escuchas. Sostén la mirada con una persona de 3 a 5 segundos, lo que dura una frase, y cambia de zona.",
    ],
    callout: { value: "50/70", text: "regla del contacto visual: 50% del tiempo cuando hablas, 70% cuando escuchas, con miradas de 3 a 5 segundos por persona.", source: "Michigan State University Extension", sourceUrl: U.msu },
    checklist: null,
    quote: null,
    cta: null,
  },
  {
    n: 5,
    id: "controla-tu-voz",
    h2: "5. Controla tu voz: ritmo, volumen y tono",
    paragraphs: [
      "Tu voz es tu herramienta principal. Purdue Global recomienda variar la velocidad a la que hablas: baja el ritmo en un punto clave y acelera un poco en la información secundaria.",
      "Las cifras ayudan a calibrar. Una velocidad cómoda para presentaciones está entre 100 y 150 palabras por minuto, y las TED Talks promedian 173, con un rango de 154 a 201, según VirtualSpeech (medido en inglés). Un rango recomendado va de 120 a 170. Por encima de 180 palabras por minuto la comprensión baja. Grábate 1 minuto, cuenta las palabras y ya sabes dónde estás.",
      "El ritmo es además la señal que más pesa: en las 8,184 sesiones calificadas por Confidently, la confianza promedio subió de 5.52 en la banda de ritmo más baja a 6.68 en la más alta. Para el volumen y el tono, usa las cinco P de la voz: tono (pitch), ritmo (pace), pausa, proyección y pasión. Ajusta el volumen al tamaño del lugar y súbelo en las frases que importan.",
    ],
    callout: { value: "173 ppm", text: "palabras por minuto en promedio en las TED Talks (rango de 154 a 201); una presentación cómoda va de 100 a 150.", source: "VirtualSpeech", sourceUrl: U.virtualspeech },
    checklist: null,
    quote: null,
    cta: null,
  },
  {
    n: 6,
    id: "apertura-fuerte",
    h2: "6. Empieza fuerte con una apertura que atrape",
    paragraphs: [
      "Las primeras palabras que salen de tu boca son las más importantes: así resume el Dr. Rosenbaum su regla número uno. El Moxie Institute lo mide: tienes los primeros 30 segundos para dar un gancho convincente, y justo después debes dejar clarísimo tu mensaje central.",
      "Qué hacer: escribe tu apertura completa y apréndetela. Tres opciones que funcionan: un dato que sorprenda, una pregunta directa al público o una historia corta de 3 o 4 frases. Después di en una frase de qué trata tu charla y qué se van a llevar.",
      "Para el resto, usa la regla 3:2:1: las tres cosas más importantes que quieres que recuerden, respaldadas con dos ejemplos concretos. Esa estructura te quita el rollo y te da claridad bajo presión. Cuánto tiempo: escribir y memorizar una apertura de 30 segundos toma unos veinte minutos.",
    ],
    callout: { value: "30 s", text: "Los primeros 30 segundos deciden si el público se engancha: ahí va el gancho, y justo después tu mensaje central.", source: "Moxie Institute", sourceUrl: U.moxie },
    checklist: null,
    quote: null,
    cta: null,
  },
  {
    n: 7,
    id: "calma-los-nervios",
    h2: "7. Calma los nervios con respiración y mentalidad",
    paragraphs: [
      "Los nervios son normales: Harvard lo dice en su primer consejo, y Mayo Clinic describe el miedo a hablar en público como una forma común de ansiedad de desempeño. Los síntomas típicos, según la Universidad de Pittsburgh: temblor, sudor, boca seca, latidos rápidos y voz aguda. Cerca del 77% de la población siente este miedo, y entre 15% y 30% tiene ansiedad de hablar en público como tal, según estudios en PubMed Central.",
      "Qué hacer con el cuerpo: Mayo Clinic recomienda dos o más respiraciones profundas y lentas antes de empezar y durante el discurso. Si quieres conteo, usa la 4-7-8: inhala por la nariz 4 segundos, sostén 7 y exhala por la boca 8. La ADAA (Anxiety and Depression Association of America) suma yoga, meditación y limitar la cafeína, y la consejería de la Universidad de Iowa señala que el ejercicio aeróbico diario puede recortar la ansiedad hasta 50%.",
      "Qué hacer con la cabeza: visualiza que sale bien y enfócate en tu capacidad para manejar la situación, como aconseja la ADAA. Si la práctica sola se queda corta, Mayo Clinic indica que la terapia cognitivo conductual alivia este miedo; un metaanálisis en PubMed Central encontró un efecto grande de las intervenciones psicológicas (g de Hedges de 0.74). Cuánto tiempo: dos minutos de respiración antes de entrar cambian cómo sale tu voz.",
    ],
    callout: { value: "15% a 30%", text: "de la población tiene ansiedad de hablar en público; hasta 10% dice que le interfiere con el trabajo o los estudios.", source: "PubMed Central (NIH), PMC4763377", sourceUrl: U.pmc1530 },
    checklist: null,
    quote: { text: "About 77% of the general population fears public speaking.", cite: "PMC3647380, PubMed Central (NIH)", url: U.pmc77 },
    cta: null,
  },
  {
    n: 8,
    id: "historias-y-humor",
    h2: "8. Usa historias y humor para que te recuerden",
    paragraphs: [
      "Las historias y el humor son la forma más directa de que tu mensaje se quede. Harvard lo incluye entre sus diez consejos: usar humor, contar historias y dejar que tu personalidad se note atrapa la atención y le da un toque personal a la charla.",
      "Qué hacer: elige una historia personal que conecte con algo que tu público también ha vivido. Cuéntala con principio, problema y resultado, en menos de un minuto. Mete el humor dentro de la historia, en una observación que cause gracia, en lugar de un chiste suelto.",
      "Cuánto tiempo: una historia de un minuto por cada idea clave. Con la regla 3:2:1 del consejo 6, tus dos ejemplos por idea pueden ser dos historias cortas.",
    ],
    callout: null,
    checklist: null,
    quote: null,
    cta: null,
  },
  {
    n: 9,
    id: "apoyos-visuales",
    h2: "9. Usa apoyos visuales que sumen a tu mensaje",
    paragraphs: [
      "Un apoyo visual es cualquier objeto, imagen, diapositiva o demostración que refuerza lo que dices. La Universidad de Pittsburgh explica que los apoyos visuales ayudan muchísimo a la efectividad de un discurso cuando complementan la charla en lugar de sustituirla. American Public University agrega que un apoyo visual alivia la ansiedad.",
      "Qué hacer: haz que cada visual sea de verdad visual, con una imagen o una gráfica en lugar de párrafos. Babson lo resume: mantenlos simples. Harvard pide que cada apoyo cumpla una de dos funciones: aclarar el contenido o captar y sostener la atención.",
      "Antes de empezar, deja todo montado y probado: Pittsburgh recomienda instalar el apoyo visual antes del discurso. Cuánto tiempo: llega quince minutos antes para conectar, proyectar y ver una diapositiva desde el fondo.",
    ],
    callout: null,
    checklist: [
      "Una idea por diapositiva.",
      "Imagen o gráfica en lugar de texto.",
      "Letra legible desde la última fila.",
      "Equipo conectado y probado antes de empezar.",
    ],
    quote: null,
    cta: null,
  },
  {
    n: 10,
    id: "pide-retroalimentacion",
    h2: "10. Pide retroalimentación y úsala para mejorar",
    paragraphs: [
      "La retroalimentación es tu brújula. Purdue Global recomienda pedirla para sostener la práctica y el crecimiento, y un artículo en PubMed Central la define como información que pides con el objetivo de mejorar tu desempeño. Harvard lo cierra: mejorar al hablar en público es un proceso continuo, y la meta es avanzar.",
      "Qué hacer durante la charla: observa las señales del público y adapta sobre la marcha, como recomienda Harvard. Qué hacer después: pídele a una persona de confianza un comentario concreto sobre una sola cosa (el ritmo, la mirada, las muletillas).",
      "Qué hacer cuando estás solo: grábate y califícate. Confidently hace justo eso en 30 segundos: califica tu voz y tu cara en una escala de 10, cuenta tus muletillas y te nombra la única cosa que debes corregir primero. Repite la prueba tras cada bloque de práctica y compara.",
    ],
    callout: { value: "1", text: "Confidently te nombra la única cosa que debes corregir primero, para que cada práctica tenga un objetivo.", source: "Confidently", sourceUrl: U.sibling },
    checklist: null,
    quote: null,
    cta: { text: "Hacer la prueba gratis de 30 segundos", href: CTA },
  },
];

const faq = [
  {
    q: "¿Cuáles son las 5 C de hablar en público?",
    a: "Las 5 C son un marco para evaluar la entrega de un discurso. La versión más citada, del coach Joe Yazbeck, es: cómodo, cercano (caring), confiado, creíble y carismático. Otras listas añaden claridad, cohesión y concisión.",
  },
  {
    q: "¿Qué es la regla 3:2:1 para hablar?",
    a: "Es una estructura para dejar de divagar: piensa en las tres cosas más importantes que quieres que recuerden y respáldalas con dos ejemplos concretos. El mismo principio aplica al ensayo: en las 8,184 sesiones calificadas por Confidently, la claridad fue más alta en prácticas de 20 a 59 segundos que en las de más de un minuto.",
  },
  {
    q: "¿Qué es la glosofobia y qué tan común es?",
    a: "Glosofobia es el nombre técnico del miedo a hablar en público: una ansiedad social específica que aparece al dar una presentación, real o anticipada, y que el DSM-5 clasifica dentro de la ansiedad social. Cerca del 77% de la población siente este miedo en algún grado, y entre 15% y 30% tiene ansiedad de hablar en público como tal, según estudios en PubMed Central. Los adultos jóvenes la sufren más que los mayores.",
  },
  {
    q: "¿Cuál es la regla número 1 para hablar en público?",
    a: "Depende de a quién le preguntes. Gary Genard dice que es hacer del público el centro de tu universo. El Dr. Rosenbaum dice que las primeras palabras son las más importantes. Simon Sinek dice que tienes que llegar a dar. Con datos, es el ritmo: en 8,184 sesiones calificadas por Confidently, el ritmo fue la señal más ligada a sonar seguro, con la confianza promedio subiendo de 5.52 a 6.68 entre la banda más baja y la más alta.",
  },
  {
    q: "¿A qué velocidad debo hablar en una presentación?",
    a: "Una velocidad cómoda para presentaciones está entre 100 y 150 palabras por minuto, y un rango recomendado va de 120 a 170. Las TED Talks promedian 173, con un rango de 154 a 201. Estas cifras se midieron en inglés; en español, cuenta las palabras de 1 minuto de tu propia grabación y ajusta.",
  },
  {
    q: "¿Cuáles son las 5 P de hablar en público?",
    a: "Hay dos versiones. La de preparación: propósito, pasión, preparación, práctica y presentación (performance). La de la voz: tono (pitch), ritmo (pace), pausa, proyección y pasión. Las dos sirven como lista de revisión antes de una charla.",
  },
];

const headings = {
  stats: "Las cifras que importan",
  tips: "Los 10 consejos",
  faq: "Preguntas frecuentes sobre hablar en público",
  sources: "Fuentes",
};

const closing = {
  h2: "Escucha qué tan seguro suenas en realidad",
  text: "Una prueba gratis de 30 segundos califica tu voz y tu cara, y te muestra la única cosa que debes practicar después. Es privada: solo tú ves tu resultado. Hablas 30 segundos, esperas el análisis y recibes tu puntuación.",
  ctaText: "Hacer la prueba gratis de 30 segundos",
  ctaHref: CTA,
};

// ---------- fact ledger ----------
const factLedger = [
  // Confidently (sibling page)
  { claim: "8,184 sesiones de práctica calificadas por Confidently", factId: "confidently-page", source: "Confidently (AmberWillo tips page)", url: U.sibling },
  { claim: "puntuación de confianza 6.6% más alta entre su sexta y décima sesión que en la primera; entre la sesión 6 y la 10", factId: "confidently-page", source: "Confidently (AmberWillo tips page)", url: U.sibling },
  { claim: "subieron de 6.22 a 6.63 en una escala de 10", factId: "confidently-page", source: "Confidently (AmberWillo tips page)", url: U.sibling },
  { claim: "Casi seis de cada diez (6 de 10) personas que practicaron al menos seis veces superaron su primera grabación", factId: "confidently-page", source: "Confidently (AmberWillo tips page)", url: U.sibling },
  { claim: "Las puntuaciones de claridad alcanzan su punto más alto en prácticas de 20 a 59 segundos y bajan en las que pasan de un minuto (1 minuto)", factId: "confidently-page", source: "Confidently (AmberWillo tips page)", url: U.sibling },
  { claim: "Una repetición de 50 segundos que repites cinco veces", factId: "confidently-page", source: "Confidently (AmberWillo tips page)", url: U.sibling },
  { claim: "el ritmo fue el factor más ligado a sonar seguro: la confianza promedio subió de 5.52 a 6.68", factId: "confidently-page", source: "Confidently (AmberWillo tips page)", url: U.sibling },
  { claim: "dos palabras al azar, hablas 30 segundos, califica tu voz y tu cara en una escala de 10, cuenta tus muletillas y te nombra la única cosa (1) que debes corregir primero; prueba gratis de 30 segundos", factId: "confidently-page", source: "Confidently (AmberWillo tips page)", url: U.sibling },
  { claim: "AmberWillo, la página hermana en inglés, está preparando sesiones en línea diarias con gente de todo el mundo", factId: "confidently-page", source: "AmberWillo tips page", url: U.sibling },
  { claim: "10 consejos para hablar en público (esta guía; Harvard también publica diez consejos)", factId: "37748", source: "professional.dce.harvard.edu", url: U.harvard10 },
  // Prevalence / glossophobia
  { claim: "cerca del 77% de la población le teme a hablar en público", factId: "52314", source: "pmc.ncbi.nlm.nih.gov (PMC3647380)", url: U.pmc77 },
  { claim: "About 77% of the general population fears public speaking. (quote)", factId: "52314", source: "pmc.ncbi.nlm.nih.gov (PMC3647380)", url: U.pmc77 },
  { claim: "entre 15% y 30% de la población tiene ansiedad de hablar en público (15% a 30%)", factId: "40207", source: "pmc.ncbi.nlm.nih.gov (PMC4763377)", url: U.pmc1530 },
  { claim: "hasta 10% de quienes tienen ansiedad de hablar en público dice que le interfiere con el trabajo o los estudios", factId: "S#63545497", source: "pmc.ncbi.nlm.nih.gov (PMC4763377)", url: U.pmc1530 },
  { claim: "el DSM-5 clasifica la ansiedad de hablar en público dentro de la ansiedad social", factId: "S#63512929", source: "pmc.ncbi.nlm.nih.gov (PMC4763377)", url: U.pmc1530 },
  { claim: "Glosofobia es el miedo a hablar en público, o a hablar en general", factId: "52936", source: "tandfonline.com", url: U.tandf },
  { claim: "ansiedad social específica que aparece al dar una presentación, real o anticipada", factId: "52929", source: "tandfonline.com", url: U.tandf },
  { claim: "Los adultos jóvenes la sufren más que los mayores", factId: "58648", source: "sciencedirect.com", url: U.sciYoung },
  { claim: "metaanálisis: efecto grande de las intervenciones psicológicas, g de Hedges de 0.74", factId: "S#63630052", source: "pmc.ncbi.nlm.nih.gov (PMC6428748)", url: U.pmcMeta },
  { claim: "Mayo Clinic: el miedo a hablar en público es una forma común de ansiedad de desempeño", factId: "4858", source: "mayoclinic.org", url: U.mayo },
  { claim: "Universidad de Pittsburgh: síntomas temblor, sudor, mariposas en el estómago, boca seca, latidos rápidos y voz aguda", factId: "40337", source: "comm.pitt.edu", url: U.pittAnx },
  { claim: "Harvard: los nervios son normales", factId: "19556", source: "professional.dce.harvard.edu", url: U.harvard10 },
  // Breathing / mindset
  { claim: "Mayo Clinic: tomar dos o más respiraciones profundas y lentas", factId: "22816", source: "mayoclinic.org", url: U.mayo },
  { claim: "Mayo Clinic: la respiración profunda calma antes y durante el discurso", factId: "1649", source: "mayoclinic.org", url: U.mayo },
  { claim: "técnica 4-7-8: inhala por la nariz 4 segundos, sostén 7 y exhala por la boca 8", factId: "19472442", source: "kb (sin URL); nombre de la técnica respaldado por schoolcounselor.org #58752", url: U.schoolcounselor },
  { claim: "ADAA: respiración profunda, yoga y meditación", factId: "33107", source: "adaa.org", url: U.adaa },
  { claim: "ADAA: limitar la cafeína", factId: "59664", source: "adaa.org", url: U.adaa },
  { claim: "ADAA: visualizar que sale bien y enfocarte en tu capacidad para manejar la situación", factId: "63564873", source: "adaa.org", url: U.adaa },
  { claim: "Universidad de Iowa: el ejercicio aeróbico diario puede recortar la ansiedad hasta 50%", factId: "S#63607209", source: "counseling.uiowa.edu", url: U.uiowa },
  { claim: "Mayo Clinic: la terapia cognitivo conductual alivia el miedo a hablar en público", factId: "2704", source: "mayoclinic.org", url: U.mayo },
  { claim: "Mayo Clinic: prepararte, practicar y pedir ayuda", factId: "3012", source: "mayoclinic.org", url: U.mayo },
  { claim: "Mayo Clinic: ayuda profesional si la práctica sola se queda corta", factId: "3472", source: "mayoclinic.org", url: U.mayo },
  { claim: "Mayo Clinic menciona clubes como Toastmasters International", factId: "14569", source: "mayoclinic.org", url: U.mayo },
  // Practice
  { claim: "Purdue Global: practicar el discurso en voz alta", factId: "29147", source: "purdueglobal.edu", url: U.purdue },
  { claim: "Universidad de Pittsburgh: cronometrar cada ensayo para caber en el tiempo asignado", factId: "53770", source: "comm.pitt.edu", url: U.pittAnx },
  { claim: "exposición gradual: arrancar con situaciones pequeñas", factId: "32901", source: "mentalhealth.com", url: U.mentalhealth },
  { claim: "practicar frente a un público virtual que te apoya mejora la evaluación de tu confianza en la vida real", factId: "54653", source: "pmc.ncbi.nlm.nih.gov (PMC10460391)", url: U.pmcVirtual },
  { claim: "5 minutos al día de práctica es una meta medible", factId: "S#63671915", source: "medium.com (SMART goals)", url: U.smart },
  // Audience
  { claim: "Harvard: conocer a tu público entre sus diez consejos", factId: "44107", source: "professional.dce.harvard.edu", url: U.harvard10 },
  { claim: "PubMed Central: conocer a tu audiencia hace el mensaje más pertinente y personal", factId: "63654508", source: "pmc.ncbi.nlm.nih.gov (PMC6505544)", url: U.pmcAudience },
  { claim: "Pittsburgh: análisis de audiencia = intereses, nivel de comprensión, actitudes y creencias", factId: "14946", source: "comm.pitt.edu", url: U.pittAud },
  { claim: "Pittsburgh: tamaño del grupo", factId: "43405", source: "comm.pitt.edu", url: U.pittAud },
  { claim: "Pittsburgh: lo que ya saben del tema", factId: "45412", source: "comm.pitt.edu", url: U.pittAud },
  { claim: "Pittsburgh: lo que esperan de ti", factId: "45410", source: "comm.pitt.edu", url: U.pittAud },
  { claim: "cinco (5) categorías: situación, demografía, psicología, cultura e interés previo por el tema", factId: "14924", source: "oertx.highered.texas.gov", url: U.oertx },
  { claim: "Harvard: pronombres inclusivos como nosotros para crear vínculo", factId: "43442", source: "professional.dce.harvard.edu", url: U.harvardAud },
  // Body language / eye contact
  { claim: "Harvard: credibilidad = lenguaje corporal abierto y amable, ritmo pausado y contacto visual", factId: "38253", source: "professional.dce.harvard.edu", url: U.harvardCred },
  { claim: "Shola Kaye: pararse derecho, contacto visual, gestos con propósito y ensayar frente al espejo", factId: "55225", source: "sholakaye.com", url: U.sholakaye },
  { claim: "regla 50/70 del contacto visual (Michigan State University Extension)", factId: "S#63596430", source: "canr.msu.edu", url: U.msu },
  { claim: "50% del tiempo cuando hablas y 70% cuando escuchas", factId: "S#16922169", source: "pos repository (sin URL); 50% al hablar también en verywellmind S#63646530", url: U.verywell },
  { claim: "sostén la mirada con una persona de 3 a 5 segundos", factId: "40991370", source: "kb (sin URL); MSU indica 4-5 segundos (S#63596431)", url: U.msu },
  // Voice
  { claim: "Purdue Global: variar la velocidad a la que hablas", factId: "19579", source: "purdueglobal.edu", url: U.purdue },
  { claim: "velocidad cómoda para presentaciones entre 100 y 150 palabras por minuto (100 a 150)", factId: "S#11757", source: "virtualspeech.com", url: U.virtualspeech },
  { claim: "las TED Talks promedian 173 palabras por minuto (173 ppm)", factId: "S#63684786", source: "virtualspeech.com", url: U.virtualspeech },
  { claim: "rango de 154 a 201 palabras por minuto en TED Talks", factId: "S#63684647", source: "virtualspeech.com", url: U.virtualspeech },
  { claim: "rango recomendado de 120 a 170 palabras por minuto", factId: "S#63684768", source: "100monkey.co.uk", url: U.monkey },
  { claim: "por encima de 180 la comprensión baja", factId: "web:933152367:30:web:9", source: "kb (sin URL)", url: "" },
  { claim: "cinco P de la voz: tono (pitch), ritmo (pace), pausa, proyección y pasión", factId: "58252", source: "lemonadeday.org", url: U.lemonade },
  { claim: "5 P de preparación: propósito, pasión, preparación, práctica y presentación (performance)", factId: "14455025", source: "kb (sin URL)", url: "" },
  // Opening
  { claim: "Dr. Rosenbaum: las primeras palabras que salen de tu boca son las más importantes (regla número 1)", factId: "12809", source: "the-rheumatologist.org", url: U.rheum },
  { claim: "Moxie Institute: gancho convincente en los primeros 30 segundos (30 s)", factId: "63655174", source: "moxieinstitute.com", url: U.moxie },
  { claim: "Moxie Institute: claridad inmediata sobre el mensaje central después del gancho", factId: "63655175", source: "moxieinstitute.com", url: U.moxie },
  { claim: "historia corta de 3 o 4 frases (guía editorial, sin cifra de fuente)", factId: "editorial", source: "editorial", url: "" },
  { claim: "regla 3:2:1: tres cosas más importantes que recuerden (3 puntos clave) y dos ejemplos (2 ejemplos); quita el rollo; claridad y confianza", factId: "52378", source: "reddit.com r/ConnectBetter; también #13696, #57950, #28705, #28707", url: U.reddit321 },
  { claim: "consejo 6 (referencia interna a la sección 6)", factId: "internal", source: "esta página", url: "" },
  // Stories
  { claim: "Harvard: usar humor, contar historias y dejar que tu personalidad se note; capta la atención y da un toque personal", factId: "40948", source: "professional.dce.harvard.edu", url: U.harvard10 },
  { claim: "Harvard: dejar que tu personalidad se note", factId: "24288", source: "professional.dce.harvard.edu", url: U.harvard10 },
  { claim: "historias personales y cercanas que conecten con experiencias compartidas", factId: "63507800", source: "medium.com", url: "https://medium.com/change-your-mind/barack-obamas-top-3-speaking-techniques-no-b-s-69029650377a" },
  // Visual aids
  { claim: "Pittsburgh: los apoyos visuales pueden ayudar muchísimo a la efectividad del discurso", factId: "63523287", source: "comm.pitt.edu", url: U.pittVis },
  { claim: "Pittsburgh: deben complementar el discurso", factId: "63523292", source: "comm.pitt.edu", url: U.pittVis },
  { claim: "Pittsburgh: instalar el apoyo visual antes del discurso", factId: "63522949", source: "comm.pitt.edu", url: U.pittVis },
  { claim: "American Public University: un apoyo visual alivia la ansiedad", factId: "31975", source: "apu.apus.edu", url: U.apu },
  { claim: "Babson: mantener los apoyos visuales simples", factId: "8777", source: "entrepreneurship.babson.edu", url: U.babson },
  { claim: "Harvard: apoyos audiovisuales para aclarar el contenido o captar y sostener la atención", factId: "12277", source: "professional.dce.harvard.edu", url: U.harvard10 },
  // Feedback
  { claim: "Purdue Global: pedir retroalimentación para sostener la práctica y el crecimiento", factId: "63610940", source: "purdueglobal.edu", url: U.purdueGrowth },
  { claim: "PubMed Central: búsqueda de retroalimentación con el objetivo específico de mejorar la habilidad o el desempeño", factId: "63623885", source: "pmc.ncbi.nlm.nih.gov (PMC9355701)", url: U.pmcFeedback },
  { claim: "Harvard: mejorar es un proceso continuo, la meta es avanzar y no la perfección", factId: "63510680", source: "professional.dce.harvard.edu", url: U.harvard10 },
  { claim: "Harvard: observar las señales del público y adaptar", factId: "28635", source: "professional.dce.harvard.edu", url: U.harvard10 },
  // FAQ entities
  { claim: "5 C de Joe Yazbeck: cómodo, cercano (caring), confiado, creíble y carismático", factId: "33879", source: "linkedin.com (Joe Yazbeck)", url: U.yazbeck },
  { claim: "otras listas añaden claridad, cohesión y concisión", factId: "12893", source: "vistaprojects.com; también #12894, #12896", url: U.vista },
  { claim: "Gary Genard: hacer del público el centro de tu universo", factId: "12804", source: "genardmethod.com", url: U.genard },
  { claim: "Simon Sinek: tienes que llegar a dar", factId: "47777", source: "linkedin.com", url: U.sinek },
];

// ---------- JSON-LD ----------
const ORG = SITE + "#organization";
const WEBSITE = SITE + "#website";
const WEBPAGE = SITE + "#webpage";
const ARTICLE = SITE + "#article";

const jsonld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG,
      name: "publicspeakingtips.mx",
      url: SITE,
      logo: { "@type": "ImageObject", url: SITE + "icon.png" },
      sameAs: [SIBLING],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      name: "publicspeakingtips.mx",
      url: SITE,
      inLanguage: "es-MX",
      publisher: { "@id": ORG },
    },
    {
      "@type": "WebPage",
      "@id": WEBPAGE,
      url: SITE,
      name: meta.title,
      description: meta.description,
      inLanguage: "es-MX",
      isPartOf: { "@id": WEBSITE },
      about: { "@id": ARTICLE },
      breadcrumb: { "@id": SITE + "#breadcrumb" },
      datePublished: TODAY,
      dateModified: TODAY,
    },
    {
      "@type": "Article",
      "@id": ARTICLE,
      headline: hero.h1,
      description: meta.description,
      inLanguage: "es-MX",
      url: SITE,
      mainEntityOfPage: { "@id": WEBPAGE },
      datePublished: TODAY,
      dateModified: TODAY,
      author: { "@id": ORG },
      publisher: { "@id": ORG },
      keywords: [
        "public speaking tips",
        "consejos para hablar en público",
        "tips para hablar en público",
        "oratoria",
        "miedo a hablar en público",
        "glosofobia",
        "hablar en público con confianza",
      ],
      about: [
        { "@type": "Thing", name: "Public speaking", sameAs: "https://www.wikidata.org/wiki/Q181839" },
        { "@type": "Thing", name: "Glosofobia", sameAs: "https://www.wikidata.org/wiki/Q1531181" },
      ],
      citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
      hasPart: { "@id": SITE + "#consejos" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": SITE + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Public speaking tips", item: SITE },
      ],
    },
    {
      "@type": "ItemList",
      "@id": SITE + "#consejos",
      name: "10 consejos para hablar en público",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: tips.length,
      itemListElement: tips.map((t) => ({
        "@type": "ListItem",
        position: t.n,
        name: t.h2.replace(/^\d+\.\s*/, ""),
        url: SITE + "#" + t.id,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": SITE + "#faq",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// ---------- word count and reading time ----------
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
let total = words(hero.lead);
for (const t of tips) {
  total += words(t.h2) + t.paragraphs.reduce((a, p) => a + words(p), 0);
  if (t.callout) total += words(t.callout.text);
  if (t.checklist) total += t.checklist.reduce((a, c) => a + words(c), 0);
}
for (const f of faq) total += words(f.q) + words(f.a);
hero.readingMinutes = Math.max(1, Math.round(total / 200));

const out = { meta, hero, headings, stats, tips, sources, faq, closing, jsonld, factLedger };
fs.mkdirSync("C:/Users/Tyron/publicspeakingtips-mx/content", { recursive: true });
fs.writeFileSync("C:/Users/Tyron/publicspeakingtips-mx/content/copy.json", JSON.stringify(out, null, 2) + "\n", "utf8");
console.log("copy.json written; body words:", total, "reading minutes:", hero.readingMinutes, "sources:", sources.length);
