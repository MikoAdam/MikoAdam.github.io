/**
 * Pillars of Creation Maps - Examples
 */

const EXAMPLES = {
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
    }
};
