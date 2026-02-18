// All case studies data with new format: Challenge → Approach → Result → Impact Metrics

import case01 from '../assets/case01.jpg'
import case02 from '../assets/case02.jpg'
import case03 from '../assets/case03.jpg'
import case04 from '../assets/case04.jpg'
import case05 from '../assets/case05.jpg'
const caseStudiesData = {
  'dbt-digital-transformation': {
    id: 1,
    title: "Department for Business & Trade  Digital Transformation",
    category: "Digital Transformation",
    client: "UK Government / Public Sector",
    duration: "12 months",
    image: case01,
    overview: "The department was undergoing a large-scale migration from DataHub to the GOV.UK backend, with multiple legacy systems and cross-border teams handling highly sensitive data. Processes were inconsistent, and stakeholders were frustrated by misaligned operations.",
    details: {
      challenge: "The department was undergoing a large-scale migration from DataHub to the GOV.UK backend, with multiple legacy systems and cross-border teams handling highly sensitive data:\n\n• Multiple legacy systems with inconsistent processes across departments\n• Cross-border teams handling highly sensitive data requiring strict security protocols\n• Stakeholder frustration due to misaligned operations and workflows\n• Need to comply with Government Digital Service (GDS) standards\n• Risk of disruption during large-scale migration\n• Complex coordination across multiple regions and functions",
      approach: "Led process mapping initiatives to understand workflows, identify gaps, and streamline operations:\n\n• Conducted comprehensive process mapping to understand current workflows\n• Worked closely with cross-functional, multi-region teams to gather requirements\n• Validated requirements in line with Government Digital Service (GDS) standards\n• Identified gaps and opportunities for streamlining operations\n• Produced detailed migration artefacts to ensure seamless transitions\n• Implemented safeguards to minimize disruption during migration",
      result: "The digital transformation delivered significant improvements in operational efficiency and data integrity:\n\n• Reduced process inconsistencies across regions\n• Improved operational efficiency and alignment between teams\n• Ensured secure and accurate data migration while protecting sensitive information\n• Delivered a foundation for scalable and efficient digital operations\n• Minimal disruption during the migration process\n• Future-ready framework supporting long-term digital transformation goals",
      impactMetrics: [
        { value: 'Improved', label: 'Operational alignment' },
        { value: '100%', label: 'Data integrity maintained' },
        { value: 'Future-Ready', label: 'Scalable framework' },
        { value: 'Multi-Region', label: 'Teams coordinated' }
      ]
    }
  },
  'nhs-crm-modernisation': {
    id: 2,
    title: "NHS England  Replatforming & CRM Modernisation",
    category: "Healthcare Transformation",
    client: "Healthcare / Public Sector",
    duration: "14 months",
    image: case02,
    overview: "NHS 111 online was outdated, with duplicated workflows that caused frustration for call handlers and administrators. The CRM system was under-optimised, leading to inefficiencies in managing clinical data.",
    details: {
      challenge: "NHS 111 online faced critical challenges impacting service delivery and user experience:\n\n• Outdated online service platform requiring modernization\n• Duplicated workflows causing frustration for call handlers and administrators\n• Under-optimised CRM system limiting efficiency\n• Inefficiencies in managing clinical data\n• Processing errors affecting data accuracy\n• Need for improved user experience across all touchpoints",
      approach: "Acted as Lead Business Consultant to retool the online service and digitise the CRM:\n\n• Collaborated with clinical authors, IT teams, and administrators\n• Mapped workflows to identify friction points and inefficiencies\n• Co-created practical, user-focused solutions with stakeholders\n• Redesigned CRM workflows for optimal efficiency\n• Implemented digital tools to replace manual processes\n• Conducted user testing to ensure improved experience",
      result: "The CRM modernisation delivered substantial improvements in user experience and operational efficiency:\n\n• Enhanced experience for call handlers and administrators\n• Streamlined workflows reducing processing errors\n• Improved data accuracy across clinical systems\n• Increased confidence among staff using new digital tools\n• Empowered teams with modern, intuitive interfaces\n• Foundation for continued digital innovation in healthcare",
      impactMetrics: [
        { value: 'Enhanced', label: 'User experience' },
        { value: 'Reduced', label: 'Processing errors' },
        { value: 'Increased', label: 'Staff confidence' },
        { value: 'Improved', label: 'Data accuracy' }
      ]
    }
  },
  'easyjet-digital-retail': {
    id: 3,
    title: "easyJet  Digital Retail & Ancillary Revenue Growth",
    category: "Digital Commerce",
    client: "Aviation / Travel",
    duration: "6 months",
    image: case03,
    overview: "Easyjet needed to enhance personalization in digital retail to drive ancillary revenue. The challenge was aligning commercial strategy with IT systems and ensuring smooth adoption across teams.",
    details: {
      challenge: "Easyjet faced challenges in maximizing ancillary revenue through digital channels:\n\n• Need to enhance personalization in digital retail experiences\n• Misalignment between commercial strategy and IT systems\n• Limited customer behaviour insights affecting merchandising decisions\n• Cross-team collaboration gaps between commercial and IT departments\n• Lack of optimised workflows for personalization\n• Need for smooth adoption of new systems across teams",
      approach: "Led the business analysis workstream for Datalex Merchandiser implementation:\n\n• Bridged the gap between commercial, IT, and vendor teams\n• Aligned requirements across all stakeholder groups\n• Mapped customer behaviour to inform personalization strategy\n• Optimised workflows for personalization and efficiency\n• Facilitated collaboration between commercial and IT teams\n• Ensured smooth system adoption through comprehensive training",
      result: "The digital retail transformation delivered measurable revenue growth and improved collaboration:\n\n• Increased ancillary revenue through personalised retail experiences\n• Improved collaboration between commercial and IT teams\n• Empowered teams with clearer data and actionable insights\n• Measurable performance improvements across key metrics\n• Enhanced customer experience through better personalization\n• Foundation for continued digital commerce innovation",
      impactMetrics: [
        { value: 'Increased', label: 'Ancillary revenue' },
        { value: 'Improved', label: 'Cross-team alignment' },
        { value: 'Enhanced', label: 'Personalization' },
        { value: 'Actionable', label: 'Data insights' }
      ]
    }
  },
  'sky-betting-crm-optimisation': {
    id: 4,
    title: "Sky Betting & Gaming – CRM & Operational Optimisation",
    category: "Technology & Operations",
    client: "Gambling / Technology",
    duration: "10 months",
    image: case04,
    overview: "Sky Betting & Gaming's CRM and operational systems were fragmented, limiting visibility into customer behaviour and slowing decision-making.",
    details: {
      challenge: "Sky Betting & Gaming faced operational challenges limiting business effectiveness:\n\n• Fragmented CRM and operational systems across the organization\n• Limited visibility into customer behaviour and lifecycle\n• Slow decision-making due to data gaps\n• Inefficient workflows reducing operational effectiveness\n• Lack of scalable, measurable processes\n• Need for improved analytics and insights capabilities",
      approach: "Served as Lead Business Consultant, reviewing and optimising CRM workflows:\n\n• Reviewed existing CRM workflows to identify inefficiencies\n• Identified gaps in processes and data management\n• Implemented optimisations across CRM systems\n• Collaborated with senior stakeholders to design scalable processes\n• Aligned improvements with business objectives\n• Enhanced analytics capabilities for better insights",
      result: "The CRM optimisation delivered significant improvements in efficiency and decision-making:\n\n• Streamlined CRM processes for better customer lifecycle management\n• Enhanced analytics and insights to support strategic decisions\n• Increased efficiency and collaboration across departments\n• Improved operational clarity throughout the organization\n• Data-driven decision-making capabilities established\n• Foundation for continued operational excellence",
      impactMetrics: [
        { value: 'Streamlined', label: 'CRM processes' },
        { value: 'Enhanced', label: 'Analytics capabilities' },
        { value: 'Increased', label: 'Operational efficiency' },
        { value: 'Improved', label: 'Cross-dept collaboration' }
      ]
    }
  },
  'lloyds-systems-consolidation': {
    id: 5,
    title: "Lloyds Banking Group – Systems Consolidation",
    category: "Systems Integration",
    client: "Banking / Financial Services",
    duration: "18 months",
    image: case05,
    overview: "The bank managed 26 legacy loan systems, resulting in slow processing times, fragmented customer experiences, and high maintenance costs.",
    details: {
      challenge: "Lloyds Banking Group faced significant challenges with legacy systems:\n\n• Management of 26 separate legacy loan systems causing complexity\n• Slow processing times impacting customer service\n• Fragmented customer experiences across different systems\n• High maintenance costs for multiple redundant systems\n• Process redundancies reducing operational efficiency\n• Need for unified, efficient system architecture",
      approach: "Led the analysis stream for the consolidation initiative as Senior Business Consultant:\n\n• Mapped end-to-end loan processes across all 26 systems\n• Identified and removed process redundancies\n• Collaborated across departments to define unified system requirements\n• Designed consolidated system architecture\n• Implemented strong change management practices\n• Ensured smooth transition with minimal business disruption",
      result: "The systems consolidation delivered substantial improvements in efficiency and customer experience:\n\n• 30% reduction in loan processing times\n• Improved client experience and faster service delivery\n• Enhanced customer satisfaction through unified experience\n• Reduced operational and maintenance costs through consolidation\n• Simplified system landscape improving agility\n• Foundation for future digital banking innovations",
      impactMetrics: [
        { value: '30%', label: 'Faster processing times' },
        { value: 'Improved', label: 'Customer satisfaction' },
        { value: 'Reduced', label: 'Maintenance costs' },
        { value: '26→1', label: 'Systems consolidated' }
      ]
    }
  }
};

export default caseStudiesData;


