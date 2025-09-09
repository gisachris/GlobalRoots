-- Drop existing policies
DROP POLICY IF EXISTS "Mentors can manage attendees of their meetings" ON meeting_attendees;

-- Create new policies for meeting_attendees
CREATE POLICY "Mentors can insert attendees for their meetings" ON meeting_attendees
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM meetings WHERE meetings.id = meeting_id AND meetings.mentor_id = auth.uid())
  );

CREATE POLICY "Mentors can update attendees for their meetings" ON meeting_attendees
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM meetings WHERE meetings.id = meeting_id AND meetings.mentor_id = auth.uid())
  );

CREATE POLICY "Mentors can delete attendees for their meetings" ON meeting_attendees
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM meetings WHERE meetings.id = meeting_id AND meetings.mentor_id = auth.uid())
  );