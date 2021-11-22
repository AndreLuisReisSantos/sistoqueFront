export const inputs = [
    {
      name: "nome",
      id: "nome",
      label: "Nome do Produto",
      placeholder: "Digite o nome do Produto",
      value: "",
      type: "text",
      required: true,
      classe: "input_tamanho2",
      valid : true,
      disabled : true,
    },
    
    {
      name: "volume",
      id: "volume",
      label: "Volume",
      placeholder: "Volume",
      value: "",
      type: "text",
      required: true,
      classe: "input_tamanho2",
      valid : true,
      disabled : true,
    },
    {
      name: "descricaoProduto",
      id: "descricaoProduto",
      label: "Descrição do Produto",
      placeholder: "Descrição do Produto",
      value: "",
      type: "textarea",
      required: false,
      classe: "input_tamanho1",
      valid : true,
      disabled : true,
    },];

export const buscarProduto = [
    {
      name: "BuscarProduto",
      id: "BuscarProduto",
      label: "Selecione um Produto",
      placeholder: "Selecione um Produto",
      value: "",
      required: true,
      classe: "input_tamanho1",
      valid : true,
      disabled : false,

    },
  ];
