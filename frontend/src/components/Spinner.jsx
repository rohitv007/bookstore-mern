const Spinner = () => {
  return (
    <div className="fixed inset-0 z-10 bg-gray-200 bg-opacity-40">
      <div className="flex justify-center items-center h-screen">
        <div className="animate-ping w-16 h-16 rounded-full bg-sky-600"></div>
      </div>
    </div>
  );
};

export default Spinner;
