Sistema de Cadastro de Alunos, Turmas e Matriculas.

Necessário:
Docker
PHP
Laravel
Node
Npm

Iniciar o projeto:
    bash iniciar_app.sh

Após iniciar, os comandos do docker-compose estão disponíveis.

Finalizar o projeto:
    bash finalizar_app.sh

Reiniciar o projeto:
    bash reiniciar_app.sh

Pegar o IP de um dos containers:
    bash get_ip_container.sh [nome do container]

Usar o artisan:
    docker-compose exec php php api/artisan [seu comando]
