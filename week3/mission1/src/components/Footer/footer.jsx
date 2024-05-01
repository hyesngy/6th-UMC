import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: #FFCC15;
  color: black;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height:2vw;
  font-size: 1.3vw;
  font-weight: bold;
  font-style: italic;
`;

const Footer = () => {

return (
    <StyledFooter>UMC 6th Web_Hansung Univ</StyledFooter>
)

}

export default Footer;