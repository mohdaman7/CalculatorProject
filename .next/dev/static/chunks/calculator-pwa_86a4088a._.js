(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/calculator-pwa/src/lib/api/config/axios.config.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || 'http://localhost:5000/api';
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
// Request interceptor to add auth token to requests
axiosInstance.interceptors.request.use((config)=>{
    const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('calculator_token') : "TURBOPACK unreachable";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
// Response interceptor to handle common errors
axiosInstance.interceptors.response.use((response)=>response, async (error)=>{
    const originalRequest = error.config;
    // Handle token expiration (401) and avoid infinite retry loops
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
        // Here you can add token refresh logic if needed
        // const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        //   refreshToken: getRefreshToken()
        // });
        // const { token } = response.data;
        // localStorage.setItem('calculator_token', token);
        // originalRequest.headers.Authorization = `Bearer ${token}`;
        // return axiosInstance(originalRequest);
        } catch (error) {
            // If refresh fails, clear auth and redirect to login
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('calculator_token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosInstance;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/src/lib/api/services/BaseService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/config/axios.config.js [app-client] (ecmascript)");
;
class BaseService {
    constructor(endpoint){
        this.endpoint = endpoint;
    }
    // Create a new resource
    async create(data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Get all resources with optional query parameters
    async getAll(params = {}) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(this.endpoint, {
                params
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Get a single resource by ID
    async getById(id) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Update a resource by ID
    async update(id, data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Delete a resource by ID
    async delete(id) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Custom request method for non-CRUD operations
    async request(config) {
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                ...config,
                url: `${this.endpoint}${config.url || ''}`
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Handle API errors consistently
    handleError(error) {
        console.error('API Error:', error);
        // You can add more sophisticated error handling here
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        // You could also integrate with a global error handling system here
        // e.g., show a toast notification
        throw new Error(errorMessage);
    }
}
const __TURBOPACK__default__export__ = BaseService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/src/lib/api/services/AuthService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$BaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/services/BaseService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/config/axios.config.js [app-client] (ecmascript)");
;
;
class AuthService extends __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$BaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    constructor(){
        super('/auth');
    }
    async register(userData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.endpoint}/register`, userData);
            if (response.data.token) {
                this.saveToken(response.data.token);
            }
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    async login(credentials) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.endpoint}/login`, credentials);
            if (response.data.token) {
                this.saveToken(response.data.token);
            }
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    async getCurrentUser() {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.endpoint}/me`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    async updateForcedNumber(forcedNumbers) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.endpoint}/forced-number`, forcedNumbers);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    logout() {
        this.removeToken();
    }
    isAuthenticated() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return !!localStorage.getItem('calculator_token');
    }
    saveToken(token) {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('calculator_token', token);
            // Update the default Authorization header
            __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
    removeToken() {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('calculator_token');
            delete __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common['Authorization'];
        }
    }
}
const __TURBOPACK__default__export__ = new AuthService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/src/lib/api/services/CalculatorService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$BaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/services/BaseService.js [app-client] (ecmascript)");
;
class CalculatorService extends __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$BaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    constructor(){
        super('/calculator');
    }
    async saveCalculation(calculationData) {
        try {
            const response = await this.request({
                method: 'POST',
                url: '/history',
                data: calculationData
            });
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }
    async getHistory(params = {}) {
        try {
            const response = await this.request({
                method: 'GET',
                url: '/history',
                params
            });
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }
}
const __TURBOPACK__default__export__ = new CalculatorService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/src/lib/api/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Export all services for easier imports
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/services/AuthService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$CalculatorService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/services/CalculatorService.js [app-client] (ecmascript)");
// Export axios instance in case it's needed directly
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/config/axios.config.js [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calculator-pwa/src/lib/api/services/AuthService.js [app-client] (ecmascript) <export default as authService>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/services/AuthService.js [app-client] (ecmascript)");
}),
"[project]/calculator-pwa/contexts/AuthContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__authService$3e$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/services/AuthService.js [app-client] (ecmascript) <export default as authService>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
// Default context value for when AuthProvider is not available
const defaultContextValue = {
    user: null,
    loading: false,
    error: null,
    login: async ()=>{},
    register: async ()=>{},
    logout: ()=>{},
    updateForcedNumber: async ()=>{},
    isAuthenticated: false
};
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            setMounted(true);
        }
    }["AuthProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (!mounted) return;
            const initAuth = {
                "AuthProvider.useEffect.initAuth": async ()=>{
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__authService$3e$__["authService"].isAuthenticated()) {
                        try {
                            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__authService$3e$__["authService"].getCurrentUser();
                            setUser(data.user);
                        } catch (error) {
                            console.error('Failed to get current user:', error);
                            __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__authService$3e$__["authService"].logout();
                        }
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect.initAuth"];
            initAuth();
        }
    }["AuthProvider.useEffect"], [
        mounted
    ]);
    const login = async (email, password)=>{
        try {
            setError(null);
            setLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__authService$3e$__["authService"].login({
                email,
                password
            });
            setUser(data.user);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally{
            setLoading(false);
        }
    };
    const register = async (username, email, password)=>{
        try {
            setError(null);
            setLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__authService$3e$__["authService"].register({
                username,
                email,
                password
            });
            setUser(data.user);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally{
            setLoading(false);
        }
    };
    const logout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__authService$3e$__["authService"].logout();
        setUser(null);
        setError(null);
    };
    const updateForcedNumber = async (forcedNumbers)=>{
        try {
            setError(null);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__authService$3e$__["authService"].updateForcedNumber(forcedNumbers);
            setUser((prev)=>({
                    ...prev,
                    forcedNumber: data.forcedNumber,
                    secondForceNumber: data.secondForceNumber,
                    secondForceTriggerNumber: data.secondForceTriggerNumber
                }));
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };
    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateForcedNumber,
        isAuthenticated: !!user
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            error,
            login,
            register,
            logout,
            updateForcedNumber,
            isAuthenticated: !!user
        },
        children: !loading && children
    }, void 0, false, {
        fileName: "[project]/calculator-pwa/contexts/AuthContext.jsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "yw7boZu6KSYita507tnkkQu8xQY=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        return defaultContextValue;
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=calculator-pwa_86a4088a._.js.map