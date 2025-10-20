import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './User_Subscribe.css';

const User_Subscribe = () => {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [availableGroups, setAvailableGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static data for demo - will be replaced with API call when backend is ready
  const staticAvailableGroups = [
    { id: 1, name: 'Treasury Group', description: 'Access to treasury and cash management reports', icon: '🏛️' },
    { id: 2, name: 'Operations Group', description: 'Operational reports and metrics', icon: '⚙️' },
    { id: 3, name: 'Compliance Group', description: 'Regulatory and compliance reports', icon: '📋' },
    { id: 4, name: 'Analytics Group', description: 'Business intelligence and analytics', icon: '📊' },
    { id: 5, name: 'Marketing Group', description: 'Marketing campaigns and customer insights', icon: '📢' },
    { id: 6, name: 'HR Group', description: 'Human resources and employee data', icon: '👔' },
    { id: 7, name: 'IT Security Group', description: 'Security reports and incident tracking', icon: '🔐' },
    { id: 8, name: 'Finance Group', description: 'Financial statements and budgets', icon: '💼' },
  ];

  // API integration code - uncomment when backend is ready
  /*
  useEffect(() => {
    const fetchAvailableGroups = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/groups/available', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAvailableGroups(data);
        } else {
          console.error('Failed to fetch available groups');
          setAvailableGroups(staticAvailableGroups);
        }
      } catch (error) {
        console.error('Error fetching available groups:', error);
        setAvailableGroups(staticAvailableGroups);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableGroups();
  }, [token]);
  */

  // Temporary useEffect for demo - remove when API is integrated
  useEffect(() => {
    setAvailableGroups(staticAvailableGroups);
    setLoading(false);
  }, []);

  const filteredGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubscribe = (groupName) => {
    alert(`Subscription request sent for: ${groupName}`);
  };

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Subscribe to Groups</h2>
        <p className="text-muted">Request access to additional report groups</p>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search for groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="btn btn-outline-secondary"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div key={group.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm group-subscription-card">
                <div className="card-body">
                  <div className="d-flex align-items-start mb-3">
                    <div className="group-icon-large me-3">{group.icon}</div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">{group.name}</h5>
                      <p className="card-text text-muted small">{group.description}</p>
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => handleSubscribe(group.name)}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <h5 className="mt-3 text-muted">No groups found</h5>
                <p className="text-muted">Try adjusting your search terms</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card mt-4 shadow-sm bg-light">
        <div className="card-body">
          <h6 className="card-title">
            <i className="bi bi-info-circle me-2"></i>
            Subscription Information
          </h6>
          <ul className="mb-0">
            <li>Subscription requests are reviewed by administrators</li>
            <li>You will receive a notification once your request is processed</li>
            <li>Access is typically granted within 24-48 hours</li>
            <li>You can track your subscription status in the "Subscription Status" page</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User_Subscribe;
