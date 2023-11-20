import { StyledButton } from '../../styles/buttons';
import { StyledHeadline2, StyledParagraph } from '../../styles/typography';
import ContactsLists from '../ContactsLists/ContactsLists';
import AddContactModal from '../AddContactModal/AddContactModal';
import { useContactsContext } from '../../providers/ContactContext';
import { useClientContext } from '../../providers/ClientContext';
import EditClientModal from '../EditClientModal/EditClientModal';
import RemoveClientModal from '../RemoveClientModal/RemoveClientModal';
import EditClientPasswordModal from '../EditClientPasswordModal/EditClientPasswordModal';

const Dashboard = () => {
  const { isAddModal, setIsAddModal, contactsList } = useContactsContext();
  const { isEditClientModal, isRemoveClientModal, isEditClientPasswordModal } =
    useClientContext();

  return (
    <>
      {isAddModal ? <AddContactModal /> : null}
      {isEditClientModal ? <EditClientModal /> : null}
      {isRemoveClientModal ? <RemoveClientModal /> : null}
      {isEditClientPasswordModal ? <EditClientPasswordModal /> : null}
      <div className="dashboardContainer">
        <div className="contacts-header">
          <StyledHeadline2 fontsize="medium">Contatos</StyledHeadline2>
          <StyledButton
            buttonstyle="disabled"
            buttonsize="medium"
            onClick={() => setIsAddModal(true)}
          >
            Novo Contato
          </StyledButton>
        </div>
        {contactsList.length >= 1 ? (
          <ContactsLists />
        ) : (
          <StyledParagraph fontweight="bold" color="gray">
            Nenhum contato cadastrado!
          </StyledParagraph>
        )}
      </div>
    </>
  );
};

export default Dashboard;
