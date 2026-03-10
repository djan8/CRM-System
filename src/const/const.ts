export const URL: string = import.meta.env.VITE_API_URL;

export const STATUSES = {
  ALL: "all",
  INWORK: "inWork",
  COMPLETED: "completed",
} as const;

function closureAccessToken() {
  let accessToken: string | null = null;
  return {
    getAccessToken: function () {
      return accessToken;
    },
    setAccessToken: function (token: string) {
      accessToken = token;
    },
  };
}
export const accessTokenClosure = closureAccessToken();
