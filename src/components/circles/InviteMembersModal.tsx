import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { X, Mail, Plus, Link, Copy, Check } from 'lucide-react';
import { circlesService } from '../../services/circles';

interface InviteMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId: string;
  circleName: string;
}

export const InviteMembersModal: React.FC<InviteMembersModalProps> = ({
  isOpen,
  onClose,
  circleId,
  circleName
}) => {
  const [emails, setEmails] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inviteLink, setInviteLink] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'link'>('email');

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab('email');
      setInviteLink('');
      setLinkCopied(false);
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const removeEmail = (index: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const handleInvite = async () => {
    const validEmails = emails.filter(email => email.trim() && email.includes('@'));
    if (validEmails.length === 0) return;

    setLoading(true);
    try {
      await Promise.all(
        validEmails.map(email => circlesService.inviteToCircle(circleId, email.trim()))
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setEmails(['']);
      }, 2000);
    } catch (error) {
      console.error('Error sending invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInviteLink = async () => {
    setLoading(true);
    try {
      const link = await circlesService.generateInviteLink(circleId);
      setInviteLink(link);
    } catch (error) {
      console.error('Error generating invite link:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-[#B45309]" />
              <span>Invite Members</span>
            </CardTitle>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-[#7C2D12] dark:text-gray-300">
            Invite people to join "{circleName}"
          </p>
        </CardHeader>
        
        <CardContent>
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-2">
                Invitations Sent!
              </h3>
              <p className="text-[#7C2D12] dark:text-gray-300">
                Email invitations have been sent successfully.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('email')}
                  className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'email'
                      ? 'border-[#B45309] text-[#B45309]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Invite
                </button>
                <button
                  onClick={() => setActiveTab('link')}
                  className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'link'
                      ? 'border-[#B45309] text-[#B45309]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Link className="h-4 w-4 inline mr-2" />
                  Invite Link
                </button>
              </div>

              {/* Email Tab */}
              {activeTab === 'email' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {emails.map((email, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => updateEmail(index, e.target.value)}
                          placeholder="Enter email address"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                        />
                        {emails.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeEmail(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={addEmailField}
                    className="w-full border-dashed"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add another email
                  </Button>
                  
                  <div className="flex space-x-3 pt-4">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleInvite}
                      loading={loading}
                      disabled={emails.every(email => !email.trim())}
                      className="flex-1"
                    >
                      Send Invitations
                    </Button>
                  </div>
                </div>
              )}

              {/* Link Tab */}
              {activeTab === 'link' && (
                <div className="space-y-4">
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                    Generate a shareable link that anyone can use to join this circle.
                  </p>
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Note:</strong> Email invitations are stored in the database. In a production app, actual emails would be sent.
                  </div>
                  
                  {inviteLink ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={inviteLink}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                        />
                        <Button
                          size="sm"
                          onClick={copyInviteLink}
                          className={`${linkCopied ? 'bg-green-600' : 'bg-[#B45309]'} hover:bg-[#7C2D12]`}
                        >
                          {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      {linkCopied && (
                        <p className="text-sm text-green-600">Link copied to clipboard!</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Share this link with people you want to invite to the circle.
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={generateInviteLink}
                      loading={loading}
                      className="w-full bg-[#B45309] hover:bg-[#7C2D12]"
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Generate Invite Link
                    </Button>
                  )}
                  
                  <div className="flex space-x-3 pt-4">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};