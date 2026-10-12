const companies = {
  INFY: {
    overview:
      "Infosys is an Indian multinational company providing IT services, consulting, and digital transformation solutions.",
    sector: "Information Technology",
    industry: "IT Services and Consulting",
  },

  ONGC: {
    overview:
      "Oil and Natural Gas Corporation is an Indian public sector company engaged in oil and natural gas exploration and production.",
    sector: "Energy",
    industry: "Oil and Gas Exploration and Production",
  },

  TCS: {
    overview:
      "Tata Consultancy Services provides IT services, consulting, and business solutions to clients worldwide.",
    sector: "Information Technology",
    industry: "IT Services and Consulting",
  },

  KPITTECH: {
    overview:
      "KPIT Technologies provides engineering and software solutions focused on the automotive and mobility industries.",
    sector: "Information Technology",
    industry: "Automotive Software and Engineering",
  },

  QUICKHEAL: {
    overview:
      "Quick Heal Technologies develops cybersecurity products and solutions for individuals and businesses.",
    sector: "Information Technology",
    industry: "Cybersecurity Software",
  },

  WIPRO: {
    overview:
      "Wipro provides IT services, consulting, engineering, and digital transformation solutions.",
    sector: "Information Technology",
    industry: "IT Services and Consulting",
  },

  "M&M": {
    overview:
      "Mahindra & Mahindra is an Indian automotive and farm equipment manufacturer with businesses across multiple sectors.",
    sector: "Automobile",
    industry: "Automobiles and Farm Equipment",
  },

  RELIANCE: {
    overview:
      "Reliance Industries operates across energy, retail, digital services, telecommunications, and consumer businesses.",
    sector: "Diversified",
    industry: "Conglomerate",
  },

  HUL: {
    overview:
      "Hindustan Unilever manufactures and sells consumer products across personal care, home care, beauty, and food categories.",
    sector: "Fast-Moving Consumer Goods",
    industry: "Consumer Products",
  },

  SBIN: {
    overview:
      "State Bank of India is a major Indian public sector bank offering retail banking, corporate banking, and financial services.",
    sector: "Financial Services",
    industry: "Banking",
  },

  ITC: {
    overview:
      "ITC Limited operates in consumer goods, packaged foods, paperboards, packaging, and other businesses.",
    sector: "Fast-Moving Consumer Goods",
    industry: "Consumer Goods and Diversified Businesses",
  },

  TATAPOWER: {
    overview:
      "Tata Power is an integrated power company involved in electricity generation, transmission, distribution, and renewable energy.",
    sector: "Energy",
    industry: "Power Generation and Utilities",
  },

  HDFCBANK: {
    overview:
      "HDFC Bank is a major Indian private sector bank providing retail banking, corporate banking, loans, and financial services.",
    sector: "Financial Services",
    industry: "Banking",
  },

  ICICIBANK: {
    overview:
      "ICICI Bank provides banking and financial services to individuals, businesses, and corporate customers.",
    sector: "Financial Services",
    industry: "Banking",
  },

  AXISBANK: {
    overview:
      "Axis Bank is an Indian private sector bank offering retail banking, corporate banking, and financial products.",
    sector: "Financial Services",
    industry: "Banking",
  },

  LT: {
    overview:
      "Larsen & Toubro is an engineering and construction company involved in infrastructure, manufacturing, and technology services.",
    sector: "Industrials",
    industry: "Engineering and Construction",
  },

  BHARTIARTL: {
    overview:
      "Bharti Airtel provides telecommunications, mobile connectivity, broadband, and digital services.",
    sector: "Telecommunication",
    industry: "Telecom Services",
  },

  ADANIENT: {
    overview:
      "Adani Enterprises is a diversified business group with interests in infrastructure, airports, energy, and other sectors.",
    sector: "Diversified",
    industry: "Infrastructure and Conglomerate",
  },

  TATASTEEL: {
    overview:
      "Tata Steel is a steel producer involved in steel manufacturing and related mining and processing activities.",
    sector: "Materials",
    industry: "Steel Manufacturing",
  },

  MARUTI: {
    overview:
      "Maruti Suzuki India manufactures and sells passenger vehicles and related automotive products.",
    sector: "Automobile",
    industry: "Passenger Vehicle Manufacturing",
  },

  HCLTECH: {
    overview:
      "HCLTech provides IT services, engineering solutions, software services, and digital transformation solutions.",
    sector: "Information Technology",
    industry: "IT Services and Consulting",
  },

  NIFTY50: {
    overview:
      "NIFTY 50 is an Indian stock market index representing 50 major companies listed on the National Stock Exchange.",
    sector: "Broad Market Index",
    industry: "Large-Cap Equity Index",
  },

  SENSEX: {
    overview:
      "BSE SENSEX is a benchmark Indian stock market index tracking 30 major companies listed on the Bombay Stock Exchange.",
    sector: "Broad Market Index",
    industry: "Large-Cap Equity Index",
  },
};

const getCompanyInfo = (symbol) => {
  return companies[symbol.toUpperCase()] || null;
};

module.exports = { getCompanyInfo };


