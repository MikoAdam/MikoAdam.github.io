/**
 * Examples - FIXED VERSION
 */

const EXAMPLES = {
    armenia: {
        title: '🔥 Armenia vs Azerbaijan',
        description: 'Nagorno-Karabakh conflict 1988-2023',
        script: `# Armenia-Azerbaijan: The Karabakh Wars

fly: 40, 46, 5
wait: 2s

year: "1988"
bubble: 30, 50, "Soviet Union begins to collapse", white
wait: 4s
remove: last

armenia: blue, pulse
wait: 1s
azerbaijan: green, pulse
wait: 2s

# Show Nagorno-Karabakh location
fly: 40, 46.8, 6
wait: 2s

bubble: 35, 48, "Nagorno-Karabakh: Armenian enclave inside Azerbaijan", purple
wait: 5s
remove: last

# 1991 - Independence
year: "1991"
wait: 1s

fly: 40, 46, 5
wait: 2s

bubble: 30, 50, "Both countries declare independence from USSR", white
wait: 4s
remove: last

# First War begins
year: "1992"
wait: 1s

attack: Armenia, Azerbaijan, red
wait: 2s

bubble: 30, 50, "First Karabakh War erupts", red
wait: 4s
remove: last
remove: arrows

bubble: 30, 50, "Brutal ethnic cleansing on both sides", red
wait: 4s
remove: last

# 1994 Ceasefire - Show Armenian-controlled territory
year: "1994"
wait: 1s

fly: 40, 46.5, 5.5
wait: 2s

bubble: 35, 48, "Ceasefire. Armenia victorious.", white
wait: 3s
remove: last

bubble: 35, 48, "30,000 dead. 1 million displaced.", red
wait: 4s
remove: last

bubble: 35, 47, "Armenia controls Karabakh + 7 surrounding districts", blue
wait: 3s
remove: last

# NAGORNO-KARABAKH PROPER (purple stripes)
region: Shusha, Azerbaijan, purple, occupied
wait: 300ms
region: Khojaly, Azerbaijan, purple, occupied
wait: 300ms
region: Khojavend, Azerbaijan, purple, occupied
wait: 300ms
region: Hadrut, Azerbaijan, purple, occupied
wait: 300ms
region: Askeran, Azerbaijan, purple, occupied
wait: 1s

bubble: 35, 47, "Nagorno-Karabakh proper (purple)", purple
wait: 3s
remove: last

# 7 SURROUNDING DISTRICTS (blue stripes)
region: Lachin, Azerbaijan, blue, occupied
wait: 300ms
region: Kalbajar, Azerbaijan, blue, occupied
wait: 300ms
region: Agdam, Azerbaijan, blue, occupied
wait: 300ms
region: Fuzuli, Azerbaijan, blue, occupied
wait: 300ms
region: Jabrayil, Azerbaijan, blue, occupied
wait: 300ms
region: Zangilan, Azerbaijan, blue, occupied
wait: 300ms
region: Qubadli, Azerbaijan, blue, occupied
wait: 1s

bubble: 35, 47, "7 surrounding districts (blue) - used as buffer zones", blue
wait: 4s
remove: last

# Long frozen conflict
year: "2016"
wait: 1s
bubble: 30, 50, "Occasional flare-ups. Territory remains frozen.", white
wait: 4s
remove: last

# 2020 War
year: "2020"
wait: 1s

attack: Azerbaijan, Armenia, red
wait: 2s

bubble: 30, 50, "Second Karabakh War - Azerbaijan attacks", red
wait: 4s
remove: last
remove: arrows

bubble: 30, 50, "44 days of intense fighting. Turkish drones devastate Armenian forces.", red
wait: 5s
remove: last

# Azerbaijan victory
year: "2020", highlight
wait: 1s

bubble: 35, 47, "Azerbaijan recaptures all 7 surrounding districts", green
wait: 4s
remove: last

# 2023 - Final offensive
year: "2023", highlight
wait: 1s

bubble: 35, 47, "Azerbaijan launches final offensive", red
wait: 3s
remove: last

bubble: 35, 47, "Nagorno-Karabakh falls in 24 hours", red
wait: 4s
remove: last

bubble: 35, 47, "120,000 Armenians flee. Region ethnically cleansed.", red
wait: 5s
remove: last

# Ending
fly: 40, 46, 5
wait: 2s

bubble: 30, 50, "Conflict resolved by force. Armenia defeated.", white
wait: 5s`
    }
};