import { useRouteError } from 'react-router-dom';

const PageNotFound = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>404 Page Not Found</h1>
      <i>{error.statusText || error.message}</i>
    </div>
  );
};

export default PageNotFound;
