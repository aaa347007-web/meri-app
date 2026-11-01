/**
 * Zahid Hisab Book — Main Application Entry Point
 * Offline-First Accounting and Ledger for Zahid Mobiles and Photo State
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { PinModal } from './components/common/PinModal';
import { ToastContainer } from './components/common/ToastContainer';
import { Dashboard } from './components/dashboard/Dashboard';
import { TransactionList } from './components/transactions/TransactionList';
import { KhataScreen } from './components/khata/KhataScreen';
import { ReportsScreen } from './components/reports/ReportsScreen';
import { SettingsScreen } from './components/settings/SettingsScreen';
import { TransactionModal } from './components/transactions/TransactionModal';
import { AccountDetailModal } from './components/accounts/AccountDetailModal';
import { ApkGuideModal } from './components/android/ApkGuideModal';

const MainLayout: React.FC = () => {
  const { activeTab, isLoading } = useApp();
  const [showApkGuide, setShowApkGuide] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
          <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-sm font-bold text-white tracking-tight">Zahid Hisab Book</h2>
        <p className="text-xs text-slate-500 mt-1">Opening encrypted local database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Header */}
      <Header onOpenApkGuide={() => setShowApkGuide(true)} />

      {/* Main View Area with Section ErrorBoundary */}
      <main className="flex-1 w-full max-w-xl mx-auto">
        <ErrorBoundary fallbackTitle="Screen Recovery">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'transactions' && <TransactionList />}
          {activeTab === 'khata' && <KhataScreen />}
          {activeTab === 'reports' && <ReportsScreen />}
          {activeTab === 'settings' && <SettingsScreen onOpenApkGuide={() => setShowApkGuide(true)} />}
        </ErrorBoundary>
      </main>

      {/* Floating and Modal Overlays */}
      <TransactionModal />
      <AccountDetailModal />
      <PinModal />
      <ApkGuideModal isOpen={showApkGuide} onClose={() => setShowApkGuide(false)} />
      <ToastContainer />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary fallbackTitle="Application Protected">
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ErrorBoundary>
  );
}
