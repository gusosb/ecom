
# server {

#         root /home/ubuntu/deploy/build;
#         index index.html index.htm index.nginx-debian.html;

#         server_name beta.kanindev.se;

# 	gzip on;
# 	gzip_disable "msie6";
# 	gzip_vary on;
# 	gzip_proxied any;
# 	gzip_comp_level 6;
# 	gzip_buffers 16 8k;
# 	gzip_http_version 1.1;
# 	gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;

#         location / {
# 		try_files $uri $uri/ /index.html;
#         }


#     listen [::]:443 ssl ipv6only=on; # managed by Certbot
#     listen 443 ssl; # managed by Certbot
#     ssl_certificate /etc/letsencrypt/live/beta.kanindev.se/fullchain.pem; # managed by Certbot
#     ssl_certificate_key /etc/letsencrypt/live/beta.kanindev.se/privkey.pem; # managed by Certbot
#     include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
#     ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

# }

server {

        root /home/ubuntu/deploy/todofrontend/build;
        index index.html index.htm index.nginx-debian.html;

        server_name todo.kanindev.se;

        gzip on;
        gzip_disable "msie6";
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_buffers 16 8k;
        gzip_http_version 1.1;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
                try_files $uri $uri/ /index.html;
        }



    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/todo.kanindev.se/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/todo.kanindev.se/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {

        root /home/ubuntu/deploy/build2;
        index index.html index.htm index.nginx-debian.html;

        server_name testwkflex.kanindev.se;

	gzip on;
	gzip_disable "msie6";
	gzip_vary on;
	gzip_proxied any;
	gzip_comp_level 6;
	gzip_buffers 16 8k;
	gzip_http_version 1.1;
	gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
		try_files $uri $uri/ /index.html;
        }



    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/testwkflex.kanindev.se/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/testwkflex.kanindev.se/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {

        root /home/ubuntu/deploy/todobackend;
        index index.js;


        server_name todoapi.kanindev.se;

        gzip on;
        gzip_disable "msie6";
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_buffers 16 8k;
        gzip_http_version 1.1;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml appl>;

        location / {
         proxy_pass http://localhost:3004;
        }


    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/todo.kanindev.se/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/todo.kanindev.se/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

#server {
#
#        root /home/ubuntu/deploy/backend;
#        index index.js;
#	
#	
#        server_name betaapi.kanindev.se;
#		
#	gzip on;	
#	gzip_disable "msie6";
#	gzip_vary on;
#	gzip_proxied any;
#	gzip_comp_level 6;
#	gzip_buffers 16 8k;
#	gzip_http_version 1.1;
#	gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml appl>;	
#
#        location / {
#         proxy_pass http://localhost:3001;
#        }
#
#
#
#    listen [::]:443 ssl; # managed by Certbot
#    listen 443 ssl; # managed by Certbot
#    ssl_certificate /etc/letsencrypt/live/beta.kanindev.se/fullchain.pem; # managed by Certbot
#    ssl_certificate_key /etc/letsencrypt/live/beta.kanindev.se/privkey.pem; # managed by Certbot
#    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
#    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
#
#}
#server {
#    if ($host = beta.kanindev.se) {
#        return 301 https://$host$request_uri;
#    } # managed by Certbot
#
#
#	
#        listen 80;
#        listen [::]:80;
#
#        server_name beta.kanindev.se;
#    return 404; # managed by Certbot
#
#
#}
#server {
#    if ($host = betaapi.kanindev.se) {
#        return 301 https://$host$request_uri;
#    } # managed by Certbot
#
#
#
#        listen 80;
#        listen [::]:80;
#	
#	
#        server_name betaapi.kanindev.se;
#    return 404; # managed by Certbot
#
#
#}
#server {
#
#         root /home/ubuntu/deploy/backendflex;
#         index index.js;
	
	
#         server_name wkflex.kanindev.se;
		
# 	gzip on;	
# 	gzip_disable "msie6";
# 	gzip_vary on;
# 	gzip_proxied any;
# 	gzip_comp_level 6;
# 	gzip_buffers 16 8k;
# 	gzip_http_version 1.1;
# 	gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml appl>;	

#         location / {
#          proxy_pass http://localhost:3002;
#         }


#     listen 443 ssl; # managed by Certbot
#     ssl_certificate /etc/letsencrypt/live/wkflex.kanindev.se/fullchain.pem; # managed by Certbot
#     ssl_certificate_key /etc/letsencrypt/live/wkflex.kanindev.se/privkey.pem; # managed by Certbot
#     include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
#     ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

# }

server {
    if ($host = wkflex.kanindev.se) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


	
	
        server_name wkflex.kanindev.se;
    listen 80;
    return 404; # managed by Certbot


}
server {

        root /home/ubuntu/deploy/backendflex2;
        index index.js;
	
	
        server_name wkflex2.kanindev.se;
		
	gzip on;	
	gzip_disable "msie6";
	gzip_vary on;
	gzip_proxied any;
	gzip_comp_level 6;
	gzip_buffers 16 8k;
	gzip_http_version 1.1;
	gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml appl>;	

        location / {
         proxy_pass http://localhost:3003;
        }



    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/testwkflex.kanindev.se/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/testwkflex.kanindev.se/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = testwkflex.kanindev.se) {
        return 301 https://$host$request_uri;
    } # managed by Certbot



        server_name testwkflex.kanindev.se;
    listen 80;
    return 404; # managed by Certbot


}
server {
    if ($host = wkflex2.kanindev.se) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


	
	
        server_name wkflex2.kanindev.se;
    listen 80;
    return 404; # managed by Certbot


}
# server {

#         root /home/ubuntu/deploy/strapi/build;
#         index index.js;


#         server_name strapi.kanindev.se;

#         gzip on;
#         gzip_disable "msie6";
#         gzip_vary on;
#         gzip_proxied any;
#         gzip_comp_level 6;
#         gzip_buffers 16 8k;
#         gzip_http_version 1.1;
#         gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml appl>;

#         location / {
#          proxy_pass http://localhost:1337;
#         }


#     listen 443 ssl; # managed by Certbot
#     ssl_certificate /etc/letsencrypt/live/strapi.kanindev.se/fullchain.pem; # managed by Certbot
#     ssl_certificate_key /etc/letsencrypt/live/strapi.kanindev.se/privkey.pem; # managed by Certbot
#     include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
#     ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

# }

#server {
#    if ($host = strapi.kanindev.se) {
#        return 301 https://$host$request_uri;
#    } # managed by Certbot
#
#
#
#
#        server_name strapi.kanindev.se;
#    listen 80;
#    return 404; # managed by Certbot
#
#
#}

server {
    if ($host = todo.kanindev.se) {
        return 301 https://$host$request_uri;
    } # managed by Certbot



        server_name todo.kanindev.se;
    listen 80;
    return 404; # managed by Certbot


}

server {
    if ($host = todoapi.kanindev.se) {
        return 301 https://$host$request_uri;
    } # managed by Certbot




        server_name todoapi.kanindev.se;
    listen 80;
    return 404; # managed by Certbot


}
