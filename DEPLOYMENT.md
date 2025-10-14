# Railway Deployment Instructions
# DEPLOYMENT.md

# 🚀 Free Backend Hosting Setup

## Option 1: Railway (Recommended - Free Tier Available)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your GitHub repository

### Step 2: Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `school_management_system` repository
4. Select the `backend` folder
5. Railway will automatically detect Node.js and deploy

### Step 3: Configure Environment Variables
In Railway dashboard, go to Variables tab and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/school_management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### Step 4: Get Your Backend URL
Railway will provide a URL like: `https://your-app-name.railway.app`

## Option 2: Render (Alternative Free Hosting)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

### Step 3: Configure Environment Variables
Add the same environment variables as Railway

## Option 3: MongoDB Atlas (Free Database)

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create a new cluster (free tier)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password

### Step 3: Configure Database Access
1. Go to "Database Access"
2. Add a new database user
3. Set username and password

## Option 4: Twilio SMS (Free Tier Available)

### Step 1: Create Twilio Account
1. Go to [twilio.com](https://twilio.com)
2. Sign up for free account
3. Verify your phone number

### Step 2: Get Credentials
1. Go to Console Dashboard
2. Copy Account SID and Auth Token
3. Get a phone number (free trial includes $15 credit)

## Testing Your Setup

### 1. Test Backend Health
```bash
curl https://your-app-name.railway.app/api/health
```

### 2. Test Student Creation
```bash
curl -X POST https://your-app-name.railway.app/api/admin/create-student \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "mobile": "9876543210",
    "gender": "Male",
    "dateOfBirth": "2010-01-01",
    "classSection": "Class 10 A",
    "category": "General",
    "currentAddress": "123 Main St",
    "permanentAddress": "123 Main St",
    "fatherName": "Robert Doe",
    "fatherMobile": "9876543211",
    "motherName": "Jane Doe",
    "motherMobile": "9876543212",
    "admissionDate": "2024-01-01"
  }'
```

### 3. Test OTP Login
```bash
# Request OTP
curl -X POST https://your-app-name.railway.app/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{
    "mobile": "9876543210",
    "userType": "student"
  }'

# Verify OTP
curl -X POST https://your-app-name.railway.app/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "mobile": "9876543210",
    "otp": "123456",
    "userType": "student"
  }'
```

## Update Mobile App Configuration

In your mobile app, update the API URL:

```dart
String _apiBaseUrl = 'https://your-app-name.railway.app/api';
```

## Update Web Admin Configuration

In your web admin, update the API URL:

```javascript
const API_BASE_URL = 'https://your-app-name.railway.app/api';
```

## Security Features Implemented

✅ **Rate Limiting**: 100 requests per 15 minutes per IP
✅ **Input Validation**: All inputs validated
✅ **JWT Authentication**: Secure token-based auth
✅ **OTP Expiry**: OTP expires in 10 minutes
✅ **Login Attempts**: Max 5 attempts before lockout
✅ **Helmet Security**: Security headers
✅ **CORS Protection**: Cross-origin request protection

## Cost Breakdown (All Free!)

- **Railway**: Free tier (500 hours/month)
- **MongoDB Atlas**: Free tier (512MB storage)
- **Twilio**: Free tier ($15 credit)
- **Total Cost**: $0/month

## Production Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Set NODE_ENV=production
- [ ] Configure proper CORS origins
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up SSL certificate (Railway provides automatically)
- [ ] Configure domain name (optional)

## Troubleshooting

### Common Issues:
1. **Database Connection**: Check MongoDB Atlas IP whitelist
2. **SMS Not Sending**: Verify Twilio credentials
3. **CORS Errors**: Update FRONTEND_URL in environment variables
4. **Build Failures**: Check package.json and dependencies

### Support:
- Railway: [docs.railway.app](https://docs.railway.app)
- MongoDB: [docs.mongodb.com](https://docs.mongodb.com)
- Twilio: [twilio.com/docs](https://twilio.com/docs)
