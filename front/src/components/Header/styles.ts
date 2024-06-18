import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0;
    background-color: ${(props) => props.theme.lighterGray};
`

export const HeaderContent = styled.div`
    display: flex;
    margin: auto;
    max-width: 1110px;
    height: 105px;

    @media (min-width: 1000px) {
        width: 1110px;
    }
`
export const LogoContainer = styled.div`
    margin: auto 1rem;
    height: 105px;
`

export const LogoImage = styled.img`
    margin-bottom: 2px;
    height: 60px;

    @media (min-width: 1000px) {
        height: 80px;
    }
`

export const LabTitle = styled.h2`
    font-size: 0.875rem;
    font-weight: 700;
    text-align: center;
    color: ${(props) => props.theme.black};

    @media (min-width: 1000px) {
        font-size: 1rem;
    }
`

export const MenuContainer = styled.div`
    width: 100%;
    height: 100%;
    display: none;
    justify-content: flex-end;
    align-items: flex-end;

    @media (min-width: 1000px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`

export const MenuLink = styled(Link)<{ $isCurrentPatch: boolean }>`
    font-size: 1.75rem;
    font-weight: 700;
    transition: 0.2s;
    color: ${(props) =>
        props.$isCurrentPatch ? props.theme.primary : props.theme.black};
    margin-right: 1.5rem;

    &:hover {
        color: ${(props) => props.theme.lightGreen};
    }
`

export const ProfileLink = styled(MenuLink)`
    color: ${(props) =>
        props.$isCurrentPatch ? props.theme.primary : props.theme.text};
    background-color: transparent;
    border: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const ProfileName = styled.h3`
    margin-left: 0.5rem;
`

export const Nav = styled.nav``

export const MenuList = styled.ul`
    display: flex;
    list-style-type: none;
`

export const MenuItem = styled.li``
