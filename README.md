# XUNEIX Link Rotator

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Secure your Next.js admin panel with this open-source link rotator! 🛡️ This tool automatically generates dynamic, time-sensitive URLs with secure tokens to prevent unauthorized access.

## Features

*   **Dynamic URL Generation:** Hides your admin panel behind a constantly changing URL.
*   **Secure Token Authentication:** Adds an extra layer of security with cryptographically generated tokens.
*   **Customizable Rotation Frequency:** Configure how often the link changes (using a Vercel Cron Job).
*   **Vercel KV Integration:** Securely stores the URL, token, and rotated URL history.
*   **Modern UI (Shadcn UI):** 
    *   **Intuitive Input Fields:** For manual URL and token entry.
    *   **Clear Feedback:** Toasts notify of successes or errors.
    *   **Copy Buttons:** Easily copy generated URL and token to the clipboard. 
    *   **Visual Feedback:** Checkmark replaces the copy icon to confirm successful copying.
    *   **Loading Indicators:**  Shows when data is being fetched.
    *   **Automatic Rotation:** URL and token are refreshed in the background. (Optional)
    *   **Manual Rotation:** Button for on-demand URL and token generation. 
*   **Email Notifications:**  Sends the new admin URL and token to the administrator's email after rotation. (Optional)

## Benefits

*   **Enhanced Security:**  Significantly harder for unauthorized users to discover and access your admin panel.
*   **User-Friendly:**  Clean and intuitive UI for easy management.
*   **Flexible Access:** Access the admin panel via the generated link, manual entry, or email.

## Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/theteleporter/xuneix.git](https://github.com/theteleporter/xuneix.git)
    ```

2.  **Install Dependencies:**
    ```bash
    cd xuneix
    npm install
    ```

3.  **Set Up Vercel KV:**
    *   Create a Vercel KV instance.
    *   Add the following environment variables to your Vercel project settings:
        *   `KV_REST_API_URL` 
        *   `KV_REST_API_TOKEN`
        *   (Optional) `KV_NAMESPACE` (if you're using namespaces)

4.  **Configure Mailgun (Optional):**
    *   Create a Mailgun account.
    *   Add the following environment variables to your Vercel project settings:
        *   `MAILGUN_SMTP_LOGIN`
        *   `MAILGUN_SMTP_PASSWORD`
        *   `ADMIN_EMAIL` (the email to receive notifications)
        *   `COMPANY_EMAIL` (your company's email)

5.  **Other Environment Variables:**
    *   `NEXT_PUBLIC_APP_URL`: Your application's public URL.
    *   `DEVELOPMENT_APP_URL`: Set to `http://localhost:3000` for local development.

6.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

## Usage

1.  The app automatically fetches and displays the current admin URL and token.
2.  **Click "Go to Admin Page"** to access your admin panel.
3.  **OR, Enter the URL and Token Manually:** 
    *   Copy the values from the input fields or your email notification.
    *   Paste them into your browser's address bar (including the `?token=` part).
4.  **Click "Rotate Link"** to generate a new secure link anytime. This will invalidate the old link and send a new one via email (if configured).


## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License.
