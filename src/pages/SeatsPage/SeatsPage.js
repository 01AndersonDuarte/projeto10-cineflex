import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import styled from "styled-components"
import Footer from "../../components/Footer"

export default function SeatsPage() {
    const { idSessao } = useParams();
    const [sessaoEscolhida, setSessaoEscolhida] = useState(null);
    const [assentoEscolhido, setAssentoEscolhido] = useState({ ids: [], name: "", cpf: "" });
    const navigate = useNavigate();
    // console.log(assentoEscolhido);

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
        const promise = axios.get(url);
        promise.then((resposta) => {
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
    function finalizar(evento) {
        evento.preventDefault();
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const promise = axios.post(url, assentoEscolhido);
        promise.then((resposta) => {
            // console.log(resposta)
            navigate("/sucesso", { state: { assento: assentoEscolhido, sessao: sessaoEscolhida } });
        });
        promise.catch((erro) => {
            console.log(erro.data)
        });
    }
    function habilitarBotao() {
        if ((assentoEscolhido.cpf.length <= 10) || (assentoEscolhido.name.length < 5)) {
            return true;
        }
        return false;
    }
    function handleChange(event) {
        const maxLength = 11;
        const value = event.target.value;

        if (value.length <= maxLength) {
            setAssentoEscolhido({ ...assentoEscolhido, cpf: value })
        }
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {sessaoEscolhida.seats.map((a) => <Assento key={a.id} assentoEscolhido={assentoEscolhido} setAssentoEscolhido={setAssentoEscolhido} assento={a} />)}
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

            <FormContainer onSubmit={finalizar}>
                Nome do Comprador:
                <input
                    data-test="client-name"
                    type="text"
                    placeholder="Digite seu nome..."
                    value={assentoEscolhido.name}
                    required
                    onChange={(e) => setAssentoEscolhido({ ...assentoEscolhido, name: e.target.value })}
                />

                CPF do Comprador:
                <input
                    data-test="client-cpf"
                    type="number"
                    placeholder="Digite seu CPF..."
                    value={assentoEscolhido.cpf}
                    required
                    onChange={handleChange}
                />
                <button data-test="book-seat-btn" type="submit" disabled={assentoEscolhido.ids.length === 0 ? true : habilitarBotao()}>Reservar Assento(s)</button>
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
function Assento({ assentoEscolhido, setAssentoEscolhido, assento }) {
    function adicionarAssento(bool, id, name) {
        setAssentoEscolhido(bool);
        bool ? setAssentoEscolhido({ ...assentoEscolhido, ids: [...assentoEscolhido.ids, id] }) :
            setAssentoEscolhido({ ...assentoEscolhido, ids: assentoEscolhido.ids.filter((a) => a !== id) })

    }
    return (
        <>
            <SeatItem
                data-test="seat"
                onClick={() => (
                    assento.isAvailable ? (assentoEscolhido.ids.includes(assento.id) ? adicionarAssento(false, assento.id)
                        : adicionarAssento(true, assento.id)) : alert("Esse assento não está disponível")
                )}
                corFundo={assento.isAvailable ? (assentoEscolhido.ids.includes(assento.id) ? `#1AAE9E` : `#C3CFD9`) : `#FBE192`}
                corBorda={assento.isAvailable ? (assentoEscolhido.ids.includes(assento.id) ? `#0E7D71` : `#7B8B99`) : `#F7C52B`}
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
const FormContainer = styled.form`
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