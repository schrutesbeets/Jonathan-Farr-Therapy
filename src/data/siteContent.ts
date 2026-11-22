export interface RichSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
  external?: boolean;
}

export interface FaqItem {
  question: string;
  paragraphs: RichSegment[][];
  bullets?: RichSegment[][];
  followUpParagraphs?: RichSegment[][];
}

export const PRACTICE_CONFIG = {
  name: 'Jonathan Farr Therapy',
  clinician: 'Jonathan Farr, LMHC',
  credentials: 'M.Ed., M.S., LMHC',
  licenseNumber: '10134',
  licenseState: 'Massachusetts',
  licenseVerifyUrl: 'https://checkahealthlicense.mass.gov/search',
  phone: '(617) 329-1075',
  phoneHref: 'tel:+16173291075',
  email: 'jonathan@jonathanfarrtherapy.com',
  bookingUrl:
    import.meta.env.VITE_PRACTICE_BOOKING_URL ||
    'https://jfarrlmhc.clientsecure.me',
  introCallUrl: 'https://therapyfinder.com/therapist/jonathan-farr-lmhc-acton-ma',
  contactWidgetUrl: 'https://jfarrlmhc.clientsecure.me/contact-widget',
  mentayaWidgetUrl:
    import.meta.env.VITE_MENTAYA_WIDGET_URL ||
    'https://app.mentaya.com/public/practices/NI6MdMhZDYEOybs8mKuk/eligibility/widget',
  sessionFee: 225,
  sessionMinutes: 55,
  consultationMinutes: 15,
  availability: 'Immediate openings · Monday – Thursday',
  format: '100% Online Telehealth across Massachusetts',
};

export const HERO_KEYWORDS = ['AVIATION', 'PERFORMERS', 'LEADERS', 'ACADEMICS'];

export const METHOD_PILLARS = [
  {
    id: 'access',
    shape: 'starburst' as const,
    title: 'ACCESS',
    kicker: 'Immediate Openings · Mon–Thu',
    description:
      'Openings with in-network providers can feel as rare as hen’s teeth. Private-pay care gives you immediate weekday availability without six-month waitlists—and guarantees that the only people in the room are you and your therapist.',
  },
  {
    id: 'values',
    shape: 'scallop' as const,
    title: 'VALUES',
    kicker: 'Clarity Over Endless Metrics',
    description:
      'Why do we really do what we do? To get the presentation done or impress the boss? Connecting your behaviors to your real values—community, relationships, self-confidence—is far more sustainable than chasing an ideal salary or score.',
  },
  {
    id: 'candor',
    shape: 'ring' as const,
    title: 'CANDOR',
    kicker: 'Rich, Colorful & Unexpectedly Human',
    description:
      'Not just passive reflective nodding. I reflect your story back in my own words, illustrations, and colorful comparisons that make you laugh and dial down anxiety—helping you see who you are and what you genuinely believe.',
  },
];

export const CLIENT_ARCHETYPES = [
  {
    id: 'aviation',
    label: 'An aviation professional',
    detail:
      'a pilot, air traffic controller, or flight attendant juggling a busy schedule, the guilt of being away from family, and the mounting stress of the job (that you don’t think you can reveal to anyone).',
  },
  {
    id: 'manager',
    label: 'A mid-level or upper-level manager',
    detail: 'with the weight of a big product launch on your shoulders.',
  },
  {
    id: 'performer',
    label: 'A performer',
    detail:
      'a musician, actor, TV presenter, or journalist fighting performance anxiety.',
  },
  {
    id: 'creative',
    label: 'A creative person',
    detail:
      'an artist, designer, or advertising executive crippled by perfectionism.',
  },
  {
    id: 'athlete',
    label: 'An athlete',
    detail:
      'professional or otherwise, haunted by the harsh words of an unforgiving coach.',
  },
  {
    id: 'narcissistic-parent',
    label: 'A child of a narcissistic or abusive parent',
    detail:
      'stuck in cycles of people-pleasing and fear of abandonment.',
  },
];

export const TIPPING_POINTS = [
  {
    id: 'career',
    tag: 'WORK & BURNOUT',
    quote:
      '“I can’t quit my job because I don’t have another one, but I can’t keep working in this job because I just can’t take it anymore.”',
    subline:
      'That exact collision of an “a-ha” moment with an “oh, fuck” moment—or a failure at work that suddenly feels like it puts everything in jeopardy.',
  },
  {
    id: 'family',
    tag: 'NARCISSISTIC CYCLES',
    quote:
      'Doing your aging, narcissistic dad’s laundry for the 10,000th time—finally realizing he will show no gratitude, and not knowing what to do with that realization.',
    subline:
      'Or realizing you married a version of that narcissistic parent—and finally deciding to stop repeating the cycle.',
  },
  {
    id: 'aviation',
    tag: 'COCKPIT & MEDICAL',
    quote:
      'Your spouse finally tells you something has been “off” for months—and you know you can’t carry it alone, yet you’re terrified talking about it will ground you.',
    subline:
      'Knowing the burden has become too heavy to shoulder in silence, especially when the rules around seeking support have actually changed.',
  },
  {
    id: 'performer',
    tag: 'MUSIC & ACADEMIA',
    quote:
      'A fellow musician finally asks: “Why did you stop gigging with us?”—and you realize you’ve been teaching only because performing feels too exposing.',
    subline:
      'Or staring at a dissertation advisor’s email paralyzed by perfectionism while pretending everything is under control.',
  },
];

export const EDUCATION_CREDENTIALS = [
  {
    year: '2017',
    credential: 'Mass. Licensed Mental Health Counselor (#10134)',
    institution:
      'Board of Registration of Allied Mental Health and Human Services Professions',
  },
  {
    year: '2014',
    credential: 'M.S., Counseling Psychology',
    institution: 'Northeastern University',
  },
  {
    year: '2003',
    credential: 'M.Ed., Higher Education Administration',
    institution: 'UMass Amherst',
  },
  {
    year: '2001',
    credential: 'B.S., Film Production',
    institution: 'Boston University',
  },
];

export const FIT_CRITERIA = {
  bestWith: [
    'Have a quirky sense of humor (or like people that do)',
    'Enjoy metaphors and parallels to illustrate ideas and concepts',
    'Don’t mind the odd dad joke',
    'Are serious about change, but flexible about how to get there',
  ],
  notForYouIf: [
    'You’re dealing with severe symptoms, including but not limited to: psychosis (hallucinations or delusions), mania, grandiosity, or you have a personality disorder',
    'You think the world owes you something',
    'You’re not willing to look seriously at your choices, beliefs, and patterns, and decide what you want to change',
    'You don’t like swearing',
  ],
};

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'Do you take insurance?',
    paragraphs: [
      [
        {
          text: 'I choose not to work with insurance for a variety of reasons — but the most important one is that the only people in the room (virtual though it may be) should be you and your therapist. Working as an out-of-network provider gives us the freedom to develop your treatment 100% your way.',
        },
      ],
      [
        {
          text: 'I provide documentation, called a superbill, that you may be able to submit to your insurance carrier for reimbursement. Many clients are able to have most of the cost of their sessions covered this way — and you can check ',
        },
        {
          text: 'right now',
          bold: true,
          href: '/services',
        },
        {
          text: ' if you have out-of-network benefits!',
        },
      ],
    ],
  },
  {
    question: 'How much does therapy cost?',
    paragraphs: [
      [{ text: 'Individual sessions are $225 for 55 minutes.' }],
    ],
  },
  {
    question: 'How long does it take?',
    paragraphs: [
      [
        {
          text: 'It depends. Some people only need a few sessions to address a specific need. I also have clients I’ve been seeing for years — not because they have to come, but because they want to. Ultimately, you’ll be the judge of how much therapy you need. Throughout the process, I’ll be clear about whether I think you still need it. If we agree that you no longer need therapy, that’s usually a great thing and can be a cause for celebration!',
        },
      ],
    ],
  },
  {
    question: 'Are you taking new clients?',
    paragraphs: [
      [
        {
          text: 'Yes! Right now I have weekday availability Monday through Thursday. ',
        },
        {
          text: 'Get in touch',
          bold: true,
          href: '/contact',
        },
        { text: '!' },
      ],
    ],
  },
  {
    question: 'What ages do you work with?',
    paragraphs: [
      [{ text: 'I work with adults, age 18 all the way to and through retirement.' }],
    ],
  },
  {
    question: "I'm not in any of the fields you mentioned above. Could we still work together?",
    paragraphs: [
      [
        {
          text: 'Absolutely! I specialize in therapy for anyone struggling with imposter syndrome in any role — personal or professional.',
        },
      ],
    ],
  },
  {
    question: 'Do you use AI in your sessions?',
    paragraphs: [
      [
        {
          text: 'No. I do not use artificial intelligence to record our sessions, nor do I use it to complete my session documentation.',
        },
      ],
    ],
  },
  {
    question: 'Did you use AI to build this website?',
    paragraphs: [
      [
        {
          text: 'This is my real voice you’re hearing. I used AI to review and make suggestions about what I created — the layout, flow, and readability, for example. I also used it to help me with stuff I don’t know a lot about, like SEO and AEO. But the words you’re reading are all my own. None of the text on this website was generated by a computer.',
        },
      ],
    ],
  },
];

export const AVIATION_LINKS = {
  faaTherapyFaq:
    'https://www.faa.gov/ame_guide/media/Therapy_Psychotherapy_And_Counseling_FAQs_For_Pilots_And_ATCS.pdf',
  faaOrder3930:
    'https://www.faa.gov/documentLibrary/media/Order/Order_3930.3C_withCHG1.pdf',
  federalAirSurgeonVideo: 'https://youtu.be/2DC0gyAOHSQ',
  pmhcGuide:
    'https://assets.nationbuilder.com/pmhc/pages/162/attachments/original/1764446151/Considerations_for_Mental_Health_Providers_working_with_Pilots__Air_Traffic_Controllers__and_Aviation_Trainees_%28October__2025%29.pdf?1764446151',
  faaAntidepressants:
    'https://www.faa.gov/ame_guide/media/Antidepressant_Medications.pdf',
  faaMentalFitness: 'https://www.faa.gov/pilot-mental-fitness',
  faaPsychotherapists:
    'https://www.faa.gov/ame_guide/media/Info_for_Psychotherapists_Treating_Pilots_ATCS.pdf',
  faaCommonConditions:
    'https://www.faa.gov/ame_guide/most-common-medical-conditions',
  senateBill3258:
    'https://www.congress.gov/bill/119th-congress/senate-bill/3258?hl=Aviation+Medication+Transparency&s=3&r=1',
};

export const AVIATION_FAQS: FaqItem[] = [
  {
    question: 'Do I have to report to the FAA immediately if I enter counseling?',
    paragraphs: [
      [
        { text: 'Pilots: ', bold: true },
        { text: 'Nope. The ' },
        {
          text: 'FAA clearly states',
          bold: true,
          href: AVIATION_LINKS.faaTherapyFaq,
          external: true,
        },
        {
          text: ' that you’re not obliged to report counseling until your next medical.',
        },
      ],
      [
        { text: 'ATCS: ', bold: true },
        { text: 'It’s a little murkier here. ' },
        {
          text: 'FAA Order 3930.3C, Chapter 1, section 9.e.1-5',
          bold: true,
          href: AVIATION_LINKS.faaOrder3930,
          external: true,
        },
        {
          text: ' states that, before performing safety-related duties, controllers must notify the Flight Surgeon between medical evaluations about counseling “for, or related to, substance use disorders such as substance dependence, abuse, or misuse (includes alcohol); and/or any mental condition such as anxiety or depression.” That covers a lot of bases.',
        },
      ],
      [
        {
          text: 'Also, the way the Order is written is a little backhanded; it says that counseling may be “excluded unless” it’s for any of the above conditions. Which brings us to…',
        },
      ],
    ],
  },
  {
    question: 'If I start counseling, does the therapist have to report it to the FAA?',
    paragraphs: [
      [
        { text: 'Hell no! ', bold: true },
        { text: 'It is ' },
        { text: 'your', italic: true },
        {
          text: ' responsibility, as the aviation professional, to report things like counseling on your medical application. But no — I will ',
        },
        { text: 'never', bold: true },
        {
          text: ' notify the FAA, or your AME, about your sessions and treatment progress without your knowledge.',
        },
      ],
      [
        {
          text: 'In some circumstances, the FAA may request records from your treatment, including counseling. But I won’t share that information with them unless:',
        },
      ],
    ],
    bullets: [
      [
        {
          text: 'I have a signed release from you giving me expressed permission to do so, and',
        },
      ],
      [
        {
          text: 'You and I review together what is to be shared with the FAA. I will share with them exactly what they ask for — no less, no more.',
        },
      ],
    ],
  },
  {
    question: 'Do I need a diagnosis to get counseling?',
    paragraphs: [
      [{ text: 'No. Whether or not you need a diagnosis depends on a couple things:' }],
    ],
    bullets: [
      [
        { text: 'the ' },
        { text: 'severity', bold: true },
        { text: ' of your ' },
        { text: 'symptoms', bold: true },
        { text: ' and ' },
        { text: 'impairments in functioning', bold: true },
        { text: ' (if any), and' },
      ],
      [
        { text: 'whether or not you want to seek ' },
        { text: 'reimbursement from your insurance', bold: true },
        { text: ' for out-of-network services.' },
      ],
    ],
    followUpParagraphs: [
      [
        {
          text: 'If you want to use your insurance at all, a diagnosis is necessary. But if you want to get counseling for stressors that might not meet a full diagnosis, you can still get counseling. Insurance just won’t pay for it, and you’ll still have to report it on your 8500. But counseling alone shouldn’t lead to a deferment.',
        },
      ],
      [
        { text: 'A diagnosis, ultimately, is ' },
        { text: 'helpful when the criteria are met', bold: true },
        { text: '. It’s a label that can ' },
        { text: 'validate', bold: true },
        { text: ' your experiences, help to ' },
        { text: 'unburden', bold: true },
        { text: ' a lot of suffering and confusion, and ' },
        { text: 'open a pathway toward a better life.', bold: true },
        { text: ' While that pathway can involve deferment or grounding, it’s actually not that typical. In fact, the ' },
        {
          text: 'Federal Air Surgeon herself, Dr. Susan Northrup, said',
          bold: true,
          href: AVIATION_LINKS.federalAirSurgeonVideo,
          external: true,
        },
        {
          text: ' that “only about 0.1% of all medical certificate applicants who disclose health issues are final denied.”',
        },
      ],
      [
        { text: 'A diagnosis can be ' },
        { text: 'harmful when criteria aren’t met', bold: true },
        {
          text: ' — no aviation professional should be grounded for a diagnosis they don’t have. We will determine ',
        },
        { text: 'together,', bold: true },
        { text: ' in session, whether or not a diagnosis is the right fit for you.' },
      ],
    ],
  },
  {
    question: "What diagnoses can lead to deferment, and which won't?",
    paragraphs: [
      [
        { text: 'Check out this ' },
        {
          text: 'detailed information from the Pilot Mental Health Campaign',
          bold: true,
          href: AVIATION_LINKS.pmhcGuide,
          external: true,
        },
        {
          text: ' (PMHC). It takes you through every diagnosis that is acceptable, which require evaluation, and which are disqualifying.',
        },
      ],
    ],
  },
  {
    question: 'What about medication?',
    paragraphs: [
      [
        { text: 'While I can’t prescribe medication, I can point you toward ' },
        {
          text: 'new guidance for AMEs that the FAA created around antidepressants',
          bold: true,
          href: AVIATION_LINKS.faaAntidepressants,
          external: true,
        },
        {
          text: '. There are medications that are now compatible with a Special Issuance, and an AME will look for stability over time on these meds. Before starting that type (or any) medication, work closely with the prescriber to understand how it’s intended to help you.',
        },
      ],
    ],
  },
];
