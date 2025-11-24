import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Materia from './pages/Materia'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ContentEditor from './pages/admin/ContentEditor'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="materia/:materiaId" element={<Materia />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/editor"
                    element={
                        <ProtectedRoute>
                            <ContentEditor />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
