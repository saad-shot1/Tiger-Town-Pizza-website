/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Utensils, 
  ShoppingBag, 
  Truck, 
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const BUSINESS_NAME = "Tiger Town Pizza";
const TAGLINE = "Fierce Flavor. Fresh Pizza.";
const PHONE = "+16203775002";
const WHATSAPP = "+16203775002";
const ADDRESS = "302 N Main St, St John, KS 67576";
const MAPS_LINK = "https://maps.app.goo.gl/ExixzmemHCf1RFXp8";

const HOURS = [
  { day: "Sunday", time: "11 AM – 8 PM" },
  { day: "Monday", time: "CLOSED", closed: true },
  { day: "Tuesday", time: "11 AM – 8 PM" },
  { day: "Wednesday", time: "11 AM – 8 PM" },
  { day: "Thursday", time: "11 AM – 8 PM" },
  { day: "Friday", time: "11 AM – 8 PM" },
  { day: "Saturday", time: "11 AM – 8 PM" },
];

const SERVICES = [
  { title: "Takeout", icon: ShoppingBag },
  { title: "Dine-in", icon: Utensils },
  { title: "Delivery", icon: Truck },
  { title: "Online Order", icon: ShoppingBag },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-white font-sans selection:bg-primary selection:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b border-border pb-6 mb-10">
          <div className="flex items-center gap-3">
            <img 
              src="/src/logo.png" 
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/50" 
              referrerPolicy="no-referrer"
              alt="Tiger Town Pizza Logo"
            />
            <div className="logo text-2xl font-black uppercase tracking-wider text-primary">
              {BUSINESS_NAME}
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-6 mr-6">
              {['Home', 'Menu', 'About Us', 'Contact'].map((item) => (
                <span key={item} className="text-sm font-medium text-dim hover:text-white cursor-pointer transition-colors">
                  {item}
                </span>
              ))}
            </div>
            <a
              href={`tel:${PHONE}`}
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-card border border-border rounded-xl px-4 py-6 mb-8 flex flex-col gap-4 overflow-hidden"
          >
            {['Home', 'Menu', 'About Us', 'Contact'].map((item) => (
              <span key={item} className="text-lg font-medium text-white py-2 border-b border-white/5">
                {item}
              </span>
            ))}
            <a
              href={`tel:${PHONE}`}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-4"
            >
              Call Now
            </a>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-[1fr_340px] gap-10 flex-grow">
          
          {/* Main Content (Hero) */}
          <main className="flex flex-col justify-center py-10 lg:pr-10">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mb-8"
            >
              {/* Replace the URL below with your logo.png after uploading */}
              <img 
                src="/src/logo.png" 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-border shadow-2xl hover:border-primary transition-all bg-card" 
                referrerPolicy="no-referrer"
                alt="Tiger Town Pizza Featured Logo"
              />
            </motion.div>
            <div className="mb-6">
              <span className="inline-block bg-primary/15 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                OPEN TODAY UNTIL 8:00 PM
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
              Fierce Flavor.<br />
              <span className="text-primary underline decoration-border underline-offset-8 decoration-4">Fresh Pizza.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-dim mb-10 max-w-xl leading-relaxed">
              Your local destination for premium, stone-baked pizzas in the heart of St John. Fresh ingredients, hand-tossed dough, and the boldest flavors in Kansas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${PHONE}`}
                className="px-10 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity text-center"
              >
                Order Takeout
              </a>
              <button
                className="px-10 py-4 bg-transparent border border-border text-white rounded-lg font-bold text-lg hover:bg-white/5 transition-colors"
              >
                View Full Menu
              </button>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="sidebar flex flex-col gap-6">
            
            {/* Services Card */}
            <div className="card bg-card border border-border rounded-xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 pb-2 border-b border-white/5">
                Main Services
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((s) => (
                  <div key={s.title} className="bg-white/5 border border-border p-3 rounded-lg flex flex-col items-center justify-center text-center gap-1 group hover:border-primary/50 transition-colors">
                    <s.icon size={16} className="text-dim group-hover:text-primary transition-colors" />
                    <span className="text-[13px] font-semibold">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="card bg-card border border-border rounded-xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 pb-2 border-b border-white/5">
                Opening Hours
              </h3>
              <ul className="space-y-2">
                {HOURS.map((h) => (
                  <li key={h.day} className={`flex justify-between text-sm py-1 border-b border-white/5 last:border-0 ${h.closed ? 'text-red-500' : 'text-gray-300'}`}>
                    <span className="font-medium">{h.day}</span>
                    <span className="font-bold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Card */}
            <div className="card bg-card border border-border rounded-xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 pb-2 border-b border-white/5">
                Location
              </h3>
              <p className="text-sm text-dim mb-4">{ADDRESS}</p>
              <div className="w-full h-32 bg-border/20 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer border border-border hover:border-primary/30 transition-colors" onClick={() => window.open(MAPS_LINK, '_blank')}>
                <MapPin className="text-dim group-hover:text-primary transition-colors z-10" size={24} />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2 text-[10px] text-dim tracking-[0.2em] uppercase font-bold">ST JOHN, KANSAS</span>
              </div>
            </div>

          </aside>
        </div>

        {/* Info Footer Grid */}
        <footer className="info-footer grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-border">
          <div className="info-item">
            <h4 className="text-[11px] font-bold text-dim uppercase tracking-widest mb-2">Call Us</h4>
            <p className="text-sm font-bold">{PHONE}</p>
          </div>
          <div className="info-item">
            <h4 className="text-[11px] font-bold text-dim uppercase tracking-widest mb-2">WhatsApp</h4>
            <p className="text-sm font-bold">{WHATSAPP}</p>
          </div>
          <div className="info-item">
            <h4 className="text-[11px] font-bold text-dim uppercase tracking-widest mb-2">Address</h4>
            <p className="text-sm font-bold">St John, KS 67576</p>
          </div>
          <div className="info-item">
            <h4 className="text-[11px] font-bold text-dim uppercase tracking-widest mb-2">Email</h4>
            <p className="text-sm font-bold italic opacity-70">hello@tigertownpizza.com</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
