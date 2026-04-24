from django.shortcuts import render

# Create your views here.
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))


from django.http import JsonResponse
from ml.youtube_service import get_video_comments
from ml.sentiment import analyze_sentiment
from collections import Counter

def analyze_video(request):
    url = request.GET.get('url')

    if not url:
        return JsonResponse({'error': 'No URL provided'}, status=400)

    video_id = url.split("v=")[-1].split("&")[0]

    comments = get_video_comments(video_id, max_results=100)
    sentiment_results = analyze_sentiment(comments)

    labels = [r['label'] for r in sentiment_results]
    sentiment_counts = Counter(labels)

    return JsonResponse({
        "total_comments": len(comments),
        "sentiment_distribution": sentiment_counts,
        "sample_comments": comments[:5],  # preview only
        "sample_sentiment": sentiment_results[:5],
        "overall_sentiment": get_overall_sentiment(sentiment_counts),
    })

def get_overall_sentiment(sentiment_counts):
    if sentiment_counts["POSITIVE"] > sentiment_counts["NEGATIVE"]:
        return "Overall Positive"
    elif sentiment_counts["NEGATIVE"] > sentiment_counts["POSITIVE"]:
        return "Overall Negative"
    else:
        return "Mixed"