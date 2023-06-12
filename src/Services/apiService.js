import UserDataModel from "./dataModel";

export const fetchUserData = async (userId) => {
  try {
    const endpoints = [
      `http://localhost:3000/user/${userId}`,
      `http://localhost:3000/user/${userId}/activity`,
      `http://localhost:3000/user/${userId}/average-sessions`,
      `http://localhost:3000/user/${userId}/performance`,
    ];

    const responses = await Promise.all(
      endpoints.map((endpoint) => fetch(endpoint))
    );
    const jsonResponses = await Promise.all(
      responses.map((response) => response.json())
    );

    const [
      userDataResponse,
      activityResponse,
      averageSessionsResponse,
      performanceResponse,
    ] = jsonResponses;

    const User = new UserDataModel(
      userDataResponse.data,
      activityResponse.data,
      averageSessionsResponse.data,
      performanceResponse.data
    );

    return User;
  } catch (error) {
    throw new Error(
      "Une erreur est survenue lors de la récupération des données"
    );
  }
};
