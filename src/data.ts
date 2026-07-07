import { Service, Benefit, Stat, FAQItem } from "./types";

export const SERVICES: Service[] = [
  {
    id: "cctv-install",
    title: "CCTV Installation",
    description: "High-definition IP and analog camera setup with night vision, motion triggers, and real-time remote smartphone monitoring.",
    fullDescription: "Secure your home or workplace with our expert surveillance setup. We offer ultra-high-definition cameras including dome, bullet, and PTZ models featuring active smart tracking, continuous cloud or local NVR archiving, night-vision infrared sensors, and direct smartphone notifications.",
    iconName: "Camera",
    hot: true,
    imageUrl: "https://6a4d00acb793a9afadfb9df6.imgix.net/sandbox/CCtv%20installation%20.jpeg",
  },
  {
    id: "fiber-splicing",
    title: "Fiber Splicing",
    description: "Professional fusion splicing and high-density fiber ribbon terminations with micro-decibel optical loss ratings using premium Fujikura splicers.",
    fullDescription: "Minimize db-loss ratios with premium Fujikura core-alignment fusion splicing. We execute precise mechanical or thermal terminations, protect splices with physical heat-shrink tubes, and handle multi-core single-mode or multi-mode indoor/outdoor cable links for maximum structural throughput.",
    iconName: "Cable",
    hot: true,
    imageUrl: "https://6a4d00acb793a9afadfb9df6.imgix.net/sandbox/Fiber%20Splicing%20.jpeg",
  },
  {
    id: "network-setup",
    title: "Network Setup",
    description: "Enterprise-grade local network architecture, enterprise firewall policies, SSID configuration, and high-coverage AP deployment.",
    fullDescription: "Gain strong wireless coverage and high data speeds. We configure customized router channels, assign VLAN segments, deploy smart AP systems, setup firewalls, and address physical connectivity problems to eradicate signal dead zones entirely.",
    iconName: "Network",
    hot: false,
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cctv-repair",
    title: "CCTV Repair & Maintenance",
    description: "Rapid troubleshooting of video loss feeds, hardware diagnostic testing, power supply replacements, and diagnostic fine-tuning.",
    fullDescription: "Ensure 24/7 security continuity with our proactive maintenance sweeps. We check visual noise degradation, re-terminate loose coaxial or Ethernet plugs, restore corrupt hard drives on storage systems, and update camera firmware properties.",
    iconName: "Wrench",
    hot: false,
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fiber-testing",
    title: "Fiber Testing (OTDR)",
    description: "Comprehensive optical mapping, diagnostic fault distance analysis, signal loss metrics, and documentation.",
    fullDescription: "Identify micro-bends, tension points, and physical fiber fractures precisely. Utilizing modern Optical Time-Domain Reflectometer technology, we plot exact optical distance graphs to pinpoint cable faults deep inside structural conduits.",
    iconName: "Activity",
    hot: true,
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "biometric-system",
    title: "Attendance / Biometric System",
    description: "Intelligent fingerprint scanners, facial scanning terminals, and automated work schedule tracking software integrations.",
    fullDescription: "Streamline employee clock-ins and increase floor security. We configure robust standalone fingerprint or contactless IR face recognition scanners, integrate door locking mechanisms, and install intuitive admin desktop software platforms.",
    iconName: "Fingerprint",
    hot: false,
    imageUrl: "https://6a4d00acb793a9afadfb9df6.imgix.net/sandbox/Biomatric.jpeg",
  },
  {
    id: "structured-cabling",
    title: "Structured Cabling (Cat6)",
    description: "Tidy, modular, and high-performance Cat6 trunking and patching layouts backed by thorough segment-by-segment cable certification.",
    fullDescription: "Build a physical framework that scales happily. We construct detailed modular network racks, manage neat patch panels, install protective wire channels, and certify every cable path using advanced network analyzers.",
    iconName: "Shuffle",
    hot: false,
    imageUrl: "https://img1.wsimg.com/isteam/stock/ZzOweak/:/rs=w:1240,h:620,cg:true,m/cr=w:1240,h:620",
  },
  {
    id: "remote-cctv",
    title: "Remote CCTV App Setup",
    description: "Safe DDNS mappings, port forwarding configurations, and smartphone app authorizations for on-the-go visual access.",
    fullDescription: "Access security camera loops from any location. We setup virtual host configurations on network routers, implement secure credential policies to prevent data hijacking, and install and authorize viewers on iOS and Android mobiles.",
    iconName: "Smartphone",
    hot: false,
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  },
];

export const BENEFITS: Benefit[] = [
  {
    id: "prof-install",
    title: "Professional Installation",
    description: "Perfect angles, neat conduit channels, zero exposed wires, and certified testing standards on all site integrations.",
    iconName: "ShieldCheck",
  },
  {
    id: "fast-response",
    title: "Fast Response Time",
    description: "We minimize system down-time with localized diagnostic response units available to resolve networking issues and security bugs.",
    iconName: "Zap",
  },
  {
    id: "exp-tech",
    title: "Experienced Technicians",
    description: "Highly trained team specializing in complex fiber fusion splicing, precise network routing, and microelectronic diagnostics.",
    iconName: "Users",
  },
  {
    id: "affordable",
    title: "Affordable Pricing",
    description: "Fair, transparent price levels with written upfront estimates, no hidden service charges, and competitive commercial bundles.",
    iconName: "Coins",
  },
  {
    id: "quality-equip",
    title: "Quality Equipment",
    description: "We deploy high-integrity hardware certified by brands like Hikvision, Dahua, Ubiquiti, Cisco, and Corning glass components.",
    iconName: "Award",
  },
  {
    id: "support",
    title: "24/7 Emergency Support",
    description: "Continuous assistance to verify connection streams, reboot critical camera servers, and resolve networking disruptions.",
    iconName: "Headphones",
  },
];

export const STATS: Stat[] = [
  {
    id: "stat-projects",
    value: 500,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    id: "stat-clients",
    value: 300,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    id: "stat-experience",
    value: 5,
    suffix: "+ Years",
    label: "Industry Experience",
  },
  {
    id: "stat-satisfaction",
    value: 99,
    suffix: "%",
    label: "Customer Satisfaction",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-splitters",
    question: "What is the difference between active and passive optical splitters in fiber networks?",
    answer: "Active optical splitters require external electrical power to manage signal routing and amplification, which helps over longer distances. Passive splitters (PLC) use no power, utilizing physical light refractors to divide a single optical path into multiple loops (e.g., 1:8, 1:16, 1:32). Passive networks (GPON) are more reliable, have no electronic points of failure, and are highly cost-effective for enterprise and FTTH distributions."
  },
  {
    id: "faq-cabling",
    question: "Why do you recommend Cat6/Cat6A over Cat5e for security IP cameras?",
    answer: "While Cat5e supports Gigabit speeds, Cat6 and Cat6A offer 10-Gigabit capacity and double the bandwidth (up to 250MHz and 500MHz respectively). This higher frequency significantly reduces cross-talk and attenuation, ensuring that multiple high-definition 4K surveillance streams do not suffer frame loss, jitter, or high packet retransmissions, especially over longer cable runs up to 100 meters."
  },
  {
    id: "faq-cctv-sec",
    question: "How do you guarantee absolute security for remote CCTV app access?",
    answer: "We isolate the surveillance video network on a separate VLAN, block unauthorized external routing, and secure camera communication with custom certificates. For remote viewing, we configure secure end-to-end encrypted VPN tunnels (such as WireGuard or IPSec) rather than relying on risky port-forwarding methods, which often expose equipment directly to public web scanners."
  },
  {
    id: "faq-fiber-dist",
    question: "What is the maximum distance limitation for single-mode fiber splicing before signal degeneration?",
    answer: "Single-mode fiber (OS2) can transmit data up to 40 kilometers (approximately 25 miles) without active amplification. During installation, our fusion splicing maintains an incredibly low attenuation average of ≤0.02 dB per splice, keeping overall link loss well within the standard enterprise budget and ensuring ultra-fast packet transfers."
  },
  {
    id: "faq-poe-standards",
    question: "What is PoE (Power over Ethernet) and which standard do your installations use?",
    answer: "PoE allows a single Cat6 network cable to transmit both high-speed data and electrical power to a device. We deploy devices according to standard IEEE parameters: PoE (802.3af, up to 15.4W for standard cameras), PoE+ (802.3at, up to 30W for PTZ cameras with heaters), and PoE++ (802.3bt, up to 60W-90W for robust switches and dual-lens pan-tilt thermal systems)."
  }
];

