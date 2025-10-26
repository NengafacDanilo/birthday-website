# TODO: Implement EmailJS Send Function for ContactForm

## Tasks
- [x] Update ContactForm.tsx to use EmailJS instead of fetch API
- [x] Add EmailJS initialization with public key
- [x] Modify onSubmit function to prepare template parameters with name, email, message, and base64 attachments
- [x] Handle file conversion to base64 for attachments
- [x] Update success and error handling for EmailJS responses
- [ ] Test form submission to ensure emails are sent via EmailJS
- [ ] Verify attachments are received correctly in emails

## Notes
- Service ID: service_rbqkqjk
- Template ID: template_e7dror8
- Public Key: xHqGzfrKsOwlAkVl8
- Ensure EmailJS template has placeholders: {{from_name}}, {{from_email}}, {{message}}, and attachments handled appropriately
