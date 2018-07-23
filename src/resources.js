import { createResource } from 'plain-api';
import config from './config';

function errorParser(body) {
    if (body.error) {
        throw new Error(body.error.message);
    }

    return body;
}

export const login = createResource('post', `${config.apiUrl}/login`, {
    inputMap: {
        username: 'username',
        password: 'password',
    },
    parsers: [
        errorParser,
        ({ data }) => ({
            name: data.name,
            token: data.token,
        }),
    ],
});

export const getUser = createResource('get', `${config.apiUrl}/user`, {
    headersMap: {
        token: 'Authorization',
    },
    parsers: [
        errorParser,
        ({ data }) => ({
            username: data.username,
            name: data.name,
            token: data.token,
        }),
    ],
});

export const getUserTokenIds = createResource('get', `${config.apiUrl}/user/tokens`, {
    headersMap: {
        token: 'Authorization',
    },
    parsers: [
        errorParser,
        ({ data }) => data.map(item => item.tokenId),
    ],
});

export const setUserTokenIds = createResource('post', `${config.apiUrl}/user/tokens`, {
    headersMap: {
        token: 'Authorization',
    },
    inputMap: {
        tokenIds: 'tokenIds',
    },
    parsers: [
        errorParser,
        ({ data }) => data.map(item => item.tokenId),
    ],
});

export const getAllTokens = createResource('get', `${config.apiUrl}/tokens-info`, {
    headersMap: {
        token: 'Authorization',
    },
    parsers: [
        errorParser,
        ({ data }) => data.map(item => ({
            tokenId: item.tokenId,
            name: item.name,
            symbol: item.symbol,
            rank: item.rank,
            price: item.price,
            percentChange1h: item.percentChange1h,
            percentChange24h: item.percentChange24h,
            percentChange7d: item.percentChange7d,
            icon: item.icon,
        })),
    ],
});


export const getSpecificTokens = createResource('post', `${config.apiUrl}/tokens-info`, {
    headersMap: {
        token: 'Authorization',
    },
    inputMap: {
        tokenIds: 'tokenIds',
    },
    parsers: [
        errorParser,
        ({ data }) => data.map(item => ({
            tokenId: item.tokenId,
            name: item.name,
            symbol: item.symbol,
            rank: item.rank,
            price: item.price,
            percentChange1h: item.percentChange1h,
            percentChange24h: item.percentChange24h,
            percentChange7d: item.percentChange7d,
            icon: item.icon,
        })),
    ],
});

