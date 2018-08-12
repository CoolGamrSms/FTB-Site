from flask import Flask, render_template
from flask_sse import sse
import threading
import json
import time
from sets import Set
from calendar import monthrange, timegm
from dateutil.parser import parse
from mcstatus import MinecraftServer
from datetime import datetime, timedelta

app = Flask(__name__)

app.config["REDIS_URL"] = "redis://localhost"
app.config["MC_HOST"] = "ftb.shaneschulte.com"
app.config["MC_PORT"] = 25566
app.config["MC_USERS"] = "usercache.json"

app.register_blueprint(sse, url_prefix='/stream')

players = {}
online_ids = Set()

class Player:

    name = ""
    uuid = ""
    expires = None

    def __init__(this, name, uuid, expires):
        this.name = name
        this.uuid = uuid

        # thanks mojang
        if expires is None:
            this.expires = None
        elif isinstance(expires, datetime):
            w, d = monthrange(expires.year, expires.month)
            this.expires = expires + timedelta(days=d)
        else:
            this.expires = parse(expires)

    # "just decrement the month"
    def lastSeen(this):
        m = this.expires.month - 1
        if m == 0:
            m = 12
        w, d = monthrange(this.expires.year, m)
        dt = this.expires - timedelta(days=d)
        return timegm(dt.utctimetuple())

    def todict(this):
        return {
            "name": this.name,
            "online": (this.uuid in online_ids),
            "uuid": this.uuid,
            "seen": this.lastSeen()
            }

    def __repr__(this):
        return json.dumps(this.todict())

class QueryDaemon(threading.Thread):

    server = None

    def __init__(this, host, port):
        threading.Thread.__init__(this)
        this.server = MinecraftServer(host, port)
        this.load_player_list()
        this.get_online_players()
        print "Starting Query Daemon..."

    def load_player_list(this):
        with app.app_context():

            with open(app.config['MC_USERS'], 'r') as f:
                for user in json.load(f):
                    players[user['uuid']] = Player(user['name'], user['uuid'], user['expiresOn'])

    def get_online_players(this):
        with app.app_context():

            global online_ids

            results = []
            now_online = Set()
            status = this.server.status()
            if status.players.online > 0:
                for p in status.players.sample:
                    players[p.id] = Player(p.name, p.id, datetime.utcnow())
                    now_online.add(p.id)

            for p in now_online.difference(online_ids):
                results.append({'uuid': p, 'name': players[p].name, 'online': True })

            for p in online_ids.difference(now_online):
                results.append({'uuid': p, 'seen': players[p].lastSeen(), 'online': False })

            online_ids = now_online

            return results


    def run(this):
        while True:
            time.sleep(5)
            updates = this.get_online_players()
            if len(updates) > 0:
                print updates
            with app.app_context():
                for update in updates:
                    sse.publish({"message": json.dumps(update)}, type='loginEvent')

t = QueryDaemon(app.config['MC_HOST'], app.config['MC_PORT'])
t.setDaemon(True)
t.start()

@app.route('/')
def index():
    return render_template("main.html")

@app.route('/api')
def api():
    result = []
    for k, v in players.iteritems():
        result.append(v.todict())

    return json.dumps(result)
