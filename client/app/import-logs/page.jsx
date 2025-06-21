// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function ImportLogsPage() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/import-logs');
//         setLogs(res.data);
//       } catch (error) {
//         console.error('Failed to fetch logs:', error);
//       }
//     };

//     fetchLogs();
//   }, []);

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">📦 Import History</h1>
//       <table className="w-full border text-sm">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 text-left">Date</th>
//             <th className="p-2 text-left">Source URL</th>
//             <th className="p-2">Fetched</th>
//             <th className="p-2">New</th>
//             <th className="p-2">Updated</th>
//             <th className="p-2 text-red-600">Failed</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log, idx) => (
//             <tr key={idx} className="border-t hover:bg-gray-50">
//               <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
//               <td className="p-2 text-blue-700">{log.sourceURL}</td>
//               <td className="p-2 text-center">{log.totalFetched}</td>
//               <td className="p-2 text-center">{log.newJobs}</td>
//               <td className="p-2 text-center">{log.updatedJobs}</td>
//               <td className="p-2 text-center text-red-600">{log.failedJobs?.length || 0}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ImportLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/import-logs');
        console.log('Fetched logs:', res.data); // ✅ Should show logs
        if (Array.isArray(res.data)) {
          setLogs(res.data);
        } else {
          console.warn('API returned non-array:', res.data);
        }
      } catch (error) {
        console.error('❌ Failed to fetch logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📦 Import History</h1>

      {loading ? (
        <p className="text-gray-500">Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">No import logs found.</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Source URL</th>
                <th className="p-2 border text-center">Fetched</th>
                <th className="p-2 border text-center">New</th>
                <th className="p-2 border text-center">Updated</th>
                <th className="p-2 border text-center text-red-600">Failed</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">
                    {new Date(log.timestamp || log.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 border text-blue-600 max-w-xs truncate">
                    <a href={log.sourceURL} target="_blank" rel="noreferrer">
                      {log.sourceURL}
                    </a>
                  </td>
                  <td className="p-2 border text-center">{log.totalFetched}</td>
                  <td className="p-2 border text-center">{log.newJobs}</td>
                  <td className="p-2 border text-center">{log.updatedJobs}</td>
                  <td className="p-2 border text-center text-red-600">
                    {log.failedJobs?.length || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
