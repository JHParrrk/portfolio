import { collection, getFirestore, addDoc } from 'firebase/firestore/lite';
import MyfirebaseWriteUI from './MyfirebaseWrite.presenter';
import { useRouter } from 'next/router';
import { firebaseApp } from '@/shared/api/libraries/firebase';
import { useForm } from 'react-hook-form';
import type { IMyfirebaseFormData } from './MyfirebaseWrite.types';

export default function MyfirebaseWrite(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IMyfirebaseFormData>({
    defaultValues: {
      writer: '',
      title: '',
      contents: '',
    },
  });

  const onClickSubmit = async (data: IMyfirebaseFormData): Promise<void> => {
    try {
      const board = collection(getFirestore(firebaseApp), 'board');
      await addDoc(board, {
        writer: data.writer,
        title: data.title,
        contents: data.contents,
      });
      alert('게시물 등록에 성공하였습니다!');
      void router.push('/myfirebase');
    } catch (error) {
      console.error(error);
      alert('등록에 실패했습니다.');
    }
  };

  return (
    <MyfirebaseWriteUI
      register={register}
      handleSubmit={handleSubmit}
      onClickSubmit={onClickSubmit}
    />
  );
}
