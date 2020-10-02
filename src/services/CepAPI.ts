import axios from "axios";

export class CepAPI {
    public async cepChecker(cep: string): Promise<CepData> {
        try {

            const response = await axios.get<CepData>(`https://viacep.com.br/ws/${cep}/json`);
            return response.data;

        }
        finally {};
    };
    
};

interface CepData {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro: boolean;
};