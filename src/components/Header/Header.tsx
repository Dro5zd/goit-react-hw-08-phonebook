import { selectIsAuth, selectUsername } from "../../redux/auth/auth-selectors";
import {
  BoxAvatar, Container,
  ExitButton,
  ExitLogo,
  Logo,
  UserInfo,
  UserName,
  WrapperHeader,
} from './Header.styled';

import logo from "../../assets/images/svg/logo.svg";
import logout from "../../assets/images/svg/logout.svg";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { logoutUser } from "../../redux/auth/auth-operations";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ModalContent } from "../ModalContent/ModalContent";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");
  const [userName, setUserName] = useState("");
  const userInitName = useAppSelector(selectUsername);
  const isAuth = useAppSelector(selectIsAuth);

  const userNameCreator = (name: string) => {
    const letter = name?.split("")[0]?.toUpperCase();
    setFirstLetter(letter);
    return letter + name.split("@")[0].slice(1, name.length);
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // @ts-ignore
    setUserName(userNameCreator(userInitName));
  }, [userInitName]);

  // const avatarCreator = (name: string) => {
  //   const nameSplit = name.split(' ');
  //   if (nameSplit.length > 1) {
  //     return nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
  //   } else {
  //     return nameSplit[0].charAt(0).toUpperCase();
  //   }
  // };

  // function getRandomHexColor() {
  //   return `#${Math.floor(Math.random() * 16777215)
  //       .toString(16)
  //       .padStart(6, '0')}`;
  // }

  const logoutHandler = () => {
    dispatch(logoutUser());
    handleOpenModal();
  };

  return (
    <>
      <WrapperHeader>
        <Container>
          <Logo to="/home">
            <img src={logo} alt="Kapusta" width={90} />
          </Logo>
          {isAuth && (
            <UserInfo>
              {" "}
              <BoxAvatar>{firstLetter}</BoxAvatar>
              <UserName>{userName}</UserName>
              <ExitLogo onClick={handleOpenModal} src={logout} alt="log-out" />
              <ExitButton type="button" onClick={handleOpenModal}>
                Exit
              </ExitButton>
            </UserInfo>
          )}
        </Container>
      </WrapperHeader>
      {isOpen && (
        <Modal onClose={handleOpenModal}>
          <ModalContent
            onClose={handleOpenModal}
            action={logoutHandler}
            text="Do you really want to leave?"
            type="button"
          />
        </Modal>
      )}
    </>
  );
};
