import { getS3Url } from '../../utils/S3';
import { postImage } from '../../services/imageService';
import { alertError, alertModal } from '../../utils/alertUtil';

interface ConvertBoxProps {
  category: Category;
  setLoading: Function;
  modalID?: string;
}

// Convert 3D 용도로만 쓰임
export default function ConvertBox(props: ConvertBoxProps) {
  const { category, setLoading, modalID } = props;

  //프리뷰 보여주는 함수
  const setPreview = async (input: File) => {
    if (!category.title.length) {
      alertError('카테고리를 골라주세요!', '왼쪽 카테고리에서 종류를 선택해주세요!');
      return;
    }

    if (!input) {
      alertError('취소했어요!', '입력이 없어요, 다시 한 번 확인해보세요 ㅎㅎ;;'); // 도중에 취소하면 아무것도 없음
      return;
    }

    setLoading(true);

    const { data, error } = await postImage({ file: input, category: category.catCode });
    if (error) {
      console.log(error);
      alertError('변환 실패', '변환이 제대로 이뤄지지 않았어요, 다시 한 번 시도해보세요!');
    } else if (data) {
      console.log(data);

      if (!data.imgUrl) {
        alertError('변환 실패', '변환이 제대로 이뤄지지 않았어요, 다시 한 번 시도해보세요!');
        return;
      }

      const imgUrl = getS3Url(data.imgUrl);
      console.log(imgUrl);
      alertModal(
        "<span style='font-size:40px;'>변환 성공</span>",
        '변환이 이뤄진 모습을 확인해보세요!',
        imgUrl,
        'Completely Converted Image',
        440
      );
    }

    setLoading(false);
  };

  //드래그 & 드랍시 사용되는 핸들러 함수들
  const handleDrag = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === 'dragover') e.currentTarget.setAttribute('style', 'opacity: 0.5;');
    else e.currentTarget.setAttribute('style', 'opacity: 1;');
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDrag(e); //드래그 할 때 화면 투명도 바꾸는 거 한 번 더 적용시키기 위함.
    setPreview(e.dataTransfer.files[0]);
  };

  //그냥 클릭하고 사진 고르는 식일 때 사용되는 핸들러 함수
  const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
    if (!category.title.length) {
      e.stopPropagation();
      e.preventDefault();
      alertError('카테고리를 골라주세요!', '카테고리에서 종류를 선택해주세요!');
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files as FileList;
    const file = fileList.item(0) as File;
    setPreview(file);
  };

  return (
    <label htmlFor="file-input">
      <div
        className="card text-white border-white text-center"
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        data-bs-toggle={modalID ? 'modal' : undefined}
        data-bs-target={modalID ? `#${modalID}` : undefined}
        aria-controls={modalID ? `${modalID}` : undefined}
      >
        <img id="preview-image" alt="여기 맞아요, 사진을 넣어 주세요!" src={category.image} draggable="false" />
        <div className="card-img-overlay h-75 d-flex flex-column justify-content-end">
          <h5 className="card-title text-dark fs-2 fw-bold">{category.title}</h5>
          <p className="card-text text-dark">
            {category.title.length ? '여기에 사진을 넣어 주세요!' : '카테고리에서 종류를 선택해주세요!'}
          </p>
        </div>
      </div>
      <input id="file-input" type="file" style={{ display: 'none' }} accept="image/*" onChange={handleChange} onClick={handleClick} />
    </label>
  );
}
