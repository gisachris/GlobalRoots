-- Create circles table for mentorship circles
CREATE TABLE IF NOT EXISTS circles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 10,
  duration_weeks INTEGER NOT NULL DEFAULT 8,
  meeting_days TEXT[] NOT NULL,
  meeting_time TIME NOT NULL,
  timezone VARCHAR(50) NOT NULL DEFAULT 'CAT',
  objectives TEXT[] NOT NULL,
  prerequisites TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create circle_participants table for tracking participants
CREATE TABLE IF NOT EXISTS circle_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  circle_id UUID NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, accepted, rejected
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(circle_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_circles_mentor_id ON circles(mentor_id);
CREATE INDEX IF NOT EXISTS idx_circles_category ON circles(category);
CREATE INDEX IF NOT EXISTS idx_circles_status ON circles(status);
CREATE INDEX IF NOT EXISTS idx_circle_participants_circle_id ON circle_participants(circle_id);
CREATE INDEX IF NOT EXISTS idx_circle_participants_user_id ON circle_participants(user_id);

-- Enable Row Level Security
ALTER TABLE circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for circles table
CREATE POLICY "Public circles are viewable by everyone" ON circles
  FOR SELECT USING (is_public = true OR mentor_id = auth.uid());

CREATE POLICY "Mentors can insert their own circles" ON circles
  FOR INSERT WITH CHECK (mentor_id = auth.uid());

CREATE POLICY "Mentors can update their own circles" ON circles
  FOR UPDATE USING (mentor_id = auth.uid());

CREATE POLICY "Mentors can delete their own circles" ON circles
  FOR DELETE USING (mentor_id = auth.uid());

-- RLS Policies for circle_participants table
CREATE POLICY "Circle participants are viewable by circle mentor and participants" ON circle_participants
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM circles WHERE circles.id = circle_id AND circles.mentor_id = auth.uid())
  );

CREATE POLICY "Users can join circles" ON circle_participants
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Mentors can update participant status" ON circle_participants
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM circles WHERE circles.id = circle_id AND circles.mentor_id = auth.uid())
  );