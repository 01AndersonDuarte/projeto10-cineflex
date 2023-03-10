import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import styled from "styled-components"
import Footer from "../../components/Footer"

export default function SeatsPage() {
    const { idSessao } = useParams();
    const [sessaoEscolhida, setSessaoEscolhida] = useState(null);
    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
        const promise = axios.get(url);
        promise.then((resposta) => {
            console.log(resposta.data);
            setSessaoEscolhida(resposta.data);
        });
        promise.catch((resposta) => {
            console.log(resposta)
        });
    }, []);
    if (sessaoEscolhida === null) {
        return (
            <PageContainer>
                Carregando...
            </PageContainer>
        );
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {/* <Assento sessaoEscolhida={sessaoEscolhida}/> */}
                {sessaoEscolhida.seats.map((a) => <Assento assento={a} />)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle corFundo={`#1AAE9E`} corBorda={`#0E7D71`} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle corFundo={`#C3CFD9`} corBorda={`#7B8B99`} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle corFundo={`#FBE192`} corBorda={`#F7C52B`} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <Footer>
                <div>
                    <img src={sessaoEscolhida.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessaoEscolhida.movie.title}</p>
                    <p>{sessaoEscolhida.day.weekday} - {sessaoEscolhida.name}</p>
                </div>
            </Footer>

        </PageContainer>
    )
}
function Assento({ assento }) {
    const [assentoEscolhido, setAssentoEscolhido] = useState(false);
    return (
        <>
            <SeatItem
                onClick={() => assento.isAvailable ? setAssentoEscolhido(true) : ``}
                key={assento.id}
                corFundo={assento.isAvailable ? (assentoEscolhido ? `#1AAE9E` : `#C3CFD9`) : `#FBE192`}
                corBorda={assento.isAvailable ? (assentoEscolhido ? `#0E7D71` : `#7B8B99`) : `#F7C52B`}
            >
                {assento.name}
            </SeatItem>
        </>
    );
}
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${({ corBorda }) => corBorda};         // Essa cor deve mudar
    background-color: ${({ corFundo }) => corFundo};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${({ corBorda }) => corBorda};     // Essa cor deve mudar
    background-color: ${({ corFundo }) => corFundo};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: pointer;
`;