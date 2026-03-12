import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';
import { PF } from './MarketWrite.css';
import { useMarketWrite } from '@/shared/hooks/customs/useMarketWrite';
import { IMarketWriteProps } from './MarketWrite.types';
import Uploads01 from '@/shared/ui/upload/01/Uploads01.index';
import { useState, KeyboardEvent, useEffect } from 'react';

import { Modal } from 'antd';
import DaumPostcode from 'react-daum-postcode';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function MarketWrite(props: IMarketWriteProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isValid,
    isOpen,
    isChanged,
    fileUrls,
    onSubmit,
    onUpdate,
    onChangeAddressDetail,
    onCompleteAddressSearch,
    onFileSelect,
    toggleModal,
    setValue,
    getValues,
    watch,
  } = useMarketWrite({ data: props.data });

  const [tagList, setTagList] = useState<string[]>([]);

  const price = watch('price');

  useEffect(() => {
    if (props.data?.fetchUseditem.tags) {
      setTagList(props.data.fetchUseditem.tags);
    }
  }, [props.data]);

  // 판매가격 콤마 처리
  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    setValue('price', Number(value), { shouldValidate: true });
  };

  const formattedPrice = price?.toLocaleString('ko-KR') || '';

  // 태그 엔터 처리
  const onKeyDownTag = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = (event.target as HTMLInputElement).value.trim();
      if (value === '' || tagList.includes(value)) return;

      const newTagList = [...tagList, value];
      setTagList(newTagList);
      setValue('tags', newTagList.join(','));
      (event.target as HTMLInputElement).value = '';
    }
  };

  const onClickDeleteTag = (index: number) => () => {
    const newTagList = tagList.filter((_, i) => i !== index);
    setTagList(newTagList);
    setValue('tags', newTagList.join(','));
  };

  return (
    <div className={PF.CustomBody}>
      {isOpen && (
        <Modal open={isOpen} onCancel={toggleModal} footer={null}>
          <DaumPostcode onComplete={onCompleteAddressSearch} />
        </Modal>
      )}
      <div className={PF.Wrapper}>
        <div className={PF.Title}>
          {props.isEdit ? '상품 수정' : '상품 등록'}
        </div>
        <form
          style={{ width: '100%' }}
          onSubmit={
            props.isEdit
              ? (handleSubmit as any)(onUpdate)
              : (handleSubmit as any)(onSubmit)
          }
        >
          <div className={PF.WriterWrapper}>
            <div className={PF.InputWrapper}>
              <div className={PF.Label}>상품명</div>
              <input
                className={PF.InputItem}
                type="text"
                placeholder="상품명을 입력해주세요."
                {...register('name')}
              />
              <div className={PF.Error}>{errors.name?.message as string}</div>
            </div>
            <div className={PF.InputWrapper}>
              <div className={PF.Label}>한줄요약</div>
              <input
                className={PF.InputItem}
                type="text"
                placeholder="상품의 특징을 짧게 요약해주세요."
                {...register('remarks')}
              />
              <div className={PF.Error}>
                {errors.remarks?.message as string}
              </div>
            </div>
          </div>

          <div className={PF.InputWrapper}>
            <div className={PF.Label}>판매가격</div>
            <input
              className={PF.Subject}
              type="text"
              placeholder="가격을 입력해주세요."
              onChange={onChangePrice}
              value={formattedPrice}
            />
            <div className={PF.Error}>{errors.price?.message as string}</div>
          </div>

          <div className={PF.InputWrapper}>
            <div className={PF.Label}>태그 (선택)</div>
            <input
              className={PF.Subject}
              type="text"
              placeholder="#태그 입력 후 엔터를 눌러주세요."
              onKeyDown={onKeyDownTag}
            />
            <div className={PF.TagWrapper}>
              {tagList.map((el, index) => (
                <div
                  key={el}
                  onClick={onClickDeleteTag(index)}
                  className={PF.TagItem}
                >
                  #{el}
                </div>
              ))}
            </div>
          </div>

          <div className={PF.InputWrapper}>
            <div className={PF.Label}>상품 설명</div>
            <Controller
              name="contents"
              control={control}
              render={({ field }) => (
                <>
                  <ReactQuill
                    {...field}
                    theme="snow"
                    placeholder="상품에 대한 세부 설명을 작성해주세요."
                    style={{ height: '300px', marginBottom: '40px' }}
                  />
                  <div className={PF.Error}>
                    {errors.contents?.message as string}
                  </div>
                </>
              )}
            />
          </div>

          <div className={PF.InputWrapper}>
            <div className={PF.Label}>거래 위치</div>
            <div className={PF.ZipcodeWrapper}>
              <input
                className={PF.Zipcode}
                placeholder="우편번호"
                readOnly
                {...register('zipcode')}
              />
              <button
                className={PF.SearchButton}
                onClick={toggleModal}
                type="button"
              >
                우편번호 검색
              </button>
            </div>
            <input className={PF.Address} readOnly {...register('address')} />
            <input
              className={PF.Address}
              placeholder="상세 주소를 입력해주세요."
              {...register('addressDetail')}
              onChange={onChangeAddressDetail}
            />
          </div>

          <div className={PF.ImageWrapper}>
            <div className={PF.Label}>사진첨부</div>
            <div className={PF.ImageBox}>
              {fileUrls.map((el: string | null | undefined, index: number) => (
                <Uploads01
                  key={el || index}
                  index={index}
                  fileUrl={el || ''}
                  onFileSelect={onFileSelect}
                  showDeleteButton={true}
                />
              ))}
            </div>
          </div>

          <div className={PF.ButtonWrapper}>
            <button
              className={PF.SubmitButton}
              type="submit"
              data-is-active={props.isEdit ? isChanged : isValid}
              disabled={props.isEdit ? !isChanged : !isValid}
            >
              {props.isEdit ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
