import React, { useState, useCallback } from "react";
import { Layout, Model, TabNode } from "flexlayout-react";
import type { IJsonModel } from "flexlayout-react";
import { DataGrid } from "react-data-grid";
import type { Column } from "react-data-grid";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
} from "@repo/ui";
import "flexlayout-react/style/light.css";
import "react-data-grid/lib/styles.css";

export default function WorkspaceRoute() {
  // State for header controls
  const [currentLayout, setCurrentLayout] = useState("default");
  const [model, setModel] = useState<Model | null>(null);
  
  // Sample data for different grids
  const projectsData = [
    { id: 1, name: "Website Redesign", status: "In Progress", priority: "High", assignee: "John Doe", dueDate: "2024-04-15", progress: 75 },
    { id: 2, name: "Mobile App", status: "Planning", priority: "Medium", assignee: "Jane Smith", dueDate: "2024-05-01", progress: 25 },
    { id: 3, name: "API Integration", status: "Completed", priority: "High", assignee: "Mike Johnson", dueDate: "2024-03-30", progress: 100 },
    { id: 4, name: "Database Migration", status: "In Progress", priority: "Critical", assignee: "Sarah Wilson", dueDate: "2024-04-10", progress: 60 },
    { id: 5, name: "Security Audit", status: "Pending", priority: "Medium", assignee: "Tom Brown", dueDate: "2024-04-20", progress: 0 },
    { id: 6, name: "Performance Optimization", status: "In Progress", priority: "High", assignee: "Lisa Davis", dueDate: "2024-04-25", progress: 40 },
  ];

  const analyticsData = [
    { metric: "Page Views", today: 1234, yesterday: 1156, change: "+6.7%", trend: "↗️" },
    { metric: "Unique Visitors", today: 891, yesterday: 823, change: "+8.3%", trend: "↗️" },
    { metric: "Bounce Rate", today: 23.4, yesterday: 25.1, change: "-6.8%", trend: "↘️" },
    { metric: "Session Duration", today: 245, yesterday: 238, change: "+2.9%", trend: "↗️" },
    { metric: "Conversion Rate", today: 3.2, yesterday: 2.9, change: "+10.3%", trend: "↗️" },
    { metric: "Revenue", today: 5420, yesterday: 4980, change: "+8.8%", trend: "↗️" },
  ];

  const reportsData = [
    { id: 1, name: "Monthly Performance Report", type: "Performance", status: "Published", generated: "2024-03-15", size: "2.3 MB", downloads: 45 },
    { id: 2, name: "User Engagement Analysis", type: "Analytics", status: "Draft", generated: "2024-03-14", size: "1.8 MB", downloads: 23 },
    { id: 3, name: "Revenue Breakdown Q1", type: "Financial", status: "Published", generated: "2024-03-10", size: "3.1 MB", downloads: 78 },
    { id: 4, name: "Security Assessment", type: "Security", status: "Review", generated: "2024-03-12", size: "4.2 MB", downloads: 12 },
    { id: 5, name: "Customer Feedback Summary", type: "Feedback", status: "Published", generated: "2024-03-08", size: "1.5 MB", downloads: 34 },
  ];

  const settingsData = [
    { category: "General", setting: "Site Title", value: "My Dashboard", type: "Text", lastModified: "2024-03-15" },
    { category: "General", setting: "Language", value: "English", type: "Dropdown", lastModified: "2024-03-10" },
    { category: "Security", setting: "Two-Factor Auth", value: "Enabled", type: "Boolean", lastModified: "2024-03-12" },
    { category: "Security", setting: "Session Timeout", value: "30 minutes", type: "Number", lastModified: "2024-03-08" },
    { category: "Notifications", setting: "Email Alerts", value: "Enabled", type: "Boolean", lastModified: "2024-03-14" },
    { category: "Notifications", setting: "Push Notifications", value: "Disabled", type: "Boolean", lastModified: "2024-03-11" },
    { category: "Performance", setting: "Cache Duration", value: "24 hours", type: "Duration", lastModified: "2024-03-09" },
  ];

  // Column definitions
  const projectColumns: Column<typeof projectsData[0]>[] = [
    { key: "id", name: "ID", width: 60 },
    { key: "name", name: "Project Name", width: 180 },
    { key: "status", name: "Status", width: 100 },
    { key: "priority", name: "Priority", width: 80 },
    { key: "assignee", name: "Assignee", width: 120 },
    { key: "dueDate", name: "Due Date", width: 100 },
    { key: "progress", name: "Progress", width: 80, renderCell: ({ row }) => `${row.progress}%` },
  ];

  const analyticsColumns: Column<typeof analyticsData[0]>[] = [
    { key: "metric", name: "Metric", width: 150 },
    { key: "today", name: "Today", width: 80 },
    { key: "yesterday", name: "Yesterday", width: 80 },
    { key: "change", name: "Change", width: 80 },
    { key: "trend", name: "Trend", width: 60 },
  ];

  const reportsColumns: Column<typeof reportsData[0]>[] = [
    { key: "id", name: "ID", width: 50 },
    { key: "name", name: "Report Name", width: 200 },
    { key: "type", name: "Type", width: 100 },
    { key: "status", name: "Status", width: 80 },
    { key: "generated", name: "Generated", width: 100 },
    { key: "size", name: "Size", width: 80 },
    { key: "downloads", name: "Downloads", width: 80 },
  ];

  const settingsColumns: Column<typeof settingsData[0]>[] = [
    { key: "category", name: "Category", width: 120 },
    { key: "setting", name: "Setting", width: 150 },
    { key: "value", name: "Value", width: 120 },
    { key: "type", name: "Type", width: 80 },
    { key: "lastModified", name: "Last Modified", width: 120 },
  ];

  // Layout configurations
  const layoutConfigs: Record<string, IJsonModel> = {
    default: {
      global: {
        tabEnableClose: true,
        tabEnableDrag: true,
        tabEnableRename: false,
        borderSize: 25,
        borderEnableAutoHide: true,
      },
      borders: [
        {
          type: "border",
          location: "left",
          size: 200,
          children: [
            {
              type: "tab",
              name: "Navigation",
              component: "navigation",
              enableClose: false,
            },
          ],
        },
      ],
      layout: {
        type: "row",
        weight: 100,
        children: [
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                name: "Dashboard",
                component: "dashboard",
              },
              {
                type: "tab",
                name: "Analytics",
                component: "analytics",
              },
            ],
          },
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                name: "Reports",
                component: "reports",
              },
              {
                type: "tab",
                name: "Settings",
                component: "settings",
              },
            ],
          },
        ],
      },
    },
    complex: {
      global: {
        tabEnableClose: true,
        tabEnableDrag: true,
        tabEnableRename: false,
        borderSize: 25,
        borderEnableAutoHide: true,
      },
      borders: [
        {
          type: "border",
          location: "left",
          size: 200,
          children: [
            {
              type: "tab",
              name: "Navigation",
              component: "navigation",
              enableClose: false,
            },
          ],
        },
        {
          type: "border",
          location: "bottom",
          size: 150,
          children: [
            {
              type: "tab",
              name: "Console",
              component: "console",
              enableClose: false,
            },
          ],
        },
      ],
      layout: {
        type: "row",
        weight: 100,
        children: [
          {
            type: "tabset",
            weight: 33,
            children: [
              {
                type: "tab",
                name: "Dashboard",
                component: "dashboard",
              },
            ],
          },
          {
            type: "column",
            weight: 67,
            children: [
              {
                type: "tabset",
                weight: 50,
                children: [
                  {
                    type: "tab",
                    name: "Analytics",
                    component: "analytics",
                  },
                  {
                    type: "tab",
                    name: "Reports",
                    component: "reports",
                  },
                ],
              },
              {
                type: "tabset",
                weight: 50,
                children: [
                  {
                    type: "tab",
                    name: "Settings",
                    component: "settings",
                  },
                  {
                    type: "tab",
                    name: "Data Grid",
                    component: "datagrid",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };

  // Get current layout configuration
  const json: IJsonModel = layoutConfigs[currentLayout] || layoutConfigs.default;

  // Initialize model when layout changes
  React.useEffect(() => {
    const newModel = Model.fromJson(json);
    setModel(newModel);
  }, [currentLayout]);

  // Callback functions for header controls
  const handleLayoutChange = useCallback((value: string) => {
    setCurrentLayout(value);
  }, []);

  // Component factory function
  const factory = (node: TabNode) => {
    const component = node.getComponent();

    switch (component) {
      case "navigation":
        return (
          <div className="p-4 h-full">
            <h3 className="font-bold mb-4 text-gray-800">Navigation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-blue-600 p-2 rounded hover:bg-blue-50">
                📊 Dashboard
              </li>
              <li className="cursor-pointer hover:text-blue-600 p-2 rounded hover:bg-blue-50">
                📁 Projects
              </li>
              <li className="cursor-pointer hover:text-blue-600 p-2 rounded hover:bg-blue-50">
                👥 Team
              </li>
              <li className="cursor-pointer hover:text-blue-600 p-2 rounded hover:bg-blue-50">
                ⚙️ Settings
              </li>
            </ul>
            <div className="mt-6 p-3 bg-blue-50 rounded">
              <h4 className="font-semibold text-blue-800 mb-2">Quick Stats</h4>
              <p className="text-sm text-blue-600">Active Users: 1,234</p>
              <p className="text-sm text-blue-600">Online Now: 56</p>
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-white">
              <h3 className="font-bold text-gray-800">Project Dashboard</h3>
              <p className="text-sm text-gray-600">Track and manage all your projects</p>
            </div>
            <div className="flex-1 p-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm opacity-90">Active Projects</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm opacity-90">Completed</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">56%</div>
                  <div className="text-sm opacity-90">Avg Progress</div>
                </div>
              </div>
              <div className="h-80 bg-white rounded border">
                <DataGrid
                  columns={projectColumns}
                  rows={projectsData}
                  className="rdg-light"
                  style={{ height: "100%" }}
                  rowClass={(row: typeof projectsData[0]) => row.priority === "Critical" ? "bg-red-50" : row.status === "Completed" ? "bg-green-50" : ""}
                />
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-white">
              <h3 className="font-bold text-gray-800">Analytics Dashboard</h3>
              <p className="text-sm text-gray-600">Real-time metrics and performance data</p>
            </div>
            <div className="flex-1 p-4">
              <div className="mb-4">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 h-24 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                  <span className="text-purple-600 font-medium">📈 Interactive Chart Area</span>
                </div>
              </div>
              <div className="h-64 bg-white rounded border">
                <DataGrid
                  columns={analyticsColumns}
                  rows={analyticsData}
                  className="rdg-light"
                  style={{ height: "100%" }}
                  rowClass={(row: typeof analyticsData[0]) => row.change.startsWith("+") ? "bg-green-50" : row.change.startsWith("-") ? "bg-red-50" : ""}
                />
              </div>
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-white">
              <h3 className="font-bold text-gray-800">Reports Center</h3>
              <p className="text-sm text-gray-600">Manage and download generated reports</p>
            </div>
            <div className="flex-1 p-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded text-center">
                  <div className="text-lg font-bold text-blue-700">5</div>
                  <div className="text-xs text-blue-600">Total Reports</div>
                </div>
                <div className="bg-green-100 p-3 rounded text-center">
                  <div className="text-lg font-bold text-green-700">3</div>
                  <div className="text-xs text-green-600">Published</div>
                </div>
                <div className="bg-yellow-100 p-3 rounded text-center">
                  <div className="text-lg font-bold text-yellow-700">1</div>
                  <div className="text-xs text-yellow-600">In Review</div>
                </div>
                <div className="bg-purple-100 p-3 rounded text-center">
                  <div className="text-lg font-bold text-purple-700">192</div>
                  <div className="text-xs text-purple-600">Downloads</div>
                </div>
              </div>
              <div className="h-72 bg-white rounded border">
                <DataGrid
                  columns={reportsColumns}
                  rows={reportsData}
                  className="rdg-light"
                  style={{ height: "100%" }}
                  rowClass={(row: typeof reportsData[0]) => 
                    row.status === "Published" ? "bg-green-50" : 
                    row.status === "Draft" ? "bg-yellow-50" : 
                    row.status === "Review" ? "bg-blue-50" : ""
                  }
                />
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-white">
              <h3 className="font-bold text-gray-800">System Settings</h3>
              <p className="text-sm text-gray-600">Configure system preferences and options</p>
            </div>
            <div className="flex-1 p-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-indigo-100 p-3 rounded text-center">
                  <div className="text-lg font-bold text-indigo-700">7</div>
                  <div className="text-xs text-indigo-600">Settings</div>
                </div>
                <div className="bg-green-100 p-3 rounded text-center">
                  <div className="text-lg font-bold text-green-700">5</div>
                  <div className="text-xs text-green-600">Enabled</div>
                </div>
                <div className="bg-red-100 p-3 rounded text-center">
                  <div className="text-lg font-bold text-red-700">2</div>
                  <div className="text-xs text-red-600">Disabled</div>
                </div>
                <div className="bg-blue-100 p-3 rounded text-center">
                  <div className="text-lg font-bold text-blue-700">3</div>
                  <div className="text-xs text-blue-600">Categories</div>
                </div>
              </div>
              <div className="h-72 bg-white rounded border">
                <DataGrid
                  columns={settingsColumns}
                  rows={settingsData}
                  className="rdg-light"
                  style={{ height: "100%" }}
                  rowClass={(row: typeof settingsData[0]) => 
                    row.category === "Security" ? "bg-red-50" : 
                    row.category === "General" ? "bg-blue-50" : 
                    row.category === "Notifications" ? "bg-yellow-50" : 
                    "bg-purple-50"
                  }
                />
              </div>
            </div>
          </div>
        );

      case "console":
        return (
          <div className="h-full flex flex-col">
            <div className="p-2 border-b bg-gray-900 text-white">
              <h3 className="font-bold text-sm">Console Output</h3>
            </div>
            <div className="flex-1 p-2 bg-gray-900 text-green-400 font-mono text-xs overflow-auto">
              <div>$ Starting application...</div>
              <div>$ Loading modules...</div>
              <div>$ Server running on port 5173</div>
              <div>$ Ready for connections</div>
              <div className="text-yellow-400">$ Warning: Development mode</div>
              <div>$ All systems operational</div>
            </div>
          </div>
        );

      case "datagrid":
        return (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-white">
              <h3 className="font-bold text-gray-800">Generic Data Grid</h3>
              <p className="text-sm text-gray-600">Customizable data table</p>
            </div>
            <div className="flex-1 p-4">
              <div className="h-full bg-white rounded border">
                <DataGrid
                  columns={projectColumns}
                  rows={projectsData}
                  className="rdg-light"
                  style={{ height: "100%" }}
                  rowClass={(row: typeof projectsData[0]) => row.priority === "Critical" ? "bg-red-50" : row.status === "Completed" ? "bg-green-50" : ""}
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-4">Unknown component: {component}</div>;
    }
  };

  if (!model) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header with Controls */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-3 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="min-w-0 flex-shrink">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Workspace Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-slate-400">Drag tabs and panels to customize your layout</p>
          </div>
          
          {/* Header Controls */}
          <div className="flex items-center gap-3 lg:gap-6 flex-wrap">
            {/* Layout Dropdown */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300 mr-2">Layout</span>
              </div>
              <Select value={currentLayout} onValueChange={handleLayoutChange}>
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">
                    <div className="flex items-center gap-2">
                      Default
                    </div>
                  </SelectItem>
                  <SelectItem value="complex">
                    <div className="flex items-center gap-2">
                      Complex
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
          </div>

          </div>
        </div>
      </div>
      
      {/* FlexLayout Container */}
      <div className="flex-1 bg-gray-50 dark:bg-slate-800 relative">
        <Layout 
          model={model} 
          factory={factory}
          onModelChange={setModel}
        />
      </div>
    </div>
  );
}
