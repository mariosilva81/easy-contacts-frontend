import { produce } from "immer";
import { useContactsContext } from "../../providers/ContactContext";
import ContactCard from "../ContactCard/ContactCard";
import { StyledContactsList } from "./style";
import EditContactModal from "../EditContactModal/EditContactModal";

const ContactsLists = () => {
  const { isEditModal, contactsList } = useContactsContext();

  const atualizedContactList = produce(contactsList, (draft) => {
    draft.reverse();
  });

  return (
    <>
      {isEditModal ? <EditContactModal /> : null}
      <StyledContactsList>
        {atualizedContactList.map((item) => (
          <ContactCard key={item.id} contact={item} />
        ))}
      </StyledContactsList>
    </>
  );
};

export default ContactsLists;
