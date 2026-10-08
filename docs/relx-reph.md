# RELX / REPH: Company Context

Background for grounding the project. Public sources only (no hackathon data). Researched 2026-10-09. Much of the Philippines material is company-authored or sponsored, so treat it as the company's own framing.

## 1. Who is REPH

- **REPH** = Reed Elsevier Philippines, legal entity _Reed Elsevier Shared Services (Philippines), Inc._ (RESSPI). Brands itself "RELX | Reed Elsevier".
- It is the **shared services arm of RELX**, serving RELX businesses in all market segments (Elsevier, LexisNexis Legal & Professional, LexisNexis Risk Solutions, Reed Exhibitions).
- Started local operations 2010-2011 (sources differ). Marked 15 years in April 2026.
- **Sites:** Manila (UP-Ayalaland TechnoHub, Quezon City), Iloilo (Iloilo Business Park, opened 2015 with ~400 staff, now ~1,500). Also Alabang, Cebu, Davao. Satellites in Poland and Malaysia.
- **Headcount:** 6,000+ (April 2026).
- **Leadership:** Mark Lwin, Managing Director. Others quoted: Michelle Hidalgo (senior operations manager, legal), Sheryl Prado (operations director, legal).
- **Evolution:** editorial/content operations -> services across the whole value chain -> software engineering, data science, AI, risk analytics, automation.

### REPH service divisions (from reedelsevier.com.ph)

1. Business Management & Finance
2. Business Services & Optimization (quality, continuous improvement, workforce mgmt, metrics reporting, invoice processing)
3. Customer Support Operations (order processing, fulfilment, customer service, tech support, onboarding; voice/email/chat/social)
4. Finance & Accounting Hub (record to report, order to cash, procure to pay)
5. Human Resources
6. Legal Administration (contract management/review, legal research)
7. Primary Law Operations (tracking, collecting, fabricating, editing legal/tax/regulatory/news content)
8. Program Planning & Implementation (work migrations into REPH)
9. Publishing & Editorial Operations
10. Risk Solutions Operations (customer service, data processing, tech ops)
11. Sales & Marketing Operations (campaigns, data management, analytics, account mgmt, retention)
12. Technology Operations (mission-critical ICT, apps that automate business processes)

Likely hackathon-relevant pain-point areas: high-volume, document/data-heavy, repetitive workflows (content tracking and editing, contract review, invoice/AP processing, customer support, data maintenance and quality, reporting). Unconfirmed until the brief is read.

### Workforce / culture signals

- Internal training and certifications in **AI, Agile, Six Sigma, RPA, information security**. "One RELX University" learning paths (data analytics, Python, tech leadership).
- Stated AI stance: **augment human intelligence, not replace people**. Filipino engineers/data scientists work on _extractive and generative AI_.
- Example career path: Data Maintenance Specialist -> Software Engineer.
- Hybrid work. Employee Circles (Women's, Pride, Enabled, Mosaic, Soul). #3 Top Inspiring Workplace in Asia (2025). Philippines Best Employers 2026 (Inquirer/Statista).
- CSR: RELX Cares, P4.3M for education in 2026 (with Kapatid Kita Mahal Kita Foundation).
- Language they use: "decision tools", "analytics", "trusted/verified content", "augment", "real-world outcomes".

## 2. RELX Group

Global provider of **information-based analytics and decision tools** for professional and business customers. Strategy: combine unique content and data sets with advanced technology, shifting mix toward higher-growth analytics and decision tools. Print is now ~4% of revenue (was 64% 25 years ago).

- ~11,000 technologists (over half software engineers), ~$1.7bn annual technology spend.
- Capex 2025: £525m (5.5% of revenue), mostly capitalised development.
- Management line: AI has been a key driver for "well over a decade", lets them add functionality and launch products faster "while continuing to manage cost growth below revenue growth".

### FY2025 results (12 Feb 2026)

Group revenue £9,590m (+7% underlying), adjusted operating profit £3,342m (+9%), adjusted EPS 128.5p, dividend 67.5p, adjusted cash conversion 99%.

| Segment     | Revenue | Underlying growth | Adj. op. profit | Margin | Key products / drivers                                                                                                                                  |
| ----------- | ------- | ----------------- | --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Risk        | £3,485m | +8%               | £1,305m         | 37.4%  | LexisNexis Risk Solutions: Financial Crime Compliance, digital fraud and identity, insurance contributory databases, commodity intelligence, government |
| STM         | £2,714m | +5%               | £1,035m         | 38.1%  | Elsevier: ScienceDirect, Scopus AI, Sherpath AI, LeapSpace (end-to-end AI researcher tool), journals/primary research                                   |
| Legal       | £1,806m | +9%               | £415m           | 23.0%  | LexisNexis Legal & Professional: Lexis+ AI, Protégé (agentic legal assistant), General AI and Workflows features                                        |
| Exhibitions | £1,186m | +8%               | £410m           | 34.6%  | Reed Exhibitions: face-to-face events plus digital tools for exhibitors/attendees                                                                       |

2026 outlook: continued strong underlying revenue growth, profit growth ahead of revenue.

### Key brands

- **Elsevier** (STM): journals, databases, clinical/nursing education tools.
- **LexisNexis Legal & Professional**: legal research, analytics, Lexis+ AI.
- **LexisNexis Risk Solutions**: fraud, identity, compliance, insurance data.
- **Reed Exhibitions**: trade shows.

## 3. RELX Responsible AI Principles

Complement existing policies, risk-based, applied per business area. Five principles:

1. Consider the real-world impact of solutions on people
2. Take action to prevent creating or reinforcing unfair bias
3. Explain how solutions work
4. Create accountability through human oversight
5. Respect privacy and champion robust data governance

Principal risks RELX itself flags: personal data handling, AI/tech disrupting products and pricing, quality and integrity of content, cybersecurity.

## 4. How to use this for the project

- **Mirror their principles in the UI:** show a short rationale for AI output, keep a human review/approve step (matches the hackathon's oversight rule and RELX principle 4), no unexplained scores.
- **Frame value in their terms:** faster turnaround, higher accuracy/quality, lower cost per transaction, freed capacity for higher-value work. All consistent with "cost growth below revenue growth" and "augment, not replace".
- **Keep humans in the loop narrative:** REPH staff move from manual processing to oversight and analysis (the Data Maintenance Specialist -> Software Engineer story).
- **Verified, trustworthy content is their brand.** Grounded answers with citations to source records beat free-form generation.
- **Ties to REPH's scale:** 6,000+ people, multi-site, serving all RELX divisions, so a tool that generalises across divisions is a good pitch.
- **Do not assume** the brief is about any specific division. Confirm against the official brief and supplied data; disclose any assumptions in the demo.

## 5. Caveats

- Headcount, founding year differ across sources (2010 vs 2011).
- The Inquirer piece is a sponsored "BrandRoom" advertorial; Upgrade Magazine/DPEX piece was paywalled. No independent reporting on specific REPH AI projects was found.
- Division list is from REPH's own site. No history or values list is published there.
- The RELX press release PDF and Responsible AI principles PDF were read via excerpts/search summaries, not the full principles text.

## Sources

- REPH, About RELX | Reed Elsevier: https://www.reedelsevier.com.ph/who-we-are/about-relx-reed-elsevier/
- Inquirer Technology (sponsored), Nov 2025: https://technology.inquirer.net/143607/relx-reed-elsevier-building-tech-careers-that-shape-global-innovation
- Newsbytes.PH, RELX marks 15 years in PH, Apr 2026: https://newsbytes.ph/2026/04/17/relx-marks-15-years-in-ph-expands-footprint-and-workforce/
- Newsbytes.PH, Lexis+ AI and PH legal practice, Jan 2024: https://newsbytes.ph/2024/01/27/ai-comes-to-ph-legal-practice-with-lexisnexi-analytics-ecosystem/
- Context.ph, RELX in Iloilo, May 2025: https://context.ph/2025/05/03/relx-unit-marks-decade-in-iloilo-cites-tech-driven-growth-and-strategic-role/
- DPEX / Upgrade Magazine, Jun 2026: https://www.dpexnetwork.org/news/view/U2ik7G9uF6qb33dejEPmG6
- RELX FY2025 results press release: https://www.relx.com/~/media/Files/R/RELX-Group/documents/press-releases/2026/results-2025-pressrelease.pdf
- RELX Responsible AI: https://www.relx.com/corporate-responsibility/being-a-responsible-business/responsible-ai
