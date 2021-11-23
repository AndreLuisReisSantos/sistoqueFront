export const inputs = [
    {
      name: "nome",
      id: "nome",
      label: "Nome Completo",
      placeholder: "Digite seu nome Completo",
      value: "",
      type: "text",
      required: false,
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
      required: false,
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

];

  export const buscarUsuario = [
    {
      name: "BuscarUsuario",
      id: "BuscarUsuario",
      label: "Selecione um Usuario",
      placeholder: "Selecione um Usuario",
      value: "",
      required: false,
      classe: "input_tamanho1",
      valid : true,
      disabled : true,

    },
  ];