import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { LeadCapturePage } from './pages/LeadCapturePage'
import { SubmissionSuccessPage } from './pages/SubmissionSuccessPage'
import { DashboardPage } from './pages/DashboardPage'
import { LeadDetailsPage } from './pages/LeadDetailsPage'
import { AiInsightsPage } from './pages/AiInsightsPage'
import { ActivityLogsPage } from './pages/ActivityLogsPage'
import { SendMailPage } from './pages/SendMailPage'
import { CheckMailPage } from './pages/CheckMailPage'

export type PageView = 'capture' | 'success' | 'dashboard' | 'lead-details' | 'ai-insights' | 'activity' | 'send-mail' | 'check-mail';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('capture')
  const [submittedData, setSubmittedData] = useState<any>(null)

  if (currentView === 'dashboard') {
    return <DashboardPage onNavigate={(view) => setCurrentView(view as PageView)} />;
  }
  
  if (currentView === 'lead-details') {
    return <LeadDetailsPage onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'ai-insights') {
    return <AiInsightsPage onNavigate={(view) => setCurrentView(view as PageView)} />;
  }

  if (currentView === 'activity') {
    return <ActivityLogsPage onNavigate={(view) => setCurrentView(view as PageView)} />;
  }

  if (currentView === 'send-mail') {
    return <SendMailPage onNavigate={(view) => setCurrentView(view as PageView)} />;
  }

  if (currentView === 'check-mail') {
    return <CheckMailPage onNavigate={(view) => setCurrentView(view as PageView)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Navbar onNavigate={(view) => setCurrentView(view as PageView)} />
      <div className="flex-1 flex flex-col">
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
  )
}

export default App
