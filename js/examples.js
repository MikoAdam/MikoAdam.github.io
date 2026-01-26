/**
 * Examples - ACCURATE HISTORICAL VERSION
 */

const EXAMPLES = {
    armenia: {
        title: '🔥 Armenia vs Azerbaijan',
        description: 'Nagorno-Karabakh conflict 1988-2023',
        script: `# ═══════════════════════════════════════════════════════════
# NAGORNO-KARABAKH: THE FROZEN CONFLICT THAT EXPLODED
# ═══════════════════════════════════════════════════════════

# Opening shot - wide view
fly: 40, 46, 5
wait: 2s

# ═══════════════════════════════════════════════════════════
# 1988 - SOVIET COLLAPSE
# ═══════════════════════════════════════════════════════════

year: "1988"
wait: 1s
bubble: 40, 35, "Soviet Union begins to collapse. Ethnic tensions explode.", white
wait: 4s
remove: last

# Show the two countries
armenia: blue
wait: 500ms
azerbaijan: green
wait: 2s

bubble: 40, 35, "Two Soviet republics, ancient enemies, modern conflict", white
wait: 4s
remove: last

# ═══════════════════════════════════════════════════════════
# THE PRIZE: NAGORNO-KARABAKH
# ═══════════════════════════════════════════════════════════

fly: 40, 46.5, 6.5
wait: 2s

bubble: 40, 50, "Nagorno-Karabakh: 95% Armenian, inside Azerbaijan", purple
wait: 5s
remove: last

# ═══════════════════════════════════════════════════════════
# 1991-1992 - FIRST WAR BEGINS
# ═══════════════════════════════════════════════════════════

year: "1991"
wait: 1s
bubble: 40, 50, "Both declare independence. War begins immediately.", red
wait: 4s
remove: last

year: "1992"
wait: 1s

# Attack arrow pointing AT Karabakh, not Armenia proper
bubble: 40, 50, "Armenia invades Karabakh and surrounding areas", red
wait: 4s
remove: last

bubble: 40, 50, "Brutal ethnic cleansing on both sides", red
wait: 4s
remove: last

# ═══════════════════════════════════════════════════════════
# 1994 - ARMENIAN VICTORY
# ═══════════════════════════════════════════════════════════

year: "1994"
wait: 1s

fly: 40, 46, 5.5
wait: 2s

bubble: 40, 35, "Ceasefire. Armenia wins decisively.", white
wait: 3s
remove: last

bubble: 40, 35, "30,000 dead. 1 million refugees.", red
wait: 4s
remove: last

# Show what Armenia took - NAGORNO-KARABAKH PROPER (purple)
bubble: 40, 35, "Armenia seizes Nagorno-Karabakh proper...", purple
wait: 3s
remove: last

region: Shusha, Azerbaijan, purple, occupied
wait: 200ms
region: Khojaly, Azerbaijan, purple, occupied
wait: 200ms
region: Khojavend, Azerbaijan, purple, occupied
wait: 200ms
region: Hadrut, Azerbaijan, purple, occupied
wait: 200ms
region: Askeran, Azerbaijan, purple, occupied
wait: 2s

# Now show the buffer zone - 8 SURROUNDING DISTRICTS (blue)
bubble: 40, 35, "...plus 8 surrounding districts as 'buffer zones'", blue
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
wait: 2s

bubble: 40, 35, "20% of Azerbaijan now under Armenian control", white
wait: 4s
remove: last

# ═══════════════════════════════════════════════════════════
# 1994-2020 - FROZEN CONFLICT
# ═══════════════════════════════════════════════════════════

year: "2016"
wait: 1s
bubble: 40, 35, "Frozen conflict. Occasional border clashes. No resolution.", white
wait: 4s
remove: last

# ═══════════════════════════════════════════════════════════
# 2020 - SECOND WAR BEGINS
# ═══════════════════════════════════════════════════════════

year: "2020", highlight
wait: 1s

bubble: 40, 35, "September 27: Azerbaijan launches surprise offensive", red
wait: 3s
remove: last

bubble: 40, 35, "Turkish drones massacre Armenian positions", red
wait: 4s
remove: last

bubble: 40, 35, "44 days of warfare. Armenia collapses.", red
wait: 4s
remove: last

# ═══════════════════════════════════════════════════════════
# AZERBAIJAN RECONQUERS THE BUFFER ZONES - ONE BY ONE
# ═══════════════════════════════════════════════════════════

bubble: 40, 35, "Azerbaijan recaptures buffer districts one by one...", green
wait: 3s
remove: last

# Reconquer south first
region: Jabrayil, Azerbaijan, green
wait: 400ms
region: Fuzuli, Azerbaijan, green
wait: 400ms
region: Zangilan, Azerbaijan, green
wait: 400ms
region: Qubadli, Azerbaijan, green
wait: 400ms

bubble: 40, 35, "Southern districts fall first...", green
wait: 3s
remove: last

# Then east
region: Agdam, Azerbaijan, green
wait: 400ms
region: Lankaran, Azerbaijan, green
wait: 400ms

bubble: 40, 35, "Eastern flank collapses...", green
wait: 3s
remove: last

# Finally Lachin corridor
region: Lachin, Azerbaijan, green
wait: 400ms
region: Kalbajar, Azerbaijan, green
wait: 1s

bubble: 40, 35, "Lachin corridor cut. Armenians trapped.", green
wait: 4s
remove: last

bubble: 40, 35, "November 10: Ceasefire. All buffer zones reconquered.", white
wait: 4s
remove: last

fly: 40, 46.5, 6.5
wait: 2s

bubble: 40, 50, "But Nagorno-Karabakh core remains Armenian (purple stripes)", purple
wait: 4s
remove: last

# ═══════════════════════════════════════════════════════════
# 2023 - FINAL OFFENSIVE
# ═══════════════════════════════════════════════════════════

year: "2023", highlight
wait: 1s

bubble: 40, 50, "September 19: Azerbaijan launches final assault", red
wait: 4s
remove: last

bubble: 40, 50, "Karabakh falls in 24 hours. No resistance.", red
wait: 4s
remove: last

# Final reconquest - Karabakh core
region: Shusha, Azerbaijan, green
wait: 300ms
region: Khojaly, Azerbaijan, green
wait: 300ms
region: Khojavend, Azerbaijan, green
wait: 300ms
region: Hadrut, Azerbaijan, green
wait: 300ms
region: Askeran, Azerbaijan, green
wait: 2s

bubble: 40, 50, "120,000 Armenians flee. Total ethnic cleansing.", red
wait: 5s
remove: last

# ═══════════════════════════════════════════════════════════
# AFTERMATH
# ═══════════════════════════════════════════════════════════

fly: 40, 46, 5
wait: 2s

year: "2024"
wait: 1s

bubble: 40, 35, "Conflict resolved by force. Armenia humiliated.", white
wait: 4s
remove: last

bubble: 40, 35, "Nagorno-Karabakh: Armenian for 3000 years. Now zero Armenians.", white
wait: 5s
remove: last

bubble: 40, 35, "Russia watched. Did nothing. Alliance broken.", white
wait: 5s`
    }
};