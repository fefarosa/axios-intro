import React from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

class Search extends React.Component {
  //Segundo passo: Definir o state para segurar o valor do input
  state = {
    searchTerm: "",
    results: [],
  };

  //Terceiro passo: Atualizar o state com o que o usuario digitar no input
  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  //Primeiro passo: escutar o evento de clique do botão Search e rodar uma função
  handleClick = async () => {
    //Quarto passo: incluir o que foi digitado no input na URL de pesquisa na API
    try {
      const response = await axios.get(
        `https://restcountries.eu/rest/v2/name/${this.state.searchTerm}`
      );


      //Quinto passo: atualizar o state com o resultado da pesquisa
      this.setState({ results: [...response.data] });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="col-6">
        <div className="input-group">
          <input
            className="form-control form-control-lg"
            onChange={this.handleChange}
            value={this.state.searchTerm}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={this.handleClick}>
              Search
            </button>
          </div>
        </div>
        {/* Sexto passo: passar o state como prop para o componente que vai exibir os resultados*/}
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

export default Search;
