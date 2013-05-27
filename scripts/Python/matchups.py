matches = """WK 17 BEARS 1st in nfc north(0-0-0) @gatorjes 0   0 BROWNS 1st in afc north(0-0-0) @billdoisland
WK 17 49ERS 1st in nfc west(0-0-0) @midgetmoose 0   0 TEXANS 1st in afc south(0-0-0) @chazboski
WK 17 BRONCOS 1st in afc west(0-0-0) @shock saw 0   0 JAGUARS 1st in afc south(0-0-0) @skead citizen
WK 17 CARDINALS 1st in nfc west(0-0-0) @goshzillaa 0   0 REDSKINS 1st in nfc east(0-0-0) @jmffn360
WK 17 GIANTS 1st in nfc east(0-0-0) @kulosan125 0   0 FALCONS 1st in nfc south(0-0-0) @turdslinger21
WK 17 EAGLES 1st in nfc east(0-0-0) @don xtitox 0   0 PACKERS 1st in nfc north(0-0-0) @arrroonn
WK 17 BUCCANEERS 1st in nfc south(0-0-0) @gackrider 0   0 SAINTS 1st in nfc south(0-0-0) @l0sey0urself
WK 17 PATRIOTS 1st in afc east(0-0-0) @intothemyst 0   0 BILLS 1st in afc east(0-0-0) @the dragon
WK 17 COWBOYS 1st in nfc east(0-0-0) @stillviper 0   0 CHARGERS 1st in afc west(0-0-0) @bruno 61 dfr
WK 17 RAVENS 1st in afc north(0-0-0) @ib eritrean 0   0 VIKINGS 1st in nfc north(0-0-0) @uppermosthat58
WK 17 PANTHERS 1st in nfc south(0-0-0) @indycolt1887 0   0 JETS 1st in afc east(0-0-0) @br3tt f4rve
WK 17 SEAHAWKS 1st in nfc west(0-0-0) @rockthebass140 0   0 RAMS 1st in nfc west(0-0-0) @bailsohard
WK 17 LIONS 1st in nfc north(0-0-0) @stiller609 0   0 STEELERS 1st in afc north(0-0-0) @biosin24
WK 17 TITANS 1st in afc south(0-0-0) @alphayasha 0   0 BENGALS 1st in afc north(0-0-0) @kic coffee atp
WK 17 DOLPHINS 1st in afc east(0-0-0) @dysastrous 0   0 COLTS 1st in afc south(0-0-0) @kocyigit
WK 17 RAIDERS 1st in afc west(0-0-0) @maxisthedog4u 0   0 CHIEFS 1st in afc west(0-0-0) @a faulty toyota

"""

teams_global = [
        'Redskins', 'Bucs','Buccaneers',
        'Ravens'  ,   'Jets' ,
        'Falcons'  ,  'Bears' ,
        'Bengals' ,   'Texans', 
        'Lions'    ,'Vikings' ,
        'Jaguars'   , 'Panthers' ,
        'Seahawks'   , 'Eagles' ,
        'Chiefs'  ,  'Chargers' ,
        'Bills' ,   'Raiders' ,
        'Titans' ,   'Steelers', 
        'Broncos' ,   'Browns' ,
        'Giants'  ,  'Patriots' ,
        'Cowboys'  ,  'Cardinals' ,
        'Rams'   ,  '49ers' ,
        'Saints'  ,  'Packers', 
        'Dolphins' ,   'Colts' ,         
            ]

team_data = []
for m in matches.split():
	m = m.lower().capitalize()
	if m in teams_global:
		team_data.append(m)


week_matches = {}
for i in xrange(0,len(team_data),2):
	week_matches[team_data[i]] = team_data[i+1]


print "Home : Away"
for k,v in week_matches.items():
	print k+':'+v


