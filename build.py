import requests,sys

# a script to build some dynamically generated pages for this website!

def get_games()->[[str,str,str]]:
    url = "https://gnarmi.itch.io/"

    try:
        text = requests.get(url).text
        text = text.split('<div class="column game_column"><div class="game_grid_widget base_widget user_game_grid">')[1]
        items = []
        for item in text.split('class="game_cell has_cover lazy_images"'):
            if not "href" in item:
                continue
            url = item.split("href=\"")[1].split("\"")[0]
            name = item.split("game_title")[1].split("href")[1].split(">")[1].split("<")[0]
            desc = item.split("game_text")[1].split(">")[1].split("<")[0]
            img_url = item.split("data-lazy_src=\"")[1].split("\"")[0]
            
            items.append([url,img_url,name,desc])
        return items
    except Exception as e:
        print(e)
        return []

# build games.html
html = ""
items = get_games()

html += '<body class="games-body" style="margin:0"><base target="_parent" /><link rel="stylesheet" href="style.css"><button onclick="javascript:left()" class="games-button">&lt;</button><div class="games-container">'

for item in items:
    html += f'<a class="game-card" href="{item[0]}"><div ><img src="{item[1]}"><p>{item[3]}</p></div></a>'
html += '</div><button onclick="javascript:right()" class="games-button">&gt;</button></body>'
html += '<script>function left() { window.scrollTo(window.scrollX-(450-68),500); }</script>'
html += '<script>function right() { window.scrollTo(window.scrollX+(450-68),500); }</script>'

with open("games.html","w") as f:
    f.write(html)
print("built games.html!")

# build index.html if publish build
if "publish" in sys.argv:
    print("publish flag set, removing debug lines!")
    with open("index.html","r") as f:
        text = f.read()
    new = ""
    for line in text.split("\n"):
        if "publish.remove_line" in line:
            continue
        new += line + "\n"
    with open("index.html","w") as f:
        f.write(new)
    print("built index.html!")