from transformers import pipeline

sentiment_model = pipeline("sentiment-analysis")

def analyze_sentiment(comments):
    results = sentiment_model(comments[:100])
    return results