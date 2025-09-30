import styled from "styled-components";
import { useUser } from "./useUser";
import { useDemoUser } from "../../hooks/useDemoUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--color-brand-500);
  border: 2px solid var(--color-grey-50);
`;

const DemoIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DemoLabel = styled.span`
  font-size: 1.1rem;
  color: var(--color-yellow-700);
  font-weight: 600;
`;

function UserAvatar() {
  const { user } = useUser();
  const { isDemoUser } = useDemoUser();
  const { fullName, avatar } = user.user_metadata;
  
  const displayName = isDemoUser ? "Demo User" : fullName;
  
  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${displayName}`}
      />
      {isDemoUser ? (
        <DemoIndicator>
          <span>{displayName}</span>
          <DemoLabel>Read-Only Demo</DemoLabel>
        </DemoIndicator>
      ) : (
        <span>{displayName}</span>
      )}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
