import { ExampleDialog } from '@/features/example/ui/ExampleDialog';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  border: 1px dashed #ccc;
  border-radius: 12px;
  text-align: center;
`;

export default function EnterpriseArchitectureTestPage() {
  return (
    <Wrapper>
      <h2>Enterprise Architecture Test</h2>
      <p style={{ marginBottom: '40px', color: '#666' }}>
        Radix UI + Zod + React Hook Form + Zustand
      </p>
      <ExampleDialog />
    </Wrapper>
  );
}
