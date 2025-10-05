
 # Financial Dashboard Integration

This package contains a comprehensive financial markets dashboard that integrates with your existing website.

## 📁 Files Structure

```
├── index-with-dashboard.html  # Main HTML file with dashboard integration
├── dashboard.html            # Standalone dashboard page
├── dashboard.js             # Dashboard functionality and UI logic
├── api-config.js           # API configuration and real data integration
└── README.md              # This file
```

## 🚀 Quick Start

1. **Replace your main HTML file**: Use `index-with-dashboard.html` as your main file
2. **Upload all files**: Make sure all files are in the same directory
3. **Open in browser**: The dashboard will be accessible via the "Dashboard" navigation menu

## 📊 Dashboard Features

### Global Markets
- S&P 500, NASDAQ, DOW JONES, FTSE 100, DAX, NIKKEI
- Real-time price updates and charts
- Top gainers/losers from major US exchanges
- High volume stocks tracking

### Indian Markets
- NIFTY 50, SENSEX, NIFTY BANK, NIFTY IT, etc.
- NSE/BSE stock data
- Top performing Indian stocks
- Sector-wise analysis

### Interactive Features
- **Region Toggle**: Switch between Global and India views
- **Live Charts**: Real-time price charts with Chart.js
- **Auto-refresh**: Data updates every 30 seconds
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Market News**: Latest financial news from trusted sources

## 🔧 Configuration

### Mock Data (Default)
The dashboard uses mock data by default for demonstration. No API keys required.

### Real Data Integration

To use real market data:

1. **Open `api-config.js`**
2. **Set `USE_MOCK_DATA: false`**
3. **Add your API keys:**

```javascript
API_KEYS: {
    ALPHA_VANTAGE: 'your_alpha_vantage_key',
    FMP: 'your_fmp_key',
    TWELVE_DATA: 'your_twelve_data_key'
}
```

### Recommended API Providers

#### Free APIs (Limited requests)
- **Alpha Vantage**: 25 requests/day (Free)
- **Financial Modeling Prep**: 250 requests/day (Free)
- **Twelve Data**: 800 requests/day (Free)

#### Paid APIs (More data & requests)
- **Alpha Vantage Premium**: $49.99/month
- **Polygon.io**: $199/month
- **IEX Cloud**: $9/month

#### Indian Market APIs
- **Groww API**: ₹499/month (NSE/BSE real-time data)
- **Upstox API**: Free with trading account
- **Zerodha Kite API**: ₹2000/month

## 🛠️ Customization

### Adding New Indices
Edit `api-config.js`:

```javascript
SYMBOLS: {
    GLOBAL: {
        INDICES: [
            { symbol: '^GSPC', name: 'S&P 500' },
            { symbol: 'YOUR_SYMBOL', name: 'Your Index' }
        ]
    }
}
```

### Changing Update Intervals
```javascript
REFRESH_INTERVALS: {
    INDICES: 30000,    // 30 seconds
    STOCKS: 60000,     // 1 minute
    NEWS: 300000,      // 5 minutes
}
```

### Styling Customization
- Modify CSS variables in `dashboard.html` for colors and themes
- Dashboard inherits the main website's theme automatically
- Dark mode support included

## 🔒 Security Notes

1. **API Keys**: Never expose API keys in frontend JavaScript for production
2. **Rate Limits**: Implement server-side proxy for high-volume applications
3. **CORS**: Some APIs may require server-side requests due to CORS policies

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 🐛 Troubleshooting

### Dashboard not loading
- Check browser console for errors
- Ensure all files are in the same directory
- Verify file paths in HTML

### No data showing
- Check if `USE_MOCK_DATA` is set correctly
- Verify API keys if using real data
- Check network tab for API request errors

### API rate limits exceeded
- Reduce `REFRESH_INTERVALS` values
- Consider upgrading to paid API plans
- Implement server-side caching

## 📈 Performance Tips

1. **Enable caching** for API responses
2. **Use WebSockets** for real-time data when available
3. **Implement lazy loading** for charts
4. **Optimize image assets** if adding more visuals

## 🤝 Support

For technical support or customization requests:
- Check the browser console for error messages
- Review API documentation for specific providers
- Test with mock data first before implementing real APIs

## 🔄 Updates

To update the dashboard:
1. Replace `dashboard.js` and `dashboard.html`
2. Update `api-config.js` with new symbols/endpoints
3. Clear browser cache to see changes

---

**Note**: This dashboard is designed to be modular and can run independently or integrated with your existing website. The mock data provides a full demonstration of all features without requiring API keys.
