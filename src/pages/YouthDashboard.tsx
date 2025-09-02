import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../utils/auth';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  MessageCircle,
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  MapPin,
  X,
  User,
  Building,
  Award,
  Play,
  Globe,
  Heart
} from 'lucide-react';

// Detail Modal Component


export const YouthDashboard = () => {
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  const DetailModal = ({ item, type, onClose }) => {
    const modalRef = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
      if (item && modalRef.current) {
        modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, [item]);

    if (!item) return null;

    return (
      <div onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-[#B45309]/20">
            <h2 className="text-2xl font-bold text-[#503314] dark:text-white">
              {type === 'event' ? 'Event Details' : type === 'course' ? 'Course Details' : type === 'mentor' ? 'Mentor Profile' : 'Community Details'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6">
            {type === 'event' && (
              <div className="space-y-4">
                <div className="aspect-video rounded-lg bg-gradient-to-r from-[#B45309] to-[#7C2D12] flex items-center justify-center text-white text-xl font-semibold">
                  {item.title}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{item.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Time:</span>
                      <span className="ml-2">{item.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{item.location}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-[#F5F5F0] dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">Event Details</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.description || "Join us for an exciting event that will help you grow your skills and network with like-minded individuals."}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-[#B45309] hover:bg-[#7C2D12]">
                        <Heart className="h-4 w-4 mr-2" />
                        Register Now
                      </Button>
                      <Button variant="outline" className="border-[#B45309] text-[#B45309]">
                        <Calendar className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'course' && (
              <div className="space-y-4">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#503314] dark:text-white">{item.title}</h3>
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Instructor:</span>
                      <span className="ml-2">{item.mentor}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Students:</span>
                      <span className="ml-2">{item.students}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      <span className="font-medium">Rating:</span>
                      <span className="ml-2">{item.rating}/5.0</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-[#F5F5F0] dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">Course Description</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.description || "This comprehensive course will teach you everything you need to know to excel in this field. Perfect for beginners and intermediate learners."}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-[#B45309] hover:bg-[#7C2D12]">
                        <Play className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Button>
                      <Button variant="outline" className="border-[#B45309] text-[#B45309]">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'mentor' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full" />
                  <div>
                    <h3 className="text-2xl font-bold text-[#503314] dark:text-white">{item.name}</h3>
                    <p className="text-[#B45309] font-medium">{item.role}</p>
                    <div className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">{item.company}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Expertise:</span>
                      <span className="ml-2">{item.expertise}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      <span className="font-medium">Rating:</span>
                      <span className="ml-2">{item.rating}/5.0</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Sessions:</span>
                      <span className="ml-2">{item.sessions} completed</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-[#F5F5F0] dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">About</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.bio || "An experienced professional with years of industry experience. Passionate about mentoring the next generation of talent."}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-[#B45309] hover:bg-[#7C2D12]">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Book Session
                      </Button>
                      <Button variant="outline" className="border-[#B45309] text-[#B45309]">
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'circle' && (
              <div className="space-y-4">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#503314] dark:text-white">{item.name}</h3>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Category:</span>
                      <span className="ml-2">{item.category}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-[#B45309]" />
                      <span className="font-medium">Members:</span>
                      <span className="ml-2">{item.members}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-[#F5F5F0] dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">About This Community</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-[#B45309] hover:bg-[#7C2D12]">
                        <Users className="h-4 w-4 mr-2" />
                        Join Circle
                      </Button>
                      <Button variant="outline" className="border-[#B45309] text-[#B45309]">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Mock data
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Career Fair 2024",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      location: "Kigali Convention Centre",
      description: "Meet with top tech companies in Rwanda and explore exciting career opportunities. Network with industry professionals and discover your next career move."
    },
    {
      id: 2,
      title: "Coding Bootcamp Workshop",
      date: "Dec 18, 2024", 
      time: "10:00 AM",
      location: "Online",
      description: "Intensive hands-on workshop covering modern web development technologies. Perfect for beginners looking to start their coding journey."
    },
    {
      id: 3,
      title: "Entrepreneurship Meetup",
      date: "Dec 20, 2024",
      time: "6:00 PM", 
      location: "Impact Hub Kigali",
      description: "Connect with fellow entrepreneurs, share ideas, and learn from successful startup founders. Includes networking session and panel discussion."
    }
  ];

  const trendingCourses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      mentor: "Sarah Johnson",
      students: 245,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      description: "Learn to build modern web applications from scratch. Covers HTML, CSS, JavaScript, React, Node.js, and database management."
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      mentor: "David Mutabazi",
      students: 189,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      description: "Master digital marketing strategies including SEO, social media marketing, content marketing, and analytics to grow your business online."
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      mentor: "Grace Uwimana",
      students: 156,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      description: "Introduction to data science concepts, Python programming, statistical analysis, and machine learning basics for beginners."
    }
  ];

  const featuredMentors = [
    {
      id: 1,
      name: "Jean-Claude Nzeyimana",
      role: "Senior Software Engineer",
      company: "Google",
      expertise: "Software Development",
      rating: 4.9,
      sessions: 150,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "10+ years of experience in software development with expertise in cloud computing, microservices, and team leadership."
    },
    {
      id: 2,
      name: "Marie Uwimana",
      role: "Product Manager", 
      company: "Microsoft",
      expertise: "Product Strategy",
      rating: 4.8,
      sessions: 120,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Experienced product manager with a track record of launching successful products and leading cross-functional teams."
    },
    {
      id: 3,
      name: "Patrick Habimana",
      role: "Data Scientist",
      company: "Amazon",
      expertise: "Machine Learning",
      rating: 4.9,
      sessions: 98,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "PhD in Computer Science with specialization in AI and machine learning. Published researcher and industry expert."
    }
  ];

  const circles = [
    {
      id: 1,
      name: "Rwanda Tech Innovators",
      members: 1250,
      category: "Technology",
      description: "Connect with fellow tech enthusiasts and innovators across Rwanda. Share projects, collaborate on ideas, and stay updated with the latest tech trends.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Young Entrepreneurs Network",
      members: 890,
      category: "Business",
      description: "Build your startup with like-minded entrepreneurs. Get advice, find co-founders, and access resources to grow your business.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Digital Marketing Hub",
      members: 675,
      category: "Marketing",
      description: "Master digital marketing strategies and trends with fellow marketers. Share campaigns, learn new tools, and grow your online presence.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop"
    }
  ];

  return (
    <div className="px-4 space-y-8 pt-20">
      {/* Welcome Section */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-[#503314] dark:text-white mb-2">
          Welcome back, {user?.name || 'Jean-Paul'}!
        </h1>
        <p className="text-[#7C2D12] dark:text-gray-300">
          Ready to continue your learning journey? Here's what's happening today.
        </p>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#B45309]" />
              Upcoming Events
            </CardTitle>
          </div>
          <Link to="/events">
            <Button variant="ghost" size="sm" className="text-[#B45309]">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className="p-4 border border-[#B45309]/20 rounded-lg hover:bg-[#F5F5F0] dark:hover:bg-gray-900/80 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                onClick={() => {openModal(event, 'event')}}
              >
                <h4 className="font-semibold text-[#503314] dark:text-white mb-2">{event.title}</h4>
                <div className="space-y-1 text-sm text-[#7C2D12] dark:text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.time}
                  </div>
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </p>
                </div>
                <Button size="sm" className="mt-auto w-full bg-[#B45309] hover:bg-[#7C2D12]">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Courses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-[#B45309]" />
              Trending Courses & Mentorship
            </CardTitle>
          </div>
          <Link to="/learning">
            <Button variant="ghost" size="sm" className="text-[#B45309]">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingCourses.map((course) => (
              <div 
                key={course.id} 
                className="border group border-[#B45309]/20 rounded-lg hover:bg-[#F5F5F0] dark:hover:bg-gray-900/80 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                onClick={() => openModal(course, 'course')}
              >
                <img src={course.image} alt={course.title} className="w-full h-32 object-cover group-hover:scale-110 overflow-hidden transition-all duration-700 ease-in-out" />
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-semibold text-[#503314] dark:text-white mb-2">{course.title}</h4>
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-2">by {course.mentor}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-[#7C2D12] dark:text-gray-300">{course.students} students</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {course.rating}
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-[#B45309] hover:bg-[#7C2D12] mt-auto">
                    View Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Mentors */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#B45309]" />
              Featured Mentors
            </CardTitle>
          </div>
          <Link to="/mentors">
            <Button variant="ghost" size="sm" className="text-[#B45309]">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMentors.map((mentor) => (
              <div 
                key={mentor.id} 
                className="p-4 border border-[#B45309]/20 rounded-lg hover:bg-[#F5F5F0] dark:hover:bg-gray-900/80 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                onClick={() => openModal(mentor, 'mentor')}
              >
                <div className="flex items-center mb-3">
                  <img src={mentor.image} alt={mentor.name} className="w-12 h-12 rounded-full mr-3" />
                  <div>
                    <h4 className="font-semibold text-[#503314] dark:text-white">{mentor.name}</h4>
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300">{mentor.role}</p>
                  </div>
                </div>
                <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-2">{mentor.company}</p>
                <p className="text-sm font-medium text-[#B45309] mb-2">{mentor.expertise}</p>
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {mentor.rating}
                  </div>
                  <span className="text-[#7C2D12] dark:text-gray-300">{mentor.sessions} sessions</span>
                </div>
                <Button size="sm" className="w-full bg-[#B45309] hover:bg-[#7C2D12] mt-auto">
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Circles to Join */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-[#B45309]" />
              Circles to Join
            </CardTitle>
          </div>
          <Link to="/community">
            <Button variant="ghost" size="sm" className="text-[#B45309]">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {circles.map((circle) => (
              <div 
                key={circle.id} 
                className="border group border-[#B45309]/20 hover:bg-[#F5F5F0] dark:hover:bg-gray-900/80 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                onClick={() => openModal(circle, 'circle')}
              >
                <img src={circle.image} alt={circle.name} className="w-full h-32 object-cover group-hover:scale-110 overflow-hidden transition-all duration-700 ease-in-out" />
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-semibold text-[#503314] dark:text-white mb-2">{circle.name}</h4>
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-2">{circle.description}</p>
                  <div className="flex items-center justify-between my-3">
                    <span className="text-sm text-[#B45309] font-medium">{circle.category}</span>
                    <span className="text-sm text-[#7C2D12] dark:text-gray-300">{circle.members} members</span>
                  </div>
                  <Button size="sm" className="w-full bg-[#B45309] hover:bg-[#7C2D12] mt-auto">
                    View Circle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <DetailModal item={selectedItem} type={modalType} onClose={closeModal} />
    </div>
  );
};