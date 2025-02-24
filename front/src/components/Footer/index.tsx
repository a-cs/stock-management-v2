import { FooterContainer, FooterLink, FooterText } from './styles'

export default function Footer() {
    return (
        <FooterContainer>
            <FooterText>
                Desenvolvido por{' '}
                <FooterLink href="https://github.com/a-cs" target="blank">
                    Anderson Carneiro Sousa
                </FooterLink>{' '}
                e{' '}
                <FooterLink
                    href="http://lattes.cnpq.br/6461304037196132"
                    target="blank"
                >
                    Lorena Braga Moura
                </FooterLink>
            </FooterText>
            <FooterText>
                <FooterLink href="https://ifce.edu.br/" target="blank">
                    Instituto Federal de Educação, Ciência e Tecnologia do Ceará
                    - Campus Fortaleza
                </FooterLink>
            </FooterText>
        </FooterContainer>
    )
}
