# Calculator PWA - Copilot Instructions

## Architecture Overview

This is a **Next.js PWA calculator** with special hidden modes, pincode lookup, and age calculation. The codebase has three main layers:

### Frontend (React/Next.js)
- **`components/calculator.jsx`** - Core calculator UI with hidden "special mode" triggered by long-pressing the decimal key
- **`components/home-wrapper.jsx`** - State orchestration and modals container
- **`components/history-panel.jsx`** - Enhanced history display with special rendering for age/pincode calculations
- **`app/page.jsx`** - Entry point (delegates to HomeWrapper)
- **`app/layout.jsx`** - Root layout with providers
- **`contexts/AuthContext.jsx`** - Authentication & forced number persistence

### Backend (Node.js/Express)
- **`backend/server.js`** - Express server
- **`backend/routes/calculator.js`** - Calculation history endpoints
- **`backend/routes/verification.js`** - Phone/OTP verification
- **`backend/routes/auth.js`** - User authentication
- **`backend/models/CalculationHistory.js`**, **PhoneVerification.js**, **User.js** - Data models

### API Layer
- **`lib/api.js`** - Fetch-based API service (DEPRECATED - being migrated)
- **`backend/services/VerificationService.js`** - Phone verification logic
- **`lib/pincode-service.js`** - Indian pincode lookup service

---

## Key Architectural Patterns

### 1. **Hidden Mode System**
- **Normal Mode**: Standard calculator
- **Special Mode**: Unlocked by long-pressing `.` (800ms hold)
- Once unlocked: Long-press `+` to set forced numbers, long-press `×` to open history
- Visual indicator in display shows current mode
- **Why split?** Keeps UI clean but enables power-user features without UI complexity

### 2. **Calculation Flow with Forced Numbers**
```
User calculates → handleEquals()
├─ Check if 4-digit year (age calculation)
├─ Check for forced number triggers (only in Special Mode)
├─ Add to history with metadata (forced flag, timestamps)
└─ Sync to backend if authenticated
```
- `forcedNumber.forcedNumber` - Primary replacement
- `forcedNumber.secondForceNumber` - Triggers on specific operand match
- **Forced mode only applies to `+` and `-` operations**

### 3. **Operand Tracking for Pincode Detection**
- All operands across the entire calculation chain stored in `allOperands` array
- After equals pressed, any operand matching Indian pincode pattern triggers background fetch
- Address (taluk, district, state) fetched asynchronously from `/api/pincode/[pincode]`
- History entry updated after fetch completes - shows latest address at top of history

### 4. **UI Professional Standards (v1.0)**
- **Color Scheme**: Deep blacks (#0a0a0a, #1a1a1a) with orange accents (#FF9500, #E08C0F)
- **Spacing**: Gradient backgrounds, rounded corners (lg=12px, xl=16px)
- **Typography**: Responsive sizes (text-7xl → text-8xl, text-3xl → text-4xl)
- **Elevation**: Shadow-lg for cards, shadow-2xl for floating elements
- **Transitions**: 100-150ms duration, smooth easing
- **Mobile**: Full-screen responsive, respects safe areas with `env(safe-area-inset-bottom)`

---

## Component Responsibilities

### `calculator.jsx` - Core Logic
- **Stateful**: Tracks display, previous value, operation, waiting-for-operand state
- **Key methods**:
  - `handleEquals()` - Complex: age detection, forced number logic, operand collection, pincode fetching
  - `handleOperation()` - Chain calculation logic
  - `performCalculation()` - Pure calculation function
- **UI Rendering**:
  - Display component shows current mode badge
  - Button variants: lightGray (numbers), gray (operators), orange (equals/operations)
  - Long-press handlers on `+`, `×`, `.` for shortcuts

### `home-wrapper.jsx` - State Orchestration
- **Manages**: History array, forced numbers, auth state, modal visibility
- **Data Persistence**: localStorage (calculator history, forced numbers), backend sync
- **Key flows**:
  - `handleAddToHistory()` - Creates entry, syncs to backend, updates local state
  - `handlePincodeAddress()` - Callback for async pincode fetch completion
- **Modal Coordination**: Passes handlers to Calculator, HistoryPanel, ForcedNumberModal

### `history-panel.jsx` - Smart Rendering
- **Categories**: Age calculations, pincode addresses, regular calculations
- **Display priority**: Latest address first, then latest age, then calculations list
- **Metadata**: Shows sync status, timestamp, forced flag
- **Styling**: Color-coded cards (emerald for location, orange for age, slate for calculations)

### `app/globals.css` - Design System
- **Custom animations**: `fade-in-out` (mode toast), `slide-in-up/down` (modals), `pulse-soft`
- **Scrollbar styling**: Custom webkit scrollbar (6px width, #3a3a3c color)
- **Root setup**: Fixed positioning, overflow hidden, no scroll bouncing

---

## API Patterns

### Backend Endpoints (Known)
```
POST   /api/calculator/save          - Save calculation
GET    /api/calculator/history       - Fetch user history
DELETE /api/calculator/history       - Clear history
GET    /api/auth/me                  - Current user profile
POST   /api/auth/login               - Login (returns token)
POST   /api/auth/register            - Register
PUT    /api/auth/forced-number       - Update forced numbers
GET    /api/pincode/[pincode]        - Pincode lookup
POST   /api/verification/send-otp    - Send OTP
POST   /api/verification/verify-otp  - Verify OTP
```

### Frontend API Usage
- **Old pattern** (`lib/api.js`): Fetch-based, error handling in catch blocks
- **New pattern** (in progress): Axios-based service classes in `services/` folder
- **Token management**: Stored in localStorage as `calculator_token`, added to all requests via Authorization header

---

## Development Workflows

### Building
```bash
npm run build       # Next.js production build
npm run dev         # Development server (localhost:3000)
npm run lint        # Run linter
```

### Backend Development
```bash
cd backend
npm install
npm start           # Runs on port 5000 (configured in server.js)
```

### Testing Forced Numbers
1. Enter Special Mode (long-press `.`)
2. Long-press `+` or `÷` to open forced number modal
3. Set primary/secondary forced numbers
4. Perform addition/subtraction - result replaced with forced value

### Testing Pincode Lookup
1. Calculate: `123 + 560001` (560001 = Bangalore pincode)
2. History shows location automatically after async fetch
3. Check backend logs for `/api/pincode/560001` request

---

## Project-Specific Conventions

### Naming
- **Components**: PascalCase, suffix with feature (e.g., `ForcedNumberModal.jsx`)
- **Utilities**: camelCase in `/lib` and `/services`
- **Handlers**: Prefix with `handle` (e.g., `handleEquals`)

### State Management
- **Local**: useState for UI state (calculator display, modals)
- **Auth**: useAuth hook from AuthContext (manages user, token, forced numbers)
- **Persistence**: localStorage for offline fallback, backend sync when authenticated

### Error Handling
- **Frontend**: Catch errors silently, fall back to localStorage
- **Backend**: Return HTTP error codes, frontend logs to console
- **Network**: "Failed to fetch" errors degrade gracefully (show cached data)

### File Organization
```
components/        - React components (UI)
contexts/         - Global state (Auth)
lib/              - Utilities (API, pincode service)
backend/          - Express server
  ├─ routes/      - API endpoints
  ├─ models/      - Data schemas
  ├─ services/    - Business logic
  └─ middleware/  - Express middleware
```

---

## Common Modification Points

### Adding New Operation
1. Add button in `Calculator.handleOperation()`
2. Add calculation logic in `performCalculation()`
3. Update operation string in history entry

### Changing UI Colors
1. Update Button variants in `calculator.jsx` (lines 50-60)
2. Update Display gradient in calculator.jsx (line 7)
3. Update History cards in `history-panel.jsx`
4. Maintain contrast ratio ≥4.5:1 for accessibility

### Adding Feature to History
1. Render new category in `history-panel.jsx` (after line 115)
2. Add filter logic before regularEntries
3. Pass metadata through `onAddToHistory()` callback

### Extending Backend Routes
1. Add route in `/backend/routes/[feature].js`
2. Register in `backend/server.js` (app.use `/api/[feature]`)
3. Add corresponding service class in `/backend/services/`
4. Update `lib/api.js` or create new Axios service

---

## Known Issues & Workarounds

- **Issue**: History fetch fails on first load  
  **Workaround**: Gracefully falls back to localStorage, logs warning

- **Issue**: Forced numbers not persisting across page reload  
  **Workaround**: Saved to both localStorage AND backend user profile (whichever loaded first used)

- **Issue**: Pincode fetch slow on poor connection  
  **Solution**: Non-blocking async fetch, UI doesn't wait (shows result immediately)

---

## Performance Considerations

- **Lazy evaluation**: Pincode lookup is async, non-blocking
- **Calculation**: Performed on-the-fly, no memoization needed (instant)
- **History**: Limited to 100 entries (set in `home-wrapper.jsx` line 60)
- **Re-renders**: Minimal via proper state isolation (calculator has own state, doesn't trigger header re-render)

---

## External Dependencies
- **Next.js**: Framework & deployment
- **React**: UI library
- **Tailwind CSS**: Styling
- **React Icons**: Icon library (MdBackspace, IoCheckmarkCircle)
- **Firebase** (optional): Backend auth/storage (configured but may not be active)
- **Axios**: HTTP client (in progress adoption)

---

**Last Updated**: December 2025  
**Updated By**: Migration to Axios + UI Professional Refresh (v1.0)
