import {
  StyledHeadline2,
  StyledHeadline3,
  StyledParagraph,
} from '../../styles/typography';
import { StyledButton } from '../../styles/buttons';
import { useState } from 'react';
import { useOutClick } from '../../hooks/useOutClick';
import { useKeydownPress } from '../../hooks/useKeydownPress';
import { useClientContext } from '../../providers/ClientContext';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { StyledRemoveClientModal } from './style';

const RemoveClientModal = () => {
  const {
    client,
    setIsRemoveClientModal,
    handleLogout,
    setIsEditClientModal,
    setIsEditClientPasswordModal,
  } = useClientContext();
  const [loading, setLoading] = useState(false);
  const clientId = localStorage.getItem('@CLIENT_ID');
  const clientToken = localStorage.getItem('@TOKEN');

  const modalRef = useOutClick(() => closeModals());
  const buttonRef = useKeydownPress('Escape', (element) => element?.click());

  const removeClient = async () => {
    try {
      setLoading(true);

      await api.delete(`/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

      toast.success('Cliente excluído com sucesso.', {
        className: 'toast-sucess',
      });
    } catch (error: any) {
      toast.error('Oops! Algo deu errado.', {
        className: 'toast-error',
      });
    } finally {
      setIsRemoveClientModal(false);
      handleLogout();
      setLoading(false);
    }
  };

  const closeModals = () => {
    setIsEditClientModal(false);
    setIsEditClientPasswordModal(false);
    setIsRemoveClientModal(false);
  };

  return (
    <div className="modalOverlay" role="dialog">
      <StyledRemoveClientModal ref={modalRef}>
        <header>
          <StyledHeadline2 fontweight="bold" fontsize="small">
            Cliente
          </StyledHeadline2>
          <StyledParagraph
            fontweight="bold"
            color="gray"
            ref={buttonRef}
            onClick={() => setIsRemoveClientModal(false)}
          >
            X
          </StyledParagraph>
        </header>
        <div className="remove-content">
          <StyledHeadline3 fontweight="bold" fontsize="medium">
            Tem certeza que deseja excluir o cliente "{client!.full_name}"?
          </StyledHeadline3>
          <div className="buttons-container">
            <StyledButton
              type="button"
              buttonsize="medium"
              buttonstyle="danger"
              disabled={loading}
              onClick={async () => removeClient()}
            >
              {loading ? 'Excluindo...' : 'Excluir'}
            </StyledButton>
            <StyledButton
              type="button"
              buttonsize="medium"
              buttonstyle="register"
              disabled={loading}
              onClick={() => {
                closeModals();
                setIsEditClientModal(true);
              }}
            >
              Voltar
            </StyledButton>
          </div>
        </div>
      </StyledRemoveClientModal>
    </div>
  );
};

export default RemoveClientModal;
