export const inputs = [
    {
      name: "nome",
      id: "nome",
      label: "Nome Completo",
      placeholder: "Digite seu nome Completo",
      value: "",
      type: "text",
      required: false,
      classe: "input_tamanho1",
      valid : true,
      disabled : true,
    },
    {
      name: "tipoUsuario",
      id: "tipoUsuario",
      label: "Cargo",
      placeholder: "Digite o Cargo",
      value: "",
      type: "select",
      required: false,
      classe: "input_tamanho2",
      valid : true,
      disabled : true,
      options: [
        {
          value: "0",
          text: "Selecione um cargo"
        },
        {
          value: "1",
          text: "Funcionário"
        },
        {
          value: "2",
          text: "Cozinheiro"
        },
        {
          value: "3",
          text: "Gestor"
        },
      ]
    },
    {
      name: "dataNascimento",
      id: "dataNascimento",
      label: "Data Nascimento",
      placeholder: "Data Nascimento",
      value: "",
      type: "date",
      required: false,
      classe: "input_tamanho2",
      valid : true,
      disabled : true,
    },
    {
      name: "cpf",
      id: "cpf",
      label: "CPF",
      placeholder: "CPF",
      value: "",
      type: "text",
      required: false,
      classe: "input_tamanho3",
      valid : true,
      disabled : true,
    },
    {
      name: "rg",
      id: "rg",
      label: "RG",
      placeholder: "RG",
      value: "",
      type: "text",
      required: false,
      classe: "input_tamanho3",
      valid : true,
      disabled : true,
    },
    {
      name: "celular",
      id: "celular",
      label: "Celular",
      placeholder: "Celular",
      value: "",
      type: "tel",
      required: false,
      classe: "input_tamanho3",
      valid : true,
      disabled : true,    
    },
  ];

export const inputsLogin = [
    {
      name: "senha",
      id: "senha",
      label: "Senha",
      placeholder: "Senha",
      value: "",
      type: "password",
      required: false,
      classe: "input_tamanho2",
      valid : true,
      disabled : true,
    },
    {
      name: "conf_senha",
      id: "conf_senha",
      label: "Confirme a Senha",
      placeholder: "Confirme a Senha",
      value: "",
      type: "password",
      required: false,
      classe: "input_tamanho2",
      valid : true,
      disabled : true,
    },
  ];

