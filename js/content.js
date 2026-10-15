/**
 * Site content — the single source of truth for everything the page says.
 *
 * To update the portfolio you should only ever need to edit this file:
 *  - add a project   → push an object into `projects.items`
 *  - add a job       → push an object into `experience.items`
 *  - add a skill     → add a string to the right `skills.groups[].items`
 *
 * Any block with a `label` gets a numbered heading and a link in the navigation.
 * Fields marked "rich" support *asterisks* for emphasis (rendered as italic serif).
 */

const content = {
  person: {
    name: 'Sheeza Tariq',
    firstName: 'Sheeza',
    roles: ['designer', 'strategist', 'builder'],
    location: 'Lahore, Pakistan',
    email: 'sheezatariq6013@gmail.com',
    phone: { display: '+92 316 3227626', href: 'tel:+923163227626' },
    cv: { label: 'Download CV', href: 'assets/sheeza-tariq-cv.pdf' },
  },

  // Each id needs a matching [data-mood="…"] palette in css/base/tokens.css
  moods: [
    { id: 'calm', label: 'calm' },
    { id: 'joy', label: 'joy' },
    { id: 'dreamy', label: 'dreamy' },
    { id: 'bold', label: 'bold' },
  ],

  hero: {
    greeting: "Hello, I'm",
    tagline: 'I give feelings a *shape* — through design, art and a little bit of code.', // rich
    primaryAction: { label: 'See my work', href: '#work' },
    moodPrompt: 'Set the mood',
    caption: 'The colours behind my name are a live piece — pick a mood to change them.',
  },

  about: {
    label: 'About',
    title: 'Creative at heart, strategic by habit, and curious about *how things work* — and how they break.', // rich
    paragraphs: [
      "I'm a digital designer and business developer, currently studying Digital Forensics & Cyber Security. The question I keep coming back to is how a colour, a curve or a frame can carry an emotion — and how to turn that feeling into something people actually use.",
      'Day to day I move between design files, client calls and Python scripts. That mix of visual art, AI automation and programming is how I build projects with impact, help businesses grow and look after international clients.',
    ],
    sides: [
      {
        title: 'Designer',
        text: 'Abstract art, web art and cinematography are where I think out loud. I bring that eye to intuitive, user-centred interfaces.',
      },
      {
        title: 'Strategist',
        text: "I pitch ideas, run ad campaigns and manage outreach — and I've helped win international clients, including a long-term retained one.",
      },
      {
        title: 'Builder',
        text: 'I build with Python, JavaScript and AI, from a sign language interpreter to a security analyzer for websites.',
      },
    ],
    facts: [
      { value: '7+', label: 'months in business development' },
      { value: '1+', label: 'year of freelance UI/UX design' },
      { value: '3', label: 'languages spoken fluently' },
      { value: 'Gold', label: 'medalist, in class and beyond' },
    ],
  },

  experience: {
    label: 'Experience',
    title: "Where I've been *growing*.", // rich
    items: [
      {
        role: 'Business Development Executive & Technical Recruiter',
        org: 'Ran-Ai',
        period: '7+ months',
        highlights: [
          'Led business development: pitching ideas, managing projects and running online ad campaigns.',
          'Managed social media and outreach, winning multiple international clients — including a high-value, long-term retained client.',
          'Sourced and secured freelance and contract roles for colleagues outside the company.',
          'Ran quality assurance testing to keep product standards and reliability high.',
        ],
        tags: ['Business Development', 'Client Acquisition', 'Social Media', 'Recruiting', 'QA'],
      },
      {
        role: 'UI/UX Designer',
        org: 'Freelance',
        period: '1+ years',
        highlights: [
          'Designed intuitive, user-centred interfaces for a range of digital platforms, focused on seamless and engaging experiences.',
        ],
        tags: ['UI Design', 'UX', 'Figma'],
      },
    ],
  },

  projects: {
    label: 'Work',
    title: "Things I've *built*.", // rich
    /**
     * Optional fields per project:
     *  - links: [{ label, href }]   → links under the description
     *  - image: 'assets/…'          → replaces the generated cover art
     */
    items: [
      {
        id: 'sign-language-interpreter',
        title: 'Sign Language Interpreter',
        summary: 'An application that uses Python and AI to translate sign language, so more conversations can happen without barriers.',
        tags: ['Python', 'AI', 'Accessibility'],
      },
      {
        id: 'website-analyzer',
        title: 'Website Analyzer for Cybersecurity',
        summary: 'An AI-assisted tool that analyses websites for vulnerabilities and security metrics, built on core ideas from digital forensics and cybersecurity.',
        tags: ['Cybersecurity', 'AI', 'Digital Forensics'],
        links: [{ label: 'View on GitHub', href: 'https://github.com/Sheezayy13/website-analyzer' }],
      },
    ],
  },

  skills: {
    label: 'Skills',
    title: 'What I bring to the *table*.', // rich
    groups: [
      {
        title: 'Design & Visual Arts',
        featured: 'Visualizing emotions in art',
        items: ['Web Art', 'Abstract Art', 'Cinematography', 'Adobe Illustrator', 'Figma', 'Canva'],
      },
      {
        title: 'Business & Management',
        items: ['Business Development', 'Project Management', 'Client Acquisition', 'Social Media Management', 'Pitching Ideas'],
      },
      {
        title: 'Development & Tech',
        items: ['HTML / CSS', 'JavaScript', 'React', 'Next.js', 'Python', 'AI Automation', 'Prompt Engineering', 'QA'],
      },
      {
        title: 'Soft Skills',
        items: ['Creative Thinking', 'Clear Articulation', 'Leadership'],
      },
    ],
  },

  background: {
    label: 'Background',
    title: 'The *story* so far.', // rich
    education: [
      {
        title: 'BS Digital Forensics & Cyber Security',
        place: 'Lahore Garrison University',
        detail: '7th semester · graduating 2027',
      },
      {
        title: 'Pre-Medical / Biology Science',
        place: 'Intermediate & Secondary Education',
      },
    ],
    achievements: [
      {
        title: 'Gold Medalist',
        text: 'A track record of high achievement in academics and beyond, with leadership, creativity and social impact as an activist.',
      },
    ],
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Urdu', level: 'Fluent' },
      { name: 'Punjabi', level: 'Fluent' },
    ],
  },

  contact: {
    label: 'Contact',
    title: "Let's make something that *feels* right.", // rich
    text: 'Have a project, an idea, or just want to say hello? My inbox is always open.',
  },
};

export default content;
