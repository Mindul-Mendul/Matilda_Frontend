import imageDR from '../assets/images/Convert3D/imageDRE.png';
import imageTOP from '../assets/images/Convert3D/imageTOP.png';
import imageBTM from '../assets/images/Convert3D/imageBTM.png';
import imageHEA from '../assets/images/Convert3D/imageHEADWEAR.png';
import imageBRA from '../assets/images/Convert3D/imageBRACELET.png';
import imageNEC from '../assets/images/Convert3D/imageNECKLACE.png';
import imageBAG from '../assets/images/Convert3D/imageBAG.png';
import imageMAS from '../assets/images/Convert3D/imageMASK.png';
import imageRIN from '../assets/images/Convert3D/imageRING.png';

// 카테고리를 저장해둔 훅
// 딱히 훅으로 만들 이유는 없었는데 그냥 어쩌다보니 만듦;;
export default function useCategory() {
  return [
    { title: '전체', image: imageDR, catCode: '' },
    { title: '드레스', image: imageDR, catCode: 'DRE' },
    { title: '상의', image: imageTOP, catCode: 'TOP' },
    { title: '하의', image: imageBTM, catCode: 'BTM' },
    { title: '모자', image: imageHEA, catCode: 'HEA' },
    { title: '팔찌', image: imageBRA, catCode: 'BRA' },
    { title: '목걸이', image: imageNEC, catCode: 'NEC' },
    { title: '가방', image: imageBAG, catCode: 'BAG' },
    { title: '마스크', image: imageMAS, catCode: 'MAS' },
    { title: '반지', image: imageRIN, catCode: 'RIN' }
  ];
}
