// src/components/Dashboard/Dashboard.jsx - Tailwind Version (Complete)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import api from './services/api';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, analysesData] = await Promise.all([
        api.getStatistics(),
        api.getAnalyses(),
      ]);
      setStats(statsData);
      setRecentAnalyses(analysesData.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getComplianceClasses = (status) => {
    switch (status) {
      case 'compliant':
        return 'text-success-700 bg-success-50 border-success-200';
      case 'partial':
        return 'text-warning-700 bg-warning-50 border-warning-200';
      case 'non_compliant':
        return 'text-danger-700 bg-danger-50 border-danger-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return '✅';
      case 'partial': return '⚠️';
      case 'non_compliant': return '❌';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email}! 👋
          </h1>
          <p className="text-gray-600">
            Here's an overview of your washroom compliance analyses
          </p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Analyses */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-500 hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Analyses</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total_analyses}</p>
                  </div>
                  <div className="bg-primary-100 rounded-full p-4">
                    <span className="text-3xl">📊</span>
                  </div>
                </div>
              </div>

              {/* Compliant */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-success-500 hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Compliant</p>
                    <p className="text-3xl font-bold text-success-600">{stats.compliant}</p>
                  </div>
                  <div className="bg-success-100 rounded-full p-4">
                    <span className="text-3xl">✅</span>
                  </div>
                </div>
              </div>

              {/* Partial */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-warning-500 hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Partial</p>
                    <p className="text-3xl font-bold text-warning-600">{stats.partial}</p>
                  </div>
                  <div className="bg-warning-100 rounded-full p-4">
                    <span className="text-3xl">⚠️</span>
                  </div>
                </div>
              </div>

              {/* Non-Compliant */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-danger-500 hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Non-Compliant</p>
                    <p className="text-3xl font-bold text-danger-600">{stats.non_compliant}</p>
                  </div>
                  <div className="bg-danger-100 rounded-full p-4">
                    <span className="text-3xl">❌</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Average Score */}
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-primary-100 text-sm font-medium mb-1">Average Compliance Score</p>
                  <p className="text-5xl font-bold">{stats.average_score}%</p>
                </div>
                <div className="text-6xl">🎯</div>
              </div>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats.average_score}%` }}
                ></div>
              </div>
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/analyze"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200 transform hover:-translate-y-1 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">New Analysis</h3>
            <p className="text-gray-600 text-sm">
              Upload a floor plan and analyze compliance
            </p>
          </Link>

          <Link
            to="/history"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200 transform hover:-translate-y-1 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
              📁
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">View History</h3>
            <p className="text-gray-600 text-sm">
              Browse all your past analyses
            </p>
          </Link>

          <Link
            to="/statistics"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200 transform hover:-translate-y-1 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
              📈
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Statistics</h3>
            <p className="text-gray-600 text-sm">
              View detailed analytics and trends
            </p>
          </Link>
        </div>

        {/* Recent Analyses */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Analyses</h2>
            <Link
              to="/history"
              className="text-primary-500 hover:text-primary-600 font-medium text-sm transition duration-200"
            >
              View All →
            </Link>
          </div>

          {recentAnalyses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No analyses yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first analysis
              </p>
              <Link
                to="/analyze"
                className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Create First Analysis
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <Link
                  key={analysis.id}
                  to={`/analysis/${analysis.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {analysis.annotated_image_url && (
                        <img
                          src={analysis.annotated_image_url}
                          alt={analysis.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {analysis.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(analysis.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getComplianceClasses(
                          analysis.compliance_status
                        )}`}
                      >
                        {getStatusIcon(analysis.compliance_status)}{' '}
                        {analysis.compliance_status.replace('_', ' ')}
                      </span>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {analysis.compliance_score}%
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
