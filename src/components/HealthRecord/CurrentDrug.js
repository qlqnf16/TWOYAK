import React, { useState, useContext, useEffect } from "react";
import axios from "../../apis";
import styled from "styled-components";
import NewReview from "../Medicine/Review/NewReview";
import { AuthContext } from "../../contexts/AuthStore";
import DrugReview from "../Medicine/Review/DrugReview";

import {
  Card,
  Line,
  BasicButton,
  StyledRating,
  RatingText,
  FlexDiv,
  BulletText
} from "../UI/SharedStyles";
import medIcon from "../../assets/images/med-icon.svg";

const Flex = styled(FlexDiv)`
  justify-content: space-between;
`;

const TitleContainer = styled(FlexDiv)`
  align-items: flex-start;
`;

const Title = styled.div`
  font-weight: 800;
`;

const Text = styled.div`
  color: var(--twoyak-black);
  font-size: 0.7rem;
`;

const Content = styled.div`
  margin: 1rem 1.68rem;
  font-size: 0.8rem;
  opacity: 0.8;
`;

const Rating = styled(StyledRating)`
  margin: 0 -2px;
  font-size: 10px;
  .custom {
    margin: 0 2px;
  }
`;

const CustomRatingText = styled(RatingText)`
  font-size: 0.69rem;
  margin-left: 0.4rem;
  font-weight: normal;
`;

const OpacityButton = styled(BasicButton)`
  opacity: 0.6;
`;

const ButtonContainer = styled(FlexDiv)`
  justify-content: space-around;
  margin: 1rem 1.7rem 0 1.7rem;
`;

const CurrentDrug = ({
  drug,
  review,
  reviewSubmit,
  loadingHandler,
  drugToPast
}) => {
  const [show, setShow] = useState(false);
  const [updateTarget, setUpdateTarget] = useState();
  const [message, setMessage] = useState([]);
  const { state: authState } = useContext(AuthContext);

  const newReviewToggle = () => {
    setShow(!show);
  };

  // NewReview.js 리뷰 등록하기 버튼
  const reviewSubmitHandler = (
    method,
    efficacy,
    adverse_effect,
    detail,
    reviewId
  ) => {
    const data = {
      user_id: authState.userId,
      drug_id: drug.current_drug_id,
      efficacy: efficacy,
      body: detail,
      adverse_effect_ids: adverse_effect
    };

    if (method === "post") postReview(data);
    else if (method === "put") updateReview(data, reviewId);
  };

  // review upload
  const postReview = async data => {
    try {
      await axios.post(
        `drugs/${drug.id}/drug_reviews`,
        { drug_review: data },
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      setShow(false);
      loadingHandler();
    } catch (error) {
      console.log(error);
    }
  };

  // review update
  const updateReview = async (data, reviewId) => {
    try {
      await axios.put(
        `drugs/${drug.id}/drug_reviews/${reviewId}`,
        { drug_review: data },
        {
          headers: {
            Authorization: `bearer ${authState.token}`
          }
        }
      );
      setShow(false);
      loadingHandler();
    } catch (error) {
      console.log(error);
    }
  };

  // review delete
  const deleteReview = async reviewId => {
    try {
      await axios.delete(`drugs/${drug.id}/drug_reviews/${reviewId}`, {
        headers: {
          Authorization: `bearer ${authState.token}`
        }
      });
      loadingHandler();
    } catch (error) {
      console.log(error);
    }
  };

  // DrugReview.js 리뷰 수정하기 버튼
  const updateButton = review => {
    setShow(true);
    setUpdateTarget(review);
  };

  useEffect(() => {
    if (drug.dur_info) {
      Object.keys(drug.dur_info).forEach(info => {
        switch (info) {
          case "age":
            setMessage(message.concat(`안 돼요!`));
            break;
          case "pregnancy":
            setMessage(message.concat(`임산부 안 돼요!`));
            break;
          case "stop_usage":
            setMessage(message.concat(`사용 중지된 약품입니다!`));
            break;
          case "dosage":
            setMessage(message.concat(`하루 ~ 이상 안 돼요!`));
            break;
          case "period":
            setMessage(message.concat(`이상 복용하시면 안 돼요!`));
            break;
          case "elder":
            setMessage(
              message.concat(`65세 이상 고령자는 복용 시 주의하세요!`)
            );
            break;
          default:
            break;
        }
      });
    }
  }, [drug]);

  return (
    <Card>
      <Flex>
        <TitleContainer>
          <img
            src={medIcon}
            alt="med-icon"
            style={{ marginRight: "6px", marginTop: "5px" }}
          />
          <div>
            <Title>{drug.drug_name}</Title>
            <Text>복용 시작일: {drug.from}</Text>
          </div>
        </TitleContainer>
        <FlexDiv>
          {typeof drug.drug_rating === "number" ? (
            <>
              <Rating
                emptySymbol="fas fa-circle  custom"
                fullSymbol="fas fa-circle  custom full"
                initialRating={drug.drug_rating}
                readonly
              />
              <CustomRatingText>
                {drug.drug_rating.toFixed(1)} / 5.0
              </CustomRatingText>
            </>
          ) : (
            ""
          )}
        </FlexDiv>
      </Flex>
      {(drug.dur_info || drug.memo || review) && <Line />}
      {show && (
        <NewReview
          reviewSubmit={reviewSubmitHandler}
          drugId={drug.current_drug_id}
          review={updateTarget}
          modalOff={newReviewToggle}
        />
      )}
      {drug.dur_info && (
        <>
          <BulletText>
            <p>안전정보</p>
          </BulletText>
          <Content>
            {message.map(m => (
              <div key={m}>{m}</div>
            ))}
          </Content>
        </>
      )}

      {drug.memo && (
        <>
          <BulletText>
            <p>메모</p>
          </BulletText>
          <Content>{drug.memo}</Content>
        </>
      )}
      {review ? (
        <>
          <BulletText>
            <p>내 리뷰</p>
          </BulletText>
          <DrugReview
            review={review}
            deleteReview={deleteReview}
            updateButton={updateButton}
          />
          <OpacityButton
            onClick={() => {
              drugToPast(drug.id);
            }}
          >
            복용 종료
          </OpacityButton>
        </>
      ) : (
        <ButtonContainer>
          <BasicButton onClick={newReviewToggle}>리뷰 등록</BasicButton>
          <OpacityButton
            onClick={() => {
              drugToPast(drug.id);
            }}
          >
            복용 종료
          </OpacityButton>
        </ButtonContainer>
      )}
    </Card>
  );
};

export default CurrentDrug;
