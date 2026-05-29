export type Dictionary = typeof dictionaries.en

export const dictionaries = {
  id: {
    meta: {
      title: "OpenJKN | Sandbox Digital untuk JKN Indonesia",
      description: "Inisiatif OpenJKN: Mempercepat transformasi sistem kesehatan Indonesia melalui interoperabilitas open-source dan sandbox openIMIS global."
    },
    nav: {
      home: "Beranda",
      wiki: "Wiki",
      updates: "Pembaruan",
      community: "Komunitas",
      cms: "CMS Konsol"
    },
    hero: {
      badge: "Draft Kebijakan Singkat • Mei 2026",
      title: "Platform Pembelajaran Terbuka untuk Ekosistem Digital JKN",
      titleHighlight: "Ekosistem Digital JKN",
      desc: "Dibangun di atas openIMIS, OpenJKN adalah sandbox open-source untuk mempelajari, mensimulasikan, dan berinovasi dalam ekosistem jaminan kesehatan nasional Indonesia — melayani 270 juta+ peserta dengan 161 juta klaim per tahun.",
      ctaJoin: "Gabung Working Group",
      ctaExplore: "Eksplorasi Skenario"
    },
    collaborators: {
      title: "Inisiatif kolaboratif oleh"
    },
    about: {
      title: "Apa itu OpenJKN?",
      desc: "Modul tambahan open-source yang dibangun di atas openIMIS — platform global untuk sistem informasi pembiayaan kesehatan — diadaptasi untuk kompleksitas JKN Indonesia: pendaftaran multi-skema, rujukan berjenjang, kapitasi berbasis kinerja, dan interoperabilitas HL7 FHIR.",
      sandboxTitle: "Sandbox Pembelajaran",
      sandboxDesc: "Lingkungan yang aman dan terpisah bagi mahasiswa, peneliti, dan praktisi untuk mempelajari alur kerja JKN tanpa risiko terhadap sistem produksi.",
      simulationTitle: "Simulasi Proses Bisnis",
      simulationDesc: "Simulasikan pendaftaran, klaim, rujukan, kapitasi, dan logika tarif INA-CBGs menggunakan aturan bisnis JKN yang realistis.",
      researchTitle: "Lab Riset Kebijakan",
      researchDesc: "Eksperimen dengan model pembiayaan kesehatan, algoritma deteksi kecurangan, dan analisis dampak kebijakan dalam lingkungan terkendali.",
      interopTitle: "Inovasi Interoperabilitas",
      interopDesc: "Uji payload HL7 FHIR, validasi integrasi SATUSEHAT, dan buat prototipe pertukaran data antar komponen ekosistem JKN.",
      aiTitle: "Laboratorium Hidup AI",
      aiDesc: "Kembangkan dan uji analitik berbasis AI untuk deteksi kecurangan, sistem pendukung keputusan klinis, dan optimalisasi sistem kesehatan."
    },
    gaps: {
      title: "Mengapa OpenJKN?",
      desc: "Peneliti UGM mengidentifikasi celah fungsional kritis dalam platform standar openIMIS yang menghalangi penggunaan langsung untuk simulasi JKN Indonesia. OpenJKN menjembatani celah ini.",
      subdesc: "Arsitektur OpenJKN memisahkan frontend dan backend-nya dari core openIMIS sambil tetap menjaga sinkronisasi database — memungkinkan adaptasi lokal tanpa merusak kompatibilitas global.",
      header: "Kesenjangan yang diatasi oleh OpenJKN",
      list: [
        "Pengumpulan premi multi-skema & segmentasi peserta",
        "Kredensialing fasilitas & manajemen kontrak",
        "Kapitasi berbasis kinerja & logika INA-CBGs",
        "Klaim virtual & mekanisme klaim elektronik",
        "Interoperabilitas HL7 FHIR & integrasi SATUSEHAT",
        "Deteksi kecurangan & analitik berbasis AI",
        "Layanan mandiri peserta (kelayakan, penjadwalan, janji temu)",
        "Variabel khusus Indonesia (jenis fasilitas, segmen keanggotaan)"
      ]
    },
    scenarios: {
      title: "Skenario Pembelajaran Terstruktur",
      desc: "Tiga alur kerja simulasi yang mencerminkan operasi JKN nyata — dirancang untuk pembelajaran berbasis keputusan, bukan sekadar klik tombol.",
      card1Title: "Pendaftaran & Segmentasi",
      card1Items: [
        "Pendaftaran peserta baru (PBI, PPU, PBPU, BP)",
        "Segmentasi keanggotaan & kalkulasi premi",
        "Alur verifikasi & pengecekan kelayakan",
        "Simulasi iuran kontribusi berbasis segmen"
      ],
      card2Title: "Akses Layanan & Rujukan",
      card2Items: [
        "Akses perawatan primer (Puskesmas, klinik, dokter keluarga)",
        "Mekanisme rantai rujukan FKTP → FKRTL",
        "Pengecekan kelayakan paket manfaat & layanan",
        "Simulasi penolakan akses & resolusinya"
      ],
      card3Title: "Perubahan Status & Interoperabilitas",
      card3Items: [
        "Simulasi perubahan pekerjaan & transisi segmen",
        "Alur mutasi domisili & pembaruan data",
        "Verifikasi ulang & penonaktifan sementara",
        "Integrasi FHIR & sinkronisasi SATUSEHAT"
      ]
    },
    impact: {
      title: "Dampak Potensial",
      desc: "Dari ruang kelas universitas hingga forum kebijakan internasional — potensi OpenJKN mencakup pendidikan, penelitian, peningkatan kapasitas, dan kolaborasi regional.",
      eduTitle: "Pendidikan & Kurikulum",
      eduDesc: "Integrasi ke dalam program Kedokteran, Kesehatan Masyarakat, Informatika Kesehatan, Manajemen Rumah Sakit, dan Kebijakan Kesehatan di universitas-universitas Indonesia (AIPTKMI).",
      researchTitle: "Riset & Inovasi Kebijakan",
      researchDesc: "Simulasi kebijakan, pemodelan pembiayaan kesehatan, riset deteksi fraud bertenaga AI, pengujian interoperabilitas, dan studi kegunaan — semuanya tanpa risiko produksi.",
      capacityTitle: "Peningkatan Kapasitas",
      capacityDesc: "Program pelatihan untuk staf BPJS Kesehatan, Dinas Kesehatan, Kemenkes, manajemen rumah sakit, startup kesehatan digital, dan regulator.",
      regionalTitle: "Model Regional Asia-Pasifik",
      regionalDesc: "Skala dan kompleksitas JKN Indonesia menjadikan OpenJKN kandidat kuat sebagai laboratorium pembelajaran internasional yang dapat direplikasi di negara-negara anggota AeHIN."
    },
    community: {
      title: "Bergabung dalam Ko-Kreasi",
      desc: "OpenJKN dibangun melalui gotong royong dan inovasi terbuka — kolaborasi multi-pihak antara BPJS Kesehatan, Kemenkes, UGM, GIZ/openIMIS, AeHIN, universitas, pengembang, dan mahasiswa.",
      formTitle: "Menjadi Kontributor",
      eventsTitle: "Acara Working Group",
      noEventsTitle: "Belum Ada Acara Mendatang",
      noEventsDesc: "Kami sedang merencanakan sesi Working Group pertama kami. Ikuti kami untuk mendapatkan notifikasi.",
      followLuma: "Ikuti di Luma"
    },
    updates: {
      title: "Pembaruan Terbaru",
      desc: "Berita, pengumuman, dan pembahasan teknis mendalam dari tim OpenJKN.",
      readArticle: "Baca Artikel",
      noArticles: "Belum ada pembaruan yang diterbitkan. Silakan periksa kembali nanti!"
    },
    footer: {
      closing: "“OpenJKN bukan sekadar platform teknologi — ini adalah investasi dalam pengembangan kapasitas sumber daya manusia, inovasi, dan keberlanjutan jangka panjang Jaminan Kesehatan Nasional Indonesia.”",
      brief: "— Draf Kebijakan OpenJKN, Mei 2026",
      rights: "© 2026 Inisiatif OpenJKN. Sumber terbuka di bawah Lisensi MIT.",
      contact: "Hubungi Kami"
    }
  },
  en: {
    meta: {
      title: "OpenJKN | The Digital Sandbox for Indonesian JKN",
      description: "OpenJKN Initiative: Accelerating Indonesia's health system transformation through open-source interoperability and the global openIMIS sandbox."
    },
    nav: {
      home: "Home",
      wiki: "Wiki",
      updates: "Updates",
      community: "Community",
      cms: "CMS Console"
    },
    hero: {
      badge: "Policy Brief Draft • May 2026",
      title: "Open Learning Platform for Indonesia's JKN Digital Ecosystem",
      titleHighlight: "JKN Digital Ecosystem",
      desc: "Built on openIMIS, OpenJKN is an open-source sandbox for learning, simulating, and innovating within Indonesia's national health insurance ecosystem — serving 270M+ beneficiaries with 161M claims per year.",
      ctaJoin: "Join the Working Group",
      ctaExplore: "Explore Scenarios"
    },
    collaborators: {
      title: "A collaborative initiative by"
    },
    about: {
      title: "What is OpenJKN?",
      desc: "An open-source plugin built on top of openIMIS — the global platform for health financing information systems — adapted for Indonesia's unique JKN complexity: multi-scheme enrollment, tiered referrals, performance-based capitation, and HL7 FHIR interoperability.",
      sandboxTitle: "Learning Sandbox",
      sandboxDesc: "A safe, decoupled environment for students, researchers, and practitioners to explore JKN workflows without risk to production systems.",
      simulationTitle: "Business Process Simulation",
      simulationDesc: "Simulate enrollment, claims, referrals, capitation, and case-mix logic (INA-CBGs) using realistic JKN business rules.",
      researchTitle: "Policy Research Lab",
      researchDesc: "Experiment with health financing models, fraud detection algorithms, and policy impact analysis in a controlled setting.",
      interopTitle: "Interoperability Innovation",
      interopDesc: "Test HL7 FHIR payloads, validate SATUSEHAT integration, and prototype data exchange between JKN ecosystem components.",
      aiTitle: "AI Living Laboratory",
      aiDesc: "Develop and test AI-powered analytics for fraud detection, clinical decision support, and health system optimization."
    },
    gaps: {
      title: "Why OpenJKN?",
      desc: "UGM researchers identified critical functional gaps in the standard openIMIS platform that prevent direct use for JKN Indonesia simulation. OpenJKN bridges these gaps.",
      subdesc: "OpenJKN's architecture separates its frontend and backend from openIMIS core while keeping databases synchronized — enabling local adaptation without breaking global compatibility.",
      header: "Gaps addressed by OpenJKN",
      list: [
        "Multi-scheme premium collection & participant segmentation",
        "Facility credentialing & contract management",
        "Performance-based capitation & INA-CBGs case-mix logic",
        "Virtual claims & electronic claim mechanisms",
        "HL7 FHIR interoperability & SATUSEHAT integration",
        "AI-powered fraud detection & analytics",
        "Member self-services (eligibility, scheduling, appointments)",
        "Indonesia-specific variables (facility types, membership segments)"
      ]
    },
    scenarios: {
      title: "Structured Learning Scenarios",
      desc: "Three simulation workflows mirroring real JKN operations — designed for decision-driven learning, not just button-clicking.",
      card1Title: "Enrollment & Segmentation",
      card1Items: [
        "New participant registration (PBI, PPU, PBPU, BP)",
        "Membership segmentation & premium calculation",
        "Verification pathway & eligibility check",
        "Segment-based contribution simulation"
      ],
      card2Title: "Service Access & Referral",
      card2Items: [
        "Primary care access (Puskesmas, clinics, family doctors)",
        "FKTP → FKRTL referral chain mechanism",
        "Benefit package & service eligibility check",
        "Access denial simulation & resolution"
      ],
      card3Title: "Membership Changes & Interoperability",
      card3Items: [
        "Job change & segment transition simulation",
        "Domicile transfer & data update workflow",
        "Re-verification & temporary inactivation",
        "FHIR integration & SATUSEHAT synchronization"
      ]
    },
    impact: {
      title: "Potential Impact",
      desc: "From university classrooms to international policy forums — OpenJKN's potential spans across education, research, capacity building, and regional collaboration.",
      eduTitle: "Education & Curriculum",
      eduDesc: "Integration into Medical, Public Health, Health Informatics, Hospital Management, and Health Policy programs across Indonesian universities (AIPTKMI).",
      researchTitle: "Research & Policy Innovation",
      researchDesc: "Policy simulation, health financing modeling, AI fraud detection research, interoperability testing, and usability studies — all without production risk.",
      capacityTitle: "Capacity Building",
      capacityDesc: "Training programs for BPJS Kesehatan staff, Dinas Kesehatan, Kemenkes, hospital management, health-tech startups, and regulators.",
      regionalTitle: "Asia-Pacific Regional Model",
      regionalDesc: "Indonesia's JKN scale and complexity makes OpenJKN a strong candidate as an international learning laboratory replicable across AeHIN member countries."
    },
    community: {
      title: "Join the Co-Creation",
      desc: "OpenJKN is built through gotong royong and open innovation — a multi-stakeholder collaboration between BPJS Kesehatan, Kemenkes, UGM, GIZ/openIMIS, AeHIN, universities, developers, and students.",
      formTitle: "Become a Contributor",
      eventsTitle: "Working Group Events",
      noEventsTitle: "No Upcoming Events",
      noEventsDesc: "We are planning our first Working Group sessions. Follow us to get notified.",
      followLuma: "Follow on Luma"
    },
    updates: {
      title: "Latest Updates",
      desc: "News, announcements, and technical deep-dives from the OpenJKN team.",
      readArticle: "Read Article",
      noArticles: "No articles published yet. Check back soon!"
    },
    footer: {
      closing: "“OpenJKN is not just a technology platform — it is an investment in human capital development, innovation, and the long-term sustainability of Indonesia's National Health Insurance.”",
      brief: "— OpenJKN Policy Brief, May 2026",
      rights: "© 2026 OpenJKN Initiative. Open-source under MIT License.",
      contact: "Contact"
    }
  }
}
