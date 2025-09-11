import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      user: Model,
      event: Model,
      course: Model,
      mentor: Model,
      circle: Model,
    },

    seeds(server) {
      // Create some test users
      server.create('user', {
        id: '1',
        name: 'John Doe',
        image:"https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        email: 'john@example.com',
        password: 'password123',
        role: 'youth',
      });
      server.create('user', {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'diaspora',
      });

      // Create events
      server.create('event', {
        id: '1',
        title: 'Tech Career Fair 2024',
        date: 'Dec 15, 2024',
        time: '2:00 PM',
        location: 'Kigali Convention Centre'
      });
      server.create('event', {
        id: '2',
        title: 'Coding Bootcamp Workshop',
        date: 'Dec 18, 2024',
        time: '10:00 AM',
        location: 'Online'
      });
      server.create('event', {
        id: '3',
        title: 'Entrepreneurship Meetup',
        date: 'Dec 20, 2024',
        time: '6:00 PM',
        location: 'Impact Hub Kigali'
      });

      // Create courses
      server.create('course', {
        id: '1',
        title: 'Full Stack Web Development',
        mentor: 'Sarah Johnson',
        students: 245,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'
      });
      server.create('course', {
        id: '2',
        title: 'Digital Marketing Mastery',
        mentor: 'David Mutabazi',
        students: 189,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
      });
      server.create('course', {
        id: '3',
        title: 'Data Science Fundamentals',
        mentor: 'Grace Uwimana',
        students: 156,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
      });

      // Create mentors
      server.create('mentor', {
        id: '1',
        name: 'Jean-Claude Nzeyimana',
        role: 'Senior Software Engineer',
        company: 'Google',
        expertise: 'Software Development',
        rating: 4.9,
        sessions: 150,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      });
      server.create('mentor', {
        id: '2',
        name: 'Marie Uwimana',
        role: 'Product Manager',
        company: 'Microsoft',
        expertise: 'Product Strategy',
        rating: 4.8,
        sessions: 120,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      });
      server.create('mentor', {
        id: '3',
        name: 'Patrick Habimana',
        role: 'Data Scientist',
        company: 'Amazon',
        expertise: 'Machine Learning',
        rating: 4.9,
        sessions: 98,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      });

      // Create circles
      server.create('circle', {
        id: '1',
        name: 'Rwanda Tech Innovators',
        members: 1250,
        category: 'Technology',
        description: 'Connect with fellow tech enthusiasts and innovators',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop'
      });
      server.create('circle', {
        id: '2',
        name: 'Young Entrepreneurs Network',
        members: 890,
        category: 'Business',
        description: 'Build your startup with like-minded entrepreneurs',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop'
      });
      server.create('circle', {
        id: '3',
        name: 'Digital Marketing Hub',
        members: 675,
        category: 'Marketing',
        description: 'Master digital marketing strategies and trends',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop'
      });
    },

    routes() {
      this.namespace = 'api';
      
      // Let Supabase handle all auth requests by not intercepting them
      this.passthrough('https://**.supabase.co/**');
      this.passthrough((request) => {
        return request.url.includes('supabase.co');
      });

      // API endpoints for youth dashboard data
      this.get('/events', (schema) => {
        return schema.events.all();
      });

      this.get('/courses', (schema) => {
        return schema.courses.all();
      });

      this.get('/mentors', (schema) => {
        return schema.mentors.all();
      });

      this.get('/circles', (schema) => {
        return schema.circles.all();
      });
    },
  });
}