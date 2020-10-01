// import axios from "axios";

// export class CepAPI {
//     public async cepChecker(cep: string): Promise<CepData> {
//         const response = await axios.get<CepData>(`https://viacep.com.br/ws/${cep}/json`);
//         return response.data;
//     };
// };

// interface CepData {
//     cep: string;
//     logradouro: string;
//     complemento: string;
//     bairro: string;
//     localidade: string;
//     uf: string;
//     unidade: string;
//     ibge: string;
//     gia: string;
// };