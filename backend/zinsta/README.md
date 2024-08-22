# Zinsta 📸

![Python](https://img.shields.io/badge/Python-3.7%2B-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Instaloader](https://img.shields.io/badge/Instaloader-4.9.5-orange)

Zinsta is a powerful Python tool for scraping Instagram accounts, providing detailed information about users, their posts, and stories.

## 🚀 Features

- Fetch comprehensive user profile information
- Retrieve recent posts with details (captions, likes, comments, location)
- Access user stories (both photo and video)
- Use proxy rotation and random user agents for enhanced anonymity
- Respect Instagram's rate limits with built-in delays

## 📋 Prerequisites

- Python 3.7+
- Instagram account credentials (for authentication) (Optional)

## 🛠 Installation

1. Clone the repository:
   ```
   git clone https://github.com/bimoarifw/zinsta
   cd zinsta
   ```

2. Install required packages:
   ```
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the project root and add your Instagram credentials:
   ```
   INSTAGRAM_USERNAME=your_username
   INSTAGRAM_PASSWORD=your_password
   ```

## 🖥 Usage

Run the script:

```
python main.py
```

Follow the prompts to enter an Instagram username. Type 'exit' to stop the script.

## 📊 Sample Output

```
Username: example_user
Full Name: Example User
Biography: This is a sample biography
External URL: https://example.com
Followers: 1000
Following: 500
Number of Posts: 50
Is Private: False
Is Verified: True
...

Recent Posts:
Post 1:
  Caption: Check out this amazing sunset!...
  Likes: 150
  Comments: 10
  Location: Beach City
  Timestamp: 2023-04-15 18:30:00
...

Stories:
Photo Story URL: https://instagram.com/stories/example_user/12345678901234567
Video Story URL: https://instagram.com/stories/example_user/98765432109876543
```

## ⚠️ Disclaimer

This tool is for educational purposes only. Always respect privacy and adhere to Instagram's terms of service when using this script
