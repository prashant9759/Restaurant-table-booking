import { useState } from "react"
import { ArrowLeft, Edit, Grid, Layout, Plus, Save, Trash2, Users } from "lucide-react"

export default function TableManagementPage() {
  const [activeTab, setActiveTab] = useState("table-types")
  const [editMode, setEditMode] = useState(false)
  
  // Mock data for table types
  const [tableTypes, setTableTypes] = useState([
    {
      id: 1,
      name: "Standard Table",
      capacity: 4,
      shape: "rectangle",
      features: ["window view"],
      price: 0,
      image: "/image.png"
    },
    {
      id: 2,
      name: "Booth",
      capacity: 6,
      shape: "rectangle",
      features: ["private", "cushioned"],
      price: 10,
      image: "/image.png"
    },
    {
      id: 3,
      name: "Bar Seating",
      capacity: 2,
      shape: "square",
      features: ["bar view"],
      price: 0,
      image: "/image.png"
    }
  ])
  
  // Mock data for individual tables
  const [tables, setTables] = useState([
    {
      id: 1,
      number: "T1",
      typeId: 1,
      status: "active",
      position: { x: 100, y: 100 }
    },
    {
      id: 2,
      number: "T2",
      typeId: 1,
      status: "active",
      position: { x: 200, y: 100 }
    },
    {
      id: 3,
      number: "B1",
      typeId: 2,
      status: "active",
      position: { x: 100, y: 200 }
    },
    {
      id: 4,
      number: "BAR1",
      typeId: 3,
      status: "active",
      position: { x: 300, y: 100 }
    }
  ])
  
  // New table type form
  const [newTableType, setNewTableType] = useState({
    name: "",
    capacity: 2,
    shape: "rectangle",
    features: [],
    price: 0,
    image: "/placeholder.svg"
  })
  
  // New table form
  const [newTable, setNewTable] = useState({
    number: "",
    typeId: 1,
    status: "active"
  })
  
  // Handle adding a new table type
  const handleAddTableType = () => {
    setTableTypes([
      ...tableTypes,
      {
        id: tableTypes.length + 1,
        ...newTableType
      }
    ])
    
    // Reset form
    setNewTableType({
      name: "",
      capacity: 2,
      shape: "rectangle",
      features: [],
      price: 0,
      image: "/placeholder.svg"
    })
  }
  
  // Handle adding a new table
  const handleAddTable = () => {
    setTables([
      ...tables,
      {
        id: tables.length + 1,
        ...newTable,
        position: { x: 100, y: 100 }
      }
    ])
    
    // Reset form
    setNewTable({
      number: "",
      typeId: 1,
      status: "active"
    })
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
            <h1 className="text-xl font-bold">Table Management</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg border overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "table-types"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("table-types")}
            >
              Table Types
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "tables"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("tables")}
            >
              Individual Tables
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "floor-plan"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("floor-plan")}
            >
              Floor Plan Editor
            </button>
          </div>
          
          {/* Table Types */}
          {activeTab === "table-types" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Table Types Configuration</h2>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {editMode ? "Save Changes" : "Edit Table Types"}
                </button>
              </div>
              
              {/* Table Types List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {tableTypes.map((type) => (
                  <div key={type.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-100">
                      <img src={type.image} alt={type.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{type.name}</h3>
                        {editMode && (
                          <button className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <p><span className="text-gray-500">Capacity:</span> {type.capacity} people</p>
                        <p><span className="text-gray-500">Shape:</span> {type.shape}</p>
                        <p><span className="text-gray-500">Features:</span> {type.features.join(", ")}</p>
                        {type.price > 0 && (
                          <p><span className="text-gray-500">Additional Price:</span> ${type.price}</p>
                        )}
                      </div>
                      {editMode && (
                        <button className="mt-3 w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                          Edit Details
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Add New Table Type Card */}
                {editMode && (
                  <div className="border rounded-lg overflow-hidden border-dashed">
                    <div className="p-4 h-full flex flex-col">
                      <h3 className="font-semibold mb-4">Add New Table Type</h3>
                      <div className="space-y-3 flex-grow">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTableType.name}
                            onChange={(e) => setNewTableType({...newTableType, name: e.target.value})}
                            placeholder="e.g. Window Table"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTableType.capacity}
                            onChange={(e) => setNewTableType({...newTableType, capacity: parseInt(e.target.value)})}
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTableType.shape}
                            onChange={(e) => setNewTableType({...newTableType, shape: e.target.value})}
                          >
                            <option value="rectangle">Rectangle</option>
                            <option value="square">Square</option>
                            <option value="circle">Circle</option>
                            <option value="oval">Oval</option>
                          </select>
                        </div>
                      </div>
                      <button
                        className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                        onClick={handleAddTableType}
                      >
                        <Plus className="h-4 w-4" />
                        Add Table Type
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Individual Tables */}
          {activeTab === "tables" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Individual Table Setup</h2>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {editMode ? "Save Changes" : "Edit Tables"}
                </button>
              </div>
              
              {/* Tables List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Table Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      {editMode && (
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tables.map((table) => {
                      const tableType = tableTypes.find(t => t.id === table.typeId);
                      return (
                        <tr key={table.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {table.number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tableType?.name || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tableType?.capacity || 0} people
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              table.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {table.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          {editMode && (
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Add New Table Form */}
              {editMode && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Add New Table</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newTable.number}
                        onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                        placeholder="e.g. T5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Table Type</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newTable.typeId}
                        onChange={(e) => setNewTable({...newTable, typeId: parseInt(e.target.value)})}
                      >
                        {tableTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newTable.status}
                        onChange={(e) => setNewTable({...newTable, status: e.target.value})}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                      onClick={handleAddTable}
                    >
                      <Plus className="h-4 w-4" />
                      Add Table
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Floor Plan Editor */}
          {activeTab === "floor-plan" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Floor Plan Editor</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Show Grid
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Layout
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Table Palette */}
                <div className="md:w-64 bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-medium mb-3">Table Types</h3>
                  <div className="space-y-3">
                    {tableTypes.map(type => (
                      <div key={type.id} className="p-2 bg-white rounded border cursor-move hover:bg-blue-50">
                        <div className="flex items-center gap-2">
                          <Layout className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{type.name}</p>
                            <p className="text-xs text-gray-500">{type.capacity} people</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Floor Elements</h3>
                    <div className="space-y-3">
                      <div className="p-2 bg-white rounded border cursor-move hover:bg-blue-50">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 bg-gray-300 rounded" />
                          <p>Wall</p>
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded border cursor-move hover:bg-blue-50">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 bg-gray-300 rounded-full" />
                          <p>Pillar</p>
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded border cursor-move hover:bg-blue-50">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 border-2 border-gray-300 rounded" />
                          <p>Door</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floor Plan Canvas */}
                <div className="flex-1 bg-white border rounded-lg overflow-hidden">
                  <div className="h-96 md:h-[600px] bg-gray-50 relative">
                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0.5 opacity-10">
                      {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="bg-gray-400"></div>
                      ))}
                    </div>
                    
                    {/* Sample tables on the floor plan */}
                    {tables.map(table => {
                      const type = tableTypes.find(t => t.id === table.typeId);
                      return (
                        <div 
                          key={table.id}
                          className="absolute bg-blue-100 border-2 border-blue-600 rounded flex items-center justify-center cursor-move"
                          style={{
                            left: `${table.position.x}px`,
                            top: `${table.position.y}px`,
                            width: type?.shape === 'circle' ? '80px' : '100px',
                            height: type?.shape === 'circle' ? '80px' : (type?.shape === 'square' ? '100px' : '60px'),
                            borderRadius: type?.shape === 'circle' ? '50%' : '4px'
                          }}
                        >
                          <div className="text-center">
                            <p className="font-bold text-blue-800">{table.number}</p>
                            <p className="text-xs text-blue-600">{type?.capacity || 0}</p>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Placeholder text when empty */}
                    {tables.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-400">Drag and drop tables from the palette to create your floor plan</p>
                      </div>
                    )}
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