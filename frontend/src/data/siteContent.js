// Default site content, used as an instant fallback while /api/content loads
// (and in dev when the backend isn't running). The live, editable copy lives
// on the server in backend/data/content.json and is managed from /admin.
// This object must stay in the same shape as backend/data/content.default.json.

export const defaultContent = {
  site: {
    name: 'Agoge Wrestling Academy',
    shortName: 'Agoge',
    tagline: 'Wrestling Academy',
    established: '2026',
    address: {
      line1: '123 Main St, Suite 100',
      line2: 'Your City, ST 00000',
    },
    phone: '000.000.0000',
    email: 'info@agogewrestling.com',
    instagram: {
      handle: '@agogewrestling',
      url: 'https://www.instagram.com/',
    },
    // External registration platform (WrestlingIQ-style). Placeholder links.
    registrationBaseUrl: 'https://example.com/register',
  },

  footer: {
    groups: [
      {
        title: 'Programs',
        links: [
          { label: 'Spartans Youth', href: '#programs' },
          { label: 'Hoplites', href: '#programs' },
          { label: 'Elite', href: '#programs' },
          { label: 'Homeschool', href: '#programs' },
          { label: 'Personal Training', href: '#personal-training' },
        ],
      },
      {
        title: 'Academy',
        links: [
          { label: 'Staff', href: '#staff' },
          { label: 'Schedule', href: '#schedule' },
          { label: 'Competitions', href: '#competitions' },
          { label: 'Camps', href: '#camps' },
          { label: 'Reviews', href: '#reviews' },
          { label: 'Contact', href: '#contact' },
        ],
      },
    ],
  },

  hero: {
    image: '',
    imageVisibility: 50,
    eyebrowTagline: 'Forged Through Discipline',
    titleLine1: 'Forge Champions',
    titleLine2: 'On & Off The Mat',
    sub: 'Agoge Wrestling Academy develops complete athletes through technical mastery, discipline, and relentless work ethic. Inspired by the Spartan agoge — where warriors were made, not born — our room builds wrestlers who compete with honor and win with humility.',
  },

  accolades: [
    { num: '25+', label: 'Individual State\nChampion Medals' },
    { num: '80+', label: 'Total State\nMedals Earned' },
    { num: '3', label: 'National\nChampions' },
    { num: '4–18', label: 'Ages Trained\nYear-Round' },
  ],

  about: {
    title: ['Where Wrestlers', 'Become Warriors'],
    paragraphs: [
      'Founded in 2026, Agoge Wrestling Academy is a year-round wrestling program dedicated to unlocking the full potential of every athlete who steps into our room.',
      'The agoge was the legendary training system of ancient Sparta — a rite of passage that forged ordinary youth into extraordinary warriors. We carry that same standard: discipline, accountability, and an unshakable work ethic in every practice.',
      'Our mission is to use wrestling as a transformative force — building self-discipline, goal-setting skills, and humility in every student. We shape not just superior athletes, but well-rounded individuals who succeed in all aspects of life.',
    ],
    badge: 'Led by decorated coaches with championship pedigree',
  },

  programs: {
    main: [
      {
        age: 'Ages 4–7',
        name: 'Spartans Youth',
        image: '',
        imageVisibility: 50,
        desc: '"Get them comfortable on the mat." Introduction to wrestling fundamentals in a fun, safe, age-appropriate environment.',
        slug: 'spartans-youth',
        external: true,
      },
      {
        age: 'Ages 8–14',
        name: 'Hoplites',
        image: '',
        imageVisibility: 50,
        desc: '"Get them to love wrestling." Intermediate training focused on technique, competition prep, and team culture.',
        slug: 'hoplites',
        external: true,
      },
      {
        age: 'HS & Elite Youth',
        name: 'Elite',
        image: '',
        imageVisibility: 50,
        desc: '"Get them obsessed." Elite-level training for serious competitors. High intensity, high commitment, high results.',
        slug: 'elite',
        external: true,
      },
    ],
    secondary: [
      {
        age: 'Flexible Schedule',
        name: 'Homeschool Practice',
        image: '',
        imageVisibility: 50,
        desc: 'Daytime sessions designed for homeschooled athletes seeking structured training, development, and community.',
        slug: 'homeschool',
        external: true,
      },
      {
        age: 'All Ages',
        name: 'Camps & Clinics',
        image: '',
        imageVisibility: 50,
        desc: 'Intensive multi-day camps, open mat nights, and specialty clinics throughout the year.',
        link: '#schedule',
        external: false,
        arrowText: 'View Schedule',
      },
    ],
  },

  // Tier keys drive the color coding in the schedule grid and legend.
  scheduleTiers: {
    youth: { name: 'Spartans Youth', color: '#a88147' },
    hoplites: { name: 'Hoplites', color: '#e3ded4' },
    elite: { name: 'Elite', color: '#801c10' },
    homeschool: { name: 'Homeschool', color: '#b3aca1' },
    openmat: { name: 'Open Mat', color: '#795e36' },
  },

  schedule: {
    days: [
      {
        day: 'Sunday',
        classes: [{ tier: 'elite', time: '4:00 – 6:00 PM', name: 'Elite' }],
      },
      {
        day: 'Monday',
        classes: [
          { tier: 'homeschool', time: '10:00 – 11:00 AM', name: 'Homeschool' },
          { tier: 'hoplites', time: '5:00 – 6:30 PM', name: 'Hoplites' },
          { tier: 'elite', time: '6:30 – 8:00 PM', name: 'Elite' },
        ],
      },
      {
        day: 'Tuesday',
        classes: [
          { tier: 'youth', time: '4:00 – 5:00 PM', name: 'Spartans Youth' },
          { tier: 'hoplites', time: '5:00 – 6:30 PM', name: 'Hoplites' },
          { tier: 'elite', time: '6:30 – 8:00 PM', name: 'Elite' },
        ],
      },
      {
        day: 'Wednesday',
        classes: [
          { tier: 'homeschool', time: '10:00 – 11:00 AM', name: 'Homeschool' },
          { tier: 'elite', time: '6:30 – 8:00 PM', name: 'Elite' },
        ],
      },
      {
        day: 'Thursday',
        classes: [
          { tier: 'youth', time: '4:00 – 5:00 PM', name: 'Spartans Youth' },
          { tier: 'hoplites', time: '5:00 – 6:30 PM', name: 'Hoplites' },
          { tier: 'elite', time: '6:30 – 8:00 PM', name: 'Elite' },
        ],
      },
      {
        day: 'Friday',
        classes: [{ tier: 'openmat', time: '6:00 – 7:30 PM', name: 'Open Mat' }],
      },
      { day: 'Saturday', classes: [], rest: true },
    ],
    legend: [
      { tier: 'youth', image: '', imageVisibility: 50, meta: 'Tue & Thu · 4:00 – 5:00 PM', drop: 'Drop-in $20' },
      { tier: 'homeschool', image: '', imageVisibility: 50, meta: 'Mon & Wed · 10:00 – 11:00 AM', drop: 'Drop-in $20' },
      { tier: 'hoplites', image: '', imageVisibility: 50, meta: 'Mon, Tue & Thu · 5:00 – 6:30 PM', drop: 'Drop-in $20' },
      { tier: 'elite', image: '', imageVisibility: 50, meta: 'Mon – Thu · 6:30 – 8:00 PM\nSun · 4:00 – 6:00 PM', drop: 'Members only' },
      { tier: 'openmat', image: '', imageVisibility: 50, meta: 'Fridays · 6:00 – 7:30 PM', drop: 'Drop-in $20' },
    ],
    note: 'Schedule subject to change around holidays and tournament weekends. Contact us to confirm before your first drop-in.',
  },

  competitions: {
    events: [
      {
        month: 'Aug',
        day: '15',
        name: 'Season Opener Duals',
        venue: 'Your City, ST',
        compete: 'Sat · Aug 15',
        badge: 'Duals',
      },
      {
        month: 'Sep',
        day: '12',
        name: 'State Qualifier Series #1',
        venue: 'Your City, ST',
        compete: 'Sat · Sep 12',
        badge: 'Qualifier',
      },
    ],
    note: 'Roster spots and entry deadlines vary by event. Confirm registration with your coach before submitting entries.',
  },

  staff: {
    headCoach: {
      role: 'Head Coach & Owner',
      name: 'Nate Naumann',
      image: '',
      photoVisibility: 50,
      phone: '727.723.5090',
      email: 'info@agogewrestling.com',
      columns: [
        [
          {
            label: 'High School Accolades',
            items: [
              '2× FHSAA State Placer',
              '1st Team All-Conference',
              'Team Captain',
            ],
          },
          {
            label: 'Collegiate Accolades',
            items: [
              'NCAA Division 2 National Qualifier',
              '1st Team All-Conference (NSIC)',
            ],
          },
        ],
        [
          {
            label: 'General Accolades',
            items: [
              'USMC Infantry',
              'Coached National All-Americans',
              'Years of elite-level coaching experience',
            ],
          },
        ],
      ],
    },
    assistants: [
      {
        role: 'Elite Head Assistant',
        name: 'Coach Placeholder Two',
        image: '',
        photoVisibility: 50,
        phone: '000.000.0000',
        accoladeGroups: [
          {
            label: 'Accolades',
            items: ['State Champion', 'NCAA Qualifier', 'Placeholder accolade'],
          },
        ],
      },
      {
        role: 'Hoplites Head Coach',
        name: 'Coach Placeholder Three',
        image: '',
        photoVisibility: 50,
        phone: '000.000.0000',
        accoladeGroups: [
          {
            label: 'Accolades',
            items: ['State Placer', 'College Athlete', 'Placeholder accolade'],
          },
        ],
      },
      {
        role: 'Spartans Youth Head Coach',
        name: 'Coach Placeholder Four',
        image: '',
        photoVisibility: 50,
        phone: '000.000.0000',
        accoladeGroups: [
          {
            label: 'Accolades',
            items: ['Youth development specialist', 'Placeholder accolade'],
          },
        ],
      },
      {
        role: 'Homeschool Head Coach',
        name: 'Coach Placeholder Five',
        image: '',
        photoVisibility: 50,
        phone: '000.000.0000',
        accoladeGroups: [
          {
            label: 'Accolades',
            items: ['State Qualifier', 'Placeholder accolade'],
          },
        ],
      },
    ],
  },

  personalTraining: {
    intro:
      'Accelerate development with dedicated coaching from our staff. Sessions are tailored to the athlete — technique refinement, position work, match prep, or mental reps. Bring a partner or a small group to unlock lower per-athlete rates.',
    cards: [
      {
        tag: 'Solo Session',
        amount: '$80',
        unit: 'per session',
        name: '1-on-1',
        desc: 'Full coach attention for a single athlete. Every rep built around what that wrestler needs next.',
        featured: false,
      },
      {
        tag: 'Training Partner',
        amount: '$50',
        unit: 'per athlete',
        name: 'With a Partner',
        desc: 'Two athletes split the session — live drilling, split-instruction, and situational reps with a coach.',
        featured: true,
      },
      {
        tag: 'Small Group',
        amount: '$35',
        unit: 'per athlete',
        name: '4 or More Athletes',
        desc: 'Four or more athletes share the mat for focused technical work and competitive live situations.',
        featured: false,
      },
    ],
    notes: [
      {
        label: 'Members Only',
        text: 'Personal training is available exclusively to active Agoge members.',
        linkText: 'Enroll in a program',
        linkHref: '#programs',
        textAfter: ' to get started.',
      },
      {
        label: 'How to Schedule',
        text: 'Call or text your prospective coach directly to set up a session. Browse the ',
        linkText: 'coaching staff',
        linkHref: '#staff',
        textAfter: ' to find the right fit.',
      },
    ],
  },

  camps: {
    items: [
      {
        date: 'Every Friday',
        name: 'Open Mat Night',
        desc: 'Open practice sessions. Drop-ins welcome — $20 per athlete. All skill levels welcome.',
        link: '#contact',
      },
    ],
    note: 'Contact us for current camp dates and registration details.',
  },

  seedReviews: [
    {
      name: 'Parent A.',
      program: 'Spartans Youth',
      rating: 5,
      text: 'The coaches have been incredible with my 6-year-old. He went from shy and hesitant to confident and excited to get on the mat every week. Highly recommend!',
    },
    {
      name: 'Parent B.',
      program: 'Elite',
      rating: 5,
      text: 'My son has been training here since day one. The level of coaching is truly elite and the culture pushes every athlete to be their best.',
    },
    {
      name: 'Parent C.',
      program: 'Hoplites',
      rating: 5,
      text: 'The culture at Agoge is unlike any other gym we have tried. The coaches genuinely care about the kids as people, not just athletes.',
    },
  ],

  programOptions: [
    'Spartans Youth (Ages 4–7)',
    'Hoplites (Ages 8–14)',
    'Elite (HS & Elite Youth)',
    'Homeschool Practice',
    'Personal Training',
    'Camps / Clinics',
  ],

  reviewProgramOptions: [
    'Spartans Youth',
    'Hoplites',
    'Elite',
    'Homeschool Practice',
    'Camps / Clinics',
    'General',
  ],
}

// Computes fields derived from base content so the admin only edits base
// values (e.g. registration links are built from registrationBaseUrl + slug).
export function deriveContent(raw) {
  const content = structuredClone(raw)
  content.footer ??= structuredClone(defaultContent.footer)
  const { site, hero, programs } = content

  hero.eyebrow = `${site.address.line1.split(',')[0]} · Est. ${site.established} · ${hero.eyebrowTagline}`

  const withLink = (program) =>
    program.slug ? { ...program, link: `${site.registrationBaseUrl}/${program.slug}` } : program
  programs.main = programs.main.map(withLink)
  programs.secondary = programs.secondary.map(withLink)

  return content
}
