import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      // Create some test users
      server.create('user', {
        id: '1',
        name: 'John Doe',
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
    },

    routes() {
      this.namespace = 'api';

      // Sign In
      this.post('/auth/signin', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        
        const user = schema.users.findBy({ email });
        
        if (!user) {
          return new Response(400, {}, { error: 'User not found' });
        }
        
        if (user.password !== password) {
          return new Response(400, {}, { error: 'Invalid password' });
        }

        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: 'mock-jwt-token-' + user.id,
        };
      });

      // Sign Up
      this.post('/auth/signup', (schema, request) => {
        const { name, email, password, role } = JSON.parse(request.requestBody);
        
        const existingUser = schema.users.findBy({ email });
        
        if (existingUser) {
          return new Response(400, {}, { error: 'User already exists' });
        }

        const user = schema.users.create({
          name,
          email,
          password,
          role,
        });

        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: 'mock-jwt-token-' + user.id,
        };
      });

      // Get current user (for authentication check)
      this.get('/auth/me', (schema, request) => {
        const token = request.requestHeaders.Authorization?.replace('Bearer ', '');
        
        if (!token || !token.startsWith('mock-jwt-token-')) {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
        
        const userId = token.replace('mock-jwt-token-', '');
        const user = schema.users.find(userId);
        
        if (!user) {
          return new Response(401, {}, { error: 'User not found' });
        }

        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      });
    },
  });
}