"use client"

import { useState } from "react"
import { Bell, Calendar, ChevronDown, Clock, DollarSign, MessageSquare, Users } from "lucide-react"

export default function OwenerDashboard() {
  const [period, setPeriod] = useState("today")

  // Mock data
  const statistics = {
    today: {
      totalReservations: 45,
      occupancyRate: 78,
      revenue: 2850,
      popularTime: "7:00 PM",
    },
    week: {
      totalReservations: 312,
      occupancyRate: 82,
      revenue: 19750,
      popularTime: "8:00 PM",
    },
    month: {
      totalReservations: 1280,
      occupancyRate: 75,
      revenue: 82400,
      popularTime: "7:30 PM",
    },
  }

  const upcomingReservations = [
    {
      id: 1,
      customer: "John Smith",
      time: "12:30 PM",
      guests: 4,
      table: "T12",
      status: "confirmed",
      contact: "+1 234-567-8900",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      time: "1:00 PM",
      guests: 2,
      table: "T5",
      status: "pending",
      contact: "+1 234-567-8901",
    },
    {
      id: 3,
      customer: "Michael Brown",
      time: "1:30 PM",
      guests: 6,
      table: "T15",
      status: "confirmed",
      contact: "+1 234-567-8902",
    },
  ]

  const alerts = [
    {
      id: 1,
      type: "new_booking",
      message: "New reservation for 4 people at 7:00 PM",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "cancellation",
      message: "Cancellation for Table 7 at 6:30 PM",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "special_request",
      message: "Special dietary requirements for Table 12",
      time: "1 hour ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <div className="flex items-center gap-2">
                <img src="/image.png" alt="Restaurant logo" width={32} height={32} className="rounded-full" />
                <span className="font-medium">Italian Restaurant</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Navigation Cards for New Pages */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <a href="/table-management" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Table Management</h3>
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Configure table types, manage individual tables, and design your floor plan.</p>
            </a>
            
            <a href="/reservation-management" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Reservation Management</h3>
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500">View and manage reservations, set availability, and handle customer bookings.</p>
            </a>
            
            <a href="/analytics" className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
                <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500">View occupancy reports, customer analytics, and revenue insights.</p>
            </a>
          </div>
          
          {/* Period Selector */}
          <div className="flex justify-end">
            <div className="inline-flex rounded-lg border bg-white p-1">
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  period === "today" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setPeriod("today")}
              >
                Today
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  period === "week" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setPeriod("week")}
              >
                This Week
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  period === "month" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setPeriod("month")}
              >
                This Month
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Reservations</p>
                  <p className="text-2xl font-semibold mt-1">{statistics[period as keyof typeof statistics].totalReservations}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-blue-100 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                  <p className="text-2xl font-semibold mt-1">{statistics[period as keyof typeof statistics].occupancyRate}%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-green-100 rounded-full">
                  <div
                    className="h-2 bg-green-600 rounded-full"
                    style={{ width: `${statistics[period as keyof typeof statistics].occupancyRate}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Revenue</p>
                  <p className="text-2xl font-semibold mt-1">${statistics[period as keyof typeof statistics].revenue}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-purple-100 rounded-full">
                  <div className="h-2 bg-purple-600 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Popular Time</p>
                  <p className="text-2xl font-semibold mt-1">{statistics[period as keyof typeof statistics].popularTime}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-orange-100 rounded-full">
                  <div className="h-2 bg-orange-600 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upcoming Reservations */}
            <div className="bg-white rounded-lg border">
              <div className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Upcoming Reservations</h2>
                  <a href="/owner/reservations" className="text-sm text-blue-600 hover:text-blue-700">
                    View all
                  </a>
                </div>
              </div>
              <div className="divide-y">
                {upcomingReservations.map((reservation) => (
                  <div key={reservation.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{reservation.customer}</p>
                          <p className="text-sm text-gray-500">
                            {reservation.guests} guests • Table {reservation.table}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{reservation.time}</p>
                        <p
                          className={`text-sm ${
                            reservation.status === "confirmed" ? "text-green-600" : "text-orange-600"
                          }`}
                        >
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Alerts */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="font-semibold mb-4">Quick Actions</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Calendar className="h-5 w-5" />
                    Add Special Offer
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Clock className="h-5 w-5" />
                    Block Time Slot
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <MessageSquare className="h-5 w-5" />
                    Message Customers
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Users className="h-5 w-5" />
                    Update Capacity
                  </button>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-lg border">
                <div className="px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Recent Alerts</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700">Mark all as read</button>
                  </div>
                </div>
                <div className="divide-y">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="px-6 py-4 flex items-start gap-4">
                      <div
                        className={`h-2 w-2 mt-2 rounded-full ${
                          alert.type === "new_booking"
                            ? "bg-green-500"
                            : alert.type === "cancellation"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <ChevronDown className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

