// ==UserScript==
// @name         Marvel Rivals Better Game Stats Table
// @namespace    http://tampermonkey.net/
// @version      2025-06-25
// @description  Shows additional tables and stats in the match stats view.
// @author       You
// @match        https://tracker.gg/marvel-rivals/profile/ign/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tracker.gg
// @grant        none
// ==/UserScript==
function getUsernameFromCurrentUrl() {
    // Split the pathname into parts and remove empty strings
    const pathParts = window.location.pathname.split('/').filter(Boolean);

    // Find the position of 'profile' in the path
    const profileIndex = pathParts.indexOf('profile');

    // Username should be two positions after 'profile'
    if (profileIndex !== -1 && profileIndex + 2 < pathParts.length) {
        return pathParts[profileIndex + 2];
    }

    return null;
}

// Usage:
const thisUser = getUsernameFromCurrentUrl();
console.log('Current username:', thisUser);

// Taken from: https://rivalstracker.com/heroes/stats
var heroDetails = [
    {
        "name": "The Punisher",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1014001.png",
        "damagePerMinute": "2.158/min",
        "damageTankedPerMinute": "1.268/min",
        "kills": "19.4/match",
        "deaths": "6.4/match",
        "assists": "0.2/match",
        "kdaRatio": "3.08",
        "playTime": "1846h played"
    },
    {
        "name": "Moon Knight",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1030001.png",
        "damagePerMinute": "2.139/min",
        "damageTankedPerMinute": "837/min",
        "kills": "16.1/match",
        "deaths": "5.8/match",
        "assists": "0.2/match",
        "kdaRatio": "2.83",
        "playTime": "162h played"
    },
    {
        "name": "Human Torch",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1017001.png",
        "damagePerMinute": "2.006/min",
        "damageTankedPerMinute": "749/min",
        "kills": "20.4/match",
        "deaths": "5.5/match",
        "assists": "0.1/match",
        "kdaRatio": "3.76",
        "playTime": "723h played"
    },
    {
        "name": "Squirrel Girl",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1032001.png",
        "damagePerMinute": "1.990/min",
        "damageTankedPerMinute": "755/min",
        "kills": "16.1/match",
        "deaths": "5.7/match",
        "assists": "5.2/match",
        "kdaRatio": "3.72",
        "playTime": "291h played"
    },
    {
        "name": "Storm",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1015001.png",
        "damagePerMinute": "1.950/min",
        "damageTankedPerMinute": "944/min",
        "kills": "21.6/match",
        "deaths": "6.7/match",
        "assists": "16.4/match",
        "kdaRatio": "5.70",
        "playTime": "561h played"
    },
    {
        "name": "Iron Man",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1034001.png",
        "damagePerMinute": "1.862/min",
        "damageTankedPerMinute": "836/min",
        "kills": "19.2/match",
        "deaths": "6.2/match",
        "assists": "0.2/match",
        "kdaRatio": "3.12",
        "playTime": "945h played"
    },
    {
        "name": "Winter Soldier",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1041001.png",
        "damagePerMinute": "1.814/min",
        "damageTankedPerMinute": "1.154/min",
        "kills": "17.0/match",
        "deaths": "5.7/match",
        "assists": "11.5/match",
        "kdaRatio": "5.02",
        "playTime": "1536h played"
    },
    {
        "name": "Namor",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1045001.png",
        "damagePerMinute": "1.773/min",
        "damageTankedPerMinute": "733/min",
        "kills": "16.6/match",
        "deaths": "4.8/match",
        "assists": "0.7/match",
        "kdaRatio": "3.62",
        "playTime": "270h played"
    },
    {
        "name": "Star Lord",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1043001.png",
        "damagePerMinute": "1.721/min",
        "damageTankedPerMinute": "824/min",
        "kills": "19.7/match",
        "deaths": "6.1/match",
        "assists": "0.1/match",
        "kdaRatio": "3.27",
        "playTime": "716h played"
    },
    {
        "name": "Hela",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1024001.png",
        "damagePerMinute": "1.703/min",
        "damageTankedPerMinute": "714/min",
        "kills": "18.1/match",
        "deaths": "6.2/match",
        "assists": "1.2/match",
        "kdaRatio": "3.11",
        "playTime": "2351h played"
    },
    {
        "name": "Mister Fantastic",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1040001.png",
        "damagePerMinute": "1.682/min",
        "damageTankedPerMinute": "1.948/min",
        "kills": "17.0/match",
        "deaths": "5.5/match",
        "assists": "4.5/match",
        "kdaRatio": "3.89",
        "playTime": "396h played"
    },
    {
        "name": "Emma Frost",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1053001.png",
        "damagePerMinute": "1.678/min",
        "damageTankedPerMinute": "2.728/min",
        "kills": "17.6/match",
        "deaths": "5.0/match",
        "assists": "3.9/match",
        "kdaRatio": "4.28",
        "playTime": "4151h played"
    },
    {
        "name": "Groot",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1027001.png",
        "damagePerMinute": "1.648/min",
        "damageTankedPerMinute": "4.248/min",
        "kills": "15.7/match",
        "deaths": "4.7/match",
        "assists": "2.5/match",
        "kdaRatio": "3.88",
        "playTime": "686h played"
    },
    {
        "name": "Psylocke",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1048001.png",
        "damagePerMinute": "1.583/min",
        "damageTankedPerMinute": "732/min",
        "kills": "20.4/match",
        "deaths": "6.0/match",
        "assists": "0.1/match",
        "kdaRatio": "3.45",
        "playTime": "1670h played"
    },
    {
        "name": "Scarlet Witch",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1038001.png",
        "damagePerMinute": "1.566/min",
        "damageTankedPerMinute": "757/min",
        "kills": "17.7/match",
        "deaths": "5.5/match",
        "assists": "0.5/match",
        "kdaRatio": "3.32",
        "playTime": "100h played"
    },
    {
        "name": "Hawkeye",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1021001.png",
        "damagePerMinute": "1.547/min",
        "damageTankedPerMinute": "879/min",
        "kills": "16.7/match",
        "deaths": "6.4/match",
        "assists": "6.2/match",
        "kdaRatio": "3.57",
        "playTime": "675h played"
    },
    {
        "name": "Thor",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1039001.png",
        "damagePerMinute": "1.544/min",
        "damageTankedPerMinute": "2.206/min",
        "kills": "15.8/match",
        "deaths": "5.9/match",
        "assists": "1.9/match",
        "kdaRatio": "3.01",
        "playTime": "292h played"
    },
    {
        "name": "Magneto",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1037001.png",
        "damagePerMinute": "1.528/min",
        "damageTankedPerMinute": "3.029/min",
        "kills": "15.7/match",
        "deaths": "4.9/match",
        "assists": "2.7/match",
        "kdaRatio": "3.76",
        "playTime": "6020h played"
    },
    {
        "name": "Magik",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1029001.png",
        "damagePerMinute": "1.478/min",
        "damageTankedPerMinute": "920/min",
        "kills": "17.7/match",
        "deaths": "6.6/match",
        "assists": "0.1/match",
        "kdaRatio": "2.68",
        "playTime": "531h played"
    },
    {
        "name": "Doctor Strange",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1018001.png",
        "damagePerMinute": "1.448/min",
        "damageTankedPerMinute": "3.404/min",
        "kills": "15.0/match",
        "deaths": "4.7/match",
        "assists": "1.6/match",
        "kdaRatio": "3.54",
        "playTime": "1359h played"
    },
    {
        "name": "The Thing",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1051001.png",
        "damagePerMinute": "1.417/min",
        "damageTankedPerMinute": "2.868/min",
        "kills": "12.3/match",
        "deaths": "4.2/match",
        "assists": "5.2/match",
        "kdaRatio": "4.17",
        "playTime": "215h played"
    },
    {
        "name": "Black Widow",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1033001.png",
        "damagePerMinute": "1.395/min",
        "damageTankedPerMinute": "682/min",
        "kills": "17.3/match",
        "deaths": "6.3/match",
        "assists": "2.2/match",
        "kdaRatio": "3.10",
        "playTime": "431h played"
    },
    {
        "name": "Venom",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1035001.png",
        "damagePerMinute": "1.349/min",
        "damageTankedPerMinute": "2.854/min",
        "kills": "15.1/match",
        "deaths": "4.6/match",
        "assists": "3.7/match",
        "kdaRatio": "4.11",
        "playTime": "408h played"
    },
    {
        "name": "Peni Parker",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1042001.png",
        "damagePerMinute": "1.314/min",
        "damageTankedPerMinute": "2.386/min",
        "kills": "14.2/match",
        "deaths": "4.4/match",
        "assists": "2.7/match",
        "kdaRatio": "3.81",
        "playTime": "492h played"
    },
    {
        "name": "Wolverine",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1049001.png",
        "damagePerMinute": "1.310/min",
        "damageTankedPerMinute": "1.431/min",
        "kills": "15.2/match",
        "deaths": "4.9/match",
        "assists": "3.5/match",
        "kdaRatio": "3.82",
        "playTime": "1347h played"
    },
    {
        "name": "Iron Fist",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1052001.png",
        "damagePerMinute": "1.249/min",
        "damageTankedPerMinute": "1.153/min",
        "kills": "16.0/match",
        "deaths": "5.8/match",
        "assists": "0.1/match",
        "kdaRatio": "2.78",
        "playTime": "467h played"
    },
    {
        "name": "Ultron",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1028001.png",
        "damagePerMinute": "1.247/min",
        "healPerMinute": "1.513/min",
        "damageTankedPerMinute": "759/min",
        "kills": "16.6/match",
        "deaths": "5.1/match",
        "assists": "19.5/match",
        "kdaRatio": "7.16",
        "playTime": "2613h played"
    },
    {
        "name": "Black Panther",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1026001.png",
        "damagePerMinute": "1.168/min",
        "damageTankedPerMinute": "716/min",
        "kills": "14.9/match",
        "deaths": "6.5/match",
        "assists": "0.1/match",
        "kdaRatio": "2.29",
        "playTime": "795h played"
    },
    {
        "name": "Captain America",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1022001.png",
        "damagePerMinute": "1.107/min",
        "damageTankedPerMinute": "2.314/min",
        "kills": "14.4/match",
        "deaths": "4.3/match",
        "assists": "2.8/match",
        "kdaRatio": "3.97",
        "playTime": "598h played"
    },
    {
        "name": "Hulk",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1011001.png",
        "damagePerMinute": "1.096/min",
        "damageTankedPerMinute": "2.849/min",
        "kills": "12.7/match",
        "deaths": "3.9/match",
        "assists": "3.6/match",
        "kdaRatio": "4.19",
        "playTime": "564h played"
    },
    {
        "name": "Adam Warlock",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1046001.png",
        "damagePerMinute": "991/min",
        "healPerMinute": "1.331/min",
        "damageTankedPerMinute": "885/min",
        "kills": "11.8/match",
        "deaths": "6.2/match",
        "assists": "10.1/match",
        "kdaRatio": "3.53",
        "playTime": "461h played"
    },
    {
        "name": "Spider Man",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1036001.png",
        "damagePerMinute": "936/min",
        "damageTankedPerMinute": "619/min",
        "kills": "17.2/match",
        "deaths": "7.5/match",
        "assists": "3.8/match",
        "kdaRatio": "2.81",
        "playTime": "1113h played"
    },
    {
        "name": "Jeff The Land Shark",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1047001.png",
        "damagePerMinute": "822/min",
        "healPerMinute": "1.846/min",
        "damageTankedPerMinute": "615/min",
        "kills": "14.5/match",
        "deaths": "5.2/match",
        "assists": "19.5/match",
        "kdaRatio": "6.57",
        "playTime": "1234h played"
    },
    {
        "name": "Mantis",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1020001.png",
        "damagePerMinute": "820/min",
        "healPerMinute": "1.401/min",
        "damageTankedPerMinute": "789/min",
        "kills": "11.0/match",
        "deaths": "5.6/match",
        "assists": "25.1/match",
        "kdaRatio": "6.49",
        "playTime": "626h played"
    },
    {
        "name": "Loki",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1016001.png",
        "damagePerMinute": "672/min",
        "healPerMinute": "2.414/min",
        "damageTankedPerMinute": "653/min",
        "kills": "10.5/match",
        "deaths": "4.8/match",
        "assists": "20.1/match",
        "kdaRatio": "6.40",
        "playTime": "2849h played"
    },
    {
        "name": "Invisible Woman",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1050001.png",
        "damagePerMinute": "639/min",
        "healPerMinute": "2.261/min",
        "damageTankedPerMinute": "1.167/min",
        "kills": "11.1/match",
        "deaths": "4.7/match",
        "assists": "18.7/match",
        "kdaRatio": "6.36",
        "playTime": "2613h played"
    },
    {
        "name": "Cloak & Dagger",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1025001.png",
        "damagePerMinute": "634/min",
        "healPerMinute": "2.477/min",
        "damageTankedPerMinute": "685/min",
        "kills": "11.4/match",
        "deaths": "5.0/match",
        "assists": "20.9/match",
        "kdaRatio": "6.42",
        "playTime": "1336h played"
    },
    {
        "name": "Luna Snow",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1031001.png",
        "damagePerMinute": "556/min",
        "healPerMinute": "2.599/min",
        "damageTankedPerMinute": "766/min",
        "kills": "9.8/match",
        "deaths": "5.1/match",
        "assists": "18.5/match",
        "kdaRatio": "5.59",
        "playTime": "6083h played"
    },
    {
        "name": "Rocket Raccoon",
        "imageUrl": "https://rivalstracker.com/_ipx/s_40x40/images/heroes/SelectHero/img_selecthero_1023001.png",
        "damagePerMinute": "145/min",
        "healPerMinute": "2.177/min",
        "damageTankedPerMinute": "431/min",
        "kills": "4.2/match",
        "deaths": "3.7/match",
        "assists": "21.6/match",
        "kdaRatio": "7.07",
        "playTime": "2988h played"
    }
]

/**
 * @typedef {object} Player
 * @property {number} damage - The amount of damage dealt by the player.
 * @property {number} blocked - The amount of damage blocked by the player.
 * @property {number} healing - The amount of healing done by the player.
 * @property {number} kills - The number of kills by the player.
 * @property {number} deaths - The number of deaths of the player.
 * @property {number} assists - The number of assists by the player.
 * @property {string} name - The name of the player.
 * @property {string} [hero] - The hero played by the player (optional).
 * @property {string} [rank] - The rank of the player (optional).
 * @property {string} [KDA] - The Kill/Death/Assist ratio of the player (optional).
 * @property {number} [killsSolo] - The number of solo kills (optional).
 * @property {number} [killsHead] - The number of headshot kills (optional).
 * @property {number} [killsLastHit] - The number of last hit kills (optional).
 * @property {number} [accuracy] - The accuracy of the player (optional).
 * @property {HTMLTableElement} [table] - The HTML table element the player data came from (optional).
 * @property {string} [team] - The team the player belongs to (optional).
 */

function determineStatType(player) {
    const highestStat = Math.max(player.damage, player.blocked, player.healing);
    return highestStat === player.damage
        ? "damage"
        : highestStat === player.blocked
            ? "blocked"
            : "healing";
}

function determineStatTypeSecondary(player) {
    const highestStat = Math.max(player.kills, player.deaths, player.assists);
    return highestStat === player.kills
        ? "kills"
        : highestStat === player.deaths
            ? "deaths"
            : "assists";
}

/**
 * Calculate the difference between the highest stat of player1 and the closest stat of player2.
 * @param {Player} player1 - The first player stats object.
 * @param {Player} player2 - The second player stats object.
 * @returns {Object} An object with the differences in damage, blocked, and healing, and the most relevant difference.
 */
function calculateStatDifferences(player1, player2) {
    // Determine the highest stat for player1
    const statTypeP1 = determineStatType(player1)
    const statTypeP2 = determineStatType(player2)
    const statTypeP1Sec = determineStatTypeSecondary(player1)
    const statTypeP2Sec = determineStatTypeSecondary(player2)

    // Find the closest corresponding stat in player2
    const statDiffs = {
        damageDiff: player1.damage - player2.damage,
        blockedDiff: player1.blocked - player2.blocked,
        healingDiff: player1.healing - player2.healing,
        killsDiff: player1.kills - player2.kills,
        deathsDiff: player1.deaths - player2.deaths,
        assistsDiff: player1.assists - player2.assists,
        // Add percentage differences
        damageDiffPercent: player2.damage == 0 && player1.damage == 0 ? 0 : player2.damage !== 0 ? ((player1.damage - player2.damage) / player2.damage * 100) : 100,
        blockedDiffPercent: player2.blocked == 0 && player1.blocked == 0 ? 0 : player2.blocked !== 0 ? ((player1.blocked - player2.blocked) / player2.blocked * 100) : 100,
        healingDiffPercent: player2.healing == 0 && player1.healing == 0 ? 0 : player2.healing !== 0 ? ((player1.healing - player2.healing) / player2.healing * 100) : 100,
        killsDiffPercent: player2.kills == 0 && player1.kills == 0 ? 0 : player2.kills !== 0 ? ((player1.kills - player2.kills) / player2.kills * 100) : 100,
        deathsDiffPercent: player2.deaths == 0 && player1.deaths == 0 ? 0 : player2.deaths !== 0 ? ((player1.deaths - player2.deaths) / player2.deaths * 100) : 100,
        assistsDiffPercent: player2.assists == 0 && player1.assists == 0 ? 0 : player2.assists !== 0 ? ((player1.assists - player2.assists) / player2.assists * 100) : 100,
    };

    // Get the relevant stat difference based on player1's highest stat
    const relevantDiff = statDiffs[`${statTypeP1}Diff`];
    const relevantDiffSec = statDiffs[`${statTypeP1Sec}Diff`];

    // Find the closest corresponding stat in player2
    const statDiffsAbs = {
        damageDiffAbs: Math.abs(player1.damage - player2.damage),
        blockedDiffAbs: Math.abs(player1.blocked - player2.blocked),
        healingDiffAbs: Math.abs(player1.healing - player2.healing),
        killsDiffAbs: Math.abs(player1.kills - player2.kills),
        deathsDiffAbs: Math.abs(player1.deaths - player2.deaths),
        assistsDiffAbs: Math.abs(player1.assists - player2.assists),
    };

    // Get the relevant stat difference based on player1's highest stat
    const relevantDiffAbs = statDiffsAbs[`${statTypeP1}DiffAbs`];
    const relevantDiffAbsSec = statDiffsAbs[`${statTypeP1Sec}DiffAbs`];

    return {
        ...statDiffs,
        relevantDiff,
        relevantDiffSec,
        totalDiff: statDiffs.damageDiff + statDiffs.blockedDiff + statDiffs.healingDiff, // Total difference
        totalDiffPercent: statDiffs.damageDiffPercent + statDiffs.blockedDiffPercent + statDiffs.healingDiffPercent,
        totalDiffSec: statDiffs.killsDiff + statDiffs.assistsDiff, // statDiffs.deathsDiff
        totalDiffSecPercent: statDiffs.killsDiffPercent + statDiffs.assistsDiffPercent, // statDiffs.deathsDiff

        ...statDiffsAbs,
        relevantDiffAbs, // Most relevant difference
        relevantDiffAbsSec,
        totalDiffAbs: statDiffsAbs.damageDiffAbs + statDiffsAbs.blockedDiffAbs + statDiffsAbs.healingDiffAbs, // Total difference
        totalDiffAbsSec: statDiffsAbs.killsDiffAbs + statDiffsAbs.assistsDiffAbs, // statDiffsAbs.deathsDiffAbs
        statTypeP1,
        statTypeP1Sec,
        statTypeP2, // Type of the highest stat
        statTypeP2Sec,
    };
}

/**
 * @param {Player} player1 - The first player stats object.
 * @param {number} matchDurationSeconds - Duration of the match in seconds.
 * @returns {Object} Top 500 player with adjusted stats.
 */
function getTop500Player(player1, matchDurationSeconds) {
    let heroAliases = [player1.hero, player1.hero.replace(" ", "-"), player1.hero.replace("-", " ")];
    let hero = heroDetails.find(hero => heroAliases.includes(hero.name));

    let heroDmg = hero["damagePerMinute"];
    let heroBlock = hero["damageTankedPerMinute"];
    let heroHeal = hero["healPerMinute"];
    let heroKills = hero["kills"];
    let heroDeaths = hero["deaths"];
    let heroAssists = hero["assists"];

    console.log(player1.hero + ": ", heroDmg, heroBlock, heroHeal);

    // Whole numbers/integers, thus remove the "."
    let dmgPerMin = heroDmg ? parseInt(heroDmg.replace(/[^0-9]/g, "")) : 0;
    let blockedPerMin = heroBlock ? parseInt(heroBlock.replace(/[^0-9]/g, "")) : 0;
    let healPerMin = heroHeal ? parseInt(heroHeal.replace(/[^0-9]/g, "")) : 0;

    // Actual fraction numbers, thus do not remove the "." or ",", but then we round up to get an integer
    let killsPerMatch = heroKills ? Math.ceil(parseFloat(heroKills.replace(/[^0-9.,]/g, ""))) : 0;
    let deathsPerMatch = heroDeaths ? Math.ceil(parseFloat(heroDeaths.replace(/[^0-9.,]/g, ""))) : 0;
    let assistsPerMatch = heroAssists ? Math.ceil(parseFloat(heroAssists.replace(/[^0-9.,]/g, ""))) : 0;

    console.log(player1.hero + ": " + dmgPerMin + " " + blockedPerMin + " " + healPerMin);

    /** @type {Player} */
    let player2 = {
        name: "Avg. Top " + heroAliases[0],
        hero: heroAliases[0],
        damage: parseInt("" + ((dmgPerMin / 60.0) * matchDurationSeconds)),
        blocked: parseInt("" + ((blockedPerMin / 60.0) * matchDurationSeconds)),
        healing: parseInt("" + ((healPerMin / 60.0) * matchDurationSeconds)),
        kills: killsPerMatch,
        deaths: deathsPerMatch,
        assists: assistsPerMatch,
        kdaRatio: deathsPerMatch === 0 ? '∞' : ((killsPerMatch + assistsPerMatch) / deathsPerMatch).toFixed(2),
        playTime: hero["playTime"] || "Unknown",
    };

    return player2;
}


/**
 * Find the best pairs of players from two teams based on the closest stat comparison.
 * @param {Player[]} team1 - An array of player stats for team 1.
 * @param {Player[]} team2 - An array of player stats for team 2.
 * @returns {Array} An array of player pairs with their stat differences.
 */
function compareTeams(team1, team2, forceSameHeroes = false) {
    const pairs = [];
    const usedTeam1 = new Set(); // Track used players from Team 1
    const usedTeam2 = new Set(); // Track used players from Team 2

    // While we have unpaired players and fewer than 5 pairs
    while (pairs.length < 6) {
        let bestPair = null;
        let bestPairIndex1 = -1;
        let bestPairIndex2 = -1;

        // Iterate over all player combinations
        for (let i = 0; i < team1.length; i++) {
            if (usedTeam1.has(i)) continue; // Skip used players from Team 1
            let p1Type = determineStatType(team1[i])

            let found = false;
            let ignoreType = false;
            while (!found) {
                for (let j = 0; j < team2.length; j++) {
                    if (usedTeam2.has(j)) continue; // Skip used players from Team 2

                    const player1 = team1[i];
                    const player2 = team2[j];

                    if (forceSameHeroes) {
                        if (player1.hero == null || player1.hero == "" || player2.hero == null || player2.hero == "")
                            throw Error("Player1 or Player2 has null/empty hero field!")
                        if (player1.hero != player2.hero) continue;
                    }
                    if (!ignoreType && determineStatType(team2[j]) != p1Type) continue; // Try to find enemy players with same type first
                    found = true;

                    const statDiffs = calculateStatDifferences(player1, player2);

                    if (
                        !bestPair ||
                        statDiffs.relevantDiffAbs < bestPair.relevantDiffAbs // Prioritize the closest match
                    ) {
                        bestPair = {
                            player1: player1,
                            player2: player2,
                            ...statDiffs,
                        };
                        bestPairIndex1 = i;
                        bestPairIndex2 = j;
                    }
                }
                if (!found) ignoreType = true; // Ignore type if one full loop failed
            }
        }

        // Add the best pair and mark players as used
        if (bestPair) {
            pairs.push(bestPair);
            usedTeam1.add(bestPairIndex1);
            usedTeam2.add(bestPairIndex2);
        }
    }

    return pairs;
}

function compareTeamsSecondary(team1, team2) {
    const pairs = [];
    const usedTeam1 = new Set(); // Track used players from Team 1
    const usedTeam2 = new Set(); // Track used players from Team 2

    // While we have unpaired players and fewer than 5 pairs
    while (pairs.length < 6) {
        let bestPair = null;
        let bestPairIndex1 = -1;
        let bestPairIndex2 = -1;

        // Iterate over all player combinations
        for (let i = 0; i < team1.length; i++) {
            if (usedTeam1.has(i)) continue; // Skip used players from Team 1
            let p1Type = determineStatTypeSecondary(team1[i])

            let found = false;
            let ignoreType = false;
            while (!found) {
                for (let j = 0; j < team2.length; j++) {
                    if (usedTeam2.has(j)) continue; // Skip used players from Team 2
                    if (!ignoreType && determineStatTypeSecondary(team2[j]) != p1Type) continue; // Try to find enemy players with same type first
                    found = true;

                    const player1 = team1[i];
                    const player2 = team2[j];
                    const statDiffs = calculateStatDifferences(player1, player2);

                    if (
                        !bestPair ||
                        statDiffs.relevantDiffAbsSec < bestPair.relevantDiffAbsSec // Prioritize the closest match
                    ) {
                        bestPair = {
                            player1: player1,
                            player2: player2,
                            ...statDiffs,
                        };
                        bestPairIndex1 = i;
                        bestPairIndex2 = j;
                    }
                }
                if (!found) ignoreType = true; // Ignore type if one full loop failed
            }
        }

        // Add the best pair and mark players as used
        if (bestPair) {
            pairs.push(bestPair);
            usedTeam1.add(bestPairIndex1);
            usedTeam2.add(bestPairIndex2);
        }
    }

    return pairs;
}


/**
 * Return table with the most similar player comparisons, sorted by lowest totalDiff first.
 * @param {Array} pairs - The array of player comparison objects.
 * @returns {HTMLTableElement} A table element representing the sorted player comparisons.
 */
function getComparisonTable(pairs) {
    // Create a copy of pairs and sort it by lowest totalDiff
    const sortedPairs = [...pairs].sort((a, b) => b.totalDiff - a.totalDiff);

    const generateSummary = (pair, index) => {
        const position = index + 1;
        const positionSuffix = ['st', 'nd', 'rd'][position - 1] || 'th';
        return `${pair.player1.name} ranked ${position}${positionSuffix}, and compared to ${pair.player2.name} had a diff of ${sPlus(pair.damageDiff)} damage, ${sPlus(pair.blockedDiff)} block and ${sPlus(pair.healingDiff)} healing.`;
    };

    const table = document.createElement('table');
    table.id = "cssTable";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Copy</th>
                <th>Total Diff</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>💥</th>
                <th>🛡️</th>
                <th>💚</th>
            </tr>
        </thead>
        <tbody>
            ${sortedPairs.map((pair, index) => `
                <tr>
                    <td>
                        <button class="copy-button" data-summary="${encodeURIComponent(generateSummary(pair, index))}">
                            📋
                        </button>
                    </td>
                    <td>${sPlus(s(pair.totalDiff))}</td>
                    <td>${pair.player1.name} <small>${pair.statTypeP1}</small></td>
                    <td>${pair.player2.name} <small>${pair.statTypeP2}</small></td>
                    <td>${sPlus(s(pair.damageDiff))} | <small>${sPercent(pair.damageDiffPercent)}</small></td>
                    <td>${sPlus(s(pair.blockedDiff))} | <small>${sPercent(pair.blockedDiffPercent)}</small></td>
                    <td>${sPlus(s(pair.healingDiff))} | <small>${sPercent(pair.healingDiffPercent)}</small></td>
                </tr>`).join('')}
        </tbody>
        <style>
        #cssTable td
{
    text-align: center;
    vertical-align: middle;
}
        </style>
    `;

    registerCopyBtns(table);

    return table;
}

function getComparisonTableSec(pairs) {
    // Create a copy of pairs and sort it by lowest totalDiff
    const sortedPairs = [...pairs].sort((a, b) => b.totalDiffSec - a.totalDiffSec);

    // Function to generate human-readable summary
    const generateSummary = (pair, index) => {
        const position = index + 1;
        const positionSuffix = ['st', 'nd', 'rd'][position - 1] || 'th';
        return `${pair.player1.name} ranked ${position}${positionSuffix}, and compared to ${pair.player2.name} had a diff of ${sPlus(pair.killsDiff)} kills, ${sPlus(pair.deathsDiff)} deaths and ${sPlus(pair.assistsDiff)} assists.`;
    };

    const table = document.createElement('table');
    table.id = "cssTable";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Copy</th>
                <th>Total Diff</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>🔫</th>
                <th>💀</th>
                <th>⚔️</th>
            </tr>
        </thead>
        <tbody>
            ${sortedPairs.map((pair, index) => `
                <tr>
                    <td>
                        <button class="copy-button" data-summary="${encodeURIComponent(generateSummary(pair, index))}">
                            📋
                        </button>
                    </td>
                    <td>${sPlus(s(pair.totalDiffSec))}</td>
                    <td>${pair.player1.name} <small>${pair.statTypeP1Sec}</small></td>
                    <td>${pair.player2.name} <small>${pair.statTypeP2Sec}</small></td>
                    <td>${sPlus(s(pair.killsDiff))} | <small>${sPercent(pair.killsDiffPercent)}</small></td>
                    <td>${sPlus(sRev(pair.deathsDiff))} | <small>${sRevPercent(pair.deathsDiffPercent)}</small></td>
                    <td>${sPlus(s(pair.assistsDiff))} | <small>${sPercent(pair.assistsDiffPercent)}</small></td>
                </tr>`).join('')}
        </tbody>
        <style>
        #cssTable td
{
    text-align: center;
    vertical-align: middle;
}
        </style>
    `;

    registerCopyBtns(table);


    return table;
}

function getComparisonTableNormalized(pairs) {
    console.log("HELLO WORLD: ", pairs);

    // Create normalized pairs
    const normalizedPairs = pairs.map((pair, idx) => {
        // Create normalized copies
        const p1 = JSON.parse(JSON.stringify(pair.player1));
        const p2 = JSON.parse(JSON.stringify(pair.player2));
        console.log("HELLO WORLD: ", p1);
        console.log("HELLO WORLD: ", p2);

        // Apply transformations
        [p1, p2].forEach((player, i) => {
            player.kills *= 1000;
            player.assists *= 1000;
        });

        const diff = calculateStatDifferences(p1, p2);
        return {
            ...diff,
            player1: p1,
            player2: p2,
        };
    });

    // Sort by combined score (damage + kills/deaths/assists)
    const sortedPairs = [...normalizedPairs].sort((a, b) =>
        (b.totalDiff + b.totalDiffSec) - (a.totalDiff + a.totalDiffSec)
    );

    // Table generation (similar to previous but with combined scores)
    const table = document.createElement('table');
    table.id = "cssTable";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Copy</th>
                <th>Total Diff</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>🔫</th>
                <th>⚔️</th>
                <th>💥</th>
                <th>🛡️</th>
                <th>💚</th>
            </tr>
        </thead>
        <tbody>
            ${sortedPairs.map((pair, index) => `
                <tr>
                    <td>
                        <button class="copy-button"
                                data-summary="${encodeURIComponent(`Normalized score ${sPlus(s(pair.totalDiff + pair.totalDiffSec))} between ${pair.player1} and ${pair.player2}`)}">
                            📋
                        </button>
                    </td>
                    <td>${sPlus(s(pair.totalDiff + pair.totalDiffSec))}</td>
                    <td>${pair.player1.name} <small>${pair.statTypeP1}</small> <small>${pair.statTypeP1Sec}</small></td>
                    <td>${pair.player2.name} <small>${pair.statTypeP2}</small> <small>${pair.statTypeP2Sec}</small></td>
                    <td>${s(pair.killsDiff)}</td>
                    <td>${s(pair.assistsDiff)}</td>
                    <td>${sPlus(s(pair.damageDiff))}</td>
                    <td>${sPlus(s(pair.blockedDiff))}</td>
                    <td>${sPlus(s(pair.healingDiff))}</td>
                </tr>`).join('')}
        </tbody>
        <style>
        #cssTable td, #cssTable th {
            padding: 6px 10px;
            text-align: center;
            vertical-align: middle;
        }
        #cssTable th {
            position: sticky;
            top: 0;
        }
        </style>
    `;

    registerCopyBtns(table);
    return table;
}

function getComparisonTableEfficiency(pairs) {
    // Format helper - rounds to 1 decimal and removes trailing .0 if needed
    const formatPercent = (value) => {
        const rounded = Math.round(value * 10) / 10;
        return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
    };


    let totalTeam1Damage = 0;
    let totalTeam2Damage = 0;
    pairs.forEach(pair => {
        totalTeam1Damage += pair.player1.damage;
        totalTeam2Damage += pair.player2.damage;
    });

    // Calculate efficiencies for each pair
    const pairsWithEfficiency = pairs.map(pair => {
        // Damage efficiency: 100% if 300 damage per kill (standard)
        const damageEffP1 = pair.player1.kills > 0 ? (300 * pair.player1.kills) / pair.player1.damage * 100 : 0;
        const damageEffP2 = pair.player2.kills > 0 ? (300 * pair.player2.kills) / pair.player2.damage * 100 : 0;
        const damageEffDiff = damageEffP1 - damageEffP2;

        // Blocked efficiency: 100% if blocked all damage taken
        const blockedEffP1 = totalTeam2Damage > 0 ? pair.player1.blocked / totalTeam2Damage * 100 : 0;
        const blockedEffP2 = totalTeam1Damage > 0 ? pair.player2.blocked / totalTeam1Damage * 100 : 0;
        const blockedEffDiff = blockedEffP1 - blockedEffP2;

        // Healing efficiency: 100% if healed all damage taken by team
        // Note: This might need adjustment based on your exact definition
        const healingEffP1 = totalTeam2Damage > 0 ? pair.player1.healing / totalTeam2Damage * 100 : 0;
        const healingEffP2 = totalTeam1Damage > 0 ? pair.player2.healing / totalTeam1Damage * 100 : 0;
        const healingEffDiff = healingEffP1 - healingEffP2;

        // Total efficiency difference (weighted sum if needed)
        const totalEffDiff = damageEffDiff + blockedEffDiff + healingEffDiff;

        // Return with formatted percentages
        return {
            ...pair,
            // Raw values (for sorting/calculations)
            _damageEffP1: damageEffP1,
            _damageEffP2: damageEffP2,
            _blockedEffP1: blockedEffP1,
            _blockedEffP2: blockedEffP2,
            _healingEffP1: healingEffP1,
            _healingEffP2: healingEffP2,
            _totalEffDiff: totalEffDiff,

            // Formatted strings (for display)
            damageEffP1: formatPercent(damageEffP1),
            damageEffP2: formatPercent(damageEffP2),
            damageEffDiff: formatPercent(damageEffDiff),
            blockedEffP1: formatPercent(blockedEffP1),
            blockedEffP2: formatPercent(blockedEffP2),
            blockedEffDiff: formatPercent(blockedEffDiff),
            healingEffP1: formatPercent(healingEffP1),
            healingEffP2: formatPercent(healingEffP2),
            healingEffDiff: formatPercent(healingEffDiff),
            totalEffDiff: formatPercent(totalEffDiff)
        };
    });

    // Sort by raw total efficiency difference (using _totalEffDiff)
    const sortedPairs = [...pairsWithEfficiency].sort((a, b) => b._totalEffDiff - a._totalEffDiff);

    const generateSummary = (pair, index) => {
        const position = index + 1;
        const positionSuffix = ['st', 'nd', 'rd'][position - 1] || 'th';
        return `${pair.player1.name} ranked ${position}${positionSuffix} by efficiency, ` +
            `with ${sPlus(pair.damageEffDiff)}% 💥, ` +
            `${sPlus(pair.blockedEffDiff)}% 🛡️, and ` +
            `${sPlus(pair.healingEffDiff)}% 💚 efficiency ` +
            `difference vs ${pair.player2.name}.`;
    };

    const table = document.createElement('table');
    table.id = "cssTable";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Copy</th>
                <th>Total Eff Diff</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>💥Eff%</th>
                <th>🛡️Eff%</th>
                <th>💚Eff%</th>
            </tr>
        </thead>
        <tbody>
            ${sortedPairs.map((pair, index) => `
                <tr>
                    <td>
                        <button class="copy-button"
                                data-summary="${encodeURIComponent(generateSummary(pair, index))}">
                            📋
                        </button>
                    </td>
                    <td>${sPlus(s(pair.totalEffDiff))}</td>
                    <td>${pair.player1.name} <small>${pair.statTypeP1}</small></td>
                    <td>${pair.player2.name} <small>${pair.statTypeP2}</small></td>
                    <td>${sPlus(s(pair.damageEffDiff))} <small>(${pair.damageEffP1}% vs ${pair.damageEffP2}%)</small></td>
                    <td>${sPlus(s(pair.blockedEffDiff))} <small>(${pair.blockedEffP1}% vs ${pair.blockedEffP2}%)</small></td>
                    <td>${sPlus(s(pair.healingEffDiff))} <small>(${pair.healingEffP1}% vs ${pair.healingEffP2}%)</small></td>
                </tr>`).join('')}
        </tbody>
        <style>
        #cssTable td {
            text-align: center;
            vertical-align: middle;
        }
        small {
            font-size: 0.8em;
            color: #666;
        }
        .copy-button {
            cursor: pointer;
            background: none;
            border: none;
            font-size: 1.2em;
        }
        </style>
    `;

    registerCopyBtns(table);

    return { table: table, sortedPairs: sortedPairs };
}

/**
 * Generate a summary span for the meta comparison.
 * @param {Array} pairs - An array of player pairs with their stat differences.
 * @returns {string} A span element as a string summarizing the total differences and negative diffs.
 */
function getMetaComparisonSpan(pairs, team1, team2) {

    const generateSummary = (totals) => {
        return `Our team had ${totals.negativeDiffCount} players in negative, and a total diff of ${sPlus(totals.damageDiff)} damage, ${sPlus(totals.blockedDiff)} block and ${sPlus(totals.healingDiff)} healing.`;
    };

    // Aggregate totals for damage, blocked, and healing differences
    const totals = pairs.reduce(
        (acc, pair) => {
            acc.damageDiff += pair.damageDiff;
            acc.blockedDiff += pair.blockedDiff;
            acc.healingDiff += pair.healingDiff;

            // Count negative total differences
            if (pair.totalDiff < 0) {
                acc.negativeDiffCount++;
            }

            return acc;
        },
        { damageDiff: 0, blockedDiff: 0, healingDiff: 0, negativeDiffCount: 0 }
    );

    // Calculate efficiencies
    const totalIncomingDamage = team2.reduce((sum, p) => sum + p.damage, 0);
    const totalBlocked = team1.reduce((sum, p) => sum + p.blocked, 0);
    const totalHealing = team1.reduce((sum, p) => determineStatType(p) === 'healing' ? sum + p.healing : sum, 0);
    const healerEff = totalIncomingDamage > 0 ? (totalHealing / (totalIncomingDamage) * 100) : 0; // should do - totalBlocked, however blocked is somehow more than incomming dmg
    const blockerEff = totalIncomingDamage > 0 ? (totalBlocked / totalIncomingDamage * 100) : 0;

    const damageDealers = team1.filter(p => determineStatType(p) === 'damage');
    const dmgTotal = damageDealers.reduce((sum, p) => sum + p.damage, 0);
    const killsTotal = damageDealers.reduce((sum, p) => sum + p.kills, 0);
    const dmgEff = dmgTotal > 0 ? (dmgTotal / killsTotal) : 0;

    const table = document.createElement('table');
    table.id = "cssTable";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Copy</th>
                <th>Team A Players in Negative</th>
                <th>💥</th>
                <th>Damage/Kills</th>
                <th>🛡️</th>
                <th>🛡️ Eff%</th>
                <th>💚</th>
                <th>💚 Eff%</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td>
                        <button class="copy-button" data-summary="${encodeURIComponent(generateSummary(totals))}">
                            📋
                        </button>
                    </td>
                    <td>${totals.negativeDiffCount}/6</td>
                    <td>${sPlus(s(totals.damageDiff))}</td>
                    <td>${dmgEff.toFixed(1)}</td>
                    <td>${sPlus(s(totals.blockedDiff))}</td>
                    <td>${blockerEff.toFixed(1)}%</td>
                    <td>${sPlus(s(totals.healingDiff))}</td>
                    <td>${healerEff.toFixed(1)}%</td>
                </tr>
        </tbody>
        <style>
        #cssTable td
{
    text-align: center;
    vertical-align: middle;
}
        </style>
    `;

    registerCopyBtns(table);

    return table;
}

function registerCopyBtns(table) {
    // Function to handle copy operation
    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // Optional: Show feedback that copy was successful
            //alert('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        }
    };

    // Add event listeners to copy buttons
    table.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', () => {
            const summary = decodeURIComponent(button.dataset.summary);
            handleCopy(summary);
            button.innerHTML = `✅`
        });
    });
}

function s(num) {
    if (isNaN(num)) throw new Error("Not a number: " + num)
    if (num < 0) return `<span style="color: #eea29a;">${num}</span>`
    else return `<span style="color: #86af49;">${num}</span>`
}

// reversed, meaning negative values are something good/positive
function sRev(num) {
    if (num > 0) return `<span style="color: #eea29a;">${num}</span>`
    else return `<span style="color: #86af49;">${num}</span>`
}

function sPlus(numString) {
    if (!isNaN(numString)) {
        if (numString < 0) return numString;
        else return '+' + numString;
    } else {
        if (numString.includes('>-')) return numString;
        else return numString.replace('>', '>+');
    }
}

function sPercent(num) {
    if (num === undefined) return 'N/A';
    const color = num < 0 ? '#eea29a' : '#86af49';
    return `<span style="color: ${color};">${num.toFixed(1)}%</span>`;
}

function sRevPercent(num) {
    if (num === undefined) return 'N/A';
    const color = num > 0 ? '#eea29a' : '#86af49';
    return `<span style="color: ${color};">${num.toFixed(1)}%</span>`;
}

function getMetaComparisonSpanSec(pairs) {

    const generateSummary = (totals) => {
        return `Our team had ${totals.negativeDiffCountSec} players in negative, and a total diff of ${sPlus(totals.killsDiff)} kills, ${sPlus(totals.deathsDiff)} deaths and ${sPlus(totals.assistsDiff)} assists.`;
    };

    // Aggregate totals for damage, blocked, and healing differences
    const totals = pairs.reduce(
        (acc, pair) => {
            acc.killsDiff += pair.killsDiff;
            acc.deathsDiff += pair.deathsDiff;
            acc.assistsDiff += pair.assistsDiff;

            // Count negative total differences
            if (pair.totalDiffSec < 0) {
                acc.negativeDiffCountSec++;
            }

            return acc;
        },
        { killsDiff: 0, deathsDiff: 0, assistsDiff: 0, negativeDiffCountSec: 0 }
    );

    const table = document.createElement('table');
    table.id = "cssTable";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Copy</th>
                <th>Team A Players in Negative</th>
                <th>Team  🔫</th>
                <th>Team 💀</th>
                <th>Team ⚔️</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td>
                        <button class="copy-button" data-summary="${encodeURIComponent(generateSummary(totals))}">
                            📋
                        </button>
                    </td>
                    <td>${totals.negativeDiffCountSec}/6</td>
                    <td>${sPlus(s(totals.killsDiff))}</td>
                    <td>${sPlus(sRev(totals.deathsDiff))}</td>
                    <td>${sPlus(s(totals.assistsDiff))}</td>
                </tr>
        </tbody>
        <style>
        #cssTable td
{
    text-align: center;
    vertical-align: middle;
}
        </style>
    `;

    registerCopyBtns(table);

    return table;
}

/**
 * Main function to parse the team tables, compare players, and display the results.
 */
function processGameData(team1, team2, matchDurationSeconds) {
    console.log('Starting team comparison and result generation...');
    console.log('Team 1 data:', team1);
    console.log('Team 2 data:', team2);
    try {
        const pairs = compareTeams(team1, team2);
        console.log('Comparison complete. Generated pairs:', pairs);

        let team3 = []
        team1.forEach(player => {
            team3.push(getTop500Player(player, matchDurationSeconds))
        });
        const pairs500 = compareTeams(team1, team3, true);
        console.log('Comparison500 complete. Generated pairs:', pairs500);

        const div = team1[0].table.parentElement.parentElement

        // Table
        let info = document.createElement('div')
        info.classList.add("my-info-section");
        info.innerHTML = `
            <style>
            .my-info-section{
              justify-items: center;
              text-align: center;
              border: solid;
              border-color: white;
            }
            </style>
            <h4>vs TOP 500 🔫⚔️💥🛡️💚</h4>
            <span><small>Ranked by Diff Kills 🔫 + Assists ⚔️ + Damage 💥 + Blocked 🛡️ + Heal 💚 compared with the average TOP 500 player with the same hero. The TOP 500 players performance is adapted to this matches length.
            Damage/Kills: high number = bad, because it means DPS had to hit more shots per kill.
            Kills and assists are worth 1000 points each, to be able to compare their value with the amount of damage/block/heal.
            Note that tanks with shields might have a slight advantage: their blocked stat might be too high because dmg to shields is not counted for enemy DPS.
            We do NOT account for that.</small></span>
            `
        div.parentElement.insertBefore(pad(info), div);

        div.parentElement.insertBefore(pad(getMetaComparisonSpan(pairs500, team1, team3)), div);
        div.parentElement.insertBefore(pad(getComparisonTableNormalized(pairs500)), div);

        // Table
        info = document.createElement('div')
        info.classList.add("my-info-section");
        info.innerHTML = `
            <h4>vs TEAM B 💥🛡️💚</h4>
            <span><small>Ranked by Diff Damage 💥 + Blocked 🛡️ + Heal 💚.</small></span>
            `
        div.parentElement.insertBefore(pad(info), div);

        div.parentElement.insertBefore(pad(getMetaComparisonSpan(pairs, team1, team2)), div);
        div.parentElement.insertBefore(pad(getComparisonTable(pairs)), div);

        // Table
        info = document.createElement('div')
        info.classList.add("my-info-section");
        info.innerHTML = `
            <h4>vs TEAM B 💥Eff%🛡️Eff%💚Eff%</h4>
            <span><small>Ranked by efficiency Diff in %, for Damage 💥 + Blocked 🛡️ + Heal 💚.
            Damage efficiency is 100% if the player had an average of 300 damage per kill.
            Blocked efficiency is 100% if the player blocked all damage of the enemy team.
            Heal efficiency is 100% if the player healed all damage of the enemy team.
            Those efficiency values are then also calculated for the enemy team and compared/diffed with.
            </small></span>
            `
        div.parentElement.insertBefore(pad(info), div);
        let result = getComparisonTableEfficiency(pairs)
        div.parentElement.insertBefore(pad(result.table), div);

        // Table
        info = document.createElement('div')
        info.classList.add("my-info-section");
        info.innerHTML = `
            <h4>vs TEAM B 🔫⚔️💥🛡️💚</h4>
            <span><small>Ranked by Diff Kills 🔫 + Assists ⚔️ + Damage 💥 + Blocked 🛡️ + Heal 💚 between Team A and B.
            Kills and assists are worth 1000 points each, to be able to compare their value with the amount of damage/block/heal.
            Note that tanks with shields might have a slight advantage: their blocked stat might be too high because dmg to shields is not counted for enemy DPS.
            We do NOT account for that.</small></span>
            `
        div.parentElement.insertBefore(pad(info), div);
        div.parentElement.insertBefore(pad(getComparisonTableNormalized(pairs)), div);

        // Table
        info = document.createElement('div')
        info.classList.add("my-info-section");
        info.innerHTML = `
            <h4>vs TEAM B 🔫⚔️</h4>
            <span><small>Ranked by Diff Kills 🔫 + Assists ⚔️. Same as the table above, however we compare kills and assists between Team A and B only. Deaths are not added to the total diff. </small></span>
            `
        div.parentElement.insertBefore(pad(info), div);

        div.parentElement.insertBefore(pad(getMetaComparisonSpanSec(pairs)), div);
        div.parentElement.insertBefore(pad(getComparisonTableSec(pairs)), div);
        console.log('Comparison table displayed successfully.');
    } catch (error) {
        console.error('Error processing game data:', error);
    }
}

function pad(el) {
    el.style.padding = "7px"
    return el;
}

/**
 * Extract player data from a table.
 * @param {HTMLTableElement} table - The table element to extract player data from.
 * @returns {Array} An array of player stats for the given table.
 */
function extractPlayerData(table, teamName) {
    console.log('Extracting player data from table:', table);
    const players = [];
    const rows = table.querySelectorAll('tbody tr');
    console.log(`Found ${rows.length} rows in table.`);
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        console.log('Processing row:', row);

        let playerData = cells.length <= 12 ? // actually 11, but +1 because of expand btn
            { // unranked
                table: table,
                team: teamName,
                name: cells[0]?.textContent.trim(),
                hero: cells[1]?.querySelector("img").alt.trim(),
                KDA: cells[2]?.textContent.trim(),
                kills: Number(cells[3]?.textContent.trim()) || 0,
                deaths: Number(cells[4]?.textContent.trim()) || 0,
                assists: Number(cells[5]?.textContent.trim()) || 0,
                killsSolo: Number(cells[6]?.textContent.trim().split(" ")[0]),
                killsHead: Number(cells[6]?.textContent.trim().split(" ")[1]),
                killsLastHit: Number(cells[6]?.textContent.trim().split(" ")[2]),
                damage: Number(cells[7]?.textContent.trim().split(" ")[0].replace(",", "")) || 0,
                blocked: Number(cells[8]?.textContent.trim().split(" ")[0].replace(",", "")) || 0,
                healing: Number(cells[9]?.textContent.trim().split(" ")[0].replace(",", "")) || 0,
                accuracy: parseFloat(cells[10]?.textContent.trim().split(" ")[0]) || 0.0,
            } :
            {
                table: table,
                team: teamName,
                name: cells[0]?.textContent.trim(),
                hero: cells[1]?.querySelector("img").alt.trim(),
                rank: cells[2]?.textContent.trim(),
                KDA: cells[3]?.textContent.trim(),
                kills: Number(cells[4]?.textContent.trim()) || 0,
                deaths: Number(cells[5]?.textContent.trim()) || 0,
                assists: Number(cells[6]?.textContent.trim()) || 0,
                killsSolo: Number(cells[7]?.textContent.trim().split(" ")[0]),
                killsHead: Number(cells[7]?.textContent.trim().split(" ")[1]),
                killsLastHit: Number(cells[7]?.textContent.trim().split(" ")[2]),
                damage: Number(cells[8]?.textContent.trim().split(" ")[0].replace(",", "")) || 0,
                blocked: Number(cells[9]?.textContent.trim().split(" ")[0].replace(",", "")) || 0,
                healing: Number(cells[10]?.textContent.trim().split(" ")[0].replace(",", "")) || 0,
                accuracy: parseFloat(cells[11]?.textContent.trim().split(" ")[0]) || 0.0,
            };
        console.log('Extracted player data:', playerData);
        players.push(playerData);
    });
    console.log(`Extraction complete. Total players extracted: ${players.length}`);
    return players;
}

/**
 * Parses a time string (e.g., "7m 46s") into total seconds.
 * @param {string} timeStr - The time string to parse.
 * @returns {number} Total time in seconds.
 */
function parseTimeString(timeStr) {
    let minutes = 0, seconds = 0;

    const minMatch = timeStr.match(/(\d+)m/);
    const secMatch = timeStr.match(/(\d+)s/);

    if (minMatch) minutes = parseInt(minMatch[1], 10);
    if (secMatch) seconds = parseInt(secMatch[1], 10);

    return (minutes * 60) + seconds;
}

/**
 * Monitor the DOM for the addition of both team tables and process the game data once both appear.
 */
(function () {
    'use strict';
    console.log('Script initialized. Starting to monitor DOM...');

    let team1 = [];
    let team2 = [];
    let tablesAdded = 0; // Track number of tables added

    try {
        // Function to handle DOM mutations
        const observerCallback = (mutationsList, observer) => {
            //console.log('MutationObserver callback triggered.');
            try {
                for (const mutation of mutationsList) {
                    //console.log('Processing mutation:', mutation);

                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        //console.log('Detected childList or subtree mutation.');

                        // Select all tables with a parent having the class 'group/table'
                        let tables = [];
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType !== Node.ELEMENT_NODE) return;
                            let tables2;
                            if (node.tagName === 'TABLE') {
                                tables2 = [node];
                            } else {
                                tables2 = node.querySelectorAll('table');
                            }
                            for (let el of tables2) tables.push(el);
                        });
                        console.log(`Found ${tables.length} potential tables.`);

                        tables.forEach((table, index) => {
                            if (table.id == "cssTable") {
                                console.log(`Table at index ${index} ignored. Table was added by us because id contains 'cssTable'. Prevent infinite recursion.`);
                                console.log(table);
                                return;
                            }

                            if (table.parentElement == null || !table.parentElement.classList.contains('group/table')) {
                                console.log(`Table at index ${index} ignored. Parent does not match 'group/table'.`);
                                console.log(table);
                                return;
                            }


                            const rows = table.querySelectorAll('tbody tr');
                            if (rows.length <= 4) {
                                console.log(`Table at index ${index} will be processed later. Has only ${rows.length} rows <= 4.`);
                                console.log(table);
                                setTimeout(() => { observerCallback(mutationsList, observer) }, 3000);
                                return;
                            }

                            console.log(`Checking table at index ${index}.`);
                            if (tablesAdded === 0) {
                                console.log('Processing first table (Team 1)...');
                                team1 = extractPlayerData(table, "Team 1");
                                console.log('Extracted Team 1 data:', team1);
                                tablesAdded++;
                            } else if (tablesAdded === 1) {
                                console.log('Processing second table (Team 2)...');
                                team2 = extractPlayerData(table, "Team 2");
                                console.log('Extracted Team 2 data:', team2);
                                tablesAdded++;
                            }
                        });

                        // Once both tables are found, process the data
                        if (tablesAdded === 2) {
                            console.log('Both team tables detected. Starting data processing...');

                            let matchDurationSeconds = parseTimeString(document.querySelector("div.v3-match__stats > div > div.value > span").textContent);

                            processGameData(team1, team2, matchDurationSeconds);
                            console.log('Data processing complete. Disconnecting observer.');
                            //observer.disconnect(); // Stop observing once both tables are found and processed
                            tablesAdded = 0; // Reset table tracking for future changes if needed
                            console.log('Observer disconnected and table tracking reset.');
                            break;
                        }
                    }
                }
            } catch (error) {
                console.error('Error occurred while handling DOM mutations: ' + error.message, error);
                observer.disconnect();
            }
        };

        // Set up the observer
        const observer = new MutationObserver(observerCallback);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        console.log('MutationObserver set up and observing DOM.');
    } catch (error) {
        console.error('Error initializing MutationObserver or monitoring DOM:', error);
    }
})();