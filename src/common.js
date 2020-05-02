
export const STAGES = ["Ayutthaya", "Black Forest", "Blizzard World", "Busan", "Castillo", "Château Guillard", "Dorado", "Ecopoint: Antarctica", "Eichenwalde", "Hanamura", "Havana", "Hollywood", "Horizon Lunar Colony", "Ilios", "Junkertown", "King's Row", "Lijiang Tower", "Necropolis", "Nepal", "Numbani", "Oasis", "Paris", "Petra", "Rialto", "Route 66", "Temple of Anubis", "Volskaya Industries", "Watchpoint: Gibraltar"]

export const matchResult = (scoreBlue, scoreRed) => {
  return (scoreBlue === scoreRed) ? 'Tie' : (scoreBlue > scoreRed ? 'Win' : 'Loss')
}
