function getMessage(a, b) {
  if (typeof a == "boolean" && a == true) {
    return "Переданное GIF-изображение анимировано и содержит " + b + " кадров";
  }
  if (typeof a == "boolean" && a == false) {
    return "Переданное GIF-изображение не анимировано";
  }
  if (typeof a == "number") {
    return "Переданное SVG-изображение содержит " + a + " объектов и " + (b * 4) + " атрибутов";
  }
  if (Array.isArray(a) && !Array.isArray(b)) {
    var amountOfRedPoints = 0;
    for (var i = 0; i < a.length; i++) {
      amountOfRedPoints = amountOfRedPoints + a[i];
    }
    return "Количество красных точек во всех строчках изображения: " + amountOfRedPoints;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    var artifactsSquare = 0;
    if (a.length >= b.length) {
      for (var j = 0; j <a.length; j++) {
        artifactsSquare = artifactsSquare + a[j] * b[j];
      }
    }
    if (a.length < b.length) {
      for (j = 0; j <b.length; j++) {
        artifactsSquare = artifactsSquare + a[j] * b[j];
      }
    }
    return "Общая площадь артефактов сжатия: " + artifactsSquare + " пикселей";
  }
}
