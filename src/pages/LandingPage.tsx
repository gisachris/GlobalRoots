import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {RwandaMap} from "../components/ui/RwandaMap";
import { useAuth } from "../utils/auth";
import {Card,CardContent,CardHeader,CardTitle} from "../components/ui/Card";
import {UsersIcon,BriefcaseIcon,ArrowRightIcon,StarIcon,TrendingUpIcon,GlobeIcon,CheckCircleIcon,UserPlusIcon,SearchIcon,HandshakeIcon} from "lucide-react";

export const LandingPage = () => {

  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()

  // Add page transition effect and smooth scrolling
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full scroll-smooth">

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center bg-[#F5F5F0] dark:bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Rwanda landscape"
            className="w-full h-full object-cover opacity-60 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F0]/80 to-[#F5F5F0]/60 dark:from-gray-900/40 dark:to-gray-900/20"></div>
        </div>
        <div className="container mx-auto px-8 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="stagger-container animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[60px] font-bold mb-6 text-[#503314] dark:text-white animate-slideIn">
                Mentorship Without Borders.
                <span className="text-[#B45309] dark:text-[#B45309]"> Opportunity <br/>Without Limits.</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-[#7C2D12] dark:text-gray-300 max-w-lg animate-slideIn" style={{animationDelay: '0.2s'}}>
                Connect with Diaspora IT professionals for mentorship,
                skills-building, and career opportunities that transform lives
                and build Rwanda's digital economy.
              </p>
              {!isAuthenticated && <div className="flex flex-col sm:flex-row gap-4 animate-slideIn" style={{animationDelay: '0.4s'}}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={()=>navigate('/auth')}
                  className="bg-[#B45309] hover:bg-[#92400E] text-white rounded-md px-6 py-3 flex items-center justify-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  I am Youth <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={()=>navigate('/auth')}
                  className="border-[#B45309] text-[#B45309] hover:bg-[#B45309]/10 rounded-md px-6 py-3 flex items-center justify-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  I am Diaspora <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </div>}
            </div>
            <div className="hidden px-4 lg:block">
              <div className="relative animate-fadeIn" style={{animationDelay: '0.6s'}}>
                <div className="relative group">
                  <img
                    src="/hero.png"
                    alt="Global Roots Platform"
                    className="max-w-4xl lg:scale-x-110 lg:scale-y-125 overflow-hidden xl:max-w-5xl w-full object-contain transform transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="aboutUs" className="py-20 bg-[#F5F5F0] dark:bg-gray-900 relative min-h-screen overflow-hidden">
        <RwandaMap className="opacity-5 w-screen h-[60vh] md:h-[70vh] lg:h-[90vh]  absolute group-hover:scale-105 z-40"/>
        <div className="container mx-auto px-4 relative z-50">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-6">
              <UsersIcon className="h-4 w-4 text-[#B45309] mr-2" />
              <span className="text-sm font-medium text-[#7C2D12]">
                Who We Are
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#503314] dark:text-white">
              About Us
            </h2>
            <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Global Roots is a transformative platform connecting Rwanda's emerging tech talent with diaspora professionals worldwide. We believe in the power of mentorship, collaboration, and shared knowledge to build a thriving digital economy in Rwanda.
            </p>
          </div>
          <div className="grid gap-12 justify-center items-center max-w-6xl mx-auto">
            <div className="relative w-full hover:scale-105 duration-300 transition-all">
              <div className="bg-white dark:bg-gray-800 rounded-2xl py-8 px-24 shadow-xl">
                <div className="grid grid-cols-2 gap-20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#B45309] mb-2">500+</div>
                    <div className="text-[#7C2D12] dark:text-gray-300 text-sm">Active Mentors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#B45309] mb-2">1,200+</div>
                    <div className="text-[#7C2D12] dark:text-gray-300 text-sm">Youth Connected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#B45309] mb-2">25+</div>
                    <div className="text-[#7C2D12] dark:text-gray-300 text-sm">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#B45309] mb-2">85%</div>
                    <div className="text-[#7C2D12] dark:text-gray-300 text-sm">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section id="services"
        className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F5F5F0]/30 to-white dark:from-gray-800 dark:via-gray-700/30 dark:to-gray-800"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-6">
              <TrendingUpIcon className="h-4 w-4 text-[#B45309] mr-2" />
              <span className="text-sm font-medium text-[#7C2D12]">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#503314] dark:text-white">
              How Global Roots Works
            </h2>
            <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our platform creates meaningful connections between Rwanda's tech talent and global opportunities through three key programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Mentorship Program Card */}
            <Link to="/auth" className="h-full">
              <Card className="group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 relative overflow-hidden h-full flex flex-col rounded-2xl">
                <CardHeader className="text-center pt-8 pb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UsersIcon className="h-10 w-10 text-[#B45309]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#B45309] mb-4">
                    Mentorship Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-8 flex-1">
                  <p className="text-[#503314] dark:text-gray-300 leading-relaxed text-base">
                    Connect with experienced diaspora professionals for personalized career guidance and skill development.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Innovation Labs Card */}
            <Link to="/auth" className="h-full">
              <Card className="group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 relative overflow-hidden h-full flex flex-col rounded-2xl">
                <CardHeader className="text-center pt-8 pb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BriefcaseIcon className="h-10 w-10 text-[#B45309]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#B45309] mb-4">
                    Innovation Labs
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-8 flex-1">
                  <p className="text-[#503314] dark:text-gray-300 leading-relaxed text-base">
                    Collaborative spaces where youth work on real-world projects with diaspora professionals providing guidance and funding.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Remote Internship Hub Card */}
            <Link to="/auth" className="h-full">
              <Card className="group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 relative overflow-hidden h-full flex flex-col rounded-2xl">
                <CardHeader className="text-center pt-8 pb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <GlobeIcon className="h-10 w-10 text-[#B45309]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#B45309] mb-4">
                    Remote Internship Hub
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-8 flex-1">
                  <p className="text-[#503314] dark:text-gray-300 leading-relaxed text-base">
                    Virtual internships with diaspora-led companies offering real work experience without geographical barriers.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#F5F5F0] dark:bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-6">
              <CheckCircleIcon className="h-4 w-4 text-[#B45309] mr-2" />
              <span className="text-sm font-medium text-[#7C2D12]">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#503314] dark:text-white">
              How It Works
            </h2>
            <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get started on your journey to connect with global opportunities in just four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Step 1: Create Profile */}
            <Link to="/auth" className="h-full">
              <Card className="group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 relative overflow-hidden h-full flex flex-col rounded-2xl">
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#B45309] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <CardHeader className="text-center pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UserPlusIcon className="h-8 w-8 text-[#B45309]" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#503314] dark:text-white mb-2">
                    Create Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-8 flex-1">
                  <p className="text-[#7C2D12] dark:text-gray-300 leading-relaxed text-sm">
                    Sign up and build your professional profile with your skills, interests, and career goals.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Step 2: Get Matched */}
            <Link to="/auth" className="h-full">
              <Card className="group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 relative overflow-hidden h-full flex flex-col rounded-2xl">
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#B45309] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <CardHeader className="text-center pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <SearchIcon className="h-8 w-8 text-[#B45309]" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#503314] dark:text-white mb-2">
                    Get Matched
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-8 flex-1">
                  <p className="text-[#7C2D12] dark:text-gray-300 leading-relaxed text-sm">
                    Our algorithm connects you with mentors and opportunities that align with your goals.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Step 3: Start Collaborating */}
            <Link to="/auth" className="h-full">
              <Card className="group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 relative overflow-hidden h-full flex flex-col rounded-2xl">
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#B45309] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <CardHeader className="text-center pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <HandshakeIcon className="h-8 w-8 text-[#B45309]" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#503314] dark:text-white mb-2">
                    Start Collaborating
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-8 flex-1">
                  <p className="text-[#7C2D12] dark:text-gray-300 leading-relaxed text-sm">
                    Begin working with mentors, join projects, and participate in our community programs.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Step 4: Grow Your Career */}
            <Link to="/auth" className="h-full">
              <Card className="group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 relative overflow-hidden h-full flex flex-col rounded-2xl">
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#B45309] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <CardHeader className="text-center pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUpIcon className="h-8 w-8 text-[#B45309]" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#503314] dark:text-white mb-2">
                    Grow Your Career
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-8 flex-1">
                  <p className="text-[#7C2D12] dark:text-gray-300 leading-relaxed text-sm">
                    Advance your skills, build your network, and unlock new career opportunities globally.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#B45309] via-[#92400E] to-[#7C2D12] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Global Impact
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Transforming lives and building Rwanda's digital future through
              meaningful connections
            </p>
          </div>
          <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <GlobeIcon className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-white/80 text-wrap font-medium">
                Countries Connected
              </div>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <UsersIcon className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80 font-medium">Active Mentors</div>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUpIcon className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">85%</div>
              <div className="text-white/80 font-medium">Success Rate</div>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircleIcon className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">1,200+</div>
              <div className="text-white/80 font-medium">Lives Transformed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission and Goals Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-6">
              <StarIcon className="h-4 w-4 text-[#B45309] mr-2" />
              <span className="text-sm font-medium text-[#7C2D12]">
                Our Purpose
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#503314] dark:text-white">
              Our Mission and Goals
            </h2>
            <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empowering Rwanda's tech ecosystem through meaningful diaspora connections and sustainable career development
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <GlobeIcon className="h-8 w-8 text-[#B45309]" />
              </div>
              <h3 className="text-2xl font-bold text-[#503314] dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-[#7C2D12] dark:text-gray-300 leading-relaxed text-lg">
                To bridge the gap between Rwanda's emerging tech talent and global opportunities by creating a sustainable ecosystem where diaspora professionals mentor, guide, and collaborate with local youth to build Rwanda's digital future.
                Reaching on an international standard.
              </p>
            </div>
            
            {/* Goals */}
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <TrendingUpIcon className="h-8 w-8 text-[#B45309]" />
              </div>
              <h3 className="text-2xl font-bold text-[#503314] dark:text-white mb-4">
                Our Goals
              </h3>
              <ul className="text-[#7C2D12] dark:text-gray-300 leading-relaxed text-lg space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#B45309] mr-3 mt-1 flex-shrink-0" />
                  Connect 10,000+ Rwandan youth with global mentors by 2025
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#B45309] mr-3 mt-1 flex-shrink-0" />
                  Create 5,000+ remote work opportunities for local talent
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#B45309] mr-3 mt-1 flex-shrink-0" />
                  Facilitate 1,000+ diaspora returnees to contribute to Rwanda's tech sector
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#B45309] mr-3 mt-1 flex-shrink-0" />
                  Build a self-sustaining innovation ecosystem
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-[#F5F5F0] dark:bg-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-6">
              <GlobeIcon className="h-4 w-4 text-[#B45309] mr-2" />
              <span className="text-sm font-medium text-[#7C2D12] dark:text-gray-300">
                Trusted Partners
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-[#503314] dark:text-white">
              Our Partners
            </h2>
            <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-3xl mx-auto">
              Working with leading organizations to create opportunities for
              Rwanda's tech talent
            </p>
          </div>
          <div className=" flex flex-wrap justify-center gap-8 items-center justify-items-center">
            {['Konmesky', 'Google', 'MINICT', 'Microsoft', 'SolvIt Africa', 'TheGym', 'RTB', 'OneCode', 'Harvard', 'GIZ', 'OpenAi'].map((i) => (
              <div key={i} className="group transition-all duration-500">
                <div className=" cursor-pointer h-20 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl border border-[#B45309]/10 group-hover:border-[#B45309]/30">
                  <span className="text-[#B45309] dark:text-[#B45309] font-bold text-lg dark:group-hover:text-[#f18644] group-hover:text-[#a1360f]">
                    {i}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F5F5F0]/20 to-white dark:from-gray-800 dark:via-gray-700/20 dark:to-gray-800"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-6">
              <StarIcon className="h-4 w-4 text-[#B45309] mr-2" />
              <span className="text-sm font-medium text-[#7C2D12]">
                Success Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#503314] dark:text-white">
              Transforming Lives
            </h2>
            <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-3xl mx-auto">
              Hear from members of our community who have transformed their
              careers and are building Rwanda's tech future
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B45309] to-[#92400E]"></div>
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-[#B45309] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                      alt="Jean Marie"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 text-[#B45309] fill-current"
                      />
                    ))}
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-[#503314] dark:text-white">
                    Jean Marie
                  </h4>
                  <p className="text-[#B45309] font-semibold mb-6">
                    Software Developer, Kigali
                  </p>
                  <p className="text-[#503314] dark:text-gray-300 leading-relaxed italic text-lg">
                    "Through my mentor at Global Roots, I landed a remote
                    position with a Canadian tech company while still living in
                    Rwanda. The mentorship was invaluable."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B45309] to-[#92400E]"></div>
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-[#B45309] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                      alt="David"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 text-[#B45309] fill-current"
                      />
                    ))}
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-[#503314] dark:text-white">
                    David
                  </h4>
                  <p className="text-[#B45309] font-semibold mb-6">
                    Diaspora Returnee, Now CTO
                  </p>
                  <p className="text-[#503314] dark:text-gray-300 leading-relaxed italic text-lg">
                    "After 12 years abroad, Global Roots helped me return to
                    Rwanda and connect with the local tech ecosystem. Now I'm
                    leading a team of talented developers in Kigali."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B45309] to-[#92400E]"></div>
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-[#B45309] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                      alt="Claudine"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 text-[#B45309] fill-current"
                      />
                    ))}
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-[#503314] dark:text-white">
                    Claudine
                  </h4>
                  <p className="text-[#B45309] font-semibold mb-6">
                    UX Designer & Mentor
                  </p>
                  <p className="text-[#503314] dark:text-gray-300 leading-relaxed italic text-lg">
                    "As a mentor, I've helped five young Rwandan designers build
                    their portfolios. Seeing them succeed gives me immense pride
                    in our growing tech community."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#503314] dark:from-[#503314]/70 via-[#7C2D12] dark:via-[#7C2D12]/70 to-[#B45309] dark:to-[#B45309]/70 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full border border-white/30 mb-8">
              <StarIcon className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-medium">Join the Movement</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Ready to Connect With
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Global Opportunities?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Whether you're a young professional in Rwanda or part of the
              diaspora looking to give back, Global Roots is your platform for
              meaningful connections.
            </p>
            {!isAuthenticated&&<div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={()=>navigate('/auth')}
                className="bg-[#452809] text-white hover:bg-[#503314]/40 font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-3px] group"
              >
                Get Stated
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>}
          </div>
        </div>
      </section>

    </div>
  );
};
