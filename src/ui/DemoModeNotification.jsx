import styled from "styled-components";
import { useDemoUser } from "../hooks/useDemoUser";

const DemoNotification = styled.div`
  background-color: var(--color-yellow-100);
  border: 1px solid var(--color-yellow-700);
  border-radius: var(--border-radius-md);
  padding: 1.2rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-yellow-800);
  font-weight: 500;
`;

const Icon = styled.span`
  font-size: 2rem;
`;

function DemoModeNotification() {
  const { isDemoUser } = useDemoUser();

  if (!isDemoUser) return null;

  return (
    <DemoNotification>
      <Icon>🚀</Icon>
      <div>
        <strong>Demo Mode:</strong> Welcome, Demo User! You&apos;re exploring The Wild Oasis with full read access. 
        All data is read-only - you can browse everything but can&apos;t make changes.
      </div>
    </DemoNotification>
  );
}

export default DemoModeNotification;