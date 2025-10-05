// Enhanced API Configuration for Financial Dashboard
// Now includes Kite Connect API integration

const API_CONFIG = {
    // Set to false to use real APIs (requires valid API keys)
    USE_MOCK_DATA: false,

    // Enhanced API Keys - Replace with your actual keys
    API_KEYS: {
        // Alpha Vantage - Free tier: 25 requests/day
        // Get key from: https://www.alphavantage.co/support/#api-key
        ALPHA_VANTAGE: '0GJK2UBR45S1N699',

        // Financial Modeling Prep - Free tier: 250 requests/day
        // Get key from: https://financialmodelingprep.com/developer/docs
        FMP: 'CX9qZQ6RnbnRiKJTBC39x5MN6Pz28hnV',

        // Twelve Data - Free tier: 800 requests/day
        // Get key from: https://twelvedata.com
        TWELVE_DATA: 'f25ce7dd8886433180c31705f860dc60',

        // Kite Connect API - Your credentials
        KITE_API_KEY: 'hqjrrw0jd78uwkae',
        KITE_API_SECRET: 'e0rduext4cmv4as940p7x7jqwv0ggkhr',

        // For Indian markets - if using paid services
        NSE_API_KEY: 'YOUR_NSE_KEY',
        BSE_API_KEY: 'YOUR_BSE_KEY'
    },

    // Enhanced API Endpoints
    ENDPOINTS: {
        ALPHA_VANTAGE: 'https://www.alphavantage.co/query',
        FMP: 'https://financialmodelingprep.com/api/v3',
        TWELVE_DATA: 'https://api.twelvedata.com',

        // Yahoo Finance (no key required but rate limited)
        YAHOO_FINANCE: 'https://query1.finance.yahoo.com/v8/finance/chart',

        // Kite Connect
        KITE_CONNECT: 'https://api.kite.trade',
        KITE_LOGIN: 'https://kite.zerodha.com/connect/login',

        // For Indian data
        NSE_INDIA: 'https://www.nseindia.com/api',
        BSE_INDIA: 'https://api.bseindia.com',

        // Google Finance (for scraping)
        GOOGLE_FINANCE: 'https://www.google.com/finance'
    },

    // Enhanced Symbol Mappings
    SYMBOLS: {
        GLOBAL: {
            INDICES: [
                { symbol: 'SPY', name: 'S&P 500' },
                { symbol: 'QQQ', name: 'NASDAQ' },
                { symbol: 'DIA', name: 'DOW JONES' },
                { symbol: '^FTSE', name: 'FTSE 100' },
                { symbol: '^GDAXI', name: 'DAX' },
                { symbol: '^N225', name: 'NIKKEI' }
            ]
        },
        INDIA: {
            INDICES: [
                { symbol: '^NSEI', name: 'NIFTY 50', kite: 'NSE:NIFTY 50' },
                { symbol: '^BSESN', name: 'SENSEX', kite: 'BSE:SENSEX' },
                { symbol: '^NSEBANK', name: 'NIFTY BANK', kite: 'NSE:NIFTY BANK' },
                { symbol: '^CNXIT', name: 'NIFTY IT', kite: 'NSE:NIFTY IT' },
                { symbol: '^CNXAUTO', name: 'NIFTY AUTO', kite: 'NSE:NIFTY AUTO' },
                { symbol: '^CNXFMCG', name: 'NIFTY FMCG', kite: 'NSE:NIFTY FMCG' }
            ],
            STOCKS: [
                { symbol: 'RELIANCE.NS', name: 'Reliance Industries', kite: 'NSE:RELIANCE' },
                { symbol: 'TCS.NS', name: 'Tata Consultancy Services', kite: 'NSE:TCS' },
                { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', kite: 'NSE:HDFCBANK' },
                { symbol: 'INFY.NS', name: 'Infosys', kite: 'NSE:INFY' },
                { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', kite: 'NSE:ICICIBANK' },
                { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', kite: 'NSE:KOTAKBANK' },
                { symbol: 'LT.NS', name: 'Larsen & Toubro', kite: 'NSE:LT' },
                { symbol: 'SBIN.NS', name: 'State Bank of India', kite: 'NSE:SBIN' },
                { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance', kite: 'NSE:BAJFINANCE' },
                { symbol: 'ASIANPAINT.NS', name: 'Asian Paints', kite: 'NSE:ASIANPAINT' },
                { symbol: 'MARUTI.NS', name: 'Maruti Suzuki', kite: 'NSE:MARUTI' },
                { symbol: 'TITAN.NS', name: 'Titan Company', kite: 'NSE:TITAN' },
                { symbol: 'NESTLEIND.NS', name: 'Nestle India', kite: 'NSE:NESTLEIND' },
                { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement', kite: 'NSE:ULTRACEMCO' },
                { symbol: 'WIPRO.NS', name: 'Wipro', kite: 'NSE:WIPRO' }
            ]
        }
    },

    // Rate Limiting Configuration
    RATE_LIMITS: {
        ALPHA_VANTAGE: 5, // calls per minute
        FMP: 300, // calls per minute for free tier
        TWELVE_DATA: 800, // calls per day
        KITE_CONNECT: 3000, // calls per second for paid tier
        YAHOO_FINANCE: 2000, // calls per hour (estimated)
        GOOGLE_FINANCE: 100 // calls per hour (estimated)
    },

    // Retry Configuration
    RETRY_CONFIG: {
        MAX_RETRIES: 3,
        RETRY_DELAY: 1000, // milliseconds
        BACKOFF_MULTIPLIER: 2
    },

    // Cache Configuration
    CACHE_CONFIG: {
        ENABLE_CACHE: true,
        CACHE_DURATION: 60000, // 1 minute in milliseconds
        MAX_CACHE_SIZE: 100 // maximum cached responses
    }
};

// Helper function to get Kite instrument token
function getKiteInstrument(symbol, exchange = 'NSE') {
    const instruments = API_CONFIG.SYMBOLS.INDIA.STOCKS.concat(API_CONFIG.SYMBOLS.INDIA.INDICES);
    const instrument = instruments.find(inst => 
        inst.symbol.replace('.NS', '') === symbol || 
        inst.name.toLowerCase().includes(symbol.toLowerCase()) ||
        inst.kite === `${exchange}:${symbol}`
    );
    return instrument ? instrument.kite : `${exchange}:${symbol}`;
}

// Helper function to check API rate limits
function checkRateLimit(apiName) {
    const limit = API_CONFIG.RATE_LIMITS[apiName.toUpperCase()];
    if (limit) {
        // Implementation would track actual API calls and enforce limits
        console.log(`Rate limit for ${apiName}: ${limit}`);
        return true;
    }
    return true;
}

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, getKiteInstrument, checkRateLimit };
}

console.log('🔧 Enhanced API Configuration loaded');
console.log('🔑 Kite Connect API Key:', API_CONFIG.API_KEYS.KITE_API_KEY);
console.log('📊 Total Indian stocks configured:', API_CONFIG.SYMBOLS.INDIA.STOCKS.length);
console.log('📈 Total Indian indices configured:', API_CONFIG.SYMBOLS.INDIA.INDICES.length);