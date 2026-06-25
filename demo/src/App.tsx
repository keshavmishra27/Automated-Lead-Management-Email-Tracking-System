import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { LeadCapturePage } from './pages/LeadCapturePage'
import { SubmissionSuccessPage } from './pages/SubmissionSuccessPage'
import { DashboardPage } from './pages/DashboardPage'
import { LeadDetailsPage } from './pages/LeadDetailsPage'
import { AiInsightsPage } from './pages/AiInsightsPage'
import { ActivityLogsPage } from './pages/ActivityLogsPage'
import { SendMailPage } from './pages/SendMailPage'
import { LeadsPage } from './pages/LeadsPage'
import { HomePage } from './pages/HomePage'

export type PageView = 'home' | 'capture' | 'success' | 'dashboard' | 'leads' | 'lead-details' | 'ai-insights' | 'activity' | 'send-mail';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('home')
  const [submittedData, setSubmittedData] = useState<any>(null)

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink relative">
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar onNavigate={(view) => setCurrentView(view as PageView)} />
        <div className="flex-1 flex flex-col">
          {currentView === 'dashboard' && (
            <DashboardPage onNavigate={(view) => setCurrentView(view as PageView)} />
          )}
          
          {currentView === 'lead-details' && (
            <LeadDetailsPage onBack={() => setCurrentView('dashboard')} />
          )}

          {currentView === 'leads' && (
            <LeadsPage onNavigate={(view) => setCurrentView(view as PageView)} />
          )}

          {currentView === 'ai-insights' && (
            <AiInsightsPage onNavigate={(view) => setCurrentView(view as PageView)} />
          )}

          {currentView === 'activity' && (
            <ActivityLogsPage onNavigate={(view) => setCurrentView(view as PageView)} />
          )}

          {currentView === 'send-mail' && (
            <SendMailPage onNavigate={(view) => setCurrentView(view as PageView)} />
          )}

          {currentView === 'home' && (
            <HomePage onNavigate={(view) => setCurrentView(view as PageView)} />
          )}

          {currentView === 'capture' && (
            <LeadCapturePage 
              onSubmit={(data) => {
                setSubmittedData(data || {});
                setCurrentView('success');
              }} 
            />
          )}
          {currentView === 'success' && (
            <SubmissionSuccessPage 
              leadData={submittedData}
              onGoBack={() => {
                setSubmittedData(null);
                setCurrentView('capture');
              }}
              onGoToDashboard={() => setCurrentView('dashboard')} 
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
