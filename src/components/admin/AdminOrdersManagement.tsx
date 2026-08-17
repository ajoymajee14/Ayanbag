import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Printer, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  ChevronDown, 
  ExternalLink,
  Package,
  Calendar,
  Phone,
  MapPin,
  Eye,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { Order, OrderStatus, PaymentMethod } from '../../types';

interface AdminOrdersManagementProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onOpenWhatsAppModal: (order: Order) => void;
  onOpenInvoiceModal: (order: Order) => void;
  onAddNewOrderModal?: () => void;
}

export const AdminOrdersManagement: React.FC<AdminOrdersManagementProps> = ({
  orders,
  onUpdateOrderStatus,
  onOpenWhatsAppModal,
  onOpenInvoiceModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState<string>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Search query matches Order Number, Customer Name, Phone, City, Product Name
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(i => i.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Status filter
    const matchesStatus = 
      selectedStatusTab === 'all' || order.status === selectedStatusTab;

    // Payment mode filter
    const matchesPayment = 
      selectedPaymentFilter === 'all' || order.paymentMode === selectedPaymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending_cod':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            <span>Pending COD</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Package className="w-3 h-3" />
            <span>Processing</span>
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <Truck className="w-3 h-3" />
            <span>Dispatched</span>
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Truck className="w-3 h-3" />
            <span>Out for Delivery</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Delivered</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getPaymentBadge = (paymentMode: PaymentMethod) => {
    switch (paymentMode) {
      case 'cod':
        return (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
            COD
          </span>
        );
      case 'prepaid':
        return (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
            Prepaid (UPI)
          </span>
        );
      case 'store_pickup':
        return (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
            Store Walk-in
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
            Orders & WhatsApp Dispatch Board
          </h2>
          <p className="text-xs text-slate-400">
            Real-time COD verification, automated BlueDart tracking, and instant WhatsApp customer updates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 block font-mono">Total Order Records:</span>
            <span className="text-sm font-bold text-[#D4AF37] font-mono">{orders.length} Orders</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800/80 space-y-3.5 shadow-md">
        
        {/* Row 1: Search & Dropdown Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Global Order Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID (#AYAN-...), Customer Name, Phone (+91...), or City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0B0F17] border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
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

          {/* Payment Method Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 shrink-0 font-medium">Payment:</span>
            <select
              value={selectedPaymentFilter}
              onChange={(e) => setSelectedPaymentFilter(e.target.value)}
              className="bg-[#0B0F17] border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Payment Modes</option>
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="prepaid">Prepaid (UPI / Online)</option>
              <option value="store_pickup">Delhi Store Walk-in</option>
            </select>
          </div>
        </div>

        {/* Row 2: Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'pending_cod', label: 'Pending COD', count: orders.filter(o => o.status === 'pending_cod').length },
            { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
            { id: 'shipped', label: 'Dispatched', count: orders.filter(o => o.status === 'shipped').length },
            { id: 'out_for_delivery', label: 'Out for Delivery', count: orders.filter(o => o.status === 'out_for_delivery').length },
            { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
            { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedStatusTab === tab.id
                  ? 'bg-[#D4AF37] text-black font-bold shadow'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                selectedStatusTab === tab.id ? 'bg-black/20 text-black font-bold' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Orders Table */}
      <div className="border border-slate-800/80 rounded-2xl bg-[#111827] overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer & Contact</th>
                <th className="p-4">Watch Items</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 text-right">Quick Dispatch Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <Package className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No orders match your filter criteria</p>
                    <p className="text-xs text-slate-500 mt-1">Try resetting the search bar or status pill filters</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="p-4 align-top">
                      <div className="font-mono font-bold text-white text-xs">
                        {order.orderNumber}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(order.orderDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      {order.trackingNumber && (
                        <div className="text-[10px] text-[#D4AF37] font-mono mt-1">
                          AWB: {order.trackingNumber.slice(0, 14)}...
                        </div>
                      )}
                    </td>

                    {/* Customer & Contact */}
                    <td className="p-4 align-top">
                      <div className="font-bold text-white text-xs">{order.customerName}</div>
                      <div className="text-[11px] text-slate-300 font-mono mt-0.5 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{order.customerPhone}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 truncate max-w-[180px]">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{order.city}, {order.state}</span>
                      </div>
                    </td>

                    {/* Watch Items */}
                    <td className="p-4 align-top">
                      <div className="space-y-1.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <img
                              src={item.thumbnail}
                              alt={item.productName}
                              className="w-8 h-8 rounded object-cover bg-black border border-slate-700 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <span className="font-semibold text-slate-200 block truncate max-w-[170px] text-xs">
                                {item.productName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono block">
                                Qty: {item.quantity} • {item.boxOption === 'luxury_wood_box' ? 'Wooden Box' : 'Full Kit'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4 align-top">
                      <div className="font-mono font-bold text-white text-sm">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-[#10B981] font-mono">
                        Saved: ₹{order.discountAmount.toLocaleString('en-IN')}
                      </div>
                    </td>

                    {/* Payment Mode */}
                    <td className="p-4 align-top">
                      {getPaymentBadge(order.paymentMode)}
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-4 align-top">
                      <div className="space-y-1.5">
                        <div>{getStatusBadge(order.status)}</div>
                        
                        {/* Interactive Status Changer */}
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-[#0B0F17] border border-slate-700 text-slate-300 text-[10px] rounded px-2 py-1 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                        >
                          <option value="pending_cod">Pending COD</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Dispatched</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    {/* Quick Dispatch Actions */}
                    <td className="p-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Send WhatsApp Tracking Link */}
                        <button
                          onClick={() => onOpenWhatsAppModal(order)}
                          title="Generate & Send WhatsApp Tracking"
                          className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </button>

                        {/* Print Invoice / Shipping Label */}
                        <button
                          onClick={() => onOpenInvoiceModal(order)}
                          title="Print Air Express Shipping Label & Tax Invoice"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-slate-700 transition-colors cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {/* View Full Order Details */}
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          title="View Full Order Breakdown"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
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

      {/* Order Detail Inspection Modal */}
      {selectedOrderDetails && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedOrderDetails(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200 text-xs space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                  Order Details Inspector
                </span>
                <h3 className="text-base font-bold text-white font-mono">
                  #{selectedOrderDetails.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Customer Info:</span>
                <p className="font-bold text-white">{selectedOrderDetails.customerName}</p>
                <p className="font-mono text-slate-300">{selectedOrderDetails.customerPhone}</p>
                <p className="text-slate-400">{selectedOrderDetails.customerEmail || 'No email provided'}</p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Shipping Address:</span>
                <p className="text-slate-200">{selectedOrderDetails.shippingAddress}</p>
                <p className="font-semibold text-white">{selectedOrderDetails.city}, {selectedOrderDetails.state} - {selectedOrderDetails.pincode}</p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Ordered Watch Models:</span>
              <div className="space-y-2 border border-slate-800 rounded-xl p-3 bg-slate-900/40">
                {selectedOrderDetails.items.map((i, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={i.thumbnail} alt={i.productName} className="w-10 h-10 rounded object-cover bg-black" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold text-white">{i.productName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{i.series} • Qty: {i.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#D4AF37]">
                      ₹{(i.unitPrice * i.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenInvoiceModal(selectedOrderDetails);
                  setSelectedOrderDetails(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => {
                  onOpenWhatsAppModal(selectedOrderDetails);
                  setSelectedOrderDetails(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Send WhatsApp Tracking</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
