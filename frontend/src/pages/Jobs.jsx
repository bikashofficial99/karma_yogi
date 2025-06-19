import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import {
  User,
  MapPin,
  Calendar,
  ClipboardList,
  Boxes,
  ArrowDownCircle,
  Image as ImageIcon,
} from 'lucide-react';
const icon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const jobs = [
  {
    id: 1,
    title: 'Carpenter',
    location: 'Bharatpur',
    type: 'Flexible',
    price: 500,
    date: '2082-01-08',
    lat: 27.6749,
    lng: 84.4325,
  },
  {
    id: 2,
    title: 'Electrician',
    location: 'Near Landmark Mall',
    type: 'Full-time',
    price: 600,
    date: '2082-01-10',
    lat: 27.6755,
    lng: 84.431,
  },
  {
    id: 3,
    title: 'Plumber',
    location: 'Near Narayani Hotel',
    type: 'Part-time',
    price: 550,
    date: '2082-01-12',
    lat: 27.6768,
    lng: 84.4335,
  },
  {
    id: 4,
    title: 'AC Repair Technician',
    location: 'Pulchowk',
    type: 'Full-time',
    price: 700,
    date: '2082-01-14',
    lat: 27.6775,
    lng: 84.434,
  },
  {
    id: 5,
    title: 'House Painter',
    location: 'Narayangarh',
    type: 'Flexible',
    price: 450,
    date: '2082-01-16',
    lat: 27.6785,
    lng: 84.4355,
  },
  {
    id: 6,
    title: 'Welder',
    location: 'Hakim Chowk',
    type: 'Part-time',
    price: 480,
    date: '2082-01-17',
    lat: 27.673,
    lng: 84.436,
  },
];

const offerSteps = [
  { id: 'profilePic', label: 'Upload a profile picture', type: 'file' },
  { id: 'dob', label: 'Enter your date of birth', type: 'date' },
  { id: 'phone', label: 'Verify your phone number', type: 'tel' },
  { id: 'bank', label: 'Connect your bank account', type: 'text' },
  { id: 'address', label: 'Add your billing address', type: 'text' },
];

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [expandedFields, setExpandedFields] = useState({});

  const toggleField = (id) => {
    setExpandedFields((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  

  return (
    <div className="flex h-screen relative">
      {/* Left Panel */}
      <div className="w-1/3 bg-black text-white p-4 overflow-y-auto">
        <input
          type="text"
          placeholder="Search for a task"
          className="w-full p-2 mb-4 rounded text-white"
        />
        <button className="w-full bg-green-700 text-white py-2 mb-4 rounded">
          New Jobs
        </button>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm font-semibold">
          <select className="bg-black border border-white px-3 py-1 rounded">
            <option>Category</option>
            <option>Plumber</option>
            <option>Electrician</option>
            <option>Carpenter</option>
          </select>
          <select className="bg-black border border-white px-3 py-1 rounded">
            <option>Distance</option>
            <option>0-1km</option>
            <option>1-5km</option>
            <option>5km+</option>
          </select>
          <select className="bg-black border border-white px-3 py-1 rounded">
            <option>Price</option>
            <option>Below 500</option>
            <option>500+</option>
          </select>
          <select className="bg-black border border-white px-3 py-1 rounded">
            <option>Sort</option>
            <option>Recent</option>
            <option>Oldest</option>
            <option>Highest Price</option>
          </select>
        </div>

        {/* Job Cards */}
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white text-black border rounded shadow-sm p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <span className="text-md font-semibold">Rs.{job.price}</span>
            </div>
            <div className="flex gap-2 text-sm mt-1 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {job.location}
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                {job.type}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Eleifend metus vitae eu a
              sociis.
            </p>
            <div className="flex justify-between items-center mt-3">
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                Active
              </button>
              <button
                className="border border-gray-400 px-3 py-1 rounded text-sm"
                onClick={() => setSelectedJob(job)}
              >
                Learn more
              </button>
            </div>
            <div className="text-sm text-gray-400 mt-2">{job.date}</div>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      
      <div className="w-2/3 h-screen bg-black text-white overflow-y-auto p-6">
       <div className="flex gap-6 mb-6 text-sm font-medium text-gray-300">
        <button className="text-white border-b-2 border-green-500 pb-1">Active</button>
        <button>Assigned</button>
        <button>Completed</button>
      </div>
      
        {selectedJob ? (
  <div className="relative text-white">
    
    <div className="flex justify-between items-start gap-6">
      
      {/* Left Content */}
      <div className="flex-1">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-4">{selectedJob.title}</h2>
        <button
      onClick={() => setSelectedJob(null)}
      className="text-green-400 mb-4 "
    >
      &lt; Return to map
    </button>


        {/* Posted by */}
       <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white font-semibold">AMRIT GYAWALI</span>
            {/* <span className="ml-auto">{postedTime}</span> */}
          </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
          <MapPin className="w-4 h-4" />
          <span>Location</span>
        </div>
        <p className="text-white mb-4">{selectedJob.location}</p>

        {/* To Be Done On */}
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
          <Calendar className="w-4 h-4" />
          <span>To be done on</span>
        </div>
        <p className="text-white mb-6">Tomorrow<br />Morning (before 10am)</p>

        {/* Details */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
            <ClipboardList className="w-4 h-4" />
            <h3 className="text-white text-lg font-bold">Details</h3>
          </div>
          <div className="space-y-1 text-sm text-white">
            <p className="flex items-center gap-2"><Boxes className="w-4 h-4 text-gray-400" /> Category: {selectedJob.type}</p>
            <p className="flex items-center gap-2"><ArrowDownCircle className="w-4 h-4 text-gray-400" /> 1× 2 seater sleeper couch</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> Pickup: Edithvale VIC, Australia</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> Drop-off: Dandenong North VIC, Australia</p>
            <p className="flex items-center gap-2"><Boxes className="w-4 h-4 text-gray-400" /> Removals size: A few items</p>
            <p className="flex items-center gap-2"><ArrowDownCircle className="w-4 h-4 text-gray-400" /> Stairs: No</p>
          </div>
        </div>

        {/* Make an Offer button */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-6"
          onClick={() => setShowOfferModal(true)}
        >
          Make an Offer
        </button>

        {/* Images */}
        <div className="flex gap-4 mt-6">
          <img
            src="https://via.placeholder.com/150"
            className="w-32 h-32 rounded-lg object-cover"
            alt="task item"
          />
          <img
            src="https://via.placeholder.com/150"
            className="w-32 h-32 rounded-lg object-cover"
            alt="task item"
          />
        </div>
      </div>

      {/* Task Budget Panel */}
      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-64 text-center sticky top-6">
        <p className="text-gray-500 text-sm mb-2">Task Budget</p>
        <p className="text-green-600 text-3xl font-bold mb-4">Rs.{selectedJob.price}/-</p>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          onClick={() => setShowOfferModal(true)}
        >
          Make an Offer
        </button>
      </div>
    </div>
  </div>
) : (

          <MapContainer
            center={[27.6749, 84.4325]}
            zoom={16}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {jobs.map((job) => (
              <Marker
                key={job.id}
                position={[job.lat, job.lng]}
                icon={icon}
              >
                <Popup>
                  <strong>{job.title}</strong>
                  <br />
                  {job.location}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white text-black rounded-xl p-6 w-96 relative">
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-2 right-3 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="text-center mb-4">
              <div className="text-green-600 text-5xl mb-3">🛫</div>
              <h2 className="text-xl font-bold mb-1">
                Complete These Steps To Make an Offer
              </h2>
              <p className="text-sm text-gray-500">
                Help us keep the community secure and enjoyable by providing a few quick details.
              </p>
            </div>

            {offerSteps.map((step) => (
              <div key={step.id} className="mb-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    {step.label}
                  </span>
                  <button
                    className="text-green-600 text-xl"
                    onClick={() => toggleField(step.id)}
                  >
                    +
                  </button>
                </div>
                {expandedFields[step.id] && (
                  <input
                    type={step.type}
                    placeholder={step.label}
                    className="mt-2 w-full border px-3 py-1 rounded text-sm"
                  />
                )}
              </div>
            ))}

            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">
              Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;