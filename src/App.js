import React, { useState, useEffect } from "react";
import "./index.css";
import Axios from "axios";

function App() {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const { data } = await Axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    );
    const results = data.results;
    
    for (var index = 0; index < results.length; index++) {
      results[index].name = results[index].name[0].toUpperCase() +
        results[index].name.substring(1);
      const url = results[index].url;
      const { data } = await Axios.get(url);
      results[index].sprite = data.sprites.front_default;
      results[index].type = "";
      for (var typeindex = 0; typeindex < data.types.length; typeindex++) {
        results[index].type += data.types[typeindex].type.name[0].toUpperCase() +
          data.types[typeindex].type.name.substring(1);
        if (typeindex == 0 && data.types.length == 2) {
          results[index].type += "/";
        }
      }
    }

    setResults(results);
  };

  useEffect(() => {
    fetchResults();
  }, []);



  return (
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Image</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
      {results.map((result, index) => (
        <tr key={result.url}>
          <td className="num">{index + 1}</td>
          <td>{result.name}</td>
          <td><img src={result.sprite} alt={result.sprite}/></td>
          <td>{result.type}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default App;
