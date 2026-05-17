FROM nginx:1.29-alpine

LABEL maintainer="worawalan"
LABEL description="snowinaugust.dev portfolio — static site"
LABEL version="v2-local"

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/
COPY *.jsx /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY certs /usr/share/nginx/html/certs
COPY work /usr/share/nginx/html/work

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]