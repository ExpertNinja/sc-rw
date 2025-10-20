import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Dashboard.css';
import ReportSearch from '../../components/Reportsearch/ReportSearch';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [subscribedGroups, setSubscribedGroups] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static data for demo - will be replaced with API call when backend is ready
  const staticSubscribedGroups = [
    { id: 1, name: 'Credit Card Group', icon: '💳' },
    { id: 2, name: 'Risk Compliance Group', icon: '⚖️' },
    { id: 3, name: 'Loan Group', icon: '🏦' },
    { id: 4, name: 'Investment Group', icon: '📈' },
    { id: 5, name: 'Customer Service Group', icon: '👥' },
    { id: 6, name: 'Savings Account Group', icon: '💰' },
    { id: 7, name: 'Fraud Detection Group', icon: '🔒' },
    { id: 8, name: 'Digital Banking Group', icon: '📱' },
    { id: 9, name: 'Treasury Group', icon: '🏛️' },
    { id: 10, name: 'Operations Group', icon: '⚙️' },
  ];

  const staticRecentReports = [
    { id: 1, reportName: 'Q4 Credit Card Analysis', groupName: 'Credit Card Group', dateAccessed: '2025-10-10' },
    { id: 2, reportName: 'Risk Assessment Report 2025', groupName: 'Risk Compliance Group', dateAccessed: '2025-10-09' },
    { id: 3, reportName: 'Loan Approval Metrics', groupName: 'Loan Group', dateAccessed: '2025-10-08' },
    { id: 4, reportName: 'Monthly Investment Summary', groupName: 'Investment Group', dateAccessed: '2025-10-07' },
    { id: 5, reportName: 'Customer Satisfaction Survey', groupName: 'Customer Service Group', dateAccessed: '2025-10-06' },
  ];

  // API integration code - uncomment when backend is ready
  /*
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch subscribed groups
        const groupsResponse = await fetch(`http://localhost:8080/api/subscriptions/${user}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (groupsResponse.ok) {
          const groupsData = await groupsResponse.json();
          setSubscribedGroups(groupsData);
        } else {
          console.error('Failed to fetch subscribed groups');
          setSubscribedGroups(staticSubscribedGroups);
        }

        // Fetch recent reports
        const reportsResponse = await fetch('http://localhost:8080/api/reports/recent', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (reportsResponse.ok) {
          const reportsData = await reportsResponse.json();
          setRecentReports(reportsData);
        } else {
          console.error('Failed to fetch recent reports');
          setRecentReports(staticRecentReports);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setSubscribedGroups(staticSubscribedGroups);
        setRecentReports(staticRecentReports);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchUserData();
    }
  }, [user, token]);
  */

  // Temporary useEffect for demo - remove when API is integrated
  useEffect(() => {
    setSubscribedGroups(staticSubscribedGroups);
    setRecentReports(staticRecentReports);
    setLoading(false);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReports, setSelectedReports] = useState([]);
  const groupsPerPage = 4;
  const totalPages = Math.ceil(subscribedGroups.length / groupsPerPage);

  const currentGroups = subscribedGroups.slice(
    currentIndex * groupsPerPage,
    (currentIndex + 1) * groupsPerPage
  );

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const handleCheckboxChange = (reportId) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allReportIds = recentReports.map(report => report.id);
      setSelectedReports(allReportIds);
    } else {
      setSelectedReports([]);
    }
  };

  const handleBulkDownload = () => {
    if (selectedReports.length === 0) {
      alert('Please select at least one report to download.');
      return;
    }
    alert(`Downloading ${selectedReports.length} report(s)...`);
  };

  const handleBookmark = (reportId, reportName) => {
    alert(`Report "${reportName}" has been bookmarked!`);
  };

  const handleIndividualDownload = (reportId, reportName) => {
    alert(`Downloading report: "${reportName}"`);
  };

  return (
    <div className="container-fluid p-4">
      <div className="dashboard-header mb-4">
        <div className="dashboard-header-left">
          <h2 className="fw-bold text-dark mb-1">User Dashboard</h2>
          <p className="text-muted">Welcome back! Here's your overview.</p>
        </div>
        <div className="dashboard-header-right">
          <ReportSearch />
        </div>
      </div>

      <div className="groups-section mb-4">
        <h5 className="text-dark mb-3 groups-title">My subscribed Groups</h5>
        
        <div className="groups-carousel position-relative">
          <button 
            className="carousel-btn carousel-btn-prev"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ‹
          </button>

          <div className="groups-grid-container">
            <div className="row g-3">
              {currentGroups.map((group) => (
                <div key={group.id} className="col-md-3">
                  <div className="card h-100 group-card">
                    <div className="card-body text-center">
                      <div className="group-icon mb-2">{group.icon}</div>
                      <h6 className="card-title group-card-title">{group.name}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-btn carousel-btn-next"
            onClick={handleNext}
            disabled={currentIndex === totalPages - 1}
          >
            ›
          </button>
        </div>

        <div className="page-indicator">
          <span className="text-muted">
            Page {currentIndex + 1} of {totalPages}
          </span>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Reports</h5>
          <button 
            className="btn btn-success btn-sm"
            onClick={handleBulkDownload}
            disabled={selectedReports.length === 0}
          >
            <i className="bi bi-download me-2"></i>
            Download Selected ({selectedReports.length})
          </button>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Report Name</th>
                <th scope="col">Group</th>
                <th scope="col">Date Accessed</th>
                <th scope="col" style={{ width: '80px', textAlign: 'center' }}>
                  <i className="bi bi-star-fill"></i>
                </th>
                <th scope="col" style={{ width: '80px', textAlign: 'center' }}>
                  <i className="bi bi-download"></i>
                </th>
                <th scope="col" style={{ width: '80px', textAlign: 'center' }}>
                  <input 
                    type="checkbox" 
                    className="form-check-input table-checkbox"
                    onChange={handleSelectAll}
                    checked={selectedReports.length === recentReports.length && recentReports.length > 0}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, index) => (
                <tr key={report.id} className="reports-table">
                  <th scope="row">{index + 1}</th>
                  <td>{report.reportName}</td>
                  <td>{report.groupName}</td>
                  <td>{report.dateAccessed}</td>
                  <td style={{ textAlign: 'center' }}>
                    <i 
                      className="bi bi-star action-icon star-icon"
                      onClick={() => handleBookmark(report.id, report.reportName)}
                    ></i>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <i 
                      className="bi bi-download action-icon download-icon"
                      onClick={() => handleIndividualDownload(report.id, report.reportName)}
                    ></i>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input 
                      type="checkbox"
                      className="form-check-input table-checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => handleCheckboxChange(report.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
