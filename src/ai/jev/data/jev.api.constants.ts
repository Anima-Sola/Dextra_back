import { JEV_API_KEY } from '../../../keys/ai.keys.js';

const AI_BASE_URL = 'https://api.proxyapi.ru';

export const JEV_URL = AI_BASE_URL + '/v1/decisions';

export const JEV_HEADER = {
  Authorization: `Bearer ${JEV_API_KEY}`,
  'Content-Type': 'application/json',
};

export const JEV_MODEL = 'typesafe/jev-1.14';