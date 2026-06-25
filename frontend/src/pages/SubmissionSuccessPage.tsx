import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, LayoutDashboard, Mail, Hash, Clock, Tag, AlertCircle, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionSuccessPageProps {
  leadData?: any;
  onGoBack?: () => void;
  onGoToDashboard?: () => void;
}

export function SubmissionSuccessPage({ leadData, onGoBack, onGoToDashboard }: SubmissionSuccessPageProps) {
  useEffect(() => {
    // Fire confetti when component mounts
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const displayData = {
    id: leadData?.id ? `L-${new Date().getFullYear()}-${leadData.id}` : "L-2026-9824",
    submissionTime: new Date().toLocaleString(),
    emailStatus: "Queued for sending",
    aiPreview: {
      category: "Enterprise Sales",
      priority: "High",
      summary: leadData?.message ? `Lead expresses interest: "${leadData.message.substring(0, 50)}..."` : "Client is interested in the premium automated tracking tier with custom integrations."
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex-1 bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <motion.div 
        className="max-w-2xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-100">
          
          {/* Header Section */}
          <motion.div variants={itemVariants} className="px-6 py-10 sm:px-10 text-center bg-gradient-to-b from-blue-50/50 to-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.2 
              }}
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Your Request Has Been Received
            </h1>
            <p className="text-slate-500 text-lg max-w-md mx-auto">
              We've successfully processed your lead submission. Our team will review it shortly.
            </p>
          </motion.div>

          <div className="px-6 py-8 sm:px-10 space-y-8 bg-white">
            
            {/* Core Details Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
                <div className="flex items-center text-slate-500 mb-2">
                  <Hash className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Lead ID</span>
                </div>
                <span className="text-slate-900 font-semibold">{displayData.id}</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
                <div className="flex items-center text-slate-500 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Time</span>
                </div>
                <span className="text-slate-900 font-semibold text-sm">{displayData.submissionTime}</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
                <div className="flex items-center text-slate-500 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Email Status</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse"></span>
                  <span className="text-slate-900 font-semibold text-sm">{displayData.emailStatus}</span>
                </div>
              </div>
            </motion.div>

            {/* AI Preview Section */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-10"></div>
              <div className="relative bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">AI Analysis Preview</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm text-slate-500 mr-2">Category:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {displayData.aiPreview.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-rose-500 mr-2" />
                      <span className="text-sm text-slate-500 mr-2">Priority:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                        {displayData.aiPreview.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 border border-slate-100 flex items-start">
                    <FileText className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">"{displayData.aiPreview.summary}"</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="px-6 py-6 sm:px-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onGoBack}
              className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-slate-200 shadow-sm text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Submit Another Request
            </button>
            <button 
              onClick={onGoToDashboard}
              className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Go To Dashboard
            </button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
