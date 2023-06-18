import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import ErrorPage from "./ErrorPage.jsx";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardFooter,
  MDBCardImage,
} from "mdb-react-ui-kit";
import ProfilePicture from "../componenets/UserPageComp/ProfilePicture.jsx";
import { getUser } from "../controller/requests.js";
import {
  calculateAverage,
  calculateMax,
  calculateMin,
  calculateVariance,
  calculateStandardDeviation,
  calculateMedian,
  calculatePopularName,
  currentTrainingName,
  calculateWeightLoss,
  calculateWeightLossPerProgram,
  calculateWorstProgram
} from "../controller/utils/util_home_page.js";
import GraphComponent from "../componenets/graphComponent.jsx";
import ChartTrainigGraph from "../componenets/ChartTrainingGraph.jsx";
import DetailsCard from "../componenets/UserPageComp/DetailsCard.jsx";
import StatisticsCard from "../componenets/UserPageComp/StatisticsCard.jsx";
import BigCard from "../componenets/UserPageComp/BigCard.jsx";

function UserHomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    max: 0,
    min: 0,
    average: 0,
    variance: 0,
    standardDeviation: 0,
    median: 0,
    popularName: "",
    currentTraining: "",
    weightLoss: 0,
    weightLossPerProgram: "",
    worstProgram: ""
  });


  let weights = [];
  let dates = [];
  let trainingNames = [];

  const fetchUser = async () => {
    const response = await getUser();
    if (response === []) {
      setError(true);
      return;
    }
    console.log("Repsonse is ", response);
    const val = response;
    setUser(val);
    setAllData(val);
    // Set loading to false once data is fetched
  };

  const setAllData = async (user) => {
    console.log("User selectes ", user);
    dates = user.selectedTrainings.map((training) => training.startDate);
    weights = user.selectedTrainings.map((training) => training.weight);
    trainingNames = user.selectedTrainings.map((training) => training.name);
    calculateStatistics(user);

  };

  const calculateStatistics = (user) => {
    // Update property1
    const updatedData = {
      ...data,
      max: calculateMax(weights),
      min: calculateMin(weights),
      average: calculateAverage(weights),
      variance: calculateVariance(weights),
      standardDeviation: calculateStandardDeviation(weights),
      median: calculateMedian(weights),
      popularName: calculatePopularName(trainingNames),
      currentTraining: currentTrainingName(trainingNames),
      weightLoss: calculateWeightLoss(user.selectedTrainings),
      weightLossPerProgram: calculateWeightLossPerProgram(user.selectedTrainings),

    };
    console.log("Weights are ", calculateWeightLoss(user.selectedTrainings));

    setData(updatedData);
  };

  useEffect(() => {
    async function fetchAllData() {
      await fetchUser();
      setLoading(false);
    }
    fetchAllData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  if (error) {
    return <ErrorPage toRemove={true} />;
  }
  if (loading) {
    return <ErrorPage toRemove={false} />;
  } else {
    return (
      <MainLayout>
        <section style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5">
            <MDBRow>
              {/* Profile Picture Cube */}
              <ProfilePicture user={user} />
              <MDBCol lg="8">
                {/* User Details Card  */}

                <DetailsCard user={user} />
                <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                  {/* Include Max and Min Weight */}
                  <StatisticsCard
                    title="Max Min Weight"
                    text={`Max Weight: ${data.max} \n Min Weight: ${data.min}`}
                    img_src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
                  />
                  <StatisticsCard
                    title="Max Min Weight"
                    text={`Max Weight: ${data.max} \n Min Weight: ${data.min} `}
                    img_src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
                  />
                  <StatisticsCard
                    title="Average Weight"
                    text={`Average Weight: ${data.average} Variance: ${data.variance} `}
                    img_src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
                  />{" "}
                  "
                  <MDBCol>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src="https://mdbootstrap.com/img/new/standard/city/043.webp"
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>Card title</MDBCardTitle>
                        <MDBCardText>
                          This card has supporting text below as a natural
                          lead-in to additional content.
                        </MDBCardText>
                      </MDBCardBody>
                      <MDBCardFooter>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </MDBCardFooter>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src="https://mdbootstrap.com/img/new/standard/city/042.webp"
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>Card title</MDBCardTitle>
                        <MDBCardText>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This card has
                          even longer content than the first to show that equal
                          height action.
                        </MDBCardText>
                      </MDBCardBody>
                      <MDBCardFooter>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </MDBCardFooter>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              
              <MDBCol  sm="6" className="h-25 mb-4 mb-md-2">
                <MDBCard className="h-100">
                  <MDBCardHeader className="fw-bolder text-center">
                    Program Distribution
                  </MDBCardHeader>
                  <MDBCardBody>
                    <ChartTrainigGraph
                      selectedTrainings={user.selectedTrainings}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol sm="6" className="h-25 mb-4 mb-md-2">
                <MDBCard className="h-100">
                  <MDBCardHeader className="fw-bolder text-center">
                    Weight Linear Graph
                  </MDBCardHeader>
                  <MDBCardBody>
                    <GraphComponent
                      selectedTrainings={user.selectedTrainings}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              {/* <StatisticsCard img_src="https://mdbootstrap.com/img/new/standard/city/044.webp" title="Best Vs Worst" text=  {`${min}${max}` }/> */}
              {/* <StatisticsCard img_src="https://mdbootstrap.com/img/new/standard/city/044.webp" title="lorea" text="lorea" />  */}

      
              <BigCard
                title="Weight"
                text={`#Max Weight $${data.max} kg$ \n #Min Weight $${data.min} kg$ # ${data.weightLoss} \n `}
                img_src="https://mdbootstrap.com/img/new/standard/city/044.webp"
              />
              <BigCard
                title="Statistics"
                text={`#Varience $${data.variance}$ \n #Standard Deviation $${data.standardDeviation}$ \n #Median $${data.median}$ \n`}
                img_src="https://mdbootstrap.com/img/new/standard/city/044.webp"
              />
              <BigCard
                title=""
                text={`#Popular Training  $${data.popularName}$  #Current Training $${data.currentTraining}$  #Weight Loss Per Program ${data.weightLossPerProgram} \n `}
                img_src="https://mdbootstrap.com/img/new/standard/city/044.webp"
              />
          
              
            </MDBRow>
          </MDBContainer>
        </section>
      </MainLayout>
    );
  }
}
export default UserHomePage;
