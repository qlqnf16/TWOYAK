import React, { useState, useEffect, useContext } from "react";
import axios from "../apis";
import SearchInput from "../components/Medicine/SearchInput";
import styled from "styled-components";
import SearchResult from "../components/Medicine/SearchResult";
import ItemList from "../components/Medicine/ItemList";
import { DrugContext } from "../contexts/DrugStore";

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
  let initialparam = !match.params.id ? 0 : match.params.id;
  const [paramId, setParamId] = useState(initialparam);
  const [term, setTerm] = useState();
  const [drug, setDrug] = useState(null);
  const [drugimg, setDrugimg] = useState("");
  const [drugList, setDrugList] = useState(null);
  const [errorMessage, setErrorMessage] = useState();

  const { drugs } = useContext(DrugContext);

  // url에서 drug id param이 변하면 paramId 수정
  useEffect(() => {
    if (match.params.id) {
      setParamId(match.params.id);
    }
  }, [match.params.id]);

  // paramId 가 변하면 id로 약물 검색
  useEffect(() => {
    if (paramId) searchById(paramId);
    return setDrugList(null);
  }, [paramId]);

  // id로 약물검색
  const searchById = async id => {
    try {
      let { data } = await axios.get(`drugs/${id}`);
      setDrug(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 검색어로 약물검색
  const searchByTerms = async event => {
    event.preventDefault();
    setDrug(null);

    try {
      let { data } = await axios.get("searchSingle", {
        params: { search_term: term }
      });
      if (data.item_name) setDrugList(data.item_name);
      else {
        setDrug(data);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("문제가 생겼습니다. 다시 시도하세요!");
    }
  };

  const inputChange = event => {
    setTerm(event.target.value);
  };

  return (
    <Container>
      {drugs && (
        <SearchInput searchTerms={searchByTerms} inputChange={inputChange} />
      )}
      {drug && <SearchResult drug={drug} />}
      {drugList && <ItemList drug_list={drugList} />}
      {errorMessage && <div>{errorMessage}</div>}
    </Container>
  );
}

export default Medicine;
