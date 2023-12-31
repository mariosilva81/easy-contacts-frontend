import styled from 'styled-components';

export const StyledContactCard = styled.li`
  padding: 0.75rem;
  border-radius: 0.25rem;
  width: 100%;
  height: 3.125rem;
  background-color: var(--color-grey-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: var(--color-grey-2);
  }

  &:hover p {
    color: var(--color-grey-0);
  }

  div {
    width: 100%;
  }

  #container-phone {
    text-align: center;
    width: 50%;
  }

  #container-email {
    text-align: right;
    width: 50%;
  }

  @media (max-width: 600px) {
    .alter-display {
      display: none;
    }
  }

  @media (max-width: 400px) {
    div > p{
      font-size: 0.7rem;
    }

    #container-phone {
      width: 65%;
    }
  }
`;
