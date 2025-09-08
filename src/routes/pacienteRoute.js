import express from 'express';
import { atualizaPaciente, buscaNaoRedeBasica, buscaPorAno, buscaPorLocalidade, buscaPorNome, buscaRedeBasica, buscaTodosPacientes, cadastaPaciente, excluirPaciente } from '../controller/pacienteController.js';


const router = express.Router();

router.get('/pacientes', buscaTodosPacientes);

router.get('/pacientes/buscar/nome', buscaPorNome);

router.get('/pacientes/buscar/ano', buscaPorAno);

router.get('/pacientes/buscar/localidade', buscaPorLocalidade);

router.get('/pacientes/buscar/rede-basica', buscaRedeBasica);

router.get('/pacientes/buscar/nao-rede-basica', buscaNaoRedeBasica);

router.post('/pacientes', cadastaPaciente);

router.put('/pacientes/:id_paciente', atualizaPaciente);

router.delete('/pacientes/:id_paciente', excluirPaciente);

export default router;

