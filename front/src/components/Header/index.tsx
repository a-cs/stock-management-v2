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

export default function Header() {
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
                    <ProfileLink to="/perfil">
                        <FiUser size="28px" strokeWidth="3" />
                        <ProfileName>{'admin'}</ProfileName>
                    </ProfileLink>
                    <Nav>
                        <MenuList>
                            {menuItems.map((menuItem) => (
                                <MenuItem key={menuItem}>
                                    <MenuLink
                                        to={`/${menuItem.replace(/ç/g, 'c').replace(/õ/g, 'o')}`}
                                    >
                                        {menuItem}
                                    </MenuLink>
                                </MenuItem>
                            ))}
                            <MenuItem>
                                <MenuLink to="/">Sair</MenuLink>
                            </MenuItem>
                        </MenuList>
                    </Nav>
                </MenuContainer>
            </HeaderContent>
        </HeaderContainer>
    )
}
