import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { scrollToSection } from "../utils/smoothScroll";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import {
  UsersIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HomeIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  StarIcon,
  TrendingUpIcon,
  GlobeIcon,
  CheckCircleIcon,
} from "lucide-react";
export const LandingPage = () => {
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
      <section className="relative min-h-[90vh] flex items-center bg-[#F5F5F0] dark:bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Rwanda landscape"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F0]/80 to-[#F5F5F0]/60 dark:from-gray-900/80 dark:to-gray-900/60"></div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="stagger-container animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#503314] dark:text-white animate-slideIn">
                Unlocking Diaspora Potential for{" "}
                <span className="text-[#B45309] dark:text-[#B45309]">Rwanda's Tech Future</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-[#7C2D12] dark:text-gray-300 max-w-lg animate-slideIn" style={{animationDelay: '0.2s'}}>
                Connect with Diaspora IT professionals for mentorship,
                skills-building, and career opportunities that transform lives
                and build Rwanda's digital economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slideIn" style={{animationDelay: '0.4s'}}>
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[#B45309] hover:bg-[#92400E] text-white rounded-md px-6 py-3 flex items-center justify-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  I am Youth <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#B45309] text-[#B45309] hover:bg-[#B45309]/10 rounded-md px-6 py-3 flex items-center justify-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  I am Diaspora <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative animate-fadeIn" style={{animationDelay: '0.6s'}}>
                <div className="relative">
                  <img
                    src="/hero.png"
                    alt="Global Roots Platform"
                    className="max-w-2xl w-full object-contain transform transition-all duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F5F5F0]/30 to-white dark:from-gray-800 dark:via-gray-700/30 dark:to-gray-800"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-6">
              <TrendingUpIcon className="h-4 w-4 text-[#B45309] mr-2" />
              <span className="text-sm font-medium text-[#7C2D12]">
                Our Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#503314] dark:text-white">
              How Global Roots Works
            </h2>
            <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our platform creates meaningful connections between Rwanda's tech
              talent and global opportunities through a proven four-step process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
            {/* Mentorship Card */}
            <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B45309]/5 to-[#92400E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B45309] to-[#92400E] flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <UsersIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#503314] dark:text-white mb-2">
                  Mentorship
                </CardTitle>
                <CardDescription className="text-[#7C2D12] dark:text-gray-300 font-medium">
                  Connect with experienced IT professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-[#503314] dark:text-gray-300 leading-relaxed mb-6">
                  Get personalized guidance from industry experts who understand
                  your journey and can help navigate your career path.
                </p>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center text-[#B45309] hover:text-[#92400E] font-semibold group/link"
                >
                  Find a mentor
                  <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            {/* Micro-internships Card */}
            <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B45309]/5 to-[#92400E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B45309] to-[#92400E] flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <BriefcaseIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#503314] dark:text-white mb-2">
                  Micro-internships
                </CardTitle>
                <CardDescription className="text-[#7C2D12] dark:text-gray-300 font-medium">
                  Gain practical experience remotely
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-[#503314] dark:text-gray-300 leading-relaxed mb-6">
                  Work on short-term, paid projects with global companies to
                  build your portfolio and develop real-world skills.
                </p>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center text-[#B45309] hover:text-[#92400E] font-semibold group/link"
                >
                  Explore opportunities
                  <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            {/* Returnships Card */}
            <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B45309]/5 to-[#92400E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B45309] to-[#92400E] flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <HomeIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#503314] dark:text-white mb-2">
                  Returnships
                </CardTitle>
                <CardDescription className="text-[#7C2D12] dark:text-gray-300 font-medium">
                  Come back home with confidence
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-[#503314] dark:text-gray-300 leading-relaxed mb-6">
                  Transition back to Rwanda with our support network, housing
                  assistance, and employment connections.
                </p>
                <Link
                  to="/returnee"
                  className="inline-flex items-center text-[#B45309] hover:text-[#92400E] font-semibold group/link"
                >
                  Plan your return
                  <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            {/* Community Card */}
            <Card className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B45309]/5 to-[#92400E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B45309] to-[#92400E] flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <GraduationCapIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-[#503314] dark:text-white mb-2">
                  Community
                </CardTitle>
                <CardDescription className="text-[#7C2D12] dark:text-gray-300 font-medium">
                  Join a supportive network
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-[#503314] dark:text-gray-300 leading-relaxed mb-6">
                  Engage with peers, mentors, and industry leaders in our
                  vibrant community focused on growth and collaboration.
                </p>
                <Link
                  to="/community"
                  className="inline-flex items-center text-[#B45309] hover:text-[#92400E] font-semibold group/link"
                >
                  Join a circle
                  <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <GlobeIcon className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-white/80 font-medium">
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

      {/* Partners Section */}
      <section className="py-20 bg-[#F5F5F0] dark:bg-gray-800 relative">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group transition-all duration-500">
                <div className="h-20 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl border border-[#B45309]/10 group-hover:border-[#B45309]/30">
                  <span className="text-[#B45309] dark:text-[#B45309] font-bold text-lg group-hover:text-[#92400E]">
                    Partner {i}
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
      <section className="py-24 bg-gradient-to-br from-[#503314] via-[#7C2D12] to-[#B45309] relative overflow-hidden">
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
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#503314] hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-3px] group"
              >
                Create Your Profile
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#503314] font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:translate-y-[-3px] group"
              >
                Learn More
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
