import * as dotenv from 'dotenv';
import { z } from 'zod';
import { RED, BOLD, RESET } from '@/helpers/console/color';
import { MY_IP_ADDRESS } from '@/helpers';

dotenv.config();

const EnviromentMode = ['development', 'production', 'test'] as const;

const EnvironmentSchema = z.object({
    NODE_ENV: z
        .enum(EnviromentMode, { message: `Modo de ambiente inválido. Esperados ${EnviromentMode.join(' | ')}` })
        .optional()
        .default('development'),
    FASTIFY_HOST: z.string({ required_error: 'Configuração obrigatória' }).default(MY_IP_ADDRESS),
    FASTIFY_PORT: z.string({ required_error: 'Configuração obrigatória' }),
});

const env = EnvironmentSchema.safeParse(process.env);

if (!env.success) {
    console.error(`\n${RED}${BOLD}* Erro na inicialização da aplicação:${RESET}\n`);
    console.error(
        `${RED}Foram identificadas inconsistências nas variáveis de ambiente necessárias para o funcionamento do sistema.${RESET}\n`
    );
    console.error(`${RED}${BOLD}Variáveis: ${RESET}\n`);
    env.error.issues.forEach(issue => {
        const variable = issue.path.join('.');
        const message = issue.message;
        const value = process.env[variable] !== undefined ? process.env[variable] : 'undefined';
        console.error(`${RED}- ${BOLD}${variable}: ${RESET}${RED}${message} (Valor fornecido: ${value})${RESET}`);
    });
    process.exit(1);
}

export default env.data;
