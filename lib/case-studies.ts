export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  timeline: string;
  category: string;
  constraintBadge: string;
  context: {
    agency: string;
    scale: string;
    team: string;
    summary: string;
  };
  securityNotice: string;
  problem: {
    overview: string;
    painPoints: string[];
  };
  architecture: {
    stack: string[];
    decisions: { title: string; rationale: string }[];
    diagramAscii: string;
  };
  outcome: {
    highlights: string[];
    summary: string;
  };
  visualArtifacts: {
    type: "diagram" | "snippet" | "redacted-dashboard";
    title: string;
    description: string;
    codeOrContent?: string;
  }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  satuchat: {
    slug: "satuchat",
    title: "SatuChat Enterprise Chatbot Orchestration",
    tagline: "Multi-tenant RAG-powered enterprise AI platform: hybrid vector search, knowledge base management, LLM gateway routing, and tool-augmented agents in 12 integrated modules.",
    role: "Lead Backend Engineer & Platform Architect",
    timeline: "9 Months (ongoing feature development)",
    category: "Enterprise AI Platform",
    constraintBadge: "Multi-Tenant Isolation & Enterprise-Grade RAG Pipeline",
    context: {
      agency: "Enterprise SaaS / Internal Knowledge Platform",
      scale: "12+ integrated modules, 110+ features, multi-tenant architecture",
      team: "1 Lead Engineer (end-to-end: architecture, backend, infra, DevOps)",
      summary: "Architected and built a production-grade multi-tenant RAG chatbot platform from scratch - enabling organizations to deploy AI-powered knowledge assistants with full data isolation, hybrid vector search, tool-augmented agents, and multi-provider LLM gateway routing."
    },
    securityNotice: "Platform ini dirancang dengan isolasi tenant penuh - setiap query Qdrant wajib difilter tenant_id, enkripsi field-level untuk API keys, circuit breaker pada provider eksternal, dan multi-level rate limiting. Repositori bersifat private.",
    problem: {
      overview: "Organisasi membutuhkan chatbot AI yang bisa mengakses knowledge base internal mereka, tetapi solusi SaaS publik (OpenAI, LangChain cloud) tidak menjamin isolasi data, kedaulatan dokumen, dan kontrol akses granular per departemen.",
      painPoints: [
        "Solusi SaaS publik mengekspos dokumen internal ke provider eksternal - risiko kebocoran data rahasia perusahaan.",
        "Tidak ada platform tunggal yang menggabungkan RAG chat, manajemen knowledge base, LLM gateway multi-provider, dan tool agents dalam satu sistem terisolasi.",
        "Kebutuhan kontrol akses granular: satu platform harus melayani banyak tenant dengan koleksi dokumen, model embedding, dan sistem prompt yang berbeda-beda."
      ]
    },
    architecture: {
      stack: [
        "Django 5.2 + Ninja API",
        "Celery + Redis (task queue)",
        "Qdrant Vector DB (hybrid search)",
        "Azure OpenAI / Ollama / OpenAI-compatible",
        "PostgreSQL (multi-tenant)",
        "Docker + Nginx + Gunicorn"
      ],
      decisions: [
        {
          title: "Hybrid RAG Retrieval: Dense + Sparse BM25",
          rationale: "Dense embedding (semantic similarity) dikombinasikan dengan sparse BM25 (keyword matching) untuk meningkatkan akurasi retrieval - terutama pada query teknis dengan istilah spesifik yang luput dari semantic search murni."
        },
        {
          title: "Multi-Provider LLM Gateway dengan Circuit Breaker",
          rationale: "Abstraksi provider (Azure, Ollama, OpenAI-compatible) dengan model per tenant + circuit breaker via pybreaker. Tenant bisa memilih provider & model sendiri. Fail fast saat provider bermasalah, bukan timeout berantai."
        },
        {
          title: "Semantic Cache untuk Penghematan Token",
          rationale: "Query yang semantically similar (cosine similarity > threshold) dijawab dari cache tanpa panggil LLM ulang. Kombinasi semantic cache + exact-match cache dengan TTL dan versioning. Signifikan mengurangi biaya token LLM."
        },
        {
          title: "Tool-Augmented Agent System",
          rationale: "LLM bisa memanggil tools via function calling: Text2SQL (natural language → SQL query ke live database PostgreSQL/MySQL/MSSQL) dan WebSearch (enrichment via SearXNG). Framework BaseTool + ToolRegistry yang extensible per tenant."
        }
      ],
      diagramAscii: `
+-----------------------------------------------------------------------------+
|                     SATUCHAT ENTERPRISE RAG PLATFORM                        |
|                                                                             |
|   +-------------------+          +--------------------------------------+   |
|   |  Browser / API    | -------> | Nginx (rate limit + API key auth)    |   |
|   |  (X-API-Key/JWT)  |          +--------------------------------------+   |
|   +-------------------+                         |                           |
|                                                 v                           |
|                                   +-----------------------------+           |
|                                   | Django 5.2 + Ninja API      |           |
|                                   | (chat, knowledge, tenants,  |           |
|                                   |  gateways, analytics, users)|           |
|                                   +-----------------------------+           |
|                                     |              |             |          |
|                            +--------v----+  +------v------+ +----v---------+|
|                            | Celery Queue|  | LLM Gateway | | Qdrant       ||
|                            | (Redis)     |  | Azure/      | | (Hybrid:     ||
|                            | - doc proc  |  | Ollama/     | | dense+sparse)||
|                            | - async chat|  | OpenAI-comp | | per-tenant   ||
|                            | - web crawl |  +-------------+ +--------------+|
|                            +--------v----+                                  |
|                                     |                                       |
|                            +--------v---------+                             |
|                            | PostgreSQL       |                             |
|                            | (tenants, docs,  |                             |
|                            |  chat, users)    |                             |
|                            +------------------+                             |
+-----------------------------------------------------------------------------+
      `
    },
    outcome: {
      summary: "Platform berhasil mencakup 110+ fitur dalam 12 modul terintegrasi: Chat (RAG + streaming + tools), Knowledge Base (collections, documents, sources), Multi-Tenancy (isolasi penuh), LLM Gateway (multi-provider), Personal Documents, Analytics, dan Admin Dashboard.",
      highlights: [
        "Hybrid RAG retrieval (dense+sparse) memberikan akurasi lebih tinggi dibanding pure semantic search, terutama pada dokumen teknis dan istilah domain-spesifik.",
        "Semantic cache memotong pemakaian token LLM secara signifikan dengan menjawab query semantically similar dari cache.",
        "Multi-tenant isolation penuh: setiap query vector DB wajib difilter tenant_id, API key per tenant, model embedding per koleksi.",
        "Tool-augmented agents: Text2SQL memungkinkan user bertanya dalam bahasa natural dan langsung mendapatkan hasil query database."
      ]
    },
    visualArtifacts: [
      {
        type: "diagram",
        title: "RAG Pipeline & Multi-Tenant Topology",
        description: "Diagram alur: user query → embedding → hybrid search Qdrant (dense + sparse) → LLM generate dengan konteks dokumen terisolasi per tenant.",
      },
      {
        type: "redacted-dashboard",
        title: "Admin Dashboard: Tenant & Collection Management",
        description: "Dashboard admin untuk mengelola tenant, koleksi dokumen, LLM profiles, API keys, quota token, dan monitoring penggunaan sistem."
      },
      {
        type: "snippet",
        title: "Sanitized Code: Hybrid Search Service",
        description: "Potongan service Python untuk hybrid search Qdrant - menggabungkan dense embedding (semantic) dan sparse BM25 (keyword) dengan parameter fusion.",
        codeOrContent: `# Sanitized: Hybrid Search Service (Dense + Sparse)
from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchValue

class HybridSearchService:
    def __init__(self, client: QdrantClient, embedder):
        self.client = client
        self.embedder = embedder

    def search(
        self,
        query: str,
        collection_name: str,
        tenant_id: str,
        group_ids: list[str] | None = None,
        top_k: int = 10,
        similarity_threshold: float | None = 0.7,
    ) -> list[dict]:
        query_vector = self.embedder.encode(query).tolist()

        # Mandatory tenant filter
        must_filters = [
            FieldCondition(key="tenant_id", match=MatchValue(value=tenant_id)),
        ]

        # Group-based access for private documents
        if group_ids:
            must_filters.append(
                Filter(
                    should=[
                        FieldCondition(key="access", match=MatchValue(value="public")),
                        FieldCondition(key="group_id", match=MatchValue(value=g))
                        for g in group_ids
                    ]
                )
            )

        results = self.client.search(
            collection_name=collection_name,
            query_vector=query_vector,
            query_filter=Filter(must=must_filters),
            limit=top_k,
            score_threshold=similarity_threshold,
            with_payload=True,
        )

        return [
            {
                "content": hit.payload["content"],
                "score": hit.score,
                "metadata": hit.payload.get("metadata", {}),
            }
            for hit in results
        ]
      `
      }
    ]
  },
  "spbe-data-platform": {
    slug: "spbe-data-platform",
    title: "National Gov Data Integration Gateway",
    tagline: "Enterprise multi-agency interoperability gateway and API governance platform built for secure cross-department data exchange.",
    role: "Senior Full Stack Engineer & API Architect",
    timeline: "8 Months",
    category: "Enterprise Systems",
    constraintBadge: "Strict Multi-Tenant Governance & Air-Gapped Deployment",
    context: {
      agency: "Enterprise Tech / Inter-Agency Ecosystem",
      scale: "12+ Government Sub-Agencies & Millions of Monthly API Queries",
      team: "5 Engineers",
      summary: "Architected an API integration gateway allowing heterogeneous government databases to safely exchange standardized JSON/XML data feeds with role-based masking."
    },
    securityNotice: "Sistem ini berjalan di infrastruktur privat pusat data dengan protokol enkripsi mTLS dan kepatuhan SPBE - tidak ada demo live publik untuk menjaga integritas gateway antar-unit.",
    problem: {
      overview: "Setiap unit organisasi menggunakan basis data tersendiri dengan format legacy berbeda, menyebabkan duplikasi data, proses verifikasi manual berhari-hari, dan ketiadaan visibilitas audit integritas data.",
      painPoints: [
        "Silo data antar-unit kerja memperlambat layanan publik dan pengambilan keputusan strategis.",
        "Pertukaran data manual lewat spreadsheet berisiko kebocoran data pribadi (PII).",
        "Ketiadaan API Gateway terpusat dengan rate limiting dan masking otomatis."
      ]
    },
    architecture: {
      stack: [
        "Next.js 16 (App Router)",
        "TypeScript",
        "Node.js API Gateway",
        "PostgreSQL (Multi-tenant)",
        "Apache Kafka / RabbitMQ",
        "Tailwind CSS"
      ],
      decisions: [
        {
          title: "Dynamic Field Masking Engine",
          rationale: "Mengimplementasikan middleware yang secara otomatis menyamarkan (mask) NIK, nomor telepon, atau data sensitif berdasarkan level otorisasi token caller."
        },
        {
          title: "Asynchronous Queue dengan Kafka/RabbitMQ",
          rationale: "Menghindari timeout saat sinkronisasi data antar-database legacy yang lambat dengan memproses transaksi data via event-driven queue."
        }
      ],
      diagramAscii: `
+-----------------------------------------------------------------------+
|                    GOVERNMENT DATA INTEROPERABILITY                   |
|                                                                       |
|   +--------------------+     mTLS      +--------------------------+   |
|   |  Sub-Agency A DB   | <-----------> | Multi-Agency API Gateway |   |
|   +--------------------+               +--------------------------+   |
|                                                    |                  |
|   +--------------------+                           v                  |
|   |  Sub-Agency B DB   | <----------->  [ Dynamic PII Masking ]       |
|   +--------------------+                           |                  |
|                                                    v                  |
|                                         +---------------------+       |
|                                         | Event Bus (Kafka)   |       |
|                                         +---------------------+       |
|                                                    |                  |
|                                                    v                  |
|                                         +---------------------+       |
|                                         | Unified Analytics UI|       |
|                                         +---------------------+       |
+-----------------------------------------------------------------------+
      `
    },
    outcome: {
      summary: "Gateway terbukti berhasil memfasilitasi pertukaran data otomatis antar-unit kerja secara aman.",
      highlights: [
        "Memotong waktu verifikasi data antar-unit dari 3 hari menjadi hitungan detik.",
        "Mencegah eksposur data sensitif PII dengan 100% automated field-level redaction.",
        "Dapat memproses jutaan permintaan API bulanan dengan ketersediaan tinggi."
      ]
    },
    visualArtifacts: [
      {
        type: "diagram",
        title: "Interoperability Topology",
        description: "Diagram arsitektur pertukaran data berstandar SPBE dengan skema pemetaan atribut dinamis.",
      },
      {
        type: "redacted-dashboard",
        title: "Redacted Data Flow Monitor",
        description: "Dashboard statistik lalu lintas API, pemeta skema data, dan grafik transaksi real-time antar-sub-unit."
      },
      {
        type: "snippet",
        title: "Sanitized Code Snippet: PII Data Redactor Middleware",
        description: "Fungsi TypeScript untuk menyamarkan atribut PII secara otomatis berdasarkan role skop token JWT.",
        codeOrContent: `// Sanitized PII Redactor Middleware
export function sanitizeRecord<T extends Record<string, any>>(
  record: T,
  userScope: string[]
): Partial<T> {
  const sanitized = { ...record };
  const canViewPII = userScope.includes("pii:read");

  if (!canViewPII) {
    if (sanitized.nik) {
      sanitized.nik = String(sanitized.nik).replace(/^(\\d{6})\\d{6}(\\d{4})$/, "$1******$2");
    }
    if (sanitized.email) {
      sanitized.email = String(sanitized.email).replace(/(^.{2})(.*)(?=@)/, "$1***");
    }
    if (sanitized.phone) {
      sanitized.phone = String(sanitized.phone).replace(/(\\d{4})$/, "****");
    }
  }

  return sanitized;
}`
      }
    ]
  },
  "portal-bppk": {
    slug: "portal-bppk",
    title: "Enterprise Government Portal CMS",
    tagline: "Multi-tenant government portal and secretarial management platform with 20+ embedded modules, SSO integration, and air-gapped Kubernetes deployment serving 12+ agency units.",
    role: "Lead Full Stack Engineer & Platform Architect",
    timeline: "12+ Months (ongoing module development)",
    category: "Enterprise CMS & Government Portal",
    constraintBadge: "Multi-Tenant Portal & Air-Gapped Kubernetes Deployment",
    context: {
      agency: "Enterprise Training Organization",
      scale: "12+ Agency Units, 20+ Embedded Modules, Multi-Tenant Architecture",
      team: "1 Lead Engineer (architecture, backend, CMS, infra, DevOps)",
      summary: "Rebuilt a government agency portal from legacy Joomla into a modern Django-based multi-tenant CMS platform, consolidating 20+ embedded modules — from knowledge management and quiz engines to accreditation workflows and innovation galleries — all deployed on an air-gapped Kubernetes cluster with zero external SaaS dependencies."
    },
    securityNotice: "Sistem ini berjalan di kluster Kubernetes air-gapped milik infrastruktur TI internal dengan autentikasi SSO terpusat via django-allauth. Seluruh data pengguna, dokumen, dan workflow bersifat internal. Tidak ada demo publik — repositori bersifat private.",
    problem: {
      overview: "Portal generasi sebelumnya dibangun di atas Joomla yang rentan terhadap celah keamanan (pernah ditemukan injeksi iklan di homepage). Selain itu, kebutuhan akan aplikasi kesekretariatan dan modul-modul insidental terus bertambah, sementara regulasi otoritas TI pusat melarang pembuatan common apps mandiri — semua harus terintegrasi dalam satu platform.",
      painPoints: [
        "Portal Joomla legacy ditemukan celah keamanan berupa injeksi iklan — membutuhkan migrasi penuh ke platform yang aman dan terkontrol.",
        "Kebutuhan insidental unit-unit organisasi (rekap keuangan, rekap kepegawaian, inovasi gallery, akreditasi) tidak bisa diwadahi sebagai aplikasi mandiri karena regulasi otoritas TI internal.",
        "Arsitektur monolitik generasi kedua (Spring) susah dikembangkan — setiap penambahan fitur memerlukan restrukturisasi besar-besaran."
      ]
    },
    architecture: {
      stack: [
        "Django 5.2 + Django REST Framework",
        "Django Unfold (modern admin UI)",
        "HTMX + Alpine.js (frontend)",
        "PostgreSQL + MinIO (object storage)",
        "Redis + Celery (async tasks)",
        "Kubernetes + Docker (air-gapped)",
        "django-allauth (centralized SSO)"
      ],
      decisions: [
        {
          title: "Django sebagai Fondasi CMS Multi-Tenant",
          rationale: "Setelah kegagalan Spring generasi kedua (monolith yang susah dikembangkan), Django dipilih karena mature ecosystem-nya: django-allauth untuk SSO, django-import-export untuk migrasi data, django-unfold untuk admin UI modern, dan Django REST Framework untuk API. Struktur modular 'app-per-feature' memungkinkan 20+ modul hidup berdampingan tanpa coupling."
        },
        {
          title: "HTMX + Alpine.js untuk Interaktivitas Frontend",
          rationale: "Menghindari kompleksitas SPA framework (React/Vue) untuk portal yang 80% kontennya adalah halaman informasi dan form admin. HTMX memberikan partial page updates tanpa full reload, Alpine.js untuk interaktivitas ringan — semuanya dirender server-side, nol build step, dan tetap terasa responsif."
        },
        {
          title: "MinIO Object Storage untuk Air-Gapped File Management",
          rationale: "Tidak bisa menggunakan S3/Azure Blob di lingkungan air-gapped. MinIO menyediakan API S3-compatible on-premise untuk menyimpan dokumen, gambar CKEditor, dan file attachment modul — terintegrasi via django-storages dengan fallback ke local filesystem."
        },
        {
          title: "Arsitektur Modular 'App-per-Feature'",
          rationale: "Setiap fitur (portal, akrab, quiz, akreditasi, event, file management, KM, inovasi gallery) adalah Django app terpisah di bawah folder app/. Hal ini memungkinkan pengembangan paralel, isolasi dependensi, dan onboarding modul baru tanpa menyentuh core portal."
        }
      ],
      diagramAscii: `
+------------------------------------------------------------------------------+
|                ENTERPRISE GOVERNMENT PORTAL CMS (AIR-GAPPED)                 |
|                                                                              |
|   +--------------------+          +--------------------------------------+   |
|   |  Browser (Internal)| -------> | Kubernetes Ingress (mTLS)            |   |
|   |  Government SSO    |          +--------------------------------------+   |
|   +--------------------+                         |                           |
|                                                  v                           |
|                                   +-----------------------------+            |
|                                   | Django 5.2 CMS Core          |           |
|                                   | - app_portal (public pages)  |           |
|                                   | - django-allauth (SSO)       |           |
|                                   | - django-unfold (admin)      |           |
|                                   +-----------------------------+            |
|                                     |              |             |           |
|                            +--------v----+  +------v------+ +----v---------+ |
|                            | 20+ Embedded|  | Celery/Redis| | PostgreSQL   | |
|                            | Modules:    |  | Async Tasks | | (Multi-      | |
|                            | - Quiz      |  | - Import    | |  Tenant)     | |
|                            | - KM        |  | - Export    | +--------------+ |
|                            | - Event     |  | - File Ops  |                  |
|                            | - Akreditasi|  +-------------+  +-------------+ |
|                            | - Inovasi   |                   | MinIO       | |
|                            | - Dashboard |                   | (S3-compat  | |
|                            | - File Mgmt |                   |  on-prem)   | |
|                            | - Akrab     |                   +-------------+ |
|                            | - Employee  |                                   |
|                            +-------------+                                   |
+------------------------------------------------------------------------------+
      `
    },
    outcome: {
      summary: "Portal generasi ketiga berhasil menggantikan Joomla legacy dan Spring monolith dengan platform Django modular yang menampung 20+ modul terintegrasi. Sistem berjalan di kluster Kubernetes air-gapped dengan SSO terpusat melayani seluruh unit organisasi.",
      highlights: [
        "Migrasi penuh dari Joomla + Spring ke Django 5.2 — menghilangkan celah keamanan dan menyatukan portal CMS + aplikasi kesekretariatan dalam satu platform.",
        "20+ modul terintegrasi: portal publik, knowledge management, quiz, akreditasi, event management, file management, inovasi gallery, dashboard, akrab, embed Tableau, dan lainnya.",
        "SSO terpusat via django-allauth — autentikasi terpusat untuk seluruh pengguna tanpa manajemen kredensial terpisah.",
        "Django Unfold memberikan admin panel modern dengan UX yang jauh lebih baik dibanding Django Admin standar — mempercepat operasional admin konten."
      ]
    },
    visualArtifacts: [
      {
        type: "diagram",
        title: "Arsitektur Enterprise Portal — Multi-Tenant CMS Topology",
        description: "Diagram arsitektur lengkap menggambarkan relasi antara Django CMS Core, 20+ modul embedded, PostgreSQL, MinIO, Redis/Celery, dan Kubernetes ingress.",
      },
      {
        type: "redacted-dashboard",
        title: "Django Unfold Admin Panel — Content & Module Management",
        description: "Modern admin dashboard berbasis Django Unfold untuk mengelola konten portal, pengguna, modul quiz, event, dan workflow kesekretariatan — menggantikan admin panel Joomla dan Django Admin standar."
      },
      {
        type: "snippet",
        title: "Sanitized Code: SSO Integration via django-allauth",
        description: "Konfigurasi autentikasi SSO terpusat menggunakan django-allauth dengan provider custom untuk identity provider organisasi.",
        codeOrContent: `# Sanitized: SSO Configuration with django-allauth
# settings.py

INSTALLED_APPS = [
    # Django Unfold admin
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    # Auth
    "django.contrib.auth",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    # Custom SSO Provider
    "provider",  # app_provider — government SSO adapter
    # Portal modules
    "app_portal",
    "app_akrab",
    "app_employee",
    "app_quiz",
    "app_km",
    "app_event",
    "app_akreditasi",
    "app_innovation_gallery",
    "app_file_management",
    # ... 10+ other modules
]

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

# SSO Provider adapter (custom government SSO)
SOCIALACCOUNT_PROVIDERS = {
    "govsso": {
        "APP": {
            "client_id": env("SSO_CLIENT_ID"),
            "secret": env("SSO_SECRET"),
            "key": "",
        },
        "SCOPE": ["profile", "email"],
        "VERIFIED_EMAIL": True,
    }
}

ACCOUNT_EMAIL_VERIFICATION = "none"
LOGIN_REDIRECT_URL = "/dashboard/"
ACCOUNT_LOGOUT_REDIRECT_URL = "/"
      `
      }
    ]
  },
  "lms": {
    slug: "lms",
    title: "Enterprise Learning Center (LMS)",
    tagline: "National-scale enterprise LMS with AI-driven knowledge management, adaptive learning paths, automated certification, and RAG-powered intelligent search across 20+ microservices.",
    role: "Senior Full Stack Engineer & AI/ML Integration Lead",
    timeline: "18+ Months (continuous feature development across 20+ services)",
    category: "Enterprise Learning Platform & AI Knowledge Management",
    constraintBadge: "National-Scale LMS & AI-Powered Knowledge Management System",
    context: {
      agency: "Enterprise Training Organization",
      scale: "Thousands of Enterprise Employees, 20+ Microservices, National-Scale Deployment",
      team: "8-12 Engineers (cross-functional: backend, frontend, AI, mobile, QA)",
      summary: "Contributed as senior full-stack engineer across the LMS ecosystem — a national-scale LMS platform serving thousands of employees with AI-powered knowledge management, automated proctoring, adaptive certification workflows, and intelligent report generation spanning 20+ interconnected microservices."
    },
    securityNotice: "LMS adalah platform pembelajaran nasional milik organisasi enterprise yang menangani data pegawai, hasil ujian, dan sertifikasi kompetensi. Seluruh layanan berjalan di infrastruktur privat dengan autentikasi terpusat — tidak ada akses publik ke source code maupun live system.",
    problem: {
      overview: "Organisasi enterprise membutuhkan platform pembelajaran terpadu yang mampu melayani ribuan pegawai di skala nasional — dari pelatihan mandiri, ujian bersertifikasi, hingga manajemen pengetahuan berbasis AI. Sistem legacy sebelumnya terfragmentasi: LMS, pelaporan, manajemen ruangan, dan knowledge base berjalan di silo terpisah tanpa interoperabilitas.",
      painPoints: [
        "Fragmentasi sistem: LMS, knowledge base, pelaporan, proctoring, dan manajemen ruangan berjalan di platform terpisah — tidak ada single source of truth untuk data pembelajaran.",
        "Pencarian konten pembelajaran mengandalkan keyword search sederhana — pengguna kesulitan menemukan materi relevan di antara ribuan dokumen dan modul.",
        "Pelaporan hasil pembelajaran dan sertifikasi masih semi-manual — memperlambat proses akreditasi dan evaluasi kompetensi pegawai."
      ]
    },
    architecture: {
      stack: [
        "Spring Boot + Quarkus (backend)",
        "Next.js 16 (frontend)",
        "LangChain + RAG Pipeline (AI)",
        "PostgreSQL + Elasticsearch",
        "RabbitMQ + Redis",
        "Docker + Harbor Registry",
        "Flutter (mobile)"
      ],
      decisions: [
        {
          title: "Microservices Architecture: 20+ Specialized Services",
          rationale: "LMS dipecah menjadi 20+ microservices: lms-api (LMS core), lms-manager (course management), lms-rooms (room booking), lms-proctoring (ujian), sertifikasi-api, lms-report, lms-reportgen (automated reporting), lms-jfkn (competency), kms-api (knowledge management), lms-ai (AI/RAG), lms-ml (machine learning), lms-mobile (Flutter), lms-dash (dashboard), lms-cop (community of practice), dan user-api. Setiap service dapat di-deploy, diskalakan, dan dikembangkan secara independen."
        },
        {
          title: "AI-Driven Knowledge Management dengan RAG Pipeline",
          rationale: "Service lms-ai dan kms-api mengimplementasikan Retrieval-Augmented Generation (RAG) via LangChain untuk pencarian semantik di knowledge base LMS. Dokumen pembelajaran, modul, dan peraturan di-indeks ke Elasticsearch dengan embedding vector — memungkinkan pencarian berbasis makna, bukan sekadar keyword matching. Service RAG terpisah menyediakan inferensi LLM on-premise."
        },
        {
          title: "Automated Report Generation Engine",
          rationale: "Service lms-reportgen mengotomatisasi pembuatan laporan hasil pembelajaran, statistik kelulusan, dan rekomendasi learning path dalam format PDF/Excel. Menggantikan proses manual yang sebelumnya memakan waktu berhari-hari menjadi hitungan menit."
        },
        {
          title: "Harbor Registry untuk Air-Gapped Container Management",
          rationale: "Seluruh Docker image disimpan dan didistribusikan melalui Harbor private registry on-premise — memungkinkan deployment air-gapped yang aman tanpa ketergantungan pada Docker Hub atau registry publik."
        }
      ],
      diagramAscii: `
+------------------------------------------------------------------------------+
|              LMS — ENTERPRISE LEARNING CENTER (20+ MICROSERVICES)            |
|                                                                              |
|   +---------------------+          +--------------------------------------+  |
|   |  Browser / Mobile   | -------> | API Gateway / Reverse Proxy          |  |
|   |  (Next.js / Flutter)|         +---------------------------------------+  |
|   +---------------------+                         |                          |
|                                                   v                          |
|   +-------------------------------------------------------------------+      |
|   |                        MICROSERVICES MESH                         |      |
|   |                                                                   |      |
|   |  +-----------+ +-----------+ +------------+ +-----------------+   |      |
|   |  | lms-api   | |lms-manager| |lms-rooms   | |lms-proctoring   |   |      |
|   |  | (LMS Core)| |(Courses)  | |(Booking)   | |(Exam/Cheating)  |   |      |
|   |  +-----------+ +-----------+ +------------+ +-----------------+   |      |
|   |                                                                   |      |
|   |  +-----------+ +-----------+ +------------+ +-----------------+   |      |
|   |  |kms-api    | |lms-ai     | |lms-ml      | |lms-reportgen    |   |      |
|   |  |(Knowledge)| |(RAG/Lang  | |(ML Models) | |(Auto Reports)   |   |      |
|   |  | Base API) | | Chain)    | |            | |                 |   |      |
|   |  +-----------+ +-----------+ +------------+ +-----------------+   |      |
|   |                                                                   |      |
|   |  +-----------+ +-----------+ +------------+ +-----------------+   |      |
|   |  |sertifikasi| |lms-jfkn   | |lms-report  | |lms-dash         |   |      |
|   |  | -api      | |(Competency| |(Reporting) | |(Dashboard)      |   |      |
|   |  +-----------+ +-----------+ +------------+ +-----------------+   |      |
|   |                                                                   |      |
|   |  +-----------+ +-----------+ +------------+ +-----------------+   |      |
|   |  |lms-mobile | |lms-cop    | |user-api    | |lms-exoffice     |   |      |
|   |  |(Flutter)  | |(Community)| |(Users)     | |(External)       |   |      |
|   |  +-----------+ +-----------+ +------------+ +-----------------+   |      |
|   +-------------------------------------------------------------------+      |
|                                    |                                         |
|               +--------------------+--------------------+                    |
|               v                    v                    v                    |
|   +-----------------+ +---------------------+ +-----------------+            |
|   | PostgreSQL      | | Elasticsearch       | | RabbitMQ        |            |
|   | (Multi-DB)      | | (Search + Vector)   | | (Event Bus)     |            |
|   +-----------------+ +---------------------+ +-----------------+            |
|                                                                              |
|   +------------------------------------------------------------------+       |
|   | Harbor Registry (Air-Gapped) | Redis Cache | Docker Swarm/K8s    |       |
|   +------------------------------------------------------------------+       |
+------------------------------------------------------------------------------+
      `
    },
    outcome: {
      summary: "LMS kini menjadi platform pembelajaran terpadu nasional — menangani pelatihan, ujian, sertifikasi, dan knowledge management dalam satu ekosistem terintegrasi. AI-powered search dan automated reporting secara signifikan meningkatkan efisiensi operasional.",
      highlights: [
        "20+ microservices terintegrasi dalam satu ekosistem — dari LMS core, AI knowledge management, proctoring, hingga automated report generation.",
        "RAG-powered semantic search memungkinkan pengguna menemukan materi pembelajaran relevan dalam hitungan detik — lompatan besar dari keyword search sederhana.",
        "Automated report generation (lms-reportgen) memotong waktu pembuatan laporan dari hari ke menit — mempercepat siklus evaluasi kompetensi pegawai.",
        "Arsitektur microservices memungkinkan scaling independen — service ujian bisa diskalakan saat peak season tanpa mempengaruhi service lainnya."
      ]
    },
    visualArtifacts: [
      {
        type: "diagram",
        title: "LMS Microservices Ecosystem Topology",
        description: "Diagram arsitektur 20+ microservices LMS, menunjukkan relasi antara LMS core, AI services, knowledge management, dan supporting services.",
      },
      {
        type: "redacted-dashboard",
        title: "Redacted Admin Dashboard — Learning Analytics",
        description: "Dashboard admin LMS menampilkan statistik pembelajaran, progres peserta, utilisasi ruangan, dan metrik kelulusan — menjembatani gap antara operasional training dan pengambilan keputusan."
      },
      {
        type: "snippet",
        title: "Sanitized Code: RAG Pipeline for Knowledge Search",
        description: "Potongan kode sanitized dari RAG pipeline service (lms-ai) — embedding dokumen → indexing Elasticsearch → retrieval → LLM generation.",
        codeOrContent: `# Sanitized: RAG Pipeline for KMS Knowledge Search
# lms-ai / kms-api integration

from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import ElasticsearchStore
from langchain.llms import Ollama  # on-premise LLM
from langchain.chains import RetrievalQA

class KMSRAGPipeline:
    def __init__(self, es_url: str, index_name: str):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="intfloat/multilingual-e5-large"
        )
        self.vector_store = ElasticsearchStore(
            es_url=es_url,
            index_name=index_name,
            embedding=self.embeddings,
        )
        self.llm = Ollama(
            model="mistral:7b",
            base_url=env("OLLAMA_BASE_URL"),
        )

    def index_document(
        self,
        doc_id: str,
        content: str,
        metadata: dict,
    ) -> None:
        self.vector_store.add_texts(
            texts=[content],
            metadatas=[{**metadata, "doc_id": doc_id}],
        )

    def semantic_search(
        self,
        query: str,
        top_k: int = 5,
        score_threshold: float = 0.6,
    ) -> list[dict]:
        results = self.vector_store.similarity_search_with_score(
            query,
            k=top_k,
        )

        return [
            {
                "content": doc.page_content,
                "metadata": doc.metadata,
                "score": score,
            }
            for doc, score in results
            if score >= score_threshold
        ]

    def answer_with_context(
        self,
        question: str,
        top_k: int = 3,
    ) -> dict:
        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_store.as_retriever(
                search_kwargs={"k": top_k}
            ),
            return_source_documents=True,
        )

        result = qa_chain({"query": question})

        return {
            "answer": result["result"],
            "sources": [
                {
                    "content": doc.page_content[:300],
                    "metadata": doc.metadata,
                }
                for doc in result["source_documents"]
            ],
        }
      `
      }
    ]
  }
};
