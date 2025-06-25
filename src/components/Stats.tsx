import React from 'react';

export default function Stats() {
  const stats = [
    { value: '+30%', label: 'Time saved', description: 'on recruitment process' },
    { value: '100%', label: 'Focus', description: 'on what matters most' },
    { value: '2×', label: 'Productivity', description: 'boost in hiring' },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-extrabold text-purple-600">{stat.value}</div>
              <div className="mt-2 text-xl font-semibold text-gray-900">{stat.label}</div>
              <div className="mt-1 text-base text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}