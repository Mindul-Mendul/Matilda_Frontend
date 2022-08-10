import React, { useState } from 'react';
import { Clothes } from '../../types/Clothes';
import { selectItem } from '../../services/itemService';
import Items from '../Items/Items';
import Search from '../Items/Search';
import ModalItem from '../modal/ModalItem';
import { Item } from '../../types/Item';
import { useNavigate } from 'react-router-dom';
import useItems from '../../hooks/useItems';

interface DressupMarketProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>;
}

export const Market = (props: DressupMarketProps) => {
  const { clothes, setClothes, presetList } = props;
  const [numShowItems, numShowPages] = [9, 5];
  const navigate = useNavigate();

  const { items, page, setPage, setSelectCondition } = useItems(selectItem, {});
  const [item, setItem] = useState({} as Item);

  const ModalFooterButtons = [
    <button
      key={"modalFooterButton1"}
      type="button"
      className="btn btn-light btn-outline-dark w-25"
      data-bs-dismiss="modal"
      onClick={() => {
        setClothes((clothes) => ({ ...clothes, [item.catCode]: item }));
        console.log(clothes);
      }} >
      입혀보기
    </button>,
    <button
      key={"modalFooterButton2"}
      type="button"
      className="btn btn-dark w-25"
      data-bs-dismiss="modal"
      onClick={() => {
        if (!presetList.some((e) => { return e == clothes; }))
          if (!confirm("아직 저장이 되지 않았는데 괜찮을까요?"))
            alert("저장하고 오시는 게 더 좋을 듯싶네요 ㅎㅎ")
        navigate(`/marketplace/NFTitem?NFT_id=${item.itemNum}`);
      }} >
      구매하기
    </button>
  ];

  return (
    <div>
      <Search
        size={"lg"}
        handleSearch={setSelectCondition} />
      <Items
        items={items}
        page={page}
        setPage={setPage}
        size={"sm"}
        numShowItems={numShowItems}
        numShowPages={numShowPages}
        handleCard={setItem}
        modalID={'modalDressup'} />
      <ModalItem
        modalID={`modalDressup`}
        item={item}
        footerButtons={ModalFooterButtons}
        isStatic={false} />
    </div>
  );
};

