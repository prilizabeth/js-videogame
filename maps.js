/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '🏠',
    'I': '🦴',
    'PLAYER': '🐶',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'HEART': '❤️',
  };
  
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
    O-----XXXX
    XXXXX-XXXX
    X-----XXXX
    XXXX-XXXXX
    ---X--XXXX
    -X-XX-XXXX
    -X-XX-XXXX
    -X--------
    -XXXXXXXX-
    IX--------
  `);
  maps.push(`
    XXXXX--X-I
    XXXXX-XX-X
    ---XX-XX--
    -X----XXX-
    -XXXX---X-
    -XXX--X-X-
    -----XX---
    XX-XXXX-XX
    XX-XX--XXX
    O-----XXXX
  `);
  maps.push(`
    XXX------O
    XXX-XXXXX-
    XXXXXX----
    ------XX-X
    -XXXX--X-X
    ---IXX-X--
    XXXXX--XX-
    X-----XX--
    X-XXXXXX-X
    X--------X
  `);