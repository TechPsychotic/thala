import tkinter as tk
from tkinter import ttk
from pytube import YouTube
from pydub import AudioSegment
from io import BytesIO

def download_video():
    try:
        url = url_entry.get()
        yt = YouTube(url)
        stream = yt.streams.get_highest_resolution()
        stream.download()

        status_label.config(text="Download Complete!")
    except Exception as e:
        status_label.config(text=f"Error: {str(e)}")

def download_audio():
    try:
        url = url_entry.get()
        yt = YouTube(url)
        audio_stream = yt.streams.filter(only_audio=True).first()
        audio_data = BytesIO(audio_stream.stream_to_buffer())
        audio = AudioSegment.from_file(audio_data, format="mp4")
        audio.export("audio.mp3", format="mp3")

        status_label.config(text="Audio Download Complete!")
    except Exception as e:
        status_label.config(text=f"Error: {str(e)}")

# GUI setup
root = tk.Tk()
root.title("YouTube Downloader")

# URL Entry
url_label = ttk.Label(root, text="Enter YouTube URL:")
url_label.pack(pady=10)

url_entry = ttk.Entry(root, width=50)
url_entry.pack(pady=10)

# Download Buttons
download_video_btn = ttk.Button(root, text="Download Video", command=download_video)
download_video_btn.pack(pady=10)

download_audio_btn = ttk.Button(root, text="Download Audio", command=download_audio)
download_audio_btn.pack(pady=10)

# Status Label
status_label = ttk.Label(root, text="")
status_label.pack(pady=10)

root.mainloop()
