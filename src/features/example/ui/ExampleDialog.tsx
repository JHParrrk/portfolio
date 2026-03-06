import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToastStore } from '@/features/toast/models/useToastStore';

// 1. Zod를 활용한 스키마 유효성 검증 (Type-safe)
const exampleSchema = z.object({
  title: z.string().min(2, '제목은 최소 2글자 이상이어야 합니다.'),
});

type ExampleFormValues = z.infer<typeof exampleSchema>;

export const ExampleDialog = () => {
  const { addToast } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExampleFormValues>({
    resolver: zodResolver(exampleSchema),
  });

  const onSubmit = (data: ExampleFormValues) => {
    // 2. 폼 제출 성공 시 recoil을 활용하여 전역 토스트 메시지 띄우기
    console.log('Submitted Data:', data);
    addToast(`성공적으로 제출되었습니다: ${data.title}`, 'success');
    reset();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          style={{
            padding: '10px 16px',
            background: '#000',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          예시 다이얼로그 열기 (Radix UI)
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            inset: 0,
            zIndex: 999,
          }}
        />
        <Dialog.Content
          style={{
            backgroundColor: 'white',
            borderRadius: '6px',
            boxShadow:
              'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '450px',
            maxHeight: '85vh',
            padding: '25px',
            zIndex: 1000,
          }}
        >
          <Dialog.Title style={{ margin: 0, fontWeight: 500, fontSize: 17 }}>
            아키텍처 통합 테스트 폼
          </Dialog.Title>
          <Dialog.Description style={{ margin: '10px 0 20px', fontSize: 15 }}>
            React-Hook-Form과 Zod를 활용한 입력 폼입니다. 제출 후 토스트 알림을
            확인하세요.
          </Dialog.Description>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                {...register('title')}
                placeholder="제목을 입력하세요..."
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
              {errors.title && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.title.message}
                </span>
              )}
            </div>

            <div
              style={{
                marginTop: 20,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10,
              }}
            >
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  background: '#4caf50',
                  color: '#fff',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                제출하기
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
