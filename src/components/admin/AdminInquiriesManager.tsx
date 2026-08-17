import React, { useState } from 'react';
import { 
  Inbox, 
  MessageCircle, 
  Calendar, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Phone, 
  User, 
  Search, 
  Filter, 
  Send, 
  ExternalLink,
  ChevronRight,
  Plus,
  AlertCircle
} from 'lucide-react';
import { CustomerInquiry, InquiryStatus, InquiryType, StoreInfo } from '../../types';

interface AdminInquiriesManagerProps {
  inquiries: CustomerInquiry[];
  storeInfo: StoreInfo;
  onUpdateInquiryStatus: (inquiryId: string, status: InquiryStatus) => void;
  onAddInquiryNote: (inquiryId: string, note: string) => void;
  onAddNewInquiry: (inquiry: CustomerInquiry) => void;
}

export const AdminInquiriesManager: React.FC<AdminInquiriesManagerProps> = ({
  inquiries,
  storeInfo,
  onUpdateInquiryStatus,
  onAddInquiryNote,
  onAddNewInquiry
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // New Lead form state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadType, setNewLeadType] = useState<InquiryType>('whatsapp_lead');
  const [newLeadModel, setNewLeadModel] = useState('');
  const [newLeadMessage, setNewLeadMessage] = useState('');

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.customerPhone.includes(searchQuery) ||
      (inq.customerEmail && inq.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.watchModel && inq.watchModel.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = 
      selectedTypeFilter === 'all' || inq.type === selectedTypeFilter;

    const matchesStatus = 
      selectedStatusFilter === 'all' || inq.status === selectedStatusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <AlertCircle className="w-3 h-3" /> New Lead
          </span>
        );
      case 'in_contact':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Clock className="w-3 h-3" /> In Conversation
          </span>
        );
      case 'appointment_confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
            <Calendar className="w-3 h-3" /> Walk-in Confirmed
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            <CheckCircle2 className="w-3 h-3" /> Closed / Purchased
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeIcon = (type: InquiryType) => {
    switch (type) {
      case 'whatsapp_lead':
        return <MessageCircle className="w-4 h-4 text-[#25D366]" />;
      case 'store_appointment':
        return <Calendar className="w-4 h-4 text-[#D4AF37]" />;
      case 'support_email':
        return <Mail className="w-4 h-4 text-sky-400" />;
      case 'custom_request':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  const handleOpenWhatsAppReply = (inq: CustomerInquiry) => {
    const raw = inq.customerPhone.replace(/[^0-9]/g, '');
    const num = raw.startsWith('91') ? raw : `91${raw}`;
    const text = `Hello ${inq.customerName}, this is Ayanbag Luxury Horology (${storeInfo.addressLine1}, Jamia Nagar, New Delhi). Regarding your inquiry on the ${inq.watchModel || 'Master Collection timepiece'}:`;
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    const inq: CustomerInquiry = {
      id: `inq-${Date.now()}`,
      type: newLeadType,
      customerName: newLeadName,
      customerPhone: newLeadPhone,
      watchModel: newLeadModel || 'General Master Catalog Inquiry',
      message: newLeadMessage || 'Lead recorded via Admin Desk.',
      source: 'Admin Manual Entry',
      date: new Date().toISOString(),
      status: 'new',
      priority: 'high'
    };

    onAddNewInquiry(inq);
    setIsAddLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadMessage('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
            Customer Inquiries & VIP Showroom Bookings
          </h2>
          <p className="text-xs text-slate-400">
            Unified inbox syncing support@ayanbag.in, WhatsApp webhook inquiries, and Delhi boutique visits
          </p>
        </div>

        <button
          onClick={() => setIsAddLeadModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Record Walk-in / Phone Lead</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-3.5 shadow-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer name, phone (+91...), email, model, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="bg-[#0B0F17] border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Inquiry Channels</option>
              <option value="whatsapp_lead">WhatsApp Direct Leads</option>
              <option value="store_appointment">Delhi Showroom Appointments</option>
              <option value="support_email">Email Inquiries (support@ayanbag.in)</option>
              <option value="custom_request">Custom Sourcing Requests</option>
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-[#0B0F17] border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New Leads</option>
              <option value="in_contact">In Conversation</option>
              <option value="appointment_confirmed">Appointment Confirmed</option>
              <option value="resolved">Resolved / Purchased</option>
            </select>
          </div>

        </div>

        {/* Channel Counts Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Inquiries', count: inquiries.length },
            { id: 'whatsapp_lead', label: 'WhatsApp Leads', count: inquiries.filter(i => i.type === 'whatsapp_lead').length },
            { id: 'store_appointment', label: 'VIP Showroom Visits', count: inquiries.filter(i => i.type === 'store_appointment').length },
            { id: 'support_email', label: 'support@ayanbag.in', count: inquiries.filter(i => i.type === 'support_email').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTypeFilter(tab.id)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedTypeFilter === tab.id
                  ? 'bg-slate-800 text-[#D4AF37] font-bold border border-slate-700'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] font-mono font-bold bg-black/40 px-1.5 py-0.2 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List & Conversation Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Inquiries List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredInquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-[#111827] rounded-2xl border border-slate-800">
              <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No customer inquiries found</p>
              <p className="text-xs text-slate-500 mt-1">Try changing the channel filter or search keywords</p>
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => {
                  setSelectedInquiry(inq);
                  setNoteInput(inq.internalNotes || '');
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-sm flex flex-col justify-between gap-3 ${
                  selectedInquiry?.id === inq.id
                    ? 'bg-slate-900 border-[#D4AF37]/60 shadow-lg'
                    : 'bg-[#111827] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                        {getTypeIcon(inq.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-xs">{inq.customerName}</h4>
                          <span className="font-mono text-[11px] text-slate-400">{inq.customerPhone}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block font-mono">
                          Source: {inq.source} • {new Date(inq.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {getStatusBadge(inq.status)}
                    </div>
                  </div>

                  {/* Watch Model Tag */}
                  {inq.watchModel && (
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-[#D4AF37] font-medium font-mono">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>Interested In: {inq.watchModel}</span>
                    </div>
                  )}

                  {/* Appointment timing if present */}
                  {inq.preferredDate && (
                    <div className="mt-2 text-xs font-semibold text-white bg-slate-900/90 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Scheduled Showroom Visit: {inq.preferredDate} at {inq.preferredTime}</span>
                    </div>
                  )}

                  {/* Customer Message text */}
                  <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                    "{inq.message}"
                  </p>
                </div>

                {/* Footer Quick Controls */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400 font-mono">
                    {inq.internalNotes ? (
                      <span className="text-slate-300 italic">Note: {inq.internalNotes.slice(0, 40)}...</span>
                    ) : (
                      <span>Click to view details & reply</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenWhatsAppReply(inq);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-[11px] transition-colors cursor-pointer shadow-sm"
                    >
                      <MessageCircle className="w-3 h-3 fill-current" />
                      <span>Reply on WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Right 1 Col: Active Lead Detail Inspector & Notes Pad */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-md h-fit sticky top-20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Lead Response & Notes Center
            </h3>
            {selectedInquiry && (
              <span className="text-[10px] text-slate-400 font-mono">
                ID: {selectedInquiry.id}
              </span>
            )}
          </div>

          {selectedInquiry ? (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Customer Name</span>
                <p className="text-sm font-bold text-white">{selectedInquiry.customerName}</p>
                <p className="font-mono text-slate-300 mt-0.5">{selectedInquiry.customerPhone}</p>
                {selectedInquiry.customerEmail && (
                  <p className="text-slate-400 mt-0.5">{selectedInquiry.customerEmail}</p>
                )}
              </div>

              {/* Status Updater */}
              <div>
                <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1.5">
                  Update Lead Pipeline Status:
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => onUpdateInquiryStatus(selectedInquiry.id, e.target.value as InquiryStatus)}
                  className="w-full bg-[#0B0F17] border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="new">🔴 New Lead (Needs Immediate Contact)</option>
                  <option value="in_contact">🔵 In Active Conversation</option>
                  <option value="appointment_confirmed">🟡 Showroom Appointment Confirmed</option>
                  <option value="resolved">🟢 Resolved / Order Placed</option>
                </select>
              </div>

              {/* Internal Notes area */}
              <div>
                <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1.5">
                  Internal Staff Notes (Staff only):
                </label>
                <textarea
                  rows={3}
                  placeholder="Add notes about customer preference, wrist size, video sent..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 text-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  onClick={() => onAddInquiryNote(selectedInquiry.id, noteInput)}
                  className="mt-1.5 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs border border-slate-700 transition-colors cursor-pointer"
                >
                  Save Internal Note
                </button>
              </div>

              {/* Direct WhatsApp Call/Chat */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => handleOpenWhatsAppReply(selectedInquiry)}
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Launch WhatsApp Direct Chat</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <User className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs">Select any customer inquiry on the left to inspect details and log notes.</p>
            </div>
          )}
        </div>

      </div>

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsAddLeadModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200 text-xs space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Record Customer Walk-in / Phone Lead</h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="space-y-3.5">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Customer Full Name <span className="text-rose-400">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Sharma"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">WhatsApp / Phone Number <span className="text-rose-400">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98100 12345"
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Channel / Lead Type</label>
                <select
                  value={newLeadType}
                  onChange={(e) => setNewLeadType(e.target.value as InquiryType)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="store_appointment">Walk-in Delhi Showroom Visit</option>
                  <option value="whatsapp_lead">WhatsApp Chat Inquiry</option>
                  <option value="support_email">Email Request (support@ayanbag.in)</option>
                  <option value="custom_request">Custom Watch Sourcing</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Watch Model of Interest</label>
                <input
                  type="text"
                  placeholder="e.g. Submariner Ceramic 41mm"
                  value={newLeadModel}
                  onChange={(e) => setNewLeadModel(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Notes / Specific Request</label>
                <textarea
                  rows={3}
                  placeholder="Customer visited showroom to inspect Glidelock clasp and sapphire glass under loupe..."
                  value={newLeadMessage}
                  onChange={(e) => setNewLeadMessage(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold rounded-xl"
                >
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
