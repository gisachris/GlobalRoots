import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SearchIcon, FilterIcon, UsersIcon, CheckIcon, XIcon, MoreHorizontalIcon } from 'lucide-react';

export const AdminUsersPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Alice Uwimana',
      email: 'alice@example.com',
      role: 'mentee',
      status: 'active',
      joinDate: '2023-03-15',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 2,
      name: 'David Mugisha',
      email: 'david@example.com',
      role: 'mentor',
      status: 'pending',
      joinDate: '2023-03-10',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314] dark:text-white">User Management</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">
            Manage user accounts, verify mentors, and handle user issues
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search users..." className="input pl-10 w-full" />
            </div>
            <Button variant="outline">
              <FilterIcon className="mr-2" size={18} />
              Filters
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#503314] dark:text-white">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-[#503314] dark:text-white">User</th>
                    <th className="text-left py-3 px-4 font-medium text-[#503314] dark:text-white">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-[#503314] dark:text-white">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#503314] dark:text-white">Join Date</th>
                    <th className="text-left py-3 px-4 font-medium text-[#503314] dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium text-[#503314] dark:text-white">{user.name}</div>
                            <div className="text-sm text-[#7C2D12] dark:text-gray-300">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'mentor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#7C2D12] dark:text-gray-300">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          {user.status === 'pending' && (
                            <>
                              <Button variant="outline" size="sm">
                                <CheckIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};