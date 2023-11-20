import { useClientContext } from '../../providers/ClientContext';
import { StyledHeadline1, StyledParagraph } from '../../styles/typography';
import { HeaderStyles } from './styles';

const Header = () => {
  const { client } = useClientContext();

  return (
    <HeaderStyles>
      <StyledHeadline1 fontsize="big" fontweight="bold">
        Olá, {client?.full_name}!
      </StyledHeadline1>
      <StyledParagraph color="gray">{client?.email}</StyledParagraph>
    </HeaderStyles>
  );
};

export default Header;
