# Neix Link Rotator

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Secure your Next.js admin panel with this open-source link rotator! 🛡️ This tool automatically generates dynamic, time-sensitive URLs with secure tokens to prevent unauthorized access.

## Features

* **Dynamic URL Generation:** Hides your admin panel behind a constantly changing URL.
* **Secure Token Authentication:** Adds an extra layer of security with cryptographically generated tokens.
* **Customizable Rotation Frequency:** Configure how often the link changes (using a Vercel Cron Job).
* **Vercel KV Integration:** Securely stores the URL, token, and rotated URL history.
* **Modern UI (Shadcn UI):**
  * **Intuitive Input Fields:** For manual URL and token entry.
  * **Clear Feedback:** Toasts notify of successes or errors.
  * **Copy Buttons:** Easily copy generated URL and token to the clipboard.
  * **Visual Feedback:** Checkmark replaces the copy icon to confirm successful copying.
  * **Loading Indicators:**  Shows when data is being fetched.
  * **Automatic Rotation:** URL and token are refreshed in the background. (Optional)
  * **Manual Rotation:** Button for on-demand URL and token generation.
* **Email Notifications:**  Sends the new admin URL and token to the administrator's email after rotation. (Optional)

## Benefits

* **Enhanced Security:**  Significantly harder for unauthorized users to discover and access your admin panel.
* **User-Friendly:**  Clean and intuitive UI for easy management.
* **Flexible Access:** Access the admin panel via the generated link, manual entry, or email.

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/theteleporter/neix.git
    ```

2. **Install Dependencies:**

    ```bash
    cd neix
    npm install
    ```

3. **Set Up Vercel KV:**
    * Create a Vercel KV instance.
    * Add the following environment variables to your Vercel project settings:
        * `KV_REST_API_URL`
        * `KV_REST_API_TOKEN`
        * (Optional) `KV_NAMESPACE` (if you're using namespaces)

4. **Configure Mailgun (Optional):**
    * Create a Mailgun account.
    * Add the following environment variables to your Vercel project settings:
        * `MAILGUN_SMTP_LOGIN`
        * `MAILGUN_SMTP_PASSWORD`
        * `ADMIN_EMAIL` (the email to receive notifications)
        * `COMPANY_EMAIL` (your company's email)

5. **Other Environment Variables:**
    * `NEXT_PUBLIC_APP_URL`: Your application's public URL.
    * `DEVELOPMENT_APP_URL`: Set to `http://localhost:3000` for local development.

6. **Start the Development Server:**

    ```bash
    npm run dev
    ```

## Usage

1. The app automatically fetches and displays the current admin URL and token.
2. **Click "Go to Admin Page"** to access your admin panel.
3. **OR, Enter the URL and Token Manually:**
    * Copy the values from the input fields or your email notification.
    * Paste them into your browser's address bar (including the `?token=` part).
4. **Click "Rotate Link"** to generate a new secure link anytime. This will invalidate the old link and send a new one via email (if configured).

## Monorepo Structure

The repository is structured as a monorepo using TurboRepo. Below is the structure:

```
neix/
├── apps/
│   ├── web/                      # The main web app for Neix
│   ├── docs/                     # Documentation app (e.g., Next.js with MDX for docs)
│   └── other-apps/               # Placeholder for potential future apps
├── packages/
│   ├── security/                 # Security package (route protection, token, email alerts)
│   ├── core/                     # Core shared utilities or configurations
│   ├── ui/                       # UI components (could be used across apps and packages)
│   └── ...                       # Other packages as Neix grows
├── turbo.json                    # Turbo config file for orchestrating tasks across apps/packages
├── tsconfig.json                 # Root TypeScript config for managing dependencies across apps/packages
├── .eslintrc.json                # ESLint config for consistent code quality
├── package.json                  # Monorepo-level package manager config
└── README.md                     # Monorepo-level README for contributors
```

## Security Package

The security package is designed to be flexible and developer-friendly. Below is a general roadmap for making it customizable:

### 1. Modularize the Middleware

* **Customizable Auth Triggers:** Allow developers to configure which actions (e.g., failed login, unauthorized route access) should trigger the email alert with a token.
* **Token Generation:** Provide customizable options for token format (length, type, expiration).
* **Email Settings:** Enable configuration of the email subject, sender details, and the email service (SMTP, SendGrid, etc.).

### 2. Token Verification

* **Verification Endpoint:** Create a pre-built endpoint for verifying tokens.
* **Customizable Actions:** After verification, allow developers to define what happens next (e.g., grant access, log the attempt, send additional alerts).

### 3. Security Enhancements

* **IP Logging & Throttling:** Options for logging IP addresses, device fingerprints, and throttling access attempts.
* **Customizable Alerts:** Allow multiple admin recipients or different alert levels (info, warning, critical).

### 4. Integration & Documentation

* **Config File:** A configuration file (e.g., security.config.js) where developers set parameters for their use case.
* **Extensive Documentation:** Instructions on setup, available options, and example use cases.

### 5. Token Security & Expiry

* **Auto-Expiration:** Add token expiration control (e.g., tokens that auto-expire after a set time) and allow for custom expiration times.
* **Single-Use Option:** Option to make tokens single-use, preventing reuse for added security.
* **Encryption:** Use encryption for token storage to protect sensitive data.

### 6. Advanced Notification Options

* **Multi-Channel Notifications:** Besides email, offer integrations with other alert channels like SMS, Slack, or even Telegram for instant notifications.
* **Alert Templates:** Customizable email templates with placeholders, so developers can easily personalize the alert messages.

### 7. Access Control & Auditing

* **Role-Based Access Control (RBAC):** Add options to define roles and access levels, making route protection flexible across different user types.
* **Audit Log:** Keep a log of all attempts, tokens generated, and access granted or denied, with timestamps. Developers could use this to track suspicious activity.

### 8. Developer Tools

* **CLI Tool:** A command-line tool for generating configuration files, setting up initial keys, and testing alerts.
* **Debug Mode:** A debug mode to test the middleware locally without triggering real alerts, which could help in testing and setup.

### 9. Customizable Middleware Pipeline

* **Middleware Composition:** Enable chaining with other middleware, like adding logging, rate limiting, or custom error handlers.
* **Hook System:** Add hooks, such as beforeTokenGeneration or afterTokenVerification, so developers can inject their own logic at different stages.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License.
