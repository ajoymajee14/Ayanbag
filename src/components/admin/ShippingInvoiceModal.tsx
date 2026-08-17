import React from 'react';
import { X, Printer, Download, ShieldCheck, Truck, QrCode } from 'lucide-react';
import { Order, StoreInfo } from '../../types';

interface ShippingInvoiceModalProps {
  order: Order | null;
  storeInfo: StoreInfo;
  onClose: () => void;
}

export const ShippingInvoiceModal: React.FC<ShippingInvoiceModalProps> = ({
  order,
  storeInfo,
  onClose
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className="p-4 border-b border-slate-800 bg-[#0B0F17] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-mono font-bold bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              Tax Invoice & Courier Label
            </span>
            <span className="text-sm font-semibold text-white font-mono">
              #{order.orderNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Label / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 print:p-0 print:bg-white print:text-black" id="printable-invoice">
          
          {/* Top Shipping Label Section (Standard Air Express Dispatch Format) */}
          <div className="border-2 border-dashed border-slate-700 p-5 rounded-xl bg-slate-900/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl font-bold tracking-widest text-[#D4AF37]">AYANBAG</span>
                  <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] font-mono font-bold px-1.5 py-0.5 rounded border border-[#10B981]/30">
                    AIR EXPRESS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  AWB: {order.trackingNumber || 'BLUEDART-AWB-' + order.id.slice(-6).toUpperCase()}
                </p>
              </div>

              {/* Barcode representation */}
              <div className="text-right font-mono text-[10px] text-slate-400">
                <div className="bg-white p-1 rounded inline-block text-black">
                  <div className="h-7 w-44 bg-[repeating-linear-gradient(90deg,#000_0px,#000_2px,#fff_2px,#fff_4px,#000_4px,#000_7px,#fff_7px,#fff_8px)]" />
                </div>
                <div className="mt-1 tracking-widest text-slate-300 font-bold">{order.orderNumber}</div>
              </div>
            </div>

            {/* Shipper & Consignee Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Shipper */}
              <div className="space-y-1 border-r border-slate-800 pr-2">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                  SHIP FROM (SENDER):
                </span>
                <p className="font-semibold text-white">{storeInfo.name}</p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {storeInfo.addressLine1}, {storeInfo.landmark}, {storeInfo.area}, {storeInfo.city} - {storeInfo.pincode}
                </p>
                <p className="text-slate-400 text-[11px]">Phone: {storeInfo.phone} | WhatsApp: {storeInfo.whatsapp}</p>
                <p className="text-slate-400 text-[11px]">GSTIN: 07AAYCA9381Q1ZZ (Horology Division)</p>
              </div>

              {/* Consignee */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#10B981] tracking-wider block">
                  DELIVER TO (CONSIGNEE):
                </span>
                <p className="font-bold text-white text-sm">{order.customerName}</p>
                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                  {order.shippingAddress}
                </p>
                <p className="text-slate-300 font-bold text-xs">
                  {order.city}, {order.state} - <span className="font-mono text-[#D4AF37]">{order.pincode}</span>
                </p>
                <p className="text-slate-300 text-xs font-mono font-semibold">Contact: {order.customerPhone}</p>
              </div>
            </div>

            {/* COD vs Prepaid Alert Tag */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block">Payment Method:</span>
                <span className="font-bold text-sm uppercase text-[#D4AF37]">
                  {order.paymentMode === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMode === 'prepaid' ? 'Prepaid (Verified UPI)' : 'Delhi Store Walk-in'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Amount to Collect at Delivery:</span>
                <span className={`text-xl font-bold font-mono ${order.paymentMode === 'cod' ? 'text-[#10B981]' : 'text-slate-400'}`}>
                  {order.paymentMode === 'cod' ? `₹${order.totalAmount.toLocaleString('en-IN')}` : '₹0.00 (PAID ONLINE)'}
                </span>
              </div>
            </div>
          </div>

          {/* Invoice Item Details Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Itemized Order Particulars
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">
                Date: {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Item / Model</th>
                    <th className="p-3">Edition / Packaging</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Original</th>
                    <th className="p-3 text-right text-[#D4AF37]">Discounted</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/20">
                      <td className="p-3">
                        <div className="font-semibold text-white">{item.productName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{item.series}</div>
                      </td>
                      <td className="p-3 text-slate-300 capitalize text-[11px]">
                        {item.boxOption.replace(/_/g, ' ')}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-white">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-right font-mono text-slate-400 line-through">
                        ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-[#D4AF37]">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-white">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Totals & Tax Calculation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Ayanbag 100% Quality & Verification Seal</span>
              </div>
              <p className="leading-relaxed">
                This master timepiece was calibrated on a mechanical timegrapher. Tested for scratch-resistant sapphire crystal and water seal integrity before sealing.
              </p>
              <p className="text-slate-500 text-[10px] font-mono">
                Returns accepted within 7 days if tamper seal remains unbroken with unboxing video proof.
              </p>
            </div>

            <div className="space-y-2 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal (Base Value):</span>
                <span className="font-mono">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#10B981]">
                <span>Campaign Discount (AYAN45):</span>
                <span className="font-mono">-₹{order.discountAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Express Bluedart Courier Fee:</span>
                <span className="text-[#10B981] font-semibold">FREE (Covered by Ayanbag)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (18% inclusive):</span>
                <span className="font-mono">₹{Math.round(order.totalAmount * 0.18 / 1.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between items-baseline">
                <span className="font-bold text-sm text-white">Grand Total:</span>
                <span className="font-mono text-lg font-extrabold text-[#D4AF37]">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer dispatch sign-off */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Authorized Signature: Ayanbag Horology Dispatch Hub</span>
            <span>Support: {storeInfo.phone} | {storeInfo.email}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
