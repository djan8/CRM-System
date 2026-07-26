export const URL: string = import.meta.env.VITE_API_URL;

export const PAGINATION_LIMIT = 20;

export const STATUSES = {
  ALL: "all",
  INWORK: "inWork",
  COMPLETED: "completed",
} as const;

// function createAccessTokenStore() {
//   let accessToken: string | null = null;
//   return {
//     getAccessToken: function () {
//       return accessToken;
//     },
//     setAccessToken: function (token: string | null) {
//       accessToken = token;
//     },
//   };
// }
// export const accessTokenStore = createAccessTokenStore();

class TokenManager {
  private accessToken: string | null = null;

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }
}

export const accessTokenStore = new TokenManager();
