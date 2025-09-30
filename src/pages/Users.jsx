import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import { useDemoUser } from "../hooks/useDemoUser";
import DemoModeNotification from "../ui/DemoModeNotification";

function NewUsers() {
  const { isDemoUser } = useDemoUser();

  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      
      {isDemoUser && <DemoModeNotification />}
      
      {isDemoUser ? (
        <p>Demo users cannot create new accounts. This feature is restricted in demo mode.</p>
      ) : (
        <SignupForm />
      )}
    </>
  );
}

export default NewUsers;
