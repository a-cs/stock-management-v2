import {
    HeaderContainer,
    HeaderContent,
    IconButton,
    LabTitle,
    LogoContainer,
    LogoImage,
    MenuContainer,
    MenuIconContainer,
    MenuItem,
    MenuLink,
    MenuList,
    MenuMobile,
    Nav,
    ProfileLink,
    ProfileName,
} from './styles'

import logoIFCE from '../../assets/logo_ifce_fortaleza.png'
import { FiMenu, FiUser, FiX } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export default function Header() {
    const { user, signOut } = useContext(AuthContext)
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuItems = []
    if (user?.is_allowed) {
        menuItems.push('Estoque')
        menuItems.push('Categorias')
        menuItems.push('Movimentações')
    }

    if (user?.is_allowed && user?.is_admin) {
        menuItems.push('Admin')
    }

    function toggleMenu(): void {
        setIsMenuOpen(!isMenuOpen)
    }

    function useOnClickOutside(
        ref: React.RefObject<HTMLDivElement>,
        closeMenu: () => void,
    ) {
        useEffect(() => {
            const listener = (event: MouseEvent) => {
                if (
                    ref.current &&
                    event.target &&
                    ref.current.contains(event.target as Node)
                ) {
                    return
                }
                closeMenu()
            }

            document.addEventListener('mousedown', listener)
            return () => {
                document.removeEventListener('mousedown', listener)
            }
        }, [ref, closeMenu])
    }

    const menuMobile = useRef<HTMLDivElement>(null)
    useOnClickOutside(menuMobile, () => setIsMenuOpen(false))

    return (
        <HeaderContainer>
            <HeaderContent>
                <LogoContainer>
                    <LogoImage src={logoIFCE} alt="Logo IFCE" />
                    <LabTitle>Laboratório de Ensaios Mecânicos</LabTitle>
                </LogoContainer>
                <MenuContainer>
                    <ProfileLink
                        to="/perfil"
                        $isCurrentPatch={location.pathname === '/perfil'}
                    >
                        <FiUser size="28px" strokeWidth="3" />
                        <ProfileName>{user?.name || 'Usuário'}</ProfileName>
                    </ProfileLink>
                    <Nav>
                        <MenuList>
                            {menuItems.map((menuItem) => (
                                <MenuItem key={menuItem}>
                                    <MenuLink
                                        to={`/${menuItem.replace(/ç/g, 'c').replace(/õ/g, 'o').toLowerCase()}`}
                                        $isCurrentPatch={
                                            menuItem === 'Estoque'
                                                ? location.pathname === '/' ||
                                                  location.pathname.toLowerCase() ===
                                                      '/estoque'
                                                : `/${menuItem.replace(/ç/g, 'c').replace(/õ/g, 'o').toLowerCase()}` ===
                                                  location.pathname.toLowerCase()
                                        }
                                    >
                                        {menuItem}
                                    </MenuLink>
                                </MenuItem>
                            ))}
                            <MenuItem>
                                <MenuLink
                                    onClick={() => signOut()}
                                    to="/"
                                    $isCurrentPatch={false}
                                >
                                    Sair
                                </MenuLink>
                            </MenuItem>
                        </MenuList>
                    </Nav>
                </MenuContainer>
                <MenuIconContainer>
                    <IconButton type="button" onClick={toggleMenu}>
                        {!isMenuOpen ? (
                            <FiMenu size="50px" />
                        ) : (
                            <FiX size="50px" />
                        )}
                    </IconButton>
                    {isMenuOpen && (
                        <MenuMobile ref={menuMobile}>
                            <ProfileLink
                                to="/perfil"
                                $isCurrentPatch={
                                    location.pathname === '/perfil'
                                }
                                onClick={() => toggleMenu()}
                            >
                                <FiUser size="28px" strokeWidth="3" />
                                <ProfileName>
                                    {user?.name || 'Usuário'}
                                </ProfileName>
                            </ProfileLink>
                            <Nav>
                                <MenuList>
                                    {menuItems.map((menuItem) => (
                                        <MenuLink
                                            to={`/${menuItem.replace(/ç/g, 'c').replace(/õ/g, 'o')}`}
                                            key={menuItem}
                                            $isCurrentPatch={
                                                menuItem === 'Estoque'
                                                    ? location.pathname ===
                                                          '/' ||
                                                      location.pathname.toLowerCase() ===
                                                          '/estoque'
                                                    : `/${menuItem.replace(/ç/g, 'c').replace(/õ/g, 'o').toLowerCase()}` ===
                                                      location.pathname.toLowerCase()
                                            }
                                            onClick={() => toggleMenu()}
                                        >
                                            <MenuItem>{menuItem}</MenuItem>
                                        </MenuLink>
                                    ))}
                                    <MenuLink
                                        to="/"
                                        onClick={() => signOut()}
                                        key="sair"
                                        $isCurrentPatch={false}
                                    >
                                        <li className="">Sair </li>
                                    </MenuLink>
                                </MenuList>
                            </Nav>
                        </MenuMobile>
                    )}
                </MenuIconContainer>
            </HeaderContent>
        </HeaderContainer>
    )
}
