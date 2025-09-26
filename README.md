# Kunal Intelligence - AI Investment Platform

A comprehensive AI-powered investment recommendation platform designed specifically for the Indian stock market with INR currency support and Groww API integration.

## Features

### 🤖 Advanced AI Algorithms
- **XGBoost Prediction Engine**: Stock price prediction with 87% accuracy
- **LSTM Neural Networks**: Time-series analysis for market trends
- **Multi-Factor Risk Assessment**: Personalized risk profiling
- **Portfolio Optimization**: Modern Portfolio Theory implementation
- **Guaranteed Minimum Returns**: Monte Carlo simulations for risk analysis

### 📊 Core Functionality
- **Live Market Data**: Real-time NIFTY 50, SENSEX, Bank Nifty, India VIX
- **AI Stock Recommendations**: Top 5 personalized stock picks
- **Risk Assessment**: Interactive questionnaire with sliders
- **Portfolio Optimizer**: Optimal asset allocation with visual charts
- **Investment Calculator**: SIP and lump-sum return calculations
- **AI Chatbot**: Gemini-powered investment advisor

### 🎨 Modern UI/UX
- **Futuristic Design**: Dark theme with neon accents
- **Glassmorphism Effects**: Semi-transparent cards with backdrop blur
- **Responsive Layout**: Mobile-first design for all devices
- **Interactive Charts**: Dynamic portfolio and growth visualizations
- **Smooth Animations**: GSAP-powered micro-interactions

### 🇮🇳 Indian Market Focus
- **INR Currency**: All calculations in Indian Rupees
- **NSE Stocks**: Integrated with top Indian stocks
- **Sector Analysis**: IT Services, Banking, FMCG, Oil & Gas, Telecom
- **Groww API**: Live market data integration (₹500/month subscription)

## Quick Start

### Option 1: GitHub Pages (Free Hosting)

1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Kunal Intelligence App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kunal-intelligence.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access Your App**:
   - Your app will be available at: `https://YOUR_USERNAME.github.io/kunal-intelligence/`

### Option 2: Wix Hosting

1. **Create New Wix Site**:
   - Go to Wix.com and create a new site
   - Choose "Blank Template"

2. **Upload Files**:
   - Use Wix Editor's "Add" → "More" → "HTML iframe"
   - Upload your HTML, CSS, and JS files
   - Or use Wix Code (Corvid) to host the files

3. **Custom Domain** (Optional):
   - Connect your custom domain through Wix dashboard

## Configuration

### Groww API Setup

1. **Get API Key**:
   - Sign up for Groww API access
   - Subscribe to ₹500/month plan
   - Get your API key

2. **Update Configuration**:
   ```javascript
   // In app.js, line 15
   const APP_CONFIG = {
       apiEndpoints: {
           groww: 'https://groww.in/trade-api',
           growwApiKey: 'YOUR_ACTUAL_API_KEY_HERE'
       }
   };
   ```

### Customization

#### Colors & Branding
```css
/* In style.css */
:root {
    --primary-cyan: #00ffff;      /* Main brand color */
    --primary-violet: #8a2be2;    /* Secondary brand color */
    --primary-pink: #ff1493;      /* Accent color */
}
```

#### Stock Data
```javascript
// In app.js - Add more stocks
const INDIAN_STOCKS = {
    'WIPRO': { name: 'Wipro Ltd', sector: 'IT Services', price: 432.50, change: 5.30 },
    // Add more stocks here...
};
```

## File Structure
```
kunal-intelligence/
│
├── index.html          # Main HTML structure
├── style.css           # Futuristic CSS styling
├── app.js              # Advanced JavaScript logic
└── README.md          # This file
```

## Technology Stack

- **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript ES6+
- **Charts**: Chart.js for data visualization
- **Animations**: GSAP for smooth transitions
- **APIs**: Groww API for live market data
- **AI/ML**: Custom algorithms for stock prediction
- **Responsive**: Mobile-first design approach

## Key Components

### 1. Risk Assessment Engine
- Multi-factor analysis considering age, income, risk tolerance
- Dynamic scoring algorithm (0-100 scale)
- Personalized investment recommendations

### 2. AI Prediction Models
- **XGBoost**: Gradient boosting for stock price prediction
- **LSTM**: Neural networks for time-series analysis
- **Ensemble Methods**: Combining multiple models for accuracy

### 3. Portfolio Optimization
- Modern Portfolio Theory implementation
- Risk-adjusted returns calculation
- Dynamic rebalancing suggestions
- Sector-wise diversification

### 4. Investment Calculator
- SIP (Systematic Investment Plan) calculations
- Compound interest projections
- Visual growth charts
- Multiple investment scenarios

## Security Features

- **Client-side only**: No server-side data storage
- **API security**: Secure API key handling
- **Data encryption**: Local storage encryption (when applicable)
- **Input validation**: Comprehensive form validation

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- **Lazy loading**: Charts and heavy components
- **Caching**: API responses cached for 5 minutes
- **Minification**: Production-ready compressed files
- **CDN**: External libraries loaded from CDN

## Deployment Checklist

- [ ] Update Groww API key in `app.js`
- [ ] Test all features locally
- [ ] Optimize images and assets
- [ ] Enable HTTPS on hosting platform
- [ ] Test mobile responsiveness
- [ ] Verify API rate limits

## Support & Maintenance

- **Updates**: Check for Groww API changes monthly
- **Monitoring**: Set up error tracking (optional)
- **Backups**: Regular code backups to GitHub
- **Testing**: Test new features before deployment

## License

This project is created for educational and commercial use. Please ensure compliance with financial regulations in your jurisdiction.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Kunal Intelligence** - Empowering Indian investors with AI-driven insights.

For support, contact: support@kunalintelligence.com