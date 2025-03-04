import { useState } from "react"
import { 
  Activity, 
  AlertCircle, 
  ArrowLeft, 
  Bell, 
  Check, 
  ChevronRight, 
  Clock, 
  Database, 
  MessageSquare, 
  Plus, 
  RefreshCw, 
  Server, 
  Settings, 
  Store, 
  ThumbsUp, 
  Users 
} from "lucide-react"

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState("today")
  
  // Mock data for system overview
  const systemOverview = {
    totalRestaurants: 1248,
    totalUsers: 15782,
    activeReservations: 3421,
    systemHealth: 99.8
  }
  
  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: "restaurant_registration",
      name: "Bella Italia",
      location: "New York, NY",
      timestamp: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      type: "user_signup",
      name: "John Smith",
      email: "john.smith@example.com",
      timestamp: "3 hours ago",
      status: "verified"
    },
    {
      id: 3,
      type: "support_ticket",
      subject: "Cannot update menu items",
      restaurant: "Sushi Express",
      timestamp: "5 hours ago",
      priority: "high"
    },
    {
      id: 4,
      type: "restaurant_registration",
      name: "Taco Fiesta",
      location: "Miami, FL",
      timestamp: "6 hours ago",
      status: "pending"
    },
    {
      id: 5,
      type: "support_ticket",
      subject: "Payment processing issue",
      restaurant: "Burger Joint",
      timestamp: "8 hours ago",
      priority: "medium"
    }
  ]
  
  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: 1,
      name: "Bella Italia",
      type: "Italian",
      location: "New York, NY",
      submitted: "2023-03-15",
      status: "pending"
    },
    {
      id: 2,
      name: "Taco Fiesta",
      type: "Mexican",
      location: "Miami, FL",
      submitted: "2023-03-14",
      status: "pending"
    },
    {
      id: 3,
      name: "Sushi Delight",
      type: "Japanese",
      location: "Los Angeles, CA",
      submitted: "2023-03-13",
      status: "pending"
    }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <div className="flex items-center gap-2">
                <img src="/placeholder.svg" alt="Admin" width={32} height={32} className="rounded-full" />
                <span className="font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {/* System Overview */}
          <div>
            <h2 className="text-xl font-bold mb-4">System Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Restaurants</p>
                    <p className="text-2xl font-bold mt-1">{systemOverview.totalRestaurants}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-md">
                    <Store className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 flex items-center text-sm font-medium">
                    +24
                  </span>
                  <span className="text-xs text-gray-500 ml-2">this month</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold mt-1">{systemOverview.totalUsers}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 flex items-center text-sm font-medium">
                    +156
                  </span>
                  <span className="text-xs text-gray-500 ml-2">this month</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Reservations</p>
                    <p className="text-2xl font-bold mt-1">{systemOverview.activeReservations}</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-md">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 flex items-center text-sm font-medium">
                    +342
                  </span>
                  <span className="text-xs text-gray-500 ml-2">today</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">System Health</p>
                    <p className="text-2xl font-bold mt-1">{systemOverview.systemHealth}%</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md">
                    <Server className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 flex items-center text-sm font-medium">
                    Operational
                  </span>
                  <span className="text-xs text-gray-500 ml-2">all systems normal</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">System Activity</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="divide-y">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-md mr-4 ${
                        activity.type === 'restaurant_registration' ? 'bg-blue-50' :
                        activity.type === 'user_signup' ? 'bg-green-50' : 'bg-yellow-50'
                      }`}>
                        {activity.type === 'restaurant_registration' && <Store className={`h-5 w-5 text-blue-600`} />}
                        {activity.type === 'user_signup' && <Users className={`h-5 w-5 text-green-600`} />}
                        {activity.type === 'support_ticket' && <MessageSquare className={`h-5 w-5 text-yellow-600`} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">
                            {activity.type === 'restaurant_registration' && 'New Restaurant Registration'}
                            {activity.type === 'user_signup' && 'New User Signup'}
                            {activity.type === 'support_ticket' && 'Support Ticket'}
                          </h4>
                          <span className="text-sm text-gray-500">{activity.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.type === 'restaurant_registration' && 
                            `${activity.name} from ${activity.location} has registered.`}
                          {activity.type === 'user_signup' && 
                            `${activity.name} (${activity.email}) has signed up.`}
                          {activity.type === 'support_ticket' && 
                            `${activity.subject} from ${activity.restaurant}.`}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.type === 'restaurant_registration' && activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            activity.type === 'user_signup' && activity.status === 'verified' ? 'bg-green-100 text-green-800' :
                            activity.type === 'support_ticket' && activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {activity.type === 'restaurant_registration' && activity.status}
                            {activity.type === 'user_signup' && activity.status}
                            {activity.type === 'support_ticket' && `${activity.priority} priority`}
                          </span>
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            {activity.type === 'restaurant_registration' && 'Review'}
                            {activity.type === 'user_signup' && 'View Profile'}
                            {activity.type === 'support_ticket' && 'Respond'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending Approvals */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden lg:col-span-2">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Pending Restaurant Approvals</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Restaurant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingApprovals.map((restaurant) => (
                        <tr key={restaurant.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{restaurant.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{restaurant.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{restaurant.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{restaurant.submitted}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-green-600 hover:text-green-900 mr-3">
                              Approve
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-medium">Quick Actions</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <a href="/admin/restaurants/approve" className="block p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-50 rounded-md mr-3">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Approve Restaurants</h4>
                        <p className="text-sm text-gray-500">Review and approve pending applications</p>
                      </div>
                    </div>
                  </a>
                  
                  <a href="/admin/restaurants/featured" className="block p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-md mr-3">
                        <ThumbsUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Manage Featured</h4>
                        <p className="text-sm text-gray-500">Update featured restaurants</p>
                      </div>
                    </div>
                  </a>
                  
                  <a href="/admin/announcements" className="block p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-50 rounded-md mr-3">
                        <Bell className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">System Announcements</h4>
                        <p className="text-sm text-gray-500">Create and manage announcements</p>
                      </div>
                    </div>
                  </a>
                  
                  <a href="/admin/support" className="block p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-50 rounded-md mr-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Support Tickets</h4>
                        <p className="text-sm text-gray-500">Manage open support requests</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* System Status */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">System Status</h3>
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">API Services</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Operational</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Activity className="h-4 w-4 mr-1 text-green-500" />
                    Response time: 45ms
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Database</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Operational</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Database className="h-4 w-4 mr-1 text-green-500" />
                    Load: 32%
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Storage</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Operational</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Server className="h-4 w-4 mr-1 text-green-500" />
                    Usage: 68%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 