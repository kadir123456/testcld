// src/pages/SupportPage.tsx
import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { SupportTicket } from '../types';
import { MessageCircle, Mail, Phone, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export const SupportPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    if (!user) return;

    const ticketsRef = ref(database, 'supportTickets');
    const unsubscribe = onValue(ticketsRef, (snapshot) => {
      if (snapshot.exists()) {
        const allTickets = Object.entries(snapshot.val())
          .map(([key, value]: [string, any]) => ({ id: key, ...value }))
          .filter((ticket: SupportTicket) => ticket.userId === user.uid)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setTickets(allTickets);
      } else {
        setTickets([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const newTicket: Omit<SupportTicket, 'id'> = {
        userId: user.uid,
        subject: subject.trim(),
        message: message.trim(),
        status: 'open',
        priority,
        createdAt: new Date().toISOString()
      };

      const ticketsRef = ref(database, 'supportTickets');
      await push(ticketsRef, newTicket);

      toast.success('Support request sent successfully!');
      setSubject('');
      setMessage('');
      setPriority('medium');
    } catch (error) {
      toast.error('Support request could not be sent');
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-600/20 text-blue-400';
      case 'in-progress': return 'bg-yellow-600/20 text-yellow-400';
      case 'closed': return 'bg-green-600/20 text-green-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('support')}</h1>
        <p className="text-gray-400">How can we help you?</p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-blue-600/20">
              <Mail className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Email Support</h3>
              <p className="text-sm text-gray-400">7/24 destek</p>
            </div>
          </div>
          <a 
            href="mailto:freecloudeminer1@gmail.com"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            freecloudeminer1@gmail.com
          </a>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-green-600/20">
              <MessageCircle className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Live Support</h3>
              <p className="text-sm text-gray-400">quick response</p>
            </div>
          </div>
          <p className="text-gray-300">Create a support request</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-purple-600/20">
              <Phone className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Company Information</h3>
              <p className="text-sm text-gray-400">Official address</p>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            <p className="font-medium">CryptoCloud Mining GmbH</p>
            <p>Berliner Allee 12</p>
            <p>40212 Düsseldorf, Germany</p>
          </div>
        </div>
      </div>

      {/* Create Support Ticket */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Create a Support Request</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Subject of your support request"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="low">Low</option>
                <option value="medium">Middle</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Explain your problem in detail..."
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !subject.trim() || !message.trim()}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Sending...' : 'Submit a Support Request'}
          </button>
        </form>
      </div>

      {/* Support Tickets History */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Support Requests</h3>
        
        {tickets.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No support requests yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-white font-medium">{ticket.subject}</h4>
                    <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                    {getStatusIcon(ticket.status)}
                    <span>{ticket.status}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{ticket.message}</p>
                
                {ticket.adminResponse && (
                  <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3 mb-3">
                    <p className="text-blue-400 font-medium text-sm mb-1">Admin Response:</p>
                    <p className="text-blue-200 text-sm">{ticket.adminResponse}</p>
                  </div>
                )}
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Creation: {format(new Date(ticket.createdAt), 'dd MMM yyyy HH:mm')}</span>
                  {ticket.updatedAt && (
                    <span>Update: {format(new Date(ticket.updatedAt), 'dd MMM yyyy HH:mm')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-4">
            <h4 className="text-white font-medium mb-2">When does mining stop?</h4>
            <p className="text-gray-400 text-sm">
              For free trial users, it stops when the $25 earnings limit is reached or after 90 days. For premium plan users, it stops only when the plan expires.
            </p>
          </div>
          <div className="border-b border-gray-700 pb-4">
            <h4 className="text-white font-medium mb-2">How long does it take to withdraw money?</h4>
            <p className="text-gray-400 text-sm">
              Withdrawal requests are typically processed within 24-48 hours and sent in USDT (TRC20).
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">How does the referral system work?</h4>
            <p className="text-gray-400 text-sm">
              AWhen your friend signs up and purchases a package through your referral link, you will earn a bonus of 20% of the package amount.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
