"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

type CartTrayProps = {
  whatsappNumber: string;
};

export default function CartTray({ whatsappNumber }: CartTrayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  const cleanNumber = whatsappNumber?.replace(/\D/g, "");
  
  let orderMessage = `Hi Al Tabaq! 👋\n\nI'd like to place an order from your website:\n\n`;
  items.forEach((item, index) => {
    const itemPrice = Number(item.price) || 0;
    orderMessage += `${index + 1}. *${item.name}* x ${item.quantity} = AED ${itemPrice * item.quantity}\n`;
  });
  orderMessage += `\n*Total Amount: AED ${totalPrice}*\n\nThank you!`;
  
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(orderMessage)}`;

  if (totalItems === 0 && !isOpen) return null;

  return (
    <>
      {/* Floating Tray Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-[#c08a29] text-white shadow-[0_10px_30px_rgba(192,138,41,0.5)] transition-all hover:bg-[#a67420] sm:bottom-10 sm:right-10 sm:h-20 sm:w-20"
      >
        <svg className="h-7 w-7 sm:h-9 sm:w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#c08a29] shadow-md sm:h-7 sm:w-7 sm:text-xs"
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tray Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[80] w-full max-w-md bg-[#f8f6f2] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#c08a29]/10 p-6">
                <div>
                  <h2 className="font-heading text-2xl text-[#1f1b16]">Your Order Tray</h2>
                  <p className="text-xs text-brand-muted uppercase tracking-widest mt-1">
                    {totalItems} Items Selected
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-black/5 p-2 text-[#1f1b16] transition hover:bg-black/10"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center opacity-40">
                    <svg className="h-20 w-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="font-heading text-xl">Your tray is empty</p>
                    <p className="text-sm mt-2">Start adding some delicious items!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-200 flex-shrink-0">
                          {item.imageUrl && (
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="truncate font-heading text-lg leading-tight text-[#1f1b16]">
                            {item.name}
                          </h4>
                          <p className="text-sm font-bold text-[#c08a29]">AED {item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 rounded-full border border-[#c08a29]/20 bg-white px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-brand-muted hover:bg-black/5"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-[#c08a29] hover:bg-black/5"
                          >
                            +
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-[#c08a29]/10 bg-white p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-brand-muted font-bold tracking-widest uppercase text-xs">Subtotal</span>
                    <span className="font-heading text-3xl text-[#1f1b16]">AED {totalPrice}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center rounded-2xl bg-brand-wa py-4 text-sm font-bold tracking-widest text-white uppercase shadow-lg transition hover:brightness-110"
                    >
                      <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Order Everything Now
                    </a>
                    <button
                      onClick={clearCart}
                      className="text-xs font-bold text-gray-400 uppercase tracking-widest py-2 hover:text-red-500 transition"
                    >
                      Clear Tray
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
