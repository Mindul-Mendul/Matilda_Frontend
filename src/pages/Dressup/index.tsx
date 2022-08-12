import React, { useEffect, useState } from 'react';
import { Market } from '../../components/Dressup/Market';
import { Preset } from '../../components/Dressup/Preset';
import useView from '../../hooks/threejs/useView';
import useModel from '../../hooks/threejs/useModel';
import useFittingRoom from '../../hooks/threejs/useFittingRoom';
import { Clothes } from '../../types/Clothes';
import useCookie from '../../hooks/useCookie';
import { ResetbuyButton } from '../../components/Dressup/ResetbuyButton';

export const Dressup = () => {
  const [clothes, setClothes] = useState({} as Clothes);
  const [presetList, setPresetList] = useState([] as Clothes[]);
  const { getCookie } = useCookie();
  const cookie = getCookie();

  useEffect(() => {
    const [modelHeight, roomWidth, roomHeight] = [60, 1024, 350];
    const scene = useView(modelHeight, roomWidth);
    useFittingRoom('wooden', roomWidth, roomHeight, scene);
    useModel('./assets/model/matilda/scene.gltf', modelHeight, scene);
  }, []);

  return (
    <main className="container d-flex justify-content-center">
      <div className="row">
        <div className="col-12 fs-2 fw-bold my-4 text-center">dress up</div>
        <div className='col-1 d-flex'>
          <div id="Preset" className={`${(cookie ? "d-block" : "d-none")}`}>
            <Preset
              clothes={clothes}
              setClothes={setClothes}
              presetList={presetList}
              setPresetList={setPresetList} />
          </div>
          <div className={`align-self-end my-5 w-100`}>
            <ResetbuyButton setClothes={setClothes} />
          </div>
        </div>
        <div id="View" className="col-5" />
        <div id="Market" className="col-6">
          <Market
            clothes={clothes}
            setClothes={setClothes}
            presetList={presetList}
            setPresetList={setPresetList} />
        </div>
      </div>
    </main>
  );
};
