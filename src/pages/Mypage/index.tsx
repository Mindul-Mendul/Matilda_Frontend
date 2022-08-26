import { useEffect, useState } from 'react';
import { MypageNFTs } from '../../components/Mypage/MypageNFTs';
import { MypageWallet } from '../../components/Mypage/MypageWallet';
import { MypageOption } from '../../components/Mypage/MypageOption';
import { useNavigate } from 'react-router-dom';
import { NavButtons } from '../../components/NavButtons';
import { SelectMember } from '../../types/Member';
import profileImage from "../../assets/images/Profile/profileImage.png"
import Swal from 'sweetalert2';
import { selectMember } from '../../services/memberService';
import { getUserInfo } from '../../configs/Cookie';

export const Mypage = () => {
  const navigate = useNavigate();
  const [selectedNavButton, setSelectedNavButton] = useState("myNFTList");
  const [userInfo, setUserInfo] = useState({} as SelectMember);

  const navItems = [
    { key: "myNFTList", title: "My NFT List" },
    { key: "klaytnSetting", title: "Klaytn setting" },
    { key: "editInfo", title: "Edit Info" }
  ];

  useEffect(() => {
    (async () => {
      const cookieData = getUserInfo();
      if (!cookieData) {
        Swal.fire({
          icon: 'error',
          title: '누구세요...?',
          text: '유저정보가 없어서 홈페이지로 이동합니다.',
        });
        navigate('/');
      } else {
        if (!Object.keys(userInfo).length) {
          const { data, error } = await selectMember(cookieData.num);
          if (error) {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: '누구셨죠...?',
              text: '유저정보를 불러오는 중 에러가 발생했습니다.',
            });
          } else {
            setUserInfo(data);
          }
        }
      }
    })();
  }, [userInfo]);

  //userInfo가 null인 경우면 JSX 안에 있는 userInfo.name 때문에 에러뜨게 되는 시스템이라 부득이하게 이렇게 사용
  return userInfo ? (
    <main className="container d-flex flex-column justify-content-center">
      <div className="row my-3">
        <div className="col-lg-4">
          <img
            className="flex-column py-3 mt-5 mb-4 px-4 w-100"
            src={userInfo.profileImg ? userInfo.profileImg : profileImage}
            alt=""
            style={{ borderRadius: '100%', width: "100%", height: "auto" }} />
          <h2 className='text-center'>{userInfo.nickname}</h2>
          {userInfo.description}
        </div>

        {/* 네비게이션 바 */}
        <div className="col-lg-8">
          <div className="my-3">
            <NavButtons
              navItems={navItems}
              selectedNavButton={selectedNavButton}
              onClick={setSelectedNavButton}
              textBold={true}
              textSize={5}
              textColor={"black"} />
          </div>

          {/* 이 부분이 My Page 핵심 부분 */}
          <div className={`d-flex justify-content-center`}>
            <div className={`${selectedNavButton == "myNFTList" ? "d-block" : "d-none"}`}>
              <MypageNFTs />
            </div>
            <div className={`${selectedNavButton == "klaytnSetting" ? "d-block" : "d-none"}`}>
              <MypageWallet />
            </div>
            <div className={`${selectedNavButton == "editInfo" ? "d-block" : "d-none"}`}>
              <MypageOption
                userInfo={userInfo}
                setUserInfo={setUserInfo} />
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : null;
};
