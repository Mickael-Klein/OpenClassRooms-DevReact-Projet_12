class UserDataModel {
  constructor(userData, activity, averageSession, performance) {
    this.userData = userData;
    this._activity = activity;
    this._averageSession = averageSession;
    this._performance = performance;
  }
  get firstName() {
    return this.userData.userInfos.firstName;
  }

  get keyData() {
    return this.userData.keyData;
  }

  get activity() {
    return this.formattedActivityData(this._activity.sessions);
  }

  get session() {
    return this.formattedSessionData(this._averageSession.sessions);
  }

  get performance() {
    return this.formattedPerformanceData(this._performance);
  }

  get score() {
    return [{ score: Number(this.userData.score * 100) }];
  }

  formattedActivityData(activityDataSessions) {
    const formattedData = activityDataSessions.map((session, index) => {
      return {
        ...session,
        day: new Date(session.day),
        kilogram: Number(session.kilogram),
        calories: Number(session.calories),
        index: index + 1,
      };
    });

    return formattedData;
  }

  formattedSessionData(sessionDataSessions) {
    const formattedData = sessionDataSessions.map((session, index) => {
      const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
      const dayTick = daysOfWeek[index % 7];
      return {
        ...session,
        day: Number(session.day),
        sessionLength: Number(session.sessionLength),
        dayTick: String(dayTick),
      };
    });

    formattedData.unshift({
      day: 0,
      sessionLength:
        formattedData[0].sessionLength - formattedData[0].sessionLength * 0.2,
      dayTick: "",
    });
    formattedData.push({
      day: 0,
      sessionLength:
        formattedData.at(-1).sessionLength +
        formattedData.at(-1).sessionLength * 0.2,
      dayTick: "",
    });

    return formattedData;
  }

  formattedPerformanceData(performanceData) {
    const frenchSubjects = {
      cardio: "Cardio",
      energy: "Énergie",
      endurance: "Endurance",
      strength: "Force",
      speed: "Vitesse",
      intensity: "Intensité",
    };

    const formattedPerformanceData = [];
    performanceData.data.forEach((elem) => {
      const tempSubject = performanceData.kind[elem.kind];
      const objectPerf = {
        subject: String(frenchSubjects[tempSubject]),
        value: Number(elem.value),
      };
      formattedPerformanceData.push(objectPerf);
    });

    const newOrder = [
      "Intensité",
      "Vitesse",
      "Force",
      "Endurance",
      "Énergie",
      "Cardio",
    ];

    const performanceDataSorted = newOrder.map((subject) => {
      return formattedPerformanceData.find((obj) => obj.subject === subject);
    });
    return performanceDataSorted;
  }
}

export default UserDataModel;
