import React, { useState, useEffect } from "react";
import axios from "../apis";
import SearchInput from "../components/Medicine/SearchInput";
import styled from "styled-components";
import SearchResult from "../components/Medicine/SearchResult";
import ItemList from "../components/Medicine/ItemList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
`;

function Medicine({ match, history }) {
  // const [searchArr, setSearchArr] = useState(null);
  let initialparam = !match.params.id ? 0 : match.params.id;
  const [paramId, setParamId] = useState(initialparam);
  const [term, setTerm] = useState();
  const [drug, setDrug] = useState(null);
  const [drugList, setDrugList] = useState(null);

  useEffect(() => {
    if (match.params.id) {
      setParamId(match.params.id);
    }
  }, [match.params.id]);

  useEffect(() => {
    // setDrugList(null);
    if (paramId) searchById(match.params.id);
  }, [paramId]);

  // const loadAuto = async () => {
  //   try {
  //     let result = await axios.get("autocomplete/drug");
  //     setSearchArr(result);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const searchById = async id => {
    setDrug(null);
    try {
      let { data } = await axios.get(`drugs/${id}`);
      setDrug(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchByTerms = async event => {
    event.preventDefault();
    setDrug(null);
    setDrugList(null);
    try {
      let { data } = await axios.get("searchSingle", {
        params: { search_term: term }
      });
      if (data.item_name) setDrugList(data.item_name);
      else {
        setDrug(data);
        history.push({
          pathname: `medicine/${data.id}`
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputChange = event => {
    setTerm(event.target.value);
  };

  return (
    <Container>
      <SearchInput searchTerms={searchByTerms} inputChange={inputChange} />
      {drug && <SearchResult drug={drug} />}
      {drugList && <ItemList drug_list={drugList} />}
    </Container>
  );
}

export default Medicine;
