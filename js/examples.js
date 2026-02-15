/**
 * Pillars of Creation Maps - Examples
 */

const EXAMPLES = {
    yugoslav_wars: {
        title: 'Yugoslav Wars (1991-1999)',
        description: 'The breakup of Yugoslavia: independence wars, ethnic conflict, and NATO intervention',
        script: `# THE YUGOSLAV WARS (1991-1999)
# The violent dissolution of Yugoslavia

fly: 44, 18, 5
wait: 1s

year: "1991"
wait: 1s

# Yugoslavia before the breakup
bubble: 47, 12, "Yugoslavia begins to fracture", white
wait: 2s
remove: last

# Slovenia declares independence - Ten-Day War
slovenia: green, pulse
wait: 500ms
effect: 46.1, 14.5, flag, green
wait: 500ms
bubble: 47, 12, "Slovenia declares independence - Ten-Day War", green
wait: 2s
remove: last

# Croatia declares independence
croatia: blue, pulse
wait: 500ms
effect: 45.8, 16, flag, blue
wait: 1s

# Serbia opposes
serbia: red, pulse
wait: 500ms
effect: 44.8, 20.5, troops, red
wait: 1s

bubble: 47, 12, "Croatia and Serbia clash over Krajina region", red
wait: 2s
remove: last

# Attack arrows - Serbian offensive in Croatia
attack: Serbia, Croatia, red, 0.20, 1.5
wait: 1s

effect: 45.3, 18.7, battle, red
wait: 500ms
effect: 45.2, 15.5, explosion, red
wait: 1s

legend: "Slovenia", green
legend: "Croatia", blue
legend: "Serbia", red

year: "1992"
wait: 1s
remove: arrows

# Bosnia declares independence
bosnia and herzegovina: yellow, pulse
wait: 500ms

fly: 43.8, 18, 6
wait: 1.5s

bubble: 45.5, 13, "Siege of Sarajevo begins - longest siege in modern warfare", red
wait: 2s
remove: last

effect: 43.9, 18.4, bombing, red, 1.5
wait: 500ms
effect: 43.3, 17.8, skull, red
wait: 1s

# Serbian forces attack Bosnia
attack: Serbia, Bosnia and Herzegovina, red, 0.15, 1.5
wait: 1s

bubble: 45.5, 13, "Ethnic cleansing across Bosnia", red
wait: 2s
remove: last

legend: "Bosnia", yellow

year: "1993"
wait: 1s

fly: 43.5, 18, 6
wait: 1.5s

# Three-way conflict
effect: 44.2, 17.5, battle, yellow
wait: 300ms
effect: 43.5, 18.5, battle, red
wait: 300ms
effect: 44.5, 16.5, battle, blue
wait: 1s

bubble: 45.5, 13, "Three-way war: Bosniak, Serb, and Croat forces clash", white
wait: 3s
remove: last

year: "1995", highlight
wait: 1s

fly: 44.3, 18, 5.5
wait: 1.5s

# Srebrenica massacre
effect: 44.1, 19.3, skull, red, 2
wait: 500ms
bubble: 45.5, 13, "Srebrenica massacre: 8,000 Bosniaks killed", red
wait: 3s
remove: last

# NATO intervention
effect: 43.9, 18.4, bombing, blue, 1.5
wait: 500ms
bubble: 45.5, 13, "NATO airstrikes force ceasefire", blue
wait: 2s
remove: last
remove: arrows

# Dayton Agreement
effect: 43.9, 18.4, treaty, purple, 1.5
wait: 500ms
bubble: 45.5, 13, "Dayton Agreement ends the Bosnian War", purple
wait: 3s
remove: last

legend: "NATO intervention", purple

year: "1998"
wait: 1s

fly: 42.5, 21, 6.5
wait: 1.5s

# Kosovo War
bubble: 44, 17, "Kosovo Albanians demand independence from Serbia", orange
wait: 2s
remove: last

effect: 42.7, 21, uprising, orange
wait: 500ms
effect: 42.4, 20.8, battle, red
wait: 1s

attack: Serbia, 42.5 21, red, 0.15, 1.5
wait: 1s

effect: 42.6, 21.2, skull, red
wait: 500ms
bubble: 44, 17, "Serbian forces launch ethnic cleansing in Kosovo", red
wait: 3s
remove: last

year: "1999", highlight
wait: 1s

# NATO bombing of Serbia
bubble: 44, 17, "NATO bombs Serbia for 78 days", blue
wait: 2s
remove: last
remove: arrows

fly: 44, 20, 5.5
wait: 1.5s

effect: 44.8, 20.5, bombing, blue, 1.5
wait: 300ms
effect: 44.0, 21.5, bombing, blue
wait: 300ms
effect: 43.3, 20.0, bombing, blue
wait: 1s

bubble: 44, 14, "Serbia withdraws from Kosovo. War ends.", blue
wait: 3s
remove: last

# Final state
fly: 43.5, 19, 5
wait: 2s

year: "2008"
wait: 1s
bubble: 44.5, 14, "Kosovo declares independence", orange
wait: 3s
remove: last

legend: "Kosovo", orange
wait: 3s`
    },

    eu_founding: {
        title: 'European Union - Formation & Expansion',
        description: 'From the Treaty of Rome (1957) through expansion to Brexit',
        script: `# THE EUROPEAN UNION
# From 6 founding members to continental union

fly: 50, 10, 4
wait: 1s

year: "1957"
wait: 1s
bubble: 56, 2, "Treaty of Rome: six nations form the EEC", blue
wait: 3s
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
wait: 2s

legend: "Founding 6 (1957)", blue

year: "1973"
wait: 1s
bubble: 56, 2, "First enlargement: the northern expansion", green
wait: 3s
remove: last

united kingdom: green, fade
wait: 400ms
ireland: green, fade
wait: 400ms
denmark: green, fade
wait: 2s

legend: "1973 Enlargement", green

year: "1981"
wait: 1s

greece: orange, fade
wait: 1s

legend: "1981 - Greece", orange

year: "1986"
wait: 1s
bubble: 40, -5, "Iberian accession after dictatorships end", yellow
wait: 3s
remove: last

spain: yellow, fade
wait: 400ms
portugal: yellow, fade
wait: 2s

legend: "1986 - Iberian", yellow

year: "1995"
wait: 1s

austria: purple, fade
wait: 400ms
finland: purple, fade
wait: 400ms
sweden: purple, fade
wait: 2s

legend: "1995 - Neutral states", purple

year: "2004", highlight
wait: 1s
bubble: 56, 2, "The Big Bang: 10 new members from the East", cyan
wait: 3s
remove: last

fly: 52, 18, 4
wait: 1.5s

poland: cyan, pulse
wait: 300ms
czechia: cyan, pulse
wait: 300ms
hungary: cyan, pulse
wait: 300ms
slovakia: cyan, pulse
wait: 300ms
slovenia: cyan, pulse
wait: 300ms
estonia: cyan, pulse
wait: 300ms
latvia: cyan, pulse
wait: 300ms
lithuania: cyan, pulse
wait: 2s

legend: "2004 - Big Bang", cyan

year: "2007"
wait: 1s

romania: pink, pulse
wait: 400ms
bulgaria: pink, pulse
wait: 2s

legend: "2007 - Southeast", pink

year: "2013"
wait: 1s

croatia: red, pulse
wait: 2s

legend: "2013 - Croatia", red

year: "2020"
wait: 1s
bubble: 56, 2, "Brexit: the United Kingdom leaves the EU", red
wait: 3s
remove: last

united kingdom: red, fade
wait: 2s

legend: "2020 - Brexit", red

fly: 50, 15, 3.5
wait: 2s

year: "2024"
wait: 3s`
    },

    armenia: {
        title: 'Armenia vs Azerbaijan',
        description: 'The Nagorno-Karabakh conflict 1988-2023',
        script: `# NAGORNO-KARABAKH CONFLICT
# 35 years of war over a mountainous enclave

fly: 40, 46, 5
wait: 1s

year: "1988"
wait: 1s

armenia: blue, pulse
wait: 500ms
azerbaijan: green, pulse
wait: 1s

# Highlight Karabakh during Soviet era
fly: 40, 46.5, 7
wait: 2s

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

bubble: 42, 51, "Nagorno-Karabakh: Armenian enclave inside Azerbaijan", purple
wait: 4s
remove: last

fly: 40, 46, 5.5
wait: 1.5s

bubble: 42, 38, "Soviet collapse ignites ethnic tensions", white
wait: 3s
remove: last

year: "1991"
wait: 1s
bubble: 42, 38, "Both declare independence. War erupts.", red
wait: 2s
remove: last

# Attack arrows for the first war
attack: Armenia, Azerbaijan, blue
wait: 2s

year: "1994"
wait: 1s

bubble: 42, 38, "Ceasefire. Armenia wins. 30,000 dead.", white
wait: 3s
remove: last
remove: arrows

fly: 40, 46.5, 7
wait: 1.5s

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

bubble: 38.5, 51, "Karabakh core under Armenian control", purple
wait: 3s
remove: last

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
wait: 200ms
region: Lankaran, Azerbaijan, blue, occupied
wait: 1s

bubble: 38.5, 51, "8 surrounding districts seized as buffer zones", blue
wait: 3s
remove: last

year: "2020", highlight
wait: 1s

fly: 40, 46, 5.5
wait: 1.5s

bubble: 42, 38, "Azerbaijan launches surprise offensive with Turkish drones", red
wait: 3s
remove: last

# Attack arrows for the 2020 war
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
region: Lankaran, Azerbaijan, green
wait: 300ms
region: Lachin, Azerbaijan, green
wait: 300ms
region: Kalbajar, Azerbaijan, green
wait: 1s

bubble: 42, 38, "All buffer zones recaptured in 44 days", green
wait: 3s
remove: last
remove: arrows

year: "2023", highlight
wait: 1s

fly: 40, 46.5, 7
wait: 1.5s

bubble: 42, 51, "Final assault: Karabakh falls in 24 hours", red
wait: 2s
remove: last

# Final attack arrow
attack: Azerbaijan, Armenia, red
wait: 1s

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

bubble: 42, 51, "120,000 Armenians flee. Complete ethnic cleansing.", red
wait: 4s
remove: last
remove: arrows

fly: 40, 46, 5
wait: 2s

year: "2024"
wait: 3s`
    },

    wwii_eastern: {
        title: 'WWII Eastern Front (1941-1945)',
        description: 'Operation Barbarossa to the Fall of Berlin — with military symbols',
        script: `# WWII EASTERN FRONT
# Operation Barbarossa to the Fall of Berlin

cinematic: 52, 20, 4, 15, 0
wait: 1s

year: "1941"
wait: 1s

germany: red, pulse
wait: 500ms

# Axis allies
romania: red, fade
wait: 300ms
hungary: red, fade
wait: 300ms
finland: red, fade
wait: 500ms

bubble: 56, 10, "Operation Barbarossa: 3 million troops invade the USSR", red
wait: 3s
remove: last

# Massive three-pronged attack
attack: Germany, 59.9 30.3, red, 0.15, 1.5
wait: 300ms
attack: Germany, 55.7 37.6, red, 0.10, 2, 1.5
wait: 300ms
attack: Germany, 48.5 35, red, -0.10, 1.5
wait: 1s

effect: 55.7, 37.6, tank, red, 1.5
wait: 300ms
effect: 59.9, 30.3, troops, red
wait: 300ms
effect: 48.5, 35, tank, red
wait: 1s

legend: "Axis Powers", red

year: "1942", highlight
wait: 1s

fly: 48.7, 44.5, 5
wait: 1.5s

bubble: 52, 38, "Battle of Stalingrad: the turning point", white
wait: 2s
remove: last

effect: 48.7, 44.5, battle, red, 2
wait: 500ms
effect: 48.7, 44.5, skull, yellow, 1.5
wait: 1s

bubble: 52, 38, "2 million casualties in the deadliest battle in history", red
wait: 3s
remove: last

year: "1943"
wait: 1s

fly: 52, 30, 4
wait: 1.5s

# Soviet counteroffensive
remove: arrows
remove: effects

russia: blue, pulse
wait: 500ms

attack: 48.7 44.5, Germany, blue, 0.10, 1.5
wait: 500ms
attack: Russia, 52 21, blue, 0.15, 2, 1.5
wait: 1s

effect: 51.5, 36, tank, blue, 1.5
wait: 300ms
effect: 50, 30, troops, blue
wait: 1s

bubble: 56, 10, "Soviet counter-offensive pushes westward", blue
wait: 3s
remove: last

legend: "Soviet Union", blue

year: "1944"
wait: 1s

fly: 52, 22, 4.5
wait: 1.5s

# Liberation of Eastern Europe
poland: blue, sweep
wait: 500ms
romania: blue, fade
wait: 300ms
hungary: blue, fade
wait: 500ms

effect: 52.2, 21, battle, blue
wait: 500ms

bubble: 56, 10, "Red Army liberates Eastern Europe", blue
wait: 3s
remove: last

year: "1945", highlight
wait: 1s

fly: 52.5, 13.4, 5
wait: 1.5s

remove: arrows

# Battle of Berlin
attack: Russia, Germany, blue, 0.10, 2.5, 2
wait: 1s

effect: 52.5, 13.4, explosion, blue, 2
wait: 500ms
effect: 52.5, 13.4, flag, blue, 1.5
wait: 1s

bubble: 56, 10, "Fall of Berlin. Hitler dead. Germany surrenders.", blue
wait: 3s
remove: last

germany: blue, sweep
wait: 2s

bubble: 56, 10, "27 million Soviet dead. The costliest front of WWII.", white
wait: 4s
remove: last

fly: 52, 20, 3.5
wait: 2s
wait: 3s`
    }
};
