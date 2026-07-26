"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useCurrency } from "@/components/CurrencyContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, total, count } = useCart();
  const { convert, symbol } = useCurrency();

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-brand" /> Your Cart
          </h1>
          <p className="text-gray-500 mt-2">{count} {count === 1 ? "item" : "items"} in cart</p>
        </div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-12 text-center">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500 mb-6">Add some server plans to get started. Our best sellers are Minecraft and VPS.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/minecraft" className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-brand-dark">Minecraft Plans</Link>
              <Link href="/vps" className="px-6 py-3 bg-white/[0.05] border border-white/[0.08] text-white rounded-xl text-sm hover:bg-white/[0.08]">VPS Plans</Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => {
                  const converted = convert(item.price);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="premium-card p-5 flex items-center gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.processor} • {item.ram} • {item.storage} • CPU {item.cpu}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08]"><Minus className="w-3 h-3" /></button>
                          <span className="text-sm font-semibold text-white w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08]"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-price">{symbol}{converted.value}</p>
                        <p className="text-[11px] text-gray-600">× {item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)} className="mt-2 text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 ml-auto"><Trash2 className="w-3 h-3" /> Remove</button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <button onClick={clearCart} className="text-sm text-gray-500 hover:text-white flex items-center gap-2 mt-4"><Trash2 className="w-4 h-4" /> Clear Cart</button>
            </div>

            <div className="premium-card p-6 h-fit sticky top-24">
              <h3 className="font-bold text-white mb-6">Order Summary</h3>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal ({count} items)</span><span className="text-white font-semibold">{symbol}{convert(total).value}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Setup Fee</span><span className="text-emerald-400">Free</span></div>
                <div className="flex justify-between"><span className="text-gray-500">DDoS Protection</span><span className="text-emerald-400">Included</span></div>
                <div className="pt-3 border-t border-white/[0.06] flex justify-between text-base"><span className="text-white font-bold">Total</span><span className="text-price font-extrabold text-xl">{symbol}{convert(total).value}<span className="text-xs text-gray-500 font-normal">/mo</span></span></div>
              </div>
              <Link href="https://client.crazynode.in" target="_blank" className="w-full flex items-center justify-center gap-2 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-all">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-gray-600 mt-3 text-center">Secure checkout via client.crazynode.in • Instant setup</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
