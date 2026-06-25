
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { motion } from 'framer-motion';

export const LeadCapturePage = ({ onSubmit }: { onSubmit?: (data?: any) => void }) => {
  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row w-full">
        {/* Left Column: Form Area */}
        <div className="w-full lg:w-1/2 p-lg lg:p-xxl flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[560px] w-full mx-auto"
          >
            <h1 className="text-[56px] font-medium leading-[1.1] tracking-[-1.12px] mb-md">
              Turn Every Inquiry <br /> Into An <span className="text-primary">Opportunity</span>
            </h1>
            <p className="text-[14px] text-body mb-xl max-w-[400px]">
              Capture leads, automate follow-ups, and track engagement in real-time with unparalleled precision.
            </p>
            
            <LeadCaptureForm onSubmitSuccess={onSubmit} />
          </motion.div>
        </div>

        {/* Right Column: Visual Area */}
        <div className="w-full lg:w-1/2 bg-canvas-elevated border-l border-hairline relative overflow-hidden flex items-center justify-center min-h-[600px]">
          {/* Subtle Depth Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3c3c3c] to-[#030303] opacity-50 z-0"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 flex flex-col gap-lg w-full max-w-[400px] px-lg"
          >
            {/* Cinematic Diagram Elements */}
            {[
              { title: "Lead Capture", desc: "Data acquired with 0px sharp precision." },
              { title: "AI Processing", desc: "Intent analyzed via intelligence matrix.", isPrimary: true },
              { title: "Engagement", desc: "Automated sequence initiated." },
              { title: "Analytics", desc: "Performance metrics recorded." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col gap-xs">
                <div className="flex items-center gap-sm">
                  <div className={`w-2 h-2 ${step.isPrimary ? 'bg-primary' : 'bg-hairline-on-light'}`}></div>
                  <h4 className={`text-[11px] uppercase tracking-[1.1px] font-semibold ${step.isPrimary ? 'text-primary' : 'text-ink'}`}>
                    {step.title}
                  </h4>
                </div>
                <div className="border-l border-hairline pl-sm py-xxs ml-[3px]">
                  <p className="text-[13px] text-body">{step.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};
