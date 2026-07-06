'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'; // I'll mock the internal structure here
import { formatPrice } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jul 1', value: 40000 },
  { name: 'Jul 8', value: 30000 },
  { name: 'Jul 15', value: 85000 },
  { name: 'Jul 22', value: 65000 },
  { name: 'Jul 29', value: 90000 },
  { name: 'Aug 5', value: 110000 },
];

const recentProducts = [
  { id: 1, name: 'Noir Silk Slip Dress', sku: 'EL-AW24-001', category: 'Evening Wear', stock: 42, price: 850 },
  { id: 2, name: 'Ivory Cashmere Coat', sku: 'EL-AW24-045', category: 'Outerwear', stock: 3, price: 2400 },
  { id: 3, name: 'Structured Mink Tote', sku: 'EL-ACC-012', category: 'Accessories', stock: 18, price: 1250 },
];

export default function AdminDashboardPage() {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-mink/10 pb-6">
        <div>
          <h1 className="font-headline-lg text-4xl mb-2">Overview</h1>
          <p className="font-body-md text-mink">October 24, 2024</p>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border border-mink/20 flex items-center justify-center text-noir hover:bg-ivory transition-colors relative">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="bg-noir text-ivory font-label-caps text-[10px] tracking-widest px-6 py-3 hover:bg-gold transition-colors">
            GENERATE REPORT
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-ivory border border-mink/10 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-caps text-mink tracking-widest">TOTAL REVENUE</span>
            <span className="material-symbols-outlined text-mink">trending_up</span>
          </div>
          <h3 className="font-headline-lg text-4xl mb-4">€248.5K</h3>
          <p className="font-body-md text-xs text-mink flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            +12.4% vs last month
          </p>
          <span className="material-symbols-outlined absolute -bottom-6 -right-4 text-[120px] text-surface-container opacity-50 select-none">account_balance</span>
        </div>

        <div className="bg-ivory border border-mink/10 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-caps text-mink tracking-widest">UNITS SOLD</span>
            <span className="material-symbols-outlined text-mink">shopping_bag</span>
          </div>
          <h3 className="font-headline-lg text-4xl mb-4">1,204</h3>
          <p className="font-body-md text-xs text-mink flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            +8.1% vs last month
          </p>
        </div>

        <div className="bg-ivory border border-mink/10 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-caps text-mink tracking-widest">AOV</span>
            <span className="material-symbols-outlined text-mink">receipt_long</span>
          </div>
          <h3 className="font-headline-lg text-4xl mb-4">€206</h3>
          <p className="font-body-md text-xs text-mink flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            +3.2% vs last month
          </p>
        </div>

        <div className="bg-ivory border border-mink/10 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-caps text-mink tracking-widest text-[10px]">CONVERSION RATE</span>
            <span className="material-symbols-outlined text-mink">timeline</span>
          </div>
          <h3 className="font-headline-lg text-4xl mb-4">3.4%</h3>
          <p className="font-body-md text-xs text-mink flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
            -0.5% vs last month
          </p>
        </div>
      </div>

      {/* Charts & Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-ivory border border-mink/10 p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="font-headline-md text-2xl mb-1">Revenue Overview</h3>
              <p className="font-body-md text-sm text-mink">Monthly performance for Q3</p>
            </div>
            <div className="flex gap-4 font-label-caps text-xs">
              <button className="border-b-2 border-noir pb-1">MONTH</button>
              <button className="text-mink hover:text-noir transition-colors pb-1">QUARTER</button>
              <button className="text-mink hover:text-noir transition-colors pb-1">YEAR</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e2e2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8C7B6B', fontSize: 10, fontFamily: 'Raleway' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8C7B6B', fontSize: 10, fontFamily: 'Raleway' }} tickFormatter={(val) => `€${val/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0E0E0E', border: 'none', color: '#F9F9F9', fontFamily: 'Raleway', borderRadius: '4px' }}
                  itemStyle={{ color: '#C9A96E' }}
                />
                <Line type="monotone" dataKey="value" stroke="#0E0E0E" strokeWidth={2} dot={{ r: 4, fill: '#0E0E0E' }} activeDot={{ r: 6, fill: '#C9A96E' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-ivory border border-mink/10 p-8 flex flex-col">
          <h3 className="font-headline-md text-2xl mb-8">Demographics</h3>
          <div className="space-y-6 flex-1">
            {[
              { city: 'PARIS', pct: 42 },
              { city: 'LONDON', pct: 28 },
              { city: 'NEW YORK', pct: 15 },
              { city: 'TOKYO', pct: 15 },
            ].map((demo) => (
              <div key={demo.city}>
                <div className="flex justify-between font-label-caps text-xs mb-2">
                  <span>{demo.city}</span>
                  <span>{demo.pct}%</span>
                </div>
                <div className="w-full h-1 bg-surface-container-low">
                  <div className="h-full bg-noir" style={{ width: `${demo.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 font-label-caps text-xs tracking-widest text-mink hover:text-noir transition-colors mt-8">
            VIEW FULL REPORT <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Recent Collections Table */}
      <div className="bg-ivory border border-mink/10">
        <div className="p-6 border-b border-mink/10 flex justify-between items-center">
          <h3 className="font-headline-md text-2xl">Recent Collections</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-mink text-[18px]">search</span>
              <input type="text" placeholder="Search SKU..." className="bg-surface-container-low border-none pl-10 pr-4 py-2 font-body-md text-sm placeholder:text-mink/60 focus:ring-1 focus:ring-noir w-[250px]" />
            </div>
            <button className="text-noir hover:text-gold transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-luxury min-w-full">
            <thead>
              <tr>
                <th className="pl-6">PRODUCT</th>
                <th>SKU</th>
                <th>CATEGORY</th>
                <th>INVENTORY</th>
                <th className="pr-6 text-right">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id}>
                  <td className="pl-6 flex items-center gap-4">
                    <div className="w-10 h-12 bg-surface-container-low"></div>
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="text-mink">{p.sku}</td>
                  <td className="text-mink">{p.category}</td>
                  <td>
                    <span className={cn('px-2 py-1 text-[10px] font-label-caps rounded-full', p.stock > 10 ? 'bg-surface-container text-noir' : 'bg-error-container text-error')}>
                      {p.stock > 10 ? 'In Stock' : 'Low Stock'} ({p.stock})
                    </span>
                  </td>
                  <td className="pr-6 text-right font-medium">€{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-mink/10 text-center">
          <button className="font-label-caps text-[10px] tracking-widest text-mink hover:text-noir transition-colors w-full py-2">
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </div>
  );
}
