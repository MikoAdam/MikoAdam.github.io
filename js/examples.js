/**
 * Examples - NO OVERLAP VERSION
 */

const EXAMPLES = {
    armenia: {
        title: '🔥 Armenia vs Azerbaijan',
        description: 'Nagorno-Karabakh conflict 1988-2023',
        script: `# NAGORNO-KARABAKH CONFLICT

fly: 40, 46, 5
wait: 2s

year: "1988"
wait: 1s
bubble: 38, 34, "Soviet Union begins to collapse. Ethnic tensions explode.", white
wait: 4s
remove: last

armenia: blue
wait: 500ms
azerbaijan: green
wait: 2s

bubble: 38, 34, "Two Soviet republics, ancient enemies, modern conflict", white
wait: 4s
remove: last

fly: 40, 46.5, 6.5
wait: 2s

bubble: 40, 51, "Nagorno-Karabakh: 95% Armenian, inside Azerbaijan", purple
wait: 5s
remove: last

year: "1991"
wait: 1s
bubble: 40, 51, "Both declare independence. War begins immediately.", red
wait: 4s
remove: last

year: "1992"
wait: 1s

bubble: 40, 51, "Armenia invades Karabakh and surrounding areas", red
wait: 4s
remove: last

bubble: 40, 51, "Brutal ethnic cleansing on both sides", red
wait: 4s
remove: last

year: "1994"
wait: 1s

fly: 40, 46, 5.5
wait: 2s

bubble: 38, 34, "Ceasefire. Armenia wins decisively.", white
wait: 3s
remove: last

bubble: 38, 34, "30,000 dead. 1 million refugees.", red
wait: 4s
remove: last

bubble: 38, 34, "Armenia seizes Nagorno-Karabakh proper...", purple
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

bubble: 38, 34, "...plus 8 surrounding districts as buffer zones", blue
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

bubble: 38, 34, "20% of Azerbaijan now under Armenian control", white
wait: 4s
remove: last

year: "2016"
wait: 1s
bubble: 38, 34, "Frozen conflict. Occasional border clashes.", white
wait: 4s
remove: last

year: "2020", highlight
wait: 1s

bubble: 38, 34, "September 27: Azerbaijan launches surprise offensive", red
wait: 3s
remove: last

bubble: 38, 34, "Turkish drones massacre Armenian positions", red
wait: 4s
remove: last

bubble: 38, 34, "44 days of warfare. Armenia collapses.", red
wait: 4s
remove: last

bubble: 38, 34, "Azerbaijan recaptures buffer districts one by one...", green
wait: 3s
remove: last

region: Jabrayil, Azerbaijan, green
wait: 400ms
region: Fuzuli, Azerbaijan, green
wait: 400ms
region: Zangilan, Azerbaijan, green
wait: 400ms
region: Qubadli, Azerbaijan, green
wait: 400ms

bubble: 38, 34, "Southern districts fall first...", green
wait: 3s
remove: last

region: Agdam, Azerbaijan, green
wait: 400ms
region: Lankaran, Azerbaijan, green
wait: 400ms

bubble: 38, 34, "Eastern flank collapses...", green
wait: 3s
remove: last

region: Lachin, Azerbaijan, green
wait: 400ms
region: Kalbajar, Azerbaijan, green
wait: 1s

bubble: 38, 34, "Lachin corridor cut. Armenians trapped.", green
wait: 4s
remove: last

bubble: 38, 34, "November 10: Ceasefire. All buffer zones reconquered.", white
wait: 4s
remove: last

fly: 40, 46.5, 6.5
wait: 2s

bubble: 40, 51, "But Nagorno-Karabakh core remains Armenian", purple
wait: 4s
remove: last

year: "2023", highlight
wait: 1s

bubble: 40, 51, "September 19: Azerbaijan launches final assault", red
wait: 4s
remove: last

bubble: 40, 51, "Karabakh falls in 24 hours. No resistance.", red
wait: 4s
remove: last

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

bubble: 40, 51, "120,000 Armenians flee. Total ethnic cleansing.", red
wait: 5s
remove: last

fly: 40, 46, 5
wait: 2s

year: "2024"
wait: 1s

bubble: 38, 34, "Conflict resolved by force. Armenia humiliated.", white
wait: 4s
remove: last

bubble: 38, 34, "Nagorno-Karabakh: Armenian for 3000 years. Now zero.", white
wait: 5s
remove: last

bubble: 38, 34, "Russia watched. Did nothing. Alliance broken.", white
wait: 5s`
    }
};