import {Filter} from '../Filter/Filter';
import {
    ContactsAvatar,
    ContactsButton,
    ContactsItem,
    ContactsListWrapper,
    ContactsSpanWrapper,
    ContactsTitle,
    ContactsUl,
    DeleteIcon
} from './ContactsList.styled';
import {Notification} from '../Notification/Notification';
import {MouseEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {selectContactFilter, selectContacts} from '../../redux/contacts/contacts-selectors';
import {deleteContact, fetchContacts} from '../../redux/contacts/contacts-operations';
import {IContact} from '../../redux/contacts/contactsSlice';
import {EditableSpan} from '../EditableSpan/EditableSpan';

export const ContactsList = () => {
    const contacts: IContact[] = useAppSelector(selectContacts)
    const filter = useAppSelector(selectContactFilter)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(fetchContacts());
    }, [dispatch]);

    const deleteUser = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteContact(e.currentTarget.id))
    };


    const avatarCreator = (name: string) => {
        const nameSplit = name.split(' ');
        if (nameSplit.length > 1) {
            return nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
        } else {
            return nameSplit[0].charAt(0).toUpperCase();
        }
    };

    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')}`;
    }

    return (
        <ContactsListWrapper>
            <ContactsTitle>Contacts</ContactsTitle>
            <Filter/>
            {contacts.length !== 0 ?
                <ContactsUl>
                    {contacts.filter(item => {
                        return item.name.toLowerCase().includes(filter);
                    })
                        .map(({id, name, number}) => {
                            return <ContactsItem key={id}>
                                <ContactsAvatar
                                    style={{backgroundColor: getRandomHexColor()}}>{avatarCreator(name)}</ContactsAvatar>
                                <ContactsSpanWrapper>
                                    <EditableSpan id={id} type={'name'} value={name}/>
                                    <EditableSpan id={id} type={'number'} value={number}/>
                                </ContactsSpanWrapper>
                                <ContactsButton id={id} onClick={deleteUser}><DeleteIcon/></ContactsButton>
                            </ContactsItem>;
                        })}
                </ContactsUl>
                : <Notification message="There is no contacts"/>}
        </ContactsListWrapper>
    )
        ;
}