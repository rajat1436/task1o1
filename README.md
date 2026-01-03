# CryptoStats - Cryptocurrency Dashboard

A modern, responsive cryptocurrency statistics dashboard built with React.js, Vite, and Tailwind CSS. View real-time cryptocurrency market data with advanced search and filtering capabilities.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## Features

- **Real-time Data**: Live cryptocurrency prices from CryptoCompare API
- **Auto-refresh**: Data automatically updates every 30 seconds
- **Advanced Search**: Filter cryptocurrencies by name or symbol
- **Sorting Options**: Sort by rank, name, price, 24h change, market cap, or volume
- **Responsive Design**: Fully responsive UI for all screen sizes
- **Dark Theme**: Modern dark theme with gradient accents
- **Statistics Cards**: Quick overview of total market cap, volume, top gainers/losers

## Tech Stack

- **Framework**: React.js 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
crypto-dashboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with logo and refresh
│   │   ├── StatsCards.jsx      # Dashboard statistics cards
│   │   ├── SearchFilter.jsx    # Search and filter controls
│   │   ├── CryptoTable.jsx     # Main data table
│   │   └── LoadingSpinner.jsx  # Loading state component
│   ├── hooks/
│   │   └── useCryptoData.js    # Custom hook for API calls
│   ├── utils/
│   │   └── formatters.js       # Number/currency formatters
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## API Reference

This application uses the [CryptoCompare API](https://www.cryptocompare.com/api/).

**Endpoint Used:**
```
https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD
```

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy with default settings

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
