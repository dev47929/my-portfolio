export const PORTFOLIO_BIO = {
  name: "Dev",
  fullName: "Dev Sharma",
  title: "Computer Science Student & Developer",
  subTitle: {
    EN: "Computer Science Student at Rajiv Gandhi Proudyogiki Vishwavidyalaya | Academic specializing in core CS & modern JavaScript (.jsx)",
    MN: "Ражив Гандийн Технологийн Их Сургуулийн Компьютерийн шинжлэх ухааны оюутан | Веб ба JavaScript (.jsx) хөгжүүлэлтийн чиглэлээр мэргэшиж буй"
  },
  location: "Bhopal, Madhya Pradesh, India",
  email: "dev47929@gmail.com",
  github: "https://github.com/devsharma",
  linkedin: "https://linkedin.com/in/devsharma",
  aboutFull: {
    EN: "I am a Computer Science student with a strong academic foundation (8.82 CGPA, 9.00 SGPA in Semester 3) from Rajiv Gandhi Proudyogiki Vishwavidyalaya. I study and build software systems with a focus on database optimization, core Data Structures, and clean custom application development using JavaScript (.jsx).",
    MN: "Би Ражив Гандийн Технологийн Их Сургуулийн Компьютерийн шинжлэх ухааны оюутан бөгөөд суралцах хугацаандаа өндөр амжилт (Сем-3 SGPA 9.00, CGPA 8.82) үзүүлсэн. Өгөгдлийн бүтэц, өгөгдлийн сангийн оновчлол, JavaScript (.jsx) дээр суурилсан веб аппликейшн хөгжүүлэлтийн чиглэлээр суралцаж байна."
  },
  philosophy: {
    EN: "Academic rigor, attention to data structures, and hands-on JavaScript application development are key to building reliable software systems.",
    MN: "Эрдэм шинжилгээний нарийн сургалт, өгөгдлийн бүтэц дээрх анхаарал болон JavaScript аппликейшн хөгжүүлэлт нь найдвартай системийг бүтээх түлхүүр суурь юм."
  }
};

export const CORE_STATS = [
  { value: "8.82", label: { EN: "Cumulative CGPA", MN: "Нийт голч CGPA" } },
  { value: "9.00", label: { EN: "Semester 3 SGPA", MN: "Сем-3 SGPA" } },
  { value: "10+", label: { EN: "CS Subjects Audited", MN: "Судалсан мэргэжлийн хичээл" } }
];

export const EDUCATION_DATA = {
  title: { EN: "Bachelor of Technology in Computer Science (B.Tech)", MN: "Компьютерийн ухааны технологийн бакалавр (B.Tech)" },
  period: "Jul 1, 2024 - Present",
  gpa: "8.82 CGPA",
  institution: {
    EN: "Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal",
    MN: "Ражив Гандийн Проудьёогики Вишвавидялаяа, Бхопал"
  }
};

export const BENTO_PROFILE = {
  column1: {
    EN: "CS Student focusing on Web Databases & JavaScript (.jsx)",
    MN: "Өгөгдлийн сан болон JavaScript (.jsx) хөгжүүлэлтээр мэргэшиж буй оюутан"
  },
  column2: {
    EN: "Top Grade Achiever in DBMS (Grade B+), Operating Systems (Grade A), & OOP (Grade A)",
    MN: "Өгөгдлийн сангийн систем (DBMS - B+), Үйлдлийн систем (A), Объект хандлагат програмчлал (A)-д өндөр дүн авсан"
  },
  column3: {
    EN: "Developing software with modern JavaScript & JSX",
    MN: "Орчин үеийн JavaScript & JSX ашиглан програм хангамж хөгжүүлэгч"
  },
  column4: {
    title: { EN: "Academic Roll Details", MN: "Оюутны сурлагын мэдээлэл" },
    text: {
      EN: "Roll Number: 0103CS241139, Status: Regular CS Student",
      MN: "Бүртгэлийн дугаар: 0103CS241139, Төлөв: Идэвхтэй оюутан"
    }
  }
};

export const PROJECTS_DATA = [
  {
    id: "mining-auction",
    title: "Mining Auction System",
    subtitle: "Real-time Auction Platform",
    type: "engineering",
    date: "2024",
    tags: ["React", "Go", "WebSockets", "Docker"],
    description: "Real-time auction system handling $140M+ deals.",
    role: "Lead Backend & Real-time Architect",
    longDescription: "A high-performance bidding exchange system audited under strict international trading protocols. Handled atomic transactions, instant bid distributions over secure WebSockets, and real-time ledger reporting.",
    features: [
      "Atomic transactional bidding queues",
      "WebSocket-based millisecond real-time ledger updates",
      "ISO-secure database auditing architecture",
      "Containerized clustering via Docker & Kubernetes"
    ],
    metrics: [
      { label: "Aggregate Volume", value: "$140M+" },
      { label: "Transaction Latency", value: "<8ms" },
      { label: "Concurrent Connections", value: "10,000+" }
    ]
  },
  {
    id: "fibo-stack",
    title: "Cloud Platform (Fibostack)",
    subtitle: "Cloud Infrastructure",
    type: "visual",
    date: "2024",
    tags: ["Next.js", "Kubernetes", "gRPC", "Prometheus"],
    description: "Cloud infrastructure for Central Asia (Similar to AWS platform).",
    role: "Infrastructure Lead",
    longDescription: "Fibostack is an sovereign cloud orchestration layer designed to provision bare-metal and virtual resources in Central Asia. Includes integrated storage buckets, isolated virtual subnets, and automated dashboard telemetry.",
    features: [
      "Highly stable hypervisor cluster management",
      "gRPC inter-service communication pipes",
      "Isolated multi-tenant networks and security buckets",
      "Prometheus & Grafana visual server gauges"
    ],
    metrics: [
      { label: "Uptime guarantee", value: "99.98%" },
      { label: "Microservices deployed", value: "62" },
      { label: "API payload throughput", value: "48k/s" }
    ]
  },
  {
    id: "brokerage-app",
    title: "Brokerage Mini App",
    subtitle: "Fintech Stock Trading",
    type: "interactive",
    date: "2023",
    tags: ["React Native", "JavaScript (.jsx)", "Redis", "Financial APIs"],
    description: "Stock trading with live balances (Mongolian Stock Exchange).",
    role: "Senior Mobile Engineer",
    longDescription: "An exquisite stock tracking and ordering application catering to over 1,000,005 registered accounts in Mongolia, integrating secure bank accounts and the Mongolian Stock Exchange central directory.",
    features: [
      "Live order-book visual rendering charts",
      "Two-factor bio-metric encryption protocols",
      "Redis cached instant ledger lookups",
      "Local bank deposit and withdrawal API integrations"
    ],
    metrics: [
      { label: "System Audits Passed", value: "12 / 12" },
      { label: "Chart Refresh Interval", value: "0.2s" },
      { label: "Total Client Base", value: "1.2M+" }
    ]
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Microservice",
    subtitle: "Artificial Intelligence Thesis",
    type: "audio",
    date: "2025",
    tags: ["Python", "Golang", "HuggingFace", "RabbitMQ"],
    description: "AI agents collaborating through microservices (BSc Thesis).",
    role: "AI Scientist & Developer",
    longDescription: "Graduation Bachelor's thesis testing cooperative multi-agent paradigms. Autonomous node clusters communicate over message brokers, diagnosing server outages and re-routing transaction networks automatically.",
    features: [
      "Autonomous prompt chains and specialized agent nodes",
      "RabbitMQ brokered agent communication pipeline",
      "Heuristic self-healing server infrastructure diagnostics",
      "Deeply trained custom language model grounding"
    ],
    metrics: [
      { label: "Cooperative accuracy", value: "98.2%" },
      { label: "Broker message speed", value: "4.2ms" },
      { label: "Diagnostic capability", value: "65 types" }
    ]
  }
];

export const EXPERIENCE_CARDS = [
  {
    role: { EN: "Frontend Engineer", MN: "Фронтенд Инженер" },
    desc: {
      EN: "Deployed three projects as a team leader, and built a real-time auction interface. Continuously improving UX, now exploring Framer Motion animations.",
      MN: "Багийн ахлагчаар 3 төслийг амжилттай хүлээлгэн өгсөн. Бодит цагийн дуудлага худалдааны интерфейс бүтээж, хэрэглэгчийн туршлагыг тасралтгүй сайжруулж байна."
    },
    accent: "purple"
  },
  {
    role: { EN: "Backend Engineer", MN: "Бэкэнд Инженер" },
    desc: {
      EN: "Designed and built ISO-secure monolith and microservices systems where over $40 million USD worth of trades have been executed.",
      MN: "ISO стандартын шаардлага хангасан бэкэнд микросервис болон монолит системийг барьж байгуулсан бөгөөд системээр 40 сая ам.доллар давсан арилжаа хийгдсэн."
    },
    accent: "gold"
  },
  {
    role: { EN: "Teammate", MN: "Хамтрагч" },
    desc: {
      EN: "Worked with stakeholders to develop Mining Commodity Exchange System. Led development team, and deployed projects successfully.",
      MN: "Оролцогч талуудтай хамтран Уул уурхайн түүхий эдийн биржийн системийг хөгжүүлсэн. Хөгжүүлэлтийн багийг ахалж, төслүүдээ амжилттай байршуулсан."
    },
    accent: "cyan"
  },
  {
    role: { EN: "Aspiring DevOps", MN: "ДэвОпс Инженер" },
    desc: {
      EN: "Maintained multiple systems in production and currently preparing for Red Hat and AWS Solutions Architect certifications.",
      MN: "Бүтээгдэхүүний олон төрлийн үүлэн систем, серверүүдийг хариуцан хянадаг бөгөөд одоогоор Red Hat болон AWS сертифицикатуудад бэлдэж байна."
    },
    accent: "rose"
  }
];

export const TIMELINE_JOURNEY = [
  {
    year: "2025",
    title: { EN: "Graduation & AI Cooperative Agent Research", MN: "Төгсөлт & Хиймэл Оюуны Агентуудын Судалгаа" },
    desc: {
      EN: "Finishing final semester thesis on multi-agent microservices systems. Concurrently honored as Best Student of the Year 2025 across key technology departments.",
      MN: "Хиймэл оюуны олон агент хамтран ажиллах микросерверийн диплом хамгаалж байна. МУИС-ийн Мэдээлэл Технологийн шилдэг оюутнаар (2025) шалгарсан."
    }
  },
  {
    year: "2024",
    title: { EN: "Architecting $140 Million Commodity Exchange", MN: "140 Сая Долларын Биржийн Систем" },
    desc: {
      EN: "Designed and implemented secure transactional databases and high-speed API layers for the Mongolian Mining Commodity Exchange. Audited for ISO compliance.",
      MN: "Уул уурхайн түүхий эдийн биржийн аюулгүйн шаардлага хангасан мэдээллийн сан, өндөр хурдны урсгалыг амжилттай архитектурчилж суурилуулсан."
    }
  },
  {
    year: "Early 2024",
    title: { EN: "Financial Technology at NOBIC Securities", MN: "НӨБИК Секьюритиз Финтек Систем" },
    desc: {
      EN: "Worked as an IT professional building high-volume financial brokerage charts, API gateways for 1 million+ active users, and specialized backoffice dashboards.",
      MN: "Улсын хэмжээнд 1 сая гаруй харилцагчтай арилжааны систем, брокерийн үйлчилгээ болон арын удирдлагын хянах самбарыг хөгжүүлж хувь нэмэр ороулсан."
    }
  },
  {
    year: "2023",
    title: { EN: "Global Government Mentor Project", MN: "Засгийн Газрын Сургалтын Хөтөлбөр" },
    desc: {
      EN: "Invited by state representatives and 'American Corner' to mentor young high-school professionals, teaching computational logic and english speaking streams.",
      MN: "Засгийн газрын урилгаар хөдөө орон нутгийн сурагчдад програмчлалын суурь логик болон Англи хэлийг амжилттай зааж менторлосон."
    }
  }
];
