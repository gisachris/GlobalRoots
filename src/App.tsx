/// <reference types="vite/client" />
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Community } from './pages/Community';
import { Projects } from './pages/Projects';
import { ReturneeHub } from './pages/ReturneeHub';
import { ImpactDashboard } from './pages/ImpactDashboard';
import { MentorConnect } from './pages/MentorConnect';
import { ThemeProvider } from './utils/theme';
import { LanguageProvider } from './utils/language';
import { AuthProvider, useAuth, User } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
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
import { YouthDashboard } from './pages/YouthDashboard';
import { YouthOpportunity } from './pages/YouthOpportunity';
import { YouthLayout } from './components/layout/YouthLayout';
import { LandingPage } from './pages/LandingPage';
import { UserPersonalProjects } from './pages/UserPersonalProjects';
import { Discussions } from './pages/Discussions';
import { Calendar } from './pages/Calendar';
import { Notifications } from './pages/Notifications';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user?.role !== 'youth') {
    return <Navigate to="/auth" replace />;
  }

  return (
    <YouthLayout>
      <>{children}</>
    </YouthLayout>
  );
};

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={
          user?.role === 'youth' ? (
            <SidebarLayout>
              <YouthDashboard />
            </SidebarLayout>
          ) : <LandingPage />
        } />

        <Route path="/dashboard" element={
          <SidebarLayout>
            <Dashboard />
          </SidebarLayout>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/mentors" element={
          <ProtectedRoute>
            <MentorsPage />
          </ProtectedRoute>
        } />
        <Route path="/learning" element={
          <SidebarLayout>
            <LearningPage />
          </SidebarLayout>
        } />
        <Route path="/mentees" element={
          <ProtectedRoute>
            <MenteesPage />
          </ProtectedRoute>
        } />
        <Route path="/content" element={
          <ProtectedRoute>
            <ContentCreationPage />
          </ProtectedRoute>
        } />
        <Route path="/post-job" element={
          <ProtectedRoute>
            <PostJobPage />
          </ProtectedRoute>
        } />
        <Route path="/candidates" element={
          <ProtectedRoute>
            <CandidatesPage />
          </ProtectedRoute>
        } />
        <Route path="/mentorconnect" element={
          <ProtectedRoute>
            <MentorConnect />
          </ProtectedRoute>
        } />
        <Route path="/opportunities" element={
          <SidebarLayout>
            <YouthOpportunity />
          </SidebarLayout>
        } />
        <Route path="/community" element={
          <SidebarLayout>
            <Community />
          </SidebarLayout>
        } />
        <Route path="/projects" element={
          <SidebarLayout>
            <Projects />
          </SidebarLayout>
        } />
        <Route path="/userProjects" element={
          <SidebarLayout>
            <UserPersonalProjects />
          </SidebarLayout>
        } />
        <Route path="/discussions" element={
          <SidebarLayout>
            <Discussions />
          </SidebarLayout>
        } />
        <Route path='/calendar' element={
          <SidebarLayout>
            <Calendar />
          </SidebarLayout>
        } />
        <Route path='/notifications' element={
          <SidebarLayout>
            <Notifications />
          </SidebarLayout>
        } />
        <Route path="/returnee" element={<ReturneeHub />} />
        <Route path="/impact" element={<ImpactDashboard />} />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={
          <ProtectedRoute>
            <AdminUsersPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/content" element={
          <ProtectedRoute>
            <AdminContentPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/jobs" element={
          <ProtectedRoute>
            <AdminJobsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/analytics" element={
          <ProtectedRoute>
            <AdminAnalyticsPage />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}