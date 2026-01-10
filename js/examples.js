/**
 * GGMaps Examples
 */

const EXAMPLES = {
    nato: {
        title: 'NATO Expansion 1949-2024',
        description: 'Complete animated timeline with all 32 members',
        script: `# NATO Expansion 1949-2024

fly: 35, -30, 2
wait: 2s

year: "1949", highlight
bubble: 38, -70, "North Atlantic Treaty signed in Washington D.C."
wait: 3s

usa: purple
canada: purple
uk: purple
france: purple
belgium: purple
netherlands: purple
luxembourg: purple
italy: purple
portugal: purple
iceland: purple
norway: purple
denmark: purple

wait: 2s
remove: last

fly: 50, -10, 3
wait: 1500ms

bubble: 55, -15, "12 founding members unite against Soviet expansion"
wait: 4s
remove: last

year: "1952"
fly: 38, 28, 4
wait: 1500ms

greece: cyan
turkey: cyan

bubble: 38, 32, "Greece & Turkey secure the southern flank"
wait: 4s
remove: last

year: "1955"
fly: 51, 10, 5
wait: 1500ms

bubble: 54, 5, "West Germany rearmed to counter Soviet forces"
wait: 3s
remove: last

region: Schleswig-Holstein, Germany, orange
region: Hamburg, Germany, orange
region: Bremen, Germany, orange
region: Niedersachsen, Germany, orange
region: Nordrhein-Westfalen, Germany, orange
region: Hessen, Germany, orange
region: Rheinland-Pfalz, Germany, orange
region: Saarland, Germany, orange
region: Baden-Württemberg, Germany, orange
region: Bayern, Germany, orange

wait: 2s

fly: 52.5, 13.4, 7
wait: 1500ms

region: Berlin, Germany, gold
bubble: 52.8, 14.5, "West Berlin: NATO island inside East Germany"
wait: 4s
remove: last

year: "1982"
fly: 40, -4, 4
wait: 1500ms

spain: orange
bubble: 40, 0, "Spain joins after Franco dictatorship ends"
wait: 4s
remove: last

year: "1990"
fly: 52, 12, 5
wait: 1500ms

bubble: 54, 15, "Berlin Wall falls. Germany reunifies."
wait: 3s
remove: last

region: Mecklenburg-Vorpommern, Germany, gold
region: Brandenburg, Germany, gold
region: Sachsen-Anhalt, Germany, gold
region: Thüringen, Germany, gold
region: Sachsen, Germany, gold
region: Berlin, Germany, gold

bubble: 51, 15, "East Germany joins through reunification"
wait: 4s
remove: last

year: "1999"
fly: 50, 18, 4
wait: 1500ms

bubble: 53, 22, "First former Warsaw Pact nations join"
wait: 3s
remove: last

poland: pink
czechia: pink
hungary: pink

bubble: 49, 22, "Russia protests but cannot stop it"
wait: 4s
remove: last

year: "2004"
fly: 55, 22, 4
wait: 1500ms

bubble: 62, 15, "Big Bang: 7 nations join at once"
wait: 3s
remove: last

estonia: blue
latvia: blue
lithuania: blue
slovakia: blue
slovenia: blue
romania: blue
bulgaria: blue

fly: 50, 22, 4
wait: 1500ms

bubble: 46, 28, "NATO now borders Russia directly"
wait: 4s
remove: last

year: "2009"
fly: 42, 18, 5
wait: 1500ms

albania: pink
croatia: pink

bubble: 43, 15, "Western Balkans begin joining"
wait: 4s
remove: last

year: "2017"
fly: 42.5, 19, 6
wait: 1500ms

montenegro: pink
bubble: 43.5, 21, "Montenegro joins despite Russian pressure"
wait: 4s
remove: last

year: "2020"
fly: 41.5, 22, 6
wait: 1500ms

north macedonia: pink
bubble: 41, 24, "North Macedonia finally joins"
wait: 4s
remove: last

year: "2022", highlight
fly: 49, 32, 4
wait: 1500ms

bubble: 48, 36, "Russia invades Ukraine"
wait: 4s
remove: last

year: "2023", highlight
fly: 64, 26, 4
wait: 1500ms

finland: red
bubble: 65, 30, "Finland ends 80 years of neutrality"
wait: 4s
remove: last

year: "2024", highlight
fly: 62, 16, 4
wait: 1500ms

sweden: red
bubble: 63, 12, "Sweden ends 200 years of neutrality"
wait: 4s
remove: last

fly: 55, 10, 3
wait: 2s

bubble: 50, -15, "From 12 to 32 members in 75 years"
wait: 5s`
    }
};