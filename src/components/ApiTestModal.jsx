import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaTimes,
  FaPlay,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaServer,
  FaClock,
  FaCode,
  FaSyncAlt,
} from 'react-icons/fa';

const TEST_CASES = [
  {
    id: 'threads',
    name: 'GET /threads',
    description: 'Verifikasi endpoint daftar diskusi publik komunitas',
    url: 'https://forum-api.dicoding.dev/v1/threads',
    expectedStatus: 200,
    validate: (data) => Array.isArray(data?.data?.threads),
  },
  {
    id: 'users',
    name: 'GET /users',
    description: 'Verifikasi endpoint daftar akun terdaftar komunitas',
    url: 'https://forum-api.dicoding.dev/v1/users',
    expectedStatus: 200,
    validate: (data) => Array.isArray(data?.data?.users),
  },
  {
    id: 'leaderboards',
    name: 'GET /leaderboards',
    description: 'Verifikasi endpoint peringkat kontributor teratas',
    url: 'https://forum-api.dicoding.dev/v1/leaderboards',
    expectedStatus: 200,
    validate: (data) => Array.isArray(data?.data?.leaderboards),
  },
  {
    id: 'health',
    name: 'System Network Ping',
    description: 'Verifikasi konektivitas jaringan dan integritas DNS',
    url: 'https://forum-api.dicoding.dev/v1/threads',
    expectedStatus: 200,
    validate: (data) => data?.status === 'success',
  },
];

function ApiTestModal({ isOpen, onClose }) {
  const [testResults, setTestResults] = useState({});
  const [runningTestId, setRunningTestId] = useState(null);
  const [activeJsonView, setActiveJsonView] = useState(null);

  if (!isOpen) {
    return null;
  }

  const runSingleTest = async (testCase) => {
    setRunningTestId(testCase.id);
    const startTime = Date.now();

    try {
      const response = await fetch(testCase.url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const endTime = Date.now();
      const latency = endTime - startTime;

      let data = null;
      let isJsonValid = false;
      try {
        data = await response.json();
        isJsonValid = true;
      } catch {
        isJsonValid = false;
      }

      const statusMatch = response.status === testCase.expectedStatus;
      const dataValid = isJsonValid && testCase.validate(data);
      const passed = statusMatch && dataValid;

      setTestResults((prev) => ({
        ...prev,
        [testCase.id]: {
          passed,
          status: response.status,
          latency,
          timestamp: new Date().toLocaleTimeString(),
          raw: data,
          error: passed ? null : 'Asersi validasi data tidak terpenuhi',
        },
      }));
    } catch (err) {
      const endTime = Date.now();
      const latency = endTime - startTime;

      setTestResults((prev) => ({
        ...prev,
        [testCase.id]: {
          passed: false,
          status: 0,
          latency,
          timestamp: new Date().toLocaleTimeString(),
          raw: null,
          error: err.message || 'Koneksi jaringan gagal',
        },
      }));
    } finally {
      setRunningTestId(null);
    }
  };

  const runAllTests = async () => {
    for (const testCase of TEST_CASES) {
      await runSingleTest(testCase);
    }
  };

  const totalRun = Object.keys(testResults).length;
  const passedCount = Object.values(testResults).filter((r) => r.passed).length;

  return (
    <div className="test-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="test-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="test-modal-title"
      >
        <div className="test-modal-header">
          <div className="test-modal-title-group">
            <div className="test-modal-badge">
              <FaServer /> Live API Test Runner
            </div>
            <h2 id="test-modal-title" className="test-modal-heading">
              Konsol Diagnostik & Pengujian Endpoint
            </h2>
            <p className="test-modal-sub">
              Alat verifikasi otomatis untuk memvalidasi respon, latensi, dan asersi skema data REST API Dicoding Forum.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="test-modal-close-btn"
            title="Tutup konsol"
            aria-label="Tutup"
          >
            <FaTimes />
          </button>
        </div>

        <div className="test-modal-stats-bar">
          <div className="test-stat-item">
            <span className="test-stat-label">Status Jaringan</span>
            <span className="test-stat-value text-green">Online (Aktif)</span>
          </div>
          <div className="test-stat-item">
            <span className="test-stat-label">Target Server</span>
            <span className="test-stat-value text-mono">forum-api.dicoding.dev</span>
          </div>
          <div className="test-stat-item">
            <span className="test-stat-label">Hasil Pengujian</span>
            <span className="test-stat-value">
              {totalRun > 0 ? `${passedCount} / ${totalRun} Lulus` : 'Belum diuji'}
            </span>
          </div>
          <div className="test-stat-action">
            <button
              type="button"
              onClick={runAllTests}
              disabled={runningTestId !== null}
              className="btn-run-all-tests"
            >
              {runningTestId !== null ? (
                <>
                  <FaSpinner className="spin-icon" /> Menguji...
                </>
              ) : (
                <>
                  <FaPlay /> Jalankan Semua Tes
                </>
              )}
            </button>
          </div>
        </div>

        <div className="test-cases-list">
          {TEST_CASES.map((tc) => {
            const res = testResults[tc.id];
            const isRunning = runningTestId === tc.id;

            return (
              <div key={tc.id} className="test-case-card">
                <div className="test-case-main">
                  <div className="test-case-header">
                    <span className="test-method-tag">GET</span>
                    <h4 className="test-case-name">{tc.name}</h4>
                    {res && (
                      <span
                        className={`test-result-badge ${
                          res.passed ? 'badge-passed' : 'badge-failed'
                        }`}
                      >
                        {res.passed ? (
                          <>
                            <FaCheckCircle /> PASSED
                          </>
                        ) : (
                          <>
                            <FaTimesCircle /> FAILED
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <p className="test-case-desc">{tc.description}</p>
                  <span className="test-case-url">{tc.url}</span>
                </div>

                <div className="test-case-meta">
                  {res && (
                    <div className="test-meta-stats">
                      <span className="meta-latency">
                        <FaClock /> {res.latency} ms
                      </span>
                      <span className="meta-status">
                        HTTP {res.status}
                      </span>
                    </div>
                  )}

                  <div className="test-case-actions">
                    {res?.raw && (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveJsonView(activeJsonView === tc.id ? null : tc.id)
                        }
                        className="btn-toggle-json"
                        title="Lihat Raw JSON"
                      >
                        <FaCode /> {activeJsonView === tc.id ? 'Tutup JSON' : 'JSON'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => runSingleTest(tc)}
                      disabled={isRunning || runningTestId !== null}
                      className="btn-run-single"
                      title="Uji endpoint ini"
                    >
                      {isRunning ? (
                        <FaSpinner className="spin-icon" />
                      ) : (
                        <FaSyncAlt />
                      )}
                    </button>
                  </div>
                </div>

                {activeJsonView === tc.id && res?.raw && (
                  <div className="test-case-json-preview">
                    <pre>{JSON.stringify(res.raw, null, 2)}</pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="test-modal-footer">
          <p className="test-footer-notice">
            Endpoint diuji secara langsung terhadap REST API produksi Dicoding menggunakan protokol HTTPS standar.
          </p>
          <button type="button" onClick={onClose} className="btn-close-modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

ApiTestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ApiTestModal;
