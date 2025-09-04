import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { HomeIcon, ArrowLeftIcon } from 'lucide-react';
import { useAuth } from '../utils/auth';

export const NotFoundPage = () => {

  const {isAuthenticated} = useAuth()

  return <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F0] dark:bg-gray-900 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#B45309]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-[#7C2D12]/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="text-center relative z-10 animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#B45309] mb-4">
            404
          </h1>
          <h2 className="text-4xl font-bold text-[#503314] dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-[#7C2D12] dark:text-gray-300 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button 
              variant="primary" 
              className="bg-[#B45309] hover:bg-[#92400E] px-8 py-3 rounded-xl flex items-center"
            >
              <HomeIcon className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          {isAuthenticated && <Link to="/dashboard">
            <Button 
              variant="outline" 
              className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white px-8 py-3 rounded-xl flex items-center"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
          </Link>}
        </div>
        
        <div className="mt-12">
          <p className="text-[#7C2D12] dark:text-gray-300 text-sm">
            Need help? <Link to="/community" className="text-[#B45309] hover:text-[#92400E] font-medium hover:underline">Contact our community</Link>
          </p>
        </div>
      </div>
    </div>;
};