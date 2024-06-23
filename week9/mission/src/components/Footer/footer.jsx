import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: #FFCC15;
  color: black;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;    
`

const Footer = () => {

return (
    <StyledFooter>UMC 6th Web_Hansung Univ</StyledFooter>
)

}

export default Footer;