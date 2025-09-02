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
import { useAuth, User } from './utils/auth';
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

// Home Route Component
const HomeRoute = ({children, user} : {children:React.ReactNode; user:User|null}) => {
  return user?.role=='youth'?<>{children}</>:<LandingPage/>;
};

// SidebarLayout Route Component
const SidebarLayout = ({children,isAuthenticated,user}:{ children: React.ReactNode; isAuthenticated: boolean,user?:User|null }) => {
  
  if (!isAuthenticated|| user?.role!=='youth') {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <YouthLayout>
      <>{children}</>
    </YouthLayout>
  );
};
// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

function AppRoutes() {
  const { user,isAuthenticated } = useAuth();
  
  return (
    <Layout>
      <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <HomeRoute user={user}>
                <YouthLayout>
                  <YouthDashboard/>
                </YouthLayout>
              </HomeRoute>
            } />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <Dashboard />
              </SidebarLayout>
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
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <LearningPage />
              </SidebarLayout>
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
            <Route path="/opportunities" element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <YouthOpportunity/>
              </SidebarLayout>
            } />
            <Route path="/community" element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <Community/>
              </SidebarLayout>
            } />
            <Route path="/projects" element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <Projects/>
              </SidebarLayout>
            } />
            <Route path="/userProjects" element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <UserPersonalProjects/>
              </SidebarLayout>
            } />
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