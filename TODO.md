# TODO: Enhance Birthday Form and Email Features

## 1. Add More Animation Effects to the Form (ContactForm.tsx)
- [x] Add stagger animation for form fields on load
- [ ] Add entrance animations for the entire form section
- [ ] Enhance button animations with glow effects or additional transitions
- [ ] Add loading spinner animation during submission

## 2. Customize the Email Template (route.ts)
- [x] Replace basic HTML with a styled template including CSS for better appearance
- [x] Add birthday-themed styling (colors, fonts, emojis)
- [x] Include sender's details in a formatted way

## 3. Add File Attachments for Photos/Videos
- [x] Update ContactForm.tsx: Add file input field for multiple files (images/videos)
- [x] Update route.ts: Handle multipart/form-data using FormData
- [x] Attach uploaded files to the email
- [x] Add validation for file types and sizes
- [x] Install formidable dependency (removed, using native FormData)

## 4. Add Social Media Sharing Buttons (ContactForm.tsx)
- [x] Add sharing buttons (Facebook, Twitter, WhatsApp) in the success message
- [x] Use URL sharing for the birthday page or a custom message

## Testing Phase
- [x] Test API endpoint with text data
- [ ] Test file attachment uploads with actual files
- [x] Test form validation (missing fields, invalid emails, short messages)
- [ ] Test social sharing button URLs
- [ ] Test form animations in browser
- [ ] Test email template rendering (requires valid credentials)
