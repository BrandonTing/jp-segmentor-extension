const element = document.getElementsByClassName('content--detail-body');
const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "word" });

const detail = element[0]
// Check if the element exists
if (detail) {
  // Manipulate the element (e.g., change the text)
  const text = detail.innerText
  const segments = segmenterJa.segment(text);
  const seperatedText = Array.from(segments).reduce((pre, cur) => {
    if (cur.isWordLike) {
      return pre + cur.segment + " "
    }
    return pre + cur.segment
  }, "")
  detail.innerText = seperatedText
} else {
  console.log("Element not found!");
}
