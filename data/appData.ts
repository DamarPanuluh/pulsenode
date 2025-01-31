import { HardDrive, Brain, Database, Globe, MapPin, Clock, Link, BarChart3, Waypoints } from "lucide-react"
import type { CapabilityCardProps, Widget } from "../types"

export const initialCapabilities: CapabilityCardProps[] = [
  {
    icon: <HardDrive size={24} />,
    title: "Google Drive",
    description: "File access and search capabilities for Google Drive",
    hasSettings: true,
    settingsOptions: ["Authentication", "Folder Access"],
    enabled: false,
  },
  {
    icon: <Brain size={24} />,
    title: "Sequential Thinking",
    description: "Dynamic and reflective problem-solving through thought sequences",
    hasSettings: true,
    settingsOptions: ["Default Steps", "Thinking Style"],
    enabled: true,
  },
  {
    icon: <Database size={24} />,
    title: "Data Processing",
    description: "Efficient handling and analysis of large datasets",
    hasSettings: true,
    settingsOptions: ["Data Sources", "Processing Speed"],
    enabled: true,
  },
  {
    icon: <Globe size={24} />,
    title: "Web Scraping",
    description: "Automated extraction of data from websites",
    hasSettings: true,
    settingsOptions: ["Target Sites", "Scraping Frequency"],
    enabled: false,
  },
  {
    icon: <MapPin size={24} />,
    title: "Google Maps",
    description: "Location services, directions, and place details",
    hasSettings: true,
    settingsOptions: ["API Key", "Default Location"],
    enabled: false,
  },
  {
    icon: <Database size={24} />,
    title: "Memory",
    description: "Knowledge graph-based persistent memory system",
    hasSettings: true,
    settingsOptions: ["Storage Limit", "Retention Policy"],
    enabled: true,
  },
  {
    icon: <Clock size={24} />,
    title: "Time",
    description: "Time and timezone conversion capabilities",
    hasSettings: true,
    settingsOptions: ["Default Timezone", "Time Format"],
    enabled: false,
  },
  {
    icon: <Database size={24} />,
    title: "Exa",
    description: "Search Engine made for AIs by Exa",
    hasSettings: true,
    settingsOptions: ["API Key", "Search Preferences"],
    enabled: false,
  },
  {
    icon: <Link size={24} />,
    title: "Integration App",
    description: "Interact with any other SaaS applications on behalf of your customers",
    hasSettings: true,
    settingsOptions: ["Connected Apps", "Authentication"],
    enabled: false,
  },
]

export const widgets: Widget[] = [
  {
    name: "File Explorer",
    description: "Browse and search files from Google Drive",
    icon: <HardDrive size={24} />,
    capability: "Google Drive",
  },
  {
    name: "Thought Process",
    description: "Visualize AI's sequential thinking steps",
    icon: <Brain size={24} />,
    capability: "Sequential Thinking",
  },
  {
    name: "Data Visualizer",
    description: "Display processed data in charts and graphs",
    icon: <BarChart3 size={24} />,
    capability: "Data Processing",
  },
  {
    name: "Web Scraper Results",
    description: "Show extracted data from web scraping tasks",
    icon: <Globe size={24} />,
    capability: "Web Scraping",
  },
  {
    name: "Map View",
    description: "Interactive map for location-based information",
    icon: <MapPin size={24} />,
    capability: "Google Maps",
  },
  {
    name: "Knowledge Graph",
    description: "Visualize AI's memory and connections",
    icon: <Waypoints size={24} />,
    capability: "Memory",
  },
  {
    name: "World Clock",
    description: "Display multiple timezones and conversions",
    icon: <Clock size={24} />,
    capability: "Time",
  },
  {
    name: "Search Results",
    description: "Show results from Exa AI search engine",
    icon: <Database size={24} />,
    capability: "Exa",
  },
  {
    name: "Integration Dashboard",
    description: "Monitor and control integrated app activities",
    icon: <Link size={24} />,
    capability: "Integration App",
  },
]

