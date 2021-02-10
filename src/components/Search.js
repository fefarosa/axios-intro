import React from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

class Search extends React.Component {
  //Segundo passo: Definir o state para segurar o valor do input
  state = {
    searchTerm: "",
    results: [],
    error: false,
    fullTextSearch: false,
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
        `https://restcountries.eu/rest/v2/name/${this.state.searchTerm}?fullText=${this.state.fullTextSearch}`
      );

      //Quinto passo: atualizar o state com o resultado da pesquisa
      this.setState({ results: [...response.data] });
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
          this.setState({ error: true });
      }
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
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="fullText"
            checked={this.state.fullTextSearch}
            onChange={() => {
              this.setState({ fullTextSearch: !this.state.fullTextSearch });
            }}
          />
          <label className="form-check-label" hmtlFor="fullText">
            Search by exact name
          </label>
        </div>
        {/* Sexto passo: passar o state como prop para o componente que vai exibir os resultados*/}
        <SearchResults results={this.state.results} error={this.state.error}/>
      </div>
    );
  }
}

export default Search;
