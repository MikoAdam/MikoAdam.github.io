/**
 * Pillars of Creation Maps - Examples
 */

const EXAMPLES = {
    showcase: {
        title: '🎬 Feature Showcase',
        description: 'Quick demo of all features',
        script: `# Pillars of Creation Maps - Feature Showcase

fly: 48, 5, 5
wait: 1s

bubble: 50, 10, "Welcome to Pillars of Creation Maps", blue
wait: 2s
remove: last

france: blue, pulse
wait: 1s
germany: green, radial
wait: 1s
italy: orange, sweep
wait: 2s

attack: France, Germany, red
bubble: 50, 8, "Attack arrows show military movements", white
wait: 3s
remove: last
remove: arrows

bubble: 48.8, 2.3, "Paris", blue
wait: 2s
remove: last

bubble: 50, 5, "All features demonstrated!", white
wait: 3s`
    },

    yugoslavia: {
        title: '💥 Breakup of Yugoslavia',
        description: 'The violent dissolution 1991-2008',
        script: `# Breakup of Yugoslavia 1991-2008

fly: 44, 18, 5
wait: 1s

year: "1945", highlight
bubble: 47, 22, "Socialist Federal Republic of Yugoslavia", white
wait: 3s

slovenia: navy, pulse
wait: 200ms
croatia: navy, pulse
wait: 200ms
bosnia and herzegovina: navy, pulse
wait: 200ms
serbia: navy, pulse
wait: 200ms
kosovo: navy, pulse
wait: 200ms
montenegro: navy, pulse
wait: 200ms
north macedonia: navy, pulse
wait: 2s

remove: last
bubble: 47, 22, "Six republics united under Tito", white
wait: 3s
remove: last

# 1991 - SLOVENIA
year: "1991"
wait: 500ms

fly: 46, 14.5, 6
wait: 1s

slovenia: green, radial
bubble: 47, 17, "Slovenia declares independence", green
wait: 2s
remove: last

bubble: 47, 17, "Ten-Day War: Yugoslav army withdraws", white
wait: 2s
remove: last

# CROATIA
fly: 45, 16, 5
wait: 1s

croatia: orange, sweep
bubble: 47, 20, "Croatia declares independence", orange
wait: 2s
remove: last

attack: Serbia, Croatia, red
bubble: 47, 20, "Serbian forces invade", red
wait: 3s
remove: last
remove: arrows

# 1992 - BOSNIA
year: "1992", highlight
wait: 500ms

fly: 44, 18, 5
wait: 1s

bosnia and herzegovina: maroon, pulse
bubble: 47, 22, "Bosnia declares independence", white
wait: 2s
remove: last

attack: Serbia, Bosnia and Herzegovina, red
wait: 600ms
attack: Croatia, Bosnia and Herzegovina, red
wait: 1s

bubble: 47, 22, "Three-way ethnic war", red
wait: 2s
remove: last

bubble: 47, 22, "Sarajevo besieged for nearly 4 years", white
wait: 3s
remove: last
remove: arrows

# 1995
year: "1995"

bubble: 47, 22, "Dayton Agreement ends the war", white
wait: 2s
remove: last

bubble: 47, 22, "Over 100,000 dead", red
wait: 3s
remove: last

# 1999 - KOSOVO
year: "1999", highlight
wait: 500ms

fly: 42.6, 21, 6
wait: 1s

bubble: 44, 24, "Kosovo Albanians fight for independence", white
wait: 2s
remove: last

kosovo: purple, radial
wait: 1s

bubble: 44, 24, "NATO bombs Serbia for 78 days", purple
wait: 3s
remove: last

# 2006 - MONTENEGRO
year: "2006"
wait: 500ms

fly: 42.5, 19, 6
wait: 1s

montenegro: cyan, sweep
bubble: 44, 22, "Montenegro votes for independence", cyan
wait: 3s
remove: last

# 2008 - KOSOVO
year: "2008", highlight
wait: 500ms

fly: 42.6, 21, 6
wait: 1s

kosovo: gold, radial
bubble: 44, 24, "Kosovo declares independence", gold
wait: 2s
remove: last

bubble: 44, 24, "Serbia refuses to recognize", white
wait: 3s
remove: last

# FINALE
year: "Today"
wait: 500ms

fly: 44, 18, 5
wait: 1s

bubble: 47, 22, "One nation became seven", white
wait: 3s
remove: last

bubble: 47, 22, "Tensions persist to this day", white
wait: 4s`
    },

    armenia: {
        title: '🔥 Armenia vs Azerbaijan',
        description: 'Nagorno-Karabakh conflict 1988-2023',
        script: `# Armenia-Azerbaijan: The Karabakh Wars

fly: 40, 46, 5
wait: 1s

year: "1988", highlight
bubble: 43, 50, "Soviet Union begins to collapse", white
wait: 3s
remove: last

armenia: blue, pulse
wait: 500ms
azerbaijan: green, pulse
wait: 1s

bubble: 43, 50, "Nagorno-Karabakh: Armenian enclave inside Azerbaijan", white
wait: 3s
remove: last

# 1991 - Independence
year: "1991"
wait: 500ms

bubble: 43, 50, "Both declare independence from USSR", white
wait: 3s
remove: last

# First War
year: "1992", highlight
wait: 500ms

attack: Armenia, Azerbaijan, red
wait: 1s

bubble: 43, 50, "First Karabakh War erupts", red
wait: 3s
remove: last
remove: arrows

bubble: 43, 50, "Brutal ethnic cleansing on both sides", red
wait: 3s
remove: last

# 1994 Ceasefire
year: "1994"
wait: 500ms

fly: 40, 46.5, 6
wait: 1s

bubble: 43, 50, "Ceasefire. Armenia victorious.", white
wait: 2s
remove: last

bubble: 43, 50, "30,000 dead. 1 million refugees.", red
wait: 3s
remove: last

# Show occupied territories with striped pattern
region: Agdam, Azerbaijan, blue, disputed
region: Fuzuli, Azerbaijan, blue, disputed
region: Jabrayil, Azerbaijan, blue, disputed
region: Zangilan, Azerbaijan, blue, disputed
region: Qubadli, Azerbaijan, blue, disputed
region: Kalbajar, Azerbaijan, blue, disputed
region: Lachin, Azerbaijan, blue, disputed

bubble: 43, 50, "Armenia occupies 7 Azerbaijani districts", blue
wait: 3s
remove: last

# Frozen conflict
year: "1994-2020"
wait: 500ms

fly: 40, 46, 5
wait: 1s

bubble: 43, 50, "Frozen conflict. Occasional clashes.", white
wait: 3s
remove: last

# 2020 War
year: "2020", highlight
wait: 500ms

bubble: 43, 50, "Azerbaijan launches offensive", red
wait: 2s
remove: last

attack: Azerbaijan, Armenia, red
wait: 1s

bubble: 43, 50, "Turkish Bayraktar drones devastate Armenians", red
wait: 3s
remove: last

bubble: 43, 50, "44 days. 7,000 dead.", red
wait: 3s
remove: last
remove: arrows

# 2020 Ceasefire
year: "Nov 2020"
wait: 500ms

bubble: 43, 50, "Russia brokers ceasefire", white
wait: 2s
remove: last

# Recolor regions as recaptured
fly: 40, 46.5, 6
wait: 1s

region: Agdam, Azerbaijan, green, radial
region: Fuzuli, Azerbaijan, green, radial
region: Jabrayil, Azerbaijan, green, radial
region: Zangilan, Azerbaijan, green, radial
region: Qubadli, Azerbaijan, green, radial
region: Kalbajar, Azerbaijan, green, radial

bubble: 43, 50, "Azerbaijan recaptures surrounding districts", green
wait: 3s
remove: last

region: Lachin, Azerbaijan, purple, disputed
bubble: 43, 50, "Lachin corridor under Russian peacekeepers", purple
wait: 3s
remove: last

# 2023 - Final takeover
year: "2023", highlight
wait: 500ms

bubble: 43, 50, "Azerbaijan blockades Karabakh", red
wait: 2s
remove: last

bubble: 43, 50, "September: 24-hour military operation", red
wait: 2s
remove: last

region: Lachin, Azerbaijan, green, radial

bubble: 43, 50, "120,000 Armenians flee", red
wait: 3s
remove: last

# FINALE
year: "Today"
wait: 500ms

fly: 40, 46, 5
wait: 1s

bubble: 43, 50, "Karabakh is fully Azerbaijani", green
wait: 3s
remove: last

bubble: 43, 50, "35 years. Complete ethnic cleansing.", white
wait: 4s`
    },

    nato: {
        title: 'NATO Expansion 1949-2024',
        description: 'From 12 to 32 members',
        script: `# NATO Expansion 1949-2024

fly: 45, -20, 2
wait: 2s

year: "1949", highlight
wait: 1s

bubble: 50, -70, "North Atlantic Treaty signed", white
wait: 2s

usa: purple, radial
canada: purple, radial
uk: purple, radial
france: purple, radial
belgium: purple, radial
netherlands: purple, radial
luxembourg: purple, radial
italy: purple, radial
portugal: purple, radial
iceland: purple, radial
norway: purple, radial
denmark: purple, radial

wait: 2s
remove: last

fly: 50, -5, 3
wait: 1s

bubble: 55, -10, "12 nations against Soviet threat", white
wait: 3s
remove: last

# 1952
year: "1952"

fly: 38, 28, 4
wait: 1s

greece: cyan, sweep
turkey: cyan, sweep

bubble: 38, 35, "Greece and Turkey join", white
wait: 3s
remove: last

# 1955
year: "1955"

fly: 51, 10, 5
wait: 1s

bubble: 54, 5, "West Germany joins", white
wait: 2s
remove: last

region: Schleswig-Holstein, Germany, gold, radial
region: Hamburg, Germany, gold, radial
region: Bremen, Germany, gold, radial
region: Niedersachsen, Germany, gold, radial
region: Nordrhein-Westfalen, Germany, gold, radial
region: Hessen, Germany, gold, radial
region: Rheinland-Pfalz, Germany, gold, radial
region: Saarland, Germany, gold, radial
region: Baden-Württemberg, Germany, gold, radial
region: Bayern, Germany, gold, radial

wait: 2s

# 1982
year: "1982"

fly: 40, -4, 4
wait: 1s

spain: gold, sweep
bubble: 40, 0, "Spain joins", white
wait: 3s
remove: last

# 1990
year: "1990"

fly: 52, 12, 5
wait: 1s

bubble: 54, 15, "Berlin Wall falls. Germany reunifies.", white
wait: 3s
remove: last

region: Mecklenburg-Vorpommern, Germany, lime, sweep
region: Brandenburg, Germany, lime, sweep
region: Sachsen-Anhalt, Germany, lime, sweep
region: Thüringen, Germany, lime, sweep
region: Sachsen, Germany, lime, sweep
region: Berlin, Germany, lime, sweep

wait: 2s

# 1999
year: "1999"

fly: 50, 18, 4
wait: 1s

bubble: 53, 22, "First ex-Warsaw Pact nations", white
wait: 2s
remove: last

poland: orange, radial
czechia: orange, radial
hungary: orange, radial

bubble: 49, 22, "Russia too weak to respond", white
wait: 3s
remove: last

# 2004
year: "2004"

fly: 55, 22, 4
wait: 1s

bubble: 62, 15, "Big Bang: 7 nations at once", white
wait: 2s
remove: last

estonia: blue, sweep
latvia: blue, sweep
lithuania: blue, sweep

wait: 500ms

slovakia: blue, radial
slovenia: blue, radial
romania: blue, radial
bulgaria: blue, radial

fly: 50, 22, 4
wait: 1s

bubble: 46, 28, "NATO at Russian border", white
wait: 3s
remove: last

# 2009
year: "2009"

fly: 42, 18, 5
wait: 1s

albania: pink, sweep
croatia: pink, sweep

bubble: 43, 15, "Balkans join", white
wait: 3s
remove: last

# 2017
year: "2017"

fly: 42.5, 19, 6
wait: 1s

montenegro: pink, radial
wait: 2s

# 2020
year: "2020"

fly: 41.5, 22, 6
wait: 1s

north macedonia: pink, sweep
wait: 2s

# 2022
year: "2022", highlight

fly: 49, 32, 4
wait: 1s

bubble: 48, 36, "Russia invades Ukraine", red
wait: 3s
remove: last

# 2023
year: "2023", highlight

fly: 64, 26, 4
wait: 1s

finland: red, radial
bubble: 65, 30, "Finland joins after 80 years neutral", red
wait: 3s
remove: last

# 2024
year: "2024", highlight

fly: 62, 16, 4
wait: 1s

sweden: red, radial
bubble: 63, 12, "Sweden joins after 200 years neutral", red
wait: 3s
remove: last

fly: 58, 25, 4
wait: 1s

bubble: 64, 32, "NATO-Russia border doubles", white
wait: 3s
remove: last

# FINALE
year: "2024"

fly: 50, 5, 3
wait: 1s

bubble: 50, -15, "12 to 32 members in 75 years", white
wait: 5s`
    }
};