-- Add DELETE policy for meetings table
CREATE POLICY "Mentors can delete their own meetings" ON meetings
  FOR DELETE USING (mentor_id = auth.uid());