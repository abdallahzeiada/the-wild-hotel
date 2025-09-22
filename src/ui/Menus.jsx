import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 1000;

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [position, setPosition] = useState({});
  const [openMenu, setOpenMenu] = useState("");
  const close = () => setOpenMenu("");
  const open = setOpenMenu;

  return (
    <MenusContext.Provider
      value={{ position, openMenu, close, open, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ children, id }) {
  const { openMenu, close, open, setPosition } = useContext(MenusContext);

  function handleToggle(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openMenu === "" || openMenu !== id ? open(id) : close();
  }

  return <StyledToggle onClick={handleToggle}>{children}</StyledToggle>;
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function List({ children, id }) {
  const { position, openMenu, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openMenu !== id) return null;
  
  return (
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>
  );
}

function Button({ children, onClick, disabled = false }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <StyledButton disabled={disabled} onClick={handleClick}>
      {children}
    </StyledButton>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
