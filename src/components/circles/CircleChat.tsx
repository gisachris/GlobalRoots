import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { MessageList } from '../messaging/MessageList';
import { MessageInput } from '../messaging/MessageInput';
import { InviteMembersModal } from './InviteMembersModal';
import { useMessaging } from '../../context/MessagingContext';
import { useAuth } from '../../context/AuthContext';
import { Users, Settings, MoreVertical, UserPlus } from 'lucide-react';

interface CircleChatProps {
  circleId: string;
  circleName: string;
  memberCount?: number;
  onShowMembers?: () => void;
  onShowSettings?: () => void;
}

export const CircleChat: React.FC<CircleChatProps> = ({
  circleId,
  circleName,
  memberCount = 0,
  onShowMembers,
  onShowSettings
}) => {
  const { state, sendMessage, loadMessages } = useMessaging();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const messages = state.messages[circleId] || [];

  useEffect(() => {
    if (circleId) {
      loadMessages(circleId);
    }
  }, [circleId]);

  const handleSendMessage = async (content: string) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await sendMessage(content, circleId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      {/* Chat Header */}
      <CardHeader className="border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#B45309] rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#503314] dark:text-white">{circleName}</h3>
              <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                {memberCount} member{memberCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowInviteModal(true)}
              className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
            {onShowMembers && (
              <Button size="sm" variant="outline" onClick={onShowMembers}>
                <Users className="h-4 w-4" />
              </Button>
            )}
            {onShowSettings && (
              <Button size="sm" variant="outline" onClick={onShowSettings}>
                <Settings className="h-4 w-4" />
              </Button>
            )}
            <Button size="sm" variant="outline">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <MessageList
        messages={messages}
        currentUserId={user?.id || ''}
        loading={state.loading}
      />

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder={`Message ${circleName}...`}
        />
      </div>
      
      <InviteMembersModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        circleId={circleId}
        circleName={circleName}
      />
    </Card>
  );
};