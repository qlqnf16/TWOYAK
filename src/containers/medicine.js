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

function Medicine({ match }) {
  // const [searchArr, setSearchArr] = useState(null);
  const [term, setTerm] = useState();
  const [drug, setDrug] = useState(null);
  const [drugList, setDrugList] = useState(null);

  // useEffect(() => {
  //   console.log(drugList);
  //   setDrug(null);
  //   setDrugList(null);
  //   // loadAuto();

  //   // drug id로 접근했을 때
  //   if (match.params.id) {
  //     searchById(match.params.id);
  //   }
  // }, []);

  useEffect(() => {
    console.log("update");
    setDrugList(null);
    // loadAuto();

    // drug id로 접근했을 때
    if (match.params.id) {
      searchById(match.params.id);
    }
  }, match.params.id);

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
    setDrugList(null);
    try {
      let { data } = await axios.get(`drugs/${id}`);
      console.log(data);
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
      console.log(data);
      data.drug_imprint
        ? setDrug(data.drug_imprint)
        : setDrugList(data.item_name);
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
      {drug && <SearchResult drug_imprint={drug} />}
      {drugList && <ItemList drug_list={drugList} />}
    </Container>
  );
}

export default Medicine;
