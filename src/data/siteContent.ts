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
  contactWidgetUrl: 'https://jfarrlmhc.clientsecure.me/contact-widget',
  mentayaWidgetUrl:
    import.meta.env.VITE_MENTAYA_WIDGET_URL ||
    'https://app.mentaya.com/public/practices/NI6MdMhZDYEOybs8mKuk/eligibility/widget',
  sessionFee: 200,
  sessionMinutes: 55,
  consultationMinutes: 15,
  availability: 'Immediate openings · Monday – Thursday',
  format: '100% Virtual Telehealth across Massachusetts',
};

export const CORE_VALUE_PILLARS = [
  {
    index: '01',
    label: 'SCHEDULING FLEXIBILITY',
    title: 'Immediate openings, Monday through Thursday.',
    description:
      'Openings with in-network providers can feel as rare as hen’s teeth. Private-pay care means no six-month waitlists, no insurance company dictating how many sessions you get, and immediate access when you hit your tipping point.',
  },
  {
    index: '02',
    label: 'VALUES-ALIGNED CLARITY',
    title: 'Clarity on what the hell you actually want out of life.',
    description:
      'Why do we really do what we do? To get the presentation done? Impress the boss? Climb the ladder? Connecting your behaviors to your actual values—community, relationships, self-confidence—is far more sustainable than chasing the next metric.',
  },
  {
    index: '03',
    label: 'COLORFUL, CANDID REFLECTION',
    title: 'Therapy that is rich, direct, and unexpectedly human.',
    description:
      'Not just passive nodding. I reflect your story back in my own words, metaphors, and colorful illustrations—sometimes whimsical, often entertaining, and always aimed at helping you understand who you are and what you truly believe.',
  },
];

export const TIPPING_POINTS = [
  {
    category: 'CAREER & EXECUTIVE BURNOUT',
    quote:
      '“I can’t quit my job because I don’t have another one, but I can’t keep working in this job because I just can’t take it anymore.”',
    context: 'Where the “a-ha” moment collides head-on with the “oh, fuck” moment.',
  },
  {
    category: 'NARCISSISTIC FAMILY CYCLES',
    quote:
      'Doing your aging, narcissistic dad’s laundry for the 10,000th time—finally realizing he will never show gratitude, or realizing you married a version of him.',
    context: 'Breaking generational people-pleasing and reclaiming a life that belongs to you.',
  },
  {
    category: 'AVIATION PROFESSIONALS',
    quote:
      'Your spouse finally says something has been “off” for months—and you know you can’t carry the weight alone, but you’re terrified of losing your medical.',
    context: 'Aviation-informed care aligned with 2026 FAA mental health guidance.',
  },
  {
    category: 'PERFORMERS, MUSICIANS & ACADEMICS',
    quote:
      'A fellow musician asks, “Why did you stop gigging with us?”—or a dissertation advisor’s email leaves you paralyzed for days.',
    context: 'Untangling perfectionism and performance anxiety when your craft is your identity.',
  },
];

export const CLIENT_POPULATIONS = [
  {
    id: 'aviation',
    title: 'Aviation Professionals',
    subtitle: 'Pilots · Air Traffic Controllers · Flight Attendants',
    summary:
      'Aviation-informed counseling that respects your livelihood, understands time-zone fatigue and cockpit culture, and navigates FAA documentation transparently.',
  },
  {
    id: 'performers',
    title: 'Musicians, Actors & Presenters',
    subtitle: 'Stage · Studio · Broadcast · Creative Direction',
    summary:
      'For performers and creatives fighting crippling self-doubt, perfectionism, or the blank-mind freeze when the red light turns on.',
  },
  {
    id: 'leaders',
    title: 'Managers, Leaders & Academics',
    subtitle: 'Executives · Product Leads · PhD Candidates',
    summary:
      'When high output masks chronic imposter syndrome, advisor/board friction, or fear that one misstep will expose you.',
  },
  {
    id: 'adult-children',
    title: 'Adult Children of Narcissistic Parents',
    subtitle: 'Boundaries · Autonomy · Identity Reconstruction',
    summary:
      'Stopping the lifelong loop of people-pleasing and hyper-vigilance so you can finally write the story of your own life.',
  },
];

export const EDUCATION_CREDENTIALS = [
  {
    year: '2017',
    credential: 'Massachusetts Licensed Mental Health Counselor (LMHC #10134)',
    institution: 'Board of Registration of Allied Mental Health & Human Services Professions',
  },
  {
    year: '2014',
    credential: 'M.S., Counseling Psychology',
    institution: 'Northeastern University',
  },
  {
    year: '2003',
    credential: 'M.Ed., Higher Education Administration',
    institution: 'University of Massachusetts Amherst',
  },
  {
    year: '2001',
    credential: 'B.S., Film Production',
    institution: 'Boston University',
  },
];

export const FIT_CRITERIA = {
  bestWith: [
    'Have a quirky sense of humor (or appreciate people who do)',
    'Enjoy metaphors, parallels, and concrete illustrations to make sense of complex patterns',
    'Don’t mind the occasional dad joke',
    'Are serious about lasting change, but flexible about how to get there',
  ],
  notForYouIf: [
    'You are dealing with severe acute symptoms such as psychosis (hallucinations or delusions), mania, grandiosity, or a primary personality disorder',
    'You believe the world owes you something without examining your own agency',
    'You aren’t willing to look candidly at your choices, beliefs, and patterns',
    'You strongly dislike occasional swearing',
  ],
};

export const FAQS = [
  {
    question: 'Will I really get something concrete for my $200 per session?',
    answer:
      'Yes. We don’t do aimless venting for 55 minutes. Together we connect your daily behaviors back to your actual values, dismantle the beliefs driving your imposter syndrome, and build practical boundaries you can feel working in real life. That’s also why we start with a free 15-minute consultation—so you can gauge the fit firsthand before spending a dime.',
  },
  {
    question: 'How does out-of-network insurance reimbursement work?',
    answer:
      'Sessions are $200 for 55 minutes. Because I don’t contract directly with insurance panels, no insurer can dictate your diagnosis, treatment length, or session focus. I provide monthly superbills you can submit directly to your insurer for out-of-network reimbursement, or you can use the Mentaya eligibility tool on the Services page to check your benefits in seconds and have them handle claim filing for a 5% fee.',
  },
  {
    question: 'I’m a pilot or controller. Will entering therapy ground me or trigger an automatic FAA report?',
    answer:
      'Hell no—I never notify the FAA or your AME without your explicit signed release and our joint review. Under May 2026 FAA policy updates and the Aviation Medication Transparency Act, routine counseling is increasingly supported. Pilots are not required to report counseling until their next medical exam, and if documentation is ever requested, we review every word together.',
  },
];
