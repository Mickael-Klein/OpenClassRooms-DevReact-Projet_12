import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LateralNav from "../../Component/LateralNav/LateralNav";
import NutriPoint from "../../Component/NutriPoint/NutriPoint";
import BarCharts from "../../Charts/Barcharts/BarCharts";
import Radarcharts from "../../Charts/Radarcharts/Radarcharts";
import Linecharts from "../../Charts/Linecharts/Linecharts";
import RadialBarcharts from "../../Charts/RadialBarCharts/RadialBarcharts";
import logoCycling from "../../Assets/Image/logo-cycling.png";
import logoSwim from "../../Assets/Image/logo-swim.png";
import logoWeight from "../../Assets/Image/logo-weight.png";
import logoYoga from "../../Assets/Image/logo-yoga.png";
import flame from "../../Assets/Image/flame.svg";
import chicken from "../../Assets/Image/chicken.svg";
import burger from "../../Assets/Image/cheeseburger.svg";
import apple from "../../Assets/Image/apple.svg";
import { fetchUserData } from "../../Services/apiService";
import "./Accueil.scss";

export default function Accueil() {
  const arrOfLogosForLateralNav = [logoYoga, logoSwim, logoCycling, logoWeight];

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userKeyData, setUserKeyData] = useState([]);
  const [userActivity, setUserActivity] = useState();
  const [userSession, setUserSession] = useState();
  const [userPerformance, setUserPerformance] = useState();
  const [userScore, setUserScore] = useState([]);

  // let userId = useParams(); Si jamais user id spécifié dans param url souhaité

  // Une fois sytème d'auth en place, on se servira des informations de session pour fetcher les données de l'utilisateur correspondant

  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const userFetched = await fetchUserData(userId);
        setUser(userFetched);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData(12); // ici, 12 sera remplacé par le userId stocké dans la session utilisateur
  }, []);

  useEffect(() => {
    if (user !== null) {
      setUserKeyData(user.keyData);
      setUserActivity(user.activity);
      setUserSession(user.session);
      setUserPerformance(user.performance);
      setUserScore(user.score);
    } // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <LateralNav arrOfElem={arrOfLogosForLateralNav} />

      {isLoading && <h1 className="info">Chargement</h1>}
      {isError && (
        <h1 className="info">
          Cette portion du site est actuellement à l'entraînement, elle revient
          chargée à bloc d'ici peu de temps
        </h1>
      )}
      {!isLoading && !isError && user && (
        <main>
          <section className="greeting">
            <p className="greeting__user">
              Bonjour <span>{user.firstName}</span>
            </p>
            <p className="greeting__congrats">
              Félicitations ! Vous avez explosé vos objectifs hier 👏
            </p>
          </section>
          <section className="stats">
            <div className="stats__graphs">
              <BarCharts data={userActivity} />

              <div className="multipleSquaresCharts">
                <Linecharts data={userSession} />
                <Radarcharts data={userPerformance} />
                <RadialBarcharts data={userScore} />
              </div>
            </div>
            <div className="stats__nutrition">
              <NutriPoint
                name={"Calories"}
                value={userKeyData.calorieCount}
                image={flame}
                alt={"Icone d'une flamme"}
                unit={"kCal"}
              />
              <NutriPoint
                name={"Protéines"}
                value={userKeyData.proteinCount}
                image={chicken}
                alt={"Icone d'un manchon de poulet'"}
                unit={"g"}
              />
              <NutriPoint
                name={"Glucides"}
                value={userKeyData.carbohydrateCount}
                image={apple}
                alt={"Icone d'une pomme"}
                unit={"g"}
              />
              <NutriPoint
                name={"Lipides"}
                value={userKeyData.lipidCount}
                image={burger}
                alt={"Icone d'un burger"}
                unit={"g"}
              />
            </div>
          </section>
          <div className="space"></div>
        </main>
      )}
    </>
  );
}
