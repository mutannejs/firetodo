# FireTodo

Aplicação web para gerenciar tarefas.

Foi feito utilizando **React** e **Firebase**.

## Requisitos

1. Possuir o **NodeJS** instalado em sua máquina;

1. Possuir uma conta no [Firebase](https://firebase.google.com/)

1. Criar um projeto no **Firebase** para armazenar suas tarefas usando essa aplicação. Durante sua criação, será exibido a configuração que deve ser usada para acessar o projeto do **Firebase** dentro de algum programa, essa configuração deve ser copiada dentro do aquivo `/src/components/firebase/Config.jsx` da seguinte maneira:

    ```
    export const firebaseConfig = {
        apiKey: ...,
        authDomain: ...,
        projectId: ...,
        storageBucket: ...,
        messagingSenderId: .,
        appId: ...
    };
    ```

    O arquivo `Config.jsx` e a pasta `firebase` devem ser criados.

1. Dentro do projeto do **Firebase** deve-se coonfigurar o **Authentication** e o **Firestore**, para ser possível criar usuários, se logar e armazenar dados por essa aplicação.

## Galeria

![Home do FireTodo](.github/home_logado.png)