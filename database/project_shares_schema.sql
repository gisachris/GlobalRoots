-- Project Shares Table for Circle Sharing
CREATE TABLE project_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  circle_id UUID REFERENCES circles(id) ON DELETE CASCADE,
  shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, circle_id, shared_by)
);

-- Indexes
CREATE INDEX idx_project_shares_project_id ON project_shares(project_id);
CREATE INDEX idx_project_shares_circle_id ON project_shares(circle_id);
CREATE INDEX idx_project_shares_shared_by ON project_shares(shared_by);
CREATE INDEX idx_project_shares_created_at ON project_shares(created_at DESC);

-- Enable RLS
ALTER TABLE project_shares ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view shares in their circles" ON project_shares
  FOR SELECT USING (
    circle_id IN (
      SELECT id FROM circles 
      WHERE creator_id = auth.uid() 
         OR id IN (
           SELECT circle_id FROM circle_members 
           WHERE user_id = auth.uid()
         )
    )
  );

CREATE POLICY "Users can create shares" ON project_shares
  FOR INSERT WITH CHECK (shared_by = auth.uid());

CREATE POLICY "Users can delete their own shares" ON project_shares
  FOR DELETE USING (shared_by = auth.uid());