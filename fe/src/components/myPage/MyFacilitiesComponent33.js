import React, { useEffect, useState } from 'react'
import { myPageGymReservations } from '../api/facilities/gymApi';

const MyFacilitiesComponent = ({ uno }) => {
  
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await myPageGymReservations(uno);
      setPrograms(data);
      setLoading(false);
    };

    fetchData();
  }, [uno]);

  if (loading) return <p>Loading...</p>;
  if (programs.length === 0) return <p>No programs found.</p>;

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Program ID</th>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Content</th>
          <th className="border px-4 py-2">Start Date</th>
          <th className="border px-4 py-2">End Date</th>
        </tr>
      </thead>
      <tbody>
        {programs.map((program) => (
          <tr key={program.programId}>
            <td className="border px-4 py-2 text-center">{program.programId}</td>
            <td className="border px-4 py-2 text-center">{program.title}</td>
            <td className="border px-4 py-2 text-center">{program.content}</td>
            <td className="border px-4 py-2 text-center">{program.programStartDate}</td>
            <td className="border px-4 py-2 text-center">{program.programEndDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default MyFacilitiesComponent