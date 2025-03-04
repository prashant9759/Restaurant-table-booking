import { useState } from "react"
import {
    ArrowLeft,
    Check,
    Edit,
    Globe,
    Grid,
    Image,
    Mail,
    MapPin,
    Plus,
    Save,
    Settings,
    Trash2,
    Utensils
} from "lucide-react"

export default function SystemConfigurationPage() {
    const [activeTab, setActiveTab] = useState("global")

    // Mock data for cuisine categories
    const [cuisineCategories, setCuisineCategories] = useState([
        {
            id: 1,
            name: "Italian",
            description: "Pizza, pasta, and other Italian specialties",
            count: 124,
            subcategories: ["Pizza", "Pasta", "Seafood"]
        },
        {
            id: 2,
            name: "Asian",
            description: "Cuisine from across Asia",
            count: 215,
            subcategories: ["Chinese", "Japanese", "Thai", "Vietnamese", "Korean"]
        },
        {
            id: 3,
            name: "Mexican",
            description: "Tacos, burritos, and other Mexican dishes",
            count: 87,
            subcategories: ["Tacos", "Burritos", "Tex-Mex"]
        },
        {
            id: 4,
            name: "American",
            description: "Classic American cuisine",
            count: 156,
            subcategories: ["Burgers", "BBQ", "Southern", "Steakhouse"]
        },
        {
            id: 5,
            name: "Mediterranean",
            description: "Healthy dishes from the Mediterranean region",
            count: 92,
            subcategories: ["Greek", "Turkish", "Lebanese", "Spanish"]
        }
    ])

    // Mock data for locations
    const [locations, setLocations] = useState([
        {
            id: 1,
            city: "New York",
            state: "NY",
            areas: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
            count: 345
        },
        {
            id: 2,
            city: "Los Angeles",
            state: "CA",
            areas: ["Downtown", "Hollywood", "Santa Monica", "Venice", "Beverly Hills"],
            count: 278
        },
        {
            id: 3,
            city: "Chicago",
            state: "IL",
            areas: ["Loop", "River North", "Lincoln Park", "Wicker Park", "Hyde Park"],
            count: 187
        },
        {
            id: 4,
            city: "Miami",
            state: "FL",
            areas: ["South Beach", "Downtown", "Brickell", "Wynwood", "Coral Gables"],
            count: 156
        },
        {
            id: 5,
            city: "San Francisco",
            state: "CA",
            areas: ["SoMa", "Mission", "Marina", "North Beach", "Castro"],
            count: 203
        }
    ])

    // New cuisine category form
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
        subcategories: ""
    })

    // New location form
    const [newLocation, setNewLocation] = useState({
        city: "",
        state: "",
        areas: ""
    })

    // Handle adding a new cuisine category
    const handleAddCategory = () => {
        setCuisineCategories([
            ...cuisineCategories,
            {
                id: cuisineCategories.length + 1,
                name: newCategory.name,
                description: newCategory.description,
                count: 0,
                subcategories: newCategory.subcategories.split(",").map(s => s.trim())
            }
        ])

        // Reset form
        setNewCategory({
            name: "",
            description: "",
            subcategories: ""
        })
    }

    // Handle adding a new location
    const handleAddLocation = () => {
        setLocations([
            ...locations,
            {
                id: locations.length + 1,
                city: newLocation.city,
                state: newLocation.state,
                areas: newLocation.areas.split(",").map(a => a.trim()),
                count: 0
            }
        ])

        // Reset form
        setNewLocation({
            city: "",
            state: "",
            areas: ""
        })
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
                        <h1 className="text-xl font-bold">System Configuration</h1>
                        <div className="w-24"></div> {/* Spacer for alignment */}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-md rounded-lg border overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b">
                        <nav className="flex -mb-px">
                            <button
                                className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === "global"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                onClick={() => setActiveTab("global")}
                            >
                                <div className="flex items-center">
                                    <Settings className="h-5 w-5 mr-2" />
                                    Global Settings
                                </div>
                            </button>
                            <button
                                className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === "locations"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                onClick={() => setActiveTab("locations")}
                            >
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    Location Management
                                </div>
                            </button>
                            <button
                                className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === "cuisines"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                onClick={() => setActiveTab("cuisines")}
                            >
                                <div className="flex items-center">
                                    <Utensils className="h-5 w-5 mr-2" />
                                    Cuisine Categories
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Global Settings */}
                        {activeTab === "global" && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-lg font-medium mb-4">Site Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Site Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                defaultValue="TableTime"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Support Email
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                defaultValue="support@tabletime.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Default Currency
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                                <option value="JPY">JPY (¥)</option>
                                                <option value="CAD">CAD ($)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Default Time Zone
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                                <option value="America/New_York">Eastern Time (ET)</option>
                                                <option value="America/Chicago">Central Time (CT)</option>
                                                <option value="America/Denver">Mountain Time (MT)</option>
                                                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                                <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-medium mb-4">Branding</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Logo
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                                    <Image className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <button className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    Change
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Favicon
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                                    <Image className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <button className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    Change
                                                </button>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Primary Color
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <input
                                                    type="color"
                                                    className="h-8 w-16 p-0 border border-gray-300 rounded"
                                                    defaultValue="#3B82F6"
                                                />
                                                <input
                                                    type="text"
                                                    className="ml-2 w-24 px-3 py-2 border border-gray-300 rounded-md"
                                                    defaultValue="#3B82F6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-medium mb-4">Email Templates</h2>
                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Welcome Email</h3>
                                                    <p className="text-sm text-gray-500">Sent to new users upon registration</p>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    Edit Template
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Reservation Confirmation</h3>
                                                    <p className="text-sm text-gray-500">Sent when a reservation is confirmed</p>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    Edit Template
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Password Reset</h3>
                                                    <p className="text-sm text-gray-500">Sent when a user requests a password reset</p>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    Edit Template
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Restaurant Approval</h3>
                                                    <p className="text-sm text-gray-500">Sent when a restaurant application is approved</p>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    Edit Template
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Settings
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Location Management */}
                        {activeTab === "locations" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-medium">Locations</h2>
                                    <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Location
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {locations.map((location) => (
                                        <div key={location.id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">{location.city}, {location.state}</h3>
                                                    <p className="text-sm text-gray-500">{location.count} restaurants</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-800">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <h4 className="text-sm font-medium text-gray-700 mb-1">Areas</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {location.areas.map((area, index) => (
                                                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                                                            {area}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 border-t pt-6">
                                    <h3 className="text-md font-medium mb-4">Add New Location</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="e.g. Boston"
                                                value={newLocation.city}
                                                onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="e.g. MA"
                                                value={newLocation.state}
                                                onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Areas (comma separated)
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="e.g. Downtown, Back Bay, South End, Cambridge"
                                                value={newLocation.areas}
                                                onChange={(e) => setNewLocation({ ...newLocation, areas: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            onClick={handleAddLocation}
                                        >
                                            Add Location
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Cuisine Categories */}
                        {activeTab === "cuisines" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-medium">Cuisine Categories</h2>
                                    <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Category
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cuisineCategories.map((category) => (
                                        <div key={category.id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">{category.name}</h3>
                                                    <p className="text-sm text-gray-500">{category.description}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{category.count} restaurants</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-800">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <h4 className="text-sm font-medium text-gray-700 mb-1">Subcategories</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {category.subcategories.map((subcategory, index) => (
                                                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                                                            {subcategory}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 border-t pt-6">
                                    <h3 className="text-md font-medium mb-4">Add New Cuisine Category</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Category Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="e.g. Middle Eastern"
                                                value={newCategory.name}
                                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="e.g. Cuisine from the Middle East region"
                                                value={newCategory.description}
                                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Subcategories (comma separated)
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="e.g. Lebanese, Israeli, Turkish, Egyptian"
                                                value={newCategory.subcategories}
                                                onChange={(e) => setNewCategory({ ...newCategory, subcategories: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            onClick={handleAddCategory}
                                        >
                                            Add Category
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 border-t pt-6">
                                    <h3 className="text-md font-medium mb-4">Category Hierarchy</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Drag and drop categories to organize them hierarchically. Subcategories will be displayed under their parent categories on the website.
                                    </p>
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                        <div className="text-center text-gray-400 py-8">
                                            Hierarchy editor will be implemented here
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}