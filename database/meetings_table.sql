-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  meeting_type VARCHAR(20) NOT NULL DEFAULT 'individual', -- individual, group, circle
  mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  circle_id UUID REFERENCES circles(id) ON DELETE SET NULL,
  meeting_date DATE NOT NULL,
  meeting_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  meeting_link VARCHAR(500),
  is_recurring BOOLEAN DEFAULT false,
  recurring_type VARCHAR(20), -- weekly, biweekly, monthly
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled', -- scheduled, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meeting_attendees table
CREATE TABLE IF NOT EXISTS meeting_attendees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'invited', -- invited, accepted, declined, attended
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(meeting_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_meetings_mentor_id ON meetings(mentor_id);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(meeting_date);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meeting_attendees_meeting_id ON meeting_attendees(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_attendees_user_id ON meeting_attendees(user_id);

-- Enable RLS
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_attendees ENABLE ROW LEVEL SECURITY;

-- RLS Policies for meetings
CREATE POLICY "Users can view meetings they're involved in" ON meetings
  FOR SELECT USING (
    mentor_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM meeting_attendees WHERE meeting_id = id AND user_id = auth.uid())
  );

CREATE POLICY "Mentors can create meetings" ON meetings
  FOR INSERT WITH CHECK (mentor_id = auth.uid());

CREATE POLICY "Mentors can update their meetings" ON meetings
  FOR UPDATE USING (mentor_id = auth.uid());

CREATE POLICY "Mentors can delete their meetings" ON meetings
  FOR DELETE USING (mentor_id = auth.uid());

-- RLS Policies for meeting_attendees
CREATE POLICY "Users can view attendees of meetings they're involved in" ON meeting_attendees
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM meetings WHERE meetings.id = meeting_id AND meetings.mentor_id = auth.uid())
  );

CREATE POLICY "Mentors can manage attendees of their meetings" ON meeting_attendees
  FOR ALL USING (
    EXISTS (SELECT 1 FROM meetings WHERE meetings.id = meeting_id AND meetings.mentor_id = auth.uid())
  );