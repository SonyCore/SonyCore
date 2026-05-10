export type ExperienceEntry = {
  id: string;
  company: string;
  startDate: string;
  endDate: string | null;
  location: string;
};

export type ProjectEntry = {
  id: string;
  name: string;
  date?: string;
  url: string;
};

export type Skill = {
  name: string;
  /** SVG filename (without extension) under /public/icons/. */
  icon: string;
  /** Official documentation / homepage URL. */
  url: string;
};

export const resume = {
  name: "Sonia Fatholahi",
  email: "soniafatholahi@proton.me",
  phone: "",
  location: "Türkiye, Ankara",
  socials: {
    github: "https://github.com/SonyCore",
    linkedin: "https://www.linkedin.com/in/soniafatholahi",
    telegram: "https://t.me/SoniaCircuit",
    youtube: "https://youtube.com/@SoniaCircuit",
  },
  experience: [
    {
      id: "qubitorbit",
      company: "QubitOrbit",
      startDate: "11/2025",
      endDate: null,
      location: "Dubai, UAE · Remote",
    },
    {
      id: "arvancloud",
      company: "Private Company · FANAP Infrastructure",
      startDate: "07/2024",
      endDate: "12/2024",
      location: "Iran, Tehran",
    },
    {
      id: "spara",
      company: "Spara Security Group · FANAP Holding",
      startDate: "03/2023",
      endDate: "05/2024",
      location: "Tehran, Iran",
    },
    {
      id: "konect",
      company: "Konect Sharif · Sharif University",
      startDate: "10/2022",
      endDate: "03/2023",
      location: "Tehran, Iran",
    },
    {
      id: "sharif",
      company: "Sharif University",
      startDate: "10/2021",
      endDate: "09/2022",
      location: "Tehran, Iran",
    },
  ] satisfies ExperienceEntry[],
  skills: {
    "Programming Languages": [
      { name: "Golang", icon: "go", url: "https://go.dev" },
      { name: "Python", icon: "python", url: "https://www.python.org" },
      {
        name: "JavaScript",
        icon: "javascript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Bash",
        icon: "gnubash",
        url: "https://www.gnu.org/software/bash/",
      },
    ],
    "DevOps & Tools": [
      { name: "Linux", icon: "linux", url: "https://www.kernel.org" },
      { name: "Docker", icon: "docker", url: "https://www.docker.com" },
      {
        name: "GitLab CI/CD",
        icon: "gitlab",
        url: "https://docs.gitlab.com/ee/ci/",
      },
      { name: "RabbitMQ", icon: "rabbitmq", url: "https://www.rabbitmq.com" },
      { name: "Kafka", icon: "apachekafka", url: "https://kafka.apache.org" },
    ],
    Databases: [
      {
        name: "PostgreSQL",
        icon: "postgresql",
        url: "https://www.postgresql.org",
      },
      { name: "MongoDB", icon: "mongodb", url: "https://www.mongodb.com" },
      { name: "MySQL", icon: "mysql", url: "https://www.mysql.com" },
    ],
    Frameworks: [
      { name: "ReactJS", icon: "react", url: "https://react.dev" },
      { name: "NodeJS", icon: "nodedotjs", url: "https://nodejs.org" },
    ],
  } as Record<string, Skill[]>,
  projects: [
    {
      id: "namira-core",
      name: "namira-core",
      date: "06/2025",
      url: "https://github.com/SonyCore/namira-core",
    },
    {
      id: "xraygen",
      name: "XRayGen",
      url: "https://github.com/SonyCore/XRayGen",
    },
    {
      id: "cfscanner",
      name: "CFScanner",
      url: "https://github.com/SonyCore/CFScanner",
    },
    {
      id: "gfwknock",
      name: "gfwKnock",
      url: "https://github.com/SonyCore/gfwKnock",
    },
    {
      id: "github-search-cli",
      name: "Github Search Cli",
      url: "https://github.com/SonyCore/github-search-cli",
    },
    {
      id: "djangomq",
      name: "DjangoMQ",
      url: "https://github.com/SonyCore/DjangoMQ",
    },
    {
      id: "sonarping",
      name: "SonarPing",
      url: "https://github.com/SonyCore/SonarPing",
    },
  ] satisfies ProjectEntry[],
  softSkills: [
    "Communication",
    "Adaptability",
    "Team Collaboration",
    "Time Management",
  ],
  languages: [
    { name: "Persian", level: "Native / Bilingual" },
    { name: "English", level: "Proficient" },
    { name: "Turkish", level: "Basic" },
  ],
} as const;

export type Resume = typeof resume;
