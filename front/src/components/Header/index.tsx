import {
    HeaderContainer,
    HeaderContent,
    LabTitle,
    LogoContainer,
    LogoImage,
    MenuContainer,
    MenuItem,
    MenuLink,
    MenuList,
    Nav,
    ProfileLink,
    ProfileName,
} from './styles'

import logoIFCE from '../../assets/logo_ifce_fortaleza.png'
import { FiUser } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation()

    const menuItems = []
    // if (user?.is_allowed) {
    menuItems.push('Estoque')
    menuItems.push('Categorias')
    menuItems.push('Movimentações')
    //   }

    //   if (user?.is_allowed && user?.is_admin) {
    menuItems.push('Admin')
    //   }

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
                        <ProfileName>{'admin'}</ProfileName>
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
                                                  location.pathname ===
                                                      '/estoque'
                                                : `/${menuItem.replace(/ç/g, 'c').replace(/õ/g, 'o').toLowerCase()}` ===
                                                  location.pathname
                                        }
                                    >
                                        {menuItem}
                                    </MenuLink>
                                </MenuItem>
                            ))}
                            <MenuItem>
                                <MenuLink to="/" $isCurrentPatch={false}>
                                    Sair
                                </MenuLink>
                            </MenuItem>
                        </MenuList>
                    </Nav>
                </MenuContainer>
            </HeaderContent>
        </HeaderContainer>
    )
}
