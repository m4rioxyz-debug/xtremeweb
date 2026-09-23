'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  RotateCcw,
  CheckCircle2,
  X,
  FileText,
  ShieldCheck,
  Building,
  Check,
  AlertTriangle,
  ArrowLeft,
  Mail,
  Inbox,
  Clock,
  Phone,
  MapPin,
  Send,
  Eye,
  CheckCheck,
  BarChart3,
  TrendingUp,
  Globe2,
  Headphones,
  Lock,
  LogOut,
  Settings,
  Activity,
  AlertCircle,
  Share2
} from 'lucide-react';
import { Product, productCategories } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import { useContact, ContactMessage } from '@/context/ContactContext';
import { useCompanySettings, defaultCompanySettings } from '@/context/CompanySettingsContext';
import XtremeLogo from '@/components/ui/XtremeLogo';

// Support Ticket Interface
interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  company: string;
  email: string;
  subject: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved';
  category: 'Technical Formulation' | 'Logistics & Export' | 'Certificate Request' | 'Jobsite Advisory';
  createdAt: string;
  description: string;
  notes?: string[];
}

const initialTickets: SupportTicket[] = [];

interface FormData {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  classification: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  packaging: string;
  consumption: string;
  shelfLife: string;
  color: string;
  accentColor: string;
  isFeatured: boolean;
  features: string[];
  applications: string[];
  benefits: string[];
  technicalData: { property: string; value: string }[];
}

const emptyFormData: FormData = {
  name: '',
  slug: '',
  category: 'Tile Adhesives & Grouts',
  categorySlug: 'tile-adhesives',
  classification: 'EN 12004 Class C2TE',
  tagline: '',
  shortDescription: '',
  fullDescription: '',
  packaging: '25 kg multi-layer paper bag',
  consumption: 'Approx. 3.5 - 5.0 kg/m²',
  shelfLife: '12 months',
  color: 'White & Grey',
  accentColor: '#C62828',
  isFeatured: false,
  features: ['High bond strength', 'Extended open time', 'Zero vertical slip'],
  applications: ['Interior and exterior tiling', 'Commercial high-traffic zones'],
  benefits: ['Reduces installation labor', 'Guarantees structural adhesion'],
  technicalData: [
    { property: 'Standard / Norm', value: 'UNE EN 12004:2008' },
    { property: 'Open Time', value: '≥ 30 minutes' },
    { property: 'Tensile Adhesion', value: '≥ 1.0 N/mm²' }
  ]
};

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleFeatured,
    resetToDefaults
  } = useProducts();

  const {
    messages,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteMessage,
    resetMessages
  } = useContact();

  const {
    settings: companySettings,
    updateSettings: updateCompanySettings,
    resetSettings: resetCompanySettings
  } = useCompanySettings();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [loginUsername, setLoginUsername] = useState<string>('admin');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'messages' | 'support' | 'company' | 'settings'>('analytics');

  // Company Settings Form State
  const [companyForm, setCompanyForm] = useState(companySettings);
  const [prevCompanySettings, setPrevCompanySettings] = useState(companySettings);

  if (prevCompanySettings !== companySettings) {
    setPrevCompanySettings(companySettings);
    setCompanyForm(companySettings);
  }

  const handleSaveCompanySettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateCompanySettings(companyForm);
    showToast('Company contact info & social links successfully saved!');
  };

  const handleResetCompanySettings = () => {
    if (window.confirm('Reset all company contact info and social links to default factory values?')) {
      resetCompanySettings();
      setCompanyForm(defaultCompanySettings);
      showToast('Company settings reset to defaults.');
    }
  };

  // Products Management State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Messages State
  const [messageSearch, setMessageSearch] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'contact' | 'product_inquiry'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Support Tickets State
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [ticketSearch, setTicketSearch] = useState('');
  const [ticketFilter, setTicketFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    customerName: '',
    company: '',
    email: '',
    subject: '',
    priority: 'medium' as SupportTicket['priority'],
    category: 'Technical Formulation' as SupportTicket['category'],
    description: ''
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch support tickets from persistent database
  const fetchTickets = useCallback(async () => {
    try {
      const res = await fetch('/api/tickets', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        }
      }
    } catch (e) {
      console.error('Failed to fetch tickets from server:', e);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    queueMicrotask(() => {
      if (isMounted) {
        fetchTickets();
      }
    });
    const interval = setInterval(fetchTickets, 10000);
    const handleFocus = () => fetchTickets();
    window.addEventListener('focus', handleFocus);
    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchTickets]);

  // Check persistent login state
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('xtreme_admin_session');
      queueMicrotask(() => {
        if (savedAuth === 'true') {
          setIsAuthenticated(true);
        }
        setAuthChecked(true);
      });
    } catch (e) {
      console.error(e);
      queueMicrotask(() => {
        setAuthChecked(true);
      });
    }
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('xtreme_admin_session', 'true');
        showToast('Welcome back, Mario. Database synchronized.');
      } else {
        setLoginError(data.error || 'Invalid username or password. Authorized administrator access only.');
      }
    } catch {
      setLoginError('Authentication service connection error. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('xtreme_admin_session');
    showToast('Logged out successfully.');
  };

  // Filtered lists
  const filteredProducts = products.filter((prod) => {
    const matchesCat =
      selectedCategory === 'all' || prod.categorySlug === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.classification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      messageFilter === 'all'
        ? true
        : messageFilter === 'unread'
        ? !msg.isRead
        : msg.type === messageFilter;

    const matchesSearch =
      msg.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
      msg.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
      (msg.company && msg.company.toLowerCase().includes(messageSearch.toLowerCase())) ||
      msg.subject.toLowerCase().includes(messageSearch.toLowerCase()) ||
      (msg.productName && msg.productName.toLowerCase().includes(messageSearch.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const filteredTickets = tickets.filter((tk) => {
    const matchesFilter = ticketFilter === 'all' ? true : tk.status === ticketFilter;
    const matchesSearch =
      tk.ticketNumber.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      tk.customerName.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      tk.company.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      tk.subject.toLowerCase().includes(ticketSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openTicketsCount = tickets.filter((t) => t.status !== 'resolved').length;

  // Product CRUD
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormData(emptyFormData);
    setModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormData({
      name: prod.name,
      slug: prod.slug,
      category: prod.category,
      categorySlug: prod.categorySlug,
      classification: prod.classification,
      tagline: prod.tagline,
      shortDescription: prod.shortDescription,
      fullDescription: prod.fullDescription,
      packaging: prod.packaging,
      consumption: prod.consumption,
      shelfLife: prod.shelfLife,
      color: prod.color,
      accentColor: prod.accentColor,
      isFeatured: !!prod.isFeatured,
      features: [...prod.features],
      applications: [...prod.applications],
      benefits: [...prod.benefits],
      technicalData: prod.technicalData.map((td) => ({ ...td }))
    });
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      alert('Product name and URL slug are required');
      return;
    }

    const payload: Omit<Product, 'id'> = {
      ...formData,
      documents: [
        { title: `${formData.name} - Technical Data Sheet`, type: 'TDS', size: '250 KB' },
        { title: `${formData.name} - Material Safety Sheet`, type: 'MSDS', size: '310 KB' }
      ],
      relatedSlugs: ['xtracol-c1te', 'fibergel-s1', 'supercol-c2tes2']
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
      showToast(`Product "${formData.name}" updated successfully.`);
    } else {
      addProduct(payload);
      showToast(`Product "${formData.name}" created successfully.`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const prod = products.find((p) => p.id === id);
    deleteProduct(id);
    setDeleteConfirmId(null);
    showToast(`Product "${prod?.name || id}" was deleted.`);
  };

  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markAsRead(msg.id);
    }
  };

  // Support Ticket Handlers
  const handleUpdateTicketStatus = async (id: string, newStatus: SupportTicket['status']) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
    showToast(`Ticket status changed to ${newStatus.replace('_', ' ')}.`);

    try {
      await fetch('/api/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (e) {
      console.error('Failed to sync ticket status update:', e);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicketData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.ticket) {
          setTickets((prev) => [data.ticket, ...prev]);
          showToast(`Support Ticket ${data.ticket.ticketNumber} saved to database.`);
        }
      }
    } catch (e) {
      console.error('Failed to save ticket to database:', e);
      showToast('Error saving ticket to database.');
    }

    setNewTicketModalOpen(false);
    setNewTicketData({
      customerName: '',
      company: '',
      email: '',
      subject: '',
      priority: 'medium',
      category: 'Technical Formulation',
      description: ''
    });
  };

  const handleDeleteTicket = async (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket(null);
    }
    showToast('Ticket deleted from database.');
    try {
      await fetch(`/api/tickets?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete ticket from database:', e);
    }
  };

  const handleResetTickets = async () => {
    if (window.confirm('Reset all support tickets? This will purge all tickets from the database.')) {
      setTickets([]);
      setSelectedTicket(null);
      showToast('All support tickets have been reset.');
      try {
        await fetch('/api/tickets?reset=true', { method: 'DELETE' });
      } catch (e) {
        console.error('Failed to reset tickets in database:', e);
      }
    }
  };

  // Dynamic Specs Table
  const handleAddSpec = () => {
    setFormData({
      ...formData,
      technicalData: [...formData.technicalData, { property: '', value: '' }]
    });
  };
  const handleSpecChange = (index: number, field: 'property' | 'value', val: string) => {
    const copy = [...formData.technicalData];
    copy[index][field] = val;
    setFormData({ ...formData, technicalData: copy });
  };
  const handleRemoveSpec = (index: number) => {
    setFormData({
      ...formData,
      technicalData: formData.technicalData.filter((_, i) => i !== index)
    });
  };

  // ==========================================
  // 1. LOGIN GATE SCREEN (If not authenticated)
  // ==========================================
  if (authChecked && !isAuthenticated) {
    return (
      <div className="w-full min-h-[85vh] bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
          {/* Subtle Red Top Gradient Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C62828] via-[#F4511E] to-[#050A5C]" />

          <div className="text-center mb-8">
            <XtremeLogo variant="white" size="md" asLink={false} />
            <h2 className="text-xl font-black text-white mt-4 tracking-tight">
              Corporate Administrator Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authorized access to product catalogs, web analytics & customer inquiries
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="mario"
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-300">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Admin Portal</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. MAIN LOGGED-IN ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="w-full bg-slate-900 text-slate-100 min-h-screen pb-24">
      {/* Top Admin Header */}
      <div className="w-full bg-slate-950 border-b border-slate-800 py-3.5 px-6 sticky top-0 z-30 shadow-md">
        <div className="corporate-container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <XtremeLogo variant="white" size="sm" asLink={false} />
            <span className="hidden sm:inline-block text-xs font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-2.5 py-1 rounded">
              Corporate Management Hub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              target="_blank"
              className="text-xs text-slate-300 hover:text-white hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </Link>

            {/* Admin User Badge & Logout */}
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-bold text-white">admin@xtreme.tn</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950 border border-red-900/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors font-bold"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="w-full bg-slate-950/80 border-b border-slate-800 sticky top-[53px] z-20 backdrop-blur-xs">
        <div className="corporate-container flex items-center gap-2 overflow-x-auto scrollbar-none pt-2">
          {/* Tab 1: Analytics */}
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-3 font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'analytics'
                ? 'border-[#C62828] text-white bg-slate-800/60 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Web Visitors & Analytics</span>
          </button>

          {/* Tab 2: Products */}
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-3 font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'products'
                ? 'border-[#C62828] text-white bg-slate-800/60 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4 text-red-400" />
            <span>Product Catalog</span>
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-[10px] font-mono">
              {products.length}
            </span>
          </button>

          {/* Tab 3: Messages */}
          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-3 font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all relative ${
              activeTab === 'messages'
                ? 'border-[#C62828] text-white bg-slate-800/60 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Inbox className="w-4 h-4 text-sky-400" />
            <span>Inquiries & Leads</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              unreadCount > 0 ? 'bg-red-600 text-white font-black animate-pulse' : 'bg-slate-800 text-slate-400'
            }`}>
              {unreadCount > 0 ? `${unreadCount} new` : messages.length}
            </span>
          </button>

          {/* Tab 4: Support Desk */}
          <button
            type="button"
            onClick={() => setActiveTab('support')}
            className={`flex items-center gap-2 px-4 py-3 font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'support'
                ? 'border-[#C62828] text-white bg-slate-800/60 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Headphones className="w-4 h-4 text-amber-400" />
            <span>Support & Tickets</span>
            {openTicketsCount > 0 && (
              <span className="bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-full text-[10px]">
                {openTicketsCount}
              </span>
            )}
          </button>

          {/* Tab 5: Company & Contact Settings */}
          <button
            type="button"
            onClick={() => setActiveTab('company')}
            className={`flex items-center gap-2 px-4 py-3 font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'company'
                ? 'border-[#C62828] text-white bg-slate-800/60 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4 text-emerald-400" />
            <span>Company & Contact Info</span>
          </button>

          {/* Tab 6: Settings */}
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'border-[#C62828] text-white bg-slate-800/60 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>System & Exports</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="corporate-container pt-8">
        {/* ========================================================= */}
        {/* TAB 1: WEB VISITORS & ANALYTICS DASHBOARD                 */}
        {/* ========================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Top Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-xl shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-bold uppercase">Weekly Visitors</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  12,560
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last week</span>
                </div>
              </div>

              <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-xl shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-bold uppercase">Page Views</span>
                  <Eye className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  54,230
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">4.3 pages / session</span>
              </div>

              <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-xl shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-bold uppercase">TDS Downloads</span>
                  <FileText className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  1,840
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Technical spec downloads</span>
              </div>

              <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-xl shadow-xs">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs font-bold uppercase">Export Leads</span>
                  <Send className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  86
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Container quotations requested</span>
              </div>
            </div>

            {/* Charts Section: 7-Day Traffic Visual Histogram + Top Geographic Markets */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Traffic Chart (8 cols) */}
              <div className="lg:col-span-8 bg-slate-800/90 border border-slate-700 rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-black text-base text-white">
                      Daily Traffic & Visitor Distribution
                    </h3>
                    <p className="text-xs text-slate-400">
                      Unique corporate sessions over the past 7 days
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="flex items-center gap-1 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded bg-[#C62828]" />
                      Desktop (74%)
                    </span>
                    <span className="flex items-center gap-1 text-slate-300 ml-2">
                      <span className="w-2.5 h-2.5 rounded bg-[#050A5C]" />
                      Mobile (26%)
                    </span>
                  </div>
                </div>

                {/* SVG Visual Bar Histogram */}
                <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-700">
                  {[
                    { day: 'Mon', val: 1420, height: '54%' },
                    { day: 'Tue', val: 1890, height: '72%' },
                    { day: 'Wed', val: 2340, height: '88%' },
                    { day: 'Thu', val: 2120, height: '81%' },
                    { day: 'Fri', val: 2680, height: '100%' },
                    { day: 'Sat', val: 1150, height: '44%' },
                    { day: 'Sun', val: 980, height: '37%' },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.val}
                      </div>
                      <div
                        className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-[#B71C1C] to-[#F4511E] transition-all duration-300 group-hover:brightness-125 shadow-md"
                        style={{ height: bar.height }}
                      />
                      <span className="text-xs font-bold text-slate-300">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Peak Activity: <strong>Friday (2,680 unique engineers)</strong></span>
                  <span>Average Time on Site: <strong>3m 42s</strong></span>
                </div>
              </div>

              {/* Geographic Traffic Share (4 cols) */}
              <div className="lg:col-span-4 bg-slate-800/90 border border-slate-700 rounded-xl p-6 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-base text-white mb-1">
                    Top Visitor Countries
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Commercial inquiries by international territory
                  </p>

                  <div className="space-y-4">
                    {[
                      { country: 'Tunisia 🇹🇳', pct: 45, color: 'bg-red-500' },
                      { country: 'Spain (Formulation HQ) 🇪🇸', pct: 32, color: 'bg-amber-500' },
                      { country: 'Regional Export', pct: 15, color: 'bg-sky-500' },
                      { country: 'Other Markets', pct: 8, color: 'bg-slate-500' },
                    ].map((geo, i) => (
                      <div key={i} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-slate-200">{geo.country}</span>
                          <span className="font-mono text-slate-400">{geo.pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${geo.color}`}
                            style={{ width: `${geo.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700 mt-6 text-xs text-slate-400">
                  <span>Top Referral: <strong>Direct Tender Portals & Google Organic</strong></span>
                </div>
              </div>
            </div>

            {/* Popular Catalog Items & Download Traffic */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-800/90 border border-slate-700 rounded-xl">
                <h4 className="font-black text-sm text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Most Visited Product Pages</span>
                </h4>
                <div className="space-y-3 text-xs">
                  {[
                    { name: 'FiberGel S2 (Gel Microfiber C2TE-S2)', visits: '4,120 views', share: '32%' },
                    { name: 'XtraCol C2TE (Improved Porcelain)', visits: '2,890 views', share: '24%' },
                    { name: 'SuperCol PISCINAS (Submerged Aquatic)', visits: '2,150 views', share: '18%' },
                    { name: 'CemAir (Lightweight Thermal Mortar)', visits: '1,640 views', share: '14%' }
                  ].map((p, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/60 rounded-lg flex items-center justify-between border border-slate-700/60">
                      <span className="font-bold text-slate-200">{p.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400">{p.visits}</span>
                        <span className="text-red-400 font-bold">{p.share}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-800/90 border border-slate-700 rounded-xl">
                <h4 className="font-black text-sm text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Manufacturing & Facility Uptime</span>
                </h4>
                <div className="space-y-3 text-xs">
                  {[
                    { facility: 'Valencia Chemical R&D Center (Spain)', status: 'Operational', ping: '100% QA pass' },
                    { facility: 'Tunis Central Dispatch Hub (Tunisia)', status: 'Active Dispatch', ping: 'Distribution online' },
                    { facility: 'Quality Control Batch Lab', status: 'Active', ping: 'UNE-EN tested' }
                  ].map((fac, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/60 rounded-lg flex items-center justify-between border border-slate-700/60">
                      <div>
                        <div className="font-bold text-white">{fac.facility}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{fac.ping}</div>
                      </div>
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {fac.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PRODUCTS CATALOG (EXISTING FULL CRUD)              */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div>
            {/* Products Action Bar */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products by name, classification, or category..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                >
                  {productCategories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="bg-[#C62828] hover:bg-[#B71C1C] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset catalog to default factory products? Any custom additions will be reverted.')) {
                      resetToDefaults();
                      showToast('Catalog reset to factory defaults.');
                    }
                  }}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  title="Reset products to initial state"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-700">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Product Name</th>
                      <th className="py-3.5 px-4 font-bold">Category</th>
                      <th className="py-3.5 px-4 font-bold">Classification</th>
                      <th className="py-3.5 px-4 font-bold">Packaging</th>
                      <th className="py-3.5 px-4 font-bold text-center">Featured</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-750 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-[10px] shadow-xs"
                              style={{ backgroundColor: product.accentColor || '#C62828' }}
                            >
                              {product.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">
                                {product.name}
                              </div>
                              <div className="text-[10px] text-slate-400 line-clamp-1 max-w-xs">
                                {product.tagline}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] font-medium">
                            {product.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-orange-400">
                          {product.classification}
                        </td>

                        <td className="py-3.5 px-4 text-slate-300">
                          {product.packaging}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleFeatured(product.id)}
                            className={`p-1.5 rounded-full transition-colors ${
                              product.isFeatured
                                ? 'text-amber-400 hover:text-amber-300 bg-amber-400/10'
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                            title="Toggle Featured status"
                          >
                            <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-current' : ''}`} />
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                              title="View on site"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(product)}
                              className="p-1.5 text-sky-400 hover:text-sky-300 hover:bg-slate-700 rounded transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(product.id)}
                              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: INBOX & INQUIRIES                                  */}
        {/* ========================================================= */}
        {activeTab === 'messages' && (
          <div>
            {/* Filter & Action Controls */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={messageSearch}
                    onChange={(e) => setMessageSearch(e.target.value)}
                    placeholder="Search by sender, email, company, or subject..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  {(['all', 'unread', 'product_inquiry', 'contact'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setMessageFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                        messageFilter === filter
                          ? 'bg-[#C62828] text-white'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {filter === 'product_inquiry' ? 'Products' : filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      markAllAsRead();
                      showToast('All messages marked as read.');
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mark All Read</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    showToast('Sample inbox inquiries restored.');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
                  title="Reset sample inquiries"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Inbox</span>
                </button>
              </div>
            </div>

            {/* Messages Inbox Table */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
              {filteredMessages.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-700">
                      <tr>
                        <th className="py-3.5 px-4 font-bold w-8">Status</th>
                        <th className="py-3.5 px-4 font-bold">Sender / Company</th>
                        <th className="py-3.5 px-4 font-bold">Inquiry Type</th>
                        <th className="py-3.5 px-4 font-bold">Subject & Excerpt</th>
                        <th className="py-3.5 px-4 font-bold">Date</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {filteredMessages.map((msg) => (
                        <tr
                          key={msg.id}
                          onClick={() => handleSelectMessage(msg)}
                          className={`cursor-pointer transition-colors ${
                            !msg.isRead
                              ? 'bg-slate-800/90 hover:bg-slate-750 font-semibold'
                              : 'hover:bg-slate-750/50 text-slate-300'
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            {!msg.isRead ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-xs" title="Unread" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-slate-600" title="Read" />
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm">
                              {msg.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {msg.company || msg.email}
                            </div>
                            {msg.country && (
                              <span className="text-[10px] text-slate-500">
                                📍 {msg.country}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            {msg.type === 'product_inquiry' ? (
                              <span className="inline-flex items-center gap-1 bg-amber-950/80 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded text-[10px] font-bold">
                                <Package className="w-3 h-3" />
                                {msg.productName || 'Product Spec'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-blue-950/80 text-blue-300 border border-blue-800/60 px-2 py-0.5 rounded text-[10px] font-bold">
                                <Mail className="w-3 h-3" />
                                Contact Form
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="font-bold text-white line-clamp-1">
                              {msg.subject}
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1">
                              {msg.message}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                            {msg.date}
                          </td>

                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleSelectMessage(msg)}
                                className="p-1.5 text-sky-400 hover:text-sky-300 hover:bg-slate-700 rounded transition-colors"
                                title="Open Message"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <a
                                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-slate-700 rounded transition-colors"
                                title="Reply via Email"
                              >
                                <Send className="w-4 h-4" />
                              </a>

                              <button
                                type="button"
                                onClick={() => {
                                  deleteMessage(msg.id);
                                  showToast('Message deleted.');
                                }}
                                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded transition-colors"
                                title="Delete message"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <Inbox className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <h4 className="font-bold text-sm text-white mb-1">No messages match this view</h4>
                  <p className="text-xs">Any new submissions from the contact form or product pages will appear here in real time.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SUPPORT DESK & JOB SITE TICKETS                    */}
        {/* ========================================================= */}
        {activeTab === 'support' && (
          <div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    placeholder="Search tickets by ID, contractor, company, or issue..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  {(['all', 'open', 'in_progress', 'resolved'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setTicketFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                        ticketFilter === filter
                          ? 'bg-[#C62828] text-white'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {filter.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetTickets}
                  className="bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Purge all support tickets from database"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reset All Support</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNewTicketModalOpen(true)}
                  className="bg-[#C62828] hover:bg-[#B71C1C] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Support Ticket</span>
                </button>
              </div>
            </div>

            {/* Support Tickets Table */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
              {filteredTickets.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-700">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Ticket #</th>
                        <th className="py-3.5 px-4 font-bold">Contractor / Company</th>
                        <th className="py-3.5 px-4 font-bold">Category</th>
                        <th className="py-3.5 px-4 font-bold">Subject</th>
                        <th className="py-3.5 px-4 font-bold">Priority</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {filteredTickets.map((tk) => (
                        <tr
                          key={tk.id}
                          onClick={() => setSelectedTicket(tk)}
                          className="hover:bg-slate-750 transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                            {tk.ticketNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{tk.customerName}</div>
                            <div className="text-[10px] text-slate-400">{tk.company}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {tk.category}
                          </td>
                          <td className="py-3.5 px-4 text-white font-medium max-w-xs truncate">
                            {tk.subject}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              tk.priority === 'urgent'
                                ? 'bg-red-950 text-red-400 border border-red-800'
                                : tk.priority === 'high'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-slate-700 text-slate-300'
                            }`}>
                              {tk.priority}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              tk.status === 'open'
                                ? 'bg-red-950 text-red-300 border border-red-800'
                                : tk.status === 'in_progress'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            }`}>
                              {tk.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => setSelectedTicket(tk)}
                                className="p-1.5 text-sky-400 hover:text-white rounded hover:bg-slate-700"
                                title="View ticket details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTicket(tk.id)}
                                className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-slate-700"
                                title="Delete ticket from database"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <Headphones className="w-12 h-12 mx-auto mb-3 opacity-40 text-amber-400" />
                  <h4 className="font-bold text-sm text-white mb-1">Support Desk Cleared</h4>
                  <p className="text-xs max-w-md mx-auto">
                    All support tickets have been reset and saved to the central database. New contractor inquiries and jobsite advisory cases will appear here or can be created above.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: COMPANY, CONTACT & SOCIAL MEDIA SETTINGS           */}
        {/* ========================================================= */}
        {activeTab === 'company' && (
          <div className="space-y-8 pb-12 animate-in fade-in duration-200">
            {/* Header banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-700/80 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/70 border border-red-700/50 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Building className="w-3.5 h-3.5" />
                  <span>Global Brand & Representation</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Company Contact & Social Media Settings
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Manage phone numbers, email addresses, office representation locations, and official social media channels. Changes immediately update the TopBar, Footer, and Contact page in real time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetCompanySettings}
                  className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveCompanySettings}
                  className="px-5 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Preview Panel */}
            <div className="p-6 bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-lg space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <Eye className="w-4 h-4 text-sky-400" />
                  <span>Live Visual Preview (Real-time Website Simulation)</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Live Preview
                </span>
              </div>

              {/* Simulated TopBar Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-700 shadow-md">
                <div className="text-[10px] bg-slate-950 text-slate-400 px-3 py-1.5 font-mono uppercase border-b border-slate-800 flex items-center justify-between">
                  <span>Component: TopBar Header (Desktop & Mobile)</span>
                  <span className="text-emerald-400">Live Render</span>
                </div>
                <div className="bg-[#C62828] text-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1.5 font-normal">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{companyForm.phone}</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-normal">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{companyForm.email}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {companyForm.socialLinks.linkedin && <span className="font-bold cursor-pointer opacity-90 hover:opacity-100">LinkedIn</span>}
                    {companyForm.socialLinks.facebook && <span className="font-bold cursor-pointer opacity-90 hover:opacity-100">Facebook</span>}
                    {companyForm.socialLinks.twitter && <span className="font-bold cursor-pointer opacity-90 hover:opacity-100">X (Twitter)</span>}
                    {companyForm.socialLinks.youtube && <span className="font-bold cursor-pointer opacity-90 hover:opacity-100">YouTube</span>}
                  </div>
                </div>
              </div>

              {/* Simulated Contact Page Info Cards Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-700 shadow-md">
                <div className="text-[10px] bg-slate-950 text-slate-400 px-3 py-1.5 font-mono uppercase border-b border-slate-800 flex items-center justify-between">
                  <span>Component: Contact Page Representation Cards (/contact)</span>
                  <span className="text-emerald-400">Live Render</span>
                </div>
                <div className="bg-slate-950/70 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {/* Card 1: Office */}
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-2 text-[#C62828] font-bold mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>Office & Representation:</span>
                    </div>
                    <div className="text-white font-bold">{companyForm.officeLocation}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{companyForm.officeSubtext}</div>
                  </div>

                  {/* Card 2: Phone */}
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-2 text-sky-400 font-bold mb-1">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number:</span>
                    </div>
                    <div className="text-white font-mono font-bold">{companyForm.phone}</div>
                    <div className="text-[10px] text-amber-400 font-mono mt-0.5">{companyForm.phoneLabel}</div>
                  </div>

                  {/* Card 3: Email */}
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                      <Mail className="w-4 h-4" />
                      <span>Email Address:</span>
                    </div>
                    <div className="text-white font-mono font-bold truncate">{companyForm.email}</div>
                  </div>

                  {/* Card 4: Working Hours */}
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                      <Clock className="w-4 h-4" />
                      <span>Working Hours:</span>
                    </div>
                    <div className="text-white text-xs">{companyForm.workingHours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Inputs Grid */}
            <form onSubmit={handleSaveCompanySettings} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
              {/* Left Column: Direct Contact Information (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Contact & Representation Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Phone Number (Display Format) *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      placeholder="e.g. +(34) 696 472 925"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Displayed in TopBar, Contact Cards & Footer</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Phone Link Dial Digits (tel: format)
                    </label>
                    <input
                      type="text"
                      value={companyForm.phoneCall}
                      onChange={(e) => setCompanyForm({ ...companyForm, phoneCall: e.target.value })}
                      placeholder="e.g. +34696472925"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Click-to-call link for mobile & desktop</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Phone Subtitle / Label
                    </label>
                    <input
                      type="text"
                      value={companyForm.phoneLabel}
                      onChange={(e) => setCompanyForm({ ...companyForm, phoneLabel: e.target.value })}
                      placeholder="e.g. Tunisia Hotline"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Shown below phone on Contact card</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Primary Public Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                      placeholder="e.g. info@xtreme-cc.com"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Used in TopBar, Contact page & Footer</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Office & Representation Location
                    </label>
                    <input
                      type="text"
                      value={companyForm.officeLocation}
                      onChange={(e) => setCompanyForm({ ...companyForm, officeLocation: e.target.value })}
                      placeholder="e.g. Tunis, Tunisia"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Representation Subtitle
                    </label>
                    <input
                      type="text"
                      value={companyForm.officeSubtext}
                      onChange={(e) => setCompanyForm({ ...companyForm, officeSubtext: e.target.value })}
                      placeholder="e.g. Commercial & Technical Representation"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Working / Office Hours
                  </label>
                  <input
                    type="text"
                    value={companyForm.workingHours}
                    onChange={(e) => setCompanyForm({ ...companyForm, workingHours: e.target.value })}
                    placeholder="e.g. Monday - Friday: 8:00 AM - 5:00 PM"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Spanish Technology Standards Note
                  </label>
                  <textarea
                    rows={2}
                    value={companyForm.standardsNote}
                    onChange={(e) => setCompanyForm({ ...companyForm, standardsNote: e.target.value })}
                    placeholder="Certified Management & Quality Standards — UNE EN 12004 & EN 998 (ISO 9001:2015)."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Displayed on the Contact Page Spanish Technology badge</span>
                </div>
              </div>

              {/* Right Column: Social Media Links (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Share2 className="w-4 h-4 text-sky-400" />
                    <span>Social Media Channels</span>
                  </h3>

                  {/* LinkedIn */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-300">
                        LinkedIn Profile URL
                      </label>
                      {companyForm.socialLinks.linkedin && (
                        <a
                          href={companyForm.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-400 hover:underline flex items-center gap-1 font-normal text-[11px]"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={companyForm.socialLinks.linkedin}
                      onChange={(e) => setCompanyForm({
                        ...companyForm,
                        socialLinks: { ...companyForm.socialLinks, linkedin: e.target.value }
                      })}
                      placeholder="https://www.linkedin.com/company/..."
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                  </div>

                  {/* Facebook */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-300">
                        Facebook Page URL
                      </label>
                      {companyForm.socialLinks.facebook && (
                        <a
                          href={companyForm.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-400 hover:underline flex items-center gap-1 font-normal text-[11px]"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={companyForm.socialLinks.facebook}
                      onChange={(e) => setCompanyForm({
                        ...companyForm,
                        socialLinks: { ...companyForm.socialLinks, facebook: e.target.value }
                      })}
                      placeholder="https://www.facebook.com/..."
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                  </div>

                  {/* Twitter / X */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-300">
                        X (Twitter) Profile URL
                      </label>
                      {companyForm.socialLinks.twitter && (
                        <a
                          href={companyForm.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-400 hover:underline flex items-center gap-1 font-normal text-[11px]"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={companyForm.socialLinks.twitter}
                      onChange={(e) => setCompanyForm({
                        ...companyForm,
                        socialLinks: { ...companyForm.socialLinks, twitter: e.target.value }
                      })}
                      placeholder="https://x.com/..."
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                  </div>

                  {/* YouTube */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-300">
                        YouTube Channel URL
                      </label>
                      {companyForm.socialLinks.youtube && (
                        <a
                          href={companyForm.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-400 hover:underline flex items-center gap-1 font-normal text-[11px]"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={companyForm.socialLinks.youtube}
                      onChange={(e) => setCompanyForm({
                        ...companyForm,
                        socialLinks: { ...companyForm.socialLinks, youtube: e.target.value }
                      })}
                      placeholder="https://www.youtube.com/@..."
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-300">
                        WhatsApp Direct Link (Optional)
                      </label>
                      {companyForm.socialLinks.whatsapp && (
                        <a
                          href={companyForm.socialLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline flex items-center gap-1 font-normal text-[11px]"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="text"
                      value={companyForm.socialLinks.whatsapp || ''}
                      onChange={(e) => setCompanyForm({
                        ...companyForm,
                        socialLinks: { ...companyForm.socialLinks, whatsapp: e.target.value }
                      })}
                      placeholder="https://wa.me/..."
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Company & Social Settings</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SYSTEM & EXPORT SETTINGS                           */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (

          <div className="space-y-6 max-w-3xl">
            <div className="p-6 bg-slate-800/90 border border-slate-700 rounded-xl">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-400" />
                <span>Security & Admin Access Control</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Active administrator credentials and session tokens for Xtreme management.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-800">
                  <div>
                    <span className="font-bold text-white block">Default Administrator</span>
                    <span className="text-slate-400">admin@xtreme.tn (Role: Super Admin)</span>
                  </div>
                  <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                    Active Session
                  </span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-800">
                  <div>
                    <span className="font-bold text-white block">Multi-Factor Authentication</span>
                    <span className="text-slate-400">Enforced for international container export releases</span>
                  </div>
                  <span className="text-slate-400 text-xs font-mono">Enabled</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-800/90 border border-slate-700 rounded-xl">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-sky-400" />
                <span>Multilingual & International Regional Hubs</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Languages enabled across web catalogs and public interfaces:
              </p>
              <div className="flex items-center gap-3 text-xs">
                {['English (en)', 'Español (es)', 'Français (fr)', 'العربية (ar - RTL)'].map((l) => (
                  <span key={l} className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-white font-medium">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 text-white shadow-2xl relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-sky-400 block mb-1">
                  {selectedTicket.ticketNumber} • {selectedTicket.category}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedTicket.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold">Customer:</span>
                <span className="text-white font-bold">{selectedTicket.customerName} ({selectedTicket.company})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold">Email:</span>
                <a href={`mailto:${selectedTicket.email}`} className="text-sky-400 hover:underline">
                  {selectedTicket.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold">Priority:</span>
                <span className="uppercase font-bold text-amber-400">{selectedTicket.priority}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold">Current Status:</span>
                <span className="uppercase font-bold text-emerald-400">{selectedTicket.status.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Issue Description:
              </label>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedTicket.description}
              </div>
            </div>

            {selectedTicket.notes && selectedTicket.notes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Internal Engineering Notes:
                </label>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-amber-200/90 font-mono">
                  {selectedTicket.notes[0]}
                </div>
              </div>
            )}

            {/* Status Change Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'open')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded ${
                    selectedTicket.status === 'open' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Open
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'in_progress')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded ${
                    selectedTicket.status === 'in_progress' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'resolved')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded ${
                    selectedTicket.status === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Resolved
                </button>
              </div>

              <a
                href={`mailto:${selectedTicket.email}?subject=Xtreme Technical Support: ${encodeURIComponent(selectedTicket.ticketNumber)}`}
                className="px-4 py-2 bg-[#C62828] hover:bg-[#B71C1C] text-white text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Email Customer</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Create Support Ticket Modal */}
      {newTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl">
            <h3 className="text-lg font-black text-white mb-4">
              Create Jobsite Support Ticket
            </h3>
            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Contractor / Name *</label>
                  <input
                    type="text"
                    required
                    value={newTicketData.customerName}
                    onChange={(e) => setNewTicketData({ ...newTicketData, customerName: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={newTicketData.company}
                    onChange={(e) => setNewTicketData({ ...newTicketData, company: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newTicketData.email}
                    onChange={(e) => setNewTicketData({ ...newTicketData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Priority</label>
                  <select
                    value={newTicketData.priority}
                    onChange={(e) => setNewTicketData({ ...newTicketData, priority: e.target.value as SupportTicket['priority'] })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={newTicketData.subject}
                  onChange={(e) => setNewTicketData({ ...newTicketData, subject: e.target.value })}
                  placeholder="e.g. Substrate preparation inquiry for high-traffic showroom"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Issue Details *</label>
                <textarea
                  rows={4}
                  required
                  value={newTicketData.description}
                  onChange={(e) => setNewTicketData({ ...newTicketData, description: e.target.value })}
                  placeholder="Describe the jobsite conditions, products applied, and required solution..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewTicketModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-400 hover:text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold rounded-lg uppercase tracking-wider shadow"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 text-white shadow-2xl relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded inline-block mb-1">
                  {selectedMessage.type === 'product_inquiry'
                    ? `Product Inquiry: ${selectedMessage.productName || ''}`
                    : 'General Contact Inquiry'}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedMessage.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Profile */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold">From:</span>
                <span className="font-bold text-white">{selectedMessage.name}</span>
              </div>

              {selectedMessage.company && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold">Company:</span>
                  <span className="text-slate-200">{selectedMessage.company}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold">Email:</span>
                <a href={`mailto:${selectedMessage.email}`} className="text-sky-400 hover:underline">
                  {selectedMessage.email}
                </a>
              </div>

              {selectedMessage.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold">Phone:</span>
                  <a href={`tel:${selectedMessage.phone}`} className="text-emerald-400 hover:underline">
                    {selectedMessage.phone}
                  </a>
                </div>
              )}

              {selectedMessage.country && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold">Country:</span>
                  <span className="text-slate-200">{selectedMessage.country}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                <span>Received:</span>
                <span>{selectedMessage.date}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Inquiry Message:
              </label>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  deleteMessage(selectedMessage.id);
                  setSelectedMessage(null);
                  showToast('Message deleted.');
                }}
                className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Message</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded"
                >
                  Close
                </button>

                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="px-5 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-2 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 sm:p-8 my-8 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-black text-white">
                {editingProductId ? 'Edit Product' : 'Add New Certified Product'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setFormData({ ...formData, name, slug: formData.slug || slug });
                    }}
                    placeholder="e.g. FiberGel S3 Super Elastic"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. fibergel-s3-super-elastic"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => {
                      const cat = productCategories.find((c) => c.slug === e.target.value);
                      setFormData({
                        ...formData,
                        categorySlug: e.target.value,
                        category: cat ? cat.name : formData.category
                      });
                    }}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  >
                    {productCategories.filter((c) => c.slug !== 'all').map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Classification / Norm
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.classification}
                    onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                    placeholder="e.g. EN 12004 Class C2TE-S2"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-9 h-9 p-0 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Tagline / Commercial Subtitle
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Super Deformable Gel Adhesive with Microfiber Matrix"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Summary for product cards and catalog previews..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Full Technical Description
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Full engineering description for product detail page..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Packaging
                  </label>
                  <input
                    type="text"
                    value={formData.packaging}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    placeholder="25 kg bag"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Consumption
                  </label>
                  <input
                    type="text"
                    value={formData.consumption}
                    onChange={(e) => setFormData({ ...formData, consumption: e.target.value })}
                    placeholder="Approx. 3.5 - 5.0 kg/m²"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Shelf Life
                  </label>
                  <input
                    type="text"
                    value={formData.shelfLife}
                    onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                    placeholder="12 months"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Technical Specs Table */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-300">
                    Technical Specifications
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="text-[11px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Spec Row</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.technicalData.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Property (e.g. Open Time)"
                        value={spec.property}
                        onChange={(e) => handleSpecChange(idx, 'property', e.target.value)}
                        className="w-1/2 p-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. ≥ 30 minutes)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                        className="w-1/2 p-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        className="p-2 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-[#C62828] rounded cursor-pointer"
                />
                <label htmlFor="featured-check" className="font-bold text-slate-300 cursor-pointer">
                  Feature this product on Homepage showcase
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-400 hover:text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold rounded-lg uppercase tracking-wider shadow-lg"
                >
                  {editingProductId ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-sm w-full p-6 text-center text-white shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h4 className="text-lg font-bold mb-2">Delete Product?</h4>
            <p className="text-xs text-slate-400 mb-6">
              Are you sure you want to remove this product from the catalog? This action will persist in your active session.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg uppercase tracking-wider shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
