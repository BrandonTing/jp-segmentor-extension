const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "word" });

const title = document.querySelector('.content--title span');

// Check if the element exists
if (title) {
  // Manipulate the element (e.g., change the text)
  const text = title.innerText
  title.innerText = getSeperatedText(segmenterJa, text)
} else {
  console.log("Element not found!");
}

const summary = document.querySelector('.content--summary');
// Check if the element exists
if (summary) {
  // Manipulate the element (e.g., change the text)
  const text = summary.innerText
  summary.innerText = getSeperatedText(segmenterJa, text)
} else {
  console.log("Element not found!");
}

const bodyTitle = document.querySelectorAll('.body-title');
bodyTitle.forEach(ele => {
  const text = ele.innerText
  ele.innerText = getSeperatedText(segmenterJa, text)
})

const body = document.querySelectorAll('.body-text p');
body.forEach(ele => {
  const text = ele.innerText
  ele.innerText = getSeperatedText(segmenterJa, text)
})

/**
 * 
 * @param {Intl.Segmenter} segmenter 
 * @param {string} text
 * @returns {string}
 */
function getSeperatedText(segmenter, text) {
  const segments = segmenter.segment(text);
  const seperatedText = Array.from(segments).reduce((pre, cur) => {
    if (cur.isWordLike) {
      return pre + cur.segment + " "
    }
    return pre + cur.segment
  }, "")
  return seperatedText
}