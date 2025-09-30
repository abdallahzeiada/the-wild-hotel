/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //  1) load the authenticated User
  const { user = {}, isLoading } = useUser();
  console.log(user)
  const isAuthenticated = user?.role === "authenticated";
  //  2) if there is no authenticated user redirect to "/login"
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );


  //  3) while Laoding show mini spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //  4) if there is an authenticated user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
