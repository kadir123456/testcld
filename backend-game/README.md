# 🎮 Aviator Crash Game - Setup Instructions

## ✅ What's Been Implemented

### Backend (Node.js + Socket.IO)
- **Location**: `/app/backend-game/`
- **Port**: 3001
- **Features**:
  - Real-time WebSocket game server
  - Provably Fair algorithm (SHA256)
  - Demo mode (60% win rate)
  - Real mode (5% house edge)
  - Bet management system
  - In-memory game state (Firebase ready)

### Frontend (React + TypeScript)
- **Route**: `/game`
- **Features**:
  - Canvas-based plane animation
  - Real-time multiplier display
  - Demo/Real mode toggle
  - Betting interface
  - Cash out system
  - Crash history
  - Bet history
  - Live balance updates

---

## 🔧 Current Status

### ✅ Working Now:
1. **Backend Server**: Running on port 3001
2. **Frontend Server**: Running on port 3000
3. **WebSocket Connection**: Real-time communication
4. **Demo Mode**: Fully functional
5. **Canvas Animation**: Plane flying effect
6. **Betting System**: Place bets & cash out
7. **Balance Management**: Demo balance tracking

### ⚠️ Needs Your Action:

#### 1. Firebase Admin SDK Setup
**Current Status**: Server running without Firebase (in-memory only)

**To Enable Firebase**:
```bash
# Step 1: Go to Firebase Console
https://console.firebase.google.com/

# Step 2: Project Settings → Service Accounts → Generate New Private Key
# This downloads a JSON file

# Step 3: Save the file as:
/app/backend-game/config/serviceAccountKey.json

# Step 4: Restart backend
cd /app/backend-game
node server.js
```

**Why**: Firebase will enable:
- Persistent user balances
- Game history storage
- Multi-server sync
- User authentication

#### 2. Update Frontend WebSocket URL
**Current**: Hardcoded to `http://localhost:3001`

**For Production (Netlify)**:
```typescript
// /app/src/pages/AviatorGame.tsx (line 22)
// Change from:
const GAME_SERVER_URL = 'http://localhost:3001';

// To (your production backend):
const GAME_SERVER_URL = 'https://your-game-backend.herokuapp.com'; // or your deployed URL
```

**Options for Backend Deployment**:
- Heroku (free tier)
- Railway (free tier)
- Render (free tier)
- DigitalOcean App Platform

---

## 🚀 How to Run

### Development Mode (Both Servers)

```bash
# Terminal 1: Backend Game Server
cd /app/backend-game
yarn install  # If not done
node server.js

# Terminal 2: Frontend
cd /app
yarn install  # If not done
yarn dev
```

### Access:
- **Frontend**: http://localhost:3000
- **Game Page**: http://localhost:3000/game (requires login)
- **Backend Health**: http://localhost:3001/health

---

## 🎯 Game Flow

1. **User logs in** → Redirected to Dashboard
2. **Click "Aviator Game"** → Opens `/game` page
3. **Choose mode**:
   - **DEMO**: $100 starting balance, 60% win rate
   - **REAL**: Uses real USDT balance (to be implemented)
4. **Place bet** during countdown (5 seconds)
5. **Game starts** → Plane flies, multiplier increases
6. **Cash out** before crash or lose bet
7. **Crash** → Results shown, new round starts automatically

---

## 📊 Game Configuration

Edit `/app/backend-game/.env`:

```env
# Server
PORT=3001
NODE_ENV=development

# USDT Configuration
USDT_TRC20_ADDRESS=TMjSDNto6hoHUV9udDcXVAtuxxX6cnhhv3

# Game Settings - Demo Mode
DEMO_START_BALANCE=100
MIN_BET_DEMO=0.1
MAX_BET_DEMO=100

# Game Settings - Real Mode
MIN_BET_REAL=1
MAX_BET_REAL=500
MIN_WITHDRAWAL=10
WITHDRAWAL_FEE=0.02
HOUSE_EDGE=0.05
```

---

## 🔐 Firebase Database Schema

When Firebase is connected, these collections will be created:

### `users/{userId}`
```json
{
  "uid": "user123",
  "email": "user@example.com",
  "demoBalance": 100,
  "gameBalance": 0,
  "siteBalance": 0,
  "country": "US",
  "createdAt": "timestamp"
}
```

### `gameRounds/{roundId}`
```json
{
  "roundId": "round-123456",
  "roundNumber": 1,
  "crashPoint": 2.45,
  "hash": "abc123...",
  "serverSeed": "def456...",
  "isDemoMode": true,
  "startTime": "timestamp",
  "endTime": "timestamp",
  "totalBets": 5,
  "totalPayout": 120.50
}
```

### `bets/{betId}`
```json
{
  "betId": "bet-123",
  "userId": "user123",
  "roundId": "round-123456",
  "amount": 10,
  "cashOutAt": 1.80,
  "profit": 8,
  "isDemoMode": true,
  "status": "CASHED_OUT",
  "timestamp": "timestamp"
}
```

### `deposits/{depositId}`
```json
{
  "depositId": "deposit-123",
  "userId": "user123",
  "amount": 100,
  "usdtAddress": "sender-address",
  "txHash": "0x123...",
  "status": "pending",
  "createdAt": "timestamp",
  "approvedAt": null,
  "approvedBy": null
}
```

---

## 🛠️ Next Steps (Phase 2 - Real Mode)

### 1. USDT Integration
- [ ] Deposit page (QR code + TX hash input)
- [ ] Admin panel for deposit approval
- [ ] Withdrawal request system
- [ ] TronLink wallet integration (optional)

### 2. Admin Panel
- [ ] Add "Game Management" tab to AdminPage.tsx
- [ ] View active games & statistics
- [ ] Approve/reject deposits
- [ ] Process withdrawals
- [ ] Manual crash point control (testing)

### 3. Provably Fair Verification
- [ ] Show hash before round starts
- [ ] Reveal serverSeed after crash
- [ ] Add verification page where users can check fairness

### 4. Production Deployment
- [ ] Deploy backend to Heroku/Railway/Render
- [ ] Update frontend WebSocket URL
- [ ] Add environment variables to Netlify
- [ ] Setup SSL/TLS for WebSocket

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3001 is already in use
lsof -i :3001
kill -9 <PID>  # If needed

# Check logs
cd /app/backend-game
node server.js
```

### Frontend can't connect to backend
```bash
# 1. Ensure backend is running
curl http://localhost:3001/health

# 2. Check browser console for errors
# 3. CORS issue? Check backend/server.js origin settings
```

### "Firebase not initialized" warning
- This is normal if you haven't added serviceAccountKey.json
- Game will work in demo mode with in-memory storage
- Add Firebase key for production persistence

---

## 📝 API Endpoints

### REST API
- `GET /health` - Server health check
- `GET /config` - Game configuration
- `GET /game/state` - Current game state

### WebSocket Events

#### Client → Server:
- `user:init` - Initialize user
- `user:getBalance` - Get user balance
- `bet:place` - Place a bet
- `bet:cashOut` - Cash out active bet
- `game:getActiveBets` - Get active bets

#### Server → Client:
- `game:state` - Current game state
- `game:roundCreated` - New round started
- `game:countdown` - Countdown before start
- `game:started` - Game started flying
- `game:multiplier` - Multiplier update (every 100ms)
- `game:crashed` - Game crashed
- `user:initialized` - User initialization complete
- `user:balance` - Balance update
- `bet:placed` - Bet placed successfully
- `bet:cashedOut` - Bet cashed out
- `bet:error` - Bet error

---

## 🎨 UI Features

- ✅ Canvas animation (plane flying)
- ✅ Real-time multiplier display
- ✅ Demo/Real mode toggle
- ✅ Betting interface
- ✅ Cash out button (pulsing when active)
- ✅ Crash history (last 10)
- ✅ Bet history (last 20)
- ✅ Live balance updates
- ✅ Toast notifications
- ✅ Responsive design

---

## 💰 USDT Address (TRC-20)
**Address**: `TMjSDNto6hoHUV9udDcXVAtuxxX6cnhhv3`

This is configured in the backend and will be shown to users when implementing deposit system.

---

## 📞 Support

If you need help:
1. Check logs: `/tmp/game-server.log` and `/tmp/frontend.log`
2. Test backend: `curl http://localhost:3001/health`
3. Check browser console for errors
4. Review this README

---

**Version**: 1.0.0 (Demo Mode)  
**Status**: ✅ Backend + Frontend working  
**Next**: Firebase Admin SDK + Real Mode + Admin Panel
