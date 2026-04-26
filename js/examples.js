/**
 * Pillars of Creation Maps - Examples
 * Comprehensive feature showcase for the sales team.
 *
 * Feature index across all examples:
 *  country: color, occupied  ── WWII (France/Poland/etc.), Cold War (Soviet satellites)
 *  region:  name, country, color, occupied ── Yugoslav Wars (Republika Srpska),
 *                                             Karabakh (core + buffer), Ukraine War (5 oblasts)
 *  label:   lat, lng, "text", size, color  ── city markers in every example
 *  arrow:   lat, lng, "text", dir, color   ── annotation pointers in every example
 *  line:    from, to, color               ── EU (Brussels links), Roman (trade routes),
 *                                             Cold War (Warsaw Pact lines)
 *  zoom:    country                       ── EU (Greece, UK), Karabakh (Azerbaijan), Ukraine
 *  cinematic: lat, lng, zoom, pitch, bearing ── opening shots + dramatic close-ups
 *  legend:  "text", color / auto          ── every example
 *  effect:  all 11 types used across examples
 */

const EXAMPLES = {

    /* =========================================================
     *  1.  YUGOSLAV WARS
     *  Features: cinematic, region:occupied (Republika Srpska),
     *            label (cities), arrow (annotation), full effect set
     * ========================================================= */
    yugoslav_wars: {
        title: 'Yugoslav Wars (1991–1999)',
        description: 'The violent breakup of Yugoslavia — occupied regions, city labels, directional arrows, and cinematic camera',
        script: `# THE YUGOSLAV WARS (1991–1999)
# The violent dissolution of Yugoslavia
# Features: cinematic, region:occupied, label, arrow, all effects

cinematic: 44, 18, 5, 20, -10
wait: 1.5s

year: "1991"
wait: 1s

# Persistent city labels
label: 44.8, 20.5, "Belgrade", 13, red
label: 45.8, 16.0, "Zagreb", 13, blue
label: 43.9, 18.4, "Sarajevo", 13, yellow

bubble: 47.5, 10, "Yugoslavia begins to fracture after the Cold War ends", white
wait: 3s
remove: last

# Slovenia — Ten-Day War
slovenia: green, pulse
wait: 400ms
effect: 46.1, 14.5, flag, green
wait: 500ms
bubble: 47.5, 10, "Slovenia: Ten-Day War — independence in just 10 days", green
wait: 2.5s
remove: last

# Croatia declares independence
croatia: blue, pulse
wait: 500ms
effect: 45.8, 16.0, flag, blue
wait: 800ms

# Serbian push-back
serbia: red, pulse
wait: 500ms

attack: Serbia, Croatia, red, 0.20, 1.5
wait: 800ms

effect: 45.3, 18.7, battle, red
wait: 300ms
effect: 45.2, 15.5, explosion, red
wait: 800ms

bubble: 47.5, 10, "Croatian Serbs seize the Krajina — one-third of Croatian territory", red
wait: 3s
remove: last

year: "1992"
wait: 1s
remove: arrows

# Bosnia declares independence
bosnia and herzegovina: yellow, pulse
wait: 600ms

fly: 43.8, 18.5, 6.5
wait: 1.5s

bubble: 46, 12, "Siege of Sarajevo begins — the longest siege in modern warfare", red
wait: 2.5s
remove: last

effect: 43.9, 18.4, bombing, red, 1.5
wait: 600ms

# Republika Srpska — occupied zone carved from Bosnia
region: Republika Srpska, Bosnia and Herzegovina, red, occupied
wait: 800ms

arrow: 44.8, 19.9, "Republika Srpska — Bosnian Serb occupied territory", right, red
wait: 1s

attack: Serbia, Bosnia and Herzegovina, red, 0.15, 1.5
wait: 1s

bubble: 46, 12, "Ethnic cleansing sweeps Bosnia — 100,000 civilians killed", red
wait: 3s
remove: last
remove: last

legend: "Slovenia", green
legend: "Croatia", blue
legend: "Bosnia", yellow
legend: "Serbia / Republika Srpska (occupied)", red

year: "1995", highlight
wait: 1s

fly: 44.1, 19.0, 7.5
wait: 1.5s

# Srebrenica massacre
effect: 44.1, 19.3, skull, red, 2
wait: 500ms
bubble: 44.4, 21, "Srebrenica — 8,372 Bosniaks murdered inside a UN safe zone", red
wait: 3.5s
remove: last

# NATO airstrikes
remove: arrows
remove: effects
effect: 43.9, 18.4, bombing, blue, 1.5
wait: 500ms
bubble: 46, 12, "NATO Operation Deliberate Force — Serbian forces withdraw", blue
wait: 2.5s
remove: last

effect: 43.9, 18.4, treaty, purple
wait: 500ms
bubble: 46, 12, "Dayton Agreement — Bosnia frozen in ethnic partition", purple
wait: 3s
remove: last

legend: "NATO intervention", blue
legend: "Dayton Peace", purple

year: "1999", highlight
wait: 1s

fly: 42.6, 21.1, 7
wait: 1.5s

label: 42.7, 21.2, "Pristina", 13, orange
wait: 300ms

effect: 42.7, 21, uprising, orange
wait: 500ms
attack: Serbia, 42.5 21, red, 0.15, 1.5
wait: 800ms
effect: 42.6, 21.2, skull, red
wait: 500ms

remove: arrows
remove: effects
effect: 44.8, 20.5, bombing, blue, 1.5
wait: 300ms
effect: 44.0, 21.5, bombing, blue
wait: 1s

bubble: 44, 14, "NATO bombs Serbia for 78 days — Kosovo placed under UN administration", blue
wait: 3.5s
remove: last

fly: 43.5, 19.5, 5
wait: 2s

year: "2008"
wait: 1s
bubble: 45, 13, "Kosovo declares independence — recognized by 117 nations", orange
wait: 3.5s
remove: last

legend: "Kosovo", orange
wait: 3s`
    },

    /* =========================================================
     *  2.  EUROPEAN UNION
     *  Features: label (Brussels HQ), arrow, line (founding-member
     *            connections to Brussels), zoom, legend entries per wave
     * ========================================================= */
    eu_founding: {
        title: 'European Union — Formation & Expansion',
        description: 'From six founding members to 27 — featuring city labels, alliance lines to Brussels, zoom, and every animation type',
        script: `# THE EUROPEAN UNION
# From six founding nations to the world's largest single market
# Features: label, arrow, line (Brussels connections), zoom, legend, pulse/fade/sweep

fly: 50, 10, 4
wait: 1s

year: "1957"
wait: 1s

# Label the EU capital
label: 50.85, 4.35, "Brussels", 15, blue
arrow: 52.0, 3.2, "EU Capital", right, blue
wait: 500ms

bubble: 57, 2, "Treaty of Rome — six nations create the European Economic Community", blue
wait: 3.5s
remove: last

france: blue, pulse
wait: 400ms
germany: blue, pulse
wait: 400ms
italy: blue, pulse
wait: 400ms
belgium: blue, pulse
wait: 400ms
netherlands: blue, pulse
wait: 400ms
luxembourg: blue, pulse
wait: 800ms

# Show founding-member connections to Brussels
line: France, Belgium, blue
line: Germany, Belgium, blue
line: Italy, Belgium, blue
line: Netherlands, Belgium, blue
line: Luxembourg, Belgium, blue
wait: 1s

bubble: 57, 2, "Six nations — free movement, shared market, common institutions", blue
wait: 3s
remove: last

legend: "Founding 6 (1957)", blue

year: "1973"
wait: 1s
remove: arrows

bubble: 57, 2, "First enlargement — the northern expansion", green
wait: 3s
remove: last

united kingdom: green, fade
wait: 400ms
ireland: green, fade
wait: 400ms
denmark: green, fade
wait: 1.5s

legend: "1973 — UK, Ireland, Denmark", green

year: "1981"
wait: 1s

zoom: Greece
wait: 1.5s

bubble: 40.5, 28, "Greece joins after democratic transition from military junta", orange
wait: 3.5s
remove: last

greece: orange, fade
wait: 1.5s

legend: "1981 — Greece", orange

fly: 47, 8, 4
wait: 1.5s

year: "1986"
wait: 1s

bubble: 43, -5, "Iberian accession — Spain and Portugal join after the fall of their dictatorships", yellow
wait: 3.5s
remove: last

spain: yellow, fade
wait: 400ms
portugal: yellow, fade
wait: 1.5s

legend: "1986 — Spain & Portugal", yellow

year: "1995"
wait: 1s

bubble: 57, 2, "Austria, Finland and Sweden join — Cold War neutrality gives way", purple
wait: 3.5s
remove: last

austria: purple, fade
wait: 400ms
finland: purple, fade
wait: 400ms
sweden: purple, fade
wait: 1.5s

legend: "1995 — Austria, Finland, Sweden", purple

year: "2004", highlight
wait: 1s

bubble: 57, 2, "The Big Bang — 10 new members from Eastern Europe join in a single day", teal
wait: 3.5s
remove: last

fly: 52, 18, 4
wait: 1.5s

poland: teal, pulse
wait: 250ms
czechia: teal, pulse
wait: 250ms
hungary: teal, pulse
wait: 250ms
slovakia: teal, pulse
wait: 250ms
slovenia: teal, pulse
wait: 250ms
estonia: teal, pulse
wait: 250ms
latvia: teal, pulse
wait: 250ms
lithuania: teal, pulse
wait: 250ms
malta: teal, pulse
wait: 250ms
cyprus: teal, pulse
wait: 1.5s

legend: "2004 — Big Bang (10 states)", teal

year: "2007"
wait: 1s

romania: pink, pulse
wait: 400ms
bulgaria: pink, pulse
wait: 1.5s

legend: "2007 — Romania & Bulgaria", pink

year: "2013"
wait: 1s

croatia: indigo, pulse
wait: 1.5s

legend: "2013 — Croatia", indigo

year: "2020"
wait: 1s

zoom: United Kingdom
wait: 1.5s

bubble: 55, 0, "Brexit — the United Kingdom votes to leave the European Union", red
wait: 3.5s
remove: last

united kingdom: red, sweep
wait: 1s

effect: 51.5, -0.1, skull, red
wait: 500ms

bubble: 55, 0, "January 31, 2020 — the first nation ever to leave the EU", red
wait: 3.5s
remove: last

legend: "2020 — Brexit", red

fly: 50, 12, 3.5
wait: 2s

year: "2024"
wait: 1s

bubble: 57, 2, "27 member states — 450 million citizens — the world's largest single market", blue
wait: 4.5s
remove: last

wait: 2s`
    },

    /* =========================================================
     *  3.  NAGORNO-KARABAKH
     *  Features: region:occupied extensively (core + buffer zones),
     *            zoom, label, arrow, line (Lachin corridor)
     * ========================================================= */
    armenia: {
        title: 'Nagorno-Karabakh Conflict (1988–2023)',
        description: '35 years of war over a mountainous enclave — featuring extensive region:occupied zones, supply-line drawing, zoom, labels, and arrows',
        script: `# NAGORNO-KARABAKH CONFLICT
# 35 years of war over a mountainous enclave
# Features: region:occupied (core + 7 buffer districts), zoom, label, arrow, line (supply route)

cinematic: 40, 47, 6, 25, 10
wait: 1.5s

year: "1988"
wait: 1s

armenia: blue, pulse
wait: 500ms
azerbaijan: green, pulse
wait: 1s

label: 40.2, 44.5, "Yerevan", 13, blue
label: 40.4, 49.9, "Baku", 13, green

zoom: Azerbaijan
wait: 1.5s

# Show the Karabakh enclave
region: Shusha, Azerbaijan, purple
wait: 150ms
region: Khojaly, Azerbaijan, purple
wait: 150ms
region: Khojavend, Azerbaijan, purple
wait: 150ms
region: Hadrut, Azerbaijan, purple
wait: 150ms
region: Askeran, Azerbaijan, purple
wait: 1s

label: 39.8, 46.8, "Stepanakert", 12, purple
wait: 300ms

bubble: 43, 52, "Nagorno-Karabakh — Armenian-majority enclave inside Azerbaijan", purple
wait: 4s
remove: last

fly: 40, 46, 5.5
wait: 1.5s

bubble: 43, 38, "Soviet collapse ignites ethnic war between Armenia and Azerbaijan", white
wait: 3.5s
remove: last

year: "1991"
wait: 1s

bubble: 43, 38, "Both republics declare independence. The First Karabakh War erupts.", red
wait: 3s
remove: last

attack: Armenia, Azerbaijan, blue
wait: 2s

year: "1994"
wait: 1s

bubble: 43, 38, "Bishkek ceasefire — Armenia wins. ~30,000 dead.", white
wait: 3.5s
remove: last
remove: arrows

zoom: Azerbaijan
wait: 1.5s

# Karabakh core — Armenian military occupation
region: Shusha, Azerbaijan, purple, occupied
wait: 200ms
region: Khojaly, Azerbaijan, purple, occupied
wait: 200ms
region: Khojavend, Azerbaijan, purple, occupied
wait: 200ms
region: Hadrut, Azerbaijan, purple, occupied
wait: 200ms
region: Askeran, Azerbaijan, purple, occupied
wait: 1s

bubble: 43, 52, "Karabakh core: under Armenian military control for 30 years", purple
wait: 3.5s
remove: last

# 7 surrounding buffer districts — seized as security belt
region: Lachin, Azerbaijan, blue, occupied
wait: 200ms
region: Kalbajar, Azerbaijan, blue, occupied
wait: 200ms
region: Agdam, Azerbaijan, blue, occupied
wait: 200ms
region: Fuzuli, Azerbaijan, blue, occupied
wait: 200ms
region: Jabrayil, Azerbaijan, blue, occupied
wait: 200ms
region: Zangilan, Azerbaijan, blue, occupied
wait: 200ms
region: Qubadli, Azerbaijan, blue, occupied
wait: 1s

# Lachin corridor — the lifeline
line: Armenia, 39.6 46.5, blue
arrow: 39.8, 46.0, "Lachin Corridor — sole supply road", left, blue
wait: 1s

bubble: 43, 52, "7 buffer districts seized — 1 million Azerbaijanis displaced", blue
wait: 3.5s
remove: last
remove: last

legend: "Karabakh (Armenian-held)", purple
legend: "Buffer zone (Armenian-occupied)", blue
legend: "Armenia", blue
legend: "Azerbaijan", green

year: "2020", highlight
wait: 1s

fly: 40, 46, 5.5
wait: 1.5s

bubble: 43, 38, "Azerbaijan launches a surprise offensive with Turkish Bayraktar drones", red
wait: 3.5s
remove: last

attack: Azerbaijan, Armenia, red
wait: 1s

region: Jabrayil, Azerbaijan, green
wait: 300ms
region: Fuzuli, Azerbaijan, green
wait: 300ms
region: Zangilan, Azerbaijan, green
wait: 300ms
region: Qubadli, Azerbaijan, green
wait: 300ms
region: Agdam, Azerbaijan, green
wait: 300ms
region: Lachin, Azerbaijan, green
wait: 300ms
region: Kalbajar, Azerbaijan, green
wait: 1s

bubble: 43, 38, "All 7 buffer districts recaptured in 44 days — decisive Azerbaijani victory", green
wait: 3.5s
remove: last
remove: arrows

year: "2023", highlight
wait: 1s

zoom: Azerbaijan
wait: 1.5s

bubble: 43, 52, "Azerbaijan launches a 24-hour final offensive — Karabakh collapses", red
wait: 3s
remove: last

attack: Azerbaijan, Armenia, red
wait: 800ms

region: Shusha, Azerbaijan, green
wait: 200ms
region: Khojaly, Azerbaijan, green
wait: 200ms
region: Khojavend, Azerbaijan, green
wait: 200ms
region: Hadrut, Azerbaijan, green
wait: 200ms
region: Askeran, Azerbaijan, green
wait: 1s

bubble: 43, 52, "120,000 Armenians flee within days. Karabakh ceases to exist.", red
wait: 4.5s
remove: last
remove: arrows

fly: 40, 46, 5
wait: 2s

year: "2024"
wait: 1s

bubble: 43, 38, "Azerbaijan restores full territorial control after 33 years of conflict", green
wait: 4s
remove: last

wait: 2s`
    },

    /* =========================================================
     *  4.  WWII EASTERN FRONT
     *  Features: country:occupied (Nazi-controlled Europe at war
     *            start), label (major cities), line (supply route),
     *            cinematic x2, legend entries
     * ========================================================= */
    wwii_eastern: {
        title: 'WWII Eastern Front (1941–1945)',
        description: 'Operation Barbarossa to the Fall of Berlin — featuring country:occupied for Nazi-controlled Europe, city labels, supply lines, dual cinematic shots',
        script: `# WWII EASTERN FRONT
# Operation Barbarossa to the Fall of Berlin
# Features: country:occupied (Nazi-occupied Europe), label, line (supply route), cinematic x2

cinematic: 51, 16, 4, 20, 0
wait: 1.5s

year: "1941"
wait: 1s

bubble: 58, 5, "By June 1941, Nazi Germany occupies all of Western and Central Europe", red
wait: 3.5s
remove: last

germany: red, pulse
wait: 400ms

# German-occupied Europe — shown as occupied territory
france: red, occupied
wait: 300ms
netherlands: red, occupied
wait: 300ms
belgium: red, occupied
wait: 300ms
denmark: red, occupied
wait: 300ms
norway: red, occupied
wait: 300ms
poland: red, occupied
wait: 800ms

arrow: 57, 11, "German-occupied Europe", left, red
wait: 1s

# Axis allies
romania: red, fade
wait: 300ms
hungary: red, fade
wait: 300ms
finland: red, fade
wait: 500ms

# Persistent city labels
label: 52.5, 13.4, "Berlin", 14, red
label: 55.7, 37.6, "Moscow", 14, white
label: 59.9, 30.3, "Leningrad", 13, white
label: 48.7, 44.5, "Stalingrad", 13, yellow
label: 52.2, 21.0, "Warsaw", 12, red

legend: "Nazi Germany & Axis", red

bubble: 58, 5, "Operation Barbarossa — 3.8 million troops, the largest invasion in history", red
wait: 3.5s
remove: last
remove: last

# Three-pronged drive into the USSR
attack: Germany, 59.9 30.3, red, 0.15, 1.5
wait: 300ms
attack: Germany, 55.7 37.6, red, 0.10, 2, 1.5
wait: 300ms
attack: Germany, 48.5 35, red, -0.10, 1.5
wait: 1s

effect: 55.7, 37.6, tank, red, 1.5
wait: 300ms
effect: 59.9, 30.3, battle, red
wait: 300ms
effect: 48.5, 35, tank, red
wait: 1s

# Supply line from Berlin
line: Germany, 55.7 37.6, red
wait: 500ms

bubble: 58, 5, "German advance stalls outside Moscow in −40°C — logistics collapse", white
wait: 3.5s
remove: last

year: "1942", highlight
wait: 1s

fly: 48.7, 44.5, 5.5
wait: 1.5s

remove: arrows
remove: effects

bubble: 54, 42, "Battle of Stalingrad — the turning point of the entire war", white
wait: 3s
remove: last

effect: 48.7, 44.5, battle, red, 2
wait: 500ms
effect: 48.7, 44.5, skull, yellow, 1.5
wait: 500ms
effect: 48.7, 44.5, bombing, red
wait: 1s

bubble: 54, 42, "2 million casualties — the deadliest battle in human history", red
wait: 3.5s
remove: last

year: "1943"
wait: 1s

fly: 52, 30, 4
wait: 1.5s

remove: effects

russia: blue, pulse
wait: 500ms

legend: "Soviet Union", blue

bubble: 58, 5, "Soviets encircle 330,000 Germans at Stalingrad — the tide turns", blue
wait: 3s
remove: last

attack: 48.7 44.5, Germany, blue, 0.10, 1.5
wait: 500ms
attack: Russia, 52 21, blue, 0.15, 2, 1.5
wait: 1s

effect: 51.5, 36, tank, blue, 1.5
wait: 300ms

bubble: 58, 5, "Battle of Kursk — largest tank battle ever. Soviets win. Germany never attacks again.", blue
wait: 4s
remove: last

year: "1944"
wait: 1s

fly: 52, 22, 4.5
wait: 1.5s

remove: arrows
remove: effects

bubble: 58, 5, "Operation Bagration — Red Army liberates Eastern Europe in 2 months", blue
wait: 3.5s
remove: last

# Liberated countries change from occupied to free
poland: blue, sweep
wait: 300ms
romania: blue, fade
wait: 300ms
hungary: blue, fade
wait: 500ms

effect: 52.2, 21, battle, blue
wait: 500ms
effect: 52.2, 21, flag, blue
wait: 500ms

attack: Russia, Germany, blue, 0.10, 2, 1.5
wait: 1s

bubble: 58, 5, "700 km of German lines collapse — 2 million German casualties in 2 months", blue
wait: 3.5s
remove: last

year: "1945", highlight
wait: 1s

cinematic: 52.5, 13.4, 6, 30, 0
wait: 1.5s

remove: arrows
remove: effects

attack: Russia, Germany, blue, 0.10, 2.5, 2
wait: 1s

effect: 52.5, 13.4, bombing, blue, 2
wait: 500ms
effect: 52.5, 13.4, explosion, blue, 1.5
wait: 500ms
effect: 52.5, 13.4, flag, blue
wait: 1s

bubble: 58, 5, "Fall of Berlin. Hitler dead. Germany surrenders — May 8, 1945.", blue
wait: 3.5s
remove: last

germany: blue, sweep
wait: 2s

bubble: 58, 5, "27 million Soviet dead. The most destructive war in human history.", white
wait: 4.5s
remove: last

fly: 52, 20, 3.5
wait: 3s`
    },

    /* =========================================================
     *  5.  RUSSIA-UKRAINE WAR
     *  Features: region:occupied for FIVE contested Ukrainian
     *            territories (Crimea, Donetsk, Luhansk,
     *            Zaporizhzhia, Kherson), label, arrow, zoom
     * ========================================================= */
    ukraine_war: {
        title: 'Russia–Ukraine War (2022–)',
        description: 'The largest land war in Europe since WWII — region:occupied for Crimea, Donbas, Zaporizhzhia, and Kherson; city labels; arrows',
        script: `# RUSSIA–UKRAINE WAR
# The largest land war in Europe since WWII
# Features: region:occupied (5 territories), zoom, label, arrow, full attack sequence

cinematic: 49, 32, 5, 25, 5
wait: 1.5s

year: "2014"
wait: 1s

ukraine: blue, pulse
wait: 500ms
russia: red, fade
wait: 1s

# Persistent city labels
label: 50.4, 30.5, "Kyiv", 14, blue
label: 50.0, 36.2, "Kharkiv", 13, blue
label: 47.1, 37.6, "Mariupol", 12, blue
label: 46.5, 30.7, "Odesa", 13, blue

bubble: 57, 20, "Russia annexes Crimea — first seizure of European territory since WWII", red
wait: 4s
remove: last

zoom: Ukraine
wait: 1.5s

# Crimea — annexed and occupied
region: Crimea, Ukraine, red, occupied
wait: 500ms

arrow: 44.0, 36.5, "Crimea — annexed by Russia, February 2014", right, red
wait: 1s

fly: 48.0, 37.5, 6.5
wait: 1.5s

bubble: 51, 42, "Pro-Russian separatists seize Donetsk and Luhansk oblasts", red
wait: 3.5s
remove: last

# Donbas — separatist-occupied oblasts
region: Donetsk, Ukraine, red, occupied
wait: 500ms
region: Luhansk, Ukraine, red, occupied
wait: 500ms

arrow: 49.5, 39.5, "Separatist 'republics' — Russian-backed, unrecognized", right, red
wait: 1s

effect: 48.0, 37.8, battle, red
wait: 500ms
effect: 47.9, 37.5, tank, red
wait: 500ms

bubble: 51, 42, "14,000 killed in the Donbas war (2014–2022) — Europe's forgotten conflict", white
wait: 3.5s
remove: last
remove: last
remove: arrows

legend: "Ukraine", blue
legend: "Russia", red
legend: "Occupied territory", red

year: "2022 — Feb 24", highlight
wait: 1s

fly: 50, 30, 5
wait: 1.5s

bubble: 57, 18, "Putin orders full-scale invasion — 190,000 troops cross the border at dawn", red
wait: 3.5s
remove: last

# Four-axis invasion
attack: Russia, 50.4 30.5, red, -0.15, 2, 1.5
wait: 300ms
attack: Russia, 49.0 32.0, red, 0.10, 1.5
wait: 300ms
attack: Russia, 47.5 37.5, red, 0.15, 1.5
wait: 300ms
attack: Russia, 46.5 32.5, red, -0.10, 1.5
wait: 1s

effect: 50.4, 30.5, battle, red, 1.5
wait: 300ms
effect: 51.5, 31.3, bombing, red
wait: 300ms
effect: 47.5, 37.5, tank, red
wait: 1s

bubble: 57, 18, "Drive on Kyiv repelled in 30 days — Russia's 3-day war becomes a years-long slog", blue
wait: 3.5s
remove: last
remove: arrows
remove: effects

year: "2022 — Apr"
wait: 1s

fly: 47.5, 36.5, 6.5
wait: 1.5s

bubble: 51, 42, "Russia seizes and 'annexes' two more Ukrainian oblasts", red
wait: 3s
remove: last

# Two more oblasts seized and declared occupied
region: Zaporizhzhia, Ukraine, red, occupied
wait: 500ms
region: Kherson, Ukraine, red, occupied
wait: 800ms

arrow: 47.0, 39.8, "Zaporizhzhia & Kherson — 'annexed' September 2022", left, red
wait: 1s

effect: 47.1, 37.6, skull, red, 1.5
wait: 500ms
effect: 47.1, 37.6, bombing, red
wait: 500ms

bubble: 51, 42, "Mariupol falls after 86-day siege — Azovstal defenders surrender", red
wait: 3.5s
remove: last
remove: last

year: "2022 — Sep", highlight
wait: 1s

remove: effects
fly: 49.5, 33, 5.5
wait: 1.5s

bubble: 57, 18, "Ukrainian counter-offensive recaptures Kharkiv and Kherson regions", blue
wait: 3.5s
remove: last

attack: Ukraine, Russia, blue, -0.15, 1.5
wait: 800ms

effect: 49.5, 36.3, battle, blue, 1.5
wait: 300ms
effect: 46.6, 32.6, flag, blue
wait: 500ms

# Kherson liberated — redraw without occupied marker
region: Kherson, Ukraine, blue
wait: 500ms

bubble: 57, 18, "Kherson liberated — Ukraine's greatest territorial gain of the war", blue
wait: 3.5s
remove: last
remove: arrows

legend: "Ukrainian liberated territory", blue

year: "2023–2025"
wait: 1s

fly: 48.5, 37.5, 7
wait: 1.5s

label: 48.6, 38.0, "Bakhmut", 12, white
wait: 300ms

effect: 48.6, 38.0, skull, red, 1.5
wait: 500ms
effect: 48.5, 37.9, battle, red
wait: 500ms

bubble: 51, 42, "Bakhmut falls after 224 days — the costliest battle of the war", red
wait: 3.5s
remove: last

fly: 49, 33, 5
wait: 2s

bubble: 57, 18, "700,000+ total casualties. Europe's most devastating war since 1945.", white
wait: 4.5s
remove: last

year: "2025"
wait: 3s`
    },

    /* =========================================================
     *  6.  ROMAN EMPIRE
     *  Features: line (trade routes Rome→Carthage, Athens,
     *            Alexandria), label (ancient cities), zoom, cinematic
     *            x2, full effect set (capital, shield, battle, etc.)
     * ========================================================= */
    roman_empire: {
        title: 'Rise of the Roman Empire (509 BC – 117 AD)',
        description: 'From city-state to master of the ancient world — trade route lines, ancient city labels, zoom, two cinematic shots, full effect showcase',
        script: `# THE ROMAN EMPIRE
# From a city-state to master of the ancient world
# Features: line (trade routes), label (ancient cities), zoom, cinematic x2, all effect types

cinematic: 41.9, 14, 5, 30, 0
wait: 1.5s

year: "509 BC"
wait: 1s

# Rome — the eternal city
label: 41.9, 12.5, "ROME", 16, white
wait: 500ms

bubble: 48, 8, "Rome expels its kings — the Republic is born on the banks of the Tiber", white
wait: 3.5s
remove: last

italy: white, pulse
wait: 1s

effect: 41.9, 12.5, capital, white, 1.5
wait: 1s

bubble: 48, 8, "A city of 40,000 — yet destined to rule the known world", white
wait: 3.5s
remove: last

legend: "Roman territory", white

year: "264 BC"
wait: 1s

zoom: Italy
wait: 1s

italy: yellow, fade
wait: 800ms

effect: 41.9, 12.5, shield, yellow
wait: 1s

bubble: 48, 8, "Rome controls all of Italy — the Legions look south toward Carthage", yellow
wait: 3.5s
remove: last

legend: "264 BC — Italy unified", yellow

year: "146 BC"
wait: 1s

fly: 36, 14, 4.5
wait: 1.5s

# Label ancient rivals
label: 37.0, 10.2, "CARTHAGE", 14, orange
label: 37.9, 23.7, "ATHENS", 14, orange
label: 30.1, 31.3, "ALEXANDRIA", 13, orange

bubble: 48, 8, "Three Punic Wars — Carthage destroyed. Greece conquered. Rome rules the Mediterranean.", orange
wait: 4s
remove: last

attack: Italy, 37.0 10.2, orange, 0.15, 1.5
wait: 400ms
attack: Italy, 37.9 23.7, orange, -0.10, 1.5
wait: 800ms

effect: 37.0, 10.2, battle, orange, 1.5
wait: 300ms
effect: 37.9, 23.7, battle, orange
wait: 1s

tunisia: orange, fade
wait: 400ms
greece: orange, fade
wait: 1s

remove: arrows

# Roman trade routes across the Mediterranean
line: Italy, Tunisia, orange
line: Italy, Greece, orange
line: Italy, Egypt, orange
wait: 500ms

arrow: 40.5, 21, "Roman trade routes — Mare Nostrum", left, orange
wait: 1s

bubble: 48, 8, "Rome calls the Mediterranean 'Our Sea' — 3 continents under one flag", orange
wait: 3.5s
remove: last
remove: last

legend: "146 BC — North Africa & Greece", orange

year: "44 BC"
wait: 1s

fly: 41, 14, 4.5
wait: 1.5s

effect: 41.9, 12.5, skull, red, 1.5
wait: 500ms
bubble: 48, 8, "Caesar assassinated on the Ides of March — the Republic collapses into civil war", red
wait: 3.5s
remove: last

effect: 41.9, 12.5, flag, yellow, 1.5
wait: 800ms

bubble: 48, 8, "Augustus emerges victorious — the Empire begins its golden age", yellow
wait: 3.5s
remove: last

year: "27 BC"
wait: 1s

fly: 37, 17, 4
wait: 1.5s

spain: yellow, fade
wait: 400ms
france: yellow, fade
wait: 400ms
turkey: yellow, fade
wait: 400ms
egypt: yellow, fade
wait: 400ms
syria: yellow, fade
wait: 400ms
libya: yellow, fade
wait: 400ms
morocco: yellow, fade
wait: 1s

effect: 41.9, 12.5, capital, yellow, 2
wait: 500ms

bubble: 48, 8, "Augustus: first Emperor. The Pax Romana — 200 years of relative peace.", yellow
wait: 4s
remove: last

legend: "27 BC — Early Empire", yellow

year: "117 AD", highlight
wait: 1s

cinematic: 38, 22, 3.5, 20, 0
wait: 1.5s

bubble: 48, 8, "Emperor Trajan — Rome reaches its maximum extent: 5 million km²", red
wait: 3.5s
remove: last

attack: Italy, 44.4 26.1, red, -0.10, 1.5
wait: 400ms
attack: Italy, 33.3 44.4, red, 0.15, 1.5
wait: 400ms
attack: Italy, 40.2 49.9, red, 0.10, 1.5
wait: 800ms

romania: red, sweep
wait: 400ms
iraq: red, sweep
wait: 400ms
armenia: red, sweep
wait: 1s

remove: arrows

# Extended trade network at peak empire
line: Italy, Egypt, red
line: Italy, Iraq, red
line: Italy, Romania, red
wait: 500ms

effect: 41.9, 12.5, capital, red, 2
wait: 500ms

bubble: 48, 8, "70 million subjects — 44,000 km of paved roads — the greatest empire of antiquity", white
wait: 4.5s
remove: last

fly: 37, 16, 3.5
wait: 2s

bubble: 48, 8, "SPQR — Senatus Populusque Romanus — The Senate and People of Rome", white
wait: 4.5s
remove: last

legend: "117 AD — Maximum extent", red
wait: 3s`
    },

    /* =========================================================
     *  7.  COLD WAR
     *  Features: country:occupied for Soviet satellite states,
     *            line (Warsaw Pact control lines from Moscow),
     *            label (Washington, Moscow, Berlin), arrow (Iron
     *            Curtain), nuke effect, legend entries
     * ========================================================= */
    cold_war: {
        title: 'Cold War — NATO vs Warsaw Pact (1949–1991)',
        description: 'The global ideological struggle — country:occupied for Soviet satellites, alliance lines from Moscow, nuclear crisis, Iron Curtain annotation',
        script: `# THE COLD WAR
# NATO vs. the Warsaw Pact — 1945 to 1991
# Features: country:occupied (Soviet-dominated states), line (Warsaw Pact lines),
#           nuke effect, label, arrow (Iron Curtain), legend

cinematic: 50, 15, 3.5, 25, 0
wait: 1.5s

year: "1945"
wait: 1s

bubble: 62, 0, "WWII ends — Europe divided between the Western Allies and the Soviet Union", white
wait: 4s
remove: last

russia: red, pulse
wait: 500ms

bubble: 62, 0, "Soviet forces occupy Eastern Europe — puppet regimes replace democratic governments", red
wait: 3.5s
remove: last

# Soviet-occupied satellite states — diagonal-stripe occupation marking
poland: red, occupied
wait: 300ms
czechia: red, occupied
wait: 300ms
slovakia: red, occupied
wait: 300ms
hungary: red, occupied
wait: 300ms
romania: red, occupied
wait: 300ms
bulgaria: red, occupied
wait: 300ms
albania: red, occupied
wait: 800ms

arrow: 56, 28, "Soviet-occupied Eastern Europe", right, red
wait: 1s

# Control lines from Moscow to the satellites
line: Russia, Poland, red
line: Russia, Czechia, red
line: Russia, Hungary, red
line: Russia, Romania, red
wait: 500ms

bubble: 62, 0, "\"An Iron Curtain has descended across the Continent\" — Churchill, 1946", white
wait: 3.5s
remove: last
remove: last

# Capital city labels
label: 38.9, -77.0, "Washington", 13, blue
label: 55.7, 37.6, "Moscow", 13, red
label: 52.5, 13.4, "Berlin", 13, white

year: "1949"
wait: 1s

bubble: 62, 0, "NATO founded — 12 nations pledge collective defence: an attack on one is an attack on all", blue
wait: 4s
remove: last

united states of america: blue, pulse
wait: 200ms
canada: blue, pulse
wait: 200ms
united kingdom: blue, pulse
wait: 200ms
france: blue, pulse
wait: 200ms
belgium: blue, pulse
wait: 200ms
netherlands: blue, pulse
wait: 200ms
luxembourg: blue, pulse
wait: 200ms
denmark: blue, pulse
wait: 200ms
norway: blue, pulse
wait: 200ms
iceland: blue, pulse
wait: 200ms
portugal: blue, pulse
wait: 200ms
italy: blue, pulse
wait: 1s

legend: "NATO Alliance", blue
legend: "Warsaw Pact (Soviet-occupied)", red

year: "1955"
wait: 1s

bubble: 62, 0, "Warsaw Pact formed — Soviet response to West Germany joining NATO", red
wait: 3.5s
remove: last

poland: red, pulse
wait: 200ms
czechia: red, pulse
wait: 200ms
slovakia: red, pulse
wait: 200ms
hungary: red, pulse
wait: 200ms
romania: red, pulse
wait: 200ms
bulgaria: red, pulse
wait: 200ms
albania: red, pulse
wait: 1s

year: "1961"
wait: 1s

fly: 52.5, 13.4, 7.5
wait: 1.5s

bubble: 54.5, 16, "Berlin Wall — city divided overnight. 28 years of separation.", white
wait: 3.5s
remove: last

effect: 52.5, 13.35, shield, red, 1.5
wait: 300ms
effect: 52.5, 13.45, shield, blue, 1.5
wait: 500ms

arrow: 53.5, 14.5, "Divided city — East (Soviet) vs West (NATO)", left, white
wait: 1s

bubble: 54.5, 16, "\"Ich bin ein Berliner\" — President Kennedy visits West Berlin, 1963", blue
wait: 3.5s
remove: last
remove: last

year: "1962"
wait: 1s

fly: 22, -80, 4.5
wait: 1.5s

bubble: 28, -58, "Cuban Missile Crisis — humanity comes closest to nuclear annihilation", red
wait: 3.5s
remove: last

effect: 23.1, -82.4, nuke, red, 2.5
wait: 500ms
effect: 23.1, -82.4, bombing, red, 1.5
wait: 300ms
attack: Russia, 23.1 -82.4, red, -0.20, 2
wait: 1s

bubble: 28, -58, "Soviet missiles 90 miles from Florida — 13 days that nearly ended the world", white
wait: 4s
remove: last
remove: arrows

year: "1979"
wait: 1s

fly: 34, 67, 5
wait: 1.5s

bubble: 42, 58, "Soviet invasion of Afghanistan — the USSR's Vietnam War", red
wait: 3.5s
remove: last

afghanistan: red, fade
wait: 500ms
attack: Russia, Afghanistan, red, 0.10, 1.5
wait: 1s

effect: 34.5, 69.2, battle, red
wait: 300ms
effect: 33.0, 65.0, battle, red
wait: 800ms

bubble: 42, 58, "10-year quagmire — 15,000 Soviet dead, 1 million Afghan civilians killed", white
wait: 4s
remove: last
remove: arrows
remove: effects

year: "1989", highlight
wait: 1s

fly: 50, 15, 3.5
wait: 1.5s

bubble: 62, 0, "Revolutions sweep Eastern Europe — the Iron Curtain falls in a single year", white
wait: 3.5s
remove: last

# Satellite states liberate themselves
poland: blue, sweep
wait: 300ms
hungary: blue, sweep
wait: 300ms
czechia: blue, sweep
wait: 300ms
slovakia: blue, sweep
wait: 300ms
romania: blue, sweep
wait: 300ms
bulgaria: blue, sweep
wait: 800ms

effect: 52.5, 13.4, treaty, blue, 2
wait: 500ms

bubble: 62, 0, "Berlin Wall falls — November 9, 1989. The Cold War is effectively over.", blue
wait: 4.5s
remove: last

year: "1991", highlight
wait: 1s

fly: 55, 40, 4
wait: 1.5s

russia: blue, fade
wait: 1s

effect: 55.7, 37.6, skull, red, 2
wait: 500ms

bubble: 62, 0, "Soviet Union dissolves on Christmas Day, 1991 — 15 independent nations born", white
wait: 4.5s
remove: last

effect: 55.7, 37.6, flag, blue, 1.5
wait: 1s

bubble: 62, 0, "The United States stands as the world's sole superpower. The Cold War is won.", blue
wait: 4.5s
remove: last

fly: 30, 10, 2.5
wait: 3s`
    }
};
