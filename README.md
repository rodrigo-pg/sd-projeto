# Projeto de Envio de E-mails com Microsserviços e RabbitMQ
Este projeto visa colocar em prática conceitos vistos na disciplina de 
sistemas distribuídos do curso de computação da UFCG. Dessa forma, a ideia
do projeto é o envio de e-mails através de uma arquitetura distribuída, com uso
de microsserviços, k8s e RabbitMQ.

## Funcionalidades
O projeto é composto por dois microsserviços:

* **Serviço de Envio de E-mails**: Este microsserviço é responsável por receber as solicitações de envio de e-mails e enviá-las para o RabbitMQ para posterior processamento.
* **Serviço de Processamento de E-mails**: Recebe as mensagens do RabbitMQ e realiza o processamento dos e-mails, garantindo que sejam entregues de acordo com a semântica de "at least once delivery", ou seja, cada e-mail será entregue pelo menos uma vez.

## Tecnologias Utilizadas
* **RabbitMQ**: É utilizado como o middleware de mensagens para comunicação assíncrona entre os microsserviços, garantindo a confiabilidade e escalabilidade da comunicação.
* **Kubernetes (k8s)**: A orquestração dos microsserviços e do RabbitMQ é realizada no Kubernetes, alta disponibilidade e gerenciamento simplificado. São feito uso de conceitos como ConfigMaps para configuração de serviços, assim como Secrets para armazenamento seguro de segredos, além de outros serviços do k8s, como LoadBalancers, NodePort, etc.
* **Ethereal Mail**: Serviço fake de SMTP para simular entrega de e-mails.

## Semântica de "At Least Once Delivery"
Para garantir que os e-mails sejam entregues pelo menos uma vez, utilizamos a funcionalidades de ACKs de filas do RabbitMQ para lidar com possíveis erros de processamento no serviço responsável. Desse modo, garantimos que todas as mensagens serão processadas ao menos uma vez.