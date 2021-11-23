export const inputs = [
    {
      name: "nome",
      id: "nome",
      label: "Nome Completo",
      placeholder: "Digite seu nome Completo",
      value: "",
      type: "text",
      required: true,
      classe: "input_tamanho1",
      valid : true,
      disabled : false,
    },
    {
      name: "tipoUsuario",
      id: "cargo",
      label: "Cargo",
      placeholder: "Digite o Cargo",
      value: "",
      type: "select",
      required: true,
      classe: "input_tamanho2",
      valid : true,
      disabled : false,
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
      required: true,
      classe: "input_tamanho2",
      valid : true,
      disabled : false,
    },
    {
      name: "cpf",
      id: "CPF",
      label: "CPF",
      placeholder: "CPF",
      value: "",
      type: "text",
      required: true,
      classe: "input_tamanho3",
      valid : true,
      disabled : false,
    },
    {
      name: "rg",
      id: "RG",
      label: "RG",
      placeholder: "RG",
      value: "",
      type: "text",
      required: true,
      classe: "input_tamanho3",
      valid : true,
      disabled : false,
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
      disabled : false,    
    },];

export const inputsLogin = [
    {
      name: "senha",
      id: "senha",
      label: "Senha",
      placeholder: "Senha",
      value: "",
      type: "password",
      required: true,
      classe: "input_tamanho2",
      valid : true,
      disabled : false,

    },
    {
      name: "conf_senha",
      id: "conf_senha",
      label: "Confirme a senha",
      placeholder: "Confirme a senha",
      value: "",
      type: "password",
      required: true,
      classe: "input_tamanho2",
      valid : true,
      disabled : false,

    },
  ];
