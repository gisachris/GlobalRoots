import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import Opportunities from './pages/Opportunities';
import { Community } from './pages/Community';
import { Projects } from './pages/Projects';
import { ReturneeHub } from './pages/ReturneeHub';
import { ImpactDashboard } from './pages/ImpactDashboard';
import { MentorConnect } from './pages/MentorConnect';
import { ThemeProvider } from './utils/theme';
import { LanguageProvider } from './utils/language';
import { useAuth } from './utils/auth';
import { ProfilePage } from './pages/ProfilePage';
import { MentorsPage } from './pages/MentorsPage';
import { LearningPage } from './pages/LearningPage';
import { MenteesPage } from './pages/MenteesPage';
import { ContentCreationPage } from './pages/ContentCreationPage';
import { PostJobPage } from './pages/PostJobPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminJobsPage } from './pages/admin/AdminJobsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthPage } from './pages/AuthPage';
import { NotFoundPage } from './pages/NotFoundPage';
import LoggedIn from './components/layout/LoggedIn';
import { YouthDashboard } from './pages/YouthDashboard';
import { YouthOpportunity } from './pages/YouthOpportunity';
import { YouthLayout } from './components/layout/YouthLayout';

// Home Route Component
const HomeRoute = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // Check if user is youth
  const isYouth = user?.role === 'youth' || user?.role === 'student';
  
  if (isYouth) {
    return (
      <YouthLayout>
        <YouthDashboard />
      </YouthLayout>
    );
  }
  
  return <Dashboard />;
};

// Opportunities Route Component
const OpportunitiesRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <YouthLayout>
      <YouthOpportunity />
    </YouthLayout>
  );
};
// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Layout>
      <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomeRoute />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/mentors" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MentorsPage />
              </ProtectedRoute>
            } />
            <Route path="/learning" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <LearningPage />
              </ProtectedRoute>
            } />
            <Route path="/mentees" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MenteesPage />
              </ProtectedRoute>
            } />
            <Route path="/content" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ContentCreationPage />
              </ProtectedRoute>
            } />
            <Route path="/post-job" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PostJobPage />
              </ProtectedRoute>
            } />
            <Route path="/candidates" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CandidatesPage />
              </ProtectedRoute>
            } />
            <Route path="/mentorconnect" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MentorConnect />
              </ProtectedRoute>
            } />
            <Route path="/opportunities" element={<OpportunitiesRoute />} />
            <Route path="/community" element={<Community />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/returnee" element={<ReturneeHub />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/settings" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/users" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminUsersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminContentPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/jobs" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminJobsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminAnalyticsPage />
              </ProtectedRoute>
            } />
            
            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}