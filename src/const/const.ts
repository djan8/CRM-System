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
      // console.log("get", accessToken);
      return accessToken;
    },
    setAccessToken: function (token: string) {
      accessToken = token;
      // console.log("set", accessToken);
    },
  };
}
export const accessTokenClosure = closureAccessToken();
console.log(accessTokenClosure.getAccessToken());
