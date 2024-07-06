# XUNEIX  
*   **Next.js Link Rotator**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Secure your Next.js admin panel with this open-source link rotator! 🛡️ This tool automatically generates dynamic, time-sensitive URLs with secure tokens to prevent unauthorized access.

## Features

*   **Dynamic URL Generation:**  Hides your admin panel behind a constantly changing URL.
*   **Secure Token Authentication:** Adds an extra layer of security with randomly generated tokens.
*   **Customizable Rotation Frequency:** Configure how often the link changes (hourly, daily, etc.).
*   **Vercel KV Integration:**  Stores the URL and token securely using Vercel KV.
*   **Modern UI:** Built with Shadcn UI and Tailwind CSS for a clean and intuitive interface.

## Benefits

*   **Enhanced Security:** Makes your admin panel significantly harder to find and access.
*   **Easy Setup:** Simple to integrate into your Next.js project.
*   **Customizable:** Tailor the rotation frequency and appearance to your needs.
*   **Open Source:** Free to use and modify under the MIT license.

## Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/theteleporter/xuneix.git
    ```

2.  **Install Dependencies:**
    ```bash
    cd xuneix
    npm install
    ```

3.  **Set Up Vercel KV:**
    *   Create a Vercel KV instance.
    *   Update your environment variables with your KV credentials.

4.  **Configure Initial Link:**
    *   Create an `initial-link.json` file in the project root and add your initial URL and token.
    *   The file should look like this:
        ```json
        {
            "url": "/admin/protected",
            "token": "your_initial_secure_token"
        }
        ```

5.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

## Usage

1.  Access the protected admin page using the generated link.
2.  Manually trigger link rotation through the UI. 
3.  Optionally, set up a Vercel Cron Job to automatically rotate the link.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License.
