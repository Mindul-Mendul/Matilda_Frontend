import { useEffect, useState } from 'react';
import TextBox from '../../components/forms/TextBox';
import TextArea from '../../components/forms/TextArea';
import useForm from '../../hooks/useForm';
import testImage from '../../assets/images/NFTItem/mindul_NFT1.jpg';
import { Item, UpdateItem } from '../../types/Item';
import { isRequired, notMaxLength, notMinLength, isNumber } from '../../utils/validator';
import { selectItems } from '../../services/itemService';
import Items from '../../components/Items/Items';
import useItems from '../../hooks/useItems';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/forms/SubmitButton';
import Swal from 'sweetalert2';
import { getUserInfo } from '../../configs/Cookie';

function validate(values: UpdateItem) {
  const errors = {
    title:
      isRequired(values?.title) ||
      notMinLength(values?.title, 2, '타이틀을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.title, 10, '타이틀을 10글자 이하로 입력해 주세요.'),
    description:
      isRequired(values?.description) ||
      notMinLength(values?.description, 2, '설명을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.description, 10, '설명을 10글자 이하로 입력해 주세요.'),
    price: isRequired(values?.price) || isNumber(values?.price)
  };

  return errors;
}

export const MintNFT = () => {
  const callback = (values: UpdateItem) => {
    const { title, description, price } = values;
    if (title && description && price) {
      console.log(values);
    } else Swal.fire({
      icon: 'error',
      title: '얼라리오?',
      text: '빈칸을 모두 다 채워주세요!',
    });
  };

  const navigate = useNavigate();
  const [itemImage, setItemImage] = useState('');
  const [numShowItems, numShowPages] = [3, 3];

  const cookie = getUserInfo();

  const { count, items, page, setPage } = useItems(selectItems, { memberNum: cookie?.num, stateCode: 'CR' }, numShowItems);
  const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);


  const handleCard = (item: Item) => {
    setItemImage((item.imgUrl) ? item.imgUrl : "");
  };

  useEffect(() => {
    (async () => {
      const cookie = getUserInfo();
      if (!cookie) {
        Swal.fire({
          icon: 'error',
          title: '누구세요...?',
          text: '유저정보가 없어서 홈페이지로 이동합니다.',
        });
        navigate('/');
      }
    })();
  }, []);

  return (
    <main
      className="container"
      onKeyUp={(e) => { if (e.key == "Enter") handleSubmit(e); }} >
      <div className="row">
        <div className="d-flex justify-content-center align-items-center fw-bold fs-2 my-4">NFT Minting</div>
        <div className="col-6 d-flex justify-content-center flex-column">
          <img className="mb-3 align-self-center" src={itemImage ? itemImage : testImage} style={{ width: 350, height: 350 }} />
          <Items
            items={items}
            page={page}
            setPage={setPage}
            count={count}
            size={'md'}
            numShowItems={numShowItems}
            numShowPages={numShowPages}
            handleCard={handleCard} />
        </div>
        <div className="col-6">
          <p>
            당신이 가지고 있던 3D 패션아이템을 NFT로 만들어주는 페이지입니다!
            <br />
            먼저, 왼쪽에서 NFT로 만들고 싶은 3D 패션아이템을 선택해주세요.
            <br />
            오른쪽에 필요한 내용을 모두 기입하고 Mint NFT 버튼을 눌러주세요. <br />
            그러면 3D 패션아이템이 NFT가 될 거에요!
          </p>
          <form id="signupForm" className="needs-validation" noValidate>
            <div className="row g-3 mb-4">
              {/* 타이틀 */}
              <TextBox
                name="title"
                id="title"
                label="Title"
                type="text"
                placeholder="title"
                disabled={!itemImage.length}
                readonly={false}
                handleChange={handleChange}
                handleClick={handleClick}
                value={values['title']}
                error={errors['title']} />

              {/* 설명 */}
              <TextArea
                name="description"
                id="description"
                label="Description"
                rows={7}
                placeholder="description"
                disabled={!itemImage.length}
                readonly={false}
                handleChange={handleChange}
                handleClick={handleClick}
                value={values['description']}
                error={errors['description']} />

              {/* 가격 */}
              <TextBox
                name="price"
                id="price"
                label="Price"
                type="text"
                placeholder="10.597"
                disabled={!itemImage.length}
                readonly={false}
                handleChange={handleChange}
                handleClick={handleClick}
                value={values['price']}
                error={errors['price']} />
            </div>

            <SubmitButton
              title={"Mint NFT"}
              handleSubmit={handleSubmit}
              values={values}
              errors={errors}
              keys={["title", "description", "price"]}
              allRequired={true} />

          </form>
        </div>
      </div>
    </main>
  );
};

