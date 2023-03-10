import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Footer from "../../components/Footer";

export default function SessionsPage() {
    const { idFilme } = useParams();
    const [filmeEscolhido, setFilmeEscolhido] = useState(null);

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
        const promise = axios.get(url);
        promise.then((resposta) => {
            setFilmeEscolhido(resposta.data);
            console.log(resposta.data);
        });
        promise.catch((resposta) => {
            console.log(resposta.response)
        });
    }, []);

    if (filmeEscolhido === null) {
        return (
            <PageContainer>
                <div>
                    Carregando...
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {filmeEscolhido.days.map((filme) => <Sessao key={filme.date} filme={filme} />)}
            </div>
            <Footer>
                <div>
                    <img src={filmeEscolhido.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filmeEscolhido.title}</p>
                </div>
            </Footer>
        </PageContainer>
    )
}
function Sessao({ filme }) {
    return (
        <SessionContainer>
            {filme.weekday} {filme.date}
            <ButtonsContainer>
                {filme.showtimes.map((horarios) => (
                    <Link to={`/assentos/${horarios.id}`}><button key={horarios.id}>{horarios.name}</button></Link>
                ))}
            </ButtonsContainer>
        </SessionContainer>
    );
}
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
