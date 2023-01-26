import {useRouteError} from 'react-router-dom'
const Error = () => {
    const {status, statusText} = useRouteError();
    // console.log("err", err)
  return (
    <div>
      <h1> OOOPS !!</h1>
      <h2> something went wrong</h2>
      <h2>{`${status} : ${statusText}`}</h2>
    </div>
  );
};

export default Error;