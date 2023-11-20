import { NavStyles } from './style';
import { StyledButton, StyledLink } from '../../styles/buttons';
import { useClientContext } from '../../providers/ClientContext';
import { StyledParagraph } from '../../styles/typography';

interface NavbarProps {
  isbutton?: 'false' | 'true';
  text?: string;
}

const Navbar = ({ isbutton = 'false', text }: NavbarProps) => {
  const { handleLogout, setIsEditClientModal } = useClientContext();

  return (
    <NavStyles isbutton={isbutton === 'true' ? 'true' : 'false'}>
      <StyledParagraph>Make Contact</StyledParagraph>
      {isbutton === 'true' && text === 'Voltar' ? (
        <StyledLink to="/" buttonsize="medium" buttonstyle="disabled">
          {text}
        </StyledLink>
      ) : isbutton === 'true' && text === 'Sair' ? (
        <div className="buttons-container">
          <StyledButton
            buttonstyle="disabled"
            buttonsize="medium"
            onClick={() => setIsEditClientModal(true)}
          >
            Editar dados
          </StyledButton>
          <StyledButton
            buttonstyle="disabled"
            buttonsize="medium"
            onClick={() => handleLogout()}
          >
            {text}
          </StyledButton>
        </div>
      ) : null}
    </NavStyles>
  );
};

export default Navbar;
