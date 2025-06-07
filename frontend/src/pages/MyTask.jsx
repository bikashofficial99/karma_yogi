import React from 'react';
import { FaCalendarAlt, FaRupeeSign, FaImage } from 'react-icons/fa';

const MyTask = () => {
  // Sample task data with offers on both cards
  const tasks = [
    {
      id: 1,
      title: 'Carpenter',
      location: 'Bharatpur-11, Chitwan',
      description: 'Need to make a bed.',
      dueDate: 'Flexible',
      price: 500,
      image: null,
      offers: [
        {
          id: 1,
          name: 'Bikash Acharya',
          price: 500,
          avatar: null,
        },
      ],
    },
    {
      id: 2,
      title: 'Carpenter',
      location: 'Bharatpur-11, Chitwan',
      description: 'Need to make a bed.',
      dueDate: 'Flexible',
      price: 500,
      image: null,
      offers: [
        {
          id: 2,
          name: 'Bikash Acharya',
          price: 500,
          avatar: null,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h1>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">You haven't posted any tasks yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow p-6 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
                  <p className="text-gray-500">{task.location}</p>
                  <p className="mt-2 text-gray-700">{task.description}</p>
                </div>
                <div className="text-green-600 text-xl">
                  <FaImage />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Due Date: {task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaRupeeSign />
                  <span className="font-medium">{task.price}/-</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-sm text-green-600 font-medium">
                <button className="hover:underline">Edit</button>
                <button className="hover:underline">New offers!</button>
              </div>

              {/* Offers */}
              {task.offers.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-center font-semibold text-green-700 mb-4">
                    Offers ({task.offers.length})
                  </h3>

                  {task.offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between shadow-sm mb-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                          <p className="font-medium">{offer.name}</p>
                          <p className="text-sm text-gray-500">Rs. {offer.price}/-</p>
                        </div>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTask;
