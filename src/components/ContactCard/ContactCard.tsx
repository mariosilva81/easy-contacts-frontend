import { Contact } from '../../providers/@types';
import { useContactsContext } from '../../providers/ContactContext';
import { StyledParagraph, StyledHeadline3 } from '../../styles/typography';
import { StyledContactCard } from './style';

interface IContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: IContactCardProps) => {
  const { setIsEditModal, setUpdatedContact } = useContactsContext();

  const handleOpenEditModal = (contact: Contact) => {
    setIsEditModal(true);
    setUpdatedContact(contact);
  };

  return (
    <StyledContactCard onClick={() => handleOpenEditModal(contact)}>
      <StyledHeadline3 fontweight="bold" fontsize="small">
        {contact.full_name}
      </StyledHeadline3>
      <StyledParagraph color="gray">{contact.phone}</StyledParagraph>
      <StyledParagraph color="gray" className="alter-display">
        {contact.email}
      </StyledParagraph>
    </StyledContactCard>
  );
};

export default ContactCard;
