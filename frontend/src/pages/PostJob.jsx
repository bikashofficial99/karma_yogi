import { useState } from 'react';
import axiosInstance, { BASE_URL } from "../utils/axiosInstance"; // make sure this path matches your project structure

const PostJob = () => {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [jobTitle, setJobTitle] = useState('');
  const [dateOption, setDateOption] = useState("I'm flexible");
  const [timeOfDay, setTimeOfDay] = useState('');

  // Step 2 state
  const [jobDetails, setJobDetails] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);

  // Step 3 state
  const [location, setLocation] = useState('');

  // Step 4 state
  const [budget, setBudget] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };


const handleNext = async () => {
  if (step === 1) {
    setStep(2);
  } else if (step === 2) {
    setStep(3);
  } else if (step === 3) {
    setStep(4);
  } else if (step === 4) {
    // Final submit
    const taskData = {
      title: jobTitle,
      description: jobDetails,
      category,
      location,
      budget: Number(budget),
      dueDate: selectedDate,
    };

    try {
      const res = await axiosInstance.post('/tasks', taskData);
      alert('Task posted successfully!');
      console.log(res.data);
      // Optionally: reset form or redirect
    } catch (err) {
      console.error('Error posting task:', err);
      alert('Failed to post task');
    }
  }
};


  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 p-8">
      {/* Left Sidebar */}
      <div className="w-1/4 pr-8">
        <h2 className="text-green-700 font-semibold text-xl mb-6">Post a task</h2>
        <ul className="space-y-4 text-gray-600 font-medium">
          <li className={`${step === 1 ? 'text-black font-bold' : ''}`}>Title & Date</li>
          <li className={`${step === 2 ? 'text-black font-bold' : ''}`}>Details & Category</li>
          <li className={`${step === 3 ? 'text-black font-bold' : ''}`}>Location</li>
          <li className={`${step === 4 ? 'text-black font-bold' : ''}`}>Budget</li>
        </ul>
      </div>

      {/* Right Form */}
      <div className="w-3/4 bg-white rounded-lg p-8 shadow-md">
       {step === 1 && (
  <>
    <h2 className="text-2xl font-bold text-green-700 mb-6">
      Let's get started with the essentials
    </h2>

    <label className="block mb-4">
      <span className="block text-gray-600 mb-2">
        Briefly describe what you need help with
      </span>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="eg: Help me to build my sofa"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
    </label>

    <div className="mb-4">
      <p className="text-gray-600 mb-2">When would you like this done?</p>
      <div className="flex gap-3 flex-wrap">
        {['On date', 'Before date'].map((option) => (
          <button
            key={option}
            onClick={() => setDateOption(option)}
            className={`px-4 py-2 border rounded ${
              dateOption === option
                ? 'bg-green-600 text-white'
                : 'border-green-600 text-green-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>

    {/* Show date picker only when "On date" or "Before date" is selected */}
    {(dateOption === 'On date' || dateOption === 'Before date') && (
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">
          Select a {dateOption.toLowerCase()}
        </label>
        <input
          type="date"
          className="border border-gray-300 rounded p-3 w-full max-w-sm"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
    )}

    {/* Show time of day always */}
    <div className="mt-4 mb-6">
      <label className="block text-gray-600 mb-2">Preferred time of day</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Morning', desc: 'Before 10am' },
          { label: 'Midday', desc: '10am - 2pm' },
          { label: 'Afternoon', desc: '2pm - 6pm' },
          { label: 'Evening', desc: 'After 6pm' }
        ].map((time) => (
          <button
            key={time.label}
            onClick={() => setTimeOfDay(time.label)}
            className={`w-full p-4 rounded border ${
              timeOfDay === time.label
                ? 'bg-green-100 border-green-600'
                : 'border-gray-300'
            }`}
          >
            <div className="text-md font-semibold">{time.label}</div>
            <div className="text-xs text-gray-600">{time.desc}</div>
          </button>
        ))}
      </div>
    </div>

    <button
      onClick={handleNext}
      className="bg-green-600 text-white w-full py-3 rounded text-lg font-semibold"
    >
      Next
    </button>
  </>
)}



        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Tell Us More About Your Task
            </h2>

            <label className="block mb-4">
              <span className="block text-gray-600 mb-2">
                What should we know about this job?
              </span>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="eg: Include a brief summary with important details"
                value={jobDetails}
                onChange={(e) => setJobDetails(e.target.value)}
              />
            </label>

            <label className="block mb-4">
              <span className="block text-gray-600 mb-2">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-60 p-3 border border-gray-300 rounded"
              >
                <option value="">Select category</option>
                <option value="cleaning">Cleaning</option>
                <option value="moving">Moving</option>
                <option value="assembly">Assembly</option>
                <option value="handyman">Handyman</option>
              </select>
            </label>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">Add images (optional)</p>
              <label className="w-32 h-24 border rounded flex items-center justify-center cursor-pointer text-green-600 border-green-600 bg-gray-50">
                +
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="border border-green-600 text-green-600 px-6 py-3 rounded font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-green-600 text-white px-6 py-3 rounded font-semibold"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Where should the task be carried out?
            </h2>

            <p className="text-gray-600 mb-2">What should we know about this job?</p>

            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="eg: Bharatpur-11, Chitwan"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="border border-green-600 text-green-600 px-6 py-3 rounded font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-green-600 text-white px-6 py-3 rounded font-semibold"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-2xl font-bold text-green-700 mb-2">Set Your Budget</h2>
            <p className="text-gray-600 mb-4">How much are you looking to spend?</p>
            <div className="mb-8">
              <div className="flex items-center p-3 bg-gray-100 rounded-md border border-gray-300 w-1/2">
                <span className="text-gray-700 mr-2">Rs.</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter your estimated budget"
                  className="bg-transparent outline-none w-full placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="border border-green-600 text-green-600 px-10 py-3 rounded font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-green-600 text-white px-10 py-3 rounded font-semibold"
              >
                Get Quotes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostJob;
