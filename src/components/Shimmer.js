const Shimmer = () => {
  return (
    <div className="flex flex-wrap" data-testid="shimmer">
      {Array(40)
        .fill("")
        .map((e, index) => (
          <div key={index} className="w-52 h-52 bg-gray-100 m-5"></div>
        ))}
    </div>
  );
};

export default Shimmer;
