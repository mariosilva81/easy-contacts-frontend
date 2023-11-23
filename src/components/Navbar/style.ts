import styled from 'styled-components';

interface INavStylesProps {
  isbutton: 'true' | 'false';
}

export const NavStyles = styled.nav<INavStylesProps>`
  width: 100%;
  min-height: 2.5rem;
  display: flex;
  justify-content: ${({ isbutton }) =>
    isbutton == 'true' ? 'space-between' : 'center'};
  align-items: center;
  margin: 0 auto;
  gap: 2rem;

  img {
    width: 10%; 
  }

  p {
    color: var(--color-color-primary);
    font-size: clamp(1.2rem, 5vw, 1.5rem);
    line-height: 2rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
  }

  .buttons-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button {
    font-size: clamp(0.6rem, 3vw, 0.8rem);
    padding-inline: clamp(0.7rem, 3vw, 1rem);
  }
`;
