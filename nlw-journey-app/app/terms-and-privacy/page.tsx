import { Logo } from '@/components/Logo';
import { ModeThemeToggle } from '@/components/ModeThemeToggle';

export default function TermsAndPrivacy() {
    return (
        <div className="flex flex-col items-center p-4 bg-zinc-100 dark:bg-zinc-950">
            <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[55%]">
                <div className="flex flex-col justify-center items-center gap-4 py-6 relative">
                    <Logo />
                    <ModeThemeToggle className="absolute top-3 right-3" />
                    <h1 className="text-2xl text-center font-extralight dark:text-white mb-4">
                        Termos de Uso e Políticas de Privacidade
                    </h1>
                </div>
                <div id="terms-of-use" className="dark:text-white p-4 rounded-md mb-4 w-full">
                    <h2 className="text-3xl text-center font-bold mb-2 pb-2">Termos de Uso</h2>
                    <ol className="list-decimal list-inside">
                        <li className="mb-2 text-justify">
                            <strong>Aceitação dos Termos:</strong> Ao acessar ou usar o aplicativo Planner - Seu
                            Planejador de Viagens (doravante denominado Aplicativo), você concorda em cumprir e estar
                            vinculado a estes Termos de Uso. Se você não concordar com estes termos, não utilize o
                            Aplicativo.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Uso do Aplicativo:</strong> O Aplicativo é destinado exclusivamente para uso pessoal
                            e não comercial. Você concorda em usar o Aplicativo de acordo com todas as leis,
                            regulamentos e diretrizes aplicáveis.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Cadastro e Conta:</strong> Para utilizar certos recursos do Aplicativo, você poderá
                            ser solicitado a criar uma conta. Você é responsável por manter a confidencialidade de sua
                            conta e senha, bem como por todas as atividades que ocorrem sob sua conta.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Privacidade:</strong> Sua privacidade é importante para nós. Consulte nossa Política
                            de Privacidade para obter informações detalhadas sobre como coletamos, usamos e protegemos
                            suas informações pessoais.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Propriedade Intelectual:</strong> Todos os direitos, títulos e interesses
                            relacionados ao Aplicativo, incluindo, mas não se limitando a, textos, gráficos, interfaces,
                            logotipos, imagens e código de software, são de propriedade exclusiva do Planner - Seu
                            Planejador de Viagens e estão protegidos por leis de direitos autorais e outras leis de
                            propriedade intelectual.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Limitação de Responsabilidade:</strong> Na máxima extensão permitida por lei, o
                            Planner - Seu Planejador de Viagens não será responsável por quaisquer danos diretos,
                            indiretos, incidentais, consequenciais ou punitivos decorrentes de seu uso ou incapacidade
                            de uso do Aplicativo.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Modificações nos Termos:</strong> Reservamo-nos o direito de modificar estes Termos
                            de Uso a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a
                            publicação no Aplicativo. Seu uso continuado do Aplicativo após a publicação das alterações
                            constituirá sua aceitação das alterações.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Contato:</strong> Se você tiver alguma dúvida sobre estes Termos de Uso, entre em
                            contato conosco pelo e-mail: contato@Planner.com.
                        </li>
                    </ol>
                </div>
                <div id="privacy-policies" className="dark:text-white p-4 rounded-md w-full">
                    <h2 className="text-3xl text-center font-bold mb-2 pb-2">Políticas de Privacidade</h2>
                    <ol className="list-decimal list-inside">
                        <li className="mb-2 text-justify">
                            <strong>Informações Coletadas:</strong> Coletamos informações que você nos fornece
                            diretamente, como seu nome, endereço de e-mail, e qualquer outra informação que você opte
                            por fornecer ao criar uma conta ou usar o Aplicativo.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Uso das Informações:</strong> Utilizamos as informações coletadas para:
                            <ul className="list-disc list-inside ml-4">
                                <li>Fornecer e melhorar nossos serviços;</li>
                                <li>Personalizar sua experiência no Aplicativo;</li>
                                <li>Comunicar-se com você, enviando notificações e atualizações;</li>
                                <li>Responder às suas perguntas e solicitações de suporte.</li>
                            </ul>
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Compartilhamento de Informações:</strong> Não vendemos, trocamos ou de outra forma
                            transferimos suas informações pessoais a terceiros, exceto quando necessário para fornecer
                            nossos serviços ou quando exigido por lei.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Segurança das Informações:</strong> Implementamos medidas de segurança razoáveis
                            para proteger suas informações pessoais contra acesso não autorizado, uso ou divulgação. No
                            entanto, nenhum método de transmissão pela internet ou método de armazenamento eletrônico é
                            100% seguro.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Cookies:</strong> Utilizamos cookies e tecnologias similares para coletar
                            informações sobre suas interações com o Aplicativo e para melhorar sua experiência de
                            usuário. Você pode configurar seu navegador para recusar cookies, mas isso pode limitar sua
                            capacidade de usar algumas funcionalidades do Aplicativo.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Direitos do Usuário:</strong> Você tem o direito de acessar, corrigir ou excluir
                            suas informações pessoais que possuímos. Para exercer esses direitos, entre em contato
                            conosco pelo e-mail: privacidade@Planner.com.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Alterações na Política de Privacidade:</strong> Reservamo-nos o direito de modificar
                            esta Política de Privacidade a qualquer momento. Quaisquer alterações entrarão em vigor
                            imediatamente após a publicação no Aplicativo. Seu uso continuado do Aplicativo após a
                            publicação das alterações constituirá sua aceitação das alterações.
                        </li>
                        <li className="mb-2 text-justify">
                            <strong>Contato:</strong> Se você tiver alguma dúvida sobre esta Política de Privacidade,
                            entre em contato conosco pelo e-mail: privacidade@Planner.com.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
