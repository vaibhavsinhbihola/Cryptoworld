import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchangeHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_EXCHANGE_API_KEY,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
}

const baseUrl = 'https://api.coingecko.com/api/v3';

const createRequest = (url) => ({ url, headers: cryptoExchangeHeaders });

export const cryptoExchangeApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoExchange: builder.query({
            query: () => createRequest(`/exchanges`),
        })
    })
});

export const { useGetCryptoExchangeQuery } = cryptoExchangeApi;