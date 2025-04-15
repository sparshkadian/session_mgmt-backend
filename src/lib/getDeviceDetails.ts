import { Request } from 'express';
import { UAParser } from 'ua-parser-js';

export const getIP = (req: Request) => {
  return req.ip || req.headers['x-forwared-for'];
};

export const getDeviceDetails = (req: Request) => {
  const parser = new UAParser(req.headers['user-agent']);
  return parser.getDevice().type || 'desktop';
};
