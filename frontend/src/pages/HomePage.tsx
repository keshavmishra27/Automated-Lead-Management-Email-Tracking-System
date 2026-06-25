import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, Sparkles, Activity, Mail, Users } from 'lucide-react';

interface HomePageProps {
  onNavigate?: (view: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps = {}) {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "AI-Powered Insights",
      description: "Automatically categorize leads and predict conversion likelihood using our advanced Groq-powered AI engine."
    },
    {
      icon: <Activity className="w-6 h-6 text-semantic-info" />,
      title: "Real-time Observability",
      description: "Monitor every event, from form submissions to email opens, with our Datadog-inspired activity dashboards."
    },
    {
      icon: <Mail className="w-6 h-6 text-semantic-success" />,
      title: "Automated Email Tracking",
      description: "Send personalized emails directly and track engagement rates seamlessly through native SMTP integration."
    }
  ];

  return (
    <div className="flex-1 bg-canvas flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient glows with simple scrolling animation */}
      <motion.div 
        animate={{ y: [0, 50, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, -50, 0] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none"
      />
      
      <main className="w-full max-w-6xl mx-auto px-6 py-12 md:py-24 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          className="w-full max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              LeadFlow v2.0 is Live
            </div>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-ink mb-6">
            Supercharge Your Sales with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Intelligent Automation
            </span>
          </motion.h1>

          {/* Hero Subheadline */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Capture leads, leverage AI to predict conversion priority, and manage automated email outreach from a single, high-performance observability dashboard.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <button 
              onClick={() => onNavigate?.('dashboard')}
              className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold tracking-wide hover:bg-primary-hover transition-all shadow-lg flex items-center justify-center group"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate?.('capture')}
              className="px-8 py-4 bg-canvas-elevated text-ink border border-hairline rounded-xl font-bold tracking-wide hover:bg-surface-card transition-all flex items-center justify-center group"
            >
              <Users className="w-5 h-5 mr-2 text-muted group-hover:text-primary transition-colors" />
              Capture New Lead
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-surface-card border border-hairline shadow-lg hover:border-primary/50 transition-all flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-canvas-elevated border border-hairline flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">{feature.title}</h3>
                <p className="text-body leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
