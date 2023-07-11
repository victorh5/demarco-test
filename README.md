# Sejam bem-vindos

### esse é meu teste para a vaga full-stack da Demarco.

Vou deixar abaixo o passo a passo para rodar localmente o projeto, caso queira acessar em ambiente de teste bastar acessar o link a seguir: (Teste)['https://demarco-test-8398698c1bf5.herokuapp.com/']

### Passo a passo instalação:

- Faça o clone do projeto na sua máquina
- Após download do projeto, acesse a pasta onde está localizado e rode o comando ``npm install``
- Após a instalação das dependências, acesse o arquivo localizado em *client/src/plugins/axios.js* e troque o valor da variavel baseURL para a seguinte string: ``http://localhost:3000/api``
- Com o passo anterior realizado, basta rodar o comando ``npm run start:dev`` e acessar o navegador no endereço: http://localhost:3000

### Passo a passo para testar o sistema:

- Ao acessar o sistema é mostrado a área de login, mas para acessá-lo deve criar sua conta.
- Clique no link cadastre-se e preencha o formulário com suas informações... Para ver as duas visões dos usuários (Professor, Estudante), deve ser criada duas contas.
- Finalizado o cadastro, basta acessar o sistema com suas informações
- Acesso como professor:
    - Ao entrar no sistema tem uma tabela com todas as avaliações cadastradas no sistema, onde você pode deletar ou editar cada uma. E tem também a opção de cadastrar nova avaliação!
    - Para cadastrar avaliação, basta clicar no botão e preencher o formulário!
    - Para acessar e responder a avaliação, deve ser feito o login como estudante.
- Acesso como estudante:
    - Ao entrar no sistema tem também a tabela com as avaliações cadastradas no sistema, porém com informações para responder ou informando que já foi respondida.
    - Para responder uma avaliação basta clicar no botão de ``Responder avaliação`` e será redirecionado para as questões e opções, basta selecionar as opções que acha correta e clicar em ``Responder``
    - Em sequência o sistema trará sua nota final que é a soma das questões que você escolheu corretamente.

Qualquer dúvida estou a disposição!
Houve alguns problemas na parte de dar o deploy do projeto, problemas com as variáveis de ambiente que não consegui fazer elas funcionarem para guardar informações sensíveis, mas como está acabando o prazo decidi deixar as informações expostas para verificarem tanto em nuvem quanto localmente o projeto...
Obrigado pela oportunidade de fazer o teste, aguardo retorno!
Victor Hugo Maciel de Lima.
