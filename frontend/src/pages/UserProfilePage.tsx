import {
    Calendar,
    ChevronLeft,
    Edit,
    Heart,
    History,
    LogOut,
    Settings,
    Trash2,
    User,
    Star,
    Eye,
    EyeOff,
} from "lucide-react"
import { useState } from "react"

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState("personal-info")
    const [editMode, setEditMode] = useState(false)
    const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)
    const [reservationTab, setReservationTab] = useState("current")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState("")

    // Profile form state
    const [profileForm, setProfileForm] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        bio: "Food enthusiast and restaurant lover. Always looking for new culinary experiences.",
    })

    // Password form state
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    // Form errors
    const [profileErrors, setProfileErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    })

    const [passwordErrors, setPasswordErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    // Notification settings
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [smsNotifications, setSmsNotifications] = useState(true)
    const [marketingNotifications, setMarketingNotifications] = useState(false)

    // Handle profile form changes
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfileForm({
            ...profileForm,
            [name]: value,
        })
    }

    // Handle password form changes
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordForm({
            ...passwordForm,
            [name]: value,
        })
    }

    // Validate profile form
    const validateProfileForm = () => {
        const errors = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        }
        let isValid = true

        if (!profileForm.firstName || profileForm.firstName.length < 2) {
            errors.firstName = "First name must be at least 2 characters"
            isValid = false
        }

        if (!profileForm.lastName || profileForm.lastName.length < 2) {
            errors.lastName = "Last name must be at least 2 characters"
            isValid = false
        }

        if (!profileForm.email) {
            errors.email = "Email is required"
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(profileForm.email)) {
            errors.email = "Please enter a valid email address"
            isValid = false
        }

        if (!profileForm.phone || profileForm.phone.length < 10) {
            errors.phone = "Please enter a valid phone number"
            isValid = false
        }

        setProfileErrors(errors)
        return isValid
    }

    // Validate password form
    const validatePasswordForm = () => {
        const errors = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
        let isValid = true

        if (!passwordForm.currentPassword) {
            errors.currentPassword = "Current password is required"
            isValid = false
        } else if (passwordForm.currentPassword.length < 8) {
            errors.currentPassword = "Password must be at least 8 characters"
            isValid = false
        }

        if (!passwordForm.newPassword) {
            errors.newPassword = "New password is required"
            isValid = false
        } else if (passwordForm.newPassword.length < 8) {
            errors.newPassword = "Password must be at least 8 characters"
            isValid = false
        }

        if (!passwordForm.confirmPassword) {
            errors.confirmPassword = "Please confirm your password"
            isValid = false
        } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
            isValid = false
        }

        setPasswordErrors(errors)
        return isValid
    }

    // Handle profile form submission
    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateProfileForm()) {
            // In a real app, you would update the profile here
            setEditMode(false)
            alert("Profile updated successfully (demo only)")
        }
    }

    // Handle password form submission
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validatePasswordForm()) {
            // In a real app, you would update the password here
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            alert("Password updated successfully (demo only)")
        }
    }

    // Handle delete account
    const handleDeleteAccount = () => {
        if (deleteConfirmation === "DELETE") {
            // In a real app, you would delete the account here
            setDeleteAccountDialog(false)
            alert("Account deleted successfully (demo only)")
        } else {
            alert("Please type DELETE to confirm")
        }
    }

    // Mock data for reservations
    const currentReservations = [
        {
            id: 1,
            restaurant: "The Italian Bistro",
            date: "March 15, 2025",
            time: "7:30 PM",
            guests: 4,
            table: "Window Table",
            image: "/placeholder.svg",
        },
        {
            id: 2,
            restaurant: "Sushi Delight",
            date: "March 20, 2025",
            time: "8:00 PM",
            guests: 2,
            table: "Private Booth",
            image: "/placeholder.svg",
        },
    ]

    const pastReservations = [
        {
            id: 3,
            restaurant: "French Corner",
            date: "February 28, 2025",
            time: "6:30 PM",
            guests: 3,
            table: "Garden View",
            image: "/placeholder.svg",
        },
        {
            id: 4,
            restaurant: "Steakhouse Prime",
            date: "February 14, 2025",
            time: "7:00 PM",
            guests: 2,
            table: "VIP Section",
            image: "/placeholder.svg",
        },
    ]

    const cancelledReservations = [
        {
            id: 5,
            restaurant: "Seafood Harbor",
            date: "March 5, 2025",
            time: "6:00 PM",
            guests: 5,
            table: "Large Group Table",
            image: "/placeholder.svg",
            reason: "Change of plans",
        },
    ]

    // Mock data for favorite restaurants
    const favoriteRestaurants = [
        {
            id: 1,
            name: "The Italian Bistro",
            cuisine: "Italian",
            rating: 4.8,
            image: "/placeholder.svg",
        },
        {
            id: 2,
            name: "Sushi Delight",
            cuisine: "Japanese",
            rating: 4.7,
            image: "/placeholder.svg",
        },
        {
            id: 3,
            name: "Steakhouse Prime",
            cuisine: "American",
            rating: 4.9,
            image: "/placeholder.svg",
        },
        {
            id: 4,
            name: "Taco Fiesta",
            cuisine: "Mexican",
            rating: 4.6,
            image: "/placeholder.svg",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
                    <a href="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Home
                    </a>
                    <div className="ml-auto">
                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                            <LogOut className="h-5 w-5" />
                            <span className="sr-only">Logout</span>
                        </button>
                    </div>
                </div>
            </header>
            <main className=" py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
                    {/* Sidebar */}
                    <aside className="hidden md:block">
                        <div className="sticky top-8 space-y-6">
                            <div className="flex flex-col items-center space-y-3 p-6 bg-white rounded-lg border">
                                <div className="relative">
                                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        <img src="/image.png" alt="Profile" width={80} height={80} className="object-cover" />
                                    </div>
                                    <button
                                        className="absolute bottom-0 right-0 rounded-full h-6 w-6 border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50"
                                        onClick={() => alert("Change profile picture (demo only)")}
                                    >
                                        <Edit className="h-3 w-3" />
                                        <span className="sr-only">Change profile picture</span>
                                    </button>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold">John Doe</h2>
                                    <p className="text-sm text-gray-500">Member since 2023</p>
                                </div>
                            </div>
                            <nav className="bg-white rounded-lg border overflow-hidden">
                                <div className="px-3 py-2 text-sm font-medium text-gray-500">Main Menu</div>
                                <div className="grid">
                                    <button
                                        className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${activeTab === "personal-info" ? "bg-gray-100 font-medium" : ""}`}
                                        onClick={() => setActiveTab("personal-info")}
                                    >
                                        <User className="h-4 w-4" />
                                        Personal Information
                                    </button>
                                    <button
                                        className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${activeTab === "reservations" ? "bg-gray-100 font-medium" : ""}`}
                                        onClick={() => setActiveTab("reservations")}
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Reservation History
                                    </button>
                                    <button
                                        className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${activeTab === "favorites" ? "bg-gray-100 font-medium" : ""}`}
                                        onClick={() => setActiveTab("favorites")}
                                    >
                                        <Heart className="h-4 w-4" />
                                        Favorite Restaurants
                                    </button>
                                    <button
                                        className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${activeTab === "settings" ? "bg-gray-100 font-medium" : ""}`}
                                        onClick={() => setActiveTab("settings")}
                                    >
                                        <Settings className="h-4 w-4" />
                                        Account Settings
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex overflow-auto py-2 px-1">
                        <div className="flex gap-2">
                            <button
                                className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 ${activeTab === "personal-info"
                                        ? "bg-blue-600 text-white"
                                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                onClick={() => setActiveTab("personal-info")}
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </button>
                            <button
                                className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 ${activeTab === "reservations"
                                        ? "bg-blue-600 text-white"
                                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                onClick={() => setActiveTab("reservations")}
                            >
                                <Calendar className="h-4 w-4" />
                                Reservations
                            </button>
                            <button
                                className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 ${activeTab === "favorites"
                                        ? "bg-blue-600 text-white"
                                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                onClick={() => setActiveTab("favorites")}
                            >
                                <Heart className="h-4 w-4" />
                                Favorites
                            </button>
                            <button
                                className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 ${activeTab === "settings"
                                        ? "bg-blue-600 text-white"
                                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                onClick={() => setActiveTab("settings")}
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Personal Information */}
                        {activeTab === "personal-info" && (
                            <div className="bg-white shadow-md rounded-lg border overflow-hidden">
                                <div className="flex flex-row items-center justify-between p-6 border-b">
                                    <div>
                                        <h2 className="text-xl font-bold">Personal Information</h2>
                                        <p className="text-sm text-gray-500">Manage your personal details</p>
                                    </div>
                                    <button
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${editMode
                                                ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                        onClick={() => setEditMode(!editMode)}
                                    >
                                        {editMode ? "Cancel" : "Edit Profile"}
                                    </button>
                                </div>
                                <div className="p-6">
                                    {editMode ? (
                                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                                        First Name
                                                    </label>
                                                    <input
                                                        id="firstName"
                                                        name="firstName"
                                                        type="text"
                                                        className={`w-full px-3 py-2 border rounded-md ${profileErrors.firstName ? "border-red-500" : "border-gray-300"
                                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                        value={profileForm.firstName}
                                                        onChange={handleProfileChange}
                                                    />
                                                    {profileErrors.firstName && (
                                                        <p className="text-red-500 text-xs mt-1">{profileErrors.firstName}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        id="lastName"
                                                        name="lastName"
                                                        type="text"
                                                        className={`w-full px-3 py-2 border rounded-md ${profileErrors.lastName ? "border-red-500" : "border-gray-300"
                                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                        value={profileForm.lastName}
                                                        onChange={handleProfileChange}
                                                    />
                                                    {profileErrors.lastName && (
                                                        <p className="text-red-500 text-xs mt-1">{profileErrors.lastName}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className={`w-full px-3 py-2 border rounded-md ${profileErrors.email ? "border-red-500" : "border-gray-300"
                                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    value={profileForm.email}
                                                    onChange={handleProfileChange}
                                                />
                                                {profileErrors.email && <p className="text-red-500 text-xs mt-1">{profileErrors.email}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    className={`w-full px-3 py-2 border rounded-md ${profileErrors.phone ? "border-red-500" : "border-gray-300"
                                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    value={profileForm.phone}
                                                    onChange={handleProfileChange}
                                                />
                                                {profileErrors.phone && <p className="text-red-500 text-xs mt-1">{profileErrors.phone}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="bio"
                                                    name="bio"
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                    value={profileForm.bio}
                                                    onChange={handleProfileChange}
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                                                    <p>{profileForm.firstName}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                                                    <p>{profileForm.lastName}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                                <p>{profileForm.email}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                                                <p>{profileForm.phone}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                                                <p>{profileForm.bio}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Reservation History */}
                        {activeTab === "reservations" && (
                            <div className="bg-white shadow-md rounded-lg border overflow-hidden">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-bold">Reservation History</h2>
                                    <p className="text-sm text-gray-500">View and manage your restaurant reservations</p>
                                </div>
                                <div className="p-6">
                                    {/* Tabs */}
                                    <div className="flex border-b mb-6">
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${reservationTab === "current"
                                                    ? "border-b-2 border-blue-600 text-blue-600"
                                                    : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            onClick={() => setReservationTab("current")}
                                        >
                                            Current
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${reservationTab === "past"
                                                    ? "border-b-2 border-blue-600 text-blue-600"
                                                    : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            onClick={() => setReservationTab("past")}
                                        >
                                            Past
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${reservationTab === "cancelled"
                                                    ? "border-b-2 border-blue-600 text-blue-600"
                                                    : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            onClick={() => setReservationTab("cancelled")}
                                        >
                                            Cancelled
                                        </button>
                                    </div>

                                    {/* Current Reservations */}
                                    {reservationTab === "current" && (
                                        <div className="space-y-4">
                                            {currentReservations.length > 0 ? (
                                                currentReservations.map((reservation) => (
                                                    <div key={reservation.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                                                        <div className="sm:w-1/4">
                                                            <img
                                                                src={reservation.image || "/placeholder.svg"}
                                                                alt={reservation.restaurant}
                                                                width={200}
                                                                height={120}
                                                                className="rounded-md object-cover w-full aspect-video"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-lg">{reservation.restaurant}</h3>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Date</p>
                                                                    <p>{reservation.date}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Time</p>
                                                                    <p>{reservation.time}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Guests</p>
                                                                    <p>{reservation.guests} people</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Table</p>
                                                                    <p>{reservation.table}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex sm:flex-col gap-2 justify-end">
                                                            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                                                                Modify
                                                            </button>
                                                            <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-8">
                                                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                                    <h3 className="mt-4 text-lg font-semibold">No Current Reservations</h3>
                                                    <p className="text-gray-500">You don't have any upcoming reservations.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Past Reservations */}
                                    {reservationTab === "past" && (
                                        <div className="space-y-4">
                                            {pastReservations.length > 0 ? (
                                                pastReservations.map((reservation) => (
                                                    <div key={reservation.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                                                        <div className="sm:w-1/4">
                                                            <img
                                                                src={reservation.image || "/placeholder.svg"}
                                                                alt={reservation.restaurant}
                                                                width={200}
                                                                height={120}
                                                                className="rounded-md object-cover w-full aspect-video"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-lg">{reservation.restaurant}</h3>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Date</p>
                                                                    <p>{reservation.date}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Time</p>
                                                                    <p>{reservation.time}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Guests</p>
                                                                    <p>{reservation.guests} people</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Table</p>
                                                                    <p>{reservation.table}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex sm:flex-col gap-2 justify-end">
                                                            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                                                                Book Again
                                                            </button>
                                                            <button className="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                                                Leave Review
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-8">
                                                    <History className="mx-auto h-12 w-12 text-gray-400" />
                                                    <h3 className="mt-4 text-lg font-semibold">No Past Reservations</h3>
                                                    <p className="text-gray-500">You don't have any past reservations.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Cancelled Reservations */}
                                    {reservationTab === "cancelled" && (
                                        <div className="space-y-4">
                                            {cancelledReservations.length > 0 ? (
                                                cancelledReservations.map((reservation) => (
                                                    <div key={reservation.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                                                        <div className="sm:w-1/4">
                                                            <img
                                                                src={reservation.image || "/placeholder.svg"}
                                                                alt={reservation.restaurant}
                                                                width={200}
                                                                height={120}
                                                                className="rounded-md object-cover w-full aspect-video"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-lg">{reservation.restaurant}</h3>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Date</p>
                                                                    <p>{reservation.date}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Time</p>
                                                                    <p>{reservation.time}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Guests</p>
                                                                    <p>{reservation.guests} people</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Reason</p>
                                                                    <p>{reservation.reason}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex sm:flex-col gap-2 justify-end">
                                                            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                                                                Book Again
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-8">
                                                    <Trash2 className="mx-auto h-12 w-12 text-gray-400" />
                                                    <h3 className="mt-4 text-lg font-semibold">No Cancelled Reservations</h3>
                                                    <p className="text-gray-500">You don't have any cancelled reservations.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Favorite Restaurants */}
                        {activeTab === "favorites" && (
                            <div className="bg-white shadow-md rounded-lg border overflow-hidden">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-bold">Favorite Restaurants</h2>
                                    <p className="text-sm text-gray-500">Your saved favorite restaurants</p>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {favoriteRestaurants.map((restaurant) => (
                                            <div key={restaurant.id} className="border rounded-lg overflow-hidden group">
                                                <div className="relative">
                                                    <img
                                                        src={restaurant.image || "/placeholder.svg"}
                                                        alt={restaurant.name}
                                                        width={300}
                                                        height={180}
                                                        className="w-full aspect-video object-cover"
                                                    />
                                                    <button
                                                        className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full"
                                                        onClick={() => alert(`Removed ${restaurant.name} from favorites (demo only)`)}
                                                    >
                                                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                                                        <span className="sr-only">Remove from favorites</span>
                                                    </button>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold">{restaurant.name}</h3>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                                            <span className="text-sm">{restaurant.rating}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex justify-between">
                                                        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                                                            View Details
                                                        </button>
                                                        <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                                            Book Table
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Account Settings */}
                        {activeTab === "settings" && (
                            <div className="space-y-6">
                                {/* Change Password */}
                                <div className="bg-white shadow-md rounded-lg border overflow-hidden">
                                    <div className="p-6 border-b">
                                        <h2 className="text-xl font-bold">Change Password</h2>
                                        <p className="text-sm text-gray-500">Update your account password</p>
                                    </div>
                                    <div className="p-6">
                                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                                    Current Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="currentPassword"
                                                        name="currentPassword"
                                                        type={showCurrentPassword ? "text" : "password"}
                                                        className={`w-full px-3 py-2 border rounded-md ${passwordErrors.currentPassword ? "border-red-500" : "border-gray-300"
                                                            } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                                                        value={passwordForm.currentPassword}
                                                        onChange={handlePasswordChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    >
                                                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                                {passwordErrors.currentPassword && (
                                                    <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="newPassword"
                                                        name="newPassword"
                                                        type={showNewPassword ? "text" : "password"}
                                                        className={`w-full px-3 py-2 border rounded-md ${passwordErrors.newPassword ? "border-red-500" : "border-gray-300"
                                                            } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                                                        value={passwordForm.newPassword}
                                                        onChange={handlePasswordChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                    >
                                                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                                {passwordErrors.newPassword && (
                                                    <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>
                                                )}
                                                <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                    Confirm New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        className={`w-full px-3 py-2 border rounded-md ${passwordErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                                                            } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                                                        value={passwordForm.confirmPassword}
                                                        onChange={handlePasswordChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                                {passwordErrors.confirmPassword && (
                                                    <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword}</p>
                                                )}
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Update Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Notification Preferences */}
                                <div className="bg-white shadow-md rounded-lg border overflow-hidden">
                                    <div className="p-6 border-b">
                                        <h2 className="text-xl font-bold">Notification Preferences</h2>
                                        <p className="text-sm text-gray-500">Manage how you receive notifications</p>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <label htmlFor="email-notifications" className="block text-sm font-medium text-gray-700">
                                                    Email Notifications
                                                </label>
                                                <p className="text-sm text-gray-500">Receive emails about your reservations and promotions</p>
                                            </div>
                                            <div className="relative inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="email-notifications"
                                                    className="sr-only"
                                                    checked={emailNotifications}
                                                    onChange={() => setEmailNotifications(!emailNotifications)}
                                                />
                                                <div
                                                    className={`w-11 h-6 rounded-full transition ${emailNotifications ? "bg-blue-600" : "bg-gray-200"
                                                        }`}
                                                >
                                                    <div
                                                        className={`transform transition w-5 h-5 rounded-full bg-white shadow-md ${emailNotifications ? "translate-x-5" : "translate-x-1"
                                                            }`}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <label htmlFor="sms-notifications" className="block text-sm font-medium text-gray-700">
                                                    SMS Notifications
                                                </label>
                                                <p className="text-sm text-gray-500">Receive text messages about your reservations</p>
                                            </div>
                                            <div className="relative inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="sms-notifications"
                                                    className="sr-only"
                                                    checked={smsNotifications}
                                                    onChange={() => setSmsNotifications(!smsNotifications)}
                                                />
                                                <div
                                                    className={`w-11 h-6 rounded-full transition ${smsNotifications ? "bg-blue-600" : "bg-gray-200"
                                                        }`}
                                                >
                                                    <div
                                                        className={`transform transition w-5 h-5 rounded-full bg-white shadow-md ${smsNotifications ? "translate-x-5" : "translate-x-1"
                                                            }`}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <label htmlFor="marketing-notifications" className="block text-sm font-medium text-gray-700">
                                                    Marketing Communications
                                                </label>
                                                <p className="text-sm text-gray-500">Receive special offers and promotions from our partners</p>
                                            </div>
                                            <div className="relative inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="marketing-notifications"
                                                    className="sr-only"
                                                    checked={marketingNotifications}
                                                    onChange={() => setMarketingNotifications(!marketingNotifications)}
                                                />
                                                <div
                                                    className={`w-11 h-6 rounded-full transition ${marketingNotifications ? "bg-blue-600" : "bg-gray-200"
                                                        }`}
                                                >
                                                    <div
                                                        className={`transform transition w-5 h-5 rounded-full bg-white shadow-md ${marketingNotifications ? "translate-x-5" : "translate-x-1"
                                                            }`}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Account */}
                                <div className="bg-white shadow-md rounded-lg border overflow-hidden">
                                    <div className="p-6 border-b">
                                        <h2 className="text-xl font-bold">Delete Account</h2>
                                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-gray-500 mb-4">
                                            Once you delete your account, there is no going back. All your data will be permanently removed.
                                        </p>
                                        <button
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            onClick={() => setDeleteAccountDialog(true)}
                                        >
                                            Delete Account
                                        </button>

                                        {/* Delete Account Dialog */}
                                        {deleteAccountDialog && (
                                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                                    </div>

                                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                                        &#8203;
                                                    </span>

                                                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                    <Trash2 className="h-6 w-6 text-red-600" />
                                                                </div>
                                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                                        Are you absolutely sure?
                                                                    </h3>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            This action cannot be undone. This will permanently delete your account and remove
                                                                            all your data from our servers.
                                                                        </p>
                                                                        <div className="mt-4">
                                                                            <label
                                                                                htmlFor="delete-confirmation"
                                                                                className="block text-sm font-medium text-gray-700"
                                                                            >
                                                                                Type "DELETE" to confirm:
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                id="delete-confirmation"
                                                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                                                value={deleteConfirmation}
                                                                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                            <button
                                                                type="button"
                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                                onClick={handleDeleteAccount}
                                                            >
                                                                Delete Account
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                onClick={() => setDeleteAccountDialog(false)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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

