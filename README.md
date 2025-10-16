🗂️ Task Management

Aplicação full-stack inspirada no Trello para organizar tarefas em listas. O foco é simplicidade, regras de negócio claras e uma interface limpa baseada no layout do Figma.

Figma: https://www.figma.com/design/h38QDuuw2oOo5JPMdk8EFB/Projeto-Trainee-2025---Produtos?node-id=30-2031&p=f&m=dev



📌 Visão geral

O sistema permite criar listas e, dentro delas, cadastrar tarefas com prioridade, datas e descrição. As listas são exibidas em colunas (estilo Kanban) para facilitar a visualização e o gerenciamento do fluxo de trabalho.

🎯 Objetivos

Reproduzir o fluxo básico de um quadro Kanban

Exercitar boas práticas de API REST no backend

Construir uma interface responsiva fiel ao Figma

Implementar validações e regras de negócio essenciais

✨ Funcionalidades principais

CRUD de listas

CRUD de tarefas

Vinculação de tarefas a uma lista

Priorização: baixa, média, alta e muito alta

Datas: esperada de finalização e conclusão

Validações (nome de lista único, data esperada no futuro)

Tratamento de erros com mensagens claras e padronizadas

🧭 Regras de negócio

Cada lista possui nome único

Uma tarefa só pode ser criada se a lista existir

A data esperada de finalização deve ser posterior à data atual

Uma lista só é removida se não houver tarefas associadas

Mensagens de erro objetivas para entidade não encontrada, validações e conflitos

🧰 Tecnologias

Backend: Spring Boot, JPA, banco em memória (dev)

Frontend: React com Vite e integração via cliente HTTP

Estilos: Tailwind CSS

Design: Figma como referência visual

🏗️ Arquitetura (alto nível)

Controle: recepção das requisições e respostas padronizadas

Serviço: regras de negócio e validações

Repositórios: acesso a dados

Domínio/DTOs: isolamento entre API pública e persistência

Tratamento global de exceções: respostas consistentes de erro

📁 Organização do projeto

backend: configurações da aplicação, entidades, repositórios, serviços e controladores

frontend: componentes, páginas, estilos globais e configuração do cliente HTTP

▶️ Fluxo de uso

Criar uma ou mais listas

Cadastrar tarefas vinculadas a uma lista existente

Ajustar prioridades, descrições e datas conforme a evolução

Finalizar, editar ou remover tarefas quando necessário

Gerenciar listas (renomear ou remover) respeitando as regras de exclusão

🗺️ Roadmap

Arraste e solte para mover tarefas entre listas

Filtros por prioridade, status e datas

Ordenação de tarefas

Autenticação e perfis de usuário

Documentação da API com catálogo de endpoints

Deploy com containerização e orquestração simples
