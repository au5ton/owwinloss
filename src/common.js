
//export const STAGES_old = ["Ayutthaya", "Black Forest", "Blizzard World", "Busan", "Castillo", "Château Guillard", "Dorado", "Ecopoint: Antarctica", "Eichenwalde", "Hanamura", "Havana", "Hollywood", "Horizon Lunar Colony", "Ilios", "Junkertown", "King's Row", "Lijiang Tower", "Necropolis", "Nepal", "Numbani", "Oasis", "Paris", "Petra", "Rialto", "Route 66", "Temple of Anubis", "Volskaya Industries", "Watchpoint: Gibraltar", ""]

export const STAGES = {
  "Escort": [
    "Circuit Royale",
    "Dorado",
    "Havana",
    "Junkertown",
    "Rialto",
    "Route 66",
    "Watchedpoint: Gibraltar"
  ],
  "Hybrid": [
    "Blizzard World",
    "Eichenwalde",
    "Hollywood",
    "King's Row",
    "Midtown",
    "Numbani",
    "Paraíso"
  ],
  "Control": [
    "Busan",
    "Ilios",
    "Lijiang Tower",
    "Nepal",
    "Oasis"
  ],
  "Push": [
    "Colosseo",
    "Esperança",
    "New Queen Street"
  ],
  "Elimination": [
    "Black Forest",
    "Castillo",
    "Ecopoint: Antarctica",
    "Necropolis"
  ],
  "Deathmatch": [
    "Château Guillard",
    "Kanezaka",
    "Malevento",
    "Petra"
  ],
  "Capture the Flag": [
    "Ayutthaya"
  ],
  "Assault": [
    "Hanamura",
    "Horizon Lunar Colony",
    "Paris",
    "Temple of Anubis",
    "Volskaya Industries"
  ]
}

export const matchResult = (scoreBlue, scoreRed) => {
  return (scoreBlue === scoreRed) ? 'Tie' : (scoreBlue > scoreRed ? 'Win' : 'Loss')
}
