import type { NextConfig } from "next";

let apiUri = '';
let webSocketUri = '';

if (process.env.NODE_ENV === 'development') {
  apiUri = 'http://192.168.1.20:8080/fraudmindapi/graphql/'
  webSocketUri = 'ws://192.168.1.20:8080/graphql/'
} else if (process.env.NODE_ENV === 'production') {
  apiUri = 'http://192.168.1.20:8080/fraudmindapi/graphql/'
  webSocketUri = 'ws://192.168.1.20:8080/graphql/'
}

const nextConfig: NextConfig = {
  env: {
    API_URI: apiUri,
    WEB_SOCKET_URI: webSocketUri,
    DEFAULT_LANGUAGE: 'fa',
    CURRENT_LANGUAGE: 'fa',
  },
};

export default nextConfig;
