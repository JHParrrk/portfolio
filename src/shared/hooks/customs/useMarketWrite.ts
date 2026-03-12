import { useRouter } from 'next/router';
import { useMutationCreateUsedItem } from '@/shared/hooks/mutations/useMutationCreateUsedItem';
import { useMutationUpdateUseditem } from '@/shared/hooks/mutations/useMutationUpdateUseditem';
import { useMutationUploadFile } from '@/shared/hooks/mutations/useMutationUploadFile';
import {
  IUpdateUseditemInput,
  IUseditemAddressInput,
  IQuery,
} from '@/shared/types/generated/types';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getMarketSchema,
  IMarketFormData,
} from '@/shared/utils/validations/marketSchema';
import { Modal } from 'antd';

export interface IMarketWriteDataProps {
  data?: Pick<IQuery, 'fetchUseditem'>;
}

export const useMarketWrite = (props: IMarketWriteDataProps) => {
  const { data } = props;
  const router = useRouter();
  const isEdit = router.pathname.includes('edit');
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<IMarketFormData>({
    resolver: zodResolver(getMarketSchema({ isEdit })) as any,
    mode: 'onChange',
    defaultValues: {
      name: '',
      remarks: '',
      contents: '',
      price: 0,
      tags: '',
      zipcode: '',
      address: '',
      addressDetail: '',
      images: ['', '', ''],
    },
    context: { isEdit },
  });

  const isChanged = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
    if (data?.fetchUseditem) {
      const fetchedImages = data.fetchUseditem.images ?? [];
      const imagesToReset = [
        ...fetchedImages,
        ...Array(3 - fetchedImages.length).fill(''),
      ];

      const tagsStr = data.fetchUseditem.tags?.join(',') ?? '';

      reset({
        name: data.fetchUseditem.name ?? '',
        remarks: data.fetchUseditem.remarks ?? '',
        contents: data.fetchUseditem.contents ?? '',
        price: data.fetchUseditem.price ?? 0,
        tags: tagsStr,
        zipcode: data.fetchUseditem.useditemAddress?.zipcode ?? '',
        address: data.fetchUseditem.useditemAddress?.address ?? '',
        addressDetail: data.fetchUseditem.useditemAddress?.addressDetail ?? '',
        images: imagesToReset,
      });
      const initialFileList = Array(3).fill(null);
      setFileList(initialFileList);
    } else {
      reset({
        name: '',
        remarks: '',
        contents: '',
        price: 0,
        tags: '',
        zipcode: '',
        address: '',
        addressDetail: '',
        images: ['', '', ''],
      });
      setFileList([null, null, null]);
    }
  }, [data, reset]);

  const [createUseditem] = useMutationCreateUsedItem();
  const [updateUseditem] = useMutationUpdateUseditem();
  const [uploadFile] = useMutationUploadFile();

  const [fileList, setFileList] = useState<(File | null)[]>([null, null, null]);

  const onFileSelect = (file: File | undefined, index: number) => {
    const newFileList = [...fileList];
    newFileList[index] = file || null;
    setFileList(newFileList);
    if (file) {
      setValue(`images.${index}`, '', { shouldDirty: true });
    } else {
      setValue(`images.${index}`, '', { shouldDirty: true });
    }
  };

  const onCompleteAddressSearch = (data: any) => {
    setValue('address', data.address, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue('zipcode', data.zonecode, {
      shouldDirty: true,
      shouldValidate: true,
    });
    toggleModal();
  };

  const onChangeAddressDetail = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('addressDetail', e.target.value, { shouldDirty: true });
  };

  const onSubmit = async (formData: IMarketFormData) => {
    const uploadedUrls = await Promise.all(
      fileList.map(async (file, idx) => {
        if (file) {
          const result = await uploadFile({ variables: { file } });
          return result.data?.uploadFile.url ?? '';
        }
        return formData.images?.[idx] || '';
      })
    );

    const finalImages = uploadedUrls.filter((url) => url !== '');

    // Parse tags by comma
    const parsedTags = formData.tags
      ? formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== '')
      : [];

    try {
      const useditemAddress: IUseditemAddressInput | undefined =
        formData.address || formData.zipcode || formData.addressDetail
          ? {
              zipcode: formData.zipcode,
              address: formData.address,
              addressDetail: formData.addressDetail,
            }
          : undefined;

      const result = await createUseditem({
        variables: {
          createUseditemInput: {
            name: formData.name,
            remarks: formData.remarks,
            contents: formData.contents,
            price: Number(formData.price),
            tags: parsedTags.length > 0 ? parsedTags : undefined,
            useditemAddress,
            images: finalImages,
          },
        },
      });
      if (!result.data?.createUseditem) {
        throw new Error('상품 등록에 실패했습니다.');
      }
      Modal.success({ content: '상품이 등록되었습니다.' });
      void router.push(`/market/${result.data.createUseditem._id}`);
    } catch (error: any) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onUpdate = async (formData: IMarketFormData) => {
    const uploadedUrls = await Promise.all(
      fileList.map(async (file, idx) => {
        if (file) {
          const result = await uploadFile({ variables: { file } });
          return result.data?.uploadFile.url ?? '';
        } else {
          return formData.images?.[idx] || '';
        }
      })
    );

    const finalImages = uploadedUrls;
    const parsedTags = formData.tags
      ? formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== '')
      : [];

    const updateUseditemInput: IUpdateUseditemInput = {};
    if (formData.name) updateUseditemInput.name = formData.name;
    if (formData.remarks) updateUseditemInput.remarks = formData.remarks;
    if (formData.contents) updateUseditemInput.contents = formData.contents;
    if (formData.price !== undefined)
      updateUseditemInput.price = Number(formData.price);
    if (parsedTags.length > 0) updateUseditemInput.tags = parsedTags;
    if (finalImages.length > 0) updateUseditemInput.images = finalImages;

    const useditemAddress: IUseditemAddressInput = {};
    if (formData.zipcode) useditemAddress.zipcode = formData.zipcode;
    if (formData.address) useditemAddress.address = formData.address;
    if (formData.addressDetail)
      useditemAddress.addressDetail = formData.addressDetail;

    if (Object.keys(useditemAddress).length > 0) {
      updateUseditemInput.useditemAddress = useditemAddress;
    }

    try {
      const useditemId = router.query.marketId;
      if (typeof useditemId !== 'string') return;

      const result = await updateUseditem({
        variables: {
          useditemId,
          updateUseditemInput,
        },
      });

      if (!result.data?.updateUseditem) {
        throw new Error('상품 수정에 실패했습니다.');
      }
      Modal.success({ content: '상품이 수정되었습니다.' });
      void router.push(`/market/${result.data.updateUseditem._id}`);
    } catch (error: any) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isValid,
    isOpen,
    isChanged,
    fileUrls: watch('images') ?? [],
    onSubmit,
    onUpdate,
    onChangeAddressDetail,
    onCompleteAddressSearch,
    onFileSelect,
    toggleModal,
    setValue,
    getValues,
    watch,
  };
};
