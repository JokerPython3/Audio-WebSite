import yt_dlp
import os
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def download(query):
    download_folder = 'downloads'
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'{download_folder}/%(title)s.%(ext)s',
        'quiet': True,
        'noplaylist': True,
        'no_warnings': True,
        'ignoreerrors': True,
        'logger': None,
        'progress_hooks': [],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(f"ytsearch1:{query}", download=True)
        if info and "entries" in info:
            entry = info["entries"][0]
            filename = ydl.prepare_filename(entry)
            return os.path.abspath(filename)

if __name__ == "__main__":
    ks = sys.argv[1]
    path = download(ks)
    print(path)


