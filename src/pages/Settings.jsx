import styled from "styled-components";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Container = styled.div`
  max-width: 110rem;
  margin: 0 auto;
`;

function Settings() {
  return (
    <Container>
      <Row type="vertical">
        <Heading as="h1">Update hotel settings</Heading>
        <UpdateSettingsForm />
      </Row>
    </Container>
  );
}

export default Settings;
