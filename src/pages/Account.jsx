import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useDemoUser } from "../hooks/useDemoUser";
import DemoModeNotification from "../ui/DemoModeNotification";

function Account() {
  const { isDemoUser } = useDemoUser();

  return (
    <>
      <Heading as="h1">Update your account</Heading>
      
      {isDemoUser && <DemoModeNotification />}
      
      <Row>
        <Heading as="h3">Update user data</Heading>
        {isDemoUser ? (
          <p>Demo users cannot update account information.</p>
        ) : (
          <UpdateUserDataForm />
        )}
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        {isDemoUser ? (
          <p>Demo users cannot change passwords.</p>
        ) : (
          <UpdatePasswordForm />
        )}
      </Row>
    </>
  );
}

export default Account;
