import { useClientContext } from '../../providers/ClientContext';
import { StyledButton } from '../../styles/buttons';
import { StyledHeadline1 } from '../../styles/typography';
import { HeaderStyles } from './styles';

const Header = () => {
  const { client, setIsEditClientModal } = useClientContext();

  return (
    <HeaderStyles>
      <StyledHeadline1 fontsize="big" fontweight="bold">
        Olá, {client?.full_name}!
      </StyledHeadline1>
      <StyledButton
        buttonstyle="disabled"
        buttonsize="medium"
        onClick={() => setIsEditClientModal(true)}
      >
        Editar perfil
      </StyledButton>
    </HeaderStyles>
  );
};

export default Header;
