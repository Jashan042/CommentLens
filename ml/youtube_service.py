import os
from dotenv import load_dotenv
from googleapiclient.discovery import build

load_dotenv()

API_KEY = os.getenv("YOUTUBE_API_KEY")

def get_video_comments(video_id, max_results=200):
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    
    comments = []
    request = youtube.commentThreads().list(
        part='snippet',
        videoId=video_id,
        maxResults=200,
        order = "relevance",
        textFormat="plainText"
    )

    while request and len(comments) < max_results:
        response = request.execute()

        for item in response['items']:
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            comments.append(comment)

            if len(comments) >= max_results:
                break

        request = youtube.commentThreads().list_next(request, response)

    return comments