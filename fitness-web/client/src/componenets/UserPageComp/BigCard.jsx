import React from "react";
import { MDBCardText, MDBCard, MDBCol,MDBCardImage, MDBCardBody,MDBCardTitle } from "mdb-react-ui-kit";
import InstructionsFormatter from "../TrainingPageComp/InstructionsFormatter";

export default function BigCard(props) {
  const { img_src , title, text } = props;
  
  return (
    <>
      <MDBCol >
                <MDBCard className="h-100">
                  <MDBCardImage style={{height:"200px" , width:"100%"}}
                    src={img_src}
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>
                      <InstructionsFormatter text={text} />
                    </MDBCardText>
                  </MDBCardBody>
                  
                </MDBCard>
              </MDBCol>
    </>
  );
}
