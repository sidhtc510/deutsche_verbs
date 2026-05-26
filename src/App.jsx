import { useState } from "react";

const persons = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

const MAIN_VERBS = [
  { key: "sein",   label: "sein",   ru: "быть",  color: "#1d4ed8" },
  { key: "werden", label: "werden", ru: "стать",  color: "#15803d" },
  { key: "haben",  label: "haben",  ru: "иметь",  color: "#6d28d9" },
];

const MODAL_VERBS = [
  { key: "wollen",  label: "wollen",  ru: "хотеть",         color: "#b91c1c" },
  { key: "konnen",  label: "können",  ru: "мочь/уметь",     color: "#0369a1" },
  { key: "mussen",  label: "müssen",  ru: "должен (нужно)", color: "#b45309" },
  { key: "durfen",  label: "dürfen",  ru: "можно/нельзя",   color: "#166534" },
  { key: "sollen",  label: "sollen",  ru: "должен (велят)", color: "#7e22ce" },
  { key: "mogen",   label: "mögen",   ru: "нравиться",      color: "#be123c" },
  { key: "mochten", label: "möchten", ru: "хотел бы (вежл)", color: "#0f766e" },
];

const TENSES = [
  {
    key: "prasens", label: "Präsens", sublabel: "есть / сейчас",
    rows: {
      sein:    ["bin","bist","ist","sind","seid","sind"],
      werden:  ["werde","wirst","wird","werden","werdet","werden"],
      haben:   ["habe","hast","hat","haben","habt","haben"],
      wollen:  ["will","willst","will","wollen","wollt","wollen"],
      konnen:  ["kann","kannst","kann","können","könnt","können"],
      mussen:  ["muss","musst","muss","müssen","müsst","müssen"],
      durfen:  ["darf","darfst","darf","dürfen","dürft","dürfen"],
      sollen:  ["soll","sollst","soll","sollen","sollt","sollen"],
      mogen:   ["mag","magst","mag","mögen","mögt","mögen"],
      mochten: ["möchte","möchtest","möchte","möchten","möchtet","möchten"],
    },
    examplesMain: [
      { de: "Ich bin müde.", ru: "Я устал." },
      { de: "Er wird Arzt.", ru: "Он становится врачом." },
      { de: "Wir haben Zeit.", ru: "У нас есть время." },
      { de: "Sie ist zu Hause.", ru: "Она дома." },
      { de: "Das wird besser.", ru: "Это становится лучше." },
    ],
    examplesModal: [
      { de: "Ich will nach Berlin fahren.", ru: "Я хочу поехать в Берлин." },
      { de: "Kannst du mir helfen?", ru: "Ты можешь мне помочь?" },
      { de: "Er muss heute arbeiten.", ru: "Ему нужно работать сегодня." },
      { de: "Hier darf man nicht rauchen.", ru: "Здесь нельзя курить." },
      { de: "Ich möchte einen Kaffee, bitte.", ru: "Мне кофе, пожалуйста." },
    ],
  },
  {
    key: "prateritum", label: "Präteritum", sublabel: "был (письменный)",
    rows: {
      sein:    ["war","warst","war","waren","wart","waren"],
      werden:  ["wurde","wurdest","wurde","wurden","wurdet","wurden"],
      haben:   ["hatte","hattest","hatte","hatten","hattet","hatten"],
      wollen:  ["wollte","wolltest","wollte","wollten","wolltet","wollten"],
      konnen:  ["konnte","konntest","konnte","konnten","konntet","konnten"],
      mussen:  ["musste","musstest","musste","mussten","musstet","mussten"],
      durfen:  ["durfte","durftest","durfte","durften","durftet","durften"],
      sollen:  ["sollte","solltest","sollte","sollten","solltet","sollten"],
      mogen:   ["mochte","mochtest","mochte","mochten","mochtet","mochten"],
      mochten: ["—","—","—","—","—","—"],
    },
    examplesMain: [
      { de: "Ich war gestern zu Hause.", ru: "Вчера я был дома." },
      { de: "Er wurde Lehrer.", ru: "Он стал учителем." },
      { de: "Wir hatten keine Zeit.", ru: "У нас не было времени." },
      { de: "Das Wetter war schön.", ru: "Погода была хорошей." },
      { de: "Sie hatte Angst.", ru: "Она боялась." },
    ],
    examplesModal: [
      { de: "Sie wollte nicht kommen.", ru: "Она не хотела приходить." },
      { de: "Ich konnte nicht schlafen.", ru: "Я не мог спать." },
      { de: "Er musste früh aufstehen.", ru: "Ему нужно было рано вставать." },
      { de: "Wir durften nicht ausgehen.", ru: "Нам нельзя было выходить." },
      { de: "Er sollte um 8 Uhr da sein.", ru: "Он должен был быть там в 8." },
    ],
  },
  {
    key: "perfekt", label: "Perfekt", sublabel: "был (разговорный)",
    rows: {
      sein:    ["bin gewesen","bist gewesen","ist gewesen","sind gewesen","seid gewesen","sind gewesen"],
      werden:  ["bin geworden","bist geworden","ist geworden","sind geworden","seid geworden","sind geworden"],
      haben:   ["habe gehabt","hast gehabt","hat gehabt","haben gehabt","habt gehabt","haben gehabt"],
      wollen:  ["habe gewollt","hast gewollt","hat gewollt","haben gewollt","habt gewollt","haben gewollt"],
      konnen:  ["habe gekonnt","hast gekonnt","hat gekonnt","haben gekonnt","habt gekonnt","haben gekonnt"],
      mussen:  ["habe gemusst","hast gemusst","hat gemusst","haben gemusst","habt gemusst","haben gemusst"],
      durfen:  ["habe gedurft","hast gedurft","hat gedurft","haben gedurft","habt gedurft","haben gedurft"],
      sollen:  ["habe gesollt","hast gesollt","hat gesollt","haben gesollt","habt gesollt","haben gesollt"],
      mogen:   ["habe gemocht","hast gemocht","hat gemocht","haben gemocht","habt gemocht","haben gemocht"],
      mochten: ["—","—","—","—","—","—"],
    },
    examplesMain: [
      { de: "Ich bin in Berlin gewesen.", ru: "Я был в Берлине." },
      { de: "Er ist Arzt geworden.", ru: "Он стал врачом." },
      { de: "Wir haben Glück gehabt.", ru: "Нам повезло." },
      { de: "Sie ist nach Hause gegangen.", ru: "Она пошла домой." },
      { de: "Hast du das gewusst?", ru: "Ты это знал?" },
    ],
    examplesModal: [
      { de: "Sie hat das nicht gewollt.", ru: "Она этого не хотела." },
      { de: "Ich habe das nicht gekonnt.", ru: "Я не смог этого сделать." },
      { de: "Er hat lange arbeiten müssen.", ru: "Ему пришлось долго работать." },
      { de: "Wir haben nicht gehen dürfen.", ru: "Нам нельзя было идти." },
      { de: "Ich habe das gemocht.", ru: "Мне это нравилось." },
    ],
  },
  {
    key: "plusquamperfekt", label: "Plusquamperfekt", sublabel: "уже был (до события)",
    rows: {
      sein:    ["war gewesen","warst gewesen","war gewesen","waren gewesen","wart gewesen","waren gewesen"],
      werden:  ["war geworden","warst geworden","war geworden","waren geworden","wart geworden","waren geworden"],
      haben:   ["hatte gehabt","hattest gehabt","hatte gehabt","hatten gehabt","hattet gehabt","hatten gehabt"],
      wollen:  ["hatte gewollt","hattest gewollt","hatte gewollt","hatten gewollt","hattet gewollt","hatten gewollt"],
      konnen:  ["hatte gekonnt","hattest gekonnt","hatte gekonnt","hatten gekonnt","hattet gekonnt","hatten gekonnt"],
      mussen:  ["hatte gemusst","hattest gemusst","hatte gemusst","hatten gemusst","hattet gemusst","hatten gemusst"],
      durfen:  ["hatte gedurft","hattest gedurft","hatte gedurft","hatten gedurft","hattet gedurft","hatten gedurft"],
      sollen:  ["hatte gesollt","hattest gesollt","hatte gesollt","hatten gesollt","hattet gesollt","hatten gesollt"],
      mogen:   ["hatte gemocht","hattest gemocht","hatte gemocht","hatten gemocht","hattet gemocht","hatten gemocht"],
      mochten: ["—","—","—","—","—","—"],
    },
    examplesMain: [
      { de: "Ich war schon weg, als er kam.", ru: "Я уже ушёл, когда он пришёл." },
      { de: "Er war Arzt geworden, bevor der Krieg begann.", ru: "Он стал врачом до начала войны." },
      { de: "Wir hatten keine Zeit gehabt.", ru: "У нас не было времени." },
      { de: "Sie hatte Angst gehabt.", ru: "Она испытывала страх до этого." },
      { de: "Das Wetter war gut gewesen.", ru: "Погода была хорошей до этого." },
    ],
    examplesModal: [
      { de: "Ich hatte das nicht gewollt.", ru: "Я этого не хотел (к тому моменту)." },
      { de: "Er hatte nicht schlafen können.", ru: "Он не мог спать (до того)." },
      { de: "Sie hatte früh aufstehen müssen.", ru: "Ей пришлось рано встать (до этого)." },
      { de: "Wir hatten nicht ausgehen dürfen.", ru: "Нам нельзя было выходить." },
      { de: "Er hatte das wissen sollen.", ru: "Он должен был это знать." },
    ],
  },
  {
    key: "futur", label: "Futur I", sublabel: "будет",
    rows: {
      sein:    ["werde sein","wirst sein","wird sein","werden sein","werdet sein","werden sein"],
      werden:  ["werde werden","wirst werden","wird werden","werden werden","werdet werden","werden werden"],
      haben:   ["werde haben","wirst haben","wird haben","werden haben","werdet haben","werden haben"],
      wollen:  ["werde wollen","wirst wollen","wird wollen","werden wollen","werdet wollen","werden wollen"],
      konnen:  ["werde können","wirst können","wird können","werden können","werdet können","werden können"],
      mussen:  ["werde müssen","wirst müssen","wird müssen","werden müssen","werdet müssen","werden müssen"],
      durfen:  ["werde dürfen","wirst dürfen","wird dürfen","werden dürfen","werdet dürfen","werden dürfen"],
      sollen:  ["werde sollen","wirst sollen","wird sollen","werden sollen","werdet sollen","werden sollen"],
      mogen:   ["werde mögen","wirst mögen","wird mögen","werden mögen","werdet mögen","werden mögen"],
      mochten: ["—","—","—","—","—","—"],
    },
    examplesMain: [
      { de: "Ich werde morgen zu Hause sein.", ru: "Завтра я буду дома." },
      { de: "Er wird Erfolg haben.", ru: "У него будет успех." },
      { de: "Sie wird Ärztin werden.", ru: "Она станет врачом." },
      { de: "Das wird gut werden.", ru: "Это будет хорошо." },
      { de: "Wir werden Zeit haben.", ru: "У нас будет время." },
    ],
    examplesModal: [
      { de: "Ich werde das können.", ru: "Я смогу это сделать." },
      { de: "Du wirst früh aufstehen müssen.", ru: "Тебе придётся рано вставать." },
      { de: "Er wird das wollen.", ru: "Он будет этого хотеть." },
      { de: "Wir werden nicht dürfen.", ru: "Нам нельзя будет." },
      { de: "Sie wird es wissen müssen.", ru: "Ей нужно будет это знать." },
    ],
  },
  {
    key: "konjunktiv2", label: "Konjunktiv II", sublabel: "был бы / хотел бы",
    rows: {
      sein:    ["wäre","wärest","wäre","wären","wäret","wären"],
      werden:  ["würde","würdest","würde","würden","würdet","würden"],
      haben:   ["hätte","hättest","hätte","hätten","hättet","hätten"],
      wollen:  ["wollte","wolltest","wollte","wollten","wolltet","wollten"],
      konnen:  ["könnte","könntest","könnte","könnten","könntet","könnten"],
      mussen:  ["müsste","müsstest","müsste","müssten","müsstet","müssten"],
      durfen:  ["dürfte","dürftest","dürfte","dürften","dürftet","dürften"],
      sollen:  ["sollte","solltest","sollte","sollten","solltet","sollten"],
      mogen:   ["möchte","möchtest","möchte","möchten","möchtet","möchten"],
      mochten: ["möchte","möchtest","möchte","möchten","möchtet","möchten"],
    },
    examplesMain: [
      { de: "Ich wäre gern in Urlaub.", ru: "Я бы с удовольствием был в отпуске." },
      { de: "Er hätte mehr Zeit gebraucht.", ru: "Ему нужно было больше времени." },
      { de: "Das wäre schön!", ru: "Это было бы прекрасно!" },
      { de: "Wären Sie so nett?", ru: "Не будете ли вы так любезны?" },
      { de: "Ich hätte das nie gedacht.", ru: "Я бы никогда не подумал об этом." },
    ],
    examplesModal: [
      { de: "Ich könnte dir helfen.", ru: "Я мог бы тебе помочь." },
      { de: "Du müsstest mehr schlafen.", ru: "Тебе следовало бы больше спать." },
      { de: "Er dürfte das nicht wissen.", ru: "Ему, вероятно, не следует это знать." },
      { de: "Wir sollten früher gehen.", ru: "Нам следовало бы уйти раньше." },
      { de: "Möchtest du Kaffee?", ru: "Хотел бы ты кофе?" },
    ],
  },
  {
    key: "wuerden", label: "Würden + Inf.", sublabel: "стал бы + глагол",
    rows: {
      sein:    ["würde sein","würdest sein","würde sein","würden sein","würdet sein","würden sein"],
      werden:  ["würde werden","würdest werden","würde werden","würden werden","würdet werden","würden werden"],
      haben:   ["würde haben","würdest haben","würde haben","würden haben","würdet haben","würden haben"],
      wollen:  ["würde wollen","würdest wollen","würde wollen","würden wollen","würdet wollen","würden wollen"],
      konnen:  ["würde können","würdest können","würde können","würden können","würdet können","würden können"],
      mussen:  ["würde müssen","würdest müssen","würde müssen","würden müssen","würdet müssen","würden müssen"],
      durfen:  ["würde dürfen","würdest dürfen","würde dürfen","würden dürfen","würdet dürfen","würden dürfen"],
      sollen:  ["würde sollen","würdest sollen","würde sollen","würden sollen","würdet sollen","würden sollen"],
      mogen:   ["würde mögen","würdest mögen","würde mögen","würden mögen","würdet mögen","würden mögen"],
      mochten: ["—","—","—","—","—","—"],
    },
    examplesMain: [
      { de: "Ich würde gern reisen.", ru: "Я бы с удовольствием путешествовал." },
      { de: "Würdest du mir helfen?", ru: "Ты бы мне помог?" },
      { de: "Er würde das nie sagen.", ru: "Он бы этого никогда не сказал." },
      { de: "Wir würden gern bleiben.", ru: "Мы бы с радостью остались." },
      { de: "Sie würde sofort kommen.", ru: "Она бы пришла сразу." },
    ],
    examplesModal: [
      { de: "Ich würde gern können.", ru: "Я бы хотел уметь." },
      { de: "Würdest du das wollen?", ru: "Ты бы этого хотел?" },
      { de: "Er würde müssen, wenn nötig.", ru: "Ему пришлось бы, если нужно." },
      { de: "Wir würden nicht dürfen.", ru: "Нам бы нельзя было." },
      { de: "Sie würden es sollen.", ru: "Им следовало бы это сделать." },
    ],
  },
  {
    key: "imperativ", label: "Imperativ", sublabel: "повелительное",
    note: "ich и er/sie/es — форм нет. Модальные глаголы императива не имеют.",
    rows: {
      sein:    ["—","sei","—","seien wir","seid","seien Sie"],
      werden:  ["—","werde","—","werden wir","werdet","werden Sie"],
      haben:   ["—","hab","—","haben wir","habt","haben Sie"],
      wollen:  ["—","—","—","—","—","—"],
      konnen:  ["—","—","—","—","—","—"],
      mussen:  ["—","—","—","—","—","—"],
      durfen:  ["—","—","—","—","—","—"],
      sollen:  ["—","—","—","—","—","—"],
      mogen:   ["—","—","—","—","—","—"],
      mochten: ["—","—","—","—","—","—"],
    },
    examplesMain: [
      { de: "Sei ruhig!", ru: "Будь тихо!" },
      { de: "Seid pünktlich!", ru: "Будьте пунктуальны!" },
      { de: "Seien Sie bitte geduldig!", ru: "Будьте терпеливы! (вежливо)" },
      { de: "Hab Geduld!", ru: "Имей терпение!" },
      { de: "Werde besser!", ru: "Становись лучше!" },
    ],
    examplesModal: null,
  },
];

const KEY_FORMS = [
  { ru: "есть (я)",  de: "ich bin / ich habe",     color: "#1d4ed8" },
  { ru: "был",       de: "ich war / ich hatte",     color: "#15803d" },
  { ru: "будет",     de: "es wird",                 color: "#15803d" },
  { ru: "был бы",    de: "ich wäre / ich hätte",    color: "#6d28d9" },
  { ru: "стал бы",   de: "ich würde",               color: "#15803d" },
  { ru: "хотел бы",  de: "ich wollte (Konj. II)",   color: "#b91c1c" },
  { ru: "мог бы",    de: "ich könnte",              color: "#0369a1" },
  { ru: "должен бы", de: "ich müsste",              color: "#b45309" },
];

const TENSE_INFO = [
  { label: "Präsens",          desc: "настоящее — есть, сейчас" },
  { label: "Präteritum",       desc: "прошедшее письменное — был, стал, хотел" },
  { label: "Perfekt",          desc: "прошедшее разговорное — был (в речи)" },
  { label: "Plusquamperfekt",  desc: "предпрошедшее — уже был до другого события" },
  { label: "Futur I",          desc: "будущее — будет" },
  { label: "Konjunktiv II",    desc: "сослагательное — был бы, мог бы, хотел бы" },
  { label: "Würden + Inf.",    desc: "«бы + глагол» для любого глагола" },
  { label: "Imperativ",        desc: "повелительное — будь!, имей! (только sein/werden/haben)" },
];

export default function App() {
  const [activeTense, setActiveTense] = useState("prasens");
  const [verbGroup, setVerbGroup] = useState("main");
  const tense = TENSES.find((t) => t.key === activeTense);
  const verbs = verbGroup === "main" ? MAIN_VERBS : MODAL_VERBS;
  const examples = verbGroup === "main" ? tense.examplesMain : tense.examplesModal;

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f7", color: "#111", fontFamily: "system-ui, sans-serif", padding: "2rem 1rem" }}>
      {/* Стили для постоянно видимого горизонтального скроллбара в webkit-браузерах */}
      <style>{`
        .table-scroll::-webkit-scrollbar {
          height: 8px; /* высота горизонтального ползунка */
          display: block; /* всегда показывать */
        }
        .table-scroll::-webkit-scrollbar-track {
          background: #f0f0ee; /* цвет дорожки скроллбара */
          border-radius: 4px;
        }
        .table-scroll::-webkit-scrollbar-thumb {
          background: #c8c8c4; /* цвет ползунка */
          border-radius: 4px;
        }
        .table-scroll::-webkit-scrollbar-thumb:hover {
          background: #a0a09c; /* цвет ползунка при наведении */
        }
        .table-scroll {
          scrollbar-width: thin; /* Firefox: тонкий скроллбар */
          scrollbar-color: #c8c8c4 #f0f0ee; /* Firefox: цвет ползунка и дорожки */
        }
      `}</style>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ margin: "0 0 4px", fontSize: 12, color: "#666", letterSpacing: "0.08em" }}>Deutsch</p>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#111" }}>
            Спряжение глаголов
          </h1>
        </div>

        {/* Verb group toggle */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "#666", letterSpacing: "0.08em" }}>Группа глаголов</p>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { key: "main",  label: "Основные", sub: "sein · werden · haben" },
              { key: "modal", label: "Модальные", sub: "wollen · können · müssen · dürfen · sollen · mögen · möchten" },
            ].map(g => {
              const active = verbGroup === g.key;
              return (
                <button key={g.key} onClick={() => setVerbGroup(g.key)} style={{
                  padding: "7px 14px",
                  border: active ? "1.5px solid #111" : "1px solid #ddd",
                  borderRadius: 6,
                  background: active ? "#063847" : "#fff",
                  color: active ? "#fff" : "#1e1e1e",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  lineHeight: 1.35,
                  textAlign: "left",
                }}>
                  <div>{g.label}</div>
                  <div style={{ fontSize: 10, color: active ? "#ffffff" : "#343434" }}>{g.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Verb legend */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {verbs.map(v => (
            <span key={v.key} style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color, display: "inline-block", flexShrink: 0 }} />
              <strong style={{ color: v.color, fontWeight: 600 }}>{v.label}</strong>
              <span style={{ color: "#555" }}>— {v.ru}</span>
            </span>
          ))}
        </div>

        {/* Tense tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
          {TENSES.map(t => {
            const active = t.key === activeTense;
            return (
              <button key={t.key} onClick={() => setActiveTense(t.key)} style={{
                padding: "6px 12px",
                border: active ? "1.5px solid #111" : "1px solid #ddd",
                borderRadius: 6,
                background: active ? "#063847" : "#fff",
                color: active ? "#fff" : "#313131",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: active ? 500 : 400,
                lineHeight: 1.35,
                textAlign: "left",
              }}>
                <div>{t.label}</div>
                <div style={{ fontSize: 10, color: active ? "#f0f0f0" : "#2a2a2a" }}>{t.sublabel}</div>
              </button>
            );
          })}
        </div>

        {/* Note for imperativ */}
        {tense.note && (
          <div style={{ padding: "8px 14px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, fontSize: 13, color: "#92400e", marginBottom: "0.75rem" }}>
            {tense.note}
          </div>
        )}

        {/* Table */}
        <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, overflow: "hidden", marginBottom: "1.5rem", background: "#fff" }}>
          {/* className="table-scroll" — применяет CSS для постоянно видимого скроллбара */}
          <div className="table-scroll" style={{ overflowX: "scroll", scrollbarGutter: "stable" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f4f4f2", borderBottom: "1px solid #e5e5e5" }}>
                  <th style={{ padding: "10px 14px", textAlign: "left", color: "#555", fontWeight: 500, fontSize: 12, minWidth: 90 }}>Лицо</th>
                  {verbs.map(v => (
                    <th key={v.key} style={{ padding: "10px 14px", textAlign: "left", color: v.color, fontWeight: 600, fontSize: 13, minWidth: 120, whiteSpace: "nowrap" }}>
                      {v.label}
                      <span style={{ display: "block", fontSize: 10, color: "#777", fontWeight: 400 }}>{v.ru}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {persons.map((p, i) => (
                  <tr key={p} style={{ borderTop: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "10px 14px", color: "#777", fontSize: 12, whiteSpace: "nowrap" }}>{p}</td>
                    {verbs.map(v => {
                      const val = tense.rows[v.key]?.[i] ?? "—";
                      const isEmpty = val === "—";
                      return (
                        <td key={v.key} style={{ padding: "10px 14px", color: isEmpty ? "#bbb" : v.color, fontWeight: isEmpty ? 400 : 500, whiteSpace: "nowrap" }}>
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Examples */}
        <p style={{ margin: "0 0 10px", fontSize: 12, color: "#666", letterSpacing: "0.08em" }}>
          Примеры · {tense.label} · {verbGroup === "main" ? "sein / werden / haben" : "Модальные"}
        </p>

        {examples === null ? (
          <div style={{ padding: "14px 18px", background: "#f4f4f2", border: "1px solid #e5e5e5", borderRadius: 6, fontSize: 13, color: "#888", marginBottom: "2.5rem" }}>
            У модальных глаголов нет формы Imperativ. Повелительное наклонение образуют только sein, werden и haben.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "2.5rem" }}>
            {examples.map((ex, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
                padding: "10px 14px", background: "#fff", border: "1px solid #e5e5e5",
                borderRadius: 6, alignItems: "center",
              }}>
                <div style={{ fontSize: 13, color: "#111" }}>{ex.de}</div>
                <div style={{ fontSize: 13, color: "#555", borderLeft: "1px solid #eee", paddingLeft: 14 }}>{ex.ru}</div>
              </div>
            ))}
          </div>
        )}

        {/* Cheat sheet */}
        <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "2rem" }}>
          <p style={{ margin: "0 0 1rem", fontSize: 12, color: "#666", letterSpacing: "0.08em" }}>Шпаргалка</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "1.5rem" }}>
            {TENSE_INFO.map(t => (
              <div key={t.label} style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: "1rem", fontSize: 13, alignItems: "baseline" }}>
                <strong style={{ color: "#111", fontWeight: 500 }}>{t.label}</strong>
                <span style={{ color: "#555" }}>— {t.desc}</span>
              </div>
            ))}
          </div>

          <p style={{ margin: "0 0 10px", fontSize: 12, color: "#666", letterSpacing: "0.08em" }}>Ключевые формы</p>
          <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f4f4f2", borderBottom: "1px solid #e5e5e5" }}>
                  <th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 500, color: "#555", fontSize: 12 }}>Русский</th>
                  <th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 500, color: "#555", fontSize: 12 }}>Немецкий</th>
                </tr>
              </thead>
              <tbody>
                {KEY_FORMS.map(row => (
                  <tr key={row.ru} style={{ borderTop: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "9px 14px", color: "#555" }}>{row.ru}</td>
                    <td style={{ padding: "9px 14px", color: row.color, fontWeight: 500 }}>{row.de}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
