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
import { MentorLayout } from './components/layout/MentorLayout';
import { MentorDashboard } from './pages/MentorDashboard';
import { LinkedInIntegration } from './components/mentor/LinkedInIntegration';
import { CreateCircle } from './pages/mentor/CreateCircle';
import { EditProfile } from './pages/mentor/EditProfile';
import { MentorMentees } from './pages/mentor/MentorMentees';
import { MentorCircles } from './pages/mentor/MentorCircles';
import { MentorCalendar } from './pages/mentor/MentorCalendar';
import { MentorResources } from './pages/mentor/MentorResources';
import { MentorMessages } from './pages/mentor/MentorMessages';
import { MentorMarketplace } from './pages/mentor/MentorMarketplace';
import { MentorAnalytics } from './pages/mentor/MentorAnalytics';
import { MentorAchievements } from './pages/mentor/MentorAchievements';
import { MentorSettings } from './pages/mentor/MentorSettings';
import { ScheduleMeeting } from './pages/mentor/ScheduleMeeting';
import { RoleSelection } from './pages/RoleSelection';
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

// MentorLayout Route Component
const MentorLayoutRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user?.role !== 'mentor') {
    return <Navigate to="/auth" replace />;
  }

  return (
    <MentorLayout>
      <>{children}</>
    </MentorLayout>
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
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/" element={
          user?.role === 'youth' ? (
            <SidebarLayout>
              <YouthDashboard />
            </SidebarLayout>
          ) : user?.role === 'mentor' ? (
            <MentorLayoutRoute>
              <MentorDashboard />
            </MentorLayoutRoute>
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

        {/* Mentor Routes */}
        <Route path="/mentor/dashboard" element={
          <MentorLayoutRoute>
            <MentorDashboard />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/create-circle" element={
          <MentorLayoutRoute>
            <CreateCircle />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/edit-profile" element={
          <MentorLayoutRoute>
            <EditProfile />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/mentees" element={
          <MentorLayoutRoute>
            <MentorMentees />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/circles" element={
          <MentorLayoutRoute>
            <MentorCircles />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/calendar" element={
          <MentorLayoutRoute>
            <MentorCalendar />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/resources" element={
          <MentorLayoutRoute>
            <MentorResources />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/messages" element={
          <MentorLayoutRoute>
            <MentorMessages />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/marketplace" element={
          <MentorLayoutRoute>
            <MentorMarketplace />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/analytics" element={
          <MentorLayoutRoute>
            <MentorAnalytics />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/achievements" element={
          <MentorLayoutRoute>
            <MentorAchievements />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/settings" element={
          <MentorLayoutRoute>
            <MentorSettings />
          </MentorLayoutRoute>
        } />
        <Route path="/mentor/schedule-meeting" element={
          <MentorLayoutRoute>
            <ScheduleMeeting />
          </MentorLayoutRoute>
        } />
        <Route path="/linkedin-integration" element={
          <ProtectedRoute>
            <LinkedInIntegration />
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