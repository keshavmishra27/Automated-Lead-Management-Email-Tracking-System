import { Mail, MailOpen, MousePointerClick, Clock } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'sent' | 'opened' | 'clicked' | 'pending';
  timestamp?: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'sent': return <Mail className="w-4 h-4 text-white" />;
      case 'opened': return <MailOpen className="w-4 h-4 text-white" />;
      case 'clicked': return <MousePointerClick className="w-4 h-4 text-white" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'sent': return 'bg-blue-500 ring-blue-100';
      case 'opened': return 'bg-emerald-500 ring-emerald-100';
      case 'clicked': return 'bg-purple-500 ring-purple-100';
      default: return 'bg-slate-100 ring-slate-50 border border-slate-200';
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ${getBgColor(event.type)}`}>
                    {getIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-slate-900 font-medium">
                      {event.title}
                    </p>
                    {event.description && (
                      <p className="mt-1 text-sm text-slate-500">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-slate-500">
                    <time dateTime={event.timestamp}>{event.timestamp}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
