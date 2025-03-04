import { useState } from "react"
import { 
  ArrowDown, 
  ArrowLeft, 
  ArrowUp, 
  BarChart3, 
  Calendar, 
  Download, 
  LineChart, 
  PieChart, 
  Users 
} from "lucide-react"

export default function AnalyticsDashboardPage() {
  const [dateRange, setDateRange] = useState("last30days")
  
  // Mock data for analytics
  const occupancyData = {
    daily: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
    weekly: [300, 310, 320, 330, 280, 290, 310],
    monthly: [1200, 1300, 1100, 1400, 1500, 1250, 1350, 1200, 1400, 1300, 1100, 1200]
  }
  
  const customerData = {
    newVsReturning: {
      new: 65,
      returning: 35
    },
    partySize: {
      '1-2': 30,
      '3-4': 45,
      '5-6': 20,
      '7+': 5
    },
    cancellationRate: 8.5
  }
  
  const revenueData = {
    tablePopularity: {
      'Standard Table': 40,
      'Booth': 30,
      'Window Table': 20,
      'Bar Seating': 10
    },
    averageRevenue: 85.50,
    projectedEarnings: 12500
  }
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </a>
            <h1 className="text-xl font-bold">Analytics Dashboard</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Restaurant Performance</h2>
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md bg-white"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Reservations</p>
                <p className="text-2xl font-bold mt-1">1,248</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-md">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 flex items-center text-sm font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                12.5%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Occupancy</p>
                <p className="text-2xl font-bold mt-1">72.3%</p>
              </div>
              <div className="p-2 bg-green-50 rounded-md">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 flex items-center text-sm font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                5.2%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Party Size</p>
                <p className="text-2xl font-bold mt-1">3.8</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-md">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-red-600 flex items-center text-sm font-medium">
                <ArrowDown className="h-3 w-3 mr-1" />
                1.3%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue per Booking</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(85.50)}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-md">
                <LineChart className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 flex items-center text-sm font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                8.7%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
            </div>
          </div>
        </div>
        
        {/* Occupancy Reports */}
        <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Occupancy Trends</h3>
          
          <div className="h-80 bg-gray-50 rounded-lg border p-4 flex items-center justify-center">
            {/* This would be a chart in a real application */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-full relative">
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-64 px-4">
                  {occupancyData.daily.map((value, index) => (
                    <div 
                      key={index} 
                      className="w-6 bg-blue-500 rounded-t"
                      style={{ height: `${value}%` }}
                    ></div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                <div className="absolute left-0 bottom-0 top-0 w-px bg-gray-300"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Peak Hours</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Friday 7:00 PM - 9:00 PM</span>
                  <span className="text-sm font-medium">92% occupancy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Saturday 7:00 PM - 9:00 PM</span>
                  <span className="text-sm font-medium">95% occupancy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sunday 12:00 PM - 2:00 PM</span>
                  <span className="text-sm font-medium">88% occupancy</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Slowest Times</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monday 2:00 PM - 5:00 PM</span>
                  <span className="text-sm font-medium">32% occupancy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tuesday 2:00 PM - 5:00 PM</span>
                  <span className="text-sm font-medium">35% occupancy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wednesday 3:00 PM - 5:00 PM</span>
                  <span className="text-sm font-medium">38% occupancy</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Table Utilization</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Window Tables</span>
                  <span className="text-sm font-medium">87% utilization</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Booths</span>
                  <span className="text-sm font-medium">82% utilization</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bar Seating</span>
                  <span className="text-sm font-medium">65% utilization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Customer Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Customer Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">New vs. Returning Customers</h4>
                <div className="h-40 flex items-center justify-center">
                  {/* This would be a pie chart in a real application */}
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-green-500"
                      style={{ 
                        clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(Math.PI * 2 * customerData.newVsReturning.new / 100)}% ${50 - 50 * Math.sin(Math.PI * 2 * customerData.newVsReturning.new / 100)}%, 50% 50%)` 
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PieChart className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">New ({customerData.newVsReturning.new}%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Returning ({customerData.newVsReturning.returning}%)</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Average Party Size</h4>
                <div className="h-40 flex items-center justify-center">
                  {/* This would be a bar chart in a real application */}
                  <div className="w-full h-32 flex items-end justify-between px-4">
                    {Object.entries(customerData.partySize).map(([size, percentage], index) => (
                      <div key={size} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-purple-500 rounded-t"
                          style={{ height: `${Number(percentage) * 2}px` }}
                        ></div>
                        <span className="text-xs mt-1">{size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Cancellation Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold text-red-600">{customerData.cancellationRate}%</div>
                  <div className="text-sm text-gray-500">Cancellation Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24h</div>
                  <div className="text-sm text-gray-500">Avg. Notice Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">42%</div>
                  <div className="text-sm text-gray-500">Same-day Cancellations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">12%</div>
                  <div className="text-sm text-gray-500">No-shows</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Revenue Insights */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Revenue Insights</h3>
            
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Table Type Popularity</h4>
              <div className="h-40 flex items-center justify-center">
                {/* This would be a horizontal bar chart in a real application */}
                <div className="w-full space-y-4">
                  {Object.entries(revenueData.tablePopularity).map(([type, percentage]) => (
                    <div key={type} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{type}</span>
                        <span>{percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Average Revenue</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold">{formatCurrency(revenueData.averageRevenue)}</div>
                    <div className="text-sm text-gray-500">Per Booking</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xl font-medium">{formatCurrency(65.75)}</div>
                      <div className="text-xs text-gray-500">Weekday Average</div>
                    </div>
                    <div>
                      <div className="text-xl font-medium">{formatCurrency(95.25)}</div>
                      <div className="text-xs text-gray-500">Weekend Average</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Projected Earnings</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold">{formatCurrency(revenueData.projectedEarnings)}</div>
                    <div className="text-sm text-gray-500">Next 30 Days</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 flex items-center text-sm font-medium">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      15.3%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">vs. previous 30 days</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Revenue by Day of Week</h4>
              <div className="h-40 flex items-end justify-between px-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${20 + (index * 10) + (index > 3 ? 30 : 0)}px` }}
                    ></div>
                    <span className="text-xs mt-1">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Export Options */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Export Reports</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium mb-2">Occupancy Report</h4>
              <p className="text-sm text-gray-500 mb-4">Download detailed occupancy data by day, week, or month.</p>
              <div className="flex justify-between">
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                  <option>CSV</option>
                  <option>PDF</option>
                  <option>Excel</option>
                </select>
                <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium mb-2">Customer Analytics</h4>
              <p className="text-sm text-gray-500 mb-4">Export customer behavior and demographics data.</p>
              <div className="flex justify-between">
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                  <option>CSV</option>
                  <option>PDF</option>
                  <option>Excel</option>
                </select>
                <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium mb-2">Revenue Report</h4>
              <p className="text-sm text-gray-500 mb-4">Download financial data and revenue projections.</p>
              <div className="flex justify-between">
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                  <option>CSV</option>
                  <option>PDF</option>
                  <option>Excel</option>
                </select>
                <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 