import { useState } from "react"
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Clock, Filter, Plus, Search, Trash2, User } from "lucide-react"

export default function ReservationManagementPage() {
    const [activeTab, setActiveTab] = useState("calendar")
    const [calendarView, setCalendarView] = useState("month")
    const [currentDate, setCurrentDate] = useState(new Date())
    const [searchQuery, setSearchQuery] = useState("")

    // Mock data for reservations
    const reservations = [
        {
            id: 1,
            customer: "John Smith",
            email: "john.smith@example.com",
            phone: "(123) 456-7890",
            date: "2025-03-15",
            time: "19:30",
            guests: 4,
            table: "T12",
            status: "confirmed",
            notes: "Birthday celebration"
        },
        {
            id: 2,
            customer: "Sarah Johnson",
            email: "sarah.j@example.com",
            phone: "(123) 456-7891",
            date: "2025-03-15",
            time: "20:00",
            guests: 2,
            table: "T5",
            status: "pending",
            notes: ""
        },
        {
            id: 3,
            customer: "Michael Brown",
            email: "michael.b@example.com",
            phone: "(123) 456-7892",
            date: "2025-03-15",
            time: "18:30",
            guests: 6,
            table: "T15",
            status: "confirmed",
            notes: "Allergic to nuts"
        },
        {
            id: 4,
            customer: "Emily Davis",
            email: "emily.d@example.com",
            phone: "(123) 456-7893",
            date: "2025-03-16",
            time: "19:00",
            guests: 3,
            table: "T8",
            status: "confirmed",
            notes: ""
        },
        {
            id: 5,
            customer: "Robert Wilson",
            email: "robert.w@example.com",
            phone: "(123) 456-7894",
            date: "2025-03-16",
            time: "20:30",
            guests: 5,
            table: "T14",
            status: "cancelled",
            notes: "Cancelled due to illness"
        }
    ]

    // Mock data for blocked time slots
    const [blockedSlots, setBlockedSlots] = useState([
        {
            id: 1,
            date: "2025-03-20",
            startTime: "18:00",
            endTime: "22:00",
            reason: "Private Event"
        },
        {
            id: 2,
            date: "2025-03-25",
            startTime: "19:00",
            endTime: "21:00",
            reason: "Staff Training"
        }
    ])

    // New blocked slot form
    const [newBlockedSlot, setNewBlockedSlot] = useState({
        date: "",
        startTime: "",
        endTime: "",
        reason: ""
    })

    // Handle adding a new blocked time slot
    const handleAddBlockedSlot = () => {
        setBlockedSlots([
            ...blockedSlots,
            {
                id: blockedSlots.length + 1,
                ...newBlockedSlot
            }
        ])

        // Reset form
        setNewBlockedSlot({
            date: "",
            startTime: "",
            endTime: "",
            reason: ""
        })
    }

    // Filter reservations based on search query
    const filteredReservations = reservations.filter(reservation =>
        reservation.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.phone.includes(searchQuery)
    )

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Get first day of month and last day of month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // Get day of week for first day (0 = Sunday, 6 = Saturday)
        const firstDayOfWeek = firstDay.getDay();

        // Calculate days from previous month to show
        const daysFromPrevMonth = firstDayOfWeek;

        // Calculate total days to show (max 42 for 6 weeks)
        const totalDays = 42;

        // Generate array of day objects
        const days = [];

        // Add days from previous month
        const prevMonth = new Date(year, month, 0);
        const prevMonthDays = prevMonth.getDate();

        for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
            days.push({
                date: new Date(year, month - 1, i),
                isCurrentMonth: false,
                hasReservations: false
            });
        }

        // Add days from current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            // Check if this day has reservations
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const hasReservations = reservations.some(r => r.date === dateString);

            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
                hasReservations
            });
        }

        // Add days from next month
        const remainingDays = totalDays - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
                hasReservations: false
            });
        }

        return days;
    }

    const calendarDays = generateCalendarDays();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <a href="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </a>
                        <h1 className="text-xl font-bold">Reservation Management</h1>
                        <div className="w-24"></div> {/* Spacer for alignment */}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-md rounded-lg border overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b">
                        <button
                            className={`px-4 py-3 text-sm font-medium ${activeTab === "calendar"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("calendar")}
                        >
                            Reservation Calendar
                        </button>
                        <button
                            className={`px-4 py-3 text-sm font-medium ${activeTab === "list"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("list")}
                        >
                            Reservation List
                        </button>
                        <button
                            className={`px-4 py-3 text-sm font-medium ${activeTab === "availability"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("availability")}
                        >
                            Availability Settings
                        </button>
                    </div>

                    {/* Reservation Calendar */}
                    {activeTab === "calendar" && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-semibold">Reservation Calendar</h2>
                                    <div className="flex border rounded-md overflow-hidden">
                                        <button
                                            className={`px-3 py-1 text-sm ${calendarView === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                            onClick={() => setCalendarView("month")}
                                        >
                                            Month
                                        </button>
                                        <button
                                            className={`px-3 py-1 text-sm ${calendarView === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                            onClick={() => setCalendarView("week")}
                                        >
                                            Week
                                        </button>
                                        <button
                                            className={`px-3 py-1 text-sm ${calendarView === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                            onClick={() => setCalendarView("day")}
                                        >
                                            Day
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="p-1 rounded-full hover:bg-gray-100"
                                        onClick={() => {
                                            const newDate = new Date(currentDate);
                                            newDate.setMonth(newDate.getMonth() - 1);
                                            setCurrentDate(newDate);
                                        }}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <span className="text-sm font-medium">
                                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button
                                        className="p-1 rounded-full hover:bg-gray-100"
                                        onClick={() => {
                                            const newDate = new Date(currentDate);
                                            newDate.setMonth(newDate.getMonth() + 1);
                                            setCurrentDate(newDate);
                                        }}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="ml-2 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => setCurrentDate(new Date())}
                                    >
                                        Today
                                    </button>
                                </div>
                            </div>

                            {/* Month View */}
                            {calendarView === "month" && (
                                <div>
                                    <div className="grid grid-cols-7 gap-px bg-gray-200">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="bg-gray-100 py-2 text-center text-sm font-medium text-gray-500">
                                                {day}
                                            </div>
                                        ))}

                                        {calendarDays.map((day, index) => (
                                            <div
                                                key={index}
                                                className={`bg-white min-h-[100px] p-2 ${!day.isCurrentMonth ? 'text-gray-400' : ''
                                                    } ${day.date.getDate() === new Date().getDate() &&
                                                        day.date.getMonth() === new Date().getMonth() &&
                                                        day.date.getFullYear() === new Date().getFullYear()
                                                        ? 'bg-blue-50'
                                                        : ''
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className="font-medium">{day.date.getDate()}</span>
                                                    {day.hasReservations && (
                                                        <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                                                    )}
                                                </div>

                                                {/* Simplified reservation indicators */}
                                                {day.isCurrentMonth && day.hasReservations && (
                                                    <div className="mt-2 space-y-1">
                                                        {reservations
                                                            .filter(r => r.date === day.date.toISOString().split('T')[0])
                                                            .slice(0, 2)
                                                            .map(reservation => (
                                                                <div
                                                                    key={reservation.id}
                                                                    className={`text-xs px-1 py-0.5 rounded ${reservation.status === 'confirmed'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : reservation.status === 'pending'
                                                                            ? 'bg-yellow-100 text-yellow-800'
                                                                            : 'bg-red-100 text-red-800'
                                                                        }`}
                                                                >
                                                                    {reservation.time} - {reservation.guests} guests
                                                                </div>
                                                            ))}

                                                        {reservations.filter(r => r.date === day.date.toISOString().split('T')[0]).length > 2 && (
                                                            <div className="text-xs text-gray-500">
                                                                +{reservations.filter(r => r.date === day.date.toISOString().split('T')[0]).length - 2} more
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Week View */}
                            {calendarView === "week" && (
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-8 border-b">
                                        <div className="p-2 border-r"></div>
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="p-2 text-center font-medium border-r last:border-r-0">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Time slots */}
                                    {Array.from({ length: 14 }).map((_, index) => {
                                        const hour = index + 10; // Start from 10 AM
                                        return (
                                            <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
                                                <div className="p-2 text-xs text-gray-500 border-r">
                                                    {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                                                </div>
                                                {Array.from({ length: 7 }).map((_, dayIndex) => (
                                                    <div key={dayIndex} className="p-1 border-r last:border-r-0 min-h-[60px]">
                                                        {/* Sample reservation */}
                                                        {Math.random() > 0.8 && (
                                                            <div className="bg-blue-100 border border-blue-300 rounded p-1 text-xs">
                                                                <div className="font-medium">Table T{Math.floor(Math.random() * 20) + 1}</div>
                                                                <div>{Math.floor(Math.random() * 6) + 1} guests</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Day View */}
                            {calendarView === "day" && (
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="p-3 bg-gray-50 border-b text-center">
                                        <h3 className="font-medium">
                                            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                        </h3>
                                    </div>

                                    {/* Time slots */}
                                    {Array.from({ length: 14 }).map((_, index) => {
                                        const hour = index + 10; // Start from 10 AM
                                        return (
                                            <div key={hour} className="flex border-b last:border-b-0">
                                                <div className="p-2 w-20 text-sm text-gray-500 border-r flex-shrink-0">
                                                    {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                                                </div>
                                                <div className="flex-1 p-2 min-h-[80px]">
                                                    {/* Sample reservations */}
                                                    {Math.random() > 0.7 && (
                                                        <div className="bg-blue-100 border border-blue-300 rounded p-2 text-sm">
                                                            <div className="font-medium">Smith Party</div>
                                                            <div className="flex justify-between text-xs">
                                                                <span>Table T{Math.floor(Math.random() * 20) + 1}</span>
                                                                <span>{Math.floor(Math.random() * 6) + 1} guests</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reservation List */}
                    {activeTab === "list" && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold">Reservation List</h2>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search reservations..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        Filter
                                    </button>
                                    <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        New Reservation
                                    </button>
                                </div>
                            </div>

                            {/* Reservations Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date & Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Party Size
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Table
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredReservations.map((reservation) => (
                                            <tr key={reservation.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <User className="h-5 w-5 text-gray-500" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{reservation.customer}</div>
                                                            <div className="text-sm text-gray-500">{reservation.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(reservation.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {reservation.time.substring(0, 5)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {reservation.guests} {reservation.guests === 1 ? 'person' : 'people'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {reservation.table}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        Edit
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredReservations.length === 0 && (
                                <div className="text-center py-12">
                                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Try adjusting your search or filter to find what you're looking for.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Availability Settings */}
                    {activeTab === "availability" && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold">Availability Settings</h2>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    Block Time Slot
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Blocked Dates/Times */}
                                <div>
                                    <h3 className="text-md font-medium mb-4">Blocked Time Slots</h3>

                                    <div className="space-y-4">
                                        {blockedSlots.map((slot) => (
                                            <div key={slot.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h4 className="font-medium">{slot.reason}</h4>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(slot.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {slot.startTime} - {slot.endTime}
                                                        </p>
                                                    </div>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {blockedSlots.length === 0 && (
                                            <div className="text-center py-8 border rounded-lg">
                                                <Clock className="mx-auto h-8 w-8 text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-500">No blocked time slots</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Add New Blocked Slot Form */}
                                    <div className="mt-6 border-t pt-6">
                                        <h3 className="text-md font-medium mb-4">Block New Time Slot</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    value={newBlockedSlot.date}
                                                    onChange={(e) => setNewBlockedSlot({ ...newBlockedSlot, date: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                                    <input
                                                        type="time"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                        value={newBlockedSlot.startTime}
                                                        onChange={(e) => setNewBlockedSlot({ ...newBlockedSlot, startTime: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                                    <input
                                                        type="time"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                        value={newBlockedSlot.endTime}
                                                        onChange={(e) => setNewBlockedSlot({ ...newBlockedSlot, endTime: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    placeholder="e.g. Private Event, Maintenance"
                                                    value={newBlockedSlot.reason}
                                                    onChange={(e) => setNewBlockedSlot({ ...newBlockedSlot, reason: e.target.value })}
                                                />
                                            </div>
                                            <button
                                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                onClick={handleAddBlockedSlot}
                                            >
                                                Block Time Slot
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Maximum Bookings Settings */}
                                <div>
                                    <h3 className="text-md font-medium mb-4">Maximum Bookings Per Time Slot</h3>

                                    <div className="border rounded-lg p-6 space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Weekdays (Monday - Thursday)</label>
                                            <div className="space-y-3">
                                                {['Lunch (11:00 AM - 3:00 PM)', 'Dinner (5:00 PM - 10:00 PM)'].map((period) => (
                                                    <div key={period} className="flex items-center justify-between">
                                                        <span className="text-sm">{period}</span>
                                                        <input
                                                            type="number"
                                                            className="w-20 px-3 py-1 border border-gray"
                                                            min="0"
                                                            defaultValue={Math.floor(Math.random() * 10) + 5}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Weekends (Friday - Sunday)</label>
                                            <div className="space-y-3">
                                                {['Lunch (11:00 AM - 3:00 PM)', 'Dinner (5:00 PM - 10:00 PM)'].map((period) => (
                                                    <div key={period} className="flex items-center justify-between">
                                                        <span className="text-sm">{period}</span>
                                                        <input
                                                            type="number"
                                                            className="w-20 px-3 py-1 border border-gray-300 rounded-md"
                                                            min="0"
                                                            defaultValue={Math.floor(Math.random() * 10) + 10}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Special Hours</label>
                                            <div className="space-y-3">
                                                {['Holiday Eve', 'Holiday'].map((period) => (
                                                    <div key={period} className="flex items-center justify-between">
                                                        <span className="text-sm">{period}</span>
                                                        <input
                                                            type="number"
                                                            className="w-20 px-3 py-1 border border-gray-300 rounded-md"
                                                            min="0"
                                                            defaultValue={Math.floor(Math.random() * 5) + 15}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                                Save Settings
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="text-md font-medium mb-4">Special Holiday Hours</h3>

                                        <div className="border rounded-lg p-6">
                                            <div className="space-y-4">
                                                {['New Year\'s Eve', 'Valentine\'s Day', 'Mother\'s Day', 'Thanksgiving', 'Christmas Eve'].map((holiday) => (
                                                    <div key={holiday} className="flex items-center justify-between pb-3 border-b last:border-b-0 last:pb-0">
                                                        <span>{holiday}</span>
                                                        <div className="flex items-center gap-2">
                                                            <select className="px-2 py-1 border border-gray-300 rounded-md text-sm">
                                                                <option>Open</option>
                                                                <option>Closed</option>
                                                                <option>Special Hours</option>
                                                            </select>
                                                            <input
                                                                type="time"
                                                                className="w-32 px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                                defaultValue="17:00"
                                                            />
                                                            <span className="text-sm">to</span>
                                                            <input
                                                                type="time"
                                                                className="w-32 px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                                defaultValue="23:00"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 pt-4 border-t">
                                                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                                    Save Holiday Hours
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}