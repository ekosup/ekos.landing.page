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
|                     SATUCHAT ENTERPRISE RAG PLATFORM                         |
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
|                            +--------v----+  +------v------+ +----v--------+ |
|                            | Celery Queue|  | LLM Gateway | | Qdrant       | |
|                            | (Redis)     |  | Azure/      | | (Hybrid:     | |
|                            | - doc proc  |  | Ollama/     | | dense+sparse)| |
|                            | - async chat|  | OpenAI-comp | | per-tenant   | |
|                            | - web crawl |  +-------------+ +-------------+ |
|                            +--------v----+                                   |
|                                     |                                        |
|                            +--------v--------+                               |
|                            | PostgreSQL       |                              |
|                            | (tenants, docs,  |                              |
|                            |  chat, users)    |                              |
|                            +------------------+                              |
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
    category: "Government Enterprise Systems",
    constraintBadge: "Strict Multi-Tenant Governance & Air-Gapped Deployment",
    context: {
      agency: "Public Sector Tech / Government Ecosystem",
      scale: "12+ Government Sub-Agencies & Millions of Monthly API Queries",
      team: "5 Engineers",
      summary: "Architected an API integration gateway allowing heterogeneous government databases to safely exchange standardized JSON/XML data feeds with role-based masking."
    },
    securityNotice: "Sistem ini berjalan di infrastruktur privat pusat data pemerintah dengan protokol enkripsi mTLS dan kepatuhan SPBE - tidak ada demo live publik untuk menjaga integritas gateway antar-lembaga.",
    problem: {
      overview: "Setiap unit/lembaga menggunakan basis data tersendiri dengan format legacy berbeda, menyebabkan duplikasi data, proses verifikasi manual berhari-hari, dan ketiadaan visibilitas audit integritas data.",
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
|                    GOVERNMENT DATA INTEROPERABILITY                    |
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
        "Memotong waktu verifikasi data antar-lembaga dari 3 hari menjadi hitungan detik.",
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
        description: "Dashboard statistik lalu lintas API, pemeta skema data, dan grafik transaksi real-time antar-subinstansi."
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
  }
};
