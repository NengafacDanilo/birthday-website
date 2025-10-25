# Email Setup Instructions

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this app password (not your regular password)

3. **Environment Variables**:
   Create a `.env.local` file in your project root with:

   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-app-password-here
   RECIPIENT_EMAIL=birthday-person@gmail.com
   ```

## Alternative Email Services

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'nkengafacdanilo@gmail.com',
    pass: 'igwo zdij wntf xhrn'
  }
});
```

### Custom SMTP
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nkengafacdanilo@gmail.com',
    pass: 'igwo zdij wntf xhrn'
  }
});
```

## Testing Email Setup

1. Start the development server: `npm run dev`
2. Test the API endpoint with curl or Postman
3. Check your email for the birthday wish

## Troubleshooting

- **535 Authentication Error**: Use app password instead of regular password
- **Connection Timeout**: Check firewall and antivirus settings
- **Invalid Service**: Verify the email service configuration

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords for Gmail instead of regular passwords
- Consider using services like SendGrid for production
