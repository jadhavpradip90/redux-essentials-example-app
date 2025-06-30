import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostsMainPage } from './feature/posts/PostsMainPage'
import { SinglePostPage } from './feature/posts/SinglePostPage';
import { EditPostForm } from './feature/posts/EditPostForm';
import { LoginPage } from './feature/auth/LoginPage';
import { useAppSelector } from './app/hooks';
import { selectCurrentUsername } from './feature/auth/authSlice';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)
  if (!username) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
