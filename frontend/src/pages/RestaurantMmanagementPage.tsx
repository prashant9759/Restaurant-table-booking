import { useState } from "react"
import { 
  ArrowLeft, 
  Check, 
  ChevronDown, 
  Download, 
  Edit, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Star, 
  Trash2, 
  X 
} from "lucide-react"

export default function RestaurantManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([])
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [currentRestaurant, setCurrentRestaurant] = useState<any>(null)
  
  // Mock data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Bella Italia",
      owner: "Marco Rossi",
      email: "marco@bellaitalia.com",
      location: "New York, NY",
      cuisine: "Italian",
      status: "active",
      featured: true,
      dateJoined: "2023-01-15"
    },
    {
      id: 2,
      name: "Sushi Express",
      owner: "Yuki Tanaka",
      email: "yuki@sushiexpress.com",
      location: "Los Angeles, CA",
      cuisine: "Japanese",
      status: "active",
      featured: false,
      dateJoined: "2023-02-10"
    },
    {
      id: 3,
      name: "Taco Fiesta",
      owner: "Carlos Mendez",
      email: "carlos@tacofiesta.com",
      location: "Miami, FL",
      cuisine: "Mexican",
      status: "pending",
      featured: false,
      dateJoined: "2023-03-05"
    },
    {
      id: 4,
      name: "Burger Joint",
      owner: "John Smith",
      email: "john@burgerjoint.com",
      location: "Chicago, IL",
      cuisine: "American",
      status: "active",
      featured: true,
      dateJoined: "2023-01-20"
    },
    {
      id: 5,
      name: "Spice Garden",
      owner: "Raj Patel",
      email: "raj@spicegarden.com",
      location: "Houston, TX",
      cuisine: "Indian",
      status: "suspended",
      featured: false,
      dateJoined: "2023-02-25"
    },
    {
      id: 6,
      name: "Le Bistro",
      owner: "Pierre Dubois",
      email: "pierre@lebistro.com",
      location: "San Francisco, CA",
      cuisine: "French",
      status: "pending",
      featured: false,
      dateJoined: "2023-03-10"
    }
  ]
  
  // Filter restaurants based on search query and status filter
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || restaurant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  })
  
  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedRestaurants.length === filteredRestaurants.length) {
      setSelectedRestaurants([]);
    } else {
      setSelectedRestaurants(filteredRestaurants.map(r => r.id));
    }
  }
  
  // Handle individual selection
  const handleSelectRestaurant = (id: number) => {
    if (selectedRestaurants.includes(id)) {
      setSelectedRestaurants(selectedRestaurants.filter(r => r !== id));
    } else {
      setSelectedRestaurants([...selectedRestaurants, id]);
    }
  }
  
  // Open approval modal
  const openApprovalModal = (restaurant: any) => {
    setCurrentRestaurant(restaurant);
    setShowApprovalModal(true);
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/admin" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </a>
            <h1 className="text-xl font-bold">Restaurant Management</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg border overflow-hidden">
          {/* Header with search and filters */}
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-lg font-semibold">Restaurant List</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search restaurants..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Restaurant
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedRestaurants.length > 0 && (
            <div className="bg-blue-50 p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">{selectedRestaurants.length} restaurants selected</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-gray-300 bg-white rounded-md hover:bg-gray-50 text-sm flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Feature
                </button>
                <button className="px-3 py-1.5 border border-gray-300 bg-white rounded-md hover:bg-gray-50 text-sm flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  Approve
                </button>
                <button className="px-3 py-1.5 border border-gray-300 bg-white rounded-md hover:bg-gray-50 text-sm flex items-center gap-1">
                  <X className="h-4 w-4 text-red-500" />
                  Suspend
                </button>
                <button className="px-3 py-1.5 border border-gray-300 bg-white rounded-md hover:bg-gray-50 text-sm flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          )}
          
          {/* Restaurant Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedRestaurants.length === filteredRestaurants.length && filteredRestaurants.length > 0}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cuisine
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRestaurants.map((restaurant) => (
                  <tr key={restaurant.id} className={selectedRestaurants.includes(restaurant.id) ? "bg-blue-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedRestaurants.includes(restaurant.id)}
                          onChange={() => handleSelectRestaurant(restaurant.id)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {restaurant.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {restaurant.name}
                            {restaurant.featured && (
                              <Star className="h-4 w-4 text-yellow-500 ml-1" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{restaurant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{restaurant.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{restaurant.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{restaurant.cuisine}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        restaurant.status === 'active' ? 'bg-green-100 text-green-800' :
                        restaurant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {restaurant.dateJoined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {restaurant.status === 'pending' ? (
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => openApprovalModal(restaurant)}
                        >
                          Review
                        </button>
                      ) : (
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </button>
                      )}
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRestaurants.length}</span> of <span className="font-medium">{restaurants.length}</span> restaurants
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* Restaurant Approval Modal */}
        {showApprovalModal && currentRestaurant && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Review Restaurant Application
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Restaurant Information</h4>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Name</p>
                              <p className="text-sm">{currentRestaurant.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Cuisine</p>
                              <p className="text-sm">{currentRestaurant.cuisine}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Location</p>
                              <p className="text-sm">{currentRestaurant.location}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Date Applied</p>
                              <p className="text-sm">{currentRestaurant.dateJoined}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Owner Information</h4>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Name</p>
                              <p className="text-sm">{currentRestaurant.owner}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="text-sm">{currentRestaurant.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Additional Information</h4>
                          <div className="mt-2">
                            <p className="text-sm">
                              The restaurant has provided all required documentation including business license, 
                              health permits, and menu samples. The owner has 5+ years of experience in the industry.
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Admin Notes</h4>
                          <div className="mt-2">
                            <textarea
                              rows={3}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Add notes about this application..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowApprovalModal(false)}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Request More Info
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowApprovalModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}