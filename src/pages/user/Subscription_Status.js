import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Subscription_Status.css';

const Subscription_Status = () => {
  const { user, token } = useAuth();
  const [filter, setFilter] = useState('All');
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static data for demo - will be replaced with API call when backend is ready
  const staticSubscriptions = [
    { id: 1, groupName: 'Credit Card Group', status: 'Approved', requestDate: '2025-01-15', approvalDate: '2025-01-16' },
    { id: 2, groupName: 'Risk Compliance Group', status: 'Pending', requestDate: '2025-02-10', approvalDate: '-' },
    { id: 3, groupName: 'Loan Group', status: 'Approved', requestDate: '2025-01-20', approvalDate: '2025-01-22' },
    { id: 4, groupName: 'Investment Group', status: 'Rejected', requestDate: '2025-02-05', approvalDate: '-' },
    { id: 5, groupName: 'Customer Service Group', status: 'Approved', requestDate: '2025-01-25', approvalDate: '2025-01-26' },
    { id: 6, groupName: 'Savings Account Group', status: 'Pending', requestDate: '2025-02-12', approvalDate: '-' },
    { id: 7, groupName: 'Fraud Detection Group', status: 'Approved', requestDate: '2025-01-18', approvalDate: '2025-01-19' },
    { id: 8, groupName: 'Digital Banking Group', status: 'Pending', requestDate: '2025-02-14', approvalDate: '-' },
  ];

  // API integration code - uncomment when backend is ready
  /*
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/subscriptions/status/${user}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSubscriptions(data);
        } else {
          console.error('Failed to fetch subscription status');
          setSubscriptions(staticSubscriptions);
        }
      } catch (error) {
        console.error('Error fetching subscription status:', error);
        setSubscriptions(staticSubscriptions);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchSubscriptionStatus();
    }
  }, [user, token]);
  */

  // Temporary useEffect for demo - remove when API is integrated
  useEffect(() => {
    setSubscriptions(staticSubscriptions);
    setLoading(false);
  }, []);

  const filteredSubscriptions = filter === 'All' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.status === filter);

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Approved':
        return 'badge bg-success';
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Rejected':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Subscription Status</h2>
        <p className="text-muted">Track your group subscription requests</p>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Filter by Status</h5>
            <div className="btn-group" role="group">
              <button 
                className={`btn btn-sm ${filter === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('All')}
              >
                All
              </button>
              <button 
                className={`btn btn-sm ${filter === 'Pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setFilter('Pending')}
              >
                Pending
              </button>
              <button 
                className={`btn btn-sm ${filter === 'Approved' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setFilter('Approved')}
              >
                Approved
              </button>
              <button 
                className={`btn btn-sm ${filter === 'Rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setFilter('Rejected')}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Subscription Requests</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Group Name</th>
                <th scope="col">Status</th>
                <th scope="col">Request Date</th>
                <th scope="col">Approval Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((sub, index) => (
                  <tr key={sub.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{sub.groupName}</td>
                    <td>
                      <span className={getStatusBadgeClass(sub.status)}>
                        {sub.status}
                      </span>
                    </td>
                    <td>{sub.requestDate}</td>
                    <td>{sub.approvalDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No subscriptions found for the selected filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row mt-4 g-3">
        <div className="col-md-4">
          <div className="card border-success">
            <div className="card-body text-center">
              <h3 className="text-success">
                {subscriptions.filter(s => s.status === 'Approved').length}
              </h3>
              <p className="mb-0 text-muted">Approved</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-warning">
            <div className="card-body text-center">
              <h3 className="text-warning">
                {subscriptions.filter(s => s.status === 'Pending').length}
              </h3>
              <p className="mb-0 text-muted">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-danger">
            <div className="card-body text-center">
              <h3 className="text-danger">
                {subscriptions.filter(s => s.status === 'Rejected').length}
              </h3>
              <p className="mb-0 text-muted">Rejected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription_Status;
