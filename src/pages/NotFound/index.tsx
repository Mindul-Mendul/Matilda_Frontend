import { Link } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';

// 페이지 이외의 url를 입력했을 때 보여줄 페이지 컴포넌트
export const NotFound = () => {
  return (
    <main className="cover-container d-flex p-5 text-center my-5 flex-column justify-content-center">
      <p className="my-3">
        <img src={matilda} width="128" />
      </p>
      <h1 className="my-3">Page is Not Found</h1>
      <p className="lead my-3">
        Firstly, you look. For more than one minute. Because there are alarm systems with one minute period. Therefore, you wait and look.
        <br />
        Alarms firstly, the sky for helicopters, nearby buildings. Meanwhile, you observe soil's color and will try to wear dresses of the
        same color. Never lighter.
      </p>
      <p className="lead my-3">
        <Link to="/" className="btn btn-lg btn-secondary fw-bold border-dark bg-dark text-white">
          Home
        </Link>
      </p>
    </main>
  );
};
