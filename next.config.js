/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/daygrid',
])
const nextConfig = withTM({
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    contextPath: '',
  },
})

module.exports = nextConfig
