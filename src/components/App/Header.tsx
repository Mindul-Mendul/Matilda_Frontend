import React from 'react';
import { Link, useNavigate, useLocation, To } from 'react-router-dom';
import { cookies } from './App';
import matildaWhite from '../../assets/images/matilda_white.png';

export const Header = () => {
  const navigate = useNavigate(); //페이지 이동하는 훅

  const linkTo = (link: To) => {
    window.scrollTo({ top: 0 });
    navigate(link, { replace: false });
  };

  //로그아웃 버튼 기능
  const fetchSignout = () => {
    cookies.remove('userInfo'); // 로그인 기록 쿠키 지우기
    alert('sign out 하였습니다.'); // 로그아웃했다고 알림
    linkTo('/') // 로그아웃하면 홈페이지로
  };

  const location = useLocation(); // url 찍어주는 훅
  const pathname = location.pathname;
  let sign = cookies.get('userInfo') ? ( // 오른쪽 버튼 보여주기
    <div>
      <button
        className="btn btn-outline-light me-2"
        onClick={() => {
          fetchSignout();
        }}
      >
        sign-out
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          linkTo('/mypage');
        }}
      >
        My Page
      </button>
    </div>
  ) : (
    <div>
      <button
        className="btn btn-outline-light me-2"
        onClick={() => {
          linkTo('/signin');
        }}
      >
        Sign-in
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          linkTo('/signup');
        }}
      >
        Sign-up
      </button>
    </div>
  );

  // 왼쪽 부분 아이템 생성 함수
  const tapItem = (index: React.Key, title: string, url: To) => {
    return (
      <button
        key={index}
        className={`btn btn-outline-dark px-2 fw-bold ${
          pathname == url ? 'text-white' : 'text-secondary'
        } text-decoration-none`}
        onClick={() => {
          linkTo(url);
        }}
      >
        {title}
      </button>
    );
  };

  //왼쪽 부분 아이템 배열 생성 부분
  const tapItemList = new Array();
  tapItemList.push(tapItem(1, 'Home', '/'));
  tapItemList.push(tapItem(2, 'Explore', '/explore'));
  tapItemList.push(tapItem(3, 'Convert 3D', '/convert3D'));
  tapItemList.push(tapItem(4, 'Register NFT', '/registerNFT'));
  tapItemList.push(tapItem(5, 'Customize', '/customize'));

  return (
    <header className="p-2 bg-dark text-white sticky-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
          <Link to="/" className="mb-2 px-3">
            <img src={matildaWhite} width="48" alt=""></img>
          </Link>

          {/* lg 이상 클 때 */}
          <div className="nav col-lg-auto me-lg-auto mb-2 d-none d-lg-block">{tapItemList}</div>

          {/* 검색바 */}

          <div className="col-lg-auto d-none d-lg-block">{sign}</div>

          {/* lg 미만 작을 때 */}
          <div className="align-items-end d-block d-lg-none">
            <div className="collapse" id="navbarToggleExternalContent">
              <div className="bg-dark p-4">
                <p>{tapItemList}</p>
                <p className="d-flex justify-content-end">{sign}</p>
              </div>
            </div>
            <div className="navbar navbar-dark bg-dark d-flex justify-content-end">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
