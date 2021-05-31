// eslint-disable-next-line no-unused-vars
class Helper {
  // Characters in String editieren
  static setCharsAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + chr.length);
  }

  // X/Y-Wert in fortlaufende String-Position umwandeln
  static xyToStringPos(posX, posY, cols) {
    // Zusätzliche Characters wegen Zeilenumbrüchen
    const rowOffset = posY;
    // Position im Gesamtstring, (AnzahlZeilen/YPos+i)*ZeichenProZeile plus rowOffset plus momentan
    // gezeichnete Zeile des Ships
    const posInString = posY * cols + rowOffset + posX;
    return posInString;
  }
}
