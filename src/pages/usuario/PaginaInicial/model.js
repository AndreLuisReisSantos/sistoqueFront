export const inputs = [
    {
      name: "nome",
      id: "nome",
      label: "Nome Completo",
      placeholder: "Digite seu nome Completo",
      value: "",
      type: "text",
      required: true,
      classe: "input_tamanho5",
      valid : true,
      disabled : true,
    },
    {
      name: "tipoUsuario",
      id: "tipoUsuario",
      label: "Cargo",
      placeholder: "Digite o Cargo",
      value: "",
      type: "text",
      required: true,
      classe: "input_tamanho3",
      valid : true,
      disabled : true,
      options: [
        {
          value: "-",
          text: "Selecione um cargo"
        },
        {
          value: "funcionario",
          text: "Funcionário"
        },
        {
          value: "cozinheiro",
          text: "Cozinheiro"
        },
        {
          value: "gestor",
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
      classe: "input_tamanho3",
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
      required: true,
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
      required: true,
      classe: "input_tamanho3",
      valid : true,
      disabled : true,
    },];

