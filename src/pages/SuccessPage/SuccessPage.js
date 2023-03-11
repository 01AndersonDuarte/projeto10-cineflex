import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"


export default function SuccessPage() {
    const location = useLocation();
    const filme = location.state?.sessao;
    const assento = location.state?.assento;
    const [numeroAssentos, setNumeroAssentos] = useState([]);
    
    function gerarAssento(){
        setNumeroAssentos(assento.ids.map((id)=>filme.seats.find(f=>f.id===id).name));
    }
    useEffect(gerarAssento, []);

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{filme.movie.title}</p>
                <p>{filme.day.date} - {filme.name}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {numeroAssentos.map((n)=><AssentoComprado key={n} assentoNumero={n}/>)}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {assento.name}</p>
                <p>CPF: {assento.cpf}</p>
            </TextContainer>

            <Link to="/"><button>Voltar para Home</button></Link>
        </PageContainer>
    )
}
function AssentoComprado({assentoNumero}){
    return(
        <p>Assento {assentoNumero}</p>
    );
}
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`