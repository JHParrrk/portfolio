// C:\portfolio\firstapp\src\features\boards\ui\write\BoardWrite.index.tsx
import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';
import { PF } from './BoardWrite.css';
import { useBoardWrite } from '@/shared/hooks/customs/useBoardWrite';
import { IBoardWriteProps } from './BoardWrite.types';
import Uploads01 from '@/shared/ui/upload/01/Uploads01.index';

import { Modal } from 'antd';
import DaumPostcode from 'react-daum-postcode';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function BoardWrite(props: IBoardWriteProps): JSX.Element {
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
  } = useBoardWrite({ data: props.data });

  return (
    <div className={PF.CustomBody}>
      {isOpen && (
        <Modal open={isOpen} onCancel={toggleModal}>
          <DaumPostcode onComplete={onCompleteAddressSearch} />
        </Modal>
      )}
      <div className={PF.Wrapper}>
        <div className={PF.Title}>
          {props.isEdit ? '게시글 수정' : '게시글 등록'}
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
              <div className={PF.Label}>작성자</div>
              <input
                className={PF.Writer}
                type="text"
                placeholder="이름을 적어주세요."
                readOnly={props.isEdit}
                {...register('writer')}
              />
              <div className={PF.Error}>{errors.writer?.message as string}</div>
            </div>
            <div className={PF.InputWrapper}>
              <div className={PF.Label}>비밀번호</div>
              <input
                className={PF.Password}
                type="password"
                placeholder="비밀번호를 작성해주세요."
                {...register('password')}
              />
              <div className={PF.Error}>
                {errors.password?.message as string}
              </div>
            </div>
          </div>
          <div className={PF.InputWrapper}>
            <div className={PF.Label}>제목</div>
            <input
              className={PF.Subject}
              type="text"
              placeholder="제목을 작성해주세요."
              {...register('title')}
            />
            <div className={PF.Error}>{errors.title?.message as string}</div>
          </div>

          <div className={PF.InputWrapper}>
            <div className={PF.Label}>내용</div>
            <Controller
              name="contents"
              control={control}
              render={({ field }) => (
                <>
                  <ReactQuill
                    {...field}
                    theme="snow"
                    placeholder="내용을 작성해주세요."
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
            <div className={PF.Label}>주소</div>
            <div className={PF.ZipcodeWrapper}>
              <input
                className={PF.Zipcode}
                placeholder="07250"
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
              {...register('addressDetail')}
              onChange={onChangeAddressDetail}
            />
            <div className={PF.Error}>{errors.address?.message as string}</div>
          </div>
          <div className={PF.InputWrapper}>
            <div className={PF.Label}>유튜브</div>
            <input
              className={PF.Youtube}
              placeholder="링크를 복사해주세요."
              {...register('youtubeUrl')}
            />
            <div className={PF.Error}>
              {errors.youtubeUrl?.message as string}
            </div>
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
