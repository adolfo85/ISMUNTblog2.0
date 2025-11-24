// Simple authentication service using localStorage

const AUTH_KEY = 'ismunt_auth'
// Updated credentials: Password only
const ADMIN_PASSWORD = '31842796a'

export const authService = {
    // Check if user is logged in
    isAuthenticated() {
        const session = localStorage.getItem(AUTH_KEY)
        if (!session) return false

        const { expiry } = JSON.parse(session)
        // Check if session expired (24 hours)
        if (Date.now() > expiry) {
            this.logout()
            return false
        }

        return true
    },

    // Login - Password only
    login(password) {
        if (password === ADMIN_PASSWORD) {
            const session = {
                role: 'admin',
                loginTime: Date.now(),
                expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            }
            localStorage.setItem(AUTH_KEY, JSON.stringify(session))
            return { success: true }
        }
        return { success: false, error: 'Contraseña incorrecta' }
    },

    // Logout
    logout() {
        localStorage.removeItem(AUTH_KEY)
    },

    // Get current session
    getSession() {
        const session = localStorage.getItem(AUTH_KEY)
        return session ? JSON.parse(session) : null
    }
}
