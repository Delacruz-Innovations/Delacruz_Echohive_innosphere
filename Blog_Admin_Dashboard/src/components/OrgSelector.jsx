import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Sparkles, Terminal, ArrowRight } from 'lucide-react';

const OrgSelector = () => {
    const navigate = useNavigate();

    const organizations = [
        {
            id: 'innosphere',
            name: 'Innosphere Consulting',
            description: 'Strategic consulting and digital transformation insights for the modern enterprise.',
            icon: Building2,
            color: 'bg-blue-600',
            status: 'active'
        },
        {
            id: 'delacruz',
            name: 'Delacruz Innovation',
            description: 'Pioneering future-forward innovation strategies and technological breakthroughs.',
            icon: Sparkles,
            color: 'bg-purple-600',
            status: 'active'
        },
        {
            id: 'echohive',
            name: 'EchoHive Creatives',
            description: 'Creative solutions, digital design excellence, and brand storytelling.',
            icon: Terminal,
            color: 'bg-emerald-600',
            status: 'active'
        }
    ];

    return (
        <div className="min-h-screen bg-[#050b1a] flex flex-col items-center justify-center p-6 selection:bg-blue-500/30 font-inter">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-400/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-blue-500/30 bg-blue-500/10 rounded-sm">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Identity Gateway v2.0</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 uppercase italic font-outfit tracking-tighter">
                        Select <span className="text-blue-500">Workspace</span>
                    </h1>
                    <p className="text-gray-500 text-sm md:text-lg uppercase tracking-[0.2em] font-bold max-w-2xl mx-auto leading-relaxed">
                        Authorized Personnel Only: Select the organizational node to commence management protocols.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {organizations.map((org, index) => (
                        <div
                            key={org.id}
                            onClick={() => org.status === 'active' && navigate(`/${org.id}/dashboard`)}
                            className={`group relative bg-white/[0.02] border border-white/10 rounded-sm p-10 transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-both ${org.status === 'active'
                                ? 'cursor-pointer hover:bg-white/[0.05] hover:border-blue-500/50 hover:-translate-y-2'
                                : 'opacity-40 cursor-not-allowed grayscale'
                                }`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Hover Ambient Light */}
                            <div className={`absolute -inset-px bg-gradient-to-br ${org.status === 'active' ? 'from-blue-500/20' : 'from-white/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            <div className="relative z-10">
                                <div className={`w-16 h-16 ${org.color} rounded-sm flex items-center justify-center mb-10 shadow-2xl shadow-black/40 group-hover:scale-110 transition-transform duration-700 ease-out`}>
                                    <org.icon className="h-8 w-8 text-white" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-3xl font-bold text-white uppercase italic font-outfit tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                                        {org.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">
                                        {org.description}
                                    </p>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                                    {org.status === 'active' ? (
                                        <div className="flex items-center text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:gap-2 transition-all">
                                            ESTABLISH CONNECTION <ArrowRight className="h-4 w-4 ml-2" />
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                                            Deployment Pending
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <org.icon className="h-20 w-20 text-white" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center border-t border-white/5 pt-12 animate-in fade-in duration-1000 delay-700 fill-mode-both">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.8em] mb-4">
                        Innosphere X Echohive X Delacruz
                    </p>
                    <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em]">
                        © 2026 INTERNAL MANAGEMENT SYSTEMS • SYSTEM STATUS: OPTIMAL
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrgSelector;
