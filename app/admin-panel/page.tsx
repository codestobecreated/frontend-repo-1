"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Search, 
  Lock, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  User, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  LogOut, 
  RefreshCw,
  MessageSquare,
  Zap,
  CheckCircle,
  FileText,
  AlertCircle,
  Download,
  UserCheck,
  BarChart3,
  Sparkles,
  UserPlus,
  X,
  ListChecks,
  CheckSquare,
  Pencil,
  Trash2,
  UserX,
  RotateCcw,
  Edit3,
  Eye,
  EyeOff,
  Compass,
  Shield,
  Globe
} from "lucide-react";
import { BASE_URL } from "@/app/ui/baceurl";
import { ZONES, NORTH_ZONE_STATES, CITIES } from "@/app/ui/states-cities";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function AdminPanel() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Dashboard states
  const [activeTab, setActiveTab] = useState<"franchise" | "zero_investment" | "contact">("franchise");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [assignedFilter, setAssignedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [adminZone, setAdminZone] = useState<string>("all");
  const [adminStates, setAdminStates] = useState<string[]>([]);
  const [adminUsername, setAdminUsername] = useState<string>("");
  const [showTerritoryModal, setShowTerritoryModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [activeTerritoryState, setActiveTerritoryState] = useState("Delhi");

  // Agent Management Modal & States
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [dbAgentsList, setDbAgentsList] = useState<any[]>([]);
  const [newAgentUsername, setNewAgentUsername] = useState("");
  const [newAgentPassword, setNewAgentPassword] = useState("");
  const [newAgentFullName, setNewAgentFullName] = useState("");
  const [newAgentPhone, setNewAgentPhone] = useState("");
  const [newAgentEmail, setNewAgentEmail] = useState("");
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);

  // Edit & Remove Agents State
  const [editingAgentId, setEditingAgentId] = useState<number | null>(null);
  const [removedAgents, setRemovedAgents] = useState<string[]>([]);
  const [showRemovedAgentsList, setShowRemovedAgentsList] = useState(false);

  // Data lists
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    franchise: { total: 0, new: 0, in_progress: 0, responded: 0, called_closed: 0 },
    zero_investment: { total: 0, new: 0, in_progress: 0, responded: 0, called_closed: 0 },
    contact: { total: 0, new: 0, in_progress: 0, responded: 0, called_closed: 0 },
    total: { total: 0, new: 0, in_progress: 0, responded: 0, called_closed: 0 },
    regions: [],
    cities: []
  });

  // Action / Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkAgent, setBulkAgent] = useState("");
  const [isBulkAssigning, setIsBulkAssigning] = useState(false);

  // Form edit states for response tracking & assignment
  const [assignedToInput, setAssignedToInput] = useState("");
  const [statusInput, setStatusInput] = useState("new");
  const [responseNoteInput, setResponseNoteInput] = useState("");

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("relux_admin_token");
    if (savedToken) {
      setAuthToken(savedToken);
      setIsAuthenticated(true);
    }
    const savedUser = localStorage.getItem("relux_admin_username");
    if (savedUser) {
      setAdminUsername(savedUser);
    }
    const savedZone = localStorage.getItem("relux_admin_zone");
    if (savedZone) {
      setAdminZone(savedZone);
    }
    const savedStates = localStorage.getItem("relux_admin_states");
    if (savedStates) {
      try {
        setAdminStates(JSON.parse(savedStates));
      } catch (e) {}
    }
    const savedRemoved = localStorage.getItem("relux_removed_agents");
    if (savedRemoved) {
      try {
        setRemovedAgents(JSON.parse(savedRemoved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchEnquiries();
      fetchStats();
      fetchDbAgents();
    }
  }, [isAuthenticated, authToken, activeTab, statusFilter, regionFilter, cityFilter, assignedFilter, searchQuery]);

  useEffect(() => {
    setCityFilter("all");
    setRegionFilter("all");
  }, [activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    
    const u = usernameInput.trim();
    const p = passwordInput.trim();

    if (!u || !p) {
      setAuthError("Please enter manager username and password.");
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const uName = data.manager?.username || u;
        localStorage.setItem("relux_admin_token", token);
        localStorage.setItem("relux_admin_username", uName);
        localStorage.setItem("relux_admin_role", data.manager?.role || "manager");
        setAdminUsername(uName);
        const z = data.manager?.assigned_zone || "all";
        const st = data.manager?.assigned_states || [];
        localStorage.setItem("relux_admin_zone", z);
        localStorage.setItem("relux_admin_states", JSON.stringify(st));
        setAdminZone(z);
        setAdminStates(st);
        setAuthToken(token);
        setIsAuthenticated(true);
        showToast(`Access Granted. Welcome ${data.manager?.full_name || u} to Relux Manager Panel${z && z !== 'all' ? ` (${z.toUpperCase()} ZONE)` : ''}.`, "success");
        return;
      } else {
        // Fallback for master hardcoded credentials
        if ((u.toLowerCase() === "reluxuser" && p === "Reluxgroups@2024") || p === "relux@admin2025" || p === "ManagerToken") {
          const token = "relux@admin2025";
          localStorage.setItem("relux_admin_token", token);
          localStorage.setItem("relux_admin_username", u);
          localStorage.setItem("relux_admin_zone", "all");
          setAdminUsername(u);
          setAdminZone("all");
          setAuthToken(token);
          setIsAuthenticated(true);
          showToast("Access Granted. Welcome Manager to Relux Admin Panel.", "success");
          return;
        }

        setAuthError(data.error || "Invalid Manager Credentials.");
        showToast(data.error || "Authentication Failed.", "error");
      }
    } catch (err: any) {
      // Offline fallback
      if ((u.toLowerCase() === "reluxuser" && p === "Reluxgroups@2024") || p === "relux@admin2025" || p === "ManagerToken") {
        const token = "relux@admin2025";
        localStorage.setItem("relux_admin_token", token);
        localStorage.setItem("relux_admin_username", u);
        localStorage.setItem("relux_admin_zone", "all");
        setAdminZone("all");
        setAuthToken(token);
        setIsAuthenticated(true);
        showToast("Access Granted (Offline).", "success");
        return;
      }
      setAuthError("Network error connecting to auth server.");
      showToast("Server connection error.", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("relux_admin_token");
    localStorage.removeItem("relux_admin_username");
    localStorage.removeItem("relux_admin_role");
    localStorage.removeItem("relux_admin_zone");
    localStorage.removeItem("relux_admin_states");
    setAdminZone("all");
    setAdminStates([]);
    setAuthToken("");
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
    setEnquiries([]);
    showToast("Logged out successfully.", "info");
  };

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      let endpointType = "franchise";
      if (activeTab === "zero_investment") endpointType = "zero-investment";
      if (activeTab === "contact") endpointType = "contact";

      let queryParams: string[] = [];
      if (statusFilter !== "all") queryParams.push(`status=${statusFilter}`);
      if (regionFilter !== "all") queryParams.push(`state=${encodeURIComponent(regionFilter)}`);
      if (cityFilter !== "all") queryParams.push(`city=${encodeURIComponent(cityFilter)}`);
      if (assignedFilter !== "all") queryParams.push(`assigned_to=${encodeURIComponent(assignedFilter)}`);
      if (searchQuery) queryParams.push(`search=${encodeURIComponent(searchQuery)}`);

      let url = `${BASE_URL}/api/admin/${endpointType}/`;
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      const response = await fetch(url, {
        headers: {
          "X-Admin-Token": authToken,
          "X-User-Name": localStorage.getItem("relux_admin_username") || "Manager Admin",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEnquiries(Array.isArray(data) ? data : []);
      } else {
        if (response.status === 401) {
          handleLogout();
        } else {
          showToast(`Failed to fetch enquiries (${response.status})`, "error");
        }
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      showToast("Network error occurred while fetching enquiries.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    setIsStatsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/admin/stats/`, {
        headers: {
          "X-Admin-Token": authToken,
          "X-User-Name": localStorage.getItem("relux_admin_username") || "Manager Admin",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsStatsLoading(false);
    }
  };

  const fetchDbAgents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/agents/`, {
        headers: { 
          "X-Admin-Token": authToken,
          "X-User-Name": localStorage.getItem("relux_admin_username") || "Manager Admin"
        }
      });
      if (res.ok) {
        const data = await res.json();
        setDbAgentsList(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching DB agents list:", err);
    }
  };

  const resetAgentForm = () => {
    setEditingAgentId(null);
    setNewAgentUsername("");
    setNewAgentPassword("");
    setNewAgentFullName("");
    setNewAgentPhone("");
    setNewAgentEmail("");
  };

  const startEditAgent = (ag: any) => {
    setEditingAgentId(ag.id);
    setNewAgentUsername(ag.username || "");
    setNewAgentPassword(""); // optional when editing
    setNewAgentFullName(ag.full_name || "");
    setNewAgentPhone(ag.phone || "");
    setNewAgentEmail(ag.email || "");
  };

  const handleSaveAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentUsername || !newAgentFullName || (!editingAgentId && !newAgentPassword)) {
      showToast("Username, Full Name (and Password for new accounts) are required.", "error");
      return;
    }

    setIsCreatingAgent(true);
    try {
      const isEdit = editingAgentId !== null;
      const url = isEdit
        ? `${BASE_URL}/api/admin/agents/${editingAgentId}/`
        : `${BASE_URL}/api/admin/agents/`;

      const method = isEdit ? "PATCH" : "POST";
      const payload: any = {
        username: newAgentUsername.trim(),
        full_name: newAgentFullName.trim(),
        phone: newAgentPhone.trim(),
        email: newAgentEmail.trim(),
      };

      if (newAgentPassword.trim()) {
        payload.password = newAgentPassword.trim();
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "X-Admin-Token": authToken,
          "X-User-Name": localStorage.getItem("relux_admin_username") || "Manager Admin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showToast(`Agent '${newAgentFullName}' ${isEdit ? "updated" : "created"} successfully!`, "success");
        resetAgentForm();
        fetchDbAgents();
        fetchStats();
      } else {
        const errData = await response.json();
        showToast(`Failed: ${errData.username || errData.error || "Error saving agent account"}`, "error");
      }
    } catch (err) {
      console.error("Error saving agent:", err);
      showToast("Network error saving agent.", "error");
    } finally {
      setIsCreatingAgent(false);
    }
  };

  const handleRemoveAgent = async (agent: any) => {
    const agentName = agent.full_name || agent.username;
    if (confirm(`Remove agent "${agentName}" (${agent.username}) from active assignment list?\n\nNote: All assigned leads, attended data, response timestamps, and audit history will remain 100% intact.`)) {
      try {
        const updatedRemoved = Array.from(new Set([...removedAgents, agentName, agent.username]));
        setRemovedAgents(updatedRemoved);
        localStorage.setItem("relux_removed_agents", JSON.stringify(updatedRemoved));

        await fetch(`${BASE_URL}/api/admin/agents/${agent.id}/`, {
          method: "DELETE",
          headers: { "X-Admin-Token": authToken }
        });

        showToast(`Agent "${agentName}" removed from active display. Historical data preserved.`, "info");
        fetchDbAgents();
        fetchStats();
      } catch (err) {
        console.error("Error removing agent:", err);
        showToast("Error removing agent.", "error");
      }
    }
  };

  const handleRestoreAgent = (agentName: string) => {
    const updated = removedAgents.filter((name) => name !== agentName);
    setRemovedAgents(updated);
    localStorage.setItem("relux_removed_agents", JSON.stringify(updated));
    showToast(`Agent "${agentName}" restored to active list.`, "success");
    fetchDbAgents();
    fetchStats();
  };

  const handleUpdateEnquiry = async (id: number) => {
    setIsUpdating(id);
    try {
      let endpointType = "franchise";
      if (activeTab === "zero_investment") endpointType = "zero-investment";
      if (activeTab === "contact") endpointType = "contact";

      const payload: any = {
        status: statusInput,
        assigned_to: assignedToInput.trim(),
        response_note: responseNoteInput.trim(),
      };

      const response = await fetch(`${BASE_URL}/api/admin/${endpointType}/${id}/`, {
        method: "PATCH",
        headers: {
          "X-Admin-Token": authToken,
          "X-User-Name": localStorage.getItem("relux_admin_username") || "Manager Admin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedObj = await response.json();
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...updatedObj } : item))
        );
        fetchStats();
        showToast("Enquiry assigned & updated in Database successfully.", "success");
      } else {
        let errMsg = `Server Error ${response.status}`;
        try {
          const errData = await response.json();
          errMsg = JSON.stringify(errData);
        } catch {}
        showToast(`Update Failed: ${errMsg}`, "error");
      }
    } catch (error: any) {
      console.error("Error updating enquiry:", error);
      showToast(`Network error: ${error?.message || "Cannot reach server. Is backend running?"}`, "error");
    } finally {
      setIsUpdating(null);
    }
  };

  const toggleSelectId = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === enquiries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(enquiries.map((e) => e.id)));
    }
  };

  const handleBulkAssign = async () => {
    if (!bulkAgent) { showToast("Select an agent to bulk assign.", "error"); return; }
    if (selectedIds.size === 0) { showToast("Select at least one enquiry to assign.", "error"); return; }

    setIsBulkAssigning(true);
    try {
      let endpointType = "franchise";
      if (activeTab === "zero_investment") endpointType = "zero-investment";
      if (activeTab === "contact") endpointType = "contact";

      const response = await fetch(`${BASE_URL}/api/admin/${endpointType}/bulk_assign/`, {
        method: "POST",
        headers: {
          "X-Admin-Token": authToken,
          "X-User-Name": "Manager Admin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: Array.from(selectedIds),
          assigned_to: bulkAgent,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        showToast(`✅ ${result.updated} enquiries bulk-assigned to '${bulkAgent}'!`, "success");
        setSelectedIds(new Set());
        setBulkAgent("");
        fetchEnquiries();
        fetchStats();
      } else {
        let errMsg = `Server Error ${response.status}`;
        try { const d = await response.json(); errMsg = d.error || errMsg; } catch {}
        showToast(`Bulk assign failed: ${errMsg}`, "error");
      }
    } catch (error: any) {
      showToast(`Network error: ${error?.message || "Cannot reach server."}`, "error");
    } finally {
      setIsBulkAssigning(false);
    }
  };

  const exportToCsv = (items: any[], filename: string) => {
    if (!items || items.length === 0) {
      showToast("No enquiry records to export.", "error");
      return;
    }
    const headers = [
      "ID",
      "Category",
      "Full Name / Name",
      "Email",
      "Phone",
      "State",
      "City",
      "Status",
      "Assigned Agent",
      "Assigned At",
      "Responded At",
      "SLA (Hours)",
      "Response Note",
      "Submitted At",
      "Details"
    ];

    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = items.map((item) => {
      const created = item.created_at || item.submitted_at || "";
      const responded = item.responded_at || "";
      let sla = "N/A";
      if (created && responded) {
        const diffMs = new Date(responded).getTime() - new Date(created).getTime();
        if (!isNaN(diffMs) && diffMs >= 0) {
          sla = (diffMs / (1000 * 60 * 60)).toFixed(1);
        }
      }
      
      let category = item.type || (activeTab === "franchise" ? "Franchise Pipeline" : activeTab === "zero_investment" ? "Zero Investment Partner" : "Contact Inquiry");
      let details = "";
      if (item.franchise_model) details += `Model: ${item.franchise_model}; Investment: ${item.investment_capacity || 'N/A'}`;
      if (item.land_size) details += `Land Size: ${item.land_size}; Electricity: ${item.electricity_connection || 'N/A'}`;
      if (item.subject || item.message) details += `Subject: ${item.subject || ''}; Message: ${item.message || ''}`;

      return [
        item.id,
        category,
        item.full_name || item.name || "",
        item.email || "",
        item.phone || "",
        item.state || "",
        item.city || "",
        item.status || "new",
        item.assigned_to || "Unassigned",
        item.assigned_at || "",
        item.responded_at || "",
        sla,
        item.response_note || "",
        created,
        details
      ].map(escapeCsv).join(",");
    });

    const csvText = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportSelectedCSV = () => {
    const selectedItems = enquiries.filter((e) => selectedIds.has(e.id));
    if (selectedItems.length === 0) {
      showToast("No selected items to export.", "error");
      return;
    }
    exportToCsv(selectedItems, `relux_selected_${selectedItems.length}_enquiries.csv`);
    showToast(`Exported ${selectedItems.length} selected leads to CSV!`, "success");
  };

  const handleDownloadCSV = (exportAll: boolean = false) => {
    let typeParam = activeTab === "zero_investment" ? "zero_investment" : activeTab === "contact" ? "contact" : "franchise";
    if (exportAll) typeParam = "all";

    let queryParams: string[] = [`type=${typeParam}`, `token=${encodeURIComponent(authToken)}` ];
    if (statusFilter !== "all") queryParams.push(`status=${statusFilter}`);
    if (regionFilter !== "all") queryParams.push(`state=${encodeURIComponent(regionFilter)}`);
    if (cityFilter !== "all") queryParams.push(`city=${encodeURIComponent(cityFilter)}`);
    if (assignedFilter !== "all") queryParams.push(`assigned_to=${encodeURIComponent(assignedFilter)}`);
    if (searchQuery) queryParams.push(`search=${encodeURIComponent(searchQuery)}`);

    const exportUrl = `${BASE_URL}/api/admin/export/?${queryParams.join("&")}`;
    window.open(exportUrl, "_blank");
    showToast(`Downloading ${exportAll ? "Master (All Pipelines)" : activeTab.replace("_", " ")} enquiries CSV...`, "info");
  };


  const handleToggleExpand = (item: any) => {
    if (expandedId === item.id) {
      setExpandedId(null);
    } else {
      setExpandedId(item.id);
      setAssignedToInput(item.assigned_to || "");
      setStatusInput(item.status || "new");
      setResponseNoteInput(item.response_note || "");
    }
  };

  // Group enquiries by submitted date (day)
  const formatDateLabel = (key: string) => {
    if (key === "Unknown Date") return key;
    const d = new Date(key + "T00:00:00");
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const todayKey = today.toISOString().split("T")[0];
    const yKey = yesterday.toISOString().split("T")[0];
    if (key === todayKey) return "📅 Today";
    if (key === yKey) return "📅 Yesterday";
    return d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const { groupedEnquiries, dayKeys } = useMemo(() => {
    const formatDateKey = (dateStr: string) => {
      if (!dateStr) return "Unknown Date";
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Unknown Date";
      return d.toISOString().split("T")[0];
    };

    const sorted = [...enquiries].sort((a, b) => {
      const aDate = new Date(a.submitted_at || a.created_at || 0).getTime();
      const bDate = new Date(b.submitted_at || b.created_at || 0).getTime();
      return bDate - aDate;
    });

    const grouped: Record<string, any[]> = {};
    sorted.forEach((item) => {
      const key = formatDateKey(item.submitted_at || item.created_at || "");
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });

    return { groupedEnquiries: grouped, dayKeys: Object.keys(grouped) };
  }, [enquiries]);

  if (!isAuthenticated) {
    return (
      <div className="-mt-24 min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Manager Admin Panel</h1>
            <p className="text-xs text-slate-400 mt-1">Relux Electric Enquiries & Agent User Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Username / Role</label>
              <input
                id="manager-username"
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Manager Username"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Manager Password</label>
              <div className="relative">
                <input
                  id="manager-password"
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-4 pr-11 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-md"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              id="manager-login-btn"
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Access Manager Panel</span>
                </>
              )}
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
            className={`px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md flex items-center gap-3 text-sm animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
                : toast.type === "error"
                ? "bg-rose-950/90 border-rose-500/40 text-rose-200"
                : "bg-slate-900/90 border-slate-700 text-slate-200"
            }`}
          >
            {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toast.type === "info" && <Sparkles className="w-4 h-4 text-emerald-400" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Top Header Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-xl sticky top-0 z-40 shadow-xl shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Left Side: Brand, Identity & Territory */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              {/* Title & Status Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Manager Admin Panel
                </h1>
                
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Manager Active
                </span>

                {adminZone && adminZone !== "all" && (
                  <button
                    type="button"
                    onClick={() => setShowTerritoryModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/40 text-blue-300 shadow-sm transition-all cursor-pointer group"
                    title="Click to view assigned states & cities"
                  >
                    <Compass className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-45 transition-transform" />
                    <span>{adminZone === "north" ? "North Zone Manager (10 States & UTs)" : `${adminZone.toUpperCase()} Territory`}</span>
                    <span className="text-[10px] text-blue-400/80 font-normal underline ml-0.5">View Coverage</span>
                  </button>
                )}
              </div>

              {/* Subtitle with Context & Geographic Scope */}
              <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                <span className="text-slate-300 font-medium">
                  Logged in as <strong className="text-white font-bold">@{adminUsername || "manager"}</strong>
                </span>
                <span className="text-slate-600">•</span>
                {adminZone === "north" ? (
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    Delhi, Punjab, Haryana, UP, HP, J&K, Ladakh, Chandigarh, Uttarakhand, Rajasthan
                  </span>
                ) : (
                  <span>National Territory Access</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Actions Toolbar */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap w-full md:w-auto justify-end">
            
            {/* Create & Manage Agents */}
            <button
              id="manage-agents-btn"
              onClick={() => { setShowAgentModal(true); fetchDbAgents(); }}
              className="px-3.5 py-2.5 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <UserPlus className="w-4 h-4 text-blue-400" />
              <span>Agents ({dbAgentsList.length})</span>
            </button>

            {/* Refresh */}
            <button
              id="refresh-stats-btn"
              onClick={() => { fetchEnquiries(); fetchStats(); fetchDbAgents(); }}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-xl border border-slate-700/60 transition-all active:scale-95"
              title="Refresh Pipeline & Stats"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-emerald-400" : ""}`} />
            </button>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                id="export-dropdown-btn"
                type="button"
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-3.5 py-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExportMenu ? "rotate-180" : ""}`} />
              </button>

              {showExportMenu && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    Export Enquiries
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => { setShowExportMenu(false); handleDownloadCSV(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors flex items-center justify-between"
                  >
                    <span>Current Pipeline ({activeTab === 'franchise' ? 'Franchise' : activeTab === 'zero_investment' ? 'Zero-Inv' : 'Contact'})</span>
                    <Download className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setShowExportMenu(false); handleDownloadCSV(true); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-purple-500/20 hover:text-purple-300 transition-colors flex items-center justify-between"
                  >
                    <span>Master CSV (All Pipelines)</span>
                    <Download className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {selectedIds.size > 0 && (
                    <button
                      type="button"
                      onClick={() => { setShowExportMenu(false); handleExportSelectedCSV(); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors flex items-center justify-between border-t border-slate-800/80 pt-2"
                    >
                      <span>Export {selectedIds.size} Selected Leads</span>
                      <Download className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              id="manager-logout-btn"
              onClick={handleLogout}
              className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-xl border border-rose-500/25 transition-all active:scale-95"
              title="Logout from Manager Panel"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        </div>
      </header>

      {/* Agent User Management Modal */}
      {showAgentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400">
                  {editingAgentId ? <Pencil className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">
                    {editingAgentId ? "Edit Agent Credentials" : "Agent Account Creator"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {editingAgentId ? "Modify agent username, name or password" : "Create real Database credentials for Agent Panel login"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setShowAgentModal(false); resetAgentForm(); }}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Agent Creation / Edit Form */}
            <form onSubmit={handleSaveAgent} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  {editingAgentId ? `Editing Agent ID #${editingAgentId}` : "New Agent User Credentials"}
                </h4>
                {editingAgentId && (
                  <button
                    type="button"
                    onClick={resetAgentForm}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Agent Username *</label>
                  <input
                    id="new-agent-username"
                    type="text"
                    required
                    value={newAgentUsername}
                    onChange={(e) => setNewAgentUsername(e.target.value)}
                    placeholder="e.g. ramesh_agent"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">
                    {editingAgentId ? "New Password (leave blank to keep)" : "Agent Password *"}
                  </label>
                  <input
                    id="new-agent-password"
                    type="password"
                    required={!editingAgentId}
                    value={newAgentPassword}
                    onChange={(e) => setNewAgentPassword(e.target.value)}
                    placeholder={editingAgentId ? "Leave blank to keep existing" : "Set Agent Password"}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Full Name *</label>
                  <input
                    id="new-agent-fullname"
                    type="text"
                    required
                    value={newAgentFullName}
                    onChange={(e) => setNewAgentFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Phone Number</label>
                  <input
                    id="new-agent-phone"
                    type="text"
                    value={newAgentPhone}
                    onChange={(e) => setNewAgentPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                {editingAgentId && (
                  <button
                    type="button"
                    onClick={resetAgentForm}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                )}
                <button
                  id="submit-create-agent-btn"
                  type="submit"
                  disabled={isCreatingAgent}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  {isCreatingAgent ? <Loader2 className="w-4 h-4 animate-spin" /> : editingAgentId ? <Pencil className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{editingAgentId ? "Update Agent Credentials" : "Save Agent User to Database"}</span>
                </button>
              </div>
            </form>

            {/* Created Agent Accounts Table with Edit & Remove options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active Agent Accounts in Database ({dbAgentsList.length})
                </h4>
                {removedAgents.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowRemovedAgentsList(!showRemovedAgentsList)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>{showRemovedAgentsList ? "Hide" : "Show"} Removed Agents ({removedAgents.length})</span>
                  </button>
                )}
              </div>

              {/* Optional Removed Agents Display Panel */}
              {showRemovedAgentsList && removedAgents.length > 0 && (
                <div className="bg-rose-950/30 border border-rose-500/20 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-rose-300 font-bold">
                    <span>Removed Agents (Hidden from Active Matrix &amp; Assignment List):</span>
                    <span className="text-[10px] text-slate-400">All historical lead data remains 100% intact</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {removedAgents.map((rName) => (
                      <div key={rName} className="bg-slate-900 border border-rose-500/30 px-3 py-1.5 rounded-xl flex items-center gap-3 text-xs">
                        <span className="text-slate-200 font-semibold">{rName}</span>
                        <button
                          type="button"
                          onClick={() => handleRestoreAgent(rName)}
                          className="text-emerald-400 hover:text-emerald-300 font-bold text-[11px] flex items-center gap-1 hover:underline"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Restore</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Username</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {dbAgentsList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-slate-500">
                          No agent accounts created yet in database. Create one above!
                        </td>
                      </tr>
                    ) : (
                      dbAgentsList.map((ag) => (
                        <tr key={ag.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-mono font-bold text-emerald-400">{ag.username}</td>
                          <td className="p-3 font-bold text-white">{ag.full_name}</td>
                          <td className="p-3 text-slate-400">{ag.phone || "N/A"}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => startEditAgent(ag)}
                                className="p-1.5 bg-slate-900 hover:bg-blue-600/20 text-blue-400 rounded-lg border border-slate-800 hover:border-blue-500/30 transition-colors"
                                title="Edit Agent Credentials"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRemoveAgent(ag)}
                                className="p-1.5 bg-slate-900 hover:bg-rose-600/20 text-rose-400 rounded-lg border border-slate-800 hover:border-rose-500/30 transition-colors"
                                title="Remove Agent from active list (preserves all lead & log data)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
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
      )}

      {/* Territory Jurisdiction Breakdown Modal */}
      {showTerritoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-3xl p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
                    <span>{adminZone === "north" ? "North Zone Territory Coverage" : `${adminZone.toUpperCase()} Territory`}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Active Jurisdiction
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Strict territorial data boundary: Leads, states &amp; cities exclusively assigned to @{adminUsername || "manager"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowTerritoryModal(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Territory Explanation Notice */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-start gap-3 text-xs text-blue-200">
              <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p>
                As a Regional Manager, all incoming pipeline leads, inquiries, attendance timestamps, and statistics shown in this panel are automatically filtered to your assigned territory. You have full access to these 10 States &amp; 68+ cities.
              </p>
            </div>

            {/* State Selection Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Assigned States &amp; Union Territories (10)
              </label>
              <div className="flex flex-wrap gap-2">
                {NORTH_ZONE_STATES.map((st) => {
                  const isSelected = activeTerritoryState === st;
                  const count = (CITIES[st] || []).length;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setActiveTerritoryState(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm"
                          : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {st} <span className="text-[10px] opacity-70">({count} cities)</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active State Cities Breakdown */}
            {activeTerritoryState && (
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-bold">
                    Assigned Cities in {activeTerritoryState} ({(CITIES[activeTerritoryState] || []).length}):
                  </span>
                  <span className="text-[10px] text-slate-500">Auto-routed leads to your panel</span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {(CITIES[activeTerritoryState] || []).map((city) => (
                    <span
                      key={city}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px]"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTerritoryModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold border border-slate-700 transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Total Enquiries KPI Breakdown Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Total Enquiries Overview
            </h2>
            {isStatsLoading && <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Unattended */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Unattended</span>
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">
                {stats.total?.new || 0}
              </div>
              <div className="text-xs text-slate-400 space-y-0.5">
                <p>Franchise: <span className="font-semibold text-slate-200">{stats.franchise?.new || 0}</span></p>
                <p>Zero-Inv: <span className="font-semibold text-slate-200">{stats.zero_investment?.new || 0}</span></p>
                <p>Contact: <span className="font-semibold text-slate-200">{stats.contact?.new || 0}</span></p>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-blue-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">
                {stats.total?.in_progress || 0}
              </div>
              <div className="text-xs text-slate-400 space-y-0.5">
                <p>Franchise: <span className="font-semibold text-slate-200">{stats.franchise?.in_progress || 0}</span></p>
                <p>Zero-Inv: <span className="font-semibold text-slate-200">{stats.zero_investment?.in_progress || 0}</span></p>
                <p>Contact: <span className="font-semibold text-slate-200">{stats.contact?.in_progress || 0}</span></p>
              </div>
            </div>

            {/* Responded */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Responded</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">
                {stats.total?.responded || 0}
              </div>
              <div className="text-xs text-slate-400 space-y-0.5">
                <p>Franchise: <span className="font-semibold text-slate-200">{stats.franchise?.responded || 0}</span></p>
                <p>Zero-Inv: <span className="font-semibold text-slate-200">{stats.zero_investment?.responded || 0}</span></p>
                <p>Contact: <span className="font-semibold text-slate-200">{stats.contact?.responded || 0}</span></p>
              </div>
            </div>

            {/* Called & Closed */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-purple-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Called & Closed</span>
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">
                {stats.total?.called_closed || 0}
              </div>
              <div className="text-xs text-slate-400 space-y-0.5">
                <p>Franchise: <span className="font-semibold text-slate-200">{stats.franchise?.called_closed || 0}</span></p>
                <p>Zero-Inv: <span className="font-semibold text-slate-200">{stats.zero_investment?.called_closed || 0}</span></p>
                <p>Contact: <span className="font-semibold text-slate-200">{stats.contact?.called_closed || 0}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs: Franchise Pipeline, Zero Investment, Contact Inquiries */}
        <div className="flex border-b border-slate-800 gap-8 text-sm font-semibold">
          <button
            id="tab-franchise"
            onClick={() => setActiveTab("franchise")}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "franchise"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Franchise Pipeline ({stats.franchise?.total || 0})</span>
          </button>

          <button
            id="tab-zero-investment"
            onClick={() => setActiveTab("zero_investment")}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "zero_investment"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Zero Investment Partners ({stats.zero_investment?.total || 0})</span>
          </button>

          <button
            id="tab-contact"
            onClick={() => setActiveTab("contact")}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "contact"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Inquiries ({stats.contact?.total || 0})</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Region Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Region (State)</label>
            <select
              id="filter-region"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Regions</option>
              {(stats.regions || []).map((region: string) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">City</label>
            <select
              id="filter-city"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Cities</option>
              {(stats.cities || []).map((city: string) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Status</label>
            <select
              id="filter-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Enquiries</option>
              <option value="new">Unattended (New)</option>
              <option value="in_progress">In Progress</option>
              <option value="responded">Responded</option>
              <option value="called_closed">Called & Closed</option>
            </select>
          </div>

          {/* Assigned Agent Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Assigned Agent</label>
            <select
              id="filter-assigned"
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Assignments</option>
              <option value="unassigned">Unassigned Only</option>
              {dbAgentsList.map((ag) => (
                <option key={ag.username} value={ag.username}>{ag.full_name} ({ag.username})</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Search</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, Phone, Email..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* ── Bulk Selection Toolbar (shows when items exist) ── */}
        {enquiries.length > 0 && !isLoading && (
          <div className={`rounded-2xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
            selectedIds.size > 0
              ? "bg-emerald-950/40 border-emerald-500/40"
              : "bg-slate-900/60 border-slate-800"
          }`}>
            <div className="flex items-center gap-3">
              <button
                id="select-all-btn"
                onClick={handleSelectAll}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border ${
                  selectedIds.size === enquiries.length && enquiries.length > 0
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>
                  {selectedIds.size === enquiries.length && enquiries.length > 0
                    ? `All ${enquiries.length} Selected ✓`
                    : `Select All ${enquiries.length}`}
                </span>
              </button>

              {selectedIds.size > 0 && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                  {selectedIds.size} selected
                </span>
              )}
            </div>

            {selectedIds.size > 0 && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  id="bulk-agent-select"
                  value={bulkAgent}
                  onChange={(e) => setBulkAgent(e.target.value)}
                  className="flex-1 sm:flex-none sm:w-56 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">— Choose Agent to Bulk Assign —</option>
                  {dbAgentsList.map((ag) => (
                    <option key={ag.username} value={ag.username}>
                      {ag.full_name} ({ag.username})
                    </option>
                  ))}
                </select>

                <button
                  id="bulk-assign-btn"
                  onClick={handleBulkAssign}
                  disabled={isBulkAssigning || !bulkAgent}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all whitespace-nowrap"
                >
                  {isBulkAssigning
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <ListChecks className="w-4 h-4" />}
                  <span>
                    {isBulkAssigning
                      ? "Assigning..."
                      : `Assign ${selectedIds.size} Leads to Agent`}
                  </span>
                </button>

                <button
                  id="export-selected-btn"
                  onClick={handleExportSelectedCSV}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap"
                  title="Export selected leads to CSV"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Selected ({selectedIds.size}) CSV</span>
                </button>

                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700 transition-colors"
                  title="Clear selection"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Enquiry Cards */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
              <p className="text-sm">Loading enquiries...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">No enquiries found matching filters.</p>
            </div>
          ) : (
            dayKeys.map((dayKey) => (
              <div key={dayKey} className="space-y-3">
                {/* ── Date Group Header ── */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-white font-extrabold text-xs tracking-wide">
                      {formatDateLabel(dayKey)}
                    </span>
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                      {groupedEnquiries[dayKey].length} enqu{groupedEnquiries[dayKey].length > 1 ? "iries" : "iry"}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>

                {/* ── Cards for this day ── */}
                {groupedEnquiries[dayKey].map((item: any) => {
                  const isExpanded = expandedId === item.id;
                  const isSelected = selectedIds.has(item.id);
                  const name = item.full_name || item.name || "N/A";
                  const submittedTime = formatTime(item.submitted_at || item.created_at || "");

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl overflow-hidden transition-all border ${
                        isSelected
                          ? "bg-emerald-950/20 border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                          : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="p-4 flex flex-col md:flex-row items-start md:items-center gap-3">
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleSelectId(item.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-slate-600 hover:border-emerald-500"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>

                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">{name}</span>
                            <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full border ${
                              item.status === "new"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : item.status === "in_progress"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                : item.status === "responded"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            }`}>
                              {item.status === "new" ? "Unattended" : item.status.replace("_", " ")}
                            </span>
                            {/* ── Time Badge ── */}
                            {submittedTime && (
                              <span className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                                <Clock className="w-3 h-3" />
                                {submittedTime}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" />{item.phone}</span>
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-emerald-400" />{item.email}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-400" />{item.city}{item.state ? `, ${item.state}` : ""}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-right text-xs">
                            <p className="text-slate-500">Assigned</p>
                            <p className={`font-bold text-xs ${item.assigned_to ? "text-emerald-400" : "text-slate-500 italic"}`}>
                              {item.assigned_to || "Unassigned"}
                            </p>
                          </div>

                          <button
                            onClick={() => handleToggleExpand(item)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700 shrink-0"
                          >
                            <span>{isExpanded ? "Close" : "Assign & Update"}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Action Panel */}
                      {isExpanded && (
                        <div className="border-t border-slate-800 bg-slate-950/80 p-5 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                              <p className="font-semibold text-slate-400 mb-1">Enquiry Details:</p>
                              {activeTab === "franchise" && (
                                <p><span className="text-slate-500">Model:</span> {item.franchise_model || "N/A"} | <span className="text-slate-500">Investment:</span> {item.investment_capacity || "N/A"}</p>
                              )}
                              {activeTab === "zero_investment" && (
                                <p><span className="text-slate-500">Land:</span> {item.land_size} {item.land_unit} | <span className="text-slate-500">Electricity:</span> {item.electricity_connection}</p>
                              )}
                              {activeTab === "contact" && (
                                <p><span className="text-slate-500">Subject:</span> {item.subject || "N/A"}</p>
                              )}
                              <p className="text-slate-400 mt-2 leading-relaxed">{item.message}</p>
                            </div>

                            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-3">
                              <p className="font-semibold text-slate-400">Update Assignment & Status:</p>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Assign To Agent</label>
                                <select
                                  value={expandedId === item.id ? assignedToInput : (item.assigned_to || "")}
                                  onChange={(e) => setAssignedToInput(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                                >
                                  <option value="">Unassigned</option>
                                  {dbAgentsList.map((ag) => (
                                    <option key={ag.username} value={ag.username}>{ag.full_name} ({ag.username})</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Status</label>
                                <select
                                  value={expandedId === item.id ? statusInput : item.status}
                                  onChange={(e) => setStatusInput(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                                >
                                  <option value="new">Unattended (New)</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="responded">Responded</option>
                                  <option value="called_closed">Called &amp; Closed</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Response Note</label>
                                <textarea
                                  rows={2}
                                  value={expandedId === item.id ? responseNoteInput : (item.response_note || "")}
                                  onChange={(e) => setResponseNoteInput(e.target.value)}
                                  placeholder="Add a note about this lead..."
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
                                />
                              </div>
                              <button
                                onClick={() => handleUpdateEnquiry(item.id)}
                                disabled={isUpdating === item.id}
                                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
                              >
                                {isUpdating === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                <span>Save Assignment &amp; Status to DB</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}


