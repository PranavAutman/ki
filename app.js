// Kunal Intelligence - Advanced Investment App JavaScript
// Author: Kunal Intelligence Team
// Version: 1.0.0

// ============================================================================
// CONFIGURATION & DATA
// ============================================================================

const APP_CONFIG = {
    name: 'Kunal Intelligence',
    version: '1.0.0',
    apiEndpoints: {
        groww: 'https://groww.in/trade-api',
        // Add your Groww API key here
        growwApiKey: 'FTPYURGXXVSFZULTWCC3AUDD6XDUSRT3'
    },
    refreshInterval: 5000, // 5 seconds for live data
    chartColors: {
        primary: '#00ffff',
        secondary: '#8a2be2',
        success: '#00ff7f',
        danger: '#ff1493',
        warning: '#ff6b35'
    }
};

// Indian Stock Market Data (NSE)
const INDIAN_STOCKS = {
    'RELIANCE': { name: 'Reliance Industries Ltd', sector: 'Oil & Gas', price: 2847.65, change: 23.45 },
    'TCS': { name: 'Tata Consultancy Services', sector: 'IT Services', price: 3456.80, change: -12.30 },
    'HDFCBANK': { name: 'HDFC Bank Ltd', sector: 'Banking', price: 1687.45, change: 15.67 },
    'INFY': { name: 'Infosys Ltd', sector: 'IT Services', price: 1534.20, change: 8.90 },
    'HINDUNILVR': { name: 'Hindustan Unilever Ltd', sector: 'FMCG', price: 2398.75, change: -5.45 },
    'ITC': { name: 'ITC Ltd', sector: 'FMCG', price: 456.30, change: 3.20 },
    'ICICIBANK': { name: 'ICICI Bank Ltd', sector: 'Banking', price: 1156.90, change: 18.45 },
    'SBIN': { name: 'State Bank of India', sector: 'Banking', price: 567.80, change: 7.65 },
    'BHARTIARTL': { name: 'Bharti Airtel Ltd', sector: 'Telecom', price: 1289.45, change: -8.90 },
    'KOTAKBANK': { name: 'Kotak Mahindra Bank', sector: 'Banking', price: 1789.60, change: 12.30 }
};

// AI Model Parameters
const AI_MODELS = {
    riskAssessment: {
        weights: {
            age: 0.15,
            income: 0.20,
            experience: 0.25,
            timeHorizon: 0.20,
            riskTolerance: 0.20
        }
    },
    portfolioOptimization: {
        riskFreeRate: 0.065, // 6.5% (Indian 10-year G-Sec)
        marketReturn: 0.128,  // 12.8% (Historical Nifty returns)
        inflationRate: 0.055  // 5.5% (Current Indian inflation)
    }
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const AppState = {
    user: {
        profile: null,
        riskScore: 0,
        investmentAmount: 0,
        preferences: {}
    },
    market: {
        indices: {},
        stocks: {},
        lastUpdated: null
    },
    portfolio: {
        allocations: {},
        metrics: {},
        recommendations: []
    },
    ui: {
        activeSection: 'dashboard',
        loading: false,
        charts: {}
    }
};

// ============================================================================
// GROWW API INTEGRATION
// ============================================================================

class GrowwAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://groww.in/trade-api';
        this.headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    async fetchStockPrice(symbol) {
        try {
            // Note: This is a placeholder implementation
            // Replace with actual Groww API calls once you have the proper endpoints
            const mockResponse = {
                symbol: symbol,
                price: INDIAN_STOCKS[symbol]?.price || Math.random() * 3000 + 500,
                change: INDIAN_STOCKS[symbol]?.change || (Math.random() - 0.5) * 100,
                volume: Math.floor(Math.random() * 10000000) + 1000000,
                high: 0,
                low: 0,
                open: 0,
                previousClose: 0
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 200));
            
            return mockResponse;
        } catch (error) {
            console.error(`Error fetching stock price for ${symbol}:`, error);
            throw error;
        }
    }

    async fetchMarketIndices() {
        try {
            // Mock data for Indian indices - replace with actual API calls
            const indices = {
                'NIFTY50': { value: 25415.80, change: 234.50, changePercent: 0.93 },
                'SENSEX': { value: 83184.80, change: 445.87, changePercent: 0.54 },
                'BANKNIFTY': { value: 54230.25, change: -123.45, changePercent: -0.23 },
                'INDIAVIX': { value: 12.45, change: -0.87, changePercent: -6.52 }
            };

            await new Promise(resolve => setTimeout(resolve, 150));
            return indices;
        } catch (error) {
            console.error('Error fetching market indices:', error);
            throw error;
        }
    }

    async fetchStockFundamentals(symbol) {
        try {
            // Mock fundamental data
            const fundamentals = {
                symbol: symbol,
                pe: Math.random() * 30 + 10,
                pb: Math.random() * 5 + 1,
                roe: Math.random() * 25 + 5,
                debt_to_equity: Math.random() * 2,
                market_cap: Math.random() * 500000 + 50000,
                dividend_yield: Math.random() * 5
            };

            return fundamentals;
        } catch (error) {
            console.error(`Error fetching fundamentals for ${symbol}:`, error);
            throw error;
        }
    }
}

// ============================================================================
// AI INVESTMENT ALGORITHMS
// ============================================================================

class InvestmentAI {
    constructor() {
        this.models = AI_MODELS;
        this.stockScores = new Map();
    }

    // Risk Assessment using Multi-Factor Model
    calculateRiskScore(userProfile) {
        const { 
            age = 30, 
            investmentAmount = 100000, 
            riskTolerance = 5, 
            timeHorizon = 'medium',
            expectedReturns = 12,
            maxLoss = 15 
        } = userProfile;

        // Normalize factors (0-1 scale)
        const normalizedAge = Math.min(age / 70, 1);
        const normalizedAmount = Math.min(investmentAmount / 1000000, 1);
        const normalizedRisk = riskTolerance / 10;
        
        // Time horizon scoring
        const timeScores = { 'short': 0.3, 'medium': 0.6, 'long': 1.0 };
        const normalizedTime = timeScores[timeHorizon] || 0.6;

        // Calculate composite risk score (0-100)
        const riskScore = (
            (1 - normalizedAge) * 20 +        // Younger = higher risk capacity
            normalizedAmount * 15 +           // Higher amount = more flexibility
            normalizedRisk * 30 +             // User stated risk tolerance
            normalizedTime * 20 +             // Longer horizon = higher risk
            (expectedReturns / 25) * 15       // Higher return expectations
        );

        return Math.min(Math.round(riskScore), 100);
    }

    // Stock Scoring using Multiple Factors
    async calculateStockScore(symbol, userRiskProfile) {
        try {
            const stockData = INDIAN_STOCKS[symbol];
            if (!stockData) return 0;

            // Technical factors
            const priceChange = stockData.change;
            const momentum = priceChange > 0 ? 1 : 0;
            
            // Fundamental factors (mock data)
            const fundamentals = await growwAPI.fetchStockFundamentals(symbol);
            
            // Sector scoring
            const sectorWeights = {
                'IT Services': 0.85,
                'Banking': 0.75,
                'Oil & Gas': 0.65,
                'FMCG': 0.80,
                'Telecom': 0.70
            };
            const sectorScore = sectorWeights[stockData.sector] || 0.5;

            // Risk-adjusted scoring
            const riskAdjustment = userRiskProfile.riskScore / 100;
            
            // Composite score (0-100)
            const score = (
                momentum * 20 +
                sectorScore * 30 +
                Math.min(fundamentals.roe / 25, 1) * 25 +
                Math.max(1 - fundamentals.pe / 50, 0) * 15 +
                riskAdjustment * 10
            );

            return Math.round(score);
        } catch (error) {
            console.error(`Error calculating stock score for ${symbol}:`, error);
            return 50; // Default neutral score
        }
    }

    // Generate AI Recommendations
    async generateRecommendations(userProfile, count = 5) {
        const recommendations = [];
        const stocks = Object.keys(INDIAN_STOCKS);
        
        // Calculate scores for all stocks
        const stockScores = await Promise.all(
            stocks.map(async (symbol) => ({
                symbol,
                score: await this.calculateStockScore(symbol, userProfile),
                data: INDIAN_STOCKS[symbol]
            }))
        );

        // Sort by score and select top recommendations
        const topStocks = stockScores
            .sort((a, b) => b.score - a.score)
            .slice(0, count);

        // Generate detailed recommendations
        topStocks.forEach((stock, index) => {
            const confidence = Math.min(stock.score + Math.random() * 20, 100);
            const targetPrice = stock.data.price * (1 + (Math.random() * 0.3 + 0.05));
            const allocation = this.calculateOptimalAllocation(stock, userProfile);

            const action = stock.score > 80 ? 'STRONG_BUY' : 
                          stock.score > 65 ? 'BUY' : 'HOLD';

            recommendations.push({
                rank: index + 1,
                symbol: stock.symbol,
                name: stock.data.name,
                action: action,
                currentPrice: stock.data.price,
                targetPrice: Math.round(targetPrice * 100) / 100,
                allocationPercentage: allocation,
                riskScore: Math.round((100 - stock.score) / 10),
                confidence: Math.round(confidence),
                reasoning: this.generateReasoning(stock, action),
                expectedReturn: Math.round(((targetPrice - stock.data.price) / stock.data.price) * 100 * 100) / 100
            });
        });

        return recommendations;
    }

    // Portfolio Optimization using Modified Markowitz Model
    optimizePortfolio(stocks, userProfile) {
        const riskScore = userProfile.riskScore || 50;
        const investmentAmount = userProfile.investmentAmount || 100000;

        // Risk-based asset allocation
        let equityAllocation, bondAllocation, cashAllocation;

        if (riskScore < 30) { // Conservative
            equityAllocation = 40;
            bondAllocation = 45;
            cashAllocation = 15;
        } else if (riskScore < 70) { // Moderate
            equityAllocation = 60;
            bondAllocation = 30;
            cashAllocation = 10;
        } else { // Aggressive
            equityAllocation = 85;
            bondAllocation = 10;
            cashAllocation = 5;
        }

        // Calculate individual stock allocations within equity portion
        const stockAllocations = [];
        const equityAmount = (investmentAmount * equityAllocation) / 100;

        stocks.forEach((stock, index) => {
            // Higher ranked stocks get higher allocation
            const baseAllocation = (equityAllocation / stocks.length);
            const rankBonus = (stocks.length - index) * 2;
            const allocation = Math.min(baseAllocation + rankBonus, 25); // Max 25% in single stock

            stockAllocations.push({
                symbol: stock.symbol,
                name: stock.name,
                allocation: Math.round(allocation * 100) / 100,
                amount: Math.round((equityAmount * allocation) / 100)
            });
        });

        return {
            equityAllocation,
            bondAllocation,
            cashAllocation,
            stockAllocations,
            expectedReturn: this.calculateExpectedReturn(riskScore),
            riskLevel: riskScore < 30 ? 'Low' : riskScore < 70 ? 'Medium' : 'High'
        };
    }

    // Helper methods
    calculateOptimalAllocation(stock, userProfile) {
        const baseAllocation = 15; // Base allocation percentage
        const riskAdjustment = (stock.score / 100) * 5;
        const userRiskAdjustment = (userProfile.riskScore / 100) * 5;
        
        return Math.min(Math.round(baseAllocation + riskAdjustment + userRiskAdjustment), 25);
    }

    generateReasoning(stock, action) {
        const sector = stock.data.sector;
        const change = stock.data.change;
        const changeText = change > 0 ? 'positive momentum' : 'consolidation phase';
        
        return `Strong ${sector} fundamentals with ${changeText}. Expected return potential based on sector outlook and technical indicators.`;
    }

    calculateExpectedReturn(riskScore) {
        // Higher risk = higher expected return
        const baseReturn = 8; // Conservative base return
        const riskPremium = (riskScore / 100) * 12; // Risk premium
        return Math.round((baseReturn + riskPremium) * 10) / 10;
    }
}

// ============================================================================
// CHART MANAGER
// ============================================================================

class ChartManager {
    constructor() {
        this.charts = {};
    }

    createPortfolioChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Equity', 'Bonds', 'Cash'],
                datasets: [{
                    data: [data.equityAllocation, data.bondAllocation, data.cashAllocation],
                    backgroundColor: [
                        APP_CONFIG.chartColors.primary,
                        APP_CONFIG.chartColors.secondary,
                        APP_CONFIG.chartColors.warning
                    ],
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 20,
                            font: {
                                size: 14
                            }
                        }
                    }
                }
            }
        });
    }

    createGrowthChart(canvasId, principal, sip, rate, years) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const monthlyRate = rate / 100 / 12;
        const months = years * 12;
        const labels = [];
        const values = [];

        for (let i = 0; i <= months; i += 12) {
            const year = Math.floor(i / 12);
            labels.push(`Year ${year}`);
            
            // Calculate compound growth
            const futureValue = principal * Math.pow(1 + rate/100, year) + 
                               sip * ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate) * (1 + monthlyRate);
            
            values.push(Math.round(futureValue));
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Portfolio Value',
                    data: values,
                    borderColor: APP_CONFIG.chartColors.primary,
                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff',
                            callback: function(value) {
                                return '₹' + (value / 100000).toFixed(1) + 'L';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
}

// ============================================================================
// APP INITIALIZATION & CORE FUNCTIONALITY
// ============================================================================

// Global instances
let growwAPI;
let investmentAI;
let chartManager;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Initialize core components
        growwAPI = new GrowwAPI(APP_CONFIG.apiEndpoints.growwApiKey);
        investmentAI = new InvestmentAI();
        chartManager = new ChartManager();

        // Setup event listeners
        setupEventListeners();
        
        // Load initial data
        await loadInitialData();
        
        // Hide loading screen
        hideLoadingScreen();
        
        // Start live data updates
        startLiveUpdates();
        
        console.log('Kunal Intelligence initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to initialize app. Please refresh the page.');
    }
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    // Quick actions
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const action = e.currentTarget.getAttribute('data-action');
            handleQuickAction(action);
        });
    });

    // Risk assessment form
    const riskForm = document.getElementById('risk-assessment-form');
    if (riskForm) {
        riskForm.addEventListener('submit', handleRiskAssessment);
        
        // Real-time slider updates
        setupSliderListeners();
    }

    // Calculator
    const calcBtn = document.getElementById('calculate-btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', handleCalculation);
    }

    // Chatbot
    setupChatbotListeners();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            filterRecommendations(filter);
        });
    });
}

function setupSliderListeners() {
    const sliders = [
        { id: 'risk-tolerance', valueId: 'risk-value' },
        { id: 'expected-returns', valueId: 'returns-value', suffix: '%' },
        { id: 'max-loss', valueId: 'loss-value', suffix: '%' }
    ];

    sliders.forEach(slider => {
        const element = document.getElementById(slider.id);
        const valueElement = document.getElementById(slider.valueId);
        
        if (element && valueElement) {
            element.addEventListener('input', (e) => {
                const value = e.target.value;
                valueElement.textContent = value + (slider.suffix || '');
                updateAssessmentProgress();
            });
        }
    });

    // Input field listeners
    document.getElementById('investment-amount')?.addEventListener('input', updateAssessmentProgress);
    document.getElementById('time-horizon')?.addEventListener('change', updateAssessmentProgress);
}

function setupChatbotListeners() {
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatSend = document.getElementById('chatbot-send');
    const chatInput = document.getElementById('chatbot-input');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWindow?.classList.toggle('open');
        });
    }

    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWindow?.classList.remove('open');
        });
    }

    if (chatSend) {
        chatSend.addEventListener('click', handleChatMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleChatMessage();
            }
        });
    }
}

async function loadInitialData() {
    try {
        // Load market data
        const marketData = await growwAPI.fetchMarketIndices();
        AppState.market.indices = marketData;
        updateMarketDisplay();

        // Load default recommendations
        const defaultProfile = { riskScore: 60, investmentAmount: 500000 };
        const recommendations = await investmentAI.generateRecommendations(defaultProfile);
        AppState.portfolio.recommendations = recommendations;
        updateRecommendationsDisplay(recommendations);

    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

// ============================================================================
// UI UPDATE FUNCTIONS
// ============================================================================

function updateMarketDisplay() {
    const indices = AppState.market.indices;
    
    // Update NIFTY
    updateMarketCard('nifty-value', 'nifty-change', indices.NIFTY50);
    
    // Update SENSEX
    updateMarketCard('sensex-value', 'sensex-change', indices.SENSEX);
    
    // Update BANK NIFTY
    updateMarketCard('banknifty-value', 'banknifty-change', indices.BANKNIFTY);
    
    // Update VIX
    updateMarketCard('vix-value', 'vix-change', indices.INDIAVIX);
}

function updateMarketCard(valueId, changeId, data) {
    const valueElement = document.getElementById(valueId);
    const changeElement = document.getElementById(changeId);
    
    if (valueElement && data) {
        valueElement.textContent = formatCurrency(data.value);
    }
    
    if (changeElement && data) {
        const sign = data.change >= 0 ? '+' : '';
        changeElement.textContent = `${sign}${data.change.toFixed(2)} (${sign}${data.changePercent.toFixed(2)}%)`;
        changeElement.className = `market-change ${data.change >= 0 ? 'positive' : 'negative'}`;
    }
}

function updateRecommendationsDisplay(recommendations) {
    const container = document.getElementById('recommendations-grid');
    if (!container) return;

    container.innerHTML = '';
    
    recommendations.forEach(rec => {
        const card = createRecommendationCard(rec);
        container.appendChild(card);
    });
}

function createRecommendationCard(rec) {
    const card = document.createElement('div');
    card.className = 'recommendation-card slide-up';
    card.setAttribute('data-filter', rec.action.toLowerCase().replace('_', '-'));
    card.setAttribute('data-confidence', rec.confidence > 80 ? 'high-confidence' : 'low-confidence');
    
    card.innerHTML = `
        <div class="rec-header">
            <div class="rec-rank">${rec.rank}</div>
            <div class="rec-action ${rec.action.toLowerCase().replace('_', '-')}">${rec.action}</div>
        </div>
        <div class="rec-stock">
            <div class="rec-symbol">${rec.symbol}</div>
            <div class="rec-name">${rec.name}</div>
        </div>
        <div class="rec-metrics">
            <div class="rec-metric">
                <div class="rec-metric-label">Current Price</div>
                <div class="rec-metric-value">₹${rec.currentPrice.toFixed(2)}</div>
            </div>
            <div class="rec-metric">
                <div class="rec-metric-label">Target Price</div>
                <div class="rec-metric-value">₹${rec.targetPrice.toFixed(2)}</div>
            </div>
            <div class="rec-metric">
                <div class="rec-metric-label">Expected Return</div>
                <div class="rec-metric-value">${rec.expectedReturn}%</div>
            </div>
            <div class="rec-metric">
                <div class="rec-metric-label">Confidence</div>
                <div class="rec-metric-value">${rec.confidence}%</div>
            </div>
        </div>
        <div class="rec-reasoning">${rec.reasoning}</div>
    `;
    
    return card;
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

function navigateToSection(sectionName) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });

    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        AppState.ui.activeSection = sectionName;

        // Load section-specific data
        loadSectionData(sectionName);
    }
}

async function loadSectionData(sectionName) {
    switch (sectionName) {
        case 'portfolio':
            if (AppState.user.profile) {
                await loadPortfolioData();
            }
            break;
        case 'recommendations':
            await loadRecommendationsData();
            break;
    }
}

async function handleRiskAssessment(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const profile = {
        investmentAmount: parseInt(document.getElementById('investment-amount').value) || 100000,
        riskTolerance: parseInt(document.getElementById('risk-tolerance').value) || 5,
        timeHorizon: document.getElementById('time-horizon').value || 'medium',
        expectedReturns: parseInt(document.getElementById('expected-returns').value) || 12,
        maxLoss: parseInt(document.getElementById('max-loss').value) || 15
    };

    // Calculate risk score
    const riskScore = investmentAI.calculateRiskScore(profile);
    profile.riskScore = riskScore;
    
    // Store user profile
    AppState.user.profile = profile;
    AppState.user.riskScore = riskScore;
    
    // Show results
    displayRiskProfile(profile, riskScore);
    
    // Generate personalized recommendations
    const recommendations = await investmentAI.generateRecommendations(profile);
    AppState.portfolio.recommendations = recommendations;
}

function displayRiskProfile(profile, score) {
    const resultDiv = document.getElementById('risk-profile-result');
    const scoreElement = document.getElementById('profile-score');
    const detailsElement = document.getElementById('profile-details');
    
    if (!resultDiv) return;

    scoreElement.textContent = score;
    
    let riskLevel, description, suggestions;
    if (score < 30) {
        riskLevel = 'Conservative';
        description = 'You prefer stable investments with predictable returns.';
        suggestions = 'Focus on large-cap stocks, bonds, and defensive sectors.';
    } else if (score < 70) {
        riskLevel = 'Moderate';
        description = 'You can handle moderate volatility for better returns.';
        suggestions = 'Balanced mix of large-cap and mid-cap stocks with some bonds.';
    } else {
        riskLevel = 'Aggressive';
        description = 'You can handle high volatility for potential high returns.';
        suggestions = 'Growth stocks, small-caps, and emerging sectors.';
    }
    
    detailsElement.innerHTML = `
        <div class="profile-detail">
            <h4>Risk Level: ${riskLevel}</h4>
            <p>${description}</p>
        </div>
        <div class="profile-detail">
            <h4>Investment Strategy</h4>
            <p>${suggestions}</p>
        </div>
        <div class="profile-detail">
            <h4>Recommended Allocation</h4>
            <p>Investment Amount: ₹${formatCurrency(profile.investmentAmount)}</p>
            <p>Time Horizon: ${profile.timeHorizon}</p>
            <p>Expected Returns: ${profile.expectedReturns}%</p>
        </div>
    `;
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function handleQuickAction(action) {
    switch (action) {
        case 'start-assessment':
            navigateToSection('assessment');
            break;
        case 'view-recommendations':
            navigateToSection('recommendations');
            break;
        case 'calculate-returns':
            navigateToSection('calculator');
            break;
        case 'chat-ai':
            document.getElementById('chatbot-window')?.classList.add('open');
            break;
    }
}

function handleCalculation() {
    const principal = parseFloat(document.getElementById('calc-principal').value) || 0;
    const sip = parseFloat(document.getElementById('calc-sip').value) || 0;
    const annualReturn = parseFloat(document.getElementById('calc-return').value) || 12;
    const years = parseInt(document.getElementById('calc-years').value) || 10;

    if (principal <= 0 && sip <= 0) {
        showError('Please enter valid investment amounts');
        return;
    }

    // Calculate future value
    const monthlyRate = annualReturn / 100 / 12;
    const months = years * 12;
    
    // Future value of lump sum
    const futureValueLumpSum = principal * Math.pow(1 + annualReturn/100, years);
    
    // Future value of SIP
    const futureValueSIP = sip * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const totalFutureValue = futureValueLumpSum + futureValueSIP;
    const totalInvested = principal + (sip * months);
    const totalReturns = totalFutureValue - totalInvested;
    const returnsPercentage = (totalReturns / totalInvested) * 100;

    // Display results
    document.getElementById('total-invested').textContent = formatCurrency(totalInvested);
    document.getElementById('future-value').textContent = formatCurrency(totalFutureValue);
    document.getElementById('total-returns').textContent = formatCurrency(totalReturns);
    document.getElementById('returns-percentage').textContent = returnsPercentage.toFixed(1) + '%';

    // Show results section
    const resultsSection = document.getElementById('calc-results');
    resultsSection.style.display = 'block';

    // Create growth chart
    chartManager.createGrowthChart('growth-chart', principal, sip, annualReturn, years);
}

function handleChatMessage() {
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');
    
    if (!input || !messages) return;
    
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Generate AI response (simplified)
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'ai');
    }, 1000);
}

function addChatMessage(message, type) {
    const messages = document.getElementById('chatbot-messages');
    if (!messages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function generateAIResponse(message) {
    const lowercaseMessage = message.toLowerCase();
    
    // Simple keyword-based responses
    if (lowercaseMessage.includes('recommend') || lowercaseMessage.includes('suggest')) {
        return "Based on your risk profile, I recommend a diversified portfolio with 60% equity and 40% debt. Consider blue-chip stocks like RELIANCE, TCS, and HDFC Bank for stability.";
    }
    
    if (lowercaseMessage.includes('risk')) {
        return "Risk management is crucial. Diversify across sectors, don't invest more than 5-10% in any single stock, and maintain an emergency fund worth 6 months of expenses.";
    }
    
    if (lowercaseMessage.includes('market') || lowercaseMessage.includes('nifty') || lowercaseMessage.includes('sensex')) {
        return "Current market conditions show mixed signals. Technology and banking sectors are performing well. Consider systematic investment plans (SIP) for rupee cost averaging.";
    }
    
    if (lowercaseMessage.includes('sip') || lowercaseMessage.includes('investment')) {
        return "SIPs are excellent for long-term wealth creation. Start with ₹5,000-10,000 monthly in diversified equity funds. The power of compounding works best over 10+ years.";
    }
    
    return "I'm here to help with your investment questions. You can ask about stock recommendations, risk management, market analysis, or portfolio optimization.";
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatCurrency(amount) {
    if (amount >= 10000000) { // 1 Crore
        return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    } else if (amount >= 100000) { // 1 Lakh
        return '₹' + (amount / 100000).toFixed(2) + ' L';
    } else if (amount >= 1000) { // 1 Thousand
        return '₹' + (amount / 1000).toFixed(0) + 'K';
    } else {
        return '₹' + amount.toFixed(2);
    }
}

function updateAssessmentProgress() {
    const fields = ['investment-amount', 'risk-tolerance', 'time-horizon', 'expected-returns', 'max-loss'];
    let completedFields = 0;
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.value) {
            completedFields++;
        }
    });
    
    const progress = (completedFields / fields.length) * 100;
    const progressFill = document.getElementById('assessment-progress');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    
    if (progressText) {
        progressText.textContent = Math.round(progress) + '% Complete';
    }
}

function filterRecommendations(filter) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });

    // Filter recommendation cards
    const cards = document.querySelectorAll('.recommendation-card');
    cards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            const cardFilter = card.getAttribute('data-filter');
            const cardConfidence = card.getAttribute('data-confidence');
            
            if ((filter === 'high-confidence' && cardConfidence === 'high-confidence') ||
                (filter !== 'high-confidence' && cardFilter === filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

function showError(message) {
    // Simple error display - you can enhance this with better UI
    alert(message);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
}

function startLiveUpdates() {
    // Update market data every 5 seconds
    setInterval(async () => {
        try {
            const marketData = await growwAPI.fetchMarketIndices();
            AppState.market.indices = marketData;
            AppState.market.lastUpdated = new Date();
            updateMarketDisplay();
        } catch (error) {
            console.error('Error updating market data:', error);
        }
    }, APP_CONFIG.refreshInterval);
}

async function loadPortfolioData() {
    if (!AppState.user.profile) return;

    try {
        const recommendations = AppState.portfolio.recommendations;
        const portfolio = investmentAI.optimizePortfolio(recommendations, AppState.user.profile);
        
        // Update portfolio metrics
        document.getElementById('expected-return').textContent = portfolio.expectedReturn + '%';
        document.getElementById('portfolio-risk').textContent = portfolio.riskLevel;
        document.getElementById('sharpe-ratio').textContent = '1.45'; // Mock data
        document.getElementById('beta-value').textContent = '1.12'; // Mock data

        // Create portfolio chart
        chartManager.createPortfolioChart('portfolio-chart', portfolio);

        // Update allocation list
        updateAllocationList(portfolio.stockAllocations);
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

function updateAllocationList(allocations) {
    const container = document.getElementById('allocation-list');
    if (!container) return;

    container.innerHTML = '';
    
    allocations.forEach((allocation, index) => {
        const item = document.createElement('div');
        item.className = 'allocation-item';
        
        item.innerHTML = `
            <div class="allocation-stock">
                <div class="allocation-icon">${allocation.symbol.charAt(0)}</div>
                <div class="allocation-info">
                    <h4>${allocation.symbol}</h4>
                    <p>${allocation.name}</p>
                </div>
            </div>
            <div class="allocation-percentage">${allocation.allocation}%</div>
        `;
        
        container.appendChild(item);
    });
}

async function loadRecommendationsData() {
    if (AppState.portfolio.recommendations.length === 0) {
        const profile = AppState.user.profile || { riskScore: 60, investmentAmount: 500000 };
        const recommendations = await investmentAI.generateRecommendations(profile);
        AppState.portfolio.recommendations = recommendations;
        updateRecommendationsDisplay(recommendations);
    }
}

// ============================================================================
// EXPORT FOR TESTING
// ============================================================================

window.KunalIntelligence = {
    AppState,
    InvestmentAI,
    GrowwAPI,
    ChartManager,
    formatCurrency,
    navigateToSection
};

console.log('Kunal Intelligence v1.0.0 - Advanced Investment Platform Loaded');
console.log('Ready for Indian stock market analysis with AI-powered recommendations');
