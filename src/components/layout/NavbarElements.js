import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
// import {Link as LinkS} from "react-scroll"

export const Nav = styled.nav`
background: #000;
height: 80px;
// margin-top: -80px;
display: flex;
justify-content: center;
align-items: center;
font-size: 1rem;
position: sticky:
top: 0;
z-index: 10;

@media screen and (max-width: 960px) {
    transition: 0.08s all ease;
}
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  padding: 0 24 px;
  max-width: 1100px;
`;
export const NavLogo = styled(LinkR)`
  color: red;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5.rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;
