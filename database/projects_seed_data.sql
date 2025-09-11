-- Projects Seed Data
-- Note: Replace 'your-user-id-here' with actual user IDs from your auth.users table

-- Sample public projects
INSERT INTO projects (id, creator_id, title, description, type, status, visibility, star_count, view_count, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', '4d322c31-9010-4131-80a1-eccc71a27666', 'AgriTech Mobile Platform', 'A comprehensive mobile application connecting farmers with real-time market data, weather forecasts, and agricultural best practices. Features include crop price tracking, weather alerts, and community forums for knowledge sharing.', 'project', 'published', 'public', 45, 234, NOW() - INTERVAL '15 days', NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440002', '4d322c31-9010-4131-80a1-eccc71a27666', 'Smart Water Quality Monitor', 'IoT-based water quality monitoring system for rural communities. Uses sensors to detect pH, turbidity, and contamination levels, sending real-time alerts to community health workers via SMS and mobile app.', 'innovation', 'published', 'public', 67, 189, NOW() - INTERVAL '12 days', NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440003', '4d322c31-9010-4131-80a1-eccc71a27666', 'Digital Marketplace for Artisans', 'E-commerce platform specifically designed for Rwandan artisans to showcase and sell their handcrafted products globally. Features include multi-language support, mobile money integration, and logistics coordination.', 'project', 'published', 'public', 32, 156, NOW() - INTERVAL '20 days', NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440004', '4d322c31-9010-4131-80a1-eccc71a27666', 'AI-Powered Crop Disease Detection', 'Machine learning application that uses computer vision to identify crop diseases from smartphone photos. Provides treatment recommendations and connects farmers with agricultural experts for consultation.', 'innovation', 'published', 'public', 89, 312, NOW() - INTERVAL '8 days', NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440005', '4d322c31-9010-4131-80a1-eccc71a27666', 'Community Health Tracker', 'Mobile health platform for tracking community health metrics, vaccination schedules, and disease outbreaks. Enables health workers to manage patient records and coordinate with regional health centers.', 'project', 'published', 'public', 23, 98, NOW() - INTERVAL '25 days', NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440006', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e', 'Renewable Energy Calculator', 'Web application that calculates optimal renewable energy solutions for homes and businesses. Considers local weather patterns, energy consumption, and budget constraints to recommend solar, wind, or hybrid systems.', 'innovation', 'published', 'public', 41, 167, NOW() - INTERVAL '18 days', NOW() - INTERVAL '4 days'),

('550e8400-e29b-41d4-a716-446655440007', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e', 'EdTech Learning Management System', 'Comprehensive digital learning platform for Rwandan schools. Features include offline content sync, progress tracking, interactive assessments, and parent-teacher communication tools.', 'project', 'published', 'public', 56, 203, NOW() - INTERVAL '30 days', NOW() - INTERVAL '6 days'),

('550e8400-e29b-41d4-a716-446655440008', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e', 'Waste Management Optimization', 'Smart waste collection system using IoT sensors and route optimization algorithms. Helps municipalities reduce collection costs and improve recycling rates through data-driven insights.', 'innovation', 'published', 'public', 38, 142, NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440009', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e', 'Tourism Guide Mobile App', 'Interactive mobile guide for tourists visiting Rwanda. Features GPS navigation, cultural information, local business directory, and augmented reality experiences at historical sites.', 'project', 'published', 'public', 29, 87, NOW() - INTERVAL '22 days', NOW() - INTERVAL '7 days'),

('550e8400-e29b-41d4-a716-446655440010', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e', 'Blockchain Supply Chain Tracker', 'Blockchain-based system for tracking agricultural products from farm to market. Ensures transparency, reduces fraud, and enables fair trade certification for smallholder farmers.', 'innovation', 'published', 'public', 72, 245, NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day');

-- Sample project nodes for a few projects
INSERT INTO project_nodes (project_id, node_id, node_type, position, node_data) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'node-1', 'custom', '{"x": 100, "y": 100}', '{"label": "Mobile App"}'),
('550e8400-e29b-41d4-a716-446655440001', 'node-2', 'custom', '{"x": 300, "y": 100}', '{"label": "API Gateway"}'),
('550e8400-e29b-41d4-a716-446655440001', 'node-3', 'custom', '{"x": 500, "y": 100}', '{"label": "Database"}'),
('550e8400-e29b-41d4-a716-446655440001', 'node-4', 'custom', '{"x": 200, "y": 250}', '{"label": "Weather Service"}'),

('550e8400-e29b-41d4-a716-446655440002', 'node-1', 'custom', '{"x": 150, "y": 80}', '{"label": "IoT Sensors"}'),
('550e8400-e29b-41d4-a716-446655440002', 'node-2', 'custom', '{"x": 350, "y": 80}', '{"label": "Data Processing"}'),
('550e8400-e29b-41d4-a716-446655440002', 'node-3', 'custom', '{"x": 550, "y": 80}', '{"label": "Alert System"}');

-- Sample project connections
INSERT INTO project_connections (project_id, edge_id, source_node, target_node) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'edge-1', 'node-1', 'node-2'),
('550e8400-e29b-41d4-a716-446655440001', 'edge-2', 'node-2', 'node-3'),
('550e8400-e29b-41d4-a716-446655440001', 'edge-3', 'node-2', 'node-4'),

('550e8400-e29b-41d4-a716-446655440002', 'edge-1', 'node-1', 'node-2'),
('550e8400-e29b-41d4-a716-446655440002', 'edge-2', 'node-2', 'node-3');

-- Sample project stars (innovations only)
INSERT INTO project_stars (project_id, user_id) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e'),
('550e8400-e29b-41d4-a716-446655440004', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e'),
('550e8400-e29b-41d4-a716-446655440006', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e'),
('550e8400-e29b-41d4-a716-446655440008', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e'),
('550e8400-e29b-41d4-a716-446655440010', 'e8a196e0-8bff-4714-b0e6-f26b7169cc8e');