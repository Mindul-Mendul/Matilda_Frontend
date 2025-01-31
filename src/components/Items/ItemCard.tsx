import item_img1 from '../../assets/images/Marketplace/item_img.png';
import makerThumbImg1 from '../../assets/images/Profile/thumbProfileImage.png';
import { getS3Url } from '../../utils/S3';
import { Item } from '../../types/Item';
import CardPlaceholder from './ItemCardPlaceholder';

//컴포넌트가 받을 props
interface CardProps {
  item?: Item;
  size: string;
  handleCard?: Function;
}

//카드에는 괜히 애니메이션 힘 줘서 개발함!
//대부분의 아이템 목록에 들어가는 카드를 구현한 컴포넌트
export default function Card(props: CardProps) {
  const { item, size, handleCard } = props;

  const chooseColor = (stateCode: string | undefined): [string, string] => {
    switch (stateCode) {
      case 'CR':
        return ['white', 'black'];
      case 'OS':
        return ['green', 'black'];
      case 'NOS':
        return ['black', 'white'];
      default:
        return ['red', 'white'];
    }
  };
  const [bgColor, textColor] = chooseColor(item?.stateCode);

  //괜히 힘줘서 애니메이션 넣은 부분
  //코드가 긴 편임에도 중요한 내용은 없음!
  const handleMouse = (e: React.MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    const childImg = e.currentTarget.children.item(0) as Element;
    const childEffect = e.currentTarget.children.item(1) as Element;
    const childDesc = e.currentTarget.children.item(2) as Element;
    const childTitle = e.currentTarget.children.item(3) as Element;
    if (e.type === 'mouseover') {
      childImg.setAttribute(
        'style',
        'transition: width height;' + 'transition-duration: 1.25s;' + 'transition-timing-function: easy-in;' + 'transform:scale(1.5,1.5);'
      );
      childEffect.setAttribute(
        'style',
        'transition-duration: 1.25s;' +
          'transition-timing-function: easy-in;' +
          `background-color: ${bgColor};` +
          'top: 0%;' +
          'opacity: 0.8;'
      );
      childDesc.setAttribute('style', 'transition-duration: 0.5s;' + 'transition-timing-function: easy-in;' + 'opacity:0;');
      childTitle.setAttribute('style', 'transition-delay: 0.5s;' + 'opacity:1;');
    } else {
      childImg.setAttribute(
        'style',
        'transition-property: width height;' +
          'transition-duration: 01.25s;' +
          'transition-timing-function: easy-in;' +
          'transform:scale(1,1);'
      );
      childEffect.setAttribute(
        'style',
        'transition-duration: 1.25s;' +
          'transition-timing-function: easy-in;' +
          `background-color:${bgColor};` +
          'opacity:0.8;' +
          'top: 70%;'
      );
      childDesc.setAttribute(
        'style',
        'transition-delay: 0.5s;' + 'transition-duration: 0.8s;' + 'transition-timing-function: easy-out;' + 'opacity:1;'
      );
      childTitle.setAttribute('style', 'transition-delay: 0.3s;' + 'opacity:0;');
    }
  };

  return (
    <div>
      <div
        className={`cardItemNum${item ? item.itemNum : ''}`}
        onClick={() => {
          if (handleCard) handleCard(item?.itemNum);
        }}
        draggable="false"
        aria-expanded="false"
        style={{ display: item ? 'block' : 'none' }}
      >
        <div
          className={`card overflow-hidden text-${textColor} d-flex flex-column`}
          onMouseOver={handleMouse}
          onMouseLeave={handleMouse}
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10
          }}
        >
          <img alt="" className="card-img" src={item && item.imgUrl != 'no img' ? getS3Url(item.imgUrl) : item_img1} width="100%" />
          <div className="card-img-overlay" style={{ top: '70%', backgroundColor: bgColor, opacity: 0.8 }} />
          <div className="card-img-overlay d-flex flex-column">
            <div className={`card-text mt-auto d-flex justify-content-between px-1 ${size == 'lg' ? 'py-2' : ''}`}>
              {size == 'lg' ? <img src={makerThumbImg1} alt="profile" width="32" height="32" className="rounded-circle me-3" /> : null}
              <div className="text-truncate">{item ? item.title : ''}</div>
              {size == 'lg' ? <div>{`${item ? item.price : 0} KLAY`}</div> : null}
            </div>
          </div>
          <div className="card-img-overlay d-flex justify-content-center align-items-center mx-auto my-auto" style={{ opacity: 0 }}>
            <h2 className="text-truncate">{item ? item.title : ''}</h2>
          </div>
        </div>
      </div>
      <CardPlaceholder loaded={item != undefined} />
    </div>
  );
}
