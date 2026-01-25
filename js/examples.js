/**
 * Pillars of Creation Maps - Examples
 * Curated animation scripts for demonstrations
 */

const EXAMPLES = {
    showcase: {
        title: '🎬 Feature Showcase',
        description: 'Quick demo of all features and animations',
        script: `# Pillars of Creation Maps - Feature Showcase
# Quick demonstration of capabilities

# Camera controls
cinematic: 48, 2, 6, 35, 30
wait: 1s

bubble: 48, 8, "Cinematic 3D camera", purple
wait: 2s
remove: last

# Country animations - SLOW and visible!
france: blue, pulse
wait: 1500ms
germany: green, radial
wait: 1500ms
italy: purple, sweep
wait: 2s

# Attack arrows
attack: France, Germany, red
wait: 2s

# Labels
bubble: 48.8, 2.3, "Paris", blue
arrow: 52.5, 13.4, "Berlin - Capital", right, green
wait: 3s

remove: last
remove: last

bubble: 50, 5, "All features demonstrated!", white
wait: 3s`
    },

    yugoslavia: {
        title: '💥 Breakup of Yugoslavia 1991-2008',
        description: 'Dramatic historical timeline with wars and independence',
        script: `# Breakup of Yugoslavia 1991-2008

# === UNIFIED YUGOSLAVIA ===
cinematic: 44, 19, 5, 35, 0
wait: 2s

year: 38, 12, "1945", highlight
wait: 1s
bubble: 44, 14, "Socialist Federal Republic of Yugoslavia", white
wait: 3s
remove: last

# Show all territories
slovenia: blue, pulse
wait: 400ms
croatia: blue, pulse
wait: 400ms
bosnia and herzegovina: blue, pulse
wait: 400ms
serbia: blue, pulse
wait: 400ms
region: Kosovo, Serbia, blue, pulse
wait: 400ms
montenegro: blue, pulse
wait: 400ms
north macedonia: blue, pulse
wait: 2s

bubble: 44, 23, "Six republics + Kosovo province - United under Tito", white
wait: 4s
remove: last

# === 1991 - SLOVENIA ===
remove: last
year: 38, 12, "1991"
wait: 1s

cinematic: 46, 14.5, 7, 40, 45
wait: 2s

bubble: 46.5, 12, "Slovenia declares independence", white
wait: 2s
remove: last

slovenia: green, radial
wait: 2s

bubble: 46, 17, "Ten-Day War - Quick victory", green
wait: 3s
remove: last

# === 1991-1995 - CROATIA ===
remove: last
year: 38, 12, "1991"
wait: 1s

cinematic: 45, 16, 6, 35, 60
wait: 2s

bubble: 45.5, 13, "Croatia declares independence", white
wait: 2s
remove: last

croatia: orange, sweep
wait: 2s

attack: Serbia, Croatia, red
wait: 2s

bubble: 44.5, 19, "Croatian War - 4 brutal years", red
wait: 3s
remove: last

# === 1992-1995 - BOSNIA ===
remove: last
year: 38, 12, "1992", highlight
wait: 1s

cinematic: 43.8, 17.8, 7, 40, 30
wait: 2s

bubble: 44.5, 14, "Bosnia declares independence", white
wait: 2s
remove: last

bosnia and herzegovina: red, pulse
wait: 2s

attack: Serbia, Bosnia and Herzegovina, red
wait: 1s
attack: Croatia, Bosnia and Herzegovina, orange
wait: 2s

bubble: 43.8, 21, "Bosnian War - 100,000 killed", red
wait: 3s
remove: last

arrow: 43.85, 18.43, "Sarajevo: 1,425 day siege", right, white
wait: 3s
remove: last

# === 1995 - END OF WAR ===
remove: last
year: 38, 12, "1995"
wait: 1s
bubble: 44, 14, "Dayton Agreement - War ends", white
wait: 3s
remove: last

# === 1999 - KOSOVO ===
remove: last
year: 38, 12, "1999", highlight
wait: 1s

cinematic: 42.5, 20.8, 8, 40, 90
wait: 2s

bubble: 42.5, 17, "Kosovo War - Ethnic conflict", white
wait: 2s
remove: last

region: Kosovo, Serbia, purple, radial
wait: 2s

bubble: 42, 24, "NATO bombs Serbia for 78 days", purple
wait: 3s
remove: last

# === 2006 - MONTENEGRO ===
remove: last
year: 38, 12, "2006"
wait: 1s

cinematic: 42.5, 19, 7, 35, 45
wait: 2s

montenegro: cyan, sweep
wait: 1s

bubble: 42.7, 16, "Montenegro independence vote", white
wait: 3s
remove: last

# === 2008 - KOSOVO INDEPENDENCE ===
remove: last
year: 38, 12, "2008", highlight
wait: 1s

cinematic: 42.5, 20.8, 8, 40, 60
wait: 2s

region: Kosovo, Serbia, gold, radial
wait: 1s

bubble: 42.5, 17, "Kosovo declares independence", white
wait: 2s
remove: last

bubble: 42.5, 24, "Serbia does not recognize Kosovo", white
wait: 3s
remove: last

# === 2024 - RESULT ===
remove: last
year: 38, 12, "2024"
wait: 1s

cinematic: 44, 19, 5, 30, 0
wait: 2s

bubble: 44, 13, "One nation became seven", white
wait: 1s

line: Slovenia, Croatia, white
line: Croatia, Bosnia and Herzegovina, white
line: Serbia, Montenegro, white
line: Serbia, North Macedonia, white

wait: 3s
remove: last

bubble: 44, 24, "Decades later - wounds remain", white
wait: 4s`
    },

    nato: {
        title: 'NATO Expansion 1949-2024',
        description: 'Complete cinematic timeline with all 32 members',
        script: `# NATO Expansion 1949-2024 - CINEMATIC

# Opening - Wide Atlantic view
cinematic: 40, -40, 2, 25, 0
wait: 2s

# 1949 - FOUNDING
year: 40, -95, "1949", highlight
wait: 1s

bubble: 50, -75, "North Atlantic Treaty signed in Washington D.C.", white
wait: 3s

usa: founding, radial
canada: founding, radial
uk: founding, radial
france: founding, radial
belgium: founding, radial
netherlands: founding, radial
luxembourg: founding, radial
italy: founding, radial
portugal: founding, radial
iceland: founding, radial
norway: founding, radial
denmark: founding, radial

wait: 2s
remove: last

cinematic: 50, -10, 3, 35, 45
wait: 2s

bubble: 55, -15, "12 founding members unite against Soviet expansion", white
wait: 4s
remove: last

# 1952 - SOUTHERN FLANK
remove: last
year: 40, -95, "1952"
cinematic: 38, 28, 4, 40, 90
wait: 2s

greece: southern, sweep
turkey: southern, sweep

bubble: 38, 35, "Greece & Turkey secure Mediterranean flank", white
wait: 4s
remove: last

# 1955 - WEST GERMANY
remove: last
year: 40, -95, "1955"
cinematic: 51, 10, 5, 35, 60
wait: 2s

bubble: 54, 5, "West Germany joins to counter Soviet forces", white
wait: 3s
remove: last

region: Schleswig-Holstein, Germany, coldwar, radial
region: Hamburg, Germany, coldwar, radial
region: Bremen, Germany, coldwar, radial
region: Niedersachsen, Germany, coldwar, radial
region: Nordrhein-Westfalen, Germany, coldwar, radial
region: Hessen, Germany, coldwar, radial
region: Rheinland-Pfalz, Germany, coldwar, radial
region: Saarland, Germany, coldwar, radial
region: Baden-Württemberg, Germany, coldwar, radial
region: Bayern, Germany, coldwar, radial

wait: 2s

cinematic: 52.5, 13.4, 7, 50, 45
wait: 2s

region: Berlin, Germany, gold, radial
bubble: 52.8, 14.5, "West Berlin: NATO island inside East Germany", white
wait: 4s
remove: last

# 1982 - SPAIN
remove: last
year: 40, -95, "1982"
cinematic: 40, -4, 4, 30, 0
wait: 2s

spain: coldwar, sweep
bubble: 40, 0, "Spain joins after Franco dictatorship ends", white
wait: 4s
remove: last

# 1990 - GERMAN REUNIFICATION
remove: last
year: 40, -95, "1990"
cinematic: 52, 12, 5, 40, 90
wait: 2s

bubble: 54, 15, "Berlin Wall falls. Germany reunifies.", white
wait: 3s
remove: last

region: Mecklenburg-Vorpommern, Germany, gold, sweep
region: Brandenburg, Germany, gold, sweep
region: Sachsen-Anhalt, Germany, gold, sweep
region: Thüringen, Germany, gold, sweep
region: Sachsen, Germany, gold, sweep
region: Berlin, Germany, gold, sweep

bubble: 51, 15, "Former East Germany joins through reunification", white
wait: 4s
remove: last

# 1999 - FIRST EASTERN EXPANSION
remove: last
year: 40, -95, "1999"
cinematic: 50, 18, 4, 35, 0
wait: 2s

bubble: 53, 22, "First former Warsaw Pact nations join", white
wait: 3s
remove: last

poland: expansion99, radial
czechia: expansion99, radial
hungary: expansion99, radial

bubble: 49, 22, "Russia protests but is too weak to respond", white
wait: 4s
remove: last

# 2004 - BIG BANG EXPANSION
remove: last
year: 40, -95, "2004"
cinematic: 55, 22, 4, 30, 45
wait: 2s

bubble: 62, 15, "Big Bang: 7 nations join simultaneously", white
wait: 3s
remove: last

estonia: bigbang, sweep
latvia: bigbang, sweep
lithuania: bigbang, sweep

wait: 500ms

slovakia: bigbang, radial
slovenia: bigbang, radial
romania: bigbang, radial
bulgaria: bigbang, radial

cinematic: 50, 22, 4, 35, 0
wait: 2s

bubble: 46, 28, "NATO now directly borders Russia", white
wait: 4s
remove: last

# 2009 - BALKANS BEGIN
remove: last
year: 40, -95, "2009"
cinematic: 42, 18, 5, 40, 30
wait: 2s

albania: balkans, sweep
croatia: balkans, sweep

bubble: 43, 15, "Western Balkans begin NATO integration", white
wait: 4s
remove: last

# 2017 - MONTENEGRO
remove: last
year: 40, -95, "2017"
cinematic: 42.5, 19, 6, 45, 60
wait: 2s

montenegro: balkans, radial
bubble: 43.5, 21, "Montenegro joins despite Russian pressure", white
wait: 4s
remove: last

# 2020 - NORTH MACEDONIA
remove: last
year: 40, -95, "2020"
cinematic: 41.5, 22, 6, 50, 90
wait: 2s

north macedonia: balkans, sweep
bubble: 41, 24, "North Macedonia joins after name dispute resolved", white
wait: 4s
remove: last

# 2022 - INVASION
remove: last
year: 40, -95, "2022", highlight
cinematic: 49, 32, 4, 35, 0
wait: 2s

bubble: 48, 36, "Russia invades Ukraine. Everything changes.", white
wait: 4s
remove: last

# 2023 - FINLAND
remove: last
year: 40, -95, "2023", highlight
cinematic: 64, 26, 4, 30, 45
wait: 2s

finland: nordic, radial
bubble: 65, 30, "Finland ends 80 years of neutrality", white
wait: 4s
remove: last

# 2024 - SWEDEN
remove: last
year: 40, -95, "2024", highlight
cinematic: 62, 16, 4, 35, 30
wait: 2s

sweden: nordic, radial
bubble: 63, 12, "Sweden ends 200 years of neutrality", white
wait: 4s
remove: last

line: Sweden, Finland, nordic

cinematic: 58, 25, 4, 30, 0
wait: 2s
bubble: 64, 32, "NATO's border with Russia more than doubles", white
wait: 4s
remove: last

# FINALE
remove: last
year: 40, -95, "2024"
cinematic: 50, 0, 3, 25, 0
wait: 2s

bubble: 50, -20, "From 12 to 32 members in 75 years", white
wait: 5s`
    }
};