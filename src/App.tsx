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

// MentorLayout Route Component
const MentorLayoutRoute = ({children,isAuthenticated,user}:{ children: React.ReactNode; isAuthenticated: boolean,user?:User|null }) => {
  
  if (!isAuthenticated|| user?.role!=='mentor') {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <MentorLayout>
      <>{children}</>
    </MentorLayout>
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
        {/* Auth route with Layout */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        
        {/* Public routes */}
            <Route path="/" element={
              isAuthenticated ? (
                user?.role === 'youth' ? (
                  <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                    <YouthDashboard/>
                  </SidebarLayout>
                ) : user?.role === 'mentor' ? (
                  <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                    <MentorDashboard/>
                  </MentorLayoutRoute>
                ) : <LandingPage />
              ) : <LandingPage />
            } />

            
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
              isAuthenticated ? (
                user?.role === 'mentor' ? (
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <YouthOpportunity/>
                  </ProtectedRoute>
                ) : (
                  <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                    <YouthOpportunity/>
                  </SidebarLayout>
                )
              ) : <Navigate to="/auth" replace />
            } />
            <Route path="/community" element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <Community/>
              </SidebarLayout>
            } />
            <Route path="/projects" element={
              isAuthenticated ? (
                user?.role === 'mentor' ? (
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Projects/>
                  </ProtectedRoute>
                ) : (
                  <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                    <Projects/>
                  </SidebarLayout>
                )
              ) : <Navigate to="/auth" replace />
            } />
            <Route path="/userProjects" element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <UserPersonalProjects/>
              </SidebarLayout>
            } />
            <Route path="/discussions" element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <Discussions/>
              </SidebarLayout>
            } />
            <Route path='/calendar' element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <Calendar/>
              </SidebarLayout>
            }/>
            <Route path='/notifications' element={
              <SidebarLayout isAuthenticated={isAuthenticated} user={user}>
                <Notifications/>
              </SidebarLayout>
            }/>
            
            {/* Mentor routes */}
            <Route path="/mentor/onboarding" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <LinkedInIntegration />
              </ProtectedRoute>
            } />
            <Route path="/mentor/dashboard" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorDashboard/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/circles/create" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <CreateCircle/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/profile/edit" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <EditProfile/>
              </ProtectedRoute>
            } />
            <Route path="/mentor/mentees" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorMentees/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/circles" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorCircles/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/calendar" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorCalendar/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/resources" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorResources/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/messages" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorMessages/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/marketplace" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorMarketplace/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/analytics" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorAnalytics/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/achievements" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorAchievements/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/settings" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <MentorSettings/>
              </MentorLayoutRoute>
            } />
            <Route path="/mentor/schedule" element={
              <MentorLayoutRoute isAuthenticated={isAuthenticated} user={user}>
                <ScheduleMeeting/>
              </MentorLayoutRoute>
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