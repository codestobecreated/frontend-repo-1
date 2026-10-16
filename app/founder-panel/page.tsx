"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Lock, 
  Activity, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  RefreshCw, 
  LogOut, 
  BarChart3, 
  Layers, 
  FileText,
  TrendingUp,
  Sparkles,
  MapPin,
  Building2,
  Zap,
  Target,
  Award,
  Globe,
  UserCheck,
  Trash2,
  UserX,
  Eye,
  EyeOff,
  ChevronRight,
  ArrowLeft,
  Filter,
  X,
  UserPlus,
  Shield,
  Edit2,
  UserCog,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  Percent,
  Compass,
  Navigation
} from "lucide-react";
import { BASE_URL } from "@/app/ui/baceurl";
import { ZONES, NORTH_ZONE_STATES, CITIES, getCitiesForStates } from "@/app/ui/states-cities";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function FounderPanel() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Dashboard view mode
  const [viewMode, setViewMode] = useState<"overview" | "monitoring" | "agent_stats" | "audit_logs" | "team">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [agentFilter, setAgentFilter] = useState("all");

  // Removed Agents state (soft-hide in performance matrix, preserves all lead/log data)
  const [removedAgents, setRemovedAgents] = useState<string[]>([]);
  const [showRemovedList, setShowRemovedList] = useState(false);

  // Drill-down Explorer state (generalized from unassigned to all types)
  const [activeLeadExplorer, setActiveLeadExplorer] = useState<"all" | "unattended" | "assigned" | "closed" | null>(null);
  const [selectedExplorerState, setSelectedExplorerState] = useState<string>("all");
  const [selectedExplorerCity, setSelectedExplorerCity] = useState<string>("all");
  const [explorerSearchQuery, setExplorerSearchQuery] = useState<string>("");

  // Manager & Team Account Management States
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [dbManagersList, setDbManagersList] = useState<any[]>([]);
  const [newManagerUsername, setNewManagerUsername] = useState("");
  const [newManagerPassword, setNewManagerPassword] = useState("");
  const [newManagerFullName, setNewManagerFullName] = useState("");
  const [newManagerPhone, setNewManagerPhone] = useState("");
  const [newManagerEmail, setNewManagerEmail] = useState("");
  const [newAccountRole, setNewAccountRole] = useState<"manager" | "agent">("manager");
  const [newAccountCreatedBy, setNewAccountCreatedBy] = useState<string>("");
  const [newAccountZone, setNewAccountZone] = useState<string>("north");
  const [previewStateCities, setPreviewStateCities] = useState<string | null>("Delhi");
  const [teamRoleFilter, setTeamRoleFilter] = useState<"all" | "manager" | "agent">("all");
  const [teamSearchQuery, setTeamSearchQuery] = useState("");
  const [isCreatingManager, setIsCreatingManager] = useState(false);
  const [editingManagerId, setEditingManagerId] = useState<number | null>(null);

  // Manager Hierarchy & Month/Year Performance Filter States
  const [selectedHierarchyYear, setSelectedHierarchyYear] = useState<string>("all");
  const [selectedHierarchyMonth, setSelectedHierarchyMonth] = useState<string>("all");
  const [expandedManagers, setExpandedManagers] = useState<Record<string, boolean>>({});
  const [teamSubView, setTeamSubView] = useState<"hierarchy" | "directory">("hierarchy");

  // Selected Agent for Right Slide Drawer
  const [activeDrawerAgent, setActiveDrawerAgent] = useState<string | null>(null);
  const [drawerSelectedState, setDrawerSelectedState] = useState<string>("all");
  const [drawerSelectedCity, setDrawerSelectedCity] = useState<string>("all");
  const [drawerSearchQuery, setDrawerSearchQuery] = useState<string>("");
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  // Monitoring data
  const [monitoringData, setMonitoringData] = useState<{
    executive_overview: any;
    top_states: any[];
    top_cities: any[];
    top_models: any[];
    activity_logs: any[];
    leads_monitoring: any[];
    agent_performance: any[];
  }>({
    executive_overview: {},
    top_states: [],
    top_cities: [],
    top_models: [],
    activity_logs: [],
    leads_monitoring: [],
    agent_performance: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("relux_founder_token");
    if (savedToken) {
      setAuthToken(savedToken);
      setIsAuthenticated(true);
    }
    const savedRemoved = localStorage.getItem("relux_removed_agents");
    if (savedRemoved) {
      try {
        setRemovedAgents(JSON.parse(savedRemoved));
      } catch (e) {}
    }
  }, []);

  const handleRemoveAgent = (agentName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm(`Remove agent "${agentName}" from active performance matrix display?\n\nNote: All assigned leads, attended data, response timestamps, and audit history will remain 100% intact.`)) {
      const updated = [...removedAgents, agentName];
      setRemovedAgents(updated);
      localStorage.setItem("relux_removed_agents", JSON.stringify(updated));
      showToast(`Agent "${agentName}" removed from active matrix. Lead data preserved.`, "info");
    }
  };

  const handleRestoreAgent = (agentName: string) => {
    const updated = removedAgents.filter((name) => name !== agentName);
    setRemovedAgents(updated);
    localStorage.setItem("relux_removed_agents", JSON.stringify(updated));
    showToast(`Agent "${agentName}" restored to active matrix.`, "success");
  };

  // Explorer leads
  const explorerLeads = (monitoringData.leads_monitoring || []).filter((lead: any) => {
    if (activeLeadExplorer === "unattended") return lead.status === "new" || lead.assigned_to === "Unassigned";
    if (activeLeadExplorer === "assigned") return lead.assigned_to !== "Unassigned" && lead.status !== "new";
    if (activeLeadExplorer === "closed") return lead.status === "called_closed";
    return true; // "all"
  });

  // State breakdown for explorer leads
  const explorerStateCounts: { [state: string]: number } = {};
  explorerLeads.forEach((lead: any) => {
    const st = lead.state || "Not Specified";
    explorerStateCounts[st] = (explorerStateCounts[st] || 0) + 1;
  });

  // City breakdown for explorer leads
  const explorerCityCounts: { [city: string]: number } = {};
  explorerLeads.forEach((lead: any) => {
    if (selectedExplorerState === "all" || (lead.state || "Not Specified") === selectedExplorerState) {
      const ct = lead.city || "Not Specified";
      explorerCityCounts[ct] = (explorerCityCounts[ct] || 0) + 1;
    }
  });

  // Filtered explorer leads list
  const filteredExplorerLeads = explorerLeads.filter((lead: any) => {
    const matchesState = selectedExplorerState === "all" || (lead.state || "Not Specified") === selectedExplorerState;
    const matchesCity = selectedExplorerCity === "all" || (lead.city || "Not Specified") === selectedExplorerCity;
    const matchesSearch = !explorerSearchQuery ||
      lead.name?.toLowerCase().includes(explorerSearchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(explorerSearchQuery.toLowerCase()) ||
      lead.phone?.includes(explorerSearchQuery) ||
      lead.city?.toLowerCase().includes(explorerSearchQuery.toLowerCase()) ||
      lead.state?.toLowerCase().includes(explorerSearchQuery.toLowerCase()) ||
      lead.type?.toLowerCase().includes(explorerSearchQuery.toLowerCase());
    return matchesState && matchesCity && matchesSearch;
  });

  // All leads assigned to activeDrawerAgent
  const drawerAgentLeads = activeDrawerAgent
    ? (monitoringData.leads_monitoring || []).filter((lead: any) => {
        if (!lead.assigned_to) return false;
        const target = activeDrawerAgent.toLowerCase();
        const assigned = lead.assigned_to.toLowerCase();
        return assigned === target || assigned.includes(target);
      })
    : [];

  // State breakdown for this agent's leads
  const drawerStateCounts: { [state: string]: number } = {};
  drawerAgentLeads.forEach((lead: any) => {
    const st = lead.state || "Not Specified";
    drawerStateCounts[st] = (drawerStateCounts[st] || 0) + 1;
  });

  // City breakdown for this agent's leads
  const drawerCityCounts: { [city: string]: number } = {};
  drawerAgentLeads.forEach((lead: any) => {
    if (drawerSelectedState === "all" || (lead.state || "Not Specified") === drawerSelectedState) {
      const ct = lead.city || "Not Specified";
      drawerCityCounts[ct] = (drawerCityCounts[ct] || 0) + 1;
    }
  });

  // Filtered leads inside the drawer
  const filteredDrawerLeads = drawerAgentLeads.filter((lead: any) => {
    const matchesState = drawerSelectedState === "all" || (lead.state || "Not Specified") === drawerSelectedState;
    const matchesCity = drawerSelectedCity === "all" || (lead.city || "Not Specified") === drawerSelectedCity;
    const matchesSearch = !drawerSearchQuery ||
      lead.name?.toLowerCase().includes(drawerSearchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(drawerSearchQuery.toLowerCase()) ||
      lead.phone?.includes(drawerSearchQuery) ||
      lead.city?.toLowerCase().includes(drawerSearchQuery.toLowerCase()) ||
      lead.state?.toLowerCase().includes(drawerSearchQuery.toLowerCase()) ||
      lead.type?.toLowerCase().includes(drawerSearchQuery.toLowerCase());
    return matchesState && matchesCity && matchesSearch;
  });

  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchFounderData();
      fetchDbManagers();
    }
  }, [isAuthenticated, authToken]);

  const handleFounderLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const p = passwordInput.trim();
    const u = usernameInput.trim();

    if (!p) {
      setAuthError("Please enter founder security password.");
      return;
    }

    const validStaticPasswords = [
      "relux@founder2025",
      "relux@founder",
      "foundertoken",
      "founder",
      "relux@admin2025",
      "relux@admin",
      "reluxgroups@2024",
      "managertoken",
      "relux@2025",
      "admin"
    ];

    const pLower = p.toLowerCase();
    const isStaticMatch = validStaticPasswords.includes(pLower);

    if (isStaticMatch) {
      const token = "Relux@founder2025";
      localStorage.setItem("relux_founder_token", token);
      localStorage.setItem("relux_founder_username", u || "Founder");
      setAuthToken(token);
      setIsAuthenticated(true);
      showToast("Access Granted. Welcome to Founder Command Center.", "success");
      return;
    }

    // Also check backend DB auth in case user has an account in AgentAccount table
    try {
      const res = await fetch(`${BASE_URL}/api/admin/agent-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: u || "founder",
          password: p
        })
      });

      if (res.ok) {
        const data = await res.json();
        const token = "Relux@founder2025";
        localStorage.setItem("relux_founder_token", token);
        localStorage.setItem("relux_founder_username", data.agent?.username || u || "Founder");
        setAuthToken(token);
        setIsAuthenticated(true);
        showToast("Access Granted. Welcome to Founder Command Center.", "success");
        return;
      }
    } catch (err) {
      console.error("Agent login fallback error:", err);
    }

    setAuthError("Invalid Security Password. (Default: Relux@founder2025)");
    showToast("Authentication Failed. Check password.", "error");
  };

  const handleLogout = () => {
    localStorage.removeItem("relux_founder_token");
    localStorage.removeItem("relux_founder_username");
    setAuthToken("");
    setIsAuthenticated(false);
    showToast("Logged out of Founder Control Panel.", "info");
  };

  const fetchFounderData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/founder/monitoring/`, {
        headers: {
          "X-Admin-Token": authToken,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMonitoringData(data);
      } else {
        if (response.status === 401) {
          handleLogout();
        } else {
          showToast("Failed to fetch monitoring data.", "error");
        }
      }
    } catch (err) {
      console.error("Error fetching founder data:", err);
      showToast("Network error fetching audit data.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDbManagers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/agents/`, {
        headers: { "X-Admin-Token": authToken, "X-User-Name": localStorage.getItem("relux_founder_username") || "Founder" }
      });
      if (res.ok) {
        const data = await res.json();
        setDbManagersList(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching DB managers:", err);
    }
  };

  const resetManagerForm = () => {
    setEditingManagerId(null);
    setNewManagerUsername("");
    setNewManagerPassword("");
    setNewManagerFullName("");
    setNewManagerPhone("");
    setNewManagerEmail("");
    setNewAccountRole("manager");
    setNewAccountCreatedBy("");
    setNewAccountZone("north");
    setPreviewStateCities("Delhi");
  };

  const startEditAccount = (acc: any) => {
    setEditingManagerId(acc.id);
    setNewManagerUsername(acc.username || "");
    setNewManagerPassword("");
    setNewManagerFullName(acc.full_name || "");
    setNewManagerPhone(acc.phone || "");
    setNewManagerEmail(acc.email || "");
    setNewAccountRole(acc.role || "manager");
    setNewAccountCreatedBy(acc.created_by ? String(acc.created_by) : "");
    const zone = acc.assigned_zone || (acc.permissions && acc.permissions.zone) || "north";
    setNewAccountZone(zone);
    const zData = ZONES[zone] || ZONES.north;
    setPreviewStateCities(zData.states[0] || "Delhi");
    setShowManagerModal(true);
  };

  const handleDeleteAccount = async (id: number, username: string) => {
    if (!confirm(`Are you sure you want to delete user account "${username}"?\n\nThis will permanently remove their access.`)) {
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/admin/agents/${id}/`, {
        method: "DELETE",
        headers: {
          "X-Admin-Token": authToken,
          "X-User-Name": localStorage.getItem("relux_founder_username") || "Founder",
        },
      });

      if (res.ok || res.status === 204) {
        showToast(`Account "${username}" deleted successfully.`, "success");
        fetchDbManagers();
      } else {
        showToast("Failed to delete account.", "error");
      }
    } catch (err) {
      showToast("Network error deleting account.", "error");
    }
  };

  const handleSaveManager = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManagerUsername || !newManagerFullName || (!editingManagerId && !newManagerPassword)) {
      showToast("Username, Full Name (and Password for new accounts) are required.", "error");
      return;
    }

    setIsCreatingManager(true);
    try {
      const isEdit = editingManagerId !== null;
      const url = isEdit
        ? `${BASE_URL}/api/admin/agents/${editingManagerId}/`
        : `${BASE_URL}/api/admin/agents/`;

      const method = isEdit ? "PATCH" : "POST";
      
      const zoneData = ZONES[newAccountZone] || ZONES.north;
      const zoneStates = zoneData.states;
      const zoneCities = getCitiesForStates(zoneStates);

      const payload: any = {
        username: newManagerUsername.trim(),
        full_name: newManagerFullName.trim(),
        phone: newManagerPhone.trim(),
        email: newManagerEmail.trim(),
        role: newAccountRole,
        permissions: {
          zone: newAccountRole === "manager" ? newAccountZone : "all",
          zone_name: newAccountRole === "manager" ? zoneData.name : "All India",
          assigned_states: newAccountRole === "manager" ? zoneStates : [],
          assigned_cities: newAccountRole === "manager" ? zoneCities : [],
        }
      };

      if (newAccountRole === "agent" && newAccountCreatedBy) {
        payload.created_by = Number(newAccountCreatedBy);
      }

      if (newManagerPassword.trim()) {
        payload.password = newManagerPassword.trim();
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "X-Admin-Token": authToken,
          "X-User-Name": localStorage.getItem("relux_founder_username") || "Founder",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showToast(
          isEdit
            ? "✅ Account updated successfully!"
            : `✅ ${newAccountRole === "manager" ? `Manager (${zoneData.name})` : "Agent"} created successfully!`,
          "success"
        );
        resetManagerForm();
        setShowManagerModal(false);
        fetchDbManagers();
      } else {
        let errMsg = `Error ${response.status}`;
        try { const d = await response.json(); errMsg = JSON.stringify(d); } catch {}
        showToast(`Failed: ${errMsg}`, "error");
      }
    } catch (error: any) {
      showToast(`Network error: ${error?.message}`, "error");
    } finally {
      setIsCreatingManager(false);
    }
  };

  // Filtered team accounts: Managers and Agents
  const filteredTeamAccounts = dbManagersList
    .filter((acc: any) => acc.role === "manager" || acc.role === "agent" || !acc.role)
    .filter((acc: any) => {
      if (teamRoleFilter === "manager") return acc.role === "manager";
      if (teamRoleFilter === "agent") return acc.role === "agent" || !acc.role;
      return true;
    })
    .filter((acc: any) => {
      if (!teamSearchQuery.trim()) return true;
      const q = teamSearchQuery.toLowerCase();
      const matchUser = acc.username?.toLowerCase().includes(q);
      const matchName = acc.full_name?.toLowerCase().includes(q);
      const matchCreator = (acc.created_by_username || "")?.toLowerCase().includes(q) || (acc.created_by_name || "")?.toLowerCase().includes(q);
      const matchRole = (acc.role || "agent")?.toLowerCase().includes(q);
      return matchUser || matchName || matchCreator || matchRole;
    });

  const allManagersList = dbManagersList.filter((a: any) => a.role === "manager");
  const allAgentsList = dbManagersList.filter((a: any) => a.role === "agent" || !a.role);

  // Toggle manager team expansion
  const toggleManagerExpanded = (managerKey: string) => {
    setExpandedManagers((prev) => ({
      ...prev,
      [managerKey]: !prev[managerKey],
    }));
  };

  // Available Years extracted from leads
  const availableYears: string[] = Array.from(
    new Set(
      (monitoringData.leads_monitoring || [])
        .map((l: any) => l.created_at ? new Date(l.created_at).getFullYear().toString() : null)
        .filter((y): y is string => Boolean(y))
    )
  ).sort().reverse();

  const monthsList = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Filter leads by selected hierarchy month and year
  const periodLeads = (monitoringData.leads_monitoring || []).filter((lead: any) => {
    if (!lead.created_at) return true;
    const d = new Date(lead.created_at);
    if (isNaN(d.getTime())) return true;
    
    const leadYear = d.getFullYear().toString();
    const leadMonth = (d.getMonth() + 1).toString().padStart(2, "0");

    if (selectedHierarchyYear !== "all" && leadYear !== selectedHierarchyYear) return false;
    if (selectedHierarchyMonth !== "all" && leadMonth !== selectedHierarchyMonth) return false;
    return true;
  });

  // Calculate stats for any single agent account
  const computeAgentStats = (agent: any) => {
    const leads = periodLeads.filter((l: any) => {
      const matchUsername = agent.username && l.assigned_to && l.assigned_to.toLowerCase() === agent.username.toLowerCase();
      const matchFullName = agent.full_name && l.assigned_to && l.assigned_to.toLowerCase() === agent.full_name.toLowerCase();
      return matchUsername || matchFullName;
    });

    const totalAssigned = leads.length;
    const closed = leads.filter((l: any) => l.status === "responded" || l.status === "called_closed").length;
    const inProgress = leads.filter((l: any) => l.status === "in_progress").length;
    const unattended = leads.filter((l: any) => l.status === "new").length;
    const conversionRate = totalAssigned > 0 ? Math.round((closed / totalAssigned) * 100) : 0;

    return {
      totalAssigned,
      closed,
      inProgress,
      unattended,
      conversionRate,
      leads,
    };
  };

  // Build Manager Hierarchy with dynamic month/year stats
  const managerHierarchy = allManagersList.map((mgr: any) => {
    // Agents under this manager
    const agents = allAgentsList.filter((a: any) => {
      if (a.created_by && a.created_by === mgr.id) return true;
      if (a.created_by_username && a.created_by_username.toLowerCase() === mgr.username.toLowerCase()) return true;
      if (a.created_by_name && a.created_by_name.toLowerCase() === mgr.full_name.toLowerCase()) return true;
      return false;
    });

    const agentsWithStats = agents.map((agent: any) => ({
      ...agent,
      stats: computeAgentStats(agent),
    }));

    const teamAssigned = agentsWithStats.reduce((sum, a) => sum + a.stats.totalAssigned, 0);
    const teamClosed = agentsWithStats.reduce((sum, a) => sum + a.stats.closed, 0);
    const teamPending = agentsWithStats.reduce((sum, a) => sum + a.stats.unattended + a.stats.inProgress, 0);
    const teamConversionRate = teamAssigned > 0 ? Math.round((teamClosed / teamAssigned) * 100) : 0;

    return {
      manager: mgr,
      agentCount: agents.length,
      agents: agentsWithStats,
      teamAssigned,
      teamClosed,
      teamPending,
      teamConversionRate,
    };
  });

  // Direct / Unlinked Agents (created by founder or without manager)
  const unlinkedAgents = allAgentsList
    .filter((a: any) => !managerHierarchy.some((mh) => mh.agents.some((ag: any) => ag.id === a.id)))
    .map((agent: any) => ({
      ...agent,
      stats: computeAgentStats(agent),
    }));

  const totalPeriodAssignedLeads = managerHierarchy.reduce((sum, mh) => sum + mh.teamAssigned, 0) + unlinkedAgents.reduce((sum, ua) => sum + ua.stats.totalAssigned, 0);
  const totalPeriodClosedLeads = managerHierarchy.reduce((sum, mh) => sum + mh.teamClosed, 0) + unlinkedAgents.reduce((sum, ua) => sum + ua.stats.closed, 0);
  const totalPeriodConversionRate = totalPeriodAssignedLeads > 0 ? Math.round((totalPeriodClosedLeads / totalPeriodAssignedLeads) * 100) : 0;

  const ov = monitoringData.executive_overview || {};

  // Filter leads based on search query and agent selection
  const filteredLeads = (monitoringData.leads_monitoring || []).filter((lead) => {
    const matchesAgent = agentFilter === "all" || lead.assigned_to === agentFilter;
    const matchesSearch = !searchQuery || 
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery) ||
      lead.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.type?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAgent && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="-mt-24 min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-400">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Founder Command Center</h1>
            <p className="text-xs text-slate-400 mt-1">Executive Intelligence & Full Monitoring Dashboard</p>
          </div>

          <form onSubmit={handleFounderLogin} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">Founder Security Password</label>
                <button
                  type="button"
                  onClick={() => setPasswordInput("Relux@founder2025")}
                  className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold underline cursor-pointer"
                >
                  Auto-fill Password
                </button>
              </div>
              <div className="relative">
                <input
                  id="founder-password"
                  type={showLoginPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Relux@founder2025"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-4 pr-11 py-3 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-slate-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                  title={showLoginPassword ? "Hide Password" : "Show Password"}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              id="founder-login-btn"
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Access Founder Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md flex items-center gap-3 text-sm ${
              toast.type === "success"
                ? "bg-purple-950/90 border-purple-500/40 text-purple-200"
                : toast.type === "error"
                ? "bg-rose-950/90 border-rose-500/40 text-rose-200"
                : "bg-slate-900/90 border-slate-700 text-slate-200"
            }`}
          >
            {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toast.type === "info" && <Sparkles className="w-4 h-4 text-purple-400" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">Founder Command Center</h1>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
                  Executive Monitor
                </span>
              </div>
              <p className="text-xs text-slate-400">Total Intelligence: Lead Access, Timestamps, Agent Performance & Audit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setShowManagerModal(true); fetchDbManagers(); }}
              className="px-3.5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
              title="Create or Manage Team"
            >
              <UserPlus className="w-4 h-4" />
              <span>Manage Team</span>
            </button>

            <button
              id="refresh-founder-btn"
              onClick={fetchFounderData}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-700 transition-colors"
              title="Refresh Monitoring Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <button
              id="founder-logout-btn"
              onClick={handleLogout}
              className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Manager & Agent Management Modal */}
      {showManagerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl p-6 shadow-2xl space-y-6 relative my-8 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Team Account Management</h3>
                  <p className="text-xs text-slate-400">Create &amp; manage Managers and Manager-Created Agents</p>
                </div>
              </div>
              <button
                onClick={() => { setShowManagerModal(false); resetManagerForm(); }}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-6 pr-1 flex-1">
              {/* Creation / Edit Form */}
              <form onSubmit={handleSaveManager} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <UserCog className="w-4 h-4 text-purple-400" />
                    <span>{editingManagerId ? "Edit Account Details" : "Create New Manager or Agent"}</span>
                  </h4>
                  {editingManagerId && (
                    <button
                      type="button"
                      onClick={resetManagerForm}
                      className="text-[11px] text-purple-400 hover:underline font-semibold"
                    >
                      + Switch to Create New
                    </button>
                  )}
                </div>

                {/* Account Type Selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewAccountRole("manager")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      newAccountRole === "manager"
                        ? "bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-lg shadow-blue-500/10"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Role: Manager</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewAccountRole("agent")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      newAccountRole === "agent"
                        ? "bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/10"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Role: Agent</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-semibold">
                      Username * <span className="text-[11px] text-slate-500">(Unique login handle)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">@</span>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. manager_chennai or agent_raj"
                        value={newManagerUsername} 
                        onChange={(e) => setNewManagerUsername(e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2.5 text-white focus:outline-none focus:border-purple-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1.5 font-semibold">
                      {editingManagerId ? "New Password (leave blank to keep unchanged)" : "Password *"}
                    </label>
                    <input 
                      type="password" 
                      required={!editingManagerId} 
                      placeholder={editingManagerId ? "•••••••• (Unchanged)" : "Enter secure password"}
                      value={newManagerPassword} 
                      onChange={(e) => setNewManagerPassword(e.target.value)} 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1.5 font-semibold">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rajesh Kumar"
                      value={newManagerFullName} 
                      onChange={(e) => setNewManagerFullName(e.target.value)} 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1.5 font-semibold">Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="+91 9876543210"
                      value={newManagerPhone} 
                      onChange={(e) => setNewManagerPhone(e.target.value)} 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1.5 font-semibold">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="team@reluxelectric.com"
                      value={newManagerEmail} 
                      onChange={(e) => setNewManagerEmail(e.target.value)} 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500" 
                    />
                  </div>

                  {newAccountRole === "agent" && (
                    <div>
                      <label className="block text-amber-400 mb-1.5 font-semibold flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Created by / Parent Manager</span>
                      </label>
                      <select
                        value={newAccountCreatedBy}
                        onChange={(e) => setNewAccountCreatedBy(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Founder / Direct Creation</option>
                        {allManagersList.map((m: any) => (
                          <option key={m.id} value={m.id}>
                            Manager: @{m.username} ({m.full_name})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  {editingManagerId && (
                    <button
                      type="button"
                      onClick={resetManagerForm}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button 
                    type="submit" 
                    disabled={isCreatingManager} 
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/20 flex items-center gap-2"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{isCreatingManager ? "Saving..." : editingManagerId ? "Update Account" : `Save ${newAccountRole === "manager" ? "Manager" : "Agent"} Account`}</span>
                  </button>
                </div>
              </form>

              {/* Accounts Directory Table */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Role filter buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setTeamRoleFilter("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        teamRoleFilter === "all"
                          ? "bg-purple-500 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      All ({dbManagersList.filter((a: any) => a.role === "manager" || a.role === "agent").length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamRoleFilter("manager")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                        teamRoleFilter === "manager"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Shield className="w-3 h-3" />
                      <span>Managers ({allManagersList.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamRoleFilter("agent")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                        teamRoleFilter === "agent"
                          ? "bg-purple-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <UserCheck className="w-3 h-3" />
                      <span>Agents ({allAgentsList.length})</span>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search username, manager..."
                      value={teamSearchQuery}
                      onChange={(e) => setTeamSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-3.5">Role</th>
                        <th className="p-3.5">Username</th>
                        <th className="p-3.5">Created by (Manager)</th>
                        <th className="p-3.5">Full Name</th>
                        <th className="p-3.5">Contact</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredTeamAccounts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500">
                            <Users className="w-8 h-8 mx-auto mb-2 text-slate-700" />
                            No manager or agent accounts match the filter.
                          </td>
                        </tr>
                      ) : (
                        filteredTeamAccounts.map((m: any) => {
                          const isManager = m.role === "manager";
                          const creatorManager = m.created_by_username 
                            ? m.created_by_username 
                            : (m.created_by ? allManagersList.find((mgr: any) => mgr.id === m.created_by)?.username : null);
                          const creatorName = m.created_by_name || (m.created_by ? allManagersList.find((mgr: any) => mgr.id === m.created_by)?.full_name : null);

                          return (
                            <tr key={m.id} className="hover:bg-slate-900/50 transition-colors">
                              <td className="p-3.5">
                                {isManager ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-bold text-[11px]">
                                    <Shield className="w-3 h-3 text-blue-400" />
                                    Manager
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-[11px]">
                                    <UserCheck className="w-3 h-3 text-purple-400" />
                                    Agent
                                  </span>
                                )}
                              </td>

                              <td className="p-3.5 font-mono font-bold text-white">
                                @{m.username}
                              </td>

                              <td className="p-3.5">
                                {isManager ? (
                                  <span className="text-[11px] text-slate-500 italic">Founder Managed</span>
                                ) : creatorManager ? (
                                  <div className="flex flex-col">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] font-bold w-fit">
                                      <UserCheck className="w-3 h-3 text-amber-400" />
                                      Manager: @{creatorManager}
                                    </span>
                                    {creatorName && (
                                      <span className="text-[10px] text-slate-500 mt-0.5 ml-1">
                                        ({creatorName})
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-slate-500">Founder Direct</span>
                                )}
                              </td>

                              <td className="p-3.5 font-semibold text-slate-200">
                                {m.full_name}
                              </td>

                              <td className="p-3.5 text-slate-400 space-y-0.5">
                                {m.phone && <div className="text-[11px] text-slate-300">{m.phone}</div>}
                                {m.email && <div className="text-[10px] text-slate-500">{m.email}</div>}
                                {!m.phone && !m.email && <span className="text-slate-600">—</span>}
                              </td>

                              <td className="p-3.5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => startEditAccount(m)}
                                    className="p-1.5 bg-slate-900 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 rounded-lg border border-slate-800 transition-colors"
                                    title="Edit Account"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAccount(m.id, m.username)}
                                    className="p-1.5 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-800 transition-colors"
                                    title="Delete Account"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* View Mode Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold overflow-x-auto">
          <button
            id="tab-founder-overview"
            onClick={() => setViewMode("overview")}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              viewMode === "overview"
                ? "border-purple-500 text-purple-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Executive Overview</span>
          </button>

          <button
            id="tab-founder-monitoring"
            onClick={() => setViewMode("monitoring")}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              viewMode === "monitoring"
                ? "border-purple-500 text-purple-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Lead Access &amp; Timestamps ({monitoringData.leads_monitoring?.length || 0})</span>
          </button>

          <button
            id="tab-founder-performance"
            onClick={() => setViewMode("agent_stats")}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              viewMode === "agent_stats"
                ? "border-purple-500 text-purple-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Agent Performance Matrix ({monitoringData.agent_performance?.length || 0})</span>
          </button>

          <button
            id="tab-founder-team"
            onClick={() => { setViewMode("team"); fetchDbManagers(); }}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              viewMode === "team"
                ? "border-purple-500 text-purple-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Managers &amp; Agents ({filteredTeamAccounts.length})</span>
          </button>

          <button
            id="tab-founder-audit"
            onClick={() => setViewMode("audit_logs")}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              viewMode === "audit_logs"
                ? "border-purple-500 text-purple-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Real-time Audit Logs ({monitoringData.activity_logs?.length || 0})</span>
          </button>
        </div>

        {/* ── VIEW 1: Executive Overview KPI Dashboard ── */}
        {viewMode === "overview" && (
          <div className="space-y-8">

            {/* Main KPI Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div 
                onClick={() => {
                  setViewMode("agent_stats");
                  setActiveLeadExplorer("all");
                }}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 col-span-1 cursor-pointer hover:border-slate-500/50 hover:bg-slate-900 transition-all group"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Total Leads</p>
                <p className="text-3xl font-extrabold text-white">{ov.total_leads ?? "—"}</p>
                <p className="text-[11px] text-slate-500 mt-1 group-hover:text-slate-300 transition-colors flex items-center gap-1">
                  <span>Inspect Breakdown</span>
                  <ChevronRight className="w-3 h-3" />
                </p>
              </div>
              <div 
                onClick={() => {
                  setViewMode("agent_stats");
                  setActiveLeadExplorer("unattended");
                }}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 col-span-1 cursor-pointer hover:border-amber-500/50 hover:bg-slate-900 transition-all group"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">Unattended</p>
                <p className="text-3xl font-extrabold text-amber-400">{ov.unattended_count ?? "—"}</p>
                <p className="text-[11px] text-slate-500 mt-1 group-hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Inspect Breakdown</span>
                  <ChevronRight className="w-3 h-3" />
                </p>
              </div>
              <div 
                onClick={() => {
                  setViewMode("agent_stats");
                  setActiveLeadExplorer("assigned");
                }}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 col-span-1 cursor-pointer hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1">Assigned</p>
                <p className="text-3xl font-extrabold text-blue-400">{ov.assigned_count ?? "—"}</p>
                <p className="text-[11px] text-slate-500 mt-1 group-hover:text-blue-300 transition-colors flex items-center gap-1">
                  <span>Inspect Breakdown</span>
                  <ChevronRight className="w-3 h-3" />
                </p>
              </div>
              <div 
                onClick={() => {
                  setViewMode("agent_stats");
                  setActiveLeadExplorer("closed");
                }}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 col-span-1 cursor-pointer hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">Closed</p>
                <p className="text-3xl font-extrabold text-emerald-400">{ov.closed_count ?? "—"}</p>
                <p className="text-[11px] text-slate-500 mt-1 group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Inspect Breakdown</span>
                  <ChevronRight className="w-3 h-3" />
                </p>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 col-span-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1">Avg SLA</p>
                <p className="text-3xl font-extrabold text-purple-400">{ov.avg_sla_hours ?? "—"}</p>
                <p className="text-[11px] text-slate-500 mt-1">hrs avg response time</p>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 col-span-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-1">Agents Active</p>
                <p className="text-3xl font-extrabold text-indigo-400">{(monitoringData.agent_performance || []).filter((a: any) => a.agent_name !== "Unassigned").length}</p>
                <p className="text-[11px] text-slate-500 mt-1">Working agent accounts</p>
              </div>
            </div>

            {/* Leaderboards Row: Top States, Top Cities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Top States Demand Leaderboard */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Top States by Demand</h3>
                    <p className="text-[11px] text-slate-400">Franchise lead concentration</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {(monitoringData.top_states || []).slice(0, 8).map((s: any, i) => (
                    <div key={s.state} className="flex items-center gap-3">
                      <span className={`text-[11px] font-extrabold w-5 text-right ${i === 0 ? "text-amber-400" : i === 1 ? "text-slate-300" : i === 2 ? "text-orange-400" : "text-slate-500"}`}>
                        #{i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">{s.state}</span>
                          <span className="text-xs font-bold text-emerald-400">{s.count}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500/60 rounded-full"
                            style={{ width: `${Math.min(100, (s.count / ((monitoringData.top_states[0]?.count || 1))) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(monitoringData.top_states || []).length === 0 && (
                    <p className="text-xs text-slate-500 text-center py-4">Loading state demand data...</p>
                  )}
                </div>
              </div>

              {/* Top Cities Demand Leaderboard */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Top Cities by Demand</h3>
                    <p className="text-[11px] text-slate-400">Highest enquiry volume cities</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {(monitoringData.top_cities || []).slice(0, 8).map((c: any, i) => (
                    <div key={c.city} className="flex items-center gap-3">
                      <span className={`text-[11px] font-extrabold w-5 text-right ${i === 0 ? "text-amber-400" : i === 1 ? "text-slate-300" : i === 2 ? "text-orange-400" : "text-slate-500"}`}>
                        #{i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">{c.city}</span>
                          <span className="text-xs font-bold text-blue-400">{c.count}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500/60 rounded-full"
                            style={{ width: `${Math.min(100, (c.count / ((monitoringData.top_cities[0]?.count || 1))) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(monitoringData.top_cities || []).length === 0 && (
                    <p className="text-xs text-slate-500 text-center py-4">Loading city demand data...</p>
                  )}
                </div>
              </div>

              {/* Franchise Model Distribution */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-8 h-8 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Franchise Model Demand</h3>
                    <p className="text-[11px] text-slate-400">Enquiries by franchise model type</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {(monitoringData.top_models || []).slice(0, 8).map((m: any, i) => (
                    <div key={m.model} className="flex items-center gap-3">
                      <span className="text-[11px] font-extrabold w-5 text-right text-slate-500">#{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white truncate max-w-30">{m.model || "Not Specified"}</span>
                          <span className="text-xs font-bold text-purple-400">{m.count}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500/60 rounded-full"
                            style={{ width: `${Math.min(100, (m.count / ((monitoringData.top_models[0]?.count || 1))) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(monitoringData.top_models || []).length === 0 && (
                    <p className="text-xs text-slate-500 text-center py-4">Loading model demand data...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Audit Activity Quick Feed */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Recent System Activity (Last 10)</h3>
                </div>
                <button
                  onClick={() => setViewMode("audit_logs")}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  View All Logs →
                </button>
              </div>
              <div className="space-y-2 font-mono text-xs max-h-64 overflow-y-auto">
                {(monitoringData.activity_logs || []).slice(0, 10).map((log: any) => (
                  <div key={log.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                    <Activity className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <div className="flex-1 flex items-center justify-between gap-4">
                      <p className="text-white font-sans text-[11px]">
                        <span className="text-purple-300 font-semibold">{log.performed_by}</span>
                        {" → "}
                        <span className="text-amber-400">[{log.enquiry_type?.toUpperCase()} #{log.enquiry_id}]</span>
                        {" "}{log.action?.replace("_", " ")}
                      </p>
                      <span className="text-slate-500 text-[10px] shrink-0">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                {(monitoringData.activity_logs || []).length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-6">No audit activity yet. Assign & update leads to generate logs.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── VIEW 2: Comprehensive Lead Access & Timestamps Monitoring ── */}
        {viewMode === "monitoring" && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter Agent:</span>
                <select
                  id="founder-agent-filter"
                  value={agentFilter}
                  onChange={(e) => setAgentFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Agents & Unassigned</option>
                  {(monitoringData.agent_performance || [])
                    .filter((ag: any) => ag.agent_name !== "Unassigned")
                    .map((ag: any) => (
                      <option key={ag.agent_name} value={ag.agent_name}>{ag.agent_name}</option>
                    ))}
                </select>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="founder-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, phone, city, type..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <span className="text-xs font-bold text-slate-400">{filteredLeads.length} leads shown</span>
            </div>

            {/* Monitoring Table */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Type / Client</th>
                      <th className="p-4">Assigned Agent</th>
                      <th className="p-4">Created At</th>
                      <th className="p-4">Assigned At</th>
                      <th className="p-4">Responded At</th>
                      <th className="p-4">SLA (hrs)</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Response Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {isLoading ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          <RefreshCw className="w-6 h-6 animate-spin text-purple-400 mx-auto mb-2" />
                          Loading audit monitoring list...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          No leads matching monitoring filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead, idx) => (
                        <tr key={`${lead.type}-${lead.id}-${idx}`} className="hover:bg-slate-900/90 transition-colors">
                          <td className="p-4 space-y-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">{lead.type}</span>
                            <span className="font-bold text-white block">{lead.name}</span>
                            <span className="text-slate-400 text-[11px] block">{lead.phone} • {lead.city}</span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                              lead.assigned_to === "Unassigned"
                                ? "bg-slate-800 text-slate-400"
                                : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            }`}>
                              {lead.assigned_to}
                            </span>
                          </td>
                          <td className="p-4 text-slate-300 text-[11px]">
                            {lead.created_at ? new Date(lead.created_at).toLocaleString() : "N/A"}
                          </td>
                          <td className="p-4 text-slate-300 text-[11px]">
                            {lead.assigned_at ? new Date(lead.assigned_at).toLocaleString() : <span className="text-amber-400 italic">Pending</span>}
                          </td>
                          <td className="p-4 text-slate-300 text-[11px]">
                            {lead.responded_at ? new Date(lead.responded_at).toLocaleString() : <span className="text-slate-500 italic">Open</span>}
                          </td>
                          <td className="p-4">
                            {lead.sla_hours !== null ? (
                              <span className="font-mono font-semibold text-emerald-400">{lead.sla_hours} hrs</span>
                            ) : (
                              <span className="text-slate-500 italic">In Progress</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                              lead.status === "new"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : lead.status === "in_progress"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                : lead.status === "responded"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            }`}>
                              {lead.status === "new" ? "Unattended" : lead.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-4 text-[11px] text-slate-400">
                            {lead.note ? (
                              <div
                                onClick={() => setExpandedNoteId(expandedNoteId === `${lead.type}-${lead.id}` ? null : `${lead.type}-${lead.id}`)}
                                className={`cursor-pointer transition-colors ${
                                  expandedNoteId === `${lead.type}-${lead.id}`
                                    ? "whitespace-pre-wrap min-w-62.5 text-slate-300"
                                    : "max-w-50 truncate hover:text-slate-300"
                                }`}
                                title={expandedNoteId === `${lead.type}-${lead.id}` ? "Click to collapse" : "Click to read full note"}
                              >
                                {lead.note}
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── VIEW 3: Agent Performance Matrix & Unassigned Lead Explorer ── */}
        {viewMode === "agent_stats" && (
          <div className="space-y-6">

            {activeLeadExplorer !== null ? (
              /* ── DRILL-DOWN: Leads State & City Explorer ── */
              <div className="space-y-6">
                
                {/* Header & Controls */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveLeadExplorer(null)}
                      className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors flex items-center gap-2 text-xs font-bold shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Performance Matrix</span>
                    </button>
                    <div>
                      <h2 className="text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                        {activeLeadExplorer === "unattended" ? "Unattended" : activeLeadExplorer === "assigned" ? "Assigned" : activeLeadExplorer === "closed" ? "Closed" : "All"} Leads Explorer
                        <span className="px-2.5 py-0.5 text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold rounded-full">
                          {explorerLeads.length} Total
                        </span>
                      </h2>
                      <p className="text-xs text-slate-400">Click state or city badges below to filter user enquiry data</p>
                    </div>
                  </div>

                  {/* Search Bar for Explorer */}
                  <div className="relative w-full md:w-72">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      id="explorer-search"
                      type="text"
                      value={explorerSearchQuery}
                      onChange={(e) => setExplorerSearchQuery(e.target.value)}
                      placeholder="Filter by name, phone, city..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* State & City Breakdown Pills Panel */}
                <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-5 shadow-xl">
                  
                  {/* State Filter Badges */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <span>Filter by State ({Object.keys(explorerStateCounts).length} States):</span>
                      </div>
                      {selectedExplorerState !== "all" && (
                        <button
                          onClick={() => {
                            setSelectedExplorerState("all");
                            setSelectedExplorerCity("all");
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                        >
                          Clear Filter (Show All {explorerLeads.length})
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setSelectedExplorerState("all");
                          setSelectedExplorerCity("all");
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                          selectedExplorerState === "all"
                            ? "bg-amber-500 border-amber-400 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <span>All States</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                          selectedExplorerState === "all" ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-slate-300"
                        }`}>
                          {explorerLeads.length}
                        </span>
                      </button>

                      {Object.entries(explorerStateCounts)
                        .sort((a, b) => b[1] - a[1])
                        .map(([stateName, count]) => {
                          const isSelected = selectedExplorerState === stateName;
                          return (
                            <button
                              key={stateName}
                              onClick={() => {
                                setSelectedExplorerState(stateName);
                                setSelectedExplorerCity("all");
                              }}
                              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2.5 ${
                                isSelected
                                  ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]"
                                  : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                              }`}
                            >
                              <span>{stateName}</span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                                isSelected ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* City Filter Badges */}
                  {Object.keys(explorerCityCounts).length > 0 && (
                    <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>Cities in {selectedExplorerState === "all" ? "All Regions" : selectedExplorerState}:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedExplorerCity("all")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            selectedExplorerCity === "all"
                              ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/20"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          }`}
                        >
                          All Cities
                        </button>
                        {Object.entries(explorerCityCounts)
                          .sort((a, b) => b[1] - a[1])
                          .map(([cityName, count]) => {
                            const isCitySelected = selectedExplorerCity === cityName;
                            return (
                              <button
                                key={cityName}
                                onClick={() => setSelectedExplorerCity(cityName)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                                  isCitySelected
                                    ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/20"
                                    : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
                                }`}
                              >
                                <span>{cityName}</span>
                                <span className={`text-[10px] font-bold ${isCitySelected ? "text-white" : "text-blue-400"}`}>({count})</span>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Filtered Data List Table */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-0">
                  <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">
                      Showing <strong className="text-white">{filteredExplorerLeads.length}</strong> User Enquiries
                      {selectedExplorerState !== "all" && <span className="text-emerald-400"> in {selectedExplorerState}</span>}
                      {selectedExplorerCity !== "all" && <span className="text-blue-400"> ({selectedExplorerCity})</span>}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">Real-time Data Filter</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-4">User Name &amp; Contact</th>
                          <th className="p-4">Pipeline Category</th>
                          <th className="p-4">State</th>
                          <th className="p-4">City</th>
                          <th className="p-4">Created At</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredExplorerLeads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-400">
                              No user data matching the selected state/city filter.
                            </td>
                          </tr>
                        ) : (
                          filteredExplorerLeads.map((lead: any, idx: number) => (
                            <tr key={`${lead.type}-${lead.id}-${idx}`} className="hover:bg-slate-900/90 transition-colors">
                              <td className="p-4 space-y-0.5">
                                <span className="font-bold text-white text-sm block">{lead.name}</span>
                                <span className="text-slate-400 text-[11px] block font-mono">{lead.phone} • {lead.email}</span>
                              </td>
                              <td className="p-4">
                                <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                  {lead.type}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 text-xs inline-block">
                                  {lead.state || "N/A"}
                                </span>
                              </td>
                              <td className="p-4 font-semibold text-blue-400">{lead.city || "N/A"}</td>
                              <td className="p-4 text-slate-300 text-[11px]">
                                {lead.created_at ? new Date(lead.created_at).toLocaleString() : "N/A"}
                              </td>
                              <td className="p-4">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                  {lead.status === "new" ? "Unattended" : lead.status.replace("_", " ")}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              /* ── MAIN MATRIX: Active Agents Grid & Controls ── */
              <div className="space-y-6">
                
                {/* Summary Banner & Removed Agents Toggle */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-purple-400 shrink-0" />
                    <p className="text-xs text-slate-300">
                      Performance matrix showing <strong className="text-white">{(monitoringData.agent_performance || []).filter((a: any) => !removedAgents.includes(a.agent_name)).length} active agent accounts</strong>. Unassigned leads tracked separately.
                    </p>
                  </div>

                  {removedAgents.length > 0 && (
                    <button
                      onClick={() => setShowRemovedList(!showRemovedList)}
                      className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0 transition-colors"
                    >
                      <UserX className="w-3.5 h-3.5 text-rose-400" />
                      <span>{showRemovedList ? "Hide" : "Show"} Removed Agents ({removedAgents.length})</span>
                    </button>
                  )}
                </div>

                {/* Optional Removed Agents Panel */}
                {showRemovedList && removedAgents.length > 0 && (
                  <div className="bg-rose-950/30 border border-rose-500/20 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                        <UserX className="w-4 h-4 text-rose-400" />
                        Removed Agents (Hidden from Active Matrix):
                      </span>
                      <span className="text-[11px] text-slate-400">All historical lead &amp; audit data for these agents remains 100% safe.</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {removedAgents.map((rName) => (
                        <div key={rName} className="bg-slate-900 border border-rose-500/30 px-3 py-1.5 rounded-xl flex items-center gap-3 text-xs">
                          <span className="text-slate-200 font-semibold">{rName}</span>
                          <button
                            onClick={() => handleRestoreAgent(rName)}
                            className="text-emerald-400 hover:text-emerald-300 font-bold text-[11px] hover:underline"
                          >
                            Restore
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(monitoringData.agent_performance || [])
                    .filter((ag: any) => !removedAgents.includes(ag.agent_name))
                    .map((ag: any) => {
                      const isUnassigned = ag.agent_name === "Unassigned";
                      return (
                        <div
                          key={ag.agent_name}
                          className={`bg-slate-900/70 border rounded-2xl p-6 space-y-4 relative transition-all duration-300 ${
                            isUnassigned 
                              ? "border-amber-500/30 bg-slate-900/90 shadow-lg shadow-amber-500/5 hover:border-amber-400" 
                              : "border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="pr-6">
                              <h3 className={`font-bold text-base ${isUnassigned ? "text-amber-400" : "text-white"}`}>{ag.agent_name}</h3>
                              <p className="text-xs text-slate-400">{isUnassigned ? "Leads awaiting assignment" : "Agent Workload Breakdown"}</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className={`text-2xl font-extrabold ${isUnassigned ? "text-amber-400" : "text-purple-400"}`}>{ag.total_assigned}</span>
                              
                              {/* Remove/Delete Agent Option for regular agents */}
                              {!isUnassigned && (
                                <button
                                  onClick={(e) => handleRemoveAgent(ag.agent_name, e)}
                                  className="p-1.5 bg-slate-950 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-lg transition-colors border border-slate-800 hover:border-rose-500/30"
                                  title={`Remove ${ag.agent_name} from active display (preserves all data)`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                              <p className="text-slate-400">Unattended</p>
                              <p className="text-lg font-bold text-amber-400">{ag.new || 0}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                              <p className="text-slate-400">In Progress</p>
                              <p className="text-lg font-bold text-blue-400">{ag.in_progress || 0}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                              <p className="text-slate-400">Responded</p>
                              <p className="text-lg font-bold text-emerald-400">{ag.responded || 0}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                              <p className="text-slate-400">Called &amp; Closed</p>
                              <p className="text-lg font-bold text-purple-400">{ag.called_closed || 0}</p>
                            </div>
                          </div>

                          {/* Special CTA for Unassigned Card */}
                          {isUnassigned ? (
                            <button
                              onClick={() => setActiveLeadExplorer("unattended")}
                              className="w-full mt-2 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all group/btn"
                            >
                              <Filter className="w-3.5 h-3.5 text-amber-400" />
                              <span>Inspect Unassigned State Breakdown ({ag.total_assigned})</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          ) : (
                            <div className="space-y-2 pt-1">
                              {ag.total_assigned > 0 && (
                                <div>
                                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                                    <span>Closure Rate</span>
                                    <span className="text-emerald-400 font-bold">
                                      {Math.round(((ag.called_closed || 0) / ag.total_assigned) * 100)}%
                                    </span>
                                  </div>
                                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-emerald-500/60 rounded-full"
                                      style={{ width: `${Math.round(((ag.called_closed || 0) / ag.total_assigned) * 100)}%` }}
                                    />
                                  </div>
                                </div>
                              )}

                              <button
                                onClick={() => {
                                  setActiveDrawerAgent(ag.agent_name);
                                  setDrawerSelectedState("all");
                                  setDrawerSelectedCity("all");
                                  setDrawerSearchQuery("");
                                }}
                                className="w-full py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all group/btn"
                              >
                                <Eye className="w-3.5 h-3.5 text-purple-400" />
                                <span>Inspect Agent Leads &amp; Breakdown</span>
                                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                  {(monitoringData.agent_performance || []).length === 0 && (
                    <div className="col-span-3 bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                      <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-300">No agent data yet. Create agents and assign leads to see performance stats.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ── VIEW 4: Manager Hierarchy & Team Performance Analytics ── */}
        {viewMode === "team" && (
          <div className="space-y-6">

            {/* Sub-View Switch & Primary Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setTeamSubView("hierarchy")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    teamSubView === "hierarchy"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Manager Hierarchy &amp; Conversion</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTeamSubView("directory")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    teamSubView === "directory"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Team Directory &amp; Accounts ({filteredTeamAccounts.length})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  resetManagerForm();
                  setShowManagerModal(true);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/20 shrink-0 whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Manager / Agent</span>
              </button>
            </div>

            {/* ── SUB-VIEW A: MANAGER HIERARCHY & CONVERSION ANALYTICS ── */}
            {teamSubView === "hierarchy" && (
              <div className="space-y-6">

                {/* Month & Year Filter Bar */}
                <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Period &amp; Timeline Filter</h3>
                        <p className="text-[11px] text-slate-400">Filter manager and agent lead volume and conversion rates by Month &amp; Year</p>
                      </div>
                    </div>

                    {/* Date Dropdowns */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                      {/* Year Selector */}
                      <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                        <span className="text-slate-400 font-semibold">Year:</span>
                        <select
                          id="founder-hierarchy-year"
                          value={selectedHierarchyYear}
                          onChange={(e) => setSelectedHierarchyYear(e.target.value)}
                          className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                        >
                          <option value="all" className="bg-slate-900">All Years</option>
                          {availableYears.map((yr) => (
                            <option key={yr} value={yr} className="bg-slate-900">{yr}</option>
                          ))}
                        </select>
                      </div>

                      {/* Month Selector */}
                      <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                        <span className="text-slate-400 font-semibold">Month:</span>
                        <select
                          id="founder-hierarchy-month"
                          value={selectedHierarchyMonth}
                          onChange={(e) => setSelectedHierarchyMonth(e.target.value)}
                          className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                        >
                          <option value="all" className="bg-slate-900">All Months</option>
                          {monthsList.map((m) => (
                            <option key={m.value} value={m.value} className="bg-slate-900">{m.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Quick Presets */}
                      <button
                        type="button"
                        onClick={() => {
                          const now = new Date();
                          setSelectedHierarchyYear(now.getFullYear().toString());
                          setSelectedHierarchyMonth((now.getMonth() + 1).toString().padStart(2, "0"));
                        }}
                        className="px-3 py-2 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold transition-colors"
                      >
                        This Month
                      </button>

                      {(selectedHierarchyYear !== "all" || selectedHierarchyMonth !== "all") && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedHierarchyYear("all");
                            setSelectedHierarchyMonth("all");
                          }}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
                        >
                          Reset to All Time
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Active Period Badge */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800/60 pt-3">
                    <span className="font-semibold text-slate-300">Active Filter Scope:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                      {selectedHierarchyMonth === "all" ? "All Months" : monthsList.find(m => m.value === selectedHierarchyMonth)?.label}{" "}
                      {selectedHierarchyYear === "all" ? "All Time" : selectedHierarchyYear}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({periodLeads.length} total lead events in this timeline)
                    </span>
                  </div>
                </div>

                {/* Top Hierarchy KPI Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Total Managers */}
                  <div className="bg-slate-900/70 border border-blue-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Total Managers</p>
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-3xl font-extrabold text-blue-400 mt-2">{allManagersList.length}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Management accounts</p>
                  </div>

                  {/* Total Agents */}
                  <div className="bg-slate-900/70 border border-purple-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Total Agents</p>
                      <UserCheck className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-3xl font-extrabold text-purple-400 mt-2">{allAgentsList.length}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Active field agents</p>
                  </div>

                  {/* Period Leads Assigned */}
                  <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Period Leads Assigned</p>
                      <Layers className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-3xl font-extrabold text-white mt-2">{totalPeriodAssignedLeads}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Assigned to team in period</p>
                  </div>

                  {/* Period Team Conversion Rate */}
                  <div className="bg-slate-900/70 border border-emerald-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Team Conversion Rate</p>
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-3xl font-extrabold text-emerald-400 mt-2">{totalPeriodConversionRate}%</p>
                    <p className="text-[11px] text-slate-500 mt-1">Closed leads / Assigned leads</p>
                  </div>
                </div>

                {/* ── MANAGER HIERARCHY ACCORDION LIST ── */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>Manager Team Breakdown &amp; Agent Performance ({managerHierarchy.length} Managers)</span>
                    </h3>

                    <button
                      type="button"
                      onClick={() => {
                        const allOpen = managerHierarchy.every(mh => expandedManagers[mh.manager.username]);
                        const next: Record<string, boolean> = {};
                        managerHierarchy.forEach(mh => {
                          next[mh.manager.username] = !allOpen;
                        });
                        setExpandedManagers(next);
                      }}
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {managerHierarchy.every(mh => expandedManagers[mh.manager.username]) ? "Collapse All" : "Expand All Teams"}
                    </button>
                  </div>

                  {managerHierarchy.length === 0 ? (
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                      <Shield className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                      <p className="font-semibold text-sm text-slate-300">No Managers created yet.</p>
                      <p className="text-xs text-slate-500 mt-1">Click "Create Manager / Agent" above to add your first branch manager.</p>
                    </div>
                  ) : (
                    managerHierarchy.map((mh) => {
                      const isExpanded = expandedManagers[mh.manager.username] !== false; // default open

                      return (
                        <div
                          key={mh.manager.id}
                          className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-200"
                        >
                          {/* Manager Header Card */}
                          <div className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-950/50">
                            {/* Manager Identity */}
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-extrabold text-lg shrink-0">
                                {mh.manager.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <h4 className="font-bold text-white text-base">
                                    @{mh.manager.username}
                                  </h4>
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-500/15 border border-blue-500/30 text-blue-300">
                                    Manager
                                  </span>
                                  {(() => {
                                    const z = mh.manager.assigned_zone || mh.manager.permissions?.zone || "north";
                                    const zName = mh.manager.permissions?.zone_name || (z === "north" ? "North Zone" : `${z.toUpperCase()} Zone`);
                                    const stCount = mh.manager.assigned_states?.length || mh.manager.permissions?.assigned_states?.length || (z === "north" ? 10 : 0);
                                    return (
                                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1 shadow-xs">
                                        <Compass className="w-3 h-3 text-emerald-400" />
                                        {zName} {stCount > 0 ? `(${stCount} States)` : ""}
                                      </span>
                                    );
                                  })()}
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 border border-purple-500/20 text-purple-300">
                                    {mh.agentCount} {mh.agentCount === 1 ? "Agent" : "Agents"} Working Under
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                  {mh.manager.full_name} {mh.manager.phone ? `• ${mh.manager.phone}` : ""}
                                </p>
                              </div>
                            </div>

                            {/* Manager Team Aggregated Metrics & Controls */}
                            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800/60 pt-3 lg:pt-0">
                              {/* Team Assigned Leads in Period */}
                              <div className="text-left lg:text-right">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Team Leads</p>
                                <p className="text-lg font-extrabold text-white">
                                  {mh.teamAssigned} <span className="text-xs font-normal text-slate-500">leads</span>
                                </p>
                              </div>

                              {/* Team Conversion Rate */}
                              <div className="text-left lg:text-right">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Conversion Rate</p>
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-lg font-extrabold ${
                                    mh.teamConversionRate >= 60 ? "text-emerald-400" : mh.teamConversionRate >= 30 ? "text-blue-400" : "text-amber-400"
                                  }`}>
                                    {mh.teamConversionRate}%
                                  </span>
                                  <span className="text-[10px] text-slate-500">({mh.teamClosed} closed)</span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => startEditAccount(mh.manager)}
                                  className="p-2 bg-slate-900 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 rounded-xl border border-slate-800 transition-colors"
                                  title="Edit Manager"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => toggleManagerExpanded(mh.manager.username)}
                                  className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 flex items-center gap-1.5 text-xs font-bold transition-colors"
                                >
                                  <span>{isExpanded ? "Hide Agents" : `Show ${mh.agentCount} Agents`}</span>
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Expanded: Agents Under this Manager */}
                          {isExpanded && (
                            <div className="border-t border-slate-800/80 bg-slate-950/80 p-4 space-y-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                  <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                                  Agents Created &amp; Managed by @{mh.manager.username} ({mh.agentCount})
                                </span>
                              </div>

                              {mh.agents.length === 0 ? (
                                <div className="p-6 text-center text-slate-500 border border-slate-800/50 rounded-xl bg-slate-900/30">
                                  <p className="text-xs">No agents created by @{mh.manager.username} yet.</p>
                                  <p className="text-[11px] text-slate-600 mt-0.5">When this manager creates agents in their manager panel or when you assign agents to them, they will appear here with live lead counts &amp; conversion rates.</p>
                                </div>
                              ) : (
                                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
                                  <table className="w-full text-left text-xs text-slate-300">
                                    <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
                                      <tr>
                                        <th className="p-3">Agent Username</th>
                                        <th className="p-3">Full Name</th>
                                        <th className="p-3 text-center">Period Leads Assigned</th>
                                        <th className="p-3 text-center">Conversion Rate</th>
                                        <th className="p-3 text-right">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60">
                                      {mh.agents.map((ag: any) => {
                                        const { totalAssigned, conversionRate } = ag.stats;

                                        return (
                                          <tr key={ag.id} className="hover:bg-slate-800/40 transition-colors">
                                            <td className="p-3 font-mono font-bold text-white flex items-center gap-1.5">
                                              <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                                              <span>@{ag.username}</span>
                                            </td>

                                            <td className="p-3 text-slate-300 font-medium">
                                              {ag.full_name}
                                              {ag.phone && <span className="text-[11px] text-slate-500 block">{ag.phone}</span>}
                                            </td>

                                            <td className="p-3 text-center font-extrabold text-white text-sm">
                                              {totalAssigned}
                                            </td>

                                            <td className="p-3 text-center">
                                              <div className="flex flex-col items-center gap-1">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                                                  conversionRate >= 60 
                                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                                                    : conversionRate >= 30 
                                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                                                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                                }`}>
                                                  {conversionRate}%
                                                </span>
                                                {totalAssigned > 0 && (
                                                  <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                      className="h-full bg-emerald-500 rounded-full"
                                                      style={{ width: `${conversionRate}%` }}
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                            </td>

                                            <td className="p-3 text-right">
                                              <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    setActiveDrawerAgent(ag.username);
                                                    setDrawerSelectedState("all");
                                                    setDrawerSelectedCity("all");
                                                    setDrawerSearchQuery("");
                                                  }}
                                                  className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-[11px] font-bold transition-colors"
                                                  title="Inspect Agent Lead Log"
                                                >
                                                  Inspect Leads
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => startEditAccount(ag)}
                                                  className="p-1.5 bg-slate-900 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 rounded-lg border border-slate-800 transition-colors"
                                                  title="Edit Agent"
                                                >
                                                  <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => handleDeleteAccount(ag.id, ag.username)}
                                                  className="p-1.5 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-800 transition-colors"
                                                  title="Delete Agent"
                                                >
                                                  <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* ── UNLINKED / FOUNDER DIRECT AGENTS SECTION ── */}
                {unlinkedAgents.length > 0 && (
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-slate-400" />
                        <h4 className="text-sm font-bold text-white tracking-tight">Founder Direct / Central Agents ({unlinkedAgents.length})</h4>
                      </div>
                      <span className="text-xs text-slate-500">Not assigned to a specific branch manager</span>
                    </div>

                    <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
                          <tr>
                            <th className="p-3">Agent Username</th>
                            <th className="p-3">Full Name</th>
                            <th className="p-3 text-center">Period Leads Assigned</th>
                            <th className="p-3 text-center">Conversion Rate</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {unlinkedAgents.map((ag: any) => {
                            const { totalAssigned, conversionRate } = ag.stats;

                            return (
                              <tr key={ag.id} className="hover:bg-slate-800/40 transition-colors">
                                <td className="p-3 font-mono font-bold text-white flex items-center gap-1.5">
                                  <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                                  <span>@{ag.username}</span>
                                </td>

                                <td className="p-3 text-slate-300 font-medium">
                                  {ag.full_name}
                                  {ag.phone && <span className="text-[11px] text-slate-500 block">{ag.phone}</span>}
                                </td>

                                <td className="p-3 text-center font-extrabold text-white text-sm">
                                  {totalAssigned}
                                </td>

                                <td className="p-3 text-center">
                                  <div className="flex flex-col items-center gap-1">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                                      conversionRate >= 60 
                                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                                        : conversionRate >= 30 
                                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    }`}>
                                      {conversionRate}%
                                    </span>
                                    {totalAssigned > 0 && (
                                      <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-emerald-500 rounded-full"
                                          style={{ width: `${conversionRate}%` }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </td>

                                <td className="p-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveDrawerAgent(ag.username);
                                        setDrawerSelectedState("all");
                                        setDrawerSelectedCity("all");
                                        setDrawerSearchQuery("");
                                      }}
                                      className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-[11px] font-bold transition-colors"
                                      title="Inspect Agent Lead Log"
                                    >
                                      Inspect Leads
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => startEditAccount(ag)}
                                      className="p-1.5 bg-slate-900 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 rounded-lg border border-slate-800 transition-colors"
                                      title="Edit Agent"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteAccount(ag.id, ag.username)}
                                      className="p-1.5 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-800 transition-colors"
                                      title="Delete Agent"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ── SUB-VIEW B: TEAM DIRECTORY & ACCOUNT MANAGEMENT TABLE ── */}
            {teamSubView === "directory" && (
              <div className="space-y-4">
                {/* Filter & Action Bar */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => setTeamRoleFilter("all")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        teamRoleFilter === "all"
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      All Accounts ({dbManagersList.filter((a: any) => a.role === "manager" || a.role === "agent").length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamRoleFilter("manager")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        teamRoleFilter === "manager"
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Managers Only ({allManagersList.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamRoleFilter("agent")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        teamRoleFilter === "agent"
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Manager-Created Agents ({allAgentsList.length})</span>
                    </button>
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search by username, manager..."
                      value={teamSearchQuery}
                      onChange={(e) => setTeamSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Team Accounts Table */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-4">Role</th>
                          <th className="p-4">Username</th>
                          <th className="p-4">Created By / Parent Manager</th>
                          <th className="p-4">Full Name</th>
                          <th className="p-4">Contact Info</th>
                          <th className="p-4">Created Date</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredTeamAccounts.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-12 text-center text-slate-500">
                              <Users className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                              <p className="font-semibold text-sm text-slate-400">No matching manager or agent accounts found.</p>
                              <p className="text-xs text-slate-600 mt-1">Try clearing the search or adding a new manager/agent account.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredTeamAccounts.map((m: any) => {
                            const isManager = m.role === "manager";
                            const creatorManager = m.created_by_username 
                              ? m.created_by_username 
                              : (m.created_by ? allManagersList.find((mgr: any) => mgr.id === m.created_by)?.username : null);
                            const creatorName = m.created_by_name || (m.created_by ? allManagersList.find((mgr: any) => mgr.id === m.created_by)?.full_name : null);

                            return (
                              <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                                <td className="p-4">
                                  {isManager ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-bold text-xs">
                                      <Shield className="w-3.5 h-3.5 text-blue-400" />
                                      Manager
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-xs">
                                      <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                                      Agent
                                    </span>
                                  )}
                                </td>

                                <td className="p-4">
                                  <span className="font-mono font-bold text-white text-sm block">
                                    @{m.username}
                                  </span>
                                  {isManager && (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-1">
                                      <Compass className="w-3 h-3 text-emerald-400 shrink-0" />
                                      {m.permissions?.zone_name || (m.assigned_zone === "north" ? "North Zone" : m.assigned_zone ? `${m.assigned_zone.toUpperCase()} Zone` : "North Zone")}
                                      {m.permissions?.assigned_states?.length ? ` (${m.permissions.assigned_states.length} States)` : " (10 States)"}
                                    </span>
                                  )}
                                </td>

                                <td className="p-4">
                                  {isManager ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 text-xs font-semibold">
                                      <Shield className="w-3 h-3 text-slate-500" />
                                      Founder Managed
                                    </span>
                                  ) : creatorManager ? (
                                    <div className="space-y-0.5">
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                                        Manager: @{creatorManager}
                                      </span>
                                      {creatorName && (
                                        <p className="text-[11px] text-slate-400 ml-1">
                                          {creatorName}
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 text-xs">
                                      Founder Direct
                                    </span>
                                  )}
                                </td>

                                <td className="p-4 font-semibold text-white">
                                  {m.full_name}
                                </td>

                                <td className="p-4 space-y-0.5 text-slate-300">
                                  {m.phone && (
                                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                      <Phone className="w-3 h-3 text-slate-500" />
                                      <span>{m.phone}</span>
                                    </div>
                                  )}
                                  {m.email && (
                                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                      <Mail className="w-3 h-3 text-slate-500" />
                                      <span>{m.email}</span>
                                    </div>
                                  )}
                                  {!m.phone && !m.email && <span className="text-slate-600">—</span>}
                                </td>

                                <td className="p-4 text-slate-400 text-xs">
                                  {m.created_at ? new Date(m.created_at).toLocaleDateString() : "—"}
                                </td>

                                <td className="p-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => startEditAccount(m)}
                                      className="p-2 bg-slate-950 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 rounded-xl border border-slate-800 transition-colors"
                                      title="Edit Account"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteAccount(m.id, m.username)}
                                      className="p-2 bg-slate-950 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-800 transition-colors"
                                      title="Delete Account"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ── VIEW 5: Real-time Audit Activity Logs Stream ── */}
        {viewMode === "audit_logs" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              System Audit Log Stream ({monitoringData.activity_logs?.length || 0} events)
            </h3>
            
            <div className="space-y-3 font-mono text-xs max-h-150 overflow-y-auto pr-1">
              {(monitoringData.activity_logs || []).map((log: any) => (
                <div key={log.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <Activity className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-semibold text-purple-300">{log.performed_by}</span>
                      <span className="text-[10px]">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-white font-sans text-[11px]">
                      <span className="text-amber-400 font-bold">[{log.enquiry_type?.toUpperCase()} #{log.enquiry_id}]</span>{" "}
                      {log.action?.replace("_", " ")} — {log.enquiry_title}
                    </p>
                    {log.details && (
                      <p className="text-slate-400 text-[11px] font-sans">{log.details}</p>
                    )}
                  </div>
                </div>
              ))}

              {(monitoringData.activity_logs || []).length === 0 && (
                <div className="py-12 text-center text-slate-500">
                  <FileText className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                  <p className="text-sm">No audit log entries yet. Actions taken in Manager or Agent panels will appear here in real-time.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ── RIGHT SLIDE-OVER DRAWER FOR ASSIGNED AGENT LEADS & BREAKDOWN ── */}
      {activeDrawerAgent && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 overflow-hidden animate-in fade-in duration-300">
          <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col z-10 overflow-hidden">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400 font-extrabold text-lg">
                  {activeDrawerAgent.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white tracking-tight">{activeDrawerAgent}</h2>
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full">
                      {drawerAgentLeads.length} Assigned Leads
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Agent Performance, Region Breakdown &amp; Lead Logs</p>
                </div>
              </div>

              <button
                onClick={() => setActiveDrawerAgent(null)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors text-xs font-bold flex items-center gap-1 border border-slate-700"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Scrollable Content inside Drawer */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Agent Quick Stats Row */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                  <p className="text-slate-400 font-semibold">Total Assigned</p>
                  <p className="text-xl font-extrabold text-purple-400 mt-1">{drawerAgentLeads.length}</p>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                  <p className="text-slate-400 font-semibold">Responded / Closed</p>
                  <p className="text-xl font-extrabold text-emerald-400 mt-1">
                    {drawerAgentLeads.filter((l: any) => l.status === "responded" || l.status === "called_closed").length}
                  </p>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                  <p className="text-slate-400 font-semibold">Pending Action</p>
                  <p className="text-xl font-extrabold text-amber-400 mt-1">
                    {drawerAgentLeads.filter((l: any) => l.status === "new" || l.status === "in_progress").length}
                  </p>
                </div>
              </div>

              {/* State & City Breakdown Pills inside Drawer */}
              <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-4">
                
                {/* Search Bar */}
                <div className="relative w-full">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={drawerSearchQuery}
                    onChange={(e) => setDrawerSearchQuery(e.target.value)}
                    placeholder={`Search ${activeDrawerAgent}'s leads...`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* State Pills */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      Filter by State ({Object.keys(drawerStateCounts).length} States):
                    </span>
                    {drawerSelectedState !== "all" && (
                      <button
                        onClick={() => {
                          setDrawerSelectedState("all");
                          setDrawerSelectedCity("all");
                        }}
                        className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
                      >
                        Reset State
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setDrawerSelectedState("all");
                        setDrawerSelectedCity("all");
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
                        drawerSelectedState === "all"
                          ? "bg-purple-600 border-purple-500 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span>All States</span>
                      <span className="text-[10px] opacity-80">({drawerAgentLeads.length})</span>
                    </button>

                    {Object.entries(drawerStateCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([sName, count]) => {
                        const isSelected = drawerSelectedState === sName;
                        return (
                          <button
                            key={sName}
                            onClick={() => {
                              setDrawerSelectedState(sName);
                              setDrawerSelectedCity("all");
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-2 ${
                              isSelected
                                ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/20"
                                : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            <span>{sName}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                              isSelected ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-400"
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* City Pills */}
                {Object.keys(drawerCityCounts).length > 0 && (
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      Cities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setDrawerSelectedCity("all")}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all border ${
                          drawerSelectedCity === "all"
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                        }`}
                      >
                        All Cities
                      </button>
                      {Object.entries(drawerCityCounts)
                        .sort((a, b) => b[1] - a[1])
                        .map(([cName, count]) => {
                          const isCSelected = drawerSelectedCity === cName;
                          return (
                            <button
                              key={cName}
                              onClick={() => setDrawerSelectedCity(cName)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all border flex items-center gap-1 ${
                                isCSelected
                                  ? "bg-blue-600 border-blue-500 text-white"
                                  : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <span>{cName}</span>
                              <span className="text-blue-400 font-bold">({count})</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Data Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    Showing {filteredDrawerLeads.length} leads assigned to {activeDrawerAgent}
                    {drawerSelectedState !== "all" && <span className="text-emerald-400"> in {drawerSelectedState}</span>}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-3">Client</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">State / City</th>
                        <th className="p-3">Assigned At</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Response Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredDrawerLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-400">
                            No leads matching filters for this agent.
                          </td>
                        </tr>
                      ) : (
                        filteredDrawerLeads.map((lead: any, idx: number) => (
                          <tr key={`${lead.type}-${lead.id}-${idx}`} className="hover:bg-slate-900/90 transition-colors">
                            <td className="p-3 space-y-0.5">
                              <span className="font-bold text-white block">{lead.name}</span>
                              <span className="text-slate-400 text-[11px] block">{lead.phone}</span>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                {lead.type}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-emerald-400 font-semibold block">{lead.state || "N/A"}</span>
                              <span className="text-slate-400 text-[11px] block">{lead.city || "N/A"}</span>
                            </td>
                            <td className="p-3 text-slate-300 text-[11px]">
                              {lead.assigned_at ? new Date(lead.assigned_at).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                lead.status === "new"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : lead.status === "in_progress"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                  : lead.status === "responded"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                  : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                              }`}>
                                {lead.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="p-3 text-[11px] text-slate-400">
                              {lead.note ? (
                                <div
                                  onClick={() => setExpandedNoteId(expandedNoteId === `${lead.type}-${lead.id}` ? null : `${lead.type}-${lead.id}`)}
                                  className={`cursor-pointer transition-colors ${
                                    expandedNoteId === `${lead.type}-${lead.id}`
                                      ? "whitespace-pre-wrap min-w-50 text-slate-300"
                                      : "max-w-37.5 truncate hover:text-slate-300"
                                  }`}
                                  title={expandedNoteId === `${lead.type}-${lead.id}` ? "Click to collapse" : "Click to read full note"}
                                >
                                  {lead.note}
                                </div>
                              ) : (
                                "-"
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ── CREATE / EDIT MANAGER & AGENT MODAL WITH NORTH ZONE ASSIGNMENT ── */}
      {showManagerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  {editingManagerId ? <UserCog className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {editingManagerId ? "Edit Account & Territory" : "Create New Team Account"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {editingManagerId
                      ? "Update credentials, assigned geographic territory, and permissions"
                      : "Add a regional manager with dedicated territory or an agent under a manager"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowManagerModal(false);
                  resetManagerForm();
                }}
                className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body - Scrollable */}
            <form onSubmit={handleSaveManager} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-slate-300">
              
              {/* Role Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-purple-400" /> Account Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewAccountRole("manager")}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                      newAccountRole === "manager"
                        ? "bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-500"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      newAccountRole === "manager" ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-white">Manager (Regional Head)</p>
                      <p className="text-[11px] text-slate-400">Restricted to assigned geographic zone</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewAccountRole("agent")}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                      newAccountRole === "agent"
                        ? "bg-purple-600/15 border-purple-500 text-white shadow-lg shadow-purple-500/10 ring-1 ring-purple-500"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      newAccountRole === "agent" ? "bg-purple-500 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-white">Agent (Executive)</p>
                      <p className="text-[11px] text-slate-400">Assigned leads under a manager</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* If Agent: Assign Parent Manager */}
              {newAccountRole === "agent" && (
                <div className="space-y-1.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-400" /> Assign to Parent Manager
                  </label>
                  <select
                    value={newAccountCreatedBy}
                    onChange={(e) => setNewAccountCreatedBy(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Directly Under Founder</option>
                    {allManagersList.map((mgr: any) => (
                      <option key={mgr.id} value={mgr.id}>
                        @{mgr.username} — {mgr.full_name} ({mgr.assigned_zone || mgr.permissions?.zone_name || "Regional"})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Geographic Zone & Territory Assignment (Strict Isolation for North Zone) */}
              {newAccountRole === "manager" && (
                <div className="space-y-3 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900/60 p-4 sm:p-5 rounded-2xl border border-blue-500/30 shadow-inner">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <label className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-blue-400" />
                        Regional Territory &amp; Zone Assignment
                      </label>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Manager will strictly <span className="text-emerald-400 font-bold">ONLY</span> access data, leads, states, and cities belonging to this zone.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/15 border border-blue-500/30 text-blue-300">
                      Strict Data Isolation
                    </span>
                  </div>

                  {/* Zone Options */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {Object.entries(ZONES).map(([key, zone]) => {
                      const isSelected = newAccountZone === key;
                      const isNorth = key === "north";
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setNewAccountZone(key);
                            setPreviewStateCities(zone.states[0] || null);
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500 shadow-sm"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-300"}`}>
                              {zone.name}
                            </span>
                            {isNorth && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Target
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1">
                            {zone.states.length} States &bull; {getCitiesForStates(zone.states).length} Cities
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Territory States & Cities Coverage Viewer */}
                  {(() => {
                    const currentZone = ZONES[newAccountZone] || ZONES.north;
                    const totalStates = currentZone.states;
                    const totalCities = getCitiesForStates(totalStates);
                    const activeCities = previewStateCities && CITIES[previewStateCities] ? CITIES[previewStateCities] : [];

                    return (
                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-3 mt-2">
                        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                            {currentZone.name} Coverage: {totalStates.length} States &amp; {totalCities.length} Major Cities
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Click any state to preview assigned cities
                          </span>
                        </div>

                        {/* State Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {totalStates.map((st) => {
                            const isPreview = previewStateCities === st;
                            const cityCount = (CITIES[st] || []).length;
                            return (
                              <button
                                key={st}
                                type="button"
                                onClick={() => setPreviewStateCities(st)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                                  isPreview
                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-xs"
                                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                                }`}
                              >
                                {st} <span className="text-[10px] opacity-75">({cityCount})</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Selected State Cities List */}
                        {previewStateCities && (
                          <div className="bg-slate-950/80 rounded-lg p-2.5 border border-slate-800/80 text-[11px] space-y-1.5">
                            <div className="flex items-center justify-between text-slate-400">
                              <span className="font-semibold text-emerald-400">
                                Cities in {previewStateCities} ({activeCities.length}):
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                              {activeCities.map((city) => (
                                <span
                                  key={city}
                                  className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px]"
                                >
                                  {city}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Account Credentials & Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Username <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newManagerUsername}
                    onChange={(e) => setNewManagerUsername(e.target.value)}
                    placeholder="e.g. north_manager"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Password {editingManagerId ? <span className="text-slate-500 text-[10px]">(Leave blank to keep unchanged)</span> : <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type="password"
                    required={!editingManagerId}
                    value={newManagerPassword}
                    onChange={(e) => setNewManagerPassword(e.target.value)}
                    placeholder={editingManagerId ? "Enter new password if changing" : "Enter secure password"}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newManagerFullName}
                    onChange={(e) => setNewManagerFullName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Phone Number</label>
                  <input
                    type="text"
                    value={newManagerPhone}
                    onChange={(e) => setNewManagerPhone(e.target.value)}
                    placeholder="e.g. +91 98110 12345"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={newManagerEmail}
                    onChange={(e) => setNewManagerEmail(e.target.value)}
                    placeholder="e.g. manager.north@relux.in"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Form Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowManagerModal(false);
                    resetManagerForm();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingManager}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isCreatingManager ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Account...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{editingManagerId ? "Update Account" : "Create Account & Assign Territory"}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
