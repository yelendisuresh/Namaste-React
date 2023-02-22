const Shimmer = () => {
  return (
    <div
      className="container mx-auto py-4 grid grid-cols-auto gap-2  md:grid-cols-2 lg:grid-cols-4 sm:grid-col-2"
      data-testid="shimmer"
    >
      {Array(40)
        .fill("")
        .map((e, index) => (
          <div key={index} className="w-60 h-60 bg-gray-100 m-5"></div>
        ))}
    </div>
  );
};

export default Shimmer;
