// import React, { useContext } from "react";
// import { AuthContext } from "../../contexts/AuthStore";
// import styled from "styled-components";

// const UserGeneralInfoContainer = styled.div`
//   padding: 17px;
// `;

// const SayHello = styled.div`
//   font-size: 1rem;
//   font-weight: 800;
//   color: #474747;
//   margin-bottom: 2.25rem;
//   display: flex;
//   justify-content: space-between;
// `;

// const GeneralInfo = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
// `;

// const EachInfo = styled.div`
//   width: 50%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Count = styled.div`
//   font-size: 1.125rem;
//   font-weight: 800;
//   color: var(--twoyak-blue);
// `;

// const InfoIndex = styled.div`
//   width: auto;
//   font-size: 0.6875rem;
//   color: #474747;
// `;

// function UserGeneralInfo({
//   currentDrugs,
//   drugReviews,
//   myConversation,
//   userChange,
//   history
// }) {
//   const { state: authState } = useContext(AuthContext);

//   const infoIndex = [
//     {
//       label: "복용 중인 약",
//       value: currentDrugs.length,
//       src: "/health-record"
//     },
//     {
//       label: "리뷰",
//       value: drugReviews.length,
//       src: "/all-reviews/my"
//     }
//   ];

//   let generalInfo = null;
//   if (currentDrugs && drugReviews && myConversation) {
//     generalInfo = (
//       <GeneralInfo>
//         {infoIndex.map((i, k) => (
//           <EachInfo key={k}>
//             <Count onClick={() => (i.value > 0 ? history.push(i.src) : null)}>
//               {i.value}
//             </Count>
//             <InfoIndex>{i.label}</InfoIndex>
//           </EachInfo>
//         ))}
//       </GeneralInfo>
//     );
//   }

//   return (
//     <UserGeneralInfoContainer>
//       <SayHello>{authState.userName} 님, 안녕하세요</SayHello>
//       {generalInfo}
//     </UserGeneralInfoContainer>
//   );
// }

// export default UserGeneralInfo;

// Netflix fast api
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthStore";
import styled from "styled-components";
import Suggestions from "./Suggestions";
import ChangeUser from "./ChangeUser";
import { FlexDiv } from "../UI/SharedStyles";

const UserGeneralInfoContainer = styled.div`
  padding: 17px;
`;

const SayHello = styled.div`
  font-size: 1rem;
  font-weight: 800;
  color: #474747;
  display: flex;
  justify-content: space-between;
`;

const GeneralInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2.25rem;
`;

const EachInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Count = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--twoyak-blue);
`;

const InfoIndex = styled.div`
  width: auto;
  font-size: 0.6875rem;
  color: #474747;
`;

const ButtonContainer = styled(FlexDiv)`
  margin-top: 1.375rem;
`;

function UserGeneralInfo({ currentDrugsCount, drugReviewsCount, history }) {
  const { state: authState } = useContext(AuthContext);

  const infoIndex = [
    {
      label: "복용 중인 약",
      src: "/health-record"
    },
    {
      label: "리뷰",
      src: "/all-reviews/my"
    }
  ];

  return (
    <UserGeneralInfoContainer>
      <SayHello>{authState.userName} 님, 안녕하세요</SayHello>
      <ButtonContainer>
        <Suggestions />
      </ButtonContainer>
      <GeneralInfo>
        {infoIndex.map((i, k) => (
          <EachInfo key={k}>
            <Count onClick={() => (i.value > 0 ? history.push(i.src) : null)}>
              {i.src === "/health-record"
                ? currentDrugsCount
                : drugReviewsCount}
            </Count>
            <InfoIndex>{i.label}</InfoIndex>
          </EachInfo>
        ))}
      </GeneralInfo>
    </UserGeneralInfoContainer>
  );
}

export default UserGeneralInfo;
