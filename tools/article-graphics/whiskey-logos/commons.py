# Finds a logo file on Wikimedia Commons by search and downloads the SVG (or a 1600px PNG thumb).
import json,sys,time,urllib.request,urllib.parse
UA={'User-Agent':'logo-research-script/1.0'}
def api(**q):
    q.update(format='json'); u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(q)
    for i in range(5):
        try: return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30))
        except Exception as e: time.sleep(3*(i+1))
def search(q):
    r=api(action='query',list='search',srsearch=q+' logo filetype:svg',srnamespace=6,srlimit=8)
    return [x['title'] for x in r['query']['search']] if r else []
def get(title,slug):
    r=api(action='query',titles=title,prop='imageinfo',iiprop='url|mime',iiurlwidth=1600)
    ii=list(r['query']['pages'].values())[0]['imageinfo'][0]
    for url,ext in ((ii['url'],'svg'),(ii.get('thumburl'),'png')):
        try:
            data=urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=30).read()
            if data[:200].lower().find(b'<html')<0: open(f'logos/{slug}.{ext}','wb').write(data); return ext
        except Exception as e: time.sleep(4)
if __name__=='__main__':
    if sys.argv[1]=='search':
        for q in sys.argv[2:]: print(q,'=>',search(q)[:6]); time.sleep(1)
    else: print(get(sys.argv[2],sys.argv[3]))
