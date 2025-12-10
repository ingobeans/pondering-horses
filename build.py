import requests

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

html = ""
items = get_games()

for item in items:
    html += f'<a href="{item[0]}"><div class="game-card"><img src="{item[1]}"><p>{item[3]}</p></div></a>'

with open("games.html","w") as f:
    f.write(html)