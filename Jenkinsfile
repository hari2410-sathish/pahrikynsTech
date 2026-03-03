pipeline {
    agent any

    environment {
        BACKEND_ENV_FILE = 'pahrikyns-backend/.env'
        FRONTEND_ENV_FILE = 'pahrikyns-frontend/.env'
    }

    stages {
        stage('Checkout code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hari2410-sathish/Final-Host-My-Project.git'
            }
        }

        stage('Prepare env files') {
            steps {
                sh '''
                set -eu

                mkdir -p pahrikyns-backend pahrikyns-frontend

                # Create backend env file only when missing.
                if [ ! -f "$BACKEND_ENV_FILE" ]; then
                  echo "Backend .env missing -> creating from Jenkins environment ✅"
                  cat > "$BACKEND_ENV_FILE" <<EOB
NODE_ENV=${NODE_ENV:-production}
PORT=${PORT:-5000}
DATABASE_URL=${DATABASE_URL:-postgresql://postgres:postgres@db:5432/pahrikyns}
JWT_SECRET=${JWT_SECRET:-change_me_jwt_secret}
SESSION_SECRET=${SESSION_SECRET:-change_me_session_secret}
FRONTEND_URL=${FRONTEND_URL:-http://localhost}
FRONTEND_URLS=${FRONTEND_URLS:-http://localhost}
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID:-}
EMAIL_HOST=${EMAIL_HOST:-}
EMAIL_PORT=${EMAIL_PORT:-587}
EMAIL_SECURE=${EMAIL_SECURE:-false}
EMAIL_USER=${EMAIL_USER:-}
EMAIL_PASS=${EMAIL_PASS:-}
EMAIL_FROM=${EMAIL_FROM:-}
SMTP_HOST=${SMTP_HOST:-}
SMTP_PORT=${SMTP_PORT:-}
SMTP_USER=${SMTP_USER:-}
SMTP_PASS=${SMTP_PASS:-}
RAZORPAY_KEY_ID=${RAZORPAY_KEY_ID:-}
RAZORPAY_KEY_SECRET=${RAZORPAY_KEY_SECRET:-}
TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID:-}
TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN:-}
TWILIO_FROM=${TWILIO_FROM:-}
FB_PROJECT_ID=${FB_PROJECT_ID:-}
FB_CLIENT_EMAIL=${FB_CLIENT_EMAIL:-}
FB_PRIVATE_KEY=${FB_PRIVATE_KEY:-}
EOB
                else
                  echo "Backend .env already exists ✅"
                fi

                # Frontend env_file is referenced in docker-compose, so keep file present.
                if [ ! -f "$FRONTEND_ENV_FILE" ]; then
                  echo "Frontend .env missing -> creating defaults ✅"
                  cat > "$FRONTEND_ENV_FILE" <<EOF2
VITE_API_BASE_URL=${VITE_API_BASE_URL:-http://localhost:5000/api}
VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID:-${GOOGLE_CLIENT_ID:-}}
EOF2
                else
                  echo "Frontend .env already exists ✅"
                fi

                echo "Prepared env files"
                ls -l "$BACKEND_ENV_FILE" "$FRONTEND_ENV_FILE"
                '''
            }
        }

        stage('Build and Deploy with Docker') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose build --no-cache'
                sh 'docker-compose up -d'
            }
        }
    }
}
