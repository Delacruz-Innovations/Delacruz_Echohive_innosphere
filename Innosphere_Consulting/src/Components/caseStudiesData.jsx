// All case studies data with format: Challenge → Approach → Result → Impact Metrics

import case01 from '../assets/case01.jpg';
import case02 from '../assets/case02.jpg';
import case03 from '../assets/case03.jpg';
import case04 from '../assets/case04.jpg';
import case05 from '../assets/case05.jpg';

const caseStudiesData = {
  'dbt-digital-transformation': {
    id: 1,
    title: "Department for Business & Trade – Digital Transformation",
    category: "Digital Transformation",
    client: "UK Government / Public Sector",
    duration: "12 months",
    image: case01,
    overview: "The department was undergoing a large-scale migration from DataHub to the GOV.UK backend, with multiple legacy systems and cross-border teams handling highly sensitive data.",
    details: {
      challenge: "The department was undergoing a large-scale migration from DataHub to the GOV.UK backend, with multiple legacy systems and cross-border teams handling highly sensitive data:\n\n• Multiple legacy systems with inconsistent processes across departments\n• Cross-border teams handling highly sensitive data requiring strict security protocols\n• Stakeholder frustration due to misaligned operations and workflows\n• Need to comply with Government Digital Service (GDS) standards\n• Risk of disruption during large-scale migration",
      approach: "Led process mapping initiatives to understand workflows, identify gaps, and streamline operations:\n\n• Conducted comprehensive process mapping to understand current workflows\n• Worked closely with cross-functional, multi-region teams to gather requirements\n• Validated requirements in line with Government Digital Service (GDS) standards\n• Produced detailed migration artefacts to ensure seamless transitions\n• Implemented safeguards to minimize disruption during migration",
      result: "The digital transformation delivered significant improvements in operational efficiency and data integrity:\n\n• Reduced process inconsistencies across regions\n• Improved operational efficiency and alignment between teams\n• Ensured secure and accurate data migration while protecting sensitive information\n• Delivered a foundation for scalable and efficient digital operations",
      impactMetrics: [
        { value: 'Improved', label: 'Operational alignment' },
        { value: '100%', label: 'Data integrity maintained' },
        { value: 'Future-Ready', label: 'Scalable framework' },
        { value: 'Multi-Region', label: 'Teams coordinated' }
      ]
    }
  },
  'lloyds-systems-consolidation': {
    id: 2,
    title: "Lloyds Banking Group – Systems Consolidation & Operating Redesign",
    category: "Business Transformation",
    client: "Banking / Financial Services",
    duration: "18 months",
    image: case05,
    overview: "The bank managed 26 legacy loan systems, resulting in slow processing times, fragmented customer experiences, and high maintenance costs.",
    details: {
      challenge: "Lloyds Banking Group faced significant challenges with legacy systems:\n\n• Management of 26 separate legacy loan systems causing complexity\n• Slow processing times impacting customer service\n• Fragmented customer experiences across different systems\n• High maintenance costs for multiple redundant systems\n• Process redundancies reducing operational efficiency",
      approach: "Led the analysis stream for the consolidation initiative as Senior Business Consultant:\n\n• Mapped end-to-end loan processes across all 26 systems\n• Identified and removed process redundancies\n• Collaborated across departments to define unified system requirements\n• Designed consolidated system architecture & operating model\n• Implemented strong change management practices",
      result: "The systems consolidation delivered substantial improvements in efficiency and customer experience:\n\n• 30% reduction in loan processing times\n• Improved client experience and faster service delivery\n• Enhanced customer satisfaction through unified experience\n• Reduced operational and maintenance costs through consolidation",
      impactMetrics: [
        { value: '30%', label: 'Faster processing times' },
        { value: 'Improved', label: 'Customer satisfaction' },
        { value: 'Reduced', label: 'Maintenance costs' },
        { value: '26→1', label: 'Systems consolidated' }
      ]
    }
  },
  'mena-enterprise-ai-automation': {
    id: 3,
    title: "Regional Logistics Hub – Enterprise AI & Process Automation",
    category: "AI & Automation",
    client: "Logistics & Supply Chain / UAE",
    duration: "8 months",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    overview: "A major UAE supply chain enterprise struggled with manual document clearance, invoice reconciliation, and customer tracking delays across cross-border freight.",
    details: {
      challenge: "Manual document processing and disparate logistics tracking caused significant delays and errors:\n\n• Over 5,000 monthly shipping manifests processed manually\n• Frequent customs clearance delays due to manual entry errors\n• High operational overhead and slow client inquiry turnaround\n• Lack of unified predictive analytics for inventory and routing",
      approach: "Implemented an intelligent automation and AI document-processing engine:\n\n• Deployed custom optical character recognition (OCR) and LLM-powered invoice parsing\n• Built automated RPA workflows connecting customs portals to ERP\n• Integrated real-time tracking dashboard with predictive anomaly detection\n• Trained internal operations teams on AI monitoring and oversight",
      result: "Transformed supply chain velocity through automated data extraction and AI triage:\n\n• 78% reduction in manual document handling time\n• Zero customs compliance penalties recorded post-launch\n• Faster customer resolution time from 4 hours to under 5 minutes",
      impactMetrics: [
        { value: '78%', label: 'Manual time eliminated' },
        { value: '<5 Min', label: 'Resolution time' },
        { value: '99.4%', label: 'OCR accuracy' },
        { value: 'Zero', label: 'Compliance penalties' }
      ]
    }
  },
  'sky-betting-crm-optimisation': {
    id: 4,
    title: "Sky Betting & Gaming – Technology & CRM Optimisation",
    category: "Technology",
    client: "Gaming / Technology",
    duration: "10 months",
    image: case04,
    overview: "Fragmented CRM and operational systems limited visibility into customer behavior, reducing analytics accuracy and slowing real-time decision-making.",
    details: {
      challenge: "Sky Betting & Gaming faced operational challenges limiting business effectiveness:\n\n• Fragmented CRM and operational systems across the organization\n• Limited visibility into customer behaviour and lifecycle\n• Slow decision-making due to data gaps\n• Inefficient workflows reducing operational effectiveness",
      approach: "Served as Lead Business Consultant, reviewing and optimising CRM workflows:\n\n• Reviewed existing CRM workflows to identify inefficiencies\n• Identified gaps in processes and data management\n• Implemented optimisations across CRM systems\n• Enhanced analytics capabilities for better insights",
      result: "The CRM optimisation delivered significant improvements in efficiency and decision-making:\n\n• Streamlined CRM processes for better customer lifecycle management\n• Enhanced analytics and insights to support strategic decisions\n• Increased efficiency and collaboration across departments",
      impactMetrics: [
        { value: 'Streamlined', label: 'CRM processes' },
        { value: 'Enhanced', label: 'Analytics capabilities' },
        { value: 'Increased', label: 'Operational efficiency' },
        { value: 'Improved', label: 'Cross-dept collaboration' }
      ]
    }
  },
  'fintech-cybersecurity-pdpl': {
    id: 5,
    title: "FinTech Platform – PDPL & Cybersecurity Risk Architecture",
    category: "Cybersecurity",
    client: "Financial Services / UAE",
    duration: "6 months",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    overview: "A high-growth fintech preparing for regional expansion required comprehensive PDPL compliance, penetration testing, and a zero-trust cybersecurity posture.",
    details: {
      challenge: "Complex financial data handling with strict regulatory mandates:\n\n• Required compliance with UAE Personal Data Protection Law (PDPL) and Central Bank standards\n• Vulnerabilities identified in third-party API payment gateways\n• Absence of formal incident response and data breach playbooks",
      approach: "Conducted end-to-end cyber gap assessment and risk remediation:\n\n• Performed comprehensive threat modeling and API vulnerability remediation\n• Formulated vCISO governance policies and data encryption standards\n• Conducted phishing simulation drills and staff cybersecurity certifications",
      result: "Achieved full regulatory compliance and zero-trust security readiness:\n\n• 100% compliance certification attained ahead of regulatory deadline\n• Hardened API architecture with zero high-risk vulnerabilities\n• Established 24/7 automated security telemetry and monitoring",
      impactMetrics: [
        { value: '100%', label: 'Compliance achieved' },
        { value: 'Zero', label: 'High vulnerabilities' },
        { value: '24/7', label: 'Security telemetry' },
        { value: 'vCISO', label: 'Governance model' }
      ]
    }
  },
  'easyjet-digital-retail': {
    id: 6,
    title: "easyJet – Product / Software & Digital Retail Experience",
    category: "Product / Software",
    client: "Aviation / Travel",
    duration: "6 months",
    image: case03,
    overview: "Easyjet needed to enhance personalization in digital retail software to drive ancillary revenue, aligning commercial strategy with IT systems.",
    details: {
      challenge: "Easyjet faced challenges in maximizing ancillary revenue through digital channels:\n\n• Need to enhance personalization in digital retail experiences\n• Misalignment between commercial strategy and IT systems\n• Limited customer behaviour insights affecting merchandising decisions",
      approach: "Led the business analysis workstream for Datalex Merchandiser software implementation:\n\n• Bridged the gap between commercial, IT, and vendor software teams\n• Aligned requirements across all stakeholder groups\n• Mapped customer behaviour to inform personalization strategy",
      result: "The digital retail software delivered measurable revenue growth:\n\n• Increased ancillary revenue through personalised retail experiences\n• Improved collaboration between commercial and IT teams\n• Enhanced customer experience through better personalization",
      impactMetrics: [
        { value: 'Increased', label: 'Ancillary revenue' },
        { value: 'Improved', label: 'Cross-team alignment' },
        { value: 'Enhanced', label: 'Personalization' },
        { value: 'Actionable', label: 'Data insights' }
      ]
    }
  }
};

export default caseStudiesData;
