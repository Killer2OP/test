import React from 'react';

const icons = {
    road: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m-8-8h16" />
      </svg>
    ),
    bridge: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 10l8-4m0 0l8 4m-8-4v4m-8 4h16m-8 0v4" />
      </svg>
    ),
    airport: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18l9-2zm0 0v-8" />
      </svg>
    ),
    train: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h8m-8 5h8m-8 5h8M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
    building: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    factory: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V15a2 2 0 00-2-2h-4l-3-3a2 2 0 00-2.8 0L4 13H2v8h17zM6 16v3m4-3v3m4-3v3" />
      </svg>
    ),
    hospital: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
      </svg>
    ),
    school: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    warehouse: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    power: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };

interface Application {
    id: number;
    title: string;
    icon: keyof typeof icons;
  }

const applications: Application[] = [
{ id: 1, title: "Roads & Highways", icon: "road" },
{ id: 2, title: "Bridges & Tunnels", icon: "bridge" },
{ id: 3, title: "Airports, Ports and Railways Stations", icon: "airport" },
{ id: 4, title: "Metro Rail and Railways", icon: "train" },
{ id: 5, title: "Real Estate", icon: "building" },
{ id: 6, title: "Industrial", icon: "factory" },
{ id: 7, title: "Warehousing", icon: "warehouse" },
{ id: 8, title: "Dams, Power Plants and Canals", icon: "power" },
];

export default function Applications() {

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10">Applications</h1>

      {/* Grid of application cards */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-3 sm:p-4 md:p-5 rounded-lg shadow-md shadow-gray-400 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
              {icons[app.icon]}
            </div>
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 leading-tight">
              {app.title}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

