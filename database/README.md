# Database Setup Instructions

## 1. Schema Setup
Run `projects_schema.sql` first to create all tables, indexes, and policies.

## 2. Seed Data Setup
Before running `projects_seed_data.sql`:

### Step 1: Get User IDs
```sql
-- In Supabase SQL Editor, run this to get user IDs:
SELECT id, email FROM auth.users LIMIT 5;
```

### Step 2: Update Seed File
Replace `'your-user-id-here'` in `projects_seed_data.sql` with actual user IDs from your auth.users table.

### Step 3: Run Seed Data
Execute `projects_seed_data.sql` in Supabase SQL Editor.

## 3. Verify Setup
```sql
-- Check projects were created
SELECT title, type, status, visibility, star_count FROM projects;

-- Check nodes were created
SELECT project_id, node_id, node_data FROM project_nodes;

-- Check connections were created
SELECT project_id, source_node, target_node FROM project_connections;
```

This will populate your projects with 10 sample public projects for testing the search functionality.