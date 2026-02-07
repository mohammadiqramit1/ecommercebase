'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  ShoppingCart, Search, Menu, Truck, Shield, Phone, Mail, X, RotateCcw,
} from 'lucide-react';

export default function Navbar({ cartCount, onNavigate, categories }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
      <div className="hidden md:block bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Free shipping over $50</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Secure payments</span>
            <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> 30-day returns</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> 1-800-LUXE</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> support@luxe.com</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden"><Menu className="w-5 h-5" /></Button></SheetTrigger>
              <SheetContent side="left" className="w-72 pt-12">
                <nav className="space-y-1">
                  <button onClick={() => { onNavigate('/'); setMobileOpen(false); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-muted text-left font-medium">Home</button>
                  <Separator className="my-2" />
                  <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</p>
                  {(categories || []).map(cat => (
                    <button key={cat.slug} onClick={() => { onNavigate(`/category/${cat.slug}`); setMobileOpen(false); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-muted text-left">{cat.name}</button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <button onClick={() => onNavigate('/')} className="text-2xl font-black tracking-tighter">LUXE</button>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className="text-sm font-medium" onClick={() => onNavigate('/')}>Home</Button>
            {(categories || []).map(cat => (
              <Button key={cat.slug} variant="ghost" className="text-sm font-medium" onClick={() => onNavigate(`/category/${cat.slug}`)}>{cat.name}</Button>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}</Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => onNavigate('/cart')}>
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</motion.span>}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="pb-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} autoFocus />
                </div>
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}