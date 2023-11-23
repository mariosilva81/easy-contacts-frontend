import { StyledButton } from '../../styles/buttons';
import { StyledHeadline2, StyledParagraph } from '../../styles/typography';
import ContactsLists from '../ContactsLists/ContactsLists';
import AddContactModal from '../AddContactModal/AddContactModal';
import { useContactsContext } from '../../providers/ContactContext';
import { useClientContext } from '../../providers/ClientContext';
import EditClientModal from '../EditClientModal/EditClientModal';
import RemoveClientModal from '../RemoveClientModal/RemoveClientModal';
import EditClientPasswordModal from '../EditClientPasswordModal/EditClientPasswordModal';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Client } from '../../providers/@types';

const Dashboard = () => {
  const { isAddModal, setIsAddModal, contactsList, setContactsList } =
    useContactsContext();
  const { isEditClientModal, isRemoveClientModal, isEditClientPasswordModal } =
    useClientContext();
  const [_loading, setLoading] = useState(true);
  const clientToken = localStorage.getItem('@TOKEN');
  const clientId = localStorage.getItem('@CLIENT_ID');
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const { data } = await api.get<Client>(`/clients/${clientId}`, {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        });
        setClient(data);
        setContactsList([...data!.contacts!]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (clientToken && clientId) {
      loadClient();
    }
  }, [clientToken, clientId, setContactsList]);

  return (
    <>
      {_loading || !contactsList ? (
        <p>Carregando...</p>
      ) : (
        <div className="dashboardContainer">
          {isAddModal ? <AddContactModal /> : null}
          {isEditClientModal ? <EditClientModal /> : null}
          {isRemoveClientModal ? <RemoveClientModal /> : null}
          {isEditClientPasswordModal ? <EditClientPasswordModal /> : null}

          <div className="contacts-header">
            <StyledHeadline2 fontsize="medium">Contatos</StyledHeadline2>
            <StyledButton
              buttonstyle="disabled"
              buttonsize="medium"
              onClick={() => setIsAddModal(true)}
            >
              +
            </StyledButton>
          </div>
          {contactsList.length >= 1 ? (
            <ContactsLists />
          ) : (
            <StyledParagraph fontweight="bold" color="gray">
              Nenhum contato cadastrado.
            </StyledParagraph>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
