"use client"

import { useState } from "react"
import { Camera, Clock, Globe, Info, MapPin, Phone, Plus, Search, Trash2, Upload } from "lucide-react"

export default function RestaurantProfile() {
  const [activeTab, setActiveTab] = useState("basic")
  const [cuisineSearch, setCuisineSearch] = useState("")
  const [selectedCuisines, setSelectedCuisines] = useState(["Italian", "Mediterranean"])
  const [operatingHours, setOperatingHours] = useState({
    monday: { open: "11:00", close: "22:00", closed: false },
    tuesday: { open: "11:00", close: "22:00", closed: false },
    wednesday: { open: "11:00", close: "22:00", closed: false },
    thursday: { open: "11:00", close: "22:00", closed: false },
    friday: { open: "11:00", close: "23:00", closed: false },
    saturday: { open: "11:00", close: "23:00", closed: false },
    sunday: { open: "11:00", close: "22:00", closed: false },
  })

  // Mock data
  const availableCuisines = [
    "Italian",
    "Mediterranean",
    "French",
    "Japanese",
    "Chinese",
    "Indian",
    "Mexican",
    "Thai",
    "Greek",
    "Spanish",
  ]

  const features = [
    { id: "outdoor", label: "Outdoor Seating", checked: true },
    { id: "parking", label: "Parking Available", checked: true },
    { id: "wifi", label: "Free WiFi", checked: true },
    { id: "delivery", label: "Delivery", checked: false },
    { id: "takeout", label: "Takeout", checked: true },
    { id: "reservations", label: "Reservations", checked: true },
    { id: "wheelchair", label: "Wheelchair Accessible", checked: true },
    { id: "bar", label: "Full Bar", checked: true },
  ]

  const filteredCuisines = availableCuisines.filter((cuisine) =>
    cuisine.toLowerCase().includes(cuisineSearch.toLowerCase()),
  )

  const handleCuisineToggle = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine))
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine])
    }
  }

  const handleHoursChange = (day: string, field: "open" | "close" | "closed", value: string | boolean) => {
    setOperatingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold">Restaurant Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your restaurant's information and settings</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "basic" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("basic")}
            >
              Basic Information
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "features"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("features")}
            >
              Features & Services
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "seo" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("seo")}
            >
              SEO Settings
            </button>
          </div>

          {/* Basic Information */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              {/* Restaurant Photos */}
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold">Restaurant Photos</h2>
                  <p className="text-sm text-gray-500 mt-1">Add photos to showcase your restaurant</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {[1, 2, 3].map((photo) => (
                      <div key={photo} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img src="/image.png" alt={`Restaurant photo ${photo}`} className="object-cover" />
                        <button className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="h-6 w-6 text-white" />
                        </button>
                      </div>
                    ))}
                    <button className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:border-gray-400">
                      <Upload className="h-6 w-6" />
                      <span className="text-sm font-medium">Add Photo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Basic Details */}
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold">Basic Details</h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Restaurant Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        defaultValue="Italian Restaurant"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        defaultValue="Authentic Italian cuisine in a cozy atmosphere..."
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                          Website
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            id="website"
                            className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue="https://example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          defaultValue="123 Restaurant Street, City, State 12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cuisine Types */}
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold">Cuisine Types</h2>
                  <div className="mt-4 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border rounded-md"
                        placeholder="Search cuisines..."
                        value={cuisineSearch}
                        onChange={(e) => setCuisineSearch(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filteredCuisines.map((cuisine) => (
                        <button
                          key={cuisine}
                          onClick={() => handleCuisineToggle(cuisine)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedCuisines.includes(cuisine)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {cuisine}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold">Operating Hours</h2>
                  <div className="mt-4 space-y-4">
                    {Object.entries(operatingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-28">
                          <span className="text-sm font-medium capitalize">{day}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={hours.open}
                            onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                            disabled={hours.closed}
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={hours.close}
                            onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                            disabled={hours.closed}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`closed-${day}`}
                            checked={hours.closed}
                            onChange={(e) => handleHoursChange(day, "closed", e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`closed-${day}`} className="text-sm text-gray-500">
                            Closed
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features & Services */}
          {activeTab === "features" && (
            <div className="space-y-6">
              {/* Restaurant Features */}
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold">Restaurant Features</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Select the features and amenities available at your restaurant
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {features.map((feature) => (
                      <label key={feature.id} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked={feature.checked}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{feature.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Services */}
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold">Special Services</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Camera className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Private Events</h3>
                          <p className="text-sm text-gray-500">Available for private parties and events</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                        Configure
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Happy Hour</h3>
                          <p className="text-sm text-gray-500">Special discounts during specific hours</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                        Configure
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <Info className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Dietary Options</h3>
                          <p className="text-sm text-gray-500">Vegetarian, vegan, and gluten-free options</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                        Configure
                      </button>
                    </div>

                    <button className="w-full p-4 border rounded-lg border-dashed flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:border-gray-400">
                      <Plus className="h-5 w-5" />
                      <span className="text-sm font-medium">Add New Service</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === "seo" && (
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">SEO Settings</h2>
                  <p className="text-sm text-gray-500 mt-1">Optimize your restaurant's visibility in search engines</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="meta-title" className="block text-sm font-medium text-gray-700">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      id="meta-title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Italian Restaurant - Authentic Italian Cuisine in [City]"
                    />
                    <p className="mt-1 text-sm text-gray-500">Recommended length: 50-60 characters</p>
                  </div>

                  <div>
                    <label htmlFor="meta-description" className="block text-sm font-medium text-gray-700">
                      Meta Description
                    </label>
                    <textarea
                      id="meta-description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Experience authentic Italian cuisine in a cozy atmosphere. Fresh pasta, wood-fired pizzas, and extensive wine selection. Book your table today!"
                    />
                    <p className="mt-1 text-sm text-gray-500">Recommended length: 150-160 characters</p>
                  </div>

                  <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                      Keywords
                    </label>
                    <input
                      type="text"
                      id="keywords"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="italian restaurant, pasta, pizza, fine dining, [city] restaurants"
                    />
                    <p className="mt-1 text-sm text-gray-500">Separate keywords with commas</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

