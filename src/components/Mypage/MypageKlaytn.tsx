import { createAccount, getBalance } from '../../utils/caverUtil';
import { SelectMember } from '../../types/Member';
import { putMemberKlaytn } from '../../services/memberService';
import { alertError, alertSuccess } from '../../utils/alertUtil';
import { useEffect, useState } from 'react';
import { encrypt } from '../../utils/cryptoUtil';

interface MypageKlaytnProps {
  userInfo: SelectMember;
  setUserInfo: React.Dispatch<React.SetStateAction<SelectMember>>;
}

//마이페이지 중 클레이튼 담당하는 컴포넌트
export const MypageKlaytn = (props: MypageKlaytnProps) => {
  const { userInfo, setUserInfo } = props;
  const address = userInfo.walletAddress;
  const [balance, setBalance] = useState('0'); // 잔액

  //지갑 생성해주는 함수
  const createWallet = async () => {
    const { address, privateKey } = createAccount(); //caverUtils에 있는 caver 함수로 지갑 생성

    //멤버 정보를 수정하기 위해 백엔드와 통신하는 부분
    const { data, error } = await putMemberKlaytn(userInfo.memberNum, { walletAddress: address, walletPrivateKey: encrypt(privateKey) });
    if (error) {
      //에러가 뜨면 에러메시지 출력
      alertError('멤버 수정 오류', '클레이튼 계정 생성에 오류가 있었습니다. 다시 시도해주세요!');
    } else {
      //에러가 없으면 성공했다는 알림과 함께 지갑 생성
      setUserInfo(data);
      alertSuccess('생성 완료!', '지갑 주소가 새로 생성되었습니다!');
    }
  };

  //유저 정보 갱신하면 잔액 정보도 갱신되도록 해주는 함수
  useEffect(() => {
    (async () => {
      if (userInfo.walletAddress) setBalance(await getBalance(userInfo.walletAddress));
    })();
  }, [userInfo]);

  return userInfo ? (
    <div>
      <div className="mt-5">
        <h1>클레이튼</h1>
        <p>클레이튼 네트워크에 사용될 계정의 정보입니다.</p>
      </div>

      <form id="KlaytnForm" className="needs-validation" noValidate>
        <div className="row g-3">
          {/* 지갑주소 */}
          <div className="col-12 row my-3">
            <div className="col-12 fs-3">Wallet</div>
            <div className="col-2 fs-4">Address:</div>
            {userInfo.walletAddress ? ( // 지갑 계정이 있는지 체크하는 부분
              <div className="col-10 fs-5">{address}</div>
            ) : (
              <button type="button" className="btn btn-lg btn-light col-10 fs-5" onClick={createWallet}>
                지갑을 만들까요?
              </button>
            )}
          </div>
          {/* 클레이 보유 금액 */}
          <div className="col-12 row my-3">
            <div className="col-12 fs-3">Account</div>
            <div className="col-2 fs-4">Balance:</div>
            <div className="col-10 fs-4">{balance} KLAY</div>
          </div>
        </div>
      </form>
    </div>
  ) : null;
};
