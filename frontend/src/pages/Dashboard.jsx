import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

function Dashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_URL}/analytics/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setAnalytics(data.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
      
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        navigate('/admin/login');
      }
    }
  };

  const getMonthName = (month) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-redcross-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button onClick={fetchAnalytics} className="btn-primary">
              Retry
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const { overview, trends, distribution } = analytics;

  return (
    <PageTransition>
      <div className="relative h-[40vh] md:h-[40vh] w-full overflow-hidden bg-gradient-to-r from-redcross-red to-red-700">
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">Analytics Dashboard</h1>
                <p className="text-base md:text-xl text-white">
                  Overview of registrations and activities
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 md:py-3 bg-white text-redcross-red rounded-lg hover:bg-gray-100 transition-colors font-semibold whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="text-sm text-gray-600 mb-2">Total Volunteers</div>
                <div className="text-3xl font-bold text-gray-900">{overview.totalVolunteers}</div>
                <div className="text-xs text-gray-500 mt-2">
                  {overview.recentVolunteers} new this week
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="text-sm text-gray-600 mb-2">Total Members</div>
                <div className="text-3xl font-bold text-gray-900">{overview.totalMembers}</div>
                <div className="text-xs text-gray-500 mt-2">
                  {overview.recentMembers} new this week
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="text-sm text-gray-600 mb-2">Pending Volunteers</div>
                <div className="text-3xl font-bold text-gray-900">{overview.pendingVolunteers}</div>
                <div className="text-xs text-gray-500 mt-2">
                  Awaiting approval
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="text-sm text-gray-600 mb-2">Pending Members</div>
                <div className="text-3xl font-bold text-gray-900">{overview.pendingMembers}</div>
                <div className="text-xs text-gray-500 mt-2">
                  Awaiting approval
                </div>
              </div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <SectionReveal delay={0.1}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Volunteer Status Distribution</h3>
                <div className="space-y-3">
                  {distribution.volunteerStatusDist.map((item) => (
                    <div key={item._id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-3 ${
                          item._id === 'approved' ? 'bg-green-500' :
                          item._id === 'pending' ? 'bg-yellow-500' :
                          item._id === 'active' ? 'bg-blue-500' :
                          'bg-red-500'
                        }`}></span>
                        <span className="text-gray-700 capitalize">{item._id}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Member Status Distribution</h3>
                <div className="space-y-3">
                  {distribution.memberStatusDist.map((item) => (
                    <div key={item._id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-3 ${
                          item._id === 'approved' ? 'bg-green-500' :
                          item._id === 'pending' ? 'bg-yellow-500' :
                          item._id === 'active' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }`}></span>
                        <span className="text-gray-700 capitalize">{item._id}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionReveal delay={0.3}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Volunteers by Area of Interest</h3>
                <div className="space-y-3">
                  {distribution.volunteersByArea.slice(0, 5).map((item) => (
                    <div key={item._id} className="flex items-center justify-between">
                      <span className="text-gray-700">{item._id}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(item.count / overview.totalVolunteers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-8 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Members by Type</h3>
                <div className="space-y-3">
                  {distribution.membersByType.map((item) => (
                    <div key={item._id} className="flex items-center justify-between">
                      <span className="text-gray-700 capitalize">{item._id}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(item.count / overview.totalMembers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-8 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.5}>
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Registration Trends (Last 6 Months)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {trends.volunteersByMonth.map((item) => (
                  <div key={`${item._id.year}-${item._id.month}`} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{item.count}</div>
                    <div className="text-xs text-gray-600">
                      {getMonthName(item._id.month)} {item._id.year}
                    </div>
                    <div className="text-xs text-gray-500">Volunteers</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 pt-6 border-t">
                {trends.membersByMonth.map((item) => (
                  <div key={`${item._id.year}-${item._id.month}`} className="text-center">
                    <div className="text-2xl font-bold text-green-600">{item.count}</div>
                    <div className="text-xs text-gray-600">
                      {getMonthName(item._id.month)} {item._id.year}
                    </div>
                    <div className="text-xs text-gray-500">Members</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.6}>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => navigate('/admin/registrations')}
                className="btn-primary"
              >
                View All Registrations
              </button>
              <button
                onClick={fetchAnalytics}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Dashboard;
