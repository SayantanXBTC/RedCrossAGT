const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (token && !options.skipAuth) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  async patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  auth = {
    register: (data) => this.post('/auth/register', data, { skipAuth: true }),
    login: (data) => this.post('/auth/login', data, { skipAuth: true }),
    getProfile: () => this.get('/auth/profile'),
  };

  volunteers = {
    create: (data) => this.post('/volunteers', data, { skipAuth: true }),
    getAll: () => this.get('/volunteers'),
    getById: (id) => this.get(`/volunteers/${id}`),
    updateStatus: (id, status) => this.patch(`/volunteers/${id}/status`, { status }),
  };

  contact = {
    create: (data) => this.post('/contact', data, { skipAuth: true }),
    getAll: () => this.get('/contact'),
    getById: (id) => this.get(`/contact/${id}`),
    updateStatus: (id, status) => this.patch(`/contact/${id}/status`, { status }),
  };

  chatbot = {
    sendMessage: (message) => this.post('/chatbot/message', { message }, { skipAuth: true }),
  };
}

export default new ApiService();
