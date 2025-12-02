module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/calculator-pwa/src/lib/api/config/axios.config.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || 'http://localhost:5000/api';
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
// Request interceptor to add auth token to requests
axiosInstance.interceptors.request.use((config)=>{
    const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
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
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosInstance;
}),
"[project]/calculator-pwa/src/lib/api/services/BaseService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/config/axios.config.js [app-ssr] (ecmascript)");
;
class BaseService {
    constructor(endpoint){
        this.endpoint = endpoint;
    }
    // Create a new resource
    async create(data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(this.endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Get all resources with optional query parameters
    async getAll(params = {}) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(this.endpoint, {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Update a resource by ID
    async update(id, data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${this.endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Delete a resource by ID
    async delete(id) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    // Custom request method for non-CRUD operations
    async request(config) {
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
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
}),
"[project]/calculator-pwa/src/lib/api/services/AuthService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$BaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/services/BaseService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/config/axios.config.js [app-ssr] (ecmascript)");
;
;
class AuthService extends __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$BaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    constructor(){
        super('/auth');
    }
    async register(userData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.endpoint}/register`, userData);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.endpoint}/login`, credentials);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.endpoint}/me`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    async updateForcedNumber(forcedNumbers) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$config$2f$axios$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${this.endpoint}/forced-number`, forcedNumbers);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    logout() {
        this.removeToken();
    }
    isAuthenticated() {
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
    }
    saveToken(token) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    removeToken() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
}
const __TURBOPACK__default__export__ = new AuthService();
}),
"[project]/calculator-pwa/contexts/AuthContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calculator-pwa/src/lib/api/services/AuthService.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
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
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mounted) return;
        const initAuth = async ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isAuthenticated()) {
                try {
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].getCurrentUser();
                    setUser(data.user);
                } catch (error) {
                    console.error('Failed to get current user:', error);
                    __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, [
        mounted
    ]);
    const login = async (email, password)=>{
        try {
            setError(null);
            setLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].login({
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
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].register({
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
        __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].logout();
        setUser(null);
        setError(null);
    };
    const updateForcedNumber = async (forcedNumbers)=>{
        try {
            setError(null);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$src$2f$lib$2f$api$2f$services$2f$AuthService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].updateForcedNumber(forcedNumbers);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calculator$2d$pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        return defaultContextValue;
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3439d7d9._.js.map