import instaloader
import sys
import time
import random
from datetime import datetime
from dotenv import load_dotenv
import os
import requests
from fake_useragent import UserAgent
import contextlib
import io
import json
from colorama import init, Fore, Back, Style

username_input =  sys.argv[1]

init(autoreset=True)

load_dotenv()

INSTAGRAM_USERNAME = os.getenv("INSTAGRAM_USERNAME")
INSTAGRAM_PASSWORD = os.getenv("INSTAGRAM_PASSWORD")

def get_free_proxies():
    try:
        response = requests.get("https://www.sslproxies.org/")
        proxies = response.text.split("<td>")[1::2]
        proxy_list = [f"{proxies[i]}:{proxies[i+1]}" for i in range(0, len(proxies), 2)]
        return proxy_list
    except Exception as e:
        print(f"Error fetching proxies: {e}")
        return []

def get_random_user_agent():
    ua = UserAgent()
    return ua.random



def scrape_instagram(username, json_filename):
    L = instaloader.Instaloader()

    proxies = get_free_proxies()
    if proxies:
        proxy = random.choice(proxies)
        L.context._session.proxies = {
            "http": f"http://{proxy}",
            "https": f"https://{proxy}",
        }
        print(f"Using proxy: {proxy}")

    user_agent = get_random_user_agent()
    L.context._session.headers.update({"User-Agent": user_agent})
    print(f"Using User-Agent: {user_agent}")

    try:
        L.load_session_from_file(INSTAGRAM_USERNAME)
    except FileNotFoundError:
        L.context.log("Session file does not exist yet - Logging in.")
        try:
            L.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)
            L.save_session_to_file()
        except instaloader.exceptions.TwoFactorAuthRequiredException:
            print(
                "Two-factor authentication is required. Please log in manually and save the session."
            )
            return
        except instaloader.exceptions.ConnectionException as e:
            print(f"Connection error: {e}")
            return

    try:
        with contextlib.redirect_stderr(io.StringIO()):
            profile = instaloader.Profile.from_username(L.context, username)
        time.sleep(random.uniform(2, 5))
    except instaloader.exceptions.ProfileNotExistsException:
        print(f"Error: Profile '{username}' does not exist.")
        return
    except instaloader.exceptions.ConnectionException as e:
        print(f"Connection error: {e}")
        print("Waiting for 60 seconds before retrying...")
        time.sleep(60)
        return

    def safe_getattr(obj, attr, default="-"):
        try:
            return getattr(obj, attr, default)
        except KeyError:
            return default

    # Data dictionary to store scraped data
    data = {
        "username": profile.username,
        "full_name": profile.full_name,
        "biography": profile.biography,
        # "external_url": profile.external_url,
        "followers": profile.followers,
        "following": profile.followees,
        "number_of_posts": profile.mediacount,
        # "is_private": profile.is_private,
        "is_verified": profile.is_verified,
        # "user_id": profile.userid,
        # "profile_pic_url": profile.profile_pic_url,
        # "igtv_videos": safe_getattr(profile, 'igtvcount'),
        "business_category": safe_getattr(profile, 'business_category_name'),
        # "is_business_account": safe_getattr(profile, 'is_business_account'),
        # "is_joined_recently": safe_getattr(profile, 'is_joined_recently'),
        # "business_email": safe_getattr(profile, 'business_email'),
        # "business_phone_number": safe_getattr(profile, 'business_phone_number'),
        # "business_address": safe_getattr(profile, 'business_address_json'),
        # "highlight_reel_count": safe_getattr(profile, 'highlight_reel_count'),
        # "saved_media_count": safe_getattr(profile, 'saved_media_count'),
    }

    if not profile.is_private:
        posts = profile.get_posts()
        for index, post in enumerate(posts):
            if index >= 5:  # Limit to the first 5 posts
                break
            data[f"post{index+1}_likes"] = post.likes
            data[f"post{index+1}_comments"] = post.comments
            caption = post.caption if post.caption else ""
            data[f"post{index+1}_caption"] = caption[:50]  # First 50 characters of caption
            # data[f"post{index+1}_timestamp"] = post.date_local

    # Append the data to the JSON file
    weights = [
    0.0623,
    -0.0232,
    0.0696,
    0.0827,
    0.0373,
    0.0595,
    0.1234,
    -0.0137,
    -0.0058,
    -0.0149,
    -0.0002,
    -0.0121,
    0.0306,
    0.0772,
    0.2355,
    0.0763,
    0.1674,
    0.0695,
    0.0613,
    0.0041,
    0.0204,
    0.0623,
    -0.0156,
    0.1461
]
    

    
   
    with open(json_filename, 'w') as file:
        json.dump([data], file, indent=4)
    with open(json_filename, 'r') as file:
        data = json.load(file)[0]

    followers = data['followers']
    number_of_posts = data['number_of_posts']
    post1_likes = data.get('post1_likes', 0)
    post2_likes = data.get('post2_likes', 0)
    post3_likes = data.get('post3_likes', 0)
    post4_likes = data.get('post4_likes', 0)
    post5_likes = data.get('post5_likes', 0)

    post1_comments = data.get('post1_comments', 0)
    post2_comments = data.get('post2_comments', 0)
    post3_comments = data.get('post3_comments', 0)
    post4_comments = data.get('post4_comments', 0)
    post5_comments = data.get('post5_comments', 0)

    # Calculate engagement per post
    post1_engagement = post1_likes + post1_comments
    post2_engagement = post2_likes + post2_comments
    post3_engagement = post3_likes + post3_comments
    post4_engagement = post4_likes + post4_comments
    post5_engagement = post5_likes + post5_comments

    # Calculate average engagement per post
    avg_engagement_per_post = (
        post1_engagement + post2_engagement + post3_engagement + post4_engagement + post5_engagement
    ) / 5

    # Calculate engagement rate per post
    post1_eng_rate = (post1_engagement / followers) * 100
    post2_eng_rate = (post2_engagement / followers) * 100
    post3_eng_rate = (post3_engagement / followers) * 100
    post4_eng_rate = (post4_engagement / followers) * 100
    post5_eng_rate = (post5_engagement / followers) * 100

    # Calculate the average engagement rate per post
    avg_eng_rate_per_post = (
        post1_eng_rate + post2_eng_rate + post3_eng_rate + post4_eng_rate + post5_eng_rate
    ) / 5

    # Store all calculated features in an array
    features = [
        followers, 
        number_of_posts, 
        post1_likes, 
        post2_likes, 
        post3_likes, 
        post4_likes, 
        post5_likes,
        post1_comments, 
        post2_comments, 
        post3_comments, 
        post4_comments, 
        post5_comments,
        post1_engagement, 
        post2_engagement, 
        post3_engagement, 
        post4_engagement, 
        post5_engagement,
        post1_eng_rate, 
        post2_eng_rate, 
        post3_eng_rate, 
        post4_eng_rate, 
        post5_eng_rate,
        avg_engagement_per_post, 
        avg_eng_rate_per_post
    ]
    

    result = sum(features[i] * weights[i] for i in range(len(features)))
    data["result"] = result
    with open(json_filename, 'w') as file:
        json.dump([data], file, indent=4)

    print(result)
    



    print(f"\nData for {username} saved to {json_filename}")

if __name__ == "__main__":
    
    json_filename = "instagram_data.json"

    usernames = [
     username_input]
    
    for username in usernames:
        scrape_instagram(username, json_filename)
