import { useState } from 'react'
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Simple validation
        if (!email || !password) {
            setError('Please fill in all fields')
            setIsLoading(false)
            return
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address')
            setIsLoading(false)
            return
        }

        // Simulate API call
        setTimeout(() => {
            console.log('Login successful:', { email, password })
            setIsLoading(false)
            setEmail('')
            setPassword('')
            alert('Login successful!')
        }, 1000)
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Login to your account</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="login-footer">
                    <a href="#" className="forgot-password">Forgot Password?</a>
                    <span className="divider">•</span>
                    <a href="#" className="signup-link">Sign Up</a>
                </div>
            </div>
        </div>
    )
}

export default Login
