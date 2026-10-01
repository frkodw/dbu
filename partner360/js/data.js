/* ============================================================
   DBU Partner360 · data
   Alt indhold er hentet 1:1 fra Figma "DBU medie bureau" (hi-fi).
   To flows: Salling Group (kupon-aktivering) og Skoda (event-aktivering).
   ============================================================ */
window.P360 = (function () {
  const user = { name: 'Medie Morten', role: 'DBU Sponsoransvarlig', initials: 'MM' };

  const owners = {
    mj: { name: 'Morten Jensen', initials: 'MJ' },
    sl: { name: 'Sofie Larsen', initials: 'SL' },
    ph: { name: 'Peter Holm', initials: 'PH' },
    kl: { name: 'Kasper Lind', initials: 'KL', external: 'Ekstern · Mediebureau' },
  };

  /* ---------- Partnere (HF 1) ---------- */
  const partnerList = [
    { id: 'carlsberg', name: 'Carlsberg', logo: 'assets/logo-carlsberg.png', fit: 'contain', active: '5', reach: '1.200.000', last: '22. sep 2026', owner: 'mj', status: 'aktiv' },
    { id: 'hummel', name: 'Hummel', logo: 'assets/logo-hummel.png', fit: 'contain', active: '7', reach: '2.100.000', last: '24. sep 2026', owner: 'mj', status: 'aktiv' },
    { id: 'al', name: 'Arbejdernes Landsbank', logo: 'assets/logo-al.png', fit: 'contain', active: '4', reach: '1.500.000', last: '21. sep 2026', owner: 'sl', status: 'aktiv' },
    { id: 'salling', name: 'Salling Group', logo: 'assets/logo-salling.png', fit: 'contain', active: '3', reach: '850.000', last: '25. sep 2026', owner: 'sl', status: 'aktiv' },
    { id: 'louis-nielsen', name: 'Louis Nielsen', logo: 'assets/logo-louis-nielsen.png', fit: 'contain', active: '2', reach: '640.000', last: '19. sep 2026', owner: 'ph', status: 'aktiv' },
    { id: 'ok', name: 'OK', logo: 'assets/logo-ok.png', fit: 'contain', active: '3', reach: '920.000', last: '23. sep 2026', owner: 'mj', status: 'aktiv' },
    { id: 'skoda', name: 'Škoda', logo: 'assets/logo-skoda.png', fit: 'cover', active: '2', reach: '780.000', last: '18. sep 2026', owner: 'sl', status: 'aktiv' },
    { id: 'unisport', name: 'Unisport', logo: 'assets/logo-unisport.png', fit: 'cover', active: '4', reach: '1.100.000', last: '20. sep 2026', owner: 'kl', status: 'aktiv' },
    { id: 'stark', name: 'STARK', logo: 'assets/logo-stark.png', fit: 'contain', active: '1', reach: '310.000', last: '12. aug 2026', owner: 'ph', status: 'inaktiv' },
    { id: 'vikingbus', name: 'Vikingbus', logo: 'assets/logo-vikingbus.png', fit: 'contain', active: '0', reach: '0', last: '30. jun 2026', owner: 'sl', status: 'udloebet' },
  ];

  /* ---------- Partner home (HF 2) ---------- */
  const partnerHome = {
    salling: {
      name: 'Salling Group', shortUpper: 'SALLING GROUP',
      logoSquare: 'assets/logo-salling-square.png', logoFit: 'cover',
      level: 'Hovedpartner', statusLabel: 'Aktiv partner', owner: 'Sofie Larsen', since: '2023',
      flow: 'kupon',
      stamdata: [
        ['Virksomhed', 'Salling Group A/S (Bilka, føtex, Netto)'],
        ['Kontaktperson', 'Anne Kristensen, Brand Manager'],
        ['E-mail', 'anne.kristensen@sallinggroup.com'],
        ['Partnerniveau', 'Hovedpartner'],
        ['Aftaleperiode', '1. jan 2023 - 31. dec 2027'],
        ['DBU-ansvarlig', 'Sofie Larsen'],
      ],
      kpis: [['3', 'Aktive aktiveringer'], ['850.000', 'Samlet rækkevidde i år'], ['12', 'Aktiveringer i alt']],
      current: [
        { name: 'Bilka kupon: 10% på alle indkøb', type: 'Rabatkode', channel: 'DBU appen (wallet)', period: '1. okt - 30. nov 2026', status: 'Live', result: '3.412 indløst', link: 'performance.html' },
        { name: 'føtex madpakke-konkurrence', type: 'Konkurrence', channel: 'Sociale medier', period: '15. sep - 15. okt 2026', status: 'Live', result: '1.180 tilmeldte' },
        { name: 'Netto bandereklame, U21', type: 'Eksponering', channel: 'Events & fysiske', period: 'Sæson 2026/27', status: 'Live', result: '4 kampe' },
      ],
      past: [
        { name: 'Bilka skolestart-kupon', type: 'Rabatkode', channel: 'DBU appen (wallet)', period: '1. aug - 31. aug 2026', status: 'Afsluttet', result: '2.870 indløst' },
        { name: 'Salling Group landskampsbillet-lodtrækning', type: 'Konkurrence', channel: 'DBU Marketplace', period: 'Maj 2026', status: 'Afsluttet', result: '9.400 deltagere' },
      ],
    },
    skoda: {
      name: 'Skoda', shortUpper: 'SKODA',
      logoSquare: 'assets/logo-skoda.png', logoFit: 'contain', logoBg: '#0e3a2f',
      level: 'Bilpartner', statusLabel: 'Aktiv partner', owner: 'Peter Holm', since: '2024',
      flow: 'event',
      stamdata: [
        ['Virksomhed', 'Skoda Danmark A/S (Semler Gruppen)'],
        ['Kontaktperson', 'Mette Bruun, Marketing Manager'],
        ['E-mail', 'mette.bruun@skoda.dk'],
        ['Partnerniveau', 'Officiel bilpartner'],
        ['Aftaleperiode', '1. jan 2024 - 31. dec 2028'],
        ['DBU-ansvarlig', 'Peter Holm'],
      ],
      kpis: [['3', 'Aktive aktiveringer'], ['640.000', 'Samlet rækkevidde i år'], ['6', 'Aktiveringer i alt']],
      current: [
        { name: 'Skoda landsholdsbiler, Parken', type: 'Eksponering', channel: 'Events & fysiske', period: 'Sæson 2026/27', status: 'Live', result: '3 kampe' },
        { name: 'Peaq familiefordel til klubber', type: 'Rabatkode', channel: 'DBU Marketplace', period: '1. sep - 31. dec 2026', status: 'Live', result: '210 indløst' },
        { name: 'Kodiaq: Kør holdet til kamp', type: 'Konkurrence', channel: 'Sociale medier', period: '1. sep - 30. sep 2026', status: 'Live', result: '2.340 tilmeldte' },
      ],
      past: [
        { name: 'Prøvekørsel ved landskampen, Parken', type: 'Event', channel: 'Events & fysiske', period: '12. jun 2026', status: 'Afsluttet', result: '86 prøvekørsler' },
        { name: 'Skoda holdbus-konkurrence', type: 'Konkurrence', channel: 'DBU Marketplace', period: 'Maj 2026', status: 'Afsluttet', result: '4.100 deltagere' },
      ],
    },
  };

  /* ---------- Wizard: statiske valgmuligheder ---------- */
  const activationTypes = [
    { id: 'kupon', title: 'Rabatkode / kupon', desc: 'Kupon i DBU wallet, indløses i butik eller online' },
    { id: 'konkurrence', title: 'Konkurrence', desc: 'Lodtrækning, quiz eller tilmelding' },
    { id: 'indhold', title: 'Indhold og kampagne', desc: 'Artikler, video og annoncering i DBU kanaler' },
    { id: 'event', title: 'Event', desc: 'Aktivering ved landskampe, stævner eller fysiske events' },
    { id: 'eksponering', title: 'Eksponering', desc: 'Bandereklame, logo og synlighed' },
    { id: 'produkt', title: 'Produktplacering', desc: 'Produkter i klubber, pakker eller kits' },
  ];
  const goals = [
    { id: 'indlosninger', label: 'Antal indløsninger', unit: 'indløsninger' },
    { id: 'raekkevidde', label: 'Rækkevidde', unit: 'visninger' },
    { id: 'tilmeldinger', label: 'Tilmeldinger', unit: 'tilmeldinger' },
    { id: 'klik', label: 'Klik / trafik', unit: 'klik' },
  ];

  const channelCategories = ['Alle kanaler', 'DBU kanaler', 'TV 2 landsholdspakker', 'Sociale medier', 'Egne kanaler', 'Events & fysiske', 'Partnerfordele'];

  const channels = {
    kupon: {
      category: 'DBU kanaler',
      list: [
        { id: 'wallet', title: 'DBU appen: Wallet-kupon', short: 'DBU wallet', chip: 'DBU appen: Wallet-kupon', icon: 'ticket', desc: 'Kupon gemmes i brugerens wallet og indløses med kode eller scanning i butik', reach: 'Rækkevidde: 380.000 app-brugere', price: 'fra 25.000 kr.', priceNum: 25000, reachNum: 380000, priceRow: ['380.000 app-brugere', '61 dage', '25.000 kr.'] },
        { id: 'push', title: 'DBU appen: Push-notifikation', short: 'push', chip: 'DBU appen: Push-notifikation', icon: 'bell', desc: 'Besked til udvalgte segmenter ved fx landskamp eller kupon-lancering', reach: 'Rækkevidde: Op til 380.000 modtagere', price: 'fra 10.000 kr.', priceNum: 10000, reachNum: 0, priceRow: ['2 udsendelser  ·  380.000', '12. okt + 14. nov', '10.000 kr.'] },
        { id: 'marketplace', title: 'DBU Marketplace', short: 'DBU Marketplace', chip: 'DBU Marketplace', icon: 'store', desc: 'Partnertilbud til klubber og medlemmer, fx rabat på klubkøb', reach: 'Rækkevidde: 1.240 klubber', price: 'fra 15.000 kr.', priceNum: 15000, reachNum: 15000, priceRow: ['1.240 klubber', '61 dage', '15.000 kr.'] },
        { id: 'banner', title: 'dbu.dk banner', short: 'dbu.dk banner', chip: 'dbu.dk banner', icon: 'globe', desc: 'Banner på forsiden og landsholdssider', reach: 'Rækkevidde: 1,2 mio. visninger / md.', price: 'fra 20.000 kr.', priceNum: 20000, reachNum: 1200000, priceRow: ['1,2 mio. visninger / md.', '61 dage', '20.000 kr.'] },
        { id: 'nyhedsbrev', title: 'DBU nyhedsbrev', short: 'nyhedsbrev', chip: 'DBU nyhedsbrev', icon: 'mail', desc: 'Placering i nyhedsbrev til fans og klubfolk', reach: 'Rækkevidde: 210.000 abonnenter', price: 'fra 12.000 kr.', priceNum: 12000, reachNum: 210000, priceRow: ['210.000 abonnenter', '61 dage', '12.000 kr.'] },
        { id: 'klubportal', title: 'Klubportalen (KlubOffice)', short: 'klubportal', chip: 'Klubportalen (KlubOffice)', icon: 'layout-grid', desc: 'Tilbud til klubadministratorer og frivillige', reach: 'Rækkevidde: 48.000 brugere', price: 'fra 8.000 kr.', priceNum: 8000, reachNum: 48000, priceRow: ['48.000 brugere', '61 dage', '8.000 kr.'] },
      ],
      selectedNote: 'Samlet estimeret rækkevidde: ≈ 395.000 personer  ·  Vejledende pris fra 50.000 kr.',
    },
    event: {
      category: 'Events & fysiske',
      list: [
        { id: 'stand', title: 'Stand ved DBU stævner', short: 'Stand ved stævner', chip: 'Stand ved stævner', icon: 'map-pin', desc: 'Skoda Peaq udstilles ved banen med booking af prøvekørsel på dagen', reach: 'Rækkevidde: 16 stævner  ·  ≈ 20.000 familier', price: 'fra 120.000 kr.', priceNum: 120000, reachNum: 20000, priceRow: ['16 stævner  ·  ≈ 20.000 familier', '20. mar - 13. jun', '120.000 kr.'] },
        { id: 'push-hold', title: 'DBU appen: Push til tilmeldte hold', short: 'push', chip: 'Push til hold', icon: 'bell', desc: 'Besked til forældre på tilmeldte hold ugen før hvert stævne', reach: 'Rækkevidde: Op til 68.000 modtagere', price: 'fra 30.000 kr.', priceNum: 30000, reachNum: 68000, priceRow: ['16 udsendelser  ·  68.000', 'Ugen før hvert stævne', '30.000 kr.'] },
        { id: 'klubportal-form', title: 'Klubportalen: Prøvekørselsformular', short: 'klubportal', chip: 'Klubportal: formular', icon: 'layout-grid', desc: 'Tilmelding til prøvekørsel via klubbens side, også efter stævnet', reach: 'Rækkevidde: 1.240 klubber', price: 'fra 30.000 kr.', priceNum: 30000, reachNum: 0, priceRow: ['1.240 klubber', '20. mar - 13. jun', '30.000 kr.'] },
        { id: 'bande', title: 'Bandereklame ved stævnebanerne', short: 'bander', chip: 'Bandereklame', icon: 'megaphone', desc: 'Skoda-bander på de baner hvor U6-U12 spiller', reach: 'Rækkevidde: 16 stævner  ·  ≈ 20.000 familier', price: 'fra 40.000 kr.', priceNum: 40000, reachNum: 20000, priceRow: ['16 stævner  ·  ≈ 20.000 familier', '20. mar - 13. jun', '40.000 kr.'] },
        { id: 'fanzone', title: 'Landskamp: Fanzone i Parken', short: 'fanzone', chip: 'Fanzone i Parken', icon: 'trophy', desc: 'Peaq-udstilling i fanzonen før landskampen i marts', reach: 'Rækkevidde: 38.000 tilskuere', price: 'fra 60.000 kr.', priceNum: 60000, reachNum: 38000, priceRow: ['38.000 tilskuere', '25. mar', '60.000 kr.'] },
        { id: 'fodboldskoler', title: 'DBU Fodboldskoler (sommer)', short: 'fodboldskoler', chip: 'Fodboldskoler', icon: 'users', desc: 'Stand ved udvalgte fodboldskoler i uge 27-32', reach: 'Rækkevidde: 220 skoler  ·  30.000 børn', price: 'fra 50.000 kr.', priceNum: 50000, reachNum: 30000, priceRow: ['220 skoler  ·  30.000 børn', 'Uge 27-32', '50.000 kr.'] },
      ],
      selectedNote: 'Samlet estimeret rækkevidde: ≈ 88.000 personer  ·  Vejledende pris fra 180.000 kr.',
    },
  };

  /* Målgruppe (HF 4) · ens for begge flows, bortset fra første segment-kilde */
  const audience = {
    savedSegments: [
      { title: 'Forældre og ungdomsspillere, hele landet', source: { salling: 'Bilka skolestart-kupon  ·  aug 2026  ·  Brugt 3 gange', skoda: 'Skoda landsholdsbiler  ·  mar 2026  ·  Brugt 2 gange' }, tags: ['Ungdomsklubber U6-U15', 'Forældre', 'Hele landet'], size: '≈ 396.000 personer' },
      { title: 'Landsholdsfans i Hovedstaden', source: { salling: 'Landskampsbillet-lodtrækning  ·  maj 2026  ·  Brugt 2 gange', skoda: 'Landskampsbillet-lodtrækning  ·  maj 2026  ·  Brugt 2 gange' }, tags: ['Landsholdsfans', 'Hovedstaden', '18-49 år'], size: '≈ 142.000 personer' },
      { title: 'Klubber i Jylland, serie og bredde', source: { salling: 'føtex madpakke-konkurrence  ·  sep 2026  ·  Brugt 1 gang', skoda: 'føtex madpakke-konkurrence  ·  sep 2026  ·  Brugt 1 gang' }, tags: ['Seniorklubber', 'Ungdomsklubber', 'Nord- og Midtjylland'], size: '≈ 610 klubber' },
    ],
    roles: [
      { id: 'spillere', title: 'Aktive spillere', desc: 'Ungdom, senior og old boys/girls. Rammes på alder og interesse.', size: '≈ 340.000 personer', sub: ['Ungdom', 'Senior', 'Old boys/girls'] },
      { id: 'foraeldre', title: 'Forældre til børnespillere', desc: 'Husstande med børn 6 til 17 år, interesse i fodbold, plus lookalike på klubdata.', size: '≈ 210.000 personer' },
      { id: 'frivillige', title: 'Frivillige, trænere og ledere', desc: "Nås bedst via DBU's egne kanaler og nyhedsbreve, ikke betalt reach.", size: '≈ 48.000 personer' },
      { id: 'tilskuere', title: 'Tilskuere og lokale fans', desc: 'Geografisk radius om klubbernes baner og stadions, interesse i den lokale klub.', size: '≈ 120.000 personer' },
      { id: 'tidligere', title: 'Tidligere spillere og fodboldnostalgikere', desc: 'Interesse i fodbold generelt, alder 30+, lookalike.', size: '≈ 95.000 personer' },
    ],
    geo: ['Hele landet', 'Regioner', 'Radius om klubber', 'Postnummerliste'],
    interests: [
      { label: 'Fodbold og klubber', chips: ['Fodbold', 'DBU', 'Lokale klubnavne', 'Fodboldskoler'], selected: ['Fodbold', 'DBU', 'Lokale klubnavne'] },
      { label: 'Udstyr og butikker', chips: ['Unisport', 'Select', 'Hummel', 'Intersport'], selected: ['Hummel'] },
      { label: 'Medier og podcasts', chips: ['Bold.dk', 'Tipsbladet', 'Fodboldmagasinet', 'Lokalaviser', 'Danske fodboldpodcasts'], selected: ['Lokalaviser'] },
    ],
    ageRanges: [
      { id: '6-17', label: '6 til 17 · børn og unge', min: 6, max: 17 },
      { id: '18-29', label: '18 til 29 · spillere', min: 18, max: 29 },
      { id: '30-49', label: '30 til 49 · forældre', min: 30, max: 49 },
      { id: '50+', label: '50+ · nostalgikere', min: 50, max: 70 },
      { id: 'custom', label: 'Eget spænd', min: 30, max: 49 },
    ],
    stats: [['≈ 9.400', 'Estimeret målgruppe'], ['≈ 6.100', 'Bor under 15 km fra en klub'], ['212', 'Klubber i geolisten']],
  };

  /* Periode (HF 6 · Salling) */
  const periode = {
    start: '1. okt 2026', end: '30. nov 2026', duration: '61 dage',
    suggestions: ['Op til landskampen 12. okt', 'Hele efteråret (okt - nov)', 'Kampdagsweekender', 'Efterårsferie (uge 42)', 'Sæsonafslutning ungdom', 'Brugerdefineret'],
    suggestionSelected: 'Hele efteråret (okt - nov)',
    months: [
      { title: 'Oktober 2026', year: 2026, month: 9, matchDays: [12, 15] },
      { title: 'November 2026', year: 2026, month: 10, matchDays: [14] },
    ],
    events: [
      ['10.-11. okt', 'DBU børnestævner U6 til U10 (3v3 og 5v5) i alle lokalunioner  ·  Ca. 900 klubber deltager'],
      ['12. okt', 'Landskamp: Danmark - Grækenland (Parken)  ·  Push anbefales denne dag'],
      ['15. okt', 'Landskamp: Hviderusland - Danmark'],
      ['Uge 42', 'Efterårsferie  ·  Efterårsfodboldskoler i ca. 120 klubber  ·  Høj aktivitet i DBU appen'],
      ['24.-25. okt', 'Sidste spillerunde i efterårsturneringen, U11 til senior bredde  ·  Afslutningsfester i klubberne'],
      ['1. nov', 'Indendørs- og futsalsæsonen starter  ·  Klubstævner i hallerne hver weekend frem til marts'],
      ['7.-8. nov', 'DBU Pigeraketten og Fodboldfitness-events  ·  Rekruttering af nye piger og voksne motionister'],
      ['14. nov', 'Landskamp: Danmark - Skotland (Parken)  ·  Push anbefales denne dag'],
    ],
  };

  /* Events (HF 6 · Skoda) */
  const events = {
    start: '1. mar 2027', end: '1. jun 2027', count: '16 begivenheder',
    relevant: [
      ['20.-21. mar', 'DBU Forårsåbning, Farum  ·  U6-U12  ·  ≈ 1.200 familier  ·  Første stævne i perioden'],
      ['10.-11. apr', 'DBU Påskestævne, Vejle  ·  U8-U12  ·  ≈ 1.400 familier  ·  Peaq-stand ved bane 1'],
      ['17. apr', 'DBU Forårsstævne, Brøndby  ·  U6-U10  ·  ≈ 900 familier'],
      ['24.-25. apr', 'DBU Forårscup, Aarhus  ·  U8-U12  ·  ≈ 1.800 familier  ·  Største stævne i perioden'],
      ['8.-9. maj', 'DBU Pigestævne, Odense  ·  U8-U12  ·  ≈ 1.100 familier'],
      ['22. maj', 'DBU Forårsstævne, Aalborg  ·  U6-U12  ·  ≈ 1.000 familier'],
      ['29.-30. maj', 'DBU Pinsecup, Herning  ·  U8-U12  ·  ≈ 1.600 familier'],
      ['12.-13. jun', 'DBU Sommerstævne, Esbjerg  ·  U8-U12  ·  ≈ 1.500 familier  ·  Sidste stævne i perioden'],
    ],
    suggestions: ['Kun weekendstævner', 'Alle DBU stævner i foråret (mar - jun)', 'Påskestævner (uge 13)', 'Kun Sjælland og Hovedstaden', 'Fodboldskoler (sommer)', 'Brugerdefineret'],
    suggestionSelected: 'Alle DBU stævner i foråret (mar - jun)',
    calendarMeta: '1. mar til 1. jun 2027  ·  27 begivenheder  ·  16 stævner valgt',
    calendar: [
      { month: 'MARTS 2027', days: [
        { day: '13', dow: 'LØR-SØN', items: [{ id: 'farum', dot: 'red', time: '2 dage', title: 'DBU Forårsåbning, Farum', tag: 'Stævne', meta: 'U6-U12  ·  ≈ 1.200 familier  ·  Første stævne i perioden', check: true }] },
        { day: '20', dow: 'LØR-SØN', items: [{ id: 'brondby', dot: 'red', time: '2 dage', title: 'DBU Forårsstævne, Brøndby', tag: 'Stævne', meta: 'U6-U10  ·  ≈ 900 familier', check: true }] },
        { day: '25', dow: 'TORSDAG', items: [{ id: 'landskamp-portugal', dot: 'grey', time: '20:45', title: 'Landskamp: Danmark - Portugal (Parken)', tag: 'Info', meta: 'Push anbefales denne dag' }] },
        { day: '27', dow: 'LØR-SØN', items: [
          { id: 'aarhus', dot: 'red', time: '2 dage', title: 'DBU Forårscup, Aarhus', tag: 'Stævne', meta: 'U8-U12  ·  ≈ 1.800 familier  ·  Største stævne i perioden', check: true },
          { id: 'klubbernes-dag', dot: 'grey', time: 'Hele dagen', title: 'Klubbernes Dag  ·  Åbent hus i 400 klubber', tag: 'Info', meta: 'Rekruttering af nye børnespillere' },
        ] },
        { day: '29', dow: 'UGE 13', items: [{ id: 'paaskeferie', dot: 'grey', time: 'Uge 13', title: 'Påskeferie', tag: 'Info', meta: 'Høj aktivitet i DBU appen  ·  Fodboldskoler i ca. 60 klubber' }] },
      ] },
      { month: 'APRIL 2027', days: [
        { day: '3', dow: 'LØR-MAN', items: [{ id: 'vejle', dot: 'red', time: '3 dage', title: 'DBU Påskestævne, Vejle', tag: 'Stævne', meta: 'U8-U12  ·  ≈ 1.400 familier  ·  Peaq-stand ved bane 1', check: true }] },
        { day: '10', dow: 'LØR-SØN', items: [{ id: 'odense', dot: 'red', time: '2 dage', title: 'DBU Forårsstævne, Odense', tag: 'Stævne', meta: 'U6-U12  ·  ≈ 1.100 familier', check: false }] },
        { day: '17', dow: 'LØRDAG', items: [{ id: 'roskilde', dot: 'red', time: 'Hele dagen', title: 'DBU Pigestævne, Roskilde', tag: 'Stævne', meta: 'U8-U12  ·  ≈ 700 familier', check: true }] },
        { day: '24', dow: 'LØR-SØN', items: [{ id: 'aalborg', dot: 'red', time: '2 dage', title: 'DBU Forårscup, Aalborg', tag: 'Stævne', meta: 'U8-U12  ·  ≈ 1.300 familier', check: true }] },
      ] },
    ],
  };

  /* Materiale (HF 7) */
  const materials = {
    salling: {
      intro: 'Vælg hvilket brand materialet skal følge. Farver, logo og skrifttype hentes fra partnerens brand-kit.',
      kits: [
        { id: 'salling', name: 'Salling', assets: '8 assets', logo: 'assets/logo-salling.png' },
        { id: 'bilka', name: 'Bilka', assets: '12 assets', logo: 'assets/logo-bilka.png' },
        { id: 'fotex', name: 'føtex', assets: '10 assets', logo: 'assets/logo-fotex.png' },
        { id: 'netto', name: 'Netto', assets: '9 assets', logo: 'assets/logo-netto.png' },
      ],
      kitDetails: {
        bilka: { primary: ['#1A7FD6', 'Bilka blå'], secondary: ['#FFC20E', 'Bilka gul'], font: 'Bilka Sans', logos: '2 logofiler (svg)' },
        salling: { primary: ['#0A3F6E', 'Salling blå'], secondary: ['#1A1A1A', 'Salling sort'], font: 'Salling Sans', logos: '2 logofiler (svg)' },
        fotex: { primary: ['#131E37', 'føtex navy'], secondary: ['#FFFFFF', 'Hvid'], font: 'føtex Grotesk', logos: '2 logofiler (svg)' },
        netto: { primary: ['#1A1A1A', 'Netto sort'], secondary: ['#FFC20E', 'Netto gul'], font: 'Netto Sans', logos: '2 logofiler (svg)' },
      },
      coBrandLabel: 'Brug DBU-logo sammen med Bilka-logo (co-branding)',
      approvalLabel: 'Send tekster og billeder til godkendelse hos Salling Group (Anne Kristensen) før publicering',
      summary: 'Bilka branding  ·  3 tekster  ·  1 billede',
    },
    skoda: {
      intro: 'Skoda har ét brand-kit, som materialet følger. Farver, logo og skrifttype hentes fra Skodas brand-kit.',
      kits: [{ id: 'skoda', name: 'Skoda', assets: '14 assets', logo: 'assets/logo-skoda.png', bg: '#0e3a2f' }],
      kitDetails: { skoda: { primary: ['#0E3A2F', 'Skoda grøn'], secondary: ['#78FAAE', 'Elektrisk grøn'], font: 'Skoda Next', logos: '2 logofiler (svg)' } },
      coBrandLabel: 'Brug DBU-logo sammen med Skoda-logo (co-branding)',
      approvalLabel: 'Send tekster og billede til godkendelse hos Skoda (Peter Holm) før publicering',
      summary: 'Skoda branding  ·  3 tekster  ·  1 billede',
    },
  };

  /* Pris (HF 8) */
  const pricing = {
    salling: {
      models: [
        { id: 'fast', title: 'Fast pris', desc: 'Aftalt beløb for hele aktiveringen' },
        { id: 'indlosning', title: 'Pr. indløsning', desc: 'Betaling pr. indløst kupon, med loft' },
        { id: 'aftale', title: 'Inkluderet i partneraftale', desc: 'Trækkes fra partnerens årlige aktiveringspulje' },
      ],
      min: '40.000', max: '60.000', currency: 'DKK', billing: 'Ved afslutning',
      total: '50.000 kr.', totalNum: 50000,
      valueTitle: 'Estimeret værdi for Salling Group',
      value: [['≈ 5 kr.', 'Pris pr. forventet indløsning'], ['≈ 395.000', 'Personer der ser kuponen'], ['≈ 10.000', 'Forventede indløsninger']],
      summary: '50.000 kr. (fast pris)',
    },
    skoda: {
      models: [
        { id: 'fast', title: 'Fast pris', desc: 'Aftalt beløb for hele aktiveringen' },
        { id: 'event', title: 'Pr. stævne', desc: 'Betaling pr. afviklet stævne, med loft' },
        { id: 'aftale', title: 'Inkluderet i partneraftale', desc: 'Trækkes fra partnerens årlige aktiveringspulje' },
      ],
      min: '160.000', max: '200.000', currency: 'DKK', billing: 'Pr. måned',
      total: '180.000 kr.', totalNum: 180000,
      valueTitle: 'Estimeret værdi for Skoda',
      value: [['≈ 360 kr.', 'Pris pr. forventet prøvekørsel'], ['≈ 88.000', 'Personer der møder standen'], ['≈ 500', 'Forventede prøvekørsler']],
      summary: '180.000 kr. (fast pris)',
    },
  };

  /* ---------- Wizard-standardværdier pr. partner (Figma-indhold) ---------- */
  const wizardDefaults = {
    salling: {
      name: 'Bilka kupon: 10% på alle indkøb',
      type: 'kupon',
      description: 'Kupon i DBU wallet i DBU appen der giver 10% på alle indkøb i Bilka, både i varehusene og på bilka.dk. Målrettet forældre og spillere i ungdomsklubber op til landskampen i oktober.',
      goal: 'indlosninger', goalValue: '10.000', goalUnit: 'indløste kuponer', goalSecondary: '', goalSecondaryPlaceholder: 'Fx 200.000 visninger',
      goalSummary: '10.000 indløsninger',
      roles: ['foraeldre'], roleSub: 'Ungdom', geo: 'Radius om klubber',
      clubSelect: 'Alle klubber i Nordjylland (212)', radius: '15 km', areaType: 'Landdistrikter og mindre byer',
      interests: { 'Fodbold og klubber': ['Fodbold', 'DBU', 'Lokale klubnavne'], 'Udstyr og butikker': ['Hummel'], 'Medier og podcasts': ['Lokalaviser'] },
      ageRange: '30-49', ageMin: 30, ageMax: 49,
      audienceLive: 'Forældre til børnespillere, 15 km om klubber i Nordjylland, 30 til 49 år',
      audienceShort: 'Landsholdsfans, ungdomsklubber, forældre',
      audienceLong: 'Landsholdsfans (DBU appen), børne- og ungdomsklubber (U6-U15), forældre til ungdomsspillere',
      audienceMeta: 'Hele landet  ·  ≈ 412.000 personer',
      channelCategory: 'DBU kanaler', channels: ['wallet', 'push', 'marketplace'],
      channelsSummary: 'DBU wallet, push, DBU Marketplace',
      channelsLong: 'DBU appen: Wallet-kupon  ·  DBU appen: Push-notifikation (12. okt + 14. nov)  ·  DBU Marketplace',
      channelsMeta: 'Estimeret rækkevidde ≈ 395.000',
      periodStart: '1. okt 2026', periodEnd: '30. nov 2026', periodDuration: '61 dage',
      periodSuggestion: 'Hele efteråret (okt - nov)',
      periodSummary: '1. okt - 30. nov 2026', periodLong: '1. okt - 30. nov 2026 (61 dage)',
      brandKit: 'bilka', coBranding: true, brandColors: true, approvalPartner: true, approvalDbu: true,
      materialSummary: 'Bilka branding  ·  3 tekster  ·  1 billede',
      materialLong: 'Bilka branding og visuel identitet  ·  Tekster til wallet-kupon, push og DBU Marketplace',
      materialMeta: 'Billede: bilka-fodbold-hero.jpg  ·  Godkendt af Salling Group',
      priceModel: 'fast', priceMin: '40.000', priceMax: '60.000', currency: 'DKK', billing: 'Ved afslutning',
      priceSummary: '50.000 kr. (fast pris)',
      priceLong: '50.000 kr. (fast pris)  ·  Prisramme 40.000 - 60.000 kr.',
      priceMeta: 'Vejledende pris fordelt på 3 kanaler  ·  Godkendes af Sofie Larsen (partneransvarlig)',
      checklist: [
        ['Kuponkode og vilkår er godkendt af Salling Group', ''],
        ['Kreativer (billede og tekst) er uploadet og godkendt', ''],
        ['Prisramme er fastsat i trin 6 (40.000 - 60.000 kr.)', 'Sendes til Sofie Larsen (partneransvarlig) til godkendelse'],
      ],
      sendLabel: 'Send til godkendelse hos Salling Group',
      typeMeta: 'Rabatkode / kupon  ·  Mål: 10.000 indløste kuponer',
    },
    skoda: {
      name: 'Skoda Peaq på DBU stævner, forår 2027',
      type: 'event',
      description: 'Skoda Peaq kommer ud til alle DBU stævner i foråret 2027 med en stand ved banen. Målrettet børnefamilier: forældre kan skrive sig op til en prøvekørsel på dagen eller hos nærmeste forhandler. Skoda følger antallet af bookede prøvekørsler.',
      goal: 'tilmeldinger', goalValue: '500', goalUnit: 'prøvekørsler', goalSecondary: '', goalSecondaryPlaceholder: 'Fx 15.000 besøg på standen',
      goalSummary: '500 prøvekørsler',
      roles: ['foraeldre'], roleSub: 'Ungdom', geo: 'Radius om klubber',
      clubSelect: 'Alle klubber i Nordjylland (212)', radius: '15 km', areaType: 'Landdistrikter og mindre byer',
      interests: { 'Fodbold og klubber': ['Fodbold', 'DBU', 'Lokale klubnavne'], 'Udstyr og butikker': ['Hummel'], 'Medier og podcasts': ['Lokalaviser'] },
      ageRange: '30-49', ageMin: 30, ageMax: 49,
      audienceLive: 'Forældre til børnespillere, 15 km om klubber i Nordjylland, 30 til 49 år',
      audienceShort: 'Børnefamilier: ungdomsklubber U6-U12 og deres forældre',
      audienceLong: 'Børnefamilier: ungdomsklubber U6-U12 og deres forældre',
      audienceMeta: 'Hele landet  ·  ≈ 210.000 personer',
      channelCategory: 'Events & fysiske', channels: ['stand', 'push-hold', 'klubportal-form'],
      channelsSummary: 'Stand ved stævner, push, klubportal',
      channelsLong: 'Stand ved DBU stævner  ·  DBU appen: Push til tilmeldte hold  ·  Klubportalen: Prøvekørselsformular',
      channelsMeta: 'Estimeret rækkevidde ≈ 88.000',
      periodStart: '1. mar 2027', periodEnd: '1. jun 2027', periodDuration: '16 begivenheder',
      periodSuggestion: 'Alle DBU stævner i foråret (mar - jun)',
      events: ['farum', 'brondby', 'aarhus', 'vejle', 'roskilde', 'aalborg'],
      periodSummary: '16 DBU stævner  ·  20. mar - 13. jun 2027', periodLong: '16 DBU stævner  ·  20. mar - 13. jun 2027',
      brandKit: 'skoda', coBranding: true, brandColors: true, approvalPartner: true, approvalDbu: true,
      materialSummary: 'Skoda branding  ·  3 tekster  ·  1 billede',
      materialLong: 'Skoda branding og visuel identitet  ·  Kampagnebillede til stand, push og klubportal',
      materialMeta: 'Billede: skoda-peaq-bane.jpg  ·  Godkendt af Skoda',
      priceModel: 'fast', priceMin: '160.000', priceMax: '200.000', currency: 'DKK', billing: 'Pr. måned',
      priceSummary: '180.000 kr. (fast pris)',
      priceLong: '180.000 kr. (fast pris)  ·  Prisramme 160.000 - 200.000 kr.',
      priceMeta: 'Vejledende pris fordelt på 3 kanaler  ·  Godkendes af Peter Holm (partneransvarlig)',
      checklist: [
        ['Standplacering og vilkår er godkendt af Skoda', ''],
        ['Kreativer (billede og tekst) er uploadet og godkendt', ''],
        ['Prisramme er fastsat i trin 6 (160.000 - 200.000 kr.)', 'Sendes til Peter Holm (partneransvarlig) til godkendelse'],
      ],
      sendLabel: 'Send til godkendelse hos Skoda',
      typeMeta: 'Event  ·  Mål: 500 prøvekørsler',
    },
  };

  /* Trin-navne pr. flow */
  const steps = {
    kupon: ['Type og mål', 'Målgruppe', 'Kanaler', 'Periode', 'Materiale', 'Pris', 'Opsummering'],
    event: ['Type og mål', 'Målgruppe', 'Kanaler', 'Events', 'Materiale', 'Pris', 'Opsummering'],
  };
  const stepSubtitles = {
    kupon: ['Vælg type og sæt mål for aktiveringen', 'Vælg hvem aktiveringen skal nå', 'Vælg de kanaler aktiveringen skal ud i', 'Vælg hvornår aktiveringen skal være aktiv', 'Vælg branding og redigér materiale til de valgte kanaler', 'Fastsæt prismodel og prisramme', 'Gennemgå aktiveringen og send til godkendelse'],
    event: ['Vælg type og sæt mål for aktiveringen', 'Vælg hvem aktiveringen skal nå', 'Vælg de kanaler aktiveringen skal ud i', 'Vælg de events hvor målgruppen kan rammes', 'Vælg branding og redigér materiale til de valgte kanaler', 'Fastsæt prismodel og prisramme', 'Gennemgå aktiveringen og send til godkendelse'],
  };

  return { user, owners, partnerList, partnerHome, activationTypes, goals, channelCategories, channels, audience, periode, events, materials, pricing, wizardDefaults, steps, stepSubtitles };
})();
