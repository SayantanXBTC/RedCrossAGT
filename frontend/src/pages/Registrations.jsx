import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

function Registrations() {
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('volunteers');
  const [actionLoading, setActionLoading] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [memberTypeFilter, setMemberTypeFilter] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, [searchTerm, statusFilter, areaFilter, memberTypeFilter]);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      // Build query parameters
      const volunteerParams = new URLSearchParams();
      if (searchTerm) volunteerParams.append('search', searchTerm);
      if (statusFilter) volunteerParams.append('status', statusFilter);
      if (areaFilter) volunteerParams.append('areaOfInterest', areaFilter);

      const memberParams = new URLSearchParams();
      if (searchTerm) memberParams.append('search', searchTerm);
      if (statusFilter) memberParams.append('status', statusFilter);
      if (memberTypeFilter) memberParams.append('membershipType', memberTypeFilter);
      
      const [volunteersRes, membersRes] = await Promise.all([
        fetch(`${API_URL}/volunteers?${volunteerParams.toString()}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/members?${memberParams.toString()}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (!volunteersRes.ok || !membersRes.ok) {
        throw new Error('Failed to fetch registrations');
      }

      const volunteersData = await volunteersRes.json();
      const membersData = await membersRes.json();

      setVolunteers(volunteersData.data || []);
      setMembers(membersData.data || []);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAccept = async (id, type) => {
    if (!window.confirm('Are you sure you want to approve this registration?')) {
      return;
    }

    setActionLoading(id);
    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_URL}/${type}/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (!response.ok) {
        throw new Error('Failed to approve registration');
      }

      await fetchRegistrations();
      alert('Registration approved successfully!');
    } catch (err) {
      console.error('Accept error:', err);
      alert('Failed to approve registration. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
      return;
    }

    setActionLoading(id);
    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_URL}/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration');
      }

      await fetchRegistrations();
      alert('Registration deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete registration. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-redcross-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading registrations...</p>
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
            <button onClick={fetchRegistrations} className="btn-primary">
              Retry
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative h-[40vh] md:h-[40vh] w-full overflow-hidden bg-gradient-to-r from-redcross-red to-red-700">
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">Registrations Dashboard</h1>
                <p className="text-base md:text-xl text-white">
                  View all volunteer and member registrations
                </p>
              </div>
              <div className="flex flex-row gap-2 md:gap-4">
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-4 md:px-6 py-2 md:py-3 bg-white text-redcross-red rounded-lg hover:bg-gray-100 transition-colors font-semibold whitespace-nowrap text-sm md:text-base"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/admin/login');
                  }}
                  className="px-4 md:px-6 py-2 md:py-3 bg-white text-redcross-red rounded-lg hover:bg-gray-100 transition-colors font-semibold whitespace-nowrap text-sm md:text-base"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Search and Filter Section */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-redcross-red focus:border-transparent"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-redcross-red focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="active">Active</option>
                  <option value="rejected">Rejected</option>
                </select>
                {activeTab === 'volunteers' ? (
                  <input
                    type="text"
                    placeholder="Filter by area of interest..."
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-redcross-red focus:border-transparent"
                  />
                ) : (
                  <select
                    value={memberTypeFilter}
                    onChange={(e) => setMemberTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-redcross-red focus:border-transparent"
                  >
                    <option value="">All Membership Types</option>
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                    <option value="corporate">Corporate</option>
                  </select>
                )}
              </div>

              <div className="flex space-x-4 border-b border-gray-200 mb-8">
                <button
                  onClick={() => setActiveTab('volunteers')}
                  className={`px-6 py-3 font-semibold transition-all ${
                    activeTab === 'volunteers'
                      ? 'text-redcross-red border-b-2 border-redcross-red'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Volunteer Registrations ({volunteers.length})
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`px-6 py-3 font-semibold transition-all ${
                    activeTab === 'members'
                      ? 'text-redcross-red border-b-2 border-redcross-red'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Member Registrations ({members.length})
                </button>
              </div>

              {activeTab === 'volunteers' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Volunteer Registrations</h2>
                  {volunteers.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No volunteer registrations yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area of Interest</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {volunteers.map((volunteer) => (
                            <tr key={volunteer._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{volunteer.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{volunteer.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{volunteer.phone}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{volunteer.areaOfInterest}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  volunteer.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  volunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  volunteer.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {volunteer.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(volunteer.createdAt)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  {volunteer.status === 'pending' && (
                                    <button
                                      onClick={() => handleAccept(volunteer._id, 'volunteers')}
                                      disabled={actionLoading === volunteer._id}
                                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {actionLoading === volunteer._id ? 'Processing...' : 'Accept'}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDelete(volunteer._id, 'volunteers')}
                                    disabled={actionLoading === volunteer._id}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {actionLoading === volunteer._id ? 'Processing...' : 'Delete'}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'members' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Member Registrations</h2>
                  {members.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No member registrations yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {members.map((member) => (
                            <tr key={member._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.fullName}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.phone}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{member.membershipType}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  member.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  member.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {member.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(member.createdAt)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  {member.status === 'pending' && (
                                    <button
                                      onClick={() => handleAccept(member._id, 'members')}
                                      disabled={actionLoading === member._id}
                                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {actionLoading === member._id ? 'Processing...' : 'Accept'}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDelete(member._id, 'members')}
                                    disabled={actionLoading === member._id}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {actionLoading === member._id ? 'Processing...' : 'Delete'}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{volunteers.length}</div>
                  <div className="text-gray-700">Total Volunteer Registrations</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">{members.length}</div>
                  <div className="text-gray-700">Total Member Registrations</div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Registrations;
