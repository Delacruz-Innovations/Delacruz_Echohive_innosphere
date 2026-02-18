import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus,
  ArrowLeft,
  Bell
} from 'lucide-react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import OrgSelector from './components/OrgSelector';

const Layout = ({ children, orgId }) => {
  const location = useLocation();

  const orgConfigs = {
    innosphere: {
      name: 'Innosphere',
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-600',
      icon: 'i'
    },
    delacruz: {
      name: 'Delacruz',
      color: 'bg-purple-600',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-600',
      icon: 'D'
    },
    echohive: {
      name: 'EchoHive',
      color: 'bg-emerald-600',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-600',
      icon: 'E'
    }
  };

  const config = orgConfigs[orgId] || orgConfigs.innosphere;

  const navItems = [
    { name: 'Dashboard', path: `/${orgId}/dashboard`, icon: LayoutDashboard },
    { name: 'New Post', path: `/${orgId}/create`, icon: FilePlus },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link to={`/${orgId}/dashboard`} className="flex items-center space-x-2">
            <div className={`w-8 h-8 ${config.color} rounded-sm flex items-center justify-center`}>
              <span className="text-white font-bold">{config.icon}</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tighter uppercase italic font-outfit">{config.name}</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/"
            className={`flex items-center px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:${config.textColor} transition-all mb-4 group`}
          >
            <ArrowLeft className="mr-3 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Switch Workspace
          </Link>

          <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-4 mb-2">Management</div>

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all ${location.pathname === item.path
                ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <item.icon className={`mr-3 h-4 w-4 ${location.pathname === item.path ? config.textColor : 'text-gray-400'}`} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center p-3 rounded-sm bg-gray-50 mb-4 border border-gray-100">
            <div className={`w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center ${config.textColor} font-bold mr-3 text-xs`}>
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-gray-900 truncate uppercase">Internal Admin</p>
              <p className="text-[9px] text-emerald-500 uppercase font-bold tracking-tighter">Secure Link Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {config.name} / <span className="text-gray-900">Workspace Management</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-2 text-gray-400 hover:text-gray-900 rounded-sm hover:bg-gray-50 transition-all relative">
              <Bell className="h-4 w-4" />
              <span className={`absolute top-2 right-2 w-1.5 h-1.5 ${config.color} rounded-full border border-white`}></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-900 uppercase leading-none">A. Delacruz</p>
                <p className="text-[8px] text-gray-400 uppercase font-bold mt-1">Lead Architect</p>
              </div>
              <div className={`h-8 w-8 rounded-sm bg-gray-900 border border-gray-800 shadow-sm flex items-center justify-center text-white text-[10px] font-bold font-outfit uppercase`}>
                {config.icon}
              </div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const OrgLayout = ({ children }) => {
  const { orgId } = useParams();
  return <Layout orgId={orgId}>{children}</Layout>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrgSelector />} />
      <Route path="/:orgId/dashboard" element={<OrgLayout><BlogList /></OrgLayout>} />
      <Route path="/:orgId/create" element={<OrgLayout><BlogForm /></OrgLayout>} />
      <Route path="/:orgId/edit/:id" element={<OrgLayout><BlogForm /></OrgLayout>} />
    </Routes>
  );
}

export default App;
