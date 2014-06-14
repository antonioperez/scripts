#Connected Careers v0 by /u/NerdxBomber
# you may need some libraries to get this to work
# sudo pip install praw

#Connected Careers v0 by /u/NerdxBomber
import datetime
import json
import HTMLParser
import praw
import time
import urllib2

class RedditTwitchLive():

    def __init__(self):
        channels = open('twitch.txt', 'r')
        username = ''
        password = ''

        self.subreddit = 'rccsidebar'
        self.teams = {}
        self.channels = {}

        self.reddit = praw.Reddit(user_agent='ConnectedCareersLive: NerdxBomber')
        self.reddit.login(username,password)

        for line in channels:
            line = line.split(',')
            self.teams[line[0]] = line[1].strip() 
            self.channels[line[0]] = line[2].strip()
    
    def live_check(self):
        channel_info = {}
        url = 'http://api.justin.tv/api/stream/list.json?channel='
        for name, channel in self.channels.items():
            temp_url = url + channel
            sock = urllib2.urlopen(temp_url)
            resp = sock.read()
            resp = json.loads(resp)
            if resp:
                channel_info[name] = resp[0]['channel']
            sock.close()

        return channel_info
            
    def generate_table(self, chans):
        updated = datetime.datetime.now().strftime('%b %d, %Y at %I:%M%p')
        standings = "Last Updated: " + updated + "\n"
        standings += "\n|Team|Link|Title|Screen|Viewers|"
        standings += "\n|:--:|:--:|:--:|:--:|:--:|"
        if chans:
            for name , channel in chans.items():
                standings += "\n|[](#{0})|[{1}]({2})|{3}|[Shot]({4})|{5}|".format(self.teams[name], name, 
                                                                 channel['channel_url'],
                                                                 channel['title'], 
                                                                 channel['screen_cap_url_medium'],
                                                                 channel['views_count'])
        else:
            standings = "\n**No Live Games at the moment**"

        return standings

    def create_sidebar(self, content):
        html = HTMLParser.HTMLParser()

        sidebar = self.reddit.get_subreddit(self.subreddit).get_wiki_page('edit_sidebar').content_md
        sidebar_list = sidebar.split('[livegames]')
        sidebar = (sidebar_list[0] + content + sidebar_list[2])
        sidebar = html.unescape(sidebar)
        return sidebar

    def update_reddit(self, content):
        settings = self.reddit.get_subreddit(self.subreddit).get_settings()
        settings['description'] = content
        settings = self.reddit.get_subreddit(self.subreddit).update_settings(description=settings['description'])

    def main(self):
        while(True):
            secs = 60
            print 'Checking Twitch Channels...'
            live_channels = self.live_check()
            print 'Generating Table...'
            side_content = self.generate_table(live_channels)
            print 'Grabbing Sidebar Template...'
            sidebar = self.create_sidebar(side_content)
            print 'Updating Sidebar...'
            self.update_reddit(sidebar)
            print 'Sidebar Updated: ' + datetime.datetime.now().strftime('%b %d, %Y at %I:%M%p')
            print 'Sleeping... for %s seconds\n' % secs
            time.sleep(secs)


RTL = RedditTwitchLive()
RTL.main()
