export type ExperienceEntry = {
  id: string;
  company: string;
  startDate: string;
  endDate: string | null;
  location?: string;
};

export type ProjectEntry = {
  id: string;
  name: string;
  date?: string;
  url: string;
};

export type Skill = {
  name: string;
  icon: string;
  url: string;
};

export const resume = {
  name: "Sony Fatholahi",
  email: "soniafatholahi@proton.me",
  phone: "",
  location: "Türkiye, Ankara",
  coords: { city: "Ankara", lat: 39.9334, lon: 32.8597 },
  scheduleUrl: "https://calendar.app.google/bcvLmj3UJ3N8kvCQ8",
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
      id: "private-ar",
      company: "Private Company",
      startDate: "07/2024",
      endDate: "12/2024",
    },
    {
      id: "private-sp",
      company: "Private Company",
      startDate: "03/2023",
      endDate: "05/2024",
    },
    {
      id: "private-ko",
      company: "Private Company",
      startDate: "10/2022",
      endDate: "03/2023",
    },
    {
      id: "private-sh",
      company: "Private Company",
      startDate: "10/2021",
      endDate: "09/2022",
    },
  ] satisfies ExperienceEntry[],
  skills: {
    "Programming Languages": [
      { name: "Python", icon: "python", url: "https://www.python.org" },
      { name: "Golang", icon: "go", url: "https://go.dev" },
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
      { name: "Kubernetes", icon: "kubernetes", url: "https://kubernetes.io" },
      { name: "Terraform", icon: "terraform", url: "https://www.terraform.io" },
      { name: "Ansible", icon: "ansible", url: "https://www.ansible.com" },
      { name: "Nexus", icon: "sonatype", url: "https://www.sonatype.com/nexus-repository-oss" },
      { name: "Prometheus", icon: "prometheus", url: "https://prometheus.io" },
      { name: "Grafana", icon: "grafana", url: "https://grafana.com" },
      { name: "ELK Stack",
        icon: "elk",
        url: "https://www.elastic.co/what-is/elk-stack",
      },
      
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
        "name": "ClickHouse",
        "icon": "clickhouse",
        "url": "https://clickhouse.com",
      },
      { name: "MongoDB", icon: "mongodb", url: "https://www.mongodb.com" },
      {
        name: "PostgreSQL",
        icon: "postgresql",
        url: "https://www.postgresql.org",
      },
      { name: "MySQL", icon: "mysql", url: "https://www.mysql.com" },
    ],
    Frameworks: [
      { name: "FastAPI", icon: "fastapi", url: "https://fastapi.tiangolo.com" },
      { name: "Django", icon: "django", url: "https://www.djangoproject.com" },
      { name: "Flask", icon: "flask", url: "https://flask.palletsprojects.com" },
      { name: "Gin", icon: "gin", url: "https://gin-gonic.com" },
      { name: "Echo", icon: "go", url: "https://echo.labstack.com" },
      { name: "Fiber", icon: "go", url: "https://gofiber.io" },
    ],
    Security: [
      { name: "Vault", icon: "vault", url: "https://www.vaultproject.io" },
      { name: "Trivy", icon: "trivy", url: "https://trivy.dev" },
      { name: "Snyk", icon: "snyk", url: "https://snyk.io" },
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
      id: "hydra",
      name: "Hydra",
      date: "08/2026",
      url: "https://github.com/Ja7ad/hydra",
    },

    {
      id: "xraygen",
      name: "XRayGen",
      url: "https://github.com/SonyCore/XRayGen",
    },
    {
      id: "rabbitmq-perobject-dashboard",
      name: "RabbitMQ Per Object Dashboard",
      url: "https://github.com/SonyCore/rabbitmq-per-object-dashboard",
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
    { name: "English", level: "Proficient" },
  ],
} as const;

export type Resume = typeof resume;
