import { useState } from "react"
import { LandingPage } from "../../pages/LandingPage"
import { Dashboard } from "../../pages/Dashboard"
import { useAuth } from "../../utils/auth"
import { Sidebar } from "./Sidebar"
import { Button } from "../ui/Button"
import { LogOutIcon, MenuIcon } from "lucide-react"

function LoggedIn() {
  const { isAuthenticated, user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return <LandingPage />
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-[#B45309]/20 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-[#503314] dark:text-white">
                Welcome back, {user?.name || 'User'}!
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-[#503314] dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-[#7C2D12] dark:text-gray-300">
                  {user?.role}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white"
              >
                <LogOutIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <Dashboard />
      </div>
    </div>
  )
}

export default LoggedIn