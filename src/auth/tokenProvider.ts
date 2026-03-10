export type TokenProvider = () => string | null;

let tokenProvider: TokenProvider | null = null;

export const setTokenProvider = (provider: TokenProvider) => {
  tokenProvider = provider;
};

export const getAccessToken = () => {
  return tokenProvider?.() ?? null;
};